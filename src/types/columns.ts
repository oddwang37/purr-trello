export type Comment = { id: number; date: string; text: string };

export type Comments = Comment[];

export type CardType = { id: number; title: string; description: string; comments: Comments };

export type CardsType = CardType[];

export type ColumnType = { id: number; title: string; cards: CardsType };

export type ColumnsType = ColumnType[];

export type CardPopupType = {
  id: number;
  title: string;
  description: string;
  comments: [];
};
