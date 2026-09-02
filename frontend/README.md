# CozyCorner Frontend

React + Vite frontend for the CozyCorner e-commerce app.

See the [main README](../README.md) for full setup, API docs, and project overview.

## Quick start

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`. Requires the backend at `http://localhost:3000`.

## Key files

| File | Purpose |
|------|---------|
| `src/api.js` | Axios instance pointing to backend |
| `src/store.js` | Redux store |
| `src/context/AlertContext.jsx` | Toast notifications (`useAlert`) |
| `src/views/` | Page components |
| `src/components/layout/` | Shared UI (Header, Footer, ProductCard, etc.) |

## Alerts

Use the custom alert hook instead of `react-alert`:

```jsx
import { useAlert } from "../context/AlertContext.jsx";

const alert = useAlert();
alert.success("Done!");
alert.error("Something went wrong");
```
