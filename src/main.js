import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { registerBlocks } from './blocks.js';

// ── Theme CSS paths (relative to slide-starter root) ──
const THEME_CSS = {
  'trend-report': '/themes/trend-report.css',
  'tech-explainer': '/themes/tech-explainer.css',
  'anthropic': '/themes/anthropic.css',
  'mckinsey': '/themes/mckinsey.css',
  'hbr': '/themes/hbr.css',
};

// ── Slide engine base CSS (injected into canvas) ──
const ENGINE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Poppins", "Noto Sans JP", sans-serif;
    background: var(--color-bg, #0f0f0f) !important;
    color: var(--color-fg, #f0f0ee);
    width: 1280px;
    height: 720px;
    overflow: hidden;
  }
  .slide {
    width: 1280px;
    height: 720px;
    display: flex;
    flex-direction: column;
    padding: var(--sp-xl, 64px);
    background: var(--color-bg, #0f0f0f);
    color: var(--color-fg, #f0f0ee);
    overflow: hidden;
    position: relative;
  }
  /* GrapesJS wrapper — full slide size, positioning context */
  [data-gjs-type="wrapper"] {
    position: relative !important;
    width: 1280px !important;
    height: 720px !important;
    min-height: 720px !important;
    overflow: hidden !important;
    background: var(--color-bg, #0f0f0f) !important;
  }
`;

// ── State (exposed on window for debugging) ──
let currentTheme = 'trend-report';
let slides = window.__slides = [];
let activeSlideIndex = 0;

// ── Initialize GrapesJS ──
/** @type {import('grapesjs').Editor} */
const editor = window.__editor = grapesjs.init({
  container: '#gjs',
  fromElement: false,
  height: '100%',
  width: 'auto',
  storageManager: false,
  dragMode: 'absolute',

  canvas: {
    styles: [
      'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap',
    ],
    scripts: [],
  },

  // Render blocks into our panel
  blockManager: {
    appendTo: '#blocks-panel',
  },

  // Render style manager into our panel
  styleManager: {
    appendTo: '#styles-panel',
    sectors: [
      {
        name: 'Layout',
        open: true,
        properties: [
          'display', 'flex-direction', 'justify-content', 'align-items',
          'gap', 'flex-wrap', 'flex',
        ],
      },
      {
        name: 'Dimension',
        open: false,
        properties: ['width', 'height', 'max-width', 'min-height', 'padding', 'margin'],
      },
      {
        name: 'Typography',
        open: false,
        properties: [
          'font-family', 'font-size', 'font-weight', 'line-height',
          'letter-spacing', 'color', 'text-align', 'text-transform',
        ],
      },
      {
        name: 'Background',
        open: false,
        properties: ['background', 'background-color', 'background-image', 'opacity'],
      },
      {
        name: 'Border',
        open: false,
        properties: ['border', 'border-radius', 'border-left', 'border-bottom'],
      },
      {
        name: 'Position',
        open: false,
        properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
      },
    ],
  },

  // Render layers into our panel
  layerManager: {
    appendTo: '#layers-panel',
  },

  // Trait manager
  traitManager: {
    appendTo: '#traits-panel',
  },

  // Device manager — fixed 1280x720
  deviceManager: {
    devices: [
      { name: 'Slide', width: '1280px', height: '720px' },
    ],
  },

  // Disable default panels
  panels: { defaults: [] },
});

// ── Register custom blocks ──
registerBlocks(editor);

// ── Load theme CSS into canvas ──
function loadThemeCSS(themeName) {
  const canvas = editor.Canvas;
  const doc = canvas.getDocument();
  if (!doc) return;

  // Remove old theme link
  const oldLink = doc.getElementById('slide-theme-css');
  if (oldLink) oldLink.remove();

  // Remove old engine style
  const oldEngine = doc.getElementById('slide-engine-css');
  if (oldEngine) oldEngine.remove();

  // Add engine CSS
  const engineStyle = doc.createElement('style');
  engineStyle.id = 'slide-engine-css';
  engineStyle.textContent = ENGINE_CSS;
  doc.head.appendChild(engineStyle);

  // Add theme CSS
  const cssPath = THEME_CSS[themeName];
  if (cssPath) {
    const link = doc.createElement('link');
    link.id = 'slide-theme-css';
    link.rel = 'stylesheet';
    link.href = cssPath;
    doc.head.appendChild(link);
  }

  currentTheme = themeName;
}

// ── Slide Management ──
function createDefaultSlide() {
  return {
    html: `<section class="slide slide-title is-active">
      <span class="label">NEW PRESENTATION</span>
      <h1>Click to edit title</h1>
      <p class="sub">Add your subtitle here</p>
    </section>`,
    css: '',
    label: 'Title',
  };
}

function saveCurrentSlide() {
  if (slides[activeSlideIndex]) {
    // getHtml() returns <body>...</body>, extract inner content
    let html = editor.getHtml();
    html = html.replace(/^<body>/, '').replace(/<\/body>$/, '');
    if (html && html !== '<body></body>' && html.trim() !== '') {
      slides[activeSlideIndex].html = html;
    }
    const css = editor.getCss();
    if (css) {
      slides[activeSlideIndex].css = css;
    }
  }
}

function loadSlide(index, { skipSave = false } = {}) {
  if (index < 0 || index >= slides.length) return;
  if (!skipSave) saveCurrentSlide();
  activeSlideIndex = index;
  const slide = slides[index];

  // Clear then set — forces GrapesJS to fully re-render
  editor.DomComponents.clear();
  editor.setComponents(slide.html);
  if (slide.css) {
    editor.setStyle(slide.css);
  }

  // Re-inject engine + theme CSS into canvas after component change
  setTimeout(() => loadThemeCSS(currentTheme), 100);

  renderSlideList();
}

function addSlide(slideData) {
  saveCurrentSlide();
  const newSlide = slideData || {
    html: `<section class="slide slide-content is-active">
      <div class="body">
        <h2>New Slide</h2>
        <p>Add your content here</p>
      </div>
    </section>`,
    css: '',
    label: 'Content',
  };
  slides.push(newSlide);
  loadSlide(slides.length - 1);
}

function deleteSlide(index) {
  if (slides.length <= 1) return;
  slides.splice(index, 1);
  if (activeSlideIndex >= slides.length) {
    activeSlideIndex = slides.length - 1;
  }
  loadSlide(activeSlideIndex);
}

// Build the srcdoc for thumbnail iframes (shared shell, per-slide body)
function buildThumbSrcdoc(slideHtml) {
  // srcdoc iframes have base URL about:srcdoc, so we need absolute URLs
  const base = window.location.origin;
  const themePath = THEME_CSS[currentTheme] || '';
  const absTheme = themePath ? base + themePath : '';
  return `<!DOCTYPE html>
<html lang="ja"><head>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${absTheme}">
<style>
${ENGINE_CSS}
html,body{margin:0;padding:0;width:1280px;height:720px;overflow:hidden;pointer-events:none;}
</style>
</head><body>${slideHtml}</body></html>`;
}

function renderSlideList() {
  const list = document.getElementById('slide-list');
  list.innerHTML = '';

  slides.forEach((slide, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'slide-thumb' + (i === activeSlideIndex ? ' active' : '');
    thumb.addEventListener('click', () => loadSlide(i));

    // Miniature iframe preview
    const iframe = document.createElement('iframe');
    iframe.className = 'thumb-iframe';
    iframe.setAttribute('sandbox', 'allow-same-origin');
    iframe.setAttribute('loading', 'lazy');
    iframe.srcdoc = buildThumbSrcdoc(slide.html);
    thumb.appendChild(iframe);

    // Label overlay
    const typeMatch = slide.html.match(/slide-(title|content|landing|section|hero|two-col|fullimg|end|agenda)/);
    const typeLabel = typeMatch ? typeMatch[1] : 'slide';

    const label = document.createElement('div');
    label.className = 'thumb-label';
    label.innerHTML = `
      <span class="thumb-num">${String(i + 1).padStart(2, '0')}</span>
      <span>${typeLabel}</span>
      <button class="thumb-delete" title="Delete slide">&times;</button>
    `;
    thumb.appendChild(label);

    // Delete handler
    label.querySelector('.thumb-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Delete slide ${i + 1}?`)) {
        deleteSlide(i);
      }
    });

    list.appendChild(thumb);
  });
}

// ── Tab Switching ──
document.querySelectorAll('.panel-tabs .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.panel-tabs .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.panel).classList.add('active');
  });
});

// ── Theme Switcher ──
document.getElementById('theme-select').addEventListener('change', (e) => {
  loadThemeCSS(e.target.value);
});

// ── Add Slide Button ──
document.getElementById('btn-add-slide').addEventListener('click', () => addSlide());

// ── Undo/Redo ──
document.getElementById('btn-undo').addEventListener('click', () => editor.UndoManager.undo());
document.getElementById('btn-redo').addEventListener('click', () => editor.UndoManager.redo());

// ── Drag Mode Toggle (Free Move / Flow) ──
const dragModeBtn = document.getElementById('btn-drag-mode');
dragModeBtn.addEventListener('click', () => {
  const isAbsolute = dragModeBtn.classList.toggle('active');
  editor.setDragMode(isAbsolute ? 'absolute' : '');
  dragModeBtn.textContent = isAbsolute ? 'Free Move' : 'Flow';
});

// ── Preview (overlay inside editor) ──
document.getElementById('btn-preview').addEventListener('click', () => {
  saveCurrentSlide();
  const allHtml = generateDeckHTML();
  const blob = new Blob([allHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'preview-overlay';
  overlay.innerHTML = `
    <button id="preview-close">✕ Close Preview</button>
    <iframe src="${url}" id="preview-frame"></iframe>
  `;
  document.body.appendChild(overlay);

  document.getElementById('preview-close').addEventListener('click', () => {
    overlay.remove();
    URL.revokeObjectURL(url);
  });

  // ESC to close
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
      URL.revokeObjectURL(url);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
});

// ── Import Deck HTML ──
const fileInput = document.getElementById('file-import');
document.getElementById('btn-import').addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    importDeckHTML(ev.target.result, file.name);
    fileInput.value = '';
  };
  reader.readAsText(file);
});

