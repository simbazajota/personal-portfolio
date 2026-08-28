# Personal Portfolio

A lightweight, fast, single-page portfolio site showcasing projects and contact details.

## Structure
- `index.html` main page
- `css/` global styles, layout, and responsive queries
- `js/main.js` entry point; imports and initializes the modules below
- `js/modules/` one file per feature (`map`, `theme`, `filter`, `contact-form`, `weather`, `spotify`)
- `assets/images/` images used across the site
- `favicons/` favicon and PWA manifest assets

## Run locally
`js/main.js` is loaded as an ES module (`<script type="module">`), so it needs to be served over
`http(s)://` — browsers block module imports from `file://`. Opening `index.html` directly by
double-clicking it will load the page but not the JS. Serve the folder instead, e.g.:

```bash
npx serve .
```

Then open the local URL it prints.

## Local preview with Netlify Functions (Spotify)
If you want the Spotify card to work locally, use Netlify CLI so functions are available.

```bash
npm install -g netlify-cli
netlify dev
```

Then open the local URL Netlify prints in the terminal.

## Update content
- Edit project cards in `index.html`
- Update styling in `css/style.css`, `css/layout.css`, `css/queries.css`
- Update behavior in the relevant file under `js/modules/`

## License
Personal use.
