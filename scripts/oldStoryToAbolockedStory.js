const admin = require('firebase-admin')
const _ = require('lodash');
// Important, this serviceAcount file is not hosted on git. You can generate a new one in the firebase console or get it from cm/mf/vr
const serviceAccount = require('./rro-app-2020-firebase-adminsdk-9tp90-fa6d2b35a0.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rro-app-2020.firebaseio.com',
    storageBucket: 'rro-app-2020.appspot.com',
})





/*oldStoryToAbolockedStory("7158")
.catch(err => {
    console.log(err)
})*/

convertAllStories()

async function convertAllStories() {
    let storySnapshot = await admin.firestore().collection("stories").get()

    let stories = []

    storySnapshot.forEach(doc => {
        stories.push({ story: doc.data(), id: doc.id})
    });


    await Promise.all(stories.map(story => oldStoryToAbolockedStory(story.story, story.id)))
    console.log("DONE")
}

async function oldStoryToAbolockedStory(story, id) {
    let storyDb = story

    const storyElement = storyDb.storyElement
    delete storyDb.storyElement

    storyDb.title = _.get(storyElement.find(storyElement => storyElement.type === 'Titel 1'), "content[0].value", "")
    storyDb.lead = _.get(storyElement.find(storyElement => storyElement.type === 'Lead'), "content[0].value", "")
    storyDb.mainMedienStrecke = storyElement.find(storyElement => storyElement.type === 'Medienstrecke', {type: "Medienstrecke", content: []})


    await admin.firestore().collection("stories-paywall").doc(id).set(storyDb)
    await admin.firestore().collection("stories-paywall/"+id+"/paywall-data").doc("storyElement").set({storyElement: storyElement})

    console.log(id + " successfully set")
    
}