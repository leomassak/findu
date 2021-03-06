import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { ActivityIndicator, Alert, RefreshControl } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import * as S from './styles';
import * as NotificationsSelector from '../../redux/reducers/notifications';
import * as NotificationsActions from '../../redux/actions/notifications';
import UserApi from '../../api/user';

import Header from '../../components/Header/Header';

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
            await UserApi.getUser();
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
                    ListEmptyComponent={!isLoading && <S.EmptyText>Nenhuma notificação encontrada</S.EmptyText>}
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
                                {moment(item.createdAt).tz("America/Sao_Paulo").format('DD/MM/YYYY HH:mm')}
                            </S.NotificationsCardDate>
                        </S.NotificationsCard>
                    )}
                />
            </S.ProfileContainerScrollView>
        </>
    );
}
