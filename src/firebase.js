import firebase from 'firebase/app';
import 'firebase/storage';

var config = {
    apiKey: 'AIzaSyA-cDLAiIduSWI55kVCd-gI2kvlAtBeoQs',
    authDomain: 'breender-seba.firebaseapp.com',
    projectId: 'breender-seba',
    storageBucket: 'breender-seba.appspot.com',
    messagingSenderId: '1008139166849',
    appId: '1:1008139166849:web:55940849c0e546d9899980',
};

const firebaseApp = firebase.initializeApp(config);
const storage = firebase.storage();

export { firebaseApp as default, storage };
