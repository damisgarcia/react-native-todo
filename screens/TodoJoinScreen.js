import React from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import {
  Text,
  Button,
  Icon,
} from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

import Colors from '../constants/Colors';
import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';
import { Todo } from '../services/Models';

import InputForm from '../components/InputForm';

export default class TodoJoinScreen extends React.Component {
  state = {
    code: ""
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <InputForm
          style={Layout.inputForm}
          autoFocus={true}
          value={this.state.code}
          placeholder="Join Code"
          onChangeText={ (code)=> this.setState({code}) }
        />
        <Button
          raised
          title="Join"
          buttonStyle={Theme.btnPrimary}
          onPress={ _=> this.submit() }
          />
      </View>
    );
  }

  submit() {
    Todo.joinMember(this.state.code, ()=> {
      Actions.pop()
    })
  }
}

const styles = {
  container:{
    flex: 1,
    paddingBottom: 16
  },
}
