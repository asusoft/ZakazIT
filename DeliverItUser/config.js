import * as firebase from "firebase";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBL74Tn1_u1Etu-l1V4k3jByv7AI_I_Is4",
  authDomain: "deliverit-376618.firebaseapp.com",
  projectId: "deliverit-376618",
  storageBucket: "deliverit-376618.appspot.com",
  messagingSenderId: "984805401963",
  appId: "1:984805401963:web:adb154ddd988af779b582e",
  measurementId: "G-Q1QQMY8HGW"
};

// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth }