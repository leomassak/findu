import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import * as S from './styles';
import * as FriendsActions from '../../redux/actions/friends';
import ProfileImage from '../../assets/images/profile-mock.png';

function ContactCard({ onPress, contact, index, invite }) {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');

    const handleUpdateInvite = async (approved) => {
        await dispatch(FriendsActions.updateFriendStatus(contact._id, { approved }));
        setStatus(approved ? 'Aprovado' : 'Recusado');
    }

    return (
        <S.ContactCardContainer onPress={!invite ? onPress : () => {}} activeOpacity={!invite ? 0.5 : 1}>
            <S.ProfileImageContainer>
                <S.ProfileImage source={contact.profilePhoto ? { uri: contact.profilePhoto.url } : ProfileImage} resizeMode="cover" />
            </S.ProfileImageContainer>
            <S.ContactName>{contact.name}</S.ContactName>
            {invite ? (
                 <S.AcceptAndDeclineButtonView>
                     {status.length > 0 ? <S.StatusText fontColor={status === 'Aprovado' ? '#4442C0' : '#BD353B'}>{status}</S.StatusText> : (
                        <>
                            <S.AcceptDeclineButton onPress={() => handleUpdateInvite(true)}>
                                <Icon name="checkcircle" size={36} color="#4442C0"/>
                            </S.AcceptDeclineButton>
                            <S.AcceptDeclineButton onPress={() => handleUpdateInvite(false)}>
                                <Icon name="closecircle" size={36} color="#BD353B"/>
                            </S.AcceptDeclineButton>
                        </>
                     )}
             </S.AcceptAndDeclineButtonView>
            ) : null }
        </S.ContactCardContainer>
    );
}

export default ContactCard;