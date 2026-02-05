# Maker Portfolio

A sleek, workshop/industrial-themed portfolio website that showcases your GitHub projects. Built with React and styled with Tailwind CSS, it fetches your repos live from the GitHub API and renders README files as project details.

![Preview](https://via.placeholder.com/800x400/18181b/f59e0b?text=Maker+Portfolio)

## Features

- **Live GitHub Integration** — Fetches repos and READMEs directly from GitHub API
- **Workshop/Industrial Theme** — Dark theme with terminal-inspired design and amber accents
- **Responsive Grid Layout** — Cards adapt from 1 to 3 columns based on screen size
- **Search & Filter** — Filter by language, search by name/description/topics
- **Sort Options** — Recently updated, most stars, or alphabetical
- **README Modal** — Click any project to view its rendered README
- **Full Markdown Support** — Powered by marked.js with GFM (tables, task lists, etc.)
- **Syntax Highlighting** — Code blocks highlighted with highlight.js (100+ languages)
- **Copy Code Button** — One-click copying for all code blocks
- **Zero Build Required** — Single HTML file, just configure and deploy

## Quick Start

### 1. Configure Your Username

Open `index.html` and find the CONFIG section near the top:

```javascript
const CONFIG = {
  // Your GitHub username
  GITHUB_USERNAME: 'YOUR_GITHUB_USERNAME',  // ← Change this!

  // Maximum repos to fetch
  MAX_REPOS: 30,

  // Site title
  SITE_TITLE: 'Maker Portfolio',

  // Tagline
  TAGLINE: 'Building things that work (mostly)',

  // Repos to exclude by name
  EXCLUDE_REPOS: [],

  // Only show repos with these topics (empty = show all)
  FILTER_TOPICS: [],

  // Hide forked repos
  HIDE_FORKS: true,
};
```

### 2. Deploy to GitHub Pages

**Option A: Manual Upload**
1. Create a new repository named `your-username.github.io` (or any name)
2. Upload `index.html` to the repo
3. Go to Settings → Pages → Source: Deploy from branch (main)
4. Your site will be live at `https://your-username.github.io/`

**Option B: Using Git**
```bash
# Create a new repo
mkdir maker-portfolio && cd maker-portfolio
git init

# Add the file
cp path/to/index.html .
git add index.html
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/maker-portfolio.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository Settings.

## Customization

### Excluding Specific Repos

```javascript
EXCLUDE_REPOS: ['dotfiles', 'old-project', 'fork-i-dont-want'],
```

### Showing Only Tagged Projects

Add topics to your GitHub repos, then filter:

```javascript
FILTER_TOPICS: ['portfolio', 'maker', 'project'],
```

### Changing the Theme Colors

The site uses Tailwind CSS utility classes. Key color classes to search/replace:
- `amber-500` — Primary accent color (links, highlights)
- `zinc-900` — Card backgrounds
- `zinc-950` — Page background
- `green-400` — Code/terminal text

### Adding a Custom Domain

1. Create a `CNAME` file with your domain:
   ```
   portfolio.yourdomain.com
   ```
2. Configure your DNS to point to GitHub Pages
3. Enable HTTPS in repository settings

## Markdown Rendering

READMEs are rendered using [marked.js](https://marked.js.org/) with full GitHub Flavored Markdown support:

- **Headings** (h1-h6) with styled amber accents
- **Code blocks** with syntax highlighting (highlight.js)
- **Inline code** styled with green monospace
- **Tables** with dark theme styling
- **Task lists** with checkboxes
- **Blockquotes** with amber left border
- **Images** with rounded borders
- **Links** open in new tabs
- **Copy button** on all code blocks

Code blocks support 100+ languages including JavaScript, Python, Rust, Go, TypeScript, and more.

## API Rate Limits

The GitHub API allows 60 requests per hour for unauthenticated requests. For personal portfolios, this is typically sufficient. If you need more:

1. [Create a GitHub Personal Access Token](https://github.com/settings/tokens)
2. Add it to the fetch calls (modify the code to include Authorization header)

**Note:** Never commit tokens to public repos!

## File Structure

```
maker-portfolio/
├── index.html           # Complete portfolio (deploy this!)
├── README.md            # This file
└── maker-portfolio.jsx  # React component (for npm/bundler projects)
```

### Using the JSX Component

If you want to integrate into an existing React project:

```bash
npm install marked highlight.js lucide-react
```

Then import and use the component from `maker-portfolio.jsx`.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Uses:
- ES6+ JavaScript
- CSS Grid/Flexbox
- Fetch API
- CSS backdrop-filter

## License

MIT — Do whatever you want with it!

---

Made with 🔧 by makers, for makers.
