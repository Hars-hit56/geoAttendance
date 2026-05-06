import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import * as Utils from '../utility';
import BottomTabs from './bottomTabs';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={Utils.Constants.KEY_BOTTOM_TAB_NAVIGATOR}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen
          name={Utils.Constants.KEY_BOTTOM_TAB_NAVIGATOR}
          component={BottomTabs}
        />
      </Stack.Navigator>
    </View>
  );
};

export default AppNavigator;
