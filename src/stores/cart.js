import { map } from 'nanostores';
export const cart = map({});

export const initCart = async (cart_data) => {
  cart.set(cart_data);
}

export const updateProductInCart = async (id, quantity) => {

  const currentCart = cart.get();
  currentCart.items[id] = quantity;

  for(let key of Object.keys(currentCart.items)){
    if(currentCart.items[key] === 0){
      delete currentCart.items[key];
    }
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

export const updateProductBraceletInCart = async (id, quantity, metadata) => {

  const currentCart = cart.get();

  currentCart.metadata = metadata;

  currentCart.items[id] = quantity;

  for(let key of Object.keys(currentCart.items)){
    if(currentCart.items[key] === 0){
      delete currentCart.items[key];
    }
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
        items: currentCart.items,
        metadata: currentCart.metadata
      })
  });

  let data = await response.json();

  return data
}

export const removeBraceletInCart = async (metadata) => {

  const currentCart = cart.get();

  currentCart.metadata = metadata;

  currentCart.items["9"] = currentCart.items["9"] - 1;

  for(let key of Object.keys(currentCart.items)){
    if(currentCart.items[key] === 0){
      delete currentCart.items[key];
    }
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
        items: currentCart.items,
        metadata: currentCart.metadata
      })
  });

  let data = await response.json();

  return data
}

export const removeQuestionInCart = async (metadata) => {

  const currentCart = cart.get();

  currentCart.metadata = metadata;

  //Loop through currentCart.metadata.questions and remove the item that consist 0 questionIndex
  for(let i = 0; i < currentCart.metadata.questions.length; i++){
    if(currentCart.metadata.questions[i].questionIndex === 0){
      currentCart.metadata.questions.splice(i, 1);
      currentCart.items["10"] = currentCart.items["10"] - 1;
    }
  }

  for(let key of Object.keys(currentCart.items)){
    if(currentCart.items[key] === 0){
      delete currentCart.items[key];
    }
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
        items: currentCart.items,
        metadata: currentCart.metadata
      })
  });

  let data = await response.json();

  return data
}

export const editQuestionInCart = async (metadata) => {

  const currentCart = cart.get();

  currentCart.metadata = metadata;

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
        items: currentCart.items,
        metadata: currentCart.metadata
      })
  });

  let data = await response.json();

  return data
}