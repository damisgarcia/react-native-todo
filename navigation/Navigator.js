import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Session from '../constants/Session';

import { CreateTodoButton, DestroyTodoButton } from './todo';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TodoScreen from '../screens/TodoScreen';
import TodoJoinScreen from '../screens/TodoJoinScreen';
import TodoFormModal from '../screens/TodoFormModal';

import Firebase from '../services/Firebase';

class Navigator extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.container}>
        <Router>
          <Scene key="root" hideNavBar>
            <Scene key="unauthorized" initial={!this.props.authorized}>
              <Scene key="login"
                component={LoginScreen}
                title="Login"
                />
            </Scene>
            <Scene key="authorized" initial={this.props.authorized}>
              <Scene
                key="home"
                component={HomeScreen}
                renderRightButton={CreateTodoButton}
                type="replace"
                title="Home"
                />
              <Scene
                key="todo"
                type="push"
                renderRightButton={DestroyTodoButton}
                component={TodoScreen}
                />
              <Scene
                key="todoJoin"
                component={TodoJoinScreen}
                title="Insert your code here"
                />
              <Scene
                key="todoForm"
                component={TodoFormModal}
                />
            </Scene>
          </Scene>
        </Router>
      </View>
    );
  }
}

export default Navigator;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: 'white'
  },
});
