/**
 * @name Celestra
 * @version 3.8.0
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */
(function(window, document){
"use strict";

/*-----------------+------+----------------------------------
  Function         |   #  |  Internal calls
-------------------+------+----------------------------------
  CTRL-F           |   N  |  getType()
  importScripts()  |   2  |  importScript(), importScript()
  importStyles()   |   2  |  importStyle(), importStyle()
  domFadeToggle()  |   2  |  domFadeIn(), domFadeOut()
  arrayMerge()     |   1  |  arrayMerge()
  extend()         |   1  |  extend()
  forIn()          |   1  |  hasOwn()
  deepAssign()     |   1  |  deepAssign()
  getJson()        |   1  |  ajax()
  getText()        |   1  |  ajax()
  clearCookies()   |   2  |  getCookie(), removeCookie()
-------------------+------+--------------------------------*/

/* polyfills */

if (!Object.hasOwn) {
  Object.defineProperty(Object, "hasOwn", {
    value: function (object, property) {
      if (object == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      return Object.prototype.hasOwnProperty.call(Object(object), property);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
}

if (!String.prototype.trimStart) {
  String.prototype.trimStart = function () { return this.replace(/^\s+/, ""); };
}
if (!String.prototype.trimLeft) {
  String.prototype.trimLeft = function () { return this.replace(/^\s+/, ""); };
}

if (!String.prototype.trimEnd) {
  String.prototype.trimEnd = function () { return this.replace(/\s+$/, ""); };
}
if (!String.prototype.trimRight) {
  String.prototype.trimRight = function () { return this.replace(/\s+$/, ""); };
}

if (!String.prototype.padStart) {
  String.prototype.padStart = function (len, str) {
    len = Math.floor(Number(len));
    if (len <= this.length || len === NaN ) {
      return String(this);
    } else {
      str = String(typeof str !== "undefined" ? str: " ");
      if (str.length === 0) { return String(this); }
      var res = "", n = Math.floor( (len - this.length) / str.length)+1;
      for (var i = 0; i < n; i++) { res += str; }
      return res.slice(0, len - this.length) + String(this);
    }
  };
}

if (!String.prototype.padEnd) {
  String.prototype.padEnd = function (len, str) {
    len =  Math.floor(Number(len));
    if (len <= this.length || len === NaN ) {
      return String(this);
    } else {
      str = String(typeof str !== "undefined" ? str: " ");
      if (str.length === 0) { return String(this); }
      var res = "", n = Math.floor( (len - this.length) / str.length)+1;
      for (var i = 0; i < n; i++) { res += str; }
      return String(this) + res.slice(0, len - this.length);
    }
  };
}

if (!("replaceAll" in String.prototype)) {
  Object.defineProperty(String.prototype, "replaceAll", {
    "configurable": true,
    "writable": true,
    "enumerable": false,
    "value": function (searchValue, replaceValue) {
      "use strict";
      if (this == null) {
        throw new TypeError("String.prototype.replaceAll requires |this| not to be null nor undefined");
      }
      if (Object.prototype.toString.call(searchValue)
        .replace(/^\[object (.+)\]$/, "$1").toLowerCase() === "regexp") {
        if (!searchValue.global) {
          throw new TypeError("String.prototype.replaceAll must be called with a global RegExp");
        }
        return String(this).replace(searchValue, replaceValue);
      }
      return String(this).split(String(searchValue)).join(replaceValue);
    }
  });
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    if (depth === undefined) {
      depth = 1;
    } else {
      depth = Math.floor(Number(depth));
      if (isNaN(depth) || depth < 1) { return this; }
    }
    function deepFlat (a, cd) {
      a.forEach(function(e) {
        if (Array.isArray(e)) {
          if (cd < depth) { deepFlat(e, cd+1); } else { res.push(e); }
        } else {
          res.push(e);
        }
      });
    }
    var res = [];
    deepFlat(this, 0);
    return res;
  };
}

if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function (fn) {
    var res = [];
    this.map(fn).forEach(function (e) {
      if (Array.isArray(e)) { res = res.concat(e); } else { res.push(e); }
    });
    return res;
  };
}

if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    var r = {};
    for (let e of entries) { r[e[0]] = e[1]; }
    return r;
  };
}

/* https://github.com/tc39/proposal-global */
(function (global) {
  if (!global.globalThis) {
    if (Object.defineProperty) {
      Object.defineProperty(global, "globalThis", {
        configurable: true, enumerable: false, value: global, writable: true
      });
    } else {
      global.globalThis = global;
    }
  }
})(typeof this === "object" ? this : Function("return this")());

if (!window.GeneratorFunction) {
  window.GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
}

if (!window.AsyncFunction) {
  window.AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
}

if (!String.prototype.matchAll) {
  String.prototype.matchAll = function* (regex) {
    function ef (fls, fl) { return (fls.includes(fl) ? fls : fls + fl); }
    const lc = new RegExp(regex, ef(regex.flags, "g"));
    let match;
    while (match = lc.exec(this)) { yield match; }
  };
}

if (window.BigInt && !BigInt.prototype.toJSON) {
  BigInt.prototype.toJSON = function () { return this.toString(); };
}

/* core api */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function randomInt (i = 100, a) {
  if (a === undefined) { a = i; i = 0; }
  return Math.floor(Math.random() * (a - i + 1)) + i;
}

function randomFloat (i = 100, a) {
  if (a === undefined) { a = i; i = 0; }
  var r = (Math.random() * (a - i + 1)) + i;
  return r > a ? a : r;
}

function randomString (pl = 100, sc = false) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (sc) { chars += ",?,.:-_*$ß¤Łł÷×¸¨˝´˙`˛°˘^ˇ~§'+!%/=()[]#<>&@{}\"\\/| éáűőúöüóíÉÁŰŐÚÖÜÓÍß"; }
  var s = "", l = chars.length;
  for (var i = 0; i < pl; i++) { s += chars[Math.floor(Math.random()*l)]; }
  return s;
}

function b64Encode (str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (match, p1) { return String.fromCharCode("0x" + p1); }
  ));
}

function b64Decode (str) {
  return decodeURIComponent(atob(str).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}

function javaHash (s, hx) {
  if (s !== undefined) { s = "" + s; } else { return 0; }
  var h = 0, l = s.length, c = "";
  if (l == 0) { return h; }
  for (var i = 0; i < l; i++) {
    c = s.charCodeAt(i);
    h = ((h<<5) - h) + c;
    h = h & h;
  }
  if (hx) { return h.toString(16); }
  return h;
}

function inherit (c, p) {
  c.prototype = Object.create(p.prototype);
  c.prototype.constructor = c;
  return c;
}

const getUrlVars = (str = location.search) =>
  [...new URLSearchParams(str).entries()]
    .reduce(function (o, item) { o[item[0]] = item[1]; return o; }, {});

function obj2string (o) {
  var s = "";
  for (var p in o) {
    if (o.hasOwnProperty(p)) {
      s += encodeURIComponent(p) + "=" + encodeURIComponent(o[p]) + "&";
    }
  }
  return s.substring(0, s.length-1);
}

function getType (v, t) {
  var ot = Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  return (arguments.length === 2 ? ot === t.toLowerCase() : ot);
}

function extend () {
  var so = {};
  if (typeof arguments[0] === "boolean") {
    var t = arguments[1], d = arguments[0], s = 2;
  } else {
    var t = arguments[0], d = false, s = 1;
  }
  for (var i = s, l = arguments.length; i < l; i++) {
    so = arguments[i];
    if (so !== null && so !== undefined) {
      for (var a in so) {
        if (so.hasOwnProperty(a)) {
          if (typeof so[a] === "object" && d) {
            t[a] = celestra.extend(true, {}, so[a]);
          } else { t[a] = so[a]; }
        }
      }
    }
  }
  return t;
}

function deepAssign () {
  var s = {}, t = arguments[0];
  for (var i = 1, l = arguments.length; i < l; i++) {
    s = arguments[i];
    if (s !== null && s !== undefined) {
      for (var a in s) {
        if (s.hasOwnProperty(a)) {
          if (typeof s[a] === "object") {
            t[a] = celestra.deepAssign({}, s[a]);
          } else { t[a] = s[a]; }
        }
      }
    }
  }
  return t;
}

const strRemoveTags = (s) =>
  String(s).replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();

const strReverse = (s) => Array.from(String(s)).reverse().join("");

const strReplaceAll = (s, sv, rv) => String(s).split(String(sv)).join(rv);

const strCodePoints = (s) => Array.from(String(s), (v) => v.codePointAt(0) );

const strFromCodePoints = ([...a]) => String.fromCodePoint.apply(null, a);

function strAt (s, p) {
  let i = 0;
  for (let item of String(s)) {
    if (i++ === p) { return item; }
  }
  return "";
}

function forIn (o, fn) {
  for (var p in o) {
    if (celestra.hasOwn(o, p)) { fn(o[p], p, o); }
  }
  return o;
}

const toFunction = (fn) => Function.prototype.call.bind(fn);

const bind = Function.prototype.call.bind(Function.prototype.bind);

const hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

const constant = (v) => () => v;
const identity = (v) => v;
const noop = () => undefined;

const T = () => true;
const F = () => false;

function assert (c, m = "") {
  if (!c) { throw new Error("[assert] " + m); }
  return true;
}
function assertLog (c, m = "") {
  if (!c) { console.log("[assertLog] " + m); }
  return true;
}
function assertAlert (c, m = "") {
  if (!c) { alert("[assertAlert] " + m); }
  return true;
}

/* DOM */

const qsa = (s, c = document) => Array.from(c.querySelectorAll(s));

const qs = (s, c = document) => c.querySelector(s);

function domReady (fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", function (event) { fn(); });
  }
}

