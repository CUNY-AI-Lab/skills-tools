#!/usr/bin/env bun

/*
 * Usage: bun scripts/check-static-site.js [site-directory]
 *
 * This workshop deck opens directly in a browser, so the check uses only
 * Bun's built-in APIs. It verifies local HTML/CSS assets, the public deck
 * shell, and unguarded runtime hooks used by the deck scripts.
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
    const parsed = new URL(value);
    if (parsed.protocol) return null;
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

function scanTag(source, start) {
  if (source[start] !== "<") return null;
  let quote = null;
  for (let index = start + 1; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (character === quote) quote = null;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === ">") {
      return { text: source.slice(start, index + 1), end: index + 1 };
    }
  }
  return null;
}

function tagName(tag) {
  return tag.match(/^<\/?([a-z][\w:-]*)/i)?.[1]?.toLowerCase() || null;
}

function isClosingTag(tag) {
  return /^<\//.test(tag);
}

function findClosingTag(source, start, name) {
  let index = start;
  while ((index = source.indexOf("<", index)) >= 0) {
    const tag = scanTag(source, index);
    if (!tag) return source.length;
    if (isClosingTag(tag.text) && tagName(tag.text) === name) return tag.end;
    index = tag.end;
  }
  return source.length;
}

function stripHtmlDecoys(source) {
  let clean = "";
  let index = 0;
  while (index < source.length) {
    if (source.startsWith("<!--", index)) {
      const end = source.indexOf("-->", index + 4);
      index = end < 0 ? source.length : end + 3;
      continue;
    }
    if (source[index] !== "<") {
      clean += source[index];
      index += 1;
      continue;
    }

    const tag = scanTag(source, index);
    if (!tag) {
      clean += source[index];
      index += 1;
      continue;
    }
    clean += tag.text;
    const name = tagName(tag.text);
    index = !isClosingTag(tag.text) && (name === "script" || name === "style")
      ? findClosingTag(source, tag.end, name)
      : tag.end;
  }
  return clean;
}

function attributes(tag) {
  const parsed = [];
  const pattern = /([a-z_:][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;
  let match;
  while ((match = pattern.exec(tag)) !== null) {
    parsed.push({ name: match[1].toLowerCase(), value: match[2] ?? match[3] ?? match[4] });
  }
  return parsed;
}

function attribute(tag, name) {
  return attributes(tag).find((entry) => entry.name === name)?.value;
}

function hasClass(tag, name) {
  return attribute(tag, "class")?.split(/\s+/).includes(name) || false;
}

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
  // stripHtmlDecoys removes their bodies, so treat these as void here.
  "script",
  "style",
]);

function parseHtml(source) {
  const cleanSource = stripHtmlDecoys(source);
  const elements = [];
  const stack = [];
  let index = 0;

  while (index < cleanSource.length) {
    const start = cleanSource.indexOf("<", index);
    if (start < 0) break;
    const tag = scanTag(cleanSource, start);
    if (!tag) {
      index = start + 1;
      continue;
    }
    const text = tag.text;
    const closing = /^<\//.test(text);
    const name = tagName(text);
    index = tag.end;
    if (!name) continue;

    if (closing) {
      const stackIndex = stack.findLastIndex((element) => element.name === name);
      if (stackIndex >= 0) stack.length = stackIndex;
      continue;
    }

    const element = { index: start, name, text, children: [] };
    const parent = stack.at(-1);
    if (parent) parent.children.push(element);
    elements.push(element);

    if (!VOID_ELEMENTS.has(name) && !/\/\s*>$/.test(text)) stack.push(element);
  }

  return { cleanSource, elements };
}

function descendants(element) {
  const result = [];
  const visit = (current) => {
    for (const child of current.children) {
      result.push(child);
      visit(child);
    }
  };
  visit(element);
  return result;
}

function checkHtmlAssets(htmlPath, elements) {
  for (const element of elements) {
    const { text } = element;
    for (const entry of attributes(text)) {
      if (entry.name === "src" || entry.name === "href") {
        const allowIndexedDirectory =
          entry.name === "href" && (element.name === "a" || element.name === "area");
        checkReference(htmlPath, entry.value, "asset", allowIndexedDirectory);
      }
    }
  }
}

function checkCssAssets(cssPath, source) {
  const urls = /\burl\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi;
  const cleanSource = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let match;
  while ((match = urls.exec(cleanSource)) !== null) {
    checkReference(cssPath, match[1] ?? match[2] ?? match[3], "CSS asset", false);
  }
}

function checkDeckStructure(elements) {
  const slideTags = elements.filter((element) => hasClass(element.text, "slide"));

  if (slideTags.length === 0) failures.push("index.html has no .slide elements");
  for (const { text } of slideTags) {
    if (!/\baria-label\s*=\s*(?:"[^"]+"|'[^']+'|[^\s"'=<>`]+)/i.test(text)) {
      failures.push("a .slide element is missing its aria-label");
    }
  }

  const requiredIds = [
    "slide-announce",
    "nav-current",
    "nav-total",
    "arrow-prev",
    "arrow-next",
    "scrubber-container",
    "logoWatermark",
    "nav-bar",
  ];
  for (const id of requiredIds) {
    if (!elements.some(({ text }) => attribute(text, "id") === id)) {
      failures.push(`index.html is missing required deck hook: #${id}`);
    }
  }

  for (const className of ["scrubber-track", "scrubber-thumb"]) {
    if (!elements.some(({ text }) => hasClass(text, className))) {
      failures.push(`index.html is missing required deck hook: .${className}`);
    }
  }

  const lightbox = elements.find(({ text }) => attribute(text, "id") === "lightbox");
  if (lightbox) {
    const lightboxTags = descendants(lightbox);
    if (!lightboxTags.some(({ name }) => name === "img")) {
      failures.push("#lightbox is missing its image child");
    }
    for (const className of ["lightbox-caption", "lightbox-close"]) {
      if (!lightboxTags.some(({ text }) => hasClass(text, className))) {
        failures.push(`#lightbox is missing its .${className} child`);
      }
    }
  }

  const carousels = elements.filter(({ text }) => hasClass(text, "carousel"));
  carousels.forEach((carousel) => {
    const carouselChildren = descendants(carousel);
    const itemCount = carouselChildren.filter(({ text }) => hasClass(text, "carousel-item")).length;
    if (itemCount > 1 && !carouselChildren.some(({ text }) => hasClass(text, "carousel-dots"))) {
      failures.push("a multi-item carousel is missing its .carousel-dots container");
    }
  });
}

const htmlPath = path.join(root, "index.html");
if (!fs.existsSync(htmlPath)) {
  failures.push("index.html is missing");
} else {
  const source = fs.readFileSync(htmlPath, "utf8");
  const parsed = parseHtml(source);
  checkHtmlAssets(htmlPath, parsed.elements);
  checkDeckStructure(parsed.elements);
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
