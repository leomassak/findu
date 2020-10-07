import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

async function requestFirebaseMessagingPermission() {
  if (firebase.apps.length) {
    const settings = await messaging().requestPermission();

    if (settings) {
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      });

      messaging().onMessage(async (remoteMessage) => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
      // console.log('token', await messaging().getToken());
      console.log('Permission settings:', settings);
    }
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  requestFirebaseMessagingPermission,
};
