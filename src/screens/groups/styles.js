import styled from 'styled-components/native';
import * as ScaleUtils from '../../utils/scale';

export const GroupsScreenContainer = styled.View`
    flex: 1;
    background-color: #FFF;
`;

export const HeaderName = styled.Text`
    font-size: 24px;
    font-family: Poppins-Bold;
    color: #000;
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
`;

export const HeaderView = styled.View`
    padding-horizontal: 5%;
`;


export const InputView = styled.View`
    margin-top: 20px;
`;

export const GroupsSearchInput = styled.TextInput`
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

export const GroupsFlatList = styled.FlatList``;

export const PaginationLoadingView = styled.View`
    height: ${ScaleUtils.ScreenWidth * 0.1}px;
    align-items: center;
    justify-content: center;
    margin-top: ${ScaleUtils.ScreenWidth * 0.1}px;
`;

export const EmptyGroupsText = styled.Text`
    font-size: 18px;
    font-family: Poppins-Bold;
    margin-top: 20px;
    text-align:center;
    height: ${ScaleUtils.ScreenWidth * 0.2}px;
`;

export const GroupCardContainer = styled.TouchableOpacity`
    width: 90%;
    align-self: center;
    height: ${ScaleUtils.ScreenWidth * 0.22};
    background-color: #FFF;
    border-bottom-width: 1px;
    border-color: #CECECE;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 0 5%;
`;

export const GroupName = styled.Text`
    font-size: ${ScaleUtils.pixelScale(20)}px;
    font-family: Poppins-Regular;
    width: 70%;
    color: #000;
`;

export const GroupColorView = styled.View`
    height: ${ScaleUtils.ScreenWidth * 0.05};
    width: ${ScaleUtils.ScreenWidth * 0.05};
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: ${ScaleUtils.ScreenWidth * 0.05};
`;