# RDX Assistant — Dashboard Replica (Create React App version)

Same app, same components, same behavior as the Vite build — ported to run on
`react-scripts` (Create React App) instead.

> **Heads up:** Create React App is no longer maintained by the React team (it was
> removed from the official docs in 2025). This still works today, but if you're not
> tied to CRA for a specific reason, the Vite version will serve you better long-term
> (faster installs, faster dev server, active maintenance).

## What changed vs. the Vite version

| | Vite version | This CRA version |
|---|---|---|
| Dev server | `vite` | `react-scripts start` |
| Entry file | `src/main.jsx` | `src/index.js` |
| HTML template | `index.html` (root) | `public/index.html`, `%PUBLIC_URL%` convention |
| Config | `vite.config.js` | none needed (react-scripts is zero-config) |
| PostCSS/Tailwind config format | ES modules (`export default`) | CommonJS (`module.exports`) |
| Everything else (components, pages, data, index.css, Tailwind classes) | identical | identical |

No component code changed — `App.jsx`, everything in `src/components/`,
`src/pages/`, and `src/data/mockData.js` are byte-for-byte the same files.

## Project structure

```
rdx-assistant-cra/
├── public/
│   └── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── src/
    ├── index.js
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── mockData.js
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Topbar.jsx
    │   ├── CommandPalette.jsx
    │   ├── StatCard.jsx
    │   ├── SetupChecklist.jsx
    │   ├── IntegrationStatusList.jsx
    │   └── ConversationsTable.jsx
    └── pages/
        ├── Overview.jsx
        ├── Integrations.jsx
        └── Placeholder.jsx
```

## Note on a known CRA bug

This project includes a `.env` file with `DISABLE_ESLINT_PLUGIN=true`. Recent
`react-scripts@5.0.1` installs pull in `eslint@8.57+`, which is incompatible with
`eslint-config-react-app`'s Jest override config and causes `npm run build` to fail
with `Environment key "jest/globals" is unknown`. Disabling the built-in ESLint
webpack plugin sidesteps it — this is CRA's own long-standing unresolved issue, not
something introduced by this project. Your editor's ESLint extension (if any) is
unaffected.

## Setup & run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens http://localhost:3000)
npm start

# 3. Production build (outputs to /build)
npm run build
```

Requires Node.js 18+.
