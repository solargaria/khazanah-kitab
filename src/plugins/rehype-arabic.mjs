// src/plugins/rehype-arabic.mjs
// 1) ย่อหน้าที่เป็นอารบิกเกือบทั้งหมด (>80%) -> class "arabic" (lang=ar, dir=rtl)
// 2) ย่อหน้าอารบิกนั้นจะได้ class "ayah-ar" (การ์ดอายะฮ์) เมื่อ
//      - มี ﴿ หรือ ﴾ หรือ
//      - ตามด้วย blockquote (คำแปล) ทันที  <- เพิ่มใหม่: รองรับอายะฮ์ที่ไม่มี ﴿﴾
// 3) อารบิกที่แทรกในประโยคไทย/มลายู -> <span class="arabic-inline" lang="ar" dir="rtl">

const ARCH = '\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF';
const AR_CHAR = new RegExp(`[${ARCH}]`);
const AR_RUN = new RegExp(`[${ARCH}](?:[${ARCH}\\s\\u200c\\u200d]*[${ARCH}])?`, 'g');
const ORNAMENT = /[﴾﴿]/; // ﴾ ﴿
const SKIP = new Set(['code', 'pre', 'script', 'style']);

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

function arabicRatio(s) {
  const t = s.replace(/\s+/g, '');
  if (!t) return 0;
  let n = 0;
  for (const c of t) if (AR_CHAR.test(c)) n++;
  return n / t.length;
}

function addClass(node, ...names) {
  node.properties = node.properties || {};
  const cur = node.properties.className;
  const list = Array.isArray(cur) ? cur : cur ? [String(cur)] : [];
  for (const n of names) if (!list.includes(n)) list.push(n);
  node.properties.className = list;
}

function nextElement(siblings, i) {
  for (let j = i + 1; j < siblings.length; j++) {
    const s = siblings[j];
    if (s.type === 'text' && !s.value.trim()) continue;
    return s.type === 'element' ? s : null;
  }
  return null;
}

function wrapInline(node) {
  if (!node.children) return;
  const out = [];
  for (const child of node.children) {
    if (child.type === 'text') {
      AR_RUN.lastIndex = 0;
      let last = 0, m, any = false;
      while ((m = AR_RUN.exec(child.value)) !== null) {
        any = true;
        if (m.index > last) out.push({ type: 'text', value: child.value.slice(last, m.index) });
        out.push({
          type: 'element',
          tagName: 'span',
          properties: { className: ['arabic-inline'], lang: 'ar', dir: 'rtl' },
          children: [{ type: 'text', value: m[0] }],
        });
        last = m.index + m[0].length;
      }
      if (!any) { out.push(child); continue; }
      if (last < child.value.length) out.push({ type: 'text', value: child.value.slice(last) });
    } else {
      if (child.type === 'element') {
        const cls = child.properties && child.properties.className;
        const done = Array.isArray(cls) && (cls.includes('arabic-inline') || cls.includes('arabic'));
        if (!SKIP.has(child.tagName) && !done) wrapInline(child);
      }
      out.push(child);
    }
  }
  node.children = out;
}

function walk(node) {
  if (!node.children) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type !== 'element') continue;
    if (SKIP.has(child.tagName)) continue;

    if (child.tagName === 'p') {
      const txt = textOf(child);
      if (arabicRatio(txt) > 0.8) {
        addClass(child, 'arabic');
        child.properties.lang = 'ar';
        child.properties.dir = 'rtl';
        const nxt = nextElement(node.children, i);
        if (ORNAMENT.test(txt) || (nxt && nxt.tagName === 'blockquote')) addClass(child, 'ayah-ar');
        continue; // ย่อหน้าอารบิกทั้งย่อหน้า ไม่ต้องห่อ span
      }
    }
    walk(child);
  }
}

export default function rehypeArabic() {
  return (tree) => {
    walk(tree);
    wrapInline(tree);
  };
}
