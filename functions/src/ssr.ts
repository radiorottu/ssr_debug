import { functions } from './utils';

const APP_NAME = 'rro-ssr'; // TODO: change this!
const universal = require(`../dist/${APP_NAME}/server/main`).app();

export const ssr = functions.https.onRequest(universal);