(function(){try{if(typeof document<`u`){var e=document.createElement(`style`);e.appendChild(document.createTextNode(`.bzsh-tree-node[data-v-ff1dca53]{box-sizing:border-box;cursor:pointer;-webkit-user-select:none;user-select:none;align-items:center;padding-right:12px;transition:background-color .2s;display:flex}.bzsh-tree-node[data-v-ff1dca53]:hover{background-color:#f5f7fa}.bzsh-tree-node.is-current[data-v-ff1dca53]{color:#409eff;font-weight:700}.bzsh-tree-node.is-highlight.is-current[data-v-ff1dca53]{background-color:#f0f7ff}.bzsh-tree-node.is-disabled[data-v-ff1dca53]{color:#c0c4cc;cursor:not-allowed}.bzsh-tree-node.is-current .bzsh-tree-node-label[data-v-ff1dca53]{color:#409eff}.bzsh-tree-node-indent[data-v-ff1dca53]{flex-shrink:0;height:100%;display:flex;position:relative}.bzsh-tree-indent-line[data-v-ff1dca53]{background-color:#0000;width:1px;position:absolute;top:0;bottom:0}.bzsh-tree-node-icon[data-v-ff1dca53]{box-sizing:border-box;cursor:pointer;color:#c0c4cc;flex-shrink:0;justify-content:center;align-items:center;width:24px;height:24px;padding:6px;transition:transform .3s;display:flex}.bzsh-tree-node-icon.is-expanded[data-v-ff1dca53]{transform:rotate(90deg)}.bzsh-tree-node-icon.is-leaf[data-v-ff1dca53]{cursor:default;opacity:0;pointer-events:none}.bzsh-tree-node-placeholder[data-v-ff1dca53]{flex-shrink:0;width:24px}.bzsh-tree-node-checkbox-wrapper[data-v-ff1dca53]{justify-content:center;align-items:center;height:100%;margin-right:8px;display:flex}.bzsh-tree-node-checkbox[data-v-ff1dca53]{cursor:pointer;width:14px;height:14px;margin:0}.bzsh-tree-node-content[data-v-ff1dca53]{text-overflow:ellipsis;white-space:nowrap;flex:1;align-items:center;display:flex;overflow:hidden}.bzsh-tree-node-label[data-v-ff1dca53]{font-size:14px}.bzsh-tree[data-v-6727800b]{font-family:var(--el-font-family,sans-serif);color:#606266;background-color:#fff;border:1px solid #e4e7ed;border-radius:4px;width:100%;position:relative;overflow-y:auto}.bzsh-tree[data-v-6727800b]::-webkit-scrollbar{width:6px;height:6px}.bzsh-tree[data-v-6727800b]::-webkit-scrollbar-track{background:0 0}.bzsh-tree[data-v-6727800b]::-webkit-scrollbar-thumb{background:#dcdfe6;border-radius:3px}.bzsh-tree[data-v-6727800b]::-webkit-scrollbar-thumb:hover{background:#c0c4cc}.bzsh-tree-phantom[data-v-6727800b]{z-index:-1;position:absolute;top:0;left:0;right:0}.bzsh-tree-content[data-v-6727800b]{position:absolute;top:0;left:0;right:0}.bzsh-tree__empty-block[data-v-6727800b]{justify-content:center;align-items:center;height:100%;min-height:60px;display:flex}.bzsh-tree__empty-text[data-v-6727800b]{color:#909399;font-size:14px}
/*$vite$:1*/`)),document.head.appendChild(e)}}catch(e){console.error(`vite-plugin-css-injected-by-js`,e)}})();import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createSlots as o, defineComponent as s, normalizeClass as c, normalizeStyle as l, onMounted as u, openBlock as d, ref as f, renderList as p, renderSlot as m, resolveDynamicComponent as h, toDisplayString as g, unref as _, watch as v, withCtx as y, withModifiers as b } from "vue";
//#region \0plugin-vue:export-helper
var x = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, S = {}, C = {
	viewBox: "0 0 1024 1024",
	version: "1.1",
	xmlns: "http://www.w3.org/2000/svg",
	width: "1em",
	height: "1em",
	fill: "currentColor"
};
function w(e, t) {
	return d(), i("svg", C, [...t[0] ||= [a("path", { d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a32 32 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z" }, null, -1)]]);
}
var T = /* @__PURE__ */ x(S, [["render", w]]), E = [
	"checked",
	"indeterminate",
	"disabled"
], D = { class: "bzsh-tree-node-content" }, O = { class: "bzsh-tree-node-label" }, k = /* @__PURE__ */ x(/* @__PURE__ */ s({
	__name: "TreeNode",
	props: {
		node: {},
		itemSize: {},
		indent: {},
		showCheckbox: { type: Boolean },
		isCurrent: { type: Boolean },
		highlightCurrent: { type: Boolean },
		icon: {}
	},
	emits: [
		"toggle",
		"click",
		"check"
	],
	setup(t, { emit: o }) {
		let s = t, u = o, f = () => {
			s.node.disabled || u("click", s.node);
		}, _ = () => {
			s.node.isLeaf || u("toggle", s.node);
		}, v = (e) => {
			if (s.node.disabled) return;
			let t = e.target;
			u("check", s.node, t.checked);
		};
		return (o, s) => (d(), i("div", {
			class: c(["bzsh-tree-node", [{
				"is-disabled": t.node.disabled,
				"is-current": t.isCurrent,
				"is-highlight": t.highlightCurrent && t.isCurrent,
				"is-checkable": t.showCheckbox
			}]]),
			style: l({ height: `${t.itemSize}px` }),
			onClick: b(f, ["stop"])
		}, [
			a("div", {
				class: "bzsh-tree-node-indent",
				style: l({ width: `${t.node.level * t.indent}px` })
			}, [(d(!0), i(e, null, p(t.node.level, (e) => (d(), i("span", {
				key: e,
				class: "bzsh-tree-indent-line",
				style: l({ left: `${(e - 1) * t.indent + t.indent / 2}px` })
			}, null, 4))), 128))], 4),
			a("span", {
				class: c(["bzsh-tree-node-icon", {
					"is-expanded": t.node.expanded,
					"is-leaf": t.node.isLeaf
				}]),
				onClick: b(_, ["stop"])
			}, [t.icon && !t.node.isLeaf ? (d(), n(h(t.icon), { key: 0 })) : t.node.isLeaf ? r("", !0) : (d(), n(T, { key: 1 }))], 2),
			t.showCheckbox ? (d(), i("div", {
				key: 0,
				class: "bzsh-tree-node-checkbox-wrapper",
				onClick: s[0] ||= b(() => {}, ["stop"])
			}, [a("input", {
				type: "checkbox",
				class: "bzsh-tree-node-checkbox",
				checked: t.node.checked,
				indeterminate: t.node.indeterminate,
				disabled: t.node.disabled,
				onChange: v
			}, null, 40, E)])) : r("", !0),
			a("div", D, [m(o.$slots, "default", {
				node: t.node,
				data: t.node.data
			}, () => [a("span", O, g(t.node.label), 1)], !0)])
		], 6));
	}
}), [["__scopeId", "data-v-ff1dca53"]]);
//#endregion
//#region src/components/composables/use-tree-data.ts
function A(e) {
	let n = t(() => e.props?.value || e.nodeKey || "id"), r = t(() => e.props?.label || "label"), i = t(() => e.props?.children || "children"), a = t(() => e.props?.disabled || "disabled"), o = f(/* @__PURE__ */ new Map()), s = f([]), c = f(e.currentNodeKey), l = (t, s = 0, c = null) => {
		let u = [];
		for (let d of t) {
			let t = d[n.value], f = d[i.value] || [], p = f.length === 0, m = !1;
			typeof a.value == "function" ? m = a.value(d) : typeof a.value == "string" && (m = !!d[a.value]);
			let h = e.defaultExpandedKeys?.includes(t) || !1, g = e.defaultCheckedKeys?.includes(t) || !1, _ = {
				key: t,
				label: d[r.value],
				data: d,
				parentKey: c,
				children: [],
				level: s,
				isLeaf: p,
				expanded: h,
				disabled: m,
				checked: g,
				indeterminate: !1,
				visible: !0
			};
			o.value.set(t, _), u.push(_), p || (_.children = l(f, s + 1, t));
		}
		return u;
	}, u = () => {
		let e = [], t = (n) => {
			for (let r of n) r.visible && (e.push(r), r.expanded && r.children.length > 0 && t(r.children));
		};
		t(Array.from(o.value.values()).filter((e) => e.parentKey === null)), s.value = e;
	};
	return {
		nodeMap: o,
		flattenData: s,
		currentNodeKey: c,
		valueKey: n,
		labelKey: r,
		childrenKey: i,
		disabledKey: a,
		buildTree: l,
		computeVisibleData: u,
		expandAll: () => {
			Array.from(o.value.values()).forEach((e) => {
				e.isLeaf || (e.expanded = !0);
			}), u();
		},
		collapseAll: () => {
			Array.from(o.value.values()).forEach((e) => {
				e.isLeaf || (e.expanded = !1);
			}), u();
		},
		setData: (e) => {
			o.value.clear(), l(e), u();
		},
		toggleExpand: (e) => {
			e.isLeaf || (e.expanded = !e.expanded, u());
		}
	};
}
//#endregion
//#region src/components/composables/use-check.ts
function j(e, t) {
	let n = (t, r) => {
		t.checked = r, t.indeterminate = !1, !e.checkStrictly && t.children.length > 0 && t.children.forEach((e) => {
			e.disabled || n(e, r);
		});
	}, r = (n) => {
		if (e.checkStrictly || n.parentKey === null) return;
		let i = t.value.get(n.parentKey);
		if (!i) return;
		let a = i.children.filter((e) => !e.disabled);
		if (a.length === 0) return;
		let o = 0, s = 0;
		a.forEach((e) => {
			e.checked && o++, e.indeterminate && s++;
		}), o === a.length ? (i.checked = !0, i.indeterminate = !1) : o === 0 && s === 0 ? (i.checked = !1, i.indeterminate = !1) : (i.checked = !1, i.indeterminate = !0), r(i);
	}, i = (e, t) => {
		e.disabled || (n(e, t), r(e));
	};
	return {
		toggleCheck: i,
		setCheckedKeys: (e) => {
			Array.from(t.value.values()).forEach((e) => {
				e.checked = !1, e.indeterminate = !1;
			}), e.forEach((e) => {
				let r = t.value.get(e);
				r && n(r, !0);
			}), Array.from(t.value.values()).forEach((e) => {
				e.isLeaf && r(e);
			});
		},
		setChecked: (e, n) => {
			let r = t.value.get(e);
			r && i(r, n);
		},
		getCheckedNodes: (e = !1) => Array.from(t.value.values()).filter((t) => t.checked && (!e || t.isLeaf)).map((e) => e.data),
		getCheckedKeys: (e = !1) => Array.from(t.value.values()).filter((t) => t.checked && (!e || t.isLeaf)).map((e) => e.key),
		getHalfCheckedNodes: () => Array.from(t.value.values()).filter((e) => e.indeterminate).map((e) => e.data),
		getHalfCheckedKeys: () => Array.from(t.value.values()).filter((e) => e.indeterminate).map((e) => e.key),
		initCheckedState: () => {
			e.showCheckbox && !e.checkStrictly && e.defaultCheckedKeys?.length && (e.defaultCheckedKeys.forEach((e) => {
				let r = t.value.get(e);
				r && n(r, !0);
			}), Array.from(t.value.values()).forEach((e) => {
				e.isLeaf && r(e);
			}));
		}
	};
}
//#endregion
//#region src/components/composables/use-filter.ts
function M(e, t, n) {
	return { filter: (r) => {
		if (!e.filterMethod) return;
		Array.from(t.value.values()).forEach((e) => e.visible = !1);
		let i = (t) => {
			let n = !1;
			for (let a of t) {
				let t = e.filterMethod ? e.filterMethod(r, a.data) : !0, o = !1;
				a.isLeaf || (o = i(a.children)), a.visible = t || o, a.visible && (n = !0);
			}
			return n;
		};
		i(Array.from(t.value.values()).filter((e) => e.parentKey === null)), n();
	} };
}
//#endregion
//#region src/components/composables/use-virtual-scroll.ts
function N(e, n) {
	let r = f(null), i = f(0), a = t(() => n.value.length * (e.itemSize ?? 26)), o = t(() => Math.ceil((e.height ?? 400) / (e.itemSize ?? 26)) + 4), s = t(() => Math.floor(i.value / (e.itemSize ?? 26)));
	return {
		containerRef: r,
		scrollTop: i,
		totalHeight: a,
		visibleData: t(() => {
			let e = Math.max(0, s.value - 2), t = Math.min(n.value.length, e + o.value);
			return n.value.slice(e, t);
		}),
		offset: t(() => Math.max(0, s.value - 2) * (e.itemSize ?? 26)),
		handleScroll: (e) => {
			i.value = e.target.scrollTop;
		}
	};
}
//#endregion
//#region src/components/Tree.vue?vue&type=script&setup=true&lang.ts
var P = {
	key: 0,
	class: "bzsh-tree__empty-block"
}, F = { class: "bzsh-tree__empty-text" }, I = /* @__PURE__ */ x(/* @__PURE__ */ s({
	__name: "Tree",
	props: {
		data: {},
		emptyText: { default: "No Data" },
		height: { default: 400 },
		itemSize: { default: 26 },
		props: {},
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
		defaultExpandedKeys: {},
		showCheckbox: {
			type: Boolean,
			default: !1
		},
		checkStrictly: {
			type: Boolean,
			default: !1
		},
		defaultCheckedKeys: {},
		currentNodeKey: {},
		filterMethod: {},
		indent: { default: 16 },
		icon: {},
		nodeKey: { default: "id" }
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
		let f = t, h = c, { nodeMap: b, flattenData: x, currentNodeKey: S, buildTree: C, computeVisibleData: w, expandAll: T, collapseAll: E, setData: D, toggleExpand: O } = A(f), { initCheckedState: I, toggleCheck: L, setCheckedKeys: R, setChecked: z, getCheckedNodes: B, getCheckedKeys: V, getHalfCheckedNodes: H, getHalfCheckedKeys: U } = j(f, b), { filter: W } = M(f, b, w), { containerRef: G, totalHeight: K, visibleData: q, offset: J, handleScroll: Y } = N(f, x);
		v(() => f.data, (e) => {
			b.value.clear(), C(e), I(), w();
		}, {
			deep: !0,
			immediate: !0
		});
		let X = (e) => {
			O(e), e.expanded ? h("node-expand", e.data, e) : h("node-collapse", e.data, e);
		}, Z = (e, t) => {
			L(e, t), h("check-change", e.data, e.checked, e.indeterminate), h("check", e.data, {
				checkedNodes: B(),
				checkedKeys: V(),
				halfCheckedNodes: H(),
				halfCheckedKeys: U()
			});
		}, Q = (e) => {
			S.value = e.key, h("node-click", e.data, e), h("current-change", e.data, e), f.expandOnClickNode && X(e), f.checkOnClickNode && f.showCheckbox && !e.disabled && Z(e, !e.checked);
		};
		return s({
			getCheckedNodes: B,
			getCheckedKeys: V,
			getHalfCheckedNodes: H,
			getHalfCheckedKeys: U,
			setCheckedKeys: R,
			setChecked: z,
			getCurrentKey: () => S.value,
			getCurrentNode: () => {
				if (S.value !== void 0) return b.value.get(S.value)?.data;
			},
			setCurrentKey: (e) => {
				S.value = e;
			},
			expandAll: T,
			collapseAll: E,
			setData: D,
			filter: W
		}), u(() => {
			G.value && (G.value.style.height = `${f.height}px`);
		}), (s, c) => (d(), i("div", {
			ref_key: "containerRef",
			ref: G,
			class: "bzsh-tree",
			onScroll: c[0] ||= (...e) => _(Y) && _(Y)(...e)
		}, [_(q).length ? (d(), i("div", {
			key: 1,
			class: "bzsh-tree-phantom",
			style: l({ height: `${_(K)}px` })
		}, null, 4)) : (d(), i("div", P, [m(s.$slots, "empty", {}, () => [a("span", F, g(t.emptyText), 1)], !0)])), _(q).length ? (d(), i("div", {
			key: 2,
			class: "bzsh-tree-content",
			style: l({ transform: `translateY(${_(J)}px)` })
		}, [(d(!0), i(e, null, p(_(q), (e) => (d(), n(k, {
			key: e.key,
			node: e,
			"item-size": t.itemSize,
			indent: t.indent,
			"show-checkbox": t.showCheckbox,
			"is-current": _(S) === e.key,
			"highlight-current": t.highlightCurrent,
			icon: t.icon,
			onToggle: X,
			onClick: Q,
			onCheck: Z
		}, o({ _: 2 }, [s.$slots.default ? {
			name: "default",
			fn: y(({ node: e, data: t }) => [m(s.$slots, "default", {
				node: e,
				data: t
			}, void 0, !0)]),
			key: "0"
		} : void 0]), 1032, [
			"node",
			"item-size",
			"indent",
			"show-checkbox",
			"is-current",
			"highlight-current",
			"icon"
		]))), 128))], 4)) : r("", !0)], 544));
	}
}), [["__scopeId", "data-v-6727800b"]]), L = { install(e) {
	e.component("BzshTree", I);
} };
//#endregion
export { I as Tree, L as default };
