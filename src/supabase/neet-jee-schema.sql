-- NEET/JEE CMS tables for Islamic Mission School
-- Run this in Supabase SQL Editor before using the admin panel.

-- ─── Page settings (singleton row, id = 1) ───
CREATE TABLE IF NOT EXISTS neet_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hero_badge TEXT DEFAULT 'Integrated Academy',
  hero_title TEXT DEFAULT 'NEET / JEE Program',
  hero_subtitle TEXT DEFAULT 'Redefining Schooling for Aspiring Doctors & Engineers',
  hero_image_url TEXT,
  banner_title TEXT DEFAULT 'NEET / JEE Program',
  banner_subtitle TEXT DEFAULT 'Redefining Schooling for Aspiring Doctors & Engineers',
  intro_paragraph_1 TEXT,
  intro_paragraph_2 TEXT,
  vision_title TEXT DEFAULT 'One Campus. One Strategy. One Goal.',
  vision_description TEXT,
  features_image_url TEXT,
  features_title TEXT DEFAULT 'Our Proven Strategy',
  comparison_title TEXT DEFAULT 'IMS NEET/JEE Integrated Schooling vs Conventional Schooling',
  results_title TEXT DEFAULT 'Our Proud Achievers',
  faculty_title TEXT DEFAULT 'Our Expert Faculty',
  answer_keys_title TEXT DEFAULT 'Answer Keys & Resources',
  cta_title TEXT DEFAULT 'Give Your Child the Best Chance to Become a Doctor or Engineer',
  cta_button_text TEXT DEFAULT 'Enroll in NEET/JEE Program Now',
  cta_button_link TEXT DEFAULT '/contact',
  secondary_button_text TEXT DEFAULT 'Download Brochure',
  secondary_button_link TEXT DEFAULT '/brochure',
  bottom_cta_title TEXT DEFAULT 'Secure Your Seat in the Next Batch',
  bottom_cta_subtitle TEXT DEFAULT 'Limited seats available for serious aspirants. Take the first step towards IIT/AIIMS.',
  bottom_cta_primary_text TEXT DEFAULT 'Apply Now',
  bottom_cta_primary_link TEXT DEFAULT '/contact',
  bottom_cta_secondary_text TEXT DEFAULT 'Talk to Counselor',
  bottom_cta_secondary_link TEXT DEFAULT '/contact',
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Program tracks (Foundation / Accelerator) ───
CREATE TABLE IF NOT EXISTS neet_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subtitle TEXT,
  for_class TEXT,
  description TEXT,
  highlight TEXT,
  track_type TEXT DEFAULT 'foundation',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Features list ───
