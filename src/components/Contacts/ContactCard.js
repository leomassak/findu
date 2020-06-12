import React from 'react';

import * as S from './styles';
import ProfileImage from '../../assets/images/profile-mock.png';

function ContactCard(props) {
  return (
      <S.ContactCardContainer onPress={props.onPress}>
          <S.ProfileImageContainer>
              <S.ProfileImage source={ProfileImage} />
          </S.ProfileImageContainer>
          <S.ContactName>Leonardo Massak</S.ContactName>
          <S.ContactGroupOrb />
      </S.ContactCardContainer>
  );
}

export default ContactCard;