import React, { useState } from 'react';
import { ColorPicker } from 'react-native-color-picker';
import Modal from 'react-native-modal';

import * as S from './styles';
import Header from '../../../components/Header/Header';
import DefaultButton from '../../../components/button/DefaultButton';
import Logo from '../../../assets/svg/ic_logo.svg';
import IconCloseModal from '../../../assets/svg/ic-close.svg';


function Addinfo(props) {
  const [selectedColor, setColor ] = useState('');
  const [groupName, setGroupName ] = useState('');
  const [showPickerModal, setShowPickerModal] = useState(false);

  const onSelectColor = (color) => {
    setColor(color);
    setShowPickerModal(false);
  }

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
                <S.PickerLabel>Selecione a cor do novo grupo</S.PickerLabel>
                <ColorPicker
                  onColorSelected={color => onSelectColor(color)}
                  style={{ height: 200, width: 200 }}
                  hideSliders
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
                Adicionar Grupo
            </S.PageTitleText>
        </S.PageTitleContainer>
          <S.GroupNameInput 
          onChangeText={(text) => setGroupName(text)}
          placeholder="Nome do Grupo" 
          placeholderTextColor="#4F80E1"
          />
          <S.ColorPickerButtonLabel>Selecione uma cor: </S.ColorPickerButtonLabel>
          <S.ColorPickerButton onPress={() => setShowPickerModal(true)}>
            <S.SelectedColorView color={selectedColor} />
          </S.ColorPickerButton>
          <S.ButtonsContainer>
            <DefaultButton
              text="Continuar"
              onPressListener={() => props.navigation.navigate('AddMembers', { groupName, selectedColor })}
              fontColor="#FFF"
              background="#4F80E1"
              disabled={groupName.length === 0 || selectedColor.length === 0}
            />
          </S.ButtonsContainer>
      </S.AddInfoContainer>
  );
}

export default Addinfo;