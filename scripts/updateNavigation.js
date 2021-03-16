
// this script is more of a "Helper Framework" than finished scripts. Call the functions you need and run the script.


const admin = require('firebase-admin')
// Important, this serviceAcount file is not hosted on git. You can generate a new one in the firebase console or get it from cm/mf/vr
const serviceAccount = require('./rro-app-2020-b13b849d2b2c.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rro-app-2020.firebaseio.com',
    storageBucket: 'rro-app-2020.appspot.com',
})

// How to update navigation:

// 1: get navigation by ID -> run this script by calling: getNavigation(DOCUMENT_ID, [desktopNavigation / navigation])
// 2: open the outputted json data in a text editor and edit it
// 3: put the edited json in this file and update the database -> run this script by calling: updateNavigation(DOCUMENT_ID, [desktopNavigation / navigation], jsonData) // see below for example

function getNavigation(navigationId, navigationType) {
  return admin.firestore().collection(navigationType).doc(navigationId).get()
  .then(document => {
    if (document.exists) {
      console.log(document.data())
    }
  })

}

function updateNavigation(navigationId, navigationType, jsonData) {
  return admin.firestore().collection(navigationType).doc(navigationId).update(jsonData)
  .then(document => {
    if (document.exists) {
      console.log(document.data())
    }
  })
}

/* 

example of getting data:

getNavigation('desktopNavigation', 'desktopNavigation');

example of updating the data after editing:

let jsonData = {
  navigationItems: [
    { label: 'Wallis', link: '/storyFeed/Wallis', external: false },
    { external: false, label: 'Schweiz', link: '/storyFeed/Schweiz' },
    {
      label: 'International',
      link: '/storyFeed/International',
      external: false
    },
    { external: false, label: 'Politik', link: '/storyFeed/Politik' },
    {
      external: false,
      label: 'Wirtschaft',
      link: '/storyFeed/Wirtschaft'
    },
    {
      external: false,
      label: 'Tourismus',
      link: '/storyFeed/Tourismus'
    },
    { external: false, label: 'Sport', link: '/storyFeed/Sport' },
    { external: false, label: 'Kultur', link: '/storyFeed/Kultur' },
    {
      external: false,
      label: 'Gesellschaft',
      link: '/storyFeed/Gesellschaft'
    },
    { external: false, label: 'In Memoriam', link: '/inmemoriamFeed' },
    {
      external: true,
      label: 'ePaper',
      link: 'https://epaper.walliserbote.ch'
    },
    {
      external: true,
      label: 'rro',
      link: 'https://rro-startseite.webflow.io/'
    }
  ]
}

updateNavigation('desktopNavigation', 'desktopNavigation', jsonData);

*/
