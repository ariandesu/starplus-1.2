# STAR PLUS v1.2 — Astronaut Health & Mission Readiness

A lightweight, zero-dependency dashboard for astronaut health monitoring and mission readiness assessment.

## What's New in v1.2

- **Complete rewrite** in vanilla HTML/CSS/JS — no build step, no framework overhead
- **Multi-role views**: Astronaut self-report, Medical/Clinical staff, Mission Control
- **Modular JS architecture**: icons, data, charts, UI primitives, views, shell, state, app
- **Inline SVG charts** built without external chart libraries
- **Real-time clock** and dynamic rendering engine
- **Full navigation shell** with role-based sidebar and panel routing
- **Wellness & mood tracking** with multi-step assessment flow
- **Radiation monitoring**, vitals, activity, assessments, alerts panels

## Architecture

```
starplus-1.2/
├── index.html          # Entry point
├── css/
│   └── style.css       # All styles (design tokens → components)
├── js/
│   ├── icons.js        # SVG icon paths dictionary
│   ├── data.js         # Mock data constants (crew, vitals, history)
│   ├── charts.js       # SVG sparkline / chart helpers
│   ├── ui.js           # UI primitive renderers (pills, tiles, tables)
│   ├── views-astronaut.js  # Screens 02–12: astronaut-facing views
│   ├── views-staff.js      # Screens 13–15: medical & mission control views
│   ├── shell.js        # Navigation shell, sidebar, topbar, routing
│   ├── state.js        # Mutable state singleton + helpers
│   └── app.js          # render() orchestrator + tick loop
└── HRA_ATTRIBUTION.md  # HRA / BodyParts3D licensing notice
```

## Running Locally

No build step needed. Just open `index.html` in a browser, or serve with any static server:

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

## Deployment

Drop the folder on any static host (GitHub Pages, Cloudflare Pages, Netlify, etc.).

## License

MIT — see LICENSE. For organ model attributions, see `HRA_ATTRIBUTION.md`.

## Previous Version

The v1.0 Next.js + React + Three.js implementation lives at [ariandesu/star-plus](https://github.com/ariandesu/star-plus).
