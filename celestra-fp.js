/**
 * @name Celestra FP
 * @version 1.18.0
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */
"use strict";

/* polyfills */

if (!Array.from) {
  Array.from = function (o, fn) {
    var a = Array.prototype.slice.call(o);
    if (fn) { return a.map(fn); }
    return a;
  };
}

if (!Array.of) {
  Array.of = function () { return Array.prototype.slice.call(arguments); };
}

if (!Object.create) {
  Object.create = function (o) {
    function F(){}
    F.prototype = o;
    return new F();
  };
}

if (!Object.assign) {
  Object.assign = function () {
    var t = arguments[0] || {};
    for (var i = 0, l = arguments.length; i < l; i++) {
      var s = arguments[i];
      for (var a in s) { if (s.hasOwnProperty(a)) { t[a] = s[a]; } }
    }
    return t;
  };
}

if(!Array.prototype.includes) {
  Array.prototype.includes = function (v, f) {
    if (!f) { var f = 0; }
    return (this.indexOf(v,f) > -1);
  };
}

if(!String.prototype.includes) {
  String.prototype.includes = function (v, f) {
    if (!f) { var f = 0; }
    return (this.indexOf(v,f) > -1);
  };
}

[Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function (p) {
  if (!p.after) {
    p.after = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.insertBefore((e instanceof Node ? e : document.createTextNode(String(e))), t.nextSibling);
      });
    };
  }
  if (!p.before) {
    p.before = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.insertBefore((e instanceof Node ? e : document.createTextNode(String(e))), t);
      });
    };
  }
  if (!p.remove) { p.remove = function () { this.parentNode.removeChild(this); }; }
  if (!p.replaceWith) {
  p.replaceWith = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.replaceChild((e instanceof Node ? e : document.createTextNode(String(e))), t);
      });
    };
  }
  if (!p.append) {
    p.append = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.appendChild(e instanceof Node ? e : document.createTextNode(String(e)));
      });
    };
  }
  if (!p.prepend) {
  p.prepend = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.insertBefore((e instanceof Node ? e : document.createTextNode(String(e))), t.firstChild);
      });
    };
  }
});

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (f) {
    for (var i = 0, l = this.length; i < l; i++) { f(this[i], i, this); }
  };
}

/* Number ES6 */

if (Number.MIN_SAFE_INTEGER === undefined) {
  Number.MIN_SAFE_INTEGER = -9007199254740991;
}

if (Number.MAX_SAFE_INTEGER === undefined) {
  Number.MAX_SAFE_INTEGER = 9007199254740991;
}

if (Number.EPSILON === undefined) {
  Number.EPSILON = Math.pow(2, -52);
}

if (!Number.isNaN) { Number.isNaN = function (v) { return v !== v; }; }

if (!isNaN) {
  var isNaN = function isNaN (v) { return Number.isNaN(Number(v)); };
}

if (!Number.isInteger) {
  Number.isInteger = function (v) {
    return typeof v === "number" && isFinite(v) && v > -9007199254740992 && v < 9007199254740992 && Math.floor(v) === v;
  };
}

if (!Number.isFinite) {
  Number.isFinite = function (v) { return typeof v === "number" && isFinite(v); };
}

if (!Number.isSafeInteger) {
  Number.isSafeInteger = function (v) {
    return Number.isInteger(v) && Math.abs(v) <= Number.MAX_SAFE_INTEGER;
  };
}

/* basic api */

var doc = document;

function qsa (s, c) {
  if (c) { var ic = (typeof c === "string") ? document.querySelector(c) : c; }
  var el = Array.prototype.slice.call((ic || document).querySelectorAll(s));
  el.each = el.forEach;
  return el;
}

function qs (s, c) {
  if (c) { var ic = (typeof c === "string") ? document.querySelector(c) : c; }
  return (ic || document).querySelector(s);
}

function domReady (fn) {
  if (document.readyState!=="loading") {
    fn();
  }
  else {
    document.addEventListener("DOMContentLoaded",function (event) { fn(); });
  }
}

function random (i, a) {
  if (a === undefined) { var a = i; i = 0; }
  return Math.floor(Math.random()*(a-i+1))+i;
}

