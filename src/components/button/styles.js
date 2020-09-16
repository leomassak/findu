import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const DefaultButtonTouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    height: ${ScaleUtils.nearestWidthPixelScale(16)}px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.background || '#4F80E1'};
    border-width: ${(props) => props.border ? '1px' : '0px'};
    border-color: ${(props) => props.border || '#4F80E1'};
    border-radius: 10px;
    margin-bottom: 5%;
    opacity: ${(props) => props.disabled ? 0.6 : 1};
`;

export const ButtonNameText = styled.Text`
    color: ${ (props) => props.fontColor || '#FFFF'};
    font-size: ${ScaleUtils.pixelScale(18)}px;
    font-family: Poppins-Bold;
    font-style: normal;
    font-weight: bold;
    align-items: center;
    text-align: center;
    padding-vertical: ${`${ScaleUtils.ScreenHeight * 0.02}px`};
`;

export const UnderlineButtonTouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const UnderlineButtonText = styled.Text`
    color: ${ (props) => props.fontColor || '#000'};
    font-size: ${ScaleUtils.pixelScale(16)}px;
    font-family: Poppins-Medium;
    align-items: center;
    text-align: center;
    padding-vertical: ${`${ScaleUtils.ScreenHeight * 0.01}px`};
    text-decoration: underline;
`;
