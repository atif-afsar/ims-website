-- Live content to match the school's content document (Nov 2026).
-- The saved homepage introduction still said "Qur'anic values"; removing it brings back the built-in text.
DELETE FROM home_sections WHERE section_key = 'intro';

-- NEET/JEE page titles as in the document; remove saved text the document doesn't have.
UPDATE settings
SET value = JSON_REMOVE(
  JSON_SET(value,
    '$.hero_title', 'NEET/JEE Program',
    '$.banner_title', 'NEET/JEE Program',
    '$.features_title', 'Special Features',
    '$.comparison_title', 'Comparison Between IMS NEET/JEE Integrated Schooling vs Conventional Schooling'),
  '$.hero_badge', '$.vision_title', '$.vision_description', '$.intro_paragraph_1', '$.intro_paragraph_2')
WHERE setting_key = 'neet_settings';
