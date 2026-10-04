import { Order } from "./model";

export const orders: Order[] = [
  {
    id: 'A1',
    customerId: 'C1',
    items: [
      { sku: 'P1', qty: 1, price: 100 },
      { sku: 'P2', qty: 2, price: 50 }
    ],
    createdAt: '2025-08-01T10:00:00Z'
  },
  {
    id: 'A1',
    customerId: 'C1',
    items: [
      { sku: 'P2', qty: 1, price: 50 }
    ],
    createdAt: '2025-08-01T10:00:00Z'
  },
  {
    id: 'A2',
    customerId: 'C2',
    items: [
      { sku: 'P3', qty: 3, price: 20 }
    ],
    createdAt: '2025-08-03T08:05:00Z'
  }
];