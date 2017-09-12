import { Permissions, Notifications } from 'expo';
import { Platform } from 'react-native';

import { Actions } from 'react-native-router-flux';

// Example server, implemented in Rails: https://git.io/vKHKv
// const PUSH_ENDPOINT = 'http://10.0.40.109:5000/tokens'; DEV
const PUSH_ENDPOINT = 'http://expo-server-cloud-mensage.herokuapp.com/tokens';

export var SelectedNotification = null;

export async function getExponentPushToken(){
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExponentPushTokenAsync();

  return token;
};

export async function registerForPushNotificationsAsync(token, message, data) {
  // POST the token to our backend so we can use it to send pushes from there
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token
      },
      message: message,
      data: data
    }),
  });
};

export function handleNotification(notification) {
  let { origin, data } = notification;

  if(origin == 'selected'){
    switch (data.type) {
      case 'todo':
        console.log("ACTION")
        Actions.todo({
          title: data.name,
          todo: data
        });
        break;
      default:
        return false
    }
  }
};
