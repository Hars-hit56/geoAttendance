import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { navigationRef } from '../NavigationService';
import * as Utils from '../utility';
import AppNavigator from './appNavigation';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          // initialRouteName={Utils.Constants.KEY_APP_NAVIGATOR}
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name={Utils.Constants.KEY_APP_NAVIGATOR}
            component={AppNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppStack;
