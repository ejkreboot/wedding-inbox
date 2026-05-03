-- Enable RLS on both tables
alter table weddings enable row level security;
alter table suggestions enable row level security;

-- weddings: allow anon reads (needed for password-hash login and session validation)
create policy "anon can read weddings"
  on weddings for select
  to anon
  using (true);

-- weddings: inserts are handled server-side with the service role key, which bypasses RLS

-- suggestions: guests can submit suggestions (anon insert)
create policy "anon can insert suggestions"
  on suggestions for insert
  to anon
  with check (true);

-- suggestions: coordinators can only read their own suggestions
create policy "coordinators can read own suggestions"
  on suggestions for select
  to authenticated
  using (coordinator_email = auth.email());
