globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, a as renderHead, b as renderComponent, d as renderSlot, e as createAstro, m as maybeRenderHead, f as addAttribute } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
/* empty css                               */
/* empty css                        */
import { g as getFormById, a as getProductsByIds } from './cart_wsY3d6O-.mjs';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { cart } = Astro2.locals;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>真的友鬼</title>${renderHead()}</head> <body class="bg-salmon-50" data-barba="wrapper">  ${renderComponent($$result, "CartStore", null, { "client:only": "vue", "user_cart": cart, "client:component-hydration": "only", "client:component-path": "@/components/Product/CartStore.vue", "client:component-export": "default" })} <section class="w-full"> <div class="w-full h-36 overflow-hidden flex justify-center items-center"> <img class="w-full h-full object-cover blur-md scale-150 brightness-75 z-10" src="/img/book6.png" alt=""> </div> <div class="w-full flex justify-center items-center -mt-16"> <div class="w-36 h-36 bg-white rounded-2xl z-20 shadow-xl overflow-hidden"> <img src="/img/book6.png" class="w-full h-full object-cover scale-[160%] translate-y-6 translate-x-2" alt=""> </div> </div> <!-- Accept quantity from ProductList.vue and pass as count to Footer --> <!-- <Footer userID={user.id} /> --> <!-- <Footer client:load /> --> <div class="w-full flex flex-col justify-center items-center pt-8"> <h1 class="text-salmon text-4xl font-semibold mb-4">真的友鬼</h1> </div> </section> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Checkout1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Checkout1;
  let form = await getFormById(1);
  let { cart } = Astro2.locals;
  let item_ids = Object.keys(cart.items).map((id) => parseInt(id));
  let products = await getProductsByIds(item_ids);
  products = products.map((product) => {
    return {
      ...product,
      quantity: cart.items[product.id]
    };
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Checkout" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Checkout</h1> ${cart.id}${products.map(
    (product) => {
      return renderTemplate`<div class="grid grid-cols-4"> <img class="w-12 h-12 object-cover"${addAttribute(`${product.media.image}`, "src")}> <h2>${product.name}</h2> <p>RM ${product.price}</p> <p>Quantity: ${product.quantity}</p> </div>`;
    }
  )}<div class="p-4"> ${renderComponent($$result2, "CheckoutVue", null, { "client:only": "vue", "cart": cart, "products": products, "json_schema": form.schema.definitions.zodSchema, "field_config": form.metadata.field_config, "client:component-hydration": "only", "client:component-path": "@/components/Checkout/Checkout.vue", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/checkout_1.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/checkout_1.astro";
const $$url = "/checkout_1";

const checkout_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout1,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, checkout_1 as c };
