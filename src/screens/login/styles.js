import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';
import Logo from '../../assets/svg/ic_logo.svg';

export const PageContainer = styled.ScrollView`
    flex: 1;
    background-color: #FFFF;
`;

export const PageTitleContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${ScaleUtils.ScreenHeight * 0.04}px;
    margin-top: ${ScaleUtils.ScreenHeight * 0.05}px;
`;

export const PageTitleText = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.035}px`};
    font-family: Poppins-Bold;
    text-align: center;
    margin-top: 20px;
`;

export const HeaderTitleText = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.055}px`};
    font-family: Poppins-Bold;
    text-align: center;
    color: #FFF;
`;

export const InputContainer = styled.View`
    margin-bottom: ${ScaleUtils.ScreenHeight * 0.024}px;;
`;

export const UnderlineButtonContainer = styled.View`
    margin: 5% 0;
`;

export const MapImageView = styled.View`
    width: 100%;
    height: ${ScaleUtils.ScreenHeight * 0.4}px;
    align-items: center;
    justify-content: center;
    background-color: #4F80E1;
`;

export const MapImage = styled.Image`
    margin-top: 8%;
    height: 100px;
    width: 90px;
`;

export const RegisterContentView = styled.View`
    padding-horizontal: 7%;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background-color: #FFF;
    margin-top: -5%;
    padding-top: 12%;
`;

export const IconLogo = styled(Logo)`
    position: absolute;
    right: 20px;
    top: 20px;
`;

export const HeaderBackButtonContainer = styled.TouchableOpacity`
    width: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
    height: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    left: 10px;
`;