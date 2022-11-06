import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/BoardSlice';
import authReducer from './reducers/AuthSlice';
import { authAPI } from './services/authAPI';
import { boardAPI } from './services/boardAPI';

const setupStore = () =>
  configureStore({
    reducer: {
      [authAPI.reducerPath]: authAPI.reducer,
      [boardAPI.reducerPath]: boardAPI.reducer,
      auth: authReducer,
      board: boardReducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      authAPI.middleware,
      boardAPI.middleware,
    ],
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
