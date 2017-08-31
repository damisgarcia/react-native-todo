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

export default class TodoScreen extends React.Component {
  state = {
    name: ""
  }

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    if(this.props.model){
      this.setState({
        ...this.props.model
      })
    }
  }

  render() {
    let { currentUser } = Firebase.auth();
    return (
      <View style={styles.container}>
        <InputForm
          style={Layout.inputForm}
          value={this.state.name}
          placeholder="Todo Title"
          onChangeText={ (name)=> this.setState({name}) }
        />
        <Button
          raised
          title={this.props.submit}
          buttonStyle={Theme.btnPrimary}
          onPress={ _=> this.submit() }
          />
      </View>
    );
  }

  submit() {
    Todo.save(this.state)
    // Import for sync parent view
    Actions.pop({
      refresh: {
        title: this.state.name,
        todo: this.state, type: "replace"
      }
    });
  }
}

const styles = {
  container:{
    flex: 1,
    paddingBottom: 16
  },
}
