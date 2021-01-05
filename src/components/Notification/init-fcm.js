import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyC51ocG83jqjKcS6QxQp3MZk9wIM50thpY",
  authDomain: "isofh-emr.firebaseapp.com",
  databaseURL: "https://isofh-emr.firebaseio.com",
  projectId: "isofh-emr",
  storageBucket: "isofh-emr.appspot.com",
  messagingSenderId: "654597310639",
  appId: "1:654597310639:web:ddc08e53532b87e6072c5a",
  measurementId: "G-3EB9BV7083",
});
let messaging;
if (firebase.messaging.isSupported()) {
  messaging = initializedFirebaseApp.messaging();
  messaging.usePublicVapidKey(
    // Project Settings => Cloud Messaging => Web Push certificates
    "BKKAjt5KcnX7_E561TTXXP1c-0jpPXqx-O3c3SCzcK-sH6q07hA3mJaj0WW0ajRqYliInrrg6pj9tsClrhlbjpk"
  );
}
export { messaging };
