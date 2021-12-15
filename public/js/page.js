window.app = function () {
  !(function (t) {
    var e = {};
    function i(n) {
      if (e[n]) return e[n].exports;
      var r = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
    }
    (i.m = t),
      (i.c = e),
      (i.d = function (t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (i.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (i.t = function (t, e) {
        if ((1 & e && (t = i(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (i.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            i.d(
              n,
              r,
              function (e) {
                return t[e];
              }.bind(null, r)
            );
        return n;
      }),
      (i.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return i.d(e, "a", e), e;
      }),
      (i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (i.p = ""),
      i((i.s = 152));
  })([
    function (t, e, i) {},
    function (t, e, i) {
      var n;
      /*!
       * jQuery JavaScript Library v3.5.1
       * https://jquery.com/
       *
       * Includes Sizzle.js
       * https://sizzlejs.com/
       *
       * Copyright JS Foundation and other contributors
       * Released under the MIT license
       * https://jquery.org/license
       *
       * Date: 2020-05-04T22:49Z
       */ !(function (e, i) {
        "use strict";
        "object" == typeof t.exports
          ? (t.exports = e.document
              ? i(e, !0)
              : function (t) {
                  if (!t.document)
                    throw new Error("jQuery requires a window with a document");
                  return i(t);
                })
          : i(e);
      })("undefined" != typeof window ? window : this, function (i, r) {
        "use strict";
        var o = [],
          a = Object.getPrototypeOf,
          s = o.slice,
          l = o.flat
            ? function (t) {
                return o.flat.call(t);
              }
            : function (t) {
                return o.concat.apply([], t);
              },
          c = o.push,
          u = o.indexOf,
          h = {},
          d = h.toString,
          p = h.hasOwnProperty,
          f = p.toString,
          m = f.call(Object),
          g = {},
          v = function (t) {
            return "function" == typeof t && "number" != typeof t.nodeType;
          },
          y = function (t) {
            return null != t && t === t.window;
          },
          b = i.document,
          _ = { type: !0, src: !0, nonce: !0, noModule: !0 };
        function x(t, e, i) {
          var n,
            r,
            o = (i = i || b).createElement("script");
          if (((o.text = t), e))
            for (n in _)
              (r = e[n] || (e.getAttribute && e.getAttribute(n))) &&
                o.setAttribute(n, r);
          i.head.appendChild(o).parentNode.removeChild(o);
        }
        function w(t) {
          return null == t
            ? t + ""
            : "object" == typeof t || "function" == typeof t
            ? h[d.call(t)] || "object"
            : typeof t;
        }
        var k = function (t, e) {
          return new k.fn.init(t, e);
        };
        function S(t) {
          var e = !!t && "length" in t && t.length,
            i = w(t);
          return (
            !v(t) &&
            !y(t) &&
            ("array" === i ||
              0 === e ||
              ("number" == typeof e && e > 0 && e - 1 in t))
          );
        }
        (k.fn = k.prototype = {
          jquery: "3.5.1",
          constructor: k,
          length: 0,
          toArray: function () {
            return s.call(this);
          },
          get: function (t) {
            return null == t
              ? s.call(this)
              : t < 0
              ? this[t + this.length]
              : this[t];
          },
          pushStack: function (t) {
            var e = k.merge(this.constructor(), t);
            return (e.prevObject = this), e;
          },
          each: function (t) {
            return k.each(this, t);
          },
          map: function (t) {
            return this.pushStack(
              k.map(this, function (e, i) {
                return t.call(e, i, e);
              })
            );
          },
          slice: function () {
            return this.pushStack(s.apply(this, arguments));
          },
          first: function () {
            return this.eq(0);
          },
          last: function () {
            return this.eq(-1);
          },
          even: function () {
            return this.pushStack(
              k.grep(this, function (t, e) {
                return (e + 1) % 2;
              })
            );
          },
          odd: function () {
            return this.pushStack(
              k.grep(this, function (t, e) {
                return e % 2;
              })
            );
          },
          eq: function (t) {
            var e = this.length,
              i = +t + (t < 0 ? e : 0);
            return this.pushStack(i >= 0 && i < e ? [this[i]] : []);
          },
          end: function () {
            return this.prevObject || this.constructor();
          },
          push: c,
          sort: o.sort,
          splice: o.splice,
        }),
          (k.extend = k.fn.extend = function () {
            var t,
              e,
              i,
              n,
              r,
              o,
              a = arguments[0] || {},
              s = 1,
              l = arguments.length,
              c = !1;
            for (
              "boolean" == typeof a && ((c = a), (a = arguments[s] || {}), s++),
                "object" == typeof a || v(a) || (a = {}),
                s === l && ((a = this), s--);
              s < l;
              s++
            )
              if (null != (t = arguments[s]))
                for (e in t)
                  (n = t[e]),
                    "__proto__" !== e &&
                      a !== n &&
                      (c && n && (k.isPlainObject(n) || (r = Array.isArray(n)))
                        ? ((i = a[e]),
                          (o =
                            r && !Array.isArray(i)
                              ? []
                              : r || k.isPlainObject(i)
                              ? i
                              : {}),
                          (r = !1),
                          (a[e] = k.extend(c, o, n)))
                        : void 0 !== n && (a[e] = n));
            return a;
          }),
          k.extend({
            expando: "jQuery" + ("3.5.1" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (t) {
              throw new Error(t);
            },
            noop: function () {},
            isPlainObject: function (t) {
              var e, i;
              return (
                !(!t || "[object Object]" !== d.call(t)) &&
                (!(e = a(t)) ||
                  ("function" ==
                    typeof (i = p.call(e, "constructor") && e.constructor) &&
                    f.call(i) === m))
              );
            },
            isEmptyObject: function (t) {
              var e;
              for (e in t) return !1;
              return !0;
            },
            globalEval: function (t, e, i) {
              x(t, { nonce: e && e.nonce }, i);
            },
            each: function (t, e) {
              var i,
                n = 0;
              if (S(t))
                for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++);
              else for (n in t) if (!1 === e.call(t[n], n, t[n])) break;
              return t;
            },
            makeArray: function (t, e) {
              var i = e || [];
              return (
                null != t &&
                  (S(Object(t))
                    ? k.merge(i, "string" == typeof t ? [t] : t)
                    : c.call(i, t)),
                i
              );
            },
            inArray: function (t, e, i) {
              return null == e ? -1 : u.call(e, t, i);
            },
            merge: function (t, e) {
              for (var i = +e.length, n = 0, r = t.length; n < i; n++)
                t[r++] = e[n];
              return (t.length = r), t;
            },
            grep: function (t, e, i) {
              for (var n = [], r = 0, o = t.length, a = !i; r < o; r++)
                !e(t[r], r) !== a && n.push(t[r]);
              return n;
            },
            map: function (t, e, i) {
              var n,
                r,
                o = 0,
                a = [];
              if (S(t))
                for (n = t.length; o < n; o++)
                  null != (r = e(t[o], o, i)) && a.push(r);
              else for (o in t) null != (r = e(t[o], o, i)) && a.push(r);
              return l(a);
            },
            guid: 1,
            support: g,
          }),
          "function" == typeof Symbol &&
            (k.fn[Symbol.iterator] = o[Symbol.iterator]),
          k.each(
            "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
              " "
            ),
            function (t, e) {
              h["[object " + e + "]"] = e.toLowerCase();
            }
          );
        var M =
          /*!
           * Sizzle CSS Selector Engine v2.3.5
           * https://sizzlejs.com/
           *
           * Copyright JS Foundation and other contributors
           * Released under the MIT license
           * https://js.foundation/
           *
           * Date: 2020-03-14
           */
          (function (t) {
            var e,
              i,
              n,
              r,
              o,
              a,
              s,
              l,
              c,
              u,
              h,
              d,
              p,
              f,
              m,
              g,
              v,
              y,
              b,
              _ = "sizzle" + 1 * new Date(),
              x = t.document,
              w = 0,
              k = 0,
              S = lt(),
              M = lt(),
              T = lt(),
              C = lt(),
              D = function (t, e) {
                return t === e && (h = !0), 0;
              },
              L = {}.hasOwnProperty,
              E = [],
              A = E.pop,
              P = E.push,
              I = E.push,
              O = E.slice,
              Y = function (t, e) {
                for (var i = 0, n = t.length; i < n; i++)
                  if (t[i] === e) return i;
                return -1;
              },
              z =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              R = "[\\x20\\t\\r\\n\\f]",
              F =
                "(?:\\\\[\\da-fA-F]{1,6}" +
                R +
                "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
              H =
                "\\[" +
                R +
                "*(" +
                F +
                ")(?:" +
                R +
                "*([*^$|!~]?=)" +
                R +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                F +
                "))|)" +
                R +
                "*\\]",
              j =
                ":(" +
                F +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                H +
                ")*)|.*)\\)|)",
              N = new RegExp(R + "+", "g"),
              B = new RegExp(
                "^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$",
                "g"
              ),
              W = new RegExp("^" + R + "*," + R + "*"),
              V = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
              U = new RegExp(R + "|>"),
              q = new RegExp(j),
              $ = new RegExp("^" + F + "$"),
              X = {
                ID: new RegExp("^#(" + F + ")"),
                CLASS: new RegExp("^\\.(" + F + ")"),
                TAG: new RegExp("^(" + F + "|[*])"),
                ATTR: new RegExp("^" + H),
                PSEUDO: new RegExp("^" + j),
                CHILD: new RegExp(
                  "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                    R +
                    "*(even|odd|(([+-]|)(\\d*)n|)" +
                    R +
                    "*(?:([+-]|)" +
                    R +
                    "*(\\d+)|))" +
                    R +
                    "*\\)|)",
                  "i"
                ),
                bool: new RegExp("^(?:" + z + ")$", "i"),
                needsContext: new RegExp(
                  "^" +
                    R +
                    "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                    R +
                    "*((?:-\\d)?\\d*)" +
                    R +
                    "*\\)|)(?=[^-]|$)",
                  "i"
                ),
              },
              G = /HTML$/i,
              Z = /^(?:input|select|textarea|button)$/i,
              J = /^h\d$/i,
              K = /^[^{]+\{\s*\[native \w/,
              Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              tt = /[+~]/,
              et = new RegExp(
                "\\\\[\\da-fA-F]{1,6}" + R + "?|\\\\([^\\r\\n\\f])",
                "g"
              ),
              it = function (t, e) {
                var i = "0x" + t.slice(1) - 65536;
                return (
                  e ||
                  (i < 0
                    ? String.fromCharCode(i + 65536)
                    : String.fromCharCode(
                        (i >> 10) | 55296,
                        (1023 & i) | 56320
                      ))
                );
              },
              nt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              rt = function (t, e) {
                return e
                  ? "\0" === t
                    ? "�"
                    : t.slice(0, -1) +
                      "\\" +
                      t.charCodeAt(t.length - 1).toString(16) +
                      " "
                  : "\\" + t;
              },
              ot = function () {
                d();
              },
              at = _t(
                function (t) {
                  return (
                    !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase()
                  );
                },
                { dir: "parentNode", next: "legend" }
              );
            try {
              I.apply((E = O.call(x.childNodes)), x.childNodes),
                E[x.childNodes.length].nodeType;
            } catch (t) {
              I = {
                apply: E.length
                  ? function (t, e) {
                      P.apply(t, O.call(e));
                    }
                  : function (t, e) {
                      for (var i = t.length, n = 0; (t[i++] = e[n++]); );
                      t.length = i - 1;
                    },
              };
            }
            function st(t, e, n, r) {
              var o,
                s,
                c,
                u,
                h,
                f,
                v,
                y = e && e.ownerDocument,
                x = e ? e.nodeType : 9;
              if (
                ((n = n || []),
                "string" != typeof t || !t || (1 !== x && 9 !== x && 11 !== x))
              )
                return n;
              if (!r && (d(e), (e = e || p), m)) {
                if (11 !== x && (h = Q.exec(t)))
                  if ((o = h[1])) {
                    if (9 === x) {
                      if (!(c = e.getElementById(o))) return n;
                      if (c.id === o) return n.push(c), n;
                    } else if (
                      y &&
                      (c = y.getElementById(o)) &&
                      b(e, c) &&
                      c.id === o
                    )
                      return n.push(c), n;
                  } else {
                    if (h[2]) return I.apply(n, e.getElementsByTagName(t)), n;
                    if (
                      (o = h[3]) &&
                      i.getElementsByClassName &&
                      e.getElementsByClassName
                    )
                      return I.apply(n, e.getElementsByClassName(o)), n;
                  }
                if (
                  i.qsa &&
                  !C[t + " "] &&
                  (!g || !g.test(t)) &&
                  (1 !== x || "object" !== e.nodeName.toLowerCase())
                ) {
                  if (((v = t), (y = e), 1 === x && (U.test(t) || V.test(t)))) {
                    for (
                      ((y = (tt.test(t) && vt(e.parentNode)) || e) === e &&
                        i.scope) ||
                        ((u = e.getAttribute("id"))
                          ? (u = u.replace(nt, rt))
                          : e.setAttribute("id", (u = _))),
                        s = (f = a(t)).length;
                      s--;

                    )
                      f[s] = (u ? "#" + u : ":scope") + " " + bt(f[s]);
                    v = f.join(",");
                  }
                  try {
                    return I.apply(n, y.querySelectorAll(v)), n;
                  } catch (e) {
                    C(t, !0);
                  } finally {
                    u === _ && e.removeAttribute("id");
                  }
                }
              }
              return l(t.replace(B, "$1"), e, n, r);
            }
            function lt() {
              var t = [];
              return function e(i, r) {
                return (
                  t.push(i + " ") > n.cacheLength && delete e[t.shift()],
                  (e[i + " "] = r)
                );
              };
            }
            function ct(t) {
              return (t[_] = !0), t;
            }
            function ut(t) {
              var e = p.createElement("fieldset");
              try {
                return !!t(e);
              } catch (t) {
                return !1;
              } finally {
                e.parentNode && e.parentNode.removeChild(e), (e = null);
              }
            }
            function ht(t, e) {
              for (var i = t.split("|"), r = i.length; r--; )
                n.attrHandle[i[r]] = e;
            }
            function dt(t, e) {
              var i = e && t,
                n =
                  i &&
                  1 === t.nodeType &&
                  1 === e.nodeType &&
                  t.sourceIndex - e.sourceIndex;
              if (n) return n;
              if (i) for (; (i = i.nextSibling); ) if (i === e) return -1;
              return t ? 1 : -1;
            }
            function pt(t) {
              return function (e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t;
              };
            }
            function ft(t) {
              return function (e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t;
              };
            }
            function mt(t) {
              return function (e) {
                return "form" in e
                  ? e.parentNode && !1 === e.disabled
                    ? "label" in e
                      ? "label" in e.parentNode
                        ? e.parentNode.disabled === t
                        : e.disabled === t
                      : e.isDisabled === t ||
                        (e.isDisabled !== !t && at(e) === t)
                    : e.disabled === t
                  : "label" in e && e.disabled === t;
              };
            }
            function gt(t) {
              return ct(function (e) {
                return (
                  (e = +e),
                  ct(function (i, n) {
                    for (var r, o = t([], i.length, e), a = o.length; a--; )
                      i[(r = o[a])] && (i[r] = !(n[r] = i[r]));
                  })
                );
              });
            }
            function vt(t) {
              return t && void 0 !== t.getElementsByTagName && t;
            }
            for (e in ((i = st.support = {}),
            (o = st.isXML = function (t) {
              var e = t.namespaceURI,
                i = (t.ownerDocument || t).documentElement;
              return !G.test(e || (i && i.nodeName) || "HTML");
            }),
            (d = st.setDocument = function (t) {
              var e,
                r,
                a = t ? t.ownerDocument || t : x;
              return a != p && 9 === a.nodeType && a.documentElement
                ? ((f = (p = a).documentElement),
                  (m = !o(p)),
                  x != p &&
                    (r = p.defaultView) &&
                    r.top !== r &&
                    (r.addEventListener
                      ? r.addEventListener("unload", ot, !1)
                      : r.attachEvent && r.attachEvent("onunload", ot)),
                  (i.scope = ut(function (t) {
                    return (
                      f.appendChild(t).appendChild(p.createElement("div")),
                      void 0 !== t.querySelectorAll &&
                        !t.querySelectorAll(":scope fieldset div").length
                    );
                  })),
                  (i.attributes = ut(function (t) {
                    return (t.className = "i"), !t.getAttribute("className");
                  })),
                  (i.getElementsByTagName = ut(function (t) {
                    return (
                      t.appendChild(p.createComment("")),
                      !t.getElementsByTagName("*").length
                    );
                  })),
                  (i.getElementsByClassName = K.test(p.getElementsByClassName)),
                  (i.getById = ut(function (t) {
                    return (
                      (f.appendChild(t).id = _),
                      !p.getElementsByName || !p.getElementsByName(_).length
                    );
                  })),
                  i.getById
                    ? ((n.filter.ID = function (t) {
                        var e = t.replace(et, it);
                        return function (t) {
                          return t.getAttribute("id") === e;
                        };
                      }),
                      (n.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && m) {
                          var i = e.getElementById(t);
                          return i ? [i] : [];
                        }
                      }))
                    : ((n.filter.ID = function (t) {
                        var e = t.replace(et, it);
                        return function (t) {
                          var i =
                            void 0 !== t.getAttributeNode &&
                            t.getAttributeNode("id");
                          return i && i.value === e;
                        };
                      }),
                      (n.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && m) {
                          var i,
                            n,
                            r,
                            o = e.getElementById(t);
                          if (o) {
                            if ((i = o.getAttributeNode("id")) && i.value === t)
                              return [o];
                            for (
                              r = e.getElementsByName(t), n = 0;
                              (o = r[n++]);

                            )
                              if (
                                (i = o.getAttributeNode("id")) &&
                                i.value === t
                              )
                                return [o];
                          }
                          return [];
                        }
                      })),
                  (n.find.TAG = i.getElementsByTagName
                    ? function (t, e) {
                        return void 0 !== e.getElementsByTagName
                          ? e.getElementsByTagName(t)
                          : i.qsa
                          ? e.querySelectorAll(t)
                          : void 0;
                      }
                    : function (t, e) {
                        var i,
                          n = [],
                          r = 0,
                          o = e.getElementsByTagName(t);
                        if ("*" === t) {
                          for (; (i = o[r++]); ) 1 === i.nodeType && n.push(i);
                          return n;
                        }
                        return o;
                      }),
                  (n.find.CLASS =
                    i.getElementsByClassName &&
                    function (t, e) {
                      if (void 0 !== e.getElementsByClassName && m)
                        return e.getElementsByClassName(t);
                    }),
                  (v = []),
                  (g = []),
                  (i.qsa = K.test(p.querySelectorAll)) &&
                    (ut(function (t) {
                      var e;
                      (f.appendChild(t).innerHTML =
                        "<a id='" +
                        _ +
                        "'></a><select id='" +
                        _ +
                        "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                        t.querySelectorAll("[msallowcapture^='']").length &&
                          g.push("[*^$]=" + R + "*(?:''|\"\")"),
                        t.querySelectorAll("[selected]").length ||
                          g.push("\\[" + R + "*(?:value|" + z + ")"),
                        t.querySelectorAll("[id~=" + _ + "-]").length ||
                          g.push("~="),
                        (e = p.createElement("input")).setAttribute("name", ""),
                        t.appendChild(e),
                        t.querySelectorAll("[name='']").length ||
                          g.push(
                            "\\[" + R + "*name" + R + "*=" + R + "*(?:''|\"\")"
                          ),
                        t.querySelectorAll(":checked").length ||
                          g.push(":checked"),
                        t.querySelectorAll("a#" + _ + "+*").length ||
                          g.push(".#.+[+~]"),
                        t.querySelectorAll("\\\f"),
                        g.push("[\\r\\n\\f]");
                    }),
                    ut(function (t) {
                      t.innerHTML =
                        "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                      var e = p.createElement("input");
                      e.setAttribute("type", "hidden"),
                        t.appendChild(e).setAttribute("name", "D"),
                        t.querySelectorAll("[name=d]").length &&
                          g.push("name" + R + "*[*^$|!~]?="),
                        2 !== t.querySelectorAll(":enabled").length &&
                          g.push(":enabled", ":disabled"),
                        (f.appendChild(t).disabled = !0),
                        2 !== t.querySelectorAll(":disabled").length &&
                          g.push(":enabled", ":disabled"),
                        t.querySelectorAll("*,:x"),
                        g.push(",.*:");
                    })),
                  (i.matchesSelector = K.test(
                    (y =
                      f.matches ||
                      f.webkitMatchesSelector ||
                      f.mozMatchesSelector ||
                      f.oMatchesSelector ||
                      f.msMatchesSelector)
                  )) &&
                    ut(function (t) {
                      (i.disconnectedMatch = y.call(t, "*")),
                        y.call(t, "[s!='']:x"),
                        v.push("!=", j);
                    }),
                  (g = g.length && new RegExp(g.join("|"))),
                  (v = v.length && new RegExp(v.join("|"))),
                  (e = K.test(f.compareDocumentPosition)),
                  (b =
                    e || K.test(f.contains)
                      ? function (t, e) {
                          var i = 9 === t.nodeType ? t.documentElement : t,
                            n = e && e.parentNode;
                          return (
                            t === n ||
                            !(
                              !n ||
                              1 !== n.nodeType ||
                              !(i.contains
                                ? i.contains(n)
                                : t.compareDocumentPosition &&
                                  16 & t.compareDocumentPosition(n))
                            )
                          );
                        }
                      : function (t, e) {
                          if (e)
                            for (; (e = e.parentNode); ) if (e === t) return !0;
                          return !1;
                        }),
                  (D = e
                    ? function (t, e) {
                        if (t === e) return (h = !0), 0;
                        var n =
                          !t.compareDocumentPosition -
                          !e.compareDocumentPosition;
                        return (
                          n ||
                          (1 &
                            (n =
                              (t.ownerDocument || t) == (e.ownerDocument || e)
                                ? t.compareDocumentPosition(e)
                                : 1) ||
                          (!i.sortDetached &&
                            e.compareDocumentPosition(t) === n)
                            ? t == p || (t.ownerDocument == x && b(x, t))
                              ? -1
                              : e == p || (e.ownerDocument == x && b(x, e))
                              ? 1
                              : u
                              ? Y(u, t) - Y(u, e)
                              : 0
                            : 4 & n
                            ? -1
                            : 1)
                        );
                      }
                    : function (t, e) {
                        if (t === e) return (h = !0), 0;
                        var i,
                          n = 0,
                          r = t.parentNode,
                          o = e.parentNode,
                          a = [t],
                          s = [e];
                        if (!r || !o)
                          return t == p
                            ? -1
                            : e == p
                            ? 1
                            : r
                            ? -1
                            : o
                            ? 1
                            : u
                            ? Y(u, t) - Y(u, e)
                            : 0;
                        if (r === o) return dt(t, e);
                        for (i = t; (i = i.parentNode); ) a.unshift(i);
                        for (i = e; (i = i.parentNode); ) s.unshift(i);
                        for (; a[n] === s[n]; ) n++;
                        return n
                          ? dt(a[n], s[n])
                          : a[n] == x
                          ? -1
                          : s[n] == x
                          ? 1
                          : 0;
                      }),
                  p)
                : p;
            }),
            (st.matches = function (t, e) {
              return st(t, null, null, e);
            }),
            (st.matchesSelector = function (t, e) {
              if (
                (d(t),
                i.matchesSelector &&
                  m &&
                  !C[e + " "] &&
                  (!v || !v.test(e)) &&
                  (!g || !g.test(e)))
              )
                try {
                  var n = y.call(t, e);
                  if (
                    n ||
                    i.disconnectedMatch ||
                    (t.document && 11 !== t.document.nodeType)
                  )
                    return n;
                } catch (t) {
                  C(e, !0);
                }
              return st(e, p, null, [t]).length > 0;
            }),
            (st.contains = function (t, e) {
              return (t.ownerDocument || t) != p && d(t), b(t, e);
            }),
            (st.attr = function (t, e) {
              (t.ownerDocument || t) != p && d(t);
              var r = n.attrHandle[e.toLowerCase()],
                o =
                  r && L.call(n.attrHandle, e.toLowerCase())
                    ? r(t, e, !m)
                    : void 0;
              return void 0 !== o
                ? o
                : i.attributes || !m
                ? t.getAttribute(e)
                : (o = t.getAttributeNode(e)) && o.specified
                ? o.value
                : null;
            }),
            (st.escape = function (t) {
              return (t + "").replace(nt, rt);
            }),
            (st.error = function (t) {
              throw new Error("Syntax error, unrecognized expression: " + t);
            }),
            (st.uniqueSort = function (t) {
              var e,
                n = [],
                r = 0,
                o = 0;
              if (
                ((h = !i.detectDuplicates),
                (u = !i.sortStable && t.slice(0)),
                t.sort(D),
                h)
              ) {
                for (; (e = t[o++]); ) e === t[o] && (r = n.push(o));
                for (; r--; ) t.splice(n[r], 1);
              }
              return (u = null), t;
            }),
            (r = st.getText = function (t) {
              var e,
                i = "",
                n = 0,
                o = t.nodeType;
              if (o) {
                if (1 === o || 9 === o || 11 === o) {
                  if ("string" == typeof t.textContent) return t.textContent;
                  for (t = t.firstChild; t; t = t.nextSibling) i += r(t);
                } else if (3 === o || 4 === o) return t.nodeValue;
              } else for (; (e = t[n++]); ) i += r(e);
              return i;
            }),
            ((n = st.selectors = {
              cacheLength: 50,
              createPseudo: ct,
              match: X,
              attrHandle: {},
              find: {},
              relative: {
                ">": { dir: "parentNode", first: !0 },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: !0 },
                "~": { dir: "previousSibling" },
              },
              preFilter: {
                ATTR: function (t) {
                  return (
                    (t[1] = t[1].replace(et, it)),
                    (t[3] = (t[3] || t[4] || t[5] || "").replace(et, it)),
                    "~=" === t[2] && (t[3] = " " + t[3] + " "),
                    t.slice(0, 4)
                  );
                },
                CHILD: function (t) {
                  return (
                    (t[1] = t[1].toLowerCase()),
                    "nth" === t[1].slice(0, 3)
                      ? (t[3] || st.error(t[0]),
                        (t[4] = +(t[4]
                          ? t[5] + (t[6] || 1)
                          : 2 * ("even" === t[3] || "odd" === t[3]))),
                        (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                      : t[3] && st.error(t[0]),
                    t
                  );
                },
                PSEUDO: function (t) {
                  var e,
                    i = !t[6] && t[2];
                  return X.CHILD.test(t[0])
                    ? null
                    : (t[3]
                        ? (t[2] = t[4] || t[5] || "")
                        : i &&
                          q.test(i) &&
                          (e = a(i, !0)) &&
                          (e = i.indexOf(")", i.length - e) - i.length) &&
                          ((t[0] = t[0].slice(0, e)), (t[2] = i.slice(0, e))),
                      t.slice(0, 3));
                },
              },
              filter: {
                TAG: function (t) {
                  var e = t.replace(et, it).toLowerCase();
                  return "*" === t
                    ? function () {
                        return !0;
                      }
                    : function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e;
                      };
                },
                CLASS: function (t) {
                  var e = S[t + " "];
                  return (
                    e ||
                    ((e = new RegExp("(^|" + R + ")" + t + "(" + R + "|$)")) &&
                      S(t, function (t) {
                        return e.test(
                          ("string" == typeof t.className && t.className) ||
                            (void 0 !== t.getAttribute &&
                              t.getAttribute("class")) ||
                            ""
                        );
                      }))
                  );
                },
                ATTR: function (t, e, i) {
                  return function (n) {
                    var r = st.attr(n, t);
                    return null == r
                      ? "!=" === e
                      : !e ||
                          ((r += ""),
                          "=" === e
                            ? r === i
                            : "!=" === e
                            ? r !== i
                            : "^=" === e
                            ? i && 0 === r.indexOf(i)
                            : "*=" === e
                            ? i && r.indexOf(i) > -1
                            : "$=" === e
                            ? i && r.slice(-i.length) === i
                            : "~=" === e
                            ? (" " + r.replace(N, " ") + " ").indexOf(i) > -1
                            : "|=" === e &&
                              (r === i ||
                                r.slice(0, i.length + 1) === i + "-"));
                  };
                },
                CHILD: function (t, e, i, n, r) {
                  var o = "nth" !== t.slice(0, 3),
                    a = "last" !== t.slice(-4),
                    s = "of-type" === e;
                  return 1 === n && 0 === r
                    ? function (t) {
                        return !!t.parentNode;
                      }
                    : function (e, i, l) {
                        var c,
                          u,
                          h,
                          d,
                          p,
                          f,
                          m = o !== a ? "nextSibling" : "previousSibling",
                          g = e.parentNode,
                          v = s && e.nodeName.toLowerCase(),
                          y = !l && !s,
                          b = !1;
                        if (g) {
                          if (o) {
                            for (; m; ) {
                              for (d = e; (d = d[m]); )
                                if (
                                  s
                                    ? d.nodeName.toLowerCase() === v
                                    : 1 === d.nodeType
                                )
                                  return !1;
                              f = m = "only" === t && !f && "nextSibling";
                            }
                            return !0;
                          }
                          if (
                            ((f = [a ? g.firstChild : g.lastChild]), a && y)
                          ) {
                            for (
                              b =
                                (p =
                                  (c =
                                    (u =
                                      (h = (d = g)[_] || (d[_] = {}))[
                                        d.uniqueID
                                      ] || (h[d.uniqueID] = {}))[t] ||
                                    [])[0] === w && c[1]) && c[2],
                                d = p && g.childNodes[p];
                              (d =
                                (++p && d && d[m]) || (b = p = 0) || f.pop());

                            )
                              if (1 === d.nodeType && ++b && d === e) {
                                u[t] = [w, p, b];
                                break;
                              }
                          } else if (
                            (y &&
                              (b = p =
                                (c =
                                  (u =
                                    (h = (d = e)[_] || (d[_] = {}))[
                                      d.uniqueID
                                    ] || (h[d.uniqueID] = {}))[t] || [])[0] ===
                                  w && c[1]),
                            !1 === b)
                          )
                            for (
                              ;
                              (d =
                                (++p && d && d[m]) || (b = p = 0) || f.pop()) &&
                              ((s
                                ? d.nodeName.toLowerCase() !== v
                                : 1 !== d.nodeType) ||
                                !++b ||
                                (y &&
                                  ((u =
                                    (h = d[_] || (d[_] = {}))[d.uniqueID] ||
                                    (h[d.uniqueID] = {}))[t] = [w, b]),
                                d !== e));

                            );
                          return (b -= r) === n || (b % n == 0 && b / n >= 0);
                        }
                      };
                },
                PSEUDO: function (t, e) {
                  var i,
                    r =
                      n.pseudos[t] ||
                      n.setFilters[t.toLowerCase()] ||
                      st.error("unsupported pseudo: " + t);
                  return r[_]
                    ? r(e)
                    : r.length > 1
                    ? ((i = [t, t, "", e]),
                      n.setFilters.hasOwnProperty(t.toLowerCase())
                        ? ct(function (t, i) {
                            for (var n, o = r(t, e), a = o.length; a--; )
                              t[(n = Y(t, o[a]))] = !(i[n] = o[a]);
                          })
                        : function (t) {
                            return r(t, 0, i);
                          })
                    : r;
                },
              },
              pseudos: {
                not: ct(function (t) {
                  var e = [],
                    i = [],
                    n = s(t.replace(B, "$1"));
                  return n[_]
                    ? ct(function (t, e, i, r) {
                        for (var o, a = n(t, null, r, []), s = t.length; s--; )
                          (o = a[s]) && (t[s] = !(e[s] = o));
                      })
                    : function (t, r, o) {
                        return (
                          (e[0] = t), n(e, null, o, i), (e[0] = null), !i.pop()
                        );
                      };
                }),
                has: ct(function (t) {
                  return function (e) {
                    return st(t, e).length > 0;
                  };
                }),
                contains: ct(function (t) {
                  return (
                    (t = t.replace(et, it)),
                    function (e) {
                      return (e.textContent || r(e)).indexOf(t) > -1;
                    }
                  );
                }),
                lang: ct(function (t) {
                  return (
                    $.test(t || "") || st.error("unsupported lang: " + t),
                    (t = t.replace(et, it).toLowerCase()),
                    function (e) {
                      var i;
                      do {
                        if (
                          (i = m
                            ? e.lang
                            : e.getAttribute("xml:lang") ||
                              e.getAttribute("lang"))
                        )
                          return (
                            (i = i.toLowerCase()) === t ||
                            0 === i.indexOf(t + "-")
                          );
                      } while ((e = e.parentNode) && 1 === e.nodeType);
                      return !1;
                    }
                  );
                }),
                target: function (e) {
                  var i = t.location && t.location.hash;
                  return i && i.slice(1) === e.id;
                },
                root: function (t) {
                  return t === f;
                },
                focus: function (t) {
                  return (
                    t === p.activeElement &&
                    (!p.hasFocus || p.hasFocus()) &&
                    !!(t.type || t.href || ~t.tabIndex)
                  );
                },
                enabled: mt(!1),
                disabled: mt(!0),
                checked: function (t) {
                  var e = t.nodeName.toLowerCase();
                  return (
                    ("input" === e && !!t.checked) ||
                    ("option" === e && !!t.selected)
                  );
                },
                selected: function (t) {
                  return (
                    t.parentNode && t.parentNode.selectedIndex,
                    !0 === t.selected
                  );
                },
                empty: function (t) {
                  for (t = t.firstChild; t; t = t.nextSibling)
                    if (t.nodeType < 6) return !1;
                  return !0;
                },
                parent: function (t) {
                  return !n.pseudos.empty(t);
                },
                header: function (t) {
                  return J.test(t.nodeName);
                },
                input: function (t) {
                  return Z.test(t.nodeName);
                },
                button: function (t) {
                  var e = t.nodeName.toLowerCase();
                  return (
                    ("input" === e && "button" === t.type) || "button" === e
                  );
                },
                text: function (t) {
                  var e;
                  return (
                    "input" === t.nodeName.toLowerCase() &&
                    "text" === t.type &&
                    (null == (e = t.getAttribute("type")) ||
                      "text" === e.toLowerCase())
                  );
                },
                first: gt(function () {
                  return [0];
                }),
                last: gt(function (t, e) {
                  return [e - 1];
                }),
                eq: gt(function (t, e, i) {
                  return [i < 0 ? i + e : i];
                }),
                even: gt(function (t, e) {
                  for (var i = 0; i < e; i += 2) t.push(i);
                  return t;
                }),
                odd: gt(function (t, e) {
                  for (var i = 1; i < e; i += 2) t.push(i);
                  return t;
                }),
                lt: gt(function (t, e, i) {
                  for (var n = i < 0 ? i + e : i > e ? e : i; --n >= 0; )
                    t.push(n);
                  return t;
                }),
                gt: gt(function (t, e, i) {
                  for (var n = i < 0 ? i + e : i; ++n < e; ) t.push(n);
                  return t;
                }),
              },
            }).pseudos.nth = n.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
              n.pseudos[e] = pt(e);
            for (e in { submit: !0, reset: !0 }) n.pseudos[e] = ft(e);
            function yt() {}
            function bt(t) {
              for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
              return n;
            }
            function _t(t, e, i) {
              var n = e.dir,
                r = e.next,
                o = r || n,
                a = i && "parentNode" === o,
                s = k++;
              return e.first
                ? function (e, i, r) {
                    for (; (e = e[n]); )
                      if (1 === e.nodeType || a) return t(e, i, r);
                    return !1;
                  }
                : function (e, i, l) {
                    var c,
                      u,
                      h,
                      d = [w, s];
                    if (l) {
                      for (; (e = e[n]); )
                        if ((1 === e.nodeType || a) && t(e, i, l)) return !0;
                    } else
                      for (; (e = e[n]); )
                        if (1 === e.nodeType || a)
                          if (
                            ((u =
                              (h = e[_] || (e[_] = {}))[e.uniqueID] ||
                              (h[e.uniqueID] = {})),
                            r && r === e.nodeName.toLowerCase())
                          )
                            e = e[n] || e;
                          else {
                            if ((c = u[o]) && c[0] === w && c[1] === s)
                              return (d[2] = c[2]);
                            if (((u[o] = d), (d[2] = t(e, i, l)))) return !0;
                          }
                    return !1;
                  };
            }
            function xt(t) {
              return t.length > 1
                ? function (e, i, n) {
                    for (var r = t.length; r--; ) if (!t[r](e, i, n)) return !1;
                    return !0;
                  }
                : t[0];
            }
            function wt(t, e, i, n, r) {
              for (
                var o, a = [], s = 0, l = t.length, c = null != e;
                s < l;
                s++
              )
                (o = t[s]) &&
                  ((i && !i(o, n, r)) || (a.push(o), c && e.push(s)));
              return a;
            }
            function kt(t, e, i, n, r, o) {
              return (
                n && !n[_] && (n = kt(n)),
                r && !r[_] && (r = kt(r, o)),
                ct(function (o, a, s, l) {
                  var c,
                    u,
                    h,
                    d = [],
                    p = [],
                    f = a.length,
                    m =
                      o ||
                      (function (t, e, i) {
                        for (var n = 0, r = e.length; n < r; n++)
                          st(t, e[n], i);
                        return i;
                      })(e || "*", s.nodeType ? [s] : s, []),
                    g = !t || (!o && e) ? m : wt(m, d, t, s, l),
                    v = i ? (r || (o ? t : f || n) ? [] : a) : g;
                  if ((i && i(g, v, s, l), n))
                    for (c = wt(v, p), n(c, [], s, l), u = c.length; u--; )
                      (h = c[u]) && (v[p[u]] = !(g[p[u]] = h));
                  if (o) {
                    if (r || t) {
                      if (r) {
                        for (c = [], u = v.length; u--; )
                          (h = v[u]) && c.push((g[u] = h));
                        r(null, (v = []), c, l);
                      }
                      for (u = v.length; u--; )
                        (h = v[u]) &&
                          (c = r ? Y(o, h) : d[u]) > -1 &&
                          (o[c] = !(a[c] = h));
                    }
                  } else (v = wt(v === a ? v.splice(f, v.length) : v)), r ? r(null, a, v, l) : I.apply(a, v);
                })
              );
            }
            function St(t) {
              for (
                var e,
                  i,
                  r,
                  o = t.length,
                  a = n.relative[t[0].type],
                  s = a || n.relative[" "],
                  l = a ? 1 : 0,
                  u = _t(
                    function (t) {
                      return t === e;
                    },
                    s,
                    !0
                  ),
                  h = _t(
                    function (t) {
                      return Y(e, t) > -1;
                    },
                    s,
                    !0
                  ),
                  d = [
                    function (t, i, n) {
                      var r =
                        (!a && (n || i !== c)) ||
                        ((e = i).nodeType ? u(t, i, n) : h(t, i, n));
                      return (e = null), r;
                    },
                  ];
                l < o;
                l++
              )
                if ((i = n.relative[t[l].type])) d = [_t(xt(d), i)];
                else {
                  if ((i = n.filter[t[l].type].apply(null, t[l].matches))[_]) {
                    for (r = ++l; r < o && !n.relative[t[r].type]; r++);
                    return kt(
                      l > 1 && xt(d),
                      l > 1 &&
                        bt(
                          t
                            .slice(0, l - 1)
                            .concat({ value: " " === t[l - 2].type ? "*" : "" })
                        ).replace(B, "$1"),
                      i,
                      l < r && St(t.slice(l, r)),
                      r < o && St((t = t.slice(r))),
                      r < o && bt(t)
                    );
                  }
                  d.push(i);
                }
              return xt(d);
            }
            return (
              (yt.prototype = n.filters = n.pseudos),
              (n.setFilters = new yt()),
              (a = st.tokenize = function (t, e) {
                var i,
                  r,
                  o,
                  a,
                  s,
                  l,
                  c,
                  u = M[t + " "];
                if (u) return e ? 0 : u.slice(0);
                for (s = t, l = [], c = n.preFilter; s; ) {
                  for (a in ((i && !(r = W.exec(s))) ||
                    (r && (s = s.slice(r[0].length) || s), l.push((o = []))),
                  (i = !1),
                  (r = V.exec(s)) &&
                    ((i = r.shift()),
                    o.push({ value: i, type: r[0].replace(B, " ") }),
                    (s = s.slice(i.length))),
                  n.filter))
                    !(r = X[a].exec(s)) ||
                      (c[a] && !(r = c[a](r))) ||
                      ((i = r.shift()),
                      o.push({ value: i, type: a, matches: r }),
                      (s = s.slice(i.length)));
                  if (!i) break;
                }
                return e ? s.length : s ? st.error(t) : M(t, l).slice(0);
              }),
              (s = st.compile = function (t, e) {
                var i,
                  r = [],
                  o = [],
                  s = T[t + " "];
                if (!s) {
                  for (e || (e = a(t)), i = e.length; i--; )
                    (s = St(e[i]))[_] ? r.push(s) : o.push(s);
                  (s = T(
                    t,
                    (function (t, e) {
                      var i = e.length > 0,
                        r = t.length > 0,
                        o = function (o, a, s, l, u) {
                          var h,
                            f,
                            g,
                            v = 0,
                            y = "0",
                            b = o && [],
                            _ = [],
                            x = c,
                            k = o || (r && n.find.TAG("*", u)),
                            S = (w += null == x ? 1 : Math.random() || 0.1),
                            M = k.length;
                          for (
                            u && (c = a == p || a || u);
                            y !== M && null != (h = k[y]);
                            y++
                          ) {
                            if (r && h) {
                              for (
                                f = 0,
                                  a || h.ownerDocument == p || (d(h), (s = !m));
                                (g = t[f++]);

                              )
                                if (g(h, a || p, s)) {
                                  l.push(h);
                                  break;
                                }
                              u && (w = S);
                            }
                            i && ((h = !g && h) && v--, o && b.push(h));
                          }
                          if (((v += y), i && y !== v)) {
                            for (f = 0; (g = e[f++]); ) g(b, _, a, s);
                            if (o) {
                              if (v > 0)
                                for (; y--; )
                                  b[y] || _[y] || (_[y] = A.call(l));
                              _ = wt(_);
                            }
                            I.apply(l, _),
                              u &&
                                !o &&
                                _.length > 0 &&
                                v + e.length > 1 &&
                                st.uniqueSort(l);
                          }
                          return u && ((w = S), (c = x)), b;
                        };
                      return i ? ct(o) : o;
                    })(o, r)
                  )).selector = t;
                }
                return s;
              }),
              (l = st.select = function (t, e, i, r) {
                var o,
                  l,
                  c,
                  u,
                  h,
                  d = "function" == typeof t && t,
                  p = !r && a((t = d.selector || t));
                if (((i = i || []), 1 === p.length)) {
                  if (
                    (l = p[0] = p[0].slice(0)).length > 2 &&
                    "ID" === (c = l[0]).type &&
                    9 === e.nodeType &&
                    m &&
                    n.relative[l[1].type]
                  ) {
                    if (
                      !(e = (n.find.ID(c.matches[0].replace(et, it), e) ||
                        [])[0])
                    )
                      return i;
                    d && (e = e.parentNode),
                      (t = t.slice(l.shift().value.length));
                  }
                  for (
                    o = X.needsContext.test(t) ? 0 : l.length;
                    o-- && ((c = l[o]), !n.relative[(u = c.type)]);

                  )
                    if (
                      (h = n.find[u]) &&
                      (r = h(
                        c.matches[0].replace(et, it),
                        (tt.test(l[0].type) && vt(e.parentNode)) || e
                      ))
                    ) {
                      if ((l.splice(o, 1), !(t = r.length && bt(l))))
                        return I.apply(i, r), i;
                      break;
                    }
                }
                return (
                  (d || s(t, p))(
                    r,
                    e,
                    !m,
                    i,
                    !e || (tt.test(t) && vt(e.parentNode)) || e
                  ),
                  i
                );
              }),
              (i.sortStable = _.split("").sort(D).join("") === _),
              (i.detectDuplicates = !!h),
              d(),
              (i.sortDetached = ut(function (t) {
                return (
                  1 & t.compareDocumentPosition(p.createElement("fieldset"))
                );
              })),
              ut(function (t) {
                return (
                  (t.innerHTML = "<a href='#'></a>"),
                  "#" === t.firstChild.getAttribute("href")
                );
              }) ||
                ht("type|href|height|width", function (t, e, i) {
                  if (!i)
                    return t.getAttribute(
                      e,
                      "type" === e.toLowerCase() ? 1 : 2
                    );
                }),
              (i.attributes &&
                ut(function (t) {
                  return (
                    (t.innerHTML = "<input/>"),
                    t.firstChild.setAttribute("value", ""),
                    "" === t.firstChild.getAttribute("value")
                  );
                })) ||
                ht("value", function (t, e, i) {
                  if (!i && "input" === t.nodeName.toLowerCase())
                    return t.defaultValue;
                }),
              ut(function (t) {
                return null == t.getAttribute("disabled");
              }) ||
                ht(z, function (t, e, i) {
                  var n;
                  if (!i)
                    return !0 === t[e]
                      ? e.toLowerCase()
                      : (n = t.getAttributeNode(e)) && n.specified
                      ? n.value
                      : null;
                }),
              st
            );
          })(i);
        (k.find = M),
          (k.expr = M.selectors),
          (k.expr[":"] = k.expr.pseudos),
          (k.uniqueSort = k.unique = M.uniqueSort),
          (k.text = M.getText),
          (k.isXMLDoc = M.isXML),
          (k.contains = M.contains),
          (k.escapeSelector = M.escape);
        var T = function (t, e, i) {
            for (var n = [], r = void 0 !== i; (t = t[e]) && 9 !== t.nodeType; )
              if (1 === t.nodeType) {
                if (r && k(t).is(i)) break;
                n.push(t);
              }
            return n;
          },
          C = function (t, e) {
            for (var i = []; t; t = t.nextSibling)
              1 === t.nodeType && t !== e && i.push(t);
            return i;
          },
          D = k.expr.match.needsContext;
        function L(t, e) {
          return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
        }
        var E = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function A(t, e, i) {
          return v(e)
            ? k.grep(t, function (t, n) {
                return !!e.call(t, n, t) !== i;
              })
            : e.nodeType
            ? k.grep(t, function (t) {
                return (t === e) !== i;
              })
            : "string" != typeof e
            ? k.grep(t, function (t) {
                return u.call(e, t) > -1 !== i;
              })
            : k.filter(e, t, i);
        }
        (k.filter = function (t, e, i) {
          var n = e[0];
          return (
            i && (t = ":not(" + t + ")"),
            1 === e.length && 1 === n.nodeType
              ? k.find.matchesSelector(n, t)
                ? [n]
                : []
              : k.find.matches(
                  t,
                  k.grep(e, function (t) {
                    return 1 === t.nodeType;
                  })
                )
          );
        }),
          k.fn.extend({
            find: function (t) {
              var e,
                i,
                n = this.length,
                r = this;
              if ("string" != typeof t)
                return this.pushStack(
                  k(t).filter(function () {
                    for (e = 0; e < n; e++)
                      if (k.contains(r[e], this)) return !0;
                  })
                );
              for (i = this.pushStack([]), e = 0; e < n; e++)
                k.find(t, r[e], i);
              return n > 1 ? k.uniqueSort(i) : i;
            },
            filter: function (t) {
              return this.pushStack(A(this, t || [], !1));
            },
            not: function (t) {
              return this.pushStack(A(this, t || [], !0));
            },
            is: function (t) {
              return !!A(
                this,
                "string" == typeof t && D.test(t) ? k(t) : t || [],
                !1
              ).length;
            },
          });
        var P,
          I = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        ((k.fn.init = function (t, e, i) {
          var n, r;
          if (!t) return this;
          if (((i = i || P), "string" == typeof t)) {
            if (
              !(n =
                "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3
                  ? [null, t, null]
                  : I.exec(t)) ||
              (!n[1] && e)
            )
              return !e || e.jquery
                ? (e || i).find(t)
                : this.constructor(e).find(t);
            if (n[1]) {
              if (
                ((e = e instanceof k ? e[0] : e),
                k.merge(
                  this,
                  k.parseHTML(
                    n[1],
                    e && e.nodeType ? e.ownerDocument || e : b,
                    !0
                  )
                ),
                E.test(n[1]) && k.isPlainObject(e))
              )
                for (n in e) v(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
              return this;
            }
            return (
              (r = b.getElementById(n[2])) &&
                ((this[0] = r), (this.length = 1)),
              this
            );
          }
          return t.nodeType
            ? ((this[0] = t), (this.length = 1), this)
            : v(t)
            ? void 0 !== i.ready
              ? i.ready(t)
              : t(k)
            : k.makeArray(t, this);
        }).prototype = k.fn),
          (P = k(b));
        var O = /^(?:parents|prev(?:Until|All))/,
          Y = { children: !0, contents: !0, next: !0, prev: !0 };
        function z(t, e) {
          for (; (t = t[e]) && 1 !== t.nodeType; );
          return t;
        }
        k.fn.extend({
          has: function (t) {
            var e = k(t, this),
              i = e.length;
            return this.filter(function () {
              for (var t = 0; t < i; t++) if (k.contains(this, e[t])) return !0;
            });
          },
          closest: function (t, e) {
            var i,
              n = 0,
              r = this.length,
              o = [],
              a = "string" != typeof t && k(t);
            if (!D.test(t))
              for (; n < r; n++)
                for (i = this[n]; i && i !== e; i = i.parentNode)
                  if (
                    i.nodeType < 11 &&
                    (a
                      ? a.index(i) > -1
                      : 1 === i.nodeType && k.find.matchesSelector(i, t))
                  ) {
                    o.push(i);
                    break;
                  }
            return this.pushStack(o.length > 1 ? k.uniqueSort(o) : o);
          },
          index: function (t) {
            return t
              ? "string" == typeof t
                ? u.call(k(t), this[0])
                : u.call(this, t.jquery ? t[0] : t)
              : this[0] && this[0].parentNode
              ? this.first().prevAll().length
              : -1;
          },
          add: function (t, e) {
            return this.pushStack(k.uniqueSort(k.merge(this.get(), k(t, e))));
          },
          addBack: function (t) {
            return this.add(
              null == t ? this.prevObject : this.prevObject.filter(t)
            );
          },
        }),
          k.each(
            {
              parent: function (t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null;
              },
              parents: function (t) {
                return T(t, "parentNode");
              },
              parentsUntil: function (t, e, i) {
                return T(t, "parentNode", i);
              },
              next: function (t) {
                return z(t, "nextSibling");
              },
              prev: function (t) {
                return z(t, "previousSibling");
              },
              nextAll: function (t) {
                return T(t, "nextSibling");
              },
              prevAll: function (t) {
                return T(t, "previousSibling");
              },
              nextUntil: function (t, e, i) {
                return T(t, "nextSibling", i);
              },
              prevUntil: function (t, e, i) {
                return T(t, "previousSibling", i);
              },
              siblings: function (t) {
                return C((t.parentNode || {}).firstChild, t);
              },
              children: function (t) {
                return C(t.firstChild);
              },
              contents: function (t) {
                return null != t.contentDocument && a(t.contentDocument)
                  ? t.contentDocument
                  : (L(t, "template") && (t = t.content || t),
                    k.merge([], t.childNodes));
              },
            },
            function (t, e) {
              k.fn[t] = function (i, n) {
                var r = k.map(this, e, i);
                return (
                  "Until" !== t.slice(-5) && (n = i),
                  n && "string" == typeof n && (r = k.filter(n, r)),
                  this.length > 1 &&
                    (Y[t] || k.uniqueSort(r), O.test(t) && r.reverse()),
                  this.pushStack(r)
                );
              };
            }
          );
        var R = /[^\x20\t\r\n\f]+/g;
        function F(t) {
          return t;
        }
        function H(t) {
          throw t;
        }
        function j(t, e, i, n) {
          var r;
          try {
            t && v((r = t.promise))
              ? r.call(t).done(e).fail(i)
              : t && v((r = t.then))
              ? r.call(t, e, i)
              : e.apply(void 0, [t].slice(n));
          } catch (t) {
            i.apply(void 0, [t]);
          }
        }
        (k.Callbacks = function (t) {
          t =
            "string" == typeof t
              ? (function (t) {
                  var e = {};
                  return (
                    k.each(t.match(R) || [], function (t, i) {
                      e[i] = !0;
                    }),
                    e
                  );
                })(t)
              : k.extend({}, t);
          var e,
            i,
            n,
            r,
            o = [],
            a = [],
            s = -1,
            l = function () {
              for (r = r || t.once, n = e = !0; a.length; s = -1)
                for (i = a.shift(); ++s < o.length; )
                  !1 === o[s].apply(i[0], i[1]) &&
                    t.stopOnFalse &&
                    ((s = o.length), (i = !1));
              t.memory || (i = !1), (e = !1), r && (o = i ? [] : "");
            },
            c = {
              add: function () {
                return (
                  o &&
                    (i && !e && ((s = o.length - 1), a.push(i)),
                    (function e(i) {
                      k.each(i, function (i, n) {
                        v(n)
                          ? (t.unique && c.has(n)) || o.push(n)
                          : n && n.length && "string" !== w(n) && e(n);
                      });
                    })(arguments),
                    i && !e && l()),
                  this
                );
              },
              remove: function () {
                return (
                  k.each(arguments, function (t, e) {
                    for (var i; (i = k.inArray(e, o, i)) > -1; )
                      o.splice(i, 1), i <= s && s--;
                  }),
                  this
                );
              },
              has: function (t) {
                return t ? k.inArray(t, o) > -1 : o.length > 0;
              },
              empty: function () {
                return o && (o = []), this;
              },
              disable: function () {
                return (r = a = []), (o = i = ""), this;
              },
              disabled: function () {
                return !o;
              },
              lock: function () {
                return (r = a = []), i || e || (o = i = ""), this;
              },
              locked: function () {
                return !!r;
              },
              fireWith: function (t, i) {
                return (
                  r ||
                    ((i = [t, (i = i || []).slice ? i.slice() : i]),
                    a.push(i),
                    e || l()),
                  this
                );
              },
              fire: function () {
                return c.fireWith(this, arguments), this;
              },
              fired: function () {
                return !!n;
              },
            };
          return c;
        }),
          k.extend({
            Deferred: function (t) {
              var e = [
                  [
                    "notify",
                    "progress",
                    k.Callbacks("memory"),
                    k.Callbacks("memory"),
                    2,
                  ],
                  [
                    "resolve",
                    "done",
                    k.Callbacks("once memory"),
                    k.Callbacks("once memory"),
                    0,
                    "resolved",
                  ],
                  [
                    "reject",
                    "fail",
                    k.Callbacks("once memory"),
                    k.Callbacks("once memory"),
                    1,
                    "rejected",
                  ],
                ],
                n = "pending",
                r = {
                  state: function () {
                    return n;
                  },
                  always: function () {
                    return o.done(arguments).fail(arguments), this;
                  },
                  catch: function (t) {
                    return r.then(null, t);
                  },
                  pipe: function () {
                    var t = arguments;
                    return k
                      .Deferred(function (i) {
                        k.each(e, function (e, n) {
                          var r = v(t[n[4]]) && t[n[4]];
                          o[n[1]](function () {
                            var t = r && r.apply(this, arguments);
                            t && v(t.promise)
                              ? t
                                  .promise()
                                  .progress(i.notify)
                                  .done(i.resolve)
                                  .fail(i.reject)
                              : i[n[0] + "With"](this, r ? [t] : arguments);
                          });
                        }),
                          (t = null);
                      })
                      .promise();
                  },
                  then: function (t, n, r) {
                    var o = 0;
                    function a(t, e, n, r) {
                      return function () {
                        var s = this,
                          l = arguments,
                          c = function () {
                            var i, c;
                            if (!(t < o)) {
                              if ((i = n.apply(s, l)) === e.promise())
                                throw new TypeError("Thenable self-resolution");
                              (c =
                                i &&
                                ("object" == typeof i ||
                                  "function" == typeof i) &&
                                i.then),
                                v(c)
                                  ? r
                                    ? c.call(i, a(o, e, F, r), a(o, e, H, r))
                                    : (o++,
                                      c.call(
                                        i,
                                        a(o, e, F, r),
                                        a(o, e, H, r),
                                        a(o, e, F, e.notifyWith)
                                      ))
                                  : (n !== F && ((s = void 0), (l = [i])),
                                    (r || e.resolveWith)(s, l));
                            }
                          },
                          u = r
                            ? c
                            : function () {
                                try {
                                  c();
                                } catch (i) {
                                  k.Deferred.exceptionHook &&
                                    k.Deferred.exceptionHook(i, u.stackTrace),
                                    t + 1 >= o &&
                                      (n !== H && ((s = void 0), (l = [i])),
                                      e.rejectWith(s, l));
                                }
                              };
                        t
                          ? u()
                          : (k.Deferred.getStackHook &&
                              (u.stackTrace = k.Deferred.getStackHook()),
                            i.setTimeout(u));
                      };
                    }
                    return k
                      .Deferred(function (i) {
                        e[0][3].add(a(0, i, v(r) ? r : F, i.notifyWith)),
                          e[1][3].add(a(0, i, v(t) ? t : F)),
                          e[2][3].add(a(0, i, v(n) ? n : H));
                      })
                      .promise();
                  },
                  promise: function (t) {
                    return null != t ? k.extend(t, r) : r;
                  },
                },
                o = {};
              return (
                k.each(e, function (t, i) {
                  var a = i[2],
                    s = i[5];
                  (r[i[1]] = a.add),
                    s &&
                      a.add(
                        function () {
                          n = s;
                        },
                        e[3 - t][2].disable,
                        e[3 - t][3].disable,
                        e[0][2].lock,
                        e[0][3].lock
                      ),
                    a.add(i[3].fire),
                    (o[i[0]] = function () {
                      return (
                        o[i[0] + "With"](this === o ? void 0 : this, arguments),
                        this
                      );
                    }),
                    (o[i[0] + "With"] = a.fireWith);
                }),
                r.promise(o),
                t && t.call(o, o),
                o
              );
            },
            when: function (t) {
              var e = arguments.length,
                i = e,
                n = Array(i),
                r = s.call(arguments),
                o = k.Deferred(),
                a = function (t) {
                  return function (i) {
                    (n[t] = this),
                      (r[t] = arguments.length > 1 ? s.call(arguments) : i),
                      --e || o.resolveWith(n, r);
                  };
                };
              if (
                e <= 1 &&
                (j(t, o.done(a(i)).resolve, o.reject, !e),
                "pending" === o.state() || v(r[i] && r[i].then))
              )
                return o.then();
              for (; i--; ) j(r[i], a(i), o.reject);
              return o.promise();
            },
          });
        var N = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        (k.Deferred.exceptionHook = function (t, e) {
          i.console &&
            i.console.warn &&
            t &&
            N.test(t.name) &&
            i.console.warn(
              "jQuery.Deferred exception: " + t.message,
              t.stack,
              e
            );
        }),
          (k.readyException = function (t) {
            i.setTimeout(function () {
              throw t;
            });
          });
        var B = k.Deferred();
        function W() {
          b.removeEventListener("DOMContentLoaded", W),
            i.removeEventListener("load", W),
            k.ready();
        }
        (k.fn.ready = function (t) {
          return (
            B.then(t).catch(function (t) {
              k.readyException(t);
            }),
            this
          );
        }),
          k.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (t) {
              (!0 === t ? --k.readyWait : k.isReady) ||
                ((k.isReady = !0),
                (!0 !== t && --k.readyWait > 0) || B.resolveWith(b, [k]));
            },
          }),
          (k.ready.then = B.then),
          "complete" === b.readyState ||
          ("loading" !== b.readyState && !b.documentElement.doScroll)
            ? i.setTimeout(k.ready)
            : (b.addEventListener("DOMContentLoaded", W),
              i.addEventListener("load", W));
        var V = function (t, e, i, n, r, o, a) {
            var s = 0,
              l = t.length,
              c = null == i;
            if ("object" === w(i))
              for (s in ((r = !0), i)) V(t, e, s, i[s], !0, o, a);
            else if (
              void 0 !== n &&
              ((r = !0),
              v(n) || (a = !0),
              c &&
                (a
                  ? (e.call(t, n), (e = null))
                  : ((c = e),
                    (e = function (t, e, i) {
                      return c.call(k(t), i);
                    }))),
              e)
            )
              for (; s < l; s++)
                e(t[s], i, a ? n : n.call(t[s], s, e(t[s], i)));
            return r ? t : c ? e.call(t) : l ? e(t[0], i) : o;
          },
          U = /^-ms-/,
          q = /-([a-z])/g;
        function $(t, e) {
          return e.toUpperCase();
        }
        function X(t) {
          return t.replace(U, "ms-").replace(q, $);
        }
        var G = function (t) {
          return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
        };
        function Z() {
          this.expando = k.expando + Z.uid++;
        }
        (Z.uid = 1),
          (Z.prototype = {
            cache: function (t) {
              var e = t[this.expando];
              return (
                e ||
                  ((e = {}),
                  G(t) &&
                    (t.nodeType
                      ? (t[this.expando] = e)
                      : Object.defineProperty(t, this.expando, {
                          value: e,
                          configurable: !0,
                        }))),
                e
              );
            },
            set: function (t, e, i) {
              var n,
                r = this.cache(t);
              if ("string" == typeof e) r[X(e)] = i;
              else for (n in e) r[X(n)] = e[n];
              return r;
            },
            get: function (t, e) {
              return void 0 === e
                ? this.cache(t)
                : t[this.expando] && t[this.expando][X(e)];
            },
            access: function (t, e, i) {
              return void 0 === e || (e && "string" == typeof e && void 0 === i)
                ? this.get(t, e)
                : (this.set(t, e, i), void 0 !== i ? i : e);
            },
            remove: function (t, e) {
              var i,
                n = t[this.expando];
              if (void 0 !== n) {
                if (void 0 !== e) {
                  i = (e = Array.isArray(e)
                    ? e.map(X)
                    : (e = X(e)) in n
                    ? [e]
                    : e.match(R) || []).length;
                  for (; i--; ) delete n[e[i]];
                }
                (void 0 === e || k.isEmptyObject(n)) &&
                  (t.nodeType
                    ? (t[this.expando] = void 0)
                    : delete t[this.expando]);
              }
            },
            hasData: function (t) {
              var e = t[this.expando];
              return void 0 !== e && !k.isEmptyObject(e);
            },
          });
        var J = new Z(),
          K = new Z(),
          Q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
          tt = /[A-Z]/g;
        function et(t, e, i) {
          var n;
          if (void 0 === i && 1 === t.nodeType)
            if (
              ((n = "data-" + e.replace(tt, "-$&").toLowerCase()),
              "string" == typeof (i = t.getAttribute(n)))
            ) {
              try {
                i = (function (t) {
                  return (
                    "true" === t ||
                    ("false" !== t &&
                      ("null" === t
                        ? null
                        : t === +t + ""
                        ? +t
                        : Q.test(t)
                        ? JSON.parse(t)
                        : t))
                  );
                })(i);
              } catch (t) {}
              K.set(t, e, i);
            } else i = void 0;
          return i;
        }
        k.extend({
          hasData: function (t) {
            return K.hasData(t) || J.hasData(t);
          },
          data: function (t, e, i) {
            return K.access(t, e, i);
          },
          removeData: function (t, e) {
            K.remove(t, e);
          },
          _data: function (t, e, i) {
            return J.access(t, e, i);
          },
          _removeData: function (t, e) {
            J.remove(t, e);
          },
        }),
          k.fn.extend({
            data: function (t, e) {
              var i,
                n,
                r,
                o = this[0],
                a = o && o.attributes;
              if (void 0 === t) {
                if (
                  this.length &&
                  ((r = K.get(o)),
                  1 === o.nodeType && !J.get(o, "hasDataAttrs"))
                ) {
                  for (i = a.length; i--; )
                    a[i] &&
                      0 === (n = a[i].name).indexOf("data-") &&
                      ((n = X(n.slice(5))), et(o, n, r[n]));
                  J.set(o, "hasDataAttrs", !0);
                }
                return r;
              }
              return "object" == typeof t
                ? this.each(function () {
                    K.set(this, t);
                  })
                : V(
                    this,
                    function (e) {
                      var i;
                      if (o && void 0 === e)
                        return void 0 !== (i = K.get(o, t)) ||
                          void 0 !== (i = et(o, t))
                          ? i
                          : void 0;
                      this.each(function () {
                        K.set(this, t, e);
                      });
                    },
                    null,
                    e,
                    arguments.length > 1,
                    null,
                    !0
                  );
            },
            removeData: function (t) {
              return this.each(function () {
                K.remove(this, t);
              });
            },
          }),
          k.extend({
            queue: function (t, e, i) {
              var n;
              if (t)
                return (
                  (e = (e || "fx") + "queue"),
                  (n = J.get(t, e)),
                  i &&
                    (!n || Array.isArray(i)
                      ? (n = J.access(t, e, k.makeArray(i)))
                      : n.push(i)),
                  n || []
                );
            },
            dequeue: function (t, e) {
              e = e || "fx";
              var i = k.queue(t, e),
                n = i.length,
                r = i.shift(),
                o = k._queueHooks(t, e);
              "inprogress" === r && ((r = i.shift()), n--),
                r &&
                  ("fx" === e && i.unshift("inprogress"),
                  delete o.stop,
                  r.call(
                    t,
                    function () {
                      k.dequeue(t, e);
                    },
                    o
                  )),
                !n && o && o.empty.fire();
            },
            _queueHooks: function (t, e) {
              var i = e + "queueHooks";
              return (
                J.get(t, i) ||
                J.access(t, i, {
                  empty: k.Callbacks("once memory").add(function () {
                    J.remove(t, [e + "queue", i]);
                  }),
                })
              );
            },
          }),
          k.fn.extend({
            queue: function (t, e) {
              var i = 2;
              return (
                "string" != typeof t && ((e = t), (t = "fx"), i--),
                arguments.length < i
                  ? k.queue(this[0], t)
                  : void 0 === e
                  ? this
                  : this.each(function () {
                      var i = k.queue(this, t, e);
                      k._queueHooks(this, t),
                        "fx" === t &&
                          "inprogress" !== i[0] &&
                          k.dequeue(this, t);
                    })
              );
            },
            dequeue: function (t) {
              return this.each(function () {
                k.dequeue(this, t);
              });
            },
            clearQueue: function (t) {
              return this.queue(t || "fx", []);
            },
            promise: function (t, e) {
              var i,
                n = 1,
                r = k.Deferred(),
                o = this,
                a = this.length,
                s = function () {
                  --n || r.resolveWith(o, [o]);
                };
              for (
                "string" != typeof t && ((e = t), (t = void 0)), t = t || "fx";
                a--;

              )
                (i = J.get(o[a], t + "queueHooks")) &&
                  i.empty &&
                  (n++, i.empty.add(s));
              return s(), r.promise(e);
            },
          });
        var it = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
          nt = new RegExp("^(?:([+-])=|)(" + it + ")([a-z%]*)$", "i"),
          rt = ["Top", "Right", "Bottom", "Left"],
          ot = b.documentElement,
          at = function (t) {
            return k.contains(t.ownerDocument, t);
          },
          st = { composed: !0 };
        ot.getRootNode &&
          (at = function (t) {
            return (
              k.contains(t.ownerDocument, t) ||
              t.getRootNode(st) === t.ownerDocument
            );
          });
        var lt = function (t, e) {
          return (
            "none" === (t = e || t).style.display ||
            ("" === t.style.display && at(t) && "none" === k.css(t, "display"))
          );
        };
        function ct(t, e, i, n) {
          var r,
            o,
            a = 20,
            s = n
              ? function () {
                  return n.cur();
                }
              : function () {
                  return k.css(t, e, "");
                },
            l = s(),
            c = (i && i[3]) || (k.cssNumber[e] ? "" : "px"),
            u =
              t.nodeType &&
              (k.cssNumber[e] || ("px" !== c && +l)) &&
              nt.exec(k.css(t, e));
          if (u && u[3] !== c) {
            for (l /= 2, c = c || u[3], u = +l || 1; a--; )
              k.style(t, e, u + c),
                (1 - o) * (1 - (o = s() / l || 0.5)) <= 0 && (a = 0),
                (u /= o);
            (u *= 2), k.style(t, e, u + c), (i = i || []);
          }
          return (
            i &&
              ((u = +u || +l || 0),
              (r = i[1] ? u + (i[1] + 1) * i[2] : +i[2]),
              n && ((n.unit = c), (n.start = u), (n.end = r))),
            r
          );
        }
        var ut = {};
        function ht(t) {
          var e,
            i = t.ownerDocument,
            n = t.nodeName,
            r = ut[n];
          return (
            r ||
            ((e = i.body.appendChild(i.createElement(n))),
            (r = k.css(e, "display")),
            e.parentNode.removeChild(e),
            "none" === r && (r = "block"),
            (ut[n] = r),
            r)
          );
        }
        function dt(t, e) {
          for (var i, n, r = [], o = 0, a = t.length; o < a; o++)
            (n = t[o]).style &&
              ((i = n.style.display),
              e
                ? ("none" === i &&
                    ((r[o] = J.get(n, "display") || null),
                    r[o] || (n.style.display = "")),
                  "" === n.style.display && lt(n) && (r[o] = ht(n)))
                : "none" !== i && ((r[o] = "none"), J.set(n, "display", i)));
          for (o = 0; o < a; o++) null != r[o] && (t[o].style.display = r[o]);
          return t;
        }
        k.fn.extend({
          show: function () {
            return dt(this, !0);
          },
          hide: function () {
            return dt(this);
          },
          toggle: function (t) {
            return "boolean" == typeof t
              ? t
                ? this.show()
                : this.hide()
              : this.each(function () {
                  lt(this) ? k(this).show() : k(this).hide();
                });
          },
        });
        var pt,
          ft,
          mt = /^(?:checkbox|radio)$/i,
          gt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
          vt = /^$|^module$|\/(?:java|ecma)script/i;
        (pt = b.createDocumentFragment().appendChild(b.createElement("div"))),
          (ft = b.createElement("input")).setAttribute("type", "radio"),
          ft.setAttribute("checked", "checked"),
          ft.setAttribute("name", "t"),
          pt.appendChild(ft),
          (g.checkClone = pt.cloneNode(!0).cloneNode(!0).lastChild.checked),
          (pt.innerHTML = "<textarea>x</textarea>"),
          (g.noCloneChecked = !!pt.cloneNode(!0).lastChild.defaultValue),
          (pt.innerHTML = "<option></option>"),
          (g.option = !!pt.lastChild);
        var yt = {
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""],
        };
        function bt(t, e) {
          var i;
          return (
            (i =
              void 0 !== t.getElementsByTagName
                ? t.getElementsByTagName(e || "*")
                : void 0 !== t.querySelectorAll
                ? t.querySelectorAll(e || "*")
                : []),
            void 0 === e || (e && L(t, e)) ? k.merge([t], i) : i
          );
        }
        function _t(t, e) {
          for (var i = 0, n = t.length; i < n; i++)
            J.set(t[i], "globalEval", !e || J.get(e[i], "globalEval"));
        }
        (yt.tbody = yt.tfoot = yt.colgroup = yt.caption = yt.thead),
          (yt.th = yt.td),
          g.option ||
            (yt.optgroup = yt.option = [
              1,
              "<select multiple='multiple'>",
              "</select>",
            ]);
        var xt = /<|&#?\w+;/;
        function wt(t, e, i, n, r) {
          for (
            var o,
              a,
              s,
              l,
              c,
              u,
              h = e.createDocumentFragment(),
              d = [],
              p = 0,
              f = t.length;
            p < f;
            p++
          )
            if ((o = t[p]) || 0 === o)
              if ("object" === w(o)) k.merge(d, o.nodeType ? [o] : o);
              else if (xt.test(o)) {
                for (
                  a = a || h.appendChild(e.createElement("div")),
                    s = (gt.exec(o) || ["", ""])[1].toLowerCase(),
                    l = yt[s] || yt._default,
                    a.innerHTML = l[1] + k.htmlPrefilter(o) + l[2],
                    u = l[0];
                  u--;

                )
                  a = a.lastChild;
                k.merge(d, a.childNodes), ((a = h.firstChild).textContent = "");
              } else d.push(e.createTextNode(o));
          for (h.textContent = "", p = 0; (o = d[p++]); )
            if (n && k.inArray(o, n) > -1) r && r.push(o);
            else if (
              ((c = at(o)), (a = bt(h.appendChild(o), "script")), c && _t(a), i)
            )
              for (u = 0; (o = a[u++]); ) vt.test(o.type || "") && i.push(o);
          return h;
        }
        var kt = /^key/,
          St = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
          Mt = /^([^.]*)(?:\.(.+)|)/;
        function Tt() {
          return !0;
        }
        function Ct() {
          return !1;
        }
        function Dt(t, e) {
          return (
            (t ===
              (function () {
                try {
                  return b.activeElement;
                } catch (t) {}
              })()) ==
            ("focus" === e)
          );
        }
        function Lt(t, e, i, n, r, o) {
          var a, s;
          if ("object" == typeof e) {
            for (s in ("string" != typeof i && ((n = n || i), (i = void 0)), e))
              Lt(t, s, i, n, e[s], o);
            return t;
          }
          if (
            (null == n && null == r
              ? ((r = i), (n = i = void 0))
              : null == r &&
                ("string" == typeof i
                  ? ((r = n), (n = void 0))
                  : ((r = n), (n = i), (i = void 0))),
            !1 === r)
          )
            r = Ct;
          else if (!r) return t;
          return (
            1 === o &&
              ((a = r),
              ((r = function (t) {
                return k().off(t), a.apply(this, arguments);
              }).guid = a.guid || (a.guid = k.guid++))),
            t.each(function () {
              k.event.add(this, e, r, n, i);
            })
          );
        }
        function Et(t, e, i) {
          i
            ? (J.set(t, e, !1),
              k.event.add(t, e, {
                namespace: !1,
                handler: function (t) {
                  var n,
                    r,
                    o = J.get(this, e);
                  if (1 & t.isTrigger && this[e]) {
                    if (o.length)
                      (k.event.special[e] || {}).delegateType &&
                        t.stopPropagation();
                    else if (
                      ((o = s.call(arguments)),
                      J.set(this, e, o),
                      (n = i(this, e)),
                      this[e](),
                      o !== (r = J.get(this, e)) || n
                        ? J.set(this, e, !1)
                        : (r = {}),
                      o !== r)
                    )
                      return (
                        t.stopImmediatePropagation(),
                        t.preventDefault(),
                        r.value
                      );
                  } else
                    o.length &&
                      (J.set(this, e, {
                        value: k.event.trigger(
                          k.extend(o[0], k.Event.prototype),
                          o.slice(1),
                          this
                        ),
                      }),
                      t.stopImmediatePropagation());
                },
              }))
            : void 0 === J.get(t, e) && k.event.add(t, e, Tt);
        }
        (k.event = {
          global: {},
          add: function (t, e, i, n, r) {
            var o,
              a,
              s,
              l,
              c,
              u,
              h,
              d,
              p,
              f,
              m,
              g = J.get(t);
            if (G(t))
              for (
                i.handler && ((i = (o = i).handler), (r = o.selector)),
                  r && k.find.matchesSelector(ot, r),
                  i.guid || (i.guid = k.guid++),
                  (l = g.events) || (l = g.events = Object.create(null)),
                  (a = g.handle) ||
                    (a = g.handle = function (e) {
                      return void 0 !== k && k.event.triggered !== e.type
                        ? k.event.dispatch.apply(t, arguments)
                        : void 0;
                    }),
                  c = (e = (e || "").match(R) || [""]).length;
                c--;

              )
                (p = m = (s = Mt.exec(e[c]) || [])[1]),
                  (f = (s[2] || "").split(".").sort()),
                  p &&
                    ((h = k.event.special[p] || {}),
                    (p = (r ? h.delegateType : h.bindType) || p),
                    (h = k.event.special[p] || {}),
                    (u = k.extend(
                      {
                        type: p,
                        origType: m,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: r,
                        needsContext: r && k.expr.match.needsContext.test(r),
                        namespace: f.join("."),
                      },
                      o
                    )),
                    (d = l[p]) ||
                      (((d = l[p] = []).delegateCount = 0),
                      (h.setup && !1 !== h.setup.call(t, n, f, a)) ||
                        (t.addEventListener && t.addEventListener(p, a))),
                    h.add &&
                      (h.add.call(t, u),
                      u.handler.guid || (u.handler.guid = i.guid)),
                    r ? d.splice(d.delegateCount++, 0, u) : d.push(u),
                    (k.event.global[p] = !0));
          },
          remove: function (t, e, i, n, r) {
            var o,
              a,
              s,
              l,
              c,
              u,
              h,
              d,
              p,
              f,
              m,
              g = J.hasData(t) && J.get(t);
            if (g && (l = g.events)) {
              for (c = (e = (e || "").match(R) || [""]).length; c--; )
                if (
                  ((p = m = (s = Mt.exec(e[c]) || [])[1]),
                  (f = (s[2] || "").split(".").sort()),
                  p)
                ) {
                  for (
                    h = k.event.special[p] || {},
                      d = l[(p = (n ? h.delegateType : h.bindType) || p)] || [],
                      s =
                        s[2] &&
                        new RegExp(
                          "(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"
                        ),
                      a = o = d.length;
                    o--;

                  )
                    (u = d[o]),
                      (!r && m !== u.origType) ||
                        (i && i.guid !== u.guid) ||
                        (s && !s.test(u.namespace)) ||
                        (n &&
                          n !== u.selector &&
                          ("**" !== n || !u.selector)) ||
                        (d.splice(o, 1),
                        u.selector && d.delegateCount--,
                        h.remove && h.remove.call(t, u));
                  a &&
                    !d.length &&
                    ((h.teardown && !1 !== h.teardown.call(t, f, g.handle)) ||
                      k.removeEvent(t, p, g.handle),
                    delete l[p]);
                } else for (p in l) k.event.remove(t, p + e[c], i, n, !0);
              k.isEmptyObject(l) && J.remove(t, "handle events");
            }
          },
          dispatch: function (t) {
            var e,
              i,
              n,
              r,
              o,
              a,
              s = new Array(arguments.length),
              l = k.event.fix(t),
              c = (J.get(this, "events") || Object.create(null))[l.type] || [],
              u = k.event.special[l.type] || {};
            for (s[0] = l, e = 1; e < arguments.length; e++)
              s[e] = arguments[e];
            if (
              ((l.delegateTarget = this),
              !u.preDispatch || !1 !== u.preDispatch.call(this, l))
            ) {
              for (
                a = k.event.handlers.call(this, l, c), e = 0;
                (r = a[e++]) && !l.isPropagationStopped();

              )
                for (
                  l.currentTarget = r.elem, i = 0;
                  (o = r.handlers[i++]) && !l.isImmediatePropagationStopped();

                )
                  (l.rnamespace &&
                    !1 !== o.namespace &&
                    !l.rnamespace.test(o.namespace)) ||
                    ((l.handleObj = o),
                    (l.data = o.data),
                    void 0 !==
                      (n = (
                        (k.event.special[o.origType] || {}).handle || o.handler
                      ).apply(r.elem, s)) &&
                      !1 === (l.result = n) &&
                      (l.preventDefault(), l.stopPropagation()));
              return u.postDispatch && u.postDispatch.call(this, l), l.result;
            }
          },
          handlers: function (t, e) {
            var i,
              n,
              r,
              o,
              a,
              s = [],
              l = e.delegateCount,
              c = t.target;
            if (l && c.nodeType && !("click" === t.type && t.button >= 1))
              for (; c !== this; c = c.parentNode || this)
                if (
                  1 === c.nodeType &&
                  ("click" !== t.type || !0 !== c.disabled)
                ) {
                  for (o = [], a = {}, i = 0; i < l; i++)
                    void 0 === a[(r = (n = e[i]).selector + " ")] &&
                      (a[r] = n.needsContext
                        ? k(r, this).index(c) > -1
                        : k.find(r, this, null, [c]).length),
                      a[r] && o.push(n);
                  o.length && s.push({ elem: c, handlers: o });
                }
            return (
              (c = this),
              l < e.length && s.push({ elem: c, handlers: e.slice(l) }),
              s
            );
          },
          addProp: function (t, e) {
            Object.defineProperty(k.Event.prototype, t, {
              enumerable: !0,
              configurable: !0,
              get: v(e)
                ? function () {
                    if (this.originalEvent) return e(this.originalEvent);
                  }
                : function () {
                    if (this.originalEvent) return this.originalEvent[t];
                  },
              set: function (e) {
                Object.defineProperty(this, t, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: e,
                });
              },
            });
          },
          fix: function (t) {
            return t[k.expando] ? t : new k.Event(t);
          },
          special: {
            load: { noBubble: !0 },
            click: {
              setup: function (t) {
                var e = this || t;
                return (
                  mt.test(e.type) &&
                    e.click &&
                    L(e, "input") &&
                    Et(e, "click", Tt),
                  !1
                );
              },
              trigger: function (t) {
                var e = this || t;
                return (
                  mt.test(e.type) && e.click && L(e, "input") && Et(e, "click"),
                  !0
                );
              },
              _default: function (t) {
                var e = t.target;
                return (
                  (mt.test(e.type) &&
                    e.click &&
                    L(e, "input") &&
                    J.get(e, "click")) ||
                  L(e, "a")
                );
              },
            },
            beforeunload: {
              postDispatch: function (t) {
                void 0 !== t.result &&
                  t.originalEvent &&
                  (t.originalEvent.returnValue = t.result);
              },
            },
          },
        }),
          (k.removeEvent = function (t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i);
          }),
          (k.Event = function (t, e) {
            if (!(this instanceof k.Event)) return new k.Event(t, e);
            t && t.type
              ? ((this.originalEvent = t),
                (this.type = t.type),
                (this.isDefaultPrevented =
                  t.defaultPrevented ||
                  (void 0 === t.defaultPrevented && !1 === t.returnValue)
                    ? Tt
                    : Ct),
                (this.target =
                  t.target && 3 === t.target.nodeType
                    ? t.target.parentNode
                    : t.target),
                (this.currentTarget = t.currentTarget),
                (this.relatedTarget = t.relatedTarget))
              : (this.type = t),
              e && k.extend(this, e),
              (this.timeStamp = (t && t.timeStamp) || Date.now()),
              (this[k.expando] = !0);
          }),
          (k.Event.prototype = {
            constructor: k.Event,
            isDefaultPrevented: Ct,
            isPropagationStopped: Ct,
            isImmediatePropagationStopped: Ct,
            isSimulated: !1,
            preventDefault: function () {
              var t = this.originalEvent;
              (this.isDefaultPrevented = Tt),
                t && !this.isSimulated && t.preventDefault();
            },
            stopPropagation: function () {
              var t = this.originalEvent;
              (this.isPropagationStopped = Tt),
                t && !this.isSimulated && t.stopPropagation();
            },
            stopImmediatePropagation: function () {
              var t = this.originalEvent;
              (this.isImmediatePropagationStopped = Tt),
                t && !this.isSimulated && t.stopImmediatePropagation(),
                this.stopPropagation();
            },
          }),
          k.each(
            {
              altKey: !0,
              bubbles: !0,
              cancelable: !0,
              changedTouches: !0,
              ctrlKey: !0,
              detail: !0,
              eventPhase: !0,
              metaKey: !0,
              pageX: !0,
              pageY: !0,
              shiftKey: !0,
              view: !0,
              char: !0,
              code: !0,
              charCode: !0,
              key: !0,
              keyCode: !0,
              button: !0,
              buttons: !0,
              clientX: !0,
              clientY: !0,
              offsetX: !0,
              offsetY: !0,
              pointerId: !0,
              pointerType: !0,
              screenX: !0,
              screenY: !0,
              targetTouches: !0,
              toElement: !0,
              touches: !0,
              which: function (t) {
                var e = t.button;
                return null == t.which && kt.test(t.type)
                  ? null != t.charCode
                    ? t.charCode
                    : t.keyCode
                  : !t.which && void 0 !== e && St.test(t.type)
                  ? 1 & e
                    ? 1
                    : 2 & e
                    ? 3
                    : 4 & e
                    ? 2
                    : 0
                  : t.which;
              },
            },
            k.event.addProp
          ),
          k.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
            k.event.special[t] = {
              setup: function () {
                return Et(this, t, Dt), !1;
              },
              trigger: function () {
                return Et(this, t), !0;
              },
              delegateType: e,
            };
          }),
          k.each(
            {
              mouseenter: "mouseover",
              mouseleave: "mouseout",
              pointerenter: "pointerover",
              pointerleave: "pointerout",
            },
            function (t, e) {
              k.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function (t) {
                  var i,
                    n = this,
                    r = t.relatedTarget,
                    o = t.handleObj;
                  return (
                    (r && (r === n || k.contains(n, r))) ||
                      ((t.type = o.origType),
                      (i = o.handler.apply(this, arguments)),
                      (t.type = e)),
                    i
                  );
                },
              };
            }
          ),
          k.fn.extend({
            on: function (t, e, i, n) {
              return Lt(this, t, e, i, n);
            },
            one: function (t, e, i, n) {
              return Lt(this, t, e, i, n, 1);
            },
            off: function (t, e, i) {
              var n, r;
              if (t && t.preventDefault && t.handleObj)
                return (
                  (n = t.handleObj),
                  k(t.delegateTarget).off(
                    n.namespace ? n.origType + "." + n.namespace : n.origType,
                    n.selector,
                    n.handler
                  ),
                  this
                );
              if ("object" == typeof t) {
                for (r in t) this.off(r, e, t[r]);
                return this;
              }
              return (
                (!1 !== e && "function" != typeof e) || ((i = e), (e = void 0)),
                !1 === i && (i = Ct),
                this.each(function () {
                  k.event.remove(this, t, i, e);
                })
              );
            },
          });
        var At = /<script|<style|<link/i,
          Pt = /checked\s*(?:[^=]|=\s*.checked.)/i,
          It = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function Ot(t, e) {
          return (
            (L(t, "table") &&
              L(11 !== e.nodeType ? e : e.firstChild, "tr") &&
              k(t).children("tbody")[0]) ||
            t
          );
        }
        function Yt(t) {
          return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
        }
        function zt(t) {
          return (
            "true/" === (t.type || "").slice(0, 5)
              ? (t.type = t.type.slice(5))
              : t.removeAttribute("type"),
            t
          );
        }
        function Rt(t, e) {
          var i, n, r, o, a, s;
          if (1 === e.nodeType) {
            if (J.hasData(t) && (s = J.get(t).events))
              for (r in (J.remove(e, "handle events"), s))
                for (i = 0, n = s[r].length; i < n; i++)
                  k.event.add(e, r, s[r][i]);
            K.hasData(t) &&
              ((o = K.access(t)), (a = k.extend({}, o)), K.set(e, a));
          }
        }
        function Ft(t, e) {
          var i = e.nodeName.toLowerCase();
          "input" === i && mt.test(t.type)
            ? (e.checked = t.checked)
            : ("input" !== i && "textarea" !== i) ||
              (e.defaultValue = t.defaultValue);
        }
        function Ht(t, e, i, n) {
          e = l(e);
          var r,
            o,
            a,
            s,
            c,
            u,
            h = 0,
            d = t.length,
            p = d - 1,
            f = e[0],
            m = v(f);
          if (
            m ||
            (d > 1 && "string" == typeof f && !g.checkClone && Pt.test(f))
          )
            return t.each(function (r) {
              var o = t.eq(r);
              m && (e[0] = f.call(this, r, o.html())), Ht(o, e, i, n);
            });
          if (
            d &&
            ((o = (r = wt(e, t[0].ownerDocument, !1, t, n)).firstChild),
            1 === r.childNodes.length && (r = o),
            o || n)
          ) {
            for (s = (a = k.map(bt(r, "script"), Yt)).length; h < d; h++)
              (c = r),
                h !== p &&
                  ((c = k.clone(c, !0, !0)), s && k.merge(a, bt(c, "script"))),
                i.call(t[h], c, h);
            if (s)
              for (
                u = a[a.length - 1].ownerDocument, k.map(a, zt), h = 0;
                h < s;
                h++
              )
                (c = a[h]),
                  vt.test(c.type || "") &&
                    !J.access(c, "globalEval") &&
                    k.contains(u, c) &&
                    (c.src && "module" !== (c.type || "").toLowerCase()
                      ? k._evalUrl &&
                        !c.noModule &&
                        k._evalUrl(
                          c.src,
                          { nonce: c.nonce || c.getAttribute("nonce") },
                          u
                        )
                      : x(c.textContent.replace(It, ""), c, u));
          }
          return t;
        }
        function jt(t, e, i) {
          for (
            var n, r = e ? k.filter(e, t) : t, o = 0;
            null != (n = r[o]);
            o++
          )
            i || 1 !== n.nodeType || k.cleanData(bt(n)),
              n.parentNode &&
                (i && at(n) && _t(bt(n, "script")),
                n.parentNode.removeChild(n));
          return t;
        }
        k.extend({
          htmlPrefilter: function (t) {
            return t;
          },
          clone: function (t, e, i) {
            var n,
              r,
              o,
              a,
              s = t.cloneNode(!0),
              l = at(t);
            if (
              !(
                g.noCloneChecked ||
                (1 !== t.nodeType && 11 !== t.nodeType) ||
                k.isXMLDoc(t)
              )
            )
              for (a = bt(s), n = 0, r = (o = bt(t)).length; n < r; n++)
                Ft(o[n], a[n]);
            if (e)
              if (i)
                for (
                  o = o || bt(t), a = a || bt(s), n = 0, r = o.length;
                  n < r;
                  n++
                )
                  Rt(o[n], a[n]);
              else Rt(t, s);
            return (
              (a = bt(s, "script")).length > 0 && _t(a, !l && bt(t, "script")),
              s
            );
          },
          cleanData: function (t) {
            for (
              var e, i, n, r = k.event.special, o = 0;
              void 0 !== (i = t[o]);
              o++
            )
              if (G(i)) {
                if ((e = i[J.expando])) {
                  if (e.events)
                    for (n in e.events)
                      r[n]
                        ? k.event.remove(i, n)
                        : k.removeEvent(i, n, e.handle);
                  i[J.expando] = void 0;
                }
                i[K.expando] && (i[K.expando] = void 0);
              }
          },
        }),
          k.fn.extend({
            detach: function (t) {
              return jt(this, t, !0);
            },
            remove: function (t) {
              return jt(this, t);
            },
            text: function (t) {
              return V(
                this,
                function (t) {
                  return void 0 === t
                    ? k.text(this)
                    : this.empty().each(function () {
                        (1 !== this.nodeType &&
                          11 !== this.nodeType &&
                          9 !== this.nodeType) ||
                          (this.textContent = t);
                      });
                },
                null,
                t,
                arguments.length
              );
            },
            append: function () {
              return Ht(this, arguments, function (t) {
                (1 !== this.nodeType &&
                  11 !== this.nodeType &&
                  9 !== this.nodeType) ||
                  Ot(this, t).appendChild(t);
              });
            },
            prepend: function () {
              return Ht(this, arguments, function (t) {
                if (
                  1 === this.nodeType ||
                  11 === this.nodeType ||
                  9 === this.nodeType
                ) {
                  var e = Ot(this, t);
                  e.insertBefore(t, e.firstChild);
                }
              });
            },
            before: function () {
              return Ht(this, arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this);
              });
            },
            after: function () {
              return Ht(this, arguments, function (t) {
                this.parentNode &&
                  this.parentNode.insertBefore(t, this.nextSibling);
              });
            },
            empty: function () {
              for (var t, e = 0; null != (t = this[e]); e++)
                1 === t.nodeType &&
                  (k.cleanData(bt(t, !1)), (t.textContent = ""));
              return this;
            },
            clone: function (t, e) {
              return (
                (t = null != t && t),
                (e = null == e ? t : e),
                this.map(function () {
                  return k.clone(this, t, e);
                })
              );
            },
            html: function (t) {
              return V(
                this,
                function (t) {
                  var e = this[0] || {},
                    i = 0,
                    n = this.length;
                  if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                  if (
                    "string" == typeof t &&
                    !At.test(t) &&
                    !yt[(gt.exec(t) || ["", ""])[1].toLowerCase()]
                  ) {
                    t = k.htmlPrefilter(t);
                    try {
                      for (; i < n; i++)
                        1 === (e = this[i] || {}).nodeType &&
                          (k.cleanData(bt(e, !1)), (e.innerHTML = t));
                      e = 0;
                    } catch (t) {}
                  }
                  e && this.empty().append(t);
                },
                null,
                t,
                arguments.length
              );
            },
            replaceWith: function () {
              var t = [];
              return Ht(
                this,
                arguments,
                function (e) {
                  var i = this.parentNode;
                  k.inArray(this, t) < 0 &&
                    (k.cleanData(bt(this)), i && i.replaceChild(e, this));
                },
                t
              );
            },
          }),
          k.each(
            {
              appendTo: "append",
              prependTo: "prepend",
              insertBefore: "before",
              insertAfter: "after",
              replaceAll: "replaceWith",
            },
            function (t, e) {
              k.fn[t] = function (t) {
                for (
                  var i, n = [], r = k(t), o = r.length - 1, a = 0;
                  a <= o;
                  a++
                )
                  (i = a === o ? this : this.clone(!0)),
                    k(r[a])[e](i),
                    c.apply(n, i.get());
                return this.pushStack(n);
              };
            }
          );
        var Nt = new RegExp("^(" + it + ")(?!px)[a-z%]+$", "i"),
          Bt = function (t) {
            var e = t.ownerDocument.defaultView;
            return (e && e.opener) || (e = i), e.getComputedStyle(t);
          },
          Wt = function (t, e, i) {
            var n,
              r,
              o = {};
            for (r in e) (o[r] = t.style[r]), (t.style[r] = e[r]);
            for (r in ((n = i.call(t)), e)) t.style[r] = o[r];
            return n;
          },
          Vt = new RegExp(rt.join("|"), "i");
        function Ut(t, e, i) {
          var n,
            r,
            o,
            a,
            s = t.style;
          return (
            (i = i || Bt(t)) &&
              ("" !== (a = i.getPropertyValue(e) || i[e]) ||
                at(t) ||
                (a = k.style(t, e)),
              !g.pixelBoxStyles() &&
                Nt.test(a) &&
                Vt.test(e) &&
                ((n = s.width),
                (r = s.minWidth),
                (o = s.maxWidth),
                (s.minWidth = s.maxWidth = s.width = a),
                (a = i.width),
                (s.width = n),
                (s.minWidth = r),
                (s.maxWidth = o))),
            void 0 !== a ? a + "" : a
          );
        }
        function qt(t, e) {
          return {
            get: function () {
              if (!t()) return (this.get = e).apply(this, arguments);
              delete this.get;
            },
          };
        }
        !(function () {
          function t() {
            if (u) {
              (c.style.cssText =
                "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                (u.style.cssText =
                  "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                ot.appendChild(c).appendChild(u);
              var t = i.getComputedStyle(u);
              (n = "1%" !== t.top),
                (l = 12 === e(t.marginLeft)),
                (u.style.right = "60%"),
                (a = 36 === e(t.right)),
                (r = 36 === e(t.width)),
                (u.style.position = "absolute"),
                (o = 12 === e(u.offsetWidth / 3)),
                ot.removeChild(c),
                (u = null);
            }
          }
          function e(t) {
            return Math.round(parseFloat(t));
          }
          var n,
            r,
            o,
            a,
            s,
            l,
            c = b.createElement("div"),
            u = b.createElement("div");
          u.style &&
            ((u.style.backgroundClip = "content-box"),
            (u.cloneNode(!0).style.backgroundClip = ""),
            (g.clearCloneStyle = "content-box" === u.style.backgroundClip),
            k.extend(g, {
              boxSizingReliable: function () {
                return t(), r;
              },
              pixelBoxStyles: function () {
                return t(), a;
              },
              pixelPosition: function () {
                return t(), n;
              },
              reliableMarginLeft: function () {
                return t(), l;
              },
              scrollboxSize: function () {
                return t(), o;
              },
              reliableTrDimensions: function () {
                var t, e, n, r;
                return (
                  null == s &&
                    ((t = b.createElement("table")),
                    (e = b.createElement("tr")),
                    (n = b.createElement("div")),
                    (t.style.cssText = "position:absolute;left:-11111px"),
                    (e.style.height = "1px"),
                    (n.style.height = "9px"),
                    ot.appendChild(t).appendChild(e).appendChild(n),
                    (r = i.getComputedStyle(e)),
                    (s = parseInt(r.height) > 3),
                    ot.removeChild(t)),
                  s
                );
              },
            }));
        })();
        var $t = ["Webkit", "Moz", "ms"],
          Xt = b.createElement("div").style,
          Gt = {};
        function Zt(t) {
          var e = k.cssProps[t] || Gt[t];
          return (
            e ||
            (t in Xt
              ? t
              : (Gt[t] =
                  (function (t) {
                    for (
                      var e = t[0].toUpperCase() + t.slice(1), i = $t.length;
                      i--;

                    )
                      if ((t = $t[i] + e) in Xt) return t;
                  })(t) || t))
          );
        }
        var Kt = /^--/,
          te = { letterSpacing: "0", fontWeight: "400" };

        function re(t, e, i, n, r) {
          return new re.prototype.init(t, e, i, n, r);
        }
        k.extend({
          cssHooks: {
            opacity: {
              get: function (t, e) {
                if (e) {
                  var i = Ut(t, "opacity");
                  return "" === i ? "1" : i;
                }
              },
            },
          },
          cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
          },
          cssProps: {},
          style: function (t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
              var r,
                o,
                a,
                s = X(e),
                l = Kt.test(e),
                c = t.style;
              if (
                (l || (e = Zt(s)),
                (a = k.cssHooks[e] || k.cssHooks[s]),
                void 0 === i)
              )
                return a && "get" in a && void 0 !== (r = a.get(t, !1, n))
                  ? r
                  : c[e];
              "string" === (o = typeof i) &&
                (r = nt.exec(i)) &&
                r[1] &&
                ((i = ct(t, e, r)), (o = "number")),
                null != i &&
                  i == i &&
                  ("number" !== o ||
                    l ||
                    (i += (r && r[3]) || (k.cssNumber[s] ? "" : "px")),
                  g.clearCloneStyle ||
                    "" !== i ||
                    0 !== e.indexOf("background") ||
                    (c[e] = "inherit"),
                  (a && "set" in a && void 0 === (i = a.set(t, i, n))) ||
                    (l ? c.setProperty(e, i) : (c[e] = i)));
            }
          },
          css: function (t, e, i, n) {
            var r,
              o,
              a,
              s = X(e);
            return (
              Kt.test(e) || (e = Zt(s)),
              (a = k.cssHooks[e] || k.cssHooks[s]) &&
                "get" in a &&
                (r = a.get(t, !0, i)),
              void 0 === r && (r = Ut(t, e, n)),
              "normal" === r && e in te && (r = te[e]),
              "" === i || i
                ? ((o = parseFloat(r)), !0 === i || isFinite(o) ? o || 0 : r)
                : r
            );
          },
        }),
          k.fn.extend({
            css: function (t, e) {
              return V(
                this,
                function (t, e, i) {
                  var n,
                    r,
                    o = {},
                    a = 0;
                  if (Array.isArray(e)) {
                    for (n = Bt(t), r = e.length; a < r; a++)
                      o[e[a]] = k.css(t, e[a], !1, n);
                    return o;
                  }
                  return void 0 !== i ? k.style(t, e, i) : k.css(t, e);
                },
                t,
                e,
                arguments.length > 1
              );
            },
          }),
          (k.Tween = re),
          (re.prototype = {
            constructor: re,
            init: function (t, e, i, n, r, o) {
              (this.elem = t),
                (this.prop = i),
                (this.easing = r || k.easing._default),
                (this.options = e),
                (this.start = this.now = this.cur()),
                (this.end = n),
                (this.unit = o || (k.cssNumber[i] ? "" : "px"));
            },
            cur: function () {
              var t = re.propHooks[this.prop];
              return t && t.get ? t.get(this) : re.propHooks._default.get(this);
            },
            run: function (t) {
              var e,
                i = re.propHooks[this.prop];
              return (
                this.options.duration
                  ? (this.pos = e = k.easing[this.easing](
                      t,
                      this.options.duration * t,
                      0,
                      1,
                      this.options.duration
                    ))
                  : (this.pos = e = t),
                (this.now = (this.end - this.start) * e + this.start),
                this.options.step &&
                  this.options.step.call(this.elem, this.now, this),
                i && i.set ? i.set(this) : re.propHooks._default.set(this),
                this
              );
            },
          }),
          (re.prototype.init.prototype = re.prototype),
          (re.propHooks = {
            _default: {
              get: function (t) {
                var e;
                return 1 !== t.elem.nodeType ||
                  (null != t.elem[t.prop] && null == t.elem.style[t.prop])
                  ? t.elem[t.prop]
                  : (e = k.css(t.elem, t.prop, "")) && "auto" !== e
                  ? e
                  : 0;
              },
              set: function (t) {
                k.fx.step[t.prop]
                  ? k.fx.step[t.prop](t)
                  : 1 !== t.elem.nodeType ||
                    (!k.cssHooks[t.prop] && null == t.elem.style[Zt(t.prop)])
                  ? (t.elem[t.prop] = t.now)
                  : k.style(t.elem, t.prop, t.now + t.unit);
              },
            },
          }),
          (re.propHooks.scrollTop = re.propHooks.scrollLeft = {
            set: function (t) {
              t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
            },
          }),
          (k.easing = {
            linear: function (t) {
              return t;
            },
            swing: function (t) {
              return 0.5 - Math.cos(t * Math.PI) / 2;
            },
            _default: "swing",
          }),
          (k.fx = re.prototype.init),
          (k.fx.step = {});

        function de(t, e, i) {
          for (
            var n,
              r = (pe.tweeners[e] || []).concat(pe.tweeners["*"]),
              o = 0,
              a = r.length;
            o < a;
            o++
          )
            if ((n = r[o].call(i, e, t))) return n;
        }
        function pe(t, e, i) {
          var n,
            r,
            o = 0,
            a = pe.prefilters.length,
            s = k.Deferred().always(function () {
              delete l.elem;
            }),
            l = function () {
              if (r) return !1;
              for (
                var e = oe || ue(),
                  i = Math.max(0, c.startTime + c.duration - e),
                  n = 1 - (i / c.duration || 0),
                  o = 0,
                  a = c.tweens.length;
                o < a;
                o++
              )
                c.tweens[o].run(n);
              return (
                s.notifyWith(t, [c, n, i]),
                n < 1 && a
                  ? i
                  : (a || s.notifyWith(t, [c, 1, 0]), s.resolveWith(t, [c]), !1)
              );
            },
            c = s.promise({
              elem: t,
              props: k.extend({}, e),
              opts: k.extend(
                !0,
                { specialEasing: {}, easing: k.easing._default },
                i
              ),
              originalProperties: e,
              originalOptions: i,
              startTime: oe || ue(),
              duration: i.duration,
              tweens: [],
              createTween: function (e, i) {
                var n = k.Tween(
                  t,
                  c.opts,
                  e,
                  i,
                  c.opts.specialEasing[e] || c.opts.easing
                );
                return c.tweens.push(n), n;
              },
              stop: function (e) {
                var i = 0,
                  n = e ? c.tweens.length : 0;
                if (r) return this;
                for (r = !0; i < n; i++) c.tweens[i].run(1);
                return (
                  e
                    ? (s.notifyWith(t, [c, 1, 0]), s.resolveWith(t, [c, e]))
                    : s.rejectWith(t, [c, e]),
                  this
                );
              },
            }),
            u = c.props;
          for (
            !(function (t, e) {
              var i, n, r, o, a;
              for (i in t)
                if (
                  ((r = e[(n = X(i))]),
                  (o = t[i]),
                  Array.isArray(o) && ((r = o[1]), (o = t[i] = o[0])),
                  i !== n && ((t[n] = o), delete t[i]),
                  (a = k.cssHooks[n]) && ("expand" in a))
                )
                  for (i in ((o = a.expand(o)), delete t[n], o))
                    (i in t) || ((t[i] = o[i]), (e[i] = r));
                else e[n] = r;
            })(u, c.opts.specialEasing);
            o < a;
            o++
          )
            if ((n = pe.prefilters[o].call(c, t, u, c.opts)))
              return (
                v(n.stop) &&
                  (k._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)),
                n
              );
          return (
            k.map(u, de, c),
            v(c.opts.start) && c.opts.start.call(t, c),
            c
              .progress(c.opts.progress)
              .done(c.opts.done, c.opts.complete)
              .fail(c.opts.fail)
              .always(c.opts.always),
            k.fx.timer(k.extend(l, { elem: t, anim: c, queue: c.opts.queue })),
            c
          );
        }
        var fe;
        k.fn.extend({
          attr: function (t, e) {
            return V(this, k.attr, t, e, arguments.length > 1);
          },
          removeAttr: function (t) {
            return this.each(function () {
              k.removeAttr(this, t);
            });
          },
        }),
          k.extend({
            attr: function (t, e, i) {
              var n,
                r,
                o = t.nodeType;
              if (3 !== o && 8 !== o && 2 !== o)
                return void 0 === t.getAttribute
                  ? k.prop(t, e, i)
                  : ((1 === o && k.isXMLDoc(t)) ||
                      (r =
                        k.attrHooks[e.toLowerCase()] ||
                        (k.expr.match.bool.test(e) ? fe : void 0)),
                    void 0 !== i
                      ? null === i
                        ? void k.removeAttr(t, e)
                        : r && "set" in r && void 0 !== (n = r.set(t, i, e))
                        ? n
                        : (t.setAttribute(e, i + ""), i)
                      : r && "get" in r && null !== (n = r.get(t, e))
                      ? n
                      : null == (n = k.find.attr(t, e))
                      ? void 0
                      : n);
            },
            attrHooks: {
              type: {
                set: function (t, e) {
                  if (!g.radioValue && "radio" === e && L(t, "input")) {
                    var i = t.value;
                    return t.setAttribute("type", e), i && (t.value = i), e;
                  }
                },
              },
            },
            removeAttr: function (t, e) {
              var i,
                n = 0,
                r = e && e.match(R);
              if (r && 1 === t.nodeType)
                for (; (i = r[n++]); ) t.removeAttribute(i);
            },
          });
        function ye(t) {
          return (t.match(R) || []).join(" ");
        }
        function be(t) {
          return (t.getAttribute && t.getAttribute("class")) || "";
        }
        function _e(t) {
          return Array.isArray(t)
            ? t
            : ("string" == typeof t && t.match(R)) || [];
        }
        k.fn.extend({
          addClass: function (t) {
            var e,
              i,
              n,
              r,
              o,
              a,
              s,
              l = 0;
            if (v(t))
              return this.each(function (e) {
                k(this).addClass(t.call(this, e, be(this)));
              });
            if ((e = _e(t)).length)
              for (; (i = this[l++]); )
                if (
                  ((r = be(i)), (n = 1 === i.nodeType && " " + ye(r) + " "))
                ) {
                  for (a = 0; (o = e[a++]); )
                    n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                  r !== (s = ye(n)) && i.setAttribute("class", s);
                }
            return this;
          },
          removeClass: function (t) {
            var e,
              i,
              n,
              r,
              o,
              a,
              s,
              l = 0;
            if (v(t))
              return this.each(function (e) {
                k(this).removeClass(t.call(this, e, be(this)));
              });
            if (!arguments.length) return this.attr("class", "");
            if ((e = _e(t)).length)
              for (; (i = this[l++]); )
                if (
                  ((r = be(i)), (n = 1 === i.nodeType && " " + ye(r) + " "))
                ) {
                  for (a = 0; (o = e[a++]); )
                    for (; n.indexOf(" " + o + " ") > -1; )
                      n = n.replace(" " + o + " ", " ");
                  r !== (s = ye(n)) && i.setAttribute("class", s);
                }
            return this;
          },
          toggleClass: function (t, e) {
            var i = typeof t,
              n = "string" === i || Array.isArray(t);
            return "boolean" == typeof e && n
              ? e
                ? this.addClass(t)
                : this.removeClass(t)
              : v(t)
              ? this.each(function (i) {
                  k(this).toggleClass(t.call(this, i, be(this), e), e);
                })
              : this.each(function () {
                  var e, r, o, a;
                  if (n)
                    for (r = 0, o = k(this), a = _e(t); (e = a[r++]); )
                      o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                  else
                    (void 0 !== t && "boolean" !== i) ||
                      ((e = be(this)) && J.set(this, "__className__", e),
                      this.setAttribute &&
                        this.setAttribute(
                          "class",
                          e || !1 === t
                            ? ""
                            : J.get(this, "__className__") || ""
                        ));
                });
          },
          hasClass: function (t) {
            var e,
              i,
              n = 0;
            for (e = " " + t + " "; (i = this[n++]); )
              if (1 === i.nodeType && (" " + ye(be(i)) + " ").indexOf(e) > -1)
                return !0;
            return !1;
          },
        });

        var we = /^(?:focusinfocus|focusoutblur)$/,
          ke = function (t) {
            t.stopPropagation();
          };
        k.extend(k.event, {
          trigger: function (t, e, n, r) {
            var o,
              a,
              s,
              l,
              c,
              u,
              h,
              d,
              f = [n || b],
              m = p.call(t, "type") ? t.type : t,
              g = p.call(t, "namespace") ? t.namespace.split(".") : [];
            if (
              ((a = d = s = n = n || b),
              3 !== n.nodeType &&
                8 !== n.nodeType &&
                !we.test(m + k.event.triggered) &&
                (m.indexOf(".") > -1 &&
                  ((g = m.split(".")), (m = g.shift()), g.sort()),
                (c = m.indexOf(":") < 0 && "on" + m),
                ((t = t[k.expando]
                  ? t
                  : new k.Event(m, "object" == typeof t && t)).isTrigger = r
                  ? 2
                  : 3),
                (t.namespace = g.join(".")),
                (t.rnamespace = t.namespace
                  ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)")
                  : null),
                (t.result = void 0),
                t.target || (t.target = n),
                (e = null == e ? [t] : k.makeArray(e, [t])),
                (h = k.event.special[m] || {}),
                r || !h.trigger || !1 !== h.trigger.apply(n, e)))
            ) {
              if (!r && !h.noBubble && !y(n)) {
                for (
                  l = h.delegateType || m, we.test(l + m) || (a = a.parentNode);
                  a;
                  a = a.parentNode
                )
                  f.push(a), (s = a);
                s === (n.ownerDocument || b) &&
                  f.push(s.defaultView || s.parentWindow || i);
              }
              for (o = 0; (a = f[o++]) && !t.isPropagationStopped(); )
                (d = a),
                  (t.type = o > 1 ? l : h.bindType || m),
                  (u =
                    (J.get(a, "events") || Object.create(null))[t.type] &&
                    J.get(a, "handle")) && u.apply(a, e),
                  (u = c && a[c]) &&
                    u.apply &&
                    G(a) &&
                    ((t.result = u.apply(a, e)),
                    !1 === t.result && t.preventDefault());
              return (
                (t.type = m),
                r ||
                  t.isDefaultPrevented() ||
                  (h._default && !1 !== h._default.apply(f.pop(), e)) ||
                  !G(n) ||
                  (c &&
                    v(n[m]) &&
                    !y(n) &&
                    ((s = n[c]) && (n[c] = null),
                    (k.event.triggered = m),
                    t.isPropagationStopped() && d.addEventListener(m, ke),
                    n[m](),
                    t.isPropagationStopped() && d.removeEventListener(m, ke),
                    (k.event.triggered = void 0),
                    s && (n[c] = s))),
                t.result
              );
            }
          },
          simulate: function (t, e, i) {
            var n = k.extend(new k.Event(), i, { type: t, isSimulated: !0 });
            k.event.trigger(n, null, e);
          },
        }),
          k.fn.extend({
            trigger: function (t, e) {
              return this.each(function () {
                k.event.trigger(t, e, this);
              });
            },
            triggerHandler: function (t, e) {
              var i = this[0];
              if (i) return k.event.trigger(t, e, i, !0);
            },
          }),
          (k.offset = {
            setOffset: function (t, e, i) {
              var n,
                r,
                o,
                a,
                s,
                l,
                c = k.css(t, "position"),
                u = k(t),
                h = {};
              "static" === c && (t.style.position = "relative"),
                (s = u.offset()),
                (o = k.css(t, "top")),
                (l = k.css(t, "left")),
                ("absolute" === c || "fixed" === c) &&
                (o + l).indexOf("auto") > -1
                  ? ((a = (n = u.position()).top), (r = n.left))
                  : ((a = parseFloat(o) || 0), (r = parseFloat(l) || 0)),
                v(e) && (e = e.call(t, i, k.extend({}, s))),
                null != e.top && (h.top = e.top - s.top + a),
                null != e.left && (h.left = e.left - s.left + r),
                "using" in e
                  ? e.using.call(t, h)
                  : ("number" == typeof h.top && (h.top += "px"),
                    "number" == typeof h.left && (h.left += "px"),
                    u.css(h));
            },
          });
        k.fn.extend({
          offset: function (t) {
            if (arguments.length)
              return void 0 === t
                ? this
                : this.each(function (e) {
                    k.offset.setOffset(this, t, e);
                  });
            var e,
              i,
              n = this[0];
            return n
              ? n.getClientRects().length
                ? ((e = n.getBoundingClientRect()),
                  (i = n.ownerDocument.defaultView),
                  { top: e.top + i.pageYOffset, left: e.left + i.pageXOffset })
                : { top: 0, left: 0 }
              : void 0;
          },
          position: function () {
            if (this[0]) {
              var t,
                e,
                i,
                n = this[0],
                r = { top: 0, left: 0 };
              if ("fixed" === k.css(n, "position"))
                e = n.getBoundingClientRect();
              else {
                for (
                  e = this.offset(),
                    i = n.ownerDocument,
                    t = n.offsetParent || i.documentElement;
                  t &&
                  (t === i.body || t === i.documentElement) &&
                  "static" === k.css(t, "position");

                )
                  t = t.parentNode;
                t &&
                  t !== n &&
                  1 === t.nodeType &&
                  (((r = k(t).offset()).top += k.css(t, "borderTopWidth", !0)),
                  (r.left += k.css(t, "borderLeftWidth", !0)));
              }
              return {
                top: e.top - r.top - k.css(n, "marginTop", !0),
                left: e.left - r.left - k.css(n, "marginLeft", !0),
              };
            }
          },
          offsetParent: function () {
            return this.map(function () {
              for (
                var t = this.offsetParent;
                t && "static" === k.css(t, "position");

              )
                t = t.offsetParent;
              return t || ot;
            });
          },
        }),
          k.each({ Height: "height", Width: "width" }, function (t, e) {
            k.each(
              { padding: "inner" + t, content: e, "": "outer" + t },
              function (i, n) {
                k.fn[n] = function (r, o) {
                  var a = arguments.length && (i || "boolean" != typeof r),
                    s = i || (!0 === r || !0 === o ? "margin" : "border");
                  return V(
                    this,
                    function (e, i, r) {
                      var o;
                      return y(e)
                        ? 0 === n.indexOf("outer")
                          ? e["inner" + t]
                          : e.document.documentElement["client" + t]
                        : 9 === e.nodeType
                        ? ((o = e.documentElement),
                          Math.max(
                            e.body["scroll" + t],
                            o["scroll" + t],
                            e.body["offset" + t],
                            o["offset" + t],
                            o["client" + t]
                          ))
                        : void 0 === r
                        ? k.css(e, i, s)
                        : k.style(e, i, r, s);
                    },
                    e,
                    a ? r : void 0,
                    a
                  );
                };
              }
            );
          }),
          k.fn.extend({
            bind: function (t, e, i) {
              return this.on(t, null, e, i);
            },
            unbind: function (t, e) {
              return this.off(t, null, e);
            },
            delegate: function (t, e, i, n) {
              return this.on(e, t, i, n);
            },
            undelegate: function (t, e, i) {
              return 1 === arguments.length
                ? this.off(t, "**")
                : this.off(e, t || "**", i);
            },
            hover: function (t, e) {
              return this.mouseenter(t).mouseleave(e || t);
            },
          }),
          k.each(
            "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
              " "
            ),
            function (t, e) {
              k.fn[e] = function (t, i) {
                return arguments.length > 0
                  ? this.on(e, null, t, i)
                  : this.trigger(e);
              };
            }
          );
        var Ze = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        (k.proxy = function (t, e) {
          var i, n, r;
          if (("string" == typeof e && ((i = t[e]), (e = t), (t = i)), v(t)))
            return (
              (n = s.call(arguments, 2)),
              ((r = function () {
                return t.apply(e || this, n.concat(s.call(arguments)));
              }).guid = t.guid = t.guid || k.guid++),
              r
            );
        }),
          (k.holdReady = function (t) {
            t ? k.readyWait++ : k.ready(!0);
          }),
          (k.isArray = Array.isArray),
          (k.parseJSON = JSON.parse),
          (k.nodeName = L),
          (k.isFunction = v),
          (k.isWindow = y),
          (k.camelCase = X),
          (k.type = w),
          (k.now = Date.now),
          (k.isNumeric = function (t) {
            var e = k.type(t);
            return (
              ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
            );
          }),
          (k.trim = function (t) {
            return null == t ? "" : (t + "").replace(Ze, "");
          }),
          void 0 ===
            (n = function () {
              return k;
            }.apply(e, [])) || (t.exports = n);
        var Je = i.jQuery,
          Ke = i.$;
        return (
          (k.noConflict = function (t) {
            return (
              i.$ === k && (i.$ = Ke), t && i.jQuery === k && (i.jQuery = Je), k
            );
          }),
          void 0 === r && (i.jQuery = i.$ = k),
          k
        );
      });
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, i, n) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {
      i(153),
        i(157),
        i(158),
        i(159),
        i(161),
        i(163),
        i(164),
        i(166),
        i(167),
        i(168),
        i(169),
        i(171),
        i(175),
        i(178),
        i(179),
        i(181),
        i(183),
        i(184),
        i(187),
        i(189),
        i(191),
        i(192),
        i(195),
        i(197),
        i(200),
        i(201),
        i(203),
        i(205),
        i(207),
        (t.exports = i(208));
    },
    function (t, e, i) {
      "use strict";
      i.r(e);
      var n = i(1),
        r = i.n(n);
      window.mnJquery = r;
      i(154), i(156), i(210);
      r()(document).ready(function () {
        r()("body").on("click", function (t) {
          r()('[rel="popover-focus"]').each(function () {
            r()(this).is(t.target) ||
              0 !== r()(this).has(t.target).length ||
              0 !== r()(".popover").has(t.target).length ||
              r()(this).popover("hide");
          });
        });
        var t = function () {
          document.body.clientWidth < 1250
            ? r()(".app-container").addClass(
                "closed-sidebar-mobile closed-sidebar"
              )
            : r()(".app-container").removeClass(
                "closed-sidebar-mobile closed-sidebar"
              );
        };
        r()(window).on("resize", function () {
          t();
        }),
          t();
      });
    },
    function (t, e, i) {
      /*!
       * Bootstrap v4.5.0 (https://getbootstrap.com/)
       * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
       * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
       */
      !(function (t, e, i) {
        "use strict";
        function n(t, e) {
          for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(t, n.key, n);
          }
        }
        function r(t, e, i) {
          return e && n(t.prototype, e), i && n(t, i), t;
        }
        function o(t, e, i) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: i,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = i),
            t
          );
        }
        function a(t, e) {
          var i = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              i.push.apply(i, n);
          }
          return i;
        }
        function s(t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? a(Object(i), !0).forEach(function (e) {
                  o(t, e, i[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
              : a(Object(i)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(i, e)
                  );
                });
          }
          return t;
        }
        function l(t) {
          var i = this,
            n = !1;
          return (
            e(this).one(c.TRANSITION_END, function () {
              n = !0;
            }),
            setTimeout(function () {
              n || c.triggerTransitionEnd(i);
            }, t),
            this
          );
        }
        (e =
          e && Object.prototype.hasOwnProperty.call(e, "default")
            ? e.default
            : e),
          (i =
            i && Object.prototype.hasOwnProperty.call(i, "default")
              ? i.default
              : i);
        var c = {
          TRANSITION_END: "bsTransitionEnd",
          getUID: function (t) {
            do {
              t += ~~(1e6 * Math.random());
            } while (document.getElementById(t));
            return t;
          },
          getSelectorFromElement: function (t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
              var i = t.getAttribute("href");
              e = i && "#" !== i ? i.trim() : "";
            }
            try {
              return document.querySelector(e) ? e : null;
            } catch (t) {
              return null;
            }
          },
          getTransitionDurationFromElement: function (t) {
            if (!t) return 0;
            var i = e(t).css("transition-duration"),
              n = e(t).css("transition-delay"),
              r = parseFloat(i),
              o = parseFloat(n);
            return r || o
              ? ((i = i.split(",")[0]),
                (n = n.split(",")[0]),
                1e3 * (parseFloat(i) + parseFloat(n)))
              : 0;
          },
          reflow: function (t) {
            return t.offsetHeight;
          },
          triggerTransitionEnd: function (t) {
            e(t).trigger("transitionend");
          },
          supportsTransitionEnd: function () {
            return Boolean("transitionend");
          },
          isElement: function (t) {
            return (t[0] || t).nodeType;
          },
          typeCheckConfig: function (t, e, i) {
            for (var n in i)
              if (Object.prototype.hasOwnProperty.call(i, n)) {
                var r = i[n],
                  o = e[n],
                  a =
                    o && c.isElement(o)
                      ? "element"
                      : null == (s = o)
                      ? "" + s
                      : {}.toString
                          .call(s)
                          .match(/\s([a-z]+)/i)[1]
                          .toLowerCase();
                if (!new RegExp(r).test(a))
                  throw new Error(
                    t.toUpperCase() +
                      ': Option "' +
                      n +
                      '" provided type "' +
                      a +
                      '" but expected type "' +
                      r +
                      '".'
                  );
              }
            var s;
          },
          findShadowRoot: function (t) {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
              var e = t.getRootNode();
              return e instanceof ShadowRoot ? e : null;
            }
            return t instanceof ShadowRoot
              ? t
              : t.parentNode
              ? c.findShadowRoot(t.parentNode)
              : null;
          },
          jQueryDetection: function () {
            if (void 0 === e)
              throw new TypeError(
                "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
              );
            var t = e.fn.jquery.split(" ")[0].split(".");
            if (
              (t[0] < 2 && t[1] < 9) ||
              (1 === t[0] && 9 === t[1] && t[2] < 1) ||
              t[0] >= 4
            )
              throw new Error(
                "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
              );
          },
        };
        c.jQueryDetection(),
          (e.fn.emulateTransitionEnd = l),
          (e.event.special[c.TRANSITION_END] = {
            bindType: "transitionend",
            delegateType: "transitionend",
            handle: function (t) {
              if (e(t.target).is(this))
                return t.handleObj.handler.apply(this, arguments);
            },
          });
        var u = "alert",
          h = e.fn[u],
          d = (function () {
            function t(t) {
              this._element = t;
            }
            var i = t.prototype;
            return (
              (i.close = function (t) {
                var e = this._element;
                t && (e = this._getRootElement(t)),
                  this._triggerCloseEvent(e).isDefaultPrevented() ||
                    this._removeElement(e);
              }),
              (i.dispose = function () {
                e.removeData(this._element, "bs.alert"), (this._element = null);
              }),
              (i._getRootElement = function (t) {
                var i = c.getSelectorFromElement(t),
                  n = !1;
                return (
                  i && (n = document.querySelector(i)),
                  n || (n = e(t).closest(".alert")[0]),
                  n
                );
              }),
              (i._triggerCloseEvent = function (t) {
                var i = e.Event("close.bs.alert");
                return e(t).trigger(i), i;
              }),
              (i._removeElement = function (t) {
                var i = this;
                if ((e(t).removeClass("show"), e(t).hasClass("fade"))) {
                  var n = c.getTransitionDurationFromElement(t);
                  e(t)
                    .one(c.TRANSITION_END, function (e) {
                      return i._destroyElement(t, e);
                    })
                    .emulateTransitionEnd(n);
                } else this._destroyElement(t);
              }),
              (i._destroyElement = function (t) {
                e(t).detach().trigger("closed.bs.alert").remove();
              }),
              (t._jQueryInterface = function (i) {
                return this.each(function () {
                  var n = e(this),
                    r = n.data("bs.alert");
                  r || ((r = new t(this)), n.data("bs.alert", r)),
                    "close" === i && r[i](this);
                });
              }),
              (t._handleDismiss = function (t) {
                return function (e) {
                  e && e.preventDefault(), t.close(this);
                };
              }),
              r(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.5.0";
                  },
                },
              ]),
              t
            );
          })();

        var p = e.fn.button,
          f = (function () {
            function t(t) {
              this._element = t;
            }
            var i = t.prototype;
            return (
              (i.toggle = function () {
                var t = !0,
                  i = !0,
                  n = e(this._element).closest('[data-toggle="buttons"]')[0];
                if (n) {
                  var r = this._element.querySelector(
                    'input:not([type="hidden"])'
                  );
                  if (r) {
                    if ("radio" === r.type)
                      if (
                        r.checked &&
                        this._element.classList.contains("active")
                      )
                        t = !1;
                      else {
                        var o = n.querySelector(".active");
                        o && e(o).removeClass("active");
                      }
                    t &&
                      (("checkbox" !== r.type && "radio" !== r.type) ||
                        (r.checked = !this._element.classList.contains(
                          "active"
                        )),
                      e(r).trigger("change")),
                      r.focus(),
                      (i = !1);
                  }
                }
                this._element.hasAttribute("disabled") ||
                  this._element.classList.contains("disabled") ||
                  (i &&
                    this._element.setAttribute(
                      "aria-pressed",
                      !this._element.classList.contains("active")
                    ),
                  t && e(this._element).toggleClass("active"));
              }),
              (i.dispose = function () {
                e.removeData(this._element, "bs.button"),
                  (this._element = null);
              }),
              (t._jQueryInterface = function (i) {
                return this.each(function () {
                  var n = e(this).data("bs.button");
                  n || ((n = new t(this)), e(this).data("bs.button", n)),
                    "toggle" === i && n[i]();
                });
              }),
              r(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.5.0";
                  },
                },
              ]),
              t
            );
          })();

        var m = "carousel",
          g = ".bs.carousel",
          v = e.fn[m],
          y = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0,
          },
          b = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean",
          },
          _ = { TOUCH: "touch", PEN: "pen" },
          x = (function () {
            function t(t, e) {
              (this._items = null),
                (this._interval = null),
                (this._activeElement = null),
                (this._isPaused = !1),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this.touchStartX = 0),
                (this.touchDeltaX = 0),
                (this._config = this._getConfig(e)),
                (this._element = t),
                (this._indicatorsElement = this._element.querySelector(
                  ".carousel-indicators"
                )),
                (this._touchSupported =
                  "ontouchstart" in document.documentElement ||
                  navigator.maxTouchPoints > 0),
                (this._pointerEvent = Boolean(
                  window.PointerEvent || window.MSPointerEvent
                )),
                this._addEventListeners();
            }
            var i = t.prototype;
            return (
              (i.next = function () {
                this._isSliding || this._slide("next");
              }),
              (i.nextWhenVisible = function () {
                !document.hidden &&
                  e(this._element).is(":visible") &&
                  "hidden" !== e(this._element).css("visibility") &&
                  this.next();
              }),
              (i.prev = function () {
                this._isSliding || this._slide("prev");
              }),
              (i.pause = function (t) {
                t || (this._isPaused = !0),
                  this._element.querySelector(
                    ".carousel-item-next, .carousel-item-prev"
                  ) && (c.triggerTransitionEnd(this._element), this.cycle(!0)),
                  clearInterval(this._interval),
                  (this._interval = null);
              }),
              (i.cycle = function (t) {
                t || (this._isPaused = !1),
                  this._interval &&
                    (clearInterval(this._interval), (this._interval = null)),
                  this._config.interval &&
                    !this._isPaused &&
                    (this._interval = setInterval(
                      (document.visibilityState
                        ? this.nextWhenVisible
                        : this.next
                      ).bind(this),
                      this._config.interval
                    ));
              }),
              (i.to = function (t) {
                var i = this;
                this._activeElement = this._element.querySelector(
                  ".active.carousel-item"
                );
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                  if (this._isSliding)
                    e(this._element).one("slid.bs.carousel", function () {
                      return i.to(t);
                    });
                  else {
                    if (n === t) return this.pause(), void this.cycle();
                    var r = t > n ? "next" : "prev";
                    this._slide(r, this._items[t]);
                  }
              }),
              (i.dispose = function () {
                e(this._element).off(g),
                  e.removeData(this._element, "bs.carousel"),
                  (this._items = null),
                  (this._config = null),
                  (this._element = null),
                  (this._interval = null),
                  (this._isPaused = null),
                  (this._isSliding = null),
                  (this._activeElement = null),
                  (this._indicatorsElement = null);
              }),
              (i._getConfig = function (t) {
                return (t = s(s({}, y), t)), c.typeCheckConfig(m, t, b), t;
              }),
              (i._handleSwipe = function () {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                  var e = t / this.touchDeltaX;
                  (this.touchDeltaX = 0),
                    e > 0 && this.prev(),
                    e < 0 && this.next();
                }
              }),
              (i._addEventListeners = function () {
                var t = this;
                this._config.keyboard &&
                  e(this._element).on("keydown.bs.carousel", function (e) {
                    return t._keydown(e);
                  }),
                  "hover" === this._config.pause &&
                    e(this._element)
                      .on("mouseenter.bs.carousel", function (e) {
                        return t.pause(e);
                      })
                      .on("mouseleave.bs.carousel", function (e) {
                        return t.cycle(e);
                      }),
                  this._config.touch && this._addTouchEventListeners();
              }),
              (i._addTouchEventListeners = function () {
                var t = this;
                if (this._touchSupported) {
                  var i = function (e) {
                      t._pointerEvent &&
                      _[e.originalEvent.pointerType.toUpperCase()]
                        ? (t.touchStartX = e.originalEvent.clientX)
                        : t._pointerEvent ||
                          (t.touchStartX = e.originalEvent.touches[0].clientX);
                    },
                    n = function (e) {
                      t._pointerEvent &&
                        _[e.originalEvent.pointerType.toUpperCase()] &&
                        (t.touchDeltaX =
                          e.originalEvent.clientX - t.touchStartX),
                        t._handleSwipe(),
                        "hover" === t._config.pause &&
                          (t.pause(),
                          t.touchTimeout && clearTimeout(t.touchTimeout),
                          (t.touchTimeout = setTimeout(function (e) {
                            return t.cycle(e);
                          }, 500 + t._config.interval)));
                    };
                  e(this._element.querySelectorAll(".carousel-item img")).on(
                    "dragstart.bs.carousel",
                    function (t) {
                      return t.preventDefault();
                    }
                  ),
                    this._pointerEvent
                      ? (e(this._element).on(
                          "pointerdown.bs.carousel",
                          function (t) {
                            return i(t);
                          }
                        ),
                        e(this._element).on("pointerup.bs.carousel", function (
                          t
                        ) {
                          return n(t);
                        }),
                        this._element.classList.add("pointer-event"))
                      : (e(this._element).on(
                          "touchstart.bs.carousel",
                          function (t) {
                            return i(t);
                          }
                        ),
                        e(this._element).on("touchmove.bs.carousel", function (
                          e
                        ) {
                          return (function (e) {
                            e.originalEvent.touches &&
                            e.originalEvent.touches.length > 1
                              ? (t.touchDeltaX = 0)
                              : (t.touchDeltaX =
                                  e.originalEvent.touches[0].clientX -
                                  t.touchStartX);
                          })(e);
                        }),
                        e(this._element).on("touchend.bs.carousel", function (
                          t
                        ) {
                          return n(t);
                        }));
                }
              }),
              (i._keydown = function (t) {
                if (!/input|textarea/i.test(t.target.tagName))
                  switch (t.which) {
                    case 37:
                      t.preventDefault(), this.prev();
                      break;
                    case 39:
                      t.preventDefault(), this.next();
                  }
              }),
              (i._getItemIndex = function (t) {
                return (
                  (this._items =
                    t && t.parentNode
                      ? [].slice.call(
                          t.parentNode.querySelectorAll(".carousel-item")
                        )
                      : []),
                  this._items.indexOf(t)
                );
              }),
              (i._getItemByDirection = function (t, e) {
                var i = "next" === t,
                  n = "prev" === t,
                  r = this._getItemIndex(e),
                  o = this._items.length - 1;
                if (((n && 0 === r) || (i && r === o)) && !this._config.wrap)
                  return e;
                var a = (r + ("prev" === t ? -1 : 1)) % this._items.length;
                return -1 === a
                  ? this._items[this._items.length - 1]
                  : this._items[a];
              }),
              (i._triggerSlideEvent = function (t, i) {
                var n = this._getItemIndex(t),
                  r = this._getItemIndex(
                    this._element.querySelector(".active.carousel-item")
                  ),
                  o = e.Event("slide.bs.carousel", {
                    relatedTarget: t,
                    direction: i,
                    from: r,
                    to: n,
                  });
                return e(this._element).trigger(o), o;
              }),
              (i._setActiveIndicatorElement = function (t) {
                if (this._indicatorsElement) {
                  var i = [].slice.call(
                    this._indicatorsElement.querySelectorAll(".active")
                  );
                  e(i).removeClass("active");
                  var n = this._indicatorsElement.children[
                    this._getItemIndex(t)
                  ];
                  n && e(n).addClass("active");
                }
              }),
              (i._slide = function (t, i) {
                var n,
                  r,
                  o,
                  a = this,
                  s = this._element.querySelector(".active.carousel-item"),
                  l = this._getItemIndex(s),
                  u = i || (s && this._getItemByDirection(t, s)),
                  h = this._getItemIndex(u),
                  d = Boolean(this._interval);
                if (
                  ("next" === t
                    ? ((n = "carousel-item-left"),
                      (r = "carousel-item-next"),
                      (o = "left"))
                    : ((n = "carousel-item-right"),
                      (r = "carousel-item-prev"),
                      (o = "right")),
                  u && e(u).hasClass("active"))
                )
                  this._isSliding = !1;
                else if (
                  !this._triggerSlideEvent(u, o).isDefaultPrevented() &&
                  s &&
                  u
                ) {
                  (this._isSliding = !0),
                    d && this.pause(),
                    this._setActiveIndicatorElement(u);
                  var p = e.Event("slid.bs.carousel", {
                    relatedTarget: u,
                    direction: o,
                    from: l,
                    to: h,
                  });
                  if (e(this._element).hasClass("slide")) {
                    e(u).addClass(r),
                      c.reflow(u),
                      e(s).addClass(n),
                      e(u).addClass(n);
                    var f = parseInt(u.getAttribute("data-interval"), 10);
                    f
                      ? ((this._config.defaultInterval =
                          this._config.defaultInterval ||
                          this._config.interval),
                        (this._config.interval = f))
                      : (this._config.interval =
                          this._config.defaultInterval ||
                          this._config.interval);
                    var m = c.getTransitionDurationFromElement(s);
                    e(s)
                      .one(c.TRANSITION_END, function () {
                        e(u)
                          .removeClass(n + " " + r)
                          .addClass("active"),
                          e(s).removeClass("active " + r + " " + n),
                          (a._isSliding = !1),
                          setTimeout(function () {
                            return e(a._element).trigger(p);
                          }, 0);
                      })
                      .emulateTransitionEnd(m);
                  } else
                    e(s).removeClass("active"),
                      e(u).addClass("active"),
                      (this._isSliding = !1),
                      e(this._element).trigger(p);
                  d && this.cycle();
                }
              }),
              (t._jQueryInterface = function (i) {
                return this.each(function () {
                  var n = e(this).data("bs.carousel"),
                    r = s(s({}, y), e(this).data());
                  "object" == typeof i && (r = s(s({}, r), i));
                  var o = "string" == typeof i ? i : r.slide;
                  if (
                    (n ||
                      ((n = new t(this, r)), e(this).data("bs.carousel", n)),
                    "number" == typeof i)
                  )
                    n.to(i);
                  else if ("string" == typeof o) {
                    if (void 0 === n[o])
                      throw new TypeError('No method named "' + o + '"');
                    n[o]();
                  } else r.interval && r.ride && (n.pause(), n.cycle());
                });
              }),
              (t._dataApiClickHandler = function (i) {
                var n = c.getSelectorFromElement(this);
                if (n) {
                  var r = e(n)[0];
                  if (r && e(r).hasClass("carousel")) {
                    var o = s(s({}, e(r).data()), e(this).data()),
                      a = this.getAttribute("data-slide-to");
                    a && (o.interval = !1),
                      t._jQueryInterface.call(e(r), o),
                      a && e(r).data("bs.carousel").to(a),
                      i.preventDefault();
                  }
                }
              }),
              r(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.5.0";
                  },
                },
                {
                  key: "Default",
                  get: function () {
                    return y;
                  },
                },
              ]),
              t
            );
          })();

        var w = "collapse",
          k = e.fn[w],
          S = { toggle: !0, parent: "" },
          M = { toggle: "boolean", parent: "(string|element)" },
          T = (function () {
            function t(t, e) {
              (this._isTransitioning = !1),
                (this._element = t),
                (this._config = this._getConfig(e)),
                (this._triggerArray = [].slice.call(
                  document.querySelectorAll(
                    '[data-toggle="collapse"][href="#' +
                      t.id +
                      '"],[data-toggle="collapse"][data-target="#' +
                      t.id +
                      '"]'
                  )
                ));
              for (
                var i = [].slice.call(
                    document.querySelectorAll('[data-toggle="collapse"]')
                  ),
                  n = 0,
                  r = i.length;
                n < r;
                n++
              ) {
                var o = i[n],
                  a = c.getSelectorFromElement(o),
                  s = [].slice
                    .call(document.querySelectorAll(a))
                    .filter(function (e) {
                      return e === t;
                    });
                null !== a &&
                  s.length > 0 &&
                  ((this._selector = a), this._triggerArray.push(o));
              }
              (this._parent = this._config.parent ? this._getParent() : null),
                this._config.parent ||
                  this._addAriaAndCollapsedClass(
                    this._element,
                    this._triggerArray
                  ),
                this._config.toggle && this.toggle();
            }
            var i = t.prototype;
            return (
              (i.toggle = function () {
                e(this._element).hasClass("show") ? this.hide() : this.show();
              }),
              (i.show = function () {
                var i,
                  n,
                  r = this;
                if (
                  !(
                    this._isTransitioning ||
                    e(this._element).hasClass("show") ||
                    (this._parent &&
                      0 ===
                        (i = [].slice
                          .call(
                            this._parent.querySelectorAll(".show, .collapsing")
                          )
                          .filter(function (t) {
                            return "string" == typeof r._config.parent
                              ? t.getAttribute("data-parent") ===
                                  r._config.parent
                              : t.classList.contains("collapse");
                          })).length &&
                      (i = null),
                    i &&
                      (n = e(i).not(this._selector).data("bs.collapse")) &&
                      n._isTransitioning)
                  )
                ) {
                  var o = e.Event("show.bs.collapse");
                  if ((e(this._element).trigger(o), !o.isDefaultPrevented())) {
                    i &&
                      (t._jQueryInterface.call(
                        e(i).not(this._selector),
                        "hide"
                      ),
                      n || e(i).data("bs.collapse", null));
                    var a = this._getDimension();
                    e(this._element)
                      .removeClass("collapse")
                      .addClass("collapsing"),
                      (this._element.style[a] = 0),
                      this._triggerArray.length &&
                        e(this._triggerArray)
                          .removeClass("collapsed")
                          .attr("aria-expanded", !0),
                      this.setTransitioning(!0);
                    var s = "scroll" + (a[0].toUpperCase() + a.slice(1)),
                      l = c.getTransitionDurationFromElement(this._element);
                    e(this._element)
                      .one(c.TRANSITION_END, function () {
                        e(r._element)
                          .removeClass("collapsing")
                          .addClass("collapse show"),
                          (r._element.style[a] = ""),
                          r.setTransitioning(!1),
                          e(r._element).trigger("shown.bs.collapse");
                      })
                      .emulateTransitionEnd(l),
                      (this._element.style[a] = this._element[s] + "px");
                  }
                }
              }),
              (i.hide = function () {
                var t = this;
                if (
                  !this._isTransitioning &&
                  e(this._element).hasClass("show")
                ) {
                  var i = e.Event("hide.bs.collapse");
                  if ((e(this._element).trigger(i), !i.isDefaultPrevented())) {
                    var n = this._getDimension();
                    (this._element.style[n] =
                      this._element.getBoundingClientRect()[n] + "px"),
                      c.reflow(this._element),
                      e(this._element)
                        .addClass("collapsing")
                        .removeClass("collapse show");
                    var r = this._triggerArray.length;
                    if (r > 0)
                      for (var o = 0; o < r; o++) {
                        var a = this._triggerArray[o],
                          s = c.getSelectorFromElement(a);
                        null !== s &&
                          (e(
                            [].slice.call(document.querySelectorAll(s))
                          ).hasClass("show") ||
                            e(a)
                              .addClass("collapsed")
                              .attr("aria-expanded", !1));
                      }
                    this.setTransitioning(!0), (this._element.style[n] = "");
                    var l = c.getTransitionDurationFromElement(this._element);
                    e(this._element)
                      .one(c.TRANSITION_END, function () {
                        t.setTransitioning(!1),
                          e(t._element)
                            .removeClass("collapsing")
                            .addClass("collapse")
                            .trigger("hidden.bs.collapse");
                      })
                      .emulateTransitionEnd(l);
                  }
                }
              }),
              (i.setTransitioning = function (t) {
                this._isTransitioning = t;
              }),
              (i.dispose = function () {
                e.removeData(this._element, "bs.collapse"),
                  (this._config = null),
                  (this._parent = null),
                  (this._element = null),
                  (this._triggerArray = null),
                  (this._isTransitioning = null);
              }),
              (i._getConfig = function (t) {
                return (
                  ((t = s(s({}, S), t)).toggle = Boolean(t.toggle)),
                  c.typeCheckConfig(w, t, M),
                  t
                );
              }),
              (i._getDimension = function () {
                return e(this._element).hasClass("width") ? "width" : "height";
              }),
              (i._getParent = function () {
                var i,
                  n = this;
                c.isElement(this._config.parent)
                  ? ((i = this._config.parent),
                    void 0 !== this._config.parent.jquery &&
                      (i = this._config.parent[0]))
                  : (i = document.querySelector(this._config.parent));
                var r =
                    '[data-toggle="collapse"][data-parent="' +
                    this._config.parent +
                    '"]',
                  o = [].slice.call(i.querySelectorAll(r));
                return (
                  e(o).each(function (e, i) {
                    n._addAriaAndCollapsedClass(t._getTargetFromElement(i), [
                      i,
                    ]);
                  }),
                  i
                );
              }),
              (i._addAriaAndCollapsedClass = function (t, i) {
                var n = e(t).hasClass("show");
                i.length &&
                  e(i).toggleClass("collapsed", !n).attr("aria-expanded", n);
              }),
              (t._getTargetFromElement = function (t) {
                var e = c.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null;
              }),
              (t._jQueryInterface = function (i) {
                return this.each(function () {
                  var n = e(this),
                    r = n.data("bs.collapse"),
                    o = s(
                      s(s({}, S), n.data()),
                      "object" == typeof i && i ? i : {}
                    );
                  if (
                    (!r &&
                      o.toggle &&
                      "string" == typeof i &&
                      /show|hide/.test(i) &&
                      (o.toggle = !1),
                    r || ((r = new t(this, o)), n.data("bs.collapse", r)),
                    "string" == typeof i)
                  ) {
                    if (void 0 === r[i])
                      throw new TypeError('No method named "' + i + '"');
                    r[i]();
                  }
                });
              }),
              r(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.5.0";
                  },
                },
                {
                  key: "Default",
                  get: function () {
                    return S;
                  },
                },
              ]),
              t
            );
          })();
        e(document).on(
          "click.bs.collapse.data-api",
          '[data-toggle="collapse"]',
          function (t) {
            "A" === t.currentTarget.tagName && t.preventDefault();
            var i = e(this),
              n = c.getSelectorFromElement(this),
              r = [].slice.call(document.querySelectorAll(n));
            e(r).each(function () {
              var t = e(this),
                n = t.data("bs.collapse") ? "toggle" : i.data();
              T._jQueryInterface.call(t, n);
            });
          }
        ),
          (e.fn[w] = T._jQueryInterface),
          (e.fn[w].Constructor = T),
          (e.fn[w].noConflict = function () {
            return (e.fn[w] = k), T._jQueryInterface;
          });
        var C = "dropdown",
          D = e.fn[C],
          L = new RegExp("38|40|27"),
          E = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
          },
          A = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)",
          },
          P = (function () {
            function t(t, e) {
              (this._element = t),
                (this._popper = null),
                (this._config = this._getConfig(e)),
                (this._menu = this._getMenuElement()),
                (this._inNavbar = this._detectNavbar()),
                this._addEventListeners();
            }
            var n = t.prototype;
            return (
              (n.toggle = function () {
                if (
                  !this._element.disabled &&
                  !e(this._element).hasClass("disabled")
                ) {
                  var i = e(this._menu).hasClass("show");
                  t._clearMenus(), i || this.show(!0);
                }
              }),
              (n.show = function (n) {
                if (
                  (void 0 === n && (n = !1),
                  !(
                    this._element.disabled ||
                    e(this._element).hasClass("disabled") ||
                    e(this._menu).hasClass("show")
                  ))
                ) {
                  var r = { relatedTarget: this._element },
                    o = e.Event("show.bs.dropdown", r),
                    a = t._getParentFromElement(this._element);
                  if ((e(a).trigger(o), !o.isDefaultPrevented())) {
                    if (!this._inNavbar && n) {
                      if (void 0 === i)
                        throw new TypeError(
                          "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                        );
                      var s = this._element;
                      "parent" === this._config.reference
                        ? (s = a)
                        : c.isElement(this._config.reference) &&
                          ((s = this._config.reference),
                          void 0 !== this._config.reference.jquery &&
                            (s = this._config.reference[0])),
                        "scrollParent" !== this._config.boundary &&
                          e(a).addClass("position-static"),
                        (this._popper = new i(
                          s,
                          this._menu,
                          this._getPopperConfig()
                        ));
                    }
                    "ontouchstart" in document.documentElement &&
                      0 === e(a).closest(".navbar-nav").length &&
                      e(document.body).children().on("mouseover", null, e.noop),
                      this._element.focus(),
                      this._element.setAttribute("aria-expanded", !0),
                      e(this._menu).toggleClass("show"),
                      e(a)
                        .toggleClass("show")
                        .trigger(e.Event("shown.bs.dropdown", r));
                  }
                }
              }),
              (n.hide = function () {
                if (
                  !this._element.disabled &&
                  !e(this._element).hasClass("disabled") &&
                  e(this._menu).hasClass("show")
                ) {
                  var i = { relatedTarget: this._element },
                    n = e.Event("hide.bs.dropdown", i),
                    r = t._getParentFromElement(this._element);
                  e(r).trigger(n),
                    n.isDefaultPrevented() ||
                      (this._popper && this._popper.destroy(),
                      e(this._menu).toggleClass("show"),
                      e(r)
                        .toggleClass("show")
                        .trigger(e.Event("hidden.bs.dropdown", i)));
                }
              }),
              (n.dispose = function () {
                e.removeData(this._element, "bs.dropdown"),
                  e(this._element).off(".bs.dropdown"),
                  (this._element = null),
                  (this._menu = null),
                  null !== this._popper &&
                    (this._popper.destroy(), (this._popper = null));
              }),
              (n.update = function () {
                (this._inNavbar = this._detectNavbar()),
                  null !== this._popper && this._popper.scheduleUpdate();
              }),
              (n._addEventListeners = function () {
                var t = this;
                e(this._element).on("click.bs.dropdown", function (e) {
                  e.preventDefault(), e.stopPropagation(), t.toggle();
                });
              }),
              (n._getConfig = function (t) {
                return (
                  (t = s(
                    s(s({}, this.constructor.Default), e(this._element).data()),
                    t
                  )),
                  c.typeCheckConfig(C, t, this.constructor.DefaultType),
                  t
                );
              }),
              (n._getMenuElement = function () {
                if (!this._menu) {
                  var e = t._getParentFromElement(this._element);
                  e && (this._menu = e.querySelector(".dropdown-menu"));
                }
                return this._menu;
              }),
              (n._getPlacement = function () {
                var t = e(this._element.parentNode),
                  i = "bottom-start";
                return (
                  t.hasClass("dropup")
                    ? (i = e(this._menu).hasClass("dropdown-menu-right")
                        ? "top-end"
                        : "top-start")
                    : t.hasClass("dropright")
                    ? (i = "right-start")
                    : t.hasClass("dropleft")
                    ? (i = "left-start")
                    : e(this._menu).hasClass("dropdown-menu-right") &&
                      (i = "bottom-end"),
                  i
                );
              }),
              (n._detectNavbar = function () {
                return e(this._element).closest(".navbar").length > 0;
              }),
              (n._getOffset = function () {
                var t = this,
                  e = {};
                return (
                  "function" == typeof this._config.offset
                    ? (e.fn = function (e) {
                        return (
                          (e.offsets = s(
                            s({}, e.offsets),
                            t._config.offset(e.offsets, t._element) || {}
                          )),
                          e
                        );
                      })
                    : (e.offset = this._config.offset),
                  e
                );
              }),
              (n._getPopperConfig = function () {
                var t = {
                  placement: this._getPlacement(),
                  modifiers: {
                    offset: this._getOffset(),
                    flip: { enabled: this._config.flip },
                    preventOverflow: {
                      boundariesElement: this._config.boundary,
                    },
                  },
                };
                return (
                  "static" === this._config.display &&
                    (t.modifiers.applyStyle = { enabled: !1 }),
                  s(s({}, t), this._config.popperConfig)
                );
              }),
              (t._jQueryInterface = function (i) {
                return this.each(function () {
                  var n = e(this).data("bs.dropdown");
                  if (
                    (n ||
                      ((n = new t(this, "object" == typeof i ? i : null)),
                      e(this).data("bs.dropdown", n)),
                    "string" == typeof i)
                  ) {
                    if (void 0 === n[i])
                      throw new TypeError('No method named "' + i + '"');
                    n[i]();
                  }
                });
              }),
              (t._clearMenus = function (i) {
                if (
                  !i ||
                  (3 !== i.which && ("keyup" !== i.type || 9 === i.which))
                )
                  for (
                    var n = [].slice.call(
                        document.querySelectorAll('[data-toggle="dropdown"]')
                      ),
                      r = 0,
                      o = n.length;
                    r < o;
                    r++
                  ) {
                    var a = t._getParentFromElement(n[r]),
                      s = e(n[r]).data("bs.dropdown"),
                      l = { relatedTarget: n[r] };
                    if ((i && "click" === i.type && (l.clickEvent = i), s)) {
                      var c = s._menu;
                      if (
                        e(a).hasClass("show") &&
                        !(
                          i &&
                          (("click" === i.type &&
                            /input|textarea/i.test(i.target.tagName)) ||
                            ("keyup" === i.type && 9 === i.which)) &&
                          e.contains(a, i.target)
                        )
                      ) {
                        var u = e.Event("hide.bs.dropdown", l);
                        e(a).trigger(u),
                          u.isDefaultPrevented() ||
                            ("ontouchstart" in document.documentElement &&
                              e(document.body)
                                .children()
                                .off("mouseover", null, e.noop),
                            n[r].setAttribute("aria-expanded", "false"),
                            s._popper && s._popper.destroy(),
                            e(c).removeClass("show"),
                            e(a)
                              .removeClass("show")
                              .trigger(e.Event("hidden.bs.dropdown", l)));
                      }
                    }
                  }
              }),
              (t._getParentFromElement = function (t) {
                var e,
                  i = c.getSelectorFromElement(t);
                return i && (e = document.querySelector(i)), e || t.parentNode;
              }),
              (t._dataApiKeydownHandler = function (i) {
                if (
                  !(/input|textarea/i.test(i.target.tagName)
                    ? 32 === i.which ||
                      (27 !== i.which &&
                        ((40 !== i.which && 38 !== i.which) ||
                          e(i.target).closest(".dropdown-menu").length))
                    : !L.test(i.which)) &&
                  !this.disabled &&
                  !e(this).hasClass("disabled")
                ) {
                  var n = t._getParentFromElement(this),
                    r = e(n).hasClass("show");
                  if (r || 27 !== i.which) {
                    if (
                      (i.preventDefault(),
                      i.stopPropagation(),
                      !r || (r && (27 === i.which || 32 === i.which)))
                    )
                      return (
                        27 === i.which &&
                          e(
                            n.querySelector('[data-toggle="dropdown"]')
                          ).trigger("focus"),
                        void e(this).trigger("click")
                      );
                    var o = [].slice
                      .call(
                        n.querySelectorAll(
                          ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                        )
                      )
                      .filter(function (t) {
                        return e(t).is(":visible");
                      });
                    if (0 !== o.length) {
                      var a = o.indexOf(i.target);
                      38 === i.which && a > 0 && a--,
                        40 === i.which && a < o.length - 1 && a++,
                        a < 0 && (a = 0),
                        o[a].focus();
                    }
                  }
                }
              }),
              r(t, null, [
                {
                  key: "VERSION",
                  get: function () {
                    return "4.5.0";
                  },
                },
                {
                  key: "Default",
                  get: function () {
                    return E;
                  },
                },
                {
                  key: "DefaultType",
                  get: function () {
                    return A;
                  },
                },
              ]),
              t
            );
          })();
        e(document)
          .on(
            "keydown.bs.dropdown.data-api",
            '[data-toggle="dropdown"]',
            P._dataApiKeydownHandler
          )
          .on(
            "keydown.bs.dropdown.data-api",
            ".dropdown-menu",
            P._dataApiKeydownHandler
          )
          .on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", (i) => {
            P._clearMenus(i);
          })
          .on(
            "click.bs.dropdown.data-api",
            '[data-toggle="dropdown"]',
            function (t) {
              t.preventDefault(),
                t.stopPropagation(),
                P._jQueryInterface.call(e(this), "toggle");
            }
          )
          .on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
            t.stopPropagation();
          }),
          (e.fn[C] = P._jQueryInterface),
          (e.fn[C].Constructor = P),
          (e.fn[C].noConflict = function () {
            return (e.fn[C] = D), P._jQueryInterface;
          });
      })(e, i(1), i(155));
    },
    //các sự kiện nút option
    function (t, e, i) {
      "use strict";
      i.r(e),
        function (t) {
          /**!
           * @fileOverview Kickass library to create and place poppers near their reference elements.
           * @version 1.16.1
           * @license
           * Copyright (c) 2016 Federico Zivolo and contributors
           *
           * Permission is hereby granted, free of charge, to any person obtaining a copy
           * of this software and associated documentation files (the "Software"), to deal
           * in the Software without restriction, including without limitation the rights
           * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
           * copies of the Software, and to permit persons to whom the Software is
           * furnished to do so, subject to the following conditions:
           *
           * The above copyright notice and this permission notice shall be included in all
           * copies or substantial portions of the Software.
           *
           * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
           * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
           * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
           * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
           * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
           * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
           * SOFTWARE.
           */
          var i =
              "undefined" != typeof window &&
              "undefined" != typeof document &&
              "undefined" != typeof navigator,
            n = (function () {
              for (
                var t = ["Edge", "Trident", "Firefox"], e = 0;
                e < t.length;
                e += 1
              )
                if (i && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
              return 0;
            })();
          var r =
            i && window.Promise
              ? function (t) {
                  var e = !1;
                  return function () {
                    e ||
                      ((e = !0),
                      window.Promise.resolve().then(function () {
                        (e = !1), t();
                      }));
                  };
                }
              : function (t) {
                  var e = !1;
                  return function () {
                    e ||
                      ((e = !0),
                      setTimeout(function () {
                        (e = !1), t();
                      }, n));
                  };
                };
          function o(t) {
            return t && "[object Function]" === {}.toString.call(t);
          }
          function a(t, e) {
            if (1 !== t.nodeType) return [];
            var i = t.ownerDocument.defaultView.getComputedStyle(t, null);
            return e ? i[e] : i;
          }
          function s(t) {
            return "HTML" === t.nodeName ? t : t.parentNode || t.host;
          }
          function l(t) {
            if (!t) return document.body;
            switch (t.nodeName) {
              case "HTML":
              case "BODY":
                return t.ownerDocument.body;
              case "#document":
                return t.body;
            }
            var e = a(t),
              i = e.overflow,
              n = e.overflowX,
              r = e.overflowY;
            return /(auto|scroll|overlay)/.test(i + r + n) ? t : l(s(t));
          }
          function c(t) {
            return t && t.referenceNode ? t.referenceNode : t;
          }
          var u =
              i && !(!window.MSInputMethodContext || !document.documentMode),
            h = i && /MSIE 10/.test(navigator.userAgent);
          function d(t) {
            return 11 === t ? u : 10 === t ? h : u || h;
          }
          function p(t) {
            if (!t) return document.documentElement;
            for (
              var e = d(10) ? document.body : null, i = t.offsetParent || null;
              i === e && t.nextElementSibling;

            )
              i = (t = t.nextElementSibling).offsetParent;
            var n = i && i.nodeName;
            return n && "BODY" !== n && "HTML" !== n
              ? -1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) &&
                "static" === a(i, "position")
                ? p(i)
                : i
              : t
              ? t.ownerDocument.documentElement
              : document.documentElement;
          }
          function f(t) {
            return null !== t.parentNode ? f(t.parentNode) : t;
          }
          function m(t, e) {
            if (!(t && t.nodeType && e && e.nodeType))
              return document.documentElement;
            var i =
                t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
              n = i ? t : e,
              r = i ? e : t,
              o = document.createRange();
            o.setStart(n, 0), o.setEnd(r, 0);
            var a,
              s,
              l = o.commonAncestorContainer;
            if ((t !== l && e !== l) || n.contains(r))
              return "BODY" === (s = (a = l).nodeName) ||
                ("HTML" !== s && p(a.firstElementChild) !== a)
                ? p(l)
                : l;
            var c = f(t);
            return c.host ? m(c.host, e) : m(t, f(e).host);
          }
          function g(t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "top",
              i = "top" === e ? "scrollTop" : "scrollLeft",
              n = t.nodeName;
            if ("BODY" === n || "HTML" === n) {
              var r = t.ownerDocument.documentElement,
                o = t.ownerDocument.scrollingElement || r;
              return o[i];
            }
            return t[i];
          }
          function v(t, e) {
            var i =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              n = g(e, "top"),
              r = g(e, "left"),
              o = i ? -1 : 1;
            return (
              (t.top += n * o),
              (t.bottom += n * o),
              (t.left += r * o),
              (t.right += r * o),
              t
            );
          }
          function y(t, e) {
            var i = "x" === e ? "Left" : "Top",
              n = "Left" === i ? "Right" : "Bottom";
            return (
              parseFloat(t["border" + i + "Width"]) +
              parseFloat(t["border" + n + "Width"])
            );
          }
          function b(t, e, i, n) {
            return Math.max(
              e["offset" + t],
              e["scroll" + t],
              i["client" + t],
              i["offset" + t],
              i["scroll" + t],
              d(10)
                ? parseInt(i["offset" + t]) +
                    parseInt(n["margin" + ("Height" === t ? "Top" : "Left")]) +
                    parseInt(
                      n["margin" + ("Height" === t ? "Bottom" : "Right")]
                    )
                : 0
            );
          }
          function _(t) {
            var e = t.body,
              i = t.documentElement,
              n = d(10) && getComputedStyle(i);
            return { height: b("Height", e, i, n), width: b("Width", e, i, n) };
          }
          var x = function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            },
            w = (function () {
              function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                  var n = e[i];
                  (n.enumerable = n.enumerable || !1),
                    (n.configurable = !0),
                    "value" in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n);
                }
              }
              return function (e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e;
              };
            })(),
            k = function (t, e, i) {
              return (
                e in t
                  ? Object.defineProperty(t, e, {
                      value: i,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (t[e] = i),
                t
              );
            },
            S =
              Object.assign ||
              function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var i = arguments[e];
                  for (var n in i)
                    Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
                }
                return t;
              };
          function M(t) {
            return S({}, t, {
              right: t.left + t.width,
              bottom: t.top + t.height,
            });
          }
          function T(t) {
            var e = {};
            try {
              if (d(10)) {
                e = t.getBoundingClientRect();
                var i = g(t, "top"),
                  n = g(t, "left");
                (e.top += i), (e.left += n), (e.bottom += i), (e.right += n);
              } else e = t.getBoundingClientRect();
            } catch (t) {}
            var r = {
                left: e.left,
                top: e.top,
                width: e.right - e.left,
                height: e.bottom - e.top,
              },
              o = "HTML" === t.nodeName ? _(t.ownerDocument) : {},
              s = o.width || t.clientWidth || r.width,
              l = o.height || t.clientHeight || r.height,
              c = t.offsetWidth - s,
              u = t.offsetHeight - l;
            if (c || u) {
              var h = a(t);
              (c -= y(h, "x")),
                (u -= y(h, "y")),
                (r.width -= c),
                (r.height -= u);
            }
            return M(r);
          }
          function C(t, e) {
            var i =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              n = d(10),
              r = "HTML" === e.nodeName,
              o = T(t),
              s = T(e),
              c = l(t),
              u = a(e),
              h = parseFloat(u.borderTopWidth),
              p = parseFloat(u.borderLeftWidth);
            i &&
              r &&
              ((s.top = Math.max(s.top, 0)), (s.left = Math.max(s.left, 0)));
            var f = M({
              top: o.top - s.top - h,
              left: o.left - s.left - p,
              width: o.width,
              height: o.height,
            });
            if (((f.marginTop = 0), (f.marginLeft = 0), !n && r)) {
              var m = parseFloat(u.marginTop),
                g = parseFloat(u.marginLeft);
              (f.top -= h - m),
                (f.bottom -= h - m),
                (f.left -= p - g),
                (f.right -= p - g),
                (f.marginTop = m),
                (f.marginLeft = g);
            }
            return (
              (n && !i ? e.contains(c) : e === c && "BODY" !== c.nodeName) &&
                (f = v(f, e)),
              f
            );
          }
          function D(t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              i = t.ownerDocument.documentElement,
              n = C(t, i),
              r = Math.max(i.clientWidth, window.innerWidth || 0),
              o = Math.max(i.clientHeight, window.innerHeight || 0),
              a = e ? 0 : g(i),
              s = e ? 0 : g(i, "left"),
              l = {
                top: a - n.top + n.marginTop,
                left: s - n.left + n.marginLeft,
                width: r,
                height: o,
              };
            return M(l);
          }
          function L(t) {
            var e = t.nodeName;
            if ("BODY" === e || "HTML" === e) return !1;
            if ("fixed" === a(t, "position")) return !0;
            var i = s(t);
            return !!i && L(i);
          }
          function E(t) {
            if (!t || !t.parentElement || d()) return document.documentElement;
            for (var e = t.parentElement; e && "none" === a(e, "transform"); )
              e = e.parentElement;
            return e || document.documentElement;
          }
          function A(t, e, i, n) {
            var r =
                arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
              o = { top: 0, left: 0 },
              a = r ? E(t) : m(t, c(e));
            if ("viewport" === n) o = D(a, r);
            else {
              var u = void 0;
              "scrollParent" === n
                ? "BODY" === (u = l(s(e))).nodeName &&
                  (u = t.ownerDocument.documentElement)
                : (u = "window" === n ? t.ownerDocument.documentElement : n);
              var h = C(u, a, r);
              if ("HTML" !== u.nodeName || L(a)) o = h;
              else {
                var d = _(t.ownerDocument),
                  p = d.height,
                  f = d.width;
                (o.top += h.top - h.marginTop),
                  (o.bottom = p + h.top),
                  (o.left += h.left - h.marginLeft),
                  (o.right = f + h.left);
              }
            }
            var g = "number" == typeof (i = i || 0);
            return (
              (o.left += g ? i : i.left || 0),
              (o.top += g ? i : i.top || 0),
              (o.right -= g ? i : i.right || 0),
              (o.bottom -= g ? i : i.bottom || 0),
              o
            );
          }
          function P(t) {
            return t.width * t.height;
          }
          function I(t, e, i, n, r) {
            var o =
              arguments.length > 5 && void 0 !== arguments[5]
                ? arguments[5]
                : 0;
            if (-1 === t.indexOf("auto")) return t;
            var a = A(i, n, o, r),
              s = {
                top: { width: a.width, height: e.top - a.top },
                right: { width: a.right - e.right, height: a.height },
                bottom: { width: a.width, height: a.bottom - e.bottom },
                left: { width: e.left - a.left, height: a.height },
              },
              l = Object.keys(s)
                .map(function (t) {
                  return S({ key: t }, s[t], { area: P(s[t]) });
                })
                .sort(function (t, e) {
                  return e.area - t.area;
                }),
              c = l.filter(function (t) {
                var e = t.width,
                  n = t.height;
                return e >= i.clientWidth && n >= i.clientHeight;
              }),
              u = c.length > 0 ? c[0].key : l[0].key,
              h = t.split("-")[1];
            return u + (h ? "-" + h : "");
          }
          function O(t, e, i) {
            var n =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : null,
              r = n ? E(e) : m(e, c(i));
            return C(i, r, n);
          }
          function Y(t) {
            var e = t.ownerDocument.defaultView.getComputedStyle(t),
              i =
                parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
              n =
                parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
            return { width: t.offsetWidth + n, height: t.offsetHeight + i };
          }
          function z(t) {
            var e = {
              left: "right",
              right: "left",
              bottom: "top",
              top: "bottom",
            };
            return t.replace(/left|right|bottom|top/g, function (t) {
              return e[t];
            });
          }
          function R(t, e, i) {
            i = i.split("-")[0];
            var n = Y(t),
              r = { width: n.width, height: n.height },
              o = -1 !== ["right", "left"].indexOf(i),
              a = o ? "top" : "left",
              s = o ? "left" : "top",
              l = o ? "height" : "width",
              c = o ? "width" : "height";
            return (
              (r[a] = e[a] + e[l] / 2 - n[l] / 2),
              (r[s] = i === s ? e[s] - n[c] : e[z(s)]),
              r
            );
          }
          function F(t, e) {
            return Array.prototype.find ? t.find(e) : t.filter(e)[0];
          }
          function H(t, e, i) {
            return (
              (void 0 === i
                ? t
                : t.slice(
                    0,
                    (function (t, e, i) {
                      if (Array.prototype.findIndex)
                        return t.findIndex(function (t) {
                          return t[e] === i;
                        });
                      var n = F(t, function (t) {
                        return t[e] === i;
                      });
                      return t.indexOf(n);
                    })(t, "name", i)
                  )
              ).forEach(function (t) {
                t.function &&
                  console.warn(
                    "`modifier.function` is deprecated, use `modifier.fn`!"
                  );
                var i = t.function || t.fn;
                t.enabled &&
                  o(i) &&
                  ((e.offsets.popper = M(e.offsets.popper)),
                  (e.offsets.reference = M(e.offsets.reference)),
                  (e = i(e, t)));
              }),
              e
            );
          }
          function j() {
            if (!this.state.isDestroyed) {
              var t = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {},
              };
              (t.offsets.reference = O(
                this.state,
                this.popper,
                this.reference,
                this.options.positionFixed
              )),
                (t.placement = I(
                  this.options.placement,
                  t.offsets.reference,
                  this.popper,
                  this.reference,
                  this.options.modifiers.flip.boundariesElement,
                  this.options.modifiers.flip.padding
                )),
                (t.originalPlacement = t.placement),
                (t.positionFixed = this.options.positionFixed),
                (t.offsets.popper = R(
                  this.popper,
                  t.offsets.reference,
                  t.placement
                )),
                (t.offsets.popper.position = this.options.positionFixed
                  ? "fixed"
                  : "absolute"),
                (t = H(this.modifiers, t)),
                this.state.isCreated
                  ? this.options.onUpdate(t)
                  : ((this.state.isCreated = !0), this.options.onCreate(t));
            }
          }
          function N(t, e) {
            return t.some(function (t) {
              var i = t.name;
              return t.enabled && i === e;
            });
          }
          function B(t) {
            for (
              var e = [!1, "ms", "Webkit", "Moz", "O"],
                i = t.charAt(0).toUpperCase() + t.slice(1),
                n = 0;
              n < e.length;
              n++
            ) {
              var r = e[n],
                o = r ? "" + r + i : t;
              if (void 0 !== document.body.style[o]) return o;
            }
            return null;
          }
          function W() {
            return (
              (this.state.isDestroyed = !0),
              N(this.modifiers, "applyStyle") &&
                (this.popper.removeAttribute("x-placement"),
                (this.popper.style.position = ""),
                (this.popper.style.top = ""),
                (this.popper.style.left = ""),
                (this.popper.style.right = ""),
                (this.popper.style.bottom = ""),
                (this.popper.style.willChange = ""),
                (this.popper.style[B("transform")] = "")),
              this.disableEventListeners(),
              this.options.removeOnDestroy &&
                this.popper.parentNode.removeChild(this.popper),
              this
            );
          }
          function V(t) {
            var e = t.ownerDocument;
            return e ? e.defaultView : window;
          }
          function U(t, e, i, n) {
            (i.updateBound = n),
              V(t).addEventListener("resize", i.updateBound, { passive: !0 });
            var r = l(t);
            return (
              (function t(e, i, n, r) {
                var o = "BODY" === e.nodeName,
                  a = o ? e.ownerDocument.defaultView : e;
                a.addEventListener(i, n, { passive: !0 }),
                  o || t(l(a.parentNode), i, n, r),
                  r.push(a);
              })(r, "scroll", i.updateBound, i.scrollParents),
              (i.scrollElement = r),
              (i.eventsEnabled = !0),
              i
            );
          }
          function q() {
            this.state.eventsEnabled ||
              (this.state = U(
                this.reference,
                this.options,
                this.state,
                this.scheduleUpdate
              ));
          }
          function $() {
            var t, e;
            this.state.eventsEnabled &&
              (cancelAnimationFrame(this.scheduleUpdate),
              (this.state =
                ((t = this.reference),
                (e = this.state),
                V(t).removeEventListener("resize", e.updateBound),
                e.scrollParents.forEach(function (t) {
                  t.removeEventListener("scroll", e.updateBound);
                }),
                (e.updateBound = null),
                (e.scrollParents = []),
                (e.scrollElement = null),
                (e.eventsEnabled = !1),
                e)));
          }
          function X(t) {
            return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
          }
          function G(t, e) {
            Object.keys(e).forEach(function (i) {
              var n = "";
              -1 !==
                ["width", "height", "top", "right", "bottom", "left"].indexOf(
                  i
                ) &&
                X(e[i]) &&
                (n = "px"),
                (t.style[i] = e[i] + n);
            });
          }
          var Z = i && /Firefox/i.test(navigator.userAgent);
          function J(t, e, i) {
            var n = F(t, function (t) {
                return t.name === e;
              }),
              r =
                !!n &&
                t.some(function (t) {
                  return t.name === i && t.enabled && t.order < n.order;
                });
            if (!r) {
              var o = "`" + e + "`",
                a = "`" + i + "`";
              console.warn(
                a +
                  " modifier is required by " +
                  o +
                  " modifier in order to work, be sure to include it before " +
                  o +
                  "!"
              );
            }
            return r;
          }
          var K = [
              "auto-start",
              "auto",
              "auto-end",
              "top-start",
              "top",
              "top-end",
              "right-start",
              "right",
              "right-end",
              "bottom-end",
              "bottom",
              "bottom-start",
              "left-end",
              "left",
              "left-start",
            ],
            Q = K.slice(3);
          function tt(t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              i = Q.indexOf(t),
              n = Q.slice(i + 1).concat(Q.slice(0, i));
            return e ? n.reverse() : n;
          }
          var et = "flip",
            it = "clockwise",
            nt = "counterclockwise";
          function rt(t, e, i, n) {
            var r = [0, 0],
              o = -1 !== ["right", "left"].indexOf(n),
              a = t.split(/(\+|\-)/).map(function (t) {
                return t.trim();
              }),
              s = a.indexOf(
                F(a, function (t) {
                  return -1 !== t.search(/,|\s/);
                })
              );
            a[s] &&
              -1 === a[s].indexOf(",") &&
              console.warn(
                "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
              );
            var l = /\s*,\s*|\s+/,
              c =
                -1 !== s
                  ? [
                      a.slice(0, s).concat([a[s].split(l)[0]]),
                      [a[s].split(l)[1]].concat(a.slice(s + 1)),
                    ]
                  : [a];
            return (
              (c = c.map(function (t, n) {
                var r = (1 === n ? !o : o) ? "height" : "width",
                  a = !1;
                return t
                  .reduce(function (t, e) {
                    return "" === t[t.length - 1] &&
                      -1 !== ["+", "-"].indexOf(e)
                      ? ((t[t.length - 1] = e), (a = !0), t)
                      : a
                      ? ((t[t.length - 1] += e), (a = !1), t)
                      : t.concat(e);
                  }, [])
                  .map(function (t) {
                    return (function (t, e, i, n) {
                      var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        o = +r[1],
                        a = r[2];
                      if (!o) return t;
                      if (0 === a.indexOf("%")) {
                        var s = void 0;
                        switch (a) {
                          case "%p":
                            s = i;
                            break;
                          case "%":
                          case "%r":
                          default:
                            s = n;
                        }
                        return (M(s)[e] / 100) * o;
                      }
                      if ("vh" === a || "vw" === a) {
                        return (
                          (("vh" === a
                            ? Math.max(
                                document.documentElement.clientHeight,
                                window.innerHeight || 0
                              )
                            : Math.max(
                                document.documentElement.clientWidth,
                                window.innerWidth || 0
                              )) /
                            100) *
                          o
                        );
                      }
                      return o;
                    })(t, r, e, i);
                  });
              })).forEach(function (t, e) {
                t.forEach(function (i, n) {
                  X(i) && (r[e] += i * ("-" === t[n - 1] ? -1 : 1));
                });
              }),
              r
            );
          }
          var ot = {
              placement: "bottom",
              positionFixed: !1,
              eventsEnabled: !0,
              removeOnDestroy: !1,
              onCreate: function () {},
              onUpdate: function () {},
              modifiers: {
                shift: {
                  order: 100,
                  enabled: !0,
                  fn: function (t) {
                    var e = t.placement,
                      i = e.split("-")[0],
                      n = e.split("-")[1];
                    if (n) {
                      var r = t.offsets,
                        o = r.reference,
                        a = r.popper,
                        s = -1 !== ["bottom", "top"].indexOf(i),
                        l = s ? "left" : "top",
                        c = s ? "width" : "height",
                        u = {
                          start: k({}, l, o[l]),
                          end: k({}, l, o[l] + o[c] - a[c]),
                        };
                      t.offsets.popper = S({}, a, u[n]);
                    }
                    return t;
                  },
                },
                hide: {
                  order: 800,
                  enabled: !0,
                  fn: function (t) {
                    if (!J(t.instance.modifiers, "hide", "preventOverflow"))
                      return t;
                    var e = t.offsets.reference,
                      i = F(t.instance.modifiers, function (t) {
                        return "preventOverflow" === t.name;
                      }).boundaries;
                    if (
                      e.bottom < i.top ||
                      e.left > i.right ||
                      e.top > i.bottom ||
                      e.right < i.left
                    ) {
                      if (!0 === t.hide) return t;
                      (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
                    } else {
                      if (!1 === t.hide) return t;
                      (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
                    }
                    return t;
                  },
                },
                computeStyle: {
                  order: 850,
                  enabled: !0,
                  fn: function (t, e) {
                    var i = e.x,
                      n = e.y,
                      r = t.offsets.popper,
                      o = F(t.instance.modifiers, function (t) {
                        return "applyStyle" === t.name;
                      }).gpuAcceleration;
                    void 0 !== o &&
                      console.warn(
                        "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                      );
                    var a = void 0 !== o ? o : e.gpuAcceleration,
                      s = p(t.instance.popper),
                      l = T(s),
                      c = { position: r.position },
                      u = (function (t, e) {
                        var i = t.offsets,
                          n = i.popper,
                          r = i.reference,
                          o = Math.round,
                          a = Math.floor,
                          s = function (t) {
                            return t;
                          },
                          l = o(r.width),
                          c = o(n.width),
                          u = -1 !== ["left", "right"].indexOf(t.placement),
                          h = -1 !== t.placement.indexOf("-"),
                          d = e ? (u || h || l % 2 == c % 2 ? o : a) : s,
                          p = e ? o : s;
                        return {
                          left: d(
                            l % 2 == 1 && c % 2 == 1 && !h && e
                              ? n.left - 1
                              : n.left
                          ),
                          top: p(n.top),
                          bottom: p(n.bottom),
                          right: d(n.right),
                        };
                      })(t, window.devicePixelRatio < 2 || !Z),
                      h = "bottom" === i ? "top" : "bottom",
                      d = "right" === n ? "left" : "right",
                      f = B("transform"),
                      m = void 0,
                      g = void 0;
                    if (
                      ((g =
                        "bottom" === h
                          ? "HTML" === s.nodeName
                            ? -s.clientHeight + u.bottom
                            : -l.height + u.bottom
                          : u.top),
                      (m =
                        "right" === d
                          ? "HTML" === s.nodeName
                            ? -s.clientWidth + u.right
                            : -l.width + u.right
                          : u.left),
                      a && f)
                    )
                      (c[f] = "translate3d(" + m + "px, " + g + "px, 0)"),
                        (c[h] = 0),
                        (c[d] = 0),
                        (c.willChange = "transform");
                    else {
                      var v = "bottom" === h ? -1 : 1,
                        y = "right" === d ? -1 : 1;
                      (c[h] = g * v),
                        (c[d] = m * y),
                        (c.willChange = h + ", " + d);
                    }
                    var b = { "x-placement": t.placement };
                    return (
                      (t.attributes = S({}, b, t.attributes)),
                      (t.styles = S({}, c, t.styles)),
                      (t.arrowStyles = S({}, t.offsets.arrow, t.arrowStyles)),
                      t
                    );
                  },
                  gpuAcceleration: !0,
                  x: "bottom",
                  y: "right",
                },
                applyStyle: {
                  order: 900,
                  enabled: !0,
                  fn: function (t) {
                    var e, i;
                    return (
                      G(t.instance.popper, t.styles),
                      (e = t.instance.popper),
                      (i = t.attributes),
                      Object.keys(i).forEach(function (t) {
                        !1 !== i[t]
                          ? e.setAttribute(t, i[t])
                          : e.removeAttribute(t);
                      }),
                      t.arrowElement &&
                        Object.keys(t.arrowStyles).length &&
                        G(t.arrowElement, t.arrowStyles),
                      t
                    );
                  },
                  onLoad: function (t, e, i, n, r) {
                    var o = O(r, e, t, i.positionFixed),
                      a = I(
                        i.placement,
                        o,
                        e,
                        t,
                        i.modifiers.flip.boundariesElement,
                        i.modifiers.flip.padding
                      );
                    return (
                      e.setAttribute("x-placement", a),
                      G(e, {
                        position: i.positionFixed ? "fixed" : "absolute",
                      }),
                      i
                    );
                  },
                  gpuAcceleration: void 0,
                },
              },
            },
            at = (function () {
              function t(e, i) {
                var n = this,
                  a =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {};
                x(this, t),
                  (this.scheduleUpdate = function () {
                    return requestAnimationFrame(n.update);
                  }),
                  (this.update = r(this.update.bind(this))),
                  (this.options = S({}, t.Defaults, a)),
                  (this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: [],
                  }),
                  (this.reference = e && e.jquery ? e[0] : e),
                  (this.popper = i && i.jquery ? i[0] : i),
                  (this.options.modifiers = {}),
                  Object.keys(S({}, t.Defaults.modifiers, a.modifiers)).forEach(
                    function (e) {
                      n.options.modifiers[e] = S(
                        {},
                        t.Defaults.modifiers[e] || {},
                        a.modifiers ? a.modifiers[e] : {}
                      );
                    }
                  ),
                  (this.modifiers = Object.keys(this.options.modifiers)
                    .map(function (t) {
                      return S({ name: t }, n.options.modifiers[t]);
                    })
                    .sort(function (t, e) {
                      return t.order - e.order;
                    })),
                  this.modifiers.forEach(function (t) {
                    t.enabled &&
                      o(t.onLoad) &&
                      t.onLoad(n.reference, n.popper, n.options, t, n.state);
                  }),
                  this.update();
                var s = this.options.eventsEnabled;
                s && this.enableEventListeners(),
                  (this.state.eventsEnabled = s);
              }
              return (
                w(t, [
                  {
                    key: "update",
                    value: function () {
                      return j.call(this);
                    },
                  },
                  {
                    key: "destroy",
                    value: function () {
                      return W.call(this);
                    },
                  },
                  {
                    key: "enableEventListeners",
                    value: function () {
                      return q.call(this);
                    },
                  },
                  {
                    key: "disableEventListeners",
                    value: function () {
                      return $.call(this);
                    },
                  },
                ]),
                t
              );
            })();
          (at.Utils = ("undefined" != typeof window ? window : t).PopperUtils),
            (at.placements = K),
            (at.Defaults = ot),
            (e.default = at);
        }.call(this, i(12));
    },
    function (t, e, i) {
      /*!
       * metismenu https://github.com/onokumus/metismenu#readme
       * A jQuery menu plugin
       * @version 3.0.6
       * @author Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
       * @license: MIT
       */
      t.exports = (function (t) {
        "use strict";
        function e() {
          return (e =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var n in i)
                  Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
              }
              return t;
            }).apply(this, arguments);
        }
        var i = (function (t) {
            var e = {
              TRANSITION_END: "mmTransitionEnd",
              triggerTransitionEnd: function (e) {
                t(e).trigger("transitionend");
              },
              supportsTransitionEnd: function () {
                return Boolean("transitionend");
              },
            };
            function i(i) {
              var n = this,
                r = !1;
              return (
                t(this).one(e.TRANSITION_END, function () {
                  r = !0;
                }),
                setTimeout(function () {
                  r || e.triggerTransitionEnd(n);
                }, i),
                this
              );
            }
            return (
              (t.fn.mmEmulateTransitionEnd = i),
              (t.event.special[e.TRANSITION_END] = {
                bindType: "transitionend",
                delegateType: "transitionend",
                handle: function (e) {
                  if (t(e.target).is(this))
                    return e.handleObj.handler.apply(this, arguments);
                },
              }),
              e
            );
          })(
            (t =
              t && Object.prototype.hasOwnProperty.call(t, "default")
                ? t.default
                : t)
          ),
          n = "metisMenu",
          r = t.fn[n],
          o = {
            toggle: !0,
            preventDefault: !0,
            triggerElement: "a",
            parentTrigger: "li",
            subMenu: "ul",
          },
          a = {
            SHOW: "show.metisMenu",
            SHOWN: "shown.metisMenu",
            HIDE: "hide.metisMenu",
            HIDDEN: "hidden.metisMenu",
            CLICK_DATA_API: "click.metisMenu.data-api",
          },
          s = "metismenu",
          l = "mm-active",
          c = "mm-show",
          u = "mm-collapse",
          h = "mm-collapsing",
          d = (function () {
            function n(t, i) {
              (this.element = t),
                (this.config = e({}, o, {}, i)),
                (this.transitioning = null),
                this.init();
            }
            var r = n.prototype;
            return (
              (r.init = function () {
                var e = this,
                  i = this.config,
                  n = t(this.element);
                n.addClass(s),
                  n
                    .find(i.parentTrigger + "." + l)
                    .children(i.triggerElement)
                    .attr("aria-expanded", "true"),
                  n
                    .find(i.parentTrigger + "." + l)
                    .parents(i.parentTrigger)
                    .addClass(l),
                  n
                    .find(i.parentTrigger + "." + l)
                    .parents(i.parentTrigger)
                    .children(i.triggerElement)
                    .attr("aria-expanded", "true"),
                  n
                    .find(i.parentTrigger + "." + l)
                    .has(i.subMenu)
                    .children(i.subMenu)
                    .addClass(u + " " + c),
                  n
                    .find(i.parentTrigger)
                    .not("." + l)
                    .has(i.subMenu)
                    .children(i.subMenu)
                    .addClass(u),
                  n
                    .find(i.parentTrigger)
                    .children(i.triggerElement)
                    .on(a.CLICK_DATA_API, function (n) {
                      var r = t(this);
                      if ("true" !== r.attr("aria-disabled")) {
                        i.preventDefault &&
                          "#" === r.attr("href") &&
                          n.preventDefault();
                        var o = r.parent(i.parentTrigger);
                        var a = o.siblings(i.parentTrigger);
                        var s = a.children(i.triggerElement);

                        if (o.hasClass(l)) {
                          // let ul = o.find("> ul");
                          // if (f) {
                          //   r.attr("aria-expanded", "false");
                          //   if (ul.hasClass("mm-show"))
                          //     ul.removeClass("mm-show");
                          //   else ul.addClass("mm-show");
                          // } else {
                            e.removeActive(o);
                          // }
                        } else {
                          r.attr("aria-expanded", "true");
                          e.setActive(o);
                          if (i.toggle) {
                            e.removeActive(a);
                            s.attr("aria-expanded", "false");
                          }
                        }
                        i.onTransitionStart && i.onTransitionStart(n);
                      }
                    });
              }),
              (r.setActive = function (e) {
                t(e).addClass(l);
                var i = t(e).children(this.config.subMenu);
                i.length > 0 && !i.hasClass(c) && this.show(i);
              }),
              (r.removeActive = function (e) {
                t(e).removeClass(l);
                var i = t(e).children(this.config.subMenu + "." + c);
                i.length > 0 && this.hide(i);
              }),
              (r.show = function (e) {
                var n = this;
                if (!this.transitioning && !t(e).hasClass(h)) {
                  var r = t(e),
                    o = t.Event(a.SHOW);
                  if ((r.trigger(o), !o.isDefaultPrevented())) {
                    if (
                      (r.parent(this.config.parentTrigger).addClass(l),
                      this.config.toggle)
                    ) {
                      var s = r
                        .parent(this.config.parentTrigger)
                        .siblings()
                        .children(this.config.subMenu + "." + c);
                      this.hide(s);
                    }
                    r.removeClass(u).addClass(h).height(0),
                      this.setTransitioning(!0),
                      r
                        .height(e[0].scrollHeight)
                        .one(i.TRANSITION_END, function () {
                          n.config &&
                            n.element &&
                            (r
                              .removeClass(h)
                              .addClass(u + " " + c)
                              .height(""),
                            n.setTransitioning(!1),
                            r.trigger(a.SHOWN));
                        })
                        .mmEmulateTransitionEnd(350);
                  }
                }
              }),
              (r.hide = function (e) {
                var n = this;
                if (!this.transitioning && t(e).hasClass(c)) {
                  var r = t(e),
                    o = t.Event(a.HIDE);
                  if ((r.trigger(o), !o.isDefaultPrevented())) {
                    r.parent(this.config.parentTrigger).removeClass(l),
                      r.height(r.height())[0].offsetHeight,
                      r.addClass(h).removeClass(u).removeClass(c),
                      this.setTransitioning(!0);
                    var s = function () {
                      n.config &&
                        n.element &&
                        (n.transitioning &&
                          n.config.onTransitionEnd &&
                          n.config.onTransitionEnd(),
                        n.setTransitioning(!1),
                        r.trigger(a.HIDDEN),
                        r.removeClass(h).addClass(u));
                    };
                    0 === r.height() || "none" === r.css("display")
                      ? s()
                      : r
                          .height(0)
                          .one(i.TRANSITION_END, s)
                          .mmEmulateTransitionEnd(350);
                  }
                }
              }),
              (r.setTransitioning = function (t) {
                this.transitioning = t;
              }),
              (r.dispose = function () {
                t.removeData(this.element, "metisMenu"),
                  t(this.element)
                    .find(this.config.parentTrigger)
                    .children(this.config.triggerElement)
                    .off(a.CLICK_DATA_API),
                  (this.transitioning = null),
                  (this.config = null),
                  (this.element = null);
              }),
              (n.jQueryInterface = function (i) {
                return this.each(function () {
                  var r = t(this),
                    a = r.data("metisMenu"),
                    s = e(
                      {},
                      o,
                      {},
                      r.data(),
                      {},
                      "object" == typeof i && i ? i : {}
                    );
                  if (
                    (a || ((a = new n(this, s)), r.data("metisMenu", a)),
                    "string" == typeof i)
                  ) {
                    if (void 0 === a[i])
                      throw new Error('No method named "' + i + '"');
                    a[i]();
                  }
                });
              }),
              n
            );
          })();
        return (
          (t.fn[n] = d.jQueryInterface),
          (t.fn[n].Constructor = d),
          (t.fn[n].noConflict = function () {
            return (t.fn[n] = r), d.jQueryInterface;
          }),
          d
        );
      })(i(1));
    },
    function (t, e, i) {
      (function (t) {
        t(document).ready(function () {
          t(".btn-open-options").click(function () {
            t(".ui-theme-settings").toggleClass("settings-open");
          }),
            t(".switch-container-class").on("click", function () {
              var e = t(this).attr("data-class");
              t(".app-container").toggleClass(e),
                t(this)
                  .parent()
                  .find(".switch-container-class")
                  .removeClass("active"),
                t(this).addClass("active");
            }),
            t(".switch-theme-class").on("click", function () {
              var e = t(this).attr("data-class");
              "app-theme-white" == e &&
                (t(".app-container").removeClass("app-theme-gray"),
                t(".app-container").addClass(e)),
                "app-theme-gray" == e &&
                  (t(".app-container").removeClass("app-theme-white"),
                  t(".app-container").addClass(e)),
                "body-tabs-line" == e &&
                  (t(".app-container").removeClass("body-tabs-shadow"),
                  t(".app-container").addClass(e)),
                "body-tabs-shadow" == e &&
                  (t(".app-container").removeClass("body-tabs-line"),
                  t(".app-container").addClass(e)),
                t(this)
                  .parent()
                  .find(".switch-theme-class")
                  .removeClass("active"),
                t(this).addClass("active");
            }),
            t(".switch-header-cs-class").on("click", function () {
              var e = t(this).attr("data-class");
              t(".switch-header-cs-class").removeClass("active"),
                t(this).addClass("active"),
                t(".app-header").attr("class", "app-header"),
                t(".app-header").addClass("header-shadow " + e);
            }),
            t(".switch-sidebar-cs-class").on("click", function () {
              var e = t(this).attr("data-class");
              t(".switch-sidebar-cs-class").removeClass("active"),
                t(this).addClass("active"),
                t(".app-sidebar").attr("class", "app-sidebar"),
                t(".app-sidebar").addClass("sidebar-shadow " + e);
            });
        });
      }.call(this, i(1)));
    },
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},

    function (t, e, i) {},
    function (t, e) {},

    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (module, exports, __webpack_require__) {},
    function (t, e, i) {},
    function (t, e, i) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function (t, e) {},
    ,
    ,
    ,
    ,
    ,
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
  ]);
};

window.app();
