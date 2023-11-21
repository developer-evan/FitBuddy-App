// firebase config key setup
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn9AkHH9lyx8zXrvf0jxwrL_7lBrl-fpg",
  authDomain: "fitness-b9e6c.firebaseapp.com",
  projectId: "fitness-b9e6c",
  storageBucket: "fitness-b9e6c.appspot.com",
  messagingSenderId: "460677409122",
  appId: "1:460677409122:web:eb3cac8f36afccb3f6643b",
  measurementId: "G-7L5PK0DFW9",
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase};