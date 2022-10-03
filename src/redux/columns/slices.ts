import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cardsDuckSlice } from "../cards";
import { ColumnType } from "types/columns";
import { v4 as uuid } from "uuid";

export interface ColumnsState {
  columns: ColumnType[];
}

const initialState: ColumnsState = {
  columns: [
    {
      id: uuid(),
      heading: "TODO",
      cards: [],
    },
    {
      id: uuid(),
      heading: "In Progress",
      cards: [],
    },
    {
      id: uuid(),
      heading: "Testing",
      cards: [],
    },
    {
      id: uuid(),
      heading: "Done",
      cards: [],
    },
  ],
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addCard: (
      state,
      action: PayloadAction<{ columnId: string; title: string }>
    ) => {
      const id = uuid();

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
  },
  extraReducers: (builder) => {
    builder.addCase(
      cardsDuckSlice.actions.addCard,
      (
        state,
        action: PayloadAction<{ columnId: string; title: string; id: string }>
      ) => {
        state.columns.map((column) => {
          if (column.id === action.payload.columnId) {
            return column.cards.push(action.payload.id);
          } else {
            return column;
          }
        });
      }
    );
  },
});
