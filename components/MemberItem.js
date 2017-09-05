import React from "react";
import {
  View
} from "react-native";

import {
  Icon,
  ListItem,
} from 'react-native-elements';

import Colors from '../constants/Colors';
import Theme from '../constants/Theme';
import Layout from '../constants/Layout';

import Firebase from '../services/Firebase';
import Helpers from '../services/Helpers';
import { User } from '../services/Models';

import InputForm from '../components/InputForm';

import * as _ from "lodash";


export default class MemberItem extends React.Component {
  state = {
    member: {}
  }
  constructor(props){
    super(props);

    console.log(props)

    User.get(props.member, (snapshotData)=>{
      this.setState({member: snapshotData.val().profile})
    })
  }
  render(){
    return(
      <ListItem
        roundAvatar
        key={this.props.index}
        title={this.state.member.name}
        avatar={this.state.member.avatar}
      />
    );
  }
}


const styles = {
}
