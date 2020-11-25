import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ColorPicker } from 'react-native-color-picker';
import Modal from 'react-native-modal';

import * as GroupsActions from '../../../redux/actions/groups';

import * as S from './styles';

import Header from '../../../components/Header/Header';
import Loading from '../../../components/Loading/Loading';
import Input from '../../../components/Input/Input';
import DefaultButton from '../../../components/button/DefaultButton';
import Snackbar from '../../../utils/Snackbar';
import * as LocationRules from '../../../enumerators/rules';
import LocationService from '../../../services/locations';
import * as UserSelector from '../../../redux/reducers/user';

import Logo from '../../../assets/svg/ic_logo.svg';
import IconCloseModal from '../../../assets/svg/ic-close.svg';


function Addinfo(props) {
  const dispatch = useDispatch();
  const userData = useSelector(state => UserSelector.getUser(state));

  const [selectedColor, setColor ] = useState('');
  const [groupName, setGroupName ] = useState('');
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);
  const [oldGroup, setOldGroup] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const deleteGroup = async (addLoading = true) => {
    setIsLoading(true);
    try {
      await dispatch(GroupsActions.removeGroup(oldGroup._id));
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'HomeNavigator' }]
      });
      Snackbar('Grupo deletado com sucesso!');
    } catch (err) {
      Snackbar(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const createRules = async (action) => {
    await LocationService.getUserLocation(userData._id, (value) => {
      props.navigation.navigate('Rule', {
        group: oldGroup,
        initialRegion: { latitude: value.lat, longitude: value.lng },
        action,
      })
    });
  }

  const rendeRuleType = (type) => {
    let response = 'Chegar ou sair de ';
    if (type === 1) {
      response = 'Chegar em '
    } else if (type === 2) {
      response = 'Sair de '
    }
    return response;
  }

  const deleteGroupRule = async (ruleId) => {
    try {
      await dispatch(GroupsActions.deleteGroupRule(oldGroup._id, ruleId));
      Alert.alert('Alerta deletado com sucesso', '', [
        {
          text: 'OK',
          onPress: () => props.navigation.goBack(),
        }
      ])
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  }

  return (
      <>
        {isLoading && <Loading />}
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
            {oldGroup && oldGroup.rules && oldGroup.rules.map((item, index) => (
              <S.RulesView>
                <S.RulesText>
                  {`${index + 1} - `}{rendeRuleType(item.action)}{item.areaName}
                </S.RulesText>
                <S.RulesTouchableOpacityIcon
                  onPress={() => deleteGroupRule(item._id)}
                >
                  <S.RulesIcon
                    name="trash-o"
                    color="black"
                    size={18}
                  />
                </S.RulesTouchableOpacityIcon>
              </S.RulesView>
            ))}

            <S.ButtonsContainer>
              {isEditPage && (
                <DefaultButton
                  text="Adicionar Avisos"
                  onPressListener={() => Alert.alert(
                    'Selecione o tipo de aviso:',
                    '',
                    [
                      {
                        text: 'Chegar ou Sair do local',
                        onPress: () => createRules(LocationRules.RuleType.LEAVE_OR_ENTER_AREA),
                      },
                      {
                        text: 'Chegar no local',
                        onPress: () => createRules(LocationRules.RuleType.ENTER_AREA),
                      },
                      {
                        text: 'Sair da área',
                        onPress: () => createRules(LocationRules.RuleType.LEAVE_AREA),
                      },
                    ], { cancelable: false }
                  )}
                  fontColor="#FFF"
                  background="#4F80E1"
                />
              )}
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
              {isEditPage && (
                <DefaultButton
                  text="Deletar grupo"
                  onPressListener={deleteGroup}
                  fontColor="#4F80E1" 
                  border="#4F80E1"
                  background="transparent"
                />
              )}
              
            </S.ButtonsContainer>
        </S.AddInfoContainer>
      </>
  );
}

export default Addinfo;