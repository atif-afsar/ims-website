-- Gallery albums managed from the admin, and enquiries sent through the website's contact form.

CREATE TABLE gallery_albums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_date DATE,
  cover_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery_photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  album_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  caption VARCHAR(300),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (album_id),
  CONSTRAINT fk_gallery_photos_album FOREIGN KEY (album_id) REFERENCES gallery_albums(id) ON DELETE CASCADE
);

CREATE TABLE enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190),
  phone VARCHAR(40),
  subject VARCHAR(150),
  message TEXT NOT NULL,
  page VARCHAR(200),
  status VARCHAR(20) NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (status),
  INDEX (created_at)
);
