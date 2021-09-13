"use strict";

try {

/* Celestra unit tester */

var CUT = {};

CUT.VERSION = "Celestra Unit Tester (CUT) v0.8.22";

CUT.__results__ = document.querySelector("#results");
CUT.__resultsFailed__ = document.querySelector("#resultsFailed");

/* __addTest__(a"step", true, expr); */
/* __addTest__("step", true, expr, true|false); */
/* only for inner calls and selftest */
CUT.__addTest__ = function __addTest__ (step, expected, expression, strict) {
  if (strict === undefined) { strict = true; }
  var el = document.createElement("p");
  if (strict ? expected === expression : expected == expression) {
    el.innerHTML = "["+Date.now().toString(36)+"] <span class='passed'>[passed]</span> "+step;
    CUT.__results__.append(el);
  } else {
    el.innerHTML = "["+Date.now().toString(36)+"] <span class='failed'>[failed]</span> "+step;
    CUT.__results__.append(el);
    CUT.__resultsFailed__.append(el.cloneNode(true));
  }
};

/* isTrue("step", expr); */
CUT.isTrue = function isTrue (step, expression) {
  CUT.__addTest__(step, true, expression, true);
};

/* isFalse("step", expr); */
CUT.isFalse = function isFalse (step, expression) {
  CUT.__addTest__(step, false, expression, true);
};

/* isEqual("step", true, expr); */
/* isEqual("step", true, expr, true|false); */
CUT.isEqual = function isEqual (step, expected, expression, strict) {
  CUT.__addTest__(step, expected, expression, strict);
};

/* isNotEqual("step", true, expr); */
/* isNotEqual("step", true, expr, true|false); */
CUT.isNotEqual = function (step, notExpected, expression, strict) {
  if (strict === undefined) { strict = true; }
  CUT.__addTest__(step, true,
    (strict ? notExpected !== expression : notExpected != expression), true
  );
};

/* addElement(<element>); */
/* addElement(<type>[,innerHTML]); */
CUT.addElement = function addElement (type, iHtml) {
  if (typeof type === "object" && type.nodeType === 1) {
    CUT.__results__.append(type);
  } else {
    var el = document.createElement(type);
    if (iHtml) { el.innerHTML = iHtml; }
    CUT.__results__.append(el);
  }
};

/* log(<innerHTML>); */
CUT.log = function log (iHtml) { CUT.addElement("p", iHtml); };

/* clear(); */
CUT.clear = function clear () { CUT.__results__.innerHTML = ""; };


/* ======================================================================== */


//CUT.addElement("hr");

CUT.addElement("table",
    "<tr><td>CUT: </td><td><code>"+CUT.VERSION+"</code></td></tr>"
    + "<tr><td>Celestra: </td><td><code>"+celestra.VERSION+"</code></td></tr>"
    + "<tr><td>Date: </td><td><code>"+(new Date()).toISOString()+"</code></td></tr>"
    + "<tr><td>navigator.appName: </td><td><code>"+navigator.appName+"</code></td></tr>"
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
      +"<div id='results'>"+CUT.__results__.innerHTML+"</div>",
    "text/html"
 );
};


/* ======================================================================== */


/* Selftest */
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

CUT.isTrue("<span class=\"info\">Selftest</span> - isTrue(); success", 1 < 10);
CUT.isTrue("<span class=\"info\">Selftest</span> - isTrue(); failed", 1 > 10);

CUT.isFalse("<span class=\"info\">Selftest</span> - isFalse(); success", 1>10);
CUT.isFalse("<span class=\"info\">Selftest</span> - isFalse(); failed", 1<10);

