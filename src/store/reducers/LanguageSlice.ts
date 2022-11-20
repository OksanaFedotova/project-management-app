import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LOCALES } from 'i18n/locales';

const initialState = {
  currentLocale: localStorage.getItem('Language')! || LOCALES.RUSSIAN,
};

const languageSlice = createSlice({
  name: 'translate',
  initialState,
  reducers: {
    setCurrentLocale: (state, action: PayloadAction<string>) => {
      state.currentLocale = action.payload;
    },
  },
});

export const { setCurrentLocale } = languageSlice.actions;
export default languageSlice.reducer;
