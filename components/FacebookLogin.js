import React from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

import Colors from "../constants/Colors";

import UserCallbacks from "../hooks/UserCallbacks";

const PERMISSIONS = ["publish_actions"];

export default class FacebookLogin extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
    return (
      <View>
        <LoginButton
          publishPermissions={PERMISSIONS}
          onLoginFinished={UserCallbacks.signInWithFacebookSuccess}
          onLogoutFinished={() => alert("logout.")}></LoginButton>
      </View>
    );
  };
}

const styles = {
  container: {
    flex: 1
  }
};
