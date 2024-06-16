import { getStripePI } from '../../lib/tarpit_gql'
import type { APIRoute } from 'astro';

export const POST:APIRoute = async ({request, redirect }) => {
    
    // const { cartId, form, dry_run } = await request.json();

    // amount: number, currency: string, prodMode: boolean, metadata: any

    const { amount, currency, prodMode, metadata } = await request.json();

    let result = await getStripePI(amount, currency, prodMode, metadata);

    return new Response(
        JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
  

}