function domCreate (t, ps, iH) {
  if (arguments.length === 1 && typeof t === "object") {
    var obj = t;
    t = obj.elementType;
    ps = {};
    for (var p in obj) {
      if (p !== "elementType") { ps[p] = obj[p]; }
    }
  }
  var el = document.createElement(t);
  if (ps) {
    for (var p in ps) {
      if (p !== "style" || typeof ps[p] === "string") {
        el[p] = ps[p];
      } else {
        for (var s in ps[p]) { el.style[s] = ps[p][s]; }
      }
    }
  }
  if (iH) { el.innerHTML = iH; }
  return el;
}

function domToElement (s) {
  var e = document.createElement("div");
  e.innerHTML = s;
  return e.firstElementChild;
}

const domGetCSS = (e, p) =>
  (p ? window.getComputedStyle(e, null)[p] : window.getComputedStyle(e, null));

function domSetCSS (e, n, v) {
  if (typeof n === "string") {
    e.style[n] = v;
  } else if (typeof n === "object") {
    for (var p in n) { e.style[p] = n[p]; }
  }
}

function domFadeIn (e, dur, d) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 0);
  s.display = (d || "");
  (function fade () {
    (s.opacity = parseFloat(s.opacity)+step) > 1
      ? s.opacity = 1
      : setTimeout(fade, 25);
  })();
}

function domFadeOut (e, dur) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 1);
  (function fade () {
    (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25);
  })();
}

function domFadeToggle (e, dur, d = "") {
  if (window.getComputedStyle(e, null).display === "none") {
    celestra.domFadeIn(e, dur, d);
  } else {
    celestra.domFadeOut(e, dur);
  }
}

const domHide = (e) => e.style.display = "none";

const domShow = (e, d = "") => e.style.display = d;

function domToggle (e, d = "") {
  if (window.getComputedStyle(e, null).display === "none") {
    e.style.display = d;
  } else {
    e.style.display = "none";
  }
}

const domIsHidden = (e) =>
  (window.getComputedStyle(e, null).display === "none");

const domSiblings = (el) =>
  Array.prototype.filter.call(el.parentNode.children, (e) => (e !== el));

function importScript (u, s) {
  var scr = document.createElement("script");
  scr.type = "text\/javascript";
  scr.src = u;
  scr.onerror = function (e) {
    throw new URIError(
      "Loading failed for the script with source " + e.target.src
    );
  };
  if (s) { scr.onreadystatechange = s; scr.onload = s; }
  (document.head || document.getElementsByTagName("head")[0]).appendChild(scr);
}

function importScripts (s) {
  if (Array.isArray(s)) {
    s.forEach(function (e) { celestra.importScript(e.url, e.success); });
  } else {
    Array.prototype.forEach.call(
      arguments, function (e) { celestra.importScript(e); }
    );
  }
}

function importStyle (h, s) {
  var stl = document.createElement("link");
  stl.rel = "stylesheet";
  stl.type = "text\/css";
  stl.href = h;
  stl.onerror = function (e) {
    throw new URIError(
      "Loading failed for the style with source " + e.target.href
    );
  };
  if (s) { stl.onreadystatechange = s; stl.onload = s; }
  (document.head || document.getElementsByTagName("head")[0]).appendChild(stl);
}

function importStyles (s) {
  if (Array.isArray(s)) {
    s.forEach(function (e) { celestra.importStyle(e.href, e.success); });
  } else {
    Array.prototype.forEach.call(
      arguments, function (e) { celestra.importStyle(e); }
    );
  }
}

function form2array (f) {
  var fld, a = [];
  if (typeof f === "object" && f.nodeName.toLowerCase() === "form") {
    for (var i=0, len=f.elements.length; i<len; i++) {
      fld = f.elements[i];
      if (fld.name && !fld.disabled
        && fld.type !== "file"
        && fld.type !== "reset"
        && fld.type !== "submit"
        && fld.type !== "button") {
        if (fld.type === "select-multiple") {
          for (var j=0, l=f.elements[i].options.length; j<l; j++) {
            if(fld.options[j].selected) {
              a.push({
                "name": encodeURIComponent(fld.name),
                "value": encodeURIComponent(fld.options[j].value)
              });
            }
          }
        } else if ((fld.type !== "checkbox" && fld.type !== "radio")
          || fld.checked) {
          a.push({
            "name": encodeURIComponent(fld.name),
            "value": encodeURIComponent(fld.value)
          });
        }
      }
    }
  }
  return a;
}

