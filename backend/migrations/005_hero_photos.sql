-- Homepage hero: photos of the campus and school life from the set the school supplied in November 2026.
-- Replaces the earlier slides (their saved text was already hidden). Admin → Hero Slides can change them again.
DELETE FROM hero_slides;

INSERT INTO hero_slides (title, image_url, show_text, sort_order, is_active) VALUES
  ('Campus from the air', 'media:campus-aerial-new', 0, 0, 1),
  ('Morning assembly', 'media:assembly-ground', 0, 1, 1),
  ('Robotics lab', 'media:robotics-girls-build', 0, 2, 1),
  ('Sciberation DNA workshop', 'media:dna-workshop', 0, 3, 1),
  ('Computer lab', 'media:computer-lab-girl', 0, 4, 1),
  ('Taekwondo', 'media:taekwondo-aerial', 0, 5, 1),
  ('Annual function', 'media:gems-of-ims', 0, 6, 1);
