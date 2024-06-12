import { signUp } from '../../lib/tarpit_gql'
import type { APIRoute } from 'astro';

export const POST:APIRoute = async ({request, cookies, redirect }) => {
    // const id = params.id;
    
    const {email, signature, destination} = await request.json();

    console.log(request)

    // let {user,session,cookie} = await signUp(email, signature);

  
    // if (!product) {
    //   return new Response(null, {
    //     status: 404,
    //     statusText: 'Not found'
    //   });
    // }

    // cookies.set(cookie.name, cookie.value, cookie.attributes)
  
    // return new Response(
    //   JSON.stringify({foo:"bar"}), {
    //     status: 200,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   }
    // );

    return redirect(destination, 307)



    // return new Response(null, {
    //     status: 404,
    //     statusText: 'Not found'
    //   });
  }