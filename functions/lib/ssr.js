"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// Increase readability in Cloud Logging
require("firebase-functions/lib/logger/compat");
const expressApp = require('../dist/rro-ssr/server/main').app();
exports.ssr = utils_1.functions
    .region('us-central1')
    .runWith({})
    .https
    .onRequest(expressApp);
//# sourceMappingURL=ssr.js.map