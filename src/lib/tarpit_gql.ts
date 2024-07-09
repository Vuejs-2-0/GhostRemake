import { Client, fetchExchange } from '@urql/core';
import { gql } from '@urql/core';
import { gql_url } from '@/constants';

const client = new Client({
  url: gql_url,
  exchanges: [fetchExchange],
  fetchOptions: () => {
    return {
      headers: { 'api-key': 'sk_tar_403u3SjxF9' }
    }
  }
});


const getProducts = async () => {

    const RunProductQuery = gql`
    mutation RunProductQuery($subject: String!, $method: String!, $query: JSON!) {
        runProductQuery(subject: $subject, method: $method, query: $query) {
            result
        }
    }
    `;

    let { data } = await client.mutation(RunProductQuery, {
      "subject": "product",
      "method": "findMany",
      "query": {}
    }).toPromise()

    return data.runProductQuery.result.result
      
}

const getBookProducts = async () => {

  const RunProductQuery = gql`
  mutation RunProductQuery($subject: String!, $method: String!, $query: JSON!) {
      runProductQuery(subject: $subject, method: $method, query: $query) {
          result
      }
  }
  `;

  let { data } = await client.mutation(RunProductQuery, {
    "subject": "product",
    "method": "findMany",
    "query": {
      "where": {
        "product_metadata_link": {
          "some": {
            "metadata_id": 7
          }
        }
      }
    }
  }).toPromise()

  return data.runProductQuery.result.result
    
}

const signUp = async (email: string, signature: string) => {

    const RunSignupQuery = gql`
        mutation Signup($email: String!, $signature: String!, $metadata: JSON) {
            signup(email: $email, signature: $signature, metadata: $metadata) {
                session {
                id
                userId
                fresh
                expiresAt
                }
                user {
                id
                email
                metadata
                }
                cookie
            }
        }
    `;

    let { data } = await client.mutation(RunSignupQuery, {
        "email": email,
        "signature": signature,
        "metadata": {}
      }).toPromise()

    //   console.log(result)

    return data.signup


}

const validateSession = async (sessionId: string) => {
  const ValidateSessionQuery = gql`
    mutation ValidateSession($sessionId: String!) {
      validateSession(sessionId: $sessionId) {
        session
        user
        cookie
      }
    }
  `;
  let { data } = await client.mutation(ValidateSessionQuery, {
    "sessionId": sessionId
  }).toPromise();

  return data.validateSession;
}


const login = async (email: string, signature: string) => {
  const LoginMutation = gql`
    mutation Login($email: String!, $signature: String!) {
      login(email: $email, signature: $signature) {
        user {
          metadata
          id
          email
        }
        cookie
        session {
          expiresAt
          fresh
          id
          userId
        }
      }
    }
  `;

  let { data } = await client.mutation(LoginMutation, {
    "email": email,
    "signature": signature,
    "metadata": {}
  }).toPromise();
  return data.login;
}



