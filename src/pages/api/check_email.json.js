import { getUser } from '../../lib/tarpit_gql';

export async function POST({request}) {
    
    const body = await request.json();
    let { email } = body    
    console.log(email);

    let exist = false

    try {
      let data = await getUser(email);
      console.log(data);
      if(data.user.email){
        exist = true
      }
    } catch (error) {
      console.log(error);
    }
  
    // if (!product) {
    //   return new Response(null, {
    //     status: 404,
    //     statusText: 'Not found'
    //   });
    // }
  
    return new Response(
      JSON.stringify({
        exist
      }), {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }