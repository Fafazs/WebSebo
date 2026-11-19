# Test checklist

Use isolated test accounts and data. Never send messages or reports to real people during testing.

- [ ] Install dependencies and configure Firebase in ignored `src/config/env.js`; do not put a Gemini key in the client.
- [ ] Open Expo Go on Android and iOS; test navigation, safe areas, small screens and accessible touch targets.
- [ ] Test registration, login, logout, password reset, session restoration and profile edits. Check Auth email versus Firestore email.
- [ ] Test seller activation; explain that it does not verify identity.
- [ ] With a test Firebase project and verified security rules, test book create, edit, delete, refresh and ownership denial from a second account.
- [ ] Confirm Storage is enabled and rules are restrictive; test image selection, editing, upload, failure, missing image and Web behavior.
- [ ] On Android, retest keyboard visibility and scrolling on login, registration, seller activation, profile editing, new book and edit-book modal.
- [ ] The four publicly readable book records inspected during this review had legacy `via.placeholder.com` cover URLs. The app now uses a bundled fallback for them. An anonymous check of the configured Storage bucket returned HTTP 404; verify the bucket and authenticated upload without weakening its rules.
- [ ] Confirm the phone can reach the local Gemini server on the same trusted Wi-Fi. The address changes when the computer's network changes.
- [ ] Test search and categories. City and neighborhood filter UI is not connected to the feed.
- [ ] With a test account and number, verify phone normalization, snapshot creation, opening failure, repeated taps, concurrent devices and history after deleting the ad. Do not send the prepared message.
- [ ] Verify reports, suspension and seller likes remain unavailable until a trusted backend is implemented.
- [x] Enumerate models for the configured key and make one real local backend synopsis request; response contained a synopsis and categories.
- [ ] Test Gemini from Web and Android UI, timeout, quota, offline behavior and a future authenticated HTTPS backend.
- [ ] Test offline demo after disabling network. It shows only a small static catalog.
- [ ] Build and install a standalone APK only after authorization and a separate review of build credentials and bundled configuration.

Android and Web exports succeeded; they are not device or Firebase integration tests. Expo Doctor passed 19 of 20 checks; three patch versions differ from its recommendations. AsyncStorage was aligned with SDK 58. Expo lint passed with 18 warnings, and direct ESLint passed with no errors. TypeScript checking is not configured in this JavaScript project. npm reported 13 vulnerabilities (9 moderate, 4 high); no automatic dependency fixes were applied.
