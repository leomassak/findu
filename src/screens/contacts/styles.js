import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

export const ContactsScreenContainer = styled.ScrollView`
    flex: 1;
    background-color: #FFF;
    padding: 5% 5%;
`;

export const HeaderName = styled.Text`
    font-size: 24px;
    font-family: Poppins-Bold;
    color: #000;
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
`;

export const InputView = styled.View`
`;

export const ContactSearchInput = styled.TextInput`
    height: ${ScaleUtils.ScreenWidth * 0.15}px;
    width: 100%;
    border-radius: 10px;
    background-color: #F2F2F2;
    padding-left: 25px;
    font-size: 18px;
    font-family: Poppins-Regular;
    margin-bottom: 5px;
`;

export const SearchIconButton = styled.TouchableOpacity`
    position: absolute;
    width: 30px;
    height: 100%;
    align-items: center;
    right: 12px;
    padding-top: 40%;
`;

export const ContactsFlatList = styled.FlatList``;

export const PaginationLoadingView = styled.View`
    height: ${ScaleUtils.ScreenWidth * 0.1}px;
    align-items: center;
    justify-content: center;
`;

export const EmptyFriendsText = styled.Text`
    font-size: 18px;
    font-family: Poppins-Bold;
    margin-top: 20px;
    text-align:center;
`;