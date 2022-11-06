import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { AuthState, User } from 'interfaces/IUser';

const initialState: AuthState = {
  user: null,
  token: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = slice.actions;
export default slice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
