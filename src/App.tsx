import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ColumnsType, CardsType } from 'types/columns';
import { Columns, Header, LoginModal, Card } from 'components';

const App = () => {
  const initialColumns = [
    {
      id: 0,
      title: 'TODO',
      cards: [0],
    },
    {
      id: 1,
      title: 'In Progress',
      cards: [],
    },
    {
      id: 2,
      title: 'Testing',
      cards: [],
    },
    {
      id: 3,
      title: 'Done',
      cards: [],
    },
  ];
  const [columns, setColumns] = useState<ColumnsType>(initialColumns);
  const [cards, setCards] = useState<CardsType>([
    {
      id: 0,
      title: 'first',
      description: 'some',
      comments: [{ id: 0, date: '11/12/2002', text: 'some comment' }],
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
  const [popupCardId, setPopupCardId] = useState<number>(0);

  const changePopupCardId = (cardId: number) => {
    setPopupCardId(cardId);
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
    const id = rand();
    const newColumns = cloneColumns(columns);
    newColumns[columnId].cards.push(id);
    const newCards = [...cards];
    newCards.push({ id, title, description: '', comments: [] });
    setCards(newCards);
    setColumns(newColumns);
    saveColumnsAndCards();
  };
  const editCardTitle = (cardId: number, newTitle: string) => {
    const oldCards = [...cards];
    const newCards = oldCards.map((item) => {
      if (item.id === cardId) {
        return { ...item, title: newTitle };
      } else return item;
    });
    setCards(newCards);
    saveColumnsAndCards();
  };

  const findColumnOfCard = (id: number) => {
    const result = columns.find((item) => item.cards.includes(id));
    if (result) {
      return result.id;
    }
  };
  // get info about current popup card
  const getPopupCard = (cardId: number) => {
    const card = cards.filter((item) => item.id === cardId)[0];
    return card;
  };

  const deleteCard = () => {
    const cardId = popupCardId;
    const newColumns = cloneColumns(columns);
    const columnId = findColumnOfCard(cardId);
    if (columnId) {
      const newColumnCards = newColumns[columnId].cards.filter((item) => item !== cardId);
      newColumns[columnId].cards = newColumnCards;
      setColumns(newColumns);
      const oldCards = [...cards];
      const newCards = oldCards.filter((item) => item.id !== cardId);
      setCards(newCards);
      setPopupCardId(0);
    }
    saveColumnsAndCards();
  };

  //edit description works only with current card info on popup
  const editDescription = (newDescr: string) => {
    const cardId = popupCardId;
    const oldCards = [...cards];
    const newCards = oldCards.map((item) => {
      if (item.id === cardId) {
        return { ...item, description: newDescr };
      } else return item;
    });
    setCards(newCards);
    saveColumnsAndCards();
  };

  const addComment = (commentText: string) => {
    const cardId = popupCardId;
    const oldCards = [...cards];
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
    setCards(newCards);
    saveColumnsAndCards();
  };

  const getColumnCards = (columnId: number) => {
    const cardsIds = [...columns[columnId].cards];
    const columnCards: CardsType = [];
    cards.forEach((item) => {
      if (cardsIds.includes(item.id)) {
        columnCards.push(item);
      }
    });
    return columnCards;
  };

  const cardsActions = {
    addCard,
    deleteCard,
    editCardTitle,
    changePopupCardId,
    getColumnCards,
  };

  const cardPopupActions = {
    getPopupCard,
    deleteCard,
    editDescription,
    addComment,
    closeCard,
    editCardTitle,
  };

  const saveColumnsAndCards = () => {
    localStorage.setItem('columns', JSON.stringify(columns));
    localStorage.setItem('cards', JSON.stringify(cards));
  };

  const getStorageColumns = () => {
    const columns = JSON.parse(`${localStorage.getItem('columns')}`);
    setColumns(columns || initialColumns);
  };

  const getStorageCards = () => {
    const cards = JSON.parse(`${localStorage.getItem('cards')}`);
    setCards(cards || []);
  };

  useEffect(() => {
    getStorageColumns();
    getStorageCards();
  }, []);

  return (
    <Root>
      <Header username="username" />
      <Columns columns={columns} cards={cards} cardsActions={cardsActions} />
      <LoginModal closeModal={closeModal} isOpened={isModalOpened} />
      <Card
        cardInfo={getPopupCard(popupCardId)}
        cardPopupActions={cardPopupActions}
        isOpened={isCardOpened}
      />
    </Root>
  );
};

export default App;

const Root = styled.div`
  padding: 30px 60px;
`;
