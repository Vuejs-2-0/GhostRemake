globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../renderers.mjs';

const page = () => import('./pages/stripe_webhook_Cew18lxx.mjs');

export { page };
