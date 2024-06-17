globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, a as renderHead, b as renderComponent, d as renderSlot, e as createAstro, m as maybeRenderHead, f as addAttribute } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
/* empty css                          */
import { g as getFormById, a as getProductsByIds } from './cart_C5DUbUDf.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  Astro2.props;
  const { cart } = Astro2.locals;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ghost Remake</title>${renderHead()}</head> <body> ${renderComponent($$result, "CartStore", null, { "client:only": "vue", "user_cart": cart, "client:component-hydration": "only", "client:component-path": "@/components/Product/CartStore.vue", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Checkout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Checkout;
  let form = await getFormById(1);
  let { cart } = Astro2.locals;
  let item_ids = Object.keys(cart.items).map((key) => cart.items[key]);
  let products = await getProductsByIds(item_ids);
  products = products.map((product) => {
    return {
      ...product,
      quantity: cart.items[product.id]
    };
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Checkout" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Checkout</h1> ${products.map(
    (product) => {
      return renderTemplate`<div class="grid grid-cols-4"> <img class="w-12 h-12 object-cover"${addAttribute(`${product.media.image}`, "src")}> <h2>${product.name}</h2> <p>RM ${product.price}</p> <p>Quantity: ${product.quantity}</p> </div>`;
    }
  )}<div class="p-4"> ${renderComponent($$result2, "CheckoutVue", null, { "client:only": "vue", "cart": cart, "products": products, "json_schema": form.schema.definitions.zodSchema, "field_config": form.metadata.field_config, "client:component-hydration": "only", "client:component-path": "@/components/Checkout/Checkout.vue", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/checkout.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/checkout.astro";
const $$url = "/checkout";

const checkout = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, checkout as c };
