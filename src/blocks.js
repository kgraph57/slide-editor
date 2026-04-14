/**
 * Custom GrapesJS blocks — slide-starter theme patterns
 * Each block maps to a CSS pattern from trend-report.css / tech-explainer.css
 */

export function registerBlocks(editor) {
  const bm = editor.BlockManager;

  // ── Slide Types ──
  bm.add('slide-title', {
    label: 'Title Slide',
    category: 'Slide Types',
    content: `
      <section class="slide slide-title is-active">
        <span class="label">PRESENTATION TITLE</span>
        <h1>Your Title Here</h1>
        <p class="sub">Subtitle or brief description goes here</p>
      </section>`,
    attributes: { class: 'fa fa-heading' },
  });

  bm.add('slide-content', {
    label: 'Content Slide',
    category: 'Slide Types',
    content: `
      <section class="slide slide-content is-active">
        <div class="body">
          <h2>Section Title</h2>
          <p>Content goes here. Replace with your text, lists, or components.</p>
        </div>
      </section>`,
  });

  bm.add('slide-landing', {
    label: 'Landing (Key Message)',
    category: 'Slide Types',
    content: `
      <section class="slide slide-landing is-active">
        <h2>The one thing you want the audience to remember</h2>
      </section>`,
  });

  bm.add('slide-section', {
    label: 'Section Divider',
    category: 'Slide Types',
    content: `
      <section class="slide slide-section is-active">
        <span class="num">01</span>
        <h2>Section Name</h2>
        <p>Brief description of this section</p>
      </section>`,
  });

  bm.add('slide-hero', {
    label: 'Hero Slide',
    category: 'Slide Types',
    content: `
      <section class="slide slide-hero is-active">
        <h1>Big Impact Statement</h1>
        <p>Supporting context for the hero message</p>
      </section>`,
  });

  bm.add('slide-two-col', {
    label: 'Two Column (Text+Image)',
    category: 'Slide Types',
    content: `
      <section class="slide slide-two-col is-active">
        <div class="col-text">
          <h2>Title</h2>
          <p>Description text goes here with key points and context.</p>
        </div>
        <div class="col-img">
          <img src="https://placehold.co/576x720/1a1a1a/333?text=Image" alt="placeholder" />
        </div>
      </section>`,
  });

  bm.add('slide-end', {
    label: 'End Slide',
    category: 'Slide Types',
    content: `
      <section class="slide slide-end is-active">
        <div class="mark"></div>
        <h2>Thank You</h2>
        <p>contact@example.com</p>
      </section>`,
  });

  // ── Layout Components ──
  bm.add('cols-2', {
    label: '2 Columns',
    category: 'Layout',
    content: `
      <div class="cols-2">
        <div class="card">
          <h3>Column 1</h3>
          <p>Content here</p>
        </div>
        <div class="card">
          <h3>Column 2</h3>
          <p>Content here</p>
        </div>
      </div>`,
  });

  bm.add('cols-3', {
    label: '3 Columns',
    category: 'Layout',
    content: `
      <div class="cols-3">
        <div class="card">
          <h3>Column 1</h3>
          <p>Content here</p>
        </div>
        <div class="card">
          <h3>Column 2</h3>
          <p>Content here</p>
        </div>
        <div class="card">
          <h3>Column 3</h3>
          <p>Content here</p>
        </div>
      </div>`,
  });

  bm.add('cols-4', {
    label: '4 Columns',
    category: 'Layout',
    content: `
      <div class="cols-4">
        <div class="card"><h3>Col 1</h3><p>Text</p></div>
        <div class="card"><h3>Col 2</h3><p>Text</p></div>
        <div class="card"><h3>Col 3</h3><p>Text</p></div>
        <div class="card"><h3>Col 4</h3><p>Text</p></div>
      </div>`,
  });

  bm.add('text-img', {
    label: 'Text + Image',
    category: 'Layout',
    content: `
      <div class="text-img">
        <div class="text">
          <h3>Heading</h3>
          <p>Description text alongside the image.</p>
        </div>
        <div class="img-box">
          <img src="https://placehold.co/600x400/1a1a1a/333?text=Image" alt="placeholder" />
        </div>
      </div>`,
  });

  bm.add('grid-2x2', {
    label: '2x2 Grid',
    category: 'Layout',
    content: `
      <div class="grid-2x2">
        <div class="finding"><h3>Finding 1</h3><p>Description</p></div>
        <div class="finding"><h3>Finding 2</h3><p>Description</p></div>
        <div class="finding"><h3>Finding 3</h3><p>Description</p></div>
        <div class="finding"><h3>Finding 4</h3><p>Description</p></div>
      </div>`,
  });

  // ── Content Components ──
  bm.add('card', {
    label: 'Card',
    category: 'Components',
    content: `
      <div class="card">
        <h3>Card Title</h3>
        <p>Card description with key information.</p>
      </div>`,
  });

  bm.add('card-accent', {
    label: 'Accent Card',
    category: 'Components',
    content: `
      <div class="card accent-border">
        <h3>Highlighted Point</h3>
        <p>Important information that stands out.</p>
      </div>`,
  });

  bm.add('list', {
    label: 'Bullet List',
    category: 'Components',
    content: `
      <ul class="list">
        <li>First point with key insight</li>
        <li>Second point with supporting data</li>
        <li>Third point with conclusion</li>
      </ul>`,
  });

  bm.add('num-list', {
    label: 'Numbered List',
    category: 'Components',
    content: `
      <ol class="num-list">
        <li>Step one of the process</li>
        <li>Step two continues here</li>
        <li>Step three wraps up</li>
      </ol>`,
  });

  bm.add('flow', {
    label: 'Flow Chart',
    category: 'Components',
    content: `
      <div class="flow">
        <div class="flow-step">
          <h3>Step 1</h3>
          <p>Input</p>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <h3>Step 2</h3>
          <p>Process</p>
        </div>
        <div class="flow-arrow">&rarr;</div>
        <div class="flow-step">
          <h3>Step 3</h3>
          <p>Output</p>
        </div>
      </div>`,
  });

  bm.add('stat', {
    label: 'KPI / Stat',
    category: 'Components',
    content: `
      <div class="stat">
        <span class="number">87%</span>
        <span class="label">Metric Description</span>
      </div>`,
  });

  bm.add('kpi-solo', {
    label: 'KPI Solo (Big Number)',
    category: 'Components',
    content: `
      <div class="kpi-solo">
        <span class="number">2.4M</span>
        <span class="unit">Users</span>
        <span class="desc">Monthly active users as of Q1 2026</span>
      </div>`,
  });

  bm.add('kpi-grid', {
    label: 'KPI Grid (3 stats)',
    category: 'Components',
    content: `
      <div class="cols-3">
        <div class="stat">
          <span class="number">98%</span>
          <span class="label">Uptime</span>
        </div>
        <div class="stat">
          <span class="number">2.4M</span>
          <span class="label">Users</span>
        </div>
        <div class="stat">
          <span class="number">150ms</span>
          <span class="label">Latency</span>
        </div>
      </div>`,
  });

  bm.add('timeline', {
    label: 'Timeline (Vertical)',
    category: 'Components',
    content: `
      <div class="timeline">
        <div class="timeline-item">
          <h3>2024 Q1</h3>
          <p>Milestone description</p>
        </div>
        <div class="timeline-item">
          <h3>2024 Q2</h3>
          <p>Next milestone</p>
        </div>
        <div class="timeline-item">
          <h3>2024 Q3</h3>
          <p>Future milestone</p>
        </div>
      </div>`,
  });

  bm.add('timeline-h', {
    label: 'Timeline (Horizontal)',
    category: 'Components',
    content: `
      <div class="timeline-h">
        <div class="timeline-h-item">
          <h3>Phase 1</h3>
          <p>Description</p>
        </div>
        <div class="timeline-h-item">
          <h3>Phase 2</h3>
          <p>Description</p>
        </div>
        <div class="timeline-h-item">
          <h3>Phase 3</h3>
          <p>Description</p>
        </div>
      </div>`,
  });

  bm.add('table', {
    label: 'Table',
    category: 'Components',
    content: `
      <table>
        <thead>
          <tr><th>Category</th><th>Value</th><th>Change</th></tr>
        </thead>
        <tbody>
          <tr><td>Item A</td><td>1,234</td><td>+12%</td></tr>
          <tr><td>Item B</td><td>5,678</td><td>+8%</td></tr>
          <tr class="highlight"><td>Total</td><td>6,912</td><td>+10%</td></tr>
        </tbody>
      </table>`,
  });

  bm.add('agenda', {
    label: 'Agenda',
    category: 'Components',
    content: `
      <div class="agenda">
        <div class="agenda-item">
          <div>
            <div class="head">Topic One</div>
            <div class="desc">Brief description of the first topic</div>
          </div>
        </div>
        <div class="agenda-item">
          <div>
            <div class="head">Topic Two</div>
            <div class="desc">Brief description of the second topic</div>
          </div>
        </div>
        <div class="agenda-item">
          <div>
            <div class="head">Topic Three</div>
            <div class="desc">Brief description of the third topic</div>
          </div>
        </div>
      </div>`,
  });

  bm.add('group-box', {
    label: 'Group Box (Dashed)',
    category: 'Components',
    content: `
      <div class="group-box">
        <span class="group-label">Group Label</span>
        <p>Grouped content goes here. Can contain lists, cards, etc.</p>
      </div>`,
  });

  bm.add('code-preview', {
    label: 'Code Preview',
    category: 'Components',
    content: `
      <div class="code-preview">
        <div class="ttl">example.py</div>
        <pre><span class="kw">def</span> hello():
    <span class="kw">return</span> <span class="str">"Hello, World!"</span></pre>
      </div>`,
  });

  // ── Text Elements ──
  bm.add('heading-h1', {
    label: 'Heading H1',
    category: 'Text',
    content: '<h1>Heading 1</h1>',
  });

  bm.add('heading-h2', {
    label: 'Heading H2',
    category: 'Text',
    content: '<h2>Heading 2</h2>',
  });

  bm.add('heading-h3', {
    label: 'Heading H3',
    category: 'Text',
    content: '<h3>Heading 3</h3>',
  });

  bm.add('paragraph', {
    label: 'Paragraph',
    category: 'Text',
    content: '<p>Your text content goes here. Click to edit.</p>',
  });

  bm.add('divider', {
    label: 'Divider',
    category: 'Text',
    content: '<div class="divider"></div>',
  });

  bm.add('divider-accent', {
    label: 'Accent Divider',
    category: 'Text',
    content: '<div class="divider accent"></div>',
  });

  // ── Backgrounds ──
  bm.add('bg-warm', {
    label: 'BG: Warm Gradient',
    category: 'Backgrounds',
    content: { type: 'text', content: 'Apply .bg-warm to a slide' },
    attributes: { title: 'Add bg-warm class to slide' },
  });

  bm.add('bg-cool', {
    label: 'BG: Cool Gradient',
    category: 'Backgrounds',
    content: { type: 'text', content: 'Apply .bg-cool to a slide' },
    attributes: { title: 'Add bg-cool class to slide' },
  });

  bm.add('bg-blend', {
    label: 'BG: Blend Gradient',
    category: 'Backgrounds',
    content: { type: 'text', content: 'Apply .bg-blend to a slide' },
    attributes: { title: 'Add bg-blend class to slide' },
  });

  bm.add('bg-dark', {
    label: 'BG: Dark Gradient',
    category: 'Backgrounds',
    content: { type: 'text', content: 'Apply .bg-dark to a slide' },
    attributes: { title: 'Add bg-dark class to slide' },
  });

  bm.add('image', {
    label: 'Image',
    category: 'Media',
    content: `<div class="img-box"><img src="https://placehold.co/800x450/1a1a1a/333?text=Image" alt="image" /></div>`,
  });

  bm.add('video-youtube', {
    label: 'YouTube Video',
    category: 'Media',
    content: `<div style="position:relative;width:640px;height:360px;">
      <iframe width="640" height="360" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="width:100%;height:100%;"></iframe>
    </div>`,
  });

  bm.add('video-file', {
    label: 'Video',
    category: 'Media',
    content: {
      type: 'video',
      src: '',
      style: { width: '640px', height: '360px' },
    },
  });

  // ── Free Boxes (text editable, colored, draggable) ──
  bm.add('textbox', {
    label: 'Text Box',
    category: 'Boxes',
    content: `<div style="padding:16px 24px;min-width:200px;min-height:60px;background:rgba(68,7,245,.12);border-radius:8px;color:var(--color-fg,#fff);font-size:1.1rem;line-height:1.6;">Click to type here</div>`,
  });

  bm.add('box-solid', {
    label: 'Solid Box',
    category: 'Boxes',
    content: `<div style="padding:20px 28px;min-width:200px;min-height:80px;background:var(--color-accent,#4407F5);border-radius:8px;color:#fff;font-size:1.2rem;font-weight:600;display:flex;align-items:center;justify-content:center;">Text Here</div>`,
  });

  bm.add('box-outline', {
    label: 'Outline Box',
    category: 'Boxes',
    content: `<div style="padding:16px 24px;min-width:200px;min-height:60px;border:2px solid var(--color-accent,#4407F5);border-radius:8px;color:var(--color-fg,#fff);font-size:1.1rem;line-height:1.6;">Click to type here</div>`,
  });

  bm.add('box-dark', {
    label: 'Dark Box',
    category: 'Boxes',
    content: `<div style="padding:20px 28px;min-width:200px;min-height:80px;background:rgba(0,0,0,.6);border-radius:8px;color:#fff;font-size:1.1rem;line-height:1.6;">Click to type here</div>`,
  });

  bm.add('box-glass', {
    label: 'Glass Box',
    category: 'Boxes',
    content: `<div style="padding:20px 28px;min-width:200px;min-height:80px;background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.15);border-radius:12px;color:#fff;font-size:1.1rem;line-height:1.6;">Click to type here</div>`,
  });

  bm.add('callout', {
    label: 'Callout Box',
    category: 'Boxes',
    content: `<div style="padding:20px 24px;min-width:240px;border-left:4px solid var(--color-accent,#4407F5);background:rgba(68,7,245,.08);border-radius:0 8px 8px 0;color:var(--color-fg,#fff);font-size:1.1rem;line-height:1.7;">Important point or quote goes here</div>`,
  });

  bm.add('circle-number', {
    label: 'Circle Number',
    category: 'Boxes',
    content: `<div style="width:80px;height:80px;border-radius:50%;background:var(--color-accent,#4407F5);color:#fff;font-size:2rem;font-weight:700;display:flex;align-items:center;justify-content:center;">1</div>`,
  });

  bm.add('badge', {
    label: 'Badge / Tag',
    category: 'Boxes',
    content: `<span style="display:inline-block;padding:4px 14px;background:var(--color-accent,#4407F5);color:#fff;border-radius:20px;font-size:.85rem;font-weight:600;letter-spacing:.03em;">Label</span>`,
  });
}
