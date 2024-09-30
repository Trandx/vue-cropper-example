import { defineComponent as Ee, ref as mt, watch as Te, onBeforeUnmount as Oe, onMounted as Ne, openBlock as Vt, createElementBlock as Gt, createElementVNode as st, normalizeStyle as Ae, createCommentVNode as Re } from "vue";
/*!
 * Cropper.js v1.6.2
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-04-21T07:43:05.335Z
 */
function $t(r, t) {
  var i = Object.keys(r);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(r);
    t && (e = e.filter(function(o) {
      return Object.getOwnPropertyDescriptor(r, o).enumerable;
    })), i.push.apply(i, e);
  }
  return i;
}
function ce(r) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $t(Object(i), !0).forEach(function(e) {
      _e(r, e, i[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(i)) : $t(Object(i)).forEach(function(e) {
      Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(i, e));
    });
  }
  return r;
}
function Se(r, t) {
  if (typeof r != "object" || !r) return r;
  var i = r[Symbol.toPrimitive];
  if (i !== void 0) {
    var e = i.call(r, t || "default");
    if (typeof e != "object") return e;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(r);
}
function le(r) {
  var t = Se(r, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Nt(r) {
  "@babel/helpers - typeof";
  return Nt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Nt(r);
}
function Be(r, t) {
  if (!(r instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function qt(r, t) {
  for (var i = 0; i < t.length; i++) {
    var e = t[i];
    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(r, le(e.key), e);
  }
}
function Ie(r, t, i) {
  return t && qt(r.prototype, t), i && qt(r, i), Object.defineProperty(r, "prototype", {
    writable: !1
  }), r;
}
function _e(r, t, i) {
  return t = le(t), t in r ? Object.defineProperty(r, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : r[t] = i, r;
}
function fe(r) {
  return ke(r) || Le(r) || ze(r) || Pe();
}
function ke(r) {
  if (Array.isArray(r)) return At(r);
}
function Le(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null) return Array.from(r);
}
function ze(r, t) {
  if (r) {
    if (typeof r == "string") return At(r, t);
    var i = Object.prototype.toString.call(r).slice(8, -1);
    if (i === "Object" && r.constructor && (i = r.constructor.name), i === "Map" || i === "Set") return Array.from(r);
    if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return At(r, t);
  }
}
function At(r, t) {
  (t == null || t > r.length) && (t = r.length);
  for (var i = 0, e = new Array(t); i < t; i++) e[i] = r[i];
  return e;
}
function Pe() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var xt = typeof window < "u" && typeof window.document < "u", W = xt ? window : {}, Pt = xt && W.document.documentElement ? "ontouchstart" in W.document.documentElement : !1, Yt = xt ? "PointerEvent" in W : !1, D = "cropper", Ht = "all", pe = "crop", ue = "move", de = "zoom", F = "e", K = "w", J = "s", $ = "n", ht = "ne", ct = "nw", lt = "se", ft = "sw", Rt = "".concat(D, "-crop"), Zt = "".concat(D, "-disabled"), _ = "".concat(D, "-hidden"), Ft = "".concat(D, "-hide"), Ye = "".concat(D, "-invisible"), yt = "".concat(D, "-modal"), St = "".concat(D, "-move"), ut = "".concat(D, "Action"), wt = "".concat(D, "Preview"), Xt = "crop", ge = "move", ve = "none", Bt = "crop", It = "cropend", _t = "cropmove", kt = "cropstart", Kt = "dblclick", He = Pt ? "touchstart" : "mousedown", Xe = Pt ? "touchmove" : "mousemove", We = Pt ? "touchend touchcancel" : "mouseup", Qt = Yt ? "pointerdown" : He, Jt = Yt ? "pointermove" : Xe, te = Yt ? "pointerup pointercancel" : We, ee = "ready", ie = "resize", ae = "wheel", Lt = "zoom", re = "image/jpeg", Ue = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, je = /^data:/, Ve = /^data:image\/jpeg;base64,/, Ge = /^img|canvas$/i, me = 200, we = 100, oe = {
  // Define the view mode of the cropper
  viewMode: 0,
  // 0, 1, 2, 3
  // Define the dragging mode of the cropper
  dragMode: Xt,
  // 'crop', 'move' or 'none'
  // Define the initial aspect ratio of the crop box
  initialAspectRatio: NaN,
  // Define the aspect ratio of the crop box
  aspectRatio: NaN,
  // An object with the previous cropping result data
  data: null,
  // A selector for adding extra containers to preview
  preview: "",
  // Re-render the cropper when resize the window
  responsive: !0,
  // Restore the cropped area after resize the window
  restore: !0,
  // Check if the current image is a cross-origin image
  checkCrossOrigin: !0,
  // Check the current image's Exif Orientation information
  checkOrientation: !0,
  // Show the black modal
  modal: !0,
  // Show the dashed lines for guiding
  guides: !0,
  // Show the center indicator for guiding
  center: !0,
  // Show the white modal to highlight the crop box
  highlight: !0,
  // Show the grid background
  background: !0,
  // Enable to crop the image automatically when initialize
  autoCrop: !0,
  // Define the percentage of automatic cropping area when initializes
  autoCropArea: 0.8,
  // Enable to move the image
  movable: !0,
  // Enable to rotate the image
  rotatable: !0,
  // Enable to scale the image
  scalable: !0,
  // Enable to zoom the image
  zoomable: !0,
  // Enable to zoom the image by dragging touch
  zoomOnTouch: !0,
  // Enable to zoom the image by wheeling mouse
  zoomOnWheel: !0,
  // Define zoom ratio when zoom the image by wheeling mouse
  wheelZoomRatio: 0.1,
  // Enable to move the crop box
  cropBoxMovable: !0,
  // Enable to resize the crop box
  cropBoxResizable: !0,
  // Toggle drag mode between "crop" and "move" when click twice on the cropper
  toggleDragModeOnDblclick: !0,
  // Size limitation
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: me,
  minContainerHeight: we,
  // Shortcuts of events
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, $e = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', qe = Number.isNaN || W.isNaN;
function w(r) {
  return typeof r == "number" && !qe(r);
}
var ne = function(t) {
  return t > 0 && t < 1 / 0;
};
function Tt(r) {
  return typeof r > "u";
}
function Q(r) {
  return Nt(r) === "object" && r !== null;
}
var Ze = Object.prototype.hasOwnProperty;
function tt(r) {
  if (!Q(r))
    return !1;
  try {
    var t = r.constructor, i = t.prototype;
    return t && i && Ze.call(i, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function I(r) {
  return typeof r == "function";
}
var Fe = Array.prototype.slice;
function be(r) {
  return Array.from ? Array.from(r) : Fe.call(r);
}
function O(r, t) {
  return r && I(t) && (Array.isArray(r) || w(r.length) ? be(r).forEach(function(i, e) {
    t.call(r, i, e, r);
  }) : Q(r) && Object.keys(r).forEach(function(i) {
    t.call(r, r[i], i, r);
  })), r;
}
var C = Object.assign || function(t) {
  for (var i = arguments.length, e = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
    e[o - 1] = arguments[o];
  return Q(t) && e.length > 0 && e.forEach(function(a) {
    Q(a) && Object.keys(a).forEach(function(n) {
      t[n] = a[n];
    });
  }), t;
}, Ke = /\.\d*(?:0|9){12}\d*$/;
function it(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Ke.test(r) ? Math.round(r * t) / t : r;
}
var Qe = /^width|height|left|top|marginLeft|marginTop$/;
function q(r, t) {
  var i = r.style;
  O(t, function(e, o) {
    Qe.test(o) && w(e) && (e = "".concat(e, "px")), i[o] = e;
  });
}
function Je(r, t) {
  return r.classList ? r.classList.contains(t) : r.className.indexOf(t) > -1;
}
function R(r, t) {
  if (t) {
    if (w(r.length)) {
      O(r, function(e) {
        R(e, t);
      });
      return;
    }
    if (r.classList) {
      r.classList.add(t);
      return;
    }
    var i = r.className.trim();
    i ? i.indexOf(t) < 0 && (r.className = "".concat(i, " ").concat(t)) : r.className = t;
  }
}
function X(r, t) {
  if (t) {
    if (w(r.length)) {
      O(r, function(i) {
        X(i, t);
      });
      return;
    }
    if (r.classList) {
      r.classList.remove(t);
      return;
    }
    r.className.indexOf(t) >= 0 && (r.className = r.className.replace(t, ""));
  }
}
function et(r, t, i) {
  if (t) {
    if (w(r.length)) {
      O(r, function(e) {
        et(e, t, i);
      });
      return;
    }
    i ? R(r, t) : X(r, t);
  }
}
var ti = /([a-z\d])([A-Z])/g;
function Wt(r) {
  return r.replace(ti, "$1-$2").toLowerCase();
}
function zt(r, t) {
  return Q(r[t]) ? r[t] : r.dataset ? r.dataset[t] : r.getAttribute("data-".concat(Wt(t)));
}
function dt(r, t, i) {
  Q(i) ? r[t] = i : r.dataset ? r.dataset[t] = i : r.setAttribute("data-".concat(Wt(t)), i);
}
function ei(r, t) {
  if (Q(r[t]))
    try {
      delete r[t];
    } catch {
      r[t] = void 0;
    }
  else if (r.dataset)
    try {
      delete r.dataset[t];
    } catch {
      r.dataset[t] = void 0;
    }
  else
    r.removeAttribute("data-".concat(Wt(t)));
}
var ye = /\s\s*/, xe = function() {
  var r = !1;
  if (xt) {
    var t = !1, i = function() {
    }, e = Object.defineProperty({}, "once", {
      get: function() {
        return r = !0, t;
      },
      /**
       * This setter can fix a `TypeError` in strict mode
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
       * @param {boolean} value - The value to set
       */
      set: function(a) {
        t = a;
      }
    });
    W.addEventListener("test", i, e), W.removeEventListener("test", i, e);
  }
  return r;
}();
function P(r, t, i) {
  var e = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, o = i;
  t.trim().split(ye).forEach(function(a) {
    if (!xe) {
      var n = r.listeners;
      n && n[a] && n[a][i] && (o = n[a][i], delete n[a][i], Object.keys(n[a]).length === 0 && delete n[a], Object.keys(n).length === 0 && delete r.listeners);
    }
    r.removeEventListener(a, o, e);
  });
}
function L(r, t, i) {
  var e = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, o = i;
  t.trim().split(ye).forEach(function(a) {
    if (e.once && !xe) {
      var n = r.listeners, s = n === void 0 ? {} : n;
      o = function() {
        delete s[a][i], r.removeEventListener(a, o, e);
        for (var l = arguments.length, h = new Array(l), c = 0; c < l; c++)
          h[c] = arguments[c];
        i.apply(r, h);
      }, s[a] || (s[a] = {}), s[a][i] && r.removeEventListener(a, s[a][i], e), s[a][i] = o, r.listeners = s;
    }
    r.addEventListener(a, o, e);
  });
}
function at(r, t, i) {
  var e;
  return I(Event) && I(CustomEvent) ? e = new CustomEvent(t, {
    detail: i,
    bubbles: !0,
    cancelable: !0
  }) : (e = document.createEvent("CustomEvent"), e.initCustomEvent(t, !0, !0, i)), r.dispatchEvent(e);
}
function De(r) {
  var t = r.getBoundingClientRect();
  return {
    left: t.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: t.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var Ot = W.location, ii = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function se(r) {
  var t = r.match(ii);
  return t !== null && (t[1] !== Ot.protocol || t[2] !== Ot.hostname || t[3] !== Ot.port);
}
function he(r) {
  var t = "timestamp=".concat((/* @__PURE__ */ new Date()).getTime());
  return r + (r.indexOf("?") === -1 ? "?" : "&") + t;
}
function pt(r) {
  var t = r.rotate, i = r.scaleX, e = r.scaleY, o = r.translateX, a = r.translateY, n = [];
  w(o) && o !== 0 && n.push("translateX(".concat(o, "px)")), w(a) && a !== 0 && n.push("translateY(".concat(a, "px)")), w(t) && t !== 0 && n.push("rotate(".concat(t, "deg)")), w(i) && i !== 1 && n.push("scaleX(".concat(i, ")")), w(e) && e !== 1 && n.push("scaleY(".concat(e, ")"));
  var s = n.length ? n.join(" ") : "none";
  return {
    WebkitTransform: s,
    msTransform: s,
    transform: s
  };
}
function ai(r) {
  var t = ce({}, r), i = 0;
  return O(r, function(e, o) {
    delete t[o], O(t, function(a) {
      var n = Math.abs(e.startX - a.startX), s = Math.abs(e.startY - a.startY), p = Math.abs(e.endX - a.endX), l = Math.abs(e.endY - a.endY), h = Math.sqrt(n * n + s * s), c = Math.sqrt(p * p + l * l), f = (c - h) / h;
      Math.abs(f) > Math.abs(i) && (i = f);
    });
  }), i;
}
function bt(r, t) {
  var i = r.pageX, e = r.pageY, o = {
    endX: i,
    endY: e
  };
  return t ? o : ce({
    startX: i,
    startY: e
  }, o);
}
function ri(r) {
  var t = 0, i = 0, e = 0;
  return O(r, function(o) {
    var a = o.startX, n = o.startY;
    t += a, i += n, e += 1;
  }), t /= e, i /= e, {
    pageX: t,
    pageY: i
  };
}
function Z(r) {
  var t = r.aspectRatio, i = r.height, e = r.width, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", a = ne(e), n = ne(i);
  if (a && n) {
    var s = i * t;
    o === "contain" && s > e || o === "cover" && s < e ? i = e / t : e = i * t;
  } else a ? i = e / t : n && (e = i * t);
  return {
    width: e,
    height: i
  };
}
function oi(r) {
  var t = r.width, i = r.height, e = r.degree;
  if (e = Math.abs(e) % 180, e === 90)
    return {
      width: i,
      height: t
    };
  var o = e % 90 * Math.PI / 180, a = Math.sin(o), n = Math.cos(o), s = t * n + i * a, p = t * a + i * n;
  return e > 90 ? {
    width: p,
    height: s
  } : {
    width: s,
    height: p
  };
}
function ni(r, t, i, e) {
  var o = t.aspectRatio, a = t.naturalWidth, n = t.naturalHeight, s = t.rotate, p = s === void 0 ? 0 : s, l = t.scaleX, h = l === void 0 ? 1 : l, c = t.scaleY, f = c === void 0 ? 1 : c, v = i.aspectRatio, m = i.naturalWidth, x = i.naturalHeight, b = e.fillColor, E = b === void 0 ? "transparent" : b, N = e.imageSmoothingEnabled, M = N === void 0 ? !0 : N, Y = e.imageSmoothingQuality, B = Y === void 0 ? "low" : Y, u = e.maxWidth, y = u === void 0 ? 1 / 0 : u, T = e.maxHeight, k = T === void 0 ? 1 / 0 : T, H = e.minWidth, j = H === void 0 ? 0 : H, V = e.minHeight, U = V === void 0 ? 0 : V, z = document.createElement("canvas"), S = z.getContext("2d"), G = Z({
    aspectRatio: v,
    width: y,
    height: k
  }), rt = Z({
    aspectRatio: v,
    width: j,
    height: U
  }, "cover"), gt = Math.min(G.width, Math.max(rt.width, m)), vt = Math.min(G.height, Math.max(rt.height, x)), Dt = Z({
    aspectRatio: o,
    width: y,
    height: k
  }), Ct = Z({
    aspectRatio: o,
    width: j,
    height: U
  }, "cover"), Mt = Math.min(Dt.width, Math.max(Ct.width, a)), Et = Math.min(Dt.height, Math.max(Ct.height, n)), d = [-Mt / 2, -Et / 2, Mt, Et];
  return z.width = it(gt), z.height = it(vt), S.fillStyle = E, S.fillRect(0, 0, gt, vt), S.save(), S.translate(gt / 2, vt / 2), S.rotate(p * Math.PI / 180), S.scale(h, f), S.imageSmoothingEnabled = M, S.imageSmoothingQuality = B, S.drawImage.apply(S, [r].concat(fe(d.map(function(g) {
    return Math.floor(it(g));
  })))), S.restore(), z;
}
var Ce = String.fromCharCode;
function si(r, t, i) {
  var e = "";
  i += t;
  for (var o = t; o < i; o += 1)
    e += Ce(r.getUint8(o));
  return e;
}
var hi = /^data:.*,/;
function ci(r) {
  var t = r.replace(hi, ""), i = atob(t), e = new ArrayBuffer(i.length), o = new Uint8Array(e);
  return O(o, function(a, n) {
    o[n] = i.charCodeAt(n);
  }), e;
}
function li(r, t) {
  for (var i = [], e = 8192, o = new Uint8Array(r); o.length > 0; )
    i.push(Ce.apply(null, be(o.subarray(0, e)))), o = o.subarray(e);
  return "data:".concat(t, ";base64,").concat(btoa(i.join("")));
}
function fi(r) {
  var t = new DataView(r), i;
  try {
    var e, o, a;
    if (t.getUint8(0) === 255 && t.getUint8(1) === 216)
      for (var n = t.byteLength, s = 2; s + 1 < n; ) {
        if (t.getUint8(s) === 255 && t.getUint8(s + 1) === 225) {
          o = s;
          break;
        }
        s += 1;
      }
    if (o) {
      var p = o + 4, l = o + 10;
      if (si(t, p, 4) === "Exif") {
        var h = t.getUint16(l);
        if (e = h === 18761, (e || h === 19789) && t.getUint16(l + 2, e) === 42) {
          var c = t.getUint32(l + 4, e);
          c >= 8 && (a = l + c);
        }
      }
    }
    if (a) {
      var f = t.getUint16(a, e), v, m;
      for (m = 0; m < f; m += 1)
        if (v = a + m * 12 + 2, t.getUint16(v, e) === 274) {
          v += 8, i = t.getUint16(v, e), t.setUint16(v, 1, e);
          break;
        }
    }
  } catch {
    i = 1;
  }
  return i;
}
function pi(r) {
  var t = 0, i = 1, e = 1;
  switch (r) {
    case 2:
      i = -1;
      break;
    case 3:
      t = -180;
      break;
    case 4:
      e = -1;
      break;
    case 5:
      t = 90, e = -1;
      break;
    case 6:
      t = 90;
      break;
    case 7:
      t = 90, i = -1;
      break;
    case 8:
      t = -90;
      break;
  }
  return {
    rotate: t,
    scaleX: i,
    scaleY: e
  };
}
var ui = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var t = this.element, i = this.options, e = this.container, o = this.cropper, a = Number(i.minContainerWidth), n = Number(i.minContainerHeight);
    R(o, _), X(t, _);
    var s = {
      width: Math.max(e.offsetWidth, a >= 0 ? a : me),
      height: Math.max(e.offsetHeight, n >= 0 ? n : we)
    };
    this.containerData = s, q(o, {
      width: s.width,
      height: s.height
    }), R(t, _), X(o, _);
  },
  // Canvas (image wrapper)
  initCanvas: function() {
    var t = this.containerData, i = this.imageData, e = this.options.viewMode, o = Math.abs(i.rotate) % 180 === 90, a = o ? i.naturalHeight : i.naturalWidth, n = o ? i.naturalWidth : i.naturalHeight, s = a / n, p = t.width, l = t.height;
    t.height * s > t.width ? e === 3 ? p = t.height * s : l = t.width / s : e === 3 ? l = t.width / s : p = t.height * s;
    var h = {
      aspectRatio: s,
      naturalWidth: a,
      naturalHeight: n,
      width: p,
      height: l
    };
    this.canvasData = h, this.limited = e === 1 || e === 2, this.limitCanvas(!0, !0), h.width = Math.min(Math.max(h.width, h.minWidth), h.maxWidth), h.height = Math.min(Math.max(h.height, h.minHeight), h.maxHeight), h.left = (t.width - h.width) / 2, h.top = (t.height - h.height) / 2, h.oldLeft = h.left, h.oldTop = h.top, this.initialCanvasData = C({}, h);
  },
  limitCanvas: function(t, i) {
    var e = this.options, o = this.containerData, a = this.canvasData, n = this.cropBoxData, s = e.viewMode, p = a.aspectRatio, l = this.cropped && n;
    if (t) {
      var h = Number(e.minCanvasWidth) || 0, c = Number(e.minCanvasHeight) || 0;
      s > 1 ? (h = Math.max(h, o.width), c = Math.max(c, o.height), s === 3 && (c * p > h ? h = c * p : c = h / p)) : s > 0 && (h ? h = Math.max(h, l ? n.width : 0) : c ? c = Math.max(c, l ? n.height : 0) : l && (h = n.width, c = n.height, c * p > h ? h = c * p : c = h / p));
      var f = Z({
        aspectRatio: p,
        width: h,
        height: c
      });
      h = f.width, c = f.height, a.minWidth = h, a.minHeight = c, a.maxWidth = 1 / 0, a.maxHeight = 1 / 0;
    }
    if (i)
      if (s > (l ? 0 : 1)) {
        var v = o.width - a.width, m = o.height - a.height;
        a.minLeft = Math.min(0, v), a.minTop = Math.min(0, m), a.maxLeft = Math.max(0, v), a.maxTop = Math.max(0, m), l && this.limited && (a.minLeft = Math.min(n.left, n.left + (n.width - a.width)), a.minTop = Math.min(n.top, n.top + (n.height - a.height)), a.maxLeft = n.left, a.maxTop = n.top, s === 2 && (a.width >= o.width && (a.minLeft = Math.min(0, v), a.maxLeft = Math.max(0, v)), a.height >= o.height && (a.minTop = Math.min(0, m), a.maxTop = Math.max(0, m))));
      } else
        a.minLeft = -a.width, a.minTop = -a.height, a.maxLeft = o.width, a.maxTop = o.height;
  },
  renderCanvas: function(t, i) {
    var e = this.canvasData, o = this.imageData;
    if (i) {
      var a = oi({
        width: o.naturalWidth * Math.abs(o.scaleX || 1),
        height: o.naturalHeight * Math.abs(o.scaleY || 1),
        degree: o.rotate || 0
      }), n = a.width, s = a.height, p = e.width * (n / e.naturalWidth), l = e.height * (s / e.naturalHeight);
      e.left -= (p - e.width) / 2, e.top -= (l - e.height) / 2, e.width = p, e.height = l, e.aspectRatio = n / s, e.naturalWidth = n, e.naturalHeight = s, this.limitCanvas(!0, !1);
    }
    (e.width > e.maxWidth || e.width < e.minWidth) && (e.left = e.oldLeft), (e.height > e.maxHeight || e.height < e.minHeight) && (e.top = e.oldTop), e.width = Math.min(Math.max(e.width, e.minWidth), e.maxWidth), e.height = Math.min(Math.max(e.height, e.minHeight), e.maxHeight), this.limitCanvas(!1, !0), e.left = Math.min(Math.max(e.left, e.minLeft), e.maxLeft), e.top = Math.min(Math.max(e.top, e.minTop), e.maxTop), e.oldLeft = e.left, e.oldTop = e.top, q(this.canvas, C({
      width: e.width,
      height: e.height
    }, pt({
      translateX: e.left,
      translateY: e.top
    }))), this.renderImage(t), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(t) {
    var i = this.canvasData, e = this.imageData, o = e.naturalWidth * (i.width / i.naturalWidth), a = e.naturalHeight * (i.height / i.naturalHeight);
    C(e, {
      width: o,
      height: a,
      left: (i.width - o) / 2,
      top: (i.height - a) / 2
    }), q(this.image, C({
      width: e.width,
      height: e.height
    }, pt(C({
      translateX: e.left,
      translateY: e.top
    }, e)))), t && this.output();
  },
  initCropBox: function() {
    var t = this.options, i = this.canvasData, e = t.aspectRatio || t.initialAspectRatio, o = Number(t.autoCropArea) || 0.8, a = {
      width: i.width,
      height: i.height
    };
    e && (i.height * e > i.width ? a.height = a.width / e : a.width = a.height * e), this.cropBoxData = a, this.limitCropBox(!0, !0), a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth), a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight), a.width = Math.max(a.minWidth, a.width * o), a.height = Math.max(a.minHeight, a.height * o), a.left = i.left + (i.width - a.width) / 2, a.top = i.top + (i.height - a.height) / 2, a.oldLeft = a.left, a.oldTop = a.top, this.initialCropBoxData = C({}, a);
  },
  limitCropBox: function(t, i) {
    var e = this.options, o = this.containerData, a = this.canvasData, n = this.cropBoxData, s = this.limited, p = e.aspectRatio;
    if (t) {
      var l = Number(e.minCropBoxWidth) || 0, h = Number(e.minCropBoxHeight) || 0, c = s ? Math.min(o.width, a.width, a.width + a.left, o.width - a.left) : o.width, f = s ? Math.min(o.height, a.height, a.height + a.top, o.height - a.top) : o.height;
      l = Math.min(l, o.width), h = Math.min(h, o.height), p && (l && h ? h * p > l ? h = l / p : l = h * p : l ? h = l / p : h && (l = h * p), f * p > c ? f = c / p : c = f * p), n.minWidth = Math.min(l, c), n.minHeight = Math.min(h, f), n.maxWidth = c, n.maxHeight = f;
    }
    i && (s ? (n.minLeft = Math.max(0, a.left), n.minTop = Math.max(0, a.top), n.maxLeft = Math.min(o.width, a.left + a.width) - n.width, n.maxTop = Math.min(o.height, a.top + a.height) - n.height) : (n.minLeft = 0, n.minTop = 0, n.maxLeft = o.width - n.width, n.maxTop = o.height - n.height));
  },
  renderCropBox: function() {
    var t = this.options, i = this.containerData, e = this.cropBoxData;
    (e.width > e.maxWidth || e.width < e.minWidth) && (e.left = e.oldLeft), (e.height > e.maxHeight || e.height < e.minHeight) && (e.top = e.oldTop), e.width = Math.min(Math.max(e.width, e.minWidth), e.maxWidth), e.height = Math.min(Math.max(e.height, e.minHeight), e.maxHeight), this.limitCropBox(!1, !0), e.left = Math.min(Math.max(e.left, e.minLeft), e.maxLeft), e.top = Math.min(Math.max(e.top, e.minTop), e.maxTop), e.oldLeft = e.left, e.oldTop = e.top, t.movable && t.cropBoxMovable && dt(this.face, ut, e.width >= i.width && e.height >= i.height ? ue : Ht), q(this.cropBox, C({
      width: e.width,
      height: e.height
    }, pt({
      translateX: e.left,
      translateY: e.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), at(this.element, Bt, this.getData());
  }
}, di = {
  initPreview: function() {
    var t = this.element, i = this.crossOrigin, e = this.options.preview, o = i ? this.crossOriginUrl : this.url, a = t.alt || "The image to preview", n = document.createElement("img");
    if (i && (n.crossOrigin = i), n.src = o, n.alt = a, this.viewBox.appendChild(n), this.viewBoxImage = n, !!e) {
      var s = e;
      typeof e == "string" ? s = t.ownerDocument.querySelectorAll(e) : e.querySelector && (s = [e]), this.previews = s, O(s, function(p) {
        var l = document.createElement("img");
        dt(p, wt, {
          width: p.offsetWidth,
          height: p.offsetHeight,
          html: p.innerHTML
        }), i && (l.crossOrigin = i), l.src = o, l.alt = a, l.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', p.innerHTML = "", p.appendChild(l);
      });
    }
  },
  resetPreview: function() {
    O(this.previews, function(t) {
      var i = zt(t, wt);
      q(t, {
        width: i.width,
        height: i.height
      }), t.innerHTML = i.html, ei(t, wt);
    });
  },
  preview: function() {
    var t = this.imageData, i = this.canvasData, e = this.cropBoxData, o = e.width, a = e.height, n = t.width, s = t.height, p = e.left - i.left - t.left, l = e.top - i.top - t.top;
    !this.cropped || this.disabled || (q(this.viewBoxImage, C({
      width: n,
      height: s
    }, pt(C({
      translateX: -p,
      translateY: -l
    }, t)))), O(this.previews, function(h) {
      var c = zt(h, wt), f = c.width, v = c.height, m = f, x = v, b = 1;
      o && (b = f / o, x = a * b), a && x > v && (b = v / a, m = o * b, x = v), q(h, {
        width: m,
        height: x
      }), q(h.getElementsByTagName("img")[0], C({
        width: n * b,
        height: s * b
      }, pt(C({
        translateX: -p * b,
        translateY: -l * b
      }, t))));
    }));
  }
}, gi = {
  bind: function() {
    var t = this.element, i = this.options, e = this.cropper;
    I(i.cropstart) && L(t, kt, i.cropstart), I(i.cropmove) && L(t, _t, i.cropmove), I(i.cropend) && L(t, It, i.cropend), I(i.crop) && L(t, Bt, i.crop), I(i.zoom) && L(t, Lt, i.zoom), L(e, Qt, this.onCropStart = this.cropStart.bind(this)), i.zoomable && i.zoomOnWheel && L(e, ae, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), i.toggleDragModeOnDblclick && L(e, Kt, this.onDblclick = this.dblclick.bind(this)), L(t.ownerDocument, Jt, this.onCropMove = this.cropMove.bind(this)), L(t.ownerDocument, te, this.onCropEnd = this.cropEnd.bind(this)), i.responsive && L(window, ie, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var t = this.element, i = this.options, e = this.cropper;
    I(i.cropstart) && P(t, kt, i.cropstart), I(i.cropmove) && P(t, _t, i.cropmove), I(i.cropend) && P(t, It, i.cropend), I(i.crop) && P(t, Bt, i.crop), I(i.zoom) && P(t, Lt, i.zoom), P(e, Qt, this.onCropStart), i.zoomable && i.zoomOnWheel && P(e, ae, this.onWheel, {
      passive: !1,
      capture: !0
    }), i.toggleDragModeOnDblclick && P(e, Kt, this.onDblclick), P(t.ownerDocument, Jt, this.onCropMove), P(t.ownerDocument, te, this.onCropEnd), i.responsive && P(window, ie, this.onResize);
  }
}, vi = {
  resize: function() {
    if (!this.disabled) {
      var t = this.options, i = this.container, e = this.containerData, o = i.offsetWidth / e.width, a = i.offsetHeight / e.height, n = Math.abs(o - 1) > Math.abs(a - 1) ? o : a;
      if (n !== 1) {
        var s, p;
        t.restore && (s = this.getCanvasData(), p = this.getCropBoxData()), this.render(), t.restore && (this.setCanvasData(O(s, function(l, h) {
          s[h] = l * n;
        })), this.setCropBoxData(O(p, function(l, h) {
          p[h] = l * n;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === ve || this.setDragMode(Je(this.dragBox, Rt) ? ge : Xt);
  },
  wheel: function(t) {
    var i = this, e = Number(this.options.wheelZoomRatio) || 0.1, o = 1;
    this.disabled || (t.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      i.wheeling = !1;
    }, 50), t.deltaY ? o = t.deltaY > 0 ? 1 : -1 : t.wheelDelta ? o = -t.wheelDelta / 120 : t.detail && (o = t.detail > 0 ? 1 : -1), this.zoom(-o * e, t)));
  },
  cropStart: function(t) {
    var i = t.buttons, e = t.button;
    if (!(this.disabled || (t.type === "mousedown" || t.type === "pointerdown" && t.pointerType === "mouse") && // No primary button (Usually the left button)
    (w(i) && i !== 1 || w(e) && e !== 0 || t.ctrlKey))) {
      var o = this.options, a = this.pointers, n;
      t.changedTouches ? O(t.changedTouches, function(s) {
        a[s.identifier] = bt(s);
      }) : a[t.pointerId || 0] = bt(t), Object.keys(a).length > 1 && o.zoomable && o.zoomOnTouch ? n = de : n = zt(t.target, ut), Ue.test(n) && at(this.element, kt, {
        originalEvent: t,
        action: n
      }) !== !1 && (t.preventDefault(), this.action = n, this.cropping = !1, n === pe && (this.cropping = !0, R(this.dragBox, yt)));
    }
  },
  cropMove: function(t) {
    var i = this.action;
    if (!(this.disabled || !i)) {
      var e = this.pointers;
      t.preventDefault(), at(this.element, _t, {
        originalEvent: t,
        action: i
      }) !== !1 && (t.changedTouches ? O(t.changedTouches, function(o) {
        C(e[o.identifier] || {}, bt(o, !0));
      }) : C(e[t.pointerId || 0] || {}, bt(t, !0)), this.change(t));
    }
  },
  cropEnd: function(t) {
    if (!this.disabled) {
      var i = this.action, e = this.pointers;
      t.changedTouches ? O(t.changedTouches, function(o) {
        delete e[o.identifier];
      }) : delete e[t.pointerId || 0], i && (t.preventDefault(), Object.keys(e).length || (this.action = ""), this.cropping && (this.cropping = !1, et(this.dragBox, yt, this.cropped && this.options.modal)), at(this.element, It, {
        originalEvent: t,
        action: i
      }));
    }
  }
}, mi = {
  change: function(t) {
    var i = this.options, e = this.canvasData, o = this.containerData, a = this.cropBoxData, n = this.pointers, s = this.action, p = i.aspectRatio, l = a.left, h = a.top, c = a.width, f = a.height, v = l + c, m = h + f, x = 0, b = 0, E = o.width, N = o.height, M = !0, Y;
    !p && t.shiftKey && (p = c && f ? c / f : 1), this.limited && (x = a.minLeft, b = a.minTop, E = x + Math.min(o.width, e.width, e.left + e.width), N = b + Math.min(o.height, e.height, e.top + e.height));
    var B = n[Object.keys(n)[0]], u = {
      x: B.endX - B.startX,
      y: B.endY - B.startY
    }, y = function(k) {
      switch (k) {
        case F:
          v + u.x > E && (u.x = E - v);
          break;
        case K:
          l + u.x < x && (u.x = x - l);
          break;
        case $:
          h + u.y < b && (u.y = b - h);
          break;
        case J:
          m + u.y > N && (u.y = N - m);
          break;
      }
    };
    switch (s) {
      case Ht:
        l += u.x, h += u.y;
        break;
      case F:
        if (u.x >= 0 && (v >= E || p && (h <= b || m >= N))) {
          M = !1;
          break;
        }
        y(F), c += u.x, c < 0 && (s = K, c = -c, l -= c), p && (f = c / p, h += (a.height - f) / 2);
        break;
      case $:
        if (u.y <= 0 && (h <= b || p && (l <= x || v >= E))) {
          M = !1;
          break;
        }
        y($), f -= u.y, h += u.y, f < 0 && (s = J, f = -f, h -= f), p && (c = f * p, l += (a.width - c) / 2);
        break;
      case K:
        if (u.x <= 0 && (l <= x || p && (h <= b || m >= N))) {
          M = !1;
          break;
        }
        y(K), c -= u.x, l += u.x, c < 0 && (s = F, c = -c, l -= c), p && (f = c / p, h += (a.height - f) / 2);
        break;
      case J:
        if (u.y >= 0 && (m >= N || p && (l <= x || v >= E))) {
          M = !1;
          break;
        }
        y(J), f += u.y, f < 0 && (s = $, f = -f, h -= f), p && (c = f * p, l += (a.width - c) / 2);
        break;
      case ht:
        if (p) {
          if (u.y <= 0 && (h <= b || v >= E)) {
            M = !1;
            break;
          }
          y($), f -= u.y, h += u.y, c = f * p;
        } else
          y($), y(F), u.x >= 0 ? v < E ? c += u.x : u.y <= 0 && h <= b && (M = !1) : c += u.x, u.y <= 0 ? h > b && (f -= u.y, h += u.y) : (f -= u.y, h += u.y);
        c < 0 && f < 0 ? (s = ft, f = -f, c = -c, h -= f, l -= c) : c < 0 ? (s = ct, c = -c, l -= c) : f < 0 && (s = lt, f = -f, h -= f);
        break;
      case ct:
        if (p) {
          if (u.y <= 0 && (h <= b || l <= x)) {
            M = !1;
            break;
          }
          y($), f -= u.y, h += u.y, c = f * p, l += a.width - c;
        } else
          y($), y(K), u.x <= 0 ? l > x ? (c -= u.x, l += u.x) : u.y <= 0 && h <= b && (M = !1) : (c -= u.x, l += u.x), u.y <= 0 ? h > b && (f -= u.y, h += u.y) : (f -= u.y, h += u.y);
        c < 0 && f < 0 ? (s = lt, f = -f, c = -c, h -= f, l -= c) : c < 0 ? (s = ht, c = -c, l -= c) : f < 0 && (s = ft, f = -f, h -= f);
        break;
      case ft:
        if (p) {
          if (u.x <= 0 && (l <= x || m >= N)) {
            M = !1;
            break;
          }
          y(K), c -= u.x, l += u.x, f = c / p;
        } else
          y(J), y(K), u.x <= 0 ? l > x ? (c -= u.x, l += u.x) : u.y >= 0 && m >= N && (M = !1) : (c -= u.x, l += u.x), u.y >= 0 ? m < N && (f += u.y) : f += u.y;
        c < 0 && f < 0 ? (s = ht, f = -f, c = -c, h -= f, l -= c) : c < 0 ? (s = lt, c = -c, l -= c) : f < 0 && (s = ct, f = -f, h -= f);
        break;
      case lt:
        if (p) {
          if (u.x >= 0 && (v >= E || m >= N)) {
            M = !1;
            break;
          }
          y(F), c += u.x, f = c / p;
        } else
          y(J), y(F), u.x >= 0 ? v < E ? c += u.x : u.y >= 0 && m >= N && (M = !1) : c += u.x, u.y >= 0 ? m < N && (f += u.y) : f += u.y;
        c < 0 && f < 0 ? (s = ct, f = -f, c = -c, h -= f, l -= c) : c < 0 ? (s = ft, c = -c, l -= c) : f < 0 && (s = ht, f = -f, h -= f);
        break;
      case ue:
        this.move(u.x, u.y), M = !1;
        break;
      case de:
        this.zoom(ai(n), t), M = !1;
        break;
      case pe:
        if (!u.x || !u.y) {
          M = !1;
          break;
        }
        Y = De(this.cropper), l = B.startX - Y.left, h = B.startY - Y.top, c = a.minWidth, f = a.minHeight, u.x > 0 ? s = u.y > 0 ? lt : ht : u.x < 0 && (l -= c, s = u.y > 0 ? ft : ct), u.y < 0 && (h -= f), this.cropped || (X(this.cropBox, _), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    M && (a.width = c, a.height = f, a.left = l, a.top = h, this.action = s, this.renderCropBox()), O(n, function(T) {
      T.startX = T.endX, T.startY = T.endY;
    });
  }
}, wi = {
  // Show the crop box manually
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && R(this.dragBox, yt), X(this.cropBox, _), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  // Reset the image and crop box to their initial states
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = C({}, this.initialImageData), this.canvasData = C({}, this.initialCanvasData), this.cropBoxData = C({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  // Clear the crop box
  clear: function() {
    return this.cropped && !this.disabled && (C(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), X(this.dragBox, yt), R(this.cropBox, _)), this;
  },
  /**
   * Replace the image's src and rebuild the cropper
   * @param {string} url - The new URL.
   * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
   * @returns {Cropper} this
   */
  replace: function(t) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && t && (this.isImg && (this.element.src = t), i ? (this.url = t, this.image.src = t, this.ready && (this.viewBoxImage.src = t, O(this.previews, function(e) {
      e.getElementsByTagName("img")[0].src = t;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(t))), this;
  },
  // Enable (unfreeze) the cropper
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, X(this.cropper, Zt)), this;
  },
  // Disable (freeze) the cropper
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, R(this.cropper, Zt)), this;
  },
  /**
   * Destroy the cropper and remove the instance from the image
   * @returns {Cropper} this
   */
  destroy: function() {
    var t = this.element;
    return t[D] ? (t[D] = void 0, this.isImg && this.replaced && (t.src = this.originalUrl), this.uncreate(), this) : this;
  },
  /**
   * Move the canvas with relative offsets
   * @param {number} offsetX - The relative offset distance on the x-axis.
   * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
   * @returns {Cropper} this
   */
  move: function(t) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t, e = this.canvasData, o = e.left, a = e.top;
    return this.moveTo(Tt(t) ? t : o + Number(t), Tt(i) ? i : a + Number(i));
  },
  /**
   * Move the canvas to an absolute point
   * @param {number} x - The x-axis coordinate.
   * @param {number} [y=x] - The y-axis coordinate.
   * @returns {Cropper} this
   */
  moveTo: function(t) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t, e = this.canvasData, o = !1;
    return t = Number(t), i = Number(i), this.ready && !this.disabled && this.options.movable && (w(t) && (e.left = t, o = !0), w(i) && (e.top = i, o = !0), o && this.renderCanvas(!0)), this;
  },
  /**
   * Zoom the canvas with a relative ratio
   * @param {number} ratio - The target ratio.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoom: function(t, i) {
    var e = this.canvasData;
    return t = Number(t), t < 0 ? t = 1 / (1 - t) : t = 1 + t, this.zoomTo(e.width * t / e.naturalWidth, null, i);
  },
  /**
   * Zoom the canvas to an absolute ratio
   * @param {number} ratio - The target ratio.
   * @param {Object} pivot - The zoom pivot point coordinate.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoomTo: function(t, i, e) {
    var o = this.options, a = this.canvasData, n = a.width, s = a.height, p = a.naturalWidth, l = a.naturalHeight;
    if (t = Number(t), t >= 0 && this.ready && !this.disabled && o.zoomable) {
      var h = p * t, c = l * t;
      if (at(this.element, Lt, {
        ratio: t,
        oldRatio: n / p,
        originalEvent: e
      }) === !1)
        return this;
      if (e) {
        var f = this.pointers, v = De(this.cropper), m = f && Object.keys(f).length ? ri(f) : {
          pageX: e.pageX,
          pageY: e.pageY
        };
        a.left -= (h - n) * ((m.pageX - v.left - a.left) / n), a.top -= (c - s) * ((m.pageY - v.top - a.top) / s);
      } else tt(i) && w(i.x) && w(i.y) ? (a.left -= (h - n) * ((i.x - a.left) / n), a.top -= (c - s) * ((i.y - a.top) / s)) : (a.left -= (h - n) / 2, a.top -= (c - s) / 2);
      a.width = h, a.height = c, this.renderCanvas(!0);
    }
    return this;
  },
  /**
   * Rotate the canvas with a relative degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotate: function(t) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(t));
  },
  /**
   * Rotate the canvas to an absolute degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotateTo: function(t) {
    return t = Number(t), w(t) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = t % 360, this.renderCanvas(!0, !0)), this;
  },
  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @returns {Cropper} this
   */
  scaleX: function(t) {
    var i = this.imageData.scaleY;
    return this.scale(t, w(i) ? i : 1);
  },
  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scaleY: function(t) {
    var i = this.imageData.scaleX;
    return this.scale(w(i) ? i : 1, t);
  },
  /**
   * Scale the image
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scale: function(t) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t, e = this.imageData, o = !1;
    return t = Number(t), i = Number(i), this.ready && !this.disabled && this.options.scalable && (w(t) && (e.scaleX = t, o = !0), w(i) && (e.scaleY = i, o = !0), o && this.renderCanvas(!0, !0)), this;
  },
  /**
   * Get the cropped area position and size data (base on the original image)
   * @param {boolean} [rounded=false] - Indicate if round the data values or not.
   * @returns {Object} The result cropped data.
   */
  getData: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = this.options, e = this.imageData, o = this.canvasData, a = this.cropBoxData, n;
    if (this.ready && this.cropped) {
      n = {
        x: a.left - o.left,
        y: a.top - o.top,
        width: a.width,
        height: a.height
      };
      var s = e.width / e.naturalWidth;
      if (O(n, function(h, c) {
        n[c] = h / s;
      }), t) {
        var p = Math.round(n.y + n.height), l = Math.round(n.x + n.width);
        n.x = Math.round(n.x), n.y = Math.round(n.y), n.width = l - n.x, n.height = p - n.y;
      }
    } else
      n = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return i.rotatable && (n.rotate = e.rotate || 0), i.scalable && (n.scaleX = e.scaleX || 1, n.scaleY = e.scaleY || 1), n;
  },
  /**
   * Set the cropped area position and size with new data
   * @param {Object} data - The new data.
   * @returns {Cropper} this
   */
  setData: function(t) {
    var i = this.options, e = this.imageData, o = this.canvasData, a = {};
    if (this.ready && !this.disabled && tt(t)) {
      var n = !1;
      i.rotatable && w(t.rotate) && t.rotate !== e.rotate && (e.rotate = t.rotate, n = !0), i.scalable && (w(t.scaleX) && t.scaleX !== e.scaleX && (e.scaleX = t.scaleX, n = !0), w(t.scaleY) && t.scaleY !== e.scaleY && (e.scaleY = t.scaleY, n = !0)), n && this.renderCanvas(!0, !0);
      var s = e.width / e.naturalWidth;
      w(t.x) && (a.left = t.x * s + o.left), w(t.y) && (a.top = t.y * s + o.top), w(t.width) && (a.width = t.width * s), w(t.height) && (a.height = t.height * s), this.setCropBoxData(a);
    }
    return this;
  },
  /**
   * Get the container size data.
   * @returns {Object} The result container data.
   */
  getContainerData: function() {
    return this.ready ? C({}, this.containerData) : {};
  },
  /**
   * Get the image position and size data.
   * @returns {Object} The result image data.
   */
  getImageData: function() {
    return this.sized ? C({}, this.imageData) : {};
  },
  /**
   * Get the canvas position and size data.
   * @returns {Object} The result canvas data.
   */
  getCanvasData: function() {
    var t = this.canvasData, i = {};
    return this.ready && O(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(e) {
      i[e] = t[e];
    }), i;
  },
  /**
   * Set the canvas position and size with new data.
   * @param {Object} data - The new canvas data.
   * @returns {Cropper} this
   */
  setCanvasData: function(t) {
    var i = this.canvasData, e = i.aspectRatio;
    return this.ready && !this.disabled && tt(t) && (w(t.left) && (i.left = t.left), w(t.top) && (i.top = t.top), w(t.width) ? (i.width = t.width, i.height = t.width / e) : w(t.height) && (i.height = t.height, i.width = t.height * e), this.renderCanvas(!0)), this;
  },
  /**
   * Get the crop box position and size data.
   * @returns {Object} The result crop box data.
   */
  getCropBoxData: function() {
    var t = this.cropBoxData, i;
    return this.ready && this.cropped && (i = {
      left: t.left,
      top: t.top,
      width: t.width,
      height: t.height
    }), i || {};
  },
  /**
   * Set the crop box position and size with new data.
   * @param {Object} data - The new crop box data.
   * @returns {Cropper} this
   */
  setCropBoxData: function(t) {
    var i = this.cropBoxData, e = this.options.aspectRatio, o, a;
    return this.ready && this.cropped && !this.disabled && tt(t) && (w(t.left) && (i.left = t.left), w(t.top) && (i.top = t.top), w(t.width) && t.width !== i.width && (o = !0, i.width = t.width), w(t.height) && t.height !== i.height && (a = !0, i.height = t.height), e && (o ? i.height = i.width / e : a && (i.width = i.height * e)), this.renderCropBox()), this;
  },
  /**
   * Get a canvas drawn the cropped image.
   * @param {Object} [options={}] - The config options.
   * @returns {HTMLCanvasElement} - The result canvas.
   */
  getCroppedCanvas: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var i = this.canvasData, e = ni(this.image, this.imageData, i, t);
    if (!this.cropped)
      return e;
    var o = this.getData(t.rounded), a = o.x, n = o.y, s = o.width, p = o.height, l = e.width / Math.floor(i.naturalWidth);
    l !== 1 && (a *= l, n *= l, s *= l, p *= l);
    var h = s / p, c = Z({
      aspectRatio: h,
      width: t.maxWidth || 1 / 0,
      height: t.maxHeight || 1 / 0
    }), f = Z({
      aspectRatio: h,
      width: t.minWidth || 0,
      height: t.minHeight || 0
    }, "cover"), v = Z({
      aspectRatio: h,
      width: t.width || (l !== 1 ? e.width : s),
      height: t.height || (l !== 1 ? e.height : p)
    }), m = v.width, x = v.height;
    m = Math.min(c.width, Math.max(f.width, m)), x = Math.min(c.height, Math.max(f.height, x));
    var b = document.createElement("canvas"), E = b.getContext("2d");
    b.width = it(m), b.height = it(x), E.fillStyle = t.fillColor || "transparent", E.fillRect(0, 0, m, x);
    var N = t.imageSmoothingEnabled, M = N === void 0 ? !0 : N, Y = t.imageSmoothingQuality;
    E.imageSmoothingEnabled = M, Y && (E.imageSmoothingQuality = Y);
    var B = e.width, u = e.height, y = a, T = n, k, H, j, V, U, z;
    y <= -s || y > B ? (y = 0, k = 0, j = 0, U = 0) : y <= 0 ? (j = -y, y = 0, k = Math.min(B, s + y), U = k) : y <= B && (j = 0, k = Math.min(s, B - y), U = k), k <= 0 || T <= -p || T > u ? (T = 0, H = 0, V = 0, z = 0) : T <= 0 ? (V = -T, T = 0, H = Math.min(u, p + T), z = H) : T <= u && (V = 0, H = Math.min(p, u - T), z = H);
    var S = [y, T, k, H];
    if (U > 0 && z > 0) {
      var G = m / s;
      S.push(j * G, V * G, U * G, z * G);
    }
    return E.drawImage.apply(E, [e].concat(fe(S.map(function(rt) {
      return Math.floor(it(rt));
    })))), b;
  },
  /**
   * Change the aspect ratio of the crop box.
   * @param {number} aspectRatio - The new aspect ratio.
   * @returns {Cropper} this
   */
  setAspectRatio: function(t) {
    var i = this.options;
    return !this.disabled && !Tt(t) && (i.aspectRatio = Math.max(0, t) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  /**
   * Change the drag mode.
   * @param {string} mode - The new drag mode.
   * @returns {Cropper} this
   */
  setDragMode: function(t) {
    var i = this.options, e = this.dragBox, o = this.face;
    if (this.ready && !this.disabled) {
      var a = t === Xt, n = i.movable && t === ge;
      t = a || n ? t : ve, i.dragMode = t, dt(e, ut, t), et(e, Rt, a), et(e, St, n), i.cropBoxMovable || (dt(o, ut, t), et(o, Rt, a), et(o, St, n));
    }
    return this;
  }
}, bi = W.Cropper, Me = /* @__PURE__ */ function() {
  function r(t) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Be(this, r), !t || !Ge.test(t.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = t, this.options = C({}, oe, tt(i) && i), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return Ie(r, [{
    key: "init",
    value: function() {
      var i = this.element, e = i.tagName.toLowerCase(), o;
      if (!i[D]) {
        if (i[D] = this, e === "img") {
          if (this.isImg = !0, o = i.getAttribute("src") || "", this.originalUrl = o, !o)
            return;
          o = i.src;
        } else e === "canvas" && window.HTMLCanvasElement && (o = i.toDataURL());
        this.load(o);
      }
    }
  }, {
    key: "load",
    value: function(i) {
      var e = this;
      if (i) {
        this.url = i, this.imageData = {};
        var o = this.element, a = this.options;
        if (!a.rotatable && !a.scalable && (a.checkOrientation = !1), !a.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (je.test(i)) {
          Ve.test(i) ? this.read(ci(i)) : this.clone();
          return;
        }
        var n = new XMLHttpRequest(), s = this.clone.bind(this);
        this.reloading = !0, this.xhr = n, n.onabort = s, n.onerror = s, n.ontimeout = s, n.onprogress = function() {
          n.getResponseHeader("content-type") !== re && n.abort();
        }, n.onload = function() {
          e.read(n.response);
        }, n.onloadend = function() {
          e.reloading = !1, e.xhr = null;
        }, a.checkCrossOrigin && se(i) && o.crossOrigin && (i = he(i)), n.open("GET", i, !0), n.responseType = "arraybuffer", n.withCredentials = o.crossOrigin === "use-credentials", n.send();
      }
    }
  }, {
    key: "read",
    value: function(i) {
      var e = this.options, o = this.imageData, a = fi(i), n = 0, s = 1, p = 1;
      if (a > 1) {
        this.url = li(i, re);
        var l = pi(a);
        n = l.rotate, s = l.scaleX, p = l.scaleY;
      }
      e.rotatable && (o.rotate = n), e.scalable && (o.scaleX = s, o.scaleY = p), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var i = this.element, e = this.url, o = i.crossOrigin, a = e;
      this.options.checkCrossOrigin && se(e) && (o || (o = "anonymous"), a = he(e)), this.crossOrigin = o, this.crossOriginUrl = a;
      var n = document.createElement("img");
      o && (n.crossOrigin = o), n.src = a || e, n.alt = i.alt || "The image to crop", this.image = n, n.onload = this.start.bind(this), n.onerror = this.stop.bind(this), R(n, Ft), i.parentNode.insertBefore(n, i.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var i = this, e = this.image;
      e.onload = null, e.onerror = null, this.sizing = !0;
      var o = W.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(W.navigator.userAgent), a = function(l, h) {
        C(i.imageData, {
          naturalWidth: l,
          naturalHeight: h,
          aspectRatio: l / h
        }), i.initialImageData = C({}, i.imageData), i.sizing = !1, i.sized = !0, i.build();
      };
      if (e.naturalWidth && !o) {
        a(e.naturalWidth, e.naturalHeight);
        return;
      }
      var n = document.createElement("img"), s = document.body || document.documentElement;
      this.sizingImage = n, n.onload = function() {
        a(n.width, n.height), o || s.removeChild(n);
      }, n.src = e.src, o || (n.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", s.appendChild(n));
    }
  }, {
    key: "stop",
    value: function() {
      var i = this.image;
      i.onload = null, i.onerror = null, i.parentNode.removeChild(i), this.image = null;
    }
  }, {
    key: "build",
    value: function() {
      if (!(!this.sized || this.ready)) {
        var i = this.element, e = this.options, o = this.image, a = i.parentNode, n = document.createElement("div");
        n.innerHTML = $e;
        var s = n.querySelector(".".concat(D, "-container")), p = s.querySelector(".".concat(D, "-canvas")), l = s.querySelector(".".concat(D, "-drag-box")), h = s.querySelector(".".concat(D, "-crop-box")), c = h.querySelector(".".concat(D, "-face"));
        this.container = a, this.cropper = s, this.canvas = p, this.dragBox = l, this.cropBox = h, this.viewBox = s.querySelector(".".concat(D, "-view-box")), this.face = c, p.appendChild(o), R(i, _), a.insertBefore(s, i.nextSibling), X(o, Ft), this.initPreview(), this.bind(), e.initialAspectRatio = Math.max(0, e.initialAspectRatio) || NaN, e.aspectRatio = Math.max(0, e.aspectRatio) || NaN, e.viewMode = Math.max(0, Math.min(3, Math.round(e.viewMode))) || 0, R(h, _), e.guides || R(h.getElementsByClassName("".concat(D, "-dashed")), _), e.center || R(h.getElementsByClassName("".concat(D, "-center")), _), e.background && R(s, "".concat(D, "-bg")), e.highlight || R(c, Ye), e.cropBoxMovable && (R(c, St), dt(c, ut, Ht)), e.cropBoxResizable || (R(h.getElementsByClassName("".concat(D, "-line")), _), R(h.getElementsByClassName("".concat(D, "-point")), _)), this.render(), this.ready = !0, this.setDragMode(e.dragMode), e.autoCrop && this.crop(), this.setData(e.data), I(e.ready) && L(i, ee, e.ready, {
          once: !0
        }), at(i, ee);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      if (this.ready) {
        this.ready = !1, this.unbind(), this.resetPreview();
        var i = this.cropper.parentNode;
        i && i.removeChild(this.cropper), X(this.element, _);
      }
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
    /**
     * Get the no conflict cropper class.
     * @returns {Cropper} The cropper class.
     */
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = bi, r;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
  }, {
    key: "setDefaults",
    value: function(i) {
      C(oe, tt(i) && i);
    }
  }]);
}();
C(Me.prototype, ui, di, gi, vi, mi, wi);
const yi = ["src", "alt"], xi = {
  key: 0,
  role: "status",
  class: "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
}, Di = /* @__PURE__ */ Ee({
  __name: "index",
  props: {
    src: {},
    alt: {},
    imgStyle: { type: [Boolean, null, String, Object, Array] },
    cropBoxResizable: { type: Boolean },
    canvasWidth: {},
    canvasHeight: {},
    cropBoxWidth: {},
    cropBoxHeight: {}
  },
  emits: ["cropstart", "cropmove", "cropend", "preview", "ready"],
  setup(r, { expose: t, emit: i }) {
    const e = r, o = i, a = mt(null), n = mt(), s = mt(), p = mt(), l = (d, g) => {
      var ot, nt;
      return (nt = (ot = a.value) == null ? void 0 : ot.getCroppedCanvas()) == null ? void 0 : nt.toDataURL(d, g);
    }, h = (d) => {
      var g;
      return (g = s.value) == null ? void 0 : g.getAttribute(d);
    }, c = (d, g) => {
      var A;
      return (A = s.value) == null ? void 0 : A.setAttribute(d, g);
    }, f = (d) => {
      var ot, nt, Ut, jt;
      const g = {
        width: d.canvasWidth || ((ot = s.value) == null ? void 0 : ot.clientWidth) || 500,
        // Resize canvas width
        height: d.canvasHeight || ((nt = s.value) == null ? void 0 : nt.clientHeight) || 500,
        // Resize canvas height
        left: 0,
        top: 0
      }, A = {
        width: d.cropBoxWidth || 200,
        // Set the width of the crop box
        height: d.cropBoxHeight || 200
        // Set the height of the crop box
      };
      (Ut = a.value) == null || Ut.setCropBoxData({
        ...A,
        left: (g.width - A.width) / 2,
        top: (g.height - A.height) / 2
      }), (jt = a.value) == null || jt.setCanvasData(g);
    }, v = (d) => {
      if (!n.value)
        throw "not element";
      a.value = new Me(n.value, {
        //...props,
        rotatable: !0,
        zoomable: !0,
        scalable: !0,
        center: !0,
        cropBoxResizable: d.cropBoxResizable,
        toggleDragModeOnDblclick: !0,
        autoCrop: !0,
        //autoCropArea: 0.8,
        dragMode: "crop",
        //preview: preview.value,
        responsive: !1,
        //modal: false,
        background: !0,
        //aspectRatio: props.aspectRatio || 1, // For square cropping
        viewMode: 0,
        cropstart() {
          o("cropstart", this.cropper);
        },
        cropmove() {
          o("cropmove", this.cropper), o("preview", l());
        },
        cropend: () => o("cropend", l()),
        //crop: () => getDataCroppedImage('preview'),
        ready() {
          var g;
          f(d), (g = a.value) == null || g.crop(), o("ready", this.cropper), o("preview", l()), p.value = !1;
        }
      });
    };
    return t({
      getAttribute: h,
      setAttribute: c,
      reset: () => {
        var d;
        (d = a.value) == null || d.reset(), f(e), o("preview", l());
      },
      clear: () => {
        var d;
        return (d = a.value) == null ? void 0 : d.clear();
      },
      replace: (d, g = !1) => {
        var A;
        p.value = !0, (A = a.value) == null || A.replace(d, g);
      },
      enable: () => {
        var d;
        return (d = a.value) == null ? void 0 : d.enable();
      },
      disable: () => {
        var d;
        return (d = a.value) == null ? void 0 : d.disable();
      },
      destroy: () => {
        var d;
        return (d = a.value) == null ? void 0 : d.destroy();
      },
      move: (d, g) => {
        var A;
        return (A = a.value) == null ? void 0 : A.move(d, g);
      },
      moveTo: (d, g = d) => {
        var A;
        return (A = a.value) == null ? void 0 : A.moveTo(d, g);
      },
      zoom: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.zoom(d);
      },
      zoomTo: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.zoomTo(d);
      },
      scale: (d, g = d) => {
        var A;
        return (A = a.value) == null ? void 0 : A.scale(d, g);
      },
      scaleX: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.scaleX(d);
      },
      scaleY: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.scaleY(d);
      },
      rotate: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.rotate(d);
      },
      rotateTo: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.rotateTo(d);
      },
      getData: (d = !1) => {
        var g;
        return (g = a.value) == null ? void 0 : g.getData(d);
      },
      setData: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.setData(d);
      },
      getContainerData: () => {
        var d;
        return (d = a.value) == null ? void 0 : d.getContainerData();
      },
      getImageData: () => {
        var d;
        return (d = a.value) == null ? void 0 : d.getImageData();
      },
      getCanvasData: () => {
        var d;
        return (d = a.value) == null ? void 0 : d.getCanvasData();
      },
      setCanvasData: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.setCanvasData(d);
      },
      getCropBoxData: () => {
        var d;
        return (d = a.value) == null ? void 0 : d.getCropBoxData();
      },
      setCropBoxData: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.setCropBoxData(d);
      },
      getCroppedCanvas: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.getCroppedCanvas(d);
      },
      setAspectRatio: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.setAspectRatio(d);
      },
      setDragMode: (d) => {
        var g;
        return (g = a.value) == null ? void 0 : g.setDragMode(d);
      }
    }), Te(() => e, (d) => {
      v(d);
    }), Oe(() => {
      a.value && (a.value.destroy(), a.value = null);
    }), Ne(() => {
      n.value && v(e);
    }), (d, g) => (Vt(), Gt("div", {
      ref_key: "cropper",
      ref: s,
      class: "h-full w-full relative"
    }, [
      st("img", {
        class: "object-cover object-center h-full w-fulll invisible",
        ref_key: "imageElement",
        ref: n,
        src: d.src,
        alt: d.alt,
        style: Ae(d.imgStyle)
      }, null, 12, yi),
      p.value ? (Vt(), Gt("div", xi, g[0] || (g[0] = [
        st("svg", {
          "aria-hidden": "true",
          class: "w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400",
          viewBox: "0 0 100 101",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          st("path", {
            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
            fill: "currentColor"
          }),
          st("path", {
            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
            fill: "currentFill"
          })
        ], -1),
        st("span", { class: "sr-only" }, "Loading...", -1)
      ]))) : Re("", !0)
    ], 512));
  }
}), Ci = (r, t) => {
  const i = r.__vccOpts || r;
  for (const [e, o] of t)
    i[e] = o;
  return i;
}, Ei = /* @__PURE__ */ Ci(Di, [["__scopeId", "data-v-04f96428"]]);
export {
  Ei as VueCropper
};
