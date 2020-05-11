import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const DefaultButtonTouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    height: ${ScaleUtils.ScreenHeight * 0.06}px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.background || '#4F80E1'};
    border-width: 2px;
    border-color: ${(props) => props.border || '#4F80E1'};
    border-radius: 10px;
`;

export const ButtonNameText = styled.Text`
    color: ${ (props) => props.fontColor || '#FFFF' };
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    align-items: center;
    text-align: center;
    justify-content: center;
`;