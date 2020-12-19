const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors())
app.use(bodyParser.json());


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello ninjas");
});


app.post('/', function(request, response) {
    /* It is a good idea to log all events received. Add code *
   * here to log the signature and body to db or file       */
    console.log(request);
    // retrieve the signature from the header
    var hash = request.headers["verif-hash"];
    
    if(!hash) {
      // discard the request,only a post with the right Flutterwave signature header gets our attention 
    }
    
    // Get signature stored as env variable on your server
    const secret_hash = 'mumspring_hash';
    
    // check if signatures match
    
    if(hash !== secret_hash) {
     // silently exit, or check that you are passing the right hash on your server.
    }
    
    // Retrieve the request's body
    var request_json = JSON.parse(request.body);
    console.log(request_json);
  
    // Give value to your customer but don't give any output
  // Remember that this is a call from rave's servers and 
  // Your customer is not seeing the response here at all
  
    response.send(200);
});

exports.checkIfUserPaid = functions.https.onRequest(app);

exports.getCountryStatesAndCities = functions.https.onRequest(async (request, response) => {
    let db = admin.database();
    let ref = db.ref('countries-states-cities');

    await ref.on('value', snapshot => {
        response.json(snapshot.val());
    }, errorObj => {
        console.log(errorObj.code);
    });
});

const createNotification = (notification) => {
    return admin.firestore().collection('notifications').add(notification)
    .then(doc => console.log('notification added'));
}

exports.projectCreated = functions.firestore.document('project/{projectId}').onCreate(doc => {
    const project = doc.data();
    const notification = {
        content: 'Added a new project',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
})

exports.userJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        const notification = {
            content : 'Joined the party',
            user: `${newUser.firstName} ${newUser.lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        createNotification(notification);
    });
})