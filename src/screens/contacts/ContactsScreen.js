import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as S from './styles';
import * as LoadingSelector from '../../redux/reducers/loading';
import * as FriendsActions from '../../redux/actions/friends';

import Header from '../../components/Header/Header';
import ContactCard from '../../components/Contacts/ContactCard';
import AddContactModal from '../../components/modal/AddContactModal';
import Loading from '../../components/Loading/Loading';


function ContactsScreen (props) {
    const dispatch = useDispatch();

    const getAllFriendsOnRequest = useSelector(state => LoadingSelector.getLoading(state));

    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [paginationEnd, setPaginationEnd] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [friends, setFriends] = useState([]);
    const [friendCode, setFriendCode] = useState('');
    const [paginationParams, setPaginationParams] = useState({
        page: 1,
        limit: 10,
        approved: false,
        search: '',
    });

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => getAllFriends());
        return unsubscribe;
    }, [props.navigation]);

    const getAllFriends = async (addLoading = true) => {
        setIsloading(true);
        try {
            const friendsInfo = await dispatch(FriendsActions.getAllFriends(paginationParams, addLoading));
            setFriends(prevFriends => paginationParams.page === 1 ? friendsInfo.friends : [...prevFriends, ...friendsInfo.friends]);
            setPaginationEnd(!friendsInfo.hasNextPage);
        } catch(err) {
            Alert.alert('Erro', err.message);
        } finally {
            setIsloading(false);
        }
    }

    const toggleModal = () => {
        setShowAddModal(prevState => !prevState);
    }

    const searchContact = async () => {
        await dispatch(FriendsActions.searchFriend);
    }

    const addContact = async () => {
        try {
            await dispatch(FriendsActions.addFriend(friendCode));
            Alert.alert('Amigo adicionado com sucesso!');
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    }

    const handleFlatListEnd = async () => {
        if (!paginationEnd && !isLoading) {
            setPaginationParams(prevParams => ({...prevParams, page: prevParams.page + 1}));
            await getAllFriends(false);
        }
    }

    const renderFooter = () => {
        if (!isLoading) return null;
        return (
            <S.PaginationLoadingView>
                <ActivityIndicator color="#4F80E1" />
            </S.PaginationLoadingView>
        );
    }

    return (
        <>
        {getAllFriendsOnRequest && <Loading />}
        <StatusBar 
               barStyle="light-content"
               backgroundColor="#4F80E1" 
            />
        { console.log('code', friendCode) }
        <S.ContactsScreenContainer contentContainerStyle={{ paddingBottom: 15 }}>
            <AddContactModal 
                isVisible={showAddModal}
                onDismiss={toggleModal}
                onPress={addContact}
                setContactCode={setFriendCode}
            />
            <Header 
                noStatusBar
                addButton
                onPressListener={() => props.navigation.goBack()}
                onPressAddButton={() => toggleModal()}
            />
            <S.HeaderName>Meus Contatos</S.HeaderName>
            <S.InputView>
                <S.ContactSearchInput
                    placeholder="Pesquisar"
                    value={search}
                    placeholderTextColor="#8F8E8E"
                    onChangeText={(text) => setSearch(text)}
                    onSubmitEditing={searchContact}
                    returnKeyType="search"
                />
                <S.SearchIconButton onPress={searchContact}>
                    <Icon name="search" size={25} color="#8F8E8E" />
                </S.SearchIconButton>
            </S.InputView> 
            {friends.length > 0 
                ? <S.ContactsFlatList 
                    data={friends}
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.25}
                    onEndReached={handleFlatListEnd}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                        <ContactCard contact={item} index={index} onPress={() => props.navigation.navigate('Profile', { friendId: item._id })} />
                    )
                    }
                />
                : <S.EmptyFriendsText>Nenhum amigo na lista</S.EmptyFriendsText>
            }
        </S.ContactsScreenContainer>
        </>
    );
}

export default ContactsScreen;