const getUserData = async (userId: string) => {
  
  const GetUserQuery = gql`
    query GetUserByID($userId: String!, $status: String!) {
      getUserByID(userID: $userId) {
        user {
          id
          email
          metadata
        }
      }
      
      getCartByOwner(ownerId: $userId, status: $status) {
        id
        owner
        metadata
        items
      }
      getTxByOwner(owner_id: $userId) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;
  let { data } = await client.query(GetUserQuery, {
    "userId": userId,
    "status": "active"
  }).toPromise();

  return {
    user: data.getUserByID.user,
    cart: data.getCartByOwner,
    tx: data.getTxByOwner
  };
}

const newCart = async (ownerId: string) => {
  const CreateCartMutation = gql`
    mutation CreateCart($metadata: JSON, $owner: String) {
      createCart(metadata: $metadata, owner: $owner) {
        id
        owner
        metadata
        items
      }
    }
  `;
  let { data } = await client.mutation(CreateCartMutation, {
    "metadata": null,
    "owner": ownerId
  }).toPromise();
  // console.log(data);
  return data.createCart;
}

const newGuestSession = async (metadata:any) => {
    const NewGuestSessionMutation = gql`
      mutation GuestSession($metadata: JSON) {
        guestSession(metadata: $metadata) {
          session {
            id
            userId
            fresh
            expiresAt
          }
          user {
            id
            email
            metadata
          }
          cookie
        }
      }
    `;

    let { data } = await client.mutation(NewGuestSessionMutation, { metadata }).toPromise();

  return data.guestSession;
}

const signOut = async (email: string) => {

  const SignoutMutation = gql`
      mutation Signout($email: String!) {
        signout(email: $email) {
          id
          email
          message
        }
      }
    `;
    let { data } = await client.mutation(SignoutMutation, {
      "email": email
    }).toPromise();
    return data.signout;
}

const getCart = async (cartId: string) => {
  const GetCartQuery = gql`
    query GetCart($cartId: String!) {
      getCart(cartId: $cartId) {
        id
        owner
        metadata
        items
      }
    }
  `;

  let { data } = await client.query(GetCartQuery, {
    "cartId": cartId
  }).toPromise();
  return data.getCart;
}

const updateCart = async (args:any) => {

  console.log("update cart")
  // first retrieve the server's cart data

  let _cart = await getCart(args.cartId);

  // then we updates the field provided in args to the _cart object

  if (args.items) _cart.items = args.items;
  if (args.owner) _cart.owner = args.owner;
  if (args.metadata) _cart.metadata = args.metadata;

  

  _cart.cartId = args.cartId;
  delete _cart.id;

  // console.log('after',_cart);

  // then we send the updated cart object to the server

  const UpdateCartMutation = gql`
    mutation UpdateCart($cartId: String!, $items: JSON, $owner: String, $metadata: JSON) {
      updateCart(cartId: $cartId, items: $items, owner: $owner, metadata: $metadata) {
        id
        owner
        metadata
        items
      }
    }
  `;

  let {data} = await client.mutation(UpdateCartMutation, _cart).toPromise();
  return data.updateCart;
}


const updateCartStatus = async (cartId: string, status: string) => {
  const UpdateCartMutation = gql`
    mutation UpdateCart($cartId: String!, $status: String) {
      updateCart(cartId: $cartId, status: $status) {
        id
        owner
        metadata
        items
      }
    }
  `;
  let { data } = await client.mutation(UpdateCartMutation, {
    "cartId": cartId,
    "status": status
  }).toPromise();
  return data.updateCart;
}

const getFormById = async (formId: number) => {
  const GetFormByIdQuery = gql`
    query GetFormById($formId: Int!) {
      getFormById(formId: $formId) {
        id
        name
        description
        createdAt
        schema
        metadata
      }
    }
  `;
  let { data } = await client.query(GetFormByIdQuery, {
    "formId": formId
  }).toPromise();
  return data.getFormById;
}

const getProductsByIds = async (productIds: number[]) => {
  const GetProductsByIdsQuery = gql`
    query ProductsByIds($productIds: [Int!]!) {
      productsByIds(productIds: $productIds) {
        id
        name
        media
        price
        status
        metadata {
          id
          key
          type
          value
        }
      }
    }
  `;
  let { data } = await client.query(GetProductsByIdsQuery, {
    "productIds": productIds
  }).toPromise();
  return data.productsByIds;
}

const createTx = async (args: any) => {
  const CreateTxMutation = gql`
    mutation CreateTx(
      $entries: [EntryInput],
      $form: JSON,
      $metadata: [MetadataInput],
      $paymentType: String,
      $paymentMetadata: JSON,
      $status: String,
      $ownerId: String
    ) {
      createTx(
        entries: $entries,
        form: $form,
        metadata: $metadata,
        payment_type: $paymentType,
        payment_metadata: $paymentMetadata,
        status: $status,
        owner_id: $ownerId
      ) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;

  let payload = {...args};

  payload.entries = args.entries.map((entry: any) => {
    return {
      ...entry,
      entry_id: String(entry.entry_id),
    }
  })

  let _metadata = []

  for(let key of Object.keys(args.metadata)){
    _metadata.push({
      type: 'attribute',
      key: key,
      value: args.metadata[key]
    })
  }

  payload.metadata = _metadata;
  // payload.paymentMetadata = args.paymentMetadata ? args.paymentMetadata : undefined

  // console.log(JSON.stringify(payload));

  let result = await client.mutation(CreateTxMutation, payload).toPromise();
  console.log(result);
  return result.data.createTx;
};

const updateTx = async (uuid: string, status: string, paymentType: string, paymentMetadata: any) => {
  const UpdateTxMutation = gql`
    mutation UpdateTx($uuid: String!, $status: String, $paymentType: String, $paymentMetadata: JSON) {
      updateTx(uuid: $uuid, status: $status, payment_type: $paymentType, payment_metadata: $paymentMetadata) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;
  let result = await client.mutation(UpdateTxMutation, {
    "uuid": uuid,
    "status": status,
    "paymentType": paymentType,
    "paymentMetadata": paymentMetadata
  }).toPromise();

  console.log(result);

  return result.data.updateTx;
};


const getTxByUUID = async (uuid: string) => {
  const GetTxByUUIDQuery = gql`
    query GetTxByUUID($uuid: String!) {
      getTxByUUID(uuid: $uuid) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;
  let { data } = await client.query(GetTxByUUIDQuery, {
    "uuid": uuid
  }).toPromise();
  return data.getTxByUUID;
};

const getTxByID = async (ownerId: string) => {
  const GetTxByOwner = gql`
    query GetTxByOwner($ownerId: String!) {
      getTxByOwner(owner_id: $ownerId) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;
  let { data } = await client.query(GetTxByOwner, {
    "ownerId": ownerId
  }).toPromise();
  return data.GetTxByOwner;
};

const uploadPaymentProof = async (base64Data: string, extension: string) => {
  const UploadPaymentProofMutation = gql`
    mutation UploadPaymentProof($base64Data: String!, $extension: String!) {
      uploadPaymentProof(base64_data: $base64Data, extension: $extension) {
        url
        message
      }
    }
  `;
  let { data } = await client.mutation(UploadPaymentProofMutation, {
    "base64Data": base64Data,
    "extension": extension
  }).toPromise();

  return data.uploadPaymentProof;
};

const getStripePI = async (amount: number, currency: string, prodMode: boolean, metadata: any) => {
  const GetStripePIMutation = gql`
    mutation GetStripePI($amount: Int!, $currency: String!, $prodMode: Boolean!, $metadata: JSON) {
      getStripePI(amount: $amount, currency: $currency, prod_mode: $prodMode, metadata: $metadata)
    }
  `;
  let { data } = await client.mutation(GetStripePIMutation, {
    "amount": amount,
    "currency": currency,
    "prodMode": prodMode,
    "metadata": metadata
  }).toPromise();
  return data.getStripePI;
};

export {
  client,
  getProducts,
  getBookProducts,
  signUp,
  signOut,
  validateSession,
  getUserData,
  newCart,
  newGuestSession,
  updateCart,
  updateCartStatus,
  login,
  getFormById,
  getProductsByIds,
  getCart,
  createTx,
  updateTx,
  getTxByUUID,
  uploadPaymentProof,
  getStripePI,
  getTxByID
};