function form2string (f) {
  var fld, a = [];
  if (typeof f === "object" && f.nodeName.toLowerCase() === "form") {
    for (var i=0, len=f.elements.length; i<len; i++) {
      fld = f.elements[i];
      if (fld.name && !fld.disabled
        && fld.type !== "file"
        && fld.type !== "reset"
        && fld.type !== "submit"
        && fld.type !== "button") {
        if (fld.type === "select-multiple") {
          for (var j=0, l=f.elements[i].options.length; j<l; j++) {
            if(fld.options[j].selected) {
              a.push(encodeURIComponent(fld.name)
                + "=" + encodeURIComponent(fld.options[j].value));
            }
          }
        } else if ((fld.type !== "checkbox" && fld.type !== "radio")
          || fld.checked) {
          a.push(encodeURIComponent(fld.name)
            + "=" + encodeURIComponent(fld.value));
        }
      }
    }
  }
  return a.join("&").replace(/%20/g, "+");
}

const getDoNotTrack = () =>
  (!!window.doNotTrack || !!navigator.doNotTrack || !!navigator.msDoNotTrack);

function getLocation (s, e) {
  if (!e) { var e = function () {}; }
  function getE (error) { e("ERROR(" + error.code + "): " + error.message); }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(s, getE);
  } else {
    getE("Geolocation is not supported in this browser.");
  }
}

function createFile (fln, c, dt) {
  var l = arguments.length;
  if (l > 1) {
    if (l === 2) { dt = "text/plain"; }
    var b = new Blob([c], {type: dt});
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(b, fln);
    } else {
      var e = window.document.createElement("a");
      e.href = window.URL.createObjectURL(b);
      e.download = fln;
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
      window.URL.revokeObjectURL(e.href);
    }
  } else {
    throw "Celestra createFile error: too few parameters.";
  }
}

function getFullscreen () {
  return (document.fullscreenElement
    || document.mozFullScreenElement
    || document.webkitFullscreenElement
    || document.msFullscreenElement
    || undefined
  );
}

function setFullscreenOn (s) {
  if (typeof s === "string") { var e = document.querySelector(s); }
  else if (typeof s === "object") { var e = s; }
  if (e.requestFullscreen) { e.requestFullscreen(); }
  else if (e.mozRequestFullScreen) { e.mozRequestFullScreen(); }
  else if (e.webkitRequestFullscreen) { e.webkitRequestFullscreen(); }
  else if (e.msRequestFullscreen) { e.msRequestFullscreen(); }
}

function setFullscreenOff () {
  if (document.exitFullscreen) { document.exitFullscreen(); }
  else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
  else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
  else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}

const domGetCSSVar = (n) =>
  getComputedStyle(document.documentElement).getPropertyValue(
    n[0] === "-" ? n : "--" + n
  );

const domSetCSSVar = (n, v) =>
  document.documentElement.style.setProperty((n[0] === "-" ? n : "--" + n), v);

/* AJAX */

function getText (u, s) { celestra.ajax({url: u, success: s}); }

function getJson (u, s) { celestra.ajax({url: u, format: "json", success: s}); }

