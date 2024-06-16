globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as defineComponent, h, k as reactive, l as effectScope, C as Comment, m as mergeProps, n as cloneVNode, a as ref, F as Fragment } from './@vue_BQBbmbrb.mjs';

function Ir(a2) {
  let t = false, e;
  const n = effectScope(true);
  return (...l) => (t || (e = n.run(() => a2(...l)), t = true), e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
function Ra(a2) {
  return a2 ? a2.flatMap((t) => t.type === Fragment ? Ra(t.children) : [t]) : [];
}
const Nn = defineComponent({
  name: "PrimitiveSlot",
  inheritAttrs: false,
  setup(a2, { attrs: t, slots: e }) {
    return () => {
      var u, d;
      if (!e.default)
        return null;
      const n = Ra(e.default()), l = n.findIndex((c) => c.type !== Comment);
      if (l === -1)
        return n;
      const s = n[l];
      (u = s.props) == null || delete u.ref;
      const r = s.props ? mergeProps(t, s.props) : t;
      t.class && ((d = s.props) != null && d.class) && delete s.props.class;
      const i = cloneVNode(s, r);
      for (const c in r)
        c.startsWith("on") && (i.props || (i.props = {}), i.props[c] = r[c]);
      return n.length === 1 ? i : (n[l] = i, n);
    };
  }
}), O = defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(a2, { attrs: t, slots: e }) {
    const n = a2.asChild ? "template" : a2.as;
    return typeof n == "string" && ["area", "img", "input"].includes(n) ? () => h(n, t) : n !== "template" ? () => h(a2.as, t, { default: e.default }) : () => h(Nn, t, { default: e.default });
  }
});
reactive({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
Ir(() => ref([]));
function Kp() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Kp() === "coarse";

export { O };
