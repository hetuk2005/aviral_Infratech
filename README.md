# Aviral Infratech Pvt. Ltd. — Real Estate Showcase (MERN-Ready Frontend)

Homepage for **Aviral Infratech Pvt. Ltd.**, showcasing plotted townships, residential & commercial lands near Chaudhary Charan Singh International Airport (Banthra, Khasarwara & Lucknow–Kanpur Road corridor), flexible plot & payment plans, interactive master layout, and vertical site tour reels.

## Quick Start

1. Open `index.html` directly in any browser, **or** run the zero-dependency local server:
   ```bash
   npm start
   ```
   Then open `http://127.0.0.1:4173`.

## MERN Backend Integration Guide

The frontend is decoupled via `js/config.js` and `js/api.js` so you can attach a Node.js + Express + MongoDB backend without rewriting UI logic:

1. Build Express REST endpoints returning matching JSON schemas (see `js/data.js`):
   - `GET /api/lands` — Townships & land parcels
   - `GET /api/plans` — Plot size categories & payment plans
   - `GET /api/layout/:projectId` — Interactive plot-by-plot layout inventory
   - `GET /api/reels` — Vertical site tour & drone reel items (supports MP4 `videoUrl` + poster `thumbnail`)
   - `POST /api/inquiries` — Persists site visit & plot booking leads to MongoDB
2. Update `window.AVIRAL_CONFIG` in `js/config.js`:
   ```js
   USE_REMOTE_API: true,
   API_BASE_URL: 'https://your-express-api.com/api'
   ```
