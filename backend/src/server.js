import config from "./config.js";
import { createApp } from "./app.js";
import { runMigrations, ensureFirstAdmin } from "./setup.js";

// Bring the database up to date before serving; if it is unreachable the
// site still starts (pages show their built-in content) and /api/health reports it.
try {
  await runMigrations();
  await ensureFirstAdmin();
} catch (err) {
  console.error(`Database setup skipped: ${err.code || err.message}`);
}

createApp().listen(config.port, () => console.log(`IMS server on http://localhost:${config.port}`));
