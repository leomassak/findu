import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

export const UserProfileView = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-color: #CACACA;
    margin-bottom: 15px;
`;

export const ProfileImageView = styled.View`
    background-color: #CECECE;
    border-width: 1px;
    border-color: #000;
    height: ${ScaleUtils.ScreenHeight * 0.1}px;
    width: ${ScaleUtils.ScreenHeight * 0.1}px;
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