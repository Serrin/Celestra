/**
 * @name Celestra
 * @version 4.5.2 dev
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */
(function(window, document){
"use strict";

/*-------------------+------+-----------------------------------------
  Function           |   #  |  Internal calls
---------------------+------+-----------------------------------------
  CTRL-F             |   N  |  getType();
  domFadeToggle();   |   2  |  domFadeIn(); domFadeOut();
  extend();          |   1  |  extend();
  deepAssign();      |   1  |  deepAssign();
  getJson();         |   1  |  ajax();
  getText();         |   1  |  ajax();
  clearCookies();    |   2  |  getCookie(); removeCookie();
  isSameIterator();  |   1  |  isSameArray();
  zipObj();          |   1  |  zip();
---------------------+------+----------------------------------------*/

/** polyfills **/

/* Array.prototype.at(<index>); */
if (!("at" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "at", {
    writable: true, enumerable: false, configurable: true,
    value: function at(n) {
      n = Math.trunc(n) || 0;
      if (n < 0) { n += this.length; }
      if (n < 0 || n >= this.length) { return undefined; }
      return this[String(n)];
    }
  });
}

/* TypedArray.prototype.at(<index>); */
if (!("at" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "at", {
    writable: true, enumerable: false, configurable: true,
    value: function at(n) {
      n = Math.trunc(n) || 0;
      if (n < 0) { n += this.length; }
      if (n < 0 || n >= this.length) { return undefined; }
      return this[String(n)];
    }
  });
}

/* String.prototype.at(<index>); */
if (!("at" in String.prototype)) {
  Object.defineProperty(String.prototype, "at", {
    writable: true, enumerable: false, configurable: true,
    value: function at(n) {
      n = Math.trunc(n) || 0;
      if (n < 0) { n += this.length; }
      if (n < 0 || n >= this.length) { return undefined; }
      return String(this)[String(n)];
    }
  });
}

/* Object.hasOwn(); */
if (!Object.hasOwn) {
  Object.defineProperty(Object, "hasOwn", {
    value: function (object, property) {
      if (object == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      return Object.prototype.hasOwnProperty.call(Object(object), property);
    },
    configurable: true, enumerable: false, writable: true
  });
}

/* String.prototype.trimStart(); */
if (!String.prototype.trimStart) {
  String.prototype.trimStart = function () { return this.replace(/^\s+/, ""); };
}
/* String.prototype.trimLeft(); */
if (!String.prototype.trimLeft) {
  String.prototype.trimLeft = function () { return this.replace(/^\s+/, ""); };
}

/* String.prototype.trimEnd(); */
if (!String.prototype.trimEnd) {
  String.prototype.trimEnd = function () { return this.replace(/\s+$/, ""); };
}
/* String.prototype.trimRight(); */
if (!String.prototype.trimRight) {
  String.prototype.trimRight = function () { return this.replace(/\s+$/, ""); };
}

/* String.prototype.padStart(); */
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

/* String.prototype.padEnd(); */
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function (len, str) {
    len = Math.floor(Number(len));
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

/* String.prototype.replaceAll(); */
if (!("replaceAll" in String.prototype)) {
  Object.defineProperty(String.prototype, "replaceAll", {
    "configurable": true, "writable": true, "enumerable": false,
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

/* Array.prototype.flat(); */
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

/* Array.prototype.flatMap(); */
if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function (fn) {
    var res = [];
    this.map(fn).forEach(function (e) {
      if (Array.isArray(e)) { res = res.concat(e); } else { res.push(e); }
    });
    return res;
  };
}

/* Object.fromEntries(); */
if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    var r = {};
    for (let e of entries) { r[e[0]] = e[1]; }
    return r;
  };
}

/* globalThis; */
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

/* String.prototype.matchAll(); */
if (!String.prototype.matchAll) {
  String.prototype.matchAll = function* (regex) {
    function ef (fls, fl) { return (fls.includes(fl) ? fls : fls + fl); }
    const lc = new RegExp(regex, ef(regex.flags, "g"));
    let match;
    while (match = lc.exec(this)) { yield match; }
  };
}

/* Array.prototype.findLast(); */
if (!("findLast" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "findLast", {
    writable: true, enumerable: false, configurable: true,
    value: function findLast (fn) {
      if (typeof fn !== "function") {
        throw new TypeError(String(fn) + " is not a function");
      }
      var i = this.length;
      while (i--) {
        if (fn(this[i],i,this)) { return this[i]; }
      }
      return undefined;
    }
  });
}

/* Array.prototype.findLastIndex(); */
if (!("findLastIndex" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "findLastIndex", {
    writable: true, enumerable: false, configurable: true,
    value: function findLastIndex (fn) {
      if (typeof fn !== "function") {
        throw new TypeError(String(fn) + " is not a function");
      }
      var i = this.length;
      while (i--) {
        if (fn(this[i],i,this)) { return i; }
      }
      return -1;
    }
  });
}

/* TypedArray.prototype.findLast(); */
if (!("findLast" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "findLast", {
    writable: true, enumerable: false, configurable: true,
    value: function findLast (fn) {
      if (typeof fn !== "function") {
        throw new TypeError(String(fn) + " is not a function");
      }
      var i = this.length;
      while (i--) {
        if (fn(this[i],i,this)) { return this[i]; }
      }
      return undefined;
    }
  });
}

/* TypedArray.prototype.findLastIndex(); */
if (!("findLastIndex" in Uint8Array.prototype)) {
  Object.defineProperty(Uint8Array.prototype, "findLastIndex", {
    writable: true, enumerable: false, configurable: true,
    value: function findLastIndex (fn) {
      if (typeof fn !== "function") {
        throw new TypeError(String(fn) + " is not a function");
      }
      var i = this.length;
      while (i--) {
        if (fn(this[i],i,this)) { return i; }
      }
      return -1;
    }
  });
}

/** non-standard polyfills **/

/* window.GeneratorFunction(); */
if (!window.GeneratorFunction) {
  window.GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
}

/* window.AsyncFunction(); */
if (!window.AsyncFunction) {
  window.AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
}

/* BigInt.prototype.toJSON(); */
if (window.BigInt && !BigInt.prototype.toJSON) {
  BigInt.prototype.toJSON = function () { return this.toString(); };
}

/** core api **/

/* randomID([hyphens = false]): string */
function randomID (hyphens = false) {
  var r = (new Date()).getTime().toString(16);
  for (var i=0; i<3; i++) { r += Math.random().toString(16).slice(2); }
  r = r.slice(0, 32);
  return !hyphens ? r : r.slice(0, 8)
    + "-" + r.slice(8, 12)
    + "-" + r.slice(12, 16)
    + "-" + r.slice(16, 20)
    + "-" + r.slice(20);
}

/* signbit(<value: any>): boolean */
const signbit = (v) => (((v = +v) !== v) ? !1 : ((v < 0) || Object.is(v, -0)));

/* delay(<ms: integer>).then(<callback: function>): promise */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* randomInt([max: integer]): integer */
/* randomInt(<min: integer>,<max: integer>): integer */
function randomInt (i = 100, a) {
  if (a === undefined) { a = i; i = 0; }
  return Math.floor(Math.random() * (a - i + 1)) + i;
}

/* randomFloat([max: float]): float */
/* randomFloat(<min: float>,<max: float>): float */
function randomFloat (i = 100, a) {
  if (a === undefined) { a = i; i = 0; }
  var r = (Math.random() * (a - i + 1)) + i;
  return r > a ? a : r;
}

/* randomBoolean(): boolean */
const randomBoolean = () => (Math.random() >= 0.5);

/* randomString([length:integer[,specialCharactersEnabled=false]]): string */
function randomString (pl = 100, sc = false) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (sc) { chars += ",?,.:-_*$ß¤Łł÷×¸¨˝´˙`˛°˘^ˇ~§'+!%/=()[]#<>&@{}\"\\/| éáűőúöüóíÉÁŰŐÚÖÜÓÍß"; }
  var s = "", l = chars.length;
  for (var i = 0; i < pl; i++) { s += chars[Math.floor(Math.random()*l)]; }
  return s;
}

/* inRange(<value: number>,<min: number>,<max: number>): boolean */
const inRange = (v, i, a) => (v >= i && v <= a);

/* b64Encode(<string>): string */
function b64Encode (str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (match, p1) { return String.fromCharCode("0x" + p1); }
  ));
}

/* b64Decode(<string>): string */
function b64Decode (str) {
  return decodeURIComponent(atob(str).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}

/* javaHash(<data: any>[,hexa=false]): integer */
function javaHash (s, hx = false) {
  if (s !== undefined) { s = "" + s; } else { return 0; }
  var h = 0, l = s.length, c = "";
  if (l == 0) { return h; }
  for (var i = 0; i < l; i++) {
    c = s.charCodeAt(i);
    h = ((h << 5) - h) + c;
    h = h & h;
  }
  if (hx) { return h.toString(16); }
  return h;
}

/* inherit(<subclass: function>,<superclass: function>): function */
function inherit (c, p) {
  c.prototype = Object.create(p.prototype);
  c.prototype.constructor = c;
  return c;
}

/* getUrlVars([str=location.search]): string */
const getUrlVars = (str = location.search) =>
  [...new URLSearchParams(str).entries()]
    .reduce(function (o, item) { o[item[0]] = item[1]; return o; }, {});

/* obj2string(<object>): string */
const obj2string = (o) => Object.keys(o).reduce(
  (s,p) => s += encodeURIComponent(p) + "=" + encodeURIComponent(o[p]) + "&","")
  .slice(0, -1);

/* getType(<variable: any>): string */
/* getType(<variable: any>[,type: string]): boolean */
function getType (v, t) {
  var ot = Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  return (arguments.length === 2 ? ot === t.toLowerCase() : ot);
}

/* extend([deep: boolean,]<target: object>,<source1: object>[,sourceN]):object*/
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
        if (Object.hasOwn(so, a)) {
          if (typeof so[a] === "object" && d) {
            t[a] = celestra.extend(true, {}, so[a]);
          } else {
            t[a] = so[a];
          }
        }
      }
    }
  }
  return t;
}

