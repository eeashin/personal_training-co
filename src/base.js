import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyChFaqDRqt3D4QI4FWXL1DQw-LaDCkyU4c",
  authDomain: "personaltrainingco-41aaf.firebaseapp.com",
  databaseURL: "https://personaltrainingco-41aaf.firebaseio.com",
  projectId: "personaltrainingco-41aaf",
  storageBucket: "personaltrainingco-41aaf.appspot.com",
  messagingSenderId: "554220852285"
};
const app = firebase.initializeApp(config);

export default app;    