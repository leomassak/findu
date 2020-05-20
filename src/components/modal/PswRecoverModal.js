import React from 'react';
import Modal from 'react-native-modal';

import * as S from './styles';

import DefaultButton from '../../components/button/DefaultButton';

import IconCloseModal from '../../assets/svg/ic-close.svg';
import IconEmail from '../../assets/svg/ic_email.svg';

export default function PswRecoverModal({
    onPress,
    isVisible,
    onDismiss,
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
                    <IconCloseModal />
                </S.ModalCloseTouchableOpacity>
                <S.ModalEmailIconView>
                    <IconEmail />
                </S.ModalEmailIconView>
                <S.ModalEmailTitle>
                    Enviamos um E-mail para sua caixa de entrada
                </S.ModalEmailTitle>
                <S.ModalEmailButtonView>
                    <DefaultButton
                        text="Continuar"
                        onPressListener={onPress}
                        fontColor="#FFF"
                        background="#4F80E1"
                        border="#4F80E1"
                    />
                </S.ModalEmailButtonView>
            </S.ModalContainer>
        </Modal>
    )
}