/* deepAssign(<target: object>,<source1: object>[,sourceN]): object */
function deepAssign () {
  var s = {}, t = arguments[0];
  for (var i = 1, l = arguments.length; i < l; i++) {
    s = arguments[i];
    if (s !== null && s !== undefined) {
      for (var a in s) {
        if (Object.hasOwn(s, a)) {
          if (typeof s[a] === "object") {
            t[a] = celestra.deepAssign({}, s[a]);
          } else {
            t[a] = s[a];
          }
        }
      }
    }
  }
  return t;
}

/* strPropercase(<string>): string */
const strPropercase = (s) => String(s).split(" ").map(function (v) {
    var a = Array.from(v).map( (c) => c.toLowerCase() );
    if (a.length > 0) { a[0] = a[0].toUpperCase(); }
    return a.join("");
  }).join(" ");

/* strCapitalize(<string>): string */
function strCapitalize (s) {
  var a = [...String(s).toLowerCase()];
  if (a.length > 0) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}

/* strUpFirst(<string>): string */
function strUpFirst (s) {
  var a = [...String(s)];
  if (a.length > 0) { a[0] = a[0].toUpperCase(); }
  return a.join("");
}

/* strDownFirst(<string>): string */
function strDownFirst (s) {
  var a = [...String(s)];
  if (a.length > 0) { a[0] = a[0].toLowerCase(); }
  return a.join("");
}

