import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, RefreshControl } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as S from './styles';
import * as NotificationsSelector from '../../redux/reducers/notifications';
import * as NotificationsActions from '../../redux/actions/notifications';

import Header from '../../components/Header/Header';
import moment from 'moment';


export default function NotificationsScreen({ navigation }) {
    const dispatch = useDispatch();
    
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paginationParams, setPaginationParams] = useState({
        page: 1,
        limit: 15,
    });

    const notifications = useSelector(state => NotificationsSelector.getAll(state));
    const notificationLimit = useSelector(state => NotificationsSelector.getLimit(state));

    useEffect(() => {
        setIsLoading(true);
        getAll();
    }, [paginationParams]);

    const getAll = async () => {
        try {
            await dispatch(NotificationsActions.getAll(paginationParams));
            setIsLoading(false);
        } catch (err) {
            Alert.alert('Erro', err.message);
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

    const handleFlatListEnd = async () => {
        if (!notificationLimit && !isLoading) {
            setPaginationParams(prevParams => ({ page: prevParams.page + 1, limit: 15 }));
        }
    }

    return (
        <>
            <Header
                onPressListener={() => {
                    dispatch(NotificationsActions.saveAllNotifications([]));
                    dispatch(NotificationsActions.saveNotificationsLimit(true));
                    navigation.goBack();
                }}
                headerText="Notificações"
                color
                noStatusBar
            />
            <S.ProfileContainerScrollView>
                <S.NotificationsFlatList
                    data={notifications}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={!isLoading && <S.EmptyText>Nenhum contato na lista</S.EmptyText>}
                    refreshControl={(
                        <RefreshControl
                            colors={['#4F80E1']}
                            refreshing={refreshing}
                            onRefresh={() => {
                                setIsLoading(true);
                                dispatch(NotificationsActions.saveAllNotifications([]));
                                dispatch(NotificationsActions.saveNotificationsLimit(true));
                                setPaginationParams({
                                    page: 1,
                                    limit: 15,
                                });
                            }}
                        />
                    )}
                    onEndReached={handleFlatListEnd}
                    onEndReachedThreshold={0}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <S.NotificationsCard>
                            <S.NotificationsCardText>
                                <S.NotificationsCardTitle>
                                    {item.title}
                                </S.NotificationsCardTitle>
                                <S.NotificationsCardBody>
                                    {item.body}
                                </S.NotificationsCardBody>
                            </S.NotificationsCardText>
                            <S.NotificationsCardDate>
                                {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
                            </S.NotificationsCardDate>
                        </S.NotificationsCard>
                    )}
                />
            </S.ProfileContainerScrollView>
        </>
    );
}
