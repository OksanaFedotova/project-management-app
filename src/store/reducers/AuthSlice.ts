import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TAuthState, IUser, ISigninResponse } from 'interfaces/IUser';

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setUpdatedUser(state, action: PayloadAction<Omit<IUser, 'id'>>) {
      if (state.user) {
        state.user.login = action.payload.login;
        state.user.name = action.payload.name;
      }
    },
    setToken: (state, action: PayloadAction<ISigninResponse>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setUpdatedUser, setToken } = authSlice.actions;
export default authSlice.reducer;