CUT.isEqual("<span class=\"info\">Selftest</span> - isEqual(); success", 1, 1);
CUT.isEqual("<span class=\"info\">Selftest</span> - isEqual(); failed", 1, 2);
CUT.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); success non-strict",
  0, false, false
);
CUT.isEqual(
  "<span class=\"info\">Selftest</span> - isEqual(); failed strict",
  0, false, true
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


/* ======================================================================== */


(function(){
"use strict";

/* Celestra v4.5.2 testcases */

/* Not auto tested functions */
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


/* Celestra object */
CUT.addElement("hr");
CUT.addElement("h3", "Celestra object");

CUT.isEqual("Object name: \"celestra\"", true, celestra.randomInt(100,200)>99);
CUT.isEqual("Object name: \"_\"", true, _.randomInt(100,200)>99);


/* core api and DOM */

CUT.addElement("hr");
CUT.addElement("h3", "core api and DOM");

CUT.isEqual("VERSION", true, _.VERSION.includes("Celestra v"));

CUT.isTrue("v3.8.1 aliases removed in v4.0.0",
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

var rIDstr = _.randomID();
CUT.isTrue("randomID();", rIDstr.length === 32 && /[0-9a-fA-F]/.test(rIDstr));
CUT.log("<code>\"" + rIDstr + "\"</code>");

var rIDstr = _.randomID(true);
CUT.isTrue("randomID(true); with hyphens",
  rIDstr.length === 36 &&
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    .test(rIDstr)
);
CUT.log("<code>\"" + rIDstr + "\"</code>");

CUT.isTrue(
  "signbit();",
  !_.signbit("str") && !_.signbit("5") && _.signbit("-5") && !_.signbit("4.2")
  && _.signbit("-4.2") && _.signbit(-3.14) && !_.signbit(3.14) && _.signbit(-1)
  && !_.signbit(1) && !_.signbit(0) && _.signbit(-0) && !_.signbit(+0)
  && !_.signbit(Infinity) && _.signbit(-Infinity) && !_.signbit(+Infinity)
);

CUT.isTrue("assertTrue();",    _.assertTrue("lorem ipsum", true) );
CUT.isTrue("assertFalse();",   _.assertFalse("lorem ipsum", false) );
CUT.isTrue("assertEq(); 1",    _.assertEq("lorem ipsum", 1, 1) );
CUT.isTrue("assertEq(); 2",    _.assertEq("lorem ipsum", 1, true, false) );
CUT.isTrue("assertNotEq(); 1", _.assertNotEq("lorem ipsum", 1, 2) );
CUT.isTrue("assertNotEq(); 2", _.assertNotEq("lorem ipsum", 1, 2, false) );

CUT.addElement(
  _.domCreate("div", {"id": "qsaDivTestElement"},
    "#qsaDiv test element"
      + "<p id='qsaDivP1'>#qsaDivP1 test element</p>"
      + "<p id='qsaDivP2'>#qsaDivP2 test element</p>"
 )
);

CUT.isEqual("qs(); selector",
  document.querySelector("#qsaDivTestElement"), _.qs("#qsaDivTestElement")
);

CUT.isEqual("qs(); selector + element 1",
  document.querySelector("#qsaDivP1"),
    _.qs("#qsaDivP1", _.qs("#qsaDivTestElement"))
);

CUT.isEqual("qs(); selector + element 2",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1", document.querySelector("#qsaDivTestElement"))
);

var testQsa1 = _.qsa("#qsaDivTestElement > p")
CUT.isTrue("qsa(); selector",
  Array.isArray(testQsa1) && testQsa1.length === 2 &&
    testQsa1[0] === _.qs("#qsaDivP1") && testQsa1[1] === _.qs("#qsaDivP2")
);

var testQsa2 = _.qsa("p", _.qs("#qsaDivTestElement"))
CUT.isTrue("qsa(); selector + element 1",
  Array.isArray(testQsa2) && testQsa2.length === 2 &&
    testQsa2[0] === _.qs("#qsaDivP1") && testQsa2[1] === _.qs("#qsaDivP2")
);

var testQsa3 = _.qsa("p", document.querySelector("#qsaDivTestElement"))
CUT.isTrue("qsa(); selector + element 2",
  Array.isArray(testQsa3) && testQsa3.length === 2 &&
    testQsa3[0] === _.qs("#qsaDivP1") && testQsa3[1] === _.qs("#qsaDivP2")
);

testQsa3.forEach(function (e) { e.innerHTML += " each"; });
CUT.isTrue("qsa(); forEach",
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
    testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);


CUT.isEqual("getType(); ES5 values",
  "array  number  string  object  htmldocument  boolean  nodelist  htmlparagraphelement  null  undefined  function  date  regexp",
  _.getType([1,2,3])+"  "+_.getType(1998)+"  "+_.getType("hello world")
    +"  "+_.getType({a:1,b:2})+"  "+_.getType(document)
    +"  "+_.getType(true)+"  "+_.getType(document.querySelectorAll("p"))
    +"  "+_.getType(document.querySelector("p"))+"  "+_.getType(null)
    +"  "+_.getType(undefined)+"  "+_.getType(function(){})
    +"  "+_.getType(new Date())+"  "+_.getType(/^\[object (.+)\]$/g)
);
CUT.isEqual("getType(); ES5 all true",
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
CUT.isEqual("getType(); ES5 all false",
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

CUT.isEqual("getType(); ES6 values", "map  set  weakmap  weakset",
  _.getType(new Map()) +"  "+_.getType(new Set())
    +"  "+_.getType(new WeakMap()) +"  "+_.getType(new WeakSet())
);
CUT.isEqual("getType(); ES6 all true", "true  true  true  true",
  _.getType(new Map(), "map") +"  "+_.getType(new Set(), "set")
    +"  "+_.getType(new WeakMap(), "weakmap")
    +"  "+_.getType(new WeakSet(), "weakset")
);
CUT.isEqual("getType(); ES6 all false", "false  false  false  false",
  _.getType(new Map(), "object") +"  "+_.getType(new Set(), "object")
    +"  "+_.getType(new WeakMap(), "object")
    +"  "+_.getType(new WeakSet(), "object")
);
if (window.BigInt) {
  CUT.isEqual("getType(); ES6 bigint", "bigint  true  false",
  _.getType(BigInt(456))
    +"  "+_.getType(BigInt(456), "bigint")
    +"  "+_.getType(BigInt(456), "object")
  );
}


var foo1 = {a: "1", b: "2"};
var bar1 = {c: "3", d: "4", baz: {e: 5,fn: function(num) { return num*num;} } };

var extObj1 = _.extend(true,{},foo1,bar1);
CUT.isEqual("extend(); true", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.extend(false,{},foo1,bar1);
CUT.isEqual("extend(); false 1", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.extend({},foo1,bar1);
CUT.isEqual("extend(); false 2", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.deepAssign({},foo1,bar1);
CUT.isEqual("deepAssign();", "1  2  3  4  5  121",
  extObj1.a+"  "+extObj1.b+"  "+extObj1.c+"  "+extObj1.d+"  "+extObj1.baz.e
    +"  "+extObj1.baz.fn(11)
);

var obj2stringObj = {str:"éáűőúöüóíÉÁŰŐÚÖÜÓÍ",bool:true,pi:3.141592653589793};
CUT.isEqual("obj2string();",
  "str=%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%89%C3%81%C5%B0%C5%90%C3%9A%C3%96%C3%9C%C3%93%C3%8D&bool=true&pi=3.141592653589793",
  _.obj2string(obj2stringObj)
);
CUT.log(`<code>"${_.obj2string(obj2stringObj)}"</code>`);

/* inherit(); */

function Human (name,age) { this.name = name; this.age = age; }
Human.prototype.getName = function () { return this.name;}
Human.prototype.getAge = function () { return this.age;}

function Worker (name,age,job) {
  this.name = name; this.age = age; this.job = job;
}

_.inherit(Worker,Human);

Worker.prototype.setJob = function (job) { this.job = job;}
Worker.prototype.getJob = function () { return this.job;}

var David = new Human("David",27);
var Amy = new Worker ("Amy",25,"Engineer");

CUT.isEqual("inherit();",
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

CUT.isEqual(
  'getUrlVars(); prop order_by from <code>"?showall=true&order_by=updated&o=asc"</code>',
  "updated",
  _.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by"],
);
CUT.isEqual("getUrlVars(); prop not found - undefined", undefined,
  _.getUrlVars("?showall=true&order_by=updated&o=asc")["order_by2"],
);
CUT.isEqual("getUrlVars(); empty object", "{}", JSON.stringify(_.getUrlVars("?")) );

CUT.addElement(_.domCreate("div", {"id": "testFormDiv"},
  " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
));

CUT.isEqual("form2array();",
  '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify(_.form2array(_.qs("#form1")))
);

CUT.isEqual("form2string();",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  _.form2string(_.qs("#form1"))
);

_.qs("#testFormDiv").remove();


CUT.isTrue("randomInt();", _.randomInt() <= 101);
CUT.isTrue("randomInt(max);", _.randomInt(30) <= 30);
var testRandom = _.randomInt(51,55);
CUT.isTrue("randomInt(min,max);", testRandom >= 51 && testRandom <= 55);

CUT.isTrue("randomFloat();", _.randomFloat() <= 101);
CUT.isTrue("randomFloat(max);", _.randomFloat(30) <= 30);
var testRandom = _.randomFloat(51,55);
CUT.isTrue("randomFloat(min,max);", testRandom >= 51 && testRandom <= 55);

var testRandom = _.randomBoolean();
CUT.isTrue("randomBoolean(); - <code>" + testRandom + "</code>",
  _.isBoolean(testRandom) && (testRandom === true || testRandom === false)
);

var rndStr = _.randomString();
CUT.isTrue("randomString(); default length 100, default false",
  _.isString(rndStr) && rndStr.length === 100
);
CUT.log("<code>"+rndStr+"</code>");
rndStr = _.randomString(10);
CUT.isTrue("randomString(10) default false",
  _.isString(rndStr) && rndStr.length === 10);
CUT.log("<code>"+rndStr+"</code>");
rndStr = _.randomString(15,true);
CUT.isTrue("randomString(15,true);",
  _.isString(rndStr) && rndStr.length === 15);
CUT.log("<code>"+rndStr+"</code>");
rndStr = _.randomString(20,false);
CUT.isTrue("randomString(20,false);",
  _.isString(rndStr) && rndStr.length === 20);
CUT.log("<code>"+rndStr+"</code>");
rndStr = "1" + _.randomString(32,false);
CUT.isEqual("randomString(); random \"btc\" address", true,
  _.isString(rndStr) && rndStr.length === 33
);
CUT.log("<code>"+rndStr+"</code>");

CUT.isTrue("inRange();",
  _.inRange(4,3,6) && _.inRange(-3.14, -4.5, 9.21)
    && !_.inRange(2,3,6) && !_.inRange(7,3,6)
    && !_.inRange(-5.14, -4.5, 9.21) && !_.inRange(-9.24, -4.5, 9.21)
);

var kayleeStr = "✓ à \r\n\t árvíztűrő tükörfúrógép ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP ,?;.:-_* ¤÷×¨¸´˙`˛°˘^ˇ~'+!%/=()|\\<> \" \/ #&@{}[]€ ÍÄíŁß 0123456789 asdfghjklqwertzuiopyxcvbnm ASDFGHJKLQWERTZUIOPYXCVBNM";
CUT.isEqual("b64Encode();",
  "4pyTIMOgIA0KCSDDoXJ2w616dMWxcsWRIHTDvGvDtnJmw7pyw7Nnw6lwIMOBUlbDjVpUxbBSxZAgVMOcS8OWUkbDmlLDk0fDiVAgLD87LjotXyogwqTDt8OXwqjCuMK0y5lgy5vCsMuYXsuHficrISUvPSgpfFw8PiAiIC8gIyZAe31bXeKCrCDDjcOEw63FgcOfIDAxMjM0NTY3ODkgYXNkZmdoamtscXdlcnR6dWlvcHl4Y3Zibm0gQVNERkdISktMUVdFUlRaVUlPUFlYQ1ZCTk0=",
  _.b64Encode(kayleeStr)
);
CUT.isEqual("b64Decode(); + b64Encode();", kayleeStr, _.b64Decode(_.b64Encode(kayleeStr)));
CUT.isEqual("javaHash();",
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

CUT.isEqual("sizeIn();", "" + _.sizeIn(FPObject) + _.sizeIn({}), "30");

var forInStr = "";
_.forIn(FPObject, (e) => forInStr += (e*2) );
CUT.isEqual("forIn();", "468", forInStr);
CUT.isEqual("forIn(); return value", FPObject, _.forIn(FPObject,function(){}));

CUT.isEqual("filterIn();",
  "{\"b\":2,\"c\":3}",
  JSON.stringify( _.filterIn({"a": 1, "b": 2, "c": 3}, (v, p, o) => (v > 1)) )
);

CUT.isEqual("popIn();", "1undefined", ""+_.popIn({"a":1},"a")+_.popIn({},"a"));

CUT.isEqual("getDoNotTrack();", true,
  _.getDoNotTrack() === true || _.getDoNotTrack() === false
);

CUT.isTrue("strPropercase();",
  _.strPropercase("arthur conan doyle") === "Arthur Conan Doyle" &&
  _.strPropercase("arthur conan   doyle") === "Arthur Conan   Doyle"
);

CUT.isEqual("strCapitalize();", _.strCapitalize("lorEm Ipsum"), "Lorem ipsum");

CUT.isEqual("strUpFirst();", _.strUpFirst("lorEm Ipsum"), "LorEm Ipsum");

CUT.isEqual("strDownFirst();", _.strDownFirst("LorEm Ipsum"), "lorEm Ipsum");

CUT.isEqual("strHTMLRemoveTags();","lorem ipsum dolor sit amet , consectetuer",
  _.strHTMLRemoveTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

var strReverseRes = _.strReverse("I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.");
CUT.isEqual("strReverse(); without unicode",
  ".eid ot emiT .niar ni sraet ekil ,emit ni tsol eb lliw stnemom esoht llA .etaG resuähnnaT eht raen krad eht ni rettilg smaeb-C dehctaw I .noirO fo redluohs eht ffo erif no spihs kcattA .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  strReverseRes
);
var strReverseRes = _.strReverse("I've seen things you people wouldn't believe. \uD834\uDF06 Attack ships on fire off the shoulder of Orion.");
CUT.isEqual("strReverse(); with unicode 1",
  ".noirO fo redluohs eht ffo erif no spihs kcattA \uD834\uDF06 .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  strReverseRes
);

const testUnicodeStr22222 = "foo \uD834\uDF06 bar \uD835\uDC01 baz";
CUT.isEqual("strCodePoints();",
  "[102,111,111,32,119558,32,98,97,114,32,119809,32,98,97,122]",
  JSON.stringify(_.strCodePoints(testUnicodeStr22222))
);
CUT.isEqual("strFromCodePoints(); + strCodePoints();", testUnicodeStr22222,
  _.strFromCodePoints(_.strCodePoints(testUnicodeStr22222))
);

CUT.isTrue("strAt();",
  _.strAt("\uD834\uDF06 ab cd",0) === "\uD834\uDF06"
  && _.strAt("ab \uD834\uDF06 cd",3) === "\uD834\uDF06"
  && _.strAt("ab cd \uD834\uDF06",-1) === "\uD834\uDF06"
  && _.strAt("ab \uD834\uDF06 cd",0) === "a"
  && _.strAt("ab \uD834\uDF06 cd",5) === "c"
  && _.strAt("ab \uD834\uDF06 cd",-1) === "d"
  && _.strAt("",0) === "" && _.strAt("",3) === "" && _.strAt("",-1) === ""
);

var slice = _.toFunction([].slice);
CUT.isEqual("toFunction();", true,
  Array.isArray(slice(document.querySelectorAll("h3")))
);

var FPArray = [1,2,3];

var dqsa = _.bind(document.querySelectorAll, document);
CUT.isTrue("bind();", dqsa("h3").length > 0);

CUT.isEqual("constant();", 3.14, _.constant(3.14)());
CUT.isEqual("identity();", 100, _.identity(60) + _.identity(40));
CUT.isEqual("noop();", undefined, _.noop());

CUT.isTrue("T();", _.T());
CUT.isFalse("F();", _.F());

CUT.isEqual("strHTMLEscape();",
  "&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&amp;#64;echo&amp;#65;&lt;/a&gt;&apos;str2&apos;",
  _.strHTMLEscape('<a href="#" target="_blank">&#64;echo&#65;</a>\'str2\'')
);

CUT.isEqual("strHTMLUnEscape();",
  '<a href="#" target="_blank">&#64;echo&#65;</a>\'str2\'',
  _.strHTMLUnEscape("&lt;a href=&quot;#&quot; target=&quot;_blank&quot;&gt;&amp;#64;echo&amp;#65;&lt;/a&gt;&apos;str2&#39;")
);

/* DOM */

CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); without prefix 1", "",
  _.domGetCSSVar("testVar1"));
_.domSetCSSVar("testVar1","value1");
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); without prefix 2", "value1",
  _.domGetCSSVar("testVar1"));
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); with prefix 1",
  "", _.domGetCSSVar("--testVar2"));
_.domSetCSSVar("--testVar2","value2");
CUT.isEqual("domGetCSSVar(); and domSetCSSVar(); with prefix 2",
  "value2", _.domGetCSSVar("--testVar2"));

CUT.addElement( _.domCreate("p",
  {"id": "domTestElement", style: {"width": "250px"} }, "DOM test element"
));
var domTestElement = _.qs("#domTestElement");

CUT.isTrue("domCreate(); with style object", _.isElement(domTestElement));
CUT.isTrue("domCreate(); with style string",
  _.isElement(_.domCreate("p", {"id": "domTestElement", style: "width: 250px; color: blue;" }, "DOM test element"))
);

CUT.isTrue("domCreate(object); with style object", _.isElement(_.domCreate({ elementType: "p", "id": "domTestElementObject", style: {"width": "250px"}, innerHTML: "DOM test element" })));
CUT.isTrue("domCreate(object); with style string", _.isElement(_.domCreate({ elementType: "p", "id": "domTestElementObject", style: "width: 250px; color: blue;", innerHTML: "DOM test element" })));

CUT.isTrue("domToElement(); simple element",
  _.isElement(_.domToElement("<div>Hello world!</div>")));

CUT.isTrue("domToElement(); complex element",
  _.isElement(_.domToElement("<p><span style=\"background-color: yellow; color: blue;\">Hello</span> <span style=\"background-color: blue; color: yellow;\">world</span>!</p>").firstElementChild)
);

_.domSetCSS(domTestElement, "width", "300px");
CUT.isEqual("domSetCSS(); property and domGetCSS();", "300px",
  _.domGetCSS(domTestElement, "width"));
_.domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
CUT.isEqual("domSetCSS(); properties object and domGetCSS();",
  "350px", _.domGetCSS(domTestElement, "width"));
CUT.isEqual("domSetCSS(); properties object and domGetCSS() object;",
  "350px", _.domGetCSS(domTestElement)["width"]);

_.domHide(domTestElement);
CUT.isEqual("domHide();", "none", _.domGetCSS(domTestElement, "display"));

_.domShow(domTestElement);
CUT.isEqual("domShow();", "block", _.domGetCSS(domTestElement, "display"));

_.domHide(domTestElement);
_.domShow(domTestElement, "inline-block");
CUT.isEqual("domShow(); inline-block", "inline-block",
  _.domGetCSS(domTestElement, "display"));

_.domToggle(domTestElement);
CUT.isEqual("domToggle(); hide", "none",
  _.domGetCSS(domTestElement, "display"));

_.domToggle(domTestElement);
CUT.isEqual("domToggle(); show", "block",
  _.domGetCSS(domTestElement, "display"));

_.domToggle(domTestElement, "inline-block");
CUT.isEqual("domToggle(); hide inline-block", "none",
  _.domGetCSS(domTestElement, "display"));

_.domToggle(domTestElement, "inline-block");
CUT.isEqual("domHide(); show inline-block", "inline-block",
  _.domGetCSS(domTestElement, "display"));

_.domShow(domTestElement);
CUT.isFalse("domIsHidden(); false", _.domIsHidden(domTestElement));
_.domHide(domTestElement);
CUT.isTrue("domIsHidden(); true", _.domIsHidden(domTestElement));

CUT.addElement(
  _.domCreate("div", {"id": "dsDiv"},
    '<p id="dsDivP1">#dsDivP1</p>' +'<p id="dsDivP2">#dsDivP2</p>'
      +'<p id="dsDivP3">#dsDivP3</p>' +'<p id="dsDivP4">#dsDivP4</p>'
      +'<p id="dsDivP5">#dsDivP5</p>'
 )
);
var dsArray = _.domSiblings(_.qs("#dsDivP3"));
CUT.isTrue("domSiblings();", (
  Array.isArray(dsArray) && dsArray.length === 4
    && dsArray[0].innerHTML === "#dsDivP1" && dsArray[1].innerHTML==="#dsDivP2"
    && dsArray[2].innerHTML === "#dsDivP4" && dsArray[3].innerHTML==="#dsDivP5"
));
var dsArray = _.domSiblingsPrev(_.qs("#dsDivP3"));
CUT.isTrue("domSiblingsPrev();", (
  Array.isArray(dsArray) && dsArray.length === 2
    && dsArray[0].innerHTML === "#dsDivP1" && dsArray[1].innerHTML==="#dsDivP2"
));
CUT.isEqual("domSiblingsLeft();", _.domSiblingsLeft, _.domSiblingsPrev);
var dsArray = _.domSiblingsNext(_.qs("#dsDivP3"));
CUT.isTrue("domSiblingsNext();", (
  Array.isArray(dsArray) && dsArray.length === 2
    && dsArray[0].innerHTML === "#dsDivP4" && dsArray[1].innerHTML==="#dsDivP5"
));
CUT.isEqual("domSiblingsRight();", _.domSiblingsRight, _.domSiblingsNext);
_.qs("#dsDiv").remove();


/* Collections */

CUT.addElement("hr");
CUT.addElement("h3", "Collections");

CUT.isEqual("withOut();",
  JSON.stringify(_.withOut(["a","b","c","d"], ["b","d"])), "[\"a\",\"c\"]"
);

var arrPartition = [-5, 2, -9, 7, 34];
CUT.isEqual("partition();",
  JSON.stringify(_.partition(arrPartition, (e) => (e > 0) )),
  "[[2,7,34],[-5,-9]]"
);

let strGroupBy = JSON.stringify( _.groupBy([1,2,3,4,5],
  (i) => (i % 2 === 0 ? "even" : "odd")));
CUT.isTrue("groupBy();", strGroupBy === "{\"odd\":[1,3,5],\"even\":[2,4]}"
  || strGroupBy === "{\"even\":[2,4],\"odd\":[1,3,5]}");

CUT.isTrue("initial();",
  _.isSameArray(_.initial(["a","b","c","d"]), ["a","b","c"])
);

var sum = "";
for (let x of _.iterRange(10, 3, 20)) { sum += x; }
CUT.isEqual("iterRange(); integer", "10131619", sum);
sum = "";
for (let x of _.iterRange(10, 3.5, 20)) { sum += x; }
CUT.isEqual("iterRange(); float", "1013.517", sum);

sum = "";
for (let x of _.iterCycle(["a", "b", "c"], 4)) { sum += x; }
CUT.isEqual("iterCycle(); array", "abcabcabcabc", sum);
sum = "";
for (let x of _.iterCycle(_.iterRange(10, 3, 20), 3)) { sum += x; }
CUT.isEqual("iterCycle(); + iterRange();", "101316191013161910131619", sum);
sum = "";
let itrr1 = _.iterCycle(['A', 'B'].values());
for (let i = 0; i < 7; i++) { sum += itrr1.next().value; }
CUT.isEqual("iterCycle(); infinity", "ABABABA", sum);

sum = "";
for (let x of _.iterRepeat("HW", 5)) { sum += x; }
CUT.isEqual("iterRepeat();", "HWHWHWHWHW", sum);
sum = "";
let itrr2 = _.iterRepeat('HW2');
for (let i = 0; i < 3; i++) { sum += itrr2.next().value; }
CUT.isEqual("iterRepeat(); infinity", "HW2HW2HW2", sum);


var FPArray = [1,2,3];

var forEachStr = "";
_.forEach(FPArray, function (e) { forEachStr += (e*2); });
CUT.isEqual("forEach(); 1 ES5 Array", "246", forEachStr);
forEachStr = "";
_.forEach("cat, dog, pig", function (e) { forEachStr += e.toUpperCase(); });
CUT.isEqual("forEach(); 2 ES5 String", "CAT, DOG, PIG", forEachStr);
var forEachCount = 0;
_.forEach(document.querySelectorAll("h3"), function (e) { forEachCount++; });
CUT.isEqual("forEach(); 3 ES5 Nodelist",
  document.querySelectorAll("h3").length, forEachCount
);
forEachStr = "";
_.forEach(new Map([ ["foo", 3.14], ["bar", 42], ["baz", "Wilson"] ]),
  function (e,i) { forEachStr += i + "-" + e + "-"; });
CUT.isEqual("forEach(); 5 ES6 Map", "0-foo,3.14-1-bar,42-2-baz,Wilson-",
  forEachStr);
forEachCount = 0;
_.forEach(new Set([4,5,6]), function (e) { forEachCount += (e*3); });
CUT.isEqual("forEach(); 6 ES6 Set", 45, forEachCount);
forEachCount = 0;
_.forEach((new Set([4,5,6])).values(), function (e) { forEachCount += (e*3); });
CUT.isEqual("forEach(); 7 ES6 Set values(); iterator", 45, forEachCount);


var mapStr = "";
for (let item of _.map([1,2,3], function(e) { return e*2; })) { mapStr += item;}
CUT.isEqual("map(); 1 ES5 Array", "246", mapStr);
var mapStr = "";
for (let item of _.map("cat, dog, pig", function (e) {
  return e.toUpperCase(); })) {mapStr += item;}
CUT.isEqual("map(); 2 ES5 String", "CAT, DOG, PIG", mapStr);

var mapNL = [];
for (let item of _.map(document.querySelectorAll("h3"),
  function (e) { return e; })) { mapNL.push(item); }
CUT.isTrue("map(); 3 ES5 Nodelist",
  Array.isArray(mapNL) && mapNL.every(function(e) { return _.isElement(e); }));
var mapStr = "";
for (let item of _.map(
  new Map([ ["foo", 1], ["bar", 2], ["baz", 3] ]),
  function(e) { return [ e[0], e[1]*2 ]; }
)) { mapStr += item[0] + item[1]; }
CUT.isEqual("map(); 5 ES6 Map", "foo2bar4baz6", mapStr);
var mapStr = "";
for (let item of _.map(new Set([1,2,3]), function(e) { return e*2; })) {
  mapStr += item;
}
CUT.isEqual("map(); 6 ES6 Set", "246", mapStr);
var mapStr = "";
for (let item of _.map((new Set([1,2,3])).values(),
  function(e) { return e*3; })) { mapStr += item; }
CUT.isEqual("map(); 7 ES6 Set values(); iterator", "369", mapStr);


var FParray2 = ["A","B","C","D","E","F","G","H","I","J"];

var iterStr = "";
for (let item of _.take(FParray2, 0)) { iterStr += item; }
CUT.isEqual("take(); - step 1 - 0", "", iterStr);
var iterStr = "";
for (let item of _.take(FParray2, 7)) { iterStr += item; }
CUT.isEqual("take(); - step 2 - 7", "ABCDEFG", iterStr);
var iterStr = "";
for (let item of _.take(FParray2, 12)) { iterStr += item; }
CUT.isEqual("take(); - step 3 - 12", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of _.take(FParray2)) { iterStr += item; }
CUT.isEqual("take(); - step 4 - default 1", "A", iterStr);

var iterStr = "";
for (let item of _.drop(FParray2, 0)) { iterStr += item; }
CUT.isEqual("drop(); - step 1 - 0", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of _.drop(FParray2, 7)) { iterStr += item; }
CUT.isEqual("drop(); - step 2 - 7", "HIJ", iterStr);
var iterStr = "";
for (let item of _.drop(FParray2, 12)) { iterStr += item; }
CUT.isEqual("drop(); - step 3 - 12", "", iterStr);
var iterStr = "";
for (let item of _.drop(FParray2)) { iterStr += item; }
CUT.isEqual("drop(); - step 4 - default 1", "BCDEFGHIJ", iterStr);


var FPArray3 = [1,2,3,4,5,6,7,8,9,10];

var iterStr = "";
for (let item of _.filter(FPArray3, (v) => (v>3 && v<9))) { iterStr += item; }
CUT.isEqual("filter();", "45678", iterStr);

var iterStr = "";
for (let item of _.reject(FPArray3, (v) => (v>3 && v<9))) { iterStr += item; }
CUT.isEqual("reject();", "123910", iterStr);

var iterStr = "";
for (let item of _.slice(FPArray3,0,4)) { iterStr += item; }
CUT.isEqual("slice(); - step 1 - 0 to 4", "12345", iterStr);
var iterStr = "";
for (let item of _.slice(FPArray3,5)) { iterStr += item; }
CUT.isEqual("slice(); - step 2 - 5 to Infinity", "678910", iterStr);
var iterStr = "";
for (let item of _.slice(FPArray3,4,8)) { iterStr += item; }
CUT.isEqual("slice(); - step 3 - 4 to 8", "56789", iterStr);
var iterStr = "";
for (let item of _.slice(FPArray3)) { iterStr += item; }
CUT.isEqual("slice(); - step 4 - all", "12345678910", iterStr);

var iterStr = "";
for (let item of _.tail(FPArray3)) { iterStr += item; }
CUT.isEqual("tail();", "2345678910", iterStr);

let whileArray = [0,2,4,6,8,10,12,14,16];

var whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<10))) { whileSum += item; }
CUT.isEqual("takeWhile(); values", whileSum, 20);
whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<0))) { whileSum += item; }
CUT.isEqual("takeWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<30))) { whileSum += item; }
CUT.isEqual("takeWhile(); full list", whileSum, 72);

whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<10))) { whileSum += item; }
CUT.isEqual("dropWhile(); values", whileSum, 52);
whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<30))) { whileSum += item; }
CUT.isEqual("dropWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<0))) { whileSum += item; }
CUT.isEqual("dropWhile(); full list", whileSum, 72);

CUT.isEqual("item(); string unicode",
  _.item("foo \uD834\uDF06 bar", 4)
    + _.item("foo \uD834\uDF06 bar", 8)
    + _.item("foo \uD834\uDF06 bar", 12),
  "\uD834\uDF06" + "r" + "undefined"
);
let itemOfArray = [4,5,6,7,8];
CUT.isEqual("item(); array",
  "" + _.item(itemOfArray, 3) + _.item(itemOfArray, 12), "7" + "undefined"
);
let itemOfMap = new Map([ ["a",1], ["b",2], ["c",3] ]);
CUT.isEqual("item(); map",
  JSON.stringify(_.item(itemOfMap, 1)) + _.item(itemOfMap, 12),
  "[\"b\",2]" + "undefined"
);
let itemOfSet = new Set([3,3,4,5,5,6,7,7,8]);
CUT.isEqual("item(); set",
  "" + JSON.stringify(_.item(itemOfSet, 3)) + _.item(itemOfSet, 12),
  "6" + "undefined"
);
CUT.isEqual("nth();", _.nth, _.item);

let sizeLastArray = [4,5,6,7,8,"last"];
CUT.isEqual("size();", 6, _.size(sizeLastArray));
CUT.isEqual("first();", 4, _.first(sizeLastArray));
CUT.isEqual("head();", 4, _.head(sizeLastArray));
CUT.isEqual("last();", "last", _.last(sizeLastArray));

let reverseSortArray = ["first",4,5,6,7,8,9,"last"];

CUT.isEqual("reverse();", "[\"last\",9,8,7,6,5,4,\"first\"]",
  JSON.stringify([..._.reverse(reverseSortArray)])
);

CUT.isEqual("sort(); without numbers", "[4,5,6,7,8,9,\"first\",\"last\"]",
  JSON.stringify([..._.sort(reverseSortArray)])
);
CUT.isEqual("sort(); with numbers", "[\"first\",4,5,6,7,8,9,\"last\"]",
  JSON.stringify([..._.sort(reverseSortArray, true)])
);
CUT.isEqual("sort(); numbers without numbers", "[1,10,7,9]",
  JSON.stringify([..._.sort([7,1,10,9])])
);
CUT.isEqual("sort(); numbers with numbers", "[1,7,9,10]",
  JSON.stringify([..._.sort([7,1,10,9], true)])
);

const shuffledReverseSortArray = _.shuffle(reverseSortArray);
CUT.isFalse("shuffle();",
  _.isSameArray(reverseSortArray, shuffledReverseSortArray)
);

CUT.isTrue("includes(); true", _.includes(reverseSortArray, "last"));
CUT.isFalse("includes(); false", _.includes(reverseSortArray, "world"));

CUT.isTrue("contains(); true", _.contains(reverseSortArray, "last"));
CUT.isFalse("contains(); false", _.contains(reverseSortArray, "world"));

CUT.isEqual("find(); found", 6, _.find(reverseSortArray, (v) => (v > 5)));
CUT.isEqual("find(); not found", undefined,
  _.find(reverseSortArray, (v) => (v > 11))
);

CUT.isTrue("findLast();", _.findLast( [4,1,7,2,9], (v) => v < 5 ) === 2
  && _.findLast( [4,1,7,2,9], (v) => v > 10 ) === undefined);

var everySomeNoneArray = [2,9,3,5,8];
var everySomeNoneEmptyArray = [];
CUT.isTrue("every(); true", _.every(everySomeNoneArray, (v) => v > 1));
CUT.isFalse("every(); false 1 - some",
  _.every(everySomeNoneArray, (v) => v > 3));
CUT.isFalse("every(); false 1 - none",
  _.every(everySomeNoneArray, (v) => v < 0));
CUT.isFalse("every(); false 3 - empty",
  _.every(everySomeNoneEmptyArray, (v) => v > 3));
CUT.isTrue("some(); true", _.some(everySomeNoneArray, (v) => v > 3));
CUT.isFalse("some(); false 1 - none",
  _.some(everySomeNoneArray, (v) => v < 0));
CUT.isFalse("some(); false 2 - empty",
  _.some(everySomeNoneEmptyArray, (v) => v < 0));
CUT.isTrue("none(); true", _.none(everySomeNoneArray, (v) => v < 0));
CUT.isFalse("none(); false 1 - every",
  _.none(everySomeNoneArray, (v) => v > 1));
CUT.isFalse("none(); false 2 - some",
  _.none(everySomeNoneArray, (v) => v > 3));
CUT.isFalse("none(); false 3 - empty",
  _.none(everySomeNoneEmptyArray, (v) => v > 3));


FParray2.reverse();

var iterStr = "";
for (let item of _.takeRight(FParray2, 0)) { iterStr += item; }
CUT.isEqual("takeRight(); - step 1 - 0", "", iterStr);
var iterStr = "";
for (let item of _.takeRight(FParray2, 7)) { iterStr += item; }
CUT.isEqual("takeRight(); - step 2 - 7", "ABCDEFG", iterStr);
var iterStr = "";
for (let item of _.takeRight(FParray2, 12)) { iterStr += item; }
CUT.isEqual("takeRight(); - step 3 - 12", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of _.takeRight(FParray2)) { iterStr += item; }
CUT.isEqual("takeRight(); - step 4 - default 1", "A", iterStr);

var iterStr = "";
for (let item of _.dropRight(FParray2, 0)) { iterStr += item; }
CUT.isEqual("dropRight(); - step 1 - 0", "ABCDEFGHIJ", iterStr);
var iterStr = "";
for (let item of _.dropRight(FParray2, 7)) { iterStr += item; }
CUT.isEqual("dropRight(); - step 2 - 7", "HIJ", iterStr);
var iterStr = "";
for (let item of _.dropRight(FParray2, 12)) { iterStr += item; }
CUT.isEqual("dropRight(); - step 3 - 12", "", iterStr);
var iterStr = "";
for (let item of _.dropRight(FParray2)) { iterStr += item; }
CUT.isEqual("dropRight(); - step 4 - default 1", "BCDEFGHIJ", iterStr);


whileArray.reverse();

var whileSum = 0;
for (let item of _.takeRightWhile(whileArray, (e) => (e<10))) {whileSum +=item;}
CUT.isEqual("takeRightWhile(); values", whileSum, 20);
whileSum = 0;
for (let item of _.takeRightWhile(whileArray, (e) => (e<0))) {whileSum += item;}
CUT.isEqual("takeRightWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of _.takeRightWhile(whileArray, (e) => (e<30))) {whileSum+=item;}
CUT.isEqual("takeRightWhile(); full list", whileSum, 72);

whileSum = 0;
for (let item of _.dropRightWhile(whileArray, (e) => (e<10))) {whileSum +=item;}
CUT.isEqual("dropRightWhile(); values", whileSum, 52);
whileSum = 0;
for (let item of _.dropRightWhile(whileArray, (e) => (e<30))) {whileSum +=item;}
CUT.isEqual("dropRightWhile(); empty list", whileSum, 0);
whileSum = 0;
for (let item of _.dropRightWhile(whileArray, (e) => (e<0))) {whileSum += item;}
CUT.isEqual("dropRightWhile(); full list", whileSum, 72);


CUT.isEqual("concat(); one", "[4,5,6]",
  JSON.stringify([..._.concat([4,5,6])])
);
CUT.isEqual("concat(); more", "[\"1\",\"2\",\"3\",4,5,6,7,8,9]",
  JSON.stringify([..._.concat("123", [4,5,6].values(), new Set([7,8,9]))])
);

let reduceArray = [4,5,6,7,8,9];
CUT.isEqual("reduce(); with initialvalue", 39,
  _.reduce(reduceArray.values(), (acc, v, i) => acc + v, 0)
);
CUT.isEqual("reduce(); without initialvalue", 39,
  _.reduce(reduceArray.values(), (acc, v, i) => acc + v)
);

CUT.isEqual("enumerate();",
  JSON.stringify([..._.enumerate(["Picard","Riker","Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]"
);
CUT.isEqual("enumerate(); with offset",
  JSON.stringify([..._.enumerate(["Picard","Riker","Data"],2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]"
);
CUT.isEqual("entries();",
  JSON.stringify([..._.entries(["Picard","Riker","Data"])]),
  "[[0,\"Picard\"],[1,\"Riker\"],[2,\"Data\"]]"
);
CUT.isEqual("entries(); with offset",
  JSON.stringify([..._.entries(["Picard","Riker","Data"],2)]),
  "[[2,\"Picard\"],[3,\"Riker\"],[4,\"Data\"]]"
);

CUT.isEqual("flat();", "[1,2,3,4,5,6,7,8,9]",
  JSON.stringify([..._.flat([[1,2,3].values(),new Set([4,5,6,6,7,7,4]),[8,9]])])
);

let joinSet = new Set([2,4,6,4,8,2]);
CUT.isEqual("join();",
  "2,4,6,8"+"2468"+"2;4;6;8"+"2abc4abc6abc8"+"2true4true6true8"+"2114116118",
  _.join(joinSet) + _.join(joinSet, "")
    + _.join(joinSet, ";") + _.join(joinSet, "abc")
    + _.join(joinSet, true) + _.join(joinSet, 11)
);

var FPArray = [1,2,3];

CUT.isEqual("arrayCycle(); - ES5 1 - with 2 parameters",
  "[4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14,4,true,\"fgh\",3.14]",
  JSON.stringify(_.arrayCycle([4,true,"fgh",3.14], 7))
);
CUT.isEqual("arrayCycle(); - ES5 2 - with default parameter (n = 100);",
  "[4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6,4,5,6]",
  JSON.stringify(_.arrayCycle([4,5,6]))
);
CUT.isEqual("arrayCycle(); - ES6 1 - ES5 1 - with 2 parameters",
  "[2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4]",
  JSON.stringify(_.arrayCycle(new Map([ [2,3],[3,4],[4,5] ]).keys(), 10))
);
CUT.isEqual("arrayCycle(); - ES6 2 - with default parameter (n = 100);",
  "[[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5],[2,3],[3,4],[4,5]]",
  JSON.stringify(_.arrayCycle(new Map([ [2,3],[3,4],[4,5] ]).entries()))
);

CUT.isEqual("arrayRepeat(); - 1 - with 2 parameters",
  "[\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\",\"abc\"]",
  JSON.stringify(_.arrayRepeat("abc", 8))
);
CUT.isEqual("arrayRepeat(); - 2 - with default parameter (n = 100);",
  "[3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14,3.14]",
  JSON.stringify(_.arrayRepeat(3.14))
);

CUT.isEqual("arrayRange(); - 1 - step default 1",
  "[5,6,7,8,9,10,11,12]", JSON.stringify(_.arrayRange(5,12))
);
CUT.isEqual("arrayRange(); - 2 - step 3",
  "[1,4,7,10,13,16]", JSON.stringify(_.arrayRange(1,16,3))
);
CUT.isEqual(
  "arrayRange(); - 3 - step 3.2 <i>(can be failed - float storage)<i>",
  "[1,4.2,7.4,10.600000000000001,13.8,17]",
  JSON.stringify(_.arrayRange(1,17,3.2))
);
CUT.isEqual("arrayRange(); - 4 - without parameters",
  "[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]",
  JSON.stringify(_.arrayRange())
);
CUT.isEqual("arrayRange(); - 4 - with 1 parameter",
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
CUT.isEqual("zip(); ES5 1","[[\"a1\",\"c1\"],[\"a2\",\"c2\"],[\"a3\",\"c3\"]]",
  JSON.stringify(_.zip(zipA, zipC)));
CUT.isEqual("zip(); ES5 2",
  "[[\"a1\",\"b1\",\"c1\",\"d1\",\"e1\"],[\"a2\",\"b2\",\"c2\",\"d2\",\"e2\"]]",
  JSON.stringify(_.zip(zipA, zipB, zipC, zipD, zipE))
);
CUT.isEqual("zip(); ES6 1", "[[\"a\",3],[\"b\",4],[\"c\",5],[\"d\",6]]",
  JSON.stringify(_.zip(
    new Set(a), new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values()
 ))
);
CUT.isEqual("zip(); ES6 2",
  "[[\"a\",3,\"c1\"],[\"b\",4,\"c2\"],[\"c\",5,\"c3\"],[\"d\",6,\"c4\"]]",
  JSON.stringify(_.zip(new Set(zipF),
    new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values(),
    zipC.values()
  ))
);


CUT.isEqual("unzip(); ES5",
  "[[\"a1\",\"a2\"],[\"b1\",\"b2\"],[\"c1\",\"c2\"],[\"d1\",\"d2\"],[\"e1\",\"e2\"]]",
  JSON.stringify(_.unzip(_.zip(zipA, zipB, zipC, zipD, zipE)))
);
CUT.isEqual("unzip(); ES6",
  "[[\"a\",\"b\",\"c\",\"d\"],[3,4,5,6],[\"c1\",\"c2\",\"c3\",\"c4\"]]",
  JSON.stringify(
    _.unzip(
      _.zip(new Set(zipF),
        new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values(),
        zipC.values()
      ).values()
    )
  )
);

CUT.isEqual("zipObj();",
  '{"a":1,"b":2,"c":3}', JSON.stringify(_.zipObj(["a","b","c"],[1,2,3]))
);

var a = [21,11,41,51,31];
CUT.isEqual("min(); ES5", 11, _.min(a));
CUT.isEqual("max(); ES5", 51, _.max(a));
CUT.isEqual("min(); ES6", 11, _.min(new Set(a)));
CUT.isEqual("max(); ES6", 51, _.max(new Set(a).keys()));
CUT.isEqual("min(); number test", _.min([5, 10, 3]), 3);
CUT.isEqual("max(); number test", _.max([5, 10, 3]), 10);

var superset1 = [3,11,58,95,88];
var superset2 = [88,95,11];
var superset3 = [88,95,11,84];
CUT.isTrue("isSuperset(); - ES5 - true", _.isSuperset(superset1, superset2));
CUT.isFalse("isSuperset(); - ES5 - false", _.isSuperset(superset3, superset1));
CUT.isTrue("isSuperset(); - ES6 - true",
  _.isSuperset(new Set(superset1), superset2.values()));
CUT.isFalse("isSuperset(); - ES6 - false",
  _.isSuperset(new Set(superset3).keys(), superset1.keys()));

var a = [21,11,41,51,31];

var a = [1,2,3,4], b = [3,4,5,6], c = [5,6,7,8];
CUT.isEqual(
  "arrayUnion(); ES5", "[1,2,3,4,5,6,7,8]",JSON.stringify(_.arrayUnion(a,b,c)));
CUT.isEqual(
  "arrayIntersection(); ES5", "[3,4]",JSON.stringify(_.arrayIntersection(a,b)));
CUT.isEqual(
  "arrayDifference(); ES5", "[1,2]", JSON.stringify(_.arrayDifference(a,b)));
CUT.isEqual("arraySymmetricDifference(); ES5",
  "[1,2,5,6]", JSON.stringify(_.arraySymmetricDifference(a,b))
);
try {
  CUT.isEqual("arrayUnion(); ES6", "[1,2,3,4,5,6,7,8]",
    JSON.stringify(_.arrayUnion(new Set(a),b.values(),new Set(c).values())));
  CUT.isEqual("arrayIntersection(); ES6", "[3,4]",
    JSON.stringify(_.arrayIntersection(a.values(),new Set(b))));
  CUT.isEqual("arrayDifference(); ES6", "[1,2]",
    JSON.stringify(
      _.arrayDifference(new Map([[1,2],[2,3],[3,4],[4,5]]).keys(),b.values())));
  CUT.isEqual("arraySymmetricDifference(); ES6", "[1,2,5,6]",
    JSON.stringify(_.arraySymmetricDifference(
      new Set(a).keys(), new Map([[1,3],[2,4],[3,5],[4,6]]).values())));
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
CUT.isTrue("setUnion(); ES6",
  __setEquals__(
    _.setUnion(new Map([ [2,1],[3,2],[4,3],[5,4] ]).values(),sb,c),
    _.setUnion(a,new Map([ [2,3],[3,4],[4,5],[5,6] ]).values(),sc.values())
  )
);
CUT.isTrue("setIntersection(); ES6",
  __setEquals__(new Set([3,4]), _.setIntersection(sa,sb))
);
CUT.isTrue("setDifference(); ES6",
  __setEquals__(new Set([1,2]), _.setDifference(sa,sb))
);
CUT.isTrue("setSymmetricDifference(); ES6",
  __setEquals__(new Set([1,2,5,6]), _.setSymmetricDifference(sa,sb))
);

var arrTestClearRemove1 = [1,2,3,4,5,6,7,8,9,0];
var arrTestClearRemove2 = _.arrayClear(arrTestClearRemove1);
CUT.isTrue("arrayClear();",
  (arrTestClearRemove1 === arrTestClearRemove2
    && arrTestClearRemove1.length === 0 && Array.isArray(arrTestClearRemove1))
);

/* arrayremove begin */
var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isTrue("arrayRemove(); - 1 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 6));
CUT.isFalse("arrayRemove(); - 1 found - not all - false",
  _.arrayRemove(arrTestClearRemove1, 6));
CUT.isEqual("arrayRemove(); - 1 found - not all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isTrue("arrayRemove(); - 1 found - all - true",
  _.arrayRemove(arrTestClearRemove1, 6, true));
CUT.isFalse("arrayRemove(); - 1 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 6, true));
CUT.isEqual("arrayRemove(); - 1 found - all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isTrue("arrayRemove(); - 3 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 5));
CUT.isTrue("arrayRemove(); - 3 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 5, false));
CUT.isEqual("arrayRemove(); - 3 found - not all - value check",
  "[1,2,3,4,6,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isTrue("arrayRemove(); - 3 found - all - true",
  _.arrayRemove(arrTestClearRemove1, 5, true));
CUT.isFalse("arrayRemove(); - 3 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 5, true));
CUT.isEqual("arrayRemove(); - 3 found - all - value check",
  "[1,2,3,4,6,7,8,9,0]", JSON.stringify(arrTestClearRemove1)
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
CUT.isFalse("arrayRemove(); - 0 found - not all - false",
  _.arrayRemove(arrTestClearRemove1, 11));
CUT.isFalse("arrayRemove(); - 0 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 11, true));
CUT.isEqual("arrayRemove(); - 0 found - value check",
  "[1,2,3,4,5,6,5,7,8,5,9,0]", JSON.stringify(arrTestClearRemove1));
/* arrayremove end */

/* arrayremoveby begin */
var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isTrue("arrayRemoveBy(); - 1 found - not all - true",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>6) ));
CUT.isFalse("arrayRemoveBy(); - 1 found - not all - false",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>6)));
CUT.isEqual("arrayRemoveBy(); - 1 found - not all - value check",
  "[1,3,2,4,5,3,2]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isTrue("arrayRemoveBy(); - 1 found - all - true",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>6), true));
CUT.isFalse("arrayRemoveBy(); - 1 found - all - false",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>6), true));
CUT.isEqual("arrayRemoveBy(); - 1 found - all - value check",
  "[1,3,2,4,5,3,2]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isTrue("arrayRemoveBy(); - 3 found - not all - true",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>3)));
CUT.isTrue("arrayRemoveBy(); - 3 found - not all - true",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>3), false));
CUT.isEqual("arrayRemoveBy(); - 3 found - not all - value check",
  "[1,3,2,9,3,2]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isTrue("arrayRemoveBy(); - 3 found - all - true",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>3), true));
CUT.isFalse("arrayRemoveBy(); - 3 found - all - false",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>3), true));
CUT.isEqual("arrayRemoveBy(); - 3 found - all - value check",
  "[1,3,2,3,2]", JSON.stringify(arrTestClearRemove1));

var arrTestClearRemove1 = [1,3,2,4,5,9,3,2];
CUT.isFalse("arrayRemoveBy(); - 0 found - not all - false",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>13)));
CUT.isFalse("arrayRemoveBy(); - 0 found - all - false",
  _.arrayRemoveBy(arrTestClearRemove1, (v) => (v>13), true));
CUT.isEqual("arrayRemoveBy(); - 0 found - value check",
  "[1,3,2,4,5,9,3,2]", JSON.stringify(arrTestClearRemove1));
/* arrayremoveby end */

CUT.isEqual("arrayUnique(); 1 ES5 - Array and String",
  JSON.stringify(_.arrayUnique(
    ["A","r","r","a","y","y","a","n","d","d","M","M","a","p"]
  )),
  JSON.stringify(_.arrayUnique("ArrayyanddMMap"))
);
CUT.isEqual("arrayUnique(); 2 ES6 - Array and Set",
  JSON.stringify(_.arrayUnique([1,2,2,3,4,4,5,6,6,7])),
  JSON.stringify(_.arrayUnique(new Set([1,2,2,3,4,4,5,6,6,7])))
);
CUT.isEqual("arrayUnique(); 3 ES6 - Array and Map values(); iterator",
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
CUT.isTrue("arrayAdd(); true", _.arrayAdd(arrayAddTest, 4));
CUT.isFalse("arrayAdd(); false", _.arrayAdd(arrayAddTest, 4));
CUT.isEqual("arrayAdd(); value check", "[1,2,3,5,4]",
  JSON.stringify(arrayAddTest));

var arrMerge1 = [1,2,3];
var arrMerge2 = [4,5,6];
var arrMerge3 = [7,8,[10,11,12,[13,14,15]],9];
var arrMergeStr = JSON.stringify(_.arrayMerge(arrMerge1, arrMerge2));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(_.arrayMerge(arrMerge1, arrMerge2, arrMerge3));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(
  _.arrayMerge(false, arrMerge1, arrMerge2, arrMerge3));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(
  _.arrayMerge(true, arrMerge1, arrMerge2, arrMerge3));
arrMergeStr += JSON.stringify(arrMerge1);
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify(
  _.arrayMerge(true, [], arrMerge1, arrMerge3, 42, 3.14));
CUT.isEqual("arrayMerge();", "[1,2,3,4,5,6]" + "[1,2,3,4,5,6]"
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

CUT.addElement("hr");
CUT.addElement("h3", "cookie");

_.setCookie("ctest3", "cookieUnitTestStr");
CUT.isTrue("setcookie(); + hasCookie(); true", _.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) value","cookieUnitTestStr",_.getCookie("ctest3"));
CUT.isEqual("getCookie();", "cookieUnitTestStr", _.getCookie()["ctest3"]);
CUT.isTrue("removeCookie(); true", _.removeCookie("ctest3"));
CUT.isFalse("removeCookie(); false", _.removeCookie("ctest3"));
CUT.isFalse("hasCookie(); false", _.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) null", null, _.getCookie("ctest3"));
CUT.isEqual("getCookie(); undefined", undefined, _.getCookie()["ctest3"]);

var cookieClearStr = "";
_.setCookie("ctest4", "cookieUnitTestStr");
_.setCookie("ctest5", "cookieUnitTestStr");
cookieClearStr += String(_.hasCookie("ctest4")) + String(_.hasCookie("ctest5"));
_.clearCookies();
cookieClearStr += String(_.hasCookie("ctest4")) + String(_.hasCookie("ctest5"));
CUT.isEqual("clearCookies();", "truetruefalsefalse", cookieClearStr);


/* cookie with settings object */

CUT.addElement("hr");
CUT.addElement("h3", "cookie with settings object");

_.setCookie({"name": "ctest3", "value": "cookieUnitTestStr", "SameSite":"Lax"});
CUT.isTrue("setcookie(); + hasCookie(); true <i>(settings object)</i>",
  _.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) value <i>(settings object)</i>",
  "cookieUnitTestStr", _.getCookie("ctest3"));
CUT.isEqual("getCookie(); <i>(settings object)</i>", "cookieUnitTestStr",
  _.getCookie()["ctest3"]);
CUT.isTrue("removeCookie(); true <i>(settings object)</i>",
  _.removeCookie({"name": "ctest3", "SameSite": "Lax"}));
CUT.isFalse("removeCookie(); false <i>(settings object)</i>",
  _.removeCookie({"name": "ctest3", "SameSite": "Lax"}));
CUT.isFalse("hasCookie(); false <i>(settings object)</i>",
  _.hasCookie("ctest3"));
CUT.isEqual("getCookie(name) null <i>(settings object)</i>", null,
  _.getCookie("ctest3"));
CUT.isEqual("getCookie(); undefined <i>(settings object)</i>", undefined,
  _.getCookie()["ctest3"]);

var cookieClearStr = "";
_.setCookie({"name": "ctest4", "value": "cookieUnitTestStr", "SameSite":"Lax"});
_.setCookie({"name": "ctest5", "value": "cookieUnitTestStr", "SameSite":"Lax"});
cookieClearStr += String(_.hasCookie("ctest4")) + String(_.hasCookie("ctest5"));
_.clearCookies({"SameSite": "Lax"});
cookieClearStr += String(_.hasCookie("ctest4")) + String(_.hasCookie("ctest5"));
CUT.isEqual("clearCookies(); <i>(settings object)</i>", "truetruefalsefalse",
  cookieClearStr);


/* polyfills */

CUT.addElement("hr");
CUT.addElement("h3", "polyfills");

var arrFindLast = [1,2,5,6,3,4,7,8];
CUT.isTrue("Array.prototype.findLast();",
  arrFindLast.findLast( (v) => (v < 5) ) === 4
  && arrFindLast.findLast( (v) => (v < 0) ) === undefined
  && arrFindLast.findLast( (v) => (v < 2) ) === 1
  && arrFindLast.findLast( (v) => (v > 1) ) === 8
  && [].findLast( (v) => (v < 0) ) === undefined
);
CUT.isTrue("Array.prototype.findLastIndex();",
  arrFindLast.findLastIndex( (v) => (v < 5) ) === 5
  && arrFindLast.findLastIndex( (v) => (v < 0) ) === -1
  && arrFindLast.findLastIndex( (v) => (v < 2) ) === 0
  && arrFindLast.findLastIndex( (v) => (v > 1) ) === 7
  && [].findLastIndex( (v) => (v < 0) ) === -1
);

var arrFindLast = new Uint8Array([1,2,5,6,3,4,7,8]);
CUT.isTrue("Uint8Array.prototype.findLast();",
  arrFindLast.findLast( (v) => (v < 5) ) === 4
  && arrFindLast.findLast( (v) => (v < 0) ) === undefined
  && arrFindLast.findLast( (v) => (v < 2) ) === 1
  && arrFindLast.findLast( (v) => (v > 1) ) === 8
  && [].findLast( (v) => (v < 0) ) === undefined
);
CUT.isTrue("Uint8Array.prototype.findLastIndex();",
  arrFindLast.findLastIndex( (v) => (v < 5) ) === 5
  && arrFindLast.findLastIndex( (v) => (v < 0) ) === -1
  && arrFindLast.findLastIndex( (v) => (v < 2) ) === 0
  && arrFindLast.findLastIndex( (v) => (v > 1) ) === 7
  && [].findLastIndex( (v) => (v < 0) ) === -1
);

var arrayAt = [4,5,6,7,8];
var arrayAtStr = "" + arrayAt.at(0)  + arrayAt.at(1)  + arrayAt.at(2)
  + arrayAt.at(3)   + arrayAt.at(4)  + arrayAt.at(5)  + arrayAt.at(-0)
  + arrayAt.at(-1)  + arrayAt.at(-2) + arrayAt.at(-3) + arrayAt.at(-4)
  + arrayAt.at(-5)  + arrayAt.at(-6);
CUT.isEqual("Array.prototype.at();", arrayAtStr,
  "45678undefined487654undefined");

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
CUT.isEqual("Array.prototype.at(); - arraylike object", arralikeAtStr,
  "45678undefined487654undefined"
);

var stringAt = "45678";
var stringAtStr = ""
  + stringAt.at(0)  + stringAt.at(1)  + stringAt.at(2)  + stringAt.at(3)
  + stringAt.at(4)  + stringAt.at(5)  + stringAt.at(-0) + stringAt.at(-1)
  + stringAt.at(-2) + stringAt.at(-3) + stringAt.at(-4) + stringAt.at(-5)
  + stringAt.at(-6);
CUT.isEqual("String.prototype.at();", stringAtStr,
  "45678undefined487654undefined"
);

var typedarrayAt = new Uint8Array([4,5,6,7,8]);
var typedarrayAtStr = ""
  + typedarrayAt.at(0)  + typedarrayAt.at(1)  + typedarrayAt.at(2)
  + typedarrayAt.at(3)  + typedarrayAt.at(4)  + typedarrayAt.at(5)
  + typedarrayAt.at(-0) + typedarrayAt.at(-1) + typedarrayAt.at(-2)
  + typedarrayAt.at(-3) + typedarrayAt.at(-4) + typedarrayAt.at(-5)
  + typedarrayAt.at(-6);
CUT.isEqual("Uint8Array.prototype.at();",
  typedarrayAtStr,
  "45678undefined487654undefined"
);

var hasOwnObject = {"a": 1, "b": 2};
var hasOwnArray = [4,5,6];
CUT.isEqual("Object.hasOwn();", "true false false true false false", ""
    + Object.hasOwn(hasOwnObject, "a")
    + " " + Object.hasOwn(hasOwnObject, "hasOwnProperty")
    + " " + Object.hasOwn(hasOwnObject, "c")
    + " " + Object.hasOwn(hasOwnArray, "0")
    + " " + Object.hasOwn(hasOwnArray, "map")
    + " " + Object.hasOwn(hasOwnArray, "map2")
);

CUT.isEqual("String.prototype.replaceAll();",
  "aabbcc".replaceAll("b", ".") + "aabbcc".replaceAll(/b/g, '.'),
  "aa..cc" + "aa..cc"
);

const regexp = RegExp('foo*','g');
const str = 'table football, foosball';
let matches1 = str.matchAll(regexp);
let resMatchAll1 = "";
for (const item of matches1) { resMatchAll1 += item; }
let matches2 = str.matchAll(regexp);
let resMatchAll2 = JSON.stringify(Array.from(matches2, m => m[0]));
CUT.isTrue("String.prototype.matchAll();",
  (resMatchAll1 === "foofoo" && resMatchAll2 === "[\"foo\",\"foo\"]"));

var padStr = "lorem".padStart(10);
padStr += "lorem".padStart(10, "foo") + "lorem".padStart(6,"123465");
padStr += "lorem".padStart(15,"123465") + "lorem".padStart(8, "0");
padStr += "lorem".padStart(1) + "lorem".padStart(NaN);
padStr += "lorem".padStart(15,undefined) + "lorem".padStart(15,null);
padStr += "lorem".padStart(15,true) + "lorem".padStart(15,false);
padStr += "lorem".padStart(15,{a:1}) + "lorem".padStart(15,[]);
padStr += "lorem".padStart(15,[1,2,"c"]) + "lorem".padStart(15,42);
padStr += "lorem".padStart(15,3.14);
CUT.isEqual("String.prototype.padStart();",
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
CUT.isEqual("String.prototype.padEnd();",
  "lorem     "+"loremfoofo"+"lorem1"+"lorem1234651234"+"lorem000"+"lorem"
    +"lorem"+"lorem          "+"loremnullnullnu"+"loremtruetruetr"
    +"loremfalsefalse"+"lorem[object Ob"+"lorem"+"lorem1,2,c1,2,c"
    +"lorem4242424242"+"lorem3.143.143.",
  padStr
);

var trimStr = "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n";
CUT.isEqual("String.prototype.trimStart();",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimStart()
);
CUT.isEqual("String.prototype.trimLeft();",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimLeft()
);
CUT.isEqual("String.prototype.trimEnd();",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimEnd()
);
CUT.isEqual("String.prototype.trimRight();",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimRight()
);

var testArrayFI = [66, 7, 135, 75, 190, 89];

CUT.addElement(_.domCreate("div", {"id": "testDivNode"}, "#testDivNode"));
var testDivNode = _.qs("#testDivNode");
testDivNode.append(_.domCreate("p", {"id": "testNodeP1"}, "testNodeP1"));
testDivNode.append(_.domCreate("p", {"id": "testNodeP2"}, "testNodeP2"));

var dqsaList = document.querySelectorAll("#testDivNode > p")
dqsaList.forEach(function (e) { e.style["color"] = "blue"; });
CUT.isEqual("NodeList.prototype.forEach();", true,
  dqsaList[0].style["color"] === "blue" && dqsaList[1].style["color"]==="blue");

var testNodeP1 = _.qs("#testNodeP1");
var testNodeP2 = _.qs("#testNodeP2");

CUT.isEqual("globalThis;", window, globalThis);

var arr = [ ["0","a"], ["1","b"], ["2","c"] ];
CUT.isEqual("Object.fromEntries(); step 1 array",'{"0":"a","1":"b","2":"c"}',
  JSON.stringify(Object.fromEntries(arr)));

var obj = {"a":1,"b":2,"c":3};
CUT.isEqual("Object.fromEntries(); step 2 Object.entries",
  '{"a":1,"b":2,"c":3}', JSON.stringify(Object.fromEntries(Object.entries(obj)))
);

var fromEntriesMap = new Map([ ["foo","bar"], ["baz",42] ]);
CUT.isEqual(
  "Object.fromEntries(); step 3 Map - doesn't work in IE11",'{"foo":"bar","baz":42}',
  JSON.stringify(Object.fromEntries(fromEntriesMap))
);

var flatArr1 = [1,2,3,4];
var flatArr2 = [1,2,[3,4]];
var flatArr3 = [1,2,[3,4,[5,6]]];
CUT.isTrue("Array.prototype.flat();",
  "[1,2,3,4]" === JSON.stringify(flatArr1.flat())
  && "[1,2,3,4]" === JSON.stringify(flatArr1.flat(1000))
  && "[1,2,3,4]" === JSON.stringify(flatArr1.flat(Infinity))
  && "[1,2,3,4]" === JSON.stringify(flatArr2.flat())
  && "[1,2,3,4,[5,6]]" === JSON.stringify(flatArr3.flat())
  && "[1,2,3,4,[5,6]]" === JSON.stringify(flatArr3.flat(1))
  && "[1,2,3,4,5,6]" === JSON.stringify(flatArr3.flat(2))
  && "[1,2,3,4,5,6]" === JSON.stringify(flatArr3.flat(1000))
  && "[1,2,3,4,5,6]" === JSON.stringify(flatArr3.flat(Infinity))
  && "[1,2,[3,4,[5,6]]]" === JSON.stringify(flatArr3.flat(0))
  && "[1,2,[3,4,[5,6]]]" === JSON.stringify(flatArr3.flat(-1))
  && "[1,2,[3,4,[5,6]]]" === JSON.stringify(flatArr3.flat("a2"))
  && "[1,2,[3,4,[5,6]]]" === JSON.stringify(flatArr3.flat(false))
  && "[1,2,3,4,[5,6]]" === JSON.stringify(flatArr3.flat(true))
);

var flatMapArr1 = [1,2,3,4];
var flatMapArr2 = ["lorem ipsum dolor", "", "sit"];
CUT.isTrue("Array.prototype.flatMap();",
  "[[2],[4],[6],[8]]" === JSON.stringify(flatMapArr1.map(function (x) { return [x * 2]; }))
  && "[2,4,6,8]" === JSON.stringify(flatMapArr1.flatMap(function (x) { return [x * 2]; }))
  && "[[2],[4],[6],[8]]" === JSON.stringify(flatMapArr1.flatMap(function (x) { return [[x * 2]]; }))
  && '[["lorem","ipsum","dolor"],[""],["sit"]]' === JSON.stringify(flatMapArr2.map(function (x) { return x.split(" "); }))
  && '["lorem","ipsum","dolor","","sit"]' === JSON.stringify(flatMapArr2.flatMap(function (x) { return x.split(" "); }))
);

/* non-standard polyfills */

CUT.addElement("hr");
CUT.addElement("h3", "non-standard polyfills");

if (window.BigInt) {
  CUT.isEqual("BigInt.prototype.toJSON();", '"42"', JSON.stringify(BigInt(42)));
}

const testGenFn = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
var sum = "";
for (let x of testGenFn(3)) { sum += x; }
CUT.isEqual("GeneratorFunction();", "912", sum);

let afunction = new AsyncFunction("a","b",
  "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);");
CUT.isEqual("AsyncFunction();", "asyncfunction", _.getType(afunction));


/* type checking */

CUT.addElement("hr");
CUT.addElement("h3", "type checking");

CUT.isTrue("isPlainObject();",
  !_.isPlainObject(null)
    && !_.isPlainObject("")
    && !_.isPlainObject([])
    && !_.isPlainObject(function(){})
    && _.isPlainObject({})
    && _.isPlainObject({a: "1", b: "2"})
    && _.isPlainObject(Object.create(null))
);

CUT.isTrue("isEmptyMap(); true", _.isEmptyMap(new Map()));
CUT.isFalse("isEmptyMap(); false 1", _.isEmptyMap(new Map([[4,5],[6,7]])));
CUT.isFalse("isEmptyMap(); false 2 array", _.isEmptyMap([]));

CUT.isTrue("isEmptySet(); true", _.isEmptySet(new Set()));
CUT.isFalse("isEmptySet(); false 1", _.isEmptySet(new Set([4,5,6])));
CUT.isFalse("isEmptySet(); false 2 array", _.isEmptySet([]));

CUT.isTrue("isEmptyIterator(); true", _.isEmptyIterator([]));
CUT.isFalse("isEmptyIterator(); false", _.isEmptyIterator([4,5,6]));

CUT.isTrue("isDataView(); true",
  _.isDataView(new DataView(new ArrayBuffer(2)), "dataview")
);
CUT.isFalse("isDataView(); false", _.isDataView({}, "dataview"));

var isErrorStr = ""
  + _.isError(new Error) + " " + _.isError(new RangeError)
  + " " + _.isError(new SyntaxError) + " " + _.isError({})
  + " " + _.isError([]);
CUT.isEqual("isError();", isErrorStr, "true true true false false" );

CUT.isTrue("isGeneratorFn(); true",
  _.isGeneratorFn(function* fn42g () { yield 42; }));
CUT.isFalse("isGeneratorFn(); false 1 fn",
  _.isGeneratorFn(function fn42 () { return 42; }));
CUT.isFalse("isGeneratorFn(); false 2 async fn",
  _.isGeneratorFn(new AsyncFunction("a","b","return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"))
);
CUT.isFalse("isGeneratorFn(); false 3 number", _.isGeneratorFn(42));

CUT.isTrue("isAsyncFn(); true",
  _.isAsyncFn(new AsyncFunction("a","b","return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);"))
);
CUT.isFalse("isAsyncFn(); false 1 fn",
  _.isAsyncFn(function fn42 () { return 42; }) );
CUT.isFalse("isAsyncFn(); false 2 generator fn",
  _.isAsyncFn(function* fn42g () { yield 42; }) );
CUT.isFalse("isAsyncFn(); false 3 number", _.isAsyncFn(42));

CUT.isTrue("isString(); true", _.isString("str"));
CUT.isFalse("isString(); false", _.isString(533));
CUT.isTrue("isChar(); true", _.isChar("s"));
CUT.isFalse("isChar(); false 1", _.isChar("str"));
CUT.isFalse("isChar(); false 2", _.isChar(533));
CUT.isTrue("isNumber(); true 1", _.isNumber(98));
CUT.isTrue("isNumber(); true 2", _.isNumber(3.14));
CUT.isFalse("isNumber(); false", _.isNumber("str"));
CUT.isTrue("isFloat(); true", _.isFloat(3.14));
CUT.isFalse("isFloat(); false 1", _.isFloat(98));
CUT.isFalse("isFloat(); false 2", _.isFloat("str"));
CUT.isTrue("isBoolean(); true", _.isBoolean(false));
CUT.isFalse("isBoolean(); false", _.isBoolean(98));
CUT.isTrue("isObject(); 1 true {}", _.isObject({}));
CUT.isTrue("isObject(); 2 true array", _.isObject([]));
CUT.isFalse("isObject(); 3 false null", _.isObject(null));
CUT.isFalse("isObject(); 4 false number", _.isObject(98));
CUT.isTrue("isEmptyObject(); 1 true", _.isEmptyObject({}));
CUT.isFalse("isEmptyObject(); 2 false ", _.isEmptyObject({a:1}));
CUT.isFalse("isEmptyObject(); 3 false number", _.isEmptyObject(98));
CUT.isFalse("isEmptyObject(); 4 false null", _.isEmptyObject(null));
CUT.isFalse("isEmptyObject(); 5 false undefined", _.isEmptyObject(undefined));
CUT.isTrue("isFunction(); true", _.isFunction(_.noop));
CUT.isFalse("isFunction(); false", _.isFunction(document.querySelector("p")));
CUT.isTrue("isEmptyArray(); true", _.isEmptyArray([]));
CUT.isFalse("isEmptyArray(); false 1", _.isEmptyArray([1,2,3]));
CUT.isFalse("isEmptyArray(); false 2",
  _.isEmptyArray(document.querySelector("p")));
CUT.isTrue("isArraylike(); true 1 array", _.isArraylike([]));
CUT.isTrue("isArraylike(); true 2 querySelectorAll",
  _.isArraylike(document.querySelectorAll("p")));
CUT.isTrue("isArraylike(); true 3 arraylike object",
  _.isArraylike({0:4,1:5,length:2}));
CUT.isTrue("isArraylike(); true 4 string", _.isArraylike("Pillangó"));
CUT.isTrue("isArraylike(); true 5 empty string", _.isArraylike(""));
CUT.isFalse("isArraylike(); false 1 element",
  _.isArraylike(document.querySelector("p")));
CUT.isFalse("isArraylike(); false 2 number", _.isArraylike(42));
CUT.isFalse("isArraylike(); false 3 null", _.isArraylike(null));
CUT.isFalse("isArraylike(); false 4 object", _.isArraylike({0:4,1:5}));
CUT.isTrue("isNull(); true", _.isNull(null));
CUT.isFalse("isNull(); false", _.isNull(document.querySelectorAll("p")));
CUT.isTrue("isUndefined(); true", _.isUndefined(undefined));
CUT.isFalse("isUndefined(); false",
  _.isUndefined(document.querySelectorAll("p")));
CUT.isTrue("isNullOrUndefined(); true 1", _.isNullOrUndefined(undefined));
CUT.isTrue("isNullOrUndefined(); true 2", _.isNullOrUndefined(null));
CUT.isFalse("isNullOrUndefined(); false",
  _.isNullOrUndefined(document.querySelectorAll("p")));
CUT.isTrue("isNil(); true 1", _.isNil(undefined));
CUT.isTrue("isNil(); true 2", _.isNil(null));
CUT.isFalse("isNil(); false", _.isNil(document.querySelectorAll("p")));
CUT.isTrue("isPrimitive(); true 1", _.isPrimitive(98));
CUT.isTrue("isPrimitive(); true 2", _.isPrimitive("str"));
CUT.isFalse("isPrimitive(); false 1",
  _.isPrimitive(document.querySelectorAll("p")));
CUT.isFalse("isPrimitive(); false 2", _.isPrimitive(_.noop));
CUT.isTrue("isDate(); true", _.isDate(new Date()));
CUT.isFalse("isDate(); false", _.isDate({}));
CUT.isTrue("isRegexp(); true", _.isRegexp(/^\[object (.+)\]$/g));
CUT.isFalse("isRegexp(); false", _.isRegexp("string"));
CUT.isTrue("isElement(); true 1", _.isElement(document.body));
CUT.isTrue("isElement(); true 2", _.isElement(_.qs("div")));
CUT.isFalse("isElement(); false 1",
  _.isElement(document.createTextNode("sample text")));
CUT.isFalse("isElement(); false 2 ",
  _.isElement(document.createComment("sample comment")));
CUT.isFalse("isElement(); false 3 ", _.isElement([]));

CUT.isTrue("isNumeric(); true",
  _.isNumeric(-42) && _.isNumeric(-1.42) && _.isNumeric(-0.42) &&
  _.isNumeric(0) && _.isNumeric(0.42) && _.isNumeric(.42) &&
  _.isNumeric(1.42) && _.isNumeric(42) && _.isNumeric(8e5) &&
  _.isNumeric(-8e5) && _.isNumeric(0x89f) && _.isNumeric(-0x89f) &&
  _.isNumeric("-42") && _.isNumeric("-1.42") && _.isNumeric("-0.42") &&
  _.isNumeric("0") && _.isNumeric("0.42") && _.isNumeric(".42") &&
  _.isNumeric("1.42") && _.isNumeric("42") && _.isNumeric("8e5") &&
  _.isNumeric("-8e5") && _.isNumeric("0x89f")
);
CUT.isFalse("isNumeric(); false",
  _.isNumeric(null) || _.isNumeric(undefined) || _.isNumeric(NaN) ||
  _.isNumeric("NaN") || _.isNumeric("1,42") || _.isNumeric("#foo") ||
  _.isNumeric("1.2.3") || _.isNumeric("") || _.isNumeric("bar") ||
  _.isNumeric(" ") || _.isNumeric("\r\n") || _.isNumeric("true") ||
  _.isNumeric("false") || _.isNumeric("1<10") || _.isNumeric([]) ||
  _.isNumeric({}) || _.isNumeric("-0x89f")
);

CUT.isTrue("isArrayBuffer(); true", _.isArrayBuffer(new ArrayBuffer(8)));
CUT.isFalse("isArrayBuffer(); false 1", _.isArrayBuffer([4,5,6]));
CUT.isFalse("isArrayBuffer(); false 2", _.isArrayBuffer(new Int8Array(5)));
CUT.isTrue("isTypedArray - true 1 - Int8Array",
  _.isTypedArray(new Int8Array(5)));
CUT.isTrue("isTypedArray - true 2 - Uint8Array",
  _.isTypedArray(new Uint8Array(5)));
CUT.isTrue("isTypedArray - true 3 - Int16Array",
  _.isTypedArray(new Int16Array(5)));
CUT.isTrue("isTypedArray - true 4 - Uint16Array",
  _.isTypedArray(new Uint16Array(5)));
CUT.isTrue("isTypedArray - true 5 - Int32Array",
  _.isTypedArray(new Int32Array(5)));
CUT.isTrue("isTypedArray - true 6 - Uint32Array",
  _.isTypedArray(new Uint32Array(5)));
CUT.isTrue("isTypedArray - true 7 - Float32Array",
  _.isTypedArray(new Float32Array(5)));
CUT.isTrue("isTypedArray - true 8 - Float64Array",
  _.isTypedArray(new Float64Array(5)));
CUT.isTrue("isTypedArray - true 9 - Uint8ClampedArray",
  _.isTypedArray(new Uint8ClampedArray(5)));
if (window.BigInt64Array) {CUT.isTrue("isTypedArray - true 10 - BigInt64Array",
  _.isTypedArray(new BigInt64Array(5)));}
if (window.BigUint64Array) {
  CUT.isTrue("isTypedArray - true 11 - BigUint64Array",
    _.isTypedArray(new BigUint64Array(5)));
}
CUT.isFalse("isTypedArray - false 1 - Array", _.isTypedArray([4,5,6]));
CUT.isFalse("isTypedArray - false 2 - ArrayBuffer",
  _.isTypedArray(new ArrayBuffer(8)));
CUT.isTrue("isPromise(); - true ", _.isPromise(_.delay(1000)));
CUT.isFalse("isPromise(); - false ", _.isPromise({}));
CUT.isTrue("isSymbol(); true", _.isSymbol(Symbol("str")));
CUT.isFalse("isSymbol(); false", _.isSymbol(_.noop));
CUT.isTrue("isMap(); true", _.isMap(new Map()));
CUT.isFalse("isMap(); false", _.isMap(_.noop));
CUT.isTrue("isSet(); true", _.isSet(new Set()));
CUT.isFalse("isSet(); false", _.isSet(_.noop));
CUT.isTrue("isWeakMap(); true", _.isWeakMap(new WeakMap()));
CUT.isFalse("isWeakMap(); false", _.isWeakMap(_.noop));
CUT.isTrue("isWeakSet(); true", _.isWeakSet(new WeakSet()));
CUT.isFalse("isWeakSet(); false", _.isWeakSet(_.noop));
CUT.isTrue("isIterator(); true - Array values();",
  _.isIterator([4,5,6].values()));
CUT.isTrue("isIterator(); true - Set values();",
  _.isIterator(new Set([4,5,7]).values()));
CUT.isTrue("isIterator(); true - Map values();",
  _.isIterator(new Map([[4,5],[5,6]]).values()));
CUT.isTrue("isIterator(); true - Nodelist values();",
  _.isIterator(document.querySelectorAll("h3").values()));

CUT.isFalse("isIterator(); false - Array", _.isIterator([4,5,7]));
CUT.isTrue("isIterable(); true", _.isIterable([]) && _.isIterable("")
    && _.isIterable(new Map([[1,2],[3,4]])) && _.isIterable(new Set([1,2]))
);
CUT.isFalse("isIterable(); false", _.isIterable(42) || _.isIterable(3.14)
  || _.isIterable({a:1,b:2}) || _.isIterable(true) || _.isIterable(false));

if (window.BigInt) {
  CUT.isTrue("isBigInt(); true",_.isBigInt(BigInt(9007199254740991)+BigInt(5)));
  CUT.isFalse("isBigInt(); false 1", _.isBigInt(9007199254740990));
  CUT.isFalse("isBigInt(); false 2", _.isBigInt(3.14));
  CUT.isFalse("isBigInt(); false 3", _.isBigInt("Arthur Dent"));
}


/* isSameType(); */
CUT.addElement("hr");
CUT.addElement("h3", "isSameType();");
CUT.isTrue("isSameArray(); step 1", _.isSameArray([], []) );
CUT.isTrue("isSameArray(); step 2", _.isSameArray([5,4,5], [5,4,5]) );
CUT.isFalse("isSameArray(); step 3", _.isSameArray([5,4,5], [4,5,6]) );
CUT.isFalse("isSameArray(); step 4", _.isSameArray([5,4,6], [4,5,5]) );
CUT.isFalse("isSameArray(); step 5", _.isSameArray([5,4,5], [4,4,5]) );
CUT.isFalse("isSameArray(); step 6", _.isSameArray([5,5], [5,5,4]) );
CUT.isFalse("isSameArray(); step 7", _.isSameArray([5,5,4], [5,5]) );
CUT.isFalse("isSameArray(); step 8",
  _.isSameArray([5,5], new Map([[5,5],[5,5]]))
);
CUT.isFalse("isSameArray(); step 9", _.isSameArray([5,5], new Set([5,5])) );
CUT.isFalse("isSameArray(); step 10", _.isSameArray([], {}) );
CUT.isFalse("isSameArray(); step 11", _.isSameArray({}, {}) );
CUT.isFalse("isSameArray(); step 12", _.isSameArray("4", "4") );
CUT.isFalse("isSameArray(); step 13", _.isSameArray(4, 4) );
CUT.isFalse("isSameArray(); step 14", _.isSameArray(4, 5) );

var
  isSameObjectO1 = { "p1": 4, "p2": 5, "p3": 6 },
  isSameObjectO2 = { "p1": 4, "p2": 5, "p3": 6 },
  isSameObjectO3 = { "p1": 4, "p2": 5, "p3": 7 },
  isSameObjectO4 = { "p1": 4, "p2": 5, "p3": 6, "p4": 7 };
CUT.isTrue("isSameObject(); true 1",
  _.isSameObject(isSameObjectO1, isSameObjectO2));
CUT.isTrue("isSameObject(); true 2 empty", _.isSameObject({}, {}) );
CUT.isFalse("isSameObject(); false 1",
  _.isSameObject(isSameObjectO1, isSameObjectO3));
CUT.isFalse("isSameObject(); false 2",
  _.isSameObject(isSameObjectO1, isSameObjectO4));
CUT.isFalse("isSameObject(); false 3",
  _.isSameObject([4,5], {"0": 4, "1": 5, "length": 2}));

CUT.isTrue("isSameSet(); true",
  _.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 8, 4])));
CUT.isFalse("isSameSet(); false 1",
  _.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 9])));
CUT.isFalse("isSameSet(); false 2",
  _.isSameSet(new Set([4,6,8,2]), new Set([2, 4, 6, 8, 9])));
CUT.isFalse("isSameSet(); false 3",
  _.isSameSet(new Set([4,6,8,2]), [4,6,8,2]));

CUT.isTrue("isSameMap(); true", _.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [true, 42]])
));
CUT.isFalse("isSameMap(); false 1", _.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [false, 42]])
));
CUT.isFalse("isSameMap(); false 2", _.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  new Map([["str", 1], [17, "x"], [false, 42], [true, 42]])
));
CUT.isFalse("isSameMap(); false 3", _.isSameMap(
  new Map([["str", 1], [17, "x"], [true, 42]]),
  [["str", 1], [17, "x"], [true, 42]]
));

