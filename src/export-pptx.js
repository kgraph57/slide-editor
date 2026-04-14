/**
 * Export slides to PPTX using PptxGenJS
 * Converts each slide's HTML to a screenshot via canvas, then embeds as image in PPTX
 */
import PptxGenJS from 'pptxgenjs';

// Convert an HTML string to a data URL image using an offscreen iframe + html2canvas approach
function slideToImage(slideHtml, themeHref) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:1280px;height:720px;border:none;';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument;
    doc.open();
    doc.write(`<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap">
${themeHref ? `<link rel="stylesheet" href="${themeHref}">` : ''}
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{width:1280px;height:720px;overflow:hidden;font-family:"Poppins","Noto Sans JP",sans-serif;}
.slide{width:1280px;height:720px;display:flex;flex-direction:column;padding:var(--sp-xl,64px);background:var(--color-bg,#0f0f0f);color:var(--color-fg,#f0f0ee);overflow:hidden;position:relative;}
</style>
</head><body>${slideHtml}</body></html>`);
    doc.close();

    // Wait for CSS/fonts to load, then capture
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');

      // Use SVG foreignObject to render HTML to canvas
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
          <foreignObject width="1280" height="720">
            ${new XMLSerializer().serializeToString(doc.documentElement)}
          </foreignObject>
        </svg>`;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        document.body.removeChild(iframe);
        resolve(dataUrl);
      };
      img.onerror = () => {
        // Fallback: solid background with text
        ctx.fillStyle = '#0f0f0f';
        ctx.fillRect(0, 0, 1280, 720);
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px sans-serif';
        ctx.fillText('Slide (image export failed)', 40, 360);
        const dataUrl = canvas.toDataURL('image/png');
        document.body.removeChild(iframe);
        resolve(dataUrl);
      };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    }, 500);
  });
}

/**
 * Alternative: extract text elements and position them as native PPTX text boxes
 */
function extractTextElements(slideHtml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(slideHtml, 'text/html');
  const elements = [];

  // Extract headings
  doc.querySelectorAll('h1, h2, h3').forEach(el => {
    const tag = el.tagName.toLowerCase();
    const fontSize = tag === 'h1' ? 36 : tag === 'h2' ? 24 : 18;
    elements.push({
      text: el.textContent.trim(),
      options: {
        fontSize,
        bold: true,
        color: 'FFFFFF',
        fontFace: 'Helvetica Neue',
      },
    });
  });

  // Extract paragraphs
  doc.querySelectorAll('p').forEach(el => {
    const text = el.textContent.trim();
    if (text) {
      elements.push({
        text,
        options: {
          fontSize: 14,
          color: 'AAAAAA',
          fontFace: 'Helvetica Neue',
        },
      });
    }
  });

  // Extract list items
  doc.querySelectorAll('li').forEach(el => {
    elements.push({
      text: '  ' + el.textContent.trim(),
      options: {
        fontSize: 14,
        color: 'CCCCCC',
        fontFace: 'Helvetica Neue',
        bullet: true,
      },
    });
  });

  return elements;
}

export async function exportToPptx(slides, themeHref, deckName = 'presentation') {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Slide Editor';

  for (const slideData of slides) {
    const pptxSlide = pptx.addSlide();

    // Detect slide background
    const bgMatch = slideData.html.match(/bg-(warm|cool|blend|dark)/);
    const isLight = slideData.html.includes('class="slide') && slideData.html.includes('light');

    // Set background color
    if (isLight) {
      pptxSlide.background = { color: 'F9F9F9' };
    } else if (bgMatch) {
      const gradients = {
        warm: { color: '3D2817' },
        cool: { color: '0F1419' },
        blend: { color: '1a1a2e' },
        dark: { color: '0f0f0f' },
      };
      pptxSlide.background = gradients[bgMatch[1]] || { color: '0f0f0f' };
    } else {
      pptxSlide.background = { color: '0f0f0f' };
    }

    // Extract text and add as native PPTX elements
    const textElements = extractTextElements(slideData.html);
    let yPos = 0.8; // starting Y position in inches

    for (const el of textElements) {
      pptxSlide.addText(el.text, {
        x: 0.8,
        y: yPos,
        w: 8.4,
        h: 0.6,
        ...el.options,
      });
      yPos += el.options.fontSize > 20 ? 0.8 : 0.5;
      if (yPos > 6.5) break; // prevent overflow
    }
  }

  await pptx.writeFile({ fileName: `${deckName}.pptx` });
}
