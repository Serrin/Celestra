"use strict";

try {

/* Celestra unit tester */

var CUT = {};

CUT.VERSION = "Celestra Unit Tester (CUT) v0.8.28";

CUT.__results__ = document.querySelector("#results");
CUT.__resultsFailed__ = document.querySelector("#resultsFailed");

/* __addTest__(<step: string>, <expected>, <expression>); */
/* __addTest__(<step: string>, <expected>, <expression>[, strict: boolean]); */
/* only for inner calls and selftest */
CUT.__addTest__ = function __addTest__ (step,expected,expression, strict=true) {
  step = String(step);
  if (strict === undefined) { strict = true; }
  var el = document.createElement("p");
  if (strict ? expected === expression : expected == expression) {
    el.innerHTML = "[" + Date.now().toString(36)
      + "] <span class=\"passed\">[passed]</span> " + step;
    CUT.__results__.append(el);
  } else {
    el.innerHTML = "[" + Date.now().toString(36)
      + "] <span class=\"failed\">[failed]</span> " + step;
    CUT.__results__.append(el);
    CUT.__resultsFailed__.append(el.cloneNode(true));
  }
};

/* isTrue(<step: string>, <expression>[, strict: boolean]); */
CUT.isTrue = function isTrue (step, expression, strict = true) {
  CUT.__addTest__(step, true, expression, strict);
};

/* isFalse(<step: string>, <expression>[, strict: boolean]); */
CUT.isFalse = function isFalse (step, expression, strict = true) {
  CUT.__addTest__(step, false, expression, strict);
};

/* isEqual(<step: string>, <expected>, <expression>); */
/* isEqual(<step: string>, <expected>, <expression>[, strict: boolean]); */
CUT.isEqual = function isEqual (step, expected, expression, strict = true) {
  CUT.__addTest__(step, expected, expression, strict);
};

/* isNotEqual(<step: string>, <notExpected>, <expression>); */
/* isNotEqual(<step: string>, <notExpected>, <expression>[, strict: boolean]);*/
CUT.isNotEqual = function (step, notExpected, expression, strict = true) {
  CUT.__addTest__(step, true,
    (strict ? notExpected !== expression : notExpected != expression), true
  );
};

/* addElement(<element>); */
/* addElement(<elementType: string>[,innerHTML]); */
CUT.addElement = function addElement (elementType, iHtml) {
  if (typeof elementType === "object" && elementType.nodeType === 1) {
    CUT.__results__.append(elementType);
  } else {
    var el = document.createElement(elementType);
    if (iHtml) { el.innerHTML = iHtml; }
    CUT.__results__.append(el);
  }
};

/* log(<innerHTML>); */
CUT.log = function log (iHtml) { CUT.addElement("p", iHtml); };

/* logCode(<innerHTML>); */
CUT.logCode = function log (iHtml) {
  CUT.addElement("p", "<code>" + iHtml + "</code>");
};

/* clear(); */
CUT.clear = function clear () { CUT.__results__.innerHTML = ""; };

/* concat(<item1, item2, ...itemN>): string */
CUT.concat = function concat (...args) {
  let r = "";
  for (let item of args) { r += item; }
  return r;
};

/* join(<iterator>[, separator = " "]): string */
CUT.join = function join (it, separator = " ") {
  separator = String(separator);
  let r = "";
  for (let item of it) { r += separator + item; }
  return r.slice(separator.length);
}

/* take(<iterator>[,n=1]): iterator); */
CUT.take = function* take (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
}


/* ======================================================================== */


const today = new Date();

CUT.addElement("table",
  "<tr><td>CUT: </td><td><code>" + CUT.VERSION + "</code></td></tr>"
    + "<tr><td>Celestra: </td><td><code>" + celestra.VERSION
     + "</code></td></tr>"
    + "<tr><td>UTC date: </td><td><code>" + today.toISOString()
     + "</code></td></tr>"
    + "<tr><td>Local date: </td><td><code>" + today.toString()
      + "</code></td></tr>"
    + "<tr><td>EPOCH time: </td><td><code>" + Number(today) + " (10) / "
      + Number(today).toString(16) + " (16) / "
      + Number(today).toString(36) + " (36)" + "</code></td></tr>"
    + "<tr><td>navigator.appName: </td><td><code>" + navigator.appName
      + "</code></td></tr>"
    + "<tr><td>navigator.appCodeName: </td><td><code>" + navigator.appCodeName
      + "</code></td></tr>"
    + "<tr><td>navigator.product: </td><td><code>" + navigator.product
      + "</code></td></tr>"
    + "<tr><td>navigator.appVersion: </td><td><code>" + navigator.appVersion
      + "</code></td></tr>"
    + "<tr><td>navigator.buildID: </td><td><code>" + navigator.buildID
      + "</code></td></tr>"
    + "<tr><td>navigator.product: </td><td><code>" + navigator.product
      + "</code></td></tr>"
    + "<tr><td>navigator.productSub: </td><td><code>" + navigator.productSub
      + "</code></td></tr>"
    + "<tr><td>navigator.userAgent: </td><td><code>" + navigator.userAgent
      + "</code></td></tr>"
    + "<tr><td>navigator.userAgentData: </td><td><code>"
      + JSON.stringify(navigator.userAgentData) + "</code></td></tr>"
    + "<tr><td>navigator.doNotTrack: </td><td><code>" + navigator.doNotTrack
      + "</code></td></tr>"
    + "<tr><td>navigator.vendor: </td><td><code>" + navigator.vendor
      + "</code></td></tr>"
    + "<tr><td>navigator.platform: </td><td><code>" + navigator.platform
      + "</code></td></tr>"
    + "<tr><td>navigator.language: </td><td><code>" + navigator.language
      + "</code></td></tr>"
    + "<tr><td>navigator.oscpu: </td><td><code>" + navigator.oscpu
      + "</code></td></tr>"
    + "<tr><td>navigator.cookieEnabled: </td><td><code>"
      + navigator.cookieEnabled + "</code></td></tr>"
    + "<tr><td>navigator.javaEnabled(): </td><td><code>"
      + navigator.javaEnabled() + "</code></td></tr>"
    + "<tr><td>navigator.pdfViewerEnabled: </td><td><code>"
      + navigator.pdfViewerEnabled + "</code></td></tr>"
    + "<tr><td>window.innerWidth: </td><td><code>" + window.innerWidth
      + "</code></td></tr>"
    + "<tr><td>window.innerHeight: </td><td><code>" + window.innerHeight
      + "</code></td></tr>"
    + "<tr><td>screen.width: </td><td><code>" + screen.width
      + "</code></td></tr>"
    + "<tr><td>screen.height: </td><td><code>" + screen.height
      + "</code></td></tr>"
    + "<tr><td>screen.availWidth: </td><td><code>" + screen.availWidth
      + "</code></td></tr>"
    + "<tr><td>screen.availHeight: </td><td><code>" + screen.availHeight
      + "</code></td></tr>"
    + "<tr><td>screen.colorDepth: </td><td><code>" + screen.colorDepth
      + "</code></td></tr>"
    + "<tr><td>screen.pixelDepth: </td><td><code>" + screen.pixelDepth
      + "</code></td></tr>"
);

window.saveResults = function saveResults () {
  var dn = Date.now().toString(36);
  CEL.createFile("results-" + dn + ".html",
    "<!DOCTYPE html><meta charset=\"utf-8\"><title>Results " + dn + "</title>"
      + "<style>html { -ms-word-break: break-all; word-break: break-all; word-break: break-word; word-wrap: break-word; overflow-wrap: break-word; } body { margin: 0 auto; max-width: 1200px; font-family: Helvetica, Arial, sans-serif; } h1 { text-align : center; } .passed, .failed { display: inline-block; padding: 3px; }.passed { background-color: #3d9970 !important; color: white !important; }.failed { background-color: #ff4136 !important; color: white !important; } #results { padding: 3px 5px 3px 5px; font-size: 14.5px !important; font-family: consolas, monospace; } code { background-color: slategrey; color: white; padding: 3px 5px 3px 5px; display: inline-block; margin-top: 2px; } </style>"
      + "<h1>Results " + dn + "</h1>"
      + "<div id='results'>" + CUT.__results__.innerHTML + "</div>",
    "text/html"
 );
};


/* ======================================================================== */


/** Selftest **/
CUT.addElement("hr");
CUT.addElement("h3", "CUT Selftest");

CUT.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); success", 1, 1
);
CUT.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); failed", 1, 2
);
CUT.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); success non-strict",
  0, false, false
);
CUT.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); failed strict",
  0, false, true
);

CUT.isTrue("<span class=\"info\">Selftest</span> - isTrue(); success", true);
CUT.isTrue("<span class=\"info\">Selftest</span> - isTrue(); failed", false);

CUT.isFalse("<span class=\"info\">Selftest</span> - isFalse(); success", false);
CUT.isFalse("<span class=\"info\">Selftest</span> - isFalse(); failed", true);

CUT.isEqual("<span class=\"info\">Selftest</span> - isEqual(); success", 1, 1);
CUT.isEqual("<span class=\"info\">Selftest</span> - isEqual(); failed", 1, 2);
CUT.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); success non-strict",
  0, false, false
);
CUT.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); failed strict",0,false,true
);

CUT.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); success", 1, 2
);
CUT.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); failed", 1, 1
);
CUT.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); success strict",
  0, false, true
);
CUT.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); failed non-strict",
  0, false, false
);

} catch (e) {
  alert("CUT initialisation error: "+ e);
}


/* ======================================================================== */