/* strHTMLRemoveTags(<string>): string */
const strHTMLRemoveTags = (s) =>
  String(s).replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();

/* strReverse(<string>): string */
const strReverse = (s) => Array.from(String(s)).reverse().join("");

/* strCodePoints(<string>): array of strings */
const strCodePoints = (s) => Array.from(String(s), (v) => v.codePointAt(0) );

/* strFromCodePoints(<collection>): string */
const strFromCodePoints = ([...a]) => String.fromCodePoint.apply(null, a);

/* strAt(<string>,<index: integer>): string */
const strAt = (s, i) => (Array.from(String(s)).at(i) || "");

/* sizeIn(<object>): integer */
const sizeIn = (o) => Object.keys(o).length;

/* forIn(<object>,<callback: function>): object */
const forIn = (o,fn) => { Object.keys(o).forEach((v)=>fn(o[v],v,o)); return o; }

/* filterIn(<object>,<callback: function>): object */
const filterIn = (o, fn) => Object.keys(o)
  .reduce( (r, p) => { if (fn(o[p], p, o)) { r[p] = o[p]; } return r; } , {} );

/* popIn(<object>,<property: string>): any */
/* popIn(<object>,<property: string>): undefined */
function popIn (o,p){if(Object.hasOwn(o,p)){var v=o[p]; delete o[p]; return v;}}

/* toFunction(<function>): function */
const toFunction = (fn) => Function.prototype.call.bind(fn);

/* bind(<function>,<context: any>): function */
const bind = Function.prototype.call.bind(Function.prototype.bind);

/* constant(<value: any>): any */
const constant = (v) => () => v;

/* identity(<value: any>): any */
const identity = (v) => v;

/* noop(): undefined */
const noop = () => {};

/* T(): true (boolean) */
const T = () => true;

/* F(): false (boolean) */
const F = () => false;

/* assertEq(<message: string>,<value1: any>,<value2: any>[,strict=true]):
  throw error */
/* assertEq(<message: string>,<value1: any>,<value2: any>[,strict=true]):
  true (boolean) */
function assertEq (msg, v1, v2, strict = true) {
  if (strict ? v1 !== v2 : v1 != v2) {
    throw new Error("[assertEq] - " + msg + " - " +  v1 + " - " + v2);
  }
  return true;
}

/* assertNotEq(<message: string>,<value1: any>,<value2: any>[,strict=true]):
  throw error */
/* assertNotEq(<message: string>,<value1: any>,<value2: any>[,strict=true]):
  true (boolean) */
function assertNotEq (msg, v1, v2, strict = true) {
  if (strict ? v1 === v2 : v1 == v2) {
    throw new Error("[assertNotEq] - " + msg + " - " +  v1 + " - " + v2);
  }
  return true;
}

/* assertTrue(<message: string>,<value: any>): throw error */
/* assertTrue(<message: string>,<value: any>): true (boolean) */
function assertTrue (msg, v) {
  if (!v) { throw new Error("[assertTrue] " + msg); }
  return true;
}

/* assertFalse(<message: string>,<value: any>): throw error */
/* assertFalse(<message: string>,<value: any>): true (boolean) */
function assertFalse (msg, v) {
  if (!!v) { throw new Error("[assertFalse] " + msg); }
  return true;
}

/* strHTMLEscape(<string>): string */
const strHTMLEscape = (s) => String(s).replace(/&/g, "&amp;")
  .replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/* strHTMLUnEscape(<string>): string */
const strHTMLUnEscape = (s) => String(s)
  .replace(/&amp;/g, "&").replace(/&#38;/g, "&")
  .replace(/&lt;/g, "<").replace(/&#60;/g, "<")
  .replace(/&gt;/g, ">").replace(/&#62;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#34;/g, '"')
  .replace(/&apos;/g, "'").replace(/&#39;/g, "'");

/** DOM **/

/* qsa(<selector: string>[,context: element object]): array */
const qsa = (s, c = document) => Array.from(c.querySelectorAll(s));

/* qs(<selector: string>[,context: element object]): element object */
/* qs(<selector: string>[,context: element object]): null */
const qs = (s, c = document) => c.querySelector(s);

/* domReady(<callback: function>): undefined */
function domReady (fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", function (event) { fn(); });
  }
}

/* domCreate(<type: string>[,properties: object[,innerHTML: string]]):
  element object */
/* domCreate(<element descriptive object>): element object */
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

/* domToElement(<htmlString>): element object */
function domToElement (s) {
  var e = document.createElement("div");
  e.innerHTML = s;
  return e.firstElementChild;
}

/* domGetCSS(<element object>[,property: string]): string */
const domGetCSS = (e, p) =>
  (p ? window.getComputedStyle(e, null)[p] : window.getComputedStyle(e, null));

/* domSetCSS(<element object>,<property: string>,<value: string>): undefined */
/* domSetCSS(<element object>,<properties: object>): undefined */
function domSetCSS (e, n, v) {
  if (typeof n === "string") {
    e.style[n] = v;
  } else if (typeof n === "object") {
    Object.keys(n).forEach((p) => (e.style[p] = n[p]));
  }
}

/* domFadeIn(<element object>[,duration: integer[,display: string]]):
  undefined */
function domFadeIn (e, dur, d) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 0);
  s.display = (d || "");
  (function fade () {
    (s.opacity=parseFloat(s.opacity)+step)>1 ? s.opacity=1 :setTimeout(fade,25);
  })();
}

/* domFadeOut(<element object>[,duration: integer]): undefined */
function domFadeOut (e, dur) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 1);
  (function fade () {
    (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25);
  })();
}

