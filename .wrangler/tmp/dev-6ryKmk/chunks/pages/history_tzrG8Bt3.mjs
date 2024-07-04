globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, a as renderHead, s as spreadAttributes, b as renderComponent, e as createAstro } from '../../renderers.mjs';
/* empty css                               */

const $$Astro = createAstro();
const $$History = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$History;
  const props = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>购买记录</title>${renderHead()}</head> <body> <div class="items-center flex-col mb-16"> <div class="flex justify-start p-4 text-lg border-b mb-8"> <a href="/" class="flex items-center"> <button class="menu-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"${spreadAttributes(props)}> <path fill="currentColor" d="m6.293 13.707l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L4.414 7H14a1 1 0 0 1 0 2H4.414l3.293 3.293a.997.997 0 0 1 0 1.414a.999.999 0 0 1-1.414 0"></path> </svg> </button> </a> <p class="ml-4 font-semibold">购买记录</p> </div> ${renderComponent($$result, "HistoryList", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/components/HistoryList.vue", "client:component-export": "default" })} </div> </body></html>`;
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/history.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/history.astro";
const $$url = "/history";

export { $$History as default, $$file as file, $$url as url };
