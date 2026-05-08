import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadOfficeLocation,
  saveOfficeGeofenceSettings,
} from '../../../../redux/attendanceSlice';
import { AppDispatch, RootState } from '../../../../redux/store';
import { spacing } from '../../../../styles/spacing';
import { FONT_FAMILY, FONT_SIZE } from '../../../../styles/typography';
import colors from '../../../../utility/colors';
import Button from '../../../common/buttons/Button';
import AppContainer from '../../../common/container/AppContainer';
import flashMessage from '../../../common/FlashAlert';
import Header from '../../../common/header/Header';
import TextInput from '../../../common/inputBoxes/TextInput';
import RegularText from '../../../common/RegularText';
import { requestLocationPermission } from '../../../../utility/commonFunction';

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const officeLocation = useSelector(
    (state: RootState) => state.attendance.officeLocation,
  );
  const geofenceRadius = useSelector(
    (state: RootState) => state.attendance.geofenceRadius,
  );
  const isSavingOffice = useSelector(
    (state: RootState) => state.attendance.isSavingOffice,
  );

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState(`${geofenceRadius}`);
  const [isOffline, setIsOffline] = useState(false);
  const [locationMessage, setLocationMessage] = useState(
    'Enter office coordinates and geofence radius, or fill coordinates from current GPS.',
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(state.isConnected === false);
    });

    dispatch(loadOfficeLocation());

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (officeLocation) {
      setLatitude(`${officeLocation.latitude}`);
      setLongitude(`${officeLocation.longitude}`);
    }
    setRadius(`${geofenceRadius}`);
  }, [geofenceRadius, officeLocation]);

  const getCurrentPosition = () =>
    new Promise<GeolocationResponse>((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
    });

  const getValidatedSettings = () => {
    const nextLatitude = Number(latitude);
    const nextLongitude = Number(longitude);
    const nextRadius = Number(radius);

    if (Number.isNaN(nextLatitude) || nextLatitude < -90 || nextLatitude > 90) {
      flashMessage(
        'Invalid latitude',
        'warning',
        'Use a value from -90 to 90.',
      );
      return null;
    }

    if (
      Number.isNaN(nextLongitude) ||
      nextLongitude < -180 ||
      nextLongitude > 180
    ) {
      flashMessage(
        'Invalid longitude',
        'warning',
        'Use a value from -180 to 180.',
      );
      return null;
    }

    if (Number.isNaN(nextRadius) || nextRadius <= 0) {
      flashMessage('Invalid radius', 'warning', 'Radius must be more than 0.');
      return null;
    }

    return {
      officeLocation: {
        latitude: nextLatitude,
        longitude: nextLongitude,
      },
      geofenceRadius: Math.round(nextRadius),
    };
  };

  const onPressUseCurrentGps = async () => {
    try {
      setLocationMessage('Fetching current GPS location...');
      const isGranted = await requestLocationPermission(
        'Geo Attendance needs your current location to set the office geofence.',
      );

      if (!isGranted) {
        setLocationMessage('Location permission is required.');
        flashMessage(
          'Location permission needed',
          'warning',
          'Allow location access to use current GPS.',
        );
        Linking.openSettings();
        return;
      }

      const position = await getCurrentPosition();
      setLatitude(`${position.coords.latitude}`);
      setLongitude(`${position.coords.longitude}`);
      setLocationMessage('Current GPS filled. Press Save to apply it.');
    } catch (error) {
      const locationError = error as GeolocationError;
      const message =
        locationError.code === 2
          ? 'GPS appears to be disabled. Turn it on and try again.'
          : locationError.message || 'Unable to fetch current location.';

      setLocationMessage(message);
      flashMessage('Unable to fetch current GPS', 'danger', message);
    }
  };

  const onPressSaveGeofence = async () => {
    const settings = getValidatedSettings();
    if (!settings) {
      return;
    }

    try {
      await dispatch(saveOfficeGeofenceSettings(settings)).unwrap();
      setRadius(`${settings.geofenceRadius}`);
      setLocationMessage('Office geofence saved successfully.');
      flashMessage(
        'Office location saved',
        'success',
        isOffline
          ? 'You are offline. Office geofence was saved locally.'
          : 'Office geofence settings have been saved.',
      );
    } catch {
      flashMessage(
        'Unable to save office location',
        'danger',
        'Please try again. Local storage may be unavailable.',
      );
    }
  };

  return (
    <AppContainer statusBarColor={colors.APP_BACKGROUND_WHITE}>
      <Header title="Settings" hideBack />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <RegularText style={styles.title}>Office Geofence</RegularText>
          <RegularText style={styles.description}>
            {locationMessage}
          </RegularText>

          <TextInput
            label="Latitude"
            value={latitude}
            onChangeText={setLatitude}
            placeHolder="Example: 28.6139"
            keyboardType="decimal-pad"
            mainViewStyle={styles.input}
          />
          <TextInput
            label="Longitude"
            value={longitude}
            onChangeText={setLongitude}
            placeHolder="Example: 77.209"
            keyboardType="decimal-pad"
          />
          <TextInput
            label="Geofence Radius (meters)"
            value={radius}
            onChangeText={setRadius}
            placeHolder="Example: 100"
            keyboardType="number-pad"
          />

          {isOffline ? (
            <RegularText style={styles.offlineText}>
              Offline mode: office geofence changes are saved locally.
            </RegularText>
          ) : null}

          <Button
            title="Use Current GPS"
            onPressButton={onPressUseCurrentGps}
            isSecondary
            buttonStyle={styles.button}
          />
          <Button
            title="Save Geofence Settings"
            onPressButton={onPressSaveGeofence}
            fetching={isSavingOffice}
            disabled={isSavingOffice}
            buttonStyle={styles.button}
          />
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.PADDING_16,
  },
  section: {
    backgroundColor: colors.WHITE,
    borderColor: colors.GREY_200,
    borderRadius: spacing.RADIUS_12,
    borderWidth: spacing.WIDTH_1,
    padding: spacing.PADDING_16,
  },
  title: {
    color: colors.BLACK,
    fontFamily: FONT_FAMILY.PRIMARY_BOLD,
    fontSize: FONT_SIZE.MEDIUM,
  },
  description: {
    color: colors.GREY_600,
    fontFamily: FONT_FAMILY.PRIMARY_REGULAR,
    fontSize: FONT_SIZE.NORMAL,
    marginTop: spacing.MARGIN_6,
  },
  input: {
    marginTop: spacing.MARGIN_16,
  },
  button: {
    marginTop: spacing.MARGIN_16,
  },
  offlineText: {
    color: colors.ORANGE_700,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    fontSize: FONT_SIZE.NORMAL,
    marginTop: spacing.MARGIN_12,
    textAlign: 'center',
  },
});

export default Settings;
