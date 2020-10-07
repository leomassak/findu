import styled from 'styled-components/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import * as ScaleUtils from '../../utils/scale';

export const ModalContainer = styled.View`
    background-color:#fff;
    align-self:center;
    width: ${`${ScaleUtils.ScreenWidth * 0.8}px`};
    height: ${(props) => (props.biggerModal ? `${ScaleUtils.ScreenHeight * 0.55}px` : `${ScaleUtils.ScreenHeight * 0.45}px`)};
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
    margin-top: auto;
`;

export const ModalEmailTitle = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.027}px`};
    font-family: Poppins-Bold;
    text-align: center;
`;

export const ModalCodeText = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.070}px`};
    font-family: Poppins-Regular;
    text-align: center;
`;

export const ModalEmailButtonView = styled.View`
    margin-top: auto;
    width: 100%;
`;

export const AddInputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 15px;
`;

export const AddContactOptInput = styled(OTPInputView)`
    height: ${`${ScaleUtils.ScreenWidth * 0.16}px`};
    font-size: 25px;
    font-family: Poppins-Bold;
    color: #000;
    margin-bottom: 15px;
`;

export const ModalLoading = styled.ActivityIndicator.attrs({
    size: "large",
    color: "#4442C0"
})`
`;
