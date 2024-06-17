globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, a as renderHead, s as spreadAttributes, b as renderComponent, e as createAstro } from '../../renderers.mjs';
/* empty css                          */
import { u as useSSRContext, a as ref, s as ssrRenderAttrs, m as mergeProps, b as ssrRenderList, e as ssrInterpolate } from '../@vue_BQBbmbrb.mjs';
/* empty css                            */

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
  __name: 'HistoryList',
  setup(__props, { expose: __expose }) {
  __expose();

const purchaseHistory = ref([
  {
    date: '2024-06-13',
    orderId: 'ORD123456',
    orderStatus: '已发货',
    trackingId: 'TRK123456',
    productName: 'Product 1',
    productPrice: 100.00,
    productQuantity: 2,
    subtotal: 200.00,
    shippingFee: 10.00,
    totalPrice: 210.00,
  },
  {
    date: '2024-06-14',
    orderId: 'ORD123457',
    orderStatus: '已发货',
    trackingId: 'TRK123457',
    productName: 'Product 2',
    productPrice: 150.00,
    productQuantity: 1,
    subtotal: 150.00,
    shippingFee: 15.00,
    totalPrice: 165.00,
  },
  // Add more dummy data as needed
]);

const __returned__ = { purchaseHistory, ref };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto p-0.5" }, _attrs))} data-v-61b3d4e1><div class="grid gap-4 overflow-y-auto" data-v-61b3d4e1><div class="flex flex-col justify-between" data-v-61b3d4e1><!--[-->`);
  ssrRenderList($setup.purchaseHistory, (order, index) => {
    _push(`<div class="product-card flex justify-between items-center p-4 bg-white" data-v-61b3d4e1><div class="product-info flex-grow" data-v-61b3d4e1><div class="flex justify-between" data-v-61b3d4e1><div class="flex flex-col" data-v-61b3d4e1><p class="text-lg font-semibold" data-v-61b3d4e1>${
      ssrInterpolate(order.date)
    }</p></div><div class="flex flex-col items-end" data-v-61b3d4e1><p class="my-2 font-semibold" data-v-61b3d4e1>订购ID: ${
      ssrInterpolate(order.orderId)
    }</p></div></div><hr data-v-61b3d4e1><div class="flex justify-between items-center space-x-4 my-4" data-v-61b3d4e1><div class="flex items-center space-x-4" data-v-61b3d4e1><img src="/img/profile2.webp" class="w-16 h-16 object-cover rounded-lg" data-v-61b3d4e1><div class="flex flex-col" data-v-61b3d4e1><h3 class="font-semibold text-green-600" data-v-61b3d4e1>${
      ssrInterpolate(order.orderStatus)
    }</h3><h3 class="text-lg font-semibold" data-v-61b3d4e1>${
      ssrInterpolate(order.productName)
    }</h3><p class="text-sm text-gray-500" data-v-61b3d4e1>RM ${
      ssrInterpolate(order.productPrice.toFixed(2))
    }</p></div></div><div class="flex flex-col items-end" data-v-61b3d4e1><p class="font-semibold" data-v-61b3d4e1>Tracking No.: ${
      ssrInterpolate(order.trackingId)
    }</p><p class="font-semibold" data-v-61b3d4e1>x${
      ssrInterpolate(order.productQuantity)
    }</p></div></div><hr data-v-61b3d4e1><div class="flex justify-end" data-v-61b3d4e1><div class="flex flex-col" data-v-61b3d4e1><p class="mt-3 mb-1 mr-8" data-v-61b3d4e1>小计</p><p class="my-1" data-v-61b3d4e1>运费</p><p class="my-1 font-semibold" data-v-61b3d4e1>总计</p></div><div class="flex flex-col" data-v-61b3d4e1><p class="mt-3 mb-1 mr-2" data-v-61b3d4e1>RM</p><p class="my-1" data-v-61b3d4e1>RM</p><p class="my-1 font-semibold" data-v-61b3d4e1>RM</p></div><div class="flex flex-col items-end" data-v-61b3d4e1><p class="mt-3 mb-1" data-v-61b3d4e1>${
      ssrInterpolate(order.subtotal.toFixed(2))
    }</p><p class="my-1" data-v-61b3d4e1>${
      ssrInterpolate(order.shippingFee.toFixed(2))
    }</p><p class="my-1 font-semibold" data-v-61b3d4e1>${
      ssrInterpolate(order.totalPrice.toFixed(2))
    }</p></div></div><hr data-v-61b3d4e1></div></div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/HistoryList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const HistoryList = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-61b3d4e1"]]);

const $$Astro = createAstro();
const $$History = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$History;
  const props = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>购买记录</title>${renderHead()}</head> <body class="bg-gray-100"> <div class="max-w-screen-md mx-auto bg-white p-4 shadow-md rounded-md"> <div class="navbar flex justify-between items-center p-4 text-lg border-b"> <div class="sticky top-0 z-20"> <div class="flex items-center"> <a href="/" class="flex items-center"> <button class="menu-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"${spreadAttributes(props)}> <path fill="currentColor" d="m6.293 13.707l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L4.414 7H14a1 1 0 0 1 0 2H4.414l3.293 3.293a.997.997 0 0 1 0 1.414a.999.999 0 0 1-1.414 0"></path> </svg> </button> </a> <p class="ml-4 font-semibold">购买记录</p> </div> </div> </div> <hr> ${renderComponent($$result, "HistoryList", HistoryList, {})} </div> </body></html>`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/history.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/history.astro";
const $$url = "/history";

const history = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$History,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _export_sfc as _, history as h };
