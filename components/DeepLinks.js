import Expo, { Constants } from "expo";
import React from 'react';

import {
  Platform,
  Text,
  Linking,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import URL from "url";

class DeepLinks extends React.Component {
  componentDidMount() {
    console.log(Constants.linkingUri)
    // if (Platform.OS === 'android') {
    //   Linking.getInitialURL().then((url) => {
    //     if(url){
    //       console.log(url);
    //       // this.navigate(url);
    //     }
    //   }).catch(err => console.error('An error occurred', err));
    // } else {
    //   Linking.addEventListener('url', this.handleOpenURL);
    // }
  }

  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }

  navigate = (url) => { // E
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    if (routeName === 'todo') {
      Actions.home()
    };
  }
  render() {
    return <View></View>;
  }
}
export default DeepLinks;
