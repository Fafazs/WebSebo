// Firebase web configuration is public client configuration, not a server secret.
const fs = require('node:fs');
const fields = ['FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_PROJECT_ID', 'FIREBASE_STORAGE_BUCKET', 'FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_APP_ID'];
const missing = fields.filter(field => !process.env[field]);
if (missing.length) throw new Error(`Configure the EAS preview environment variables: ${missing.join(', ')}`);
const config = Object.fromEntries(fields.map(field => [field, process.env[field]]));
// A local HTTP proxy must never be bundled into the shared APK.
config.GEMINI_PROXY_URL = '';
fs.writeFileSync('src/config/env.js', `export const ENV = ${JSON.stringify(config, null, 2)};\n`);
