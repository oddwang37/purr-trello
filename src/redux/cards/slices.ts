import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "types/columns";

interface CardsState {
  cards: CardType[];
}

const initialState: CardsState = {
  cards: [],
};

export const cardsDuckSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (
      state,
      action: PayloadAction<{ columnId: string; title: string; id: string }>
    ) => {
      state.cards.push({
        id: action.payload.id,
        title: action.payload.title,
        description: "",
        comments: [],
      });
    },
  },
});

export const { addCard } = cardsDuckSlice.actions;
