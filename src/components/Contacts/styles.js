import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

import Svg from '../../assets/svg/profile.svg';

export const ContactCardContainer = styled.TouchableOpacity`
    width: 100%;
    height: ${`${ScaleUtils.ScreenWidth * 0.3}`};
    background-color: #FFF;
    border-bottom-width: 1px;
    border-color: #CECECE;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
`;

export const ProfileImageContainer = styled.View`
    height: ${`${ScaleUtils.nearestWidthPixelScale(16)}`};
    width: ${`${ScaleUtils.nearestWidthPixelScale(16)}`};
    border-radius: 400px;
    overflow: hidden;
    background-color: #CECECE;
    border: solid black 1px;
    justify-content: center;
    align-items: center;
`;

export const ProfileImage = styled.ImageBackground`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const ContactName = styled.Text`
    font-size: ${`${ScaleUtils.pixelScale(20)}px`};
    font-family: Poppins-Regular;
    width: 60%;
    color: #000;
`;

export const ContactGroupOrb = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 100px;
    background-color: #00FF19;
`;

export const AcceptAndDeclineButtonView = styled.View`
   height: 80%;
   background-color: #FFF;
   justify-content: space-around;
   align-items: center;
`;

export const AcceptDeclineButton = styled.TouchableOpacity`
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-size: 14px;
    color: #FFF;
    font-family: Poopind-Bold;
    text-align: center;
`;

export const StatusText = styled.Text`
    color: ${props => props.fontColor};
    font-size: 12px;
    font-family: Poppins-Bold;
`;

export const ProfileSvg = styled(Svg)`
    height: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
    width: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
`;