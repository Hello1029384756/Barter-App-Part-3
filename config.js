import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyA6h3M_MT_DvclQgkpwBySlnyEZd1x-RWc",
  authDomain: "storyhub-f8467.firebaseapp.com",
  databaseURL: "https://storyhub-f8467.firebaseio.com",
  projectId: "storyhub-f8467",
  storageBucket: "storyhub-f8467.appspot.com",
  messagingSenderId: "722092586012",
  appId: "1:722092586012:web:0466415f4d87464063dbd9",
  measurementId: "G-N72W6Q3DF0"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore()