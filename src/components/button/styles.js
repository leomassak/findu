import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const DefaultButtonTouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    height: ${ScaleUtils.ScreenHeight * 0.075};
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.background || '#4F80E1'};
    border-width: 3px;
    border-color: ${(props) => props.border || '#4F80E1'};
    border-radius: 10px;
`;

export const ButtonNameText = styled.Text`
    color: ${ (props) => props.fontColor || '#FFFF' };
    font-size: 20px;
    font-family: Poppins-Bold;
    font-style: normal;
    font-weight: bold;
    align-items: center;
    text-align: center;
    padding-vertical: ${`${ScaleUtils.ScreenHeight * 0.01}px`};
`;

export const UnderlineButtonTouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const UnderlineButtonText = styled.Text`
    color: ${ (props) => props.fontColor || '#000' };
    font-size: 14px;
    font-family: Poppins-Medium;
    align-items: center;
    text-align: center;
    padding-vertical: ${`${ScaleUtils.ScreenHeight * 0.01}px`};
    text-decoration: underline;
`;
