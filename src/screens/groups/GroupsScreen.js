import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as S from './styles';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as GroupsActions from '../../redux/actions/groups';

import Header from '../../components/Header/Header';
import ContactCard from '../../components/Contacts/ContactCard';
import Loading from '../../components/Loading/Loading';

function GroupsScreen(props) {
  const dispatch = useDispatch();

  const getAllGroupsOnRequest = useSelector((state) =>
    LoadingSelector.getLoading(state),
  );

  const [search, setSearch] = useState('');
  const [paginationEnd, setPaginationEnd] = useState(false);
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    limit: 10,
    approved: true,
    search: '',
  });

  useEffect(() => {
    props.navigation.addListener('focus', () => getAllGroups());

    return () => {
      props.navigation.removeListener('focus', () => getAllGroups());
    };
  }, [props.navigation]);

  useEffect(() => {
    getAllGroups();
  }, [paginationParams]);

  const getAllGroups = async (addLoading = true) => {
    setIsloading(true);
    try {
      const groupsInfo = await dispatch(
        GroupsActions.getAllGroups(paginationParams, addLoading),
      );
      setGroups((prevGroups) =>
        paginationParams.page === 1
          ? groupsInfo.rows
          : [...prevGroups, ...groupsInfo.rows],
      );
      console.log(groups);
      setPaginationEnd(!groupsInfo.hasNextPage);
    } catch (err) {
      Alert.alert('Erro', err.message);
    } finally {
      setIsloading(false);
    }
  };

  const onSearchGroup = (text) => {
    if (groups && groups.length > 0) {
      const filteredGroups = groups.filter((group) =>
        group.name.includes(text),
      );
      setFilteredGroups(filteredGroups);
      setNoSearchResult(filteredGroups.length === 0);
      setSearch(text);
    }
  };

  const handleFlatListEnd = async () => {
    if (!paginationEnd && !isLoading) {
      setPaginationParams((prevParams) => ({
        ...prevParams,
        page: prevParams.page + 1,
      }));
      await getAllGroups(false);
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <S.PaginationLoadingView>
        <ActivityIndicator color="#4F80E1" />
      </S.PaginationLoadingView>
    );
  };

  const renderEmptyState = () => {
    return <S.EmptyGroupsText>Nenhum grupo na lista</S.EmptyGroupsText>;
  };

  const renderHeader = () => {
    return (
      <>
        <Header
          noStatusBar
          addButton
          onPressListener={() => props.navigation.goBack()}
          onPressAddButton={() => props.navigation.navigate('AddInfo')}
          headerText="Meus Grupos"
        />
        <S.InputView>
          <S.GroupsSearchInput
            placeholder="Pesquisar"
            value={search}
            placeholderTextColor="#8F8E8E"
            onChangeText={(text) => onSearchGroup(text)}
            returnKeyType="search"
          />
          <S.SearchIconButton onPress={() => {}}>
            <Icon name="search" size={25} color="#8F8E8E" />
          </S.SearchIconButton>
        </S.InputView>
      </>
    );
  };

  return (
    <>
      {getAllGroupsOnRequest && <Loading />}
      <StatusBar barStyle="light-content" backgroundColor="#4F80E1" />
      <S.GroupsScreenContainer>
        <S.GroupsFlatList
          data={search.length > 0 ? filteredGroups : groups}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          onEndReachedThreshold={0.25}
          onEndReached={handleFlatListEnd}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <S.GroupCardContainer
              onPress={() => console.log('teste')}
            >
              <S.GroupName>
                {item.name}
              </S.GroupName>

              <S.GroupColorView
                backgroundColor={item.color}
              />
              
            </S.GroupCardContainer>
          )}
        />
      </S.GroupsScreenContainer>
    </>
  );
}

export default GroupsScreen;
