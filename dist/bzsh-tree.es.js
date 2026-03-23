(function(){try{if(typeof document<`u`){var e=document.createElement(`style`);e.appendChild(document.createTextNode(`.bzsh-tree[data-v-efcaf0d9]{--bzsh-tree-bg-color:var(--el-bg-color-overlay,#fff);--bzsh-tree-text-color:var(--el-text-color-primary,#606266);--bzsh-tree-border-color:var(--el-border-color-light,#e4e7ed);--bzsh-tree-empty-color:var(--el-text-color-secondary,#909399);--bzsh-tree-scrollbar-thumb:#dcdfe6;--bzsh-tree-scrollbar-thumb-hover:#c0c4cc;font-family:var(--el-font-family,"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif);border:1px solid var(--bzsh-tree-border-color);background-color:var(--bzsh-tree-bg-color);width:100%;color:var(--bzsh-tree-text-color);box-sizing:border-box;border-radius:4px;position:relative;overflow-y:auto}.bzsh-tree[data-v-efcaf0d9]::-webkit-scrollbar{width:6px;height:6px}.bzsh-tree[data-v-efcaf0d9]::-webkit-scrollbar-track{background:0 0}.bzsh-tree[data-v-efcaf0d9]::-webkit-scrollbar-thumb{background:var(--bzsh-tree-scrollbar-thumb);border-radius:3px}.bzsh-tree[data-v-efcaf0d9]::-webkit-scrollbar-thumb:hover{background:var(--bzsh-tree-scrollbar-thumb-hover)}.bzsh-tree-phantom[data-v-efcaf0d9]{z-index:-1;position:absolute;top:0;left:0;right:0}.bzsh-tree-content[data-v-efcaf0d9]{position:absolute;top:0;left:0;right:0}.bzsh-tree-empty-block[data-v-efcaf0d9]{justify-content:center;align-items:center;height:100%;min-height:60px;display:flex}.bzsh-tree-empty-text[data-v-efcaf0d9]{color:var(--bzsh-tree-empty-color);font-size:14px}
/*$vite$:1*/`)),document.head.appendChild(e)}}catch(e){console.error(`vite-plugin-css-injected-by-js`,e)}})();import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, createTextVNode as s, defineComponent as c, inject as l, normalizeClass as u, normalizeStyle as d, openBlock as f, provide as p, ref as m, renderList as h, renderSlot as g, shallowRef as _, toDisplayString as v, toRefs as y, unref as b, watch as x, withCtx as S, withModifiers as C } from "vue";
//#region \0plugin-vue:export-helper
var w = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, T = {}, E = {
	viewBox: "0 0 1024 1024",
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "currentColor"
};
function D(e, t) {
	return f(), i("svg", E, [...t[0] ||= [a("path", { d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a32 32 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z" }, null, -1)]]);
}
var O = /* @__PURE__ */ w(T, [["render", D]]), k = Symbol("treeContext"), A = { class: "bzsh-tree-node__content" }, j = ["checked", "indeterminate"], M = { class: "bzsh-tree-node__label" }, N = /* @__PURE__ */ w(/* @__PURE__ */ c({
	__name: "TreeNode",
	props: {
		node: {},
		isCurrent: { type: Boolean }
	},
	setup(e) {
		let { node: t, isCurrent: o } = e, { props: c, handleNodeClick: p, handleCheckChange: m, handleToggleExpand: h } = l(k), { indent: _, showCheckbox: y, expandOnClickNode: x, checkOnClickNode: S } = c, w = () => {
			t.disabled || (p(t), x && h(t), S && y && m(t, !t.checked));
		}, T = () => {
			t.disabled || h(t);
		}, E = () => {
			t.disabled || m(t, !t.checked);
		};
		return (e, c) => (f(), i("div", {
			class: u(["bzsh-tree-node", {
				"is-expanded": b(t).expanded,
				"is-current": b(o),
				"is-disabled": b(t).disabled
			}]),
			style: d({ paddingLeft: `${b(t).level * (b(_) || 16)}px` }),
			onClick: C(w, ["stop"])
		}, [a("div", A, [
			a("span", {
				class: u(["bzsh-tree-node__expand-icon", { "is-leaf": b(t).isLeaf }]),
				onClick: C(T, ["stop"])
			}, [b(t).isLeaf ? r("", !0) : (f(), n(O, { key: 0 }))], 2),
			b(y) ? (f(), i("span", {
				key: 0,
				class: "bzsh-tree-node__checkbox",
				onClick: C(E, ["stop"])
			}, [a("input", {
				type: "checkbox",
				checked: b(t).checked,
				indeterminate: b(t).indeterminate
			}, null, 8, j)])) : r("", !0),
			a("span", M, [g(e.$slots, "default", {
				node: b(t),
				data: b(t).data
			}, () => [s(v(b(t).label), 1)], !0)])
		])], 6));
	}
}), [["__scopeId", "data-v-b7b322c2"]]);
//#endregion
//#region src/composables/use-tree.ts
function P(e, n) {
	let r = _(/* @__PURE__ */ new Map()), i = _([]), a = _([]), o = _(), s = t(() => e.props?.value || e.nodeKey || "id"), c = t(() => e.props?.label || "label"), l = t(() => e.props?.children || "children"), u = t(() => e.props?.disabled || "disabled"), d = t(() => new Set(e.defaultExpandedKeys || [])), f = t(() => new Set(e.defaultCheckedKeys || [])), p = () => {
		let e = [], t = [...i.value].reverse();
		for (; t.length > 0;) {
			let n = t.pop();
			if (!(!n || !n.visible) && (e.push(n), n.expanded && n.children.length > 0)) for (let e = n.children.length - 1; e >= 0; e--) t.push(n.children[e]);
		}
		a.value = e;
	};
	return x(() => e.data, (e) => {
		let t = /* @__PURE__ */ new Map(), n = (e, r = 0, i = null) => {
			let a = [];
			for (let o of e) {
				let e = o, p = e[s.value], m = e[l.value] || [], h = m.length === 0, g = !1;
				typeof u.value == "function" ? g = u.value(o) : typeof u.value == "string" && (g = !!e[u.value]);
				let _ = {
					key: p,
					label: e[c.value],
					data: o,
					parentKey: i,
					children: [],
					level: r,
					isLeaf: h,
					expanded: d.value.has(p),
					disabled: g,
					checked: f.value.has(p),
					indeterminate: !1,
					visible: !0
				};
				t.set(p, _), h || (_.children = n(m, r + 1, p)), a.push(_);
			}
			return a;
		};
		i.value = n(e), r.value = t, p();
	}, {
		deep: !0,
		immediate: !0
	}), {
		nodeMap: r,
		flattenData: a,
		currentNodeKey: o,
		handleNodeClick: (e) => {
			o.value = e.key, n("node-click", e.data, e), n("current-change", e.data, e);
		},
		expandAll: () => {
			Array.from(r.value.values()).forEach((e) => {
				e.isLeaf || (e.expanded = !0);
			}), p();
		},
		collapseAll: () => {
			Array.from(r.value.values()).forEach((e) => {
				e.isLeaf || (e.expanded = !1);
			}), p();
		},
		computeVisibleData: p,
		getCurrentKey: () => o.value,
		getCurrentNode: () => {
			if (o.value !== void 0) return r.value.get(o.value)?.data;
		},
		setCurrentKey: (e) => {
			o.value = e;
		}
	};
}
//#endregion
//#region src/composables/use-expand.ts
function F(e, t, { computeVisibleData: n }) {
	return { handleToggleExpand: (e) => {
		e.isLeaf || (e.expanded = !e.expanded, n(), e.expanded ? t("node-expand", e.data, e) : t("node-collapse", e.data, e));
	} };
}
//#endregion
//#region src/composables/use-check.ts
function ee(e, t, n) {
	let r = () => {
		let e = [], t = [], r = [], i = [];
		for (let a of n.value.values()) a.checked ? (e.push(a.data), t.push(a.key)) : a.indeterminate && (r.push(a.data), i.push(a.key));
		return {
			checkedNodes: e,
			checkedKeys: t,
			halfCheckedNodes: r,
			halfCheckedKeys: i
		};
	}, i = () => {
		let e = [];
		for (let t of n.value.values()) t.checked && e.push(t.data);
		return e;
	}, a = () => {
		let e = [];
		for (let t of n.value.values()) t.checked && e.push(t.key);
		return e;
	}, o = () => {
		let e = [];
		for (let t of n.value.values()) t.indeterminate && e.push(t.data);
		return e;
	}, s = () => {
		let e = [];
		for (let t of n.value.values()) t.indeterminate && e.push(t.key);
		return e;
	}, c = (e) => {
		let t = n.value.get(e.parentKey);
		for (; t;) {
			let e = t.children, r = e.every((e) => e.checked), i = e.some((e) => e.checked || e.indeterminate);
			t.checked = r, t.indeterminate = !r && i, t = n.value.get(t.parentKey);
		}
	}, l = (e, t) => {
		let n = [...e.children];
		for (; n.length > 0;) {
			let e = n.pop();
			e && (e.checked = t, e.indeterminate = !1, e.children.length > 0 && n.push(...e.children));
		}
	};
	return {
		getCheckedNodes: i,
		getCheckedKeys: a,
		getHalfCheckedNodes: o,
		getHalfCheckedKeys: s,
		handleCheckChange: (n, i) => {
			n.checked = i, n.indeterminate = !1, e.checkStrictly || (l(n, i), c(n)), t("check-change", n.data, n.checked, n.indeterminate), t("check", n.data, r());
		},
		setChecked: (t, r) => {
			let i = n.value.get(t);
			i && (i.checked = r, i.indeterminate = !1, e.checkStrictly || (l(i, r), c(i)));
		},
		setCheckedKeys: (t) => {
			if (e.checkStrictly) {
				let e = new Set(t);
				n.value.forEach((t) => {
					t.checked = e.has(t.key), t.indeterminate = !1;
				});
				return;
			}
			n.value.forEach((e) => {
				e.checked = !1, e.indeterminate = !1;
			}), t.forEach((e) => {
				let t = n.value.get(e);
				t && (t.checked = !0, l(t, !0), c(t));
			});
		}
	};
}
//#endregion
//#region src/composables/use-filter.ts
function I(e, t, n) {
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
function L(e, n) {
	let r = m(null), i = m(0), a = t(() => (n.value.length || 0) * (e.itemSize || 0)), o = t(() => Math.ceil((e.height || 0) / (e.itemSize || 1))), s = t(() => Math.floor(i.value / (e.itemSize || 1))), c = t(() => Math.max(0, s.value - 4)), l = t(() => Math.min(n.value.length, s.value + o.value + 4));
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
var R = {
	key: 0,
	class: "bzsh-tree-empty-block"
}, z = { class: "bzsh-tree-empty-text" }, B = /* @__PURE__ */ w(/* @__PURE__ */ c({
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
		let l = t, { emptyText: u, height: m } = y(l), _ = c, { nodeMap: x, flattenData: C, currentNodeKey: w, handleNodeClick: T, expandAll: E, collapseAll: D, computeVisibleData: O, getCurrentKey: A, getCurrentNode: j, setCurrentKey: M } = P(l, _), { handleToggleExpand: B } = F(l, _, { computeVisibleData: O }), { getCheckedNodes: V, getCheckedKeys: H, getHalfCheckedNodes: U, getHalfCheckedKeys: W, handleCheckChange: G, setChecked: K, setCheckedKeys: q } = ee(l, _, x), { filter: J } = I(l, x, O), { containerRef: Y, totalHeight: X, visibleData: Z, offset: Q, handleScroll: $ } = L(l, C);
		return p(k, {
			props: l,
			handleNodeClick: T,
			handleCheckChange: G,
			handleToggleExpand: B
		}), s({
			getCheckedNodes: V,
			getCheckedKeys: H,
			getHalfCheckedNodes: U,
			getHalfCheckedKeys: W,
			setChecked: K,
			setCheckedKeys: q,
			getCurrentKey: A,
			getCurrentNode: j,
			setCurrentKey: M,
			expandAll: E,
			collapseAll: D,
			filter: J
		}), (t, s) => (f(), i("div", {
			ref_key: "containerRef",
			ref: Y,
			class: "bzsh-tree",
			style: d({ height: `${b(m)}px` }),
			onScroll: s[0] ||= (...e) => b($) && b($)(...e)
		}, [b(Z).length ? (f(), i("div", {
			key: 1,
			class: "bzsh-tree-phantom",
			style: d({ height: `${b(X)}px` })
		}, null, 4)) : (f(), i("div", R, [g(t.$slots, "empty", {}, () => [a("span", z, v(b(u)), 1)], !0)])), b(Z).length ? (f(), i("div", {
			key: 2,
			class: "bzsh-tree-content",
			style: d({ transform: `translateY(${b(Q)}px)` })
		}, [(f(!0), i(e, null, h(b(Z), (e) => (f(), n(N, {
			key: e.key,
			node: e,
			"is-current": b(w) === e.key
		}, o({ _: 2 }, [t.$slots.default ? {
			name: "default",
			fn: S(({ node: e, data: n }) => [g(t.$slots, "default", {
				node: e,
				data: n
			}, void 0, !0)]),
			key: "0"
		} : void 0]), 1032, ["node", "is-current"]))), 128))], 4)) : r("", !0)], 36));
	}
}), [["__scopeId", "data-v-efcaf0d9"]]);
B.install = (e) => {
	e.component("BzshTree", B);
};
//#endregion
export { B as BzshTree, B as default };
