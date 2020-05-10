import { Dimensions, PixelRatio } from 'react-native';

export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
export const DeviceRatio = PixelRatio.get();
export const FontScale = PixelRatio.getFontScale();