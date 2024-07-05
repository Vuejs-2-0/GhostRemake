globalThis.process ??= {}; globalThis.process.env ??= {};
import { k as uploadPaymentProof } from './cart_wsY3d6O-.mjs';

const POST = async ({ request }) => {
  const { base64_data, extension } = await request.json();
  try {
    let response = await uploadPaymentProof(base64_data, extension);
    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.log(err);
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
};

export { POST };
