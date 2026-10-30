-- Homepage hero slider for Islamic Mission School
-- Run this once in the Supabase SQL Editor before using Admin → Hero Slides.

CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  eyebrow TEXT,                      -- small gold line above the title
  title TEXT NOT NULL,               -- white part of the headline
  highlight TEXT,                    -- gold italic part of the headline
  subtitle TEXT,
  image_url TEXT,                    -- uploaded photo (Supabase storage)
  media_key TEXT,                    -- or a built-in photo from the site's media library
  video_url TEXT,                    -- optional background video (desktop only)
  cta_text TEXT,
  cta_link TEXT,
  cta2_text TEXT,
  cta2_link TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  starts_on DATE,                    -- optional: only show from this date
  ends_on DATE,                      -- optional: hide after this date
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read hero_slides" ON hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "Auth write hero_slides" ON hero_slides FOR ALL USING (auth.role() = 'authenticated');
