"use strict";

try {

/* Celestra unit tester */

var celTest = {};

celTest.VERSION = "Celestra Unit Tester (CUT) v0.8.16";

celTest.__results__ = document.querySelector("#results");
celTest.__resultsFailed__ = document.querySelector("#resultsFailed");

/* __addTest__(a"step", true, expr); */
/* __addTest__("step", true, expr, true|false); */
/* only for inner calls and selftest */
celTest.__addTest__ = function __addTest__ (step, expected, expression, strict) {
  if (strict === undefined) { strict = true; }
  var el = document.createElement("p");
  if (strict ? expected === expression : expected == expression) {
    el.innerHTML = "["+Date.now().toString(36)+"] <span class='passed'>[passed]</span> "+step;
    celTest.__results__.append(el);
  } else {
    el.innerHTML = "["+Date.now().toString(36)+"] <span class='failed'>[failed]</span> "+step;
    celTest.__results__.append(el);
    celTest.__resultsFailed__.append(el.cloneNode(true));
  }
};

/* isTrue("step", expr); */
celTest.isTrue = function isTrue (step, expression) {
  celTest.__addTest__(step, true, expression, true);
};

/* isFalse("step", expr); */
celTest.isFalse = function isFalse (step, expression) {
  celTest.__addTest__(step, false, expression, true);
};

/* isEqual("step", true, expr); */
/* isEqual("step", true, expr, true|false); */
celTest.isEqual = function isEqual (step, expected, expression, strict) {
  celTest.__addTest__(step, expected, expression, strict);
};

/* isNotEqual("step", true, expr); */
/* isNotEqual("step", true, expr, true|false); */
celTest.isNotEqual = function (step, notExpected, expression, strict) {
  if (strict === undefined) { strict = true; }
  celTest.__addTest__(step, true,
    (strict ? notExpected !== expression : notExpected != expression),
    true
 );
};

/* addElement(<element>); */
/* addElement(<type>[,innerHTML]); */
celTest.addElement = function addElement (type, iHtml) {
  if (typeof type === "object" && type.nodeType === 1) {
    celTest.__results__.append(type);
  } else {
    var el = document.createElement(type);
    if (iHtml) { el.innerHTML = iHtml; }
    celTest.__results__.append(el);
  }
};

/* log(<innerHTML>); */
celTest.log = function log (iHtml) { celTest.addElement("p", iHtml); };

/* clear(); */
celTest.clear = function clear () { celTest.__results__.innerHTML = ""; };

var _cut = celTest;

/* ======================================================================== */

_cut.addElement("hr");
_cut.addElement("table",
  "<tr><td>CUT: </td><td><code>"+_cut.VERSION+"</code></td></tr>"
    + "<tr><td>Celestra: </td><td><code>"+celestra.VERSION+"</code></td></tr>"
    + "<tr><td>Date: </td><td><code>"+(new Date()).toISOString()+"</code></td></tr>"
);

_cut.addElement("table",
    "<tr><td>navigator.appName: </td><td><code>"+navigator.appName+"</code></td></tr>"
    + "<tr><td>navigator.appCodeName: </td><td><code>"+navigator.appCodeName+"</code></td></tr>"
    + "<tr><td>navigator.product: </td><td><code>"+navigator.product+"</code></td></tr>"
    + "<tr><td>navigator.appVersion: </td><td><code>"+navigator.appVersion+"</code></td></tr>"
    + "<tr><td>navigator.userAgent: </td><td><code>"+navigator.userAgent+"</code></td></tr>"
    + "<tr><td>navigator.platform: </td><td><code>"+navigator.platform+"</code></td></tr>"
    + "<tr><td>navigator.language: </td><td><code>"+navigator.language+"</code></td></tr>"
    + "<tr><td>navigator.cookieEnabled: </td><td><code>"+navigator.cookieEnabled+"</code></td></tr>"
    + "<tr><td>navigator.javaEnabled(): </td><td><code>"+navigator.javaEnabled()+"</code></td></tr>"
    + "<tr><td>window.innerWidth: </td><td><code>"+window.innerWidth+"</code></td></tr>"
    + "<tr><td>window.innerHeight: </td><td><code>"+window.innerHeight+"</code></td></tr>"
    + "<tr><td>screen.width: </td><td><code>"+screen.width+"</code></td></tr>"
    + "<tr><td>screen.height: </td><td><code>"+screen.height+"</code></td></tr>"
    + "<tr><td>screen.availWidth: </td><td><code>"+screen.availWidth+"</code></td></tr>"
    + "<tr><td>screen.availHeight: </td><td><code>"+screen.availHeight+"</code></td></tr>"
    + "<tr><td>screen.colorDepth: </td><td><code>"+screen.colorDepth+"</code></td></tr>"
    + "<tr><td>screen.pixelDepth: </td><td><code>"+screen.pixelDepth+"</code></td></tr>"
);

window.saveResults = function saveResults () {
  var dn = Date.now().toString(36);
  _.createFile("results-"+dn+".html",
    "<!DOCTYPE html><meta charset=\"utf-8\"><title>Results "+dn+"</title>"
      +"<style>html { -ms-word-break: break-all; word-break: break-all; word-break: break-word; word-wrap: break-word; overflow-wrap: break-word; } body { margin: 0 auto; max-width: 1200px; font-family: Helvetica, Arial, sans-serif; } h1 { text-align : center; } .passed, .failed { display: inline-block; padding: 3px; }.passed { background-color: #3d9970 !important; color: white !important; }.failed { background-color: #ff4136 !important; color: white !important; } #results { padding: 3px 5px 3px 5px; font-size: 14.5px !important; font-family: consolas, monospace; } code { background-color: slategrey; color: white; padding: 3px 5px 3px 5px; display: inline-block; margin-top: 2px; } </style>"
      +"<h1>Results "+dn+"</h1>"
      +"<div id='results'>"+celTest.__results__.innerHTML+"</div>",
    "text/html"
 );
};

/* Selftest */
_cut.addElement("hr");
_cut.addElement("h3", "CUT Selftest");

_cut.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); success", 1, 1
);
_cut.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); failed", 1, 2
);
_cut.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); success non-strict",
  0, false, false
);
_cut.__addTest__(
  "<span class=\"info\">Selftest</span> - __addTest__(); failed strict",
  0, false, true
);

_cut.isTrue(
  "<span class=\"info\">Selftest</span> - isTrue(); success", 1 < 10
);
_cut.isTrue(
  "<span class=\"info\">Selftest</span> - isTrue(); failed", 1 > 10
);

_cut.isFalse(
  "<span class=\"info\">Selftest</span> - isFalse(); success", 1 > 10
);
_cut.isFalse(
  "<span class=\"info\">Selftest</span> - isFalse(); failed", 1 < 10
);

_cut.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); success", 1, 1
);
_cut.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); failed", 1, 2
);
_cut.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); success non-strict",
  0, false, false
);
_cut.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); failed strict",
  0, false, true
);

_cut.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); success", 1, 2
);
_cut.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); failed", 1, 1
);
_cut.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); success strict",
  0, false, true
);
_cut.isNotEqual(
  "<span class=\"info\">Selftest</span> - isNotEqual(); failed non-strict",
  0, false, false
);


/* ======================================================================== */


