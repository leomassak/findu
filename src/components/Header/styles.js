import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const HeaderView = styled.View`
    flex-direction: row;
    width: 100%;
    height: ${props => props.headerText ? `${ScaleUtils.ScreenHeight * 0.12}px` : `${ScaleUtils.ScreenHeight * 0.08}px`};
    align-items: center;
    /* justify-content: ${props => props.headerText ? 'space-around' : 'space-between'}; */
    background-color: ${props => props.background};
`;

export const HeaderBackButtonContainer = styled.TouchableOpacity`
    width: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const AddButtonContainer = styled(HeaderBackButtonContainer)`
`;

export const HeaderText = styled.Text`
    font-size: ${ScaleUtils.pixelScale(22)}px;
    font-family: Poppins-Bold;
    color: #FFF;
    text-align: center;
    width: 65%;
`;


export const RoundContainer = styled.View`
    border-width: 2px;
    width: 45;
    height: 45;
    align-items: center;
    justify-content: center;
    border-color: ${props => props.color};
    border-radius: 400px;
`;