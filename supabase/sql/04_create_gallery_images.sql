-- Gallery images
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image_url text not null,
  category text,
  metadata jsonb,
  uploaded_by uuid references users(id) on delete set null,
  created_at timestamptz default now()
);

create index if not exists gallery_category_idx on gallery_images (category);
