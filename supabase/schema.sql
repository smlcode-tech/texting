                                                                                                                                                                                                                                                                                                                                                        create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  username text unique,
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  title text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(trim(body)) > 0),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;

create or replace function public.is_conversation_member(target_conversation_id uuid, target_user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.conversation_members
    where conversation_id = target_conversation_id and user_id = target_user_id
  );
$$;

create policy "Users can read their profile" on public.profiles for select using (id = auth.uid());
create policy "Conversation members can read profiles" on public.profiles for select using (
  exists (
    select 1 from public.conversation_members own
    join public.conversation_members shared on shared.conversation_id = own.conversation_id
    where own.user_id = auth.uid() and shared.user_id = profiles.id
  )
);
create policy "Members can read conversations" on public.conversations for select using (
  public.is_conversation_member(conversations.id)
);
create policy "Members can read membership" on public.conversation_members for select using (
  public.is_conversation_member(conversation_members.conversation_id)
);
create policy "Members can read messages" on public.messages for select using (
  public.is_conversation_member(messages.conversation_id)
);
create policy "Members can send messages" on public.messages for insert with check (
  sender_id = auth.uid() and public.is_conversation_member(messages.conversation_id)
);
create policy "Members can update conversations" on public.conversations for update using (
  public.is_conversation_member(conversations.id)
) with check (
  public.is_conversation_member(conversations.id)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();