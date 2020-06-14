import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

export const ProfileContainerScrollView = styled.ScrollView`  
    flex: 1;
    background-color: #4F80E1;
    padding: 10% 8%;
`;

export const UserProfileView = styled.View`
    align-items: center;
`;

export const ProfileImageView = styled.View`
    background-color: #CECECE;
    border-width: 1px;
    border-color: #000;
    height: ${`${ScaleUtils.ScreenHeight * 0.19}px`};
    width: ${`${ScaleUtils.ScreenHeight * 0.19}px`};
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 4%;
`;

export const ProfileImage = styled.ImageBackground`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const InputContainer = styled.View`
    width: 100%;
    flex:1;
    justify-content: center;
`;

export const InputLabel = styled.Text`
    margin-bottom: 2%;
    font-family: Poppins-Bold;
    color: #FFF;
    font-size: 18px;
`;

export const ProfileInfoText = styled.Text`
    border-bottom-width: 1px;
    border-color: #FFF;
    color: #FFF;
    margin-bottom: 12%;
    padding-bottom: 10px;
    font-size: 18px;
`;

export const ButtonsContainer = styled.View`
    height: ${`${ScaleUtils.ScreenHeight * 0.185}px`};
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20%;
`;

export const UserName = styled.Text`
    color: #FFF;
    font-size: 24px;
    font-family: Poppins-Bold;
    margin-bottom: 15px;
`;