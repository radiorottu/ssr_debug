const admin = require('firebase-admin')
// Important, this serviceAcount file is not hosted on git. You can generate a new one in the firebase console or get it from cm/mf/vr
const serviceAccount = require('./rro-app-2020-firebase-adminsdk-9tp90-fa6d2b35a0.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rro-app-2020.firebaseio.com',
    storageBucket: 'rro-app-2020.appspot.com',
})

test4()

async function test4() {
    const snapshot = await admin.firestore().collection("categories").get()
    const categories = {

    }
    stories = []

    snapshot.forEach(snap => {
        categories[snap.id] = {name: snap.data().category, color: snap.data().color}
    })

    const newsSnapshot = await admin.firestore().collection("stories-paywall").get()

    newsSnapshot.forEach(snap => {
        const categoryid = snap.data().categories[0]


        stories.push({id: snap.id, categoryName: categories[categoryid].name, categoryColor: categories[categoryid].color})

        
    })

    for (story of stories) {
        await admin.firestore().collection("stories-paywall").doc(story.id).update({categoryName: story.categoryName, categoryColor: story.categoryColor})
        console.log(story.id)
    }
}

async function test3() {


    const snapshot = await admin.firestore().collection("storyGroups")
    .where('stories', 'array-contains','10066').get()


    snapshot.forEach(snap => {
        console.log(snap.id)
    })
}


async function updateCommentCountOfStories2() {





    const querySnapshot = await admin.firestore().collection("stories-paywall").orderBy("storyGroups", "desc").get()

    listOfIds = []

    querySnapshot.forEach(snapshot => {
        const data = snapshot.data()
        if (data.storyGroups !== undefined) {
            listOfIds.push(snapshot.id)
        }
    })

    for (id of listOfIds) {
        const doc = await admin.firestore().collection("stories-paywall").doc(id).get()
        const data = doc.data()

        const storyGroup = await admin.firestore().collection("storyGroups").doc(data.storyGroups[0]).get()
        const title = storyGroup.data().title

        await admin.firestore().collection("stories-paywall").doc(id).update({"storyGroupTitle": title})

        console.log(doc.id + " " + title)
    }


}


// Counts all greenlit comments and updates the commentCount of stories, only debug function, not needed
async function updateCommentCountOfStories() {
    let storyIds = []
    let storyGroupIds = {}


    const querySnapshot = await admin.firestore().collection("storyGroups").get()



    querySnapshot.forEach(function(doc) {
        let data = doc.data()

        data.stories.forEach(storyId => {
            if (storyGroupIds[storyId] === undefined) {
                storyGroupIds[storyId] = [doc.id]
            }
            else {
                storyGroupIds[storyId].push(doc.id)
            }
        })

        storyIds = storyIds.concat(data.stories)
        
    });

    console.log()

    for (const idPairing of Object.entries(storyGroupIds)) {
        

        if (idPairing[0] !== '') {
            try {
                const ref = await admin.firestore().collection("stories-paywall").doc(idPairing[0]).update({"storyGroups": idPairing[1]})
                console.log(ref)
            }
            catch(err) {
                console.log(err)
            }
            
            
            
        }

    }


    /*
    for (storyId of storyIds) {
        const story = await admin.firestore().collection("stories-paywall").doc(storyId).get()

        //const story = story.data()

        
    }

    console.log(storyIds)


    
    /*
        for (const [key, value] of Object.entries(storyDict)) {
            admin.firestore().collection('stories-paywall').doc(key).update({ 'commentCount': value })
        }
    */
    

}