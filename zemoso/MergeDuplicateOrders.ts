import { LineItem, NormalizedOrder, Order } from './model';
import { orders } from './data.js';

// console.log(normalizeOrders(orders));
console.log(JSON.stringify(normalizeOrders(orders), null, 2));

function normalizeOrders(input: Order[]): NormalizedOrder[] {
  
  // deplicate the order 
  const ordermap = new Map<string, Order>();

  for(const order of input) {
    // check if order existe in map
   const existingOrder = ordermap.get(order.id);

   if(!existingOrder){
    ordermap.set(order.id, {
      ...order,
      items: order.items.map(item => ({...item}))
    })

    continue;
   }

   //if found duplicate order merge line items by sku
   const itemsMap = new Map<string, LineItem>();

   for (const item of existingOrder.items) {
     itemsMap.set(item.sku, {...item} )
   }

   for (const element of order.items) {
      const existingItem = itemsMap.get(element.sku);
      if(existingItem){
        itemsMap.set(element.sku, {
          ...element,
          qty: existingItem.qty + element.qty
        })
      }else{
        itemsMap.set(element.sku,{...element})
      }
   }

   //set the updated items 
    ordermap.set(order.id, {
      ...existingOrder, 
      items: Array.from(itemsMap.values())
    })

  }

    //calc orderTotal and return sorted orders
  return Array.from(ordermap.values())
  .map(order => ({
    ...order,
    orderTotal: order.items.reduce((total, item) => (total + (item.qty * item.price)), 0)
  }))
  .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())


}