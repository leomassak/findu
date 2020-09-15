import styled from 'styled-components/native';
import * as ScaleUtils from '../../../utils/scale';

import Svg from '../../../assets/svg/profile.svg';

export const AddMembersContainer = styled.View`
    flex: 1;
    background-color: #FFF;
    padding: 5% 5%;
`;

export const PageTitleContainer = styled.View`
    width: 80%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${ScaleUtils.ScreenHeight * 0.04}px;
    margin-top: ${ScaleUtils.ScreenHeight * 0.03}px;
`;

export const PageTitleText = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.037}px`};
    font-family: Poppins-Bold;
    text-align: left;
    margin-left: 6%;
`;

export const InputView = styled.View`
`;

export const SearchIconButton = styled.TouchableOpacity`
    position: absolute;
    width: 30px;
    height: 100%;
    align-items: center;
    right: 12px;
    padding-top: 40%;
`;

export const FriendsFlatList = styled.FlatList``;

export const EmptyFriendsText = styled.Text`
    font-size: 18px;
    font-family: Poppins-Bold;
    margin-top: 20px;
    text-align:center;
`;

export const PaginationLoadingView = styled.View`
    height: ${ScaleUtils.ScreenWidth * 0.3}px;
    align-items: center;
    justify-content: center;
    margin-top: ${ScaleUtils.ScreenWidth * 0.01}px;
`;

export const FriendsSearchInput = styled.TextInput`
    height: ${ScaleUtils.ScreenWidth * 0.15}px;
    width: 100%;
    border-radius: 10px;
    background-color: #F2F2F2;
    padding-left: 25px;
    font-size: 18px;
    font-family: Poppins-Regular;
    margin-bottom: 5px;
`;

export const ContinueButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    right: 25px;
    width: 65px;
    height: 65px;
    border-radius: 80px;
    background-color: #4F80E1;
    align-items: center;
    justify-content: center;
`;

export const ContactCardContainer = styled.TouchableOpacity`
    width: 100%;
    height: ${ScaleUtils.ScreenWidth * 0.3};
    background-color: #FFF;
    border-bottom-width: 1px;
    border-color: #CECECE;
    align-items: center;
    flex-direction: row;
`;

export const ProfileImageContainer = styled.View`
    height: ${ScaleUtils.nearestWidthPixelScale(20)};
    width: ${ScaleUtils.nearestWidthPixelScale(20)};
    border-radius: 400px;
    overflow: hidden;
    background-color: #CECECE;
    border: solid black 1px;
    justify-content: center;
    align-items: center;
    margin-horizontal: ${ScaleUtils.nearestWidthPixelScale(5)};
`;

export const ProfileImage = styled.ImageBackground`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const ContactName = styled.Text`
    font-size: ${ScaleUtils.pixelScale(20)}px;
    font-family: Poppins-Regular;
    width: 50%;
    color: #000;
`;

export const AcceptAndDeclineButtonView = styled.View`
   height: 80%;
   background-color: #FFF;
   justify-content: space-around;
   align-items: center;
`;

export const AcceptDeclineButton = styled.TouchableOpacity`
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const ProfileSvg = styled(Svg)`
    height: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
    width: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
`;
