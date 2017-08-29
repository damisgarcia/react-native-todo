import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Button, FormInput, FormLabel } from 'react-native-elements';

import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Session from '../constants/Session';

import UserCallbacks from '../hooks/UserCallbacks';

import FacebookLogin from '../components/FacebookLogin';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: ''
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={Layout.col}>
          <View style={[styles.container,styles.red]}>
            <FacebookLogin onLoginFinished={this.onLoginFinished}></FacebookLogin>
          </View>
        </View>
      </View>
    );
  }

  onLoginFinished() {
    Actions.authorized()
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});