try {

(function(){
"use strict";


var token1 = 0, token2 = 0, token3 = 0, token4 = 0, token5 = 0;
var token6 = 0, token7 = 0, token8 = 0, token9 = 0, token10 = 0;


/* Celestra v5.7.0 testcases */


/** Not auto tested functions **/
CUT.addElement("hr");
CUT.addElement("h3", "Not auto tested functions");
CUT.addElement("ul",
  "<li>getUrlVars(); no str parameter</li>"
    +"<li>getLocation(&#60;success&#62;[,error]);</li>"
    +"<li>getFullscreen();</li>"
    +"<li>setFullscreenOn(&#60;selector&#62; or &#60;element&#62;);</li>"
    +"<li>setFullscreenOff();</li>"
    +"<li>createFile(&#60;filename&#62;,&#60;content&#62;[,dType]);</li>"
    +"<li>domFadeIn(&#60;element&#62;[,duration[,display]]);</li>"
    +"<li>domFadeOut(&#60;element&#62;[,duration]);</li>"
    +"<li>domFadeToggle(&#60;element&#62;[,duration[,display]]);</li>"
    +"<li>noConflict();</li>"
);


/** Celestra object **/
CUT.addElement("hr");
CUT.addElement("h3", "Celestra object");


/* Celestra object */
CUT.isEqual("Object name: \"celestra\"", true, celestra.randomInt(100, 200)>99);


/* CEL object */
CUT.isEqual("Object name: \"CEL\"", true, CEL.randomInt(100, 200) > 99);


/** Core API and String API and DOM API **/
CUT.addElement("hr");
CUT.addElement("h3", "Core API and String API and DOM API");


/* VERSION; */
CUT.isTrue("VERSION;", CEL.VERSION.includes("Celestra v"));


/* BASE16; */
CUT.isEqual("BASE16;", CEL.BASE16, "0123456789ABCDEF");


/* BASE32 */
CUT.isEqual("BASE32;", CEL.BASE32, "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ");


/* BASE36; */
CUT.isEqual("BASE36;", CEL.BASE36, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");


/* BASE58; */
CUT.isEqual("BASE58;", CEL.BASE58,
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
);


/* BASE62; */
CUT.isEqual("BASE62;", CEL.BASE62,
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
);


/* WORDSAFEALPHABET; */
CUT.isEqual("WORDSAFEALPHABET;", CEL.WORDSAFEALPHABET,
  "23456789CFGHJMPQRVWXcfghjmpqvwx"
);


/* crypto.randomUUID(); */
token1 = CEL.randomUUIDv7();
CUT.isTrue("randomUUIDv7();",
  token1.length === 36
    && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      .test(token1)
    && token1[14] === "7"
    && "89ab".includes(token1[19])
);
CUT.logCode(token1);


/* nanoid(); */
token1 = CEL.nanoid();
CUT.isTrue("nanoid 1 - default size 21",
  typeof token1 === "string" && token1.length === 21
);
CUT.logCode(token1);
token1 = CEL.nanoid(15);
CUT.isTrue("nanoid 2 - size 15", typeof token1==="string" &&token1.length===15);
CUT.logCode(token1);
token1 = CEL.nanoid(36);
CUT.isTrue("nanoid 3 - size 36", typeof token1==="string" &&token1.length===36);
CUT.logCode(token1);
token1 = CEL.nanoid(5, "abcdeFGHIJK42");
CUT.isTrue("nanoid 4 - size 5 & \"abcdeFGHIJK42\"",
  typeof token1 === "string" && token1.length === 5
);
CUT.logCode(token1);


/* timestampID(); */
token1 = CEL.timestampID();
CUT.isTrue("timestampID 1 - default size 21",
  typeof token1 === "string" && token1.length === 21
);
CUT.logCode(token1);
token1 = CEL.timestampID(15);
CUT.isTrue("timestampID 2 - size 15",
  typeof token1 === "string" && token1.length === 15
);
CUT.logCode(token1);
token1 = CEL.timestampID(36);
CUT.isTrue("timestampID 3 - size 36",
  typeof token1 === "string" && token1.length === 36
);
CUT.logCode(token1);
token1 = CEL.timestampID(5, "abcdeFGHIJK42");
CUT.isTrue("timestampID 4 - size 5 -> 12 & \"abcdeFGHIJK42\"",
  typeof token1 === "string" && token1.length === 12
);
CUT.logCode(token1);


CUT.addElement(
  CEL.domCreate("div", {"id": "qsaDivTestElement"},
    "#qsaDiv test element"
      + "<p id='qsaDivP1'>#qsaDivP1 test element</p>"
      + "<p id='qsaDivP2'>#qsaDivP2 test element</p>"
  )
);


/* qs(); */
CUT.isEqual("qs(); selector",
  document.querySelector("#qsaDivTestElement"), CEL.qs("#qsaDivTestElement")
);
CUT.isEqual("qs(); selector + element 1",
  document.querySelector("#qsaDivP1"),
  CEL.qs("#qsaDivP1", CEL.qs("#qsaDivTestElement"))
);
CUT.isEqual("qs(); selector + element 2",
  document.querySelector("#qsaDivP1"),
  CEL.qs("#qsaDivP1", document.querySelector("#qsaDivTestElement"))
);


/* qsa(); */
token1 = CEL.qsa("#qsaDivTestElement > p")
CUT.isTrue("qsa(); selector",
  Array.isArray(token1) && token1.length === 2
    && token1[0] === CEL.qs("#qsaDivP1")
    && token1[1] === CEL.qs("#qsaDivP2")
);
token1 = CEL.qsa("p", CEL.qs("#qsaDivTestElement"))
CUT.isTrue("qsa(); selector + element 1",
  Array.isArray(token1) && token1.length === 2
    && token1[0] === CEL.qs("#qsaDivP1")
    && token1[1] === CEL.qs("#qsaDivP2")
);
token1 = CEL.qsa("p", CEL.qs("#qsaDivTestElement"))
CUT.isTrue("qsa(); selector + element 2",
  Array.isArray(token1) && token1.length === 2
    && token1[0] === CEL.qs("#qsaDivP1")
    && token1[1] === CEL.qs("#qsaDivP2")
);
token1.forEach(function (e) { e.innerHTML += " each"; });
CUT.isTrue("qsa(); forEach",
  token1[0].innerHTML === "#qsaDivP1 test element each"
    && token1[1].innerHTML === "#qsaDivP2 test element each"
);


/* classof(); begin */
CUT.isEqual("classof(); ES5 values",
  "array number string object htmldocument boolean nodelist htmlparagraphelement null undefined function date regexp",
  CUT.join([
    CEL.classof([1, 2, 3]),
    CEL.classof(1998),
    CEL.classof("hello world"),
    CEL.classof({a: 1, b: 2}),
    CEL.classof(document),
    CEL.classof(true),
    CEL.classof(document.querySelectorAll("p")),
    CEL.classof(CEL.qs("p")),
    CEL.classof(null),
    CEL.classof(undefined),
    CEL.classof(function () {}),
    CEL.classof(new Date()),
    CEL.classof(/^\[object (.+)\]$/g)
  ])
);
CUT.isTrue("classof(); ES5 all true",
  CEL.classof([1, 2, 3], "array")
    && CEL.classof(1998, "number")
    && CEL.classof("hello world", "string")
    && CEL.classof({a : 1, b: 2}, "object")
    && CEL.classof(document, "htmldocument")
    && CEL.classof(true, "boolean")
    && CEL.classof(document.querySelectorAll("p"), "nodelist")
    && CEL.classof(CEL.qs("p"), "htmlparagraphelement")
    && CEL.classof(null, "null")
    && CEL.classof(undefined, "undefined")
    && CEL.classof(function(){},"function")
    && CEL.classof(new Date(),"date")
    && CEL.classof(/^\[object (.+)\]$/g, "regexp")
);
CUT.isFalse("classof(); ES5 all false",
  CEL.classof([1, 2, 3], "number")
    || CEL.classof(1998, "array")
    || CEL.classof("hello world","object")
    || CEL.classof({a:1,b:2},"string")
    || CEL.classof(document, "boolean")
    || CEL.classof(true, "htmldocument")
    || CEL.classof(document.querySelectorAll("p"), "htmlheadingelement")
    || CEL.classof(CEL.qs("p"), "nodelist")
    || CEL.classof(null, "undefined")
    || CEL.classof(undefined, "null")
    || CEL.classof(function(){}, "object")
    || CEL.classof(new Date(),"array")
    || CEL.classof(/^\[object (.+)\]$/g, "string")
);
CUT.isEqual("classof(); ES6 values", "map set weakmap weakset",
  CUT.join([
    CEL.classof(new Map()),
    CEL.classof(new Set()),
    CEL.classof(new WeakMap()),
    CEL.classof(new WeakSet())
  ])
);
CUT.isTrue("classof(); ES6 all true",
  CEL.classof(new Map(), "map")
    && CEL.classof(new Set(), "set")
    && CEL.classof(new WeakMap(), "weakmap")
    && CEL.classof(new WeakSet(), "weakset")
);
CUT.isFalse("classof(); ES6 all false",
  CEL.classof(new Map(), "object")
    || CEL.classof(new Set(), "object")
    || CEL.classof(new WeakMap(), "object")
    || CEL.classof(new WeakSet(), "object")
);
if (!!window.BigInt) {
  CUT.isEqual("classof(); ES6 bigint", "bigint true false",
    CUT.join([
      CEL.classof(BigInt(456)),
      CEL.classof(BigInt(456), "bigint"),
      CEL.classof(BigInt(456), "object")
    ])
  );
}
/* classof(); end */


/* getType(); begin */
CUT.isEqual("getType(); ES5 values",
  "array number string object htmldocument boolean nodelist htmlparagraphelement null undefined function date regexp",
  CUT.join([
    CEL.getType([1, 2, 3]),
    CEL.getType(1998),
    CEL.getType("hello world"),
    CEL.getType({a:1,b:2}),
    CEL.getType(document),
    CEL.getType(true),
    CEL.getType(document.querySelectorAll("p")),
    CEL.getType(CEL.qs("p")),
    CEL.getType(null),
    CEL.getType(undefined),
    CEL.getType(function () {}),
    CEL.getType(new Date()),
    CEL.getType(/^\[object (.+)\]$/g)
  ])
);
CUT.isTrue("getType(); ES5 all true",
  CEL.getType([1, 2, 3], "array")
    || CEL.getType(1998, "number")
    || CEL.getType("hello world", "string")
    || CEL.getType({ a: 1, b: 2}, "object")
    || CEL.getType(document, "htmldocument")
    || CEL.getType(true, "boolean")
    || CEL.getType(document.querySelectorAll("p"), "nodelist")
    || CEL.getType(CEL.qs("p"), "htmlparagraphelement")
    || CEL.getType(null, "null")
    || CEL.getType(undefined, "undefined")
    || CEL.getType(function () {}, "function")
    || CEL.getType(new Date(), "date")
    || CEL.getType(/^\[object (.+)\]$/g, "regexp")
);
CUT.isFalse("getType(); ES5 all false",
  CEL.getType([1, 2, 3], "number")
    || CEL.getType(1998, "array")
    || CEL.getType("hello world", "object")
    || CEL.getType({ a: 1 , b: 2}, "string")
    || CEL.getType(document, "boolean")
    || CEL.getType(true, "htmldocument")
    || CEL.getType(document.querySelectorAll("p"), "htmlheadingelement")
    || CEL.getType(CEL.qs("p"), "nodelist")
    || CEL.getType(null, "undefined")
    || CEL.getType(undefined, "null")
    || CEL.getType(function(){}, "object")
    || CEL.getType(new Date(),"array")
    || CEL.getType(/^\[object (.+)\]$/g, "string")
);
CUT.isEqual("getType(); ES6 values", "map set weakmap weakset",
  CUT.join([
    CEL.getType(new Map()),
    CEL.getType(new Set()),
    CEL.getType(new WeakMap()),
    CEL.getType(new WeakSet())
  ])
);
CUT.isTrue("getType(); ES6 all true",
  CEL.getType(new Map(), "map")
    && CEL.getType(new Set(), "set")
    && CEL.getType(new WeakMap(), "weakmap")
    && CEL.getType(new WeakSet(), "weakset")
);
CUT.isFalse("getType(); ES6 all false",
  CEL.getType(new Map(), "object")
    || CEL.getType(new Set(), "object")
    || CEL.getType(new WeakMap(), "object")
    || CEL.getType(new WeakSet(), "object")
);
if (!!window.BigInt) {
  CUT.isEqual("getType(); ES6 bigint", "bigint true false",
    CUT.join([
      CEL.getType(BigInt(456)),
      CEL.getType(456n, "bigint"),
      CEL.getType(456n, "object")
    ])
  );
}
/* getType(); end */


/* extend(); */
token1 = {a: "1", b: "2"};
token2 = {c: "3", d: "4", baz: {e: 5, fn: function (n) {return n * n; }}};
token3 = CEL.extend(true, {} , token1, token2);
CUT.isEqual("extend(); true", "12345121",
  token3.a + token3.b + token3.c + token3.d + token3.baz.e + token3.baz.fn(11)
);
token3 = CEL.extend(false, {}, token1, token2);
CUT.isEqual("extend(); false 1", "12345121",
  token3.a + token3.b + token3.c + token3.d + token3.baz.e + token3.baz.fn(11)
);
token3 = CEL.extend({}, token1, token2);
CUT.isEqual("extend(); false 2", "12345121",
  token3.a + token3.b + token3.c + token3.d + token3.baz.e + token3.baz.fn(11)
);


/* obj2string(); */
token1 = CEL.obj2string(
  {str:"éáűőúöüóíÉÁŰŐÚÖÜÓÍ", bool:true, pi:3.141592653589793}
);
CUT.isEqual("obj2string();",
  "str=%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%89%C3%81%C5%B0%C5%90%C3%9A%C3%96%C3%9C%C3%93%C3%8D&bool=true&pi=3.141592653589793",
  token1
);
CUT.logCode(token1);


/*getUrlVars(); */
CUT.isEqual(
  'getUrlVars(); prop order_by from <code>"?showall=true&order_by=updated&o=asc"</code>',
  "updated", CEL.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by"]
);
CUT.isEqual("getUrlVars(); prop not found - undefined", undefined,
  CEL.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by2"]
);
CUT.isEqual("getUrlVars(); empty object", "{}",
  JSON.stringify(CEL.getUrlVars("?"))
);


CUT.addElement(CEL.domCreate("div", {"id": "testFormDiv"},
  " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
));
/* form2array(); */
CUT.isEqual("form2array();",
  '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify(CEL.form2array(CEL.qs("#form1")))
);
/* form2string(); */
CUT.isEqual("form2string();",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  CEL.form2string(CEL.qs("#form1"))
);
CEL.qs("#testFormDiv").remove();


/* randomBoolean(); */
CUT.isEqual("randomBoolean();", typeof CEL.randomBoolean(), "boolean");


/* b64Decode(); */
/* b64Encode(); */
token1 = "✓ à \r\n\t árvíztűrő tükörfúrógép ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP ,?;.:-_* ¤÷×¨¸´˙`˛°˘^ˇ~'+!%/=()|\\<> \" \/ #&@{}[]€ ÍÄíŁß 0123456789 asdfghjklqwertzuiopyxcvbnm ASDFGHJKLQWERTZUIOPYXCVBNM";
CUT.isEqual("b64Encode();",
  "4pyTIMOgIA0KCSDDoXJ2w616dMWxcsWRIHTDvGvDtnJmw7pyw7Nnw6lwIMOBUlbDjVpUxbBSxZAgVMOcS8OWUkbDmlLDk0fDiVAgLD87LjotXyogwqTDt8OXwqjCuMK0y5lgy5vCsMuYXsuHficrISUvPSgpfFw8PiAiIC8gIyZAe31bXeKCrCDDjcOEw63FgcOfIDAxMjM0NTY3ODkgYXNkZmdoamtscXdlcnR6dWlvcHl4Y3Zibm0gQVNERkdISktMUVdFUlRaVUlPUFlYQ1ZCTk0=",
  CEL.b64Encode(token1)
);
CUT.isEqual("b64Decode(); + b64Encode();",
  token1, CEL.b64Decode(CEL.b64Encode(token1))
);


/* javaHash(); begin */
token1 = "✓ à \r\n\t árvíztűrő tükörfúrógép ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP ,?;.:-_* ¤÷×¨¸´˙`˛°˘^ˇ~'+!%/=()|\\<> \" \/ #&@{}[]€ ÍÄíŁß 0123456789 asdfghjklqwertzuiopyxcvbnm ASDFGHJKLQWERTZUIOPYXCVBNM";
CUT.isEqual("javaHash();",
  "1334063883 4f84330b 1334063883 48 30 48 1565118 17e1be 1565118 1662 67e 1662 3569038 36758e 3569038 3569038 36758e 3569038 97196323 5cb1923 97196323 97196323 5cb1923 97196323 3392903 33c587 3392903 33c587 3392903 0 0 0 -1038130864 -3de09eb0 -1038130864 0 0 0 0 0 0 48503 bd77 48503 50427 c4fb 50427 -1074417128 -400a4de8 -1074417128 -1074417128 -400a4de8 -1074417128 -1074417128 -400a4de8 -1074417128 -313568218 -12b0abda -313568218 LTMxMzU2ODIxOA== LTEyYjBhYmRh LTMxMzU2ODIxOA== -313568218 -12b0abda -313568218",
  CUT.join([
    CEL.javaHash(-0.578),
    CEL.javaHash(-0.578, true),
    CEL.javaHash(-0.578, false),
    CEL.javaHash(0),
    CEL.javaHash(0, true),
    CEL.javaHash(0, false),
    CEL.javaHash(3.14),
    CEL.javaHash(3.14, true),
    CEL.javaHash(3.14, false),
    CEL.javaHash(42),
    CEL.javaHash(42, true),
    CEL.javaHash(42, false),
    CEL.javaHash(true),
    CEL.javaHash(true, true),
    CEL.javaHash(true, false),
    CEL.javaHash("true"),
    CEL.javaHash("true", true),
    CEL.javaHash("true", false),
    CEL.javaHash(false),
    CEL.javaHash(false, true),
    CEL.javaHash(false, false),
    CEL.javaHash("false"),
    CEL.javaHash("false",true),
    CEL.javaHash("false", false),
    CEL.javaHash(null),
    CEL.javaHash(null, true, false),
    CEL.javaHash("null"),
    CEL.javaHash("null", true),
    CEL.javaHash("null", false),
    CEL.javaHash(undefined),
    CEL.javaHash(undefined, true),
    CEL.javaHash(undefined, false),
    CEL.javaHash("undefined"),
    CEL.javaHash("undefined", true),
    CEL.javaHash("undefined", false),
    CEL.javaHash(""),
    CEL.javaHash("", true),
    CEL.javaHash("", false),
    CEL.javaHash([]),
    CEL.javaHash([],true),
    CEL.javaHash([],false),
    CEL.javaHash([1,2]),
    CEL.javaHash([1,2], true),
    CEL.javaHash([1,2], false),
    CEL.javaHash([3,4]),
    CEL.javaHash([3,4], true),
    CEL.javaHash([3,4], false),
    CEL.javaHash({}),
    CEL.javaHash({}, true),
    CEL.javaHash({}, false),
    CEL.javaHash({a:1}),
    CEL.javaHash({a:1}, true),
    CEL.javaHash({a:1}, false),
    CEL.javaHash({b:2}),
    CEL.javaHash({b:2}, true),
    CEL.javaHash({b:2}, false),
    CEL.javaHash(token1),
    CEL.javaHash(token1, true),
    CEL.javaHash(token1, false),
    CEL.b64Encode(CEL.javaHash(token1)),
    CEL.b64Encode(CEL.javaHash(token1, true)),
    CEL.b64Encode(CEL.javaHash(token1, false)),
    CEL.b64Decode(CEL.b64Encode(CEL.javaHash(token1))),
    CEL.b64Decode(CEL.b64Encode(CEL.javaHash(token1, true))),
    CEL.b64Decode(CEL.b64Encode(CEL.javaHash(token1, false)))
  ])
);
/* javaHash(); end */


/* sizeIn(); */
CUT.isEqual("sizeIn();", 5, CEL.sizeIn({"a": 1, "b": 2, "c": 3,
  [Symbol.iterator]: function () {}, [Symbol.toPrimitive]: function () {}
}));


/* forIn(); */
token1 = {"a": 2, "b": 3, "c": 4};
token2 = "";
CEL.forIn(token1, (e) => token2 += (e*2) );
CUT.isEqual("forIn();", "468", token2);
CUT.isEqual("forIn(); return value", token1, CEL.forIn(token1, function () {}));


/* filterIn(); */
CUT.isEqual("filterIn();", "{\"b\":2,\"c\":3}",
  JSON.stringify(CEL.filterIn({"a": 1, "b": 2, "c": 3}, (v, p, o) => (v > 1)))
);


/* popIn(); */
token1 = {"a": 1};
CUT.isEqual("popIn();", "1 undefined",
  CUT.join([CEL.popIn(token1, "a"), CEL.popIn(token1, "a")])
);


/* getDoNotTrack(); */
CUT.isEqual("getDoNotTrack();", typeof CEL.getDoNotTrack(), "boolean");


/* strTruncate(); */
CUT.isEqual("strTruncate();", "Arthur Art... Arthur Dent Arthur Dent",
  CUT.join([
    CEL.strTruncate("Arthur Dent", 6),
    CEL.strTruncate("Arthur Dent", 6, "..."),
    CEL.strTruncate("Arthur Dent", 20),
    CEL.strTruncate("Arthur Dent", 20, "...")
  ])
);


/* strPropercase(); */
CUT.isTrue("strPropercase();",
  CEL.strPropercase("arthur conan doyle") === "Arthur Conan Doyle" &&
  CEL.strPropercase("arthur conan   doyle") === "Arthur Conan   Doyle"
);


/* strTitlecase(); */
CUT.isTrue("strTitlecase();",
  CEL.strTitlecase("arthur conan doyle") === "Arthur Conan Doyle" &&
  CEL.strTitlecase("arthur conan   doyle") === "Arthur Conan   Doyle"
);


/* strCapitalize(); */
CUT.isEqual("strCapitalize();", CEL.strCapitalize("lorEm Ipsum"),"Lorem ipsum");


/* strUpFirst(); */
CUT.isEqual("strUpFirst();", CEL.strUpFirst("lorEm Ipsum"), "LorEm Ipsum");


/* strDownFirst(); */
CUT.isEqual("strDownFirst();", CEL.strDownFirst("LorEm Ipsum"), "lorEm Ipsum");


/* trHTMLRemoveTags */
CUT.isEqual("strHTMLRemoveTags();","lorem ipsum dolor sit amet , consectetuer",
  CEL.strHTMLRemoveTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);


/* strReverse(); */
token1 = CEL.strReverse("I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.");
CUT.isEqual("strReverse(); without unicode",
  ".eid ot emiT .niar ni sraet ekil ,emit ni tsol eb lliw stnemom esoht llA .etaG resuähnnaT eht raen krad eht ni rettilg smaeb-C dehctaw I .noirO fo redluohs eht ffo erif no spihs kcattA .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  token1
);
token1 = CEL.strReverse("I've seen things you people wouldn't believe. \uD834\uDF06 Attack ships on fire off the shoulder of Orion.");
CUT.isEqual("strReverse(); with unicode 1",
  ".noirO fo redluohs eht ffo erif no spihs kcattA \uD834\uDF06 .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  token1
);


/* strCodePoints(); */
CUT.isEqual("strCodePoints();",
  "[102,111,111,32,119558,32,98,97,114,32,119809,32,98,97,122]",
  JSON.stringify(CEL.strCodePoints("foo \uD834\uDF06 bar \uD835\uDC01 baz"))
);


/* strFromCodePoints(); */
token1 = "foo \uD834\uDF06 bar \uD835\uDC01 baz";
CUT.isEqual("strFromCodePoints(); + strCodePoints();",
  token1, CEL.strFromCodePoints(CEL.strCodePoints(token1))
);


/* strAt(); */
CUT.isTrue("strAt();",
  /* get */
  CEL.strAt("\uD834\uDF06 ab cd",0) === "\uD834\uDF06"
  && CEL.strAt("ab \uD834\uDF06 cd", 3)  === "\uD834\uDF06"
  && CEL.strAt("ab cd \uD834\uDF06", -1) === "\uD834\uDF06"
  && CEL.strAt("ab \uD834\uDF06 cd", 0)  === "a"
  && CEL.strAt("ab \uD834\uDF06 cd", 5)  === "c"
  && CEL.strAt("ab \uD834\uDF06 cd", -1) === "d"
  && CEL.strAt("", 0)  === ""
  && CEL.strAt("", 3)  === ""
  && CEL.strAt("", -1) === ""
  /* set */
  && CEL.strAt("ab \uD834\uDF06 cde", 3, "X")   === "ab X cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -5, "X")  === "ab X cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -2, "X")  === "ab \uD834\uDF06 cXe"
  && CEL.strAt("ab \uD834\uDF06 cde", 13, "X")  === "ab \uD834\uDF06 cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -13, "X") === "ab \uD834\uDF06 cde"
  && CEL.strAt("ab \uD834\uDF06 cde", 3, "")    === "ab  cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -2, "")   === "ab \uD834\uDF06 ce"
  && CEL.strAt("ab \uD834\uDF06 cde", 12, "")   === "ab \uD834\uDF06 cde"
  && CEL.strAt("ab \uD834\uDF06 cde", -12, "")  === "ab \uD834\uDF06 cde"
);


/* strSplice */
CUT.isTrue("strSplice();",
  CEL.strSplice("\uD834\uDF06 ab cde",0, 10) === ""
    && CEL.strSplice("ab \uD834\uDF06 cde", 4, 1) === "ab \uD834\uDF06cde"
    && CEL.strSplice("ab \uD834\uDF06 cde", 4, 1, "X") === "ab \uD834\uDF06Xcde"
    && CEL.strSplice("ab \uD834\uDF06 cde",4,1,"X","Y")==="ab \uD834\uDF06XYcde"
    && CEL.strSplice("ab \uD834\uDF06 cde",4,2,"X","Y") ==="ab \uD834\uDF06XYde"
    && CEL.strSplice("ab \uD834\uDF06 cde", 5, 2, "") === "ab \uD834\uDF06 e"
);


/* "unBind(); */
CUT.isEqual("unBind();", true,
  Array.isArray(CEL.unBind([].slice)(document.querySelectorAll("h3")))
);


/* bind(); */
CUT.isTrue("bind();",
  CEL.bind(document.querySelectorAll,document)("h3").length > 0
);


/* constant(); */
CUT.isEqual("constant();", 3.14, CEL.constant(3.14)());


/* identity(); */
CUT.isEqual("identity();", 100, CEL.identity(60) + CEL.identity(40));


/* noop(); */
CUT.isEqual("noop();", undefined, CEL.noop());


/* T(); */
CUT.isTrue("T();", CEL.T());


/* F(); */
CUT.isFalse("F();", CEL.F());


/* strHTMLEscape(); */
CUT.isEqual("strHTMLEscape();",
  "&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&amp;#64;echo&amp;#65;&lt;/a&gt;&apos;str2&apos;",
  CEL.strHTMLEscape('<a href="#" target="_blank">&#64;echo&#65;</a>\'str2\'')
);


/* strHTMLUnEscape(); */
CUT.isEqual("strHTMLUnEscape();",
  '<a href="#" target="_blank">&#64;echo&#65;</a>\'str2\'',
  CEL.strHTMLUnEscape("&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&amp;#64;echo&amp;#65;&lt;/a&gt;&apos;str2&#39;")
);


/* domGetCSSVar(); */
/* domSetCSSVar(); */
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); without prefix 1", "",
  CEL.domGetCSSVar("testVar1"));
CEL.domSetCSSVar("testVar1", "value1");
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); without prefix 2 - "
  + CEL.domGetCSSVar("testVar1"), "value1",
  CEL.domGetCSSVar("testVar1")
);
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); with prefix 1 - "
  + CEL.domGetCSSVar("--testVar2"), "",
  CEL.domGetCSSVar("--testVar2")
);
CEL.domSetCSSVar("--testVar2", "value2");
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); with prefix 2 - "
  + CEL.domGetCSSVar("--testVar2"), "value2",
  CEL.domGetCSSVar("--testVar2")
);


/* domTestElement variable */
CUT.addElement( CEL.domCreate("p",
  {"id": "domTestElement", style: {"width": "250px"}}, "DOM test element"));
var domTestElement = CEL.qs("#domTestElement");


/* domCreate(); */
CUT.isTrue("domCreate(); with style object", CEL.isElement(domTestElement));
CUT.isTrue("domCreate(); with style string",
  CEL.isElement(CEL.domCreate("p",
    {"id": "domTestElement", style: "width: 250px; color: blue;" },
    "DOM test element"
  ))
);
CUT.isTrue("domCreate(object); with style object",
  CEL.isElement(CEL.domCreate({
    elementType: "p", "id": "domTestElementObject",
    style: {"width": "250px"}, innerHTML: "DOM test element" }
  ))
);
CUT.isTrue("domCreate(object); with style string",
  CEL.isElement(CEL.domCreate({elementType: "p", "id": "domTestElementObject",
    style: "width: 250px; color: blue;", innerHTML: "DOM test element"})
  )
);


/* domToElement(); */
CUT.isTrue("domToElement(); simple element",
  CEL.isElement(CEL.domToElement("<div>Hello world!</div>"))
);
CUT.isTrue("domToElement(); complex element",
  CEL.isElement(
    CEL.domToElement(
      "<p><span style=\"background-color: yellow; color: blue;\">Hello</span> <span style=\"background-color: blue; color: yellow;\">world</span>!</p>"
    ).firstElementChild
  )
);


/* domSetCSS(); */
/* domgetCSS(); */
CEL.domSetCSS(domTestElement, "width", "300px");
CUT.isEqual("domSetCSS(); property and domGetCSS(); - (300px) - "
  + CEL.domGetCSS(domTestElement, "width"), "300px",
  CEL.domGetCSS(domTestElement, "width")
);
CEL.domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
CUT.isEqual("domSetCSS(); properties object and domGetCSS(); - (350px) - "
  + CEL.domGetCSS(domTestElement, "width"),
  "350px", CEL.domGetCSS(domTestElement, "width")
);
CUT.isEqual("domSetCSS(); properties object and domGetCSS() object; (350px)- "
  + CEL.domGetCSS(domTestElement)["width"],
  "350px", CEL.domGetCSS(domTestElement)["width"]
);


/* domHide(); */
CEL.domHide(domTestElement);
CUT.isEqual("domHide();", "none", CEL.domGetCSS(domTestElement, "display"));


/* domShow(); */
CEL.domShow(domTestElement);
CUT.isEqual("domShow();", "block", CEL.domGetCSS(domTestElement, "display"));
CEL.domHide(domTestElement);
CEL.domShow(domTestElement, "inline-block");
CUT.isEqual("domShow(); inline-block", "inline-block",
  CEL.domGetCSS(domTestElement, "display")
);


/* domToggle(); */
CEL.domToggle(domTestElement);
CUT.isEqual("domToggle(); hide","none",CEL.domGetCSS(domTestElement,"display"));
CEL.domToggle(domTestElement);
CUT.isEqual("domToggle(); show", "block",
  CEL.domGetCSS(domTestElement, "display")
);
CEL.domToggle(domTestElement, "inline-block");
CUT.isEqual("domToggle(); hide inline-block", "none",
  CEL.domGetCSS(domTestElement, "display")
);


/* domHide(); */
CEL.domToggle(domTestElement, "inline-block");
CUT.isEqual("domHide(); show inline-block", "inline-block",
  CEL.domGetCSS(domTestElement, "display")
);


/* domIsHidden(); */
CEL.domShow(domTestElement);
CUT.isFalse("domIsHidden(); false", CEL.domIsHidden(domTestElement));


/* domIsHidden(); */
CEL.domHide(domTestElement);
CUT.isTrue("domIsHidden(); true", CEL.domIsHidden(domTestElement));


CUT.addElement(
  CEL.domCreate("div", {"id": "dsDiv"},
    "<p id=\"dsDivP1\">#dsDivP1</p>"
      + "<p id=\"dsDivP2\">#dsDivP2</p>"
      + "<p id=\"dsDivP3\">#dsDivP3</p>"
      + "<p id=\"dsDivP4\">#dsDivP4</p>"
      + "<p id=\"dsDivP5\">#dsDivP5</p>"
  )
);
/* domSiblings(); */
token1 = CEL.domSiblings(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblings();", (
  Array.isArray(token1)
    && token1.length === 4
    && token1[0].innerHTML === "#dsDivP1"
    && token1[1].innerHTML === "#dsDivP2"
    && token1[2].innerHTML === "#dsDivP4"
    && token1[3].innerHTML === "#dsDivP5"
  )
);
/* domSiblingsPrev(); */
token1 = CEL.domSiblingsPrev(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsPrev();", (
    Array.isArray(token1)
      && token1.length === 2
      && token1[0].innerHTML ==="#dsDivP1"
      && token1[1].innerHTML ==="#dsDivP2"
  )
);
/* domSiblingsLeft(); */
token1 = CEL.domSiblingsLeft(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsLeft();", (
  Array.isArray(token1) && token1.length === 2
    && token1[0].innerHTML === "#dsDivP1"
    && token1[1].innerHTML === "#dsDivP2"
));
/* domSiblingsNext(); */
token1 = CEL.domSiblingsNext(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsNext();", (
  Array.isArray(token1) && token1.length === 2
    && token1[0].innerHTML === "#dsDivP4"
    && token1[1].innerHTML === "#dsDivP5"
));
/* domSiblingsRight(); */
token1 = CEL.domSiblingsRight(CEL.qs("#dsDivP3"));
CUT.isTrue("domSiblingsRight();", (
  Array.isArray(token1)
    && token1.length === 2
    && token1[0].innerHTML === "#dsDivP4"
    && token1[1].innerHTML === "#dsDivP5"
));
CEL.qs("#dsDiv").remove();


/* domClear(); */
token1 = CEL.domToElement("<div><p>1</p><p>2</p><p>3</p>div>");
CEL.domClear(token1);
CUT.isEqual("domClear();", 0, token1.children.length);


/** Assertion API **/
CUT.addElement("hr");
CUT.addElement("h3", "Assertion API");


