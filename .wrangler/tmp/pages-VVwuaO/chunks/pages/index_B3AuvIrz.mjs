globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, b as addAttribute, a as renderHead, d as renderSlot$1, e as createAstro, f as renderComponent, m as maybeRenderHead } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
/* empty css                        */
import { u as useSSRContext, s as ssrRenderAttrs, d as defineComponent, a as ssrRenderComponent, w as withCtx, b as ssrRenderSlot, e as renderSlot, m as mergeProps, f as createVNode, g as ref } from '../@vue_Cx2Q9T9c.mjs';
/* empty css                          */
import { I as Icon } from '../@iconify_CuhFlhnE.mjs';
import { O } from '../radix-vue_DfB_oA6P.mjs';
import { c as cva } from '../class-variance-authority_psgmYkVi.mjs';
import { c as clsx } from '../clsx_CNI3IGC6.mjs';
import { t as twMerge } from '../tailwind-merge_TY4lI7Gs.mjs';
import { N } from '../vue-easy-lightbox_DhiRbhu2.mjs';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$3 = {};

function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-d4c9b45a><div class="navbar flex justify-between items-center p-4 text-lg text-[#B551F3]" data-v-d4c9b45a><a href="/history" class="logo" data-v-d4c9b45a><button class="menu-icon" data-v-d4c9b45a><p data-v-d4c9b45a>账户设置</p></button></a><a href="/history" data-v-d4c9b45a><button class="profile-icon text-lg text-[#B551F3]" data-v-d4c9b45a><p data-v-d4c9b45a>购买记录</p></button></a></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/TopNavbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};
const TopNavbar = /*#__PURE__*/_export_sfc(_sfc_main$3, [['ssrRender',_sfc_ssrRender$3],['__scopeId',"data-v-d4c9b45a"]]);

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

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot$1($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/layouts/Layout.astro", void 0);

const $$MainText = createComponent(($$result, $$props, $$slots) => {
  const profileImg = "/img/profile2.png";
  const profileName = "\u771F\u7684\u53CB\u9B3C";
  const profileDetails = "\u63ED\u5F00\u795E\u79D8\u7684\u7075\u5F02\u4E16\u754C\uFF0C\u6709\u8DA3\u7684\u9B3C\u6545\u4E8B\u96C6\u5C31\u5728\u300A\u771F\u7684\u53CB\u9B3C\u300B";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Layout" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="profile-container text-center pt-4 flex flex-col items-center"> <img class="profile-img mx-auto rounded-[20px] w-[111px] h-[111px] object-cover"${addAttribute(profileImg, "src")} alt="Profile Image"> <h2 class="profile-name text-2xl mt-2 font-semibold pt-4">${profileName}</h2> <p class="text-lg w-[247px] text-center pt-3">${profileDetails}</p> </div> ` })}`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/MainText.astro", void 0);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "About",
  setup(__props, { expose: __expose }) {
    __expose();
    const visible = ref(false);
    const imgSrc = ref("");
    const showLightbox = (src) => {
      imgSrc.value = src;
      visible.value = true;
    };
    const __returned__ = { visible, imgSrc, showLightbox, get VueEasyLightbox() {
      return N;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h1 class="title" data-v-06090731>\u5173\u4E8E</h1><div class="section section-large" data-v-06090731><img src="img/horizontal.png" alt="Horizontal" class="object-cover cursor-pointer" data-v-06090731></div><div class="section-row" data-v-06090731><div class="section section-small section-col" data-v-06090731><img src="img/temporaryimg.png" alt="Temporary" class="object-cover cursor-pointer" data-v-06090731></div><div class="section section-small section-col" data-v-06090731><img src="img/temporaryimg.png" alt="Temporary" class="object-cover cursor-pointer" data-v-06090731></div></div><div class="section section-large" data-v-06090731><img src="img/horizontal.png" alt="Horizontal" class="object-cover cursor-pointer" data-v-06090731></div>`);
  _push(ssrRenderComponent($setup["VueEasyLightbox"], {
    visible: $setup.visible,
    imgs: [$setup.imgSrc],
    onHide: ($event) => $setup.visible = false
  }, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const About = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-06090731"]]);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ghost Remake</title>${renderHead()}</head> <body> <div class="bg-[#F6EAFF]"> <div class="container"> ${renderComponent($$result, "TopNavbar", TopNavbar, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/TopNavbar.vue", "client:component-export": "default" })} ${renderComponent($$result, "MainText", $$MainText, {})} ${renderComponent($$result, "Main", Main, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Main.vue", "client:component-export": "default" })} </div> </div> <div class="sticky top-0 z-20"> ${renderComponent($$result, "Navbar", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Navbar.vue", "client:component-export": "default" })} </div> <div class="bg-[#FFFFFF]"> <div class="container"> <div id="mainSection" class=" border-b border-gray-200"> ${renderComponent($$result, "ProductList", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/ProductList.vue", "client:component-export": "default" })} </div> <div id="braceletSection" class=" border-b border-gray-200 pb-6"> ${renderComponent($$result, "Bracelet", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Bracelet.vue", "client:component-export": "default" })} </div> <div id="aboutSection"> ${renderComponent($$result, "About", About, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/About.vue", "client:component-export": "default" })} </div> <div class="pb-[80px] text-center"> <p>© 真的友鬼 2024</p> </div> </div> <!-- Accept quantity from ProductList.vue and pass as count to Footer --> ${renderComponent($$result, "Footer", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Footer.vue", "client:component-export": "default" })} </div> </body></html>`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/index.astro", void 0);
const $$file = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
