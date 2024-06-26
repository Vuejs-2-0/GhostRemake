import { updateTx } from "../../lib/tarpit_gql";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  console.log(body);

  try {
    let metadata = body.data.object.metadata;
    let status = body.data.status;

    let tx_status = status === "paid" ? "paid" : "rejected";

    // update the tx status to paid

    // let { uuid, status, paymentType, paymentMetadata } = await request.json();

    let result = await updateTx(metadata.tx_uuid, tx_status, "stripe", body);

    // let response = await uploadPaymentProof(base64_data, extension);

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
