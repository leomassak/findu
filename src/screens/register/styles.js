import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';
import Svg from '../../assets/svg/profile.svg';

export const PageContainer = styled.ScrollView`
    flex: 1;
    background-color: #FFFF;
    padding: 3% 6%;
`;

export const PageTitleContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10%;
`;

export const PageTitleText = styled.Text`
    font-size: ${ScaleUtils.ScreenWidth * 0.065};
    font-family: Poppins-Bold;
    width: 80%;
`;

export const InputContainer = styled.View`
    margin-bottom: 5%;
`;

export const UnderlineButtonContainer = styled.View`
    margin: 5% 0;
`;

export const CheckBoxContainerView = styled.View`
    height: ${ScaleUtils.ScreenHeight * 0.22};
    justify-content: space-between;
    margin-top: 4%;
    margin-bottom: 8%;
`;

export const ProfilePicTouchableOpacity = styled.TouchableOpacity`
    align-self: center;
    background-color: transparent;
    border-width: 2px;
    border-color: #000;
    height: ${ScaleUtils.ScreenHeight * 0.19};
    width: ${ScaleUtils.ScreenHeight * 0.19};
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
    height: ${ScaleUtils.getPixelRatio * 18.5}px;
    width: ${ScaleUtils.getPixelRatio * 18.5}px;
`;