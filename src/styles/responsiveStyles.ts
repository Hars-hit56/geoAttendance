import { Dimensions } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
const moderateScaleVertical = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;
const textScale = (percent: number) => { return RFValue(percent, 580) };

export { scale, verticalScale, textScale, moderateScale, moderateScaleVertical, width, height };