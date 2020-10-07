import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

import * as ScaleUtils from '../../utils/scale';

export const TextInputContainer = styled.View`
    width: 100%;
`;

export const TextInputTitle = styled.Text`
    font-size: ${`${ScaleUtils.pixelScale(16)}px`};
    font-family: Poppins-Medium;
    text-align: left;
    color: #4F80E1;
`;

export const TextInput = styled.TextInput`
    border-bottom-width: 1px;
    border-color: #4F80E1;
    font-size: ${`${ScaleUtils.pixelScale(15)}px`};
`;

export const MaskedInput = styled(TextInputMask)`
    border-bottom-width: 1px;
    border-color: #4F80E1;
    font-size: ${`${ScaleUtils.pixelScale(15)}px`};
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