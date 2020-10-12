import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import * as NotificationsActions from '../redux/actions/notifications';
import store from '../redux/store';

async function requestFirebaseMessagingPermission() {
  if (firebase.apps.length) {
    const settings = await messaging().requestPermission();
    console.log('store', store);

    if (settings) {
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        const { notification } = remoteMessage;
        await store.dispatch(NotificationsActions.showPushMessage(notification));
        console.log('Message handled in the background!', remoteMessage);
      });

      messaging().onMessage(async (remoteMessage) => {
        const { notification } = remoteMessage;
        await store.dispatch(NotificationsActions.showPushMessage(notification)),
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
