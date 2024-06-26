globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as defineComponent, g as ref, i as reactive, l as computed, n as watch, o as onMounted, p as onBeforeUnmount, f as createVNode, T as Transition, q as Teleport, t as isVNode, v as withModifiers, F as Fragment, x as nextTick } from './@vue_Cx2Q9T9c.mjs';

var define_global_default = {};
function m(e2, t2) {
  void 0 === t2 && (t2 = {});
  var o2 = t2.insertAt;
  if (e2 && "undefined" != typeof document) {
    var l2 = document.head || document.getElementsByTagName("head")[0], n2 = document.createElement("style");
    n2.type = "text/css", "top" === o2 && l2.firstChild ? l2.insertBefore(n2, l2.firstChild) : l2.appendChild(n2), n2.styleSheet ? n2.styleSheet.cssText = e2 : n2.appendChild(document.createTextNode(e2));
  }
}
m(".vel-fade-enter-active,.vel-fade-leave-active{-webkit-transition:all .3s ease;transition:all .3s ease}.vel-fade-enter-from,.vel-fade-leave-to{opacity:0}.vel-img-swiper{display:block;position:relative}.vel-modal{background:rgba(0,0,0,.5);bottom:0;left:0;margin:0;position:fixed;right:0;top:0;z-index:9998}.vel-img-wrapper{left:50%;margin:0;position:absolute;top:50%;-webkit-transform:translate(-50% -50%);transform:translate(-50% -50%);-webkit-transition:.3s linear;transition:.3s linear;will-change:transform opacity}.vel-img,.vel-img-wrapper{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vel-img{background-color:rgba(0,0,0,.7);-webkit-box-shadow:0 5px 20px 2px rgba(0,0,0,.7);box-shadow:0 5px 20px 2px rgba(0,0,0,.7);display:block;max-height:80vh;max-width:80vw;position:relative;-webkit-transition:-webkit-transform .3s ease-in-out;transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;transition:transform .3s ease-in-out,-webkit-transform .3s ease-in-out}@media (max-width:750px){.vel-img{max-height:95vh;max-width:85vw}}.vel-btns-wrapper{position:static}.vel-btns-wrapper .btn__close,.vel-btns-wrapper .btn__next,.vel-btns-wrapper .btn__prev{-webkit-tap-highlight-color:transparent;color:#fff;cursor:pointer;font-size:32px;opacity:.6;outline:none;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:.15s linear;transition:.15s linear;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vel-btns-wrapper .btn__close:hover,.vel-btns-wrapper .btn__next:hover,.vel-btns-wrapper .btn__prev:hover{opacity:1}.vel-btns-wrapper .btn__close.disable,.vel-btns-wrapper .btn__close.disable:hover,.vel-btns-wrapper .btn__next.disable,.vel-btns-wrapper .btn__next.disable:hover,.vel-btns-wrapper .btn__prev.disable,.vel-btns-wrapper .btn__prev.disable:hover{cursor:default;opacity:.2}.vel-btns-wrapper .btn__next{right:12px}.vel-btns-wrapper .btn__prev{left:12px}.vel-btns-wrapper .btn__close{right:10px;top:24px}@media (max-width:750px){.vel-btns-wrapper .btn__next,.vel-btns-wrapper .btn__prev{font-size:20px}.vel-btns-wrapper .btn__close{font-size:24px}.vel-btns-wrapper .btn__next{right:4px}.vel-btns-wrapper .btn__prev{left:4px}}.vel-modal.is-rtl .vel-btns-wrapper .btn__next{left:12px;right:auto}.vel-modal.is-rtl .vel-btns-wrapper .btn__prev{left:auto;right:12px}@media (max-width:750px){.vel-modal.is-rtl .vel-btns-wrapper .btn__next{left:4px;right:auto}.vel-modal.is-rtl .vel-btns-wrapper .btn__prev{left:auto;right:4px}}.vel-modal.is-rtl .vel-img-title{direction:rtl}");
m('.vel-loading{left:50%;position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vel-loading .ring{display:inline-block;height:64px;width:64px}.vel-loading .ring:after{-webkit-animation:ring 1.2s linear infinite;animation:ring 1.2s linear infinite;border-color:hsla(0,0%,100%,.7) transparent;border-radius:50%;border-style:solid;border-width:5px;content:" ";display:block;height:46px;margin:1px;width:46px}@-webkit-keyframes ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}');
m(".vel-on-error{left:50%;position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.vel-on-error .icon{color:#aaa;font-size:80px}");
m(".vel-img-title{bottom:60px;color:#ccc;cursor:default;font-size:12px;left:50%;line-height:1;max-width:80%;opacity:.8;overflow:hidden;position:absolute;text-align:center;text-overflow:ellipsis;-webkit-transform:translate(-50%);transform:translate(-50%);-webkit-transition:opacity .15s;transition:opacity .15s;white-space:nowrap}.vel-img-title:hover{opacity:1}");
m(".vel-icon{fill:currentColor;height:1em;overflow:hidden;vertical-align:-.15em;width:1em}");
m(".vel-toolbar{border-radius:4px;bottom:8px;display:-webkit-box;display:-ms-flexbox;display:flex;left:50%;opacity:.9;overflow:hidden;padding:0;position:absolute;-webkit-transform:translate(-50%);transform:translate(-50%)}.vel-toolbar,.vel-toolbar .toolbar-btn{background-color:#2d2d2d;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vel-toolbar .toolbar-btn{-ms-flex-negative:0;-webkit-tap-highlight-color:transparent;color:#fff;cursor:pointer;flex-shrink:0;font-size:20px;outline:none;padding:6px 10px}.vel-toolbar .toolbar-btn:active,.vel-toolbar .toolbar-btn:hover{background-color:#3d3d3d}");
const g = "vel", f = defineComponent({ name: "SvgIcon", props: { type: { type: String, default: "" } }, setup: (e2) => () => createVNode("svg", { class: `${g}-icon icon`, "aria-hidden": "true" }, [createVNode("use", { "xlink:href": `#icon-${e2.type}` }, null)]) }), h = "undefined" != typeof window, w = () => {
};
let x = false;
if (h)
  try {
    const e2 = {};
    Object.defineProperty(e2, "passive", { get() {
      x = true;
    } }), window.addEventListener("test-passive", w, e2);
  } catch (e2) {
  }
