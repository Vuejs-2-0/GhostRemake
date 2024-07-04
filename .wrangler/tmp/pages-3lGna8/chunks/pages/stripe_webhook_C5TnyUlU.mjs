globalThis.process ??= {}; globalThis.process.env ??= {};
import { u as updateTx } from './cart_wsY3d6O-.mjs';

const POST = async ({ request }) => {
  const body = await request.json();
  console.log(body);
  try {
    let metadata = body.data.object.metadata;
    let status = body.data.status;
    let tx_status = status === "paid" ? "paid" : "rejected";
    let result = await updateTx(metadata.tx_uuid, tx_status, "stripe", body);
    return new Response(JSON.stringify(result), {
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
