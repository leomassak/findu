import styled from 'styled-components/native';

import Logo from '../../../assets/svg/logo.svg';
import * as ScaleUtils from '../../../utils/scale';

export const LoginFlowContainerView = styled.View`
    flex: 1;
    background-color: #FFFF;
    justify-content: space-around;
    align-items: center;
    padding: 0px 8%;
`;

export const LogoView = styled.View`
`;

export const LogoSvg = styled(Logo)``;

export const AppNameText = styled.Text`
    font-size: 48px;
    font-family: Poppins-Bold;
    text-align: center;
`;

export const CustomLetterText = styled.Text`
    color: #4F80E1;
`;

export const WelcomeView = styled.View`
    justify-content: space-between;
`;

export const WelcomeHeaderTitleText = styled.Text`
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 4%;
`;

export const WelcomeDescriptionText = styled.Text`
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    margin-bottom: 10%;
`;

export const ButtonAreaView = styled.View`
    height: ${ScaleUtils.ScreenHeight * 0.145}px;
    justify-content: space-between;
`;