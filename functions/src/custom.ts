import { functions } from './utils';

functions.logger.log("Logging variable:", 'Logging content');

export const helloWorld = functions.https.onRequest((request: any, response: { send: (arg0: string) => void; }) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});