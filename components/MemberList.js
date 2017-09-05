import React from "react";
import {
  View,
} from "react-native";

import {
  Card,
  Text,
  List
} from 'react-native-elements';

import * as _ from "lodash";

import MemberItem from "./MemberItem";
import InputForm from "./InputForm";

export default class MemberList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    if(_.isArray(this.props.members)){
      return(
        <View style={{flex: 1}}>
          <Text style={styles.padding} h5>Members</Text>
          <List>
            {
              this.renderMembers()
            }
          </List>
        </View>
      );

    } else{
      return (
        <Text style={{...styles.padding, marginVertical: 16}}>Loading...</Text>
      );
    }
  }
  renderMembers(){
    return this.props.members.map((m, i) => (
      <MemberItem key={i} member={m} index={i} {...this.props} />
    ))
  }
}

const styles = {
  padding: {
    marginHorizontal: 16
  }
}
