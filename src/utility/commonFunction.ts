import { PermissionsAndroid, Platform } from 'react-native';
import NavigationService from '../NavigationService';
import { Coordinate } from './attendance';
import Geolocation from '@react-native-community/geolocation';

//NAVIGATION FUNCTIONS
export const navigate = (routeName: string, params?: Record<string, any>) => {
  //code to tarck
  NavigationService.navigate(routeName, params);
};

export const replace = (routeName: string, params?: Record<string, any>) => {
  NavigationService.replace(routeName, params);
};

export const goBack = () => {
  NavigationService.back();
};

export const openDrawer = () => {
  NavigationService.openDrawer();
};

export const closeDrawer = () => {
  NavigationService.closeDrawer();
};

export const clearStack = (routeName: string, params = {}) => {
  NavigationService.clearStack(routeName, params);
};

export const push = (routeName: string, params = {}) => {
  NavigationService.push(routeName, params);
};

export const getOfficeRegionDelta = (radius: number) => {
  const radiusWithPadding = Math.max(radius * 4, 500);
  return radiusWithPadding / 111000;
};

const toRadians = (value: number) => (value * Math.PI) / 180;

export const getDistanceInMeters = (
  currentLocation: Coordinate,
  officeLocation: Coordinate,
) => {
  const earthRadiusMeters = 6371000;
  const latitudeDelta = toRadians(
    officeLocation.latitude - currentLocation.latitude,
  );
  const longitudeDelta = toRadians(
    officeLocation.longitude - currentLocation.longitude,
  );

  const startLatitude = toRadians(currentLocation.latitude);
  const endLatitude = toRadians(officeLocation.latitude);

  const a =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDelta / 2) *
      Math.sin(longitudeDelta / 2);

  return earthRadiusMeters * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const isInsideOfficeGeofence = (
  distance: number | null,
  radius: number,
) => distance !== null && distance <= radius;

export const formatAttendanceDateTime = (date: Date) => ({
  date: date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }),
  time: date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }),
});

export const requestLocationPermission = async (message: string) => {
  if (Platform.OS === 'android') {
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission',
        message,
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    );

    return response === PermissionsAndroid.RESULTS.GRANTED;
  }

  return new Promise<boolean>(resolve => {
    Geolocation.requestAuthorization(
      () => resolve(true),
      () => resolve(false),
    );
  });
};
