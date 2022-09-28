import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { ColumnsType, CardsType } from 'types/columns';
import { Columns, Header, LoginModal, Card } from 'components';
import formatDate from 'utils/formatDate';
import StorageService, { StorageKeys } from 'services/StorageService';

const App = () => {
  const storage = new StorageService();
  const cardsKey: StorageKeys = StorageKeys.cards;
  const columnsKey: StorageKeys = StorageKeys.columns;
  const usernameKey: StorageKeys = StorageKeys.username;

  const initialColumns = [
    {
      id: uuidv4(),
      heading: 'TODO',
      cards: [],
    },
    {
      id: uuidv4(),
      heading: 'In Progress',
      cards: [],
    },
    {
      id: uuidv4(),
      heading: 'Testing',
      cards: [],
    },
    {
      id: uuidv4(),
      heading: 'Done',
      cards: [],
    },
  ];
  const [username, setUsername] = useState<string>('');

  const changeUsername = (newName: string) => {
    setUsername(newName);
    storage.setItem(usernameKey, newName);
  };
  const [columns, setColumns] = useState<ColumnsType>(initialColumns);
  const [cards, setCards] = useState<CardsType>([]);
  // ---------- Popups states -------------------

  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpened(false);
  };

  const [isCardOpened, setCardOpened] = useState<boolean>(false);

  const openCard = () => setCardOpened(true);
  const closeCard = () => setCardOpened(false);

  // first is columnd id, second is card id
  const [popupCardId, setPopupCardId] = useState<string | null>(null);

  const changePopupCardId = (cardId: string) => {
    setPopupCardId(cardId);
    openCard();
  };
  //  --------------------- Actions with columns -----------------

  const addCard = (columnId: string, title: string) => {
    const id = uuidv4();
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
    storage.setItem(cardsKey, newCards);
    storage.setItem(columnsKey, newColumns);
  };
  const editCardTitle = (cardId: string, newTitle: string) => {
    const oldCards = [...cards];
    const newCards = oldCards.map((item) => {
      if (item.id === cardId) {
        return { ...item, title: newTitle };
      } else return item;
    });
    setCards(newCards);
    storage.setItem(cardsKey, newCards);
  };

  const editColumnHeading = (columnId: string, newHeading: string) => {
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
    storage.setItem(columnsKey, newColumns);
  };

  const findColumnOfCard = (id: string) => {
    const result = columns.filter((item) => item.cards.includes(id))[0];
    if (result) {
      return result.id;
    }
  };
  // get info about current popup card
  const getPopupCard = (cardId: string | null) => {
    if (cardId) {
      const card = cards.find((item) => item.id === cardId);
      if (card) {
        return card;
      }
    }

    return null;
  };

  const deleteCard = () => {
    if (popupCardId) {
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
        setPopupCardId(null);
        storage.setItem(cardsKey, newCards);
        storage.setItem(columnsKey, newColumns);
      }
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
    storage.setItem(cardsKey, newCards);
  };

  const deleteDescription = () => {
    const cardId = popupCardId;
    const newCards = cards.map((item) => {
      if (item.id === cardId) {
        return { ...item, description: '' };
      } else return item;
    });
    setCards(newCards);
    storage.setItem(cardsKey, newCards);
  };

  const addComment = (commentText: string) => {
    const cardId = popupCardId;
    const oldCards = [...cards];
    const date = formatDate(new Date());
    const newCards = oldCards.map((item) => {
      if (item.id === cardId) {
        if (item.comments.length === 0) {
          const newComments = [{ id: uuidv4(), date, text: commentText }];
          return { ...item, comments: newComments };
        } else {
          const oldComments = [...item.comments];
          return {
            ...item,
            comments: [...oldComments, { id: uuidv4(), date, text: commentText }],
          };
        }
      } else {
        return item;
      }
    });
    setCards(newCards);
    storage.setItem(cardsKey, newCards);
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

  const editCommentText = (cardId: string, commentId: string, newCommentText: string) => {
    const newCards = cards.map((card) => {
      if (card.id === cardId) {
        const newComments = card.comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, text: newCommentText };
          } else return comment;
        });
        return { ...card, comments: newComments };
      } else {
        return card;
      }
    });
    setCards(newCards);
    storage.setItem(cardsKey, newCards);
  };

  const deleteComment = (cardId: string, commentId: string) => {
    const newCards = cards.map((card) => {
      if (card.id === cardId) {
        const newComments = card.comments.filter((comment) => comment.id !== commentId);
        return { ...card, comments: newComments };
      } else {
        return card;
      }
    });
    setCards(newCards);
    storage.setItem(cardsKey, newCards);
  };

  const cardPopupActions = {
    getPopupCard,
    deleteCard,
    editDescription,
    deleteDescription,
    addComment,
    editCommentText,
    deleteComment,
    closeCard,
    editCardTitle,
  };

  const getUsername = () => {
    const storageUsername = storage.getItem(usernameKey);
    if (storageUsername && typeof storageUsername === 'string') {
      setUsername(storageUsername);
    } else {
      setModalOpened(true);
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
      setCards([]);
    }
  };

  const getColumnTitleForPopup = () => {
    if (popupCardId) {
      const cardId = popupCardId;
      const column = columns.find((column) => column.cards.includes(cardId));
      if (column) {
        return column.heading;
      } else return '';
    } else return null;
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
        columnTitle={getColumnTitleForPopup()}
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
