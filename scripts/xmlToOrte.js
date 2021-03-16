const admin = require('firebase-admin')
const fs = require("fs")
const parser = require("fast-xml-parser");
// Important, this serviceAcount file is not hosted on git. You can generate a new one in the firebase console or get it from cm/mf/vr
const serviceAccount = require('./rro-app-2020-firebase-adminsdk-9tp90-fa6d2b35a0.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rro-app-2020.firebaseio.com',
    storageBucket: 'rro-app-2020.appspot.com',
})

const db = admin.database();
const ref = db.ref("wetter");
const orteRef = ref.child("orte");
const regionenRef = ref.child("regionen");




const xmlString = fs.readFileSync('walliswetter_locations.xml', 'utf8');
var jsonObj = parser.parse(xmlString);
const locations = jsonObj.locations.location


return Promise.all(locations.map(location => {
    return orteRef.child(location.location_id).set(location).then(response => {
        console.log(location.station_name +" set")
    })
    
}))
.then(response => {
    console.log("all done")

    let regions = [ {
        cams: []
    }, {
        cams: []
    }, {
        cams: []
    }, {
        cams: []
    }, {
        cams: []
    }, {
        cams: []
    }]

    locations.forEach(location => {
        if (location.cam_region !== undefined && location.cam_region !== "") {
            regions[ (location.cam_region-1) ].name = location.region_name

            let already = regions[(location.cam_region-1)].cams.find(cam => {
                return cam.cam_id === location.cam_id
              })
              
            if (already === undefined) {
                regions[(location.cam_region-1)].cams.push({
                    cam_id: location.cam_id,
                    cam_name: location.cam_name,
                    cam_panorama: location.cam_anorama !== 0,
                    cam_path: location.cam_path,
                    cam_moving: location.cam_moving || 0
                })
            }

        }
    })


    return Promise.all(regions.map((region, index) => {
        return regionenRef.child(index+1).set(region).then(response => {
            console.log(region.name +" set")
        })
    }))



    
})
.then(response => {
    console.log("all Set")
})



