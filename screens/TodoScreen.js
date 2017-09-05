import React from 'react';
import {
  ScrollView,
  View,
  Switch,
  TextInput,
  TouchableNativeFeedback
} from 'react-native';

import {
  Text,
  Button,
  CheckBox,
  FormInput,
  Icon,
  List,
  ListItem,
} from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Actions } from 'react-native-router-flux';

import Colors from '../constants/Colors';
import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';
import Helpers from '../services/Helpers';
import { Todo, Task } from '../services/Models';

import TaskList from '../components/TaskList';
import InputForm from '../components/InputForm';

import * as _ from "lodash";

export default class TodoScreen extends React.Component {
  state = {
    model: {},
    currentTask: null,
    focused: false
  }

  constructor(props) {
    super(props);

    Todo.get(this.props.todo.key, (snapshotData) =>{
      let model = snapshotData.val();

      model.members = _.keys(model.members);

      this.setState({model: model});

      Task.all(this.props.todo, (snapshotData) =>{
        let tasks = Helpers.snapshotDataToArray(snapshotData)

        if(tasks.length){
          this.state.model.tasks = tasks;
          this.setState({model: this.state.model});
        }
      })
    })
  }

  render() {
    let { currentUser } = Firebase.auth();
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <ScrollView style={{ ...Layout.grid }}>
            <Text style={styles.title} h4>Tasks</Text>

            <TaskList
               tasks={this.state.model.tasks}
               onChangeToggleTask={(task) => this._onChangeToggleTask(task)}
               onBlurOrSubmit={(task) => this._onBlurOrSubmit(task)}
               onFocus={(taskIndex) => this._onFocus(taskIndex)}
               onChangeNameTask={(name, task) => this._onChangeNameTask(name, task)}
               rightButton={(task, taskIndex) => this._renderRemoveButton(taskIndex)}
            />

            <TouchableNativeFeedback
              onPress={ _=> this.createTask() }
              background={TouchableNativeFeedback.SelectableBackground()}>
              <Text h4 style={styles.createTaskBtn}>+ Create Task</Text>
            </TouchableNativeFeedback>

            {  this._renderMembers(this.state.model.members)  }
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  createTask(){
    let newTask = {
      name: "",
      done: false
    };

    // Remove from local list
    this.state.model.tasks.push(newTask);
    // Update state
    this.setState({model: this.state.model})
    // Sync with Database
    Task.save(this.props.todo, newTask);
  }

  deleteTask(taskId){
    let taskKey = this.state.model.tasks[taskId].key;
    // Remove from local list
    this.state.model.tasks.splice(taskId, 1);
    // Update state
    this.setState({ model: this.state.model });
    // Sync with Database
    Task.destroy(this.props.todo, taskKey)
  }

  isActiveDeleteButton(){
    return (this.state.focused && taskId === this.state.currentTask || taskId === this.state.currentTask);
  }

  _renderMembers(members) {
    if(_.isArray(members))
      return members.map((m, i) => (
        <View style={Layout.col} key={i}>
          <Text>{i}</Text>
        </View>
      ))
  }

  _renderRemoveButton(taskId){
    if(this.state.focused && taskId === this.state.currentTask || taskId === this.state.currentTask) {
      return (
        <Icon type="material" name='cancel' onPress={ _=> this.deleteTask(taskId) } />
      );
    } else{
      return (
        <View style={{width: 24}} />
      );
    }
  }

  _onBlurOrSubmit(task){
    this.setState({ focused: false })
    // Sync with Database
    Task.save(this.props.todo, task);
  }

  _onFocus(taskId){
    this.setState({ focused: true, currentTask: taskId })
  }

  _onChangeNameTask(name, task){
    task.name = name;
    // Update State
    this.setState({model: this.state.model});
  }

  _onChangeToggleTask(task) {
    task.done = !task.done;
    // Update State
    this.setState({model: this.state.model});
    // Sync with Database
    Task.save(this.props.todo, task);
  }
}

const styles = {
  container:{
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 36
  },
  listContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  listItem: {
    flex: 1,
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
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginLeft: -4,
    padding: 0,
  },
  createTaskBtn:{
    color: Colors.borderColor,
    paddingTop: 4,
    paddingBottom: 16,
    paddingHorizontal: 16,
  }
}
