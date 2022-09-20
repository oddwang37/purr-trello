import React, { FC } from 'react';
import styled from 'styled-components';

import { CardsType } from 'types/columns';
import { CardPreview } from 'components';

const Column: FC<ColumnProps> = ({ id, title, cards }) => {
  return (
    <Root>
      <Header>{title}</Header>
      <Content>
        {cards.map((item) => (
          <CardPreview title={item.title} />
        ))}
        <AddCard>
          <Plus>+</Plus>
          <div>Add card</div>
        </AddCard>
      </Content>
    </Root>
  );
};

export default Column;

type ColumnProps = {
  id: number;
  title: string;
  cards: CardsType;
};

const Content = styled.div`
  padding: 12px 8px 8px 8px;
`;

const Root = styled.div`
  width: 22%;
  background-color: #fff;
  border-radius: 6px;
  align-self: flex-start;
`;

const Header = styled.div`
  background-color: #7dadb0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px 24px;
  color: #fff;
  font-weight: 700;
`;
const AddCard = styled.div`
  height: 32px;
  padding: 5px 14px;
  background-color: #fff;
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e2e2e2;
  }
`;
const Plus = styled.div`
  font-size: 28px;
  color: #7a7a7a;
`;
