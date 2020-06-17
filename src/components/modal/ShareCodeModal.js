import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    BackHandler, Linking, Alert, Share
} from 'react-native';

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

    const onShareClick = async (code) => {
        await Share.share({
            title: 'Compartilhar Código',
            dialogTitle: 'Compartilhar Código',
            message: `Esse código te da acesso a minha localização do APP FindU!
${code}`
        });
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
                                Compartilhe o código abaixo com uma pessoa!
                            </S.ModalEmailTitle>
                            <S.ModalCodeText>
                                {userShareCode}
                            </S.ModalCodeText>
                            <S.ModalEmailButtonView>
                                <DefaultButton
                                    text="Compartilhar"
                                    onPressListener={() => onShareClick(userShareCode)}
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
