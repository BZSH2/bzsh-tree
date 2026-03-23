(function(){try{if(typeof document<`u`){var e=document.createElement(`style`);e.appendChild(document.createTextNode(`.bzsh-tree[data-v-3af95eaa]{--bzsh-tree-bg-color:var(--el-bg-color-overlay,#fff);--bzsh-tree-text-color:var(--el-text-color-primary,#606266);--bzsh-tree-border-color:var(--el-border-color-light,#e4e7ed);--bzsh-tree-empty-color:var(--el-text-color-secondary,#909399);--bzsh-tree-scrollbar-thumb:#dcdfe6;--bzsh-tree-scrollbar-thumb-hover:#c0c4cc;font-family:var(--el-font-family,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif);border:1px solid var(--bzsh-tree-border-color);background-color:var(--bzsh-tree-bg-color);width:100%;color:var(--bzsh-tree-text-color);box-sizing:border-box;border-radius:4px;position:relative;overflow-y:auto}.bzsh-tree[data-v-3af95eaa]::-webkit-scrollbar{width:6px;height:6px}.bzsh-tree[data-v-3af95eaa]::-webkit-scrollbar-track{background:0 0}.bzsh-tree[data-v-3af95eaa]::-webkit-scrollbar-thumb{background:var(--bzsh-tree-scrollbar-thumb);border-radius:3px}.bzsh-tree[data-v-3af95eaa]::-webkit-scrollbar-thumb:hover{background:var(--bzsh-tree-scrollbar-thumb-hover)}.bzsh-tree-phantom[data-v-3af95eaa]{z-index:-1;position:absolute;top:0;left:0;right:0}.bzsh-tree-content[data-v-3af95eaa]{position:absolute;top:0;left:0;right:0}.bzsh-tree-empty-block[data-v-3af95eaa]{justify-content:center;align-items:center;height:100%;min-height:60px;display:flex}.bzsh-tree-empty-text[data-v-3af95eaa]{color:var(--bzsh-tree-empty-color);font-size:14px}
/*$vite$:1*/`)),document.head.appendChild(e)}}catch(e){console.error(`vite-plugin-css-injected-by-js`,e)}})();import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, createTextVNode as s, defineComponent as c, inject as l, normalizeClass as u, normalizeStyle as d, onMounted as f, openBlock as p, provide as m, ref as h, renderList as g, renderSlot as _, shallowRef as v, toDisplayString as y, toRefs as b, unref as x, watch as S, withCtx as C, withModifiers as w } from "vue";
//#region \0plugin-vue:export-helper
var T = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, E = {}, D = {
	viewBox: "0 0 1024 1024",
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "currentColor"
};
function O(e, t) {
	return p(), i("svg", D, [...t[0] ||= [a("path", { d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a32 32 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z" }, null, -1)]]);
}
var k = /* @__PURE__ */ T(E, [["render", O]]), A = Symbol("treeContext"), j = { class: "bzsh-tree-node__content" }, M = ["checked", "indeterminate"], N = { class: "bzsh-tree-node__label" }, P = /* @__PURE__ */ T(/* @__PURE__ */ c({
	__name: "TreeNode",
	props: {
		node: {},
		isCurrent: { type: Boolean }
	},
	setup(e) {
		let { node: t, isCurrent: o } = e, { props: c, handleNodeClick: f, handleCheckChange: m, handleToggleExpand: h } = l(A), { indent: g, showCheckbox: v, expandOnClickNode: b, checkOnClickNode: S } = c, C = () => {
			t.disabled || (f(t), b && h(t), S && v && m(t, !t.checked));
		}, T = () => {
			t.disabled || h(t);
		}, E = () => {
			t.disabled || m(t, !t.checked);
		};
		return (e, c) => (p(), i("div", {
			class: u(["bzsh-tree-node", {
				"is-expanded": x(t).expanded,
				"is-current": x(o),
				"is-disabled": x(t).disabled
			}]),
			style: d({ paddingLeft: `${x(t).level * (x(g) || 16)}px` }),
			onClick: w(C, ["stop"])
		}, [a("div", j, [
			a("span", {
				class: u(["bzsh-tree-node__expand-icon", { "is-leaf": x(t).isLeaf }]),
				onClick: w(T, ["stop"])
			}, [x(t).isLeaf ? r("", !0) : (p(), n(k, { key: 0 }))], 2),
			x(v) ? (p(), i("span", {
				key: 0,
				class: "bzsh-tree-node__checkbox",
				onClick: w(E, ["stop"])
			}, [a("input", {
				type: "checkbox",
				checked: x(t).checked,
				indeterminate: x(t).indeterminate
			}, null, 8, M)])) : r("", !0),
			a("span", N, [_(e.$slots, "default", {
				node: x(t),
				data: x(t).data
			}, () => [s(y(x(t).label), 1)], !0)])
		])], 6));
	}
}), [["__scopeId", "data-v-b7b322c2"]]);
//#endregion
//#region src/composables/use-tree.ts
function F(e, n) {
	let r = v(/* @__PURE__ */ new Map()), i = v([]), a = v(), o = t(() => e.props?.value || e.nodeKey || "id"), s = t(() => e.props?.label || "label"), c = t(() => e.props?.children || "children"), l = t(() => e.props?.disabled || "disabled"), u = () => {
		let e = [], t = [...Array.from(r.value.values()).filter((e) => e.parentKey === null)].reverse();
		for (; t.length > 0;) {
			let n = t.pop();
			if (!(!n || !n.visible) && (e.push(n), n.expanded && n.children.length > 0)) for (let e = n.children.length - 1; e >= 0; e--) t.push(n.children[e]);
		}
		i.value = e;
	};
	return S(() => e.data, (t) => {
		let n = /* @__PURE__ */ new Map(), i = (t, r = 0, a = null) => t.map((t) => {
			let u = t[o.value], d = t[c.value] || [], f = d.length === 0, p = !1;
			typeof l.value == "function" ? p = l.value(t) : typeof l.value == "string" && (p = !!t[l.value]);
			let m = {
				key: u,
				label: t[s.value],
				data: t,
				parentKey: a,
				children: [],
				level: r,
				isLeaf: f,
				expanded: e.defaultExpandedKeys?.includes(u) || !1,
				disabled: p,
				checked: e.defaultCheckedKeys?.includes(u) || !1,
				indeterminate: !1,
				visible: !0
			};
			return n.set(u, m), f || (m.children = i(d, r + 1, u)), m;
		});
		i(t), r.value = n, u();
	}, {
		deep: !0,
		immediate: !0
	}), {
		nodeMap: r,
		flattenData: i,
		currentNodeKey: a,
		handleNodeClick: (e) => {
			a.value = e.key, n("node-click", e.data, e), n("current-change", e.data, e);
		},
		expandAll: () => {
			Array.from(r.value.values()).forEach((e) => {
				e.isLeaf || (e.expanded = !0);
			}), u();
		},
		collapseAll: () => {
			Array.from(r.value.values()).forEach((e) => {
				e.isLeaf || (e.expanded = !1);
			}), u();
		},
		computeVisibleData: u,
		getCurrentKey: () => a.value,
		getCurrentNode: () => {
			if (a.value !== void 0) return r.value.get(a.value)?.data;
		},
		setCurrentKey: (e) => {
			a.value = e;
		}
	};
}
//#endregion
//#region src/composables/use-expand.ts
function I(e, t, { computeVisibleData: n }) {
	return { handleToggleExpand: (e) => {
		e.isLeaf || (e.expanded = !e.expanded, n(), e.expanded ? t("node-expand", e.data, e) : t("node-collapse", e.data, e));
	} };
}
//#endregion
//#region src/composables/use-check.ts
function L(e, t, n) {
	let r = () => {
		let e = [];
		for (let t of n.value.values()) t.checked && e.push(t.data);
		return e;
	}, i = () => {
		let e = [];
		for (let t of n.value.values()) t.checked && e.push(t.key);
		return e;
	}, a = () => {
		let e = [];
		for (let t of n.value.values()) t.indeterminate && e.push(t.data);
		return e;
	}, o = () => {
		let e = [];
		for (let t of n.value.values()) t.indeterminate && e.push(t.key);
		return e;
	}, s = (e) => {
		let t = n.value.get(e.parentKey);
		for (; t;) {
			let e = t.children, r = e.every((e) => e.checked), i = e.some((e) => e.checked || e.indeterminate);
			t.checked = r, t.indeterminate = !r && i, t = n.value.get(t.parentKey);
		}
	}, c = (e, t) => {
		e.children.forEach((e) => {
			e.checked = t, e.indeterminate = !1, c(e, t);
		});
	};
	return {
		getCheckedNodes: r,
		getCheckedKeys: i,
		getHalfCheckedNodes: a,
		getHalfCheckedKeys: o,
		handleCheckChange: (n, l) => {
			n.checked = l, n.indeterminate = !1, e.checkStrictly || (c(n, l), s(n)), t("check-change", n.data, n.checked, n.indeterminate), t("check", n.data, {
				checkedNodes: r(),
				checkedKeys: i(),
				halfCheckedNodes: a(),
				halfCheckedKeys: o()
			});
		},
		setChecked: (t, r) => {
			let i = n.value.get(t);
			i && (i.checked = r, i.indeterminate = !1, e.checkStrictly || (c(i, r), s(i)));
		},
		setCheckedKeys: (t) => {
			n.value.forEach((e) => {
				e.checked = !1, e.indeterminate = !1;
			}), t.forEach((t) => {
				let r = n.value.get(t);
				r && (r.checked = !0, e.checkStrictly || (c(r, !0), s(r)));
			});
		}
	};
}
//#endregion
//#region src/composables/use-filter.ts
function R(e, t, n) {
	return { filter: (r) => {
		if (!e.filterMethod) return;
		let i = e.filterMethod;
		if (!r) {
			for (let e of t.value.values()) e.visible = !0;
			n();
			return;
		}
		for (let e of t.value.values()) e.visible = i(r, e.data, e);
		for (let e of t.value.values()) if (e.visible) {
			let n = e.parentKey;
			for (; n !== null;) {
				let e = t.value.get(n);
				if (e) {
					if (e.visible && e.expanded) break;
					e.visible = !0, e.expanded = !0, n = e.parentKey;
				} else break;
			}
		}
		n();
	} };
}
//#endregion
//#region src/composables/use-virtual-scroll.ts
function z(e, n) {
	let r = h(null), i = h(0), a = t(() => (n.value.length || 0) * (e.itemSize || 0)), o = t(() => Math.ceil((e.height || 0) / (e.itemSize || 1))), s = t(() => Math.floor(i.value / (e.itemSize || 1))), c = t(() => Math.max(0, s.value - 4)), l = t(() => Math.min(n.value.length, s.value + o.value + 4));
	return {
		containerRef: r,
		totalHeight: a,
		visibleData: t(() => n.value.slice(c.value, l.value)),
		offset: t(() => c.value * (e.itemSize || 0)),
		handleScroll: () => {
			r.value && (i.value = r.value.scrollTop);
		}
	};
}
//#endregion
//#region src/components/Tree.vue?vue&type=script&setup=true&lang.ts
var B = {
	key: 0,
	class: "bzsh-tree-empty-block"
}, V = { class: "bzsh-tree-empty-text" }, H = /* @__PURE__ */ T(/* @__PURE__ */ c({
	__name: "Tree",
	props: {
		data: { default: () => [] },
		emptyText: { default: "No Data" },
		nodeKey: { default: "id" },
		props: { default: () => ({
			value: "id",
			label: "label",
			children: "children",
			disabled: "disabled"
		}) },
		highlightCurrent: {
			type: Boolean,
			default: !1
		},
		expandOnClickNode: {
			type: Boolean,
			default: !0
		},
		checkOnClickNode: {
			type: Boolean,
			default: !1
		},
		defaultExpandedKeys: { default: () => [] },
		defaultCheckedKeys: { default: () => [] },
		showCheckbox: {
			type: Boolean,
			default: !1
		},
		checkStrictly: {
			type: Boolean,
			default: !1
		},
		indent: { default: 16 },
		height: { default: 400 },
		itemSize: { default: 26 },
		filterMethod: {}
	},
	emits: [
		"node-click",
		"check-change",
		"check",
		"current-change",
		"node-expand",
		"node-collapse"
	],
	setup(t, { expose: s, emit: c }) {
		let l = t, { emptyText: u } = b(l), h = c, { nodeMap: v, flattenData: S, currentNodeKey: w, handleNodeClick: T, expandAll: E, collapseAll: D, computeVisibleData: O, getCurrentKey: k, getCurrentNode: j, setCurrentKey: M } = F(l, h), { handleToggleExpand: N } = I(l, h, { computeVisibleData: O }), { getCheckedNodes: H, getCheckedKeys: U, getHalfCheckedNodes: W, getHalfCheckedKeys: G, handleCheckChange: K, setChecked: q, setCheckedKeys: J } = L(l, h, v), { filter: Y } = R(l, v, O), { containerRef: X, totalHeight: Z, visibleData: Q, offset: ee, handleScroll: $ } = z(l, S);
		return m(A, {
			props: l,
			handleNodeClick: T,
			handleCheckChange: K,
			handleToggleExpand: N
		}), s({
			getCheckedNodes: H,
			getCheckedKeys: U,
			getHalfCheckedNodes: W,
			getHalfCheckedKeys: G,
			setChecked: q,
			setCheckedKeys: J,
			getCurrentKey: k,
			getCurrentNode: j,
			setCurrentKey: M,
			expandAll: E,
			collapseAll: D,
			filter: Y
		}), f(() => {
			X.value && (X.value.style.height = `${l.height}px`);
		}), (t, s) => (p(), i("div", {
			ref_key: "containerRef",
			ref: X,
			class: "bzsh-tree",
			onScroll: s[0] ||= (...e) => x($) && x($)(...e)
		}, [x(Q).length ? (p(), i("div", {
			key: 1,
			class: "bzsh-tree-phantom",
			style: d({ height: `${x(Z)}px` })
		}, null, 4)) : (p(), i("div", B, [_(t.$slots, "empty", {}, () => [a("span", V, y(x(u)), 1)], !0)])), x(Q).length ? (p(), i("div", {
			key: 2,
			class: "bzsh-tree-content",
			style: d({ transform: `translateY(${x(ee)}px)` })
		}, [(p(!0), i(e, null, g(x(Q), (e) => (p(), n(P, {
			key: e.key,
			node: e,
			"is-current": x(w) === e.key
		}, o({ _: 2 }, [t.$slots.default ? {
			name: "default",
			fn: C(({ node: e, data: n }) => [_(t.$slots, "default", {
				node: e,
				data: n
			}, void 0, !0)]),
			key: "0"
		} : void 0]), 1032, ["node", "is-current"]))), 128))], 4)) : r("", !0)], 544));
	}
}), [["__scopeId", "data-v-3af95eaa"]]);
H.install = (e) => {
	e.component("BzshTree", H);
};
//#endregion
export { H as BzshTree, H as default };
