globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderTemplate, a as renderHead, b as renderComponent } from '../../renderers.mjs';
import '../kleur_BcFxsYqz.mjs';
/* empty css                            */
import { _ as _export_sfc } from './history_DRfg9yQZ.mjs';
import { u as useSSRContext, a as ref } from '../@vue_BQBbmbrb.mjs';

const _sfc_main = {
  __name: 'SignUp',
  setup(__props, { expose: __expose }) {
  __expose();

    const email = ref('');
    
const __returned__ = { email, ref };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h2 data-v-1a02dbcc>Sign Up Form</h2><form action="/action_page.php" method="post" data-v-1a02dbcc><div class="imgcontainer" data-v-1a02dbcc><img src="img/img_avatar2.png" alt="Avatar" class="avatar" data-v-1a02dbcc></div><div class="container" data-v-1a02dbcc><label for="uname" data-v-1a02dbcc><b data-v-1a02dbcc>Username</b></label><input type="text" placeholder="Enter Username" name="uname" required data-v-1a02dbcc><label for="psw" data-v-1a02dbcc><b data-v-1a02dbcc>Password</b></label><input type="password" placeholder="Enter Password" name="psw" required data-v-1a02dbcc><label for="confirm_psw" data-v-1a02dbcc><b data-v-1a02dbcc>Confirm Password</b></label><input type="password" placeholder="Enter Confirmed Password" name="psw" required data-v-1a02dbcc><button type="submit" data-v-1a02dbcc>Sign Up</button><label data-v-1a02dbcc><input type="checkbox" checked="checked" name="remember" data-v-1a02dbcc> Remember me </label></div></form><a href="/login" data-v-1a02dbcc><button data-v-1a02dbcc>Login</button></a><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/SignUp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const SignUp = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-1a02dbcc"]]);

const $$Setting = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ghost Remake</title>${renderHead()}</head> <body> <h1>Setting</h1> ${renderComponent($$result, "SignUp", SignUp, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/SignUp.vue", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/setting.astro", void 0);

const $$file = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/setting.astro";
const $$url = "/setting";

export { $$Setting as default, $$file as file, $$url as url };
