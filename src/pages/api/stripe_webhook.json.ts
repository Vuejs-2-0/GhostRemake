import { updateTx } from '../../lib/tarpit_gql'
import type { APIRoute } from 'astro';

export const POST:APIRoute = async ({request, redirect }) => {
    
    const body = await request.json();

    console.log(body)

    let metadata = body.data.object.metadata

    // update the tx status to paid

    // let { uuid, status, paymentType, paymentMetadata } = await request.json();

  let result = await updateTx(
    metadata.tx_uuid,
    'paid',
    'stripe',
    body
  );


    // let response = await uploadPaymentProof(base64_data, extension);

    return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
    return new Response(null, {
        status: 404,
        statusText: 'Not found'
      });
  }