import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { CardsType } from "types/columns";

export const selectAllColumns = (state: RootState) => state.columns.columns;
export const selectAllCards = (state: RootState) => state.cardsDuck.cards;

export const selectCardsForColumn = createSelector(
  [selectAllCards, selectAllColumns, (state: RootState, columnId) => columnId],
  (allCards, allColumns, columnId) => {
    const column = allColumns.find((column) => column.id === columnId);
    if (column) {
      const cardsIds = column.cards;
      const columnCards: CardsType = [];
      allCards.forEach((card) => {
        if (cardsIds.includes(card.id)) {
          columnCards.push(card);
        }
      });
      return columnCards;
    } else return [];
  }
);