function ajax (o) {
  if (typeof o.url !== "string") {
    throw new TypeError("Celestra ajax error: The url parameter have to be a function.");
  }
  if (typeof o.success !== "function") {
    throw new TypeError("Celestra ajax error: The success parameter have to be a function.");
  }
  if (!(["function", "undefined"].includes(typeof o.error))) {
    throw new TypeError("Celestra ajax error: The error parameter have to be a function or undefined.");
  }
  if (!o.queryType) {
    o.queryType = "ajax";
  } else {
    o.queryType = o.queryType.toLowerCase();
  }
  if (!o.type) {
    o.type = "get";
  } else {
    o.type = o.type.toLowerCase();
  }
  if (o.type === "get") {
    var typeStr = "GET";
  } else if (o.type === "post") {
    var typeStr = "POST";
  } else {
    throw "Celestra ajax error: The type parameter have to be \"get\" or \"post\".";
  }
  if (!o.format) {
    o.format = "text";
  } else {
    o.format = o.format.toLowerCase();
    if (!(["text", "json", "xml"].includes(o.format))) {
      throw "Celestra ajax error: The format parameter have to be \"text\" or \"json\" or \"xml\".";
    }
  }
  var xhr;
  if (o.queryType === "ajax") {
    xhr = new XMLHttpRequest();
  } else if (o.queryType === "cors") {
    xhr = new XMLHttpRequest();
    if (!("withCredentials" in xhr)) { xhr = new XDomainRequest(); }
  } else {
    throw "Celestra ajax error: The querytype parameter have to be \"ajax\" or \"cors\".";
  }
  if (typeof user === "string" && typeof password === "string") {
    xhr.open(typeStr, o.url, true, o.user, o.password);
  } else {
    xhr.open(typeStr, o.url, true);
  }
  if (o.queryType === "ajax") {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        switch (o.format.toLowerCase()) {
          case "text": o.success(this.responseText); break;
          case "json": o.success(JSON.parse(this.responseText)); break;
          case "xml": o.success(this.responseXML); break;
          default: o.success(this.responseText);
        }
      }
    };
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (o.typeStr === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
  } else if (o.queryType === "cors") {
    xhr.onload = function (request) {
      switch (o.format.toLowerCase()) {
        case "text": o.success(request.target.responseText
          || request.currentTarget.response); break;
        case "json": o.success(JSON.parse(request.target.responseText
          || request.currentTarget.response)); break;
        case "xml": o.success(request.target.responseXML
          || request.currentTarget.responseXML); break;
        default: o.success(request.target.responseText
          || request.currentTarget.response);
      }
    };
  }
  if (typeof o.error === "function") { xhr.onerror = o.error; }
  if (typeStr === "GET") {
    xhr.send();
  } else if (typeStr === "POST") {
    xhr.send(encodeURI(o.data));
  }
}

/* type checking */

const isPromise = (v) =>
  (typeof v === "object" && typeof v.then === "function");

function isSameArray (a, b) {
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    for (var i = 0, l = a.length; i < l; i++) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }
  return false;
}

const isString = (v) => (typeof v === "string");
const isChar = (v) => (typeof v === "string" && v.length === 1);

const isNumber = (v) => (typeof v === "number");
const isFloat = (v) => (typeof v === "number" && !!(v % 1));
function isNumeric (v) {
  return ((typeof v === "number" && v === v)
    ? true
    : (!isNaN(parseFloat(v)) && isFinite(v))
  );
}

const isBoolean = (v) => (typeof v === "boolean");

const isObject = (v) => (typeof v === "object" && v !== null);
function isEmptyObject(v) {
  if (typeof v === "object" && v !== null) {
    for (var n in v) { return false; }
    return true;
  }
  return false;
}

const isFunction = (v) => (typeof v === "function");

const isEmptyArray = (v) => (Array.isArray(v) && v.length === 0);
const isArraylike = (v) =>
  ((typeof v === "object" || typeof v === "string") && v !== null
    && typeof v.length === "number" && v.length >= 0 && v.length % 1 === 0);

const isNull = (v) => (v === null);
const isUndefined = (v) => (v === undefined);
const isNullOrUndefined = (v) => (v == null);
const isNil = isNullOrUndefined;

const isPrimitive = (v) =>
  (v === null || typeof v !== "object" && typeof v !== "function");

const isSymbol = (v) => (typeof v === "symbol");

const isMap = (v) => celestra.getType(v, "map");

const isSet = (v) => celestra.getType(v, "set");

const isWeakMap = (v) => celestra.getType(v, "weakmap");

const isWeakSet = (v) => celestra.getType(v, "weakset");

const isIterator = (v) =>
  (celestra.getType(v).includes("iterator") || (typeof v.next === "function"));

const isDate = (v) => celestra.getType(v, "date");

const isRegexp = (v) => celestra.getType(v, "regexp");

const isElement = (v) => (typeof v === "object" && v.nodeType === 1);

const isIterable = (v) => (typeof v[Symbol.iterator] === "function");

const isBigInt = (v) => (typeof v === "bigint");

const isArrayBuffer = (v) => celestra.getType(v, "arraybuffer");

const isTypedArray = (v) =>
  ["int8array", "uint8array", "uint8clampedarray", "int16array", "uint16array",
   "int32array", "uint32array", "float32array", "float64array",
   "bigint64array", "biguint64array"].includes(celestra.getType(v));

const isGeneratorFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(function*(){}).constructor);

const isAsyncFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(async function(){}).constructor);

/* cookie */

function setCookie (name, value, hours = 8760, path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
  if (typeof name === "object") {
    var settings = name;
    name = settings.name;
    value = settings.value;
    hours = settings.hours || 8760;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  var expire = new Date();
  expire.setTime(expire.getTime()+(Math.round(hours*60*60*1000)));
  document.cookie = encodeURIComponent(name)
    + "=" + encodeURIComponent(value)
    + "; expires=" + expire.toUTCString()
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite === "string" && SameSite.length > 0
      ? "; SameSite="+SameSite : "")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
}

