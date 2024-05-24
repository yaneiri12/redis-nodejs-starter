const dotenv = require("dotenv-load");
dotenv();

const errors = [];
const env = process.env;

if (!env.REDIS_URL) {
  errors.push("REDIS_URL is a required environment variable");
}

if (!env.SESSION_SECRET) {
  errors.push("SESSION_SECRET is a required environment variable");
}

if (errors.length) {
  console.error("Environment errors: ");
  errors.forEach((error) => console.error(`  - ${error}`));
  process.exit(1);
} else {
  process.exit();
}
