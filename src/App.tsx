import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ColumnsType } from 'types/columns';
import { Columns, Header, LoginModal, Card } from 'components';

const App = () => {
  const [columnsInfo, setColumnsInfo] = useState<ColumnsType>([
    {
      id: 0,
      title: 'TODO',
      cards: [
        { id: 0, title: 'First title', description: '', comments: [] },
        { id: 1, title: 'Another one title', description: '', comments: [] },
      ],
    },
    {
      id: 1,
      title: 'In Progress',
      cards: [
        { id: 0, title: 'Some second', description: '', comments: [] },
        { id: 1, title: 'Another one title', description: '', comments: [] },
        { id: 2, title: 'And another one', description: '', comments: [] },
      ],
    },
    {
      id: 2,
      title: 'Testing',
      cards: [
        { id: 0, title: 'Some third title', description: '', comments: [] },
        { id: 1, title: 'Another one title', description: '', comments: [] },
      ],
    },
    {
      id: 3,
      title: 'Done',
      cards: [
        { id: 0, title: 'Some fourth title', description: '', comments: [] },
        { id: 1, title: 'Another one title', description: '', comments: [] },
      ],
    },
  ]);
  // ---------- Popups states -------------------

  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpened(false);
  };

  const [isCardOpened, setCardOpened] = useState<boolean>(false);

  const openCard = () => setCardOpened(true);
  const closeCard = () => setCardOpened(false);

  // first is columnd id, second is card id
  const [popupCardIds, setPopupCardIds] = useState<number[]>([0, 0]);

  const changePopupCardIds = (columnId: number, cardId: number) => {
    setPopupCardIds([columnId, cardId]);
    openCard();
  };
  //  --------------------- Actions with columns -----------------

  const cloneColumns = (array: ColumnsType) => {
    const clonedArray = [] as ColumnsType;
    array.forEach((item) => clonedArray.push(Object.assign({}, item)));
    return clonedArray;
  };
  const rand = () => {
    const random = Math.random() * 1001;
    return Math.floor(random);
  };
  const addCard = (columnId: number, title: string) => {
    const newColumns = cloneColumns(columnsInfo);
    newColumns[columnId].cards.push({ id: rand(), title, description: '', comments: [] });
    setColumnsInfo(newColumns);
  };
  const editCardTitle = (columnId: number, cardId: number, newTitle: string) => {
    const newColumns = cloneColumns(columnsInfo);
    const newCards = newColumns[columnId].cards.map((item) => {
      if (item.id === cardId) {
        return { ...item, title: newTitle };
      } else return item;
    });
    newColumns[columnId].cards = newCards;
    setColumnsInfo(newColumns);
  };

  // get info about current popup card
  const getPopupCard = () => {
    const columnId = popupCardIds[0];
    const cardId = popupCardIds[1];
    const column = columnsInfo[columnId];
    const columnTitle = column.title;
    const card = column.cards.filter((item) => item.id === cardId);
    return {
      cardInfo: card[0],
      columnId: columnId,
      cardId: cardId,
      columnTitle,
    };
  };

  const deleteCard = () => {
    const columnId = popupCardIds[0];
    const cardId = popupCardIds[1];
    const newColumns = cloneColumns(columnsInfo);
    const newCards = newColumns[columnId].cards.filter((item) => item.id !== cardId);
    newColumns[columnId].cards = newCards;
    setPopupCardIds([0, 0]);
    setColumnsInfo(newColumns);
  };

  //edit description works only with current card info on popup
  const editDescription = (newDescr: string) => {
    const columnId = popupCardIds[0];
    const cardId = popupCardIds[1];
    const newColumns = cloneColumns(columnsInfo);
    const newCards = newColumns[columnId].cards.map((item) => {
      if (item.id === cardId) {
        return { ...item, description: newDescr };
      } else return item;
    });
    newColumns[columnId].cards = newCards;
    setColumnsInfo(newColumns);
  };

  const addComment = (commentText: string) => {
    const columnId = popupCardIds[0];
    const cardId = popupCardIds[1];
    const newColumns = cloneColumns(columnsInfo);
    const oldCards = newColumns[columnId].cards;
    const newCards = oldCards.map((item) => {
      if (item.id === cardId) {
        if (item.comments.length === 0) {
          const newComments = [{ id: rand(), date: '11/12/2022', text: commentText }];
          return { ...item, comments: newComments };
        } else {
          const oldComments = [...item.comments];
          return {
            ...item,
            comments: [...oldComments, { id: rand(), date: '11/12/2022', text: commentText }],
          };
        }
      } else {
        return item;
      }
    });
    newColumns[columnId].cards = newCards;
    setColumnsInfo(newColumns);
  };

  const cardsActions = {
    addCard,
    deleteCard,
    editCardTitle,
    changePopupCardIds,
  };

  const cardPopupActions = {
    getPopupCard,
    deleteCard,
    editDescription,
    addComment,
    closeCard,
  };

  useEffect(() => {}, []);

  return (
    <Root>
      <Header username="username" />
      <Columns columnsInfo={columnsInfo} cardsActions={cardsActions} />
      <LoginModal closeModal={closeModal} isOpened={isModalOpened} />
      <Card cardPopupActions={cardPopupActions} isOpened={isCardOpened} />
    </Root>
  );
};

export default App;

const Root = styled.div`
  padding: 30px 60px;
`;
