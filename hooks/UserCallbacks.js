import { Actions } from 'react-native-router-flux';
import { AccessToken } from 'react-native-fbsdk';

import Session from '../constants/Session';

import { Facebook } from '../services/Firebase';
import { User } from '../services/Models';

export default {
  signInWithFacebookSuccess: async (token) =>{
    return new Promise( (resolve, reject) => {
      Facebook.auth(token, (user)=> {
        User.create(user).then(() =>{
          Session.create(token).then( _=> resolve(user));
        });
      }, (error)=> {
        reject(error)
      })
    })
  },
}
