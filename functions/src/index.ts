import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const APP_NAME = 'rro-ssr'; // TODO: change this!
// const universal = require(`${process.cwd()}/dist/${APP_NAME}/server/main`).app();
const universal = require(`../dist/${APP_NAME}/server/main`).app();

const DIST_FOLDER = require(`../dist/${APP_NAME}/server/main`).distFolder;

functions.logger.log("DIST_FOLDER:", DIST_FOLDER);
functions.logger.log("functions universal variable:", universal);

export const ssr = functions.https.onRequest(universal);