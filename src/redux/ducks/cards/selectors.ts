import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { CardsType, CardType, ColumnType } from 'types/columns';

export const selectAllColumns = (state: RootState) => state.columns.columns;
export const selectAllCards = (state: RootState) => state.cards.cards;

export const selectCardById = createSelector(
  [selectAllCards, (state: RootState, id) => id],
  (allCards, id) => {
    const card = allCards.find((card: CardType) => card.id === id);
    if (card) {
      return card;
    } else return null;
  },
);

export const selectCardsForColumn = createSelector(
  [selectAllCards, selectAllColumns, (state: RootState, columnId) => columnId],
  (allCards, allColumns, columnId) => {
    const column = allColumns.find((column: ColumnType) => column.id === columnId);
    if (column) {
      const cardsIds = column.cards;
      const columnCards: CardsType = [];
      allCards.forEach((card: CardType) => {
        if (cardsIds.includes(card.id)) {
          columnCards.push(card);
        }
      });
      return columnCards;
    } else return [];
  },
);
