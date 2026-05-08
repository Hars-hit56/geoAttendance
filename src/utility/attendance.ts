import {
  ATTENDANCE_STORAGE_KEY,
  GEOFENCE_RADIUS_STORAGE_KEY,
  OFFICE_LOCATION_STORAGE_KEY,
} from './constants';
import { retrieveItem, storeItem } from './customAsyncStorage';

export const DEFAULT_GEOFENCE_RADIUS_METERS = 100;

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
