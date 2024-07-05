globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, b as renderComponent, e as createAstro, m as maybeRenderHead } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
import { $ as $$Layout } from './checkout_1_BOzdsmWh.mjs';

const $$Astro = createAstro();
const $$Complete = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Complete;
  const tx_id = Astro2.url.searchParams.get("tx") || "";
  const redirect_status = Astro2.url.searchParams.get("redirect_status") || "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "complete" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>tx_id: ${tx_id}</p> ${redirect_status === "failed" ? renderTemplate`<p>failed</p>` : renderTemplate`<p>complete</p>
<br>
    ${renderComponent($$result2, "Status", null, { "client:only": "vue", "tx": tx_id, "client:component-hydration": "only", "client:component-path": "@/components/Complete/Status.vue", "client:component-export": "default" })}`}` })}`;
}, "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/complete.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Documents/GitHub/GhostRemake/src/pages/complete.astro";
const $$url = "/complete";

export { $$Complete as default, $$file as file, $$url as url };
