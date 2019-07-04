import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyD2Avoe7pkjI6p4VT4xa9QDSKgKqTj-f50",
    authDomain: "cleanwaterapp.firebaseapp.com",
    databaseURL: "https://cleanwaterapp.firebaseio.com",
    projectId: "cleanwaterapp",
    storageBucket: "",
    messagingSenderId: "631409384078",
    appId: "1:631409384078:web:1682f34491d44461"
};
const fire = firebase.initializeApp(config);
export default fire;