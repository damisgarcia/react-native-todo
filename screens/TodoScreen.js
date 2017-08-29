import React from 'react';
import { ScrollView, View, Switch } from 'react-native';
import { Text, Button, CheckBox, FormInput, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';

import LogoutButton from '../components/LogoutButton';

import * as _ from "lodash";

export default class TodoScreen extends React.Component {
  state = {
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
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { currentUser } = Firebase.auth();
    return (
      <View style={Layout.col}>
        <ScrollView style={Layout.grid}>
          <Text style={styles.title} h4>Tasks</Text>
          { this._renderTasks(this.state.tasks) }
        </ScrollView>
        <View style={styles.newTaskContainer}>
          <FormInput
            inputStyle={styles.newTaskForm}
            containerStyle={styles.newTaskForm}
            placeholder="New Task"
            />
          <Button
            raised
            containerViewStyle={{marginLeft: 8}}
            buttonStyle={Theme.btnPrimary}
            title='NEW'
            />
        </View>
      </View>
    );
  }
  _renderTasks(tasks) {
    return tasks.map((t, i) => (
      <View style={Layout.col} key={i}>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}>{t.name}</Text>
          <CheckBox
            center
            checked={t.done}
            containerStyle={styles.checkBoxContainerStyle}
            onPress={ _=> this._onChangeTask(t) }
            iconType='material'
            checkedIcon='check'
            uncheckedIcon='check-box-outline-blank' />
        </View>
      </View>
    ))
  }
  _onChangeTask(task) {
    task.done = !task.done
    this.setState({tasks: this.state.tasks})
  }
}

const styles = {
  listContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  listItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 4,
    paddingVertical: 8,
    fontSize: 18
  },
  title: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  checkBoxContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    padding: 0,
    margin: 0,
  },
  newTaskContainer: {
    flexDirection: 'row',
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  newTaskForm: {
    flex: 1,
    // maxWidth: 200,
    marginRight: 24
  }
}
