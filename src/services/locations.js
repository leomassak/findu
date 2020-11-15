import database from '@react-native-firebase/database';
import user from '../api/user';

export default class ChatService {
  static async getUserLocation(userId, callback) {
    try {
      database()
        .ref(`locations/${userId}`)
        .once('value')
        .then((snapshot) => callback(snapshot.val())) 

    } catch (error) {
      console.log('error', error);
      // TODO: Handle error
    }
  }

  static async subscribeOnLocations(userId, callback) {
    try {
      database()
        .ref(`locations/${userId}`)
        .on('child_changed', async() => this.getUserLocation(userId, callback));

    } catch (error) {
      console.log('error', error);
    }
  }
}
