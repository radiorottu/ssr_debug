import { functions } from './utils';

// Increase readability in Cloud Logging
require("firebase-functions/lib/logger/compat");

const expressApp = require('../dist/rro-ssr/server/main').app();

const DIST_FOLDER = require('../dist/rro-ssr/server/main').DIST_FOLDER;

functions.logger.log("Hello from info. Here's an object:", DIST_FOLDER);

exports.ssr = functions
  .region('us-central1')
  .runWith({})
  .https
  .onRequest(expressApp);
