import Expo, {
  Notifications
} from 'expo';
import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Facebook, UID } from './services/Firebase';

import Session from './constants/Session';

import Navigator from './navigation/Navigator';

export default class MainApplication extends React.Component {
  state = {
    isAuthorized: false,
    isReady: false
  }
  constructor(){
    super();

    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
  componentWillMount(){
    this._cacheResourcesAsync();
  }
  render(){
    if(this.state.isReady){
      return (
        <Navigator authorized={this.state.isAuthorized}/>
      );
    } else{
      return <Expo.AppLoading/>;
    }
  }

  async _cacheResourcesAsync(){
    // siginWithCredential
    await Session.get().then((token) => {
      if(token){
        Facebook.auth(token, (user)=> {
          this.setState({isAuthorized: true, isReady: true});
        },
        (error) => {
          this.setState({isReady: true});
        })
      } else{
        this.setState({isReady: true})
      };
    });
  }
  _handleNotification = (notification) => {
    console.log(notification)
  };
}

// AppRegistry.registerComponent('MainApplication', () => MainApplication() );
Expo.registerRootComponent(MainApplication);
