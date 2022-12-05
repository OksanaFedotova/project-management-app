import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  boards: [],
  isLoading: false,
  error: '',
  currentBoardId: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentBoardId: (state, action: PayloadAction<string>) => {
      state.currentBoardId = action.payload;
    },
  },
});

export const { setCurrentBoardId } = boardSlice.actions;
export default boardSlice.reducer;
