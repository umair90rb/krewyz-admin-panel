import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

var config = {
  apiKey: "AIzaSyCWL15DfI1l-DVWLe6SMsEKL8lNdATMwrk",
  authDomain: "kerwyz.firebaseapp.com",
  projectId: "kerwyz",
  storageBucket: "kerwyz.appspot.com",
  messagingSenderId: "477250088726",
  appId: "1:477250088726:web:9ce98d08b843b2abb46a37",
};
const app = firebase.initializeApp(config);

const secondary = firebase.initializeApp(config, "secondary");

export const auth = app.auth();
export const db = app.firestore();
export const secondaryAuth = secondary.auth();
export default app;
