import { updateCart } from '../../lib/tarpit_gql';

export async function PUT({request}) {
    
    const body = await request.json();

    let data = await updateCart(body);
  
    return new Response(
      JSON.stringify(data), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }