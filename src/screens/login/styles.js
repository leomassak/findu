import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const PageContainer = styled.ScrollView`
    flex: 1;
    background-color: #FFFF;
    padding: 3% 6%;
`;

export const PageTitleContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10%;
`;

export const PageTitleText = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.037}px`};
    font-family: Poppins-Bold;
    text-align: left;
    margin-left: 6%;
`;

export const InputContainer = styled.View`
    margin-bottom: 5%;
`;

export const UnderlineButtonContainer = styled.View`
    margin: 5% 0;
`;