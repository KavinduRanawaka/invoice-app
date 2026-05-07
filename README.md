# Invoice Generator

A clean, professional React invoice generator with live preview and PDF export.

## Features
- Live invoice preview as you type
- Add / remove line items with auto-calculated totals
- Tax rate support
- Multiple currencies (USD, EUR, GBP, LKR)
- Download invoice as PDF (A4)
- Responsive layout

## Project Structure

```
invoice-app/
├── index.html                        # App entry HTML
├── vite.config.js                    # Vite config
├── package.json
└── src/
    ├── main.jsx                      # ReactDOM root render
    ├── App.jsx                       # Root component (layout)
    ├── App.module.css                # Two-panel layout styles
    ├── index.css                     # Global styles + CSS variables
    │
    ├── hooks/
    │   └── useInvoice.js             # All invoice state + logic
    │
    ├── utils/
    │   └── pdfExport.js              # PDF generation + currency formatter
    │
    └── components/
        ├── InvoiceForm.jsx           # Left panel: all input fields
        ├── InvoiceForm.module.css
        ├── LineItems.jsx             # Dynamic add/remove line items
        ├── LineItems.module.css
        ├── InvoicePreview.jsx        # Right panel: styled invoice
        └── InvoicePreview.module.css
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```

## How It Works

1. **`useInvoice` hook** — holds all invoice state (business info, client, items, tax).
   Every field change flows through `update()`, `updateItem()`, `addItem()`, or `removeItem()`.

2. **`InvoiceForm`** — renders all the input fields. Calls the hook's update functions on change.

3. **`LineItems`** — handles the dynamic table of items with add/remove buttons.

4. **`InvoicePreview`** — renders a pixel-perfect invoice layout from the current state.
   This is the element captured by `html2canvas` for PDF export.

5. **`pdfExport.js`** — captures the preview with `html2canvas`, feeds it to `jsPDF`, and triggers download.

## Dependencies

| Package | Purpose |
|---|---|
| react, react-dom | UI framework |
| jspdf | PDF generation |
| html2canvas | Capture DOM as canvas for PDF |
| vite | Build tool + dev server |
