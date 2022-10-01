import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Username = string;

const initialState: Username = '';

export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
