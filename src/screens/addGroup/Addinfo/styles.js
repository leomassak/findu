import styled from 'styled-components/native';
import * as ScaleUtils from '../../../utils/scale';

export const AddInfoContainer = styled.View`
    flex: 1;
    background-color: #FFF;
    padding: 5% 5%;
`;

export const PageTitleContainer = styled.View`
    width: 80%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${ScaleUtils.ScreenHeight * 0.04}px;
    margin-top: ${ScaleUtils.ScreenHeight * 0.03}px;
`;

export const PageTitleText = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.037}px`};
    font-family: Poppins-Bold;
    text-align: left;
    margin-left: 6%;
`;

export const AddInfoFieldsView = styled.View`
    align-items: center;
`;

export const ButtonsContainer = styled.View`
    width: 100%;
    margin-top: 40px;
`;

export const ColorPickerButton = styled.TouchableOpacity`
    height: 30px;
    width: 120px;
    border-width: 1px;
    border-color: #3434;
`;

export const SelectedColorView = styled.View`
    flex: 1;
    background-color: ${(props) => props.color || '#FFF'};
`;

export const ColorPickerButtonLabel = styled.Text`
    color: #000;
    font-family: Poppins-Bold;
    font-size: 18px;
    margin-bottom: 5px;
`;

export const GroupNameInput = styled.TextInput`
    width: 100%;
    padding-bottom: 5px;
    font-size: 16px;
    font-family: Poppins-Regular;
    margin-bottom: 35px;
    border-bottom-width: 1px;
    border-color: #4F80E1;
`;

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

export const PickerView = styled.View`
    flex: 1;
    border-width: 2px;
`;

export const PickerLabel = styled.Text`
    color: #000;
    font-family: Poppins-Bold;
    font-size: 16px;
    margin-bottom: 5px;
    text-align: center;
    margin-top: 15px;
`;