import { combineReducers, configureStore } from '@reduxjs/toolkit';
import attendanceReducer from './attendanceSlice';

const rootReducer = combineReducers({
  attendance: attendanceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