/* domFadeToggle(<element object>[,duration: integer[,display: string]]):
  undefined */
function domFadeToggle (e, dur, d = "") {
  if (window.getComputedStyle(e, null).display === "none") {
    celestra.domFadeIn(e, dur, d);
  } else {
    celestra.domFadeOut(e, dur);
  }
}

/* domHide(<element object>): undefined */
const domHide = (e) => e.style.display = "none";

/* domShow(<element object>[,display: string]): undefined */
const domShow = (e, d = "") => e.style.display = d;

/* domToggle(<element object>[,display: string]): undefined */
function domToggle (e, d = "") {
  if (window.getComputedStyle(e, null).display === "none") {
    e.style.display = d;
  } else {
    e.style.display = "none";
  }
}

/* domIsHidden(<element object>): boolean */
const domIsHidden = (e) => (window.getComputedStyle(e,null).display === "none");

/* domSiblings(<element object>): array */
const domSiblings = (el) =>
  Array.prototype.filter.call(el.parentNode.children, (e) => (e !== el));

/* domSiblingsPrev(<element object>): array */
const domSiblingsPrev = (el) => Array.prototype.slice.call(
  el.parentNode.children, 0,
  Array.prototype.indexOf.call(el.parentNode.children, el)
);
/* domSiblingsLeft(<element object>): array */
const domSiblingsLeft = domSiblingsPrev;

/* domSiblingsNext(<element object>): array */
const domSiblingsNext = (el) => Array.prototype.slice.call(
  el.parentNode.children,
  Array.prototype.indexOf.call(el.parentNode.children, el) + 1,
  el.parentNode.children.length
);
/* domSiblingsRight(<element object>): array */
const domSiblingsRight = domSiblingsNext;

/* importScript(<script1: string>[,scriptN: string]): undefined */
function importScript (...a) {
  for (let item of a) {
    let scr = document.createElement("script");
    scr.type = "text\/javascript";
    scr.src = item;
    scr.onerror = function (e) {
      throw new URIError(
        "Loading failed for the script with source " + e.target.src
      );
    };
    (document.head||document.getElementsByTagName("head")[0]).appendChild(scr);
  }
}

/* importStyle(<style1: string>[,styleN: string]): undefined */
function importStyle (...a) {
  for (let item of a) {
    let stl = document.createElement("link");
    stl.rel = "stylesheet";
    stl.type = "text\/css";
    stl.href = item;
    stl.onerror = function (e) {
      throw new URIError(
        "Loading failed for the style with source " + e.target.href
      );
    };
    (document.head||document.getElementsByTagName("head")[0]).appendChild(stl);
  }
}

/* form2array(<form object>): array */
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

/* form2string(<form object>): string */
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

/* getDoNotTrack(): boolean */
const getDoNotTrack = () =>
  (!!window.doNotTrack || !!navigator.doNotTrack || !!navigator.msDoNotTrack);

/* getLocation(<success: function>[,error: function]): undefined */
function getLocation (s, e) {
  if (!e) { var e = function () {}; }
  function getE (error) { e("ERROR(" + error.code + "): " + error.message); }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(s, getE);
  } else {
    getE("Geolocation is not supported in this browser.");
  }
}

/* createFile(<filename: string>,<content: string>[,dataType: string]):
  undefined */
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

/* getFullscreen(): element object */
function getFullscreen () {
  return (document.fullscreenElement
    || document.mozFullScreenElement
    || document.webkitFullscreenElement
    || document.msFullscreenElement
    || undefined
  );
}

/* setFullscreenOn(<element object>): undefined */
/* setFullscreenOn(<selector string>): undefined */
function setFullscreenOn (s) {
  if (typeof s === "string") { var e = document.querySelector(s); }
  else if (typeof s === "object") { var e = s; }
  if (e.requestFullscreen) { e.requestFullscreen(); }
  else if (e.mozRequestFullScreen) { e.mozRequestFullScreen(); }
  else if (e.webkitRequestFullscreen) { e.webkitRequestFullscreen(); }
  else if (e.msRequestFullscreen) { e.msRequestFullscreen(); }
}

/* setFullscreenOff(): undefined */
function setFullscreenOff () {
  if (document.exitFullscreen) { document.exitFullscreen(); }
  else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
  else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
  else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}

/*  domGetCSSVar(<name: string>): string */
const domGetCSSVar = (n) => getComputedStyle(document.documentElement)
  .getPropertyValue( n[0] === "-" ? n : "--" + n );

/* domSetCSSVar(<name: string>,<value: string>): undefined */
const domSetCSSVar = (n, v) =>
  document.documentElement.style.setProperty((n[0] === "-" ? n : "--" + n), v);

/** AJAX **/

/* getText(<url: string>,<success: function>): undefined */
function getText (u, s) { celestra.ajax({url: u, success: s}); }

/* getJson(<url: string>,<success: function>): undefined */
function getJson (u, s) { celestra.ajax({url: u, format: "json", success: s}); }

