import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as S from './styles';
import Header from '../../components/Header/Header';
import ContactCard from '../../components/Contacts/ContactCard';
import AddContactModal from '../../components/modal/AddContactModal';

function ContactsScreen (props) {
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const searchContact = () => {
        console.log('Pesquisei');
    }

    const addContact = () => {
        console.log('adicionei');
        setShowAddModal(prevState => !prevState);
    }

    return (
        <S.ContactsScreenContainer contentContainerStyle={{ paddingBottom: 15 }}>
            {console.log(showAddModal)}
            <AddContactModal 
                isVisible={showAddModal}
                onDismiss={addContact}
                onPress={addContact}
            />
            <Header 
                addButton
                onPressListener={() => props.navigation.goBack()}
                onPressAddButton={() => addContact()}
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
            <S.ContactsFlatList 
                data={[1, 2, 3]}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={(item, index) => (
                    <ContactCard contact={item} index={index} onPress={() => props.navigation.navigate('Profile')} />
                )
                }
            />
        </S.ContactsScreenContainer>
    );
}

export default ContactsScreen;