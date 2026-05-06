import {
  CommonActions,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import React from 'react';
import { SCREEN_HOME } from './utility/constants';

// ✅ single source of truth
export const navigationRef: any = React.createRef();

// ---------------- NAVIGATION ----------------

export function navigate(routeName: string, params?: Record<string, any>) {
  navigationRef.current?.navigate(routeName, params);
}

export function replace(routeName: string, params?: Record<string, any>) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

export function push(routeName: string, params?: Record<string, any>) {
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}

// ---------------- BACK ----------------

export function back() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current.goBack();
  } else {
    clearStack(SCREEN_HOME); // 👈 safe fallback
  }
}

// ---------------- STACK CONTROL ----------------

export function clearStack(routeName: string, params?: Record<string, any>) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
}

export function popToTop() {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

export function popToScreen(count: number) {
  navigationRef.current?.dispatch(StackActions.pop(count));
}

// ---------------- DRAWER ----------------

export function openDrawer() {
  navigationRef.current?.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

// ---------------- ROUTE INFO ----------------

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

// ---------------- EXPORT ----------------

export default {
  navigate,
  replace,
  push,
  back,
  clearStack,
  popToTop,
  popToScreen,
  openDrawer,
  closeDrawer,
  getCurrentRoute,
};
