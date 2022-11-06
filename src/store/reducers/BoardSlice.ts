import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boards: [],
  isLoading: false,
  error: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

export const {} = boardSlice.actions;
export default boardSlice.reducer;
