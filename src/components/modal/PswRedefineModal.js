import React from 'react';
import Modal from 'react-native-modal';

import * as S from './styles';

import DefaultButton from '../../components/button/DefaultButton';

import IconCloseModal from '../../assets/svg/ic-close.svg';
import IconCheck from '../../assets/svg/Modal/ic_check.svg';

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
                    <IconCheck />
                </S.ModalEmailIconView>
                <S.ModalEmailTitle>
                    Sua senha foi redefinida com sucesso!
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
