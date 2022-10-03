import formatDate from 'utils/formatDate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { CardsType } from 'types/columns';

interface CardsState {
  cards: CardsType;
}

const initialState: CardsState = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ columnId: string; title: string; id: string }>) => {
      state.cards.push({
        id: action.payload.id,
        title: action.payload.title,
        description: '',
        comments: [],
      });
    },
    editCardTitle: (state, action: PayloadAction<{ cardId: string; newTitle: string }>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, title: action.payload.newTitle };
        } else return card;
      });
    },
    editDescription: (state, action: PayloadAction<{ cardId: string; newDescription: string }>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, description: action.payload.newDescription };
        } else return card;
      });
    },
    deleteDescription: (state, action: PayloadAction<{ cardId: string }>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, description: '' };
        } else return card;
      });
    },
    addComment: (state, action: PayloadAction<{ cardId: string; text: string }>) => {
      const date = formatDate(new Date());
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          return {
            ...card,
            comments: [...card.comments, { id: uuid(), date, text: action.payload.text }],
          };
        } else return card;
      });
    },
    editComment: (
      state,
      action: PayloadAction<{ cardId: string; commentId: string; newText: string }>,
    ) => {
      const { cardId, commentId, newText } = action.payload;
      state.cards = state.cards.map((card) => {
        if (card.id === cardId) {
          const oldComments = card.comments;
          const newComments = oldComments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, text: newText };
            } else return comment;
          });
          return { ...card, comments: newComments };
        } else {
          return card;
        }
      });
    },
    deleteComment: (state, action: PayloadAction<{ cardId: string; commentId: string }>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          const newComments = card.comments.filter(
            (comment) => comment.id !== action.payload.commentId,
          );
          return { ...card, comments: newComments };
        } else return card;
      });
    },
    deleteCard: (state, action: PayloadAction<{ cardId: string; columnId: string }>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload.cardId);
    },
  },
});

export const {
  addCard,
  editCardTitle,
  deleteCard,
  editDescription,
  deleteDescription,
  addComment,
  editComment,
  deleteComment,
} = cardsSlice.actions;

export default cardsSlice.reducer;
