import { AsyncStorage } from 'react-native';

export default {
  create: async (token) => {
    try {
      await AsyncStorage.setItem("@TOKEN", token)
    } catch (e) {
      console.log(e)
    }
  },
  get: async () => {
    try{
      const token = await AsyncStorage.getItem('@TOKEN');
      return token;
    } catch(e){
      console.log(e)
      return null
    }
  },
  destroy: async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.warn(e)
    }
  }
}
