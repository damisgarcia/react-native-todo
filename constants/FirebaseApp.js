import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCHgghTlIb1Al1e4lhf0wYmx3gWGbkHxYE",
  authDomain: "todo-3b459.firebaseapp.com",
  databaseURL: "https://todo-3b459.firebaseio.com",
  projectId: "todo-3b459",
  storageBucket: "todo-3b459.appspot.com",
  messagingSenderId: "41395065013"
};

const FireBaseApp = firebase.initializeApp(config);
// FacebookLogin connnector
export const FacebookAuthProvider = firebase.auth.FacebookAuthProvider

export default FireBaseApp;
