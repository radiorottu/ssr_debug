import { functions } from './utils';

exports.helloWorld = functions.https.onRequest((request: any, response: { send: (arg0: string) => void; }) => {
    response.send("Hello from Firebase!")
});