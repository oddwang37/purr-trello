import React, { FC } from 'react';
import styled from 'styled-components';

import { ColumnType, ColumnsType, CardsType } from 'types/columns';
import Column from './Column/Column';

const Columns: FC<ColumnsProps> = ({ columns, cards, cardsActions }) => {
  const { getColumnCards } = cardsActions;

  return (
    <Root>
      {columns.map((item: ColumnType) => {
        return (
          <Column
            id={item.id}
            heading={item.heading}
            cardsIds={item.cards}
            cards={getColumnCards(item.id)}
            key={item.id}
            cardsActions={cardsActions}
          />
        );
      })}
    </Root>
  );
};

export default Columns;

type ColumnsProps = {
  columns: ColumnsType;
  cards: CardsType;
  cardsActions: {
    addCard: (columnId: number, title: string) => void;
    deleteCard: (columnId: number, cardId: number) => void;
    editCardTitle: (cardId: number, newTitle: string) => void;
    changePopupCardId: (cardId: number) => void;
    getColumnCards: (columnId: number) => CardsType;
    editColumnHeading: (columnId: number, newHeading: string) => void;
  };
};

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;