function getCookie (name) {
  if (document.cookie.length !== 0) {
    var r = {}, a = document.cookie.split(";");
    for(var i = 0, l = a.length; i < l; i++) {
      var e = a[i].trim().split("=");
      r[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
    }
    return (name ? (r[name] ? r[name] : null) : r);
  }
  return (name ? null : {});
}

const hasCookie = (name) =>
  (document.cookie.includes(encodeURIComponent(name)+"="));

function removeCookie (name, path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
  if (typeof name === "object") {
    var settings = name;
    name = settings.name;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  var r = (document.cookie.includes(encodeURIComponent(name)+"="));
  document.cookie = encodeURIComponent(name)
    + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite === "string" && SameSite.length > 0
      ? "; SameSite="+SameSite : "")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
  return r;
}

function clearCookies (path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
  if (typeof path === "object") {
    var settings = path;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  for (var item in celestra.getCookie()) {
    celestra.removeCookie(item, path, domain, secure, SameSite, HttpOnly);
  }
}

/* collections */

const partition = ([...a], fn) =>
  [ a.filter(fn), a.filter( (e, i, a) => !(fn(e, i, a))) ];
const groupBy = partition;

const arrayUnion = (...a) => [...new Set(a.map(([...e]) => e).flat())];

const arrayIntersection = ([...a], [...b]) =>
  a.filter((v) => b.includes(v)).filter((e, i, arr) => arr.indexOf(e) === i);

const arrayDifference = ([...a], [...b]) =>
  a.filter((v) => !(b.includes(v))).filter((e, i, arr) => arr.indexOf(e) === i);

const arraySymmetricDifference = ([...a], [...b]) =>
  a.filter((v) => !(b.includes(v)))
    .concat(b.filter((v) => !(a.includes(v))))
    .filter((e, i, arr) => arr.indexOf(e) === i);

const setUnion = (...a) => new Set(a.map(([...e]) => e).flat());

const setIntersection = ([...a], b) => new Set(a.filter((v) => b.has(v)));

const setDifference = ([...a], b) => new Set(a.filter((v) => !(b.has(v))));

const setSymmetricDifference = (a, b) => new Set(
  [...a].filter((v) => !(b.has(v))).concat([...b].filter((v) => !(a.has(v))))
);

const isSuperset = ([...sup], [...sub]) => sub.every((v) => sup.includes(v));

function min ([...a]) {
  if (a.length > 0) {
    let r = a[0];
    for (let item of a) { if (r > item) { r = item; } }
    return r;
  }
  return null;
}

function max ([...a]) {
  if (a.length > 0) {
    let r = a[0];
    for (let item of a) { if (r < item) { r = item; } }
    return r;
  }
  return null;
}

const arrayRepeat = (v, n = 100) => Array(n).fill(v);

const arrayCycle = ([...a], n = 100) => Array(n).fill(a).flat();

const arrayRange = (start = 0, end = 100, step = 1) =>
  Array.from({ length: (end - start) / step + 1}, (_, i) => start + (i * step));

function zip (...a) {
  a = a.map((v) => Array.from(v));
  let r = [], i, j, l = a.length, min = a[0].length, item;
  for (item of a) {
    if (item.length < min) { min = item.length; }
  }
  for (i = 0; i < min; i++) {
    item = [];
    for (j = 0; j < l; j++) { item.push(a[j][i]); }
    r.push(item);
  }
  return r;
}

function unzip ([...a]) {
  a = a.map(([...v]) => v);
  let r = [], i, j, l1 = a[0].length, l2 = a.length;
  for (i = 0; i < l1; i++) { r.push([]); }
  for (i = 0; i < l1; i++) {
    for (j = 0; j < l2; j++) { r[i].push(a[j][i]); }
  }
  return r;
}

const arrayUnique = (a) => [...new Set(a)];

function arrayAdd (a, v) {
  if (!a.includes(v)) { a.push(v); return true; }
  return false;
}

function arrayClear (a) { a.length = 0; return a; }

function arrayRemove (a, v, all) {
  var found = a.indexOf(v) > -1;
  if (!all) {
    var pos = a.indexOf(v);
    if (pos > -1) { a.splice(pos, 1); }
  } else {
    var pos = -1;
    while ((pos = a.indexOf(v)) > -1) { a.splice(pos, 1); }
  }
  return found;
}

const item = ([...a], i) => a[(i < 0 ? a.length + i : i)];

function arrayMerge () {
  if (typeof arguments[0] === "boolean") {
    var t = arguments[1], d = arguments[0], s = 2;
  } else {
    var t = arguments[0], d = false, s = 1;
  }
  for(var i = s, il = arguments.length; i < il; i++) {
    if (Array.isArray(arguments[i])) {
      for(var j = 0, a = arguments[i], jl = a.length; j < jl; j++) {
        if (Array.isArray(a[j]) && d) {
          celestra.arrayMerge(true, t, a[j]);
        } else {
          t.push(a[j]);
        }
      }
    } else {
      t.push(arguments[i]);
    }
  }
  return t;
}

function* iterRange (start = 0, step = 1, end = Infinity) {
  let i = start;
  while (i <= end) { yield i; i += step; }
}

function* iterCycle ([...a], n = Infinity) {
  let i = 0;
  while (i < n) { yield* a; i++; }
}

function* iterRepeat (v, n = Infinity) {
  let i = 0;
  while (i < n) { yield v; i++; }
}

function* takeWhile (it, fn) {
  for (let item of it) {
    if (!fn(item)) { break; }
    yield item;
  }
}

function* dropWhile (it, fn) {
  let d = true;
  for (let item of it) {
    if (d && !fn(item)) { d = false; }
    if (!d) { yield item; }
  }
}

function* takeOf (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
}

function* dropOf (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i < 1) { yield item; } else { i--; }
  }
}

