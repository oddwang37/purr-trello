import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { ColumnsType, CardsType } from 'types/columns';
import { Columns, Header, LoginModal, Card } from 'components';

const App = () => {
  const initialColumns = [
    {
      id: 'asdasdsad',
      heading: 'TODO',
      cards: ['asdsadsad'],
    },
    {
      id: 'sadasdas',
      heading: 'In Progress',
      cards: [],
    },
    {
      id: 'asdasdasd',
      heading: 'Testing',
      cards: [],
    },
    {
      id: 'asdsadsad',
      heading: 'Done',
      cards: [],
    },
  ];
  const [username, setUsername] = useState<string>('');

  const changeUsername = (newName: string) => {
    setUsername(newName);
    saveUsername(newName);
  };
  const [columns, setColumns] = useState<ColumnsType>(initialColumns);
  const [cards, setCards] = useState<CardsType>([
    {
      id: 'asdsadsad',
      title: 'first',
      description: 'some',
      comments: [{ id: 'asdsadsad', date: '11/12/2002', text: 'some comment' }],
    },
  ]);
  // ---------- Popups states -------------------

  const [isModalOpened, setModalOpened] = useState<boolean>(true);

  const closeModal = () => {
    setModalOpened(false);
  };

  const [isCardOpened, setCardOpened] = useState<boolean>(false);

  const openCard = () => setCardOpened(true);
  const closeCard = () => setCardOpened(false);

  // first is columnd id, second is card id
  const [popupCardId, setPopupCardId] = useState<string>('asdsadsad');

  const changePopupCardId = (cardId: string) => {
    setPopupCardId(cardId);
    openCard();
  };
  //  --------------------- Actions with columns -----------------

  const addCard = (columnId: string, title: string) => {
    const id = uuidv4();
    /*     const newColumns = columns.map((item) => ({
      ...item,
      cards: [...item.cards],
    })); */
    const newColumns = columns.map((item) => {
      if (item.id === columnId) {
        const newItem = item;
        newItem.cards.push(id);
        return newItem;
      } else {
        return item;
      }
    });
    const newCards = [...cards];
    newCards.push({ id, title, description: '', comments: [] });
    setCards(newCards);
    setColumns(newColumns);
    localStorage.setItem('cards', JSON.stringify(newCards));
    localStorage.setItem('columns', JSON.stringify(newColumns));
  };
  const editCardTitle = (cardId: string, newTitle: string) => {
    const oldCards = [...cards];
    const newCards = oldCards.map((item) => {
      if (item.id === cardId) {
        return { ...item, title: newTitle };
      } else return item;
    });
    setCards(newCards);
    localStorage.setItem('cards', JSON.stringify(newCards));
  };

  const editColumnHeading = (columnId: string, newHeading: string) => {
    // const newColumns = cloneColumns(columns);
    const newColumns = columns.map((item) => {
      if (item.id === columnId) {
        const newColumn = item;
        newColumn.heading = newHeading;
        return newColumn;
      } else {
        return item;
      }
    });
    setColumns(newColumns);
    localStorage.setItem('columns', JSON.stringify(newColumns));
  };

  const findColumnOfCard = (id: string) => {
    const result = columns.filter((item) => item.cards.includes(id))[0];
    if (result) {
      return result.id;
    }
  };
  // get info about current popup card
  const getPopupCard = (cardId: string) => {
    const card = cards.filter((item) => item.id === cardId)[0];
    return card;
  };

  const deleteCard = () => {
    const cardId = popupCardId;
    const columnId = findColumnOfCard(cardId);
    if (columnId) {
      const newColumns = columns.map((column) => {
        if (column.id === columnId) {
          return { ...column, cards: column.cards.filter((card) => card !== cardId) };
        } else {
          return column;
        }
      });
      setColumns(newColumns);
      const newCards = cards.filter((item) => item.id !== cardId);
      setCards(newCards);
      setPopupCardId('asdsadsad');
      localStorage.setItem('columns', JSON.stringify(newColumns));
    }
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
    localStorage.setItem('cards', JSON.stringify(newCards));
  };

  const addComment = (commentText: string) => {
    const cardId = popupCardId;
    const oldCards = [...cards];
    const newCards = oldCards.map((item) => {
      if (item.id === cardId) {
        if (item.comments.length === 0) {
          const newComments = [{ id: uuidv4(), date: '11/12/2022', text: commentText }];
          return { ...item, comments: newComments };
        } else {
          const oldComments = [...item.comments];
          return {
            ...item,
            comments: [...oldComments, { id: uuidv4(), date: '11/12/2022', text: commentText }],
          };
        }
      } else {
        return item;
      }
    });
    setCards(newCards);
    localStorage.setItem('cards', JSON.stringify(newCards));
  };

  const getColumnCards = (columnId: string) => {
    const column = columns.find((item) => item.id === columnId);
    if (column) {
      const cardsIds = column.cards;
      const columnCards: CardsType = [];
      cards.forEach((item) => {
        if (cardsIds.includes(item.id)) {
          columnCards.push(item);
        }
      });
      return columnCards;
    } else return [];
  };

  const cardsActions = {
    addCard,
    deleteCard,
    editCardTitle,
    changePopupCardId,
    getColumnCards,
    editColumnHeading,
  };

  const cardPopupActions = {
    getPopupCard,
    deleteCard,
    editDescription,
    addComment,
    closeCard,
    editCardTitle,
  };

  const saveUsername = (username: string) => {
    localStorage.setItem('username', username);
  };

  const getUsername = () => {
    const storageUsername = localStorage.getItem('username');
    if (storageUsername) {
      setUsername(storageUsername);
      closeModal();
    }
  };
  const getStorageColumns = () => {
    const storageColumns = localStorage.getItem('columns');
    if (storageColumns) {
      setColumns(JSON.parse(storageColumns));
    } else {
      setColumns(initialColumns);
    }
  };

  const getStorageCards = () => {
    const storageCards = localStorage.getItem('cards');
    if (storageCards) {
      setCards(JSON.parse(storageCards));
    } else {
      setCards([
        {
          id: 'asdsadsad',
          title: 'first',
          description: 'some',
          comments: [{ id: 'asdsada', date: '11/12/2002', text: 'some comment' }],
        },
      ]);
    }
  };

  useEffect(() => {
    getUsername();
    getStorageColumns();
    getStorageCards();
  }, []);

  return (
    <Root>
      <Header username={username} />
      <Columns columns={columns} cards={cards} cardsActions={cardsActions} />
      <LoginModal
        changeUsername={changeUsername}
        closeModal={closeModal}
        isOpened={isModalOpened}
      />
      <Card
        username={username}
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
