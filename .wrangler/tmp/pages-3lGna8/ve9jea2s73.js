// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_astro/*",
    "/favicon.svg",
    "/img\\book6.png",
    "/img\\bracelet.jpeg",
    "/img\\bracelet.webp",
    "/img\\bracelet2.jpg",
    "/img\\bracelet2.webp",
    "/img\\ghostBook.png",
    "/img\\horizontal.png",
    "/img\\horizontal.webp",
    "/img\\img_avatar2.png",
    "/img\\profile.png",
    "/img\\profile.webp",
    "/img\\profile2.png",
    "/img\\profile2.webp",
    "/img\\temporaryimg.png",
    "/img\\temporaryimg.webp"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\Users\\Goh JiaLe\\Documents\\GitHub\\GhostRemake\\.wrangler\\tmp\\pages-3lGna8\\bundledWorker-0.7936555542019335.mjs";
import { isRoutingRuleMatch } from "C:\\Users\\Goh JiaLe\\Documents\\GitHub\\GhostRemake\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "C:\\Users\\Goh JiaLe\\Documents\\GitHub\\GhostRemake\\.wrangler\\tmp\\pages-3lGna8\\bundledWorker-0.7936555542019335.mjs";
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
//# sourceMappingURL=ve9jea2s73.js.map
