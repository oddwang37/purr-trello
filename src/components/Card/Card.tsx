import React, { FC, useEffect, useState, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';

import { Overlay, CloseButton } from 'components';
import { Description, Comments } from './components';
import { CardSvg } from 'components/svg';
import { CardType } from 'types/columns';
import { CardPopupActions } from 'types/stateActions';

const Card: FC<CardProps> = ({ username, columnTitle, cardInfo, cardPopupActions, isOpened }) => {
  const {
    deleteCard,
    editCardTitle,
    editDescription,
    deleteDescription,
    addComment,
    editCommentText,
    deleteComment,
    closeCard,
  } = cardPopupActions;

  const onClickDelete = () => {
    deleteCard();
    closeCard();
  };

  const [inputVal, setInputVal] = useState<string>('');

  const titleInputRef = useRef<HTMLInputElement>(null);

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter' && titleInputRef.current) {
      titleInputRef.current.blur();
    }
  };

  const onBlur = () => {
    editCardTitle(cardInfo.id, inputVal);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  useEffect(() => {
    cardInfo && setInputVal(cardInfo.title);
  }, [cardInfo]);

  return (
    <>
      {cardInfo ? (
        <Overlay isOpened={isOpened}>
          <Root>
            <FlexWrapper>
              <CardSvg />
              <Title
                value={inputVal}
                onChange={onChange}
                onBlur={onBlur}
                ref={titleInputRef}
                onKeyDown={onEnterPress}
              />
            </FlexWrapper>
            <Column>
              In <ColumnTitle>{columnTitle}</ColumnTitle> column
              <br />
              by {username}
            </Column>
            <Description
              description={cardInfo.description}
              editDescription={editDescription}
              deleteDescription={deleteDescription}
            />
            <Comments
              cardId={cardInfo.id}
              comments={cardInfo.comments}
              addComment={addComment}
              editCommentText={editCommentText}
              deleteComment={deleteComment}
            />
            <CloseButton closeModal={closeCard} />
            <DeleteCard onClick={onClickDelete}>Delete card</DeleteCard>
          </Root>
        </Overlay>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Card;

type CardProps = {
  username: string;
  cardInfo: CardType;
  columnTitle: string;
  cardPopupActions: CardPopupActions;
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
