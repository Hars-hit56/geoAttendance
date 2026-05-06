import { ColorValue, Dimensions } from 'react-native';
import colors from '../utility/colors';

export const size = Dimensions.get('screen').width;

export function boxShadow(
  color?: ColorValue,
  offset = { height: 4, width: 4 },
  radius = 10,
  opacity = 1,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export function boxShadowLess(
  color: ColorValue,
  offset = { height: 1, width: 1 },
  radius = 3,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export function boxShadowTwo(
  color = colors.BLACK,
  offset = { height: 1, width: 0 },
  radius = 2,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
export function boxShadowZero(
  color: ColorValue,
  offset = { height: 0, width: 0 },
  radius = 0,
  opacity = 0,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
