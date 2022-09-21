import React, { FC } from 'react';
import styled from 'styled-components';

import { CardType, ColumnType, ColumnsType } from 'types/columns';
import Column from './Column/Column';

const Columns: FC<ColumnsProps> = ({ columnsInfo, cardsActions }) => {
  return (
    <Root>
      {columnsInfo.map((item: ColumnType) => {
        return (
          <Column
            id={item.id}
            title={item.title}
            cards={item.cards}
            key={item.id}
            cardsActions={cardsActions}
            changePopupCardInfo={cardsActions.changePopupCardInfo}
          />
        );
      })}
    </Root>
  );
};

export default Columns;

type ColumnsProps = {
  columnsInfo: ColumnsType;
  cardsActions: {
    addCard: (columnId: number, title: string) => void;
    deleteCard: (columnId: number, cardId: number) => void;
    editCard: (columnId: number, cardId: number, newTitle: string) => void;
    changePopupCardInfo: (info: CardType) => void;
  };
};

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;
