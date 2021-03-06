import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as S from './styles';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as FriendsActions from '../../redux/actions/friends';

import Header from '../../components/Header/Header';
import ContactCard from '../../components/Contacts/ContactCard';
import AddContactModal from '../../components/modal/AddContactModal';
import FilterButton from '../../components/button/filterButton/FilterButton';
import Loading from '../../components/Loading/Loading';

function ContactsScreen(props) {
    const filterButtonNames = ['Seguindo', 'Seguidores', 'Solicitações'];

    const dispatch = useDispatch();

    const getAllFriendsOnRequest = useSelector(state => LoadingSelector.getLoading(state));

    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [currentFilter, setCurrentFilter] = useState(0);
    const [isFriendCard, setIsFriendCard] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [paginationEnd, setPaginationEnd] = useState(false);
    const [noSearchResult, setNoSearchResult] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [friendCode, setFriendCode] = useState('');
    const [paginationParams, setPaginationParams] = useState({
        page: 1,
        limit: 10,
        status: 2,
        search: '',
    });

    useEffect(() => {
        props.navigation.addListener('focus', () => getAllFriends());
        props.navigation.addListener('blur', () => setCurrentFilter(0));

        return () => {
            props.navigation.removeListener('focus', () => getAllFriends());
            props.navigation.removeListener('blur', () => setCurrentFilter(0));
        };
    }, [props.navigation]);

    useEffect(() => {
        setIsloading(true);
        getAllFriends();
    }, [paginationParams]);

    const getAllFriends = async (addLoading = true) => {
        try {
            const friendsInfo = await dispatch(currentFilter === 0 ? FriendsActions.getAllFriends(paginationParams, addLoading) : FriendsActions.getAllFollowers(paginationParams, addLoading));
            if (currentFilter === 0) {
                setFriends(prevFriends => paginationParams.page === 1 ? friendsInfo.friends : [...prevFriends, ...friendsInfo.friends]);
            } else {
                setFriends(prevFriends => paginationParams.page === 1 ? friendsInfo.followers : [...prevFriends, ...friendsInfo.followers]);
            }
            setPaginationEnd(!friendsInfo.hasNextPage);
        } catch (err) {
            Alert.alert('Erro', err.message);
        } finally {
            setIsloading(false);
        }
    }

    const toggleModal = () => {
        setShowAddModal(prevState => !prevState);
    }

    const onSearchContact = (text) => {
        const filteredContacts = friends.filter(friend => friend.name.includes(text));
        setFilteredFriends(filteredContacts);
        setNoSearchResult(filteredContacts.length === 0);
        setSearch(text);
    }

    const addContact = async () => {
        try {
            await dispatch(FriendsActions.addFriend(friendCode));
            Alert.alert('Solicitação realizada com sucesso!');
            toggleModal();
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    }

    const handleFlatListEnd = async () => {
        if (!paginationEnd && !isLoading) {
            setPaginationParams(prevParams => ({ ...prevParams, page: prevParams.page + 1 }));
            await getAllFriends(false);
        }
    }

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <S.PaginationLoadingView>
                <ActivityIndicator size="large" color="#4F80E1" />
            </S.PaginationLoadingView>
        );
    }

    const handleFilter = async (index) => {
        setCurrentFilter(index);
        switch (index) {
            case 0:
                setIsFriendCard(true);
                setPaginationParams(prevParams => ({
                    ...prevParams,
                    status: 2,
                }))
                break;
            case 1:
                setIsFriendCard(true);
                setPaginationParams(prevParams => ({
                    ...prevParams,
                    status: 2,
                }))
                break;
            case 2:
                setIsFriendCard(false);
                setPaginationParams(prevParams => ({
                    ...prevParams,
                    status: 1,
                }))
                break;
            default:
                break;
        }
        setFriends([]);
    }

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#4F80E1"
            />
            <Header
                noStatusBar
                addButton
                onPressListener={() => props.navigation.goBack()}
                onPressAddButton={() => toggleModal()}
                headerText="Meus Contatos"
                color
            />
            <S.ContactsScreenContainer contentContainerStyle={{ paddingBottom: 15 }}>
                <AddContactModal
                    isVisible={showAddModal}
                    onDismiss={toggleModal}
                    onPress={addContact}
                    setContactCode={setFriendCode}
                />
                <S.FilterButtonsView>
                    {filterButtonNames.map((name, index) => (
                        <FilterButton
                            selected={index === currentFilter}
                            buttonName={name}
                            onPressListener={() => index === currentFilter ? {} : handleFilter(index)}
                        />
                    ))}
                </S.FilterButtonsView>
                <S.InputView>
                    <S.ContactSearchInput
                        placeholder="Pesquisar"
                        value={search}
                        placeholderTextColor="#8F8E8E"
                        onChangeText={(text) => onSearchContact(text)}
                        returnKeyType="search"
                    />
                    <S.SearchIconButton onPress={() => { }}>
                        <Icon name="search" size={25} color="#8F8E8E" />
                    </S.SearchIconButton>
                </S.InputView>
                <S.ContactsFlatList
                    data={search.length > 0 ? filteredFriends : friends}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={!isLoading && <S.EmptyFriendsText>Nenhum contato na lista</S.EmptyFriendsText>}
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
                                    status: currentFilter === 2 ? 1 : 2,
                                    search: '',
                                });
                            }}
                        />
                    )}
                    onEndReachedThreshold={0.25}
                    onEndReached={handleFlatListEnd}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <ContactCard
                            contact={item}
                            index={index}
                            onPress={() => props.navigation.navigate('Profile', { friendId: item._id, isFriend: currentFilter === 0 })}
                            invite={!isFriendCard}
                        />
                    )}
                />
            </S.ContactsScreenContainer>
        </>
    );
}

export default ContactsScreen;