function inherit (c, p) {
  c.prototype = Object.create(p.prototype);
  c.prototype.constructor = c;
  return c;
}

function getScript (u, s) {
  var scr = document.createElement("script");
  scr.type = "text\/javascript";
  scr.src = u;
  scr.onerror = function (e) {
    throw new URIError("Loading failed for the script with source "+e.target.src);
  };
  if (s) { scr.onreadystatechange = s; scr.onload = s; }
  (document.head || document.getElementsByTagName("head")[0]).appendChild(scr);
}

function getScripts (s) {
  if (Array.isArray(s)) {
    s.forEach(function (e) {
      if (e.success) { getScript(e.url, e.success); } else { getScript(e.url); }
    });
  }
}

function getStyle (h, s) {
  var stl = document.createElement("link");
  stl.rel = "stylesheet";
  stl.type = "text\/css";
  stl.href = h;
  stl.onerror = function (e) {
    throw new URIError("Loading failed for the style with source "+e.target.href);
  };
  if (s) { stl.onreadystatechange = s; stl.onload = s; }
  (document.head || document.getElementsByTagName("head")[0]).appendChild(stl);
}

function getStyles (s) {
  if (Array.isArray(s)) {
    s.forEach(function (e) {
      if (e.success) { getStyle(e.href, e.success); } else { getStyle(e.href); }
    });
  }
}

function getUrlVar (n) {
  var r = {}, w = window.location.search.substring(1).split("&");
  for(var i = 0, l = w.length; i < l; i++) {
    var e = w[i].split("=");
    r[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
  }
  if (n) { return r[n] ? r[n] : undefined; } else { return r; }
}

function getUrlVarFromString (qstr,n) {
  var r = {}, w = qstr.substring(1).split("&");
  for(var i = 0, l = w.length; i < l; i++) {
    var e = w[i].split("=");
    r[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
  }
  if (n) { return r[n] ? r[n] : undefined; } else { return r; }
}

function obj2string (o) {
  var s = "";
  for (var p in o) {
    if (o.hasOwnProperty(p)) {
      s += encodeURIComponent(p) + "=" + encodeURIComponent(o[p]) + "&";
    }
  }
  return s.substring(0,s.length-1);
}

function getType (v, t) {
  var ot = (typeof v).toLowerCase();
  if (ot === "object") {
    ot = Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  }
  if (arguments.length === 2) { return ot === t.toLowerCase(); }
  return ot;
}

function extend () {
  if (typeof arguments[0] === "boolean") {
    var t = arguments[1], d = arguments[0], s = 2;
  } else {
    var t = arguments[0], d = false, s = 1;
  }
  for (var i = s, l = arguments.length; i < l; i++) {
    if (arguments[i] !== null && arguments[i] !== undefined) {
      for (var a in arguments[i]) {
        if (Object.prototype.toString.call(arguments[i][a]) === "[object Object]" && d) {
          t[a] = extend(true, {}, arguments[i][a]);
        } else {
          t[a] = arguments[i][a];
        }
      }
    }
  }
  return t;
}

function getFullscreen () {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    undefined
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

function getLocation (s, e) {
  if (!e) { var e = function () {}; }
  function getE (error) { e("ERROR(" + error.code + "): " + error.message); }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(s, getE);
  } else {
    getE ("Geolocation is not supported in this browser.");
  }
}

function getDoNotTrack () {
  if ( navigator.doNotTrack === true // FF
    || navigator.doNotTrack === 1
    || navigator.doNotTrack === "1"
    || window.doNotTrack === true // IE11, EDGE, Safari 7.1.3+
    || window.doNotTrack === 1
    || window.doNotTrack === "1"
    || navigator.msDoNotTrack === true // IE9-10
    || navigator.msDoNotTrack === 1
    || navigator.msDoNotTrack === "1"
  ) { return true; }
  return false;
}

function constant (v) { return function () { return v; }; }

function identity (v) { return v; }

function noop () { return undefined; }

function repeat (r, fn) { for (var i = 0; i < r; i++) { fn(i); } }

/* FP */

function toFunction (fn) { return Function.prototype.call.bind(fn); }

var bind = Function.prototype.call.bind(Function.prototype.bind);

var toArray = (Array.from || Function.prototype.call.bind(Array.prototype.slice));

function toObject (a) {
  var o = { length : a.length };
  for (var i = 0, len = a.length; i < len; i++) { o[""+i] = a[i]; }
  return o;
}

var forEach = Function.prototype.call.bind(Array.prototype.forEach);

var each = forEach;

var map = Function.prototype.call.bind(Array.prototype.map);

function forIn (o, fn) {
  for (var p in o) { if (o.hasOwnProperty(p)) { fn(o[p], p, o); } }
}

function mapIn (o, fn) {
  var r = {};
  for (var p in o) {
    if (o.hasOwnProperty(p)) { r[p] = fn(o[p], p, o); }
  }
  return r;
}

/* DOM */

function domCreate (t, ps, iH) {
  var el = document.createElement(t);
  if (ps) {
    for (var p in ps) {
      if (p!=="style") {
        el[p] = ps[p];
      } else {
        for (var s in ps[p]) { el.style[s] = ps[p][s]; }
      }
    }
  }
  if (iH) { el.innerHTML = iH; }
  return el;
}

function domGetCSS (e, p) {
  return (window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle)[p];
}

function domSetCSS (e, n, v) {
  if (typeof n === "string") { e.style[n] = v; }
  else if (typeof n === "object") {
    for (var p in n) { e.style[p] = n[p]; }
  }
}

function domFadeIn (e, dur, d) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 0);
  s.display = (d || "");
  (function fade () { (s.opacity = parseFloat(s.opacity)+step) > 1 ? s.opacity = 1 : setTimeout(fade, 25); })();
}

