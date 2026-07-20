# Changelog

All notable changes to this project are documented in this file.

## 2026-07-20

### Added
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
