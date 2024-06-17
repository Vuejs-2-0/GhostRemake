globalThis.process ??= {}; globalThis.process.env ??= {};
import './cart_C5DUbUDf.mjs';

const POST = async ({ request, cookies, redirect }) => {
  const { email, signature, destination } = await request.json();
  console.log(request);
  return redirect(destination, 307);
};

export { POST };
