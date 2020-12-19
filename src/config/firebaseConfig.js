import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBsagpUJJ9qEVnkmgUE48Hshd1IcKXQUUI",
    authDomain: "min-pro-7f703.firebaseapp.com",
    databaseURL: "https://min-pro-7f703.firebaseio.com",
    projectId: "min-pro-7f703",
    storageBucket: "min-pro-7f703.appspot.com",
    messagingSenderId: "794957373668",
    appId: "1:794957373668:web:c826495a9763fc77"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;