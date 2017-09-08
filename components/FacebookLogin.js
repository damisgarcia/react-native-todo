import Expo from 'expo';
import React from 'react';
import { View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { Button }  from 'react-native-elements';

import Colors from "../constants/Colors";

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

    alert("Updated!")

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('135375410407639', {
      permissions: ['public_profile','email'],
    });

    if (type === 'success') {

      UserCallbacks.signInWithFacebookSuccess(token).then( (data) => {
        this.props.onLoginFinished(data)
        this.setState({disabled: false})
      });

      this.setState({disabled: true})
    }
  }
  // async login(){
  //   this.setState({disabled: true})
  //   try {
  //     console.log(LoginManager.logInWithReadPermissions)
  //     await LoginManager.logInWithReadPermissions(PERMISSIONS);
  //     AccessToken.getCurrentAccessToken().then( (result)=> {
  //       if (result.isCancelled) {
  //         alert("login has error: " + result.error);
  //       } else{
  //         UserCallbacks.signInWithFacebookSuccess(result.accessToken.toString()).then( (data) => {
  //           this.props.onLoginFinished(data)
  //           this.setState({disabled: false})
  //         });
  //       }
  //     }, (error) => {
  //       this.setState({disabled: false})
  //       alert('Login fail with error: ' + error);
  //     });
  //   } catch (e) {
  //     alert(e)
  //     this.setState({disabled: false})
  //   }
  // }
}

const styles = {
  container: {
    marginVertical: 8,
  },
  buttonStyle: {
    backgroundColor: "#3b5998"
  }
};
