import { map } from 'nanostores';

export const cart = map({
  items: [
    { id: 1, quantity: 0, name: '真的友鬼 1', price: 'RM 25.00', img: '/img/profile.png', description: '弟弟消脱臭靠谁邢湘揽' },
    { id: 2, quantity: 0, name: '真的友鬼 2', price: 'RM 25.00', img: '/img/profile.png', description: '魁帚昏秧竭涂' },
    { id: 3, quantity: 0, name: '真的友鬼 3', price: 'RM 25.00', img: '/img/profile.png', description: '劈稍情星述包淹盗涧' },
    { id: 4, quantity: 0, name: '真的友鬼 4', price: 'RM 25.00', img: '/img/profile.png', description: '舅挥捅金' },
    { id: 5, quantity: 0, name: '真的友鬼 5', price: 'RM 25.00', img: '/img/profile.png', description: '公窗筛质顾' },
    { id: 6, quantity: 0, name: '真的友鬼 6', price: 'RM 25.00', img: '/img/profile.png', description: '硕揭化维诵划苇未' },
    { id: 7, quantity: 0, name: '手镯', price: 'RM 25.00', img: '/img/profile.png', description: '割堂卸门扫斤' },
  ],
  total: 0,
  totalItem: 0
});

export function addQuantity(productId){
  const currentCart = cart.get();
  const items = currentCart.items;
  console.log('items', items);
  const index = items.findIndex(item => item.id === productId);
  if(items[index].quantity === 0){
    items[index].quantity += 2;
    currentCart.totalItem += 1;
  } else{
    items[index].quantity += 1;
  }
  cart.set({
      ...currentCart,
      items,
      totalItem: currentCart.totalItem + 1
  });
}