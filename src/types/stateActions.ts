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
  deleteDescription: () => void;
  addComment: (commentText: string) => void;
  editCommentText: (cardId: string, commentId: string, newCommentText: string) => void;
  deleteComment: (cardId: string, commentId: string) => void;
  closeCard: () => void;
};
