import { Client, fetchExchange } from '@urql/core';
import { gql } from '@urql/core';

const client = new Client({
  url: 'https://gql.tipr.at',
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

const getUserData = async (userId: string) => {
  
  const GetUserQuery = gql`
    query GetUserByID($userId: String!) {
      getUserByID(userID: $userId) {
        user {
          id
          email
          metadata
        }
      }
      getCartByOwner(ownerId: $userId) {
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
    "userId": userId
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
  console.log(data);
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

export {
    client,
    getProducts,
    signUp,
    signOut,
    validateSession,
    getUserData,
    newCart,
    newGuestSession
}