export type Comment = { id: string; date: string; text: string };

export type Comments = Comment[];

export type CardType = { id: string; title: string; description: string; comments: Comments };

export type CardsType = CardType[];

type id = string;

export type ColumnType = {
  id: string;
  heading: string;
  cards: id[];
};

export type ColumnsType = ColumnType[];
