import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { displayName } from '../../../app.json';
import NotificationPopup from 'react-native-push-notification-popup';

import * as S from './styles';
import * as NotificationsSelector from '../../redux/reducers/notifications';
import Icon from '../../../android/app/src/main/res/mipmap-hdpi/ic_launcher.png';

export default function PushMessage() {

    const popup = useRef();

    const title = useSelector(state => NotificationsSelector.getTitle(state));
    const message = useSelector(state => NotificationsSelector.getMessage(state));

 
    useEffect(() => {
      if (popup.current && title !== null && message !== null ) {
        popup.current.show({
          onPress() { /* empty */ },
          appIconSource: Icon,
          appTitle: displayName,
          timeText: 'Agora',
          title,
          body: message,
          slideOutTime: 7000
          });
      }
    }, [title, message]);

    return (
      <NotificationPopup
        ref={popup}
      />
    );
}