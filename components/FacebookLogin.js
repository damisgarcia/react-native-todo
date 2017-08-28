import React from 'react';
import { View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { Button }  from 'react-native-elements';

import Colors from "../constants/Colors";

import UserCallbacks from "../hooks/UserCallbacks";

const PERMISSIONS = ["public_profile","email"];

export default class FacebookLogin extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
    return (
      <View>
        <Button title="Logar com o Facebook" onPress={ _=> this.login() }/>
      </View>
    );
  };
  async login(){
    await LoginManager.logInWithReadPermissions(PERMISSIONS);

    AccessToken.getCurrentAccessToken().then( (result)=> {
      if (result.isCancelled) {
        alert("login has error: " + result.error);
      } else{
        UserCallbacks.signInWithFacebookSuccess(result.accessToken.toString()).then(this.props.onLoginFinished);
      }
    }, (error) => {
      alert('Login fail with error: ' + error);
    });
  }
}

const styles = {
  container: {
    flex: 1
  }
};
