import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';

import * as ScaleUtils from '../../utils/scale';

import Svg from '../../assets/svg/burguer.svg';
import SvgProfile from '../../assets/svg/profile.svg';

export const HomeContainer = styled.View`
  flex: 1;
`;

export const PageMapViewContainerView = styled.View`
  /* height: ${(props) => (props.height ? '100%' : '80%')}; */
  height: 100%;
`;

export const PageMapView = styled(MapView)`
  position: absolute;
  top: -5;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const PageMarker = styled(Marker)`
`;

export const PageMarkerView = styled.View`
  height: ${`${ScaleUtils.ScreenHeight * 0.05}px`};
  width: ${`${ScaleUtils.ScreenHeight * 0.05}px`};
  border-radius: ${`${ScaleUtils.ScreenHeight * 0.025}px`};
  border: solid black 1px;
  justify-content: center;
  align-items: center;
`;

export const PageMarkerImage = styled.Image`
  height: ${`${ScaleUtils.ScreenHeight * 0.045}px`};
  width: ${`${ScaleUtils.ScreenHeight * 0.045}px`};
  border-radius: ${`${ScaleUtils.ScreenHeight * 0.0225}px`};
`;

export const PageMarkerDefaultSvg = styled(SvgProfile)`
  height: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
  width: ${`${ScaleUtils.getPixelRatio * 18.5}px`};
`;

export const PageFriendListScrollView = styled.ScrollView`
  z-index: 500;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35%;
  background-color: white;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
`;

export const PageFriendDetailsTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  padding: 4% 5%;
  border-bottom-color: rgb(140,140,140);
  border-bottom-width: 1px;
  flex-direction: row;
`;

export const PageFriendImageView = styled.View`
  height: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
  width: ${`${ScaleUtils.ScreenHeight * 0.1}px`};
  border-radius: ${`${ScaleUtils.ScreenHeight * 0.05}px`};
  border: solid black 1px;
  justify-content: center;
  align-items: center;
  margin-right: 5%;
  overflow: hidden;
`;

export const PageFriendImage = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

export const PageFriendTextView = styled.View`
  flex-direction: column;
  width: 80%;
`;

export const PageFriendNameText = styled.Text`
  font-size: 18px;
  font-family: Poppins-Regular;
  text-align: left;
  width: 80%;
`;

export const PageFriendDistanceText = styled.Text`
  font-size: 18px;
  font-family: Poppins-Regular;
  text-align: left;
  color: #888888;
`;

export const BurguerButton = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
    top: 10px;
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