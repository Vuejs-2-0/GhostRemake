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

  let result = await client.mutation(RunProductQuery, {
    "subject": "product",
    "method": "findMany",
    "query": {}
  }).toPromise()

  if (result.error || !result.data) {
    console.error('getProducts error:', result.error);
    return [];
  }

  return result.data.runProductQuery?.result?.result || []

}

const getBookProducts = async () => {

  const RunProductQuery = gql`
  mutation RunProductQuery($subject: String!, $method: String!, $query: JSON!) {
      runProductQuery(subject: $subject, method: $method, query: $query) {
          result
      }
  }
  `;

  let result = await client.mutation(RunProductQuery, {
    "subject": "product",
    "method": "findMany",
    "query": {
      "where": {
        "product_metadata_link": {
          "some": {
            "metadata_id": 7
          }
        }
      },
      "include": {
        "product_metadata_link": {
          "include": {
            "metadata": true
          }
        }
      }
    }
  }).toPromise()

  if (result.error || !result.data) {
    console.error('getBookProducts error:', result.error);
    return [];
  }

  return result.data.runProductQuery?.result?.result || []

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

  let result = await client.mutation(RunSignupQuery, {
    "email": email,
    "signature": signature,
    "metadata": {}
  }).toPromise()

  if (result.error || !result.data) {
    throw new Error(`signUp failed: ${result.error?.message || 'No data'}`);
  }

  return result.data.signup


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
  let result = await client.mutation(ValidateSessionQuery, {
    "sessionId": sessionId
  }).toPromise();

  if (result.error || !result.data) {
    throw new Error(`validateSession failed: ${result.error?.message || 'No data'}`);
  }

  return result.data.validateSession;
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

  let result = await client.mutation(LoginMutation, {
    "email": email,
    "signature": signature,
    "metadata": {}
  }).toPromise();

  if (result.error || !result.data) {
    throw new Error(`login failed: ${result.error?.message || 'No data'}`);
  }

  return result.data.login;
}

const getUser = async (email: string) => {

  const GetUserByEmailQuery = gql`
    query GetUserByEmail($email: String!) {
      getUserByEmail(email: $email) {
        user {
          id
          email
          metadata
        }
      }
    }
  `;
  let result = await client.query(GetUserByEmailQuery, {
    "email": email,
  }).toPromise();

  if (result.error || !result.data) {
    throw new Error(`getUser failed: ${result.error?.message || 'No data'}`);
  }

  return {
    user: result.data.getUserByEmail.user
  };
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
  let result = await client.query(GetUserQuery, {
    "userId": userId,
    "status": "active"
  }).toPromise();

  if (result.error || !result.data) {
    throw new Error(`getUserData failed: ${result.error?.message || 'No data'}`);
  }

  return {
    user: result.data.getUserByID.user,
    cart: result.data.getCartByOwner,
    tx: result.data.getTxByOwner
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
  let result = await client.mutation(CreateCartMutation, {
    "metadata": null,
    "owner": ownerId
  }).toPromise();

  if (result.error || !result.data) {
    throw new Error(`newCart failed: ${result.error?.message || 'No data'}`);
  }

  return result.data.createCart;
}

const newGuestSession = async (metadata: any) => {
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

  let result = await client.mutation(NewGuestSessionMutation, { metadata }).toPromise();

  if (result.error) {
    console.error('newGuestSession GraphQL error:', result.error);
    throw new Error(`Failed to create guest session: ${result.error.message}`);
  }

  if (!result.data?.guestSession) {
    console.error('newGuestSession returned no data:', result);
    throw new Error('Failed to create guest session: No data returned');
  }

  return result.data.guestSession;
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
  let result = await client.mutation(SignoutMutation, {
    "email": email
  }).toPromise();

  if (result.error || !result.data) {
    throw new Error(`signOut failed: ${result.error?.message || 'No data'}`);
  }

  return result.data.signout;
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

  let result = await client.query(GetCartQuery, {
    "cartId": cartId
  }).toPromise();

  if (result.error || !result.data) {
    throw new Error(`getCart failed: ${result.error?.message || 'No data'}`);
  }
  return result.data.getCart;
}

const updateCart = async (args: any) => {

  // console.log("update cart")
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

  let result = await client.mutation(UpdateCartMutation, _cart).toPromise();

  if (result.error || !result.data) {
    throw new Error(`updateCart failed: ${result.error?.message || 'No data'}`);
  }
  return result.data.updateCart;
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
  let result = await client.mutation(UpdateCartMutation, {
    "cartId": cartId,
    "status": status
  }).toPromise();

  if (result.error || !result.data) {
    throw new Error(`updateCartStatus failed: ${result.error?.message || 'No data'}`);
  }
  return result.data.updateCart;
}

const createTxAndUpdateCart = async (tx_args: any, cartId: string) => {
  const CreateTxAndUpdateCartMutation = gql`
    mutation CreateTxAndUpdateCart(
      $entries: [EntryInput],
      $form: JSON,
      $metadata: [MetadataInput],
      $paymentType: String,
      $paymentMetadata: JSON,
      $status: String,
      $ownerId: String,
      $cartId: String!
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
      updateCart(cartId: $cartId, status: "checked_out") {
        id
        owner
        metadata
        items
      }
    }
  `;

  let payload = { ...tx_args };

  payload.entries = tx_args.entries.map((entry: any) => {
    return {
      ...entry,
      entry_id: String(entry.entry_id),
    };
  });

  let _metadata = [];

  for (let key of Object.keys(tx_args.metadata)) {
    _metadata.push({
      type: "attribute",
      key: key,
      value: tx_args.metadata[key],
    });
  }

  payload.metadata = _metadata;

  let result = await client
    .mutation(CreateTxAndUpdateCartMutation, {
      ...payload,
      cartId: cartId,
    })
    .toPromise();

  return {
    createTx: result.data.createTx,
    updateCart: result.data.updateCart,
  };
};


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
  let result = await client.query(GetFormByIdQuery, {
    "formId": formId
  }).toPromise();

  if (result.error || !result.data) {
    console.error('getFormById error:', result.error);
    return null;
  }
  return result.data.getFormById;
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

  let payload = { ...args };

  payload.entries = args.entries.map((entry: any) => {
    return {
      ...entry,
      entry_id: String(entry.entry_id),
    }
  })

  let _metadata = []

  for (let key of Object.keys(args.metadata)) {
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
  // console.log(result);
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

  // console.log(result);

  return result.data.updateTx;
};

const updateUserByID = async (userId: string, metadata: any) => {
  const UpdateUserMutation = gql`
    mutation UpdateUserByID($userId: String!, $metadata: JSON) {
      updateUserByID(userID: $userId, metadata: $metadata) {
        user {
          id
          email
          metadata
        }
      }
    }
  `;
  let { data } = await client.mutation(UpdateUserMutation, {
    "userId": userId,
    "metadata": metadata
  }).toPromise();
  return data.updateUserByID;
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
  getTxByID,
  updateUserByID,
  getUser,
  createTxAndUpdateCart
};

