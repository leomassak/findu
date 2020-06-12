import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const ModalContainer = styled.View`
    background-color:#fff;
    align-self:center;
    width: ${`${ScaleUtils.ScreenWidth * 0.8}px`};
    height: ${`${ScaleUtils.ScreenHeight * 0.45}px`};
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    padding: 10%;
`;

export const ModalCloseTouchableOpacity = styled.TouchableOpacity`
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5%;
    justify-content: center;
    align-items: center;
`;

export const ModalCloseIcon = styled.Image`
    align-self:center;
    height: ${`${ScaleUtils.ScreenHeight * 0.02}px`};
    width: ${`${ScaleUtils.ScreenWidth * 0.03}px`};
`;

export const ModalEmailIconView = styled.View`
    margin-bottom: 5%;
`;

export const ModalEmailTitle = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.027}px`};
    font-family: Poppins-Bold;
    text-align: center;
`;

export const ModalEmailButtonView = styled.View`
    margin-top: 5%;
    width: 100%;
`;

export const AddInputContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: ${ScaleUtils.ScreenWidth * 0.15}px;
    margin-bottom: 15px;
`;

export const AddContactInput = styled.TextInput`
    height: ${ScaleUtils.ScreenWidth * 0.14}px;
    width: 20%;
    background-color: #FFF;
    border-bottom-width: 2px;
    font-size: 25px;
    padding-bottom:0;
    text-align: center;
    font-family: Poppins-Bold;
    align-items: center;
    text-decoration: none;
`;
