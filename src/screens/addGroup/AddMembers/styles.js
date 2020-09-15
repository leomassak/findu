import styled from 'styled-components/native';
import * as ScaleUtils from '../../../utils/scale';

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
    height: ${ScaleUtils.ScreenWidth * 0.1}px;
    align-items: center;
    justify-content: center;
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