/* assert(); */
CUT.isTrue("assert(); 1", CEL.assert(true));
CUT.isTrue("assert(); 2", CEL.assert(true, "assert true"));
CUT.isTrue("assert(); 3", CEL.assert(1));
CUT.isTrue("assert(); 4", CEL.assert(1, "assert false"));
try {
  CEL.assert(false);
} catch (e) { CUT.isTrue("assert(); 5 error", true); }
try {
  CEL.assert(false, "lorem");
} catch (e) { CUT.isTrue("assert(); 6 error", true); }
try {
  CEL.assert(0);
} catch (e) { CUT.isTrue("assert(); 7 error", true); }
try {
  CEL.assert(0, "lorem");
} catch (e) { CUT.isTrue("assert(); 8 error", true); }


/* assertTrue(); */
CUT.isTrue("assertTrue(); 1", CEL.assertTrue(true));
CUT.isTrue("assertTrue(); 2", CEL.assertTrue(true, "assertTrue true"));
CUT.isTrue("assertTrue(); 3", CEL.assertTrue(1));
CUT.isTrue("assertTrue(); 4", CEL.assertTrue(1, "assertTrue false"));
try {
  CEL.assertTrue(false);
} catch (e) { CUT.isTrue("assertTrue(); 5 error", true); }
try {
  CEL.assertTrue(false, "lorem");
} catch (e) { CUT.isTrue("assertTrue(); 6 error", true); }
try {
  CEL.assertTrue(0);
} catch (e) { CUT.isTrue("assertTrue(); 7 error", true); }
try {
  CEL.assertTrue(0, "lorem");
} catch (e) { CUT.isTrue("assertTrue(); 8 error", true); }


/* assertFalse(); */
CUT.isTrue("assertFalse(); 1", CEL.assertFalse(false));
CUT.isTrue("assertFalse(); 2", CEL.assertFalse(false, "lorem"));
CUT.isTrue("assertFalse(); 3", CEL.assertFalse(0));
CUT.isTrue("assertFalse(); 4", CEL.assertFalse(0, "lorem"));
try {
  CEL.assertFalse(true);
} catch (e) { CUT.isTrue("assertFalse(); 5 error", true); }
try {
  CEL.assertFalse(true, "lorem");
} catch (e) { CUT.isTrue("assertFalse(); 6 error", true); }
try {
  CEL.assertFalse(1);
} catch (e) { CUT.isTrue("assertFalse(); 7 error", true); }
try {
  CEL.assertFalse(1, "assertFalse false");
} catch (e) { CUT.isTrue("assertFalse(); 8 error", true); }


CUT.isTrue("assert(); 1", CEL.assert(true, "assert true"));
CUT.isTrue("assert(); 2", CEL.assert(1, "assert false"));

/* assertEqual(); */
CUT.isTrue("assertEqual(); 1 true", CEL.assertEqual(NaN, NaN));
CUT.isTrue("assertEqual(); 2 true", CEL.assertEqual(42, 42));
CUT.isTrue("assertEqual(); 3 true", CEL.assertEqual(42, "42", ""));
try {
  CEL.assertEqual(null,false,"assertEqual null false");
} catch (e) { CUT.isTrue("assertEqual(); 4 error", true); }
try {
  CEL.assertEqual(null,false);
} catch (e) { CUT.isTrue("assertEqual(); 5 error", true); }


/* assertStrictEqual(); */
CUT.isTrue("assertStrictEqual(); 1 true", CEL.assertStrictEqual(NaN, NaN));
CUT.isTrue("assertStrictEqual(); 2 true", CEL.assertStrictEqual(42, 42));
try {
  CEL.assertStrictEqual(42, "42", "assertStrictEqual 42 \"42\"");
} catch (e) { CUT.isTrue("assertStrictEqual(); 3 error", true); }
try {
  CEL.assertStrictEqual(42, "42");
} catch (e) { CUT.isTrue("assertStrictEqual(); 3 error", true); }
try {
  CEL.assertStrictEqual(null, false, "assertStrictEqual null false");
} catch (e) { CUT.isTrue("assertStrictEqual(); 4 error", true); }


/* assertNotEqual(); */
CUT.isTrue("assertNotEqual(); 1 true", CEL.assertNotEqual(null,false, "lorem"));
try {
  CEL.assertNotEqual(NaN, NaN);
} catch (e) { CUT.isTrue("assertNotEqual(); 2 error", true); }
try {
  CEL.assertNotEqual(42, 42);
} catch (e) { CUT.isTrue("assertNotEqual(); 3 error", true); }
try {
  CEL.assertNotEqual(42, "42", "assertNotEqual 42 \"42\"");
} catch (e) { CUT.isTrue("assertNotEqual(); 4 error", true); }


/* assertNotStrictEqual(); */
CUT.isTrue("assertNotStrictEqual(); 1 true",
  CEL.assertNotStrictEqual(42, "42", "assertNotStrictEqual 42 \"42\"")
);
CUT.isTrue("assertNotStrictEqual(); 2 true",
  CEL.assertNotStrictEqual(null, false, "assertNotStrictEqual null false")
);
try {
  CEL.assertNotStrictEqual(NaN, NaN);
} catch (e) { CUT.isTrue("assertNotStrictEqual(); 3 error", true); }
try {
  CEL.assertNotStrictEqual(42, 42);
} catch (e) { CUT.isTrue("assertNotStrictEqual(); 4 error", true); }
try {
  CEL.assertNotStrictEqual(42, "42", "lorem");
} catch (e) { CUT.isTrue("assertNotStrictEqual(); 4 error", true); }


/** Collections API **/
CUT.addElement("hr");
CUT.addElement("h3", "Collections");


/* unique(); */
token1 = [
  { "name": "Picard", "rank": "captain" },
  { "name": "Riker", "rank": "captain" },
  { "name": "Data", "rank": "commander" },
  { "name": "Troi", "rank": "commander" }
];
CUT.isEqual("unique(); 1 - without resolver", "[4,7,5,6]",
  JSON.stringify(CEL.unique([4, 7, 5, 5, 6, 7]))
);
CUT.isEqual("unique(); 2 - with key resolver",
  JSON.stringify(CEL.unique(token1, "rank")),
 "[{\"name\":\"Picard\",\"rank\":\"captain\"},{\"name\":\"Data\",\"rank\":\"commander\"}]"
);
CUT.isEqual("unique(); 3 - with function resolver",
  JSON.stringify(CEL.unique(token1, (v) => v.rank)),
 "[{\"name\":\"Picard\",\"rank\":\"captain\"},{\"name\":\"Data\",\"rank\":\"commander\"}]"
);


/* count(); */
CUT.isTrue("count();",
  CEL.count([1,2,3,4,5,6,7], (x) => x > 3) === 4
    && CEL.count([1,2,3], (x) => x > 3) === 0
    && CEL.count([4,5,6], (x) => x > 3) === 3
);


/* arrayDeepClone(); */
token1 = [[0, 1, [2]], [4, 5, [6]]];
token2 = CEL.arrayDeepClone(token1);
CUT.isTrue("arrayDeepClone();",
  JSON.stringify(token1) === JSON.stringify(token2)
    && !(token1          === token2)
    && !(token1[0]       === token2[0])
    &&  (token1[0][0]    === token2[0][0])
    &&  (token1[0][1]    === token2[0][1])
    && !(token1[0][2]    === token2[0][2])
    &&  (token1[0][2][0] === token2[0][2][0])
    && !(token1[1]       === token2[1])
    &&  (token1[1][0]    === token2[1][0])
    &&  (token1[1][1]    === token2[1][1])
    && !(token1[1][2]    === token2[1][2])
    &&  (token1[1][2][0] === token2[1][2][0])
);


/* arrayCreate(); begin */
token1 = CEL.arrayCreate(4);
CUT.isTrue("arrayCreate(); 1 - return array 4",
  Array.isArray(token1) && token1.length === 4
);
token1 = CEL.arrayCreate(0);
CUT.isTrue("arrayCreate(); 2 - return array 0",
  Array.isArray(token1) && token1.length === 0
);
token1 = CEL.arrayCreate(-0);
CUT.isTrue("arrayCreate(); 3 - return array -0",
  Array.isArray(token1) && token1.length === 0
);
token1 = CEL.arrayCreate("5");
CUT.isTrue("arrayCreate(); 4 - return array \"5\"",
  Array.isArray(token1) && token1.length === 5
);
token1 = CEL.arrayCreate(true);
CUT.isTrue("arrayCreate(); 5 - return array true",
  Array.isArray(token1) && token1.length === 1
);
token1 = CEL.arrayCreate(false);
CUT.isTrue("arrayCreate(); 6 - return array false",
  Array.isArray(token1) && token1.length === 0
);
try {
  token1 = CEL.arrayCreate(Math.pow(2, 32));
} catch (e) {
  CUT.isTrue("arrayCreate(); 7 - return error with Math.pow(2, 32);", true); }
token1 = CEL.arrayCreate();
CUT.isTrue("arrayCreate(); 8 - return array without parameter",
  Array.isArray(token1) && token1.length === 0
);
/* arrayCreate(); end */


/* withOut(); */
CUT.isEqual("withOut();",
  JSON.stringify(CEL.withOut(["a", "b", "c", "d"], ["b", "d"])), "[\"a\",\"c\"]"
);


/* partition(); */
CUT.isEqual("partition();",
  JSON.stringify(CEL.partition([-5,2,-9,7,34],(e)=>(e>0))), "[[2,7,34],[-5,-9]]"
);


/* initial(); */
CUT.isTrue("initial();",
  CEL.isSameArray(CEL.initial(["a", "b", "c", "d"]), ["a", "b", "c"])
);


/* iterRange(); */
CUT.isEqual("iterRange(); integer", "10 13 16 19",
  CUT.join(CEL.iterRange(10, 3, 20))
);
CUT.isEqual("iterRange(); float", "10 13.5 17",
  CUT.join(CEL.iterRange(10, 3.5, 20))
);


/* iterCycle(); */
CUT.isEqual("iterCycle(); 1 - array", "a b c a b c a b c a b c a b c",
  CUT.join(CEL.iterCycle(["a", "b", "c"], 5))
);
CUT.isEqual("iterCycle(); 2 + iterRange(); - ","10 13 16 19 10 13 16 19 10 13 16 19",
  CUT.join(CEL.iterCycle(CEL.iterRange(10, 3, 20), 3))
);
CUT.isEqual("iterCycle(); 3 - infinity", "ABABABA",
  CUT.join(CUT.take(CEL.iterCycle(['A', 'B']), 7), "")
);


/* iterRepeat(); */
CUT.isEqual("iterRepeat();", "AB AB AB", CUT.join(CEL.iterRepeat("AB", 3)));
CUT.isEqual("iterRepeat(); infinity", "AB AB AB AB AB",
  CUT.join(CUT.take(CEL.iterRepeat("AB"), 5))
);


/* forEach(); */
token1 = "";
CEL.forEach([1, 2, 3], function (e) { token1 += (e*2); });
CUT.isEqual("forEach(); 1 ES5 Array", "246", token1);
token1 = "";
CEL.forEach("cat, dog, pig", function (e) { token1 += e.toUpperCase(); });
CUT.isEqual("forEach(); 2 ES5 String", "CAT, DOG, PIG", token1);
token1 = 0;
CEL.forEach(document.querySelectorAll("h3"), function (e) { token1++; });
CUT.isEqual("forEach(); 3 ES5 Nodelist",
  document.querySelectorAll("h3").length, token1
);
token1 = "";
CEL.forEach(new Map([ ["foo", 3.14], ["bar", 42], ["baz", "Wilson"] ]),
  function (e,i) { token1 += i + "-" + e + "-"; }
);
CUT.isEqual("forEach(); 5 ES6 Map", "0-foo,3.14-1-bar,42-2-baz,Wilson-",token1);
token1 = 0;
CEL.forEach(new Set([4, 5, 6]), function (e) { token1 += (e*3); });
CUT.isEqual("forEach(); 6 ES6 Set", 45, token1);
token1 = 0;
CEL.forEach((new Set([4,5,6])).values(), function (e) { token1+=(e*3); });
CUT.isEqual("forEach(); 7 ES6 Set values(); iterator", 45, token1);


/* forEachRight(); */
token1 = "";
CEL.forEachRight([1, 2, 3], function (e) { token1 += (e*2); });
CUT.isEqual("forEachRight();", "642", token1);


/* map(); */
token1 = "";
for (let item of CEL.map([1, 2, 3], (e) => e * 2)) { token1+=item; }
CUT.isEqual("map(); 1 ES5 Array", "246", token1);
token1 = "";
for (let item of CEL.map("cat, dog, pig", (e) => e.toUpperCase() )) {
  token1 += item;
}
CUT.isEqual("map(); 2 ES5 String", "CAT, DOG, PIG", token1);
token2 = [];
for (let item of CEL.map(document.querySelectorAll("h3"), (e) => e )) {
  token2.push(item);
}
CUT.isTrue("map(); 3 ES5 Nodelist",
  Array.isArray(token2) && token2.every((e) => CEL.isElement(e))
);
token1 = "";
for (let item of CEL.map(
  new Map([ ["foo", 1], ["bar", 2], ["baz", 3] ]), (e) => [e[0], e[1] * 2] )) {
  token1 += item[0] + item[1];
}
CUT.isEqual("map(); 5 ES6 Map", "foo2bar4baz6", token1);
token1 = "";
for (let item of CEL.map(new Set([1, 2, 3]), (e) => e * 2 )) { token1 += item; }
CUT.isEqual("map(); 6 ES6 Set", "246", token1);
token1 = "";
for (let item of CEL.map((new Set([1, 2, 3])).values(), (e) => e * 3 )) {
  token1 += item;
}
CUT.isEqual("map(); 7 ES6 Set values(); iterator", "369", token1);


/* take(); */
token1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
CUT.isEqual("take(); 1 - 0", "", CUT.join(CEL.take(token1, 0)));
CUT.isEqual("take(); 2 - 7", "A B C D E F G", CUT.join(CEL.take(token1,7)));
CUT.isEqual("take(); 3 - 12", "A B C D E F G H I J",
  CUT.join(CEL.take(token1, 12))
);
CUT.isEqual("take(); 4 - default 1", "A", CUT.join(CEL.take(token1)));


/* drop(); */
token1 = ["A", "B" , "C", "D", "E", "F", "G", "H", "I", "J"];
CUT.isEqual("drop(); 1 - 0", "A B C D E F G H I J",
  CUT.join(CEL.drop(token1, 0))
);
CUT.isEqual("drop(); 2 - 7", "H I J", CUT.join(CEL.drop(token1, 7)));
CUT.isEqual("drop(); 3 - 12", "", CUT.join(CEL.drop(token1, 12)));
CUT.isEqual("drop(); 4 - default 1", "B C D E F G H I J",
  CUT.join(CEL.drop(token1))
);


/* filter(); */
CUT.isEqual("filter();", "4 5 6 7 8",
  CUT.join(CEL.filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (v) => v > 3 && v<9))
);


