globalThis.process ??= {}; globalThis.process.env ??= {};
import { u as updateTx } from './cart_C5DUbUDf.mjs';

const POST = async ({ request, redirect }) => {
  const body = await request.json();
  console.log(body);
  let metadata = body.data.object.metadata;
  let result = await updateTx(
    metadata.tx_uuid,
    "paid",
    "stripe",
    body
  );
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { POST };