CUT.isTrue("isSameIterator(); true",
  _.isSameIterator(new Set([4,6,8,2,6,4]), [4,8,6,2]));
CUT.isFalse("isSameIterator(); false",
  _.isSameIterator(new Set([4,6,8,2,6,4]), [4,8,6,2,5]));

/* AJAX, domReady(); and other callbacks */

CUT.addElement("hr");
CUT.addElement("h3", "AJAX, domReady(); and other callbacks");

_.domReady(function () { CUT.isTrue("domReady(); is working", true); });

/* importScript(); and importScripts(); */
CUT.addElement("p", "Here have to be these results:");
CUT.addElement("ul", "<li>1x domReady(); (core api) is working</li>"
  +"<li>2x importScript(); (core api) - first script loaded</li>"
  +"<li>2x importScript(); (core api) - second script loaded</li>"
  +"<li>1x importScript(); (core api) - with more scripts"
  +"<li>1x importScript(); (core api) with error</li>"
  +"<li>1x getJson()</li>"+"<li>1x getText()</li>"+"<li>12x ajax()</li>"
);

_.importScript("unittest-is1.js");
_.importScript("unittest-is2.js");
_.importScript("unittest-is1.js", "unittest-is2.js", "unittest-is3.js");
_.importScript("unittest-notExist.js");