/* ajax(<Options object>): undefined */
function ajax (o) {
  if (typeof o.url !== "string") {
    throw new TypeError("Celestra ajax error: The url parameter have to be a string.");
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

/** type checking **/

/* isPlainObject(<value: any>): boolean */
const isPlainObject = (v) => (!!v && typeof v === "object" &&
  (Object.getPrototypeOf(v) === Object.prototype
    || Object.getPrototypeOf(v) === null));

/* isEmptyMap(<value: any>): boolean */
const isEmptyMap = (v) => (celestra.getType(v, "map") && v.size === 0);

/* isEmptySet(<value: any>): boolean */
const isEmptySet = (v) => (celestra.getType(v, "set") && v.size === 0);

/* isEmptyIterator(<value: any>): boolean */
function isEmptyIterator (it) {for(let item of it) {return false;} return true;}

/* isDataView(<value: any>): boolean */
const isDataView = (v) => celestra.getType(v, "dataview");

/* isError(<value: any>): boolean */
const isError = (v) => celestra.getType(v, "error");

/* isPromise(<value: any>): boolean */
const isPromise = (v) =>(typeof v === "object" && typeof v.then === "function");

/* isSameObject(<object1>,<object2>): boolean */
function isSameObject (o1, o2) {
  if (o1.constructor !== o2.constructor ) { return false; }
  var a1 = Object.keys(o1).sort(), a2 = Object.keys(o2).sort();
  if (a1.length === a2.length) {
    for (var i = 0, l = a1.length; i < l; i++) {
      if (a1[i] !== a2[i] || o1[a1[i]] !== o2[a1[i]]) { return false; }
    }
    return true;
  }
  return false;
}

/* isSameArray(<array1>,<array2>): boolean */
const isSameArray = (a, b) => ( Array.isArray(a) && Array.isArray(b)
  && (a.length === b.length) && a.every((v,i) => v === b[i]) );

/* isSameMap(<map1>,<map2>): boolean */
function isSameMap (m1, m2) {
  if (celestra.getType(m1, "map") && celestra.getType(m2, "map")
    && m1.size === m2.size) {
    for (const item of m1.keys()) {
      if (m1.get(item) !== m2.get(item)) { return false; }
    }
    return true;
  }
  return false;
}

/* isSameSet(<set1>,<set2>): boolean */
function isSameSet (s1, s2) {
  if (celestra.getType(s1, "set") && celestra.getType(s2, "set")
    && s1.size === s2.size) {
    for (const item of s1) {
      if (!s2.has(item)) { return false; }
    }
    return true;
  }
  return false;
}

/* isSameIterator(<iterator1>,<iterator2>): boolean */
const isSameIterator = ([...a1], [...a2]) =>
  celestra.isSameArray(a1.sort(), a2.sort());

/* isString(<value: any>): boolean */
const isString = (v) => (typeof v === "string");

/* isChar(<value: any>): boolean */
const isChar = (v) => (typeof v === "string" && v.length === 1);

/* isNumber(<value: any>): boolean */
const isNumber = (v) => (typeof v === "number");

/* isFloat(<value: any>): boolean */
const isFloat = (v) => (typeof v === "number" && !!(v % 1));

/* isNumeric(<value: any>): boolean */
const isNumeric = (v) => ( (typeof v === "number" && v === v)
  ? true : (!isNaN(parseFloat(v)) && isFinite(v)) );

/* isBoolean(<value: any>): boolean */
const isBoolean = (v) => (typeof v === "boolean");

/* isObject(<value: any>): boolean */
const isObject = (v) => (typeof v === "object" && v !== null);

/* isEmptyObject(<value: any>): boolean */
const isEmptyObject = (v) =>
  (v != null && typeof v === "object" && Object.keys(v).length === 0);

/* isFunction(<value: any>): boolean */
const isFunction = (v) => (typeof v === "function");

/* isEmptyArray(<value: any>): boolean */
const isEmptyArray = (v) => (Array.isArray(v) && v.length === 0);

/* isArraylike(<value: any>): boolean */
const isArraylike = (v) =>
  ((typeof v === "object" || typeof v === "string") && v !== null
    && typeof v.length === "number" && v.length >= 0 && v.length % 1 === 0);

/* isNull(<value: any>): boolean */
const isNull = (v) => (v === null);

/* isUndefined(<value: any>): boolean */
const isUndefined = (v) => (v === undefined);

/* isNullOrUndefined(<value: any>): boolean */
const isNullOrUndefined = (v) => (v == null);
/* isNil(<value: any>): boolean */
const isNil = isNullOrUndefined;

/* isPrimitive(<value: any>): boolean */
const isPrimitive = (v) =>
  (v === null || typeof v !== "object" && typeof v !== "function");

/* isSymbol(<value: any>): boolean */
const isSymbol = (v) => (typeof v === "symbol");

/* isMap(<value: any>): boolean */
const isMap = (v) => celestra.getType(v, "map");

/* isSet(<value: any>): boolean */
const isSet = (v) => celestra.getType(v, "set");

/* isWeakMap(<value: any>): boolean */
const isWeakMap = (v) => celestra.getType(v, "weakmap");

/* isWeakSet(<value: any>): boolean */
const isWeakSet = (v) => celestra.getType(v, "weakset");

/* isIterator(<value: any>): boolean */
const isIterator = (v) =>
  (celestra.getType(v).includes("iterator") || (typeof v.next === "function"));

/* isDate(<value: any>): boolean */
const isDate = (v) => celestra.getType(v, "date");

/* isRegexp(<value: any>): boolean */
const isRegexp = (v) => celestra.getType(v, "regexp");

/* isElement(<value: any>): boolean */
const isElement = (v) => (typeof v === "object" && v.nodeType === 1);

/* isIterable(<value: any>): boolean */
const isIterable = (v) => (typeof v[Symbol.iterator] === "function");

/* isBigInt(<value: any>): boolean */
const isBigInt = (v) => (typeof v === "bigint");

/* isArrayBuffer(<value: any>): boolean */
const isArrayBuffer = (v) => celestra.getType(v, "arraybuffer");

/* isTypedArray(<value: any>): boolean */
const isTypedArray = (v) =>
  ["int8array", "uint8array", "uint8clampedarray", "int16array", "uint16array",
   "int32array", "uint32array", "float32array", "float64array",
   "bigint64array", "biguint64array"].includes(celestra.getType(v));

/* isGeneratorFn(<value: any>): boolean */
const isGeneratorFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(function*(){}).constructor);

/* isAsyncFn(<value: any>): boolean */
const isAsyncFn = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(async function(){}).constructor);

