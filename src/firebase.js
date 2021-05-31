import firebase from "firebase/app";

var config = {
    apiKey: "AIzaSyA-cDLAiIduSWI55kVCd-gI2kvlAtBeoQs",
    authDomain: "breender-seba.firebaseapp.com",
    projectId: "breender-seba",
    storageBucket: "breender-seba.appspot.com",
    messagingSenderId: "1008139166849",
    appId: "1:1008139166849:web:55940849c0e546d9899980"
};

var firebaseApp = firebase.initializeApp(config);

export default firebaseApp;