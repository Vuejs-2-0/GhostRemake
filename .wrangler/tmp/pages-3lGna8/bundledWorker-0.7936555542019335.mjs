// _worker.js/index.js
import { renderers } from "./renderers.mjs";
import { manifest } from "./manifest_Dzvp7J65.mjs";
import { c as createExports, b as serverEntrypointModule } from "./chunks/@astrojs_BQ4w7vyi.mjs";
import { onRequest } from "./_astro-internal_middleware.mjs";
globalThis.process ??= {};
globalThis.process.env ??= {};
var _page0 = () => import("./renderers.mjs").then((n) => n.k);
var _page1 = () => import("./chunks/address_BsomB-2O.mjs");
var _page2 = () => import("./chunks/cart_C3N_tUPB.mjs");
var _page3 = () => import("./chunks/products_BKzK50VJ.mjs");
var _page4 = () => import("./chunks/stripe_pi_Q17J4tzy.mjs");
var _page5 = () => import("./chunks/stripe_webhook_Cbl7uL1S.mjs");
var _page6 = () => import("./chunks/tx_tzjzD6RW.mjs");
var _page7 = () => import("./chunks/upload_CBnsvAGQ.mjs");
var _page8 = () => import("./chunks/checkout_1_DdRYXhLC.mjs");
var _page9 = () => import("./chunks/complete_DqNrQb-t.mjs");
var _page10 = () => import("./chunks/history_CYFPh9gx.mjs");
var _page11 = () => import("./chunks/login_bare_B_-wZNCp.mjs");
var _page12 = () => import("./chunks/pay_BP47ijzn.mjs");
var _page13 = () => import("./chunks/setting_DAqTRWC5.mjs");
var _page14 = () => import("./chunks/index_BCMV0VWz.mjs");
var pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/api/address.json.js", _page1],
  ["src/pages/api/cart.json.js", _page2],
  ["src/pages/api/products.json.js", _page3],
  ["src/pages/api/stripe_pi.json.ts", _page4],
  ["src/pages/api/stripe_webhook.json.ts", _page5],
  ["src/pages/api/tx.json.ts", _page6],
  ["src/pages/api/upload.json.ts", _page7],
  ["src/pages/checkout_1.astro", _page8],
  ["src/pages/complete.astro", _page9],
  ["src/pages/history.astro", _page10],
  ["src/pages/login_bare.astro", _page11],
  ["src/pages/pay.astro", _page12],
  ["src/pages/setting.astro", _page13],
  ["src/pages/index.astro", _page14]
]);
var _manifest = Object.assign(manifest, {
  pageMap,
  renderers,
  middleware: onRequest
});
var _args = void 0;
var _exports = createExports(_manifest);
var __astrojsSsrVirtualEntry = _exports.default;
var _start = "start";
if (_start in serverEntrypointModule) {
  serverEntrypointModule[_start](_manifest, _args);
}
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
//# sourceMappingURL=bundledWorker-0.7936555542019335.mjs.map
