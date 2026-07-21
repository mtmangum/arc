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

### Content editing (Decap CMS)

Most page copy — Home, Ranges, Membership, Range Rules, and FAQ — lives in `src/content/*.json` and is editable without touching code via [Decap CMS](https://decapcms.org) at `/admin`. It's a git-backed CMS: edits made through the admin UI commit directly to `main`, which triggers a normal rebuild.

This requires the site to be deployed on Netlify with Identity + Git Gateway enabled (`public/admin/config.yml` is configured for Netlify's `git-gateway` backend). To set it up on a new Netlify site:

1. Deploy the site to Netlify (connect the GitHub repo; build command `npm run build`, publish directory `dist`).
2. **Site configuration → Identity** → enable Identity, set registration to **Invite only**.
3. Same section → **Services** → enable **Git Gateway**.
4. Identity → **Invite users** → invite each admin by email.
5. They set a password from the invite email and can then log in at `/admin`.

Note: Range ids (`A`, `B`, `H-K`, etc. in `src/content/ranges/`) are fixed in code because the interactive Range Map links to them by id — only each range's name/description/tags are CMS-editable, not the id itself.

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
- `src/content/` — CMS-editable JSON content for Home, Ranges, Membership, Range Rules, and FAQ (see "Content editing" above)
- `src/router/` — route definitions
- `src/assets/main.css` — global styles and Tailwind base
- `tailwind.config.js` — Tailwind theme configuration
- `public/admin/` — Decap CMS admin app (`/admin`)

See [CHANGELOG.md](CHANGELOG.md) for a history of changes.