/* AJAX functions */

var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <span class=\"small\">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</span></p>\r\n<p><b>Nullam dictum felis eu pede mollis pretium.</b> Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. <small>Etiam ultricies nisi vel augue.</small></p>";

_.getText("testdata.txt", function (r) { CUT.isEqual("getText();", resAjaxText, r); } );
_.getJson("testdata.json", function (r) { CUT.isEqual("getJson();", resAjaxJson, r[0].image); } );

_.ajax({
  queryType: "ajax",
  type: "get",
  url: "testdata.txt",
  format: "text",
  success: function (r) { CUT.isEqual("ajax(); ajax get text", resAjaxText, r); },
  error: function (e) {
    CUT.isEqual("ajax(); ajax get text: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "ajax",
  type: "get",
  url: "testdata.json",
  format: "json",
  success: function (r) {
    CUT.isEqual("ajax(); ajax get json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    CUT.isEqual("ajax(); ajax get json: "+JSON.stringify(e), true, false);
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
    CUT.isEqual("ajax(); ajax get xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isEqual("ajax(); ajax get xml: "+JSON.stringify(e), true, false);
  }
});

_.ajax({
  queryType: "ajax",
  type: "post",
  url: "testdata.txt",
  format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) {CUT.isEqual("ajax(); ajax post text",resAjaxText,r);},
  error: function (e) {
    CUT.isEqual("ajax(); ajax post text: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "ajax",
  type: "post",
  url: "testdata.json",
  format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); ajax post json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    CUT.isEqual("ajax(); ajax post json: "+JSON.stringify(e), true, false);
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
    CUT.isEqual("ajax(); ajax post xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isEqual("ajax(); ajax post xml: "+JSON.stringify(e), true, false);
  }
});

_.ajax({
  queryType: "cors",
  type: "get",
  url: "testdata.txt",
  format: "text",
  success: function (r) { CUT.isEqual("ajax(); cors get text",resAjaxText,r);},
  error: function (e) {
    CUT.isEqual("ajax(); cors get text: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "cors",
  type: "get",
  url: "testdata.json",
  format: "json",
  success: function (r) {
    CUT.isEqual("ajax(); cors get json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors get json: "+JSON.stringify(e), true, false);
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
    CUT.isEqual("ajax(); cors get xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors get xml: "+JSON.stringify(e), true, false);
  }
});

_.ajax({
  queryType: "cors",
  type: "post",
  url: "testdata.txt",
  format: "text",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); cors post text", resAjaxText, r);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors post text: "+JSON.stringify(e), true, false);
  }
});
_.ajax({
  queryType: "cors",
  type: "post",
  url: "testdata.json",
  format: "json",
  data: "a=foo&b=bar baz",
  success: function (r) {
    CUT.isEqual("ajax(); cors post json", resAjaxJson, r[0].image);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors post json: "+JSON.stringify(e), true, false);
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
    CUT.isEqual("ajax(); cors post xml", resAjaxXml, xb);
  },
  error: function (e) {
    CUT.isEqual("ajax(); cors post xml: "+JSON.stringify(e), true, false);
  }
});


}());

} catch (e) { alert("CUT global try-catch:\n" + e); }
