import { cardsSlice } from '../cards';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PopupCard = {
  id: string;
};

const initialState: PopupCard = {
  id: '',
};

export const popupCardSlice = createSlice({
  name: 'popupCard',
  initialState,
  reducers: {
    setPopupCardId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      cardsSlice.actions.deleteCard,
      (state, action: PayloadAction<{ cardId: string; columnId: string }>) => {
        state.id = '';
      },
    );
  },
});

export const { setPopupCardId } = popupCardSlice.actions;

export default popupCardSlice.reducer;
