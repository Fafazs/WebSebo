# WebSebo

## Description
WebSebo is a mobile application that connects informal used book sellers with passionate readers. It acts as a digital catalog to give visibility to local independent sellers. To keep the traditional and friendly negotiation style, all trades are closed directly via WhatsApp, while the app ensures a safe environment with interaction history and an anti-fraud reporting system.

## Features
- **User Authentication:** Login, registration, and password recovery for all users.
- **Verified Seller Accounts (KYC):** Users can upgrade to "Seller" by validating their ID (CPF).
- **Store & Inventory Management:** Sellers can easily create, read, update, and delete (CRUD) their book listings and store profile.
- **AI-Powered Synopsis:** Automatically generates book summaries and category tags using Google Gemini AI.
- **Smart Feed & Search:** Find books by title, author, category, or physical proximity (GPS/Location).
- **WhatsApp Integration:** Direct redirect to the seller's WhatsApp with an automatic snapshot saved in the reader's history.
- **Security & Reporting:** Persistent interaction history that allows readers to report fraudulent sellers even if the listing is deleted.

## Technologies
- **Frontend:** React Native (compatible with Android and iOS)
- **Backend/Database:** Firebase (Authentication & Firestore / Realtime Database)
- **Artificial Intelligence:** Google AI Studio (Gemini API)

## How to Run
1. Clone this repository to your local machine.
2. Open the terminal in the project folder and run `npm install` (or `yarn install`) to install all dependencies.
3. Configure your Firebase credentials in the environment setup.
4. Add your Google Gemini API Key to the environment variables.
5. Run the application on an emulator or physical device using `npm run android` (for Android) or `npm run ios` (for iOS).
