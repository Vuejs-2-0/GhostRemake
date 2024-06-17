import { uploadPaymentProof } from "../../lib/tarpit_gql";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { base64_data, extension } = await request.json();

  try {
    let response = await uploadPaymentProof(base64_data, extension);

    return new Response(JSON.stringify(response), {
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
