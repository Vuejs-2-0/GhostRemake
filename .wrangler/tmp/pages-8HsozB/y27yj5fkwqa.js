// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_astro/*",
    "/favicon.svg",
    "/img\\bracelet.jpeg",
    "/img\\bracelet2.jpg",
    "/img\\ghostBook.png",
    "/img\\horizontal.png",
    "/img\\profile.png",
    "/img\\profile2.png",
    "/img\\temporaryimg.png"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\Users\\Goh JiaLe\\Desktop\\OSProject\\GhostRemake\\GhostRemake\\.wrangler\\tmp\\pages-8HsozB\\bundledWorker-0.7066004732014253.mjs";
import { isRoutingRuleMatch } from "C:\\Users\\Goh JiaLe\\Desktop\\OSProject\\GhostRemake\\GhostRemake\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "C:\\Users\\Goh JiaLe\\Desktop\\OSProject\\GhostRemake\\GhostRemake\\.wrangler\\tmp\\pages-8HsozB\\bundledWorker-0.7066004732014253.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (worker.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return worker.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=y27yj5fkwqa.js.map
