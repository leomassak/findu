import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';
import BackIcon from '../BackIcon/BackIcon';

export const HeaderView = styled.View`
    width: 100%;
    height: ${`${ScaleUtils.ScreenHeight * 0.12}px`};
    justify-content: space-between;
    align-items: center;
`;

export const HeaderBackButtonContainer = styled.TouchableOpacity`
    margin-left: 5%;
`;

export const HeaderBackButtonIcon = styled(BackIcon)``;