import { CardType, CardsType } from './columns';

export type CardsActions = {
  addCard: (columnId: string, title: string) => void;
  deleteCard: (columnId: string, cardId: string) => void;
  editCardTitle: (cardId: string, newTitle: string) => void;
  changePopupCardId: (cardId: string) => void;
  getColumnCards: (columnId: string) => CardsType;
  editColumnHeading: (columnId: string, newHeading: string) => void;
};

export type CardPopupActions = {
  getPopupCard: (cardId: string) => CardType;
  deleteCard: () => void;
  editCardTitle: (cardId: string, newTitle: string) => void;
  editDescription: (newDescription: string) => void;
  addComment: (commentText: string) => void;
  closeCard: () => void;
};