/** cookie **/

/* setCookie(<Options object>): undefined */
/* setCookie(<name: string>,<value: string>
  [,hours=8760[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]]):
  undefined */
function setCookie (name, value, hours = 8760, path = "/", domain, secure,
  SameSite = "Lax", HttpOnly) {
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
  expire.setTime(expire.getTime() + (Math.round(hours * 60 * 60 * 1000)));
  document.cookie = encodeURIComponent(name)
    + "=" + encodeURIComponent(value)
    + "; expires=" + expire.toUTCString()
    + "; path=" + path
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (typeof SameSite==="string"&&SameSite.length>0 ?"; SameSite="+SameSite:"")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
}

/* getCookie(): object */
/* getCookie([name: string]): string */
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

/* hasCookie(<name: string>): boolean */
const hasCookie = (n) => (document.cookie.includes(encodeURIComponent(n)+"="));

/* removeCookie(<Options object>);: boolean */
/* removeCookie(<name: string>
  [,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]): boolean */
function removeCookie (name, path = "/", domain, secure,
  SameSite = "Lax", HttpOnly) {
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
    + (typeof SameSite==="string"&&SameSite.length>0 ?"; SameSite="+SameSite:"")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
  return r;
}

/* clearCookies(<Options object>): boolean */
/* clearCookies(
  [path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]): boolean */
function clearCookies (path = "/", domain, secure, SameSite = "Lax", HttpOnly) {
  if (typeof path === "object") {
    var settings = path;
    path = settings.path || "/";
    domain = settings.domain;
    secure = settings.secure;
    SameSite = settings.SameSite || "Lax";
    HttpOnly = settings.HttpOnly;
  }
  for (let item of Object.keys(celestra.getCookie())) {
    celestra.removeCookie(item, path, domain, secure, SameSite, HttpOnly);
  }
}

/** collections **/

/* initial(<collection>): array */
const initial = ([...a]) => a.slice(0, -1);

/* shuffle(<collection>): array */
function shuffle([...a]) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* partition(<collection>,<callback: function>): array */
const partition = ([...a],fn) => [a.filter(fn),a.filter((e,i,a)=>!(fn(e,i,a)))];

/* groupBy(<collection>,<callback: function>): object */
function groupBy (it, fn) {
  let r = {}, i = 0;
  for (let item of it) {
    let key = fn(item, i++);
    if (!(Object.hasOwn(r, key))) { r[key] = []; }
    r[key].push(item);
  }
  return r;
}

/* arrayUnion(<collection1>[,collectionN]): array */
const arrayUnion = (...a) => [...new Set(a.map(([...e]) => e).flat())];

/* arrayIntersection(<collection1>,<collection2>): array */
const arrayIntersection = ([...a], [...b]) =>
  a.filter((v) => b.includes(v)).filter((e, i, arr) => arr.indexOf(e) === i);

/* arrayDifference(<collection1>,<collection2>): array */
const arrayDifference = ([...a], [...b]) =>
  a.filter((v) => !(b.includes(v))).filter((e, i, arr) => arr.indexOf(e) === i);

/* arraySymmetricDifference(<collection1>,<collection2>): array */
const arraySymmetricDifference = ([...a], [...b]) =>
  a.filter((v) => !(b.includes(v)))
    .concat(b.filter((v) => !(a.includes(v))))
    .filter((e, i, arr) => arr.indexOf(e) === i);

/* setUnion(<collection1>[,collectionN]): set */
const setUnion = (...a) => new Set(a.map(([...e]) => e).flat());

/* setIntersection(<set1>,<set2>): set */
const setIntersection = ([...a], b) => new Set(a.filter((v) => b.has(v)));

/* setDifference(<set1>,<set2>): set */
const setDifference = ([...a], b) => new Set(a.filter((v) => !(b.has(v))));

/* setSymmetricDifference(<set1>,<set2>): set */
const setSymmetricDifference = (a, b) => new Set(
  [...a].filter((v) => !(b.has(v))).concat([...b].filter((v) => !(a.has(v))))
);

/* isSuperset(<superCollection>,<subCollection>): boolean */
const isSuperset = ([...sup], [...sub]) => sub.every((v) => sup.includes(v));

/* min(<collection>): any */
const min = ([...a]) => a.reduce((acc, v) => (v < acc ? v : acc), a[0]);

/* max(<collection>): any */
const max = ([...a]) => a.reduce((acc, v) => (v > acc ? v : acc), a[0]);

/* arrayRepeat(<value: any>[,n=100]): array */
const arrayRepeat = (v, n = 100) => Array(n).fill(v);

/* arrayCycle(<collection>[,n=100]): array */
const arrayCycle = ([...a], n = 100) => Array(n).fill(a).flat();

/* arrayRange([start=0[,end=100[,step=1]]]): array */
const arrayRange = (s = 0, e = 100, st = 1) =>
  Array.from({length: (e - s) / st + 1}, (v, i) => s + (i * st));

/* zip(<collection1>[,collectionN]): array */
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

/* unzip(<collection>): array */
function unzip ([...a]) {
  a = a.map(([...v]) => v);
  let r = [], i, j, l1 = a[0].length, l2 = a.length;
  for (i = 0; i < l1; i++) { r.push([]); }
  for (i = 0; i < l1; i++) {
    for (j = 0; j < l2; j++) { r[i].push(a[j][i]); }
  }
  return r;
}

