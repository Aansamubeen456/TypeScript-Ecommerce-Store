export type ProductsResponse = {
  data: Product[];
  meta: ProductsMeta;
};

export type SingleProductResponse = {
  data: Product;
  meta: {};
};

export type Product = {
  id: number;
  attributes: {
    category: string;
    company: string;
    createdAt: string;
    description: string;
    featured: boolean;
    image: string;
    price: string;
    publishedAt: string;
    shipping: boolean;
    title: string;
    updatedAt: string;
    colors: string[];
  };
};

type ProductsMeta = {
  companies: string[];
  categories: string[];
  pagination: Pagination;
};

type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

type Params = {
  company?: string;
  search?: string;
  category?: string;
  shipping?: string;
  order?: string;
  price?: string;
  page?: number;
};

export type ProductsResponseWithParams = ProductsResponse & { params: Params };

export type CartItem = {
  cartID: string;
  productID: number;
  image: string;
  title: string;
  price: string;
  amount: number;
  productColor: string;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

export type CheckOut = {
  name: string;
  address: string;
  chargeTotal: number;
  orderTotal: string;
  cartItems: CartItem[];
  numItemsInCart: number;
};

export type Order = {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    address: string;
    name: string;
    orderTotal: string;
    cartItems: CartItem[];
    numItemsInCart: number;
  };
};

export type OrdersMeta = {
  pagination: Pagination;
};

export type OrdersResponse = {
  data: Order[];
  meta: OrdersMeta;
};