const y = function(e2, t2, o2) {
  let l2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
  h && e2.addEventListener(t2, o2, !!x && { capture: false, passive: l2 });
}, z = (e2, t2, o2) => {
  h && e2.removeEventListener(t2, o2);
}, k = (e2) => {
  e2.preventDefault();
}, _ = Object.prototype.toString, D = (e2) => (t2) => _.call(t2).slice(8, -1) === e2;
const M = (e2) => !!e2 && D("Object")(e2), S = (e2) => !!e2 && D("String")(e2);
function L(e2) {
  return null != e2;
}
const C = defineComponent({ name: "Toolbar", props: { zoomIn: { type: Function, default: w }, zoomOut: { type: Function, default: w }, rotateLeft: { type: Function, default: w }, rotateRight: { type: Function, default: w }, resize: { type: Function, default: w }, rotateDisabled: { type: Boolean, default: false }, zoomDisabled: { type: Boolean, default: false } }, setup: (e2) => () => createVNode("div", { class: `${g}-toolbar` }, [!e2.zoomDisabled && createVNode(Fragment, null, [createVNode("div", { role: "button", "aria-label": "zoom in button", class: "toolbar-btn toolbar-btn__zoomin", onClick: e2.zoomIn }, [createVNode(f, { type: "zoomin" }, null)]), createVNode("div", { role: "button", "aria-label": "zoom out button", class: "toolbar-btn toolbar-btn__zoomout", onClick: e2.zoomOut }, [createVNode(f, { type: "zoomout" }, null)])]), createVNode("div", { role: "button", "aria-label": "resize image button", class: "toolbar-btn toolbar-btn__resize", onClick: e2.resize }, [createVNode(f, { type: "resize" }, null)]), !e2.rotateDisabled && createVNode(Fragment, null, [createVNode("div", { role: "button", "aria-label": "image rotate left button", class: "toolbar-btn toolbar-btn__rotate", onClick: e2.rotateLeft }, [createVNode(f, { type: "rotate-left" }, null)]), createVNode("div", { role: "button", "aria-label": "image rotate right button", class: "toolbar-btn toolbar-btn__rotate", onClick: e2.rotateRight }, [createVNode(f, { type: "rotate-right" }, null)])])]) }), Y = () => createVNode("div", { class: `${g}-loading` }, [createVNode("div", { class: "ring" }, null)]), B = () => createVNode("div", { class: `${g}-on-error` }, [createVNode("div", { class: "ring" }, null), createVNode(f, { type: "img-broken" }, null)]), X = (e2, o2) => {
  let { slots: l2 } = o2;
  return createVNode("div", { class: `${g}-img-title` }, [l2.default ? l2.default() : ""]);
}, E = defineComponent({ name: "DefaultIcons", setup: () => () => createVNode("svg", { "aria-hidden": true, style: "position: absolute; width: 0; height: 0; overflow: hidden; visibility: hidden;" }, [createVNode("symbol", { id: "icon-rotate-right", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M275.199914 450.496179v20.031994c0.384-38.079988 12.543996-67.423979 36.479989-87.967973 22.431993-20.351994 49.215985-30.55999 80.319975-30.55999 32.06399 0 59.295981 10.175997 81.759974 30.55999 22.815993 20.543994 34.591989 49.887984 35.359989 87.967973v123.935961c-0.768 37.887988-12.543996 67.135979-35.359989 87.679973-22.431993 20.351994-49.695984 30.75199-81.759974 31.10399a120.255962 120.255962 0 0 1-72.991978-24.895992c-21.503993-15.839995-35.359989-38.751988-41.567987-68.735979h60.831981c9.247997 23.007993 27.167992 34.495989 53.759983 34.49599 37.535988-0.384 56.863982-21.407993 57.983982-63.071981v-38.751988c-28.095991 8.863997-54.303983 13.119996-78.623975 12.735996a91.263971 91.263971 0 0 1-68.447979-27.711991c-18.847994-18.303994-28.095991-47.231985-27.711991-86.847973z m62.55998 24.863992c7.103998 24.799992 25.215992 37.343988 54.271983 37.663989 27.103992-0.288 44.703986-11.327996 52.831984-33.11999 3.135999-8.383997 2.655999-29.599991-1.28-38.559988-8.607997-19.615994-25.791992-29.695991-51.551984-30.20799-28.383991 0.576-46.303986 12.639996-53.759983 36.159988a58.719982 58.719982 0 0 0-0.512 28.063991z m390.335878 115.711964v-116.895963c-1.12-41.311987-20.447994-62.335981-57.983981-63.07198-37.727988 0.768-56.959982 21.791993-57.695982 63.07198v116.895963c0.768 41.663987 19.999994 62.68798 57.695982 63.071981 37.535988-0.384 56.863982-21.407993 57.983981-63.071981z m-174.815945 3.391999v-123.935961c0.384-38.079988 12.543996-67.423979 36.479989-87.967973 22.431993-20.351994 49.215985-30.55999 80.319975-30.55999 32.06399 0 59.295981 10.175997 81.759974 30.55999 22.815993 20.543994 34.591989 49.887984 35.359989 87.967973v123.935961c-0.768 37.887988-12.543996 67.135979-35.359989 87.679973-22.431993 20.351994-49.695984 30.75199-81.759974 31.10399-31.10399-0.384-57.887982-10.751997-80.319975-31.10399-23.935993-20.543994-36.127989-49.791984-36.479989-87.679973z m282.559912-479.07185A509.887841 509.887841 0 0 0 511.99984 0.00032C229.215928 0.00032 0 229.216248 0 512.00016s229.215928 511.99984 511.99984 511.99984 511.99984-229.215928 511.99984-511.99984c0-3.743999-0.032-7.455998-0.128-11.167997-1.631999-11.295996-8.159997-27.103992-31.87199-27.103991-27.487991 0-31.67999 21.247993-32.03199 32.06399l0.032 4.127999a30.62399 30.62399 0 0 0 0.16 2.079999H959.9997c0 247.423923-200.575937 447.99986-447.99986 447.99986S63.99998 759.424083 63.99998 512.00016 264.575917 64.0003 511.99984 64.0003a446.079861 446.079861 0 0 1 277.439913 96.22397l-94.91197 91.679971c-25.439992 24.607992-17.439995 44.991986 17.887994 45.599986l188.031942 3.295999a64.31998 64.31998 0 0 0 65.055979-62.84798l3.295999-188.127942C969.407697 15.040315 949.311703 5.792318 923.871711 30.368311l-87.999972 85.023973z", fill: "" }, null)]), createVNode("symbol", { id: "icon-rotate-left", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M275.199914 450.496179v20.031994c0.384-38.079988 12.543996-67.423979 36.479989-87.967973 22.431993-20.351994 49.215985-30.55999 80.319975-30.55999 32.06399 0 59.295981 10.175997 81.759974 30.55999 22.815993 20.543994 34.591989 49.887984 35.359989 87.967973v123.935961c-0.768 37.887988-12.543996 67.135979-35.359989 87.679973-22.431993 20.351994-49.695984 30.75199-81.759974 31.10399a120.255962 120.255962 0 0 1-72.991978-24.895992c-21.503993-15.839995-35.359989-38.751988-41.567987-68.735979h60.831981c9.247997 23.007993 27.167992 34.495989 53.759983 34.49599 37.535988-0.384 56.863982-21.407993 57.983982-63.071981v-38.751988c-28.095991 8.863997-54.303983 13.119996-78.623975 12.735996a91.263971 91.263971 0 0 1-68.447979-27.711991c-18.847994-18.303994-28.095991-47.231985-27.711991-86.847973z m62.55998 24.863992c7.103998 24.799992 25.215992 37.343988 54.271983 37.663989 27.103992-0.288 44.703986-11.327996 52.831984-33.11999 3.135999-8.383997 2.655999-29.599991-1.28-38.559988-8.607997-19.615994-25.791992-29.695991-51.551984-30.20799-28.383991 0.576-46.303986 12.639996-53.759983 36.159988a58.719982 58.719982 0 0 0-0.512 28.063991z m390.335878 115.711964v-116.895963c-1.12-41.311987-20.447994-62.335981-57.983981-63.07198-37.727988 0.768-56.959982 21.791993-57.695982 63.07198v116.895963c0.768 41.663987 19.999994 62.68798 57.695982 63.071981 37.535988-0.384 56.863982-21.407993 57.983981-63.071981z m-174.815945 3.391999v-123.935961c0.384-38.079988 12.543996-67.423979 36.479989-87.967973 22.431993-20.351994 49.215985-30.55999 80.319975-30.55999 32.06399 0 59.295981 10.175997 81.759974 30.55999 22.815993 20.543994 34.591989 49.887984 35.359989 87.967973v123.935961c-0.768 37.887988-12.543996 67.135979-35.359989 87.679973-22.431993 20.351994-49.695984 30.75199-81.759974 31.10399-31.10399-0.384-57.887982-10.751997-80.319975-31.10399-23.935993-20.543994-36.127989-49.791984-36.479989-87.679973zM188.159941 115.392284A509.887841 509.887841 0 0 1 511.99984 0.00032c282.783912 0 511.99984 229.215928 511.99984 511.99984s-229.215928 511.99984-511.99984 511.99984S0 794.784072 0 512.00016c0-3.743999 0.032-7.455998 0.128-11.167997 1.631999-11.295996 8.159997-27.103992 31.87199-27.103991 27.487991 0 31.67999 21.247993 32.03199 32.06399L63.99998 509.920161a30.62399 30.62399 0 0 1-0.16 2.079999H63.99998c0 247.423923 200.575937 447.99986 447.99986 447.99986s447.99986-200.575937 447.99986-447.99986S759.423763 64.0003 511.99984 64.0003a446.079861 446.079861 0 0 0-277.439913 96.22397l94.91197 91.679971c25.439992 24.607992 17.439995 44.991986-17.887994 45.599986L123.551961 300.800226a64.31998 64.31998 0 0 1-65.055979-62.84798l-3.295999-188.127942C54.591983 15.040315 74.687977 5.792318 100.127969 30.368311l87.999972 85.023973z", fill: "" }, null)]), createVNode("symbol", { id: "icon-resize", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M456.036919 791.8108 270.553461 791.8108 460.818829 601.572038l-39.593763-39.567157L231.314785 751.915162l0.873903-183.953615c0-15.465227-12.515035-27.981285-27.981285-27.981285s-27.981285 12.515035-27.981285 27.981285l0 251.829516c0 8.3072 3.415796 14.975063 8.826016 19.564591 5.082762 5.192256 12.132318 8.416693 19.947308 8.416693l251.036453 0c15.46625 0 27.981285-12.514012 27.981285-27.981285C484.018204 804.325835 471.504192 791.8108 456.036919 791.8108zM838.945819 184.644347c-5.082762-5.191232-12.132318-8.416693-19.947308-8.416693L567.961034 176.227654c-15.46625 0-27.981285 12.515035-27.981285 27.981285 0 15.46625 12.514012 27.981285 27.981285 27.981285l185.483458 0L563.206754 422.427962l39.567157 39.567157 189.910281-189.910281-0.873903 183.953615c0 15.46625 12.514012 27.981285 27.981285 27.981285s27.981285-12.514012 27.981285-27.981285L847.772858 204.208938C847.771835 195.902762 844.356039 189.234899 838.945819 184.644347zM847.771835 64.303538 176.227142 64.303538c-61.809741 0-111.924115 50.115398-111.924115 111.924115l0 671.544693c0 61.809741 50.114374 111.924115 111.924115 111.924115l671.544693 0c61.809741 0 111.924115-50.114374 111.924115-111.924115l0-671.544693C959.69595 114.418936 909.581576 64.303538 847.771835 64.303538zM903.733381 847.772346c0 30.878265-25.056676 55.962569-55.962569 55.962569L176.227142 903.734916c-30.90487 0-55.962569-25.084305-55.962569-55.962569l0-671.544693c0-30.9325 25.056676-55.962569 55.962569-55.962569l671.544693 0c30.90487 0 55.962569 25.03007 55.962569 55.962569L903.734404 847.772346z" }, null)]), createVNode("symbol", { id: "icon-img-broken", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m0 682.666667H213.333333v-195.413334l42.24 42.24 170.666667-170.666666 170.666667 170.666666 170.666666-170.24L810.666667 530.346667V810.666667z m0-401.493334l-43.093334-43.093333-170.666666 171.093333-170.666667-170.666666-170.666667 170.666666-42.24-42.666666V213.333333h597.333334v195.84z" }, null)]), createVNode("symbol", { id: "icon-prev", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M784.652701 955.6957 346.601985 517.644983c-2.822492-2.822492-2.822492-7.902977 0-11.289967l439.179713-439.179713c6.77398-6.77398 10.725469-16.370452 10.725469-25.966924L796.507166 36.692393c0-20.32194-16.370452-36.692393-36.692393-36.692393l-4.515987 0c-9.596472 0-19.192944 3.951488-25.966924 10.725469L250.072767 489.420066c-12.418964 12.418964-12.418964 32.740904 0 45.159868l477.565601 477.565601c7.338479 7.338479 17.499449 11.854465 28.224917 11.854465l0 0c22.015436 0 40.079383-18.063947 40.079383-40.079383l0 0C796.507166 973.759647 791.99118 963.598677 784.652701 955.6957z" }, null)]), createVNode("symbol", { id: "icon-next", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M246.121279 955.6957l438.050717-438.050717c2.822492-2.822492 2.822492-7.902977 0-11.289967L244.992282 67.175303c-6.77398-6.77398-10.725469-16.370452-10.725469-25.966924L234.266814 36.692393C234.266814 16.370452 250.637266 0 270.959206 0l4.515987 0c9.596472 0 19.192944 3.951488 25.966924 10.725469l478.694598 478.694598c12.418964 12.418964 12.418964 32.740904 0 45.159868l-477.565601 477.565601c-7.338479 7.338479-17.499449 11.854465-28.224917 11.854465l0 0c-22.015436 0-40.079383-18.063947-40.079383-40.079383l0 0C234.266814 973.759647 238.7828 963.598677 246.121279 955.6957z" }, null)]), createVNode("symbol", { id: "icon-zoomin", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M725.504 652.864c46.4-61.44 71.744-136.448 71.744-218.752C797.248 230.464 632.768 64 430.656 64S64 230.464 64 434.112C64 639.36 228.48 805.76 430.656 805.76c86.656 0 164.48-30.144 227.52-81.088L889.984 960 960 891.264l-234.496-238.4z m-294.848 67.456c-155.776 0-282.624-128.896-282.624-286.208s126.848-286.208 282.624-286.208 282.624 128.896 282.624 286.208-126.912 286.208-282.624 286.208z" }, null), createVNode("path", { d: "M235.712 369.92h390.72v127.104H235.712z" }, null), createVNode("path", { d: "M367.488 238.144h127.104v390.72H367.488z" }, null)]), createVNode("symbol", { id: "icon-close", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M570.24 512l259.2 259.2-58.88 58.24L512 570.24l-261.12 261.12-58.24-58.24L453.76 512 194.56 252.8l58.24-58.24L512 453.76l261.12-261.12 58.24 58.24z" }, null)]), createVNode("symbol", { id: "icon-zoomout", viewBox: "0 0 1024 1024" }, [createVNode("path", { d: "M725.504 652.864c46.4-61.44 71.744-136.448 71.744-218.752C797.248 230.464 632.768 64 430.656 64S64 230.464 64 434.112C64 639.36 228.48 805.76 430.656 805.76c86.656 0 164.48-30.144 227.52-81.088L889.984 960 960 891.264l-234.496-238.4z m-294.848 67.456c-155.776 0-282.624-128.896-282.624-286.208s126.848-286.208 282.624-286.208 282.624 128.896 282.624 286.208-126.912 286.208-282.624 286.208z" }, null), createVNode("path", { d: "M235.712 369.92h390.72v127.104H235.712z" }, null)])]) }), T = h ? window : define_global_default;
let $ = Date.now();
function I(e2) {
  const t2 = Date.now(), o2 = Math.max(0, 16 - (t2 - $)), l2 = setTimeout(e2, o2);
  return $ = t2 + o2, l2;
}
function O(e2) {
  return (T.requestAnimationFrame || I).call(T, e2);
}
function R(e2) {
  (T.cancelAnimationFrame || T.clearTimeout).call(T, e2);
}
function A(e2, t2) {
  const o2 = e2.clientX - t2.clientX, l2 = e2.clientY - t2.clientY;
  return Math.sqrt(o2 * o2 + l2 * l2);
}
function j(e2) {
  return "function" == typeof e2 || "[object Object]" === Object.prototype.toString.call(e2) && !isVNode(e2);
}
var H = defineComponent({ name: "VueEasyLightbox", props: { imgs: { type: [Array, String], default: () => "" }, visible: { type: Boolean, default: false }, index: { type: Number, default: 0 }, scrollDisabled: { type: Boolean, default: true }, escDisabled: { type: Boolean, default: false }, moveDisabled: { type: Boolean, default: false }, titleDisabled: { type: Boolean, default: false }, maskClosable: { type: Boolean, default: true }, teleport: { type: [String, Object], default: null }, swipeTolerance: { type: Number, default: 50 }, loop: { type: Boolean, default: false }, rtl: { type: Boolean, default: false }, zoomScale: { type: Number, default: 0.12 }, maxZoom: { type: Number, default: 3 }, minZoom: { type: Number, default: 0.1 }, rotateDisabled: { type: Boolean, default: false }, zoomDisabled: { type: Boolean, default: false }, pinchDisabled: { type: Boolean, default: false }, dblclickDisabled: { type: Boolean, default: false } }, emits: { hide: () => true, "on-error": (e2) => true, "on-prev": (e2, t2) => true, "on-next": (e2, t2) => true, "on-prev-click": (e2, t2) => true, "on-next-click": (e2, t2) => true, "on-index-change": (e2, t2) => true, "on-rotate": (e2) => true }, setup(e2, o2) {
  let { emit: p2, slots: v2 } = o2;
  const { imgRef: m2, imgState: h2, setImgSize: w2 } = (() => {
    const e3 = ref(), t2 = reactive({ width: 0, height: 0, maxScale: 1 });
    return { imgRef: e3, imgState: t2, setImgSize: () => {
      if (e3.value) {
        const { width: o3, height: l2, naturalWidth: n2 } = e3.value;
        t2.maxScale = n2 / o3, t2.width = o3, t2.height = l2;
      }
    } };
  })(), x2 = ref(e2.index), _2 = ref(""), T2 = reactive({ scale: 1, lastScale: 1, rotateDeg: 0, top: 0, left: 0, initX: 0, initY: 0, lastX: 0, lastY: 0, touches: [] }), $2 = reactive({ loadError: false, loading: false, dragging: false, gesturing: false, wheeling: false }), I2 = computed(() => {
    return t2 = e2.imgs, D("Array")(t2) ? e2.imgs.map((e3) => "string" == typeof e3 ? { src: e3 } : function(e4) {
      return M(e4) && S(e4.src);
    }(e3) ? e3 : void 0).filter(L) : S(e2.imgs) ? [{ src: e2.imgs }] : [];
    var t2;
  }), H2 = computed(() => I2.value[x2.value]), F2 = computed(() => I2.value[x2.value]?.src), N2 = computed(() => I2.value[x2.value]?.title), P = computed(() => I2.value[x2.value]?.alt), V = computed(() => ({ cursor: $2.loadError ? "default" : e2.moveDisabled ? $2.dragging ? "grabbing" : "grab" : "move", top: `calc(50% + ${T2.top}px)`, left: `calc(50% + ${T2.left}px)`, transition: $2.dragging || $2.gesturing ? "none" : "", transform: `translate(-50%, -50%) scale(${T2.scale}) rotate(${T2.rotateDeg}deg)` })), Z = () => {
    p2("hide");
  }, q = () => {
    T2.scale = 1, T2.lastScale = 1, T2.rotateDeg = 0, T2.top = 0, T2.left = 0, $2.loadError = false, $2.dragging = false, $2.loading = true;
  }, U = (t2, o3) => {
    const l2 = x2.value;
    q(), x2.value = t2, I2.value[x2.value] === I2.value[t2] && nextTick(() => {
      $2.loading = false;
    }), e2.visible && l2 !== t2 && (o3 && o3(l2, t2), p2("on-index-change", l2, t2));
  }, W = () => {
    const t2 = x2.value, o3 = e2.loop ? (t2 + 1) % I2.value.length : t2 + 1;
    !e2.loop && o3 > I2.value.length - 1 || U(o3, (e3, t3) => {
      p2("on-next", e3, t3), p2("on-next-click", e3, t3);
    });
  }, G = () => {
    const t2 = x2.value;
    let o3 = t2 - 1;
    if (0 === t2) {
      if (!e2.loop)
        return;
      o3 = I2.value.length - 1;
    }
    U(o3, (e3, t3) => {
      p2("on-prev", e3, t3), p2("on-prev-click", e3, t3);
    });
  }, J = (e3) => {
    Math.abs(1 - e3) < 0.05 ? e3 = 1 : Math.abs(h2.maxScale - e3) < 0.05 && (e3 = h2.maxScale), T2.lastScale = T2.scale, T2.scale = e3;
  }, K = () => {
    const t2 = T2.scale + e2.zoomScale;
    t2 < h2.maxScale * e2.maxZoom && J(t2);
  }, Q = () => {
    const t2 = T2.scale - e2.zoomScale;
    t2 > e2.minZoom && J(t2);
  }, ee = () => {
    const e3 = T2.rotateDeg % 360;
    p2("on-rotate", Math.abs(e3 < 0 ? e3 + 360 : e3));
  }, te = () => {
    T2.rotateDeg -= 90, ee();
  }, oe = () => {
    T2.rotateDeg += 90, ee();
  }, le = () => {
    T2.scale = 1, T2.top = 0, T2.left = 0;
  }, ne = function() {
    let t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    return !e2.moveDisabled && 0 === t2;
  }, { onMouseDown: ae, onMouseMove: re, onMouseUp: ie } = /* @__PURE__ */ ((e3, t2, o3) => {
    let l2, n2 = false;
    return { onMouseDown: (o4) => {
      e3.initX = e3.lastX = o4.clientX, e3.initY = e3.lastY = o4.clientY, t2.dragging = true, n2 = false, o4.stopPropagation();
    }, onMouseUp: (e4) => {
      o3(e4.button) && R(l2), t2.dragging = false, n2 = false;
    }, onMouseMove: (a2) => {
      if (t2.dragging)
        if (o3(a2.button)) {
          if (n2)
            return;
          n2 = true, l2 = O(() => {
            const { top: t3, left: o4, lastY: l3, lastX: r2 } = e3;
            e3.top = t3 - l3 + a2.clientY, e3.left = o4 - r2 + a2.clientX, e3.lastX = a2.clientX, e3.lastY = a2.clientY, n2 = false;
          });
        } else
          e3.lastX = a2.clientX, e3.lastY = a2.clientY;
      a2.stopPropagation();
    } };
  })(T2, $2, ne), { onTouchStart: se, onTouchMove: ce, onTouchEnd: ue } = /* @__PURE__ */ ((e3, t2, o3, l2, n2) => {
    let a2, r2 = false;
    return { onTouchStart: (e4) => {
      const { touches: l3 } = e4;
      l3.length > 1 && n2() ? (o3.gesturing = true, t2.touches = l3) : (t2.initX = t2.lastX = l3[0].clientX, t2.initY = t2.lastY = l3[0].clientY, o3.dragging = true), e4.stopPropagation();
    }, onTouchMove: (i2) => {
      if (r2)
        return;
      const { touches: s2 } = i2, { lastX: c2, lastY: u2, left: d2, top: p3, scale: b2 } = t2;
      if (!o3.gesturing && o3.dragging) {
        if (!s2[0])
          return;
        const { clientX: e4, clientY: o4 } = s2[0];
        l2() ? a2 = O(() => {
          t2.lastX = e4, t2.lastY = o4, t2.top = p3 - u2 + o4, t2.left = d2 - c2 + e4, r2 = false;
        }) : (t2.lastX = e4, t2.lastY = o4);
      } else
        o3.gesturing && t2.touches.length > 1 && s2.length > 1 && n2() && (a2 = O(() => {
          const o4 = (A(t2.touches[0], t2.touches[1]) - A(s2[0], s2[1])) / e3.width;
          t2.touches = s2;
          const l3 = b2 - 1.3 * o4;
          l3 > 0.5 && l3 < 1.5 * e3.maxScale && (t2.scale = l3), r2 = false;
        }));
    }, onTouchEnd: () => {
      R(a2), o3.dragging = false, o3.gesturing = false, r2 = false;
    } };
  })(h2, T2, $2, ne, () => !e2.pinchDisabled), de = () => {
    e2.dblclickDisabled || (T2.scale !== h2.maxScale ? (T2.lastScale = T2.scale, T2.scale = h2.maxScale) : T2.scale = T2.lastScale);
  }, pe = (t2) => {
    $2.loadError || $2.gesturing || $2.loading || $2.dragging || $2.wheeling || !e2.scrollDisabled || e2.zoomDisabled || ($2.wheeling = true, setTimeout(() => {
      $2.wheeling = false;
    }, 80), t2.deltaY < 0 ? K() : Q());
  }, be = (t2) => {
    const o3 = t2;
    e2.visible && (!e2.escDisabled && "Escape" === o3.key && e2.visible && Z(), "ArrowLeft" === o3.key && (e2.rtl ? W() : G()), "ArrowRight" === o3.key && (e2.rtl ? G() : W()));
  }, ve = () => {
    e2.maskClosable && Z();
  }, me = () => {
    w2();
  }, ge = () => {
    $2.loading = false;
  }, fe = (e3) => {
    $2.loading = false, $2.loadError = true, p2("on-error", e3);
  }, he = () => {
    e2.visible && w2();
  };
  watch(() => e2.index, (e3) => {
    e3 < 0 || e3 >= I2.value.length || U(e3);
  }), watch(() => $2.dragging, (t2, o3) => {
    const l2 = !t2 && o3;
    if (!ne() && l2) {
      const t3 = T2.lastX - T2.initX, o4 = T2.lastY - T2.initY, l3 = e2.swipeTolerance;
      Math.abs(t3) > Math.abs(o4) && (t3 < -1 * l3 ? W() : t3 > l3 && G());
    }
  }), watch(() => e2.visible, (t2) => {
    if (t2) {
      q();
      const t3 = I2.value.length;
      if (0 === t3)
        return x2.value = 0, $2.loading = false, void nextTick(() => $2.loadError = true);
      x2.value = e2.index >= t3 ? t3 - 1 : e2.index < 0 ? 0 : e2.index, e2.scrollDisabled && we();
    } else
      e2.scrollDisabled && xe();
  });
  const we = () => {
    document && (_2.value = document.body.style.overflowY, document.body.style.overflowY = "hidden");
  }, xe = () => {
    document && (document.body.style.overflowY = _2.value);
  };
  onMounted(() => {
    y(document, "keydown", be), y(window, "resize", he);
  }), onBeforeUnmount(() => {
    z(document, "keydown", be), z(window, "resize", he), e2.scrollDisabled && xe();
  });
  const ye = () => $2.loading ? v2.loading ? v2.loading({ key: "loading" }) : createVNode(Y, { key: "img-loading" }, null) : $2.loadError ? v2.onerror ? v2.onerror({ key: "onerror" }) : createVNode(B, { key: "img-on-error" }, null) : createVNode("div", { class: `${g}-img-wrapper`, style: V.value, key: "img-wrapper" }, [createVNode("img", { alt: P.value, ref: m2, draggable: "false", class: `${g}-img`, src: F2.value, onMousedown: ae, onMouseup: ie, onMousemove: re, onTouchstart: se, onTouchmove: ce, onTouchend: ue, onLoad: me, onDblclick: de, onDragstart: (e3) => {
    e3.preventDefault();
  } }, null)]), ze = () => {
    if (v2["prev-btn"])
      return v2["prev-btn"]({ prev: G });
    if (I2.value.length <= 1)
      return;
    const o3 = !e2.loop && x2.value <= 0;
    return createVNode("div", { role: "button", "aria-label": "previous image button", class: "btn__prev " + (o3 ? "disable" : ""), onClick: G }, [e2.rtl ? createVNode(f, { type: "next" }, null) : createVNode(f, { type: "prev" }, null)]);
  }, ke = () => {
    if (v2["next-btn"])
      return v2["next-btn"]({ next: W });
    if (I2.value.length <= 1)
      return;
    const o3 = !e2.loop && x2.value >= I2.value.length - 1;
    return createVNode("div", { role: "button", "aria-label": "next image button", class: "btn__next " + (o3 ? "disable" : ""), onClick: W }, [e2.rtl ? createVNode(f, { type: "prev" }, null) : createVNode(f, { type: "next" }, null)]);
  }, _e = () => {
    if (!(e2.titleDisabled || $2.loading || $2.loadError))
      return v2.title ? v2.title({ currentImg: H2.value }) : N2.value ? createVNode(X, null, { default: () => [N2.value] }) : void 0;
  }, De = () => {
    let o3;
    if (e2.visible)
      return createVNode("div", { onTouchmove: k, class: [`${g}-modal`, e2.rtl ? "is-rtl" : ""], onClick: withModifiers(ve, ["self"]), onWheel: pe }, [createVNode(E, null, null), createVNode(Transition, { name: `${g}-fade`, mode: "out-in" }, j(o3 = ye()) ? o3 : { default: () => [o3] }), createVNode("img", { style: "display:none;", src: F2.value, onError: fe, onLoad: ge }, null), createVNode("div", { class: `${g}-btns-wrapper` }, [ze(), ke(), _e(), v2["close-btn"] ? v2["close-btn"]({ close: Z }) : createVNode("div", { role: "button", "aria-label": "close image preview button", class: "btn__close", onClick: Z }, [createVNode(f, { type: "close" }, null)]), v2.toolbar ? v2.toolbar({ toolbarMethods: { zoomIn: K, zoomOut: Q, rotate: te, rotateLeft: te, rotateRight: oe, resize: le }, zoomIn: K, zoomOut: Q, rotate: te, rotateLeft: te, rotateRight: oe, resize: le }) : createVNode(C, { zoomIn: K, zoomOut: Q, resize: le, rotateLeft: te, rotateRight: oe, rotateDisabled: e2.rotateDisabled, zoomDisabled: e2.zoomDisabled }, null)])]);
  };
  return () => {
    let o3;
    if (e2.teleport) {
      let o4;
      return createVNode(Teleport, { to: e2.teleport }, { default: () => [createVNode(Transition, { name: `${g}-fade` }, j(o4 = De()) ? o4 : { default: () => [o4] })] });
    }
    return createVNode(Transition, { name: `${g}-fade` }, j(o3 = De()) ? o3 : { default: () => [o3] });
  };
} });
const N = Object.assign(H, { install: (e2) => {
  e2.component(H.name, H);
} });

export { N };
