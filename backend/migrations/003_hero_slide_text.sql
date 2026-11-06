-- Hero slides are photos first: text on a photo is optional and off unless the admin turns it on.
-- Existing slides keep their saved text, hidden.

ALTER TABLE hero_slides
  MODIFY title VARCHAR(200) NULL,
  ADD COLUMN show_text TINYINT(1) NOT NULL DEFAULT 0 AFTER video_url;
