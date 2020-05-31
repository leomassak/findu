import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';
import Svg from '../../assets/svg/burguer.svg';

export const HomeContainer = styled.View`
    flex: 1;
    background-color: #FFF;
`;

export const BurguerButton = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
    top: 20px;
    width: ${ScaleUtils.ScreenHeight * 0.06}px;
    height: ${ScaleUtils.ScreenHeight * 0.06}px;
    border-radius: 100px;
    border-width: 1px;
    background-color: #CECECE;
    justify-content: center;
    align-items: center;
`;

export const BurguerIcon = styled(Svg)`
    /* transform: rotate(90deg); */
`;