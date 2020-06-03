import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MaskService } from 'react-native-masked-text';

import * as ScaleUtils from '../../utils/scale';
import * as LoadingSelector from '../../redux/reducers/loading';

import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import DefaultButton from '../../components/button/DefaultButton';
import * as S from './styles';

import AddIcon from '../../assets/svg/ic_icon-add.svg';

export default function EditProfileScreen(props) {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => LoadingSelector.getLoading(state));
    const [formData, setFormdata] = useState({
        name:"",
        email:"",
        phone:"",
    });
    const [photo, setPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const onFormDataChange = (value, field) => {
        setFormdata({
            ...formData,
            [field]: value,
        })
    }

    return (
        <S.ProfileContainerScrollView>
            <Header
                onPressListener={() => props.navigation.goBack()}
            />
            <S.ProfilePicView>
                <S.ProfilePicAddTouchableOpacity>
                    <AddIcon />
                </S.ProfilePicAddTouchableOpacity>
                <S.ProfilePicImageView
                    onPress={() => console.log('Mudando foto')}
                >
                    {photo ? (
                        <S.ProfilePicImage
                            source={{ uri: photo.uri }}
                        />
                    ) : (
                        <S.ProfileSvg
                            height={ScaleUtils.ScreenHeight * 0.09}
                            width={ScaleUtils.ScreenHeight * 0.09}
                        />
                    )}
                </S.ProfilePicImageView>
            </S.ProfilePicView>

            <S.InputContainer>
                <Input
                    title="Nome"
                    value={formData.name}
                    onChangeValue={(text) => onFormDataChange(text, 'name')}
                    secureTextEntry={false}
                />
            </S.InputContainer>

            <S.InputContainer>
                <Input
                    title="Telefone"
                    maskType="cel-phone"
                    maskOptions={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '+99 99',
                    }}
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeValue={
                        (text) => onFormDataChange(MaskService.toRawValue('cel-phone', text), 'phone')
                    }
                />
            </S.InputContainer>

            <S.InputContainer>
                <Input
                    title="E-Mail"    
                    value={formData.email}
                    keyboardType="email-address"
                    secureTextEntry={false}
                    onChangeValue={(text) => onFormDataChange(text, 'email')}
                />
            </S.InputContainer>
            
            <S.ButtonsContainer> 
                <DefaultButton 
                  text="Salvar"
                  onPressListener={() => console.log('Editar perfil')}
                  fontColor="#FFF"
                  background="#4F80E1"
                />
            </S.ButtonsContainer>
        </S.ProfileContainerScrollView>
    );
}
