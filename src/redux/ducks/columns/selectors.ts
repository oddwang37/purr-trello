import { RootState } from 'redux/store';
import { ColumnType } from 'types/columns';

export const selectColumns = (state: RootState) => state.columns.columns;

export const selectColumnOfCard = (state: RootState, cardId: string) =>
  state.columns.columns.find((column: ColumnType) => column.cards.includes(cardId));
