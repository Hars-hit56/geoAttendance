import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  ColorValue,
  Platform,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../utility/colors';

type AppContainerProps = {
  barStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  backgroundColor?: ColorValue;
  statusBarColor?: ColorValue;
  edges?: Edge[];
};

function AppContainer({
  barStyle = 'dark-content',
  style,
  children,
  backgroundColor,
  statusBarColor,
  edges = ['top'],
}: AppContainerProps) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(barStyle);

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(statusBarColor || colors.APP_BACKGROUND);
      }
    }, [barStyle, statusBarColor]),
  );

  return (
    <SafeAreaView
      edges={edges}
      style={{
        flex: 1,
        backgroundColor:
          statusBarColor || backgroundColor || colors.APP_BACKGROUND,
      }}
    >
      <View
        style={[
          { flex: 1 },
          { backgroundColor: backgroundColor || colors.APP_BACKGROUND },
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

export default React.memo(AppContainer);
