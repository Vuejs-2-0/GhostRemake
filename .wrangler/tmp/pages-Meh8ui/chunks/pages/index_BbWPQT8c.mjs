globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, b as renderComponent, e as createAstro, a as renderHead } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
import { I as Icon } from '../@iconify_B6WbOEZr.mjs';
import { O } from '../radix-vue_CbNNK-Ng.mjs';
import { c as cva } from '../class-variance-authority_psgmYkVi.mjs';
import { c as clsx } from '../clsx_CNI3IGC6.mjs';
import { t as twMerge } from '../tailwind-merge_TY4lI7Gs.mjs';
import { u as useSSRContext, d as defineComponent, f as ssrRenderComponent, w as withCtx, g as ssrRenderSlot, i as renderSlot, m as mergeProps, s as ssrRenderAttrs, j as createVNode, a as ref } from '../@vue_BQBbmbrb.mjs';
import { _ as _export_sfc } from './history_DRfg9yQZ.mjs';
import { $ as $$Layout } from './checkout_5MIZC1oE.mjs';
/* empty css                          */
/* empty css                          */
import { b as getProducts, s as signOut, c as signUp, l as login } from './cart_C5DUbUDf.mjs';

const $$Astro$1 = createAstro();
const $$ProductList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductList;
  const { products } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div> <div class="product-card flex justify-center items-center p-4 bg-white"> <h3 class="font-bold pl-4 text-[36px]">友鬼系列</h3> </div> <div class="featured-product p-4 m-4 bg-white border border-purple-500 rounded-lg relative flex flex-col items-center"> <span class="absolute top-2 right-2 text-purple-500 border border-purple-500 rounded-full px-2 py-1 text-sm">全新</span> <img src="/img/temporaryimg.webp" alt="Featured Product Image" class="w-[120px] h-[175px] mt-6 object-cover"> <div class="flex justify-between items-center w-full mt-4"> <h3 class="text-[24px] font-semibold">真的友鬼 7</h3> <p class="text-[16px]">RM 25</p> </div> <!-- <Button @click="increaseQuantity(products[6].id)" class="bg-purple-500 text-white py-2 px-4 rounded mt-4 w-full h-[54px] text-[24px]">
        <p>添加至购物车</p>
      </Button> --> </div> ${products.map((product) => renderTemplate`<div class="product-card flex justify-between items-center p-4 bg-white"> <img${addAttribute(product.media.image, "src")} alt="Product Image" class="w-16 h-16 rounded object-cover"> <div class="product-info flex-grow ml-4"> <h3 class="text-lg font-semibold">${product.name}</h3> <p class="text-sm text-gray-500">RM${product.price}</p> </div> <div class="actions flex justify-end items-center"> ${renderComponent($$result, "DetailsButton", null, { "client:only": "vue", "product": product, "client:component-hydration": "only", "client:component-path": "@/components/Product/DetailsButton.vue", "client:component-export": "default" })} ${renderComponent($$result, "AddButton", null, { "client:only": "vue", "product": product, "client:component-hydration": "only", "client:component-path": "@/components/Product/AddButton.vue", "client:component-export": "default" })} </div> </div>`)} </div>`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/ProductList.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/button/Button.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);

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

const _sfc_main$1 = {
  __name: 'Main',
  setup(__props, { expose: __expose }) {
  __expose();


const __returned__ = { get Icon() { return Icon }, get Button() { return Button } };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "social-icons pb-4 flex justify-center space-x-4 mt-4" }, _attrs))}>`);
  _push(ssrRenderComponent($setup["Button"], {
    variant: "outline",
    size: "icon",
    class: "rounded-full"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent($setup["Icon"], {
          icon: "fe:facebook",
          class: "w-[18px] h-[18px]",
          style: {"color":"#1877f2"},
          ssr: true
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode($setup["Icon"], {
            icon: "fe:facebook",
            class: "w-[18px] h-[18px]",
            style: {"color":"#1877f2"},
            ssr: true
          })
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent($setup["Button"], {
    variant: "outline",
    size: "icon",
    class: "rounded-full"
  }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent($setup["Icon"], {
          icon: "hugeicons:instagram",
          class: "w-[18px] h-[18px]",
          style: {"color":"#1877f2"},
          ssr: true
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode($setup["Icon"], {
            icon: "hugeicons:instagram",
            class: "w-[18px] h-[18px]",
            style: {"color":"#1877f2"},
            ssr: true
          })
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent($setup["Button"], { class: "flex items-center space-x-2 bg-[#1877f2] rounded-full p-3 h-[38px]" }, {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<p class="text-[16px] text-white"${_scopeId}>私讯</p>`);
        _push(ssrRenderComponent($setup["Icon"], {
          icon: "mingcute:messenger-line",
          style: {"color":"white","font-size":"16px"},
          ssr: true
        }, null, _parent, _scopeId));
      } else {
        return [
          createVNode("p", { class: "text-[16px] text-white" }, "私讯"),
          createVNode($setup["Icon"], {
            icon: "mingcute:messenger-line",
            style: {"color":"white","font-size":"16px"},
            ssr: true
          })
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Main.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const Main = /*#__PURE__*/_export_sfc(_sfc_main$1, [['ssrRender',_sfc_ssrRender$1]]);

const $$MainText = createComponent(($$result, $$props, $$slots) => {
  const profileImg = "/img/profile2.webp";
  const profileName = "\u771F\u7684\u53CB\u9B3C";
  const profileDetails = "\u63ED\u5F00\u795E\u79D8\u7684\u7075\u5F02\u4E16\u754C\uFF0C\u6709\u8DA3\u7684\u9B3C\u6545\u4E8B\u96C6\u5C31\u5728\u300A\u771F\u7684\u53CB\u9B3C\u300B";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Layout" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="profile-container text-center pt-4 flex flex-col items-center"> <img class="profile-img mx-auto rounded-[20px] w-[111px] h-[111px] object-cover"${addAttribute(profileImg, "src")} alt="Profile Image"> <h2 class="profile-name text-2xl mt-2 font-semibold pt-4">${profileName}</h2> <p class="text-lg w-[247px] text-center pt-3">${profileDetails}</p> </div> ` })}`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/MainText.astro", void 0);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "About",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h1 class="title" data-v-dba3c651>\u5173\u4E8E</h1><div class="section section-large" data-v-dba3c651><img src="img/horizontal.webp" alt="Horizontal" class="object-cover cursor-pointer" data-v-dba3c651></div><div class="section-row" data-v-dba3c651><div class="section section-small section-col" data-v-dba3c651><img src="img/temporaryimg.webp" alt="Temporary" class="object-cover cursor-pointer" data-v-dba3c651></div><div class="section section-small section-col" data-v-dba3c651><img src="img/temporaryimg.webp" alt="Temporary" class="object-cover cursor-pointer" data-v-dba3c651></div></div><div class="section section-large" data-v-dba3c651><img src="img/horizontal.webp" alt="Horizontal" class="object-cover cursor-pointer" data-v-dba3c651></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const About = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-dba3c651"]]);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const products = await getProducts();
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
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ghost Remake</title>${renderHead()}</head> <body> <div class="bg-[#F6EAFF]"> <div class="container"> <div class="min-h-[92px]"> ${renderComponent($$result, "TopNavbar", null, { "client:only": "vue", "userExist": userExist.value, "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/TopNavbar.vue", "client:component-export": "default" })} </div> ${renderComponent($$result, "MainText", $$MainText, {})} ${renderComponent($$result, "Main", Main, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Main.vue", "client:component-export": "default" })} ${renderComponent($$result, "CartStore", null, { "client:only": "vue", "user_cart": cart, "client:component-hydration": "only", "client:component-path": "@/components/Product/CartStore.vue", "client:component-export": "default" })} </div> </div> <div class="sticky top-0 z-20 min-h-[56px] bg-[#F6EAFF]"> ${renderComponent($$result, "Navbar", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Navbar.vue", "client:component-export": "default" })} </div> <div class="bg-[#FFFFFF]"> <div class="container"> <div id="mainSection" class="border-b border-gray-200"> ${JSON.stringify(userExist)} ${JSON.stringify(cart)} ${renderComponent($$result, "ProductList", $$ProductList, { "products": products })} </div> <div id="braceletSection" class="border-b border-gray-200 pb-6 min-h-10"> ${renderComponent($$result, "Bracelet", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Bracelet.vue", "client:component-export": "default" })} </div> <div id="aboutSection"> ${renderComponent($$result, "About", About, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/About.vue", "client:component-export": "default" })} </div> <div class="pb-[80px] text-center"> <p>© 真的友鬼 2024</p> </div> </div> <!-- Accept quantity from ProductList.vue and pass as count to Footer --> <!-- <Footer client:only="vue" /> --> </div> </body></html>`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/index.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
