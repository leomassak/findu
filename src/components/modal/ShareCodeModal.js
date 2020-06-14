import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

import * as S from './styles';

import DefaultButton from '../../components/button/DefaultButton';
import * as UserActions from '../../redux/actions/user';

import IconCloseModal from '../../assets/svg/ic-close.svg';
import Snackbar from '../../utils/Snackbar';

export default function ShareCodeModal({
    isVisible,
    onDismiss,
}) {
    const dispatch = useDispatch();
    const [userShareCode, setUserShareCode] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getShareCode();
    }, [])

    const getShareCode = async () => {
        setLoading(true);
        try {
            const response = await dispatch(UserActions.getShareCode());
            setUserShareCode(response.shareCode);
        }
        catch (err) {
            Snackbar(err.message);
            setTimeout(() => onDismiss(), 1000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onDismiss}
        >
            <S.ModalContainer
                biggerModal
            >
                <S.ModalCloseTouchableOpacity
                    onPress={onDismiss}
                >
                    <IconCloseModal />
                </S.ModalCloseTouchableOpacity>
                {loading ? (
                    <S.ModalLoading />
                ) : (
                        <>
                            <Icon
                                name="md-person-add"
                                size={80}
                                color="#000"
                            />
                            <S.ModalEmailTitle>
                                Compartilhe esse código com seus amigos para eles te adicionarem!
                            </S.ModalEmailTitle>
                            <S.ModalCodeText>
                                {userShareCode}
                            </S.ModalCodeText>
                            <S.ModalEmailButtonView>
                                <DefaultButton
                                    text="Entendi"
                                    onPressListener={onDismiss}
                                    fontColor="#FFF"
                                    background="#4F80E1"
                                />
                            </S.ModalEmailButtonView>
                        </>
                    )}

            </S.ModalContainer>
        </Modal>
    )
}
