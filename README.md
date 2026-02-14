# Zwartbol Industries

A GitHub-powered portfolio and engineering workbench with 27 integrated tools across six disciplines — electronics, mechanical engineering, physics simulation, software development, fabrication, and project planning.

Built as a zero-build single-page application using React 18 (UMD), Tailwind CSS (CDN), and a dark zinc/amber terminal-inspired theme. No npm, no bundler — just open `index.html`.

## Splash Screen

On load, an animated splash screen shows the Black Sphere Industries logo with a pulsing corona glow effect, tilted ring, and fade-in title. It plays for 2 seconds then fades out. When returning from an SSO redirect the splash is skipped instantly so there's no delay after authentication.

![Splash Screen](screenshots/splash-screen.svg)

## Landing Page

Unauthenticated visitors see a company landing page with the site title, a short description, and all 27 tools organized by engineering discipline. Each tool card is clickable and opens the embedded app directly — no sign-in required to use the tools.

![Landing Page](screenshots/landing-page.svg)

## Navigation

Tools are organized into **six engineering disciplines**, each accessible via dropdown menus in the header. Signed-in users also get access to the GitHub project explorer with searchable, sortable project cards.

![Discipline Navigation](screenshots/discipline-nav.svg)

## Authentication

sign-in method:

- **Google SSO** via Firebase Auth — grants admin access based on email whitelist

SSO credentials are forwarded to embedded iframes via `postMessage` so child apps can share the auth context. See [`SSO_INTEGRATION.md`](SSO_INTEGRATION.md) for the iframe protocol.

## Project Explorer

The project explorer is available after sign-in and fetches GitHub repositories as terminal-style cards:

![Portfolio](screenshots/portfolio.svg)

- **Search & filter** by name, description, topic, or language
- **Sort** by recently updated, most stars, or alphabetically
- **Project modal** with full README rendering, syntax-highlighted code viewer, and collapsible file tree
- **Three tabs** — Projects (original repos), Forks, Starred
- **Admin mode** — hide/unhide repos and manage tab visibility via preferences

## Integrated Tools

### Planning (6 tools)

| Tool | Description |
|------|-------------|
| **Scrum Board** | Agile scrum board for project planning |
| **Lab Inventory** | Lab inventory and parts management |
| **Notes** | Note-taking app |
| **ERP** | Enterprise resource planning |
| **ALM** | Application lifecycle management |
| **Requirements** | Requirements management |

### Electrical (4 tools)

| Tool | Description |
|------|-------------|
| **Datasheets** | Multi-source component datasheet search (AllDatasheet, Octopart, DigiKey, Mouser, LCSC, and more) |
| **Circuit Sim** | Interactive circuit simulator ([Falstad](https://www.falstad.com/circuit/circuitjs.html)) |
| **Filter Design Studio** | Analog (RLC) and digital (biquad IIR) filter design with magnitude, phase, pole-zero, and group delay plots |
| **Control Loop Tuner** | PID controller tuning with Bode plots and time-domain response |

![Filter Design Studio](screenshots/filter-designer.svg)

### Mechanical (5 tools)

| Tool | Description |
|------|-------------|
| **Engineering Calculators** | Tribology, bearings, fatigue, and machine design calculators |
| **Gear Design Studio** | Gear design and ratio calculator |
| **Kinematics Studio** | Interactive kinematics and motion analysis (includes Robot Arm Studio alternative) |
| **FEA Studio** | Finite element analysis for mechanical structures |
| **Suspension Analysis** | Suspension geometry visualization and analysis |

### Physics (3 tools)

| Tool | Description |
|------|-------------|
| **Ray Optics** | Interactive ray optics simulator ([phydemo.app](https://phydemo.app/ray-optics/simulator/)) |
| **Magnetic Fields** | Magnetic field visualization and simulation |
| **Vibration Modes** | Vibration mode shapes of beams and structures |

### Software (5 tools)

| Tool | Description |
|------|-------------|
| **Serial Terminal** | Web Serial terminal for communicating with hardware devices |
| **JK BMS App** | JK BMS battery monitor |
| **PQ BMS Monitor** | Monitor Powerqueen LiFePO4 batteries via Bluetooth |
| **Protocol Decoder** | Decode SPI, I2C, UART, and CAN protocol frames |
| **PyLab** | Browser-based Python notebook with NumPy, SciPy, and Matplotlib |

### Fabrication (4 tools)

| Tool | Description |
|------|-------------|
| **Label Designer** | Canvas-based label design with barcodes (CODE128, UPC-A, EAN-13, QR), shapes, layers panel, grid/snap, and PNG export |
| **3D Model Studio** | STL/3MF/AMF/OBJ/G-code viewer with Three.js, IndexedDB storage, and auto-generated thumbnails |
| **G-code Viewer** | CNC toolpath preview and simulation |
| **Woodcut Optimizer** | Optimize cutting layouts for sheet and board stock |

![Label Designer](screenshots/label-designer.svg)

![Datasheet Search](screenshots/datasheets.svg)

![3D Model Studio](screenshots/model-library.svg)

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI Framework | React 18 (UMD — no build step) |
| Styling | Tailwind CSS (CDN) |
| Fonts | Inter (UI), JetBrains Mono (code/headings) |
| Icons | Lucide Icons |
| Markdown | marked.js + highlight.js |
| Auth | Firebase Auth (Google SSO + password) |
| Database | Firebase Firestore (GitHub cache, feedback) |
| Offline | Service worker (`sw.js`) |

All integrated tools are self-contained apps hosted on separate GitHub Pages repositories and embedded via iframe. The portfolio itself is a single `index.html` file with no local dependencies beyond the service worker.

## Getting Started

Clone the repo and open `index.html` in a browser, or serve with any static file server:

```sh
python3 -m http.server 8080
```

Configure your GitHub username and preferences in the `CONFIG` object at the top of `index.html`.

## Release Notes

The portfolio footer includes an expandable **Release Notes** panel that shows version history per git commit hash, grouped by date. Each entry links to the corresponding GitHub commit.

A full changelog is maintained in [`RELEASES.md`](RELEASES.md).

The `VERSION_HISTORY` array in `index.html` drives the in-app display, while the pre-commit hook (`.githooks/pre-commit`) auto-updates `BUILD_COMMIT` and `BUILD_DATE` on each commit.

## Project Structure

```
home/
├── index.html          # Main React SPA (single file, ~2700 lines)
├── sw.js               # Service worker for offline caching
├── firebase.json       # Firebase hosting configuration
├── firestore.rules     # Firestore security rules
├── screenshots/        # SVG mockups for documentation
├── RELEASES.md         # Full release history
├── SSO_INTEGRATION.md  # Iframe SSO protocol docs
├── claude.md           # Development guidelines
├── styling-guide.md    # Design system reference
└── .githooks/
    └── pre-commit      # Auto-updates BUILD_COMMIT and BUILD_DATE
```

All 27 integrated tools are hosted externally on GitHub Pages as separate repositories under the `arnoutzw` account.
