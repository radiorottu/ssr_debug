const admin = require('firebase-admin')
// Important, this serviceAcount file is not hosted on git. You can generate a new one in the firebase console or get it from cm/mf/vr
const serviceAccount = require('./rro-app-2020-firebase-adminsdk-9tp90-fa6d2b35a0.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rro-app-2020.firebaseio.com',
    storageBucket: 'rro-app-2020.appspot.com',
})



const storyId = "9999" // needs to be string
const categories = ["9999"] // default 2 = Wallis
const email = "n.zengaffinen@mengisgruppe.ch" 
const firstName = "Norbert"
const lastName = "Zengaffinen"
const short = "zen"
const tags = ["Notfall","Stromausfall"]
const bildlegende = "Bildlegende"
const source = "rro"
const dachzeile = "Dachzeile"
const title = "Nachrichttitel"
const lead = "Lead"
const text = "<p>Lorem ipsum dolor sit &auml;met.</p>"
const textNoHtml = "Lorem ipsum dolor sit ämet."
// rro logo bild standard
const pictureLink = "https://firebasestorage.googleapis.com/v0/b/rro-app-2020.appspot.com/o/stories%2Fnotfall%2FMedienlogos_1920x1080px_gross_RGB3.jpg?alt=media&token=2582fad4-900c-4b31-be0d-e34f9b721db7"


const storyElement = [
    {
        type: "Medienstrecke",
        content: [
            {
                type: "Bild",
                content: [
                    {type: "link", value: pictureLink},
                    {type: "label", value: bildlegende},
                    {type: "source", value: source}
                ]
            }
        ]

    },
    {
        type: "Dachzeile",
        content: [
            {type: "text", value: dachzeile}
        ]
    },
    {
        type: "Bild",
        content: [
            {type: "link", value: pictureLink},
            {type: "label", value: bildlegende},
            {type: "source", value: source}
        ]
    },
    {
        type: "Titel 1",
        content: [
            {type: "text", value: title}
        ]
    },
    {
        type: "Lead",
        content: [
            {type: "text", value: lead}
        ]
    },
    {
        type: "Textblock",
        content: [
            {type: "text", value: text},
            {type: "text", value: textNoHtml}
        ]
    }
]



const story = {
    categories: categories,
    commentCount: 0,
    dateTime: admin.firestore.FieldValue.serverTimestamp(),
    email: email,
    firstName: firstName,
    lastName: lastName,
    short: short,
    tags: tags,
    storyElement: storyElement
}



return admin.firestore().collection("stories").doc(storyId).set(story)
