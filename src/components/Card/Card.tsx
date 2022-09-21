import React, { FC } from 'react';
import styled from 'styled-components';

import { Overlay, CloseButton } from 'components';
import { Description } from './Description';
import { Comments } from './Comments';
import { CardSvg } from 'components/svg';
import { CardType } from 'types/columns';

const Card: FC<CardProps> = ({ cardInfo, closeCard, isOpened }) => {
  const { id, title, description, comments } = cardInfo;

  return (
    <Overlay isOpened={isOpened}>
      <Root>
        <FlexWrapper>
          <CardSvg />
          <Title>{title}</Title>
        </FlexWrapper>
        <Column>
          In <ColumnTitle>In Progress</ColumnTitle> column
          <br />
          by username
        </Column>
        <Description description={description} />
        <Comments comments={comments} />
        <CloseButton closeModal={closeCard} />
      </Root>
    </Overlay>
  );
};

export default Card;

type CardProps = {
  cardInfo: CardType;
  closeCard: () => void;
  isOpened: boolean;
};
const Root = styled.div`
  width: 45vw;
  height: 85vh;
  padding: 20px 0 20px 40px;
  background-color: #fff;
  position: relative;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const Column = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin: 6px 0 20px 30px;
`;
const ColumnTitle = styled.span`
  text-decoration: underline;
`;
