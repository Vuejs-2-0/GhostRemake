globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, b as renderComponent, e as createAstro, m as maybeRenderHead } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
import { $ as $$Layout } from './checkout_5MIZC1oE.mjs';
import { d as getTxByUUID } from './cart_C5DUbUDf.mjs';

const $$Astro = createAstro();
const $$Pay = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pay;
  const tx_id = Astro2.url.searchParams.get("tx") || "";
  let tx = await getTxByUUID(tx_id);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pay" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>pay</p>  ${renderComponent($$result2, "PaymentForm", null, { "client:only": "vue", "uuid": tx_id, "tx": tx, "client:component-hydration": "only", "client:component-path": "@/components/Pay/PaymentForm.vue", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/pay.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/pay.astro";
const $$url = "/pay";

export { $$Pay as default, $$file as file, $$url as url };
