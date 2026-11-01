# WebSebo

## Description
WebSebo is a mobile application developed in React Native (Expo) that connects informal used book sellers (independent "sebeiros") with passionate readers. It acts as a specialized digital catalog to give organic visibility to local small-scale sellers. To preserve the traditional and friendly neighbourhood book culture, all business negotiations are completed directly via WhatsApp, while the platform ensures a secure environment through an immutable interaction history and an anti-fraud reporting mechanism.

## Features
- **User Authentication:** Universal registration, secure login, and password recovery managed via Firebase Authentication.
- **Verified Seller Accounts (KYC):** Users can upgrade to "Seller" status by providing their CPF and accepting legal responsibility terms.
- **Store & Inventory Management (CRUD):** Sellers can fully create, read, update, and delete book listings and store profiles.
- **AI-Powered Synopsis:** Integration with Google AI Studio (Gemini API) to automatically generate book summaries and literary categories from titles and authors.
- **Smart Feed & Regionalized Search:** Main vitrine displaying available books with search filters by title, author, category, and city/neighborhood location.
- **WhatsApp Integration & Snapshots:** Direct redirection to the seller's WhatsApp with a simultaneous immutable snapshot saved to the reader's history to ensure evidence retention.
- **Security & Persistent Reporting:** Interaction history allowing readers to report fraudulent sellers at any time, even if the original book listing is deleted, triggering automatic suspension after repeated reports.

## Technologies & Architecture
- **Frontend Framework:** React Native with Expo (Managed Workflow) for cross-platform compatibility (Android and iOS).
- **Backend & Persistence:** Firebase Auth, Firestore Database, and Firebase Storage.
- **Artificial Intelligence:** Google AI Studio (Gemini 2.5 Flash API).


## How to Run
1. Clone this repository to your local machine:
   ```bash
   git clone <REPOSITORY_URL>
   cd SeboOnline
   ```
2. Install all required project dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Create an `env.js` file inside `src/config/` (using `src/config/env.example.js` as a template).
   - Fill in your Firebase web credentials and Google Gemini API key.
4. Start the application development server using Expo:
   ```bash
   npx expo start -c
   ```
5. Scan the generated QR code using the **Expo Go** app on your physical mobile device, or press `a` to open it in an Android emulator.
