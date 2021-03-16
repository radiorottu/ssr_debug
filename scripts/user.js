const admin = require('firebase-admin')
// Important, this serviceAcount file is not hosted on git. You can generate a new one in the firebase console or get it from cm/mf/vr
const serviceAccount = require('./rro-app-2020-firebase-adminsdk-9tp90-fa6d2b35a0.json')

const ftp = require("ftp")
const fs = require("fs")
const xml2js = require("xml2js")
const { app } = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rro-app-2020.firebaseio.com',
    storageBucket: 'rro-app-2020.appspot.com',
})

return new Promise((resolve, reject) => {

    const meteoFTP = new ftp();
    meteoFTP.connect({
        host: "ftp1.meteomedia.ch",
        user: "wetter_radiorottu",
        password: "Leequei8"
    });

    let dateToday = new Date();
    let dateTodayString ;
    dateToday.setDate(dateToday.getDate());
    dateTodayString = dateToday.getFullYear() + ('0' + (dateToday.getMonth() + 1)).slice(-2) + ('0' + dateToday.getDate()).slice(-2);

    console.log(dateTodayString)

    process.exit()

    meteoFTP.on('ready', function () {
        meteoFTP.get('radio_rottu_oberwallis_prognose_prognose_' + dateTodayString + '.xml', function (err, stream) {
            if (err) reject(err);
            stream.once('close', function () { meteoFTP.end(); });

            stream.pipe(fs.createWriteStream('C:\\Users\\hansi\\Documents\\prognosen.xml').on('close', function () {
                fs.readFile('C:\\Users\\hansi\\Documents\\prognosen.xml', 'latin1', (fserr, data) => {
                    if (fserr) reject(fserr);

                    xml2js.parseString(data, (xmlerr, res) => {
                        if (xmlerr) reject(xmlerr);

                        res.WETTER.DATEN.map((element) => {
                            let station = {};
                
                            let id = element['$'].StationsID;
                
                            station.Ort = element['$'].Ort;
                            station.Sendedatum = element['$'].Sendedatum;
                            station.Startdatum = element['$'].Startdatum;
                            station.Enddatum = element['$'].Endedatum;
                
                            element['ZEITREIHE'].map((zeitreihe) => {
                                let typ = zeitreihe['$'].Typ;
                                station[typ] = {};
                
                                zeitreihe['WERT'].filter((wert) => wert['$'].Value != "X").map((wert, i) => {
                                    let datum = wert['$'].Datum;
                                    let value = wert['$'].Value;
                                    station[typ][i] = { Datum: datum, Value: value }
                                })
                
                            })
                
                            return admin.database().ref('wetter/prognosen/' + id).set(station).catch(fbErr => {
                                console.error(fbErr);
                            })
                        })
                    })
                });
            }));
        });
    });
}).catch(err => {
    console.error("error");
})