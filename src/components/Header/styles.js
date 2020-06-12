import styled from 'styled-components/native';

import * as ScaleUtils from '../../utils/scale';

export const HeaderView = styled.View`
    flex-direction: row;
    width: 100%;
    height: ${`${ScaleUtils.ScreenHeight * 0.08}px`};
    align-items: center;
    justify-content: space-between;
`;

export const HeaderBackButtonContainer = styled.TouchableOpacity`
    width: ${`${ScaleUtils.ScreenHeight * 0.07}px`};
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const AddButtonContainer = styled(HeaderBackButtonContainer)`
`;
