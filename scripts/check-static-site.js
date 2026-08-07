#!/usr/bin/env bun

/*
 * Usage: bun scripts/check-static-site.js [site-directory]
 *
 * This workshop deck opens directly in a browser. Bun's HTMLRewriter checks
 * the public shell and runtime hooks without adding a build or dependencies.
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || process.cwd());
const rootRealpath = (() => {
  try {
    return fs.realpathSync(root);
  } catch {
    return root;
  }
})();
const failures = [];

function isInside(candidate, base) {
  return candidate === base || candidate.startsWith(`${base}${path.sep}`);
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function localTarget(raw) {
  const value = decodeHtmlEntities(raw.trim());
  if (!value || value.startsWith("#") || value.startsWith("//")) return null;
  if (value.startsWith("/")) return { error: "root-relative", value };

  try {
    if (new URL(value).protocol) return null;
  } catch {
    // Relative references are expected here.
  }

  const target = value.split(/[?#]/, 1)[0];
  return target ? { target } : null;
}

function resolvedTarget(candidate, allowIndexedDirectory) {
  let stat;
  try {
    stat = fs.statSync(candidate);
  } catch {
    return null;
  }
  if (stat.isFile()) return candidate;
  if (!allowIndexedDirectory || !stat.isDirectory()) return null;
  const indexPath = path.join(candidate, "index.html");
  try {
    return fs.statSync(indexPath).isFile() ? indexPath : null;
  } catch {
    return null;
  }
}

function realpathInsideRoot(candidate) {
  try {
    return isInside(fs.realpathSync(candidate), rootRealpath);
  } catch {
    return false;
  }
}

function checkReference(sourcePath, raw, kind, allowIndexedDirectory) {
  const reference = localTarget(raw);
  if (!reference) return;
  const source = path.relative(root, sourcePath);

  if (reference.error === "root-relative") {
    failures.push(`${source} uses a root-relative Pages path: ${raw}`);
    return;
  }

  const candidate = path.resolve(path.dirname(sourcePath), reference.target);
  if (!isInside(candidate, root)) {
    failures.push(`${source} references a path outside the site: ${raw}`);
    return;
  }
  const resolved = resolvedTarget(candidate, allowIndexedDirectory);
  if (!resolved) {
    failures.push(`${source} references missing local ${kind}: ${raw}`);
    return;
  }
  if (!realpathInsideRoot(resolved)) {
    failures.push(`${source} resolves outside the site via symlink: ${raw}`);
  }
}

function checkCssAssets(cssPath, source) {
  const cleanSource = source.replace(/\/\*[\s\S]*?\*\//g, "");
  const urls = /\burl\(\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^)]*?))\s*\)/gi;
  let match;
  while ((match = urls.exec(cleanSource)) !== null) {
    checkReference(cssPath, match[1] ?? match[2] ?? match[3], "CSS asset", false);
  }
}

function checkHtml(htmlPath, source) {
  const rewriter = new HTMLRewriter();
  const requiredHooks = [
    ["#slide-announce", "#slide-announce"],
    ["#nav-current", "#nav-current"],
    ["#nav-total", "#nav-total"],
    ["#arrow-prev", "#arrow-prev"],
    ["#arrow-next", "#arrow-next"],
    ["#scrubber-container", "#scrubber-container"],
    ["#logoWatermark", "#logoWatermark"],
    ["#nav-bar", "#nav-bar"],
    [".scrubber-track", ".scrubber-track"],
    [".scrubber-thumb", ".scrubber-thumb"],
  ].map(([selector, label]) => ({ selector, label, found: false }));

  for (const hook of requiredHooks) {
    rewriter.on(hook.selector, { element() { hook.found = true; } });
  }

  let slideCount = 0;
  rewriter.on(".slide", {
    element(element) {
      slideCount += 1;
      if (!element.getAttribute("aria-label")) {
        failures.push("a .slide element is missing its aria-label");
      }
    },
  });

  rewriter.on("[src], [href]", {
    element(element) {
      const tagName = element.tagName.toLowerCase();
      const allowIndexedDirectory = tagName === "a" || tagName === "area";
      const src = element.getAttribute("src");
      const href = element.getAttribute("href");
      if (src !== null) checkReference(htmlPath, src, "asset", false);
      if (href !== null) checkReference(htmlPath, href, "asset", allowIndexedDirectory);
    },
  });

  const lightboxes = [];
  rewriter.on("#lightbox", {
    element(element) {
      const state = { image: false, caption: false, close: false };
      lightboxes.push(state);
      element.onEndTag(() => {
        if (!state.image) failures.push("#lightbox is missing its image child");
        if (!state.caption) failures.push("#lightbox is missing its .lightbox-caption child");
        if (!state.close) failures.push("#lightbox is missing its .lightbox-close child");
        lightboxes.pop();
      });
    },
  });
  rewriter.on("#lightbox img", { element() { const state = lightboxes.at(-1); if (state) state.image = true; } });
  rewriter.on("#lightbox .lightbox-caption", { element() { const state = lightboxes.at(-1); if (state) state.caption = true; } });
  rewriter.on("#lightbox .lightbox-close", { element() { const state = lightboxes.at(-1); if (state) state.close = true; } });

  const carousels = [];
  rewriter.on(".carousel", {
    element(element) {
      const state = { items: 0, dots: false };
      carousels.push(state);
      element.onEndTag(() => {
        if (state.items > 1 && !state.dots) {
          failures.push("a multi-item carousel is missing its .carousel-dots container");
        }
        carousels.pop();
      });
    },
  });
  rewriter.on(".carousel .carousel-item", { element() { const state = carousels.at(-1); if (state) state.items += 1; } });
  rewriter.on(".carousel .carousel-dots", { element() { const state = carousels.at(-1); if (state) state.dots = true; } });

  rewriter.transform(source);

  if (slideCount === 0) failures.push("index.html has no .slide elements");
  for (const hook of requiredHooks) {
    if (!hook.found) failures.push(`index.html is missing required deck hook: ${hook.label}`);
  }
}

const htmlPath = path.join(root, "index.html");
if (!fs.existsSync(htmlPath)) {
  failures.push("index.html is missing");
} else {
  checkHtml(htmlPath, fs.readFileSync(htmlPath, "utf8"));
}

const cssDirectory = path.join(root, "css");
if (fs.existsSync(cssDirectory)) {
  for (const entry of fs.readdirSync(cssDirectory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".css")) continue;
    const cssPath = path.join(cssDirectory, entry.name);
    checkCssAssets(cssPath, fs.readFileSync(cssPath, "utf8"));
  }
}

if (failures.length > 0) {
  console.error("Static site check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("Static site check passed (local HTML/CSS assets, public deck shell, and runtime hooks).");
}
