import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Image from '../component/common/Image';
import RegularText from '../component/common/RegularText';
import History from '../component/screen/appScreen/history';
import Home from '../component/screen/appScreen/home';
import { spacing } from '../styles/spacing';
import { FONT_FAMILY, FONT_SIZE } from '../styles/typography';
import colors from '../utility/colors';
import {
  SCREEN_HISTORY,
  SCREEN_HOME,
  SCREEN_SETTINGS,
} from '../utility/constants';
import { Images } from '../utility/imagePaths';
import Settings from '../component/screen/appScreen/settings';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const insets = useSafeAreaInsets();
  const tabData = [
    {
      label: 'Home',
      name: SCREEN_HOME,
      icon_active: Images.IMG_HOME_ACTIVE,
      icon_inactive: Images.IMG_HOME_INACTIVE,
      component: Home,
    },
    {
      label: 'History',
      name: SCREEN_HISTORY,
      icon_active: Images.IMG_HISTORY_ACTIVE,
      icon_inactive: Images.IMG_HISTORY_INACTIVE,
      component: History,
    },
    {
      label: 'Settings',
      name: SCREEN_SETTINGS,
      icon_active: Images.IMG_SETTINGS_ACTIVE,
      icon_inactive: Images.IMG_SETTINGS_INACTIVE,
      component: Settings,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.APP_BACKGROUND_WHITE,
            height: spacing.HEIGHT_60 + insets.bottom,
            margin: 0,
            paddingTop: spacing.PADDING_10,
            paddingBottom:
              insets.bottom > 0 ? insets.bottom : spacing.PADDING_8,
            borderTopWidth: spacing.RADIUS_1,
          },
          tabBarAllowFontScaling: true,
          headerShown: false,
          tabBarHideOnKeyboard: true,

          tabBarButton: props => (
            <TouchableOpacity {...(props as any)} activeOpacity={1} />
          ),
        }}
      >
        {tabData.map((item, index) => {
          return (
            <Tab.Screen
              key={`bottomTabMain_${index.toString()}`}
              name={item.name}
              component={item.component}
              options={{
                headerPressOpacity: 1,
                tabBarIcon: ({ focused }: any) => {
                  return (
                    <View
                      style={[
                        styles.mainContainer,
                        { width: spacing.FULL_WIDTH / tabData.length },
                      ]}
                    >
                      <Image
                        source={focused ? item.icon_active : item.icon_inactive}
                        style={[
                          styles.icon,
                          focused && { tintColor: colors.THEME },
                        ]}
                        resizeMode="contain"
                      />
                      <RegularText
                        style={[
                          styles.tabLabel,
                          focused && { color: colors.THEME },
                        ]}
                      >
                        {item.label}
                      </RegularText>
                    </View>
                  );
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: spacing.WIDTH_24,
    height: spacing.WIDTH_24,
    tintColor: colors.GREY_600,
  },
  tabLabel: {
    fontSize: FONT_SIZE.VERY_SMALL,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    color: colors.GREY_600,
    marginTop: spacing.MARGIN_2,
  },
});

export default BottomTabs;
