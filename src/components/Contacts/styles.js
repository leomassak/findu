import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

export const ContactCardContainer = styled.TouchableOpacity`
    width: 100%;
    height: ${ScaleUtils.ScreenWidth * 0.3};
    background-color: #FFF;
    border-bottom-width: 1px;
    border-color: #CECECE;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
`;

export const ProfileImageContainer = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 100px;
`;

export const ProfileImage = styled.ImageBackground`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const ContactName = styled.Text`
    font-size: 18px;
    font-family: Poppins-Regular;
    width: 60%;
    color: #000;
    text-align: center;
`;

export const ContactGroupOrb = styled.View`
    width: 15px;
    height: 15px;
    border-radius: 100px;
    background-color: #00FF19;
`;