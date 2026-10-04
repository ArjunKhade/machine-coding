export type LineItem = {
  sku: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  customerId: string;
  items: LineItem[];
  createdAt: string;
};

export type NormalizedOrder = Order & {
  orderTotal: number;
};