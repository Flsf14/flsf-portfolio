create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  client text not null,
  year text not null,
  summary text not null,
  challenge text not null default '',
  approach text not null default '',
  outcome text not null default '',
  cover_path text,
  disciplines text[] not null default '{}',
  formats text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  storage_path text not null,
  media_type text not null check (media_type in ('image', 'video', 'pdf', 'external')),
  alt_text text not null default '',
  caption text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) <= 160),
  organization text not null default '',
  message text not null check (char_length(message) between 20 and 2000),
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.contact_messages enable row level security;

revoke all on public.projects from anon, authenticated;
revoke all on public.project_media from anon, authenticated;
revoke all on public.contact_messages from anon, authenticated;

grant select on public.projects to anon, authenticated;
grant select on public.project_media to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant all on public.projects to service_role;
grant all on public.project_media to service_role;
grant all on public.contact_messages to service_role;

create policy "Published projects are public"
on public.projects for select to anon, authenticated
using (published = true);

create policy "Media for published projects is public"
on public.project_media for select to anon, authenticated
using (exists (select 1 from public.projects where projects.id = project_media.project_id and projects.published = true));

create policy "Anyone can submit a contact message"
on public.contact_messages for insert to anon, authenticated
with check (
  char_length(name) between 2 and 80
  and char_length(email) <= 160
  and char_length(message) between 20 and 2000
  and status = 'new'
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', true, 52428800, array['image/jpeg','image/png','image/webp','image/avif','video/mp4','application/pdf'])
on conflict (id) do nothing;

create policy "Portfolio media is publicly readable"
on storage.objects for select to anon, authenticated
using (bucket_id = 'portfolio-media');
