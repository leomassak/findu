import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

import Svg from '../../assets/svg/profile.svg';

export const ProfileContainerScrollView = styled.ScrollView`  
    flex: 1;
    background-color: #FFFFFF;
`;

export const NotificationsFlatList = styled.FlatList``;

export const PaginationLoadingView = styled.View`
    height: ${`${ScaleUtils.ScreenWidth * 0.1}px`};
    align-items: center;
    justify-content: center;
    margin-top: ${`${ScaleUtils.ScreenWidth * 0.1}px`};
`;

export const EmptyText = styled.Text`
    font-size: 18px;
    font-family: Poppins-Bold;
    margin-top: 20px;
    text-align:center;
    height: ${`${ScaleUtils.ScreenWidth * 0.2}px`};
`;

export const NotificationsCard = styled.View`
    margin-top: 10px;
    width: 100%;
    padding: 0 6%;
    flex-direction: row;
    align-items: center;
`;

export const NotificationsCardText = styled.View`
    width: 75%;
`;

export const NotificationsCardTitle = styled.Text`
    font-family: Poppins-Medium;
    font-size: ${`${ScaleUtils.pixelScale(16)}px`};
    line-height: ${`${ScaleUtils.pixelScale(20)}px`};
`;

export const NotificationsCardBody = styled.Text`
    font-family: Poppins-Light;
    font-size: ${`${ScaleUtils.pixelScale(14)}px`};
    line-height: ${`${ScaleUtils.pixelScale(18)}px`};
`;

export const NotificationsCardDate = styled.Text`
    font-family: Poppins-Light;
    font-size: ${ScaleUtils.pixelScale(14)};
    line-height: ${ScaleUtils.pixelScale(18)};
    width: 25%;
    text-align: right;
`;