(function(){
"use strict";

/* Celestra v4.3.2 testcases */

/* Not auto tested functions */
_cut.addElement("hr");
_cut.addElement("h3", "Not auto tested functions");
_cut.addElement("ul",
  "<li>getUrlVars(); no str parameter</li>"
    +"<li>getLocation(&#60;success&#62;[,error]);</li>"
    +"<li>importStyle(&#60;href&#62;[,success]);</li>"
    +"<li>importStyles(&#60;styles&#62;);</li>"
    +"<li>getFullscreen();</li>"
    +"<li>setFullscreenOn(&#60;selector&#62; or &#60;element&#62;);</li>"
    +"<li>setFullscreenOff();</li>"
    +"<li>createFile(&#60;filename&#62;,&#60;content&#62;[,dType]);</li>"
    +"<li>domFadeIn(&#60;element&#62;[,duration[,display]]);</li>"
    +"<li>domFadeOut(&#60;element&#62;[,duration]);</li>"
    +"<li>domFadeToggle(&#60;element&#62;[,duration[,display]]);</li>"
    +"<li>noConflict();</li>"
);


/* Celestra object */
_cut.addElement("hr");
_cut.addElement("h3", "Celestra object");

_cut.isEqual("Object name: \"celestra\"", true, celestra.randomInt(100,200)>99);
_cut.isEqual("Object name: \"_\"", true, _.randomInt(100,200)>99);


/* core api and DOM */

_cut.addElement("hr");
_cut.addElement("h3", "core api and DOM");

_cut.isEqual("VERSION", true, _.VERSION.includes("Celestra v"));

_cut.isTrue("v3.8.1 aliases removed in v4.0.0",
  _.isUndefined(_.someOf)
  && _.isUndefined(_.everyOf)
  && _.isUndefined(_.findOf)
  && _.isUndefined(_.dropOf)
  && _.isUndefined(_.takeOf)
  && _.isUndefined(_.joinOf)
  && _.isUndefined(_.enumerateOf)
  && _.isUndefined(_.flatOf)
  && _.isUndefined(_.concatOf)
  && _.isUndefined(_.reduceOf)
  && _.isUndefined(_.sortOf)
  && _.isUndefined(_.reverseOf)
  && _.isUndefined(_.sliceOf)
  && _.isUndefined(_.lastOf)
  && _.isUndefined(_.firstOf)
  && _.isUndefined(_.noneOf)
  && _.isUndefined(_.filterOf)
  && _.isUndefined(_.sizeOf)
  && _.isUndefined(_.hasOf)
  && _.isUndefined(_.mapOf)
  && _.isUndefined(_.forOf)
);

_cut.isTrue("assertTrue();",    _.assertTrue("lorem ipsum", true) );
_cut.isTrue("assertFalse();",   _.assertFalse("lorem ipsum", false) );
_cut.isTrue("assertEq(); 1",    _.assertEq("lorem ipsum", 1, 1) );
_cut.isTrue("assertEq(); 2",    _.assertEq("lorem ipsum", 1, true, false) );
_cut.isTrue("assertNotEq(); 1", _.assertNotEq("lorem ipsum", 1, 2) );
_cut.isTrue("assertNotEq(); 2", _.assertNotEq("lorem ipsum", 1, 2, false) );

_cut.addElement(
  _.domCreate(
    "div", {"id": "qsaDivTestElement"},
    "#qsaDiv test element"
      + "<p id='qsaDivP1'>#qsaDivP1 test element</p>"
      + "<p id='qsaDivP2'>#qsaDivP2 test element</p>"
 )
);

_cut.isEqual("qs(); selector",
  document.querySelector("#qsaDivTestElement"), _.qs("#qsaDivTestElement")
);

_cut.isEqual("qs(); selector + element 1",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1", _.qs("#qsaDivTestElement"))
);

_cut.isEqual("qs(); selector + element 2",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1", document.querySelector("#qsaDivTestElement"))
);

var testQsa1 = _.qsa("#qsaDivTestElement > p")
_cut.isTrue("qsa(); selector",
  Array.isArray(testQsa1) && testQsa1.length === 2 &&
    testQsa1[0] === _.qs("#qsaDivP1") && testQsa1[1] === _.qs("#qsaDivP2")
);

var testQsa2 = _.qsa("p", _.qs("#qsaDivTestElement"))
_cut.isTrue("qsa(); selector + element 1",
  Array.isArray(testQsa2) && testQsa2.length === 2 &&
    testQsa2[0] === _.qs("#qsaDivP1") && testQsa2[1] === _.qs("#qsaDivP2")
);

var testQsa3 = _.qsa("p", document.querySelector("#qsaDivTestElement"))
_cut.isTrue("qsa(); selector + element 2",
  Array.isArray(testQsa3) && testQsa3.length === 2 &&
    testQsa3[0] === _.qs("#qsaDivP1") && testQsa3[1] === _.qs("#qsaDivP2")
);

testQsa3.forEach(function (e) { e.innerHTML += " each"; });
_cut.isTrue("qsa(); forEach",
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
    testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);


_cut.isEqual("getType(); ES5 values",
  "array  number  string  object  htmldocument  boolean  nodelist  htmlparagraphelement  null  undefined  function  date  regexp",
  _.getType([1,2,3])+"  "+_.getType(1998)+"  "+_.getType("hello world")
    +"  "+_.getType({a:1,b:2})+"  "+_.getType(document)
    +"  "+_.getType(true)+"  "+_.getType(document.querySelectorAll("p"))
    +"  "+_.getType(document.querySelector("p"))+"  "+_.getType(null)
    +"  "+_.getType(undefined)+"  "+_.getType(function(){})
    +"  "+_.getType(new Date())+"  "+_.getType(/^\[object (.+)\]$/g)
);
_cut.isEqual("getType(); ES5 all true",
  "true  true  true  true  true  true  true  true  true  true  true  true  true",
 _.getType([1,2,3], "array")+"  "+_.getType(1998, "number")
    +"  "+_.getType("hello world", "string")+"  "+_.getType({a:1,b:2}, "object")
    +"  "+_.getType(document, "htmldocument")+"  "+_.getType(true, "boolean")
    +"  "+_.getType(document.querySelectorAll("p"), "nodelist")
    +"  "+_.getType(document.querySelector("p"), "htmlparagraphelement")
    +"  "+_.getType(null, "null")+"  "+_.getType(undefined, "undefined")
    +"  "+_.getType(function(){}, "function")+"  "+_.getType(new Date(), "date")
    +"  "+_.getType(/^\[object (.+)\]$/g, "regexp")
);
_cut.isEqual("getType(); ES5 all false",
  "false  false  false  false  false  false  false  false  false  false  false  false  false",
  _.getType([1,2,3], "number")+"  "+_.getType(1998, "array")
    +"  "+_.getType("hello world", "object")+"  "+_.getType({a:1,b:2}, "string")
    +"  "+_.getType(document, "boolean")+"  "+_.getType(true, "htmldocument")
    +"  "+_.getType(document.querySelectorAll("p"), "htmlheadingelement")
    +"  "+_.getType(document.querySelector("p"), "nodelist")
    +"  "+_.getType(null, "undefined")+"  "+_.getType(undefined, "null")
    +"  "+_.getType(function(){}, "object")+"  "+_.getType(new Date(), "array")
    +"  "+_.getType(/^\[object (.+)\]$/g, "string")
);

_cut.isEqual("getType(); ES6 values", "map  set  weakmap  weakset",
  _.getType(new Map())
    +"  "+_.getType(new Set())
    +"  "+_.getType(new WeakMap())
    +"  "+_.getType(new WeakSet())
);
_cut.isEqual("getType(); ES6 all true", "true  true  true  true",
  _.getType(new Map(), "map")
    +"  "+_.getType(new Set(), "set")
    +"  "+_.getType(new WeakMap(), "weakmap")
    +"  "+_.getType(new WeakSet(), "weakset")
);
_cut.isEqual("getType(); ES6 all false", "false  false  false  false",
  _.getType(new Map(), "object")
    +"  "+_.getType(new Set(), "object")
    +"  "+_.getType(new WeakMap(), "object")
    +"  "+_.getType(new WeakSet(), "object")
);
if (window.BigInt) {
  _cut.isEqual("getType(); ES6 bigint", "bigint  true  false",
  _.getType(BigInt(456))
    +"  "+_.getType(BigInt(456), "bigint")
    +"  "+_.getType(BigInt(456), "object")
  );
}


var foo1 = {a: "1", b: "2"};
var bar1 = {c: "3", d: "4", baz: {e: 5,fn: function(num){return num*num;}}};

var extObj1 = _.extend(true,{},foo1,bar1);
_cut.isEqual("extend(); true", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.extend(false,{},foo1,bar1);
_cut.isEqual("extend(); false 1", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.extend({},foo1,bar1);
_cut.isEqual("extend(); false 2", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.deepAssign({},foo1,bar1);
_cut.isEqual("deepAssign();", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var obj2stringObj = {str:"éáűőúöüóíÉÁŰŐÚÖÜÓÍ",bool:true,pi:3.141592653589793};
_cut.isEqual("obj2string();",
  "str=%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%89%C3%81%C5%B0%C5%90%C3%9A%C3%96%C3%9C%C3%93%C3%8D&bool=true&pi=3.141592653589793",
  _.obj2string(obj2stringObj)
);

/* inherit(); */

function Human (name,age) { this.name = name; this.age = age; }
Human.prototype.getName = function () { return this.name;}
Human.prototype.getAge = function () { return this.age;}

function Worker (name,age,job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

_.inherit(Worker,Human);

Worker.prototype.setJob = function (job) { this.job = job;}
Worker.prototype.getJob = function () { return this.job;}

var David = new Human("David",27);
var Amy = new Worker ("Amy",25,"Engineer");

_cut.isEqual("inherit();",
  "David, 27" +"Amy, 25, Engineer" +"David instanceof Human: true"
    +"David instanceof Worker: false" +"Amy instanceof Human: true"
    +"Amy instanceof Worker: true",
  David.getName()+", "+David.getAge()
    + Amy.getName()+", "+Amy.getAge()+", "+Amy.getJob()
    + "David instanceof Human: " + (David instanceof Human)
    + "David instanceof Worker: " + (David instanceof Worker)
    + "Amy instanceof Human: " + (Amy instanceof Human)
    + "Amy instanceof Worker: " + (Amy instanceof Worker)
);

/* / inherit(); */

_cut.isEqual(
  'getUrlVars(); prop order_by from <code>"?showall=true&order_by=updated&o=asc"</code>',
  "updated",
  _.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by"],
);
//_cut.log("<code>"+_.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by"]+"</code>");
_cut.isEqual("getUrlVars(); prop not found - undefined", undefined,
  _.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by2"],
);
//_cut.log("<code>"+_.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by2"]+"</code>");
_cut.isEqual("getUrlVars(); empty object", "{}", JSON.stringify(_.getUrlVars("?")) );
//_cut.log("<code>"+_.getUrlVars("?")+"</code>");

_cut.addElement(
  _.domCreate("div", {"id": "testFormDiv"},
    " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
 )
);

_cut.isEqual("form2array();",
  '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify(_.form2array(_.qs("#form1")))
);

_cut.isEqual("form2string();",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  _.form2string(_.qs("#form1"))
);

_.qs("#testFormDiv").remove();


_cut.isTrue("randomInt();", _.randomInt() <= 101);
_cut.isTrue("randomInt(max);", _.randomInt(30) <= 30);
var testRandom = _.randomInt(51,55);
_cut.isTrue("randomInt(min,max);", testRandom >= 51 && testRandom <= 55);

_cut.isTrue("randomFloat();", _.randomFloat() <= 101);
_cut.isTrue("randomFloat(max);", _.randomFloat(30) <= 30);
var testRandom = _.randomFloat(51,55);
_cut.isTrue("randomFloat(min,max);", testRandom >= 51 && testRandom <= 55);
//_cut.log(`<code>${testRandom}</code>`);

var rndStr = _.randomString();
_cut.isTrue("randomString(); default length 100, default false", _.isString(rndStr) && rndStr.length === 100);
_cut.log("<code>"+rndStr+"</code>");
rndStr = _.randomString(10);
_cut.isTrue("randomString(10) default false", _.isString(rndStr) && rndStr.length === 10);
_cut.log("<code>"+rndStr+"</code>");
rndStr = _.randomString(15,true);
_cut.isTrue("randomString(15,true);", _.isString(rndStr) && rndStr.length === 15);
_cut.log("<code>"+rndStr+"</code>");
rndStr = _.randomString(20,false);
_cut.isTrue("randomString(20,false);", _.isString(rndStr) && rndStr.length === 20);
_cut.log("<code>"+rndStr+"</code>");
rndStr = "1" + _.randomString(32,false);
_cut.isEqual("randomString(); random \"btc\" address", true, _.isString(rndStr) && rndStr.length === 33);
_cut.log("<code>"+rndStr+"</code>");

var kayleeStr = "✓ à \r\n\t árvíztűrő tükörfúrógép ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP ,?;.:-_* ¤÷×¨¸´˙`˛°˘^ˇ~'+!%/=()|\\<> \" \/ #&@{}[]€ ÍÄíŁß 0123456789 asdfghjklqwertzuiopyxcvbnm ASDFGHJKLQWERTZUIOPYXCVBNM";
_cut.isEqual("b64Encode();",
  "4pyTIMOgIA0KCSDDoXJ2w616dMWxcsWRIHTDvGvDtnJmw7pyw7Nnw6lwIMOBUlbDjVpUxbBSxZAgVMOcS8OWUkbDmlLDk0fDiVAgLD87LjotXyogwqTDt8OXwqjCuMK0y5lgy5vCsMuYXsuHficrISUvPSgpfFw8PiAiIC8gIyZAe31bXeKCrCDDjcOEw63FgcOfIDAxMjM0NTY3ODkgYXNkZmdoamtscXdlcnR6dWlvcHl4Y3Zibm0gQVNERkdISktMUVdFUlRaVUlPUFlYQ1ZCTk0=",
  _.b64Encode(kayleeStr)
);
_cut.isEqual("b64Decode(); + b64Encode();", kayleeStr, _.b64Decode(_.b64Encode(kayleeStr)));
_cut.isEqual("javaHash();",
  "-0.578: 1334063883 / 4f84330b / 13340638830: 48 / 30 / 48 / 3.14: 1565118 / 1565118 / 156511842: 1662 / 67e / 1662true: 3569038 / 36758e / 3569038\"true\": 3569038 / 36758e / 3569038false: 97196323 / 5cb1923 / 97196323\"false\": 97196323 / 5cb1923 / 97196323null: 3392903339290333c587\"null\": 3392903 / 33c587 / 3392903undefined: 0 / 0 / 0\"undefined\": -1038130864 / -3de09eb0 / -1038130864\"\": 0 / 0 / 0[]: 0 / 0 / 0[1,2]: 48503 / bd77 / 48503[3,4]: 50427 / c4fb / 50427{}: -1074417128 / -400a4de8 / -1074417128{a:1}: -1074417128 / -400a4de8 / -1074417128{b:2}: -1074417128 / -400a4de8 / -1074417128str variable: -313568218 / -12b0abda / -313568218str variable + b64Encode: LTMxMzU2ODIxOA== / LTEyYjBhYmRh / LTMxMzU2ODIxOA==str variable + b64Encode + b64Decode: -313568218 / -12b0abda / -313568218",
  "-0.578: " + _.javaHash(-0.578) + " / " + _.javaHash(-0.578,true) + " / " + _.javaHash(-0.578,false)
    + "0: " + _.javaHash(0) + " / " + _.javaHash(0,true) + " / " + _.javaHash(0,false) + " / "
    + "3.14: " + _.javaHash(3.14) + " / " + _.javaHash(3.14) + " / " + _.javaHash(3.14,false)
    + "42: " + _.javaHash(42) + " / " + _.javaHash(42,true) + " / " + _.javaHash(42,false)
    + "true: " + _.javaHash(true)  + " / " + _.javaHash(true,true)  + " / " + _.javaHash(true,false)
    + "\"true\": " + _.javaHash("true") + " / " + _.javaHash("true",true) + " / " + _.javaHash("true",false)
    + "false: " + _.javaHash(false) + " / " + _.javaHash(false,true) + " / " + _.javaHash(false,false)
    + "\"false\": " + _.javaHash("false") + " / " + _.javaHash("false",true) + " / " + _.javaHash("false",false)
    + "null: " + _.javaHash(null) + _.javaHash(null) + _.javaHash(null,true,false)
    + "\"null\": " + _.javaHash("null") + " / " + _.javaHash("null",true) + " / " + _.javaHash("null",false)
    + "undefined: " + _.javaHash(undefined) + " / " + _.javaHash(undefined,true) + " / " + _.javaHash(undefined,false)
    + "\"undefined\": " + _.javaHash("undefined") + " / " + _.javaHash("undefined",true) + " / " + _.javaHash("undefined",false)
    + "\"\": " + _.javaHash("") + " / " + _.javaHash("",true) + " / " + _.javaHash("",false)
    + "[]: " + _.javaHash([]) + " / " + _.javaHash([],true) + " / " + _.javaHash([],false)
    + "[1,2]: " + _.javaHash([1,2]) + " / " + _.javaHash([1,2],true) + " / " + _.javaHash([1,2],false)
    + "[3,4]: " + _.javaHash([3,4]) + " / " + _.javaHash([3,4],true) + " / " + _.javaHash([3,4],false)
    + "{}: " + _.javaHash({}) + " / " + _.javaHash({},true) + " / " + _.javaHash({},false)
    + "{a:1}: " + _.javaHash({a:1}) + " / " + _.javaHash({a:1},true) + " / " + _.javaHash({a:1},false)
    + "{b:2}: " + _.javaHash({b:2}) + " / " + _.javaHash({b:2},true) + " / " + _.javaHash({b:2},false)
    + "str variable: " + _.javaHash(kayleeStr) + " / " + _.javaHash(kayleeStr,true) + " / " + _.javaHash(kayleeStr,false)
    + "str variable + b64Encode: " + _.b64Encode(_.javaHash(kayleeStr)) + " / " + _.b64Encode(_.javaHash(kayleeStr,true)) + " / " + _.b64Encode(_.javaHash(kayleeStr,false))
    + "str variable + b64Encode + b64Decode: " + _.b64Decode(_.b64Encode(_.javaHash(kayleeStr))) + " / " + _.b64Decode(_.b64Encode(_.javaHash(kayleeStr,true))) + " / " + _.b64Decode(_.b64Encode(_.javaHash(kayleeStr,false)))
);

var FPObject = {a:2, b:3, c:4};

_cut.isEqual("sizeIn();", "" + _.sizeIn(FPObject) + _.sizeIn({}), "30");

var forInStr = "";
_.forIn(FPObject, function (e) { forInStr += (e*2); });
_cut.isEqual("forIn();", "468", forInStr);
_cut.isEqual("forIn(); return value", FPObject, _.forIn(FPObject, function(){}));

_cut.isEqual("filterIn();",
  "{\"b\":2,\"c\":3}",
  JSON.stringify( _.filterIn({"a": 1, "b": 2, "c": 3}, (v, p, o) => (v > 1)) )
);

_cut.isEqual("popIn();", "1undefined", ""+_.popIn({"a":1},"a")+_.popIn({},"a"));

_cut.isEqual("getDoNotTrack();", true, _.getDoNotTrack() === true || _.getDoNotTrack() === false);

_cut.isEqual("strCapitalize();", _.strCapitalize("lorEm Ipsum"), "Lorem ipsum");
_cut.isEqual("strUpFirst();", _.strUpFirst("lorEm Ipsum"), "LorEm Ipsum");
_cut.isEqual("strDownFirst();", _.strDownFirst("LorEm Ipsum"), "lorEm Ipsum");

_cut.isEqual("strRemoveTags();","lorem ipsum dolor sit amet , consectetuer",
  _.strRemoveTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

var strReverseRes = _.strReverse("I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.");
_cut.isEqual("strReverse(); without unicode",
  ".eid ot emiT .niar ni sraet ekil ,emit ni tsol eb lliw stnemom esoht llA .etaG resuähnnaT eht raen krad eht ni rettilg smaeb-C dehctaw I .noirO fo redluohs eht ffo erif no spihs kcattA .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  strReverseRes
);
//_cut.log("<code>"+strReverseRes+"</code>");
var strReverseRes = _.strReverse("I've seen things you people wouldn't believe. \uD834\uDF06 Attack ships on fire off the shoulder of Orion.");
_cut.isEqual("strReverse(); with unicode 1",
  ".noirO fo redluohs eht ffo erif no spihs kcattA \uD834\uDF06 .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  strReverseRes
);
//_cut.log("<code>"+strReverseRes+"</code>");
/*_cut.isEqual(
  "strReverse(); with unicode 2",
  ".noirO fo redluohs eht ffo erif no spihs kcattA \u{1D306} .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  _.strReverse("I've seen things you people wouldn't believe. \u{1D306} Attack ships on fire off the shoulder of Orion.")
);*/

const testUnicodeStr22222 = "foo \uD834\uDF06 bar \uD835\uDC01 baz";
_cut.isEqual(
  "strCodePoints();",
  "[102,111,111,32,119558,32,98,97,114,32,119809,32,98,97,122]",
  JSON.stringify(_.strCodePoints(testUnicodeStr22222))
);
//_cut.log("<code>"+JSON.stringify(_.strCodePoints(testUnicodeStr22222))+"</code>");
_cut.isEqual(
  "strFromCodePoints(); + strCodePoints();",
  testUnicodeStr22222,
  _.strFromCodePoints(_.strCodePoints(testUnicodeStr22222))
);
//_cut.log("<code>"+_.strFromCodePoints(_.strCodePoints(testUnicodeStr22222))+"</code>");

_cut.isTrue("strAt(); unicode 1", _.strAt("\uD834\uDF06 ab cd",0) === "\uD834\uDF06");
_cut.isTrue("strAt(); unicode 2", _.strAt("ab \uD834\uDF06 cd",3) === "\uD834\uDF06");
_cut.isTrue("strAt(); unicode 3", _.strAt("ab cd \uD834\uDF06",-1) === "\uD834\uDF06");
_cut.isTrue("strAt(); non unicode 1", _.strAt("ab \uD834\uDF06 cd",0) === "a");
_cut.isTrue("strAt(); non unicode 2", _.strAt("ab \uD834\uDF06 cd",5) === "c");
_cut.isTrue("strAt(); non unicode 3", _.strAt("ab \uD834\uDF06 cd",-1) === "d");
_cut.isTrue("strAt(); empty string 1", _.strAt("",0) === "");
_cut.isTrue("strAt(); empty string 2", _.strAt("",3) === "");
_cut.isTrue("strAt(); empty string 3", _.strAt("",-1) === "");

var slice = _.toFunction([].slice);
_cut.isEqual("toFunction();", true, Array.isArray(slice(document.querySelectorAll("h3"))));

var FPArray = [1,2,3];

var dqsa = _.bind(document.querySelectorAll, document);
_cut.isTrue("bind();", dqsa("h3").length > 0);

_cut.isEqual("constant();", 3.14, _.constant(3.14)());
_cut.isEqual("identity();", 100, _.identity(60) + _.identity(40));
_cut.isEqual("noop();", undefined, _.noop());

_cut.isTrue("T();", _.T());
_cut.isFalse("F();", _.F());


/* DOM */

_cut.isEqual(
  "domGetCSSVar(); and domSetCSSVar(); without prefix 1",
  "",
  _.domGetCSSVar("testVar1")
);
_.domSetCSSVar("testVar1","value1");
_cut.isEqual(
  "domGetCSSVar(); and domSetCSSVar(); without prefix 2",
  "value1",
  _.domGetCSSVar("testVar1")
);
_cut.isEqual(
  "domGetCSSVar(); and domSetCSSVar(); with prefix 1",
  "",
  _.domGetCSSVar("--testVar2")
);
_.domSetCSSVar("--testVar2","value2");
_cut.isEqual(
  "domGetCSSVar(); and domSetCSSVar(); with prefix 2",
  "value2",
  _.domGetCSSVar("--testVar2")
);

_cut.addElement(
  _.domCreate("p", {"id": "domTestElement", style: {"width": "250px"} }, "DOM test element")
);
var domTestElement = _.qs("#domTestElement");

_cut.isTrue("domCreate(); with style object", _.isElement(domTestElement));
_cut.isTrue("domCreate(); with style string", _.isElement(_.domCreate("p", {"id": "domTestElement", style: "width: 250px; color: blue;" }, "DOM test element")));

_cut.isTrue("domCreate(object); with style object", _.isElement(_.domCreate({ elementType: "p", "id": "domTestElementObject", style: {"width": "250px"}, innerHTML: "DOM test element" })));
_cut.isTrue("domCreate(object); with style string", _.isElement(_.domCreate({ elementType: "p", "id": "domTestElementObject", style: "width: 250px; color: blue;", innerHTML: "DOM test element" })));

_cut.isTrue("domToElement(); simple element", _.isElement(_.domToElement("<div>Hello world!</div>")));

_cut.isTrue("domToElement(); complex element",
  _.isElement(_.domToElement("<p><span style=\"background-color: yellow; color: blue;\">Hello</span> <span style=\"background-color: blue; color: yellow;\">world</span>!</p>").firstElementChild)
);

_.domSetCSS(domTestElement, "width", "300px");
_cut.isEqual("domSetCSS(); property and domGetCSS();", "300px", _.domGetCSS(domTestElement, "width"));
//_cut.log("<code>Result / Expected: \""+_.domGetCSS(domTestElement, "width")+"\" / \"300px\" </code>");
_.domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
_cut.isEqual("domSetCSS(); properties object and domGetCSS();",
  "350px", _.domGetCSS(domTestElement, "width")
);
_cut.isEqual("domSetCSS(); properties object and domGetCSS() object;",
  "350px", _.domGetCSS(domTestElement)["width"]
);
//_cut.log("<code>Result / Expected: \""+_.domGetCSS(domTestElement, "width")+"\" / \"350px\" </code>");

_.domHide(domTestElement);
_cut.isEqual("domHide();", "none", _.domGetCSS(domTestElement, "display"));

_.domShow(domTestElement);
_cut.isEqual("domShow();", "block", _.domGetCSS(domTestElement, "display"));

_.domHide(domTestElement);
_.domShow(domTestElement, "inline-block");
_cut.isEqual("domShow(); inline-block", "inline-block", _.domGetCSS(domTestElement, "display"));

_.domToggle(domTestElement);
_cut.isEqual("domToggle(); hide", "none", _.domGetCSS(domTestElement, "display"));

_.domToggle(domTestElement);
_cut.isEqual("domToggle(); show", "block", _.domGetCSS(domTestElement, "display"));

_.domToggle(domTestElement, "inline-block");
_cut.isEqual("domToggle(); hide inline-block", "none", _.domGetCSS(domTestElement, "display"));

_.domToggle(domTestElement, "inline-block");
_cut.isEqual("domHide(); show inline-block", "inline-block", _.domGetCSS(domTestElement, "display"));

_.domShow(domTestElement);
_cut.isFalse("domIsHidden(); false", _.domIsHidden(domTestElement));
_.domHide(domTestElement);
_cut.isTrue("domIsHidden(); true", _.domIsHidden(domTestElement));

_cut.addElement(
  _.domCreate("div", {"id": "dsDiv"},
    '<p id="dsDivP1">#dsDivP1</p>'
      +'<p id="dsDivP2">#dsDivP2</p>'
      +'<p id="dsDivP3">#dsDivP3</p>'
      +'<p id="dsDivP4">#dsDivP4</p>'
      +'<p id="dsDivP5">#dsDivP5</p>'
 )
);
var dsArray = _.domSiblings(_.qs("#dsDivP3"));
_cut.isTrue("domSiblings();", (
  Array.isArray(dsArray) 
    && dsArray.length === 4
    && dsArray[0].innerHTML === "#dsDivP1"
    && dsArray[1].innerHTML === "#dsDivP2"
    && dsArray[2].innerHTML === "#dsDivP4"
    && dsArray[3].innerHTML === "#dsDivP5"
));
var dsArray = _.domSiblingsPrev(_.qs("#dsDivP3"));
_cut.isTrue("domSiblingsPrev();", (
  Array.isArray(dsArray) 
    && dsArray.length === 2
    && dsArray[0].innerHTML === "#dsDivP1"
    && dsArray[1].innerHTML === "#dsDivP2"
));
_cut.isEqual("domSiblingsLeft();", _.domSiblingsLeft, _.domSiblingsPrev);
var dsArray = _.domSiblingsNext(_.qs("#dsDivP3"));
_cut.isTrue("domSiblingsNext();", (
  Array.isArray(dsArray) 
    && dsArray.length === 2
    && dsArray[0].innerHTML === "#dsDivP4"
    && dsArray[1].innerHTML === "#dsDivP5"
));
_cut.isEqual("domSiblingsRight();", _.domSiblingsRight, _.domSiblingsNext);
_.qs("#dsDiv").remove();


/* Collections */

_cut.addElement("hr");
_cut.addElement("h3", "Collections");

_cut.isEqual(
  "withOut();",
  JSON.stringify(_.withOut(["a","b","c","d"], ["b","d"])),
   "[\"a\",\"c\"]"
);

var arrPartition = [-5, 2, -9, 7, 34];
_cut.isEqual(
  "partition();",
  JSON.stringify(_.partition(arrPartition, (e) => (e > 0) )),
  "[[2,7,34],[-5,-9]]"
);
_cut.isEqual(
  "groupBy();",
  JSON.stringify(_.groupBy(arrPartition, (e) => (e > 0) )),
  "[[2,7,34],[-5,-9]]"
);

_cut.isTrue(
  "initial();",
  _.isSameArray(_.initial(["a","b","c","d"]), ["a","b","c"])
);

var sum = "";
for (let x of _.iterRange(10, 3, 20)) { sum += x; }
_cut.isEqual("iterRange(); integer", "10131619", sum);
sum = "";
for (let x of _.iterRange(10, 3.5, 20)) { sum += x; }
_cut.isEqual("iterRange(); float", "1013.517", sum);

sum = "";
for (let x of _.iterCycle(["a", "b", "c"], 4)) { sum += x; }
_cut.isEqual("iterCycle(); array", "abcabcabcabc", sum);
sum = "";
for (let x of _.iterCycle(_.iterRange(10, 3, 20), 3)) { sum += x; }
_cut.isEqual("iterCycle(); + iterRange();", "101316191013161910131619", sum);
sum = "";
let itrr1 = _.iterCycle(['A', 'B'].values());
for (let i = 0; i < 7; i++) { sum += itrr1.next().value; }
_cut.isEqual("iterCycle(); infinity", "ABABABA", sum);

sum = "";
for (let x of _.iterRepeat("HW", 5)) { sum += x; }
_cut.isEqual("iterRepeat();", "HWHWHWHWHW", sum);
sum = "";
let itrr2 = _.iterRepeat('HW2');
for (let i = 0; i < 3; i++) { sum += itrr2.next().value; }
_cut.isEqual("iterRepeat(); infinity", "HW2HW2HW2", sum);


var FPArray = [1,2,3];

var forEachStr = "";
_.forEach(FPArray, function (e) { forEachStr += (e*2); });
_cut.isEqual("forEach(); 1 ES5 Array", "246", forEachStr);
forEachStr = "";
_.forEach("cat, dog, pig", function (e) { forEachStr += e.toUpperCase(); });
_cut.isEqual("forEach(); 2 ES5 String", "CAT, DOG, PIG", forEachStr);
var forEachCount = 0;
_.forEach(document.querySelectorAll("h3"), function (e) { forEachCount++; });
_cut.isEqual("forEach(); 3 ES5 Nodelist",
  document.querySelectorAll("h3").length, forEachCount
);
forEachStr = "";
_.forEach(
  new Map([ ["foo", 3.14], ["bar", 42], ["baz", "Wilson"] ]),
  function (e,i) { forEachStr += i + "-" + e + "-"; }
);
_cut.isEqual("forEach(); 5 ES6 Map", "0-foo,3.14-1-bar,42-2-baz,Wilson-", forEachStr);
forEachCount = 0;
_.forEach(new Set([4,5,6]), function (e) { forEachCount += (e*3); });
_cut.isEqual("forEach(); 6 ES6 Set", 45, forEachCount);
forEachCount = 0;
_.forEach((new Set([4,5,6])).values(), function (e) { forEachCount += (e*3); });
_cut.isEqual("forEach(); 7 ES6 Set values(); iterator", 45, forEachCount);


var mapStr = "";
for (let item of _.map([1,2,3], function(e) { return e*2; })) {
  mapStr += item;
}
_cut.isEqual("map(); 1 ES5 Array", "246", mapStr);
var mapStr = "";
for (let item of _.map("cat, dog, pig", function (e) { return e.toUpperCase(); })) {
  mapStr += item;
}
_cut.isEqual("map(); 2 ES5 String", "CAT, DOG, PIG", mapStr);

var mapNL = [];
for (let item of _.map(document.querySelectorAll("h3"), function (e) { return e; })) {
  mapNL.push(item);
}
_cut.isTrue("map(); 3 ES5 Nodelist",
  Array.isArray(mapNL) && mapNL.every(function(e) { return _.isElement(e); })
);
var mapStr = "";
for (let item of _.map(
  new Map([ ["foo", 1], ["bar", 2], ["baz", 3] ]),
  function(e) { return [ e[0], e[1]*2 ]; }
)) { mapStr += item[0] + item[1]; }
_cut.isEqual("map(); 5 ES6 Map", "foo2bar4baz6", mapStr);
var mapStr = "";
for (let item of _.map(new Set([1,2,3]), function(e) { return e*2; })) {
  mapStr += item;
}
_cut.isEqual("map(); 6 ES6 Set", "246", mapStr);
var mapStr = "";
for (let item of _.map((new Set([1,2,3])).values(), function(e) { return e*3; })) {
  mapStr += item;
}
_cut.isEqual("map(); 7 ES6 Set values(); iterator", "369", mapStr);


var FParray2 = ["A","B","C","D","E","F","G","H","I","J"];

var iterStr = "";
for (let item of _.take(FParray2, 0)) { iterStr += item; }
_cut.isEqual("take(); - step 1 - 0", "", iterStr);
var iterStr = "";
for (let item of _.take(FParray2, 7)) { iterStr += item; }
_cut.isEqual("take(); - step 2 - 7", "ABCDEFG", iterStr);
var iterStr = "";
for (let item of _.take(FParray2, 12)) { iterStr += item; }
_cut.isEqual("take(); - step 3 - 12", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of _.take(FParray2)) { iterStr += item; }
_cut.isEqual("take(); - step 4 - default 1", "A", iterStr);

var iterStr = "";
for (let item of _.drop(FParray2, 0)) { iterStr += item; }
_cut.isEqual("drop(); - step 1 - 0", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of _.drop(FParray2, 7)) { iterStr += item; }
_cut.isEqual("drop(); - step 2 - 7", "HIJ", iterStr);
var iterStr = "";
for (let item of _.drop(FParray2, 12)) { iterStr += item; }
_cut.isEqual("drop(); - step 3 - 12", "", iterStr);
var iterStr = "";
for (let item of _.drop(FParray2)) { iterStr += item; }
_cut.isEqual("drop(); - step 4 - default 1", "BCDEFGHIJ", iterStr);


var FPArray3 = [1,2,3,4,5,6,7,8,9,10];

var iterStr = "";
for (let item of _.filter(FPArray3, (v) => (v>3 && v<9))) {
  iterStr += item;
}
_cut.isEqual("filter();", "45678", iterStr);


var iterStr = "";
for (let item of _.slice(FPArray3,0,4)) { iterStr += item; }
_cut.isEqual("slice(); - step 1 - 0 to 4", "12345", iterStr);
var iterStr = "";
for (let item of _.slice(FPArray3,5)) { iterStr += item; }
_cut.isEqual("slice(); - step 2 - 5 to Infinity", "678910", iterStr);
var iterStr = "";
for (let item of _.slice(FPArray3,4,8)) { iterStr += item; }
_cut.isEqual("slice(); - step 3 - 4 to 8", "56789", iterStr);
var iterStr = "";
for (let item of _.slice(FPArray3)) { iterStr += item; }
_cut.isEqual("slice(); - step 4 - all", "12345678910", iterStr);

var iterStr = "";
for (let item of _.tail(FPArray3)) { iterStr += item; }
_cut.isEqual("tail();", "2345678910", iterStr);

let whileArray = [0,2,4,6,8,10,12,14,16];

var whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<10))) { whileSum += item; }
_cut.isEqual("takeWhile(); values", whileSum, 20);
whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<0))) { whileSum += item; }
_cut.isEqual("takeWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<30))) { whileSum += item; }
_cut.isEqual("takeWhile(); full list", whileSum, 72);

whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<10))) { whileSum += item; }
_cut.isEqual("dropWhile(); values", whileSum, 52);
whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<30))) { whileSum += item; }
_cut.isEqual("dropWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<0))) { whileSum += item; }
_cut.isEqual("dropWhile(); full list", whileSum, 72);

_cut.isEqual("item(); string unicode",
  _.item("foo \uD834\uDF06 bar", 4)
    + _.item("foo \uD834\uDF06 bar", 8)
    + _.item("foo \uD834\uDF06 bar", 12),
  "\uD834\uDF06" + "r" + "undefined"
);
let itemOfArray = [4,5,6,7,8];
_cut.isEqual("item(); array",
  "" + _.item(itemOfArray, 3) + _.item(itemOfArray, 12),
  "7" + "undefined"
);
let itemOfMap = new Map([ ["a",1], ["b",2], ["c",3] ]);
_cut.isEqual("item(); map",
  JSON.stringify(_.item(itemOfMap, 1)) + _.item(itemOfMap, 12),
  "[\"b\",2]" + "undefined"
);
let itemOfSet = new Set([3,3,4,5,5,6,7,7,8]);
_cut.isEqual("item(); set",
  "" + JSON.stringify(_.item(itemOfSet, 3)) + _.item(itemOfSet, 12),
  "6" + "undefined"
);
_cut.isEqual("nth();", _.nth, _.item);

let sizeLastArray = [4,5,6,7,8,"last"];
_cut.isEqual("size();", 6, _.size(sizeLastArray));
_cut.isEqual("first();", 4, _.first(sizeLastArray));
_cut.isEqual("head();", 4, _.head(sizeLastArray));
_cut.isEqual("last();", "last", _.last(sizeLastArray));

let reverseSortArray = ["first",4,5,6,7,8,9,"last"];

_cut.isEqual("reverse();", "[\"last\",9,8,7,6,5,4,\"first\"]",
  JSON.stringify([..._.reverse(reverseSortArray)])
);

_cut.isEqual("sort(); without numberShort", "[4,5,6,7,8,9,\"first\",\"last\"]",
  JSON.stringify([..._.sort(reverseSortArray)])
);
//_cut.log(`<code>${JSON.stringify([..._.sort(reverseSortArray)])}</code>`)
_cut.isEqual("sort(); with numberShort", "[\"first\",4,5,6,7,8,9,\"last\"]",
  JSON.stringify([..._.sort(reverseSortArray, true)])
);
//_cut.log(`<code>${JSON.stringify([..._.sort(reverseSortArray, true)])}</code>`)
_cut.isEqual("sort(); numbers without numberShort", "[1,10,7,9]",
  JSON.stringify([..._.sort([7,1,10,9])])
);
//_cut.log(`<code>${JSON.stringify([..._.sort([7,1,10,9])])}</code>`);
_cut.isEqual("sort(); numbers with numberShort", "[1,7,9,10]",
  JSON.stringify([..._.sort([7,1,10,9], true)])
);
//_cut.log(`<code>${JSON.stringify([..._.sort([7,1,10,9], true)])}</code>`);

const shuffledReverseSortArray = _.shuffle(reverseSortArray);
_cut.isFalse("shuffle();",
  _.isSameArray(reverseSortArray, shuffledReverseSortArray)
);
//_cut.log(`<code>${JSON.stringify(reverseSortArray)}</code> -> <code>${JSON.stringify(shuffledReverseSortArray)}</code>`);

_cut.isTrue("includes(); true", _.includes(reverseSortArray, "last"));
_cut.isFalse("includes(); false", _.includes(reverseSortArray, "world"));

_cut.isEqual("find(); found", 6, _.find(reverseSortArray, (v) => (v > 5)));
_cut.isEqual("find(); not found", undefined,
  _.find(reverseSortArray, (v) => (v > 11))
);

var everySomeNoneArray = [2,9,3,5,8];
var everySomeNoneEmptyArray = [];
_cut.isTrue("every(); true", _.every(everySomeNoneArray, (v) => v > 1));
_cut.isFalse("every(); false 1 - some", _.every(everySomeNoneArray, (v) => v > 3));
_cut.isFalse("every(); false 1 - none", _.every(everySomeNoneArray, (v) => v < 0));
_cut.isFalse("every(); false 3 - empty", _.every(everySomeNoneEmptyArray, (v) => v > 3));
_cut.isTrue("some(); true", _.some(everySomeNoneArray, (v) => v > 3));
_cut.isFalse("some(); false 1 - none", _.some(everySomeNoneArray, (v) => v < 0));
_cut.isFalse("some(); false 2 - empty", _.some(everySomeNoneEmptyArray, (v) => v < 0));
_cut.isTrue("none(); true", _.none(everySomeNoneArray, (v) => v < 0));
_cut.isFalse("none(); false 1 - every", _.none(everySomeNoneArray, (v) => v > 1));
_cut.isFalse("none(); false 2 - some", _.none(everySomeNoneArray, (v) => v > 3));
_cut.isFalse("none(); false 3 - empty", _.none(everySomeNoneEmptyArray, (v) => v > 3));


FParray2.reverse();

var iterStr = "";
for (let item of _.takeRight(FParray2, 0)) { iterStr += item; }
_cut.isEqual("takeRight(); - step 1 - 0", "", iterStr);
var iterStr = "";
for (let item of _.takeRight(FParray2, 7)) { iterStr += item; }
_cut.isEqual("takeRight(); - step 2 - 7", "ABCDEFG", iterStr);
var iterStr = "";
for (let item of _.takeRight(FParray2, 12)) { iterStr += item; }
_cut.isEqual("takeRight(); - step 3 - 12", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of _.takeRight(FParray2)) { iterStr += item; }
_cut.isEqual("takeRight(); - step 4 - default 1", "A", iterStr);

var iterStr = "";
for (let item of _.dropRight(FParray2, 0)) { iterStr += item; }
_cut.isEqual("dropRight(); - step 1 - 0", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of _.dropRight(FParray2, 7)) { iterStr += item; }
_cut.isEqual("dropRight(); - step 2 - 7", "HIJ", iterStr);
var iterStr = "";
for (let item of _.dropRight(FParray2, 12)) { iterStr += item; }
_cut.isEqual("dropRight(); - step 3 - 12", "", iterStr);
var iterStr = "";
for (let item of _.dropRight(FParray2)) { iterStr += item; }
_cut.isEqual("dropRight(); - step 4 - default 1", "BCDEFGHIJ", iterStr);


whileArray.reverse();

var whileSum = 0;
for (let item of _.takeRightWhile(whileArray, (e) => (e<10))) {
  whileSum += item;
}
_cut.isEqual("takeRightWhile(); values", whileSum, 20);
whileSum = 0;
for (let item of _.takeRightWhile(whileArray, (e) => (e<0))) {
  whileSum += item;
}
_cut.isEqual("takeRightWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of _.takeRightWhile(whileArray, (e) => (e<30))) {
  whileSum += item;
}
_cut.isEqual("takeRightWhile(); full list", whileSum, 72);

whileSum = 0;
for (let item of _.dropRightWhile(whileArray, (e) => (e<10))) {
  whileSum += item;
}
_cut.isEqual("dropRightWhile(); values", whileSum, 52);
whileSum = 0;
for (let item of _.dropRightWhile(whileArray, (e) => (e<30))) {
  whileSum += item;
}
_cut.isEqual("dropRightWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of _.dropRightWhile(whileArray, (e) => (e<0))) {
  whileSum += item;
}
_cut.isEqual("dropRightWhile(); full list", whileSum, 72);


_cut.isEqual("concat(); one", "[4,5,6]",
  JSON.stringify([..._.concat([4,5,6])])
);
_cut.isEqual("concat(); more", "[\"1\",\"2\",\"3\",4,5,6,7,8,9]",
  JSON.stringify([..._.concat("123", [4,5,6].values(), new Set([7,8,9]))])
);

let reduceArray = [4,5,6,7,8,9];
_cut.isEqual("reduce(); with initialvalue", 39,
  _.reduce(reduceArray.values(), (acc, v, i) => acc + v, 0)
);
_cut.isEqual("reduce(); without initialvalue", 39,
  _.reduce(reduceArray.values(), (acc, v, i) => acc + v)
);

_cut.isEqual("enumerate();",
  JSON.stringify([..._.enumerate(["Picard","Riker","Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]"
);
_cut.isEqual("enumerate(); with offset",
  JSON.stringify([..._.enumerate(["Picard","Riker","Data"],2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]"
);
_cut.isEqual("entries();",
  JSON.stringify([..._.entries(["Picard","Riker","Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]"
);
_cut.isEqual("entries(); with offset",
  JSON.stringify([..._.entries(["Picard","Riker","Data"],2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]"
);

_cut.isEqual("flat();",
  "[1,2,3,4,5,6,7,8,9]",
  JSON.stringify([...
    _.flat([ [1,2,3].values(), new Set([4,5,6,6,7,7,4]), [8, 9] ])
  ])
);

let joinSet = new Set([2,4,6,4,8,2]);
_cut.isEqual("join();",
  "2,4,6,8"+"2468"+"2;4;6;8"+"2abc4abc6abc8"+"2true4true6true8"+"2114116118",
  _.join(joinSet) + _.join(joinSet, "")
    + _.join(joinSet, ";") + _.join(joinSet, "abc")
    + _.join(joinSet, true) + _.join(joinSet, 11)
);
/*
_cut.log("<code>\""+
  _.join(joinSet) + _.join(joinSet, "")
    + _.join(joinSet, ";") + _.join(joinSet, "abc")
    + _.join(joinSet, true) + _.join(joinSet, 11)
	+"\"</code>"
);
*/

var FPArray = [1,2,3];

_cut.isEqual(
  "arrayCycle(); - ES5 1 - with 2 parameters",
  "[4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14]",
  JSON.stringify(_.arrayCycle([4,true,"fgh",3.14], 7))
);
_cut.isEqual("arrayCycle(); - ES5 2 - with default parameter (n = 100);",
  "[4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6]",
  JSON.stringify(_.arrayCycle([4,5,6]))
);
_cut.isEqual("arrayCycle(); - ES6 1 - ES5 1 - with 2 parameters",
  "[2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4]",
  JSON.stringify(_.arrayCycle(new Map([ [2,3],[3,4],[4,5] ]).keys(), 10))
);
_cut.isEqual("arrayCycle(); - ES6 2 - with default parameter (n = 100);",
  "[[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5]]",
  JSON.stringify(_.arrayCycle(new Map([ [2,3],[3,4],[4,5] ]).entries()))
);

_cut.isEqual("arrayRepeat(); - 1 - with 2 parameters",
  "[\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\"]",
  JSON.stringify(_.arrayRepeat("abc", 8))
);
_cut.isEqual("arrayRepeat(); - 2 - with default parameter (n = 100);",
  "[3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14]",
  JSON.stringify(_.arrayRepeat(3.14))
);

_cut.isEqual("arrayRange(); - 1 - step default 1",
  "[5,6,7,8,9,10,11,12]", JSON.stringify(_.arrayRange(5,12))
);
_cut.isEqual("arrayRange(); - 2 - step 3",
  "[1,4,7,10,13,16]", JSON.stringify(_.arrayRange(1,16,3))
);
_cut.isEqual("arrayRange(); - 3 - step 3.2 <i>(can be failed - float storage)<i>",
  "[1,4.2,7.4,10.600000000000001,13.8,17]", JSON.stringify(_.arrayRange(1,17,3.2))
);
//_cut.log("<code>"+JSON.stringify(_.arrayRange(1,17,3.2))+"</code>");
_cut.isEqual("arrayRange(); - 4 - without parameters",
  "[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]",
  JSON.stringify(_.arrayRange())
);
_cut.isEqual("arrayRange(); - 4 - with 1 parameter",
  "[42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]",
  JSON.stringify(_.arrayRange(42))
);

var a = ["a","b","c","d"];
var b = [3,4,5,6,7,8,9];
var zipA = ["a1","a2","a3"];
var zipB = ["b1","b2","b3"];
var zipC = ["c1","c2","c3","c4","c5"];
var zipD = ["d1","d2"];
var zipE = ["e1","e2","e3","e4"];
var zipF = ["a","b","c","d"];
_cut.isEqual("zip(); ES5 1",
  "[[\"a1\",\"c1\"],[\"a2\",\"c2\"],[\"a3\",\"c3\"]]",
  JSON.stringify(_.zip(zipA, zipC))
);
//_cut.log("<code>"+JSON.stringify(_.zip(zipA, zipC))+"</code>");
_cut.isEqual("zip(); ES5 2",
  "[[\"a1\",\"b1\",\"c1\",\"d1\",\"e1\"],[\"a2\",\"b2\",\"c2\",\"d2\",\"e2\"]]",
  JSON.stringify(_.zip(zipA, zipB, zipC, zipD, zipE))
);
//_cut.log("<code>"+JSON.stringify(_.zip(zipA, zipB, zipC, zipD, zipE))+"</code>");
_cut.isEqual("zip(); ES6 1",
  "[[\"a\",3],[\"b\",4],[\"c\",5],[\"d\",6]]",
  JSON.stringify(_.zip(
    new Set(a), new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values()
 ))
);
/*
_cut.log(
  "<code>"+JSON.stringify(_.zip(
    new Set(a), new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values())
  )
  +"</code>"
);
*/
_cut.isEqual("zip(); ES6 2",
  "[[\"a\",3,\"c1\"],[\"b\",4,\"c2\"],[\"c\",5,\"c3\"],[\"d\",6,\"c4\"]]",
  JSON.stringify(_.zip(
    new Set(zipF),
    new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values(),
    zipC.values()
  ))
);
/*
_cut.log(
  "<code>"+JSON.stringify(_.zip(
    new Set(zipF),
    new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values(),
    zipC.values()
  ))
  +"</code>"
);
*/


_cut.isEqual("unzip(); ES5",
  "[[\"a1\",\"a2\"],[\"b1\",\"b2\"],[\"c1\",\"c2\"],[\"d1\",\"d2\"],[\"e1\",\"e2\"]]",
  JSON.stringify(_.unzip(_.zip(zipA, zipB, zipC, zipD, zipE)))
);
/*
_cut.log(
  "<code>"+
  JSON.stringify(_.unzip(_.zip(zipA, zipB, zipC, zipD, zipE)))
  +"</code>"
);
*/
_cut.isEqual("unzip(); ES6",
  "[[\"a\",\"b\",\"c\",\"d\"],[3,4,5,6],[\"c1\",\"c2\",\"c3\",\"c4\"]]",
  JSON.stringify(
    _.unzip(
      _.zip(
        new Set(zipF),
        new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values(),
        zipC.values()
      ).values()
    )
  )
);
/*
_cut.log(
  "<code>"+
  JSON.stringify(
    _.unzip(
      _.zip(
        new Set(zipF),
        new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values(),
        zipC.values()
      ).values()
    )
  )
  +"</code>"
);
*/

var a = [21,11,41,51,31];
_cut.isEqual("min(); ES5", 11, _.min(a));
//_cut.log("<code>"+_.min(a)+"</code>");
_cut.isEqual("max(); ES5", 51, _.max(a));
//_cut.log("<code>"+_.max(a)+"</code>");
_cut.isEqual("min(); ES6", 11, _.min(new Set(a)));
//_cut.log("<code>"+_.min(new Set(a))+"</code>");
_cut.isEqual("max(); ES6", 51, _.max(new Set(a).keys()));
//_cut.log("<code>"+_.max(new Set(a).keys())+"</code>");
_cut.isEqual("min(); number test", _.min([5, 10, 3]), 3);
_cut.isEqual("max(); number test", _.max([5, 10, 3]), 10);

var superset1 = [3,11,58,95,88];
var superset2 = [88,95,11];
var superset3 = [88,95,11,84];
_cut.isTrue("isSuperset(); - ES5 - true", _.isSuperset(superset1, superset2));
_cut.isFalse("isSuperset(); - ES5 - false", _.isSuperset(superset3, superset1));
_cut.isTrue("isSuperset(); - ES6 - true", _.isSuperset(new Set(superset1), superset2.values()));
_cut.isFalse("isSuperset(); - ES6 - false", _.isSuperset(new Set(superset3).keys(), superset1.keys()));

var a = [21,11,41,51,31];

var a = [1,2,3,4], b = [3,4,5,6], c = [5,6,7,8];
_cut.isEqual(
  "arrayUnion(); ES5", "[1,2,3,4,5,6,7,8]", JSON.stringify(_.arrayUnion(a,b,c))
);
_cut.isEqual(
  "arrayIntersection(); ES5", "[3,4]", JSON.stringify(_.arrayIntersection(a,b))
);
_cut.isEqual(
  "arrayDifference(); ES5", "[1,2]", JSON.stringify(_.arrayDifference(a,b))
);
_cut.isEqual("arraySymmetricDifference(); ES5",
  "[1,2,5,6]", JSON.stringify(_.arraySymmetricDifference(a,b))
);
try {
  _cut.isEqual("arrayUnion(); ES6", "[1,2,3,4,5,6,7,8]",
    JSON.stringify(_.arrayUnion(new Set(a),b.values(),new Set(c).values()))
  );
  _cut.isEqual("arrayIntersection(); ES6", "[3,4]",
    JSON.stringify(_.arrayIntersection(a.values(),new Set(b)))
  );
  _cut.isEqual("arrayDifference(); ES6", "[1,2]",
    JSON.stringify(
      _.arrayDifference(new Map([[1,2],[2,3],[3,4],[4,5]]).keys(),b.values())
    )
  );
  _cut.isEqual("arraySymmetricDifference(); ES6", "[1,2,5,6]",
    JSON.stringify(_.arraySymmetricDifference(
      new Set(a).keys(), new Map([[1,3],[2,4],[3,5],[4,6]]).values()
    ))
  );
} catch (e) {alert(e);}

function __setEquals__(set1, set2) {
  if (!_.isSet(set1) || !_.isSet(set2)) { return false; }
  if (set1.size !== set2.size) { return false; }
  if (JSON.stringify(Array.from(set1)) !== JSON.stringify(Array.from(set2))) {
    return false;
  }
  return true;
}
var a = [1,2,3,4], b = [3,4,5,6], c = [5,6,7,8];
var sa = new Set(a), sb = new Set(b), sc = new Set(c);
_cut.isTrue("setUnion(); ES6",
  __setEquals__(
    _.setUnion(new Map([ [2,1],[3,2],[4,3],[5,4] ]).values(),sb,c),
    _.setUnion(a,new Map([ [2,3],[3,4],[4,5],[5,6] ]).values(),sc.values())
  )
);
_cut.isTrue("setIntersection(); ES6",
  __setEquals__(new Set([3,4]), _.setIntersection(sa,sb))
);
_cut.isTrue("setDifference(); ES6",
  __setEquals__(new Set([1,2]), _.setDifference(sa,sb))
);
_cut.isTrue("setSymmetricDifference(); ES6",
  __setEquals__(new Set([1,2,5,6]), _.setSymmetricDifference(sa,sb))
);

var arrTestClearRemove1 = [1,2,3,4,5,6,7,8,9,0];
var arrTestClearRemove2 = _.arrayClear(arrTestClearRemove1);
_cut.isTrue("arrayClear();",
  (arrTestClearRemove1 === arrTestClearRemove2
    && arrTestClearRemove1.length === 0
    && Array.isArray(arrTestClearRemove1)
 )
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isTrue("arrayRemove(); - 1 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 6)
);
_cut.isFalse("arrayRemove(); - 1 found - not all - false",
  _.arrayRemove(arrTestClearRemove1, 6)
);
_cut.isEqual("arrayRemove(); - 1 found - not all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1)
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isTrue("arrayRemove(); - 1 found - all - true",
  _.arrayRemove(arrTestClearRemove1, 6, true)
);
_cut.isFalse("arrayRemove(); - 1 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 6, true)
);
_cut.isEqual("arrayRemove(); - 1 found - all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1)
);


var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isTrue("arrayRemove(); - 3 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 5)
);
_cut.isTrue("arrayRemove(); - 3 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 5, false)
);
_cut.isEqual("arrayRemove(); - 3 found - not all - value check",
  "[1,2,3,4,6,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1)
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isTrue("arrayRemove(); - 3 found - all - true",
  _.arrayRemove(arrTestClearRemove1, 5, true)
);
_cut.isFalse("arrayRemove(); - 3 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 5, true)
);
_cut.isEqual("arrayRemove(); - 3 found - all - value check",
  "[1,2,3,4,6,7,8,9,0]", JSON.stringify(arrTestClearRemove1)
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isFalse("arrayRemove(); - 0 found - not all - false",
  _.arrayRemove(arrTestClearRemove1, 11)
);
_cut.isFalse("arrayRemove(); - 0 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 11, true)
);
_cut.isEqual("arrayRemove(); - 0 found - value check",
  "[1,2,3,4,5,6,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1)
);

_cut.isEqual("arrayUnique(); 1 ES5 - Array and String",
  JSON.stringify(_.arrayUnique(
    ["A","r","r","a","y","y","a","n","d","d","M","M","a","p"]
 )),
  JSON.stringify(_.arrayUnique("ArrayyanddMMap"))
);
_cut.isEqual("arrayUnique(); 2 ES6 - Array and Set",
  JSON.stringify(_.arrayUnique([1,2,2,3,4,4,5,6,6,7])),
  JSON.stringify(_.arrayUnique(new Set([1,2,2,3,4,4,5,6,6,7])))
);
_cut.isEqual("arrayUnique(); 3 ES6 - Array and Map values(); iterator",
  JSON.stringify(_.arrayUnique([1,2,2,3,4,4,5,6,6,7])),
  JSON.stringify(
    _.arrayUnique(
      (new Map([
        ["foo1", 1], ["bar1", 2], ["baz1", 2], ["foo2", 3], ["bar2", 4],
        ["baz2", 4], ["foo3", 5], ["bar3", 6], ["baz3", 6], ["foo4", 7]
      ])).values()
    )
  )
);

var arrayAddTest = [1,2,3,5];
_cut.isTrue("arrayAdd(); true", _.arrayAdd(arrayAddTest, 4));
_cut.isFalse("arrayAdd(); false", _.arrayAdd(arrayAddTest, 4));
_cut.isEqual("arrayAdd(); value check", "[1,2,3,5,4]", JSON.stringify(arrayAddTest));

var arrMerge1 = [1,2,3];
var arrMerge2 = [4,5,6];
var arrMerge3 = [7,8,[10,11,12,[13,14,15]],9];
var arrMergeStr = JSON.stringify(_.arrayMerge(arrMerge1, arrMerge2));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(_.arrayMerge(arrMerge1, arrMerge2, arrMerge3));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(_.arrayMerge(false, arrMerge1, arrMerge2, arrMerge3));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(_.arrayMerge(true, arrMerge1, arrMerge2, arrMerge3));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(_.arrayMerge(true, [], arrMerge1, arrMerge3, 42, 3.14));
_cut.isEqual("arrayMerge();",
  "[1,2,3,4,5,6]"
    + "[1,2,3,4,5,6]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
    + "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
    + "[1,2,3,4,5,6,7,8,10,11,12,13,14,15,9]"
    + "[1,2,3,4,5,6,7,8,10,11,12,13,14,15,9]"
    + "[1,2,3,7,8,10,11,12,13,14,15,9,42,3.14]",
  arrMergeStr
);


/* cookie */

_cut.addElement("hr");
_cut.addElement("h3", "cookie");

_.setCookie("ctest3", "cookieUnitTestStr");
_cut.isTrue("setcookie(); + hasCookie(); true", _.hasCookie("ctest3"));
_cut.isEqual("getCookie(name) value", "cookieUnitTestStr", _.getCookie("ctest3"));
_cut.isEqual("getCookie();", "cookieUnitTestStr", _.getCookie()["ctest3"]);
_cut.isTrue("removeCookie(); true", _.removeCookie("ctest3"));
_cut.isFalse("removeCookie(); false", _.removeCookie("ctest3"));
_cut.isFalse("hasCookie(); false", _.hasCookie("ctest3"));
_cut.isEqual("getCookie(name) null", null, _.getCookie("ctest3"));
_cut.isEqual("getCookie(); undefined", undefined, _.getCookie()["ctest3"]);

var cookieClearStr = "";
_.setCookie("ctest4", "cookieUnitTestStr");
_.setCookie("ctest5", "cookieUnitTestStr");
cookieClearStr += String(_.hasCookie("ctest4")) + String(_.hasCookie("ctest5"));
_.clearCookies();
cookieClearStr += String(_.hasCookie("ctest4")) + String(_.hasCookie("ctest5"));
_cut.isEqual("clearCookies();", "truetruefalsefalse", cookieClearStr);


/* cookie with settings object */

_cut.addElement("hr");
_cut.addElement("h3", "cookie with settings object");

_.setCookie({"name": "ctest3", "value": "cookieUnitTestStr", "SameSite": "Lax"});
_cut.isTrue("setcookie(); + hasCookie(); true", _.hasCookie("ctest3"));
_cut.isEqual("getCookie(name) value", "cookieUnitTestStr", _.getCookie("ctest3"));
_cut.isEqual("getCookie();", "cookieUnitTestStr", _.getCookie()["ctest3"]);
_cut.isTrue("removeCookie(); true", _.removeCookie({"name": "ctest3", "SameSite": "Lax"}));
_cut.isFalse("removeCookie(); false", _.removeCookie({"name": "ctest3", "SameSite": "Lax"}));
_cut.isFalse("hasCookie(); false", _.hasCookie("ctest3"));
_cut.isEqual("getCookie(name) null", null, _.getCookie("ctest3"));
_cut.isEqual("getCookie(); undefined", undefined, _.getCookie()["ctest3"]);

var cookieClearStr = "";
_.setCookie({"name": "ctest4", "value": "cookieUnitTestStr", "SameSite": "Lax"});
_.setCookie({"name": "ctest5", "value": "cookieUnitTestStr", "SameSite": "Lax"});
cookieClearStr += String(_.hasCookie("ctest4")) + String(_.hasCookie("ctest5"));
_.clearCookies({"SameSite": "Lax"});
cookieClearStr += String(_.hasCookie("ctest4")) + String(_.hasCookie("ctest5"));
_cut.isEqual("clearCookies();", "truetruefalsefalse", cookieClearStr);



/* polyfills */

_cut.addElement("hr");
_cut.addElement("h3", "polyfills");

var arrayAt = [4,5,6,7,8];
var arrayAtStr = ""
  + arrayAt.at(0)
  + arrayAt.at(1)
  + arrayAt.at(2)
  + arrayAt.at(3)
  + arrayAt.at(4)
  + arrayAt.at(5)
  + arrayAt.at(-0)
  + arrayAt.at(-1)
  + arrayAt.at(-2)
  + arrayAt.at(-3)
  + arrayAt.at(-4)
  + arrayAt.at(-5)
  + arrayAt.at(-6);
_cut.isEqual("Array.prototype.at();",
  arrayAtStr,
  "45678undefined487654undefined"
);
//_cut.log(`<code>"${arrayAtStr}"</code>`);

var arraylikeAt = {0:4, 1:5, 2:6, 3:7, 4:8, length:5};
var arralikeAtStr = ""
  + Array.prototype.at.call(arraylikeAt,0)
  + Array.prototype.at.call(arraylikeAt,1)
  + Array.prototype.at.call(arraylikeAt,2)
  + Array.prototype.at.call(arraylikeAt,3)
  + Array.prototype.at.call(arraylikeAt,4)
  + Array.prototype.at.call(arraylikeAt,5)
  + Array.prototype.at.call(arraylikeAt,-0)
  + Array.prototype.at.call(arraylikeAt,-1)
  + Array.prototype.at.call(arraylikeAt,-2)
  + Array.prototype.at.call(arraylikeAt,-3)
  + Array.prototype.at.call(arraylikeAt,-4)
  + Array.prototype.at.call(arraylikeAt,-5)
  + Array.prototype.at.call(arraylikeAt,-6);
_cut.isEqual("Array.prototype.at(); - arraylike object",
  arralikeAtStr,
  "45678undefined487654undefined"
);
//_cut.log(`<code>"${arralikeAtStr}"</code>`);

var stringAt = "45678";
var stringAtStr = ""
  + stringAt.at(0)
  + stringAt.at(1)
  + stringAt.at(2)
  + stringAt.at(3)
  + stringAt.at(4)
  + stringAt.at(5)
  + stringAt.at(-0)
  + stringAt.at(-1)
  + stringAt.at(-2)
  + stringAt.at(-3)
  + stringAt.at(-4)
  + stringAt.at(-5)
  + stringAt.at(-6);
_cut.isEqual("String.prototype.at();",
  stringAtStr,
  "45678undefined487654undefined"
);
//_cut.log(`<code>"${stringAtStr}"</code>`)

var typedarrayAt = new Uint8Array([4,5,6,7,8]);
var typedarrayAtStr = ""
  + typedarrayAt.at(0)
  + typedarrayAt.at(1)
  + typedarrayAt.at(2)
  + typedarrayAt.at(3)
  + typedarrayAt.at(4)
  + typedarrayAt.at(5)
  + typedarrayAt.at(-0)
  + typedarrayAt.at(-1)
  + typedarrayAt.at(-2)
  + typedarrayAt.at(-3)
  + typedarrayAt.at(-4)
  + typedarrayAt.at(-5)
  + typedarrayAt.at(-6);
_cut.isEqual("Uint8Array.prototype.at();",
  typedarrayAtStr,
  "45678undefined487654undefined"
);
//_cut.log(`<code>"${typedarrayAtStr}"</code>`);

var hasOwnObject = {"a": 1, "b": 2};
var hasOwnArray = [4,5,6];
_cut.isEqual(
  "Object.hasOwn();",
  "true false false true false false",
  ""
    + Object.hasOwn(hasOwnObject, "a")
    + " " + Object.hasOwn(hasOwnObject, "hasOwnProperty")
    + " " + Object.hasOwn(hasOwnObject, "c")
    + " " + Object.hasOwn(hasOwnArray, "0")
    + " " + Object.hasOwn(hasOwnArray, "map")
    + " " + Object.hasOwn(hasOwnArray, "map2")
);
/*
_cut.log(
  "<code>"
    + Object.hasOwn(hasOwnObject, "a")
    + " " + Object.hasOwn(hasOwnObject, "hasOwnProperty")
    + " " + Object.hasOwn(hasOwnObject, "c")
    + " " + Object.hasOwn(hasOwnArray, "0")
    + " " + Object.hasOwn(hasOwnArray, "map")
    + " " + Object.hasOwn(hasOwnArray, "map2")
    + "</code>"
);
*/

_cut.isEqual(
  "String.prototype.replaceAll();",
  "aabbcc".replaceAll("b", ".") + "aabbcc".replaceAll(/b/g, '.'),
  "aa..cc" + "aa..cc"
);
/*
_cut.log(
  "<code>"
  + "aabbcc".replaceAll("b", ".")
  + "aabbcc".replaceAll(/b/g, '.')
  + "</code>"
);
*/

if (window.BigInt) {
  _cut.isEqual("BigInt.prototype.toJSON();", '"42"', JSON.stringify(BigInt(42)));
}

var strIterRes = [..."I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion."[Symbol.iterator]()].join("");
_cut.isEqual("String.prototype[Symbol.iterator](); without unicode",
  "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion.",
  strIterRes
);
//_cut.log("<code>" + strIterRes + "</code>");

var strIterRes = [..."I've seen things you people wouldn't believe. \uD834\uDF06 Attack ships on fire off the shoulder of Orion."[Symbol.iterator]()].join("");
_cut.isEqual("String.prototype[Symbol.iterator](); with unicode",
  "I've seen things you people wouldn't believe. \uD834\uDF06 Attack ships on fire off the shoulder of Orion.",
  strIterRes
);
//_cut.log("<code>" + strIterRes + "</code>");

const testGenFn = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
var sum = "";
for (let x of testGenFn(3)) { sum += x; }
_cut.isEqual("GeneratorFunction();", "912", sum);

let afunction = new AsyncFunction("a","b","return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);");
_cut.isEqual("AsyncFunction();", "asyncfunction", _.getType(afunction));
_//cut.log("<code>"+_.getType(afunction)+"</code>");

const regexp = RegExp('foo*','g');
const str = 'table football, foosball';
let matches1 = str.matchAll(regexp);
let resMatchAll1 = "";
for (const item of matches1) { resMatchAll1 += item; }
let matches2 = str.matchAll(regexp);
let resMatchAll2 = JSON.stringify(Array.from(matches2, m => m[0]));
_cut.isTrue("String.prototype.matchAll();",
  (resMatchAll1 === "foofoo" && resMatchAll2 === "[\"foo\",\"foo\"]")
);

var vstr = "";
var vstrit = ["X","Y","Z","X"].values();
vstr += vstrit.next().value
  + vstrit.next().value + vstrit.next().value + vstrit.next().value;
_cut.isEqual("Array.prototype.values();", "XYZX", vstr);

_cut.isEqual("String.fromCodePoint();",
  "*"+"AZ"+"Є",
  String.fromCodePoint(42)+String.fromCodePoint(65,90)+String.fromCodePoint(0x404)
);

_cut.isEqual("String.fromCodePointAt();",
  "66"+"65536"+"undefined",
  ""+"ABC".codePointAt(1)+"\uD800\uDC00".codePointAt(0)+"XYZ".codePointAt(42)
);

_cut.isEqual("Array.prototype.copyWithin();",
  "[1,2,3,1,2]"+"[4,5,3,4,5]"+"[4,2,3,4,5]"+"[1,2,3,3,4]"
  +"{\"0\":1,\"3\":1,\"length\":5}",
  JSON.stringify([1, 2, 3, 4, 5].copyWithin(-2))
    +JSON.stringify([1, 2, 3, 4, 5].copyWithin(0, 3))
    +JSON.stringify([1, 2, 3, 4, 5].copyWithin(0, 3, 4))
    +JSON.stringify([1, 2, 3, 4, 5].copyWithin(-2, -3, -1))
    +JSON.stringify([].copyWithin.call({length: 5, 3: 1}, 0, 3))
);

var objA = {a:1,b:2};
var objB = Object.create(objA);
objB.c = 3;
objB.d = 4;
var objC = Object.create(objB);
var objStr = JSON.stringify(Object.getOwnPropertyDescriptors(objA));
objStr += JSON.stringify(Object.getOwnPropertyDescriptors(objB));
objStr += JSON.stringify(Object.getOwnPropertyDescriptors(objC));
_cut.isEqual("Object.getOwnPropertyDescriptors();",
  '{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"value":2,"writable":true,"enumerable":true,"configurable":true}}'
  +'{"c":{"value":3,"writable":true,"enumerable":true,"configurable":true},"d":{"value":4,"writable":true,"enumerable":true,"configurable":true}}'
  +'{}',
  objStr
);

_cut.isTrue("Element.prototype.matches(); present", !!Element.prototype.matches);
_cut.isTrue("Element.prototype.closest(); present", !!Element.prototype.closest);
_cut.isTrue("Element.prototype.getAttributeNames(); present", !!Element.prototype.getAttributeNames);

_cut.addElement(_.domCreate("input",{id: "etgi1", value: "etgi1"}));
_cut.addElement(_.domCreate("input",{id: "etgi2", value: "etgi2"}));
_cut.addElement(_.domCreate("input",{id: "etgi3", value: "etgi3"}));
_cut.addElement(_.domCreate("input",{id: "etgi4", value: "etgi4", readOnly: true}));
_cut.addElement(_.domCreate("input",{id: "etgi5", value: "etgi5", readOnly: true}));
_cut.addElement(_.domCreate("input",{id: "etgi6", value: "etgi6", readOnly: true}));
var
  etgStr = "",
  etgi1 = document.querySelector("#etgi1"),
  etgi2 = document.querySelector("#etgi2"),
  etgi3 = document.querySelector("#etgi3"),
  etgi4 = document.querySelector("#etgi4"),
  etgi5 = document.querySelector("#etgi5"),
  etgi6 = document.querySelector("#etgi6");
etgStr += etgi1.toggleAttribute("readonly");
etgStr += etgi1.hasAttribute("readonly");
etgStr += etgi1.toggleAttribute("readonly");
etgStr += etgi1.hasAttribute("readonly");
etgStr += etgi2.toggleAttribute("readonly", false);
etgStr += etgi2.hasAttribute("readonly", false);
etgStr += etgi2.toggleAttribute("readonly", false);
etgStr += etgi2.hasAttribute("readonly", false);
etgStr += etgi3.toggleAttribute("readonly", true);
etgStr += etgi3.hasAttribute("readonly", true);
etgStr += etgi3.toggleAttribute("readonly", true);
etgStr += etgi3.hasAttribute("readonly", true);
etgStr += etgi4.toggleAttribute("readonly");
etgStr += etgi4.hasAttribute("readonly");
etgStr += etgi4.toggleAttribute("readonly");
etgStr += etgi4.hasAttribute("readonly");
etgStr += etgi5.toggleAttribute("readonly", false);
etgStr += etgi5.hasAttribute("readonly", false);
etgStr += etgi5.toggleAttribute("readonly", false);
etgStr += etgi5.hasAttribute("readonly", false);
etgStr += etgi6.toggleAttribute("readonly", true);
etgStr += etgi6.hasAttribute("readonly", true);
etgStr += etgi6.toggleAttribute("readonly", true);
etgStr += etgi6.hasAttribute("readonly", true);
_cut.isEqual("Element.prototype.toggleAttribute();",
  "truetruefalsefalse"+"falsefalsefalsefalse"+"truetruetruetrue"
    +"falsefalsetruetrue"+"falsefalsefalsefalse"+"truetruetruetrue",
  etgStr
);
etgi1.remove();
etgi2.remove();
etgi3.remove();
etgi4.remove();
etgi5.remove();
etgi6.remove();

var padStr = "lorem".padStart(10);
padStr += "lorem".padStart(10, "foo") + "lorem".padStart(6,"123465");
padStr += "lorem".padStart(15,"123465") + "lorem".padStart(8, "0");
padStr += "lorem".padStart(1) + "lorem".padStart(NaN);
padStr += "lorem".padStart(15,undefined) + "lorem".padStart(15,null);
padStr += "lorem".padStart(15,true) + "lorem".padStart(15,false);
padStr += "lorem".padStart(15,{a:1}) + "lorem".padStart(15,[]);
padStr += "lorem".padStart(15,[1,2,"c"]) + "lorem".padStart(15,42);
padStr += "lorem".padStart(15,3.14);
_cut.isEqual("String.prototype.padStart();",
  "     lorem"+"foofolorem"+"1lorem"+"1234651234lorem"+"000lorem"+"lorem"
    +"lorem"+"          lorem"+"nullnullnulorem"+"truetruetrlorem"
    +"falsefalselorem"+"[object Oblorem"+"lorem"+"1,2,c1,2,clorem"
    +"4242424242lorem"+"3.143.143.lorem",
  padStr
);

padStr = "lorem".padEnd(10) + "lorem".padEnd(10, "foo");
padStr += "lorem".padEnd(6,"123465") + "lorem".padEnd(15,"123465");
padStr += "lorem".padEnd(8, "0") + "lorem".padEnd(1);
padStr += "lorem".padEnd(NaN) + "lorem".padEnd(15,undefined);
padStr += "lorem".padEnd(15,null) + "lorem".padEnd(15,true);
padStr += "lorem".padEnd(15,false) + "lorem".padEnd(15,{a:1});
padStr += "lorem".padEnd(15,[]) + "lorem".padEnd(15,[1,2,"c"]);
padStr += "lorem".padEnd(15,42) + "lorem".padEnd(15,3.14);
_cut.isEqual("String.prototype.padEnd();",
  "lorem     "+"loremfoofo"+"lorem1"+"lorem1234651234"+"lorem000"+"lorem"
    +"lorem"+"lorem          "+"loremnullnullnu"+"loremtruetruetr"
    +"loremfalsefalse"+"lorem[object Ob"+"lorem"+"lorem1,2,c1,2,c"
    +"lorem4242424242"+"lorem3.143.143.",
  padStr
);

padStr = "ipsum".repeat(0) + "ipsum".repeat(1) + "ipsum".repeat(2) + "ipsum".repeat(3.5);
_cut.isEqual("String.prototype.repeat();",
  ""+"ipsum"+"ipsumipsum"+"ipsumipsumipsum", padStr
);

let objIsStrCount = 1;
var objIsStr = "", isArr = [1,2], isTest = { x: 12 };
objIsStr += " " + objIsStrCount++ + " " + Object.is("lorem", "lorem");
objIsStr += " " + objIsStrCount++ + " " + Object.is(-0, -0);
objIsStr += " " + objIsStrCount++ + " " + Object.is(0, 0);
objIsStr += " " + objIsStrCount++ + " " + Object.is(NaN, 0/0);
objIsStr += " " + objIsStrCount++ + " " + Object.is(NaN, NaN);
objIsStr += " " + objIsStrCount++ + " " + Object.is(42, 42);
objIsStr += " " + objIsStrCount++ + " " + Object.is(3.14, 3.14);
objIsStr += " " + objIsStrCount++ + " " + Object.is(true, true);
objIsStr += " " + objIsStrCount++ + " " + Object.is(false, false);
objIsStr += " " + objIsStrCount++ + " " + Object.is(undefined, undefined);
objIsStr += " " + objIsStrCount++ + " " + Object.is(null, null);
objIsStr += " " + objIsStrCount++ + " " + Object.is(isArr, isArr);
objIsStr += " " + objIsStrCount++ + " " + Object.is(isTest, isTest);
objIsStr += " " + objIsStrCount++ + " " + Object.is(window, window);
objIsStr += " " + objIsStrCount++ + " " + Object.is([], []);
objIsStr += " " + objIsStrCount++ + " " + Object.is([1,2], [1,2]);
objIsStr += " " + objIsStrCount++ + " " + Object.is(isArr, [1,2]);
objIsStr += " " + objIsStrCount++ + " " + Object.is(isTest, { x: 12 });
objIsStr += " " + objIsStrCount++ + " " + Object.is("lorem", "ipsum");
objIsStr += " " + objIsStrCount++ + " " + Object.is("lorem", "Lorem");
objIsStr += " " + objIsStrCount++ + " " + Object.is("lorem", "dolorem");
objIsStr += " " + objIsStrCount++ + " " + Object.is(0, -0) + " ";
_cut.isEqual("Object.is();",
  " 1 true 2 true 3 true 4 true 5 true 6 true 7 true 8 true 9 true 10 true 11 true 12 true 13 true 14 true 15 false 16 false 17 false 18 false 19 false 20 false 21 false 22 false ",
  objIsStr
);
//_cut.log("<code>Result:<br/>\""+objIsStr+"\"</code>");
//_cut.log("<code>Expected:<br/>\" 1 true 2 true 3 true 4 true 5 true 6 true 7 true 8 true 9 true 10 true 11 true 12 true 13 true 14 true 15 false 16 false 17 false 18 false 19 false 20 false 21 false 22 false \"</code>");

var entriesObj = {a: 1, b:2, c: 3};
var entriesStr = JSON.stringify(Object.entries(entriesObj));
var valuesStr = JSON.stringify(Object.values(entriesObj));
entriesObj = {name: "John Smith", age:42, male: true};
entriesStr += JSON.stringify(Object.entries(entriesObj)),
valuesStr += JSON.stringify(Object.values(entriesObj));
_cut.isEqual("Object.entries();",
  '[["a",1],["b",2],["c",3]]' + '[["name","John Smith"],["age",42],["male",true]]',
  entriesStr
);
_cut.isEqual("Object.values();", '[1,2,3]'+'["John Smith",42,true]', valuesStr);

var startStr = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.";
_cut.isEqual("String.prototype.startsWith();", "truefalsetruefalse",
  ""+ startStr.startsWith("Lorem ipsum dolor")
    + startStr.startsWith("consectetuer adipiscing elit")
    + startStr.startsWith("consectetuer adipiscing elit", 28)
    + startStr.startsWith("consectetuer adipiscing elit", 57)
);
_cut.isEqual("String.prototype.endsWith();", "truefalsetruefalse",
  ""+ startStr.endsWith("Aenean commodo ligula eget dolor.")
    + startStr.endsWith("Lorem ipsum dolor sit amet")
    + startStr.endsWith("consectetuer adipiscing elit.", 57)
    + startStr.endsWith("consectetuer adipiscing elit.", 47)
);

var trimStr = "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n";
_cut.isEqual("String.prototype.trimStart();",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimStart()
);
_cut.isEqual("String.prototype.trimLeft();",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimLeft()
);
_cut.isEqual("String.prototype.trimEnd();",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimEnd()
);
_cut.isEqual("String.prototype.trimRight();",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimRight()
);

var testArrayFill1 = [1, 2, 3, 4];
var testArrayFillStr = JSON.stringify(testArrayFill1);
testArrayFillStr += JSON.stringify(testArrayFill1.fill(3.14, 3, 4));
testArrayFillStr += JSON.stringify(testArrayFill1);
testArrayFillStr += JSON.stringify(testArrayFill1.fill(42, 2));
testArrayFillStr += JSON.stringify(testArrayFill1);
testArrayFillStr += JSON.stringify(testArrayFill1.fill(56));
testArrayFillStr += JSON.stringify(testArrayFill1);
testArrayFillStr += JSON.stringify(testArrayFill1.fill({}));
testArrayFillStr += JSON.stringify(testArrayFill1);
testArrayFill1[0].p1 = "lorem";
testArrayFillStr += JSON.stringify(testArrayFill1);
var testArrayFill2 = Array(5).fill();
testArrayFillStr += JSON.stringify(testArrayFill2);
var testArrayFill3 = Array(3).fill("ipsum");
testArrayFillStr += JSON.stringify(testArrayFill3);
_cut.isEqual("Array.prototype.fill();",
  '[1,2,3,4]'+'[1,2,3,3.14]'+'[1,2,3,3.14]'+'[1,2,42,42]'+'[1,2,42,42]'
    +'[56,56,56,56]'+'[56,56,56,56]'+'[{},{},{},{}]'+'[{},{},{},{}]'
    +'[{"p1":"lorem"},{"p1":"lorem"},{"p1":"lorem"},{"p1":"lorem"}]'
    +'[null,null,null,null,null]'+'["ipsum","ipsum","ipsum"]',
  testArrayFillStr
);

_cut.isEqual("Array.from();", 3, Array.from({0:1,1:2,2:3,length:3})[2]);
_cut.isEqual("Array.from(); with mapFN", 6,
  Array.from({0:1,1:2,2:3,length:3}, function (e) { return e*3; })[1]
);
_cut.isEqual("Array.of();", 4, Array.of(2,4,6)[1]);
_cut.isEqual("Object.create();", 1, Object.create({ a: 1, b: 2 }).a);
_cut.isEqual("Object.assign();", 3, Object.assign({ a: 1}, {b: 2}, {c: 3}).c);
var testArrayFI = [66, 7, 135, 75, 190, 89];
_cut.isEqual("Array.prototype.find(); true", 135,
  testArrayFI.find(function (e) { return e > 100; })
);
_cut.isEqual("Array.prototype.find(); false", undefined,
  testArrayFI.find(function (e) { return e > 200; })
);
_cut.isEqual("Array.prototype.findIndex(); true", 2,
  testArrayFI.findIndex(function (e) { return e > 100; })
);
_cut.isEqual("Array.prototype.findIndex(); false", -1,
  testArrayFI.findIndex(function (e) { return e > 200; })
);
_cut.isEqual("Array.prototype.includes(); true", true, testArrayFI.includes(190));
_cut.isEqual("Array.prototype.includes(); false", false, testArrayFI.includes(195));
_cut.isEqual("String.prototype.includes(); true", true, "lorem ipsum".includes("ipsum"));
_cut.isEqual("String.prototype.includes(); false", false, "lorem ipsum".includes("erdei"));

_cut.addElement(_.domCreate("div", {"id": "testDivNode"}, "#testDivNode"));
var testDivNode = _.qs("#testDivNode");
testDivNode.append(_.domCreate("p", {"id": "testNodeP1"}, "testNodeP1"));
testDivNode.append(_.domCreate("p", {"id": "testNodeP2"}, "testNodeP2"));

var dqsaList = document.querySelectorAll("#testDivNode > p")
dqsaList.forEach(function (e) { e.style["color"] = "blue"; });
_cut.isEqual("NodeList.prototype.forEach();", true,
  dqsaList[0].style["color"] === "blue" && dqsaList[1].style["color"] === "blue"
);

var testNodeP1 = _.qs("#testNodeP1");
var testNodeP2 = _.qs("#testNodeP2");

testNodeP1.after("after text");
_cut.isEqual("ChildNode.after(); text", true, testDivNode.innerHTML.includes("after text"))
testNodeP1.after(_.domCreate("b", {}, "after element"));
_cut.isEqual("ChildNode.after(); element", true, testDivNode.innerHTML.includes("after element"));

testNodeP1.before("before text");
_cut.isEqual("ChildNode.before(); text", true, testDivNode.innerHTML.includes("before text"))
testNodeP1.before(_.domCreate("b", {}, "before element"));
_cut.isEqual("ChildNode.before(); element", true, testDivNode.innerHTML.includes("before element"));

testNodeP1.append("append text");
_cut.isEqual("ParentNode.append(); text", true, testDivNode.innerHTML.includes("append text"))
testNodeP1.append(_.domCreate("b", {}, "append element"));
_cut.isEqual("ParentNode.append(); element", true, testDivNode.innerHTML.includes("append element"));

testNodeP1.prepend("prepend text");
_cut.isEqual("ParentNode.prepend(); text", true, testDivNode.innerHTML.includes("prepend text"))
testNodeP1.prepend(_.domCreate("b", {}, "prepend element"));
_cut.isEqual("ParentNode.prepend(); element", true, testDivNode.innerHTML.includes("prepend element"));

testNodeP1.replaceWith("testElement");
_cut.isEqual("ChildNode.replaceWith(); text", null, _.qs("#testNodeP1"));

testNodeP2.replaceWith(_.domCreate("p", {}, "testElement"));
_cut.isEqual("ChildNode.replaceWith(); element", null, _.qs("#testNodeP2"));

testDivNode.remove();
_cut.isEqual("ChildNode.remove();", null, _.qs("#testDivNode"));

_cut.isTrue("window.screenLeft present", ("screenLeft" in window));
_cut.isTrue("window.screenTop present", ("screenTop" in window));

_cut.isEqual("globalThis", window, globalThis);

_cut.isTrue("RegExp.prototype.flags",
  (/foo/ig.flags === "gi" && /bar/mig.flags === "gim")
);

var arr = [ ["0","a"], ["1","b"], ["2","c"] ];
_cut.isEqual("Object.fromEntries(); step 1 array",'{"0":"a","1":"b","2":"c"}', JSON.stringify(Object.fromEntries(arr)));

var obj = {"a":1,"b":2,"c":3};
_cut.isEqual("Object.fromEntries(); step 2 Object.entries",'{"a":1,"b":2,"c":3}', JSON.stringify(Object.fromEntries(Object.entries(obj))));

var fromEntriesMap = new Map([ ["foo","bar"], ["baz",42] ]);
_cut.isEqual("Object.fromEntries(); step 3 Map - doesn't work in IE11",'{"foo":"bar","baz":42}', JSON.stringify(Object.fromEntries(fromEntriesMap)));


/* Array.prototype.flat(); */
_cut.addElement("hr");
_cut.addElement("h4", "Array.prototype.flat();");

var flatArr = [1,2,3,4];
_cut.isEqual("step 1", "[1,2,3,4]", JSON.stringify(flatArr.flat()));
_cut.isEqual("step 2a", "[1,2,3,4]", JSON.stringify(flatArr.flat(1000)));
_cut.isEqual("step 2b", "[1,2,3,4]", JSON.stringify(flatArr.flat(Infinity)));

flatArr = [1,2,[3,4]];
_cut.isEqual("step 3", "[1,2,3,4]", JSON.stringify(flatArr.flat()));

flatArr = [1,2,[3,4,[5,6]]];
_cut.isEqual("step 4", "[1,2,3,4,[5,6]]", JSON.stringify(flatArr.flat()));
_cut.isEqual("step 5", "[1,2,3,4,[5,6]]", JSON.stringify(flatArr.flat(1)));
_cut.isEqual("step 6", "[1,2,3,4,5,6]", JSON.stringify(flatArr.flat(2)));
_cut.isEqual("step 7a", "[1,2,3,4,5,6]", JSON.stringify(flatArr.flat(1000)));
_cut.isEqual("step 7b", "[1,2,3,4,5,6]", JSON.stringify(flatArr.flat(Infinity)));
_cut.isEqual("step 8", "[1,2,[3,4,[5,6]]]", JSON.stringify(flatArr.flat(0)));
_cut.isEqual("step 9", "[1,2,[3,4,[5,6]]]", JSON.stringify(flatArr.flat(-1)));
_cut.isEqual("step 10", "[1,2,[3,4,[5,6]]]", JSON.stringify(flatArr.flat("a2")));
_cut.isEqual("step 11", "[1,2,[3,4,[5,6]]]", JSON.stringify(flatArr.flat(false)));
_cut.isEqual("step 12", "[1,2,3,4,[5,6]]", JSON.stringify(flatArr.flat(true)));


/* Array.prototype.flatMap(callback) */
_cut.addElement("hr");
_cut.addElement("h4", "Array.prototype.flatMap(callback);");
var flatMapArr = [1,2,3,4];
_cut.isEqual("step 13", "[[2],[4],[6],[8]]", JSON.stringify(flatMapArr.map(function (x) { return [x * 2]; })));
_cut.isEqual("step 14", "[2,4,6,8]", JSON.stringify(flatMapArr.flatMap(function (x) { return [x * 2]; })));
_cut.isEqual("step 15", "[[2],[4],[6],[8]]", JSON.stringify(flatMapArr.flatMap(function (x) { return [[x * 2]]; })));
flatMapArr = ["lorem ipsum dolor", "", "sit"];
_cut.isEqual("step 16", '[["lorem","ipsum","dolor"],[""],["sit"]]', JSON.stringify(flatMapArr.map(function (x) { return x.split(" "); })));
_cut.isEqual("step 17", '["lorem","ipsum","dolor","","sit"]', JSON.stringify(flatMapArr.flatMap(function (x) { return x.split(" "); })));


/* Number ES6 */

_cut.addElement("hr");
_cut.addElement("h3", "Number ES6");

_cut.isEqual("Number.parseInt();", parseInt("44.83"), Number.parseInt("44.83"));
_cut.isEqual("Number.parseFloat();", parseFloat("44.83"), Number.parseFloat("44.83"));
_cut.isEqual("Number.MIN_SAFE_INTEGER", -9007199254740991, Number.MIN_SAFE_INTEGER );
_cut.isEqual("Number.MAX_SAFE_INTEGER", 9007199254740991, Number.MAX_SAFE_INTEGER);
_cut.isEqual("Number.EPSILON", Math.pow(2, -52), Number.EPSILON);
_cut.isEqual("Number.isNaN();",
  "false  false  false  false  false  false  false  true  false  false",
  Number.isNaN(42)+"  "+Number.isNaN(3.14)+"  "+Number.isNaN(-42)
    +"  "+Number.isNaN(-3.14)+"  "+Number.isNaN(0)+"  "+Number.isNaN(null)
    +"  "+Number.isNaN(undefined)+"  "+Number.isNaN(NaN)
    +"  "+Number.isNaN("The life")+"  "+Number.isNaN(true)
);
_cut.isEqual("isNaN();",
  "false  false  false  false  false  false  true  true  true  false",
  isNaN(42)+"  "+isNaN(3.14)+"  "+isNaN(-42)+"  "+isNaN(-3.14)
    +"  "+isNaN(0)+"  "+isNaN(null)+"  "+isNaN(undefined)
    +"  "+isNaN(NaN)+"  "+isNaN("The life")+"  "+isNaN(true)
);
_cut.isEqual("Number.isInteger();",
  "true  false  true  false  true  false  false  false  false  false",
  Number.isInteger(42)+"  "+Number.isInteger(3.14)
    +"  "+Number.isInteger(-42)+"  "+Number.isInteger(-3.14)
    +"  "+Number.isInteger(0)+"  "+Number.isInteger(null)
    +"  "+Number.isInteger(undefined)+"  "+Number.isInteger(NaN)
    +"  "+Number.isInteger("The life")+"  "+Number.isInteger(true)
);
_cut.isEqual("Number.isFinite();",
  "true  true  true  true  true  false  false  false  false  false",
  Number.isFinite(42)+"  "+Number.isFinite(3.14)
    +"  "+Number.isFinite(-42)+"  "+Number.isFinite(-3.14)
    +"  "+Number.isFinite(0)+"  "+Number.isFinite(null)
    +"  "+Number.isFinite(undefined)+"  "+Number.isFinite(NaN)
    +"  "+Number.isFinite("The life")+"  "+Number.isFinite(true)
);
_cut.isEqual("Number.isSafeInteger();",
  "true  false  true  false  true  false  false  false  false  false",
  Number.isSafeInteger(42)+"  "+Number.isSafeInteger(3.14)
    +"  "+Number.isSafeInteger(-42)+"  "+Number.isSafeInteger(-3.14)
    +"  "+Number.isSafeInteger(0)+"  "+Number.isSafeInteger(null)
    +"  "+Number.isSafeInteger(undefined)+"  "+Number.isSafeInteger(NaN)
    +"  "+Number.isSafeInteger("The life")+"  "+Number.isSafeInteger(true)
);


/* Math ES6 */

_cut.addElement("hr");
_cut.addElement("h3", "Math ES6")

_cut.isEqual("Math.acosh();", 0, Math.acosh(1));
_cut.isEqual("Math.asinh();", 0, Math.asinh(0));
_cut.isEqual("Math.atanh();", Infinity, Math.atanh(1));
_cut.isEqual("Math.cbrt();", 1, Math.cbrt(1));
_cut.isEqual("Math.clz32();", 26, Math.clz32(32));
_cut.isEqual("Math.cosh();", 1, Math.cosh(0));
_cut.isTrue("Math.expm1();", Math.expm1(1) > 1.7);
_cut.isFalse("Math.fround();", Math.fround(1.337) === 1.337);
_cut.isTrue("Math.hypot();", Math.hypot(3, 4, 5) > 7);
_cut.isEqual("Math.imul();", -10, Math.imul(0xfffffffe, 5));
_cut.isTrue("Math.log1p();", Math.log1p(1) < 7);
_cut.isEqual("Math.log10();", 5, Math.log10(100000));
_cut.isEqual("Math.log2();", 1, Math.log2(2));
_cut.isEqual("Math.sign();", -1, Math.sign(-3));
_cut.isTrue("Math.sinh();", Math.sinh(2) > 3.6);
_cut.isEqual("Math.tanh();", 1, Math.tanh(Infinity));
_cut.isEqual("Math.trunc();", "3"+"-3"+"4"+"-4"+"NaN"+"1"+"0",
  ""+Math.trunc(3.5)+Math.trunc(-3.5)+Math.trunc("4.8")+Math.trunc("-4.8")
    +Math.trunc("fff")+Math.trunc(true)+Math.trunc(false)
);


/* type checking */

_cut.addElement("hr");
_cut.addElement("h3", "type checking");

_cut.isTrue("isEmptyMap(); true", _.isEmptyMap(new Map()));
_cut.isFalse("isEmptyMap(); false 1", _.isEmptyMap(new Map([[4,5],[6,7]])));
_cut.isFalse("isEmptyMap(); false 2 array", _.isEmptyMap([]));

_cut.isTrue("isEmptySet(); true", _.isEmptySet(new Set()));
_cut.isFalse("isEmptySet(); false 1", _.isEmptySet(new Set([4,5,6])));
_cut.isFalse("isEmptySet(); false 2 array", _.isEmptySet([]));

_cut.isTrue("isEmptyIterator(); true", _.isEmptyIterator([]));
_cut.isFalse("isEmptyIterator(); false", _.isEmptyIterator([4,5,6]));

_cut.isTrue("isDataView(); true",
  _.isDataView(new DataView(new ArrayBuffer(2)), "dataview")
);
_cut.isFalse("isDataView(); false", _.isDataView({}, "dataview"));

var isErrorStr = ""
  + _.isError(new Error)
  + " " + _.isError(new RangeError)
  + " " + _.isError(new SyntaxError)
  + " " + _.isError({})
  + " " + _.isError([]);
_cut.isEqual("isError();", isErrorStr, "true true true false false" );

_cut.isTrue("isGeneratorFn(); true",
  _.isGeneratorFn(function* fn42g () { yield 42; })
);
_cut.isFalse("isGeneratorFn(); false 1 fn",
  _.isGeneratorFn(function fn42 () { return 42; })
);
_cut.isFalse("isGeneratorFn(); false 2 async fn",
  _.isGeneratorFn(new AsyncFunction("a","b","return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"))
);
_cut.isFalse("isGeneratorFn(); false 3 number", _.isGeneratorFn(42));

_cut.isTrue("isAsyncFn(); true",
  _.isAsyncFn(new AsyncFunction("a","b","return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"))
);
_cut.isFalse("isAsyncFn(); false 1 fn", _.isAsyncFn(function fn42 () { return 42; }) );
_cut.isFalse("isAsyncFn(); false 2 generator fn", _.isAsyncFn(function* fn42g () { yield 42; }) );
_cut.isFalse("isAsyncFn(); false 3 number", _.isAsyncFn(42));

_cut.isTrue("isString(); true", _.isString("str"));
_cut.isFalse("isString(); false", _.isString(533));
_cut.isTrue("isChar(); true", _.isChar("s"));
_cut.isFalse("isChar(); false 1", _.isChar("str"));
_cut.isFalse("isChar(); false 2", _.isChar(533));
_cut.isTrue("isNumber(); true 1", _.isNumber(98));
_cut.isTrue("isNumber(); true 2", _.isNumber(3.14));
_cut.isFalse("isNumber(); false", _.isNumber("str"));
_cut.isTrue("isFloat(); true", _.isFloat(3.14));
_cut.isFalse("isFloat(); false 1", _.isFloat(98));
_cut.isFalse("isFloat(); false 2", _.isFloat("str"));
_cut.isTrue("isBoolean(); true", _.isBoolean(false));
_cut.isFalse("isBoolean(); false", _.isBoolean(98));
_cut.isTrue("isObject(); 1 true {}", _.isObject({}));
_cut.isTrue("isObject(); 2 true array", _.isObject([]));
_cut.isFalse("isObject(); 3 false null", _.isObject(null));
_cut.isFalse("isObject(); 4 false number", _.isObject(98));
_cut.isTrue("isEmptyObject(); 1 true", _.isEmptyObject({}));
_cut.isFalse("isEmptyObject(); 2 false", _.isEmptyObject(document.querySelector("p")));
_cut.isFalse("isEmptyObject(); 3 false", _.isEmptyObject(98));
_cut.isFalse("isEmptyObject(); 3 false null", _.isEmptyObject(null));
_cut.isTrue("isFunction(); true", _.isFunction(_.noop));
_cut.isFalse("isFunction(); false", _.isFunction(document.querySelector("p")));
_cut.isTrue("isEmptyArray(); true", _.isEmptyArray([]));
_cut.isFalse("isEmptyArray(); false 1", _.isEmptyArray([1,2,3]));
_cut.isFalse("isEmptyArray(); false 2", _.isEmptyArray(document.querySelector("p")));
_cut.isTrue("isArraylike(); true 1 array", _.isArraylike([]));
_cut.isTrue("isArraylike(); true 2 querySelectorAll", _.isArraylike(document.querySelectorAll("p")));
_cut.isTrue("isArraylike(); true 3 arraylike object", _.isArraylike({0:4,1:5,length:2}));
_cut.isTrue("isArraylike(); true 4 string", _.isArraylike("Pillangó"));
_cut.isTrue("isArraylike(); true 5 empty string", _.isArraylike(""));
_cut.isFalse("isArraylike(); false 1 element", _.isArraylike(document.querySelector("p")));
_cut.isFalse("isArraylike(); false 2 number", _.isArraylike(42));
_cut.isFalse("isArraylike(); false 3 null", _.isArraylike(null));
_cut.isFalse("isArraylike(); false 4 object", _.isArraylike({0:4,1:5}));
_cut.isTrue("isNull(); true", _.isNull(null));
_cut.isFalse("isNull(); false", _.isNull(document.querySelectorAll("p")));
_cut.isTrue("isUndefined(); true", _.isUndefined(undefined));
_cut.isFalse("isUndefined(); false", _.isUndefined(document.querySelectorAll("p")));
_cut.isTrue("isNullOrUndefined(); true 1", _.isNullOrUndefined(undefined));
_cut.isTrue("isNullOrUndefined(); true 2", _.isNullOrUndefined(null));
_cut.isFalse("isNullOrUndefined(); false", _.isNullOrUndefined(document.querySelectorAll("p")));
_cut.isTrue("isNil(); true 1", _.isNil(undefined));
_cut.isTrue("isNil(); true 2", _.isNil(null));
_cut.isFalse("isNil(); false", _.isNil(document.querySelectorAll("p")));
_cut.isTrue("isPrimitive(); true 1", _.isPrimitive(98));
_cut.isTrue("isPrimitive(); true 2", _.isPrimitive("str"));
_cut.isFalse("isPrimitive(); false 1", _.isPrimitive(document.querySelectorAll("p")));
_cut.isFalse("isPrimitive(); false 2", _.isPrimitive(_.noop));
_cut.isTrue("isDate(); true", _.isDate(new Date()));
_cut.isFalse("isDate(); false", _.isDate({}));
_cut.isTrue("isRegexp(); true", _.isRegexp(/^\[object (.+)\]$/g));
_cut.isFalse("isRegexp(); false", _.isRegexp("string"));
_cut.isTrue("isElement(); true 1", _.isElement(document.body));
_cut.isTrue("isElement(); true 2", _.isElement(_.qs("div")));
_cut.isFalse("isElement(); false 1", _.isElement(document.createTextNode("sample text")));
_cut.isFalse("isElement(); false 2 ", _.isElement(document.createComment("sample comment")));
_cut.isFalse("isElement(); false 3 ", _.isElement([]));

_cut.isTrue("isNumeric(); true",
  _.isNumeric(-42) && _.isNumeric(-1.42) && _.isNumeric(-0.42) &&
  _.isNumeric(0) && _.isNumeric(0.42) && _.isNumeric(.42) &&
  _.isNumeric(1.42) && _.isNumeric(42) && _.isNumeric(8e5) &&
  _.isNumeric(-8e5) && _.isNumeric(0x89f) && _.isNumeric(-0x89f) &&
  _.isNumeric("-42") && _.isNumeric("-1.42") && _.isNumeric("-0.42") &&
  _.isNumeric("0") && _.isNumeric("0.42") && _.isNumeric(".42") &&
  _.isNumeric("1.42") && _.isNumeric("42") && _.isNumeric("8e5") &&
  _.isNumeric("-8e5") && _.isNumeric("0x89f")
);
_cut.isFalse("isNumeric(); false",
  _.isNumeric(null) || _.isNumeric(undefined) || _.isNumeric(NaN) ||
  _.isNumeric("NaN") || _.isNumeric("1,42") || _.isNumeric("#foo") ||
  _.isNumeric("1.2.3") || _.isNumeric("") || _.isNumeric("bar") ||
  _.isNumeric(" ") || _.isNumeric("\r\n") || _.isNumeric("true") ||
  _.isNumeric("false") || _.isNumeric("1<10") || _.isNumeric([]) ||
  _.isNumeric({}) || _.isNumeric("-0x89f")
);

_cut.isTrue("isArrayBuffer(); true", _.isArrayBuffer(new ArrayBuffer(8)));
_cut.isFalse("isArrayBuffer(); false 1", _.isArrayBuffer([4,5,6]));
_cut.isFalse("isArrayBuffer(); false 2", _.isArrayBuffer(new Int8Array(5)));
_cut.isTrue("isTypedArray - true 1 - Int8Array", _.isTypedArray(new Int8Array(5)));
_cut.isTrue("isTypedArray - true 2 - Uint8Array", _.isTypedArray(new Uint8Array(5)));
_cut.isTrue("isTypedArray - true 3 - Int16Array", _.isTypedArray(new Int16Array(5)));
_cut.isTrue("isTypedArray - true 4 - Uint16Array", _.isTypedArray(new Uint16Array(5)));
_cut.isTrue("isTypedArray - true 5 - Int32Array", _.isTypedArray(new Int32Array(5)));
_cut.isTrue("isTypedArray - true 6 - Uint32Array", _.isTypedArray(new Uint32Array(5)));
_cut.isTrue("isTypedArray - true 7 - Float32Array", _.isTypedArray(new Float32Array(5)));
_cut.isTrue("isTypedArray - true 8 - Float64Array", _.isTypedArray(new Float64Array(5)));
_cut.isTrue("isTypedArray - true 9 - Uint8ClampedArray", _.isTypedArray(new Uint8ClampedArray(5)));
if (window.BigInt64Array) {
  _cut.isTrue("isTypedArray - true 10 - BigInt64Array", _.isTypedArray(new BigInt64Array(5)));
}
if (window.BigUint64Array) {
  _cut.isTrue("isTypedArray - true 11 - BigUint64Array", _.isTypedArray(new BigUint64Array(5)));
}
_cut.isFalse("isTypedArray - false 1 - Array", _.isTypedArray([4,5,6]));
_cut.isFalse("isTypedArray - false 2 - ArrayBuffer", _.isTypedArray(new ArrayBuffer(8)));
_cut.isTrue("isPromise(); - true ", _.isPromise(_.delay(1000)));
_cut.isFalse("isPromise(); - false ", _.isPromise({}));
_cut.isTrue("isSymbol(); true", _.isSymbol(Symbol("str")));
_cut.isFalse("isSymbol(); false", _.isSymbol(_.noop));
_cut.isTrue("isMap(); true", _.isMap(new Map()));
_cut.isFalse("isMap(); false", _.isMap(_.noop));
_cut.isTrue("isSet(); true", _.isSet(new Set()));
_cut.isFalse("isSet(); false", _.isSet(_.noop));
_cut.isTrue("isWeakMap(); true", _.isWeakMap(new WeakMap()));
_cut.isFalse("isWeakMap(); false", _.isWeakMap(_.noop));
_cut.isTrue("isWeakSet(); true", _.isWeakSet(new WeakSet()));
_cut.isFalse("isWeakSet(); false", _.isWeakSet(_.noop));
_cut.isTrue("isIterator(); true - Array values();",  _.isIterator([4,5,6].values()));
_cut.isTrue("isIterator(); true - Set values();", _.isIterator(new Set([4,5,7]).values()));
_cut.isTrue("isIterator(); true - Map values();", _.isIterator(new Map([[4,5],[5,6]]).values()));
_cut.isTrue("isIterator(); true - Nodelist values();",
  _.isIterator(document.querySelectorAll("h3").values())
);

_cut.isFalse("isIterator(); false - Array", _.isIterator([4,5,7]));
_cut.isTrue("isIterable(); true", _.isIterable([]) && _.isIterable("")
    && _.isIterable(new Map([[1,2],[3,4]])) && _.isIterable(new Set([1,2]))
);
_cut.isFalse("isIterable(); false",
  _.isIterable(42) || _.isIterable(3.14) || _.isIterable({a:1,b:2})
    || _.isIterable(true) || _.isIterable(false)
);
if (window.BigInt) {
  _cut.isTrue("isBigInt(); true", _.isBigInt(BigInt(9007199254740991) + BigInt(5)));
  _cut.isFalse("isBigInt(); false 1", _.isBigInt(9007199254740990));
  _cut.isFalse("isBigInt(); false 2", _.isBigInt(3.14));
  _cut.isFalse("isBigInt(); false 3", _.isBigInt("Arthur Dent"));
}


/* isSameType(); */
_cut.addElement("hr");
_cut.addElement("h3", "isSameType();");
_cut.isTrue("isSameArray(); step 1", _.isSameArray([], []) );
_cut.isTrue("isSameArray(); step 2", _.isSameArray([5,4,5], [5,4,5]) );
_cut.isFalse("isSameArray(); step 3", _.isSameArray([5,4,5], [4,5,6]) );
_cut.isFalse("isSameArray(); step 4", _.isSameArray([5,4,6], [4,5,5]) );
_cut.isFalse("isSameArray(); step 5", _.isSameArray([5,4,5], [4,4,5]) );
_cut.isFalse("isSameArray(); step 6", _.isSameArray([5,5], [5,5,4]) );
_cut.isFalse("isSameArray(); step 7", _.isSameArray([5,5,4], [5,5]) );
_cut.isFalse("isSameArray(); step 8",
  _.isSameArray([5,5], new Map([[5,5],[5,5]]))
);
_cut.isFalse("isSameArray(); step 9", _.isSameArray([5,5], new Set([5,5])) );
_cut.isFalse("isSameArray(); step 10", _.isSameArray([], {}) );
_cut.isFalse("isSameArray(); step 11", _.isSameArray({}, {}) );
_cut.isFalse("isSameArray(); step 12", _.isSameArray("4", "4") );
_cut.isFalse("isSameArray(); step 13", _.isSameArray(4, 4) );
_cut.isFalse("isSameArray(); step 14", _.isSameArray(4, 5) );

var
  isSameObjectO1 = { "p1": 4, "p2": 5, "p3": 6 },
  isSameObjectO2 = { "p1": 4, "p2": 5, "p3": 6 },
  isSameObjectO3 = { "p1": 4, "p2": 5, "p3": 7 },
  isSameObjectO4 = { "p1": 4, "p2": 5, "p3": 6, "p4": 7 };
_cut.isTrue("isSameObject(); true 1",
  _.isSameObject(isSameObjectO1, isSameObjectO2)
);
_cut.isTrue("isSameObject(); true 2 empty", _.isSameObject({}, {}) );
_cut.isFalse("isSameObject(); false 1",
  _.isSameObject(isSameObjectO1, isSameObjectO3)
);
_cut.isFalse("isSameObject(); false 2",
  _.isSameObject(isSameObjectO1, isSameObjectO4)
);
_cut.isFalse("isSameObject(); false 3",
  _.isSameObject([4,5], {"0": 4, "1": 5, "length": 2})
);

_cut.isTrue("isSameSet(); true",
  _.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 8, 4]))
);
_cut.isFalse("isSameSet(); false 1",
  _.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 9]))
);
_cut.isFalse("isSameSet(); false 2",
  _.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 8, 9]))
);
_cut.isFalse("isSameSet(); false 3",
  _.isSameSet(new Set([4,6,8,2]), [4,6,8,2])
);

_cut.isTrue("isSameMap(); true",
  _.isSameMap(
    new Map([["str", 1], [17, "x"], [true, 42]]),
    new Map([["str", 1], [17, "x"], [true, 42]])
  )
);
_cut.isFalse("isSameMap(); false 1",
  _.isSameMap(
    new Map([["str", 1], [17, "x"], [true, 42]]),
    new Map([["str", 1], [17, "x"], [false, 42]])
  )
);
_cut.isFalse("isSameMap(); false 2",
  _.isSameMap(
    new Map([["str", 1], [17, "x"], [true, 42]]),
    new Map([["str", 1], [17, "x"], [false, 42], [true, 42]])
  )
);
_cut.isFalse("isSameMap(); false 3",
  _.isSameMap(
    new Map([["str", 1], [17, "x"], [true, 42]]),
    [["str", 1], [17, "x"], [true, 42]]
  )
);

_cut.isTrue("isSameIterator(); true",
  _.isSameIterator(new Set([4,6,8,2,6,4]), [4,8,6,2])
);
_cut.isFalse("isSameIterator(); false",
  _.isSameIterator(new Set([4,6,8,2,6,4]), [4,8,6,2,5])
);

/* AJAX, domReady(); and other callbacks */

_cut.addElement("hr");
_cut.addElement("h3", "AJAX, domReady(); and other callbacks");

_.domReady(function () { _cut.isTrue("domReady(); is working", true); });

/* importScript(); and importScripts(); */
_cut.addElement("p", "Here have to be these results:");
_cut.addElement("ul",
  "<li>1x domReady(); (core api) is working</li>"
    +"<li>3x importScript(); (core api) - first script loaded</li>"
    +"<li>3x importScript(); (core api) - second script loaded</li>"
    +"<li>1x importScripts(); (core api) with success gs1</li>"
    +"<li>1x importScripts(); (core api) with success gs2</li>"
    +"<li>1x importScripts(); (core api) with error gs1</li>"
    +"<li>1x importScripts(); (core api) with error gs2</li>"
    +"<li>4x importScripts(); (core api) - with more scripts"
    +"<li>1x getJson()</li>"
    +"<li>1x getText()</li>"
    +"<li>12x ajax()</li>"
);

_.importScript("unittest-gs1.js");
_.importScript("unittest-gs2.js");
_.importScripts("unittest-gsi.js");
_.importScripts("unittest-gsi.js", "unittest-gsi.js", "unittest-gsi.js");

var scripts=[
  { url: "unittest-gs1.js", success: function () {
    _cut.isEqual("importScripts(); (core api) with success gs1", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.isEqual("importScripts(); (core api) with success gs2", true, true);
  } }
];
_.importScripts(scripts);

scripts=[
  { url: "unittest-gs1.js", success: function () {
    _cut.isEqual("importScripts(); (core api) with error gs1", true, true);
  } },
  { url: "unittest-gs3.js", success: function () {
    _cut.isEqual("importScripts(); (core api) with error gs3", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.isEqual("importScripts(); (core api) with error gs2", true, true);
  } }
];
_.importScripts(scripts);

/* AJAX functions */

var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <span class=\"small\">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</span></p>\r\n<p><b>Nullam dictum felis eu pede mollis pretium.</b> Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. <small>Etiam ultricies nisi vel augue.</small></p>";

_.getText("testdata.txt", function (r) { _cut.isEqual("getText();", resAjaxText, r); } );
_.getJson("testdata.json", function (r) { _cut.isEqual("getJson();", resAjaxJson, r[0].image); } );

_.ajax({
  queryType: "ajax",
  type: "get",
  url: "testdata.txt",
  format: "text",
  success: function (r) { _cut.isEqual("ajax(); ajax get text", resAjaxText, r); },
  error: function (e) {
    _cut.isEqual("ajax(); ajax get text: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "ajax",
  type: "get",
  url: "testdata.json",
  format: "json",
  success: function (r) {
    _cut.isEqual("ajax(); ajax get json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    _cut.isEqual("ajax(); ajax get json: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "ajax",
  type: "get",
  url: "testdata.xml",
  format: "xml",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("ajax(); ajax get xml", resAjaxXml, xb);
  },
  error: function (e) {
    _cut.isEqual("ajax(); ajax get xml: "+JSON.stringify(e), true, false);
  }
});

_.ajax({
  queryType: "ajax",
  type: "post",
  url: "testdata.txt",
  format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) {
    _cut.isEqual("ajax(); ajax post text", resAjaxText, r);
  },
  error: function (e) {
    _cut.isEqual("ajax(); ajax post text: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "ajax",
  type: "post",
  url: "testdata.json",
  format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    _cut.isEqual("ajax(); ajax post json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    _cut.isEqual("ajax(); ajax post json: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "ajax",
  type: "post",
  url: "testdata.xml",
  format: "xml",
  data: "a=foo&b=bar baz",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("ajax(); ajax post xml", resAjaxXml, xb);
  },
  error: function (e) {
    _cut.isEqual("ajax(); ajax post xml: "+JSON.stringify(e), true, false);
  }
});

_.ajax({
  queryType: "cors",
  type: "get",
  url: "testdata.txt",
  format: "text",
  success: function (r) {
    _cut.isEqual("ajax(); cors get text", resAjaxText, r);
  },
  error: function (e) {
    _cut.isEqual("ajax(); cors get text: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "cors",
  type: "get",
  url: "testdata.json",
  format: "json",
  success: function (r) {
    _cut.isEqual("ajax(); cors get json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    _cut.isEqual("ajax(); cors get json: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "cors",
  type: "get",
  url: "testdata.xml",
  format: "xml",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("ajax(); cors get xml", resAjaxXml, xb);
  },
  error: function (e) {
    _cut.isEqual("ajax(); cors get xml: "+JSON.stringify(e), true, false);
  }
});

_.ajax({
  queryType: "cors",
  type: "post",
  url: "testdata.txt",
  format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) {
    _cut.isEqual("ajax(); cors post text", resAjaxText, r);
  },
  error: function (e) {
    _cut.isEqual("ajax(); cors post text: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "cors",
  type: "post",
  url: "testdata.json",
  format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    _cut.isEqual("ajax(); cors post json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    _cut.isEqual("ajax(); cors post json: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "cors",
  type: "post",
  url: "testdata.xml",
  format: "xml",
  data: "a=foo&b=bar baz",
  success: function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("ajax(); cors post xml", resAjaxXml, xb);
  },
  error: function (e) {
    _cut.isEqual("ajax(); cors post xml: "+JSON.stringify(e), true, false);
  }
});


}());

} catch (e) { alert("CUT global try-catch:\n" + e); }
