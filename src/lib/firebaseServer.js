// add server-only package to generate build time errors when not used on server

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth(app);

module.exports = { db, auth };
