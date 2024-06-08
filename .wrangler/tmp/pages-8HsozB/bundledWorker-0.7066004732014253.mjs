// _worker.js/index.js
import { renderers } from "./renderers.mjs";
import { manifest } from "./manifest_B9LjQenu.mjs";
import { b as createExports, d as serverEntrypointModule } from "./chunks/@astrojs_QbUQH_cR.mjs";
import { onRequest } from "./_noop-middleware.mjs";
globalThis.process ??= {};
globalThis.process.env ??= {};
var _page0 = () => import("./renderers.mjs").then((n) => n.h);
var _page1 = () => import("./chunks/history_Bs-eQTac.mjs");
var _page2 = () => import("./chunks/setting_BvVKrBSu.mjs");
var _page3 = () => import("./chunks/index_CFxq2RUf.mjs");
var pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/history.astro", _page1],
  ["src/pages/setting.astro", _page2],
  ["src/pages/index.astro", _page3]
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
//# sourceMappingURL=bundledWorker-0.7066004732014253.mjs.map
