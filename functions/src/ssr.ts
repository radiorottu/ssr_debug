const functions = require('./utils').functions

// Increase readability in Cloud Logging
require("firebase-functions/lib/logger/compat");

console.log(process.cwd());
const universal = require('../dist/rro-ssr/server/main').app();

exports.ssr = functions
  // .region('europe-west1')
  .runWith({
    timeoutSeconds: 60,
    memory: '256MB'
  })
  .https
  .onRequest(universal);