import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { TAuthState, IUser, ISigninResponse } from 'interfaces/IUser';

const initialState: TAuthState = {
  user: null,
  token: null,
  isSignInPage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<ISigninResponse>) => {
      state.token = action.payload;
    },
    toggleIsSignInPage: (state, action: PayloadAction<boolean>) => {
      state.isSignInPage = action.payload;
    },
  },
});

export const { setUser, setToken, toggleIsSignInPage } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
