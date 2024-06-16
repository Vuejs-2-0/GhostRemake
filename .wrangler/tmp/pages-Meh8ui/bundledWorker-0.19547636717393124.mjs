// _worker.js/index.js
import { renderers } from "./renderers.mjs";
import { manifest } from "./manifest_BgjKJpOE.mjs";
import { c as createExports, b as serverEntrypointModule } from "./chunks/@astrojs_DCSmFjgQ.mjs";
import { onRequest } from "./_astro-internal_middleware.mjs";
globalThis.process ??= {};
globalThis.process.env ??= {};
var _page0 = () => import("./renderers.mjs").then((n) => n.j);
var _page1 = () => import("./chunks/address_BsomB-2O.mjs");
var _page2 = () => import("./chunks/cart_ZDCPxiAM.mjs");
var _page3 = () => import("./chunks/products_C5TE89rm.mjs");
var _page4 = () => import("./chunks/signup_4kc9CLOn.mjs");
var _page5 = () => import("./chunks/stripe_pi_BOnVhJIJ.mjs");
var _page6 = () => import("./chunks/stripe_webhook_DwpvqpDB.mjs");
var _page7 = () => import("./chunks/tx_Bn3-_Z7-.mjs");
var _page8 = () => import("./chunks/upload_CfHCt1_S.mjs");
var _page9 = () => import("./chunks/checkout_Cg4RZnhe.mjs");
var _page10 = () => import("./chunks/complete_BpqRJ5Tu.mjs");
var _page11 = () => import("./chunks/history_MUVPxNJt.mjs");
var _page12 = () => import("./chunks/login_bare_CsqMVRtH.mjs");
var _page13 = () => import("./chunks/pay_H7hbv0kO.mjs");
var _page14 = () => import("./chunks/setting_DhYFBctx.mjs");
var _page15 = () => import("./chunks/index_D5ZCxJ11.mjs");
var pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/api/address.json.js", _page1],
  ["src/pages/api/cart.json.js", _page2],
  ["src/pages/api/products.json.js", _page3],
  ["src/pages/api/signup.json.ts", _page4],
  ["src/pages/api/stripe_pi.json.ts", _page5],
  ["src/pages/api/stripe_webhook.json.ts", _page6],
  ["src/pages/api/tx.json.ts", _page7],
  ["src/pages/api/upload.json.ts", _page8],
  ["src/pages/checkout.astro", _page9],
  ["src/pages/complete.astro", _page10],
  ["src/pages/history.astro", _page11],
  ["src/pages/login_bare.astro", _page12],
  ["src/pages/pay.astro", _page13],
  ["src/pages/setting.astro", _page14],
  ["src/pages/index.astro", _page15]
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
//# sourceMappingURL=bundledWorker-0.19547636717393124.mjs.map
