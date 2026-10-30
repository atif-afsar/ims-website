import config from "./config.js";
import { createApp } from "./app.js";

createApp().listen(config.port, () => console.log(`IMS server on http://localhost:${config.port}`));
