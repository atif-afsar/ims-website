-- Islamic Mission School: initial schema (MySQL 8 / MariaDB 10.6+)
-- Mirrors the tables the site used on Supabase, plus the homepage builder.

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  name VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Singleton settings stored as JSON: contact_info, neet_settings, site
CREATE TABLE settings (
  setting_key VARCHAR(64) PRIMARY KEY,
  value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Homepage builder: one row per section, content overrides the built-in defaults
CREATE TABLE home_sections (
  section_key VARCHAR(64) PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  content JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE hero_slides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eyebrow VARCHAR(200),
  title VARCHAR(200) NOT NULL,
  highlight VARCHAR(200),
  subtitle TEXT,
  image_url VARCHAR(500),
  media_key VARCHAR(100),
  video_url VARCHAR(500),
  cta_text VARCHAR(100),
  cta_link VARCHAR(500),
  cta2_text VARCHAR(100),
  cta2_link VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  starts_on DATE,
  ends_on DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE site_popups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eyebrow VARCHAR(200),
  title VARCHAR(200) NOT NULL,
  message TEXT,
  image_url VARCHAR(500),
  cta_text VARCHAR(100),
  cta_link VARCHAR(500),
  show_on VARCHAR(10) DEFAULT 'home',
  delay_seconds INT DEFAULT 3,
  is_active TINYINT(1) DEFAULT 1,
  starts_on DATE,
  ends_on DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  link VARCHAR(500),
  date DATE,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  role VARCHAR(200),
  quote TEXT NOT NULL,
  photo_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  role VARCHAR(150),
  qualification VARCHAR(200),
  profession VARCHAR(300),
  image_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  cover_image VARCHAR(500),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age_criteria VARCHAR(50),
  group_category VARCHAR(40),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE calendar_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  event_date DATE NOT NULL,
  description TEXT,
  event_type VARCHAR(30) DEFAULT 'general',
  color VARCHAR(20),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (event_date)
);

CREATE TABLE social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(40) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon_class VARCHAR(80),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NEET / JEE page
CREATE TABLE neet_tracks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  subtitle VARCHAR(300),
  for_class VARCHAR(100),
  description TEXT,
  highlight VARCHAR(300),
  track_type VARCHAR(30) DEFAULT 'foundation',
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE neet_features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(300) NOT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE neet_comparison (
  id INT AUTO_INCREMENT PRIMARY KEY,
  point VARCHAR(200) NOT NULL,
  integrated TEXT NOT NULL,
  conventional TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE neet_roadmap (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phase VARCHAR(100) NOT NULL,
  description VARCHAR(300) NOT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE neet_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  arabic_name VARCHAR(150),
  score VARCHAR(30) NOT NULL,
  exam_year VARCHAR(60) NOT NULL,
  photo_url VARCHAR(500),
  `rank` INT DEFAULT 1,
  class_group VARCHAR(60) DEFAULT 'Board Toppers',
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE neet_faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  subject VARCHAR(100),
  qualification VARCHAR(300),
  bio VARCHAR(300),
  photo_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE neet_answer_keys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  exam_name VARCHAR(150),
  exam_date VARCHAR(60),
  pdf_url VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  is_published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
