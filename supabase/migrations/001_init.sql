create table weddings (
  id uuid primary key default gen_random_uuid(),
  partner1_first text not null,
  partner1_last text not null,
  partner2_first text not null,
  partner2_last text not null,
  wedding_date date not null,
  coordinator_email text not null,
  password_hash text not null unique,
  created_at timestamptz default now()
);

create table suggestions (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid references weddings(id) on delete cascade,
  submitter_name text not null,
  submitter_email text not null,
  message text not null,
  coordinator_email text not null,
  created_at timestamptz default now()
);
