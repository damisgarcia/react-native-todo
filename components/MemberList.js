import React from "react";
import {
  View,
  Share
} from "react-native";

import {
  Card,
  Text,
  List,
  Button
} from 'react-native-elements';

import * as _ from "lodash";

import Theme from "../constants/Theme";

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
          <Button
            icon={{name: 'share', type: 'material'}}
            buttonStyle={{ ...Theme.btnPrimary, marginVertical: 16 }}
            title="Convidar Membros"
            onPress={ ()=> this.inviteMember() }
          />
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
      <MemberItem key={i} member={m} isOwner={m === this.props.owner} index={i} {...this.props} />
    ))
  }

  inviteMember(){
    Share.share({
      message: `Copy and paste the code this code your application: \n ${this.props.parent.key.toString()}`,
      title: `You have been invited to be part of the ${this.props.parent.name} list.`
    });
  }
}

const styles = {
  padding: {
    marginHorizontal: 16
  }
}
