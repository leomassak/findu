import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const HeaderView = styled.View`
    width: 100%;
    height: ${`${ScaleUtils.ScreenHeight * 0.12}px`};
`;

export const HeaderBackButtonContainer = styled.TouchableOpacity`
    width: ${`${ScaleUtils.ScreenHeight * 0.10}px`}
    height: ${`${ScaleUtils.ScreenHeight * 0.10}px`};
`;
