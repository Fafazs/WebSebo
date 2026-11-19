# Presentation guide

## Before presenting

Install Expo Go and test the exact SDK version on the device. Start `npm run backend` in one terminal and `npx expo start` in another; LAN or tunnel needs a working connection. For Android, configure the computer's private IPv4 in the server and client as described in PROJECT_GUIDE. Test before leaving for campus: an isolated Wi-Fi network can prevent phone-to-computer access. For the independent fallback, open “Conhecer demonstração offline”, or install a separately built and tested APK. The APK profile is configured but no build was started. A Web session can be started with `npx expo start --web`. Verify Firebase configuration and never ship a Gemini secret in the app.

Find the computer's IPv4 address with `ipconfig`. For example, if it is `192.168.1.20`, set `HOST=192.168.1.20` in `server/.env`, and set `GEMINI_PROXY_URL` to `http://192.168.1.20:8787/synopsis` in `src/config/env.js`. This is an example, not the address of every computer. Restart both processes. Do not use the local proxy over a public network or forward its port.

Before an EAS build, configure the six Firebase fields named in README in the Expo `preview` environment using your Firebase project's public client configuration. The ignored local `env.js` is not automatically uploaded; the pre-install script generates it on the builder. No Gemini key or local HTTP proxy is included. Check the EAS account/project setup and test the resulting APK on both devices. No build has yet been run.

## Suggested script

1. Explain the regional used-book marketplace and show the online catalog and search, if the network and test account work.
2. Show the seller form. If the local network works, generate a synopsis and review it manually. Otherwise enter it manually. Explain that public AI needs an authenticated HTTPS backend.
3. Explain that WhatsApp opens a prepared message and that a snapshot is saved first; do not send a real message.
4. Show the clearly labeled demo as a fallback. Its 12 sample listings do not persist or perform transactions. The text is available offline; cover images require internet and otherwise use an illustration.
5. Explain pending security rules, backend moderation, identity verification and the Firestore/Realtime Database requirement divergence.

## Oral questions

**Why use a backend for Gemini?** A key embedded in an app can be extracted; a server can hold it and authenticate and limit requests.

**Does a generated synopsis prove the book description is correct?** No. A model can make mistakes; the seller should review and edit it.

**Does opening WhatsApp send a message?** No. The link opens a conversation with prepared text; the user decides whether to send.

**What is a snapshot?** A copy of the relevant book and seller fields saved when a contact is initiated. It preserves the context even if the ad changes or is removed, subject to the database rules.

**Does a snapshot prove a transaction occurred?** No. It records the app's contact attempt, not a sent message, payment or sale.

**Why can't the client suspend a seller safely?** A modified client can bypass checks, and simultaneous reports can race. Trusted server transactions and security rules are required.

**Does a valid CPF prove identity?** No. Format/check digits only test plausibility; identity verification requires a separate trusted process.
