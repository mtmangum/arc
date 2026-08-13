# Changelog

All notable changes to this project are documented in this file.

## 2026-08-13

### Added
- Ranges page: the range map now shows a side panel (desktop/tablet) listing every range's name and tags, connected to its spot on the map with a leader line that highlights on hover/click — no more scrolling down to see what's what (`b43d49d`)

### Fixed
- Calendar: added the missing `'Range Closure'` entry to `EVENT_TYPE_STYLES`, so Range C maintenance-closure events (which existed in the database) actually render in the list, grid, and legend instead of silently vanishing (`893828a`)

### Changed
- Supabase bootstrap seed data refreshed from the club's current June–August 2026 calendar, replacing the stale June–July snapshot (`58bf376`)
- Added `robots.txt` (disallow all) and a `noindex` meta tag so this Netlify dev deployment stays out of search engines while `austinrifleclub.org` remains the real live site (`0b4d3e7`)

## 2026-07-21

### Added
- Calendar admin: sign-in-gated `/admin/calendar` page to add, edit, and delete events, backed by Supabase instead of localStorage — changes are now real, shared, and require authentication (`46aaf4f`)
- Range Complex Map is now interactive: clickable hotspots over the aerial photo scroll to and highlight the matching range card, with hovering a card highlighting its hotspot back on the map (`60a44ce`)
- Light theme with a header toggle (desktop + mobile), persisted and defaulting to the system's light/dark preference (`430c64c`)
- Decap CMS admin app (`/admin`) so non-developers can edit Home, Ranges, Membership, Range Rules, and FAQ content without touching code — commits directly to `main` via Netlify's git-gateway backend, no database involved (`ea8d899`)

### Fixed
- Numerous light-theme contrast issues: the primary amber accent and several badges/notice boxes were too low-contrast on white; a few fixed-background elements (stats strip, CTA banner, range map hotspots, Member Area logo) needed to stay theme-invariant instead of inverting with the page (`430c64c`)
- Netlify deploy: every route except `/` 404'd because Vue Router's history mode needs a rewrite to `index.html` for client-side routes (`e61d7f2`)
- Netlify Identity invite/recovery emails link to the site root, but the Identity widget was only loaded on `/admin` — the invite token went unnoticed and no password prompt appeared (`b6e7f1d`)

### Documentation
- README now documents the Supabase environment setup needed to run the app with real calendar data (`6ce028b`)
- README now documents the Decap CMS setup: what's editable, the Netlify Identity/Git Gateway steps, and the range-id caveat (`c3606c9`)

### Fixed
- Mini-calendars now anchor to the actual current month instead of a hardcoded month/year, so the default view always shows the real current month and next month (`1a7b17e`)

### Changed
- Stopped tracking `node_modules` and `.DS_Store`; added `.gitignore` (`cfa9707`, `4d7f6de`)

## 2026-07-20

### Added
- Prev/next month navigation arrows on the mini-calendars, with the event list and heading filtered to the two displayed months (`b02f806`)
- Interactive event calendar with color-coded event days and links to event pages (`eafdbcc`)
- Hover tooltip on calendar dates listing that day's events, color-coded by type (`30ceaed`)
- Legend badges double as filter toggles: click to show/hide an event type across the event list and mini-calendar highlighting (`1180f66`)
- Double-click a legend badge to isolate that event type (hide all others); double-click again to restore (`c40342b`)

### Changed
- Redesigned the site from a tech-company look to an outdoor gun range aesthetic: earthy amber/bronze color scheme, Georgia serif typography, bordered "rugged" buttons, restyled header/footer/cards, clickable smooth-scroll arrow, local logo asset (`19c7849`)
- Calendar layout now responsive on small screens: mini calendars and legend stack vertically on mobile instead of a cramped fixed-width row, day-hover tooltip clamps to stay on-screen near grid edges (`1180f66`)

### Refactored
- Consolidated four separate per-event-type color maps into a single `EVENT_TYPE_STYLES` lookup table (`d85b456`)

## 2026-07-20 — Initial release

### Added
- Initial commit of the Austin Rifle Club website (`2f8f9e6`)
