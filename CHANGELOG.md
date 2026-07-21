# Changelog

All notable changes to this project are documented in this file.

## 2026-07-21

### Added
- Calendar admin: sign-in-gated `/admin/calendar` page to add, edit, and delete events, backed by Supabase instead of localStorage — changes are now real, shared, and require authentication (`46aaf4f`)

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
