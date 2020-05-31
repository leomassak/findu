import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';

import * as ScaleUtils from '../../utils/scale';
import Svg from '../../assets/svg/burguer.svg';

export const HomeContainer = styled.View`
    flex: 1;
`;

export const PageMapViewContainerView = styled.View`
  height: 100%;
`;

export const PageMapView = styled(MapView)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const BurguerButton = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
    top: 20px;
    width: ${ScaleUtils.ScreenHeight * 0.08}px;
    height: ${ScaleUtils.ScreenHeight * 0.08}px;
    border-radius: 100px;
    background-color: #FEFEFE;
    justify-content: center;
    align-items: center;
    z-index: 500;
`;

export const BurguerIcon = styled(Svg)`
`;