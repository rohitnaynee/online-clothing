import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyArxLd8pmhmdUL7PQ5orc5OHyAOpHA5QTE",
    authDomain: "online-clothing-c6c56.firebaseapp.com",
    databaseURL: "https://online-clothing-c6c56.firebaseio.com",
    projectId: "online-clothing-c6c56",
    storageBucket: "online-clothing-c6c56.appspot.com",
    messagingSenderId: "1036443426724",
    appId: "1:1036443426724:web:39c65be124bddd58f52b31",
    measurementId: "G-QD20JW5ZKS"
  };

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;