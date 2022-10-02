import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsType, ColumnsType } from 'types/columns';
import { v4 as uuid } from 'uuid';
import formatDate from 'utils/formatDate';

type PopupCard = {
  cards: CardsType;
  columns: ColumnsType;
  popupCardId: string;
};

const initialState: PopupCard = {
  cards: [],
  columns: [
    {
      id: uuid(),
      heading: 'TODO',
      cards: [],
    },
    {
      id: uuid(),
      heading: 'In Progress',
      cards: [],
    },
    {
      id: uuid(),
      heading: 'Testing',
      cards: [],
    },
    {
      id: uuid(),
      heading: 'Done',
      cards: [],
    },
  ],
  popupCardId: '',
};

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ columnId: string; title: string }>) => {
      const id = uuid();
      state.cards.push({ id, title: action.payload.title, description: '', comments: [] });
      state.columns = state.columns.map((column) => {
        if (column.id === action.payload.columnId) {
          const newColumn = column;
          newColumn.cards.push(id);
          return newColumn;
        } else {
          return column;
        }
      });
    },
    editCardTitle: (state, action: PayloadAction<{ cardId: string; newTitle: string }>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, title: action.payload.newTitle };
        } else return card;
      });
    },
    editDescription: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === state.popupCardId) {
          return { ...card, description: action.payload };
        } else return card;
      });
    },
    deleteDescription: (state) => {
      state.cards = state.cards.map((card) => {
        if (card.id === state.popupCardId) {
          return { ...card, description: '' };
        } else return card;
      });
    },
    addComment: (state, action: PayloadAction<string>) => {
      const date = formatDate(new Date());
      state.cards = state.cards.map((card) => {
        if (card.id === state.popupCardId) {
          return {
            ...card,
            comments: [...card.comments, { id: uuid(), date, text: action.payload }],
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
    editColumnHeading: (state, action: PayloadAction<{ columnId: string; newHeading: string }>) => {
      state.columns = state.columns.map((column) => {
        if (column.id === action.payload.columnId) {
          const newColumn = column;
          newColumn.heading = action.payload.newHeading;
          return newColumn;
        } else {
          return column;
        }
      });
    },
    deleteCard: (state) => {
      const { cards, columns, popupCardId } = state;
      if (state.popupCardId) {
        const columnId = columns.find((column) => column.cards.includes(popupCardId))?.id;
        if (columnId) {
          const newColumns = columns.map((column) => {
            if (column.id === columnId) {
              return { ...column, cards: column.cards.filter((card) => card !== popupCardId) };
            } else {
              return column;
            }
          });
          state.columns = newColumns;
          const newCards = cards.filter((card) => card.id !== popupCardId);
          state.cards = newCards;
          state.popupCardId = '';
        }
      }
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
    setPopupCardId: (state, action: PayloadAction<string>) => {
      state.popupCardId = action.payload;
    },
  },
});

export const {
  addCard,
  editCardTitle,
  editDescription,
  deleteDescription,
  addComment,
  editComment,
  editColumnHeading,
  deleteCard,
  deleteComment,
  setPopupCardId,
} = cardsSlice.actions;

export default cardsSlice.reducer;
