import React from 'react';
import {
  ScrollView,
  View,
  Switch,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import {
  Text,
  Button,
  CheckBox,
  FormInput,
  Icon,
  List,
  ListItem
} from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Actions } from 'react-native-router-flux';

import Colors from '../constants/Colors';
import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';

import InputForm from '../components/InputForm';
import LogoutButton from '../components/LogoutButton';

import * as _ from "lodash";

export default class TodoScreen extends React.Component {
  state = {
    model: {
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
    currentTask: null,
    focused: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { currentUser } = Firebase.auth();
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <ScrollView style={Layout.grid}>
            <Text style={styles.title} h4>Tasks</Text>
            <TouchableWithoutFeedback onPress={ _=> this.createTask() }>
              <Text h4 style={styles.createTaskBtn}>+ Create Task</Text>
            </TouchableWithoutFeedback>
            {  this._renderTasks(this.state.model.tasks)  }
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }

  createTask(){
    this.state.model.tasks.push({
      name: "",
      done: false
    });
    this.setState({ model: this.state.model });
  }

  deleteTask(taskId){
    this.state.model.tasks.splice(taskId, 1);
    this.setState({ model: this.state.model });
  }

  _renderTasks(tasks) {
    return tasks.map((t, i) => (
      <View style={Layout.col} key={i}>
        <View style={styles.listContainer}>
          <InputForm
            style={Theme.formInput}
            value={t.name}
            onBlur={ _=> this._onBlur() }
            onFocus={ _=> this._onFocus(i) }
            onChangeText={ (name)=> this._onChangeNameTask(name, t) }
          />
          <CheckBox
            center
            checked={t.done}
            containerStyle={styles.checkBoxContainerStyle}
            onPress={ _=> this._onChangeToggleTask(t) }
            iconType='material'
            checkedIcon='check'
            uncheckedIcon='check-box-outline-blank' />
            { this._renderRemoveButton(i) }
        </View>
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

  _onBlur(){
    this.setState({ focused: false })
  }

  _onFocus(taskId){
    this.setState({ focused: true, currentTask: taskId })
  }

  _onChangeNameTask(name, task){
    task.name = name;
    this.setState({model: this.state.model});
  }

  _onChangeToggleTask(task) {
    task.done = !task.done;
    this.setState({model: this.state.model});
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    padding: 0,
    marginRight: -8,
  },
  createTaskBtn:{
    color: Colors.borderColor,
    paddingTop: 4,
    paddingBottom: 16,
    paddingHorizontal: 16,
  }
}
