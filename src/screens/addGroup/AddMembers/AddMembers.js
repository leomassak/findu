import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StatusBar, RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntd from 'react-native-vector-icons/AntDesign';

import * as S from './styles';
import * as LoadingSelector from '../../../redux/reducers/loading';
import * as FriendsActions from '../../../redux/actions/friends';
import * as GroupsActions from '../../../redux/actions/groups';

import Header from '../../../components/Header/Header';
import Logo from '../../../assets/svg/ic_logo.svg';
import * as ScaleUtils from '../../../utils/scale';
import Snackbar from '../../../utils/Snackbar';

function GroupsScreen(props) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [paginationEnd, setPaginationEnd] = useState(false);
  const [noSearchResult, setNoSearchResult] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);
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
  }, [paginationParams]);

  const getAllFriends = async (addLoading = true) => {
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
        <ActivityIndicator size="large" color="#4F80E1" />
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
    setSendLoading(true);
    try {
      await dispatch(GroupsActions.addGroup(groupName, selectedColor, selectedFriends));
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'HomeNavigator' }]
      });
    } catch (err) {
      Snackbar(err.message);
    } finally {
      setSendLoading(false);
    }
  }

  const addMemberToGroup = (member) => {
    if (selectedFriends.find((item) => item === member)) {
      setSelectedFriends(selectedFriends.filter((item) => item !== member))
    } else {
      setSelectedFriends(selectedFriends.concat(member))
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4F80E1" />
      <S.AddMembersContainer>
        <S.FriendsFlatList
          data={search.length > 0 ? filteredFriends : friends}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={!isLoading && renderEmptyState}
          onEndReachedThreshold={0.25}
          onEndReached={handleFlatListEnd}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <S.ContactCardContainer
              onPress={() => addMemberToGroup(item._id)}
              activeOpacity={0.5}
            >
              <S.ProfileImageContainer>
                {item.profilePhoto ? (
                  <S.ProfileImage
                    source={{ uri: item.profilePhoto.url }}
                    resizeMode="cover"
                  />
                ) : (
                    <S.ProfileSvg
                      height={ScaleUtils.ScreenHeight * 0.06}
                      width={ScaleUtils.ScreenHeight * 0.06}
                    />
                  )}
              </S.ProfileImageContainer>
              <S.ContactName>{item.name}</S.ContactName>
                {selectedFriends.find((selectedItem) => selectedItem === item._id) && (
                  <S.AcceptAndDeclineButtonView>
                    <S.AcceptDeclineButton>
                      <IconAntd name="checkcircle" size={36} color="#4442C0" />
                    </S.AcceptDeclineButton>
                  </S.AcceptAndDeclineButtonView>
                )}
            </S.ContactCardContainer>
          )}
          refreshControl={(
            <RefreshControl
              colors={['#4F80E1']}
              refreshing={refreshing}
              onRefresh={() => {
                setIsloading(true);
                setPaginationParams({
                  page: 1,
                  limit: 10,
                  approved: true,
                  search: '',
                });
              }}
            />
          )}
        />
        <S.ContinueButton onPress={handleAddGroup}>
          {sendLoading && (
            <ActivityIndicator size="large" color="white" />
          )}
          {!sendLoading && (
            <Icon name="arrow-right" color="#FFF" size={35} />
          )}
        </S.ContinueButton>
      </S.AddMembersContainer>
    </>
  );
}

export default GroupsScreen;
