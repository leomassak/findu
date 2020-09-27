import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

import * as ScaleUtils from '../../utils/scale';
import Svg from '../../assets/svg/profile.svg';
import DefaultInput from '../../components/Input/Input';
import Logo from '../../assets/svg/ic_logo.svg';


export const PageContainer = styled.ScrollView`
    flex: 1;
    background-color: #FFFF;
`;

export const HeaderName = styled.Text`
    font-size: ${`${ScaleUtils.pixelScale(22)}`};
    font-family: Poppins-Bold;
    width: 100%;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
`;

export const PageTitleContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${`${ScaleUtils.ScreenHeight * 0.04}px`};
    margin-top: ${`${ScaleUtils.ScreenHeight * 0.03}px`};
`;

export const PageTitleText = styled.Text`
    font-size: ${`${ScaleUtils.pixelScale(22)}px`};
    font-family: Poppins-Bold;
    width: 80%;
`;

export const InputContainer = styled.View`
    margin-bottom: 5%;
`;

export const MaskedInput = styled(DefaultInput)`
`;

export const UnderlineButtonContainer = styled.View`
    margin: 5% 0;
`;

export const CheckBoxContainerView = styled.View`
    height: ${`${ScaleUtils.nearestWidthPixelScale(52)}px`};
    justify-content: space-between;
    margin-bottom: ${`${ScaleUtils.ScreenHeight * 0.04}px`};
    margin-top: ${`${ScaleUtils.ScreenHeight * 0.03}px`};
`;

export const ProfilePicView = styled.View`
    height: ${`${ScaleUtils.ScreenHeight * 0.23}px`};
    width: ${`${ScaleUtils.ScreenHeight * 0.23}px`};
    align-self: center;
    justify-content: flex-end;
    margin-bottom: 5%;
`;

export const ProfilePicAddTouchableOpacity = styled.TouchableOpacity`
    height: ${`${ScaleUtils.ScreenHeight * 0.07}px`};
    width: ${`${ScaleUtils.ScreenHeight * 0.07}px`};
    border-radius: ${`${ScaleUtils.ScreenHeight * 0.035}px`};
    border-color: black;
    border-width: 2px;
    position: absolute;
    right: 0;
    top: 0;
    justify-content: center;
    align-items: center;
`;

export const ProfilePicImageView = styled.View`
    align-self: center;
    border-width: 2px;
    border-color: #000;
    height: ${`${ScaleUtils.ScreenHeight * 0.19}px`};
    width: ${`${ScaleUtils.ScreenHeight * 0.19}px`};
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const ProfilePicImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
`;

export const ProfileSvg = styled(Svg)`
    height: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
    width: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
`;

export const MapImageView = styled.View`
    width: 100%;
    height: ${`${ScaleUtils.ScreenHeight * 0.25}px`};
    background-color: #4F80E1;
`;

export const MapImage = styled.Image`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

export const RegisterContentView = styled.View`
    padding-horizontal: 7%;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background-color: #FFF;
    margin-top: -5%;
`;

export const IconLogo = styled(Logo)`
    position: absolute;
    right: 10%;
    top: 10%;
`;

export const HeaderBackButtonContainer = styled.TouchableOpacity`
    width: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
    height: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
    justify-content: center;
    align-items: center;
`;