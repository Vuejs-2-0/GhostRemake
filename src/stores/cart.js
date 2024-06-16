import { map } from 'nanostores';
import { updateCart as updateCartGql } from '@/lib/tarpit_gql';
// export const cart = map({
//   items: [
//     { id: 1, quantity: 0, name: '真的友鬼 1', price: 'RM 25.00', img: '/img/profile.webp', description: '弟弟消脱臭靠谁邢湘揽' },
//     { id: 2, quantity: 0, name: '真的友鬼 2', price: 'RM 25.00', img: '/img/profile.webp', description: '魁帚昏秧竭涂' },
//     { id: 3, quantity: 0, name: '真的友鬼 3', price: 'RM 25.00', img: '/img/profile.webp', description: '劈稍情星述包淹盗涧' },
//     { id: 4, quantity: 0, name: '真的友鬼 4', price: 'RM 25.00', img: '/img/profile.webp', description: '舅挥捅金' },
//     { id: 5, quantity: 0, name: '真的友鬼 5', price: 'RM 25.00', img: '/img/profile.webp', description: '公窗筛质顾' },
//     { id: 6, quantity: 0, name: '真的友鬼 6', price: 'RM 25.00', img: '/img/profile.webp', description: '硕揭化维诵划苇未' },
//     { id: 7, quantity: 0, name: '真的友鬼 7', price: 'RM 25.00', img: '/img/profile.webp', description: '划劈稍情星' },
//     { id: 8, quantity: 0, name: '手镯', price: 'RM 25.00', img: '/img/profile.webp', description: '割堂卸门扫斤' },
//   ],
//   total: 0,
//   totalItem: 0
// });

// export const cart = map({
//   items: [],
//   total: 0,
//   totalItem: 0
// });

export const cart = map({});

export const initCart = async (cart_data) => {
  cart.set(cart_data);
  // console.log('cart', cart.get());

}

export const updateProductInCart = async (id, quantity) => {

  const currentCart = cart.get();
  const item = currentCart.items[String(id)];

  // console.log('currentCart', currentCart);

  if (item) {
    currentCart.items[id] = quantity;
  } else {
    currentCart.items[id] = quantity;
  }

  cart.set({
    ...currentCart
  });

  let response = await fetch('/api/cart.json', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        cartId: currentCart.id,
        items: currentCart.items
      })
  });

  let data = await response.json();

  return data
}

// export function addQuantity(productId){
//   const currentCart = cart.get();
//   const items = currentCart.items;
//   console.log('items', items);
//   const index = items.findIndex(item => item.id === productId);
//   if(items[index].quantity === 0){
//     items[index].quantity += 2;
//     currentCart.totalItem += 1;
//   } else{
//     items[index].quantity += 1;
//   }
//   cart.set({
//       ...currentCart,
//       items,
//       totalItem: currentCart.totalItem + 1
//   });
// }

// export function addOneQuantity(productId){
//   const currentCart = cart.get();
//   const items = currentCart.items;
//   console.log('items', items);
//   const index = items.findIndex(item => item.id === productId);
//   items[index].quantity += 1;
//   cart.set({
//       ...currentCart,
//       items,
//       totalItem: currentCart.totalItem + 1
//   });
// }

// export function minusQuantity(productId){
//   const currentCart = cart.get();
//   const items = currentCart.items;
//   console.log('items', items);
//   const index = items.findIndex(item => item.id === productId);
//   if(items[index].quantity >= 0){
//     items[index].quantity -= 1;
//   }
//   cart.set({
//       ...currentCart,
//       items,
//       totalItem: currentCart.totalItem - 1
//   });
// }