# GreenNest

GreenNest is a responsive UI/UX prototype for an eco-friendly online shop. It demonstrates product discovery, shopping, rewards, customer reviews, and recycling pickup flows.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available commands

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

## Prototype features

- Browse products by category or material, search the catalog, and sort by price or name.
- View product details, add products to favorites, and manage cart quantities (up to 10 per product).
- Submit product reviews with a star rating. Reviews are saved in the current browser on the current device.
- Complete the demo checkout and view order details, GreenPoints, reward redemptions, and recycling pickup status in the profile.
- Switch between light and dark themes; the selected theme is saved in the current browser.
- Schedule a recycling pickup and attach it to the next order delivery.

## Prototype limitations

This project is a front-end prototype and has no backend. Account, cart, order, points, and pickup data are held in app memory and may reset when the page reloads or the user signs out. Product reviews and the theme choice use browser local storage and do not sync across devices. Payment methods are demonstration UI only; no payment is processed.

## Project structure

- `src/` — React pages, components, context, styles, and local product assets.
- `index.html` — Vite application entry page.
- `vite.config.ts` — Vite and React configuration.
- `tsconfig*.json` — TypeScript configuration.
- `vercel.json` — Rewrites application routes to the SPA entry point for Vercel deployments.
- `.oxlintrc.json` — Oxlint configuration.

Product images are stored locally in `src/assets` and bundled with the site.
