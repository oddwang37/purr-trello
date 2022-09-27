export type Comment = { id: number; date: string; text: string };

export type Comments = Comment[];

export type CardType = { id: number; title: string; description: string; comments: Comments };

export type CardsType = CardType[];

type id = number;

export type ColumnType = {
  id: number;
  heading: string;
  cards: id[];
};

export type ColumnsType = ColumnType[];

export type PopupCardType = {
  cardInfo: CardType;
  columnId: number;
  cardId: number;
  columnTitle: string;
};
