import React from 'react';
import Modal from 'react-native-modal';

import * as S from './styles';

import DefaultButton from '../button/DefaultButton';

import IconCloseModal from '../../assets/svg/ic-close.svg';
import IconCheck from '../../assets/svg/Modal/ic_map-location.svg';

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
                    Para continuar a utilizar o app, você deve permitir o uso da sua localização!
                </S.ModalEmailTitle>
                <S.ModalEmailButtonView>
                    <DefaultButton
                        text="Permitir"
                        onPressListener={onPress}
                        fontColor="#FFF"
                        background="#4F80E1"
                    />
                </S.ModalEmailButtonView>
            </S.ModalContainer>
        </Modal>
    )
}