function forOf (it, fn) { let i = 0; for (let item of it) { fn(item, i++); } }
const forEach = forOf;

function* mapOf (it, fn) {
  let i = 0;
  for (let item of it) { yield fn(item, i++); }
}
const map = mapOf;

function* filterOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { yield item; }
  }
}

function* sliceOf (it, begin = 0, end = Infinity) {
  let i = 0;
  for (let item of it) {
    if (i >= begin && i <= end) {
      yield item;
    } else if (i > end) {
      return;
    }
    i++;
  }
}

function itemOf (it, p) {
  let i = 0;
  for (let item of it) {
    if (i++ === p) { return item; }
  }
}

function sizeOf (it) { let i = 0; for (let item of it) { i++; } return i; }

function firstOf (it) { for (let item of it) { return item; } }

function lastOf (it) { let item; for (item of it) { } return item; }

const reverseOf = ([...a]) => a.reverse().values();

const sortOf = ([...a]) => a.sort().values();

function hasOf (it, v) {
  for (let item of it) {
    if (item === v) { return true; }
  }
  return false;
}

function findOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return item; }
  }
}

function everyOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (!fn(item, i++)) { return false; }
  }
  if (i === 0) { return false; }
  return true;
}

function someOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return true; }
  }
  return false;
}

function noneOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return false; }
  }
  if (i === 0) { return false; }
  return true;
}

function* takeRight ([...a], n = 1) {
  let i = n;
  for (let item of a.reverse()) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
}

function* takeRightWhile ([...a], fn) {
  let i = 0;
  for (let item of a.reverse()) {
    if (fn(item, i)) { yield item; } else { break; }
  }
}

function* dropRight ([...a], n = 1) {
  let i = n;
  for (let item of a.reverse()) {
    if (i < 1) { yield item; } else { i--; }
  }
}

function* dropRightWhile ([...a], fn) {
  let d = true;
  for (let item of a.reverse()) {
    if (d && !fn(item)) { d = false; }
    if (!d) { yield item; }
  }
}

function* concatOf () { for (let item of arguments) { yield* item; } }

function reduceOf (it, fn, iv) {
  let acc = iv;
  let i = 0;
  for (let item of it) {
    if (i === 0 && acc === undefined) {
      acc = item;
    } else {
      acc = fn(acc, item, i++);
    }
  }
  return acc;
}

function* enumerateOf (it) {
  let i = 0;
  for (let item of it) { yield [item, i++]; }
}

function* flatOf (it) { for (let item of it) { yield* item; } }

const joinOf = ([...a], s = ",") => a.join(s);

/* object header */

const VERSION = "Celestra v3.8.0 dev";

function noConflict () {
  window._ = celestra.__prevUnderscore__;
  return celestra;
}

