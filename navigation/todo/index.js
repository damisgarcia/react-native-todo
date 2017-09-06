import React from 'react';
import { Alert, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

import { Todo } from '../../services/Models';

export const DestroyTodoButton = (props) => {
  return(
    <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
      <Icon
        iconStyle={{ paddingHorizontal: 8 }}
        name='edit'
        type='material'
        onPress={ ()=> EditTodoButtonOnPress(props) }
      />
      <Icon
        iconStyle={{ paddingHorizontal: 8 }}
        name='delete'
        type='material'
        onPress={ ()=> DestroyTodoButtonOnPress(props) }
      />
  </View>
  );
}

export const CreateTodoButton = () => {
  return(
    <Icon
      iconStyle={{ paddingHorizontal: 16 }}
      name='add'
      type='material'
      onPress={CreateTodoButtonOnPress}
    />
  );
}

function CreateTodoButtonOnPress(){
  Actions.todoForm({title: "New - Todo List", submit: "Create List"});
}

function EditTodoButtonOnPress(props){
  Actions.todoForm({ title: `Edit - ${props.todo.name}`, model: props.todo, submit: "Update List" });
}

function DestroyTodoButtonOnPress(props){
  Alert.alert(
    'Remover Lista',
    'Você tem certeza que deseja fazer isso?',
    [
      {text: 'Não', onPress: () => false , style: 'cancel'},
      { text: 'Sim', onPress: () => {
          Todo.destroy(props.todo)
          Actions.pop()
        }
      }
    ],
    { cancelable: false }
  )
}

export default {}
