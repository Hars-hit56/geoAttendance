import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

const combinedReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
