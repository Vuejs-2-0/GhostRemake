globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as getStripePI } from './cart_wsY3d6O-.mjs';

const POST = async ({ request }) => {
  const { amount, currency, prodMode, metadata } = await request.json();
  let result = await getStripePI(amount, currency, prodMode, metadata);
  return new Response(
    JSON.stringify(result),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export { POST };
