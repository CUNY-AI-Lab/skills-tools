/* widgets.js — Emoji → SVG Primitives
   Zero-dependency vanilla JS. Replaces data-widget attributes with inline SVGs.
   Sizes scale from inherited font-size (1em). Colors from CSS custom properties. */

(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function svg(tag, attrs, parent) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }

  function root(el, vb) {
    var s = svg('svg', {
      viewBox: vb,
      width: '1em',
      height: '1em',
      fill: 'none',
      role: 'img',
      'aria-hidden': 'true',
      style: 'display:inline-block;vertical-align:middle;'
    });
    el.appendChild(s);
    return s;
  }

  // ── Style injection (once) ──────────────────────────────────
  function injectStyles() {
    if (document.getElementById('widget-primitives-css')) return;
    var style = document.createElement('style');
    style.id = 'widget-primitives-css';
    style.textContent = [
      '@keyframes widget-pulse{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.55;transform:scale(1.08)}}',
      '@keyframes widget-draw{to{stroke-dashoffset:0}}',
      '.widget-pulse-ring{animation:widget-pulse 2.8s ease-in-out infinite}',
      '.widget-pulse-ring-outer{animation:widget-pulse 2.8s ease-in-out infinite;animation-delay:.4s}',
      '.widget-check-draw{stroke-dasharray:32;stroke-dashoffset:32;animation:widget-draw .5s ease-out .15s forwards}',
      '@media(prefers-reduced-motion:reduce){.widget-pulse-ring,.widget-pulse-ring-outer,.widget-check-draw{animation:none;opacity:.4;stroke-dashoffset:0}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  // ── Registry ────────────────────────────────────────────────

  var REGISTRY = {};

  // 🤖 Pulsing orbital — concentric rings + center dot
  REGISTRY['robot'] = function (el) {
    var s = root(el, '0 0 40 40');
    var color = 'var(--accent-cyan, #4ECDC4)';
    svg('circle', { cx: 20, cy: 20, r: 4, fill: color }, s);
    var r1 = svg('circle', { cx: 20, cy: 20, r: 11, stroke: color, 'stroke-width': 1.5, opacity: .35 }, s);
    r1.classList.add('widget-pulse-ring');
    var r2 = svg('circle', { cx: 20, cy: 20, r: 18, stroke: color, 'stroke-width': 1, opacity: .2 }, s);
    r2.classList.add('widget-pulse-ring-outer');
  };

  // 👤 Silhouette badge — head circle + shoulder arc
  REGISTRY['person'] = function (el) {
    var s = root(el, '0 0 40 40');
    var color = 'var(--accent-blue, #3B6FB5)';
    svg('circle', { cx: 20, cy: 14, r: 7, fill: color, opacity: .6 }, s);
    svg('path', { d: 'M6 36 Q6 24 20 24 Q34 24 34 36', fill: color, opacity: .45 }, s);
  };

  // ✅ Animated checkmark — draws on via stroke-dashoffset
  REGISTRY['check-animated'] = function (el) {
    var s = root(el, '0 0 40 40');
    var color = 'var(--accent-green, #5B8A6F)';
    svg('circle', { cx: 20, cy: 20, r: 18, stroke: color, 'stroke-width': 1.5, opacity: .2 }, s);
    var p = svg('path', {
      d: 'M11 21 L17 27 L29 14',
      stroke: color,
      'stroke-width': 3.5,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, s);
    p.classList.add('widget-check-draw');
  };

  // ✓ Static tick — two-line check, inherits color
  REGISTRY['check'] = function (el) {
    var s = root(el, '0 0 40 40');
    svg('path', {
      d: 'M10 21 L17 28 L30 13',
      stroke: 'currentColor',
      'stroke-width': 3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, s);
  };

  // ← Left chevron
  REGISTRY['arrow-left'] = function (el) {
    var s = root(el, '0 0 40 40');
    svg('path', {
      d: 'M25 8 L13 20 L25 32',
      stroke: 'currentColor',
      'stroke-width': 3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, s);
  };

  // → Right chevron
  REGISTRY['arrow-right'] = function (el) {
    var s = root(el, '0 0 40 40');
    svg('path', {
      d: 'M15 8 L27 20 L15 32',
      stroke: 'currentColor',
      'stroke-width': 3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, s);
  };

  // ── Initializer ─────────────────────────────────────────────

  function initWidgets(scope) {
    injectStyles();
    var container = scope || document;
    var els = container.querySelectorAll('[data-widget]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.hasAttribute('data-widget-init')) continue;
      var type = el.getAttribute('data-widget');
      if (REGISTRY[type]) {
        REGISTRY[type](el);
        el.setAttribute('data-widget-init', '');
      }
    }
  }

  // Auto-init + expose global
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initWidgets(); });
  } else {
    initWidgets();
  }
  window.initWidgets = initWidgets;

})();
