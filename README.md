# Imago Project

A responsive static website for Imago Leisure, built with a dark theme and gold accents.

## Tech Stack

- HTML5
- CSS3 (Vanilla CSS, variables, flexbox/grid)
- JavaScript (Vanilla, DOM manipulation)

## Local Development

You can run this project locally using the configured Node.js server to preview it exactly as it would appear when hosted.

### Prerequisites
- Node.js installed

### Steps
1. Open your terminal in the project directory.
2. Start the local server:
   ```bash
   node server.js
   ```
3. Open a web browser and visit `http://localhost:3000`.

## Production Deployment

This project consists of pure static files and is optimized for platforms like Vercel, Netlify, or Cloudflare Pages.

### Deploying to Vercel

1. Push your project code to a Git repository (GitHub, GitLab, etc.).
2. Go to your Vercel dashboard and select **Add New > Project**.
3. Import your designated Git repository.
4. **Important**: Since this is a static site, you don't need the `server.js` file for Vercel. Vercel will identify it automatically. Leave the "Build Command" and "Output Directory" default or empty.
5. Click **Deploy**.
