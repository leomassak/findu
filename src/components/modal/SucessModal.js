import React from 'react';
import Modal from 'react-native-modal';

import * as S from './styles';

import DefaultButton from '../button/DefaultButton';

import IconCloseModal from '../../assets/svg/ic-close.svg';
import IconCheck from '../../assets/svg/Modal/ic_check.svg';

export default function PswRecoverModal({
    onPress,
    isVisible,
    onDismiss,
    text
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
                    <IconCheck />
                </S.ModalEmailIconView>
                <S.ModalEmailTitle>
                    {text}
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