/* zipObj(<collection1>,<collection2>): object */
const zipObj = ([...a1], [...a2]) => Object.fromEntries(celestra.zip(a1, a2));

/* arrayUnique(<collection>[,callback: function]): array */
const arrayUnique = (a) => [...new Set(a)];

/* arrayAdd(<array>,<value: any>): boolean */
const arrayAdd = (a, v) => !a.includes(v) ? !!a.push(v) : false;

/* arrayClear(<array>): array */
function arrayClear (a) { a.length = 0; return a; }

/* arrayRemove(<array>,<value: any>[,all=false]): boolean */
function arrayRemove (a, v, all = false) {
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

/* arrayRemoveBy(<array>,<callback: function>[,all=false]): boolean */
function arrayRemoveBy (a, fn, all = false) {
  var found = a.findIndex(fn) > -1;
  if (!all) {
    var pos = a.findIndex(fn);
    if (pos > -1) { a.splice(pos, 1); }
  } else {
    var pos = -1;
    while ((pos = a.findIndex(fn)) > -1) { a.splice(pos, 1); }
  }
  return found;
}

/* arrayMerge([flat=false,]<target: array>,<source1: any>[,sourceN: any]):
  array */
function arrayMerge (flat, ...a) {
  if (typeof flat === "boolean") {
    var t = a[0];
    a = a.slice(1);
  } else {
    var t = flat;
    flat = false;
  }
  if (flat) {
    t.push(...[].concat(...a.flat(Infinity)));
  } else {
    t.push(...[].concat(...a));
  }
  return t;
}

/* iterRange([start=0[,step=1[,end=Infinity]]]): iterator */
function* iterRange (s = 0, st = 1, e = Infinity) {
  let i = s;
  while (i <= e) { yield i; i += st; }
}

/* iterCycle(<iter>[,n=Infinity]): iterator */
function* iterCycle ([...a], n = Infinity){let i=0; while(i<n) {yield* a; i++;}}

/* iterRepeat(<value: any>[,n=Infinity]): iterator */
function* iterRepeat (v, n=Infinity) { let i=0; while (i<n) { yield v; i++; } }

/* takeWhile(<collection>,<callback: function>): iterator */
function* takeWhile (it, fn) {
  for (let item of it) {
    if (!fn(item)) { break; }
    yield item;
  }
}

/* dropWhile(<collection>,<callback: function>): iterator */
function* dropWhile (it, fn) {
  let d = true;
  for (let item of it) {
    if (d && !fn(item)) { d = false; }
    if (!d) { yield item; }
  }
}

/* take(<collection>[,n=1]): iterator */
function* take (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
}

/* drop(<collection>[,n=1]): iterator */
function* drop (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i < 1) { yield item; } else { i--; }
  }
}

/* forEach(<collection>,<callback: function>): undefined */
function forEach (it, fn) { let i = 0; for (let item of it) { fn(item, i++); } }

/* map(<collection>,<callback: function>): iterator */
function* map (it, fn) { let i=0; for (let item of it) { yield fn(item,i++); } }

/* filter(<collection>,<callback: function>): iterator */
function* filter (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { yield item; }
  }
}

/* reject(<collection>,<callback: function>): iterator */
function* reject (it, fn) {
  let i = 0;
  for (let item of it) {
    if (!fn(item, i++)) { yield item; }
  }
}

