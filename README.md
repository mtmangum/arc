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

### Environment setup

The calendar (public read, admin write) is backed by [Supabase](https://supabase.com). To run the app with real data:

1. Create a Supabase project.
2. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your project's **Settings → API** page.
3. Run [supabase/schema.sql](supabase/schema.sql) once in the Supabase SQL Editor to create the `calendar_events` table, RLS policies, and seed data.
4. Create an admin user under **Authentication → Users** to sign in at `/admin/login`.

Without this, the app still boots but calendar data won't load and the admin page won't work.

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