var celestra = {
  /* header */
  VERSION: VERSION,
  noConflict: noConflict,
  /* core api */
  delay: delay,
  randomInt: randomInt,
  randomFloat: randomFloat,
  randomString: randomString,
  b64Encode: b64Encode,
  b64Decode: b64Decode,
  javaHash: javaHash,
  inherit: inherit,
  getUrlVars: getUrlVars,
  obj2string: obj2string,
  getType: getType,
  extend: extend,
  deepAssign: deepAssign,
  strRemoveTags: strRemoveTags,
  strReverse: strReverse,
  strReplaceAll: strReplaceAll,
  strCodePoints: strCodePoints,
  strFromCodePoints: strFromCodePoints,
  strAt: strAt,
  forIn: forIn,
  toFunction: toFunction,
  bind: bind,
  hasOwn: hasOwn,
  constant: constant,
  identity: identity,
  noop: noop,
  T: T,
  F: F,
  assert: assert,
  assertLog: assertLog,
  assertAlert: assertAlert,
  /* DOM */
  qsa: qsa,
  qs: qs,
  domReady: domReady,
  domCreate: domCreate,
  domToElement: domToElement,
  domGetCSS: domGetCSS,
  domSetCSS: domSetCSS,
  domFadeIn: domFadeIn,
  domFadeOut: domFadeOut,
  domFadeToggle: domFadeToggle,
  domHide: domHide,
  domShow: domShow,
  domToggle: domToggle,
  domIsHidden: domIsHidden,
  domSiblings: domSiblings,
  importScript: importScript,
  importScripts: importScripts,
  importStyle: importStyle,
  importStyles: importStyles,
  form2array: form2array,
  form2string: form2string,
  getDoNotTrack: getDoNotTrack,
  getLocation: getLocation,
  createFile: createFile,
  getFullscreen: getFullscreen,
  setFullscreenOn: setFullscreenOn,
  setFullscreenOff: setFullscreenOff,
  domGetCSSVar: domGetCSSVar,
  domSetCSSVar: domSetCSSVar,
  /* AJAX */
  getText: getText,
  getJson: getJson,
  ajax: ajax,
  /* type checking */
  isPromise: isPromise,
  isSameArray: isSameArray,
  isString: isString,
  isChar: isChar,
  isNumber: isNumber,
  isFloat: isFloat,
  isNumeric: isNumeric,
  isBoolean: isBoolean,
  isObject: isObject,
  isEmptyObject: isEmptyObject,
  isFunction: isFunction,
  isEmptyArray: isEmptyArray,
  isArraylike: isArraylike,
  isNull: isNull,
  isUndefined: isUndefined,
  isNullOrUndefined: isNullOrUndefined,
  isNil: isNil,
  isPrimitive: isPrimitive,
  isSymbol: isSymbol,
  isMap: isMap,
  isSet: isSet,
  isWeakMap: isWeakMap,
  isWeakSet: isWeakSet,
  isIterator: isIterator,
  isDate: isDate,
  isRegexp: isRegexp,
  isElement: isElement,
  isIterable: isIterable,
  isBigInt: isBigInt,
  isArrayBuffer: isArrayBuffer,
  isTypedArray: isTypedArray,
  isGeneratorFn: isGeneratorFn,
  isAsyncFn: isAsyncFn,
  /* cookie */
  setCookie: setCookie,
  getCookie: getCookie,
  hasCookie: hasCookie,
  removeCookie: removeCookie,
  clearCookies: clearCookies,
  /* collections */
  partition: partition,
  groupBy: groupBy,
  arrayUnion: arrayUnion,
  arrayIntersection: arrayIntersection,
  arrayDifference: arrayDifference,
  arraySymmetricDifference: arraySymmetricDifference,
  setUnion: setUnion,
  setIntersection: setIntersection,
  setDifference: setDifference,
  setSymmetricDifference: setSymmetricDifference,
  isSuperset: isSuperset,
  min: min,
  max: max,
  arrayRepeat: arrayRepeat,
  arrayCycle: arrayCycle,
  arrayRange: arrayRange,
  zip: zip,
  unzip: unzip,
  arrayUnique: arrayUnique,
  arrayAdd: arrayAdd,
  arrayClear: arrayClear,
  arrayRemove: arrayRemove,
  item: item,
  arrayMerge: arrayMerge,
  iterRange: iterRange,
  iterCycle: iterCycle,
  iterRepeat: iterRepeat,
  takeWhile: takeWhile,
  dropWhile: dropWhile,
  takeOf: takeOf,
  dropOf: dropOf,
  forOf: forOf,
  forEach: forEach,
  mapOf: mapOf,
  map: map,
  filterOf: filterOf,
  sliceOf: sliceOf,
  itemOf: itemOf,
  sizeOf: sizeOf,
  firstOf: firstOf,
  lastOf: lastOf,
  reverseOf: reverseOf,
  sortOf: sortOf,
  hasOf: hasOf,
  findOf: findOf,
  everyOf: everyOf,
  someOf: someOf,
  noneOf: noneOf,
  takeRight: takeRight,
  takeRightWhile: takeRightWhile,
  dropRight: dropRight,
  dropRightWhile: dropRightWhile,
  concatOf: concatOf,
  reduceOf: reduceOf,
  enumerateOf: enumerateOf,
  flatOf: flatOf,
  joinOf: joinOf
};

if (typeof window !== "undefined") {
  window.celestra = celestra;
  celestra.__prevUnderscore__ = window._;
  window._ = celestra;
}

}(window, document));
