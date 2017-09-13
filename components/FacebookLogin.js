import Expo from 'expo';
import React from 'react';
import { View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { Button }  from 'react-native-elements';

import Colors from "../constants/Colors";
import FacebookConst from "../constants/FacebookConst";

import UserCallbacks from "../hooks/UserCallbacks";

const PERMISSIONS = ["public_profile","email"];
const ICONSTYLE = {
  name: 'logo-facebook',
  type:'ionicon'
}

export default class FacebookLogin extends React.Component{
  state = {
    disabled:  false
  }
  constructor(props){
    super(props);
  };
  render(){
    return (
      <View style={styles.container}>
        <Button large buttonStyle={styles.buttonStyle} icon={ICONSTYLE} title="Fazer Login com o Facebook" onPress={ _=> this.login() } disabled={this.state.disabled} color="white"/>
      </View>
    );
  };
  async login(){
    this.setState({disabled: true})

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FacebookConst.appId, {
      permissions: ['public_profile','email'],
    });


    if (type === 'success') {
      await UserCallbacks.signInWithFacebookSuccess(token).then( (data) => {
        this.props.onLoginFinished(data)
        this.setState({disabled: false})
      }).catch( _=> {
        this.setState({disabled: false})
      })
    } else {
      this.setState({disabled: false})
    }
  }
}

const styles = {
  container: {
    marginVertical: 8,
  },
  buttonStyle: {
    backgroundColor: "#3b5998"
  }
};
