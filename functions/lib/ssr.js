"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// Increase readability in Cloud Logging
require("firebase-functions/lib/logger/compat");
const expressApp = require('../dist/rro-ssr/server/main').app();
const DIST_FOLDER = require('../dist/rro-ssr/server/main').DIST_FOLDER;
utils_1.functions.logger.log("Hello from info. Here's an object:", DIST_FOLDER);
exports.ssr = utils_1.functions
    .region('us-central1')
    .runWith({})
    .https
    .onRequest(expressApp);
//# sourceMappingURL=ssr.js.map