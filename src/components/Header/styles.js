import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const HeaderView = styled.View`
    flex-direction: row;
    width: 100%;
    height: ${props => props.headerText ? `${ScaleUtils.ScreenHeight * 0.11}px` : `${ScaleUtils.ScreenHeight * 0.08}px`};
    align-items: center;
    justify-content: ${props => props.headerText ? 'space-around' : 'space-between'};
    background-color: ${props => props.background};
`;

export const HeaderBackButtonContainer = styled.TouchableOpacity`
    width: ${`${ScaleUtils.ScreenHeight * 0.07}px`};
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
`;
