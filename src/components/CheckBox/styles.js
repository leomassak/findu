import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const CheckBoxContainer = styled.View`
    width: 100%;
    flex-direction: row;
`;

export const CheckBoxTouchableOpacity = styled.TouchableOpacity`
    height: ${`${ScaleUtils.ScreenWidth * 0.05}px`};
    width: ${`${ScaleUtils.ScreenWidth * 0.05}px`};
    justify-content: center;
    align-items: center;
    padding: 4% 5%;
    margin-right: 2%;
`;

export const SquareEmptyCheckBox = styled.View`
    height: ${`${ScaleUtils.ScreenWidth * 0.05}px`};
    width: ${`${ScaleUtils.ScreenWidth * 0.05}px`};
    border: solid #4442C0 2px;
`;

export const SquareFullCheckBox = styled.View`
    height: ${`${ScaleUtils.ScreenWidth * 0.05}px`};
    width: ${`${ScaleUtils.ScreenWidth * 0.05}px`};
    border: solid #4442C0 2px;
    background-color: #4442C0;
    align-items: center;
    justify-content: center;
`;

export const CircleEmptyCheckBox = styled.View`
    height: ${`${ScaleUtils.ScreenWidth * 0.05}px`};
    width: ${`${ScaleUtils.ScreenWidth * 0.05}px`};
    border-radius: ${`${ScaleUtils.ScreenWidth * 0.025}px`};
    border: solid #4442C0 2px;
    align-items: center;
    justify-content: center;
`;

export const CircleFullCheckBox = styled.View`
    height: ${`${ScaleUtils.ScreenWidth * 0.03}px`};
    width: ${`${ScaleUtils.ScreenWidth * 0.03}px`};
    border-radius: ${`${ScaleUtils.ScreenWidth * 0.015}px`};
    border: solid #4442C0 2px;
    background-color: #4442C0;
`;

export const CheckBoxText = styled.Text`
    flex: 1;
    color: ${ (props) => props.fontColor || '#000' };
    font-size: ${`${ScaleUtils.ScreenWidth * 0.042}px`};
    font-family: Poppins-Bold;
    font-style: normal;
`;