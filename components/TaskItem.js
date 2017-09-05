import React from "react";
import {
  View
} from "react-native";

import {
  Text,
  Button,
  CheckBox,
  FormInput,
  Icon,
} from 'react-native-elements';

import Colors from '../constants/Colors';
import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';
import Helpers from '../services/Helpers';
import { Todo, Task } from '../services/Models';

import InputForm from '../components/InputForm';

import * as _ from "lodash";


export default class TaskItem extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={Layout.col} key={this.props.index}>
        <View style={styles.listContainer}>
          <CheckBox
            center
            checked={this.props.task.done}
            containerStyle={styles.checkBoxContainerStyle}
            onPress={ _=> this.props.onChangeToggleTask(this.props.task) }
            iconType='material'
            checkedIcon='check'
            uncheckedIcon='check-box-outline-blank' />

          <InputForm
            ref={`input${this.props.index}`}
            style={{ ...Theme.formInput, marginLeft: -20, marginRight: 4 }}
            value={this.props.task.name}
            returnKeyType="next"
            onBlur={ _=> this.props.onBlurOrSubmit(this.props.task) }
            onFocus={ _=> this.props.onFocus(this.props.index) }
            onSubmitEditing={ _ => this.props.onBlurOrSubmit(this.props.task) }
            onChangeText={ (name)=> this.props.onChangeNameTask(name, this.props.task) }
            />
          { this.props.rightButton(this.props.task, this.props.index) }
        </View>
      </View>
    );
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
  checkBoxContainerStyle: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginLeft: -4,
    padding: 0,
  },
}
