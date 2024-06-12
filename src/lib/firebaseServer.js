// add server-only package to generate build time errors when not used on server

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);
const config = { credential: cert(serviceAccount) };

const getOrInitialzeApp = () => {
  const apps = getApps();
  const app = apps.length == 0 ? initializeApp(config) : apps[0];
  return app;
};

const app =
  process.env.NODE_ENV === 'production'
    ? initializeApp(config)
    : getOrInitialzeApp();

const db = getFirestore();
const auth = getAuth(app);

module.exports = { db, auth };
