import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

//Some of these values are located in android/app/google-services.json downloaded from FB
const config = {
  apiKey: "AIzaSyABXjosnakuQ7lQj0u-JnHtDmvMu9GwvOw",
  authDomain: "barcodes-5b881.firebaseapp.com",
  databaseURL: "https://barcodes-5b881.firebaseio.com", //located on Authentication page in FB
  projectId: "barcodes-5b881",
  storageBucket: "barcodes-5b881.appspot.com",
  messagingSenderId: "427902891794" //located under settings/Cloud Messaging from the FB Project
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
