import React from "react";

export default class Todo extends React.Component {
  render() {
    <View>
      <Text h3>{this.props.name}</Text>
      <Text h4>Tasks {this.props.tasks.length}</Text>
    </View>
  }
}
