const admin = require('firebase-admin')
const serviceAccount = require('./rro-app-2020-firebase-adminsdk-9tp90-fa6d2b35a0.json')
const https = require("https")
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


// firebase-admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rro-app-2020.firebaseio.com'
})

doIt()
.then(response => {
    console.log("all done")
})

const everyNthUser = 2

async function doIt() {
    let snapshots = await admin.firestore().collection("users").get()



    const mails = await Promise.all(snapshots.docs.map( async (user, index) => {
        if ((index + 1) % everyNthUser === 0) {
            console.log(user.id + " Do it")
            await admin.firestore().collection("users").doc(user.id).update({enableDeviceTracking: true})
        }
        else {
            console.log(user.id + " Don't it")
        }
    
    }))
}
