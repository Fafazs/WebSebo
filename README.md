# Sebo Perto (WebSebo)

An Expo / React Native student project for browsing used-book listings and contacting independent sellers. It uses JavaScript, React Navigation, Firebase Authentication, Firestore and Firebase Storage.

## Run locally

Install dependencies with `npm install`, copy `src/config/env.example.js` to `src/config/env.js`, and configure a Firebase project. Never put a Gemini API key in the client configuration. Start with `npx expo start`, or `npx expo start --web` for the browser. The offline demo is available from the welcome screen; it uses bundled fictitious examples and does not authenticate or perform transactions. Expo Go still needs the development server to load the app initially.

The `preview` profile in `eas.json` configures an Android APK; no build has been created. Configure the EAS `preview` environment with `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID` and `FIREBASE_APP_ID`. The pre-install hook generates the ignored client config from those public Firebase values and fails if any are missing. Do not put the Gemini key in EAS. Review configuration and credentials before running `npx eas-cli@latest build --platform android --profile preview`.

## Current capabilities and limitations

The application contains authentication and profile screens, a Firestore catalog, seller listing forms, image selection and Storage upload, and WhatsApp links with a Firestore snapshot. These integrations require a configured Firebase project and verified security rules. Storage availability remains unverified; publishing without a photo and selecting an illustrative cover are supported. The separately labeled demo contains 12 sample listings; book data works offline, while Open Library cover images require a network connection. A Node backend provides Gemini generation for local testing only; its key stays in `server/.env`. Valid responses are cached locally and labeled when reused. A local rate limit and Google quota both apply. The shared APK has no AI endpoint until an authenticated HTTPS backend is deployed. Reports, automatic suspension and seller likes are disabled until trusted backend enforcement exists. Seller activation does not verify identity.

Read [project architecture and security](docs/PROJECT_GUIDE.md), [test checklist](docs/TEST_CHECKLIST.md), and [presentation guide](docs/PRESENTATION_GUIDE.md). Firestore is used instead of the Stage 3 Realtime Database requirement; confirm this with the professor.
