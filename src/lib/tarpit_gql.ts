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

export {
    client,
    getProducts
}