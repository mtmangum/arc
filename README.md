# Austin Rifle Club

Website for the Austin Rifle Club — built with Vue 3, TypeScript, Vite, and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node)

## Getting started

Install dependencies:

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

The site will be available at [http://localhost:5173](http://localhost:5173) with hot module reload.

## Other commands

Type-check and build for production (output in `dist/`):

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Project structure

- `src/views/` — page components, one per route (Home, Calendar, Membership, Join, Ranges, FAQ, Range Rules, Member Area)
- `src/router/` — route definitions
- `src/assets/main.css` — global styles and Tailwind base
- `tailwind.config.js` — Tailwind theme configuration

See [CHANGELOG.md](CHANGELOG.md) for a history of changes.
