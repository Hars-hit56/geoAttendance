import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AttendanceRecord,
  Coordinate,
  DEFAULT_GEOFENCE_RADIUS_METERS,
  getGeofenceSettings,
  getAttendanceRecords,
  saveAttendanceRecord,
  saveGeofenceSettings,
} from '../utility/attendance';

type GeofenceSettings = {
  officeLocation: Coordinate;
  geofenceRadius: number;
};

type AttendanceState = {
  records: AttendanceRecord[];
  officeLocation: Coordinate | null;
  geofenceRadius: number;
  isLoading: boolean;
  isSaving: boolean;
  isSavingOffice: boolean;
  error: string | null;
};

const initialState: AttendanceState = {
  records: [],
  officeLocation: null,
  geofenceRadius: DEFAULT_GEOFENCE_RADIUS_METERS,
  isLoading: false,
  isSaving: false,
  isSavingOffice: false,
  error: null,
};

export const loadAttendanceHistory = createAsyncThunk(
  'attendance/loadHistory',
  async () => getAttendanceRecords(),
);

export const saveAttendanceCheckIn = createAsyncThunk(
  'attendance/saveCheckIn',
  async (record: AttendanceRecord) => saveAttendanceRecord(record),
);

export const loadOfficeLocation = createAsyncThunk(
  'attendance/loadGeofenceSettings',
  async () => getGeofenceSettings(),
);

export const saveOfficeGeofenceSettings = createAsyncThunk(
  'attendance/saveGeofenceSettings',
  async ({ officeLocation, geofenceRadius }: GeofenceSettings) =>
    saveGeofenceSettings(officeLocation, geofenceRadius),
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceRecords: (
      state,
      action: PayloadAction<AttendanceRecord[]>,
    ) => {
      state.records = action.payload;
    },
    setOfficeLocation: (state, action: PayloadAction<Coordinate | null>) => {
      state.officeLocation = action.payload;
    },
    setGeofenceRadius: (state, action: PayloadAction<number>) => {
      state.geofenceRadius = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAttendanceHistory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAttendanceHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = action.payload;
      })
      .addCase(loadAttendanceHistory.rejected, state => {
        state.isLoading = false;
        state.error = 'Unable to load attendance history';
      })
      .addCase(saveAttendanceCheckIn.pending, state => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(saveAttendanceCheckIn.fulfilled, (state, action) => {
        state.isSaving = false;
        state.records = action.payload;
      })
      .addCase(saveAttendanceCheckIn.rejected, state => {
        state.isSaving = false;
        state.error = 'Unable to save attendance';
      })
      .addCase(loadOfficeLocation.fulfilled, (state, action) => {
        state.officeLocation = action.payload.officeLocation;
        state.geofenceRadius = action.payload.geofenceRadius;
      })
      .addCase(saveOfficeGeofenceSettings.pending, state => {
        state.isSavingOffice = true;
        state.error = null;
      })
      .addCase(saveOfficeGeofenceSettings.fulfilled, (state, action) => {
        state.isSavingOffice = false;
        state.officeLocation = action.payload.officeLocation;
        state.geofenceRadius = action.payload.geofenceRadius;
      })
      .addCase(saveOfficeGeofenceSettings.rejected, state => {
        state.isSavingOffice = false;
        state.error = 'Unable to save office location';
      });
  },
});

export const { setAttendanceRecords, setGeofenceRadius, setOfficeLocation } =
  attendanceSlice.actions;
export default attendanceSlice.reducer;
