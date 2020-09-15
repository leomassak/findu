import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as S from './styles';
import * as LoadingSelector from '../../../redux/reducers/loading';
import * as FriendsActions from '../../../redux/actions/friends';
import * as GroupsActions from '../../../redux/actions/groups';

import Header from '../../../components/Header/Header';
import ContactCard from '../../../components/Contacts/ContactCard';
import Loading from '../../../components/Loading/Loading';
import Logo from '../../../assets/svg/ic_logo.svg';

function GroupsScreen(props) {
  const dispatch = useDispatch();

  const getAllFriendsOnRequest = useSelector((state) =>
    LoadingSelector.getLoading(state),
  );

  const [search, setSearch] = useState('');
  const [paginationEnd, setPaginationEnd] = useState(false);
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [paginationParams, setPaginationParams] = useState({
      page: 1,
      limit: 10,
      approved: true,
      search: '',
  });

  useEffect(() => {
    getAllFriends();
}, []);

  const getAllFriends = async (addLoading = true) => {
    setIsloading(true);
    try {
        const friendsInfo = await dispatch(FriendsActions.getAllFriends(paginationParams, addLoading));
        setFriends(prevFriends => paginationParams.page === 1 ? friendsInfo.friends : [...prevFriends, ...friendsInfo.friends]);
        setPaginationEnd(!friendsInfo.hasNextPage);
    } catch (err) {
        Alert.alert('Erro', err.message);
    } finally {
        setIsloading(false);
    }
}

const onSearchContact = (text) => {
    const filteredContacts = friends.filter(friend => friend.name.includes(text));
    setFilteredFriends(filteredContacts);
    setNoSearchResult(filteredContacts.length === 0);
    setSearch(text);
}

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
    return <S.EmptyFriendsText>Nenhum contato na lista</S.EmptyFriendsText>;
  };

  const renderHeader = () => {
    return (
      <>
         <Header
          noStatusBar
          addContinue
          onPressListener={() => props.navigation.goBack()}
        />
         <S.PageTitleContainer>
            <Logo />
            <S.PageTitleText>
                Adicionar Membros
            </S.PageTitleText>
        </S.PageTitleContainer>
        <S.InputView>
          <S.FriendsSearchInput
            placeholder="Pesquisar"
            value={search}
            placeholderTextColor="#8F8E8E"
            onChangeText={(text) => onSearchContact(text)}
            returnKeyType="search"
          />
          <S.SearchIconButton onPress={() => {}}>
            <Icon name="search" size={25} color="#8F8E8E" />
          </S.SearchIconButton>
        </S.InputView>
      </>
    );
  };

  const handleAddGroup = async () => {
    const { groupName, selectedColor } = props.route.params;
    await dispatch(GroupsActions.addGroup(groupName, selectedColor, selectedFriends));
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'HomeNavigator' }]
  });
  }

  return (
    <>
      {getAllFriendsOnRequest && <Loading />}
      <StatusBar barStyle="light-content" backgroundColor="#4F80E1" />
      <S.AddMembersContainer>
        <S.FriendsFlatList
          data={search.length > 0 ? filteredFriends : friends}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          onEndReachedThreshold={0.25}
          onEndReached={handleFlatListEnd}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <ContactCard
              contact={item}
              index={index}
            />
          )}
        />
        <S.ContinueButton onPress={handleAddGroup}>
          <Icon name="arrow-right" color="#FFF" size={35} />
        </S.ContinueButton>
      </S.AddMembersContainer>
    </>
  );
}

export default GroupsScreen;
