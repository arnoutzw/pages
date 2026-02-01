# Lab Inventory

A Progressive Web App (PWA) for managing electronics lab inventory with QR code support.

## Features

- **Box-based Organization**: Organize items in labeled storage boxes (KUGGIS, FJÄLLA, etc.)
- **QR Code Scanning**: Scan QR codes to quickly find boxes
- **QR Code Printing**: Print QR labels via CUPS/system printer
  - Batch printing for multiple boxes
  - Configurable label sizes (38x21mm, 50x30mm, 62x40mm)
  - Multiple copies per label
- **Category Filtering**: Filter by Electronics, 3D Printing, Mechanical, or Other
- **Low Stock Alerts**: Configurable threshold warnings
- **Offline Support**: Works without internet connection (PWA)
- **Mobile Optimized**: Touch-friendly interface with safe area support

## Usage

### Quick Start

1. Open `index.html` in a modern browser
2. Install as PWA for mobile use (Add to Home Screen)

### Navigation

- **Boxes View**: Grid of all storage boxes, click to see items
- **Items View**: Searchable list of all items with quick quantity controls

### Header Buttons

| Button | Action |
|--------|--------|
| 📷 | Scan QR code |
| 📦 | Add new box |
| 🖨️ | Print QR labels |
| ➕ | Add new item |
| ⚙️ | Settings |

### Printing QR Labels

1. Click 🖨️ in the header
2. Select boxes to print
3. Choose label size and copies
4. Click "Print Labels"
5. Select your CUPS printer in the print dialog

### Data Management

- **Export**: Download inventory as JSON
- **Import**: Load inventory from JSON file
- **Reset**: Clear all data and reload defaults

## File Structure

```
lab-inventory/
├── index.html              # Main application
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline support
├── icon-192.png            # App icon (192x192)
├── icon-512.png            # App icon (512x512)
├── inventory_database.json # Default inventory data
└── README.md               # This file
```

## Technical Details

- **Frontend**: React 18, Tailwind CSS
- **QR Codes**: qrcodejs (generation), html5-qrcode (scanning)
- **Storage**: Browser localStorage
- **Printing**: Browser print dialog (works with CUPS)

## Box Label Format

QR codes encode: `INVBOX:{box_label}` (e.g., `INVBOX:KS-01`)

### Box Prefixes

| Prefix | Box Type |
|--------|----------|
| KS | KUGGIS 13×18×8 |
| KF | KUGGIS 18×26×8 |
| KM | KUGGIS 18×26×15 |
| KT | KUGGIS 26×35×15 |
| FD | FJÄLLA Doos |
| FH | FULLSMOCKAD |
| LV | LÄTTVIST |

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (iOS/macOS)

## License

MIT
