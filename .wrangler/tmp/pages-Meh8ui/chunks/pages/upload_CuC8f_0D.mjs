globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as uploadPaymentProof } from './cart_C5DUbUDf.mjs';

const POST = async ({ request, redirect }) => {
  const { base64_data, extension } = await request.json();
  let response = await uploadPaymentProof(base64_data, extension);
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { POST };
