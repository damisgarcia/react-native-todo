import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCHgghTlIb1Al1e4lhf0wYmx3gWGbkHxYE",
  authDomain: "todo-3b459.firebaseapp.com",
  databaseURL: "https://todo-3b459.firebaseio.com",
  projectId: "todo-3b459",
  storageBucket: "todo-3b459.appspot.com",
  messagingSenderId: "41395065013"
};

export var UID = null

export const Facebook = {
  auth: async (token, callback, onError) => {
    try {
      let credential = Facebook.credential(token);
      Firebase.auth().signInWithCredential(credential).then( (response)=> {
        UID = response.uid
        callback(response)
      }).catch(onError);
    } catch (e) {
      console.log(e)
    }
  },
  credential: (token) => {
    return firebase.auth.FacebookAuthProvider.credential(token);
  },
}

const Firebase = firebase.initializeApp(config);

export default Firebase
