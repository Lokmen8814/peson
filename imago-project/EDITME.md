# Editing Guide

This guide explains how to modify the visual styles and text content of the Imago project.

## Modifying Colors and Theme

The global color palette is defined using CSS variables near the top of the main stylesheet.

**File Location:** `css/style.css`

To change the primary accent color or background shades, look for the `:root` block:

```css
:root {
  --primary-gold: #c3a343; /* Change this hex code to modify the accent color globally */
  --bg-dark: #0f1012;     /* Overall background */
  --bg-lighter: #17181c;   /* Component/Card background */
  --text-main: #f0f0f0;    /* Primary typography color */
}
```

## Modifying Website Content

Each page is a distinct static HTML file. Locate the specific file in the root directory to edit text, adjust layouts, or change navigation structures.

- **`index.html`**: Homepage (Hero copy, value propositions)
- **`about.html`**: Company information, team profiles
- **`services.html`**: Core offerings and descriptions
- **`pricing.html`**: Tier structures and cost details
- **`contact.html`**: Contact details and form layout

To edit text, simply open the target HTML file, locate the relevant heading (`<h1>`, `<h2>`) or paragraph (`<p>`) tags, and rewrite the content between the tags.

## Updating Navigation

If a page name is changed or a new page is added, you must manually update the `<nav>` block in **every** HTML file to ensure the navigation menu remains consistent across the entire site.
