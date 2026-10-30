-- Announcement popup for Islamic Mission School
-- Run this once in the Supabase SQL Editor before using Admin → Popup.

CREATE TABLE IF NOT EXISTS site_popups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  eyebrow TEXT,                      -- small gold line, e.g. "Admission Open"
  title TEXT NOT NULL,
  message TEXT,
  image_url TEXT,                    -- optional poster / photo
  cta_text TEXT,
  cta_link TEXT,
  show_on TEXT DEFAULT 'home',       -- 'home' or 'all' pages
  delay_seconds INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT TRUE,
  starts_on DATE,
  ends_on DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_popups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_popups" ON site_popups FOR SELECT USING (is_active = true);
CREATE POLICY "Auth write site_popups" ON site_popups FOR ALL USING (auth.role() = 'authenticated');
