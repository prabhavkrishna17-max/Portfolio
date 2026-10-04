-- =============================================================================
-- TYPING CHALLENGE LEADERBOARD SCHEMA
-- Portfolio: Prabhav Krishna
-- Table: typing_scores
-- View: typing_leaderboard (Enforces highest-score-per-person deduplication)
-- =============================================================================

-- 1. Create typing_scores table with strict anti-cheat CHECK constraints
create table if not exists public.typing_scores (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2 and char_length(trim(name)) <= 30),
  wpm integer not null check (wpm >= 0 and wpm <= 250),
  accuracy numeric not null check (accuracy >= 0 and accuracy <= 100),
  characters integer not null check (characters >= 0 and characters <= 1500),
  duration integer not null default 30 check (duration = 30),
  created_at timestamp with time zone default now()
);

-- 2. Performance indexes for fast leaderboard retrieval & ranking
create index if not exists idx_typing_scores_ranking 
  on public.typing_scores (wpm desc, accuracy desc, created_at asc);

create index if not exists idx_typing_scores_name 
  on public.typing_scores (lower(trim(name)));

-- 3. Enable Row Level Security (RLS)
alter table public.typing_scores enable row level security;

-- 4. RLS Policy: Anyone can read leaderboard scores
drop policy if exists "Allow public read access to typing scores" on public.typing_scores;
create policy "Allow public read access to typing scores"
  on public.typing_scores
  for select
  using (true);

-- 5. RLS Policy: Anyone can insert a validated typing score
drop policy if exists "Allow public insert of valid typing scores" on public.typing_scores;
create policy "Allow public insert of valid typing scores"
  on public.typing_scores
  for insert
  with check (
    char_length(trim(name)) >= 2
    and char_length(trim(name)) <= 30
    and wpm >= 0
    and wpm <= 250
    and accuracy >= 0
    and accuracy <= 100
    and characters >= 0
    and characters <= 1500
    and duration = 30
  );

-- 6. Dedicated Leaderboard View enforcing highest-score-per-person (distinct by name)
-- If a participant (e.g. Prabhav) takes the challenge multiple times, only their highest score appears.
create or replace view public.typing_leaderboard as
select distinct on (lower(trim(name)))
  id,
  name,
  wpm,
  accuracy,
  characters,
  duration,
  created_at
from public.typing_scores
order by lower(trim(name)), wpm desc, accuracy desc, created_at asc;

-- 7. Grant access to public/anon and authenticated roles
grant select, insert on public.typing_scores to anon, authenticated;
grant select on public.typing_leaderboard to anon, authenticated;
