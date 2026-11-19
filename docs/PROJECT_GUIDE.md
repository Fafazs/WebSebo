# Project guide

WebSebo is an Expo SDK 58 JavaScript application using React Navigation. `App.js` starts `AppNavigator`; screens call services under `src/services`, and `firebaseConfig.js` configures Firebase Auth, Firestore and Storage. The repository uses Firestore, not Realtime Database: confirm this divergence from Stage 3 requirements with the professor before planning a migration.

## Data flow

Firebase Auth manages sign-in and AsyncStorage is configured for session persistence on native devices. Firestore stores user profiles, book advertisements and negotiation snapshots. The feed reads visible books and filters the current list locally. Creating, editing and deleting books use `bookService`; photo selection and editing use Expo ImagePicker and upload uses Firebase Storage. Storage availability and security rules have not been verified. A failed upload prevents publication, rather than pretending the image was saved.

The WhatsApp flow checks the Brazilian number, writes a snapshot of the book and seller to `negotiation_history`, then opens a prefilled `wa.me` link. The snapshot remains if the ad is deleted. It records the intent to contact, not proof that a message was sent. A failed opening can leave a valid history record. A second intentional attempt can create another record; cross-device deduplication requires server enforcement.

## Gemini

The Gemini key belongs exclusively in `server/.env` as `GEMINI_API_KEY=...`. The local Node proxy in `server/index.cjs` sends requests to Gemini 3.1 Flash-Lite, validates input and output and enforces a simple per-address delay. This model was listed for the configured key and a real synopsis request succeeded. Quotas can still change. The proxy listens only on loopback by default, or on an explicitly configured private IPv4 interface; it is for local demonstrations, not public deployment. It has no user authentication and no transport encryption. Before public deployment implement Firebase ID-token verification, HTTPS, authorization, durable rate limits and monitoring.

Run `npm run backend` with Node 20.12 or newer. Set `GEMINI_PROXY_URL` in the ignored `src/config/env.js` to `http://127.0.0.1:8787/synopsis` for Web on the same computer. For Android Expo Go, put the computer's private IPv4 in both `server/.env` (`HOST`) and the URL, connect both devices to the same trusted network and restart the server and Metro. Firewall/network isolation may block the connection. HTTP is allowed by the client only in development. The shared APK intentionally has no proxy URL: AI requires a separately secured HTTPS backend before it can work there. Manual synopsis remains available. Never add a Gemini key to the mobile config or EAS build variables.

## Security and known gaps

Client ownership checks improve feedback but do not enforce security. Firestore and Storage rules must enforce owner identity, allowed fields and reads, and seller status. Remote rules were not inspected or changed. Reports, duplicate prevention, suspension at three reports and seller likes require an authenticated trusted backend with transactions and idempotency; reports and likes are disabled pending that work. Existing data or permissive rules may still be unsafe. Identity cannot be verified by validating a CPF form: activation is self-declared; new activations no longer store CPF or assert verification. Existing stored CPF values remain and require an authorized retention/deletion review. Account deletion is non-atomic; profile email editing does not update Firebase Auth. Avoid using real accounts until these gaps and remote rules are reviewed.

The demo is a separate screen with 12 sample listings; it does not authenticate, call AI, save, or message. Text is bundled and works offline; illustrative Open Library cover images need internet and fall back to a bundled illustration. Sample prices and conditions are fictional. It does not reproduce every app workflow. The older unused Gemini modal and developer test screen are not registered in navigation.

The local Gemini proxy caches validated generated responses by normalized title and author in the ignored `server/.gemini-cache.json`; cached responses are labeled in the app and checked before the local one-minute limit. Google quota failures are identified separately. The Google Books API returned HTTP 429 during review; the illustrative-cover search also tries Open Library and publication without a cover remains possible. Neither source proves an illustrative cover matches the seller's physical edition.
