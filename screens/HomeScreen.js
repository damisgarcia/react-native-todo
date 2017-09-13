import React from 'react';
import { Notifications } from 'expo';
import { ScrollView, View, Share } from 'react-native';
import { Text, Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import * as _ from "lodash";

import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';
import { Todo } from '../services/Models';
import { handleNotification } from '../services/Notification';

import LogoutButton from '../components/LogoutButton';

export default class HomeScreen extends React.Component {
  state = {
    todos: []
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Todo.all((snapshotData)=> {
      let todos = []

      snapshotData.forEach((child) => {
        todos.push({key: child.key, ...child.val()});
      })

      if(todos.length){
        this.setState({todos: todos})
      }
    })

    Notifications.addListener(handleNotification);
  }

  render() {
    let { currentUser } = Firebase.auth();

    return (
      <ScrollView style={Layout.grid}>
        <Text style={Layout.padding} h2>Todo Lists</Text>
        <List>
          { this._renderListItem() }
        </List>

        <Button
          buttonStyle={Theme.btn}
          title="Join in List"
          onPress={ _=> Actions.todoJoin() }
        />

        <View style={Layout.padding}>
          <Text>Olá, {currentUser.email}</Text>
        </View>
        <LogoutButton />
      </ScrollView>
    );
  }

  _renderListItem(){
    return(
      this.state.todos.map((t, i) => (
        <ListItem
          button
          key={i}
          onPress={ _=> Actions.todo({title: t.name, todo: t}) }
          title={t.name}
          subtitle={this._renderProgressTasks(t)}
        />
      ))
    );
  }
  _renderProgressTasks(todo){
    if(_.size(todo.tasks)){
      return `${ _.size(_.filter(todo.tasks, {done: true}))}/${_.size(todo.tasks)}`
    }
    else {
      return "Without Tasks"
    }
  }
}
