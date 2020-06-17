import { Dimensions, PixelRatio } from 'react-native';

export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const DeviceRatio = PixelRatio.get();
export const FontScale = PixelRatio.getFontScale();

export const nearestWidthPixelScale = (size) => PixelRatio.roundToNearestPixel(ScreenWidth * (size / 100));
export const nearestHeightPixelScale = (size) => PixelRatio.roundToNearestPixel(ScreenHeight * (size / 100));

export const nearestPixel = (value) => {
    return PixelRatio.getPixelSizeForLayoutSize(value);
}

export const pixelScale = (size) => {
    return size * (ScreenWidth / guidelineBaseWidth);
}

export const verticalScale = (size) => {
    return size * (ScreenHeight / guidelineBaseHeight);
}