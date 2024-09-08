export type ProductProps = {
    product: any;
    id: string;
    name: string;
    oldPrice: number;
    newPrice: number;
    image: string;
    quantity: number;
    inStock: boolean;
    User: UserType;
    category: string;
  }

  export type UserType = {
    id: string;
    email: string;
    emailVerified: string;
    image: string | null;
    name: string;
    role: string;
  }