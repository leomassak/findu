import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

import Svg from '../../assets/svg/profile.svg';

export const UserProfileView = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-color: #CACACA;
    margin-bottom: 15px;
`;

export const ProfileImageView = styled.View`
    border-width: 1px;
    border-color: #000;
    height: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
    width: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 15px;
`;

export const ProfileImage = styled.ImageBackground`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const UserInfoView = styled.View`
    flex: 1;
    justify-content: center;
`;

export const UserName = styled.Text`
    color: #000;
    font-size: 18px;
    font-family: Poppins-Regular;
`;

export const UserAge = styled.Text`
    color: #5F5F5F;
    font-size: 18px;
    font-family: Poppins-Regular;
`;

export const DrawerItensView = styled.View`
    flex: 1;
    border-width: 2px;
`;

export const LogoutButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
`;

export const LogoutText = styled.Text`
    font-size: 21px;
    color: #000;
    font-weight: bold;
`;

export const ProfileSvg = styled(Svg)`
    height: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
    width: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
`;

export const NotificationIconView = styled.View`
`;

export const BadgeView = styled.View`
    position: absolute;
    top: -8px;
    right: -5px;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    background-color: #4F80E1;
    border-radius: 40px;
    z-index: 10;
`;

export const BadgeCount = styled.Text`
    font-weight: bold;
    font-size: 10px;
    color: #FFF;
`;