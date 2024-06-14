import { uploadPaymentProof } from '../../lib/tarpit_gql'
import type { APIRoute } from 'astro';

export const POST:APIRoute = async ({request, redirect }) => {
    
    const { base64_data, extension } = await request.json();

    let response = await uploadPaymentProof(base64_data, extension);

    return new Response(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
    return new Response(null, {
        status: 404,
        statusText: 'Not found'
      });
  }