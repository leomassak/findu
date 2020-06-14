import React from 'react';

import * as S from './styles';
import ProfileImage from '../../assets/images/profile-mock.png';

function ContactCard({ onPress, contact, index }) {
    return (
        <S.ContactCardContainer onPress={onPress}>
            <S.ProfileImageContainer>
                <S.ProfileImage source={contact.profilePhoto ? { uri: contact.profileImage.url } : ProfileImage} />
            </S.ProfileImageContainer>
            <S.ContactName>{contact.name}</S.ContactName>
            <S.ContactGroupOrb />
        </S.ContactCardContainer>
    );
}

export default ContactCard;