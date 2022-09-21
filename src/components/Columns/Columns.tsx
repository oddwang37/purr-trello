import React, { FC } from 'react';
import styled from 'styled-components';

import { ColumnsType } from 'types/columns';
import Column from './Column/Column';

const Columns: FC<ColumnsProps> = ({ columnsInfo, cardsActions }) => {
  const addCardToColumn = (id: number) => {
    return function (title: string) {
      cardsActions.addCard(id, title);
    };
  };

  return (
    <Root>
      {columnsInfo.map((item) => {
        return (
          <Column
            id={item.id}
            title={item.title}
            cards={item.cards}
            key={item.id}
            addCard={addCardToColumn(item.id)}
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
  };
};

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;
