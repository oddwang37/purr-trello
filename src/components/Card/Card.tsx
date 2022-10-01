import React, { FC, useEffect, useState, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Overlay, CloseButton } from 'components';
import { Description, Comments } from './components';
import { CardSvg, BinSvg } from 'components/svg';
import { useAppDispatch, RootState } from 'redux/store';
import { deleteCard, editCardTitle } from 'redux/features/cards/cardsSlice';
import { selectPopupCard } from 'redux/features/cards/cardsSelectors';

const Card: FC<CardProps> = ({ isOpened, closeCard }) => {
  const cardInfo = useSelector(selectPopupCard);
  const username = useSelector((state: RootState) => state.username);
  const dispatch = useAppDispatch();

  const onClickDelete = () => {
    dispatch(deleteCard());
    closeCard();
  };

  const [headingVal, setHeadingVal] = useState<string>('');

  const titleInputRef = useRef<HTMLInputElement>(null);

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter' && titleInputRef.current) {
      titleInputRef.current.blur();
    }
  };

  const onBlur = () => {
    if (cardInfo) {
      const oldHeading = cardInfo.title;
      if (headingVal === '') {
        setHeadingVal(oldHeading);
      } else {
        dispatch(editCardTitle({ cardId: cardInfo.id, newTitle: headingVal }));
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeadingVal(e.target.value);
  };
  useEffect(() => {
    cardInfo && setHeadingVal(cardInfo.title);
  }, [cardInfo]);

  useEffect(() => {
    const onKeyDown = (event: any) => {
      if (event.code === 'Escape') {
        closeCard();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <>
      {cardInfo && (
        <Overlay isOpened={isOpened} onClick={closeCard}>
          <Root onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <FlexWrapper>
              <CardSvg />
              <Title
                value={headingVal}
                onChange={onChange}
                onBlur={onBlur}
                ref={titleInputRef}
                onKeyDown={onEnterPress}
              />
            </FlexWrapper>
            <Column>
              In <ColumnTitle>COLUMN TITLE</ColumnTitle> column
              <br />
              by {username}
            </Column>
            <Description description={cardInfo.description} />
            <Comments cardId={cardInfo.id} comments={cardInfo.comments} />
            <CloseButton closeModal={closeCard} />
            <DeleteButton onClick={onClickDelete}>
              <BinSvg />
            </DeleteButton>
          </Root>
        </Overlay>
      )}
    </>
  );
};

export default Card;

type CardProps = {
  isOpened: boolean;
  closeCard: () => void;
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
const DeleteButton = styled.div`
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 45px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  height: 30px;
  padding: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
`;
