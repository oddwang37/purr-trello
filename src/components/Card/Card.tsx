import React, { FC } from 'react';
import styled from 'styled-components';

import { Overlay, CloseButton } from 'components';
import { Description } from './Description';
import { Comments } from './Comments';
import { CardSvg } from 'components/svg';
import { CardType } from 'types/columns';

const Card: FC<CardProps> = ({ cardInfo, cardPopupActions, isOpened }) => {
  const { getPopupCard, deleteCard, editDescription, addComment, closeCard } = cardPopupActions;

  const onClickDelete = () => {
    deleteCard();
    closeCard();
  };
  return (
    <Overlay isOpened={isOpened}>
      <Root>
        <FlexWrapper>
          <CardSvg />
          <Title defaultValue={cardInfo?.title} />
        </FlexWrapper>
        <Column>
          columnTitle In <ColumnTitle>{cardInfo?.title}</ColumnTitle> column
          <br />
          by username
        </Column>
        <Description
          description={cardInfo.description}
          editDescription={editDescription}
          updatePopupCard={() => getPopupCard(cardInfo.id)}
        />
        <Comments comments={cardInfo.comments} addComment={addComment} />
        <CloseButton closeModal={closeCard} />
        <DeleteCard onClick={onClickDelete}>Delete card</DeleteCard>
      </Root>
    </Overlay>
  );
};

export default Card;

type CardProps = {
  cardInfo: CardType;
  cardPopupActions: {
    getPopupCard: (cardId: number) => CardType;
    deleteCard: () => void;
    editCardTitle: (cardId: number, newTitle: string) => void;
    editDescription: (newDescription: string) => void;
    addComment: (commentText: string) => void;
    closeCard: () => void;
  };
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
const Title = styled.input`
  border: none;
  font-size: 16px;
  font-weight: 700;
  width: 450px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 4px;
`;
const Column = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin: 6px 0 20px 30px;
`;
const ColumnTitle = styled.span`
  text-decoration: underline;
`;
const DeleteCard = styled.div`
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 30%;
  color: #ff1a4c;
  font-weight: 600;
  display: flex;
  justify-content: center;
  height: 30px;
  padding: 5px 0;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
