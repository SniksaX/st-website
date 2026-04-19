import C, { createElement as sr } from "react";
var w = "-ms-", we = "-moz-", b = "-webkit-", vt = "comm", Oe = "rule", st = "decl", or = "@import", ir = "@namespace", _t = "@keyframes", cr = "@layer", Et = Math.abs, ot = String.fromCharCode, Ke = Object.assign;
function ar(e, t) {
  return A(e, 0) ^ 45 ? (((t << 2 ^ A(e, 0)) << 2 ^ A(e, 1)) << 2 ^ A(e, 2)) << 2 ^ A(e, 3) : 0;
}
function Tt(e) {
  return e.trim();
}
function B(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function d(e, t, r) {
  return e.replace(t, r);
}
function Re(e, t, r) {
  return e.indexOf(t, r);
}
function A(e, t) {
  return e.charCodeAt(t) | 0;
}
function ee(e, t, r) {
  return e.slice(t, r);
}
function D(e) {
  return e.length;
}
function Mt(e) {
  return e.length;
}
function ye(e, t) {
  return t.push(e), e;
}
function ur(e, t) {
  return e.map(t).join("");
}
function bt(e, t) {
  return e.filter(function(r) {
    return !B(r, t);
  });
}
var Me = 1, ae = 1, Gt = 0, G = 0, I = 0, fe = "";
function Ge(e, t, r, n, s, o, c, i) {
  return { value: e, root: t, parent: r, type: n, props: s, children: o, line: Me, column: ae, length: c, return: "", siblings: i };
}
function H(e, t) {
  return Ke(Ge("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function oe(e) {
  for (; e.root; )
    e = H(e.root, { children: [e] });
  ye(e, e.siblings);
}
function lr() {
  return I;
}
function fr() {
  return I = G > 0 ? A(fe, --G) : 0, ae--, I === 10 && (ae = 1, Me--), I;
}
function W() {
  return I = G < Gt ? A(fe, G++) : 0, ae++, I === 10 && (ae = 1, Me++), I;
}
function U() {
  return A(fe, G);
}
function Pe() {
  return G;
}
function Fe(e, t) {
  return ee(fe, e, t);
}
function Ce(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function hr(e) {
  return Me = ae = 1, Gt = D(fe = e), G = 0, [];
}
function dr(e) {
  return fe = "", e;
}
function Le(e) {
  return Tt(Fe(G - 1, Ze(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function pr(e) {
  for (; (I = U()) && I < 33; )
    W();
  return Ce(e) > 2 || Ce(I) > 3 ? "" : " ";
}
function gr(e, t) {
  for (; --t && W() && !(I < 48 || I > 102 || I > 57 && I < 65 || I > 70 && I < 97); )
    ;
  return Fe(e, Pe() + (t < 6 && U() == 32 && W() == 32));
}
function Ze(e) {
  for (; W(); )
    switch (I) {
      // ] ) " '
      case e:
        return G;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Ze(I);
        break;
      // (
      case 40:
        e === 41 && Ze(e);
        break;
      // \
      case 92:
        W();
        break;
    }
  return G;
}
function mr(e, t) {
  for (; W() && e + I !== 57; )
    if (e + I === 84 && U() === 47)
      break;
  return "/*" + Fe(t, G - 1) + "*" + ot(e === 47 ? e : W());
}
function yr(e) {
  for (; !Ce(U()); )
    W();
  return Fe(e, G);
}
function br(e) {
  return dr(ke("", null, null, null, [""], e = hr(e), 0, [0], e));
}
function ke(e, t, r, n, s, o, c, i, a) {
  for (var u = 0, l = 0, f = c, g = 0, $ = 0, m = 0, S = 1, P = 1, x = 1, h = 0, j = "", F = s, O = o, R = n, p = j; P; )
    switch (m = h, h = W()) {
      // (
      case 40:
        if (m != 108 && A(p, f - 1) == 58) {
          Re(p += d(Le(h), "&", "&\f"), "&\f", Et(u ? i[u - 1] : 0)) != -1 && (x = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        p += Le(h);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        p += pr(m);
        break;
      // \
      case 92:
        p += gr(Pe() - 1, 7);
        continue;
      // /
      case 47:
        switch (U()) {
          case 42:
          case 47:
            ye(Sr(mr(W(), Pe()), t, r, a), a), (Ce(m || 1) == 5 || Ce(U() || 1) == 5) && D(p) && ee(p, -1, void 0) !== " " && (p += " ");
            break;
          default:
            p += "/";
        }
        break;
      // {
      case 123 * S:
        i[u++] = D(p) * x;
      // } ; \0
      case 125 * S:
      case 59:
      case 0:
        switch (h) {
          // \0 }
          case 0:
          case 125:
            P = 0;
          // ;
          case 59 + l:
            x == -1 && (p = d(p, /\f/g, "")), $ > 0 && (D(p) - f || S === 0 && m === 47) && ye($ > 32 ? wt(p + ";", n, r, f - 1, a) : wt(d(p, " ", "") + ";", n, r, f - 2, a), a);
            break;
          // @ ;
          case 59:
            p += ";";
          // { rule/at-rule
          default:
            if (ye(R = St(p, t, r, u, l, s, i, j, F = [], O = [], f, o), o), h === 123)
              if (l === 0)
                ke(p, t, R, R, F, o, f, i, O);
              else {
                switch (g) {
                  // c(ontainer)
                  case 99:
                    if (A(p, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (A(p, 2) === 97) break;
                  default:
                    l = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                l ? ke(e, R, R, n && ye(St(e, R, R, 0, 0, s, i, j, s, F = [], f, O), O), s, O, f, i, n ? F : O) : ke(p, R, R, R, [""], O, 0, i, O);
              }
        }
        u = l = $ = 0, S = x = 1, j = p = "", f = c;
        break;
      // :
      case 58:
        f = 1 + D(p), $ = m;
      default:
        if (S < 1) {
          if (h == 123)
            --S;
          else if (h == 125 && S++ == 0 && fr() == 125)
            continue;
        }
        switch (p += ot(h), h * S) {
          // &
          case 38:
            x = l > 0 ? 1 : (p += "\f", -1);
            break;
          // ,
          case 44:
            i[u++] = (D(p) - 1) * x, x = 1;
            break;
          // @
          case 64:
            U() === 45 && (p += Le(W())), g = U(), l = f = D(j = p += yr(Pe())), h++;
            break;
          // -
          case 45:
            m === 45 && D(p) == 2 && (S = 0);
        }
    }
  return o;
}
function St(e, t, r, n, s, o, c, i, a, u, l, f) {
  for (var g = s - 1, $ = s === 0 ? o : [""], m = Mt($), S = 0, P = 0, x = 0; S < n; ++S)
    for (var h = 0, j = ee(e, g + 1, g = Et(P = c[S])), F = e; h < m; ++h)
      (F = Tt(P > 0 ? $[h] + " " + j : d(j, /&\f/g, $[h]))) && (a[x++] = F);
  return Ge(e, t, r, s === 0 ? Oe : i, a, u, l, f);
}
function Sr(e, t, r, n) {
  return Ge(e, t, r, vt, ot(lr()), ee(e, 2, -2), 0, n);
}
function wt(e, t, r, n, s) {
  return Ge(e, t, r, st, ee(e, 0, n), ee(e, n + 1, -1), n, s);
}
function Ft(e, t, r) {
  switch (ar(e, t)) {
    // color-adjust
    case 5103:
      return b + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return b + e + e;
    // mask-composite
    case 4855:
      return b + e.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + e;
    // tab-size
    case 4789:
      return we + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return b + e + we + e + w + e + e;
    // writing-mode
    case 5936:
      switch (A(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return b + e + w + d(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return b + e + w + d(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return b + e + w + d(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    // flex, flex-direction, scroll-snap-type, writing-mode
    case 6828:
    case 4268:
    case 2903:
      return b + e + w + e + e;
    // order
    case 6165:
      return b + e + w + "flex-" + e + e;
    // align-items
    case 5187:
      return b + e + d(e, /(\w+).+(:[^]+)/, b + "box-$1$2" + w + "flex-$1$2") + e;
    // align-self
    case 5443:
      return b + e + w + "flex-item-" + d(e, /flex-|-self/g, "") + (B(e, /flex-|baseline/) ? "" : w + "grid-row-" + d(e, /flex-|-self/g, "")) + e;
    // align-content
    case 4675:
      return b + e + w + "flex-line-pack" + d(e, /align-content|flex-|-self/g, "") + e;
    // flex-shrink
    case 5548:
      return b + e + w + d(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return b + e + w + d(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return b + "box-" + d(e, "-grow", "") + b + e + w + d(e, "grow", "positive") + e;
    // transition
    case 4554:
      return b + d(e, /([^-])(transform)/g, "$1" + b + "$2") + e;
    // cursor
    case 6187:
      return d(d(d(e, /(zoom-|grab)/, b + "$1"), /(image-set)/, b + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return d(e, /(image-set\([^]*)/, b + "$1$`$1");
    // justify-content
    case 4968:
      return d(d(e, /(.+:)(flex-)?(.*)/, b + "box-pack:$3" + w + "flex-pack:$3"), /space-between/, "justify") + b + e + e;
    // justify-self
    case 4200:
      if (!B(e, /flex-|baseline/)) return w + "grid-column-align" + ee(e, t) + e;
      break;
    // grid-template-(columns|rows)
    case 2592:
    case 3360:
      return w + d(e, "template-", "") + e;
    // grid-(row|column)-start
    case 4384:
    case 3616:
      return r && r.some(function(n, s) {
        return t = s, B(n.props, /grid-\w+-end/);
      }) ? ~Re(e + (r = r[t].value), "span", 0) ? e : w + d(e, "-start", "") + e + w + "grid-row-span:" + (~Re(r, "span", 0) ? B(r, /\d+/) : +B(r, /\d+/) - +B(e, /\d+/)) + ";" : w + d(e, "-start", "") + e;
    // grid-(row|column)-end
    case 4896:
    case 4128:
      return r && r.some(function(n) {
        return B(n.props, /grid-\w+-start/);
      }) ? e : w + d(d(e, "-end", "-span"), "span ", "") + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return d(e, /(.+)-inline(.+)/, b + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (D(e) - 1 - t > 6)
        switch (A(e, t + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            if (A(e, t + 4) !== 45)
              break;
          // (f)ill-available, (f)it-content
          case 102:
            return d(e, /(.+:)(.+)-([^]+)/, "$1" + b + "$2-$3$1" + we + (A(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          // (s)tretch
          case 115:
            return ~Re(e, "stretch", 0) ? Ft(d(e, "stretch", "fill-available"), t, r) + e : e;
        }
      break;
    // grid-(column|row)
    case 5152:
    case 5920:
      return d(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(n, s, o, c, i, a, u) {
        return w + s + ":" + o + u + (c ? w + s + "-span:" + (i ? a : +a - +o) + u : "") + e;
      });
    // position: sticky
    case 4949:
      if (A(e, t + 6) === 121)
        return d(e, ":", ":" + b) + e;
      break;
    // display: (flex|inline-flex|grid|inline-grid)
    case 6444:
      switch (A(e, A(e, 14) === 45 ? 18 : 11)) {
        // (inline-)?fle(x)
        case 120:
          return d(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + b + (A(e, 14) === 45 ? "inline-" : "") + "box$3$1" + b + "$2$3$1" + w + "$2box$3") + e;
        // (inline-)?gri(d)
        case 100:
          return d(e, ":", ":" + w) + e;
      }
      break;
    // scroll-margin, scroll-margin-(top|right|bottom|left)
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return d(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function _e(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function wr(e, t, r, n) {
  switch (e.type) {
    case cr:
      if (e.children.length) break;
    case or:
    case ir:
    case st:
      return e.return = e.return || e.value;
    case vt:
      return "";
    case _t:
      return e.return = e.value + "{" + _e(e.children, n) + "}";
    case Oe:
      if (!D(e.value = e.props.join(","))) return "";
  }
  return D(r = _e(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function Cr(e) {
  var t = Mt(e);
  return function(r, n, s, o) {
    for (var c = "", i = 0; i < t; i++)
      c += e[i](r, n, s, o) || "";
    return c;
  };
}
function $r(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function xr(e, t, r, n) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case st:
        e.return = Ft(e.value, e.length, r);
        return;
      case _t:
        return _e([H(e, { value: d(e.value, "@", "@" + b) })], n);
      case Oe:
        if (e.length)
          return ur(r = e.props, function(s) {
            switch (B(s, n = /(::plac\w+|:read-\w+)/)) {
              // :read-(only|write)
              case ":read-only":
              case ":read-write":
                oe(H(e, { props: [d(s, /:(read-\w+)/, ":" + we + "$1")] })), oe(H(e, { props: [s] })), Ke(e, { props: bt(r, n) });
                break;
              // :placeholder
              case "::placeholder":
                oe(H(e, { props: [d(s, /:(plac\w+)/, ":" + b + "input-$1")] })), oe(H(e, { props: [d(s, /:(plac\w+)/, ":" + we + "$1")] })), oe(H(e, { props: [d(s, /:(plac\w+)/, w + "input-$1")] })), oe(H(e, { props: [s] })), Ke(e, { props: bt(r, n) });
                break;
            }
            return "";
          });
    }
}
var Be, qe;
const L = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", zt = "active", Ee = "data-styled-version", ue = "6.4.0", it = `/*!sc*/
`, ce = typeof window < "u" && typeof document < "u";
function Ct(e) {
  if (typeof process < "u" && process.env !== void 0) {
    const t = process.env[e];
    if (t !== void 0 && t !== "") return t !== "false";
  }
}
const Or = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : (qe = (Be = Ct("REACT_APP_SC_DISABLE_SPEEDY")) !== null && Be !== void 0 ? Be : Ct("SC_DISABLE_SPEEDY")) !== null && qe !== void 0 ? qe : typeof process > "u" || process.env === void 0), Dt = "sc-keyframes-", Ir = {};
function M(e, ...t) {
  return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length > 0 ? ` Args: ${t.join(", ")}` : ""}`);
}
let Ne = /* @__PURE__ */ new Map(), Te = /* @__PURE__ */ new Map(), je = 1;
const be = (e) => {
  if (Ne.has(e)) return Ne.get(e);
  for (; Te.has(je); ) je++;
  const t = je++;
  return Ne.set(e, t), Te.set(t, e), t;
}, Ar = (e) => Te.get(e), Rr = (e, t) => {
  je = t + 1, Ne.set(e, t), Te.set(t, e);
}, ct = Object.freeze([]), le = Object.freeze({});
function at(e, t, r = le) {
  return e.theme !== r.theme && e.theme || t || r.theme;
}
const Pr = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, kr = /(^-|-$)/g;
function Wt(e) {
  return e.replace(Pr, "-").replace(kr, "");
}
const Nr = /(a)(d)/gi, $t = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97));
function ut(e) {
  let t, r = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0) r = $t(t % 52) + r;
  return ($t(t % 52) + r).replace(Nr, "$1-$2");
}
const Je = 5381, X = (e, t) => {
  let r = t.length;
  for (; r; ) e = 33 * e ^ t.charCodeAt(--r);
  return e;
}, Lt = (e) => X(Je, e);
function lt(e) {
  return ut(Lt(e) >>> 0);
}
function Bt(e) {
  return e.displayName || e.name || "Component";
}
function Qe(e) {
  return typeof e == "string" && !0;
}
function jr(e) {
  return Qe(e) ? `styled.${e}` : `Styled(${Bt(e)})`;
}
const qt = /* @__PURE__ */ Symbol.for("react.memo"), vr = /* @__PURE__ */ Symbol.for("react.forward_ref"), _r = { contextType: !0, defaultProps: !0, displayName: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, propTypes: !0, type: !0 }, Er = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }, Yt = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }, Tr = { [vr]: { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }, [qt]: Yt };
function xt(e) {
  return ("type" in (t = e) && t.type.$$typeof) === qt ? Yt : "$$typeof" in e ? Tr[e.$$typeof] : _r;
  var t;
}
const Mr = Object.defineProperty, Gr = Object.getOwnPropertyNames, Fr = Object.getOwnPropertySymbols, zr = Object.getOwnPropertyDescriptor, Dr = Object.getPrototypeOf, Wr = Object.prototype;
function ft(e, t, r) {
  if (typeof t != "string") {
    const n = Dr(t);
    n && n !== Wr && ft(e, n, r);
    const s = Gr(t).concat(Fr(t)), o = xt(e), c = xt(t);
    for (let i = 0; i < s.length; ++i) {
      const a = s[i];
      if (!(a in Er || r && r[a] || c && a in c || o && a in o)) {
        const u = zr(t, a);
        try {
          Mr(e, a, u);
        } catch {
        }
      }
    }
  }
  return e;
}
function he(e) {
  return typeof e == "function";
}
function ht(e) {
  return typeof e == "object" && "styledComponentId" in e;
}
function Se(e, t) {
  return e && t ? e + " " + t : e || t || "";
}
function $e(e, t) {
  return e.join(t || "");
}
function xe(e) {
  return e !== null && typeof e == "object" && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function Xe(e, t, r = !1) {
  if (!r && !xe(e) && !Array.isArray(e)) return t;
  if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e[n] = Xe(e[n], t[n]);
  else if (xe(t)) for (const n in t) e[n] = Xe(e[n], t[n]);
  return e;
}
function dt(e, t) {
  Object.defineProperty(e, "toString", { value: t });
}
const Lr = class {
  constructor(e) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e, this._cGroup = 0, this._cIndex = 0;
  }
  indexOfGroup(e) {
    if (e === this._cGroup) return this._cIndex;
    let t = this._cIndex;
    if (e > this._cGroup) for (let r = this._cGroup; r < e; r++) t += this.groupSizes[r];
    else for (let r = this._cGroup - 1; r >= e; r--) t -= this.groupSizes[r];
    return this._cGroup = e, this._cIndex = t, t;
  }
  insertRules(e, t) {
    if (e >= this.groupSizes.length) {
      const s = this.groupSizes, o = s.length;
      let c = o;
      for (; e >= c; ) if (c <<= 1, c < 0) throw M(16, `${e}`);
      this.groupSizes = new Uint32Array(c), this.groupSizes.set(s), this.length = c;
      for (let i = o; i < c; i++) this.groupSizes[i] = 0;
    }
    let r = this.indexOfGroup(e + 1), n = 0;
    for (let s = 0, o = t.length; s < o; s++) this.tag.insertRule(r, t[s]) && (this.groupSizes[e]++, r++, n++);
    n > 0 && this._cGroup > e && (this._cIndex += n);
  }
  clearGroup(e) {
    if (e < this.length) {
      const t = this.groupSizes[e], r = this.indexOfGroup(e), n = r + t;
      this.groupSizes[e] = 0;
      for (let s = r; s < n; s++) this.tag.deleteRule(r);
      t > 0 && this._cGroup > e && (this._cIndex -= t);
    }
  }
  getGroup(e) {
    let t = "";
    if (e >= this.length || this.groupSizes[e] === 0) return t;
    const r = this.groupSizes[e], n = this.indexOfGroup(e), s = n + r;
    for (let o = n; o < s; o++) t += this.tag.getRule(o) + it;
    return t;
  }
}, Br = `style[${L}][${Ee}="${ue}"]`, qr = new RegExp(`^${L}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`), Ot = (e) => typeof ShadowRoot < "u" && e instanceof ShadowRoot || "host" in e && e.nodeType === 11, et = (e) => {
  if (!e) return document;
  if (Ot(e)) return e;
  if ("getRootNode" in e) {
    const t = e.getRootNode();
    if (Ot(t)) return t;
  }
  return document;
}, Yr = (e, t, r) => {
  const n = r.split(",");
  let s;
  for (let o = 0, c = n.length; o < c; o++) (s = n[o]) && e.registerName(t, s);
}, Vr = (e, t) => {
  var r;
  const n = ((r = t.textContent) !== null && r !== void 0 ? r : "").split(it), s = [];
  for (let o = 0, c = n.length; o < c; o++) {
    const i = n[o].trim();
    if (!i) continue;
    const a = i.match(qr);
    if (a) {
      const u = 0 | parseInt(a[1], 10), l = a[2];
      u !== 0 && (Rr(l, u), Yr(e, l, a[3]), e.getTag().insertRules(u, s)), s.length = 0;
    } else s.push(i);
  }
}, Ye = (e) => {
  const t = et(e.options.target).querySelectorAll(Br);
  for (let r = 0, n = t.length; r < n; r++) {
    const s = t[r];
    s && s.getAttribute(L) !== zt && (Vr(e, s), s.parentNode && s.parentNode.removeChild(s));
  }
};
let me = !1;
function tt() {
  if (me !== !1) return me;
  if (typeof document < "u") {
    const e = document.head.querySelector('meta[property="csp-nonce"]');
    if (e) return me = e.nonce || e.getAttribute("content") || void 0;
    const t = document.head.querySelector('meta[name="sc-nonce"]');
    if (t) return me = t.getAttribute("content") || void 0;
  }
  return me = typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : void 0;
}
const Vt = (e, t) => {
  const r = document.head, n = e || r, s = document.createElement("style"), o = ((a) => {
    const u = Array.from(a.querySelectorAll(`style[${L}]`));
    return u[u.length - 1];
  })(n), c = o !== void 0 ? o.nextSibling : null;
  s.setAttribute(L, zt), s.setAttribute(Ee, ue);
  const i = t || tt();
  return i && s.setAttribute("nonce", i), n.insertBefore(s, c), s;
}, Hr = class {
  constructor(e, t) {
    this.element = Vt(e, t), this.element.appendChild(document.createTextNode("")), this.sheet = ((r) => {
      var n;
      if (r.sheet) return r.sheet;
      const s = (n = r.getRootNode().styleSheets) !== null && n !== void 0 ? n : document.styleSheets;
      for (let o = 0, c = s.length; o < c; o++) {
        const i = s[o];
        if (i.ownerNode === r) return i;
      }
      throw M(17);
    })(this.element), this.length = 0;
  }
  insertRule(e, t) {
    try {
      return this.sheet.insertRule(t, e), this.length++, !0;
    } catch {
      return !1;
    }
  }
  deleteRule(e) {
    this.sheet.deleteRule(e), this.length--;
  }
  getRule(e) {
    const t = this.sheet.cssRules[e];
    return t && t.cssText ? t.cssText : "";
  }
}, Ur = class {
  constructor(e, t) {
    this.element = Vt(e, t), this.nodes = this.element.childNodes, this.length = 0;
  }
  insertRule(e, t) {
    if (e <= this.length && e >= 0) {
      const r = document.createTextNode(t);
      return this.element.insertBefore(r, this.nodes[e] || null), this.length++, !0;
    }
    return !1;
  }
  deleteRule(e) {
    this.element.removeChild(this.nodes[e]), this.length--;
  }
  getRule(e) {
    return e < this.length ? this.nodes[e].textContent : "";
  }
};
let It = ce;
const Kr = { isServer: !ce, useCSSOMInjection: !Or };
class re {
  static registerId(t) {
    return be(t);
  }
  constructor(t = le, r = {}, n) {
    this.options = Object.assign(Object.assign({}, Kr), t), this.gs = r, this.keyframeIds = /* @__PURE__ */ new Set(), this.names = new Map(n), this.server = !!t.isServer, !this.server && ce && It && (It = !1, Ye(this)), dt(this, () => ((s) => {
      const o = s.getTag(), { length: c } = o;
      let i = "";
      for (let a = 0; a < c; a++) {
        const u = Ar(a);
        if (u === void 0) continue;
        const l = s.names.get(u);
        if (l === void 0 || !l.size) continue;
        const f = o.getGroup(a);
        if (f.length === 0) continue;
        const g = L + ".g" + a + '[id="' + u + '"]';
        let $ = "";
        for (const m of l) m.length > 0 && ($ += m + ",");
        i += f + g + '{content:"' + $ + '"}' + it;
      }
      return i;
    })(this));
  }
  rehydrate() {
    !this.server && ce && Ye(this);
  }
  reconstructWithOptions(t, r = !0) {
    const n = new re(Object.assign(Object.assign({}, this.options), t), this.gs, r && this.names || void 0);
    return n.keyframeIds = new Set(this.keyframeIds), !this.server && ce && t.target !== this.options.target && et(this.options.target) !== et(t.target) && Ye(n), n;
  }
  allocateGSInstance(t) {
    return this.gs[t] = (this.gs[t] || 0) + 1;
  }
  getTag() {
    return this.tag || (this.tag = (t = (({ useCSSOMInjection: r, target: n, nonce: s }) => r ? new Hr(n, s) : new Ur(n, s))(this.options), new Lr(t)));
    var t;
  }
  hasNameForId(t, r) {
    var n, s;
    return (s = (n = this.names.get(t)) === null || n === void 0 ? void 0 : n.has(r)) !== null && s !== void 0 && s;
  }
  registerName(t, r) {
    be(t), t.startsWith(Dt) && this.keyframeIds.add(t);
    const n = this.names.get(t);
    n ? n.add(r) : this.names.set(t, /* @__PURE__ */ new Set([r]));
  }
  insertRules(t, r, n) {
    this.registerName(t, r), this.getTag().insertRules(be(t), n);
  }
  clearNames(t) {
    this.names.has(t) && this.names.get(t).clear();
  }
  clearRules(t) {
    this.getTag().clearGroup(be(t)), this.clearNames(t);
  }
  clearTag() {
    this.tag = void 0;
  }
}
const Ht = /* @__PURE__ */ new WeakSet(), Zr = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexShrink: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, scale: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };
function Jr(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t != "number" || t === 0 || e in Zr || e.startsWith("--") ? String(t).trim() : t + "px";
}
const Qr = (e) => e >= "A" && e <= "Z";
function At(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    if (r === 1 && n === "-" && e[0] === "-") return e;
    Qr(n) ? t += "-" + n.toLowerCase() : t += n;
  }
  return t.startsWith("ms-") ? "-" + t : t;
}
const Ut = /* @__PURE__ */ Symbol.for("sc-keyframes");
function Xr(e) {
  return typeof e == "object" && e !== null && Ut in e;
}
function Kt(e) {
  return he(e) && !(e.prototype && e.prototype.isReactComponent);
}
const Zt = (e) => e == null || e === !1 || e === "", en = /* @__PURE__ */ Symbol.for("react.client.reference");
function Rt(e) {
  return e.$$typeof === en;
}
const Jt = (e) => {
  const t = [];
  for (const r in e) {
    const n = e[r];
    e.hasOwnProperty(r) && !Zt(n) && (Array.isArray(n) && Ht.has(n) || he(n) ? t.push(At(r) + ":", n, ";") : xe(n) ? t.push(r + " {", ...Jt(n), "}") : t.push(At(r) + ": " + Jr(r, n) + ";"));
  }
  return t;
};
function K(e, t, r, n, s = []) {
  if (Zt(e)) return s;
  const o = typeof e;
  if (o === "string") return s.push(e), s;
  if (o === "function") {
    if (Rt(e)) return s;
    if (Kt(e) && t) {
      const c = e(t);
      return K(c, t, r, n, s);
    }
    return s.push(e), s;
  }
  if (Array.isArray(e)) {
    for (let c = 0; c < e.length; c++) K(e[c], t, r, n, s);
    return s;
  }
  if (ht(e)) return s.push(`.${e.styledComponentId}`), s;
  if (Xr(e)) return r ? (e.inject(r, n), s.push(e.getName(n))) : s.push(e), s;
  if (Rt(e)) return s;
  if (xe(e)) {
    const c = Jt(e);
    for (let i = 0; i < c.length; i++) s.push(c[i]);
    return s;
  }
  return s.push(e.toString()), s;
}
const tn = Lt(ue);
class rn {
  constructor(t, r, n) {
    this.rules = t, this.componentId = r, this.baseHash = X(tn, r), this.baseStyle = n, re.registerId(r);
  }
  generateAndInjectStyles(t, r, n) {
    let s = this.baseStyle ? this.baseStyle.generateAndInjectStyles(t, r, n) : "";
    {
      let o = "";
      for (let c = 0; c < this.rules.length; c++) {
        const i = this.rules[c];
        if (typeof i == "string") o += i;
        else if (i) if (Kt(i)) {
          const a = i(t);
          typeof a == "string" ? o += a : a != null && a !== !1 && (o += $e(K(a, t, r, n)));
        } else o += $e(K(i, t, r, n));
      }
      if (o) {
        this.dynamicNameCache || (this.dynamicNameCache = /* @__PURE__ */ new Map());
        const c = n.hash ? n.hash + o : o;
        let i = this.dynamicNameCache.get(c);
        if (!i) {
          if (i = ut(X(X(this.baseHash, n.hash), o) >>> 0), this.dynamicNameCache.size >= 200) {
            const a = this.dynamicNameCache.keys().next().value;
            a !== void 0 && this.dynamicNameCache.delete(a);
          }
          this.dynamicNameCache.set(c, i);
        }
        if (!r.hasNameForId(this.componentId, i)) {
          const a = n(o, "." + i, void 0, this.componentId);
          r.insertRules(this.componentId, i, a);
        }
        s = Se(s, i);
      }
    }
    return s;
  }
}
const nn = /&/g, Q = 47;
function pt(e, t) {
  let r = 0;
  for (; --t >= 0 && e.charCodeAt(t) === 92; ) r++;
  return !(1 & ~r);
}
function Ve(e) {
  const t = e.length;
  let r = "", n = 0, s = 0, o = 0, c = !1, i = !1;
  for (let a = 0; a < t; a++) {
    const u = e.charCodeAt(a);
    if (o !== 0 || c || u !== Q || e.charCodeAt(a + 1) !== 42) if (c) u === 42 && e.charCodeAt(a + 1) === Q && (c = !1, a++);
    else if (u !== 34 && u !== 39 || pt(e, a)) {
      if (o === 0) if (u === 123) s++;
      else if (u === 125) {
        if (s--, s < 0) {
          i = !0;
          let l = a + 1;
          for (; l < t; ) {
            const f = e.charCodeAt(l);
            if (f === 59 || f === 10) break;
            l++;
          }
          l < t && e.charCodeAt(l) === 59 && l++, s = 0, a = l - 1, n = l;
          continue;
        }
        s === 0 && (r += e.substring(n, a + 1), n = a + 1);
      } else u === 59 && s === 0 && (r += e.substring(n, a + 1), n = a + 1);
    } else o === 0 ? o = u : o === u && (o = 0);
    else c = !0, a++;
  }
  return i || s !== 0 || o !== 0 ? (n < t && s === 0 && o === 0 && (r += e.substring(n)), r) : e;
}
function Qt(e, t) {
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    if (n.type === "rule") {
      n.value = t + " " + n.value, n.value = n.value.replaceAll(",", "," + t + " ");
      const s = n.props, o = [];
      for (let c = 0; c < s.length; c++) o[c] = t + " " + s[c];
      n.props = o;
    }
    Array.isArray(n.children) && n.type !== "@keyframes" && (n.children = Qt(n.children, t));
  }
  return e;
}
function Xt({ options: e = le, plugins: t = ct } = le) {
  let r, n, s;
  const o = (g, $, m) => m.startsWith(n) && m.endsWith(n) && m.replaceAll(n, "").length > 0 ? `.${r}` : g, c = t.slice();
  c.push((g) => {
    g.type === Oe && g.value.includes("&") && (s || (s = new RegExp(`\\${n}\\b`, "g")), g.props[0] = g.props[0].replace(nn, n).replace(s, o));
  }), e.prefix && c.push(xr), c.push(wr);
  let i = [];
  const a = Cr(c.concat($r((g) => i.push(g)))), u = (g, $ = "", m = "", S = "&") => {
    r = S, n = $, s = void 0;
    const P = (function(h) {
      const j = h.indexOf("//") !== -1, F = h.indexOf("}") !== -1;
      if (!j && !F) return h;
      if (!j) return Ve(h);
      const O = h.length;
      let R = "", p = 0, y = 0, Z = 0, ne = 0, T = 0, de = !1;
      for (; y < O; ) {
        const k = h.charCodeAt(y);
        if (k !== 34 && k !== 39 || pt(h, y)) if (Z === 0) if (k === Q && y + 1 < O && h.charCodeAt(y + 1) === 42) {
          for (y += 2; y + 1 < O && (h.charCodeAt(y) !== 42 || h.charCodeAt(y + 1) !== Q); ) y++;
          y += 2;
        } else if (k !== 40) if (k !== 41) if (ne > 0) y++;
        else if (k === 42 && y + 1 < O && h.charCodeAt(y + 1) === Q) R += h.substring(p, y), y += 2, p = y, de = !0;
        else if (k === Q && y + 1 < O && h.charCodeAt(y + 1) === Q) {
          for (R += h.substring(p, y); y < O && h.charCodeAt(y) !== 10; ) y++;
          p = y, de = !0;
        } else k === 123 ? T++ : k === 125 && T--, y++;
        else ne > 0 && ne--, y++;
        else ne++, y++;
        else y++;
        else Z === 0 ? Z = k : Z === k && (Z = 0), y++;
      }
      return de ? (p < O && (R += h.substring(p)), T === 0 ? R : Ve(R)) : T === 0 ? h : Ve(h);
    })(g);
    let x = br(m || $ ? m + " " + $ + " { " + P + " }" : P);
    return e.namespace && (x = Qt(x, e.namespace)), i = [], _e(x, a), i;
  }, l = e;
  let f = Je;
  for (let g = 0; g < t.length; g++) t[g].name || M(15), f = X(f, t[g].name);
  return l?.namespace && (f = X(f, l.namespace)), l?.prefix && (f = X(f, "p")), u.hash = f !== Je ? f.toString() : "", u;
}
const er = new re(), rt = Xt(), gt = C.createContext({ shouldForwardProp: void 0, styleSheet: er, stylis: rt, stylisPlugins: void 0 }), mn = gt.Consumer;
function mt() {
  return C.useContext(gt);
}
function sn(e) {
  var t;
  const r = mt(), { styleSheet: n } = r, s = C.useMemo(() => {
    let u = n;
    return e.sheet ? u = e.sheet : e.target ? u = u.reconstructWithOptions(e.nonce !== void 0 ? { target: e.target, nonce: e.nonce } : { target: e.target }, !1) : e.nonce !== void 0 && (u = u.reconstructWithOptions({ nonce: e.nonce })), e.disableCSSOMInjection && (u = u.reconstructWithOptions({ useCSSOMInjection: !1 })), u;
  }, [e.disableCSSOMInjection, e.nonce, e.sheet, e.target, n]), o = C.useMemo(() => {
    var u;
    return e.stylisPlugins === void 0 && e.namespace === void 0 && e.enableVendorPrefixes === void 0 ? r.stylis : Xt({ options: { namespace: e.namespace, prefix: e.enableVendorPrefixes }, plugins: (u = e.stylisPlugins) !== null && u !== void 0 ? u : r.stylisPlugins });
  }, [e.enableVendorPrefixes, e.namespace, e.stylisPlugins, r.stylis, r.stylisPlugins]), c = "shouldForwardProp" in e ? e.shouldForwardProp : r.shouldForwardProp, i = (t = e.stylisPlugins) !== null && t !== void 0 ? t : r.stylisPlugins, a = C.useMemo(() => ({ shouldForwardProp: c, styleSheet: s, stylis: o, stylisPlugins: i }), [c, s, o, i]);
  return C.createElement(gt.Provider, { value: a }, e.children);
}
const te = C.createContext(void 0), yn = te.Consumer;
function bn() {
  const e = C.useContext(te);
  if (!e) throw M(18);
  return e;
}
function Sn(e) {
  const t = C.useContext(te), r = C.useMemo(() => (function(n, s) {
    if (!n) throw M(14);
    if (he(n))
      return n(s);
    if (Array.isArray(n) || typeof n != "object") throw M(8);
    return s ? Object.assign(Object.assign({}, s), n) : n;
  })(e.theme, t), [e.theme, t]);
  return e.children ? C.createElement(te.Provider, { value: r }, e.children) : null;
}
const Pt = Object.prototype.hasOwnProperty, He = {};
function on(e, t) {
  const r = typeof e != "string" ? "sc" : Wt(e);
  He[r] = (He[r] || 0) + 1;
  const n = r + "-" + lt(ue + r + He[r]);
  return t ? t + "-" + n : n;
}
function cn(e, t, r) {
  const n = ht(e), s = e, o = !Qe(e), { attrs: c = ct, componentId: i = on(t.displayName, t.parentComponentId), displayName: a = jr(e) } = t, u = t.displayName && t.componentId ? Wt(t.displayName) + "-" + t.componentId : t.componentId || i, l = n && s.attrs ? s.attrs.concat(c).filter(Boolean) : c;
  let { shouldForwardProp: f } = t;
  if (n && s.shouldForwardProp) {
    const S = s.shouldForwardProp;
    if (t.shouldForwardProp) {
      const P = t.shouldForwardProp;
      f = (x, h) => S(x, h) && P(x, h);
    } else f = S;
  }
  const g = new rn(r, u, n ? s.componentStyle : void 0);
  function $(S, P) {
    return (function(x, h, j) {
      const { attrs: F, componentStyle: O, defaultProps: R, foldedComponentIds: p, styledComponentId: y, target: Z } = x, ne = C.useContext(te), T = mt(), de = x.shouldForwardProp || T.shouldForwardProp, k = at(h, ne, R) || le;
      let q, pe;
      {
        const Y = C.useRef(null), z = Y.current;
        if (z !== null && z[1] === k && z[2] === T.styleSheet && z[3] === T.stylis && z[7] === O && (function(se, E, v) {
          const _ = se, N = E;
          let ge = 0;
          for (const J in N) if (Pt.call(N, J) && (ge++, _[J] !== N[J])) return !1;
          return ge === v;
        })(z[0], h, z[4])) q = z[5], pe = z[6];
        else {
          q = (function(E, v, _) {
            const N = Object.assign(Object.assign({}, v), { className: void 0, theme: _ }), ge = E.length > 1;
            for (let J = 0; J < E.length; J++) {
              const We = E[J], Ae = he(We) ? We(ge ? Object.assign({}, N) : N) : We;
              for (const V in Ae) V === "className" ? N.className = Se(N.className, Ae[V]) : V === "style" ? N.style = Object.assign(Object.assign({}, N.style), Ae[V]) : V in v && v[V] === void 0 || (N[V] = Ae[V]);
            }
            return "className" in v && typeof v.className == "string" && (N.className = Se(N.className, v.className)), N;
          })(F, h, k), pe = (function(E, v, _, N) {
            return E.generateAndInjectStyles(v, _, N);
          })(O, q, T.styleSheet, T.stylis);
          let se = 0;
          for (const E in h) Pt.call(h, E) && se++;
          Y.current = [h, k, T.styleSheet, T.stylis, se, q, pe, O];
        }
      }
      const Ie = q.as || Z, ze = (function(Y, z, se, E) {
        const v = {};
        for (const _ in Y) Y[_] === void 0 || _[0] === "$" || _ === "as" || _ === "theme" && Y.theme === se || (_ === "forwardedAs" ? v.as = Y.forwardedAs : E && !E(_, z) || (v[_] = Y[_]));
        return v;
      })(q, Ie, k, de);
      let De = Se(p, y);
      return pe && (De += " " + pe), q.className && (De += " " + q.className), ze[Qe(Ie) && Ie.includes("-") ? "class" : "className"] = De, j && (ze.ref = j), sr(Ie, ze);
    })(m, S, P);
  }
  $.displayName = a;
  let m = C.forwardRef($);
  return m.attrs = l, m.componentStyle = g, m.displayName = a, m.shouldForwardProp = f, m.foldedComponentIds = n ? Se(s.foldedComponentIds, s.styledComponentId) : "", m.styledComponentId = u, m.target = n ? s.target : e, Object.defineProperty(m, "defaultProps", { get() {
    return this._foldedDefaultProps;
  }, set(S) {
    this._foldedDefaultProps = n ? (function(P, ...x) {
      for (const h of x) Xe(P, h, !0);
      return P;
    })({}, s.defaultProps, S) : S;
  } }), dt(m, () => `.${m.styledComponentId}`), o && ft(m, e, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0 }), m;
}
var an = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "body", "button", "br", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "menu", "meter", "nav", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "slot", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use"]);
function kt(e, t) {
  const r = [e[0]];
  for (let n = 0, s = t.length; n < s; n += 1) r.push(t[n], e[n + 1]);
  return r;
}
const Nt = (e) => (Ht.add(e), e);
function yt(e, ...t) {
  if (he(e) || xe(e)) return Nt(K(kt(ct, [e, ...t])));
  const r = e;
  return t.length === 0 && r.length === 1 && typeof r[0] == "string" ? K(r) : Nt(K(kt(r, t)));
}
function nt(e, t, r = le) {
  if (!t) throw M(1, t);
  const n = (s, ...o) => e(t, r, yt(s, ...o));
  return n.attrs = (s) => nt(e, t, Object.assign(Object.assign({}, r), { attrs: Array.prototype.concat(r.attrs, s).filter(Boolean) })), n.withConfig = (s) => nt(e, t, Object.assign(Object.assign({}, r), s)), n;
}
const tr = (e) => nt(cn, e), un = tr;
an.forEach((e) => {
  un[e] = tr(e);
});
class ln {
  constructor(t, r) {
    this.instanceRules = /* @__PURE__ */ new Map(), this.rules = t, this.componentId = r, this.isStatic = (function(n) {
      for (let s = 0; s < n.length; s += 1) {
        const o = n[s];
        if (he(o) && !ht(o)) return !1;
      }
      return !0;
    })(t), re.registerId(this.componentId);
  }
  removeStyles(t, r) {
    this.instanceRules.delete(t), this.rebuildGroup(r);
  }
  renderStyles(t, r, n, s) {
    const o = this.componentId;
    if (this.isStatic) {
      if (n.hasNameForId(o, o + t)) this.instanceRules.has(t) || this.computeRules(t, r, n, s);
      else {
        const i = this.computeRules(t, r, n, s);
        n.insertRules(o, i.name, i.rules);
      }
      return;
    }
    const c = this.instanceRules.get(t);
    if (this.computeRules(t, r, n, s), !n.server && c) {
      const i = c.rules, a = this.instanceRules.get(t).rules;
      if (i.length === a.length) {
        let u = !0;
        for (let l = 0; l < i.length; l++) if (i[l] !== a[l]) {
          u = !1;
          break;
        }
        if (u) return;
      }
    }
    this.rebuildGroup(n);
  }
  computeRules(t, r, n, s) {
    const o = $e(K(this.rules, r, n, s)), c = { name: this.componentId + t, rules: s(o, "") };
    return this.instanceRules.set(t, c), c;
  }
  rebuildGroup(t) {
    const r = this.componentId;
    t.clearRules(r);
    for (const n of this.instanceRules.values()) t.insertRules(r, n.name, n.rules);
  }
}
function fn(e, ...t) {
  const r = yt(e, ...t), n = `sc-global-${lt(JSON.stringify(r))}`, s = new ln(r, n), o = (i) => {
    const a = mt(), u = C.useContext(te);
    let l;
    {
      const f = C.useRef(null);
      f.current === null && (f.current = a.styleSheet.allocateGSInstance(n)), l = f.current;
    }
    a.styleSheet.server && c(l, i, a.styleSheet, u, a.stylis);
    {
      const f = s.isStatic ? [l, a.styleSheet, s] : [l, i, a.styleSheet, u, a.stylis, s], g = C.useRef(s);
      C.useLayoutEffect(() => (a.styleSheet.server || (g.current !== s && (a.styleSheet.clearRules(n), g.current = s), c(l, i, a.styleSheet, u, a.stylis)), () => {
        s.removeStyles(l, a.styleSheet);
      }), f);
    }
    return a.styleSheet.server && s.instanceRules.delete(l), null;
  };
  function c(i, a, u, l, f) {
    if (s.isStatic) s.renderStyles(i, Ir, u, f);
    else {
      const g = Object.assign(Object.assign({}, a), { theme: at(a, l, o.defaultProps) });
      s.renderStyles(i, g, u, f);
    }
  }
  return C.memo(o);
}
function ve(e, t, r, n, s) {
  for (const o in e) {
    const c = e[o], i = s ? s + "-" + o : o;
    if (typeof c == "object" && c !== null) {
      const a = {};
      ve(c, t, a, n, i), r[o] = a;
    } else r[o] = n(i, c, o);
  }
}
function rr(e, t, r, n) {
  let s = "";
  for (const o in e) {
    const c = e[o], i = t[o], a = n ? n + "-" + o : o;
    typeof c == "object" && c !== null ? typeof i == "object" && i !== null && (s += rr(c, i, r, a)) : i !== void 0 && typeof i != "function" && (s += "--" + r + a + ":" + i + ";");
  }
  return s;
}
function wn(e, t) {
  var r, n;
  const s = ((r = t?.prefix) !== null && r !== void 0 ? r : "sc") + "-", o = (n = t?.selector) !== null && n !== void 0 ? n : ":root", c = (function(u, l) {
    const f = {};
    return ve(u, l, f, (g) => "--" + l + g), f;
  })(e, s), i = (function(u, l) {
    const f = {};
    return ve(u, l, f, (g, $) => "var(--" + l + g + ", " + $ + ")"), f;
  })(e, s), a = fn`
    ${o} {
      ${(u) => rr(e, u.theme, s)}
    }
  `;
  return Object.assign(i, { GlobalStyle: a, raw: e, vars: c, resolve(u) {
    if (!ce) throw new Error("createTheme.resolve() is client-only");
    const l = u ?? document.documentElement;
    return (function(f, g, $) {
      const m = {};
      return ve(f, g, m, (S, P) => $.getPropertyValue("--" + g + S).trim() || P), m;
    })(e, s, getComputedStyle(l));
  } });
}
var nr;
class hn {
  constructor(t, r) {
    this[nr] = !0, this.inject = (n, s = rt) => {
      const o = this.getName(s);
      if (!n.hasNameForId(this.id, o)) {
        const c = s(this.rules, o, "@keyframes");
        n.insertRules(this.id, o, c);
      }
    }, this.name = t, this.id = Dt + t, this.rules = r, be(this.id), dt(this, () => {
      throw M(12, String(this.name));
    });
  }
  getName(t = rt) {
    return t.hash ? this.name + ut(+t.hash >>> 0) : this.name;
  }
}
function Cn(e, ...t) {
  const r = $e(yt(e, ...t)), n = lt(r);
  return new hn(n, r);
}
function $n(e) {
  const t = C.forwardRef((r, n) => {
    const s = at(r, C.useContext(te), e.defaultProps);
    return C.createElement(e, Object.assign(Object.assign({}, r), { theme: s, ref: n }));
  });
  return t.displayName = `WithTheme(${Bt(e)})`, ft(t, e);
}
nr = Ut;
class xn {
  constructor({ nonce: t } = {}) {
    this._emitSheetCSS = () => {
      const r = this.instance.toString();
      if (!r) return "";
      const n = this.instance.options.nonce || tt();
      return `<style ${$e([n && `nonce="${n}"`, `${L}="true"`, `${Ee}="${ue}"`].filter(Boolean), " ")}>${r}</style>`;
    }, this.getStyleTags = () => {
      if (this.sealed) throw M(2);
      return this._emitSheetCSS();
    }, this.getStyleElement = () => {
      if (this.sealed) throw M(2);
      const r = this.instance.toString();
      if (!r) return [];
      const n = { [L]: "", [Ee]: ue, dangerouslySetInnerHTML: { __html: r } }, s = this.instance.options.nonce || tt();
      return s && (n.nonce = s), [C.createElement("style", Object.assign({}, n, { key: "sc-0-0" }))];
    }, this.seal = () => {
      this.sealed = !0;
    }, this.instance = new re({ isServer: !0, nonce: t }), this.sealed = !1;
  }
  collectStyles(t) {
    if (this.sealed) throw M(2);
    return C.createElement(sn, { sheet: this.instance }, t);
  }
  interleaveWithNodeStream(t) {
    throw M(3);
  }
}
const On = { StyleSheet: re, mainSheet: er }, jt = /:(?:(first)-child|(last)-child|(only)-child|(nth-child)\(([^()]+)\)|(nth-last-child)\(([^()]+)\))/g, ie = `:not(style[${L}])`, Ue = `style[${L}]`;
function dn(e) {
  return e.indexOf("-child") === -1 ? e : (jt.lastIndex = 0, e.replace(jt, (t, r, n, s, o, c, i, a) => r ? `:nth-child(1 of ${ie})` : n ? `:nth-last-child(1 of ${ie})` : s ? `:nth-child(1 of ${ie}):nth-last-child(1 of ${ie})` : o ? c.indexOf(" of ") !== -1 ? t : `:nth-child(${c} of ${ie})` : a.indexOf(" of ") !== -1 ? t : `:nth-last-child(${a} of ${ie})`));
}
function pn(e, t) {
  if (e.indexOf("+") === -1) return;
  let r = 0, n = 0;
  for (let s = 0; s < e.length; s++) {
    const o = e.charCodeAt(s);
    if (o === 40) r++;
    else if (o === 41) r--;
    else if (o === 91) n++;
    else if (o === 93) n--;
    else if (o === 43 && r === 0 && n === 0 && !pt(e, s)) {
      const c = e.substring(0, s), i = e.substring(s + 1);
      t.push(c + "+" + Ue + "+" + i), t.push(c + "+" + Ue + "+" + Ue + "+" + i);
    }
  }
}
function In(e) {
  if (e.type === Oe) {
    const t = e.props, r = [];
    for (let n = 0; n < t.length; n++) {
      const s = dn(t[n]);
      r.push(s), pn(s, r);
    }
    e.props = r;
  }
}
export {
  xn as ServerStyleSheet,
  mn as StyleSheetConsumer,
  gt as StyleSheetContext,
  sn as StyleSheetManager,
  yn as ThemeConsumer,
  te as ThemeContext,
  Sn as ThemeProvider,
  On as __PRIVATE__,
  fn as createGlobalStyle,
  wn as createTheme,
  yt as css,
  un as default,
  ht as isStyledComponent,
  Cn as keyframes,
  un as styled,
  In as stylisPluginRSC,
  bn as useTheme,
  ue as version,
  $n as withTheme
};
