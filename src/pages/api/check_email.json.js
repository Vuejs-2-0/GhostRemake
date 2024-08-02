import { getUser } from '../../lib/tarpit_gql';

export async function POST({request}) {
    
    const body = await request.json();
    console.log(body);

    let data = await getUser(body);
  
    // if (!product) {
    //   return new Response(null, {
    //     status: 404,
    //     statusText: 'Not found'
    //   });
    // }
  
    return new Response(
      JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }