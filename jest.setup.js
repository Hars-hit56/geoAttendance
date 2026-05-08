/* eslint-env jest */
import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-community/geolocation', () => ({
  __esModule: true,
  default: {
    clearWatch: jest.fn(),
    getCurrentPosition: jest.fn(),
    requestAuthorization: jest.fn(success => success && success()),
    watchPosition: jest.fn(() => 1),
  },
}));

jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn(() => jest.fn()),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

jest.mock('react-native-flash-message', () => ({
  __esModule: true,
  default: () => null,
  showMessage: jest.fn(),
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockMapView = React.forwardRef((props, ref) => (
    <View ref={ref} {...props} />
  ));

  return {
    __esModule: true,
    default: MockMapView,
    Circle: View,
    Marker: View,
    PROVIDER_GOOGLE: 'google',
  };
});
