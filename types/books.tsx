export type Category = {
  id: string;
  name: string;
};

export type Book = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category[];
};