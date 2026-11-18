-- School contact number for calls and WhatsApp (Nov 2026); replaces 07417914164 and 09219401623.
UPDATE settings
SET value = JSON_SET(value, '$.phone', '+91 9762224702', '$.whatsapp', '+91 9762224702')
WHERE setting_key = 'contact_info';
