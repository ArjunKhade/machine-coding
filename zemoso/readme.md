Q1

Goal: De-duplicate orders by id, merge line items by sku, compute totals, and sort.

Input (given):
type LineItem = { sku: string; qty: number; price: number };
type Order = { id: string; customerId: string; items: LineItem[]; createdAt: string };
Implement (immutably):
type NormalizedOrder = Order & { orderTotal: number };

De-duplicate by id. If duplicates exist, merge items by sku (sum qty, keep any price).
Compute orderTotal = Σ(qty * price) per order
Sort result by createdAt desc.


const orders: Order[] = [
  { id: 'A1', customerId: 'C1', items: [{ sku:'P1', qty:1, price:100 }, { sku:'P2', qty:2, price:50 }], createdAt:'2025-08-01T10:00:00Z' },
  { id: 'A1', customerId: 'C1', items: [{ sku:'P2', qty:1, price:50 }], createdAt:'2025-08-01T10:00:00Z' }, // duplicate to merge
  { id: 'A2', customerId: 'C2', items: [{ sku:'P3', qty:3, price:20 }], createdAt:'2025-08-03T08:05:00Z' }
];


function normalizeOrders(input: Order[]): NormalizedOrder[] {
  // ...
}



function normalizeOrders(input: Order[]): NormalizedOrder[] {
  // Step 1: De-duplicate orders by id (keeps the first occurrence)
  const orderMap = new Map<string, Order>();

  for (const order of input) {
    const existingOrder = orderMap.get(order.id);

    // For the first occurrence, clone the order and its items so the input is not mutated.
    if (!existingOrder) {
      orderMap.set(order.id, {
        ...order,
        items: order.items.map(item => ({ ...item })),
      });

      continue;
    }

    // Build a lookup of the existing items so duplicate SKUs can be combined.
    const itemMap = new Map<string, LineItem>();

    // Add the already stored items first.
    for (const item of existingOrder.items) {
      itemMap.set(item.sku, { ...item });
    }

    // Add incoming items. If the SKU already exists, only the quantity is increased.
    for (const item of order.items) {
      const existingItem = itemMap.get(item.sku);

      if (existingItem) {
        itemMap.set(item.sku, {
          ...existingItem,
          qty: existingItem.qty + item.qty,
        });
      } else {
        itemMap.set(item.sku, { ...item });
      }
    }

     // Assign the merged items back to the order
    orderMap.set(order.id, {
      ...existingOrder,
      items: Array.from(itemMap.values()),
    });
  }

  // Step 3: Compute orderTotal = Σ(qty * price) per order
  // Step 4: Sort result by createdAt descending
  return Array.from(orderMap.values())
    .map(order => ({
      ...order,
      orderTotal: order.items.reduce((total, item) => total + item.qty * item.price, 0)
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
