export interface IProdcut {
  id?: string | undefined;
  title: string;
  description: string;
  imageUrl: string;
  colors: string[];
  price: string;
  category: {
    name: string;
    image: string;
  };
}
