import React from 'react';
import { TextInput } from 'react-native';

import Colors from '../constants/Colors';
import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

export default class InputForm extends React.Component {
  state = {
    focused: false
  }
  constructor(props){
    super(props)
  }
  render(){
    return (
      <TextInput
        { ...this.props }
      />
    );
  }
}
