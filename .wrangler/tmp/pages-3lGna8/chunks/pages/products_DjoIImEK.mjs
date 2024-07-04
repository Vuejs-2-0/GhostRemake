globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as gql } from '../@urql_CifOXjBQ.mjs';
import { e as client } from './cart_wsY3d6O-.mjs';

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
    }).toPromise();

    return data.runProductQuery.result.result
      
};

async function GET() {
    // const id = params.id;
    const product = await getProducts();
  
    if (!product) {
      return new Response(null, {
        status: 404,
        statusText: 'Not found'
      });
    }
  
    return new Response(
      JSON.stringify(product), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

export { GET };