function importDeckHTML(htmlString, filename) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Auto-detect theme from <link> href
  const links = doc.querySelectorAll('link[rel="stylesheet"]');
  for (const link of links) {
    const href = link.getAttribute('href') || '';
    for (const [key] of Object.entries(THEME_CSS)) {
      if (href.includes(key)) {
        currentTheme = key;
        document.getElementById('theme-select').value = key;
        break;
      }
    }
  }

  // Extract individual slides from .deck > .slide or just .slide
  const slideEls = doc.querySelectorAll('.slide');
  if (slideEls.length === 0) {
    alert('No .slide elements found in the HTML file.');
    return;
  }

  // Clear current slides
  slides = window.__slides = [];
  activeSlideIndex = 0;

  slideEls.forEach((el) => {
    // Ensure is-active is removed (we manage it ourselves)
    el.classList.remove('is-active');
    // Remove slide-page-num injected by engine
    el.querySelectorAll('.slide-page-num').forEach(n => n.remove());
    slides.push({
      html: el.outerHTML,
      css: '',
    });
  });

  // Load theme and first slide (skip save — editor is empty at this point)
  loadThemeCSS(currentTheme);
  loadSlide(0, { skipSave: true });
}

// ── Export Full Deck ──
document.getElementById('btn-export-deck').addEventListener('click', () => {
  saveCurrentSlide();
  const html = generateDeckHTML();
  const deckName = document.title.replace(/[^a-zA-Z0-9-_]/g, '') || 'deck';
  downloadFile(deckName + '.html', html);
});

