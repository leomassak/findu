import styled from 'styled-components/native';
import * as ScaleUtils from '../../../utils/scale';

export const FilterButtonContainer = styled.TouchableOpacity`
    height: ${ScaleUtils.ScreenWidth * 0.15}px;
    width: ${props => props.customWidth || `${ScaleUtils.ScreenWidth * 0.28}px`};
    background-color: ${props => props.selected ? '#4F80E1' : "#FFF" };
    border-width: 1px;
    border-color: #4F80E1;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const FilterButtonName = styled.Text`
    text-align: center;
    color: ${props => props.selected ? "#FFF" : "#4F80E1"};
    font-size: 16px;
`;