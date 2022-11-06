import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/BoardSlice';
import authReducer from './reducers/AuthSlice';
import userReducer from './reducers/UserSlice';
import { authAPI } from './services/authAPI';
import { boardAPI } from './services/boardAPI';
import { userAPI } from './services/userAPI';

const setupStore = () =>
  configureStore({
    reducer: {
      [authAPI.reducerPath]: authAPI.reducer,
      [boardAPI.reducerPath]: boardAPI.reducer,
      [userAPI.reducerPath]: userAPI.reducer,
      auth: authReducer,
      board: boardReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      authAPI.middleware,
      boardAPI.middleware,
      userAPI.middleware,
    ],
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
