import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const PageContainer = styled.ScrollView`
    flex: 1;
    background-color: #FFFF;
    padding: 3% 6%;
`;

export const PageTitleContainer = styled.View`
    width: 80%;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${`${ScaleUtils.ScreenHeight * 0.04}px`};
    margin-top: ${`${ScaleUtils.ScreenHeight * 0.03}px`};
`;

export const PageTitleText = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.037}px`};
    font-family: Poppins-Bold;
    text-align: left;
    margin-left: 6%;
`;

export const PageTitleDescription = styled.Text`
    font-size: ${`${ScaleUtils.ScreenHeight * 0.030}px`};
    font-family: Poppins-SemiBold;
    text-align: left;
    margin-bottom: 10%;
`;

export const InputContainer = styled.View`
    margin-bottom: 5%;
`;

export const PageButtonView = styled.View`
    margin-top: 10%;
`;