import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/BoardSlice';
import userReducer from './reducers/UserSlice';
import authReducer from './reducers/AuthSlice';
import { authAPI } from './services/authAPI';

const setupStore = () =>
  configureStore({
    reducer: {
      [authAPI.reducerPath]: authAPI.reducer,
      auth: authReducer,
      user: userReducer,
      board: boardReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
