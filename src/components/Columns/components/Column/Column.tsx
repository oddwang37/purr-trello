import React, { FC, useEffect, useState, useRef, KeyboardEvent } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { RootState } from "redux/store";
import { cardsDuckSelectors } from "redux/cards";
import { CardPreview, SaveButton } from "components";
import { useAppDispatch } from "redux/store";
import { editColumnHeading } from "redux/features/cards/cardsSlice";
import { addCard } from "redux/cards/slices";
import { v4 as uuid } from "uuid";

const Column: FC<ColumnProps> = ({ id, heading, openCard }) => {
  const cards = useSelector((state: RootState) =>
    cardsDuckSelectors.selectCardsForColumn(state, id)
  );
  const dispatch = useAppDispatch();

  const headingRef = useRef<HTMLInputElement>(null);

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const [addingInputVal, setAddingInputVal] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddingInputVal(e.target.value);
  };

  const createCard = () => {
    if (addingInputVal) {
      dispatch(addCard({ columnId: id, title: addingInputVal, id: uuid() }));
      setAddingInputVal("");
      setIsEditable(false);
    }
  };

  const [inputHeadingText, setInputHeadingText] = useState<string>("");

  const onHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHeadingText(e.target.value);
  };

  const onBlurHeading = () => {
    const prevHeading = heading;
    if (inputHeadingText === "") {
      dispatch(editColumnHeading({ columnId: id, newHeading: prevHeading }));
      setInputHeadingText(heading);
    } else {
      dispatch(
        editColumnHeading({ columnId: id, newHeading: inputHeadingText })
      );
    }
  };

  useEffect(() => {
    setInputHeadingText(heading);
  }, [heading]);

  const onEnterPressHeading = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === "Enter" && headingRef.current) {
      headingRef.current.blur();
    }
  };

  const onEnterPressAddingCard = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ): any => {
    if (e.key === "Enter") {
      createCard();
    }
  };

  return (
    <Root>
      <Header
        value={inputHeadingText}
        ref={headingRef}
        onKeyDown={onEnterPressHeading}
        onChange={onHeadingChange}
        onBlur={onBlurHeading}
      />
      <Content>
        {cards.map((item) => (
          <CardPreview
            title={item.title}
            cardId={item.id}
            columnId={id}
            key={item.id}
            commentsQ={item.comments.length}
            openCard={openCard}
          />
        ))}
        {isEditable ? (
          <AddingCardInterface>
            <AddCardTextArea
              placeholder="Enter a card name..."
              onChange={handleChange}
              value={addingInputVal}
              onKeyDown={onEnterPressAddingCard}
              autoFocus
            />
            <ButtonsWrapper>
              <SaveButton onClick={createCard}>Create</SaveButton>
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
  id: string;
  heading: string;
  openCard: () => void;
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

const Header = styled.input`
  background-color: #7dadb0;
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 10px 24px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  display: block;
  width: 100%;
  &:focus {
    background-color: #fff;
    color: #000;
  }
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
const AddCardTextArea = styled.textarea`
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
