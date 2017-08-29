import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';

import LogoutButton from '../components/LogoutButton';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { currentUser } = Firebase.auth();
    return (
      <ScrollView style={Layout.grid}>
        <View style={Layout.padding}>
          <Text>Olá, {currentUser.email}</Text>
        </View>
        <LogoutButton />
      </ScrollView>
    );
  }
}
