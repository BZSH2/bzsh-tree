import { Fragment as e, createElementBlock as t, createElementVNode as n, defineComponent as r, openBlock as i, renderList as a, toDisplayString as o } from "vue";
//#region src/components/Tree.vue?vue&type=script&setup=true&lang.ts
var s = { class: "bzsh-tree" }, c = /* @__PURE__ */ ((e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
})(/* @__PURE__ */ r({
	__name: "Tree",
	props: { data: {} },
	setup(r) {
		return (c, l) => (i(), t("div", s, [n("ul", null, [(i(!0), t(e, null, a(r.data, (e) => (i(), t("li", { key: e.id }, o(e.label), 1))), 128))])]));
	}
}), [["__scopeId", "data-v-f1078d88"]]), l = { install(e) {
	e.component("BzshTree", c);
} };
//#endregion
export { c as Tree, l as default };
