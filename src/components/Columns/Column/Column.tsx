import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { CardsType, CardType } from 'types/columns';
import { CardPreview, SaveButton } from 'components';

const Column: FC<ColumnProps> = ({ id, title, cards, cardsActions, changePopupCardInfo }) => {
  const { addCard, deleteCard, editCard } = cardsActions;

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const [inputVal, setInputVal] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
  };
  const onCardCreate = () => {
    addCard(id, inputVal);
    setInputVal('');
    setIsEditable(false);
  };

  return (
    <Root>
      <Header>{title}</Header>
      <Content>
        {cards.map((item) => (
          <CardPreview
            title={item.title}
            cardId={item.id}
            columnId={id}
            key={item.id}
            editCard={editCard}
            changePopupCardInfo={() => changePopupCardInfo(item)}
          />
        ))}
        {isEditable ? (
          <AddingCardInterface>
            <AddCardInput
              placeholder="Enter a card name..."
              autoFocus
              onChange={handleChange}
              value={inputVal}
            />
            <ButtonsWrapper>
              <SaveButton onClick={onCardCreate}>Create</SaveButton>
              <CancelAdding onClick={disableEdit}>
                <div>&times;</div>
              </CancelAdding>
            </ButtonsWrapper>
          </AddingCardInterface>
        ) : (
          <AddCard onClick={enableEdit}>
            <Plus>+</Plus>
            <div>Add card</div>
          </AddCard>
        )}
      </Content>
    </Root>
  );
};

export default Column;

type ColumnProps = {
  id: number;
  title: string;
  cards: CardsType;
  cardsActions: {
    addCard: (columnId: number, title: string) => void;
    deleteCard: (columnId: number, cardId: number) => void;
    editCard: (columnId: number, cardId: number, newTitle: string) => void;
  };
  changePopupCardInfo: (info: CardType) => void;
};

const Content = styled.div`
  padding: 12px 8px 8px 8px;
`;

const Root = styled.div`
  width: 22%;
  background-color: #fff;
  border-radius: 6px;
  align-self: flex-start;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
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
const AddingCardInterface = styled.div``;
const AddCardInput = styled.textarea`
  resize: none;
  width: 100%;
  height: 60px;
  padding: 8px 12px;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid #000;
  font-size: 14px;
  &:focus {
    border: none;
  }
`;
const ButtonsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const CancelAdding = styled.div`
  font-weight: 500;
  font-size: 28px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const Plus = styled.div`
  font-size: 28px;
  color: #7a7a7a;
`;
