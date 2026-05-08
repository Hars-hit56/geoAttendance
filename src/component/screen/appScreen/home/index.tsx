import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import NetInfo from '@react-native-community/netinfo';
import { useFocusEffect } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadOfficeLocation,
  saveAttendanceCheckIn,
} from '../../../../redux/attendanceSlice';
import { AppDispatch, RootState } from '../../../../redux/store';
import commonStyle, {
  APP_PADDING_HORIZONTAL,
} from '../../../../styles/globalStyles';
import { spacing } from '../../../../styles/spacing';
import { FONT_FAMILY, FONT_SIZE } from '../../../../styles/typography';
import {
  Coordinate,
  formatAttendanceDateTime,
  getDistanceInMeters,
  isInsideOfficeGeofence,
} from '../../../../utility/attendance';
import colors from '../../../../utility/colors';
import Button from '../../../common/buttons/Button';
import AppContainer from '../../../common/container/AppContainer';
import flashMessage from '../../../common/FlashAlert';
import Header from '../../../common/header/Header';
import Image from '../../../common/Image';
import RegularText from '../../../common/RegularText';
import { Images } from '../../../../utility/imagePaths';

const INITIAL_REGION = {
  latitude: 20.5937,
  longitude: 78.9629,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const getOfficeRegionDelta = (radius: number) => {
  const radiusWithPadding = Math.max(radius * 4, 500);
  return radiusWithPadding / 111000;
};

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isSavingAttendance = useSelector(
    (state: RootState) => state.attendance.isSaving,
  );
  const officeLocation = useSelector(
    (state: RootState) => state.attendance.officeLocation,
  );
  const geofenceRadius = useSelector(
    (state: RootState) => state.attendance.geofenceRadius,
  );
  const mapRef = useRef<MapView>(null);
  const watchId = useRef<number | null>(null);
  const locationRefreshTimer = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(
    null,
  );
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [isLocationUnavailable, setIsLocationUnavailable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    'Requesting location access...',
  );

  const distance = useMemo(
    () =>
      currentLocation && officeLocation
        ? getDistanceInMeters(currentLocation, officeLocation)
        : null,
    [currentLocation, officeLocation],
  );
  const isInsideGeofence = isInsideOfficeGeofence(distance, geofenceRadius);
  const geofenceMapKey = officeLocation
    ? `${officeLocation.latitude}-${officeLocation.longitude}-${geofenceRadius}`
    : 'office-not-set';
  const radiusLabelLocation = useMemo(() => {
    if (!officeLocation) {
      return null;
    }

    return {
      latitude: officeLocation.latitude + geofenceRadius / 111000,
      longitude: officeLocation.longitude,
    };
  }, [geofenceRadius, officeLocation]);

  const handleLocationUpdate = useCallback((position: GeolocationResponse) => {
    const nextLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setCurrentLocation(nextLocation);
    setAccuracy(position.coords.accuracy ?? null);
    setIsLocationUnavailable(false);
    setStatusMessage('Live location tracking active.');
  }, []);

  const handleLocationError = useCallback((error: GeolocationError) => {
    setIsLocationUnavailable(true);
    setStatusMessage(
      error.code === 2
        ? 'GPS appears to be disabled. Turn it on and try again.'
        : error.message || 'Unable to fetch current location.',
    );
  }, []);

  const startLocationTracking = useCallback(() => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
    }

    if (locationRefreshTimer.current !== null) {
      clearInterval(locationRefreshTimer.current);
    }

    Geolocation.getCurrentPosition(handleLocationUpdate, handleLocationError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });

    watchId.current = Geolocation.watchPosition(
      handleLocationUpdate,
      handleLocationError,
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        maximumAge: 0,
      },
    );

    locationRefreshTimer.current = setInterval(() => {
      Geolocation.getCurrentPosition(
        handleLocationUpdate,
        handleLocationError,
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        },
      );
    }, 5000);
  }, [handleLocationError, handleLocationUpdate]);

  const requestLocationPermission = useCallback(async () => {
    try {
      let granted = true;

      if (Platform.OS === 'android') {
        const response = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message:
              'Geo Attendance needs your current location to validate office check-ins.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          },
        );
        granted = response === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        granted = await new Promise(resolve => {
          Geolocation.requestAuthorization(
            () => resolve(true),
            () => resolve(false),
          );
        });
      }

      setIsPermissionGranted(granted);

      if (granted) {
        startLocationTracking();
      } else {
        setStatusMessage('Location permission is required for attendance.');
      }
    } catch {
      setStatusMessage('Unable to request location permission.');
    }
  }, [startLocationTracking]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(state.isConnected === false);
    });

    dispatch(loadOfficeLocation());
    requestLocationPermission();

    return () => {
      unsubscribe();
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
      if (locationRefreshTimer.current !== null) {
        clearInterval(locationRefreshTimer.current);
      }
    };
  }, [dispatch, requestLocationPermission]);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadOfficeLocation());
    }, [dispatch]),
  );

  useEffect(() => {
    if (!officeLocation) {
      return;
    }

    const regionDelta = getOfficeRegionDelta(geofenceRadius);
    mapRef.current?.animateToRegion(
      {
        ...officeLocation,
        latitudeDelta: regionDelta,
        longitudeDelta: regionDelta,
      },
      500,
    );
  }, [geofenceRadius, officeLocation]);

  const onPressCheckIn = async () => {
    if (!isPermissionGranted) {
      flashMessage(
        'Location permission needed',
        'warning',
        'Allow location access to check in.',
      );
      Linking.openSettings();
      return;
    }

    if (!currentLocation || isLocationUnavailable) {
      flashMessage('Location unavailable', 'danger', statusMessage);
      return;
    }

    if (!officeLocation) {
      flashMessage(
        'Office location missing',
        'warning',
        'Set your office location from Settings first.',
      );
      return;
    }

    if (!isInsideGeofence) {
      flashMessage(
        'Outside office area',
        'danger',
        `You can check in only within ${geofenceRadius} meters of the office.`,
      );
      return;
    }

    try {
      const { date, time } = formatAttendanceDateTime(new Date());
      await dispatch(
        saveAttendanceCheckIn({
          id: `${Date.now()}`,
          date,
          time,
          status: 'Checked In',
          location: 'Inside Office Area',
          distance: distance ? Math.round(distance) : null,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }),
      ).unwrap();
      flashMessage(
        'Attendance checked in',
        'success',
        isOffline
          ? 'You are offline. Attendance was saved locally.'
          : 'Your attendance has been saved.',
      );
    } catch {
      flashMessage(
        'Unable to save attendance',
        'danger',
        'Please try again. Local storage may be unavailable.',
      );
    }
  };

  const statusTitle = !isPermissionGranted
    ? 'Permission Required'
    : !officeLocation
    ? 'Office Not Set'
    : isLocationUnavailable
    ? 'GPS Unavailable'
    : isInsideGeofence
    ? 'Inside Office Area'
    : 'Outside Office Area';

  const statusSubtitle = !isPermissionGranted
    ? 'Allow location access to continue'
    : !officeLocation
    ? 'Open Settings and save current GPS as office'
    : isLocationUnavailable
    ? statusMessage
    : isInsideGeofence
    ? 'You are within the geofence'
    : `Move within ${geofenceRadius} meters of the office to check in`;

  const bannerColor = isInsideGeofence ? colors.GREEN_50 : colors.RED_50;
  const bannerBorderColor = isInsideGeofence
    ? colors.GREEN_100
    : colors.RED_100;
  const bannerTextColor = isInsideGeofence ? colors.GREEN_700 : colors.RED_700;

  return (
    <AppContainer statusBarColor={colors.APP_BACKGROUND_WHITE}>
      <Header
        title="Geo Attendance"
        hideBack
        titleStyle={styles.headerTitleStyle}
      />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        initialRegion={INITIAL_REGION}
      >
        {officeLocation ? (
          <>
            <Marker
              key={`office-marker-${geofenceMapKey}`}
              coordinate={officeLocation}
              anchor={{ x: 0.5, y: 1 }}
            >
              <View style={styles.officeMarker}>
                <RegularText style={styles.officeMarkerLabel}>
                  Office
                </RegularText>
                <View style={styles.officeMarkerPin} />
              </View>
            </Marker>
            <Circle
              key={`office-circle-${geofenceMapKey}`}
              center={officeLocation}
              radius={geofenceRadius}
              strokeWidth={2}
              strokeColor={colors.THEME}
              fillColor="rgba(19, 103, 241, 0.12)"
            />
            {radiusLabelLocation ? (
              <Marker
                key={`radius-label-${geofenceMapKey}`}
                coordinate={radiusLabelLocation}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={styles.radiusLabel}>
                  <RegularText style={styles.radiusLabelText}>
                    {geofenceRadius} m
                  </RegularText>
                </View>
              </Marker>
            ) : null}
          </>
        ) : null}
        {currentLocation ? (
          <Marker
            coordinate={currentLocation}
            title="Current Location"
            pinColor={colors.GREEN_600}
          />
        ) : null}
      </MapView>
      <View style={styles.bottomContainer}>
        <View
          style={[
            styles.statusBanner,
            { backgroundColor: bannerColor, borderColor: bannerBorderColor },
          ]}
        >
          <Image
            source={isInsideGeofence ? Images.IMG_CHECK : Images.IMG_FAILED}
          />
          <View style={styles.statusTextContainer}>
            <RegularText
              style={[styles.statusTitle, { color: bannerTextColor }]}
            >
              {statusTitle}
            </RegularText>
            <RegularText style={styles.statusSubtitle}>
              {statusSubtitle}
            </RegularText>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Image
              source={Images.IMG_DISTANCE}
              viewStyle={styles.iconPlaceholder}
            />
            <View>
              <RegularText style={styles.metricLabel}>Distance</RegularText>
              <RegularText style={styles.metricValue}>
                {distance === null ? '--' : `${Math.round(distance)} m`}
              </RegularText>
            </View>
          </View>

          <View style={styles.metricCard}>
            <Image
              source={Images.IMG_ACCURACY}
              viewStyle={styles.iconPlaceholder}
            />
            <View>
              <RegularText style={styles.metricLabel}>Accuracy</RegularText>
              <RegularText style={styles.metricValue}>
                {accuracy === null ? '--' : `${Math.round(accuracy)} m`}
              </RegularText>
            </View>
          </View>
        </View>

        {isOffline ? (
          <RegularText style={styles.offlineText}>
            Offline mode: attendance is saved locally.
          </RegularText>
        ) : null}

        <Button
          title={!isPermissionGranted ? 'Enable Location' : 'Check In'}
          onPressButton={onPressCheckIn}
          disabled={
            isSavingAttendance ||
            (!!officeLocation && !!currentLocation && !isInsideGeofence)
          }
          fetching={isSavingAttendance}
        />

        <View style={styles.footerInfo}>
          <RegularText style={styles.footerText}>
            Office radius: {geofenceRadius} meters
          </RegularText>
        </View>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: colors.THEME,
  },
  map: {
    flex: 1,
  },
  officeMarker: {
    alignItems: 'center',
  },
  officeMarkerLabel: {
    backgroundColor: colors.WHITE,
    borderColor: colors.RED_600,
    borderRadius: spacing.RADIUS_8,
    borderWidth: spacing.WIDTH_1,
    color: colors.RED_600,
    fontFamily: FONT_FAMILY.PRIMARY_BOLD,
    fontSize: FONT_SIZE.NORMAL,
    marginBottom: spacing.MARGIN_4,
    paddingHorizontal: spacing.PADDING_8,
    paddingVertical: spacing.PADDING_4,
  },
  officeMarkerPin: {
    backgroundColor: colors.RED_600,
    borderColor: colors.WHITE,
    borderRadius: spacing.RADIUS_12,
    borderWidth: spacing.WIDTH_2,
    height: spacing.WIDTH_16,
    transform: [{ rotate: '45deg' }],
    width: spacing.WIDTH_16,
  },
  radiusLabel: {
    backgroundColor: colors.WHITE,
    borderColor: colors.THEME,
    borderRadius: spacing.RADIUS_8,
    borderWidth: spacing.WIDTH_1,
    paddingHorizontal: spacing.PADDING_8,
    paddingVertical: spacing.PADDING_4,
  },
  radiusLabelText: {
    color: colors.THEME,
    fontFamily: FONT_FAMILY.PRIMARY_BOLD,
    fontSize: FONT_SIZE.NORMAL,
  },
  bottomContainer: {
    borderTopLeftRadius: spacing.RADIUS_16,
    borderTopRightRadius: spacing.RADIUS_16,
    backgroundColor: colors.WHITE,
    flex: 1,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.MARGIN_12,
  },
  statusBanner: {
    ...commonStyle.flexDirectionRow,
    borderRadius: spacing.RADIUS_12,
    padding: spacing.PADDING_16,
    borderWidth: spacing.RADIUS_1,
    marginBottom: spacing.MARGIN_16,
    gap: spacing.MARGIN_12,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  statusSubtitle: {
    fontSize: FONT_SIZE.NORMAL,
    color: colors.GREY_600,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    marginTop: spacing.MARGIN_2,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.MARGIN_16,
  },
  metricCard: {
    ...commonStyle.flexDirectionRow,
    backgroundColor: colors.WHITE,
    borderRadius: spacing.RADIUS_12,
    padding: spacing.PADDING_16,
    width: '48%',
    borderWidth: spacing.RADIUS_1,
    borderColor: colors.GREY_200,
    gap: spacing.MARGIN_10,
  },
  iconPlaceholder: {
    width: spacing.WIDTH_34,
    height: spacing.WIDTH_34,
    borderRadius: spacing.RADIUS_30,
    backgroundColor: colors.BLUE_50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: FONT_SIZE.NORMAL,
    color: colors.GREY_600,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  metricValue: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    color: colors.BLACK,
    fontFamily: FONT_FAMILY.PRIMARY_BOLD,
  },
  offlineText: {
    color: colors.ORANGE_700,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    fontSize: FONT_SIZE.NORMAL,
    marginBottom: spacing.MARGIN_10,
    textAlign: 'center',
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: spacing.MARGIN_16,
  },
  footerText: {
    fontSize: FONT_SIZE.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    color: colors.GREY_600,
  },
});

export default Home;
