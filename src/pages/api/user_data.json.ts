import { updateUserByID } from '../../lib/tarpit_gql'
import type { APIRoute } from 'astro';

export const PUT:APIRoute = async ({request}) => {

    const { uuid,metadata } = await request.json();

    let result = await updateUserByID(uuid,metadata);

    return new Response(
        JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
  

}