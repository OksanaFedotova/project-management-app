import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/BoardSlice';
import authReducer from './reducers/AuthSlice';
import userReducer from './reducers/UserSlice';
import columnReducer from './reducers/ColumnSlice';
import taskReducer from './reducers/TaskSlice';
import languageReducer from './reducers/LanguageSlice';
import { authAPI } from './services/authAPI';
import { boardAPI } from './services/boardAPI';
import { userAPI } from './services/userAPI';
import { columnAPI } from './services/columnsAPI';
import { taskAPI } from './services/taskAPI';

const setupStore = () =>
  configureStore({
    reducer: {
      [authAPI.reducerPath]: authAPI.reducer,
      [boardAPI.reducerPath]: boardAPI.reducer,
      [userAPI.reducerPath]: userAPI.reducer,
      [columnAPI.reducerPath]: columnAPI.reducer,
      [taskAPI.reducerPath]: taskAPI.reducer,
      auth: authReducer,
      board: boardReducer,
      user: userReducer,
      column: columnReducer,
      task: taskReducer,
      translate: languageReducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      authAPI.middleware,
      boardAPI.middleware,
      userAPI.middleware,
      columnAPI.middleware,
      taskAPI.middleware,
    ],
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