function domFadeOut (e, dur) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 1);
  (function fade () { (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25); })();
}

function domFadeToggle (e, dur, d) {
  if ((window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).display === "none") {
    domFadeIn(e, dur, (d || ""));
  } else {
    domFadeOut(e, dur);
  }
}

function domHide (e) { e.style.display = "none"; }

function domShow (e, d) { e.style.display = (d || ""); }

function domToggle (e, d) {
  if ((window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).display === "none") {
    e.style.display = (d || "");
  } else {
    e.style.display = "none";
  }
}

function domOn (el, et, fn) {
  return el.addEventListener ? el.addEventListener(et, fn) : el.attachEvent("on" + et, fn);
}

function domOff (el, et, fn) {
  return el.removeEventListener ? el.removeEventListener(et, fn) : el.detachEvent("on" + et, fn);
}

function domTrigger (el, et) { return el[et](); }

/* AJAX */

function getJson (url, success) { getAjax (url,"json",success); }

function getText (url, success) { getAjax (url,"text",success); }

function getAjax (url, format, success, error, user, password) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  if (typeof user === "string" && typeof password === "string") {
    xhr.open("GET", url, true, user, password);
  } else {
    xhr.open("GET", url, true);
  }
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      switch (format.toLowerCase()) {
        case "text": success(this.responseText); break;
        case "json": success(JSON.parse(this.responseText)); break;
        case "xml": success(this.responseXML); break;
        default: success(this.responseText);
      }
    }
  };
  if (error) { xhr.onerror = error; }
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send();
}

function postAjax (url, data, format, success, error, user, password) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  if (typeof user === "string" && typeof password === "string") {
    xhr.open("POST", url, true, user, password);
  } else {
    xhr.open("POST", url, true);
  }
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      switch (format.toLowerCase()) {
        case "text": success(this.responseText); break;
        case "json": success(JSON.parse(this.responseText)); break;
        case "xml": success(this.responseXML); break;
        default: success(this.responseText);
      }
    }
  };
  if (error) { xhr.onerror = error; }
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(encodeURIComponent(data));
}

