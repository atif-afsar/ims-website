import config from "./config.js";
import { createApp } from "./app.js";
import { runMigrations, ensureFirstAdmin } from "./setup.js";

// Listen right away. Some hosts load this file with require(), which cannot wait
// for top-level await, so the database setup runs in the background: tables are
// created and the first admin is added within a few seconds of the first start.
createApp().listen(config.port, () => console.log(`IMS server on http://localhost:${config.port}`));

runMigrations()
  .then(() => ensureFirstAdmin())
  .catch((err) => console.error(`Database setup skipped: ${err.code || err.message}`));