/* reject(); */
CUT.isEqual("reject();", "1 2 3 9 10",
  CUT.join(CEL.reject([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (v) => v > 3 && v < 9))
);


/* slice(); */
token1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
CUT.isEqual("slice(); 1 - 0 to 4", "1 2 3 4 5",
  CUT.join(CEL.slice(token1, 0, 4))
);
CUT.isEqual("slice(); 2 - 5 to Infinity", "6 7 8 9 10",
  CUT.join(CEL.slice(token1, 5))
);
CUT.isEqual("slice(); 3 - 4 to 8", "5 6 7 8 9",
  CUT.join(CEL.slice(token1, 4, 8))
);
CUT.isEqual("slice(); 4 - all", "1 2 3 4 5 6 7 8 9 10",
  CUT.join(CEL.slice(token1))
);


/* tail(); */
CUT.isEqual("tail();", "2 3 4 5 6", CUT.join(CEL.tail([1, 2, 3, 4, 5, 6])));


/* takeWhile(); */
token1 = [0, 2, 4, 6, 8, 10, 12, 14, 16];
token2 = 0;
for (let item of CEL.takeWhile(token1, (e) => e < 10)) { token2 += item; }
CUT.isEqual("takeWhile(); values", token2, 20);
token2 = 0;
for (let item of CEL.takeWhile(token1, (e) => e < 0)) { token2 += item; }
CUT.isEqual("takeWhile(); empty list", token2, 0);
token2 = 0;
for (let item of CEL.takeWhile(token1, (e) => e < 30)) { token2 += item; }
CUT.isEqual("takeWhile(); full list", token2, 72);


/* dropWhile(); */
token1 = [0, 2, 4, 6, 8, 10, 12, 14, 16];
token2 = 0;
for (let item of CEL.dropWhile(token1, (e) => (e<10))) { token2 += item; }
CUT.isEqual("dropWhile(); values", token2, 52);
token2 = 0;
for (let item of CEL.dropWhile(token1, (e) => (e<30))) { token2 += item; }
CUT.isEqual("dropWhile(); empty list", token2, 0);
token2 = 0;
for (let item of CEL.dropWhile(token1, (e) => (e< 0))) { token2 += item; }
CUT.isEqual("dropWhile(); full list", token2, 72);


/* item(); */
CUT.isEqual("item(); string unicode", "\uD834\uDF06" + "r" + "undefined",
  CEL.item("foo \uD834\uDF06 bar", 4)
    + CEL.item("foo \uD834\uDF06 bar", 8)
    + CEL.item("foo \uD834\uDF06 bar", 12),
);
CUT.isEqual("item(); array", "7 undefined",
  CUT.join([CEL.item([4, 5, 6, 7, 8], 3), CEL.item([4, 5, 6, 7, 8], 12)])
);
CUT.isEqual("item(); map", "[\"b\",2]" + "undefined",
  JSON.stringify(CEL.item(new Map([["a", 1], ["b", 2], ["c", 3]]), 1))
    + CEL.item(new Map([["a", 1], ["b", 2], ["c", 3]]), 12),
);
CUT.isEqual("item(); set", "6 undefined",
  CUT.join([
    JSON.stringify(CEL.item(new Set([3, 3, 4, 5, 5, 6, 7, 7, 8]), 3)),
    CEL.item(new Set([3, 3, 4, 5, 5, 6, 7, 7, 8]), 12)
  ])
);


/* nth(); */
CUT.isEqual("nth(); string unicode", "\uD834\uDF06 r undefined",
  CUT.join([
    CEL.nth("foo \uD834\uDF06 bar", 4),
    CEL.nth("foo \uD834\uDF06 bar", 8),
    CEL.nth("foo \uD834\uDF06 bar", 12)
  ])
);
CUT.isEqual("nth(); array", "7 undefined",
  CUT.join([CEL.nth([4, 5, 6, 7, 8], 3), CEL.nth([4, 5, 6, 7, 8], 12)])
);
CUT.isEqual("nth(); map", "[\"b\",2]" + "undefined",
  JSON.stringify(CEL.nth(new Map([["a", 1], ["b", 2], ["c", 3]]), 1))
    + CEL.nth(new Map([["a", 1], ["b", 2], ["c", 3]]), 12),
);
CUT.isEqual("nth(); set", "6 undefined",
  CUT.join([
    JSON.stringify(CEL.nth(new Set([3, 3, 4, 5, 5, 6, 7, 7, 8]), 3)),
    CEL.nth(new Set([3, 3, 4, 5, 5, 6, 7, 7, 8]), 12)
  ])
);


/* size(); */
CUT.isEqual("size();", 6, CEL.size([4, 5, 6, 7, 8, 9]));


/* first(); */
CUT.isEqual("first();", 4, CEL.first([4, 5, 6, 7, 8, 9]));


/* head(); */
CUT.isEqual("head();", 4, CEL.head([4, 5, 6, 7, 8, 9]));


/* last(); */
CUT.isEqual("last();", 9, CEL.last([4, 5, 6, 7, 8, 9]));


/* reverse(); */
CUT.isEqual("reverse();", "[\"last\",9,8,7,6,5,4,\"first\"]",
  JSON.stringify([...CEL.reverse(["first", 4, 5, 6, 7, 8, 9, "last"])])
);


/* sort(); */
CUT.isEqual("sort(); without numbers", "[4,5,6,7,8,9,\"first\",\"last\"]",
  JSON.stringify([...CEL.sort(["first", 4, 5, 6, 7, 8, 9, "last"])])
);
CUT.isEqual("sort(); with numbers", "[\"first\",4,5,6,7,8,9,\"last\"]",
  JSON.stringify([...CEL.sort(["first", 4, 5, 6, 7, 8, 9, "last"], true)])
);
CUT.isEqual("sort(); numbers without numbers", "[1,10,7,9]",
  JSON.stringify([...CEL.sort([7, 1, 10, 9])])
);
CUT.isEqual("sort(); numbers with numbers", "[1,7,9,10]",
  JSON.stringify([...CEL.sort([7, 1, 10, 9], true)])
);


/* shuffle(); */
token1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
CUT.isFalse("shuffle();", CEL.isSameArray(CEL.shuffle(token1), token1));


/* includes(); */
CUT.isTrue("includes(); true", CEL.includes([4, 5, 6, 7, 8, 9], 9));
CUT.isFalse("includes(); false", CEL.includes([4, 5, 6, 7, 8, 9], 10));


/* contains(); */
CUT.isTrue("contains(); true", CEL.contains([4, 5, 6, 7, 8, 9], 9));
CUT.isFalse("contains(); false", CEL.contains([4, 5, 6, 7, 8, 9], 10));


/* find(); */
CUT.isEqual("find(); found", 6, CEL.find([4, 5, 6, 7, 8, 9], (v) => (v > 5)));
CUT.isEqual("find(); not found",undefined,CEL.find([4,5,6,7,8,9,],(v)=>(v>11)));


/* findLast(); */
CUT.isTrue("findLast();",
  CEL.findLast([4, 1, 7, 2, 9], (v) => v < 5) === 2
    && CEL.findLast([4, 1, 7, 2, 9], (v) => v > 10) === undefined
);


/* every(); */
CUT.isTrue("every(); true", CEL.every([2, 9, 3, 5, 8], (v) => v > 1));
CUT.isFalse("every(); false 1 - some", CEL.every([2, 9, 3, 5, 8], (v)=> v > 3));
CUT.isFalse("every(); false 1 - none", CEL.every([2, 9, 3, 5, 8], (v) =>v < 0));
CUT.isFalse("every(); false 3 - empty", CEL.every([], (v) => v > 3));


/* some(); */
CUT.isTrue("some(); true", CEL.some([2, 9, 3, 5, 8], (v) => v > 3));
CUT.isFalse("some(); false 1 - none", CEL.some([2, 9, 3, 5, 8], (v) => v < 0));
CUT.isFalse("some(); false 2 - empty", CEL.some([], (v) => v < 0));


/* none(); */
CUT.isTrue("none(); true", CEL.none([2, 9, 3, 5, 8], (v) => v < 0));
CUT.isFalse("none(); false 1 - every",CEL.none([2, 9, 3, 5, 8], (v) => v > 1));
CUT.isFalse("none(); false 2 - some", CEL.none([2, 9, 3, 5, 8], (v) => v > 3));
CUT.isFalse("none(); false 3 - empty", CEL.none([], (v) => v > 3));


/* takeRight(); */
token1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
CUT.isEqual("takeRight(); 1 - 0", "", CUT.join(CEL.takeRight(token1, 0)));
CUT.isEqual("takeRight(); 2 - 7", "J I H G F E D",
  CUT.join(CEL.takeRight(token1, 7))
);
CUT.isEqual("takeRight(); 3 - 12", "J I H G F E D C B A",
  CUT.join(CEL.takeRight(token1, 12))
);
CUT.isEqual("takeRight(); 4 - default 1", "J", CUT.join(CEL.takeRight(token1)));


/* dropRight(); */
token1 = ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
CUT.isEqual("dropRight(); 1 - 0", "A B C D E F G H I J",
  CUT.join(CEL.dropRight(token1, 0))
);
CUT.isEqual("dropRight(); 2 - 7", "H I J", CUT.join(CEL.dropRight(token1, 7)));
CUT.isEqual("dropRight(); 3 - 12", "", CUT.join(CEL.dropRight(token1, 12)));
CUT.isEqual("dropRight(); 4 - default 1", "B C D E F G H I J",
  CUT.join(CEL.dropRight(token1))
);


/* takeRightWhile(); */
token1 = [16, 14, 12, 10, 8, 6, 4, 2, 0];
token2 = 0;
for (let item of CEL.takeRightWhile(token1, (e) => e < 10 )) { token2 += item; }
CUT.isEqual("takeRightWhile(); values", token2, 20);
token2 = 0;
for (let item of CEL.takeRightWhile(token1, (e) => e < 0 )) { token2 += item; }
CUT.isEqual("takeRightWhile(); empty list", token2, 0);
token2 = 0;
for (let item of CEL.takeRightWhile(token1, (e) => e < 30 )) { token2 += item; }
CUT.isEqual("takeRightWhile(); full list", token2, 72);


/* dropRightWhile(); */
token1 = [16, 14, 12, 10, 8, 6, 4, 2, 0];
token2 = 0;
for (let item of CEL.dropRightWhile(token1, (e) => e < 10)) { token2 += item; }
CUT.isEqual("dropRightWhile(); values", token2, 52);
token2 = 0;
for (let item of CEL.dropRightWhile(token1, (e) => e < 30)) { token2 += item; }
CUT.isEqual("dropRightWhile(); empty list", token2, 0);
token2 = 0;
for (let item of CEL.dropRightWhile(token1, (e) => e < 0)) { token2 += item; }
CUT.isEqual("dropRightWhile(); full list", token2, 72);


/* concat(); */
CUT.isEqual("concat(); one","[4,5,6]",JSON.stringify([...CEL.concat([4,5,6])]));
CUT.isEqual("concat(); more", "[\"1\",\"2\",\"3\",4,5,6,7,8,9,10]",
  JSON.stringify([...CEL.concat("123", [4,5,6].values(), new Set([7,8,9]), 10)])
);


/* reduce(); */
CUT.isEqual("reduce(); with initialvalue", 39,
  CEL.reduce([4, 5, 6, 7, 8, 9].values(), (acc, v, i) => acc + v, 0)
);
CUT.isEqual("reduce(); without initialvalue", 39,
  CEL.reduce([4, 5, 6, 7, 8, 9].values(), (acc, v, i) => acc + v)
);


/* enumerate(); */
CUT.isEqual("enumerate();",
  JSON.stringify([...CEL.enumerate(["Picard", "Riker", "Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]"
);
CUT.isEqual("enumerate(); with offset",
  JSON.stringify([...CEL.enumerate(["Picard", "Riker", "Data"], 2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]"
);


/* entries(); */
CUT.isEqual("entries();",
  JSON.stringify([...CEL.entries(["Picard", "Riker", "Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]"
);
CUT.isEqual("entries(); with offset",
  JSON.stringify([...CEL.entries(["Picard", "Riker", "Data"], 2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]"
);


/* flat(); */
CUT.isEqual("flat();", "[1,2,3,4,5,6,7,8,9,10]",
  JSON.stringify([...CEL.flat([[1, 2, 3].values(),
  new Set([4, 5, 6, 6, 7, 7, 4]), [8, 9], 10])])
);


/* join(); */
var token1 = [2, 4, 6, 4, 8, 2];
CUT.isEqual("join();",
  "2,4,6,4,8,2 2468 2;4;6;8 2x4x6x8 2true4true6true8 2114116118 ",
  CUT.join([
    CEL.join(token1),
    CEL.join(new Set(token1), ""),
    CEL.join(new Set(token1), ";"),
    CEL.join(new Set(token1), "x"),
    CEL.join(new Set(token1), true),
    CEL.join(new Set(token1), 11),
    CEL.join([])
  ])
);


/* arrayCycle(); begin */
CUT.isEqual("arrayCycle(); - ES5 1 - with 2 parameters",
  "[4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14]",
  JSON.stringify(CEL.arrayCycle([4, true, "fgh", 3.14], 5))
);
CUT.isEqual("arrayCycle(); - ES5 2 - with default parameter (n = 100);",
  "[4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6]",
  JSON.stringify(CEL.arrayCycle([4, 5, 6]))
);
CUT.isEqual("arrayCycle(); - ES6 1 - ES5 1 - with 2 parameters",
  "[2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4]",
  JSON.stringify(CEL.arrayCycle(new Map([[2, 3], [3, 4], [4, 5]]).keys(), 10))
);
CUT.isEqual("arrayCycle(); - ES6 2 - with default parameter (n = 100);",
  "[[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5]]",
  JSON.stringify(CEL.arrayCycle(new Map([[2, 3], [3, 4], [4, 5]]).entries()))
);
/* arrayCycle(); end */


/* arrayRepeat(); */
CUT.isEqual("arrayRepeat(); - 1 - with 2 parameters",
  "[\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\"]",
  JSON.stringify(CEL.arrayRepeat("abc", 8))
);
CUT.isEqual("arrayRepeat(); - 2 - with default parameter (n = 100);",
  JSON.stringify(CEL.arrayRepeat(3.14)),
  "[3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14]"
);


/* arrayRange(); */
CUT.isEqual("arrayRange(); - 1 - step default 1",
  "[5,6,7,8,9,10,11,12]", JSON.stringify(CEL.arrayRange(5, 12))
);
CUT.isEqual("arrayRange(); - 2 - step 3",
  "[1,4,7,10,13,16]", JSON.stringify(CEL.arrayRange(1, 16, 3))
);
CUT.isEqual("arrayRange(); - 3 - step 3.2 <i>(can be failed - float)<i>",
  "[1,4.2,7.4,10.600000000000001,13.8,17]",
  JSON.stringify(CEL.arrayRange(1, 17, 3.2))
);
CUT.isEqual("arrayRange(); - 4 - without parameters",
  JSON.stringify(CEL.arrayRange()),
  "[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]"
);
CUT.isEqual("arrayRange(); - 4 - with 1 parameter",
  "[90,91,92,93,94,95,96,97,98,99]", JSON.stringify(CEL.arrayRange(90))
);


/* zip(); */
CUT.isEqual("zip(); ES5 1","[[\"a1\",\"c1\"],[\"a2\",\"c2\"],[\"a3\",\"c3\"]]",
  JSON.stringify(CEL.zip(["a1", "a2", "a3"], ["c1", "c2", "c3", "c4", "c5"]))
);
CUT.isEqual("zip(); ES5 2",
  "[[\"a1\",\"b1\",\"c1\",\"d1\",\"e1\"],[\"a2\",\"b2\",\"c2\",\"d2\",\"e2\"]]",
  JSON.stringify(CEL.zip(
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3", "c4", "c5"],
    ["d1", "d2"],
    ["e1", "e2", "e3", "e4"]
   ))
);
CUT.isEqual("zip(); ES6 1", "[[\"a\",3],[\"b\",4],[\"c\",5],[\"d\",6]]",
  JSON.stringify(CEL.zip(
    new Set(["a", "b", "c", "d"]),
    new Map([[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]).values()
  ))
);
CUT.isEqual("zip(); ES6 2",
  "[[\"a\",3,\"c1\"],[\"b\",4,\"c2\"],[\"c\",5,\"c3\"],[\"d\",6,\"c4\"]]",
  JSON.stringify(CEL.zip(new Set(["a", "b", "c", "d"]),
    new Map([[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]).values(),
    ["c1", "c2", "c3", "c4", "c5"].values()
  ))
);


/* unzip(); */
CUT.isEqual("unzip(); ES5",
  "[[\"a1\",\"a2\"],[\"b1\",\"b2\"],[\"c1\",\"c2\"],[\"d1\",\"d2\"],[\"e1\",\"e2\"]]",
  JSON.stringify(CEL.unzip(CEL.zip(
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3", "c4", "c5"],
    ["d1", "d2"],
    ["e1", "e2", "e3", "e4"]
  )))
);
CUT.isEqual("unzip(); ES6",
  "[[\"a\",\"b\",\"c\",\"d\"],[3,4,5,6],[\"c1\",\"c2\",\"c3\",\"c4\"]]",
  JSON.stringify(CEL.unzip(CEL.zip(new Set(["a", "b", "c", "d"]),
    new Map([[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]).values(),
      ["c1", "c2", "c3", "c4", "c5"].values()
  ).values()))
);


/* zipObj(); */
CUT.isEqual("zipObj();", "{\"a\":1,\"b\":2,\"c\":3}",
  JSON.stringify(CEL.zipObj(["a", "b", "c"], [1, 2, 3]))
);


/* min(); */
CUT.isEqual("min(); array", 11, CEL.min(...[21, 11, 41, 51, 31]));
CUT.isEqual("min(); Set", 11, CEL.min(...new Set([21, 11, 41, 51, 31])));
CUT.isEqual("min(); number test", CEL.min(5, 10, 3), 3);


/* max(); */
CUT.isEqual("max(); array", 51, CEL.max(...[21, 11, 41, 51, 31]));
CUT.isEqual("max(); Set keys", 51, CEL.max(...new Set([21, 51, 31]).keys()));
CUT.isEqual("max(); number test", CEL.max(5, 10, 3), 10);


/* isSuperset(); */
CUT.isTrue("isSuperset(); - ES5 - true", CEL.isSuperset([3,58,95,88], [88,95]));
CUT.isFalse("isSuperset(); - ES5 - false", CEL.isSuperset([84,95], [3,58,95]));
CUT.isTrue("isSuperset(); - ES6 - true",
  CEL.isSuperset(new Set([3, 11, 58, 95, 88]), [88, 95, 11].values())
);
CUT.isFalse("isSuperset(); - ES6 - false",
  CEL.isSuperset(new Set([88, 95, 11, 84]).keys(), [3, 11, 58, 95, 88].keys())
);


/* arrayUnion(); */
CUT.isEqual(
  "arrayUnion(); ES5","[1,2,3,4,5,6,7,8]", JSON.stringify(CEL.arrayUnion(
    [1, 2, 3, 4], [3, 4, 5, 6], [5, 6, 7, 8]
  ))
);
CUT.isEqual("arrayUnion(); ES6", "[1,2,3,4,5,6,7,8]",
  JSON.stringify(CEL.arrayUnion(new Set([1, 2, 3, 4]), [3, 4, 5, 6].values(),
  new Set([5, 6, 7, 8]).values()))
);


/* arrayIntersection(); */
CUT.isEqual(
  "arrayIntersection(); ES5","[3,4]", JSON.stringify(CEL.arrayIntersection(
    [1, 2, 3, 4], [3, 4, 5, 6]
  ))
);
CUT.isEqual("arrayIntersection(); ES6", "[3,4]",
  JSON.stringify(CEL.arrayIntersection([1,2,3,4].values(), new Set([3,4,5, 6])))
);


/* arrayDifference(); */
CUT.isEqual(
  "arrayDifference(); ES5", "[1,2]", JSON.stringify(CEL.arrayDifference(
    [1, 2, 3, 4], [3, 4, 5, 6]
  ))
);
CUT.isEqual("arrayDifference(); ES6", "[1,2]",
  JSON.stringify(
    CEL.arrayDifference(new Map([[1, 2], [2, 3], [3, 4], [4, 5]]).keys(),
      [3, 4, 5, 6].values()
    )
  )
);


/* arraySymmetricDifference(); */
CUT.isEqual("arraySymmetricDifference(); ES5",
  "[1,2,5,6]", JSON.stringify(CEL.arraySymmetricDifference(
    [1, 2, 3, 4], [3, 4, 5, 6]
  ))
);
CUT.isEqual("arraySymmetricDifference(); ES6", "[1,2,5,6]",
  JSON.stringify(CEL.arraySymmetricDifference(
    new Set([1, 2, 3, 4]).keys(), new Map([[1,3],[2,4], [3,5], [4,6]]).values())
  )
);


/* Set helper function */
function __setEquals__(set1, set2) {
  if (!(set1 instanceof Set) || !(set2 instanceof Set)) { return false; }
  if (set1.size !== set2.size) { return false; }
  if (JSON.stringify(Array.from(set1)) !== JSON.stringify(Array.from(set2))) {
    return false;
  }
  return true;
}


/* setUnion(); */
CUT.isTrue("setUnion(); ES6",
  __setEquals__(
    CEL.setUnion(new Map([[2, 1], [3, 2], [4, 3], [5, 4]]).values(),
      new Set([3, 4, 5, 6]), [5 , 6, 7, 8]
    ),
    CEL.setUnion([1, 2, 3, 4],new Map([[2,3], [3, 4], [4, 5], [5, 6]]).values(),
      new Set([5, 6, 7, 8]).values()
    )
  )
);


/* setIntersection(); */
CUT.isTrue("setIntersection(); ES6",
  __setEquals__(new Set([3, 4]), CEL.setIntersection(
    new Set([1, 2, 3, 4]), new Set([3, 4, 5, 6])
  ))
);


/* setDifference(); */
CUT.isTrue("setDifference(); ES6",
  __setEquals__(new Set([1, 2]), CEL.setDifference(
    new Set([1, 2, 3, 4]), new Set([3, 4, 5, 6])
  ))
);


/* setSymmetricDifference(); */
CUT.isTrue("setSymmetricDifference(); ES6",
  __setEquals__(new Set([1, 2, 5, 6]), CEL.setSymmetricDifference(
    new Set([1, 2, 3, 4]), new Set([3, 4, 5, 6])
  ))
);


/* arrayClear(); */
token1 = [4, 5, 6];
token2 = CEL.arrayClear(token1);
CUT.isTrue("arrayClear();",
  (token1 === token2 && token1.length === 0 && Array.isArray(token1))
);


/* arrayremove begin */
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isTrue("arrayRemove(); - 1 found - not all - true",
  CEL.arrayRemove(token1, 6)
);
CUT.isFalse("arrayRemove(); - 1 found - not all - false",
  CEL.arrayRemove(token1, 6)
);
CUT.isEqual("arrayRemove(); - 1 found - not all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(token1)
);
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isTrue("arrayRemove(); - 1 found - all - true",
  CEL.arrayRemove(token1, 6, true)
);
CUT.isFalse("arrayRemove(); - 1 found - all - false",
  CEL.arrayRemove(token1, 6, true)
);
CUT.isEqual("arrayRemove(); - 1 found - all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(token1)
);
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isTrue("arrayRemove(); - 3 found - not all - true",
  CEL.arrayRemove(token1, 5)
);
CUT.isTrue("arrayRemove(); - 3 found - not all - true",
  CEL.arrayRemove(token1, 5, false)
);
CUT.isEqual("arrayRemove(); - 3 found - not all - value check",
  "[1,2,3,4,6,7,8,5,9,0]", JSON.stringify(token1)
);
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isTrue("arrayRemove(); - 3 found - all - true",
  CEL.arrayRemove(token1, 5, true)
);
CUT.isFalse("arrayRemove(); - 3 found - all - false",
  CEL.arrayRemove(token1, 5, true)
);
CUT.isEqual("arrayRemove(); - 3 found - all - value check",
  "[1,2,3,4,6,7,8,9,0]", JSON.stringify(token1)
);
token1 = [1, 2, 3, 4, 5, 6, 5, 7, 8, 5, 9, 0];
CUT.isFalse("arrayRemove(); - 0 found - not all - false",
  CEL.arrayRemove(token1, 11)
);
CUT.isFalse("arrayRemove(); - 0 found - all - false",
  CEL.arrayRemove(token1, 11, true)
);
CUT.isEqual("arrayRemove(); - 0 found - value check",
  "[1,2,3,4,5,6,5,7,8,5,9,0]", JSON.stringify(token1)
);
/* arrayremove end */


/* arrayremoveby begin */
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isTrue("arrayRemoveBy(); - 1 found - not all - true",
  CEL.arrayRemoveBy(token1, (v) => (v>6) )
);
CUT.isFalse("arrayRemoveBy(); - 1 found - not all - false",
  CEL.arrayRemoveBy(token1, (v) => (v>6))
);
CUT.isEqual("arrayRemoveBy(); - 1 found - not all - value check",
  "[1,3,2,4,5,3,2]", JSON.stringify(token1)
);
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isTrue("arrayRemoveBy(); - 1 found - all - true",
  CEL.arrayRemoveBy(token1, (v) => (v>6), true)
);
CUT.isFalse("arrayRemoveBy(); - 1 found - all - false",
  CEL.arrayRemoveBy(token1, (v) => (v>6), true)
);
CUT.isEqual("arrayRemoveBy(); - 1 found - all - value check",
  "[1,3,2,4,5,3,2]", JSON.stringify(token1)
);
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isTrue("arrayRemoveBy(); - 3 found - not all - true",
  CEL.arrayRemoveBy(token1, (v) => (v>3))
);
CUT.isTrue("arrayRemoveBy(); - 3 found - not all - true",
  CEL.arrayRemoveBy(token1, (v) => (v>3), false)
);
CUT.isEqual("arrayRemoveBy(); - 3 found - not all - value check",
  "[1,3,2,9,3,2]", JSON.stringify(token1)
);
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isTrue("arrayRemoveBy(); - 3 found - all - true",
  CEL.arrayRemoveBy(token1, (v) => (v>3), true)
);
CUT.isFalse("arrayRemoveBy(); - 3 found - all - false",
  CEL.arrayRemoveBy(token1, (v) => (v>3), true)
);
CUT.isEqual("arrayRemoveBy(); - 3 found - all - value check",
  "[1,3,2,3,2]", JSON.stringify(token1)
);
token1 = [1, 3, 2, 4, 5, 9, 3, 2];
CUT.isFalse("arrayRemoveBy(); - 0 found - not all - false",
  CEL.arrayRemoveBy(token1, (v) => (v>13))
);
CUT.isFalse("arrayRemoveBy(); - 0 found - all - false",
  CEL.arrayRemoveBy(token1, (v) => (v>13), true)
);
CUT.isEqual("arrayRemoveBy(); - 0 found - value check",
  "[1,3,2,4,5,9,3,2]", JSON.stringify(token1)
);
/* arrayremoveby end */


/* arrayUnique(); */
CUT.isEqual("arrayUnique(); 1 ES5 - Array and String",
  JSON.stringify(CEL.arrayUnique(
    ["A", "r", "r", "a", "y", "y", "a", "n", "d", "d", "M", "M", "a", "p"]
  )),
  JSON.stringify(CEL.arrayUnique("ArrayyanddMMap"))
);
CUT.isEqual("arrayUnique(); 2 ES6 - Array and Set",
  JSON.stringify(CEL.arrayUnique([1, 2, 2, 3, 4, 4, 5, 6, 6, 7])),
  JSON.stringify(CEL.arrayUnique(new Set([1, 2, 2, 3, 4, 4, 5, 6, 6, 7])))
);
CUT.isEqual("arrayUnique(); 3 ES6 - Array and Map values(); iterator",
  JSON.stringify(CEL.arrayUnique([1, 2, 2, 3, 4, 4, 5, 6, 6, 7])),
  JSON.stringify(
    CEL.arrayUnique((new Map([
      ["extendObj1", 1], ["extendObj2", 2], ["baz1", 2], ["foo2",3], ["bar2",4],
      ["baz2", 4], ["foo3", 5], ["bar3", 6], ["baz3", 6], ["foo4", 7]
    ])).values())
  )
);


/* arrayAdd(); */
token1 = [1, 2, 3, 5];
CUT.isTrue("arrayAdd(); true", CEL.arrayAdd(token1, 4));
CUT.isFalse("arrayAdd(); false", CEL.arrayAdd(token1, 4));
CUT.isEqual("arrayAdd(); value check", "[1,2,3,5,4]", JSON.stringify(token1));


/* arrayMerge(); */
token1 =  [1, 2, 3];
token2 =  [4, 5, 6];
token3 =  [7, 8, [10, 11, 12, [13, 14, 15]], 9];
token4 =  JSON.stringify(CEL.arrayMerge(token1, token2));
token4 += JSON.stringify(token1);
token1 =  [1,2,3];
token4 += JSON.stringify(CEL.arrayMerge(token1, token2, token3));
token4 += JSON.stringify(token1);
CUT.isEqual("arrayMerge();",
  "[1,2,3,4,5,6]"
    + "[1,2,3,4,5,6]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]",
  token4
);


/** Cookie API **/
CUT.addElement("hr");
CUT.addElement("h3", "Cookie API");


CEL.setCookie("ctest3", "cookieUnitTestStr");
CUT.isTrue("setcookie(); + hasCookie(); true", CEL.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) value", "cookieUnitTestStr",
  CEL.getCookie("ctest3"));
CUT.isEqual("getCookie();", "cookieUnitTestStr", CEL.getCookie()["ctest3"]);
CUT.isTrue("removeCookie(); true", CEL.removeCookie("ctest3"));
CUT.isFalse("removeCookie(); false", CEL.removeCookie("ctest3"));
CUT.isFalse("hasCookie(); false", CEL.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) null", null, CEL.getCookie("ctest3"));
CUT.isEqual("getCookie(); undefined", undefined, CEL.getCookie()["ctest3"]);

token1 = "";
CEL.setCookie("ctest4", "cookieUnitTestStr");
CEL.setCookie("ctest5", "cookieUnitTestStr");
token1 += String(CEL.hasCookie("ctest4")) + String(CEL.hasCookie("ctest5"));
CEL.clearCookies();
token1 += String(CEL.hasCookie("ctest4")) + String(CEL.hasCookie("ctest5"));
CUT.isEqual("clearCookies();", "truetruefalsefalse", token1);


/** cookie with settings object **/
CUT.addElement("hr");
CUT.addElement("h3", "cookie with settings object");


CEL.setCookie({"name": "ctest3", "value":"cookieUnitTestStr","SameSite":"Lax"});
CUT.isTrue("setcookie(); + hasCookie(); true <i>(settings object)</i>",
  CEL.hasCookie("ctest3")
);
CUT.isEqual("getCookie(name) value <i>(settings object)</i>",
  "cookieUnitTestStr", CEL.getCookie("ctest3")
);
CUT.isEqual("getCookie(); <i>(settings object)</i>", "cookieUnitTestStr",
  CEL.getCookie()["ctest3"]
);
CUT.isTrue("removeCookie(); true <i>(settings object)</i>",
  CEL.removeCookie({"name": "ctest3", "SameSite": "Lax"})
);
CUT.isFalse("removeCookie(); false <i>(settings object)</i>",
  CEL.removeCookie({"name": "ctest3", "SameSite": "Lax"})
);
CUT.isFalse("hasCookie(); false <i>(settings object)</i>",
  CEL.hasCookie("ctest3")
);
CUT.isEqual("getCookie(name) null <i>(settings object)</i>", null,
  CEL.getCookie("ctest3")
);
CUT.isEqual("getCookie(); undefined <i>(settings object)</i>", undefined,
  CEL.getCookie()["ctest3"]
);

token1 = "";
CEL.setCookie({"name":"ctest4", "value":"cookieUnitTestStr", "SameSite":"Lax"});
CEL.setCookie({"name":"ctest5", "value":"cookieUnitTestStr", "SameSite":"Lax"});
token1+=String(CEL.hasCookie("ctest4")) + String(CEL.hasCookie("ctest5"));
CEL.clearCookies({"SameSite": "Lax"});
token1+=String(CEL.hasCookie("ctest4")) + String(CEL.hasCookie("ctest5"));
CUT.isEqual("clearCookies(); <i>(settings object)</i>", "truetruefalsefalse",
  token1
);


/** Polyfills **/
CUT.addElement("hr");
CUT.addElement("h3", "polyfills");


/* Math.sumPrecise(); begin */
CUT.isEqual("Math.sumPrecise(); 1", Math.sumPrecise([]), -0);
CUT.isEqual("Math.sumPrecise(); 2", Math.sumPrecise([Infinity]), Infinity);
CUT.isEqual("Math.sumPrecise(); 3",
  Math.sumPrecise([0.1,0.2,1e20,-1e20,1e20,Infinity]), Infinity
);
CUT.isEqual("Math.sumPrecise(); 4", Math.sumPrecise([-Infinity]), -Infinity);
CUT.isEqual("Math.sumPrecise(); 5",
  Math.sumPrecise([0.1,0.2,1e20,-1e20,1e20,-Infinity]), -Infinity
);
CUT.isEqual("Math.sumPrecise(); 6",
  Math.sumPrecise([-4234233,1e20]), 99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 7",
  Math.sumPrecise([-4234233.5,1e20]), 99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 8",
  Math.sumPrecise([4234233,-1e20]), -99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 9",
  Math.sumPrecise([4234233.5,-1e20]), -99999999999995770000
);
CUT.isEqual("Math.sumPrecise(); 10",
  Math.sumPrecise([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]), 1
);
CUT.isEqual("Math.sumPrecise(); 11", Math.sumPrecise([1, 2]), 3);
CUT.isEqual("Math.sumPrecise(); 12", Math.sumPrecise([1, 2, 3]), 6);
CUT.isEqual("Math.sumPrecise(); 13", Math.sumPrecise([42]), 42);
CUT.isEqual("Math.sumPrecise(); 14", Math.sumPrecise([42, -98]), -56);
CUT.isEqual("Math.sumPrecise(); 15", Math.sumPrecise([42, 3.14]), 45.14);
CUT.isEqual("Math.sumPrecise(); 16", Math.sumPrecise([42, -53.14]), -11.14);
CUT.isEqual("Math.sumPrecise(); 17", Math.sumPrecise([0.1, 0.2]),
  0.30000000000000004
);
CUT.isEqual("Math.sumPrecise(); 18", Math.sumPrecise([1e20, 0.1, -1e20]), 0.1);
CUT.isEqual("Math.sumPrecise(); 19", Math.sumPrecise([2, 1e20-1]),
  100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 20", Math.sumPrecise([1e20, 0.1]),
  100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 21", Math.sumPrecise([1e20]),
  100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 22", Math.sumPrecise([-2, -1e20 + 1]),
  -100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 23", Math.sumPrecise([0.1, -1e20]),
  -100000000000000000000
);
CUT.isEqual("Math.sumPrecise(); 24", Math.sumPrecise([-1e20]),
  -100000000000000000000
);
CUT.isNotEqual("Math.sumPrecise(); 25",
  Math.sumPrecise([Infinity, 0.1, 0.2, -Infinity]), NaN
);
CUT.isNotEqual("Math.sumPrecise(); 26",
  Math.sumPrecise([Infinity, 0.1, 0.2, -Infinity]), NaN
);
CUT.isNotEqual("Math.sumPrecise(); 27",
  Math.sumPrecise([Infinity, 0.1, 0.2, -Infinity]), NaN
);
CUT.isNotEqual("Math.sumPrecise(); 28",
  Math.sumPrecise([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, NaN]), NaN
);
try {
  console.log(Math.sumPrecise(5));
} catch (e) { CUT.isTrue("Math.sumPrecise(); 30 - error", true); }
try {
  console.log(Math.sumPrecise("1848"));
} catch (e) { CUT.isTrue("Math.sumPrecise(); 31 - error", true); }
try {
  console.log(Math.sumPrecise("1848a"));
} catch (e) { CUT.isTrue("Math.sumPrecise(); 32 - error", true); }
try {
  console.log(Math.sumPrecise([0.1,0.1,0.1,0.1,0.1,0.1, 0.1, 0.1, 0.1, "0.1"]));
} catch (e) { CUT.isTrue("Math.sumPrecise(); 33 - error", true); }
try {
  console.log(Math.sumPrecise([0.1,0.1,0.1,0.1,0.1, 0.1, 0.1, 0.1, 0.1, true]));
} catch (e) { CUT.isTrue("Math.sumPrecise(); 34 - error", true); }
try {
  console.log(
    Math.sumPrecise([0.1,0.1,0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, BigInt(5)])
  );
} catch (e) { CUT.isTrue("Math.sumPrecise(); 35 - error", true); }
try {
  console.log(Math.sumPrecise([Infinity,"0.1", 0.2]));
} catch (e) { CUT.isTrue("Math.sumPrecise(); 36 - error", true); }
try {
  console.log(Math.sumPrecise([-Infinity, "0.1", 0.2]));
} catch (e) { CUT.isTrue("Math.sumPrecise(); 37 - error", true); }
try {
  console.log(Math.sumPrecise([-Infinity, "1", 0.2]));
} catch (e) { CUT.isTrue("Math.sumPrecise(); 38 - error", true); }
/* Math.sumPrecise(); end */


/* Error.isError(); */
document.body.appendChild(document.createElement("iframe"));
CUT.isEqual("Error.isError();", "1111000000000",
  CUT.concat(
    /* true */
    +(Error.isError(new window.frames[window.frames.length - 1].Error())),
    +(Error.isError(new Error())),
    +(Error.isError(new TypeError())),
    +(Error.isError(new DOMException())),
    /* false */
    +(Error.isError({ __proto__: Error.prototype })),
    +(Error.isError({})),
    +(Error.isError(null)),
    +(Error.isError(undefined)),
    +(Error.isError(17)),
    +(Error.isError(3.14)),
    +(Error.isError("Error")),
    +(Error.isError(true)),
    +(Error.isError(false))
  )
);
CEL.qs("iframe").remove();


/* Array.prototype.toReversed(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.toReversed();",
  JSON.stringify(token1.toReversed()) === "[5,2,4]"
  && JSON.stringify(token1) === "[4,2,5]"
);


/* Array.prototype.toSorted(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.toSorted();",
  JSON.stringify(token1.toSorted()) === "[2,4,5]"
  && JSON.stringify(token1) === "[4,2,5]"
);


/* Array.prototype.toSpliced(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.toSpliced(); remove",
  JSON.stringify(token1.toSpliced(1,1)) === "[4,5]"
  && JSON.stringify(token1) === "[4,2,5]"
);


/*Array.prototype.toSpliced(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.toSpliced(); remove and add 2 items",
  JSON.stringify(token1.toSpliced(1,1,89,79)) === "[4,89,79,5]"
  && JSON.stringify(token1) === "[4,2,5]"
);


/* Array.prototype.with(); */
token1 = [4, 2, 5];
CUT.isTrue("Array.prototype.with();",
  JSON.stringify(token1.with(1,7)) === "[4,7,5]"
  && JSON.stringify(token1) === "[4,2,5]"
);


/* TypedArray.prototype.toReversed(); */
token1 = new Uint8Array([4, 2, 5]);
CUT.isTrue("TypedArray.prototype.toReversed();",
  JSON.stringify(token1.toReversed()) === "{\"0\":5,\"1\":2,\"2\":4}"
  && JSON.stringify(token1) === "{\"0\":4,\"1\":2,\"2\":5}"
);


/* TypedArray.prototype.toSorted(); */
token1 = new Uint8Array([4, 2, 5]);
CUT.isTrue("TypedArray.prototype.toSorted();",
  JSON.stringify(token1.toSorted()) === "{\"0\":2,\"1\":4,\"2\":5}"
  && JSON.stringify(token1) === "{\"0\":4,\"1\":2,\"2\":5}"
);


/*TypedArray.prototype.with(); */
token1 = new Uint8Array([4, 2, 5]);
CUT.isTrue("TypedArray.prototype.with();",
  JSON.stringify(token1.with(1,7)) === "{\"0\":4,\"1\":7,\"2\":5}"
  && JSON.stringify(token1) === "{\"0\":4,\"1\":2,\"2\":5}"
);


/* Object.groupBy(); */
CUT.isEqual("Object.groupBy();",
  JSON.stringify(Object.groupBy([
    { name: 'asparagus', type: 'vegetables', quantity: 9 },
    { name: 'bananas', type: 'fruit', quantity: 5 },
    { name: 'goat', type: 'meat', quantity: 23 },
    { name: 'cherries', type: 'fruit', quantity: 12 },
    { name: 'fish', type: 'meat', quantity: 3 },
  ], ({ quantity }) => (quantity < 6 ? "restock" : "sufficient"))),
  '{"sufficient":[{"name":"asparagus","type":"vegetables","quantity":9},{"name":"goat","type":"meat","quantity":23},{"name":"cherries","type":"fruit","quantity":12}],"restock":[{"name":"bananas","type":"fruit","quantity":5},{"name":"fish","type":"meat","quantity":3}]}'
);


/* Map.groupBy(); */
CUT.isEqual("Map.groupBy();",
  JSON.stringify(Array.from(Map.groupBy([
    { name: 'asparagus', type: 'vegetables', quantity: 9 },
    { name: 'bananas', type: 'fruit', quantity: 5 },
    { name: 'goat', type: 'meat', quantity: 23 },
    { name: 'cherries', type: 'fruit', quantity: 12 },
    { name: 'fish', type: 'meat', quantity: 3 },
  ], ({ quantity }) => (quantity < 6 ? "restock" : "sufficient")))),
  '[["sufficient",[{"name":"asparagus","type":"vegetables","quantity":9},{"name":"goat","type":"meat","quantity":23},{"name":"cherries","type":"fruit","quantity":12}]],["restock",[{"name":"bananas","type":"fruit","quantity":5},{"name":"fish","type":"meat","quantity":3}]]]'
);


/* crypto.randomUUID(); */
token1 = crypto.randomUUID();
CUT.isTrue("crypto.randomUUID();",
  token1.length === 36
    && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
      .test(token1)
    && token1[14] === "4"
    && "89ab".includes(token1[19])
);
CUT.logCode(token1);


/* Object.hasOwn(); */
CUT.isTrue("Object.hasOwn();",
      Object.hasOwn({"a": 1, "b": 2}, "a")
  && !Object.hasOwn({"a": 1, "b": 2}, "hasOwnProperty")
  && !Object.hasOwn({"a": 1, "b": 2}, "c")
  &&  Object.hasOwn([4, 5, 6], "0")
  && !Object.hasOwn([4, 5, 6], "map")
  && !Object.hasOwn([4, 5, 6], "map2")
);


/* globalThis; */
CUT.isEqual("globalThis;", window, globalThis);


/** non-standard polyfills **/
CUT.addElement("hr");
CUT.addElement("h3", "non-standard polyfills");


/* BigInt.prototype.toJSON(); */
if (!!window.BigInt) {
  CUT.isEqual("BigInt.prototype.toJSON();", '"42"', JSON.stringify(BigInt(42)));
}


/* GeneratorFunction(); */
token1 = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
CUT.isEqual("GeneratorFunction();", "9 12", CUT.join(token1(3)));


/* AsyncFunction(); */
CUT.isEqual("AsyncFunction();", "asyncfunction",
  CEL.classof(new AsyncFunction("a", "b",
    "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
  )
));


/** type checking **/
CUT.addElement("hr");
CUT.addElement("h3", "type checking");


/* isTruthy(); */
CUT.isTrue("isTruthy();",
  CEL.isTruthy(1)
    && CEL.isTruthy(42)
    && CEL.isTruthy(3.14)
    && CEL.isTruthy([])
    && CEL.isTruthy({})
    && !CEL.isTruthy(false)
    && !CEL.isTruthy(0)
    && !CEL.isTruthy(-0)
    && (!!window.BigInt ? !CEL.isTruthy(BigInt(0)) : true)
    && !CEL.isTruthy("")
    && !CEL.isTruthy(null)
    && !CEL.isTruthy(undefined)
    && !CEL.isTruthy(NaN)
);


/* isFalsy(); */
CUT.isTrue("isFalsy();",
  !CEL.isFalsy(1)
    && !CEL.isFalsy(42)
    && !CEL.isFalsy(3.14)
    && !CEL.isFalsy([])
    && !CEL.isFalsy({})
    && CEL.isFalsy(false)
    && CEL.isFalsy(0)
    && CEL.isFalsy(-0)
    && (!!window.BigInt ? CEL.isFalsy(BigInt(0)) : true)
    && CEL.isFalsy("")
    && CEL.isFalsy(null)
    && CEL.isFalsy(undefined)
    && CEL.isFalsy(NaN)
);


/* isAsyncGeneratorFn(); */
CUT.isTrue("isAsyncGeneratorFn();",
  CEL.isAsyncGeneratorFn(async function*(){})
    && !CEL.isAsyncGeneratorFn(function*(){})
    && !CEL.isAsyncGeneratorFn(Array)
    && !CEL.isAsyncGeneratorFn(Array.from)
    && !CEL.isAsyncGeneratorFn(0)
);


/* isConstructorFn(); */
CUT.isTrue("isConstructorFn();",
  CEL.isConstructorFn(Array)
    && !CEL.isConstructorFn(Array.from)
    && !CEL.isConstructorFn(0)
);


/* isClass(); */
CUT.isTrue("isClass();",
  CEL.isClass(Array) && !CEL.isClass(Array.from) && !CEL.isClass(0)
);


/* isPlainObject(); */
CUT.isTrue("isPlainObject();",
  !CEL.isPlainObject(null)
    && !CEL.isPlainObject("")
    && !CEL.isPlainObject([])
    && !CEL.isPlainObject(function(){})
    && CEL.isPlainObject({})
    && CEL.isPlainObject({a: "1", b: "2"})
    && CEL.isPlainObject(Object.create(null))
);


/* isEmptyMap(); */
CUT.isTrue("isEmptyMap(); true", CEL.isEmptyMap(new Map()));
CUT.isFalse("isEmptyMap(); false 1", CEL.isEmptyMap(new Map([[4, 5], [6, 7]])));
CUT.isFalse("isEmptyMap(); false 2 array", CEL.isEmptyMap([]));


/* isEmptySet(); */
CUT.isTrue("isEmptySet(); true", CEL.isEmptySet(new Set()));
CUT.isFalse("isEmptySet(); false 1", CEL.isEmptySet(new Set([4, 5, 6])));
CUT.isFalse("isEmptySet(); false 2 array", CEL.isEmptySet([]));


/* isEmptyIterator(); */
CUT.isTrue("isEmptyIterator(); true", CEL.isEmptyIterator([]));
CUT.isFalse("isEmptyIterator(); false", CEL.isEmptyIterator([4, 5, 6]));


/* isDataView(); */
CUT.isTrue("isDataView(); true",
  CEL.isDataView(new DataView(new ArrayBuffer(2)), "dataview")
);
CUT.isFalse("isDataView(); false", CEL.isDataView({}, "dataview"));


/* isGeneratorFn(); */
CUT.isTrue("isGeneratorFn(); true",
  CEL.isGeneratorFn(function* fn42g () { yield 42; })
);
CUT.isFalse("isGeneratorFn(); false 1 fn",
  CEL.isGeneratorFn(function fn42 () { return 42; })
);
CUT.isFalse("isGeneratorFn(); false 2 async fn",
  CEL.isGeneratorFn(
    new AsyncFunction("a", "b",
      "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
    )
  )
);
CUT.isFalse("isGeneratorFn(); false 3 number", CEL.isGeneratorFn(42));


/* isAsyncFn(); */
CUT.isTrue("isAsyncFn(); true",
  CEL.isAsyncFn(
    new AsyncFunction("a", "b",
      "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"
    )
  )
);
CUT.isFalse("isAsyncFn(); false 1 fn",
  CEL.isAsyncFn(function fn42 () { return 42; })
);
CUT.isFalse("isAsyncFn(); false 2 generator fn",
  CEL.isAsyncFn(function* fn42g () { yield 42; })
);
CUT.isFalse("isAsyncFn(); false 3 number", CEL.isAsyncFn(42));


/* isString(); */
CUT.isTrue("isString(); true", CEL.isString("str"));
CUT.isFalse("isString(); false", CEL.isString(533));


/* isChar(); */
CUT.isTrue("isChar(); true 1", CEL.isChar("s"));
CUT.isTrue("isChar(); true 2 unicode", CEL.isChar("\uD834\uDF06"));
CUT.isFalse("isChar(); false 1", CEL.isChar("str"));
CUT.isFalse("isChar(); false 2", CEL.isChar(533));
CUT.isFalse("isChar(); false 3 unicode", CEL.isChar("s \uD834\uDF06 tr"));


/* isNumber(); */
CUT.isTrue("isNumber(); true 1", CEL.isNumber(98));
CUT.isTrue("isNumber(); true 2", CEL.isNumber(3.14));
CUT.isFalse("isNumber(); false", CEL.isNumber("str"));


/* isFloat(); */
CUT.isTrue("isFloat(); true", CEL.isFloat(3.14));
CUT.isFalse("isFloat(); false 1", CEL.isFloat(98));
CUT.isFalse("isFloat(); false 2", CEL.isFloat("str"));


/* isBoolean(); */
CUT.isTrue("isBoolean(); true", CEL.isBoolean(false));
CUT.isFalse("isBoolean(); false", CEL.isBoolean(98));


/* isObject(); */
CUT.isTrue("isObject(); 1 true object {\"a\":1}", CEL.isObject({"a":1}));
CUT.isTrue("isObject(); 1 true object Object(42);", CEL.isObject(Object(42)));
CUT.isTrue("isObject(); 1 true function", CEL.isObject(function(){}));
CUT.isTrue("isObject(); 2 true array", CEL.isObject([]));
CUT.isFalse("isObject(); 3 false null", CEL.isObject(null));
CUT.isFalse("isObject(); 3 false undefined", CEL.isObject(undefined));
CUT.isFalse("isObject(); 4 false number", CEL.isObject(42));


/* isEmptyObject(); */
CUT.isTrue("isEmptyObject(); 1 true", CEL.isEmptyObject({}));
CUT.isFalse("isEmptyObject(); 2 false ", CEL.isEmptyObject({a:1}));
CUT.isFalse("isEmptyObject(); 3 false number", CEL.isEmptyObject(98));
CUT.isFalse("isEmptyObject(); 4 false null", CEL.isEmptyObject(null));
CUT.isFalse("isEmptyObject(); 5 false undefined", CEL.isEmptyObject(undefined));


/* isFunction(); */
CUT.isTrue("isFunction(); true 1", CEL.isFunction(CEL.noop));
CUT.isTrue("isFunction(); true 2", CEL.isFunction(new Function()));
CUT.isFalse("isFunction(); false", CEL.isFunction(CEL.qs("p")));


/* isCallable(); */
CUT.isTrue("isCallable(); true 1", CEL.isCallable(CEL.noop));
CUT.isTrue("isCallable(); true 2", CEL.isCallable(new Function()));
CUT.isFalse("isCallable(); false", CEL.isCallable(CEL.qs("p")));


/* isEmptyArray(); */
CUT.isTrue("isEmptyArray(); true", CEL.isEmptyArray([]));
CUT.isFalse("isEmptyArray(); false 1", CEL.isEmptyArray([1,2,3]));
CUT.isFalse("isEmptyArray(); false 2", CEL.isEmptyArray(CEL.qs("p")));


/* isArraylike(); */
CUT.isTrue("isArraylike(); true 1 array", CEL.isArraylike([]));
CUT.isTrue("isArraylike(); true 2 querySelectorAll",
  CEL.isArraylike(document.querySelectorAll("p"))
);
CUT.isTrue("isArraylike(); true 3 arraylike object",
  CEL.isArraylike({0:4,1:5,length:2})
);
CUT.isTrue("isArraylike(); true 4 string", CEL.isArraylike("Pillangó"));
CUT.isTrue("isArraylike(); true 5 empty string", CEL.isArraylike(""));
CUT.isFalse("isArraylike(); false 1 element", CEL.isArraylike(CEL.qs("p")));
CUT.isFalse("isArraylike(); false 2 number", CEL.isArraylike(42));
CUT.isFalse("isArraylike(); false 3 null", CEL.isArraylike(null));
CUT.isFalse("isArraylike(); false 4 object", CEL.isArraylike({0:4,1:5}));


/* isNull(); */
CUT.isTrue("isNull(); true", CEL.isNull(null));
CUT.isFalse("isNull(); false", CEL.isNull(document.querySelectorAll("p")));


/* isUndefined(); */
CUT.isTrue("isUndefined(); true", CEL.isUndefined(undefined));
CUT.isFalse("isUndefined(); false",
  CEL.isUndefined(document.querySelectorAll("p"))
);


/* isNullOrUndefined(); */
CUT.isTrue("isNullOrUndefined(); true 1", CEL.isNullOrUndefined(undefined));
CUT.isTrue("isNullOrUndefined(); true 2", CEL.isNullOrUndefined(null));
CUT.isFalse("isNullOrUndefined(); false",
  CEL.isNullOrUndefined(document.querySelectorAll("p"))
);


/* isNil(); */
CUT.isTrue("isNil(); true 1", CEL.isNil(undefined));
CUT.isTrue("isNil(); true 2", CEL.isNil(null));
CUT.isTrue("isNil(); true 3", CEL.isNil(+"asd"));
CUT.isFalse("isNil(); false", CEL.isNil(document.querySelectorAll("p")));


/* isPrimitive(); */
CUT.isTrue("isPrimitive(); true 1", CEL.isPrimitive(98));
CUT.isTrue("isPrimitive(); true 2", CEL.isPrimitive("str"));
CUT.isFalse("isPrimitive(); false 1",
  CEL.isPrimitive(document.querySelectorAll("p"))
);
CUT.isFalse("isPrimitive(); false 2", CEL.isPrimitive(CEL.noop));


/* isDate(); */
CUT.isTrue("isDate(); true", CEL.isDate(new Date()));
CUT.isFalse("isDate(); false", CEL.isDate({}));


/* isRegexp(); */
CUT.isTrue("isRegexp(); true", CEL.isRegexp(/^\[object (.+)\]$/g));
CUT.isFalse("isRegexp(); false", CEL.isRegexp("string"));


/* isElement(); */
CUT.isTrue("isElement(); true 1", CEL.isElement(document.body));
CUT.isTrue("isElement(); true 2", CEL.isElement(CEL.qs("div")));
CUT.isFalse("isElement(); false 1",
  CEL.isElement(document.createTextNode("sample text"))
);
CUT.isFalse("isElement(); false 2 ",
  CEL.isElement(document.createComment("sample comment"))
);
CUT.isFalse("isElement(); false 3 ", CEL.isElement([]));


/* isNumeric(); begin */
CUT.isTrue("isNumeric(); true",
  CEL.isNumeric(-42)
    && CEL.isNumeric(-1.42)
    && CEL.isNumeric(-0.42)
    && CEL.isNumeric(0)
    && CEL.isNumeric(0.42)
    && CEL.isNumeric(.42)
    && CEL.isNumeric(1.42)
    && CEL.isNumeric(42)
    && CEL.isNumeric(8e5)
    && CEL.isNumeric(-8e5)
    && CEL.isNumeric(0x89f)
    && CEL.isNumeric(-0x89f)
    && CEL.isNumeric("-42")
    && CEL.isNumeric("-1.42")
    && CEL.isNumeric("-0.42")
    && CEL.isNumeric("0")
    && CEL.isNumeric("0.42")
    && CEL.isNumeric(".42")
    && CEL.isNumeric("1.42")
    && CEL.isNumeric("42")
    && CEL.isNumeric("8e5")
    && CEL.isNumeric("-8e5")
    && CEL.isNumeric("0x89f")
);
CUT.isFalse("isNumeric(); false",
  CEL.isNumeric(null)
    || CEL.isNumeric(undefined)
    || CEL.isNumeric(NaN)
    || CEL.isNumeric("NaN")
    || CEL.isNumeric("1,42")
    || CEL.isNumeric("#foo")
    || CEL.isNumeric("1.2.3")
    || CEL.isNumeric("")
    || CEL.isNumeric("bar")
    || CEL.isNumeric(" ")
    || CEL.isNumeric("\r\n")
    || CEL.isNumeric("true")
    || CEL.isNumeric("false")
    || CEL.isNumeric("1<10")
    || CEL.isNumeric([])
    || CEL.isNumeric({})
    || CEL.isNumeric("-0x89f")
);
/* isNumeric(); end */


/* isArrayBuffer(); */
CUT.isTrue("isArrayBuffer(); true", CEL.isArrayBuffer(new ArrayBuffer(8)));
CUT.isFalse("isArrayBuffer(); false 1", CEL.isArrayBuffer([4,5,6]));
CUT.isFalse("isArrayBuffer(); false 2", CEL.isArrayBuffer(new Int8Array(5)));


/* isTypedArray(); begin */
CUT.isTrue("isTypedArray(); - true 1 - Int8Array",
  CEL.isTypedArray(new Int8Array(5))
);
CUT.isTrue("isTypedArray(); - true 2 - Uint8Array",
  CEL.isTypedArray(new Uint8Array(5))
);
CUT.isTrue("isTypedArray(); - true 3 - Int16Array",
  CEL.isTypedArray(new Int16Array(5))
);
CUT.isTrue("isTypedArray(); - true 4 - Uint16Array",
  CEL.isTypedArray(new Uint16Array(5))
);
CUT.isTrue("isTypedArray(); - true 5 - Int32Array",
  CEL.isTypedArray(new Int32Array(5))
);
CUT.isTrue("isTypedArray(); - true 6 - Uint32Array",
  CEL.isTypedArray(new Uint32Array(5))
);
CUT.isTrue("isTypedArray(); - true 7 - Float32Array",
  CEL.isTypedArray(new Float32Array(5))
);
CUT.isTrue("isTypedArray(); - true 8 - Float64Array",
  CEL.isTypedArray(new Float64Array(5))
);
CUT.isTrue("isTypedArray(); - true 9 - Uint8ClampedArray",
  CEL.isTypedArray(new Uint8ClampedArray(5)));
if (!!window.BigInt64Array) {
  CUT.isTrue("isTypedArray(); - true 10 - BigInt64Array",
  CEL.isTypedArray(new BigInt64Array(5)));
}
if (window.BigUint64Array) {
  CUT.isTrue("isTypedArray(); - true 11 - BigUint64Array",
    CEL.isTypedArray(new BigUint64Array(5))
  );
}
CUT.isFalse("isTypedArray - false 1 - Array", CEL.isTypedArray([4, 5, 6]));
CUT.isFalse("isTypedArray - false 2 - ArrayBuffer",
  CEL.isTypedArray(new ArrayBuffer(8))
);
/* isTypedArray(); end */


/* isPromise(); */
CUT.isTrue("isPromise(); - true ", CEL.isPromise(CEL.delay(1000)));
CUT.isFalse("isPromise(); - false ", CEL.isPromise({}));


/* isSymbol(); */
CUT.isTrue("isSymbol(); true", CEL.isSymbol(Symbol("str")));
CUT.isFalse("isSymbol(); false", CEL.isSymbol(function () {}));


/* isMap(); */
CUT.isTrue("isMap(); true", CEL.isMap(new Map()));
CUT.isFalse("isMap(); false", CEL.isMap(function () {}));


/* isSet(); */
CUT.isTrue("isSet(); true", CEL.isSet(new Set()));
CUT.isFalse("isSet(); false", CEL.isSet(function () {}));


/* isWeakMap(); */
CUT.isTrue("isWeakMap(); true", CEL.isWeakMap(new WeakMap()));
CUT.isFalse("isWeakMap(); false", CEL.isWeakMap(function () {}));


/* isWeakSet(); */
CUT.isTrue("isWeakSet(); true", CEL.isWeakSet(new WeakSet()));
CUT.isFalse("isWeakSet(); false", CEL.isWeakSet(function () {}));


/* isIterator(); */
CUT.isTrue("isIterator(); true - Array values();",
  CEL.isIterator([4, 5, 6].values())
);
CUT.isTrue("isIterator(); true - Set values();",
  CEL.isIterator(new Set([4, 5, 7]).values())
);
CUT.isTrue("isIterator(); true - Map values();",
  CEL.isIterator(new Map([[4, 5], [5, 6]]).values())
);
CUT.isTrue("isIterator(); true - Nodelist values();",
  CEL.isIterator(document.querySelectorAll("h3").values())
);
CUT.isFalse("isIterator(); false - Array", CEL.isIterator([4, 5, 7]));


/* isIterable(); */
CUT.isTrue("isIterable();",
      CEL.isIterable([])
  &&  CEL.isIterable("")
  &&  CEL.isIterable(new Map([[1, 2], [3, 4]]))
  &&  CEL.isIterable(new Set([1,2]))
  && !CEL.isIterable(42)
  && !CEL.isIterable(3.14)
  && !CEL.isIterable({a:1,b:2})
  && !CEL.isIterable(true)
  && !CEL.isIterable(false)
);


/* isBigInt(); */
if (!!window.BigInt) {
  CUT.isTrue("isBigInt(); true", CEL.isBigInt(9007199254740991n + 5n));
  CUT.isFalse("isBigInt(); false 1", CEL.isBigInt(9007199254740990));
  CUT.isFalse("isBigInt(); false 2", CEL.isBigInt(3.14));
  CUT.isFalse("isBigInt(); false 3", CEL.isBigInt("Arthur Dent"));
}


/** isSame<type>(); functions **/
CUT.addElement("hr");
CUT.addElement("h3", "isSame<type>(); functions");


/* isSameArray(); */
CUT.isTrue("isSameArray(); step 1", CEL.isSameArray([], []));
CUT.isTrue("isSameArray(); step 2", CEL.isSameArray([5, 4, 5], [5, 4, 5]));
CUT.isFalse("isSameArray(); step 3", CEL.isSameArray([5, 4, 5], [4, 5, 6]));
CUT.isFalse("isSameArray(); step 4", CEL.isSameArray([5, 4, 6], [4, 5, 5]));
CUT.isFalse("isSameArray(); step 5", CEL.isSameArray([5, 4, 5], [4, 4, 5]));
CUT.isFalse("isSameArray(); step 6", CEL.isSameArray([5, 5], [5, 5, 4]));
CUT.isFalse("isSameArray(); step 7", CEL.isSameArray([5, 5, 4], [5, 5]));
CUT.isFalse("isSameArray(); step 8", CEL.isSameArray([5 ,5],
  new Map([[5, 5], [5, 5]]))
);
CUT.isFalse("isSameArray(); step 9", CEL.isSameArray([5, 5], new Set([5, 5])));
CUT.isFalse("isSameArray(); step 10", CEL.isSameArray([], {}));
CUT.isFalse("isSameArray(); step 11", CEL.isSameArray({}, {}));
CUT.isFalse("isSameArray(); step 12", CEL.isSameArray("4", "4"));
CUT.isFalse("isSameArray(); step 13", CEL.isSameArray(4, 4));
CUT.isFalse("isSameArray(); step 14", CEL.isSameArray(4, 5));


/* isSameObject(); */
CUT.isTrue("isSameObject(); true 1",
  CEL.isSameObject({"p1": 4, "p2": 5, "p3": 6}, {"p1": 4, "p2": 5, "p3": 6})
);
CUT.isTrue("isSameObject(); true 2 empty", CEL.isSameObject({}, {}));
CUT.isFalse("isSameObject(); false 1",
  CEL.isSameObject({"p1": 4, "p2": 5, "p3": 6}, {"p1": 4, "p2": 5, "p3": 7})
);
CUT.isFalse("isSameObject(); false 2",
  CEL.isSameObject({"p1": 4, "p2": 5, "p3": 6}, {"p1":4, "p2":5,"p3":6, "p4":7})
);
CUT.isFalse("isSameObject(); false 3",
  CEL.isSameObject([4,5], {"0": 4, "1": 5, "length": 2})
);


/* isSameSet(); */
CUT.isTrue("isSameSet(); true",
  CEL.isSameSet(new Set([4, 6, 8, 2]), new Set([2, 4, 6, 8, 4]))
);
CUT.isFalse("isSameSet(); false 1",
  CEL.isSameSet(new Set([4, 6, 8, 2]), new Set([2, 4, 6, 9]))
);
CUT.isFalse("isSameSet(); false 2",
  CEL.isSameSet(new Set([4, 6, 8, 2]), new Set([2, 4, 6, 8, 9]))
);
CUT.isFalse("isSameSet(); false 3",
  CEL.isSameSet(new Set([4, 6, 8, 2]), [4,6,8,2])
);


/* isSameMap(); */
CUT.isTrue("isSameMap(); true", CEL.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [true, 42]])
));
CUT.isFalse("isSameMap(); false 1", CEL.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [false, 42]])
));
CUT.isFalse("isSameMap(); false 2", CEL.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [false, 42], [true, 42]])
));
CUT.isFalse("isSameMap(); false 3", CEL.isSameMap(
  new Map([["str", 1], [17, "x"], [true,42]]), [["str",1], [17,"x"], [true,42]])
);


/* isSameIterator(); */
CUT.isTrue("isSameIterator(); true",
  CEL.isSameIterator([4, 8, 6, 2], [4, 8, 6, 2])
);
CUT.isFalse("isSameIterator(); false 1",
  CEL.isSameIterator([4, 8, 6, 2, 1], [4, 8, 6, 2, 5])
);
CUT.isFalse("isSameIterator(); false 2",
  CEL.isSameIterator(new Set([4, 6, 8, 2, 6, 4]), [4, 8, 6, 2, 5])
);


/** Abstract API **/
CUT.addElement("hr");
CUT.addElement("h3", "Abstract API");


/* deletePropertyOrThrow(); */
token1 = {"a": 1, "b": 2};
try { CEL.deletePropertyOrThrow(token1, "b"); } catch (e) { console.log(e); }
CUT.isEqual("deletePropertyOrThrow();", "{\"a\":1}", JSON.stringify(token1));


/* isSameType(); */
CUT.isTrue("isSameType();",
      CEL.isSameType(undefined, undefined)
  &&  CEL.isSameType(null, null)
  &&  CEL.isSameType(true, false)
  &&  CEL.isSameType(1n, 2n)
  &&  CEL.isSameType(Symbol(1), Symbol(2))
  &&  CEL.isSameType("Arthur", "Dent")
  &&  CEL.isSameType({"a": 1}, {"b": 2})
  &&  CEL.isSameType(function x(){}, function y(){})
  && !CEL.isSameType(null, undefined)
  && !CEL.isSameType(null, 0)
  && !CEL.isSameType(42, "42")
);


/* isLessThan (); */
CUT.isTrue("isLessThan();",
      CEL.isLessThan(1, 2)
  &&  CEL.isLessThan(1, 2, true)
  &&  CEL.isLessThan(2, 1, false)
  && !CEL.isLessThan(1, 2, false)
  && !CEL.isLessThan(2, 1)
  && !CEL.isLessThan(2, 1, true)
);


/* requireObjectCoercible(); */
token1 = function(){};
CUT.isTrue("requireObjectCoercible(); 1 boolan",
  CEL.requireObjectCoercible(true)
);
CUT.isEqual("requireObjectCoercible(); 2 number", 42,
  CEL.requireObjectCoercible(42)
);
CUT.isEqual("requireObjectCoercible(); 3 string", "Arthur Dent",
  CEL.requireObjectCoercible("Arthur Dent")
);
CUT.isEqual("requireObjectCoercible(); 4 symbol", "Symbol(42)",
  CEL.requireObjectCoercible(Symbol(42)).toString()
);
CUT.isEqual("requireObjectCoercible(); 5 object", "{\"a\":1}",
  JSON.stringify(CEL.requireObjectCoercible({"a":1}))
);
CUT.isEqual("requireObjectCoercible(); 6 function", token1,
  CEL.requireObjectCoercible(token1)
);
try { CEL.requireObjectCoercible(null) } catch (e) {
  CUT.isTrue("requireObjectCoercible(); 7 null -> error", true);
}
try { CEL.requireObjectCoercible(undefined) } catch (e) {
  CUT.isTrue("requireObjectCoercible(); 8 undefined -> error", true);
}


/* getIn(); */
/* getInV(); */
/* setIn(); */
/* hasIn(); */
token1 = {};
CUT.isTrue("getIn(); + getInV(); + setIn(); + hasIn();",
  !CEL.hasIn(token1, "pr1")
    && CEL.getIn(token1, "pr1") === undefined
    && CEL.getInV(token1, "pr1") === undefined
    && CEL.setIn(token1, "pr1", 42) === true
    && CEL.hasIn(token1, "pr1")
    && CEL.getIn(token1, "pr1") === 42
    && CEL.getInV(token1, "pr1") === 42
);


/* isPropertyKey(); */
CUT.isTrue("isPropertyKey();",
  CEL.isPropertyKey("")
    && CEL.isPropertyKey(Symbol(42))
    && !CEL.isPropertyKey(42)
);


/* toPropertyKey(); */
CUT.isTrue("toPropertyKey();",
  typeof CEL.toPropertyKey("") === "string"
    && typeof CEL.toPropertyKey(Symbol("42")) === "symbol"
    && typeof CEL.toPropertyKey(42) === "string"
);


/* toObject(); */
CUT.isTrue("toObject();", typeof CEL.toObject("str") === "object");


/* isSameValue(); */
token1 = { "a": 1 };
CUT.isEqual("isSameValue();", "1101110100011111110",
  CUT.concat(
    +CEL.isSameValue(25, 25),
    +CEL.isSameValue("foo", "foo"),
    +CEL.isSameValue("foo", "bar"),
    +CEL.isSameValue(null, null),
    +CEL.isSameValue(undefined, undefined),
    +CEL.isSameValue(window, window),
    +CEL.isSameValue([], []),
    +CEL.isSameValue(token1, token1),
    +CEL.isSameValue(token1, {"a": 1}),
    +CEL.isSameValue(0, -0),
    +CEL.isSameValue(+0, -0),
    +CEL.isSameValue(-0,-0),
    (!!window.BigInt ? +CEL.isSameValue(BigInt(0), BigInt(-0)) : 1),
    +CEL.isSameValue(NaN, 0/0),
    +CEL.isSameValue(NaN, Number.NaN),
    +CEL.isSameValue(+Infinity, Infinity),
    +CEL.isSameValue(Infinity, Infinity),
    +CEL.isSameValue(-Infinity, -Infinity),
    +CEL.isSameValue(+Infinity, -Infinity)
  )
);


/* toPrimitiveValue(); */
CUT.isTrue("toPrimitiveValue();",
  typeof CEL.toPrimitiveValue(null) === "object"
    && typeof CEL.toPrimitiveValue(undefined) === "undefined"
    && typeof CEL.toPrimitiveValue(true) === "boolean"
    && typeof CEL.toPrimitiveValue(42n) === "bigint"
    && typeof CEL.toPrimitiveValue(Object(42n)) === "bigint"
    && typeof CEL.toPrimitiveValue(42) === "number"
    && typeof CEL.toPrimitiveValue("lorem ipsum") === "string"
    && typeof CEL.toPrimitiveValue(Symbol(42)) === "symbol"
    && typeof CEL.toPrimitiveValue(new Boolean(true)) === "boolean"
    && typeof CEL.toPrimitiveValue(new Number(42)) === "number"
    && typeof CEL.toPrimitiveValue(new String("lorem ipsum")) === "string"
    && typeof CEL.toPrimitiveValue({"a":1}) === "object"
    && Array.isArray(CEL.toPrimitiveValue([]))
    && CEL.toPrimitiveValue(new Map()) instanceof Map
    && CEL.toPrimitiveValue(new Set()) instanceof Set
);


/* toPrimitive(); */
CUT.isTrue("toPrimitive();",
  CEL.toPrimitive(new Object(100)) === 100
    && CEL.toPrimitive(new Object(100)) + "" === "100"
    && CEL.toPrimitive({"a":1, toString: ()=>42}, "number") === 42
    && CEL.toPrimitive([1,2]) === "1,2"
    && CEL.toPrimitive(()=>56) === "()=>56"
);


/* isSameValueZero(); */
token1 = {"a": 1};
CUT.isEqual("isSameValueZero();", "1101110101111111110",
  CUT.concat(
    +CEL.isSameValueZero(25, 25),
    +CEL.isSameValueZero("foo", "foo"),
    +CEL.isSameValueZero("foo", "bar"),
    +CEL.isSameValueZero(null, null),
    +CEL.isSameValueZero(undefined, undefined),
    +CEL.isSameValueZero(window, window),
    +CEL.isSameValueZero([], []),
    +CEL.isSameValueZero(token1, token1),
    +CEL.isSameValueZero(token1, {"a": 1}),
    +CEL.isSameValueZero(0, -0),
    +CEL.isSameValueZero(+0, -0),
    +CEL.isSameValueZero(-0, -0),
    (!!window.BigInt ? +CEL.isSameValueZero(BigInt(0), BigInt(-0)) : 1),
    +CEL.isSameValueZero(NaN, 0/0),
    +CEL.isSameValueZero(NaN, Number.NaN),
    +CEL.isSameValueZero(+Infinity, Infinity),
    +CEL.isSameValueZero(Infinity, Infinity),
    +CEL.isSameValueZero(-Infinity, -Infinity),
    +CEL.isSameValueZero(+Infinity, -Infinity)
  )
);


/* isSameValueNonNumber(); */
token1 = {"a": 1};
CUT.isEqual("isSameValueNonNumber();", "1101110101111001110",
  CUT.concat(
    +CEL.isSameValueNonNumber(25, 25),
    +CEL.isSameValueNonNumber("foo", "foo"),
    +CEL.isSameValueNonNumber("foo", "bar"),
    +CEL.isSameValueNonNumber(null, null),
    +CEL.isSameValueNonNumber(undefined, undefined),
    +CEL.isSameValueNonNumber(window, window),
    +CEL.isSameValueNonNumber([], []),
    +CEL.isSameValueNonNumber(token1, token1),
    +CEL.isSameValueNonNumber(token1, {"a": 1}),
    +CEL.isSameValueNonNumber(0, -0),
    +CEL.isSameValueNonNumber(+0, -0),
    +CEL.isSameValueNonNumber(-0, -0),
    (!!window.BigInt ? +CEL.isSameValueNonNumber(BigInt(0), BigInt(-0)) : 1),
    +CEL.isSameValueNonNumber(NaN, 0/0),
    +CEL.isSameValueNonNumber(NaN, Number.NaN),
    +CEL.isSameValueNonNumber(+Infinity, Infinity),
    +CEL.isSameValueNonNumber(Infinity, Infinity),
    +CEL.isSameValueNonNumber(-Infinity, -Infinity),
    +CEL.isSameValueNonNumber(+Infinity, -Infinity)
  )
);


/* createMethodProperty(); */
token1 = function () {};
token2 = String("getX" in token1.prototype);
token2 += CEL.createMethodProperty(
  token1.prototype, "getX", function () { return this.x; }
);
token2 += ("getX" in token1.prototype);
CUT.isEqual("createMethodProperty();", "false[object Object]true", token2);


/* createMethodPropertyOrThrow(); */
token1 = function () {};
token2 = String("getX" in token1.prototype);
token2 += CEL.createMethodPropertyOrThrow(
  token1.prototype, "getX", function () { return this.x; }
);
token2 += ("getX" in token1.prototype);
CUT.isEqual("createMethodPropertyOrThrow();",token2,"false[object Object]true");


/* createPolyfillMethod(); */
token1 = {"a": 1, "b": 2};
CUT.isTrue("createPolyfillMethod();",
  CEL.createPolyfillMethod(token1, "c", 3) &&
  !(Object.keys(token1).includes("c")) && ("c" in token1)
);
CUT.logCode(JSON.stringify(token1));


/* createPolyfillProperty(); */
token1 = {"a": 1, "b": 2};
CUT.isTrue("createPolyfillProperty();",
  CEL.createPolyfillProperty(token1, "c", 3) &&
  Object.keys(token1).includes("c") && ("c" in token1)
);
CUT.logCode(JSON.stringify(token1));


/* deleteOwnProperty(); */
token1 = {"a": 1, "b": 2};
token2 = "";
token2 += CEL.deleteOwnProperty(token1, "a");
token2 += CEL.deleteOwnProperty(token1, "a");
token2 += CEL.deleteOwnProperty(token1, "a");
token1 = {"a": 1, "b": 2};
try {
  token2 += CEL.deleteOwnProperty(token1, "a", true);
} catch (e) { console.log(e); }
try {
  token2 += CEL.deleteOwnProperty(token1, "a", true);
} catch (e) { console.log(e); }
CUT.isEqual("deleteOwnProperty();", token2, "1-1-11-1");
CUT.logCode(token2);


/* type(); */
CUT.isTrue("type();",
  CEL.type(null) === "null"
    && CEL.type(undefined) === "undefined"
    && CEL.type([]) === "object"
    && CEL.type(function () {}) === "function"
    && CEL.type(42) === "number"
    && CEL.type("42") === "string"
);


/* isIndex(); */
CUT.isTrue("isIndex();",
      CEL.isIndex(3)
  &&  CEL.isIndex(0)
  && !CEL.isIndex("3")
  && !CEL.isIndex(true)
  && !CEL.isIndex(-0)
  && !CEL.isIndex(Infinity)
  && !CEL.isIndex(-Infinity)
  && !CEL.isIndex("Infinity")
  && !CEL.isIndex("-Infinity")
  && !CEL.isIndex(-3)
  && !CEL.isIndex(3.14)
  && !CEL.isIndex(-3.14)
  && !CEL.isIndex("fasdas")
  && !CEL.isIndex(false)
  && !CEL.isIndex("-3")
  && !CEL.isIndex("3.14")
  && !CEL.isIndex("-3.14")
  && !CEL.isIndex("adsasd")
  && !CEL.isIndex({})
  && !CEL.isIndex([])
  && !CEL.isIndex(undefined)
  && !CEL.isIndex(null)
);


/* isLength(); */
CUT.isTrue("isLength();",
      CEL.isLength(3)
  &&  CEL.isLength(0)
  && !CEL.isLength("3")
  && !CEL.isLength(true)
  && !CEL.isLength(-0)
  && !CEL.isLength(Infinity)
  && !CEL.isLength(-Infinity)
  && !CEL.isLength("Infinity")
  && !CEL.isLength("-Infinity")
  && !CEL.isLength(-3)
  && !CEL.isLength(3.14)
  && !CEL.isLength(-3.14)
  && !CEL.isLength("fasdas")
  && !CEL.isLength(false)
  && !CEL.isLength("-3")
  && !CEL.isLength("3.14")
  && !CEL.isLength("-3.14")
  && !CEL.isLength("adsasd")
  && !CEL.isLength({})
  && !CEL.isLength([])
  && !CEL.isLength(undefined)
  && !CEL.isLength(null)
);


/* toIndex(); */
CUT.isEqual("toIndex();", "3031021474836470214748364700300003000000",
  CUT.concat(
    CEL.toIndex(3),
    CEL.toIndex(0),
    CEL.toIndex("3"),
    CEL.toIndex(true),
    CEL.toIndex(-0),
    CEL.toIndex(Infinity),
    CEL.toIndex(-Infinity),
    CEL.toIndex("Infinity"),
    CEL.toIndex("-Infinity"),
    CEL.toIndex(-3),
    CEL.toIndex(3.14),
    CEL.toIndex(-3.14),
    CEL.toIndex("lorem"),
    CEL.toIndex(false),
    CEL.toIndex("-3"),
    CEL.toIndex("3.14"),
    CEL.toIndex("-3.14"),
    CEL.toIndex("adsasd"),
    CEL.toIndex({}),
    CEL.toIndex([]),
    CEL.toIndex(undefined),
    CEL.toIndex(null)
  )
);


/* toLength(); */
CUT.isEqual("toLength();", "3031021474836470214748364700300003000000",
  CUT.concat(
    CEL.toLength(3),
    CEL.toLength(0),
    CEL.toLength("3"),
    CEL.toLength(true),
    CEL.toLength(-0),
    CEL.toLength(Infinity),
    CEL.toLength(-Infinity),
    CEL.toLength("Infinity"),
    CEL.toLength("-Infinity"),
    CEL.toLength(-3),
    CEL.toLength(3.14),
    CEL.toLength(-3.14),
    CEL.toLength("fasdas"),
    CEL.toLength(false),
    CEL.toLength("-3"),
    CEL.toLength("3.14"),
    CEL.toLength("-3.14"),
    CEL.toLength("adsasd"),
    CEL.toLength({}),
    CEL.toLength([]),
    CEL.toLength(undefined),
    CEL.toLength(null)
  )
);


/* toInteger(); */
CUT.isEqual("toInteger();",
  "3333-3-3-3-31002147483647-21474836482147483647-21474836480000000",
  CUT.concat(
    CEL.toInteger(3),
    CEL.toInteger("3"),
    CEL.toInteger(3.14),
    CEL.toInteger("3.14"),
    CEL.toInteger(-3),
    CEL.toInteger(-3.14),
    CEL.toInteger("-3"),
    CEL.toInteger("-3.14"),
    CEL.toInteger(true),
    CEL.toInteger(0),
    CEL.toInteger(-0),
    CEL.toInteger(Infinity),
    CEL.toInteger(-Infinity),
    CEL.toInteger("Infinity"),
    CEL.toInteger("-Infinity"),
    CEL.toInteger("fasdas"),
    CEL.toInteger(false),
    CEL.toInteger("adsasd"),
    CEL.toInteger({}),
    CEL.toInteger([]),
    CEL.toIndex(undefined),
    CEL.toIndex(null)
  )
);


/* toIntegerOrInfinity(); */
CUT.isEqual("toIntegerOrInfinity();",
  "3333-3-3-3-3100Infinity-InfinityInfinity-Infinity0000000",
  CUT.concat(
    CEL.toIntegerOrInfinity(3),
    CEL.toIntegerOrInfinity("3"),
    CEL.toIntegerOrInfinity(3.14),
    CEL.toIntegerOrInfinity("3.14" ),
    CEL.toIntegerOrInfinity(-3 ),
    CEL.toIntegerOrInfinity(-3.14 ),
    CEL.toIntegerOrInfinity("-3" ),
    CEL.toIntegerOrInfinity("-3.14" ),
    CEL.toIntegerOrInfinity(true ),
    CEL.toIntegerOrInfinity(0 ),
    CEL.toIntegerOrInfinity(-0 ),
    CEL.toIntegerOrInfinity(Infinity ),
    CEL.toIntegerOrInfinity(-Infinity ),
    CEL.toIntegerOrInfinity("Infinity" ),
    CEL.toIntegerOrInfinity("-Infinity" ),
    CEL.toIntegerOrInfinity("fasdas" ),
    CEL.toIntegerOrInfinity(false ),
    CEL.toIntegerOrInfinity("adsasd" ),
    CEL.toIntegerOrInfinity({} ),
    CEL.toIntegerOrInfinity([] ),
    CEL.toIntegerOrInfinity(undefined ),
    CEL.toIntegerOrInfinity(null)
  )
);


/* createDataPropertyOrThrow(); */
function createDataPropertyFN () {};
token1 = CUT.concat(
  Object.hasOwn(createDataPropertyFN.prototype,"x"),
  CEL.createDataPropertyOrThrow(createDataPropertyFN.prototype, "x", 42)
);
token2 = new createDataPropertyFN();
token1 += (token2.x === 42);
CUT.isEqual("createDataPropertyOrThrow();", token1, "false[object Object]true");


/* createDataProperty(); */
function createDataPropertyOrThrowFN () {};
token1 = CUT.concat(
  Object.hasOwn(createDataPropertyOrThrowFN.prototype,"x"),
  CEL.createDataPropertyOrThrow(createDataPropertyOrThrowFN.prototype, "x", 42)
);
token2 = new createDataPropertyOrThrowFN();
token1 += (token2.x === 42);
CUT.isEqual("createDataProperty();", token1, "false[object Object]true");


/* toArray(); */
token1 = [4, 5, 6];
CUT.isTrue("toArray();", token1 === CEL.toArray(token1)
  && JSON.stringify(CEL.toArray({"length":3, 0 :7, 1: 8, 2: 9}))  === "[7,8,9]"
);


/** Math API **/
CUT.addElement("hr");
CUT.addElement("h3", "Math API");


/* inRange(); */
CUT.isTrue("inRange();",
  CEL.inRange(4, 3, 6)
    && CEL.inRange(-3.14, -4.5, 9.21)
    && !CEL.inRange(2, 3, 6)
    && !CEL.inRange(7, 3, 6)
    && !CEL.inRange(-5.14, -4.5, 9.21)
    && !CEL.inRange(-9.24, -4.5, 9.21)
);


/* randomInt(); */
CUT.isTrue("randomInt();", CEL.randomInt() <= 101);
CUT.isTrue("randomInt(max);", CEL.randomInt(30) <= 30);
token1 = CEL.randomInt(51, 55);
CUT.isTrue("randomInt(min,max);", token1 >= 51 && token1 <= 55);


/* randomFloat(); */
CUT.isTrue("randomFloat();", CEL.randomFloat() <= 101);
CUT.isTrue("randomFloat(max);", CEL.randomFloat(30) <= 30);
token1 = CEL.randomFloat(51, 55);
CUT.isTrue("randomFloat(min,max);", token1 >= 51 && token1 <= 55);


/* toFloat16(); */
CUT.isEqual("toFloat16();",
  "0 0 0 65504 -65504 3.14 -3.14 65504 -65504 65504 -65504 65504 -65504 65504 -65504 0",
  CUT.join([
    CEL.toFloat16(0),
    CEL.toFloat16(+0),
    CEL.toFloat16(-0),
    CEL.toFloat16(Number.POSITIVE_INFINITY),
    CEL.toFloat16(Number.NEGATIVE_INFINITY),
    CEL.toFloat16(3.14),
    CEL.toFloat16(-3.14),
    CEL.toFloat16(65504),
    CEL.toFloat16(-65504),
    CEL.toFloat16(65504.0),
    CEL.toFloat16(-65504.0),
    CEL.toFloat16(65504.1),
    CEL.toFloat16(-65504.1),
    CEL.toFloat16(65505),
    CEL.toFloat16(-65505),
    CEL.toFloat16("lorem")
  ])
);


/* isFloat16(); */
CUT.isTrue("isFloat16();",
      CEL.isFloat16(0)
  &&  CEL.isFloat16(+0)
  &&  CEL.isFloat16(-0)
  &&  CEL.isFloat16(65504)
  &&  CEL.isFloat16(-65504)
  &&  CEL.isFloat16(3.14)
  &&  CEL.isFloat16(-3.14)
  && !CEL.isFloat16(65504.1)
  && !CEL.isFloat16(-65504.1)
  && !CEL.isFloat16(65505)
  && !CEL.isFloat16(-65505)
  && !CEL.isFloat16("lorem")
  && !CEL.isFloat16(true)
  && !CEL.isFloat16([])
);


/* signbit(); */
CUT.isTrue("signbit();",
     !CEL.signbit("str")
  && !CEL.signbit("5")
  &&  CEL.signbit("-5")
  && !CEL.signbit("4.2")
  &&  CEL.signbit("-4.2")
  &&  CEL.signbit(-3.14)
  && !CEL.signbit(3.14)
  &&  CEL.signbit(-1)
  && !CEL.signbit(1)
  && !CEL.signbit(0)
  &&  CEL.signbit(-0)
  && !CEL.signbit(+0)
  && !CEL.signbit(Infinity)
  &&  CEL.signbit(-Infinity)
  && !CEL.signbit(+Infinity)
);


/* clamp(); */
try { CEL.clamp(15, 10, NaN); } catch (e) { CUT.isTrue("clamp(); 01", true); }
try { CEL.clamp(15, Infinity, -Infinity) } catch (e) {
  CUT.isTrue("clamp(); 02", true);
}
try { CEL.clamp(15, 10, 5); } catch (e) { CUT.isTrue("clamp(); 03", true); }
CUT.isNotEqual("clamp(); 04", NaN, CEL.clamp(NaN, 10,   15));
CUT.isEqual("clamp(); 05",    0,   CEL.clamp(15,  -0,   0));
CUT.isEqual("clamp(); 06",    -0,  CEL.clamp(0,   -0,   15));
CUT.isEqual("clamp(); 07",    15,  CEL.clamp(10,  15,   20));
CUT.isEqual("clamp(); 07",    -0,  CEL.clamp(-0,  -10,  0));
CUT.isEqual("clamp(); 09",    -0,  CEL.clamp(0,   -10,  -0));
CUT.isEqual("clamp(); 10",    20,  CEL.clamp(25,   10,  20));
CUT.isEqual("clamp(); 11",    15,  CEL.clamp(15,   10,  20));
CUT.isEqual("clamp(); 12",    +0,  CEL.clamp(15,   -0n, 0));
CUT.isEqual("clamp(); 13",    -0,  CEL.clamp(0n,   -0,  15));
CUT.isEqual("clamp(); 14",    15,  CEL.clamp(10,   15,  20n));
CUT.isEqual("clamp(); 15",    0n,  CEL.clamp(-0n,  -10, 0));
CUT.isEqual("clamp(); 16",    0,   CEL.clamp(0,    -10, -0n));
CUT.isEqual("clamp(); 17",    20,  CEL.clamp(25,   10n, 20));
CUT.isEqual("clamp(); 17",    15n, CEL.clamp(15n,  10n, 20n));


/* minmax(); */
try { CEL.minmax(15, 10, NaN); } catch (e) { CUT.isTrue("minmax(); 01", true); }
try { CEL.minmax(15, Infinity, -Infinity) } catch (e) {
  CUT.isTrue("minmax(); 02", true);
}
try { CEL.minmax(15, 10, 5); } catch (e) { CUT.isTrue("minmax(); 03", true); }
CUT.isNotEqual("minmax(); 04", NaN, CEL.minmax(NaN, 10,  15));
CUT.isEqual("minmax(); 05",    0,   CEL.minmax(15,  -0,  0));
CUT.isEqual("minmax(); 06",    -0,  CEL.minmax(0,   -0,  15));
CUT.isEqual("minmax(); 07",    15,  CEL.minmax(10,  15,  20));
CUT.isEqual("minmax(); 08",    -0,  CEL.minmax(-0,  -10, 0));
CUT.isEqual("minmax(); 09",    -0,  CEL.minmax(0,   -10, -0));
CUT.isEqual("minmax(); 10",    20,  CEL.minmax(25,  10,  20));
CUT.isEqual("minmax(); 11",    15,  CEL.minmax(15,  10,  20));
CUT.isEqual("minmax(); 12",    +0,  CEL.minmax(15,  -0n, 0));
CUT.isEqual("minmax(); 13",    -0,  CEL.minmax(0n,  -0,  15));
CUT.isEqual("minmax(); 14",    15,  CEL.minmax(10,  15,  20n));
CUT.isEqual("minmax(); 15",    0n,  CEL.minmax(-0n, -10, 0));
CUT.isEqual("minmax(); 16",    0,   CEL.minmax(0,   -10, -0n));
CUT.isEqual("minmax(); 17",    20,  CEL.minmax(25,  10n, 20));
CUT.isEqual("minmax(); 18",    15n, CEL.minmax(15n, 10n, 20n));


/* product(); */
CUT.isEqual("product(); - 1", CEL.product(3), 3);
CUT.isEqual("product(); - 2", CEL.product(3, 5), 15);
CUT.isEqual("product(); - 3", CEL.product(3.14, -5), -15.700000000000001);
CUT.isEqual("product(); - with many parameter types", "NaN",
  String(CEL.product(true, 3.14, -9, 'Arthur Dent'))
);
CUT.isEqual("product(); - try without parameter", CEL.product(), undefined);


/* sum(); */
CUT.isEqual("sum(); - 1", CEL.sum(3), 3);
CUT.isEqual("sum(); - 2", CEL.sum(3, 5), 8);
CUT.isEqual("sum(); - 3", CEL.sum(3.14, -5), -1.8599999999999999);
CUT.isEqual("sum(); - 4 - with many parameter types",
  CEL.sum(true, 3.14, -9, "Arthur Dent"), "-4.859999999999999Arthur Dent"
);
CUT.isEqual("sum(); - 5 - without parameter", CEL.sum(), 0);


/* avg(); */
CUT.isEqual("avg(); 1", CEL.avg(2, 4, 3), 3);
CUT.isEqual("avg(); 2", CEL.avg(2, 4, 3.14), 3.046666666666667);
CUT.isEqual("avg(); 3", CEL.avg(2, -8, 3.14), -0.9533333333333333);
CUT.isEqual("avg(); 4", CEL.avg(5), 5);
CUT.isEqual("avg(); 5", String(CEL.avg()), "NaN");


/* isEven(); */
CUT.isTrue("isEven(); 1", CEL.isEven(8));
CUT.isFalse("isEven(); 2", CEL.isEven(9));
CUT.isFalse("isEven(); 3", CEL.isEven(8.5));
CUT.isFalse("isEven(); 4", CEL.isEven(9.5));
CUT.isFalse("isEven(); 5", CEL.isEven("Arthur Dent"));


/* isOdd(); */
CUT.isTrue("isOdd(); 2", CEL.isOdd(9));
CUT.isFalse("isOdd(); 1", CEL.isOdd(8));
CUT.isTrue("isOdd(); 3", CEL.isOdd(8.5));
CUT.isTrue("isOdd(); 4", CEL.isOdd(9.5));
CUT.isFalse("isOdd(); 5", CEL.isOdd("Arthur Dent"));


/* toInt8(); */
CUT.isEqual("toInt8(); 1", CEL.toInt8(9), 9);
CUT.isEqual("toInt8(); 2", CEL.toInt8(-5), -5);
CUT.isEqual("toInt8(); 3", CEL.toInt8(8.5), 8);
CUT.isEqual("toInt8(); 4", CEL.toInt8(-8.5), -8);
CUT.isEqual("toInt8(); 5", CEL.toInt8(130), 127);
CUT.isEqual("toInt8(); 6", CEL.toInt8(-130), -128);
CUT.isEqual("toInt8(); 7", CEL.toInt8("Arthur Dent"), 0);
CUT.isEqual("toInt8(); 8", CEL.toInt8(Infinity), 127);
CUT.isEqual("toInt8(); 9", CEL.toInt8("-Infinity"), -128);


/* toUInt8(); */
CUT.isEqual("toUInt8(); 1", CEL.toUInt8(9), 9);
CUT.isEqual("toUInt8(); 2", CEL.toUInt8(-5), 0);
CUT.isEqual("toUInt8(); 3", CEL.toUInt8(8.5), 8);
CUT.isEqual("toUInt8(); 4", CEL.toUInt8(-8.5), 0);
CUT.isEqual("toUInt8(); 5", CEL.toUInt8(1130), 255);
CUT.isEqual("toUInt8(); 6", CEL.toUInt8("Arthur Dent"), 0);
CUT.isEqual("toUInt8(); 7", CEL.toUInt8(Infinity), 255);
CUT.isEqual("toUInt8(); 8", CEL.toUInt8("-Infinity"), 0);


/* toInt16(); */
CUT.isEqual("toInt16(); 1", CEL.toInt16(199), 199);
CUT.isEqual("toInt16(); 2", CEL.toInt16(-1845), -1845);
CUT.isEqual("toInt16(); 3", CEL.toInt16(8.5), 8);
CUT.isEqual("toInt16(); 4", CEL.toInt16(-8.5), -8);
CUT.isEqual("toInt16(); 5", CEL.toInt16(111130), 32767);
CUT.isEqual("toInt16(); 6", CEL.toInt16(-111130), -32768);
CUT.isEqual("toInt16(); 7", CEL.toInt16("Arthur Dent"), 0);
CUT.isEqual("toInt16(); 8", CEL.toInt16(Infinity), 32767);
CUT.isEqual("toInt16(); 9", CEL.toInt16("-Infinity"), -32768);


/* toUInt16(); */
CUT.isEqual("toUInt16(); 1", CEL.toUInt16(199), 199);
CUT.isEqual("toUInt16(); 2", CEL.toUInt16(-1845), 0);
CUT.isEqual("toUInt16(); 3", CEL.toUInt16(8.5), 8);
CUT.isEqual("toUInt16(); 4", CEL.toUInt16(-8.5), 0);
CUT.isEqual("toUInt16(); 5", CEL.toUInt16(111130), 65535);
CUT.isEqual("toUInt16(); 6", CEL.toUInt16("Arthur Dent"), 0);
CUT.isEqual("toUInt16(); 7", CEL.toUInt16(Infinity), 65535);
CUT.isEqual("toUInt16(); 8", CEL.toUInt16("-Infinity"), 0);


/* toInt32(); */
CUT.isEqual("toInt32(); 1", CEL.toInt32(199), 199);
CUT.isEqual("toInt32(); 2", CEL.toInt32(-1845), -1845);
CUT.isEqual("toInt32(); 3", CEL.toInt32(8.5), 8);
CUT.isEqual("toInt32(); 4", CEL.toInt32(-8.5), -8);
CUT.isEqual("toInt32(); 5", CEL.toInt32(2147483649), 2147483647);
CUT.isEqual("toInt32(); 6", CEL.toInt32(-3147483649), -2147483648);
CUT.isEqual("toInt32(); 7", CEL.toInt32("Arthur Dent"), 0);
CUT.isEqual("toInt32(); 8", CEL.toInt32(Infinity), 2147483647);
CUT.isEqual("toInt32(); 9", CEL.toInt32("-Infinity"), -2147483648);


/* toUInt32(); */
CUT.isEqual("toUInt32(); 1", CEL.toUInt32(199), 199);
CUT.isEqual("toUInt32(); 2", CEL.toUInt32(-1845), 0);
CUT.isEqual("toUInt32(); 3", CEL.toUInt32(8.5), 8);
CUT.isEqual("toUInt32(); 4", CEL.toUInt32(-8.5), 0);
CUT.isEqual("toUInt32(); 5", CEL.toUInt32(4294967297), 4294967295);
CUT.isEqual("toUInt32(); 6", CEL.toUInt32("Arthur Dent"), 0);
CUT.isEqual("toUInt32(); 7", CEL.toUInt32(Infinity), 4294967295);
CUT.isEqual("toUInt32(); 8", CEL.toUInt32("-Infinity"), 0);


/* toBigInt64(); */
CUT.isEqual("toBigInt64(); 01", CEL.toBigInt64(199), 199n);
CUT.isEqual("toBigInt64(); 02", CEL.toBigInt64(-1845), -1845n);
CUT.isEqual("toBigInt64(); 03", CEL.toBigInt64(8.5), 8n);
CUT.isEqual("toBigInt64(); 04", CEL.toBigInt64(-8.5), -8n);
CUT.isEqual("toBigInt64(); 05", CEL.toBigInt64(9223372036854775809),
  9223372036854775808n
);
CUT.isEqual("toBigInt64(); 06", CEL.toBigInt64("Arthur Dent"), 0n);
CUT.isEqual("toBigInt64(); 07", CEL.toBigInt64(Infinity),
  9223372036854775808n
);
CUT.isEqual("toBigInt64(); 08", CEL.toBigInt64("-Infinity"),
  -9223372036854775808n
);
CUT.isEqual("toBigInt64(); 09", CEL.toBigInt64(18446744073709551617),
  9223372036854775808n
);
CUT.isEqual("toBigInt64(); 10", CEL.toBigInt64(-18446744073709551617),
  -9223372036854775808n
);


/* toBigUInt64(); */
CUT.isEqual("toBigUInt64(); 1", CEL.toBigUInt64(199), 199n);
CUT.isEqual("toBigUInt64(); 2", CEL.toBigUInt64(-1845), 0n);
CUT.isEqual("toBigUInt64(); 3", CEL.toBigUInt64(8.5), 8n);
CUT.isEqual("toBigUInt64(); 4", CEL.toBigUInt64(-8.5), 0n);
CUT.isEqual("toBigUInt64(); 5", CEL.toBigUInt64(18446744073709551617),
  18446744073709551616n
);
CUT.isEqual("toBigUInt64(); 6", CEL.toBigUInt64("Arthur Dent"), 0n);
CUT.isEqual("toBigUInt64(); 7", CEL.toBigUInt64(Infinity),
  18446744073709551616n
);
CUT.isEqual("toBigUInt64(); 8", CEL.toBigUInt64("-Infinity"), 0n);
CUT.isEqual("toBigUInt64(); 9", CEL.toBigUInt64(-9223372036854775808n), 0n);


/* toFloat32(); */
CUT.isEqual("toFloat32(); 1", CEL.toFloat32(199), 199);
CUT.isEqual("toFloat32(); 2", CEL.toFloat32(-1845), -1845);
CUT.isEqual("toFloat32(); 3", CEL.toFloat32(8.5), 8.5);
CUT.isEqual("toFloat32(); 4", CEL.toFloat32(-8.5), -8.5);
CUT.isEqual("toFloat32(); 5", CEL.toFloat32(-3.4e39), -3.4e+38);
CUT.isEqual("toFloat32(); 6", CEL.toFloat32(3.4e39), +3.4e38);
CUT.isEqual("toFloat32(); 7", CEL.toFloat32("Arthur Dent"), 0);
CUT.isEqual("toFloat32(); 8", CEL.toFloat32(Infinity), 3.4e+38);
CUT.isEqual("toFloat32(); 9", CEL.toFloat32("-Infinity"), -3.4e+38);


/* isInt8(); */
CUT.isTrue("isInt8(); 01", CEL.isInt8(34));
CUT.isTrue("isInt8(); 02", CEL.isInt8(-34));
CUT.isFalse("isInt8(); 03", CEL.isInt8(-129));
CUT.isFalse("isInt8(); 04", CEL.isInt8(128));
CUT.isFalse("isInt8(); 05", CEL.isInt8(34.5));
CUT.isFalse("isInt8(); 06", CEL.isInt8(-34.5));
CUT.isFalse("isInt8(); 07", CEL.isInt8("Arthur Dent"));
CUT.isFalse("isInt8(); 08", CEL.isInt8(true));
CUT.isFalse("isInt8(); 09", CEL.isInt8(false));
CUT.isFalse("isInt8(); 10", CEL.isInt8(Infinity));
CUT.isFalse("isInt8(); 11", CEL.isInt8(-Infinity));
CUT.isFalse("isInt8(); 12", CEL.isInt8([]));
CUT.isFalse("isInt8(); 13", CEL.isInt8({}));


/* isUInt8(); */
CUT.isTrue("isUInt8(); 01", CEL.isUInt8(34));
CUT.isFalse("isUInt8(); 02", CEL.isUInt8(-34));
CUT.isFalse("isUInt8(); 03", CEL.isUInt8(-1));
CUT.isFalse("isUInt8(); 04", CEL.isUInt8(256));
CUT.isFalse("isUInt8(); 05", CEL.isUInt8(34.5));
CUT.isFalse("isUInt8(); 06", CEL.isUInt8(-34.5));
CUT.isFalse("isUInt8(); 07", CEL.isUInt8("Arthur Dent"));
CUT.isFalse("isUInt8(); 08", CEL.isUInt8(true));
CUT.isFalse("isUInt8(); 09", CEL.isUInt8(false));
CUT.isFalse("isUInt8(); 10", CEL.isUInt8(Infinity));
CUT.isFalse("isUInt8(); 11", CEL.isUInt8(-Infinity));
CUT.isFalse("isUInt8(); 12", CEL.isUInt8([]));
CUT.isFalse("isUInt8(); 13", CEL.isUInt8({}));


/* isInt16(); */
CUT.isTrue("isInt16(); 01", CEL.isInt16(34));
CUT.isTrue("isInt16(); 02", CEL.isInt16(-34));
CUT.isFalse("isInt16(); 03", CEL.isInt16(-32769));
CUT.isFalse("isInt16(); 04", CEL.isInt16(32768));
CUT.isFalse("isInt16(); 05", CEL.isInt16(34.5));
CUT.isFalse("isInt16(); 06", CEL.isInt16(-34.5));
CUT.isFalse("isInt16(); 07", CEL.isInt16("Arthur Dent"));
CUT.isFalse("isInt16(); 08", CEL.isInt16(true));
CUT.isFalse("isInt16(); 09", CEL.isInt16(false));
CUT.isFalse("isInt16(); 10", CEL.isInt16(Infinity));
CUT.isFalse("isInt16(); 11", CEL.isInt16(-Infinity));
CUT.isFalse("isInt16(); 12", CEL.isInt16([]));
CUT.isFalse("isInt16(); 13", CEL.isInt16({}));


/* isUInt16(); */
CUT.isTrue("isUInt16(); 01", CEL.isUInt16(34));
CUT.isFalse("isUInt16(); 02", CEL.isUInt16(-34));
CUT.isFalse("isUInt16(); 03", CEL.isUInt16(-1));
CUT.isFalse("isUInt16(); 04", CEL.isUInt16(65536));
CUT.isFalse("isUInt16(); 05", CEL.isUInt16(34.5));
CUT.isFalse("isUInt16(); 06", CEL.isUInt16(-34.5));
CUT.isFalse("isUInt16(); 07", CEL.isUInt16("Arthur Dent"));
CUT.isFalse("isUInt16(); 08", CEL.isUInt16(true));
CUT.isFalse("isUInt16(); 09", CEL.isUInt16(false));
CUT.isFalse("isUInt16(); 10", CEL.isUInt16(Infinity));
CUT.isFalse("isUInt16(); 11", CEL.isUInt16(-Infinity));
CUT.isFalse("isUInt16(); 12", CEL.isUInt16([]));
CUT.isFalse("isUInt16(); 13", CEL.isUInt16({}));


/* isInt32(); */
CUT.isTrue("isInt32(); 01", CEL.isInt32(34));
CUT.isTrue("isInt32(); 02", CEL.isInt32(-34));
CUT.isFalse("isInt32(); 03", CEL.isInt32(-2147483649));
CUT.isFalse("isInt32(); 04", CEL.isInt32(2147483648));
CUT.isFalse("isInt32(); 05", CEL.isInt32(34.5));
CUT.isFalse("isInt32(); 06", CEL.isInt32(-34.5));
CUT.isFalse("isInt32(); 07", CEL.isInt32("Arthur Dent"));
CUT.isFalse("isInt32(); 08", CEL.isInt32(true));
CUT.isFalse("isInt32(); 09", CEL.isInt32(false));
CUT.isFalse("isInt32(); 10", CEL.isInt32(Infinity));
CUT.isFalse("isInt32(); 11", CEL.isInt32(-Infinity));
CUT.isFalse("isInt32(); 12", CEL.isInt32([]));
CUT.isFalse("isInt32(); 13", CEL.isInt32({}));


/* isUInt32(); */
CUT.isTrue("isUInt32(); 01", CEL.isUInt32(34));
CUT.isFalse("isUInt32(); 02", CEL.isUInt32(-34));
CUT.isFalse("isUInt32(); 03", CEL.isUInt32(-1));
CUT.isFalse("isUInt32(); 04", CEL.isUInt32(4294967296));
CUT.isFalse("isUInt32(); 05", CEL.isUInt32(34.5));
CUT.isFalse("isUInt32(); 06", CEL.isUInt32(-34.5));
CUT.isFalse("isUInt32(); 07", CEL.isUInt32("Arthur Dent"));
CUT.isFalse("isUInt32(); 08", CEL.isUInt32(true));
CUT.isFalse("isUInt32(); 09", CEL.isUInt32(false));
CUT.isFalse("isUInt32(); 10", CEL.isUInt32(Infinity));
CUT.isFalse("isUInt32(); 11", CEL.isUInt32(-Infinity));
CUT.isFalse("isUInt32(); 12", CEL.isUInt32([]));
CUT.isFalse("isUInt32(); 13", CEL.isUInt32({}));


/* isBigInt64(); */
CUT.isTrue("isBigInt64(); 01", CEL.isBigInt64(34n));
CUT.isTrue("isBigInt64(); 02", CEL.isBigInt64(-34n));
CUT.isFalse("isBigInt64(); 03", CEL.isBigInt64(-9223372036854775809n));
CUT.isFalse("isBigInt64(); 04", CEL.isBigInt64(9223372036854775809n));
CUT.isFalse("isBigInt64(); 05", CEL.isBigInt64(34.5));
CUT.isFalse("isBigInt64(); 06", CEL.isBigInt64(-34.5));
CUT.isFalse("isBigInt64(); 07", CEL.isBigInt64("Arthur Dent"));
CUT.isFalse("isBigInt64(); 08", CEL.isBigInt64(true));
CUT.isFalse("isBigInt64(); 09", CEL.isBigInt64(false));
CUT.isFalse("isBigInt64(); 10", CEL.isBigInt64(Infinity));
CUT.isFalse("isBigInt64(); 11", CEL.isBigInt64(-Infinity));
CUT.isFalse("isBigInt64(); 12", CEL.isBigInt64([]));
CUT.isFalse("isBigInt64(); 13", CEL.isBigInt64({}));


/* isBigUInt64(); */
CUT.isTrue("isBigUInt64(); 01", CEL.isBigUInt64(34n));
CUT.isFalse("isBigUInt64(); 02", CEL.isBigUInt64(-34n));
CUT.isFalse("isBigUInt64(); 03", CEL.isBigUInt64(-1n));
CUT.isFalse("isBigUInt64(); 04", CEL.isBigUInt64(18446744073709551617n));
CUT.isFalse("isBigUInt64(); 05", CEL.isBigUInt64(34.5));
CUT.isFalse("isBigUInt64(); 06", CEL.isBigUInt64(-34.5));
CUT.isFalse("isBigUInt64(); 07", CEL.isBigUInt64("Arthur Dent"));
CUT.isFalse("isBigUInt64(); 08", CEL.isBigUInt64(true));
CUT.isFalse("isBigUInt64(); 09", CEL.isBigUInt64(false));
CUT.isFalse("isBigUInt64(); 10", CEL.isBigUInt64(Infinity));
CUT.isFalse("isBigUInt64(); 11", CEL.isBigUInt64(-Infinity));
CUT.isFalse("isBigUInt64(); 12", CEL.isBigUInt64([]));
CUT.isFalse("isBigUInt64(); 13", CEL.isBigUInt64({}));


/** Async **/
CUT.addElement("hr");
CUT.addElement("h3", "AJAX, domReady(); and other callbacks");


CUT.addElement("p", "Here have to be these results:");
CUT.addElement("ul", "<li>1x domReady(); (core api) is working</li>"
  + "<li>2x importScript(); (core api) - first script loaded</li>"
  + "<li>2x importScript(); (core api) - second script loaded</li>"
  + "<li>1x importScript(); (core api) - with more scripts"
  + "<li>1x importScript(); (core api) - with error</li>"
  + "<li>1x getJson()</li>"
  + "<li>1x getText()</li>"
  + "<li>12x ajax()</li>"
  + "<li>8x Array.fromAsync()</li>"
);


/* domReady(); */
CEL.domReady(function () {
  CUT.isTrue("domReady(); (core api) is working", true);
});


/* importScript(); */
CEL.importScript("unittest-notExist.js");
CEL.importScript("unittest-is1.js", "unittest-is2.js", "unittest-is3.js");
CEL.importScript("unittest-is1.js");
CEL.importScript("unittest-is2.js");
/*
Uncaught URIError: Loading failed for the script with source unittest-notExist.js
The error cannot be caught here, because not happens here.
In the adding of the HTML script tag causes the error.
*/


/* Array.fromAsync(); */
async function* asyncIterable () {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve)=> setTimeout(resolve,100*i));
    yield i;
  }
}
Array.fromAsync(asyncIterable()).then((res) =>
  CUT.isEqual("Array.fromAsync(); - asyncIterable: [0,1,2,3,4]",
    JSON.stringify(res), "[0,1,2,3,4]"
  )
);
Array.fromAsync(asyncIterable(), (x) => x*2).then((res) =>
  CUT.isEqual("Array.fromAsync(); - asyncIterable + fn: [0,2,4,6,8]",
    JSON.stringify(res), "[0,2,4,6,8]"
  )
);
Array.fromAsync([4,5,6,7,8]).then((res) =>
  CUT.isEqual("Array.fromAsync(); - [4,5,6,7,8]: [4,5,6,7,8]",
    JSON.stringify(res), "[4,5,6,7,8]"
  )
);
Array.fromAsync([4, 5, 6, 7, 8], (x) => x*2).then((res) =>
  CUT.isEqual("Array.fromAsync(); - [4,5,6,7,8] + fn: [8,10,12,14,16]",
    JSON.stringify(res), "[8,10,12,14,16]"
  )
);
Array.fromAsync(new Set([4, 5, 6, 6, 10])).then((res) =>
  CUT.isEqual("Array.fromAsync(); - Set: [4,5,6,10]", JSON.stringify(res),
    "[4,5,6,10]"
  )
);
Array.fromAsync(new Set([4, 5, 6, 6, 10]), (x) => x*2).then((res) =>
  CUT.isEqual("Array.fromAsync(); - Set + fn: [8,10,12,20]",
    JSON.stringify(res), "[8,10,12,20]"
  )
);
Array.fromAsync({"0": 3, "1": 4, "2": 5, length: 3}).then((res) =>
  CUT.isEqual("Array.fromAsync(); - arraylike: [3,4,5]",
    JSON.stringify(res), "[3,4,5]"
  )
);
Array.fromAsync({"0": 3, "1": 4, "2": 5, length: 3}, (x) => x*2).then((res) =>
  CUT.isEqual("Array.fromAsync(); - arraylike + fn: [6,8,10]",
    JSON.stringify(res), "[6,8,10]"
  )
);


/* AJAX API */
/*
XML Parsing Error: not well-formed
Location: testdata.json
Line Number 1, Column 1:
-> MIME Content-Type: application/json can fix it
*/


var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <small>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</small></p>";


/* getText(); */
CEL.getText("testdata.txt",
  function(r){ CUT.isEqual("getText();", resAjaxText,r); }
);


/* getJson(); */
CEL.getJson("testdata.json",
  function(r){ CUT.isEqual("getJson();", resAjaxJson, r.testArray[0].image); }
);


/* ajax begin */
CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.txt", format: "text",
  success: function(r){ CUT.isEqual("ajax(); ajax get text", resAjaxText, r); },
  error: function (e) {
    CUT.isTrue("ajax(); ajax get text: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.json", format: "json",
  success: function (r) {
    CUT.isEqual("ajax(); ajax get json", resAjaxJson, r.testArray[0].image);
  },
  error: function (e) {
    CUT.isTrue("ajax(); ajax get json: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "get", url: "testdata.xml", format: "xml",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); ajax get xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isTrue("ajax(); ajax get xml: " + JSON.stringify(e), false);
  }
});

CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.txt", format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) { CUT.isEqual("ajax(); ajax post text",resAjaxText,r);},
  error: function (e) {
    CUT.isTrue("ajax(); ajax post text: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.json", format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); ajax post json", resAjaxJson, r.testArray[0].image);
  },
  error: function (e) {
    CUT.isTrue("ajax(); ajax post json: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "ajax", type: "post", url: "testdata.xml", format: "xml",
  data: "a=foo&b=bar baz",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); ajax post xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isTrue("ajax(); ajax post xml: " + JSON.stringify(e), false);
  }
});

CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.txt", format: "text",
  success: function (r) { CUT.isEqual("ajax(); cors get text",resAjaxText,r);},
  error: function (e) {
    CUT.isTrue("ajax(); cors get text: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.json", format: "json",
  success: function (r) {
    CUT.isEqual("ajax(); cors get json", resAjaxJson, r.testArray[0].image);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors get json: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "cors", type: "get", url: "testdata.xml", format: "xml",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); cors get xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors get xml: " + JSON.stringify(e), false);
  }
});

CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.txt", format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); cors post text", resAjaxText, r);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors post text: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.json", format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); cors post json", resAjaxJson, r.testArray[0].image);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors post json: " + JSON.stringify(e), false);
  }
});
CEL.ajax({
  queryType: "cors", type: "post", url: "testdata.xml", format: "xml",
  data: "a=foo&b=bar baz",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    CUT.isEqual("ajax(); cors post xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isTrue("ajax(); cors post xml: " + JSON.stringify(e), false);
  }
});
/* ajax end */


}());


} catch (e) {
  CUT.isTrue("<span class=\"failed\">[CUT global try-catch]</span> " + e,false);
}
