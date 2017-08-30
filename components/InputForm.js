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
    // overide
    this.props.onFocus = () =>{
      this.props.onFocus()
      this.setState({ focused: true })
    }
    // overide
    this.props.onBlur = () =>{
      this.props.onBlur()
      this.setState({ focused: false })
    }
  }
  render(){
    return (
      <TextInput
        onFocus={ _=> this._onFocus() }
        onBlur={ _=> this._onBlur() }
        underlineColorAndroid={ this.state.focused ? Colors.primaryColor : Colors.borderColor }
        { ...this.props }
      />
    );
  }
  _onFocus(){
    this.props.onFocus()
    this.setState({ focused: true })
  }
  _onBlur(){
    this.props.onBlur()
    this.setState({ focused: true })
  }
}
