import styled from 'styled-components/native';
import Logo from '../../assets/svg/logo.svg';


export const SplashContainer = styled.View`
    flex: 1;
    background-color: #FFF;
`;

export const LogoSvg = styled(Logo)`
    align-self: center;
    margin-top: 55%;
`;

export const TopWaveImage = styled.Image`
    position: absolute;
    top: 0;
    width: 100%;
`;

export const BottomWaveImage = styled.Image`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

