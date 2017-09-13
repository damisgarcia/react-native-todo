import {
  ToastAndroid
} from "react-native";

import * as _ from 'lodash';

import Helpers from '../services/Helpers';
import Firebase, { UID } from '../services/Firebase';
import { getExponentPushToken } from '../services/Notification';

export const User = {
  create: async (data) => {
    const token = await getExponentPushToken();
    return Firebase.database().ref(`/users/${data.uid}/profile`).set({
      email: data.email,
      name: data.displayName,
      avatar: data.photoURL,
      expo_token: token,
      lastLoginDate: new Date()
    })
  },
  get: async (key, callback) => {
    return Firebase.database().ref(`/users/${data.uid}`).once("value").then(callback)
  },
  save: async (data) => {
    const token = await getExponentPushToken();

    let updates = {}

    let newData = {
      email:  data.email,
      name:   data.displayName,
      avatar: data.photoURL,
      expo_token: token ,
      lastLoginDate: new Date().getTime()
    }

    updates[`/users/${UID}/profile`] = newData;

    return Firebase.database().ref().update(updates);
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
      data.joinKey = Helpers.genSecureKey(6)
      data.owner = UID
      data.members[UID] = true
    }

    updates[`/todos/${todoKey}`] = _.omit(data, 'key') ;

    return Firebase.database().ref().update(updates);
  },
  destroy: async(todo) =>{
    try {
      if(todo.owner != UID){
        throw "You not Owner this list."
      }

      let updates = {}

      updates[`/todos/${todo.key}`] = null

      return await Firebase.database().ref().update(updates);
    } catch (e) {
      return ToastAndroid.show(e, ToastAndroid.LONG);
    }
  },
  joinMember: async (joinKey, callback) => {
    let updates = {};

    Firebase.database().ref('/todos').orderByChild("joinKey").equalTo(joinKey).once("value", (snapshotData) => {
      if(snapshotData.val() !== null){
        snapshotData.forEach((todo) => {
          updates[`/todos/${todo.key}/members/${UID}`] = true
          try {
            Firebase.database().ref().update(updates).then(callback)
          } catch (e) {
            return ToastAndroid.show(e, ToastAndroid.LONG);
          }
        })
      } else{
        return ToastAndroid.show("Code Incorrect", ToastAndroid.LONG);
      }
    })
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