CREATE TABLE IF NOT EXISTS neet_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Comparison rows ───
CREATE TABLE IF NOT EXISTS neet_comparison (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  point TEXT NOT NULL,
  integrated TEXT NOT NULL,
  conventional TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Roadmap phases ───
CREATE TABLE IF NOT EXISTS neet_roadmap (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Student results ───
CREATE TABLE IF NOT EXISTS neet_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  arabic_name TEXT,
  score TEXT NOT NULL,
  exam_year TEXT NOT NULL,
  photo_url TEXT,
  rank INTEGER DEFAULT 1,
  class_group TEXT DEFAULT 'Board Toppers',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Faculty members ───
CREATE TABLE IF NOT EXISTS neet_faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT,
  qualification TEXT,
  bio TEXT,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Answer keys (PDFs) ───
CREATE TABLE IF NOT EXISTS neet_answer_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  exam_name TEXT,
  exam_date TEXT,
  pdf_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── RLS: public read, authenticated write ───
ALTER TABLE neet_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE neet_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE neet_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE neet_comparison ENABLE ROW LEVEL SECURITY;
ALTER TABLE neet_roadmap ENABLE ROW LEVEL SECURITY;
ALTER TABLE neet_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE neet_faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE neet_answer_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read neet_settings" ON neet_settings FOR SELECT USING (true);
CREATE POLICY "Public read neet_tracks" ON neet_tracks FOR SELECT USING (is_active = true);
CREATE POLICY "Public read neet_features" ON neet_features FOR SELECT USING (is_active = true);
CREATE POLICY "Public read neet_comparison" ON neet_comparison FOR SELECT USING (is_active = true);
CREATE POLICY "Public read neet_roadmap" ON neet_roadmap FOR SELECT USING (is_active = true);
CREATE POLICY "Public read neet_results" ON neet_results FOR SELECT USING (is_active = true);
CREATE POLICY "Public read neet_faculty" ON neet_faculty FOR SELECT USING (is_active = true);
CREATE POLICY "Public read neet_answer_keys" ON neet_answer_keys FOR SELECT USING (is_published = true);

CREATE POLICY "Auth write neet_settings" ON neet_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write neet_tracks" ON neet_tracks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write neet_features" ON neet_features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write neet_comparison" ON neet_comparison FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write neet_roadmap" ON neet_roadmap FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write neet_results" ON neet_results FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write neet_faculty" ON neet_faculty FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write neet_answer_keys" ON neet_answer_keys FOR ALL USING (auth.role() = 'authenticated');

-- ─── Seed default settings row ───
INSERT INTO neet_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ─── Optional: seed initial content from existing dummydata ───
-- Uncomment and run after tables are created if you want default data in DB.

/*
INSERT INTO neet_tracks (name, subtitle, for_class, description, highlight, track_type, sort_order) VALUES
('Foundation Program (4-Year Track)', 'Build an Unshakable Foundation for Success.', 'Starts from Class IX', 'Designed for students with clear goals in medicine or engineering.', 'Build early, build strong, stay ahead.', 'foundation', 0),
('Intensive Accelerator Program (2-Year Track)', 'Fast-Track Your Dream with Focused Intensity.', 'Starts from Class XI', 'A focused two-year journey for students who finalize NEET/JEE after Class X.', 'Fast-track preparation with precision.', 'accelerator', 1);

INSERT INTO neet_features (text, sort_order) VALUES
('Efficient and committed faculty team', 0),
('Daily practice tests for consistency', 1),
('Weekly assessment and analysis', 2),
('Regular doubt-clearing classes', 3),
('Experienced teachers during school hours', 4),
('No external coaching required', 5),
('Save over Rs. 1 lakh per year in coaching costs', 6),
('Save 7-8 hours daily for focused self-study', 7);

INSERT INTO neet_results (name, score, exam_year, photo_url, rank, class_group, sort_order) VALUES
('Ibrahim Faisal', '95%', 'District Rank - 1', '/images/results/ibrahim_faisal.png', 1, 'Class X', 0),
('Abdul Rehman', '94.8%', 'District Rank - 2', '/images/results/abdul_rehman.png', 2, 'Class X', 1),
('Nehdiya Qudsi', '94.6%', 'District Rank - 3', '/images/results/nehdiya_qudsi.png', 3, 'Class X', 2),
('Ahmad Misbah', '94%', 'District Rank - 1', '/images/results/ahmad_misbah.png', 1, 'Class XII', 3),
('Shaikh Fidyan Shayan', '93%', 'District Rank - 3', '/images/results/shaikh_fidyan_shayan.png', 3, 'Class XII', 4);

INSERT INTO neet_faculty (name, subject, qualification, bio, sort_order) VALUES
('Dr. Kaunain Kausar', 'Biology', '', 'Founder and Director, Islamic Mission School', 0),
('Mr. Shakir Sir', 'Physics', 'M.Phil., M.Sc. Gold Medalist', 'Founder & Director, Shakir Sir Classes, Aligarh', 1),
('Dr. R Malik Sir', 'Chemistry', 'Ph.D. Chemistry', 'Ex-Faculty FIIT JEE, Ex-Faculty Shakir Sir Classes', 2),
('Mr. Malik Azeem', 'Biology', 'B.Sc.(Zoo.), M.Sc.(Zoo.), Triple Gold Medalist, M.Ed.(STEM), OSU, USA', '', 3),
('Mr. Yasir Mumtaz', 'Chemistry', 'B.Sc., M.Sc. (Chem), JMI', 'Ex-Faculty Allen, Noida', 4),
('Er. Saquib Hayat', 'Physics', 'B.Tech., M.Tech., AMU', 'Ex-Faculty Aakash, Ex-Faculty GCI, Sikar', 5),
('Er. Kush Varshney', 'Mathematics', 'B.Tech., M.Tech. (AMU)', 'Director Kush Classes', 6),
('Er. Syed Aley Haider', 'Physics', 'B.Tech., M.Tech., AMU', 'Ex-Faculty PW Lucknow', 7),
('Er. Malik Faheem', 'Mathematics', 'B.Tech., M.Tech., AMU', 'Ex-Faculty Duty Society', 8);
*/
