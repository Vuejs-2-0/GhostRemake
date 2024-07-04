globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../renderers.mjs';

const page = () => import('./pages/checkout_1_BOzdsmWh.mjs').then(n => n.c);

export { page };
