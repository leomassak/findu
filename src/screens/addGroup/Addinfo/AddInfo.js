import React, { useState, useEffect } from 'react';
import { ColorPicker } from 'react-native-color-picker';
import Modal from 'react-native-modal';

import * as S from './styles';
import Header from '../../../components/Header/Header';
import DefaultButton from '../../../components/button/DefaultButton';
import Logo from '../../../assets/svg/ic_logo.svg';
import Input from '../../../components/Input/Input';
import IconCloseModal from '../../../assets/svg/ic-close.svg';


function Addinfo(props) {
  const [selectedColor, setColor ] = useState('');
  const [groupName, setGroupName ] = useState('');
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);
  const [oldGroup, setOldGroup] = useState({});

  const onSelectColor = (color) => {
    setColor(color);
    setShowPickerModal(false);
  }

  useEffect(() => {
    const { params } = props.route;
    if (params && params.group) {
      setGroupName(params.group.name)
      setColor(params.group.color)
      setIsEditPage(true);
      setOldGroup(params.group);
    }
  }, []);

  return (
      <S.AddInfoContainer>
         <Modal
            isVisible={showPickerModal}
            onBackdropPress={() => setShowPickerModal(false)}
        >
            <S.ModalContainer>
                <S.ModalCloseTouchableOpacity
                    onPress={() => setShowPickerModal(false)}
                >
                  <IconCloseModal />
                </S.ModalCloseTouchableOpacity>
                <S.PickerLabel>
                  {isEditPage
                    ? 'Selecionar uma nova cor para o grupo'
                    : 'Selecione a cor do novo grupo'}
                </S.PickerLabel>
                <ColorPicker
                  onColorSelected={color => onSelectColor(color)}
                  style={{ height: 200, width: 200 }}
                  hideSliders
                  defaultColor={selectedColor || '#000FFF'}
                />
            </S.ModalContainer>
        </Modal>
        <Header
          noStatusBar
          onPressListener={() => props.navigation.goBack()}
        />
         <S.PageTitleContainer>
            <Logo />
            <S.PageTitleText>
              {isEditPage ? 'Editar Grupo' : 'Adicionar Grupo'}
            </S.PageTitleText>
        </S.PageTitleContainer>
          <S.InputContainer>
            <Input
              title="Nome do Grupo"
              value={groupName}
              keyboardType="default"
              secureTextEntry={false}
              onChangeValue={(text) => setGroupName(text)}
            />
          </S.InputContainer>
          <S.ColorPickerButtonLabel>Selecione uma cor: </S.ColorPickerButtonLabel>
          <S.ColorPickerButton onPress={() => setShowPickerModal(true)}>
            <S.SelectedColorView color={selectedColor} />
          </S.ColorPickerButton>
          <S.ButtonsContainer>
            <DefaultButton
              text="Continuar"
              onPressListener={() => props.navigation.navigate('AddMembers', {
                groupName,
                selectedColor,
                ...(isEditPage && { oldGroup })
              })}
              fontColor="#FFF"
              background="#4F80E1"
              disabled={groupName.length === 0 || selectedColor.length === 0}
            />
          </S.ButtonsContainer>
      </S.AddInfoContainer>
  );
}

export default Addinfo;