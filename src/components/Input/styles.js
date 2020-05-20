import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const TextInputContainer = styled.View`
    width: 100%;
`;

export const TextInputTitle = styled.Text`
    font-size: 14px;
    font-family: Poppins-Medium;
    text-align: left;
    margin-bottom: 5px;
`;

export const TextInput = styled.TextInput`
    border: solid #000 1px;
    height: ${`${ScaleUtils.ScreenHeight * 0.08}px`};
    border-radius: 10px;
    padding: 5%;
`;

export const TextInputContainerIconTouchableOpacity = styled.TouchableOpacity`
    background-color: white;
    height: ${`${ScaleUtils.ScreenWidth * 0.1}px`};
    width: ${`${ScaleUtils.ScreenWidth * 0.1}px`};
    position: absolute;
    right: 1%;
    top: 45%;
    align-items: center;
    justify-content: center;
`;