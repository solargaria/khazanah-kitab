const C = '\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF';
const IS_AR = new RegExp(`[${C}]`);
const IS_AR_G = new RegExp(`[${C}]`, 'g');
const RUN = new RegExp(`[${C}](?:[${C}\\s\\u200c\\u200d]*[${C}])?`, 'g');

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

function classes(node) {
  const c = node.properties && node.properties.className;
  return Array.isArray(c) ? c : c ? [String(c)] : [];
}

function arabicRatio(text) {
  const nonSpace = text.replace(/\s/g, '');
  if (!nonSpace.length) return 0;
  const ar = (nonSpace.match(IS_AR_G) || []).length;
  return ar / nonSpace.length;
}

function wrapRuns(value) {
  const out = [];
  let last = 0;
  for (const m of value.matchAll(RUN)) {
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    out.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['arabic-inline'], lang: 'ar', dir: 'rtl' },
      children: [{ type: 'text', value: m[0] }],
    });
    last = m.index + m[0].length;
  }
  if (last === 0) return null;
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

function visit(node) {
  if (!node.children) return;
  if (node.type === 'element') {
    if (node.tagName === 'code' || node.tagName === 'pre') return;
    const cls = classes(node);
    if (cls.includes('arabic') || cls.includes('arabic-inline')) return;
    if (node.tagName === 'p') {
      const text = textOf(node);
      if (IS_AR.test(text) && arabicRatio(text) > 0.8) {
        const add = ['arabic'];
        if (/[\uFD3E\uFD3F]/.test(text)) add.push('ayah-ar');
        node.properties = { ...node.properties, className: [...cls, ...add], lang: 'ar', dir: 'rtl' };
        return;
      }
    }
  }
  const next = [];
  for (const child of node.children) {
    if (child.type === 'text' && IS_AR.test(child.value)) {
      const wrapped = wrapRuns(child.value);
      if (wrapped) { next.push(...wrapped); continue; }
    }
    visit(child);
    next.push(child);
  }
  node.children = next;
}

export default function rehypeArabic() {
  return (tree) => visit(tree);
}
