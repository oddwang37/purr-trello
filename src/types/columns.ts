export type CardType = { title: string; id: number };

export type CardsType = CardType[];

export type ColumnType = { id: number; title: string; cards: CardsType };

export type ColumnsType = ColumnType[];
