module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|react-redux|@reduxjs/toolkit|redux|immer|reselect|use-sync-external-store|react-native-responsive-fontsize|react-native-iphone-x-helper)/)',
  ],
};
