const admin = require('firebase-admin')

let serviceAccount = require('./firebaseKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://barsitter-react.firebaseio.com"
})

let db = admin.firestore()
db.settings({timestampsInSnapshots: true})

module.exports = db