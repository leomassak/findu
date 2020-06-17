import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

import * as ScaleUtils from '../../utils/scale';

export const TextInputContainer = styled.View`
    width: 100%;
`;

export const TextInputTitle = styled.Text`
    font-size: ${ScaleUtils.pixelScale(16)}px;
    font-family: Poppins-Medium;
    text-align: left;
    margin-bottom: 5px;
`;

export const TextInput = styled.TextInput`
    border: solid #000 1px;
    height: ${`${ScaleUtils.nearestWidthPixelScale(14)}px`};
    border-radius: 10px;
    padding: 5%;
    font-size: ${ScaleUtils.pixelScale(15)}px;
`;

export const MaskedInput = styled(TextInputMask)`
    border: solid #000 1px;
    height: ${`${ScaleUtils.nearestWidthPixelScale(14)}px`};
    border-radius: 10px;
    padding: 5%;
    font-size: ${ScaleUtils.pixelScale(13)}px;
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