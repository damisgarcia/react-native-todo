import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';

import LogoutButton from '../components/LogoutButton';

export default class HomeScreen extends React.Component {
  state = {
    todos: [
      {
        name: "Lorem Ipsum 1",
        tasks: [
          {
            name: "Task 1",
            done: false
          },
          {
            name: "Task 2",
            done: false
          },
          {
            name: "Task 3",
            done: false
          }
        ]
      },
      {
        name: "Lorem Ipsum 2",
        tasks: [
          {
            name: "Task 1",
            done: false
          },
          {
            name: "Task 2",
            done: false
          },
          {
            name: "Task 3",
            done: false
          }
        ]
      },
      {
        name: "Lorem Ipsum 3",
        tasks: [
          {
            name: "Task 1",
            done: false
          },
          {
            name: "Task 2",
            done: false
          },
          {
            name: "Task 3",
            done: false
          }
        ]
      },
    ]
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { currentUser } = Firebase.auth();
    return (
      <ScrollView style={Layout.grid}>
        <Text style={Layout.padding} h2>Todo Lists</Text>
        <List>
          {
            this.state.todos.map((t, i) => (
              <ListItem
                button
                key={i}                
                onPress={ _=> Actions.todo({title: t.name}) }
                title={t.name} />
            ))
          }
        </List>
        <View style={Layout.padding}>
          <Text>Olá, {currentUser.email}</Text>
        </View>
        <LogoutButton />
      </ScrollView>
    );
  }
}