function getCors (url, format, success, error, user, password) {
  var xhr = new XMLHttpRequest();
  if (!("withCredentials" in xhr)) xhr = new XDomainRequest();
  if (typeof user === "string" && typeof password === "string") {
    xhr.open("GET", url, true, user, password);
  } else {
    xhr.open("GET", url, true);
  }
  xhr.onload = function(request) {
    switch (format.toLowerCase()) {
      case "text": success(request.target.responseText || request.currentTarget.response); break;
      case "json": success(JSON.parse(request.target.responseText || request.currentTarget.response)); break;
      case "xml": success(request.target.responseXML || request.currentTarget.responseXML); break;
      default: success(request.target.responseText || request.currentTarget.response);
    }
  };
  if (error) { xhr.onerror = error; }
  xhr.send();
}

function postCors (url, data, format, success, error, user, password) {
  var xhr = new XMLHttpRequest();
  if (!("withCredentials" in xhr)) xhr = new XDomainRequest();
  if (typeof user === "string" && typeof password === "string") {
    xhr.open("POST", url, true, user, password);
  } else {
    xhr.open("POST", url, true);
  }
  xhr.onload = function(request) {
    switch (format.toLowerCase()) {
      case "text": success(request.target.responseText || request.currentTarget.response); break;
      case "json": success(JSON.parse(request.target.responseText || request.currentTarget.response)); break;
      case "xml": success(request.target.responseXML || request.currentTarget.responseXML); break;
      default: success(request.target.responseText || request.currentTarget.response);
    }
  };
  if (error) { xhr.onerror = error; }
  xhr.send(encodeURIComponent(data));
}

/* type checking */

function isString (v) { return typeof v === "string"; }
function isChar (v) {
  if (typeof v === "string") { if (v.length === 1) { return true; } }
  return false;
}

function isNumber (v) { return typeof v === "number"; }
var isInteger = Number.isInteger;
function isFloat(v) { return typeof v === "number" && !!(v % 1); }

function isBoolean (v) { return typeof v === "boolean"; }

function isObject (v) { return typeof v === "object"; }
function isEmptyObject(v) {
  if (typeof v === "object") {
    for (var n in v) { return false; }
    return true;
  }
  return false;
}

function isFunction (v) { return typeof v === "function"; }

var isArray = Array.isArray;
function isEmptyArray (v) {
  if (Array.isArray(v)) { if (v.length === 0) { return true; } }
  return false;
}
function isArraylike (v) {
	return v
    && typeof v === "object"
    && typeof v.length === "number"
    && v.length >= 0
    && v.length % 1 === 0;
}

function isNull (v) { return v === null; }
function isUndefined (v) { return v === undefined; }
function isNullOrUndefined (v) { return v === null || v === undefined; }

function isPrimitive (v) {
  return v === null || typeof v !== "object" && typeof v !== "function";
}

function isSymbol (v) { return typeof v === "symbol"; }
function isMap (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase() === "map";
}
function isSet (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase() === "set";
}

function isDate (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase() === "date";
}

function isRegexp (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase() === "regexp";
}

function isElement (v) {
  return typeof v === "object" && v.nodeType === 1;
}

/* cookie */

function setCookie (name, value, hours, path, domain, secure, HttpOnly) {
	if (!hours) { var hours = 8760; } // 1 year
	var expire = new Date();
	expire.setTime(expire.getTime()+(Math.round(hours*60*60*1000)));
	document.cookie =
    encodeURIComponent(name)
    + "="
    + encodeURIComponent(value)
    + "; expires="+expire.toUTCString()
    + (path ? "; path=" + path : "")
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
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
    if (name) {
      return r[name] ? r[name] : null;
    } else {
      return r;
    }
  }
  return name ? null : {};
}

function hasCookie (name) {
  return (document.cookie.indexOf(encodeURIComponent(name)+"=") !== -1);
}

function removeCookie (name, path, domain, secure, HttpOnly) {
  if (document.cookie.indexOf(encodeURIComponent(name)+"=") !== -1) {
    document.cookie =
      encodeURIComponent(name)
      + "="
      + "; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      + (path ? "; path=" + path : "")
      + (domain ? "; domain=" + domain : "")
      + (secure ? "; secure" : "")
      + (HttpOnly ? "; HttpOnly" : "")
      + ";";
    return true;
  }
  return false;
}
