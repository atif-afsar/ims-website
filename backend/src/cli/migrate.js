/*
 * Applies migrations/*.sql in name order, once each.  npm run migrate
 * (The server also does this on every start; see src/setup.js.)
 */
import { runMigrations } from "../setup.js";

await runMigrations();
