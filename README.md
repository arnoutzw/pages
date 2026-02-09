# Zwartbol Industries

A GitHub-powered portfolio and engineering workbench with 27 integrated tools across six disciplines — electronics, mechanical engineering, physics simulation, software development, fabrication, and project planning.

Built as a zero-build single-page application using React 18 (UMD), Tailwind CSS (CDN), and a dark zinc/amber terminal-inspired theme. No npm, no bundler — just open `index.html`.

![Portfolio](screenshots/portfolio.svg)

## Navigation

Tools are organized into **six engineering disciplines**, each accessible via dropdown menus in the header. The main view shows your GitHub repositories as searchable, sortable project cards.

![Discipline Navigation](screenshots/discipline-nav.svg)

## Project Explorer

The default view fetches GitHub repositories and displays them as terminal-style cards:

- **Search & filter** by name, description, topic, or language
- **Sort** by recently updated, most stars, or alphabetically
- **Project modal** with full README rendering, syntax-highlighted code viewer, and collapsible file tree
- **Three tabs** — Projects (original repos), Forks, Starred
- **Admin mode** — password-protected login to hide/unhide repos and manage preferences

## Integrated Tools

### Planning (5 tools)

| Tool | Description |
|------|-------------|
| **Scrum Board** | Agile scrum board for project planning |
| **Lab Inventory** | Electronics component inventory with QR scanning, photo uploads, and batch label printing |
| **Notes** | Note-taking app |
| **ERP** | Enterprise resource planning |
| **Invoice Maker** | Create and manage invoices |

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
| **Gear Calculator** | Gear design and ratio calculator |
| **Kinematics Studio** | Interactive kinematics and motion analysis (includes Robot Arm Studio alternative) |
| **FEA Studio** | Finite element analysis for mechanical structures |
| **Suspension Viz** | Suspension geometry visualization and analysis |

### Physics (3 tools)

| Tool | Description |
|------|-------------|
| **Ray Optics** | Interactive ray optics simulator ([phydemo.app](https://phydemo.app/ray-optics/simulator/)) |
| **Magnetic Fields** | Magnetic field visualization and simulation |
| **Vibration Modes** | Vibration mode shapes of beams and structures |

### Software (6 tools)

| Tool | Description |
|------|-------------|
| **Serial Terminal** | Web Serial terminal for communicating with hardware devices |
| **JK BMS App** | JK BMS battery monitor |
| **PQ BMS Monitor** | Monitor Powerqueen LiFePO4 batteries via Bluetooth |
| **Protocol Decoder** | Decode SPI, I2C, UART, and CAN protocol frames |
| **PyLab** | Browser-based Python notebook with NumPy, SciPy, and Matplotlib |
| **Pictor** | Image management platform |

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
├── index.html          # Main React SPA (single file, ~2300 lines)
├── sw.js               # Service worker for offline caching
├── firebase.json       # Firebase hosting configuration
├── firestore.rules     # Firestore security rules
├── screenshots/        # SVG mockups for documentation
├── RELEASES.md         # Full release history
├── claude.md           # Development guidelines
├── styling-guide.md    # Design system reference
└── .githooks/
    └── pre-commit      # Auto-updates BUILD_COMMIT and BUILD_DATE
```

All 27 integrated tools are hosted externally on GitHub Pages as separate repositories under the `arnoutzw` account.
