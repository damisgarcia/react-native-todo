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
        <View style={styles.container}>
          {
            this.renderItems()
          }
        </View>
      );

    } else{
      return (
        <Text style={{margin: 16}}>Loading...</Text>
      );
    }
  }
  renderItems(){
    return this.props.tasks.map((t, i) => (
      <TaskItem key={i} task={t} index={i} {...this.props} />
    ))
  }
}

const styles = {
  container: {
    flex: 1,
  }
}
