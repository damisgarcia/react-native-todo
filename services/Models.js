import * as _ from 'lodash';
import Firebase, { UID } from '../services/Firebase';

export const User = {
  create: (data) => {
    return Firebase.database().ref(`/users/${data.uid}/profile`).set({
      email: data.email,
      name: data.displayName,
      avatar: data.photoURL
    })
  }
}

export const Todo = {
  all: (callback) => {
    return Firebase.database().ref(`/users/${UID}/todos`).on("value", (snapshot) => callback(snapshot) )
  },
  get: async (key, callback) => {
    return await Firebase.database().ref(`/users/${UID}/todos/${key}`).once("value").then(callback)
  },
  save: async (data) => {
    let updates = {}
    let todoKey = data.key || null

    if(!todoKey){
      todoKey =  Firebase.database().ref(`/users/${UID}`).child('todos').push().key;
    }

    updates[`/users/${UID}/todos/${todoKey}`] = _.omit(data, 'key') ;

    return Firebase.database().ref().update(updates);
  },
  destroy: async(todoKey) =>{
    console.log(todoKey)
    return await Firebase.database().ref(`/users/${UID}/todos/`).child(todoKey).remove()
  }
}

export const Task = {
  all: (todo, callback) => {
    return Firebase.database().ref(`/users/${UID}/todos/${todo.key}/tasks`).on("value", (snapshot) => callback(snapshot) )
  },
  get: async (todo, key, callback) => {
    return await Firebase.database().ref(`/users/${UID}/todos/${todo.key}/tasks/${key}`).once("value").then(callback)
  },
  save: async (todo, data) => {
    let updates = {}
    let taskKey = data.key || null

    if(!taskKey){
      taskKey =  Firebase.database().ref(`/users/${UID}/todos/${todo.key}`).child('tasks').push().key;
    }

    updates[`/users/${UID}/todos/${todo.key}/tasks/${taskKey}`] = _.omit(data, 'key') ;

    return Firebase.database().ref().update(updates);
  },
  destroy: async(todo, taskKey) =>{
    return await Firebase.database().ref(`/users/${UID}/todos/${todo.key}/tasks`).child(taskKey).remove()
  }
}
