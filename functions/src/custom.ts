import { functions } from './utils';

export const helloWorld = functions.https.onRequest((request: any, response: { send: (arg0: string) => void; }) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});