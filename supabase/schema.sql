-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- for a fresh project. Safe to re-run the "create table if not exists" part;
-- the seed insert at the bottom will duplicate rows if run twice, so only
-- run it once.

create table if not exists calendar_events (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  title text not null,
  venue text not null,
  type text not null,
  restricted boolean not null default false,
  url text,
  created_at timestamptz not null default now()
);

alter table calendar_events enable row level security;

-- Anyone (including anonymous site visitors) can read events.
create policy "Public can read events"
  on calendar_events for select
  to anon, authenticated
  using (true);

-- Only signed-in users (i.e. the admin account you create below) can write.
create policy "Authenticated users can insert events"
  on calendar_events for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update events"
  on calendar_events for update
  to authenticated
  using (true);

create policy "Authenticated users can delete events"
  on calendar_events for delete
  to authenticated
  using (true);

-- Seed data: the club's existing June–July 2026 events.
insert into calendar_events (date, title, venue, type, restricted, url) values
  ('2026-06-28', 'APSC Steel Challenge Pistol Match', 'Ranges H – L', 'Match', false, 'https://austinrifleclub.org/events/ranges-h-through-l-apsc-steel-challenge-pistol-match-780-470/'),
  ('2026-06-28', 'Benchrest Match', 'Range C', 'Match', false, 'https://austinrifleclub.org/events/range-c-benchrest-match/'),
  ('2026-07-03', 'ARC Advanced Tactical Shooting Practice', 'Ranges I & J', 'Organized Practice', false, 'https://austinrifleclub.org/events/ranges-i-and-j-arc-advanced-tactical-shooting-practice/'),
  ('2026-07-04', 'APSC Club USPSA Pistol Match', 'Ranges G – L', 'Match', false, 'https://austinrifleclub.org/events/ranges-h-through-l-apsc-club-uspsa-pistol-match/'),
  ('2026-07-04', 'High Power Rifle Match', 'Range C', 'Match', false, 'https://austinrifleclub.org/events/range-c-high-power-rifle-match/'),
  ('2026-07-05', 'Benchrest Match — Varmint (Mark S)', 'Range C', 'Match', false, 'https://austinrifleclub.org/events/range-c-benchrest-match-varmint-mark-s-500/'),
  ('2026-07-05', 'Junior Muzzle Loading Practice', 'Range A', 'Youth Event', false, 'https://austinrifleclub.org/events/range-a-junior-muzzle-loading-practice/'),
  ('2026-07-09', 'ARC Advanced Tactical Shooting Practice', 'Ranges I & J', 'Organized Practice', false, null),
  ('2026-07-09', 'LTC Qualification — Rick M', 'Range G', 'Class', false, null),
  ('2026-07-11', 'Range Work Day', 'All Ranges', 'Work Day', false, 'https://austinrifleclub.org/events/range-work-day-legacy-ranges/'),
  ('2026-07-11', 'ARC Members ONLY Swap Meet', 'Education Building', 'ARC Event', true, 'https://austinrifleclub.org/events/education-building-arc-members-only-swap-meet/'),
  ('2026-07-12', 'Hunter Pistol / Lever Action Rifle Silhouette Match', 'Ranges D & E', 'Match', false, null),
  ('2026-07-12', 'Monthly Board of Directors Meeting (Open to Members)', 'Education Building', 'ARC Meeting', false, 'https://austinrifleclub.org/events/arc-open-bod-meeting/'),
  ('2026-07-12', 'New Member Safety Evaluations (NMSE)', 'Ranges G & H', 'ARC Event', true, null),
  ('2026-07-12', 'New Member Orientation (NMO) Class', 'Education Building', 'Class', true, null),
  ('2026-07-14', 'LTC Qualification — Rick M', 'Range G', 'Class', false, null),
  ('2026-07-16', 'ARC Advanced Tactical Shooting Practice', 'Ranges I & J', 'Organized Practice', false, null),
  ('2026-07-18', 'APSC Club USPSA Pistol Match', 'Ranges G – L', 'Match', false, null),
  ('2026-07-19', '2700 Conventional Pistol Match', 'Range A', 'Match', false, 'https://austinrifleclub.org/events/range-a-2700-conventional-pistol-match/'),
  ('2026-07-19', 'Smallbore Rifle Silhouette Match', 'Ranges D & E', 'Match', false, null),
  ('2026-07-21', 'Ben Hur Provost Guard Pistol Practice', 'Range A', 'Organized Practice', false, 'https://austinrifleclub.org/events/range-a-ben-hur-provost-guard-pistol-practice/'),
  ('2026-07-23', 'ARC Advanced Tactical Shooting Practice', 'Ranges I & J', 'Organized Practice', false, null),
  ('2026-07-25', 'LTC Class — John Davis', 'Range G', 'Class', false, 'https://austinrifleclub.org/events/ltc-class-john-davis-range-g-811-694-750-374-462/'),
  ('2026-07-26', 'APSC Steel Challenge Pistol Match', 'Ranges H – L', 'Match', false, null),
  ('2026-07-26', 'Benchrest Match', 'Range C', 'Match', false, null),
  ('2026-07-30', 'ARC Advanced Tactical Shooting Practice', 'Ranges I & J', 'Organized Practice', false, null);
