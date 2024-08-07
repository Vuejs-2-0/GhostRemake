import { updateTx } from "../../lib/tarpit_gql";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  try {
    let metadata = body.data.object.metadata;
    let status = body.data.object.status;

    console.log(body.data,"DATA");

    let tx_status = status === "succeeded" ? "paid" : "rejected";

    // update the tx status to paid
    
    let result = await updateTx(metadata.tx_uuid, tx_status, "stripe", body);

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);

    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }
};
