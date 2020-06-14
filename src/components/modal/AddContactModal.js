import React from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import * as S from './styles';
import * as ScaleUtils from '../../utils/scale';
import DefaultButton from '../button/DefaultButton';
import IconCloseModal from '../../assets/svg/ic-close.svg';

export default function AddContactModal({
    onPress,
    isVisible,
    onDismiss,
    setContactCode,
}) {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onDismiss}
        >
            <S.ModalContainer>
                <S.ModalCloseTouchableOpacity
                    onPress={onDismiss}
                >
                    <IconCloseModal 
                         height={ScaleUtils.ScreenHeight * 0.04}
                         width={ScaleUtils.ScreenWidth * 0.05}
                    />
                </S.ModalCloseTouchableOpacity>
                    <Icon name="md-person-add" size={140} color="#000"/>
                    <S.AddContactOptInput 
                        pinCount={6}
                        keyboardType="default"
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={{ 
                            color: '#000',
                            borderWidth: 0,
                            borderBottomWidth: 2,
                            borderColor: '#000',
                            fontSize: 25,
                            width: 35, 
                            height: 55,
                            marginRight: 5,
                            paddingBottom: 5,
                        }}
                        onCodeFilled ={(code => {
                            setContactCode(code);
                        })}
                    />                    
                <S.ModalEmailButtonView>
                    <DefaultButton
                        text="Adicionar"
                        onPressListener={onPress}
                        fontColor="#FFF"
                        background="#4F80E1"
                    />
                </S.ModalEmailButtonView>
            </S.ModalContainer>
        </Modal>
    )
}
