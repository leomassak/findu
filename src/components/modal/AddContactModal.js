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
                <S.ModalEmailIconView>
                    <Icon name="md-person-add" size={100} color="#000"/>
                </S.ModalEmailIconView>
                <S.AddInputContainer>
                    <S.AddContactInput 
                        maxLength={1}
                        autoCapitalize="characters"
                        caretHidden={true}
                    />
                    <S.AddContactInput 
                        maxLength={1}
                        autoCapitalize="characters"
                        caretHidden={true}
                    />
                    <S.AddContactInput 
                         maxLength={1}
                         autoCapitalize="characters"
                         caretHidden={true}
                    />
                    <S.AddContactInput 
                         maxLength={1}
                         autoCapitalize="characters"
                         caretHidden={true}
                    />
                </S.AddInputContainer>
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
