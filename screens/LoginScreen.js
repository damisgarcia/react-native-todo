import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Button, FormInput, FormLabel } from 'react-native-elements';

import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Session from '../constants/Session';
import FireBaseApp from '../constants/FirebaseApp';

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
        <ScrollView style={Layout.grid}>
          <View style={Layout.col}>
            <FacebookLogin></FacebookLogin>
          </View>
        </ScrollView>
      </View>
    );
  }

  login() {
    FireBaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then( data => UserCallbacks.signInWithEmailAndPasswordSuccess(data, this.state.password))
      .catch(UserCallbacks.signInWithEmailAndPasswordFail)
  }
}



const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
};
