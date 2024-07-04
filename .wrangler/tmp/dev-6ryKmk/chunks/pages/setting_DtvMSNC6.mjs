globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, a as renderHead, s as spreadAttributes, b as renderComponent, e as createAstro } from '../../renderers.mjs';
/* empty css                               */

const $$Astro = createAstro();
const $$Setting = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Setting;
  const props = Astro2.props;
  Astro2.locals;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>帐户设置</title>${renderHead()}</head> <body> <div class="items-center flex-col mb-16"> <div class="flex justify-start p-4 text-lg border-b"> <a href="/" class="flex items-center"> <button class="menu-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"${spreadAttributes(props)}> <path fill="currentColor" d="m6.293 13.707l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L4.414 7H14a1 1 0 0 1 0 2H4.414l3.293 3.293a.997.997 0 0 1 0 1.414a.999.999 0 0 1-1.414 0"></path> </svg> </button> </a> <p class="ml-4 font-semibold">帐户设置</p> </div> ${renderComponent($$result, "ProfileSetting", null, { "client:only": "vue", "class": "mt-8", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/components/ProfileSetting.vue", "client:component-export": "default" })} </div> </body></html>`;
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/setting.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/setting.astro";
const $$url = "/setting";

export { $$Setting as default, $$file as file, $$url as url };