/* slice(<collection>[,begin=0[,end=Infinity]]): iterator */
function* slice (it, begin = 0, end = Infinity) {
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

/* tail(<collection>): iterator */
function* tail (it) {
  let first = true;
  for (let item of it) {
    if (!first) { yield item; } else { first = false; }
  }
}

/* item(<collection>,<index: integer>): any */
function item (it,p) {let i=0; for(let item of it) {if(i++===p) {return item;}}}
/* nth(<collection>,<index: integer>): any */
const nth = item;

/* size(<collection>): integer */
function size (it) { let i = 0; for (let item of it) { i++; } return i; }

/* first(<collection>): any */
function first (it) { for (let item of it) { return item; } }
/* head(<collection>): any */
const head = first;

/* last(<collection>): any */
function last (it) { let item; for (item of it) { } return item; }

/* reverse(<collection>): array */
const reverse = ([...a]) => a.reverse();

/* sort(<collection>[,numbers=false]): array */
const sort = ([...a], ns) => a.sort(ns
  ? (a, b) => { if (a<b){return -1;} if (a>b){return 1;} return 0; } : undefined
);

/* includes(<collection>,<value: any>): boolean */
const includes = ([...a], v) => (a.indexOf(v) > -1);
/* contains(<collection>,<value: any>): boolean */
const contains = includes;

/* find(<collection>,<callback: function>): any */
const find = ([...a], fn) => a.find((v, i) => fn(v, i));

/* findLast(<collection>,<callback: function>): any */
const findLast = ([...a], fn) => a.findLast((v, i) => fn(v, i));

/* every(<collection>,<callback: function>): boolean */
const every = ([...a], fn) => a.length > 0 ? a.every((v, i) => fn(v, i)): false;

/* some(<collection>,<callback: function>): boolean */
const some = ([...a], fn) => a.length > 0 ? a.some((v, i) => fn(v, i)): false;

/* none(<collection>,<callback: function>): boolean */
const none = ([...a], fn) => a.length > 0 ? a.every((v,i) => !(fn(v,i))): false;

/* takeRight(<collection>[,n=1]): array */
const takeRight = ([...a], n = 1) => a.reverse().slice(0, n);

/* takeRightWhile(<collection>,<callback: function>): iterator */
function* takeRightWhile ([...a], fn) {
  let i = 0;
  for (let item of a.reverse()) {
    if (fn(item, i++)) { yield item; } else { break; }
  }
}

/* dropRight(<collection>[,n=1]): array */
const dropRight = ([...a], n = 1) => a.reverse().slice(n);

/* dropRightWhile(<collection>,<callback: function>): iterator */
function* dropRightWhile ([...a], fn) {
  let d = true, i = 0;
  for (let item of a.reverse()) {
    if (d && !fn(item, i++)) { d = false; }
    if (!d) { yield item; }
  }
}

/* concat(<collection1>[,collectionN]): iterator */
function* concat () { for (let item of arguments) { yield* item; } }

/* reduce(<collection>,<callback: function>[,initialvalue: any]): any */
function reduce (it, fn, iv) {
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

/* enumerate(<collection>): iterator */
function* enumerate (it, offset = 0) {
  let i = offset;
  for (let item of it) { yield [i++, item]; }
}
/* entries(<collection>[,offset=0]): iterator */
const entries = enumerate;

/* flat(<collection>): iterator */
function* flat (it) { for (let item of it) { yield* item; } }

/* join(<collection>[,separator=","]): string */
const join = ([...a], s = ",") => a.join(s);

/* withOut(<collection>,<filterCollection>): array */
const withOut = ([...a], [...fl]) => a.filter( (e) => fl.indexOf(e) === -1 );

/** object header **/

const VERSION = "Celestra v4.5.2 dev";

/* celestra.noConflict(): celestra object */
function noConflict () {
  window._ = celestra.__prevUnderscore__;
  return celestra;
}

var celestra = {
  /** object header **/
  VERSION: VERSION,
  noConflict: noConflict,
  /** core api **/
  randomID: randomID,
  signbit: signbit,
  delay: delay,
  randomInt: randomInt,
  randomFloat: randomFloat,
  randomBoolean: randomBoolean,
  randomString: randomString,
  inRange: inRange,
  b64Encode: b64Encode,
  b64Decode: b64Decode,
  javaHash: javaHash,
  inherit: inherit,
  getUrlVars: getUrlVars,
  obj2string: obj2string,
  getType: getType,
  extend: extend,
  deepAssign: deepAssign,
  strPropercase: strPropercase,
  strCapitalize: strCapitalize,
  strUpFirst: strUpFirst,
  strDownFirst: strDownFirst,
  strHTMLRemoveTags: strHTMLRemoveTags,
  strReverse: strReverse,
  strCodePoints: strCodePoints,
  strFromCodePoints: strFromCodePoints,
  strAt: strAt,
  sizeIn: sizeIn,
  forIn: forIn,
  filterIn: filterIn,
  popIn: popIn,
  toFunction: toFunction,
  bind: bind,
  constant: constant,
  identity: identity,
  noop: noop,
  T: T,
  F: F,
  assertEq: assertEq,
  assertNotEq: assertNotEq,
  assertTrue: assertTrue,
  assertFalse: assertFalse,
  strHTMLEscape: strHTMLEscape,
  strHTMLUnEscape: strHTMLUnEscape,
  /** DOM **/
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
  domSiblingsPrev: domSiblingsPrev,
  domSiblingsLeft: domSiblingsLeft,
  domSiblingsNext: domSiblingsNext,
  domSiblingsRight: domSiblingsRight,
  importScript: importScript,
  importStyle: importStyle,
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
  /** AJAX **/
  getText: getText,
  getJson: getJson,
  ajax: ajax,
  /** type checking **/
  isPlainObject: isPlainObject,
  isEmptyMap: isEmptyMap,
  isEmptySet: isEmptySet,
  isEmptyIterator: isEmptyIterator,
  isDataView: isDataView,
  isError: isError,
  isPromise: isPromise,
  isSameObject: isSameObject,
  isSameArray: isSameArray,
  isSameMap: isSameMap,
  isSameSet: isSameSet,
  isSameIterator: isSameIterator,
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
  /** cookie **/
  setCookie: setCookie,
  getCookie: getCookie,
  hasCookie: hasCookie,
  removeCookie: removeCookie,
  clearCookies: clearCookies,
  /** collections **/
  initial: initial,
  shuffle: shuffle,
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
  zipObj: zipObj,
  arrayUnique: arrayUnique,
  arrayAdd: arrayAdd,
  arrayClear: arrayClear,
  arrayRemove: arrayRemove,
  arrayRemoveBy: arrayRemoveBy,
  arrayMerge: arrayMerge,
  iterRange: iterRange,
  iterCycle: iterCycle,
  iterRepeat: iterRepeat,
  takeWhile: takeWhile,
  dropWhile: dropWhile,
  take: take,
  drop: drop,
  forEach: forEach,
  map: map,
  filter: filter,
  reject: reject,
  slice: slice,
  tail: tail,
  item: item,
  nth: nth,
  size: size,
  first: first,
  head: head,
  last: last,
  reverse: reverse,
  sort: sort,
  includes: includes,
  contains: contains,
  find: find,
  findLast: findLast,
  every: every,
  some: some,
  none: none,
  takeRight: takeRight,
  takeRightWhile: takeRightWhile,
  dropRight: dropRight,
  dropRightWhile: dropRightWhile,
  concat: concat,
  reduce: reduce,
  enumerate: enumerate,
  entries: entries,
  flat: flat,
  join: join,
  withOut: withOut
};

if (typeof window !== "undefined") {
  window.celestra = celestra;
  celestra.__prevUnderscore__ = window._;
  window._ = celestra;
}

}(window, document));
