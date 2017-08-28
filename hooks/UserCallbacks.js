import { Actions } from 'react-native-router-flux';

import Session from '../constants/Session';
import FireBaseApp, { FacebookAuthProvider} from '../constants/FirebaseApp';

import { AccessToken } from 'react-native-fbsdk';

export default {
  signInWithFacebookSuccess: async (token) =>{
    const credential = FacebookAuthProvider.credential(token);
    return new Promise( (resolve, reject) => {
      FireBaseApp.auth().signInWithCredential(credential).then((user) => {
        Session.create(token);
        createUserProfile(user);
        resolve(user)
      }).catch((error)=>{
        reject(error)
      });
    })
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
    name: user.displayName,
    avatar: user.photoUrl
  })
}
