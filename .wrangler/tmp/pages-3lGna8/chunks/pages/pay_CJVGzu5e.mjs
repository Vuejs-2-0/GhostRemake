globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, b as renderComponent, e as createAstro, m as maybeRenderHead } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
import { $ as $$Layout } from './checkout_1_BOzdsmWh.mjs';
import { d as getTxByUUID } from './cart_wsY3d6O-.mjs';

const $$Astro = createAstro();
const $$Pay = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pay;
  const tx_id = Astro2.url.searchParams.get("tx") || "";
  let tx = await getTxByUUID(tx_id);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pay" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="w-full h-full overflow-y-auto relative"> <section class="w-full flex flex-col justify-center items-center"> <div class="w-full max-w-sm py-4 flex justify-between items-center"> <div class="text-left"> <h1 class="text-xl text-salmon">结账</h1> <p class="text-salmon-400">请选择付款方式</p> </div> ${renderComponent($$result2, "CancelButton", null, { "client:only": "vue", "uuid": tx_id, "client:component-hydration": "only", "client:component-path": "@/components/Pay/CancelButton.vue", "client:component-export": "default" })} </div> <div class="w-full max-w-sm"> ${renderComponent($$result2, "ItemList", null, { "client:only": "vue", "tx": tx, "client:component-hydration": "only", "client:component-path": "@/components/Pay/ItemList.vue", "client:component-export": "default" })} </div> </section> <div class="w-full px-4 pt-2 flex flex-col justify-center items-center pb-12"> <div class="w-full max-w-sm"> ${renderComponent($$result2, "PaymentForm", null, { "client:only": "vue", "uuid": tx_id, "tx": tx, "client:component-hydration": "only", "client:component-path": "@/components/Pay/PaymentForm.vue", "client:component-export": "default" })} </div> </div> </main> ` })}`;
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/pay.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/pay.astro";
const $$url = "/pay";

export { $$Pay as default, $$file as file, $$url as url };
