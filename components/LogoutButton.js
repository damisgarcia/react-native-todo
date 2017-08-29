import React from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button }  from 'react-native-elements';

import Theme from '../constants/Theme';
import Session from '../constants/Session';

import Firebase from '../services/Firebase';

export default class LogoutButton extends React.Component {
  render(){
    return <Button buttonStyle={Theme.btnPrimary} raised title="Sair" onPress={ _=> this.destroySession() }/>;
  }

  destroySession(){
    Firebase.auth().signOut()
    .then( _=> {
      Session.destroy()
      Actions.unauthorized({type: ActionConst.RESET})
    })
    .catch( error => {
      console.warn(error)
      Actions.login()
    })
  }
}
