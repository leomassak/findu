import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

import Svg from '../../assets/svg/profile.svg';

export const ProfileContainerScrollView = styled.ScrollView`  
    flex: 1;
    background-color: #FFF;
    padding: 10% 8%;
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

export const ProfileImage = styled.ImageBackground`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const InputContainer = styled.View`
    margin-bottom: 5%;
`;

export const ButtonsContainer = styled.View`
    margin-top: 5%;
    margin-bottom: 20%;
`;