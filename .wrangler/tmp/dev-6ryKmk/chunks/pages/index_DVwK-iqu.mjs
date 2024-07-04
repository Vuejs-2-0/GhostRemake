globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as renderComponent, f as addAttribute, e as createAstro, g as renderTransition } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
import { O } from '../radix-vue_C_n2XPsT.mjs';
import { c as cva } from '../class-variance-authority_psgmYkVi.mjs';
import { c as clsx } from '../clsx_CNI3IGC6.mjs';
import { t as twMerge } from '../tailwind-merge_TY4lI7Gs.mjs';
import { u as useSSRContext, d as defineComponent, s as ssrRenderComponent, w as withCtx, m as mergeProps, a as ssrRenderSlot, b as renderSlot, e as ref } from '../@vue_gmVJm0w8.mjs';
/* empty css                               */
import { $ as $$Layout } from './checkout_1_BOzdsmWh.mjs';
import { b as getBookProducts, g as getFormById, s as signOut, c as signUp, l as login } from './cart_wsY3d6O-.mjs';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props, get Primitive() {
      return O;
    }, get buttonVariants() {
      return buttonVariants;
    }, get cn() {
      return cn;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["Primitive"], mergeProps({
    as: $props.as,
    "as-child": $props.asChild,
    class: $setup.cn($setup.buttonVariants({ variant: $props.variant, size: $props.size }), $setup.props.class)
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/button/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Button = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded px-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const $$Astro$1 = createAstro();
const $$ProductList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductList;
  const { products } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="max-w-sm w-full "> <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5"> <div class="w-full h-48 rounded-xl bg-gray-100/50"></div> <div class="w-full flex justify-between items-center mt-4"> <div class="col-span-3"> <strong class="text-salmon-400 text-2xl tracking-wide">真的友鬼7</strong> <p>RM 25.00</p> </div> <div class="flex justify-center items-center"> ${renderComponent($$result, "Button", Button, { "class": "w-full p-2 px-5 bg-salmon-500 rounded-xl min-h-0 h-auto text-white space-x-2 hover:bg-salmon-100 hover:text-salmon-500 pl-3 text-lg" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "iconify-icon", "iconify-icon", { "class": "text-xl", "icon": "material-symbols:add" })} <span>选购</span> ` })} </div> </div> </article> ${products.filter((product) => product.id != 9).map((product) => renderTemplate`<div class="w-full grid grid-cols-10 gap-2 mt-4 justify-center items-center"> <img${addAttribute(product.media.image, "src")} alt="Product Image" class="w-full col-span-2 aspect-square bg-white rounded-xl object-cover"> <div class="col-span-5"> <h3 class="text-lg font-semibold">${product.name}</h3> <p>RM ${product.price}.00</p> </div> <div class="col-span-3">  ${renderComponent($$result, "AddButton", null, { "client:only": "vue", "product": product, "client:component-hydration": "only", "client:component-path": "@/components/Product/AddButton.vue", "client:component-export": "default" })} </div> </div>`)} </div>`;
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/components/ProductList.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const products = await getBookProducts();
  let form = await getFormById(1);
  let form2 = await getFormById(3);
  let info = [1, 1, 1];
  const { cart, user } = Astro2.locals;
  const { session } = Astro2.locals;
  const userExist = ref(false);
  if (session && session.user_id && session.user_id.startsWith("guest")) {
    userExist.value = false;
  } else if (session && session.user_id) {
    userExist.value = true;
  }
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const operation = String(data.get("operation"));
      if (operation == "logout") {
        await signOut(user?.email);
        Astro2.cookies.delete("auth_session");
        return Astro2.redirect("/");
      }
      if (operation === "signup") {
        const email = String(data.get("email"));
        const password = String(data.get("password"));
        const encoder = new TextEncoder();
        const encoded_data = encoder.encode(String(password));
        let password_signature = await crypto.subtle.digest(
          "SHA-256",
          encoded_data
        );
        const hashArray = Array.from(new Uint8Array(password_signature));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        let result = await signUp(email, hashHex);
        if (result) {
          const { user: user2, session: session2, cookie } = result;
          console.log(user2, session2, cookie);
          Astro2.cookies.set(cookie.name, cookie.value, cookie.attributes);
          return Astro2.redirect("/");
        }
      }
      if (operation == "login") {
        const email = String(data.get("email"));
        const password = String(data.get("password"));
        const encoder = new TextEncoder();
        const encoded_data = encoder.encode(String(password));
        let password_signature = await crypto.subtle.digest(
          "SHA-256",
          encoded_data
        );
        const hashArray = Array.from(new Uint8Array(password_signature));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        console.log(email, hashHex);
        let result = await login(email, hashHex);
        if (result) {
          const { user: user2, session: session2, cookie } = result;
          console.log(user2, session2, cookie);
          Astro2.cookies.set(cookie.name, cookie.value, cookie.attributes);
          return Astro2.redirect("/");
        } else {
          console.error("Login failed: No result returned");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in POST operation:", error.message);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="w-full"${addAttribute(renderTransition($$result2, "wwdvwa7n"), "data-astro-transition-scope")}> ${renderComponent($$result2, "CartFooterVue", null, { "client:only": "vue", "form": form, "products": products, "userExist": userExist.value, "email": user.email, "client:component-hydration": "only", "client:component-path": "@/components/CartFooter.vue", "client:component-export": "default" })} <!-- <CartStore client:only="vue" user_cart={cart} /> --> <section class="mb-12 w-full"> <div class="w-full flex justify-center items-center"> <p class="w-[60%] sm:w-full text-lg text-salmon-300 text-center">揭开神秘的灵异世界，有趣的鬼故事集就在《真的友鬼》</p> </div> <div class="w-full flex justify-center items-center mt-4 space-x-4"> ${renderComponent($$result2, "Button", Button, { "class": "p-2 px-4 bg-salmon-100 min-h-0 h-auto rounded-full text-salmon-500 space-x-2 pl-3 hover:bg-salmon-500 hover:text-white scale-100 active:scale-95" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "class": "text-lg", "icon": "ic:baseline-facebook" })} <span>专页</span> ` })} ${renderComponent($$result2, "Button", Button, { "class": "p-2 px-4 bg-salmon-100 min-h-0 h-auto rounded-full text-salmon-500 space-x-2 pl-3 hover:bg-salmon-500 hover:text-white scale-100 active:scale-95" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "iconify-icon", "iconify-icon", { "class": "text-lg", "icon": "ri:messenger-fill" })} <span>私讯</span> ` })} </div> </section> <section class="w-full flex flex-col justify-center items-center"> ${renderComponent($$result2, "ProductList", $$ProductList, { "products": products })} </section> <hr class="my-8 border-salmon/10"> <section class="w-full flex flex-col justify-center items-center"> <div class="w-full max-w-sm"> <h2 class="text-2xl font-semibold text-center mb-4">五色绳</h2> <div class="w-full bg-white rounded-xl p-4"> <div class="w-full bg-gray-100/50 aspect-video rounded-md mb-2"> <img src="img/horizontal.webp" alt="Bracelet" class="w-full max-w-[600px] h-auto max-h-[300px] bg-gray-300 rounded-[8px] object-cover"> </div> <p class="py-4">弟者消聽泉筆後造想！爸東早汗丟？苦都抱地娘現海玉采言波法重他校具員蛋。活帶着麻但語卜，歡豆姊世者良目：村每壯喜陽個星，玩寫這斥哭何。</p> <!-- Pass cart as props to Bracelet --> ${renderComponent($$result2, "Bracelet", null, { "client:only": "vue", "cart": cart, "json_schema": form2.schema.definitions.zodSchema, "field_config": form2.metadata.field_config, "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/components/Bracelet/Bracelet.vue", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "class": "w-full p-2.5 px-5 bg-salmon-500 rounded-xl min-h-0 h-auto text-white space-x-2 hover:bg-salmon-100 hover:text-salmon-500 pl-3 text-xl" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "iconify-icon", "iconify-icon", { "class": "text-2xl", "icon": "material-symbols:add" })} <span>订制五色绳</span> ` })} ` })} </div> </div> </section> <hr class="my-8 border-salmon/10"> <section class="w-full flex justify-center items-center "> <div class="w-full max-w-sm flex justify-center items-center flex-col space-y-8"> ${info.map(
    () => renderTemplate`<div class="px-8 w-full"> <div class="w-full aspect-square bg-white shadow-md rounded-xl"></div> </div>`
  )} </div> </section> <section class="w-full flex justify-center items-center pt-12 pb-[10vh]"> <p>© 真的友鬼 2024</p> </section> </main> ` })} <!-- <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>真的友鬼</title>
  </head>
  <body class="bg-salmon-50" data-barba="wrapper">


    

  </body>
</html> -->`;
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/index.astro", "self");

const $$file = "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
