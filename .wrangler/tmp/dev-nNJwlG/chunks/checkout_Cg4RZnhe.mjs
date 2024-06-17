globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../renderers.mjs';

const page = () => import('./pages/checkout_5MIZC1oE.mjs').then(n => n.c);

export { page };
