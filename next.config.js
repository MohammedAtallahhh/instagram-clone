/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FIREBASE_API_KEY: "AIzaSyBCDI4HRDY7kAl3ocE1tfIWD_PnB92qbDU",
    FIREBASE_AUTH_DOMAIN: "instagram-clone-b1cb2.firebaseapp.com",
    FIREBASE_PROJECT_ID: "instagram-clone-b1cb2",
    FIREBASE_STORAGE_BUCKET: "instagram-clone-b1cb2.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "595521939428",
    FIREBASE_APP_ID: "1:595521939428:web:2d71b0dff3cb28d32fc9f1",
  },

  images: { domains: ["firebasestorage.googleapis.com"] },
};

module.exports = nextConfig;
