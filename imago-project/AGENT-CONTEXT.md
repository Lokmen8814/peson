# AGENT-CONTEXT.md — imago-project

> Purpose: Let any AI agent understand, debug, update, and manage this project WITHOUT reading every source file first.

---

## 1. Architecture & Constraints

**System Type**: Pure static website. No build step, no bundler, no framework.

**Tech Stack (exhaustive)**:
- HTML5 (5 page files in root)
- CSS3 (1 stylesheet: `css/style.css`, uses CSS custom properties)
- Vanilla JavaScript (1 script: `js/main.js`, zero dependencies)
- Google Fonts loaded via CDN: `Outfit` (display), `Inter` (body)

**Local Dev**: `node server.js` → native Node.js `http` module serves static files on port 3000. No npm dependencies required.

**Production Hosting**: Vercel (or any static host). `server.js` is NOT used in production.

### Negative Rules (DO NOT)
- DO NOT introduce any npm frontend packages, bundlers, or frameworks (React, Vue, Tailwind, Webpack, Vite, etc.)
- DO NOT add server-side rendering or API routes
- DO NOT change file paths from relative to absolute (all `href`/`src` are relative)
- DO NOT create a build step or output directory

---

## 2. File Map & Single Sources of Truth

```
imago-project/
├── index.html          # Homepage (hero, features, destinations, CTA)
├── about.html          # Company story, values, team
├── services.html       # 6-card service grid + 2 curated packages
├── pricing.html        # 3-tier pricing cards (has inline <style> block)
├── contact.html        # Contact form + info card
├── css/
│   └── style.css       # SINGLE source for all global styles (622 lines)
├── js/
│   └── main.js         # SINGLE source for all interactivity (67 lines)
├── server.js           # Local dev server only (native Node.js http)
├── package.json        # npm metadata, no runtime dependencies
├── README.md           # Human-readable project overview
├── EDITME.md           # Non-technical editing guide
└── TECH-STACK.md       # Technology documentation
```

### CSS Variable Registry (in `css/style.css` `:root`, lines 7–47)

| Variable | Current Value | Controls |
|---|---|---|
| `--color-bg` | `#f5f5f7` | Page background |
| `--color-bg-alt` | `#ffffff` | Alternate section / cards |
| `--color-primary` | `#0ea5e9` | Buttons, links, accents |
| `--color-primary-dark` | `#0284c7` | Button hover state |
| `--color-primary-light` | `#e0f2fe` | Tags, icon backgrounds |
| `--color-text-main` | `#0f172a` | Primary text |
| `--color-text-muted` | `#64748b` | Secondary/descriptive text |
| `--color-border` | `#e8e8ed` | Card/section borders |
| `--font-display` | `'Outfit'` | Headings |
| `--font-body` | `'Inter'` | Body text |
| `--radius-md` | `12px` | Small rounded corners |
| `--radius-lg` | `20px` | Cards, banners |
| `--header-height` | `80px` | Fixed header clearance |

### JS Functionality Registry (`js/main.js`, 67 lines total)

| Feature | Mechanism | DOM Dependency |
|---|---|---|
| Sticky header | `scroll` event → adds `.scrolled` to `#header` | `id="header"` |
| Mobile nav toggle | Click `#navToggle` → toggles `.open` on `#nav` | `id="navToggle"`, `id="nav"` |
| Scroll reveal | `IntersectionObserver` → adds `.active` to `.reveal` elements | `class="reveal"` on any element |

---

## 3. Shared Components & Cascading Update Rules

### Header + Navigation (DUPLICATED in every HTML file)

Location in each file: Lines ~12–26 (inside `<header class="header" id="header">`).

Current nav links:
```html
<a href="index.html" class="nav__link">Home</a>
<a href="about.html" class="nav__link">About</a>
<a href="services.html" class="nav__link">Services</a>
<a href="pricing.html" class="nav__link">Pricing</a>
<a href="contact.html" class="nav__link">Contact</a>
```

The currently active page has class `active` added to its link.

**CASCADING RULE**: When adding/removing/renaming a page, the `<nav>` block must be updated in ALL 5 HTML files simultaneously. Failure to do so breaks site navigation.

### Footer (DUPLICATED in every HTML file)

Location: Near end of each file, inside `<footer class="footer">`.

Contains: 4-column grid (brand, Company links, Explore links, Support links) + bottom bar with copyright and social links.

**CASCADING RULE**: Same as nav — any footer change must propagate to all 5 files.

### Known Inconsistency

The footer logo text is `ahlok` in most files but `LOKbb` in `services.html` line 146. This should be unified.

---

## 4. Page-Specific Structure

### index.html (199 lines)
Sections in order: Hero → Features (3 cards, `grid-3`) → Popular Destinations (3 image-cards) → CTA Banner

### about.html (169 lines)
Sections: Inner Hero → Story (stats: 500K+, 120+, 99%) → Core Values (3 cards) → Team (4 members grid)

### services.html (192 lines)
Sections: Inner Hero → Main Services (6 cards, `grid-3`) → Curated Packages (2 horizontal feature blocks)

### pricing.html (201 lines)
Sections: Inner Hero → Pricing Grid (3 tiers: Explorer/Free, Voyager/$99, Globetrotter/$299)
**Note**: Has its own `<style>` block (lines 8–70) for pricing-specific classes (`.pricing-grid`, `.pricing-card`, `.pricing-features`). These styles are NOT in `style.css`.

### contact.html (123 lines)
Sections: Inner Hero → Contact Module (form on left, info card on right)
**Note**: Contact form has NO submit handler. Button is `type="button"` with no JS logic.

---

## 5. Common Patterns for Agent Operations

### Add a New Page
1. Copy `contact.html` (simplest template).
2. Replace `<main>` content between header and footer.
3. Update `<title>` tag.
4. In the new file's `<nav>`, add `active` class to the new page's link.
5. **In ALL other 5 HTML files**: add a new `<a>` to the `<nav>` block AND update footer links if relevant.

### Add a New Section to an Existing Page
1. Locate the target page's insertion point (between existing `<section>` blocks).
2. Use pattern: `<section class="section">` or `<section class="section section--alt">` for alternating background.
3. Wrap content in `<div class="container">`.
4. Add `class="reveal"` to animate in on scroll.
5. For card grids, use `<div class="grid-3">` with `<div class="modern-card">` children.

### Change Global Color Theme
Edit ONLY `css/style.css` lines 7–47 (`:root` block). No other files need modification.

### Reorder Sections
Cut the entire `<section>...</section>` block and paste at desired position. No other dependencies.

---

## 6. Debug Anchors

| Symptom | Check First |
|---|---|
| White/blank page | HTML syntax error — unclosed tags, missing `</section>` |
| Styles broken globally | `css/style.css` — check `:root` variables and import URL |
| Styles broken on one page only | Check for inline `<style>` blocks in that page's `<head>` (pricing.html has one) |
| Elements not animating in | Verify `class="reveal"` is on the element AND `js/main.js` is loaded (`<script>` tag before `</body>`) |
| Mobile menu not working | Check `id="navToggle"` and `id="nav"` exist in the page's header |
| Nav link not highlighting | Verify `class="nav__link active"` is set on the correct `<a>` tag for that page |
| 404 on a page | File must be in root directory, filename must match `href` exactly (case-sensitive on Linux hosts) |
