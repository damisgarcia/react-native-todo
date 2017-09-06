import * as _ from 'lodash';
import Firebase, { UID } from '../services/Firebase';

export const User = {
  create: (data) => {
    return Firebase.database().ref(`/users/${data.uid}/profile`).set({
      email: data.email,
      name: data.displayName,
      avatar: data.photoURL
    })
  },
  get: async (key, callback) =>{
    return await Firebase.database().ref(`/users/${key}`).once("value").then(callback)
  }
}

export const Todo = {
  all: (callback) => {
    return Firebase.database().ref('/todos').orderByChild(`members/${UID}`).equalTo(true).on("value", (snapshot) => callback(snapshot) )
  },
  get: async (key, callback) => {
    return await Firebase.database().ref(`/todos/${key}`).once("value").then(callback)
  },
  save: async (data) => {
    let updates = {}
    let todoKey = data.key || null

    if(!todoKey){
      todoKey =  Firebase.database().ref(`/todos`).push().key;

      data.members = {}
      data.members[UID] = true
    }

    updates[`/todos/${todoKey}`] = _.omit(data, 'key') ;

    return Firebase.database().ref().update(updates);
  },
  destroy: async(todoKey) =>{
    let updates = {}

    updates[`/todos/${todoKey}`] = null

    return await Firebase.database().ref().update(updates);
  }
}

export const Task = {
  all: (todo, callback) => {
    let ref = Firebase.database().ref(`/todos/${todo.key}/tasks`).once("value", (snapshot) => callback(snapshot) )
  },
  get: async (todo, key, callback) => {
    return await Firebase.database().ref(`/todos/${todo.key}/tasks/${key}`).once("value").then(callback)
  },
  save: async (todo, data) => {
    let updates = {}
    let taskKey = data.key || null

    if(!taskKey){
      taskKey =  Firebase.database().ref(`/todos/${todo.key}`).child('tasks').push().key;
    }

    updates[`/todos/${todo.key}/tasks/${taskKey}`] = _.omit(data, 'key') ;

    return Firebase.database().ref().update(updates);
  },
  destroy: async(todo, taskKey) =>{
    return await Firebase.database().ref(`/todos/${todo.key}/tasks`).child(taskKey).remove()
  },
  genKey: (todo) => {
    return Firebase.database().ref(`/todos/${todo.key}`).child('tasks').push().key;
  }
}
