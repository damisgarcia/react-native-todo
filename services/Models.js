import Firebase from '../services/Firebase';

export const User = {
  create: (data) => {
    return Firebase.database().ref(`/users/${data.uid}/profile`).set({
      email: data.email,
      name: data.displayName,
      avatar: data.photoURL
    })
  }
}