// ── Generate full deck HTML with slide.js navigation ──
function generateDeckHTML() {
  const slidesHtml = slides.map((s, i) => {
    // Remove is-active from all, add to first
    let html = s.html.replace(/\bis-active\b/g, '');
    if (i === 0) {
      html = html.replace(/class="slide/, 'class="slide is-active');
    }
    return html;
  }).join('\n');

  // Collect all custom CSS
  const allCss = slides.map(s => s.css).filter(Boolean).join('\n');

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap">
<style>
/* Engine */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { width: 100vw; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.deck { width: 1280px; height: 720px; position: relative; flex-shrink: 0; transform-origin: center center; }
.slide { position: absolute; inset: 0; display: none; flex-direction: column; padding: var(--sp-xl, 64px); background: var(--color-bg, #0f0f0f); color: var(--color-fg, #f0f0ee); overflow: hidden; }
.slide.is-active { display: flex; }
.slide-ui { position: fixed; inset: 0; pointer-events: none; z-index: 100; }
.slide-counter { position: absolute; bottom: 1.5rem; left: 2rem; font-size: .7rem; font-family: monospace; color: rgba(255,255,255,.25); }
.slide-nav { position: absolute; bottom: 1.25rem; right: 1.5rem; display: flex; gap: .375rem; pointer-events: all; }
.slide-nav button { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.5); padding: .35rem .9rem; border-radius: 3px; cursor: pointer; font-size: .7rem; }
.slide-nav button:hover { background: rgba(255,255,255,.15); color: rgba(255,255,255,.9); }

${allCss}
</style>
<link rel="stylesheet" href="${THEME_CSS[currentTheme] || ''}">
</head>
<body>
<div class="deck">
${slidesHtml}
</div>
<div class="slide-ui">
  <div class="slide-counter"><span id="current">1</span> / <span id="total">${slides.length}</span></div>
  <div class="slide-nav">
    <button onclick="go(-1)">&larr; Prev</button>
    <button onclick="go(1)">Next &rarr;</button>
  </div>
</div>
<script>
const slides = document.querySelectorAll('.slide');
let cur = 0;
function go(d) {
  slides[cur].classList.remove('is-active');
  cur = Math.max(0, Math.min(slides.length - 1, cur + d));
  slides[cur].classList.add('is-active');
  document.getElementById('current').textContent = cur + 1;
}
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') go(1);
  if (e.key === 'ArrowLeft') go(-1);
});
// Scale to fit
function scale() {
  const deck = document.querySelector('.deck');
  const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
  deck.style.transform = 'scale(' + s + ')';
}
scale();
window.addEventListener('resize', scale);
<\/script>
</body>
</html>`;
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── Drag & Drop import ──
document.body.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});
document.body.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && (file.name.endsWith('.html') || file.name.endsWith('.htm'))) {
    const reader = new FileReader();
    reader.onload = (ev) => importDeckHTML(ev.target.result, file.name);
    reader.readAsText(file);
  }
});

// scaleCanvas removed — let GrapesJS handle iframe sizing natively
function scaleCanvas() {} // no-op stub for existing calls

// ── Keyboard shortcuts ──
document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl+S to save (prevent default)
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    saveCurrentSlide();
  }
  // Cmd/Ctrl+Z undo
  if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
    // Let GrapesJS handle it
  }
});

// ── Initialize ──
editor.on('load', () => {
  // Set canvas to slide device
  editor.setDevice('Slide');

  // Load theme CSS into canvas
  loadThemeCSS(currentTheme);

  // Create first slide
  slides.push(createDefaultSlide());
  loadSlide(0, { skipSave: true });
});

// ── Save to localStorage periodically ──
function saveToStorage() {
  saveCurrentSlide();
  try {
    localStorage.setItem('slide-editor-data', JSON.stringify({
      theme: currentTheme,
      slides,
      activeSlideIndex,
    }));
  } catch (e) {
    // Ignore quota errors
  }
}

function loadFromStorage() {
  try {
    const data = JSON.parse(localStorage.getItem('slide-editor-data'));
    if (data && data.slides && data.slides.length > 0) {
      slides = data.slides;
      activeSlideIndex = data.activeSlideIndex || 0;
      currentTheme = data.theme || 'trend-report';
      document.getElementById('theme-select').value = currentTheme;
      return true;
    }
  } catch (e) {
    // Ignore
  }
  return false;
}

// Auto-save every 30s
setInterval(saveToStorage, 30000);

// Try loading saved data or ?deck= param on startup
editor.on('load', () => {
  const params = new URLSearchParams(window.location.search);
  const deckPath = params.get('deck');
  if (deckPath) {
    // Fetch the deck HTML and import it
    fetch(deckPath)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(html => importDeckHTML(html, deckPath))
      .catch(e => console.error('Failed to load deck:', deckPath, e));
  } else if (loadFromStorage()) {
    loadThemeCSS(currentTheme);
    loadSlide(activeSlideIndex, { skipSave: true });
  }
});
