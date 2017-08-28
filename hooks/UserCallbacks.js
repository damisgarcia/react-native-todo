import { Actions } from 'react-native-router-flux';

import Session from '../constants/Session';
import FireBaseApp from '../constants/FirebaseApp';

import { AccessToken } from 'react-native-fbsdk';

export default {
  signInWithFacebookSuccess: (error, result) => {
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          alert(data.accessToken.toString())
        }
      )
    }
  },
  signInWithEmailAndPasswordSuccess: (data, password) => {
    createUserProfile(data)
    Session.create(data, password)
    Actions.authorized()
  },
  signInWithEmailAndPasswordFail: (error) => {
    console.warn(error);
  },
  createUserWithEmailAndPasswordSuccess: (data, password) => {
    createUserProfile(data)
    Session.create(data, password)
    Actions.authorized()
  },
  createUserWithEmailAndPasswordFail: (error) => {
    console.warn(error);
  }
}

async function createUserProfile(user) {
  await FireBaseApp.database().ref(`/users/${user.uid}/profile`).set({
    email: user.email,
  })
}
