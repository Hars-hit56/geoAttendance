import { retrieveItem, storeItem } from './customAsyncStorage';

export const DEFAULT_GEOFENCE_RADIUS_METERS = 100;
export const ATTENDANCE_STORAGE_KEY = 'attendance_records';
export const OFFICE_LOCATION_STORAGE_KEY = 'office_location';
export const GEOFENCE_RADIUS_STORAGE_KEY = 'geofence_radius';

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type AttendanceRecord = {
  id: string;
  date: string;
  time: string;
  status: 'Checked In' | 'Failed';
  location: 'Inside Office Area' | 'Outside Office Area';
  distance: number | null;
  latitude: number | null;
  longitude: number | null;
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

export const getAttendanceRecords = async (): Promise<AttendanceRecord[]> => {
  const records = await retrieveItem<AttendanceRecord[]>(
    ATTENDANCE_STORAGE_KEY,
  );
  return records || [];
};

export const saveAttendanceRecord = async (record: AttendanceRecord) => {
  const records = await getAttendanceRecords();
  const updatedRecords = [record, ...records];
  await storeItem(ATTENDANCE_STORAGE_KEY, updatedRecords);
  return updatedRecords;
};

export const getOfficeLocation = async (): Promise<Coordinate | null> => {
  return retrieveItem<Coordinate>(OFFICE_LOCATION_STORAGE_KEY);
};

export const saveOfficeLocation = async (location: Coordinate) => {
  await storeItem(OFFICE_LOCATION_STORAGE_KEY, location);
  return location;
};

export const getGeofenceRadius = async () => {
  const radius = await retrieveItem<number>(GEOFENCE_RADIUS_STORAGE_KEY);
  return radius || DEFAULT_GEOFENCE_RADIUS_METERS;
};

export const saveGeofenceRadius = async (radius: number) => {
  await storeItem(GEOFENCE_RADIUS_STORAGE_KEY, radius);
  return radius;
};

export const getGeofenceSettings = async () => {
  const [officeLocation, geofenceRadius] = await Promise.all([
    getOfficeLocation(),
    getGeofenceRadius(),
  ]);

  return {
    officeLocation,
    geofenceRadius,
  };
};

export const saveGeofenceSettings = async (
  officeLocation: Coordinate,
  geofenceRadius: number,
) => {
  await Promise.all([
    saveOfficeLocation(officeLocation),
    saveGeofenceRadius(geofenceRadius),
  ]);

  return {
    officeLocation,
    geofenceRadius,
  };
};
