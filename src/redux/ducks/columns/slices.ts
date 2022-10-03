import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cardsSlice } from '../cards';
import { ColumnType } from 'types/columns';
import { v4 as uuid } from 'uuid';

export interface ColumnsState {
  columns: ColumnType[];
}

const initialState: ColumnsState = {
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
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      cardsSlice.actions.addCard,
      (state, action: PayloadAction<{ columnId: string; title: string; id: string }>) => {
        state.columns.map((column) => {
          if (column.id === action.payload.columnId) {
            return column.cards.push(action.payload.id);
          } else {
            return column;
          }
        });
      },
    );
    builder.addCase(
      cardsSlice.actions.deleteCard,
      (state, action: PayloadAction<{ cardId: string; columnId: string }>) => {
        if (action.payload.columnId) {
          const newColumns = state.columns.map((column) => {
            if (column.id === action.payload.columnId) {
              return {
                ...column,
                cards: column.cards.filter((card) => card !== action.payload.cardId),
              };
            } else {
              return column;
            }
          });
          state.columns = newColumns;
        }
      },
    );
  },
});

export const { editColumnHeading } = columnsSlice.actions;

export default columnsSlice.reducer;
