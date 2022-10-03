import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  name: string;
};

const initialState: User = {
  name: '',
};

export const usernameSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
    },
  },
});

export const { setUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
