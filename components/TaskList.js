import React from "react";
import {
  Text,
  View
} from "react-native";
import * as _ from "lodash";

import TaskItem from "./TaskItem";

export default class TaskList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    if(_.isArray(this.props.tasks)){
      return(
        <View style={{flex: 1}}>
          {
            this.renderItems()
          }
        </View>
      );

    } else{
      return (
        <Text>Loading...</Text>
      );
    }
  }
  renderItems(){
    return this.props.tasks.map((t, i) => (
      <TaskItem task={t} index={i} {...this.props} />
    ))
  }
}
