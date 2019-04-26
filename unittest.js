(function(){
"use strict";

// Celestra v2.7.0 testcases

/* _cut.isEqual("step", value, expr ); */
/* _cut.isEqual("step", value, expr, true ); */

/* Celestra ES6 extension */
_cut.addElement("h3", "Celestra ES6 extension");

_cut.addElement(
  _.domCreate(
    "button", {
      onclick: function () { _.importScript("celestra-es6.min.js"); } 
    },
    "Load celestra-es6.min.js"
  )
);

_cut.addElement("br");

_cut.addElement(
  _.domCreate(
    "button", {
      onclick: function () { _.importScript("celestra-es6.js"); } 
    },
    "Load celestra-es6.js"
  )
);

_cut.addElement("br");

_cut.addElement(
  _.domCreate(
    "button", {
      onclick: function () { _.importScript("unittest-es6.js"); } 
    },
    "Load unittest-es6.js"
  )
);


/* Not tested functions */
_cut.addElement("h3", "Not tested functions");
_cut.addElement(
  "ul",
  "<li>getUrlVar([name]);</li>"
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
_cut.addElement("h3", "Celestra object");

_cut.isEqual("Object name: \"celestra\"", true, celestra.random(100,200)>99 );
_cut.isEqual("Object name: \"_\"", true, _.random(100,200)>99 );

var taArr = ["a","b","c","d","e"];
_cut.isEqual("__toArray__() array", taArr, _.__toArray__(taArr) );
_cut.isTrue(
  "__toArray__() nodelist",
  Array.isArray( _.__toArray__(document.querySelectorAll("h3")) )
);


/* core api */
/*
getUrlVar([name]);
getLocation(<success>[,error]);
importStyle(<href>[,success]);
importStyles(<styles>);
getFullscreen();
setFullscreenOn(<selector> or <element>);
setFullscreenOff();
createFile(<filename>,<content>[,dType]);
noConflict();
*/
_cut.addElement("h3", "core api");

_cut.isEqual("version", true, _.version.includes("Celestra v") );

_cut.addElement(
  _.domCreate(
    "div",
    {"id": "qsaDivTestElement"},
    "#qsaDiv test element"
      + "<p id='qsaDivP1'>#qsaDivP1 test element</p>"
      + "<p id='qsaDivP2'>#qsaDivP2 test element</p>"
  )
);

_cut.isEqual(
  "qs() selector",
  document.querySelector("#qsaDivTestElement"),
  _.qs("#qsaDivTestElement")
);

_cut.isEqual(
  "qs() selector + element 1",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1", _.qs("#qsaDivTestElement"))
);

_cut.isEqual(
  "qs() selector + element 2",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1", document.querySelector("#qsaDivTestElement") )
);

var testQsa1 = _.qsa("#qsaDivTestElement > p")
_cut.isEqual(
  "qsa() selector",
  true,
  Array.isArray(testQsa1) &&
    testQsa1.length === 2 &&
    testQsa1[0] === _.qs("#qsaDivP1") &&
    testQsa1[1] === _.qs("#qsaDivP2")
);

var testQsa2 = _.qsa("p", _.qs("#qsaDivTestElement"))
_cut.isEqual(
  "qsa() selector + element 1",
  true,
  Array.isArray(testQsa2) &&
    testQsa2.length === 2 &&
    testQsa2[0] === _.qs("#qsaDivP1") &&
    testQsa2[1] === _.qs("#qsaDivP2")
);

var testQsa3 = _.qsa("p", document.querySelector("#qsaDivTestElement") )
_cut.isEqual(
  "qsa() selector + element 2",
  true,
  Array.isArray(testQsa3) &&
    testQsa3.length === 2 &&
    testQsa3[0] === _.qs("#qsaDivP1") &&
    testQsa3[1] === _.qs("#qsaDivP2")
);

testQsa3.forEach(function (e) { e.innerHTML += " each"; });
_cut.isEqual("qsa() forEach", true,
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
  testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);

_cut.isEqual("getType() ES5 values",
  "array  number  string  object  htmldocument  boolean  nodelist  htmlparagraphelement  null  undefined  function  date  regexp",
  _.getType([1,2,3])
  +"  "+_.getType(1998)
  +"  "+_.getType("hello world")
  +"  "+_.getType({a:1,b:2})
  +"  "+_.getType(document)
  +"  "+_.getType(true)
  +"  "+_.getType(document.querySelectorAll("p"))
  +"  "+_.getType(document.querySelector("p"))
  +"  "+_.getType(null)
  +"  "+_.getType(undefined)
  +"  "+_.getType(function(){})
  +"  "+_.getType(new Date())
  +"  "+_.getType(/^\[object (.+)\]$/g)
);

_cut.isEqual("getType() ES5 all true",
  "true  true  true  true  true  true  true  true  true  true  true  true  true",
 _.getType([1,2,3], "array")
  +"  "+_.getType(1998, "number")
  +"  "+_.getType("hello world", "string")
  +"  "+_.getType({a:1,b:2}, "object")
  +"  "+_.getType(document, "htmldocument")
  +"  "+_.getType(true, "boolean")
  +"  "+_.getType(document.querySelectorAll("p"), "nodelist")
  +"  "+_.getType(document.querySelector("p"), "htmlparagraphelement")
  +"  "+_.getType(null, "null")
  +"  "+_.getType(undefined, "undefined")
  +"  "+_.getType(function(){}, "function")
  +"  "+_.getType(new Date(), "date")
  +"  "+_.getType(/^\[object (.+)\]$/g, "regexp")
);

_cut.isEqual("getType() ES5 all false",
  "false  false  false  false  false  false  false  false  false  false  false  false  false",
  _.getType([1,2,3], "number")
  +"  "+_.getType(1998, "array")
  +"  "+_.getType("hello world", "object")
  +"  "+_.getType({a:1,b:2}, "string")
  +"  "+_.getType(document, "boolean")
  +"  "+_.getType(true, "htmldocument")
  +"  "+_.getType(document.querySelectorAll("p"), "htmlheadingelement")
  +"  "+_.getType(document.querySelector("p"), "nodelist")
  +"  "+_.getType(null, "undefined")
  +"  "+_.getType(undefined, "null")
  +"  "+_.getType(function(){}, "object")
  +"  "+_.getType(new Date(), "array")
  +"  "+_.getType(/^\[object (.+)\]$/g, "string")
);

if (_cut.isNotIE11()) {
  _cut.isEqual("getType() ES6 values",
    "map  set  weakmap  weakset",
    _.getType(new Map())
    +"  "+_.getType(new Set())
    +"  "+_.getType(new WeakMap())
    +"  "+_.getType(new WeakSet())
  );
  _cut.isEqual("getType() ES6 all true",
    "true  true  true  true",
    _.getType(new Map(), "map")
    +"  "+_.getType(new Set(), "set")
    +"  "+_.getType(new WeakMap(), "weakmap")
    +"  "+_.getType(new WeakSet(), "weakset")
  );
  _cut.isEqual("getType() ES6 all false",
    "false  false  false  false",
    _.getType(new Map(), "object")
    +"  "+_.getType(new Set(), "object")
    +"  "+_.getType(new WeakMap(), "object")
    +"  "+_.getType(new WeakSet(), "object")
  );
}

var foo1 = { a : "1", b : "2" };
var bar1 = { c : "3", d : "4",
  baz : { e : 5, fn : function(num) { return num*num; } }
};

var extObj1 = _.extend(true,{},foo1,bar1);
_cut.isEqual(
  "extend() true",
  "1  2  3  4  5  121",
  extObj1.a
  +"  "+extObj1.b
  +"  "+extObj1.c
  +"  "+extObj1.d
  +"  "+extObj1.baz.e
  +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.extend(false,{},foo1,bar1);
_cut.isEqual(
  "extend() false 1",
  "1  2  3  4  5  121",
  extObj1.a
  +"  "+extObj1.b
  +"  "+extObj1.c
  +"  "+extObj1.d
  +"  "+extObj1.baz.e
  +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.extend({},foo1,bar1);
_cut.isEqual(
  "extend() false 2",
  "1  2  3  4  5  121",
  extObj1.a
  +"  "+extObj1.b
  +"  "+extObj1.c
  +"  "+extObj1.d
  +"  "+extObj1.baz.e
  +"  "+extObj1.baz.fn(11)
);

var extObj1 = _.deepAssign({},foo1,bar1);
_cut.isEqual(
  "deepAssign()",
  "1  2  3  4  5  121",
  extObj1.a
  +"  "+extObj1.b
  +"  "+extObj1.c
  +"  "+extObj1.d
  +"  "+extObj1.baz.e
  +"  "+extObj1.baz.fn(11)
);

var obj2stringObj = {
  str: "éáűőúöüóíÉÁŰŐÚÖÜÓÍ",
  bool: true,
  pi: 3.141592653589793
};
_cut.isEqual(
  "obj2string()", "str=%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%89%C3%81%C5%B0%C5%90%C3%9A%C3%96%C3%9C%C3%93%C3%8D&bool=true&pi=3.141592653589793",
  _.obj2string(obj2stringObj)
);

/* inherit() */

function Human (name,age) {
  this.name = name;
  this.age = age;
}
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

_cut.isEqual(
  "inherit()",
  "David, 27"
  +"Amy, 25, Engineer"
  +"David instanceof Human: true"
  +"David instanceof Worker: false"
  +"Amy instanceof Human: true"
  +"Amy instanceof Worker: true",
  David.getName()+", "+David.getAge()
  + Amy.getName()+", "+Amy.getAge()+", "+Amy.getJob()
  + "David instanceof Human: " + (David instanceof Human)
  + "David instanceof Worker: " + (David instanceof Worker)
  + "Amy instanceof Human: " + (Amy instanceof Human)
  + "Amy instanceof Worker: " + (Amy instanceof Worker)
);

/* / inherit() */

_cut.isEqual(
  "getUrlVarFromString()",
  "a1",
  _.getUrlVarFromString("?testa=a1&testb=b2")["testa"]
);
_cut.isEqual(
  "getUrlVarFromString() prop",
  "b2",
  _.getUrlVarFromString("?testa=a1&testb=b2", "testb")
);

_cut.isEqual(
  "getUrlVarFromString() not found - null",
  null,
  _.getUrlVarFromString("?testa=a1&testb=b2", "testc")
);
_cut.isEqual(
  "getUrlVarFromString() prop not found - undefined",
  undefined,
  _.getUrlVarFromString("?testa=a1&testb=b2")["testc"]
);
_cut.isEqual(
  "getUrlVarFromString() empty object",
  "{}",
  JSON.stringify(_.getUrlVarFromString("?"))
);

_cut.addElement(
  _.domCreate(
    "div",
    {"id": "testFormDiv"},
    " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
  )
);

_cut.isEqual(
  "form2array()", '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify( _.form2array( _.qs("#form1") ) )
 );

_cut.isEqual(
  "form2string()",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  _.form2string( _.qs("#form1") )
 );

 _.qs("#testFormDiv").remove();


/*
https://stackoverflow.com/questions/9454125/javascript-request-fullscreen-is-unreliable/9747340
Fullscreen API not testable with automation.

_cut.addElement(
  _.domCreate("p", {"id": "domFullscreenElement"}, "fullscreen test element")
);
var domFullscreenElement = _.qs("#domFullscreenElement");

_.setFullscreenOn(domFullscreenElement);
_cut.isEqual(
  "getFullscreen() and setFullscreenOn(<element>) and setFullscreenOff",
  domFullscreenElement,
  _.getFullscreen()
);
alert(_.getFullscreen());
_.setFullscreenOff();

_.setFullscreenOn("#domFullscreenElement");
_cut.isEqual(
  "getFullscreen() and setFullscreenOn(<selector>) and setFullscreenOff",
  domFullscreenElement,
  _.getFullscreen()
);
alert(_.getFullscreen());
_.setFullscreenOff();

_.setFullscreenOn(document);
_cut.isEqual(
  "getFullscreen and setFullscreenOn(document) and setFullscreenOff",
  document,
  _.getFullscreen()
);

_.setFullscreenOff();
*/

/*

_cut.isEqual("random()", true, _.random() <= 101 );
_cut.isEqual("random(max)", true, _.random(30) <= 30 );
var testRandom = _.random(51,55);
_cut.isEqual("random(min,max)", true, testRandom >= 51 && testRandom <= 55 );

/* kaylee */

var rndStr = _.randomString();
_cut.isEqual("randomString() default length 100, default false", true, _.isString(rndStr) && rndStr.length === 100 );
_cut.addElement("p","<b>"+rndStr+"</b>");
rndStr = _.randomString(10);
_cut.isEqual("randomString(10) default false", true, _.isString(rndStr) && rndStr.length === 10 );
_cut.addElement("p","<b>"+rndStr+"</b>");
rndStr = _.randomString(15,true);
_cut.isEqual("randomString(15,true)", true, _.isString(rndStr) && rndStr.length === 15 );
_cut.addElement("p","<b>"+rndStr+"</b>");
rndStr = _.randomString(20,false);
_cut.isEqual("randomString(20,false)", true, _.isString(rndStr) && rndStr.length === 20 );
_cut.addElement("p","<b>"+rndStr+"</b>");
rndStr = "1" + _.randomString(32,false);
_cut.isEqual("randomString() random \"btc\" address", true, _.isString(rndStr) && rndStr.length === 33 );
_cut.addElement("p","<b>"+rndStr+"</b>");

var kayleeStr = "✓ à \r\n\t árvíztűrő tükörfúrógép ÁRVÍZTŰRŐ TÜKÖRFÚRÓGÉP ,?;.:-_* ¤÷×¨¸´˙`˛°˘^ˇ~'+!%/=()|\\<> \" \/ #&@{}[]€ ÍÄíŁß 0123456789 asdfghjklqwertzuiopyxcvbnm ASDFGHJKLQWERTZUIOPYXCVBNM";
_cut.isEqual(
  "b64Encode()", "4pyTIMOgIA0KCSDDoXJ2w616dMWxcsWRIHTDvGvDtnJmw7pyw7Nnw6lwIMOBUlbDjVpUxbBSxZAgVMOcS8OWUkbDmlLDk0fDiVAgLD87LjotXyogwqTDt8OXwqjCuMK0y5lgy5vCsMuYXsuHficrISUvPSgpfFw8PiAiIC8gIyZAe31bXeKCrCDDjcOEw63FgcOfIDAxMjM0NTY3ODkgYXNkZmdoamtscXdlcnR6dWlvcHl4Y3Zibm0gQVNERkdISktMUVdFUlRaVUlPUFlYQ1ZCTk0=",
  _.b64Encode(kayleeStr)
);
_cut.isEqual("b64Decode() + b64Encode()", kayleeStr, _.b64Decode(_.b64Encode(kayleeStr)) );
_cut.isEqual(
  "javaHash()",
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

/* /kaylee */

var FPObject = {a:2, b:3, c:4};

var forInStr = "";
_.forIn(FPObject, function (e) { forInStr += (e*2); } );
_cut.isEqual("forIn()", "468", forInStr );
_cut.isEqual("forIn() return value", FPObject, _.forIn(FPObject, function(){}) );

_cut.isEqual("mapIn()", 9, _.mapIn(FPObject, function (e) { return (e*3); })["b"] );

_cut.isEqual("getDoNotTrack()", true, _.getDoNotTrack() === true || _.getDoNotTrack() === false );


_cut.isEqual(
  "strRemoveTags()",
  "lorem ipsum dolor sit amet , consectetuer",
  _.strRemoveTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

_cut.isEqual(
  "strReverse() without unicode",
  ".eid ot emiT .niar ni sraet ekil ,emit ni tsol eb lliw stnemom esoht llA .etaG resuähnnaT eht raen krad eht ni rettilg smaeb-C dehctaw I .noirO fo redluohs eht ffo erif no spihs kcattA .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
  _.strReverse("I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.")
);
if (_cut.isNotIE11()) {
  _cut.isEqual(
    "strReverse() with unicode 1",
    ".noirO fo redluohs eht ffo erif no spihs kcattA \uD834\uDF06 .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
    _.strReverse("I've seen things you people wouldn't believe. \uD834\uDF06 Attack ships on fire off the shoulder of Orion.")
  );/*
  _cut.isEqual(
    "strReverse() with unicode 2",
    ".noirO fo redluohs eht ffo erif no spihs kcattA \u{1D306} .eveileb t'ndluow elpoep uoy sgniht nees ev'I",
    _.strReverse("I've seen things you people wouldn't believe. \u{1D306} Attack ships on fire off the shoulder of Orion.")
  );*/
}

var slice = _.toFunction([].slice);
_cut.isEqual("toFunction()", true, Array.isArray(slice(document.querySelectorAll("h3"))) );

var FPArray = [1,2,3];

var dqsa = _.bind(document.querySelectorAll, document);
_cut.isEqual("bind()", true, dqsa("h3").length > 0 );

_cut.isEqual("hasOwn() true", true, _.hasOwn( {0:1,1:2,2:3,length:3}, "length" ) );
_cut.isEqual("hasOwn() false", false, _.hasOwn( [], "forEach" ) );

_cut.isEqual("constant()", 3.14, _.constant(3.14)() );
_cut.isEqual("identity()", 100, _.identity(60) + _.identity(40) );
_cut.isEqual("noop()", undefined, _.noop() );

_cut.isTrue("T()", _.T() );
_cut.isFalse("F()", _.F() );


/* Collection */

_cut.addElement("h3", "Collections");


var FPArray = [1,2,3];

// forEach - Array
var forEachStr = "";
_.forEach(FPArray, function (e) { forEachStr += (e*2); } );
_cut.isEqual("forEach() 1 ES5 Array", "246", forEachStr );
_cut.isTrue(
  "forEach() 1 ES5 Array return value",
  Array.isArray( _.forEach([],function (){}) )
);
// forEach - String
forEachStr = "";
_.forEach("cat, dog, pig", function (e) { forEachStr += e.toUpperCase(); } );
_cut.isEqual("forEach() 2 ES5 String", "CAT, DOG, PIG", forEachStr );
_cut.isEqual(
  "forEach() 2 ES5 String return value",
  "aaBBcc",
  _.forEach("aBc", function (v, i, a) {a[i] = v+v; } )
);
// forEach - Nodelist
var forEachCount = 0;
_.forEach(document.querySelectorAll("h3"), function (e) { forEachCount++; } );
_cut.isEqual(
  "forEach() 3 ES5 Nodelist",
  document.querySelectorAll("h3").length,
  forEachCount
);
_cut.isTrue(
  "forEach() 3 ES5 Nodelist return value",
  Array.isArray( _.forEach(document.querySelectorAll("h3"),function (){}) )
);
// forEach - custom array-like object
var forEachCount = 0;
_.forEach({0:4,1:5,2:6,length:3}, function (e) { forEachCount += (e*3); } );
_cut.isEqual("forEach() 4 ES5 custom array-like object", 45, forEachCount);
_cut.isTrue(
  "forEach() 4 ES5 custom array-like object return value",
  Array.isArray( _.forEach({0:4,1:5,2:6,length:3},function (){}) )
);

if (_cut.isNotIE11()) {
  // forEach - Map
  forEachStr = "";
  _.forEach(
    new Map([ ["foo", 3.14], ["bar", 42], ["baz", "Wilson"] ]),
    function (e,p) { forEachStr += p + e + "-"; }
  );
  _cut.isEqual("forEach() 5 ES6 Map", "foo3.14-bar42-bazWilson-", forEachStr);
  _cut.isTrue(
    "forEach() 5 ES6 Map return value",
    _.isMap( _.forEach(new Map([ ["foo", 3.14], ["bar", 42] ]),function (){}) )
  );
  // forEach - Set
  forEachCount = 0;
  _.forEach(
    new Set([4,5,6]),
    function (e) { forEachCount += (e*3); }
  );
  _cut.isEqual("forEach() 6 ES6 Set", 45, forEachCount);
  _cut.isTrue(
    "forEach() 6 ES6 Set return value",
    _.isSet( _.forEach(new Set([4,5,6]),function (){}) )
  );
  // forEach - iterator
  forEachCount = 0;
  _.forEach(
    (new Set([4,5,6])).values(),
    function (e) { forEachCount += (e*3); }
  );
  _cut.isEqual("forEach() 7 ES6 Set values() iterator", 45, forEachCount);
  _cut.isTrue(
    "forEach() 7 ES6 Set values() iterator return value",
    Array.isArray( _.forEach(new Set([4,5,6]).values(),function (){} ))
  );
}


// map - Array
_cut.isEqual(
  "map() 1 ES5 Array and return value",
  "[2,4,6]",
  JSON.stringify( _.map([1,2,3], function(e) { return e*2; }) )
);
// map - String
_cut.isEqual(
  "map() 2 ES5 String and return value",
  "CAT, DOG, PIG",
  _.map("cat, dog, pig", function (e) { return e.toUpperCase(); } )
);

// map - Nodelist
var mapNL = _.map(document.querySelectorAll("h3"), function (e) { return e; } );
_cut.isTrue(
  "map() 3 ES5 Nodelist and return value",
  Array.isArray(mapNL) && mapNL.every(function(e) { return _.isElement(e); })
);
// map - custom array-like object
_cut.isEqual(
  "map() 4 ES5 custom array-like object and return value",
  "[2,4,6]",
  JSON.stringify( _.map({0:1,1:2,2:3,length:3}, function(e) { return e*2; }) )
);

if (_cut.isNotIE11()) {
  // map - Map
  var mapMap = _.map(
    new Map([ ["foo", 1], ["bar", 2], ["baz", 3] ]),
    function(e) { return [ e[0], e[1]*2 ]; }
  );
  _cut.isEqual(
    "map() 5 ES6 Map and return value",
    "246",
    "" + mapMap.get("foo") + mapMap.get("bar") + mapMap.get("baz")
  );
  // map - Set
  var mapSet = _.map(
    new Set([1,2,3]),
    function(e) { return e*2; }
  );
  _cut.isTrue(
    "map() 6 ES6 Set and return value",
    mapSet.has(2) && mapSet.has(4) && mapSet.has(6)
  );
  // map - iterator
  _cut.isEqual(
    "map() 7 ES6 Set values() iterator and return value",
    "[3,6,9]",
    JSON.stringify(
      _.map(
        (new Set([1,2,3])).values(),
        function (e) { return (e*3); }
      )
    )
  );
}

_cut.isEqual(
  "range() - 1 - step default 1",
  "[5,6,7,8,9,10,11,12]",
  JSON.stringify(_.range(5,12))
);
_cut.log( JSON.stringify(_.range(5,12)) );
_cut.isEqual(
  "range() - 2 - step 3",
  "[1,4,7,10,13,16]",
  JSON.stringify(_.range(1,16,3))
);
_cut.log( JSON.stringify(_.range(1,16,3)) );
_cut.isEqual(
  "range() - 3 - step 3.2 <i>(can be failed - float storage)<i>",
  "[1,4.2,7.4,10.600000000000001,13.8,17]",
  JSON.stringify(_.range(1,17,3.2))
);
_cut.log( JSON.stringify(_.range(1,17,3.2)) );

var a = ["a","b","c","d"];
var b = [3,4,5,6,7,8,9];
_cut.isEqual(
  "toPairs() ES5",
  "[[\"a\",3],[\"b\",4],[\"c\",5],[\"d\",6]]",
  JSON.stringify(_.toPairs(a,b))
);
if(_cut.isNotIE11()) {
  _cut.isEqual(
    "toPairs() ES6",
    "[[\"a\",3],[\"b\",4],[\"c\",5],[\"d\",6]]",
    JSON.stringify(_.toPairs(
      new Set(a),
      new Map([ [2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9] ]).values()
    ))
  );
}

var a = [21, 11, 41, 51, 31];
_cut.isEqual("min() ES5", 11, _.min(a) );
_cut.isEqual("minIndex() ES5", 1, _.minIndex(a) );
_cut.isEqual("max() ES5", 51, _.max(a) );
_cut.isEqual("maxIndex() ES5", 3, _.maxIndex(a) );
if(_cut.isNotIE11()) {
  _cut.isEqual("min() ES6", 11, _.min(new Set(a)) );
  _cut.isEqual("minIndex() ES6", 1, _.minIndex(new Set(a).values()) );
  _cut.isEqual("max() ES6", 51, _.max(new Set(a).keys()) );
  _cut.isEqual(
    "maxIndex() ES6",
    3,
    _.maxIndex(new Map([[21,1],[11,2],[41,3],[51,4],[31,5]]).keys())
  );
}

var a = [21, 11, 41, 51, 31];
_cut.isEqual(
  "arrayKeys() ES5",
  "[0,1,2,3,4]",
  JSON.stringify(_.arrayKeys(a))
);
_cut.isEqual(
  "arrayValues() ES5",
  "[21,11,41,51,31]",
  JSON.stringify(_.arrayValues(a))
);
_cut.isEqual(
  "arrayEntries() ES5",
   "[[0,21],[1,11],[2,41],[3,51],[4,31]]",
  JSON.stringify(_.arrayEntries(a))
);
if(_cut.isNotIE11()) {
  _cut.isEqual(
    "arrayKeys() ES6",
    "[0,1,2,3,4]",
    JSON.stringify(_.arrayKeys(new Set(a)))
  );
  _cut.isEqual(
    "arrayValues() ES6",
    "[21,11,41,51,31]",
    JSON.stringify(_.arrayValues(new Set(a).keys()))
  );
  try {
    _cut.isEqual(
      "arrayEntries() ES6",
       "[[0,21],[1,11],[2,41],[3,51],[4,31]]",
      JSON.stringify(_.arrayEntries(a.values()))
    );
  } catch (e) {alert(e);}
}

var a = [1,2,3,4], b = [3,4,5,6], c = [5,6,7,8];
_cut.isEqual(
  "arrayUnion() ES5",
  "[1,2,3,4,5,6,7,8]",
  JSON.stringify(_.arrayUnion(a,b,c))
);
_cut.isEqual(
  "arrayIntersection() ES5",
  "[3,4]",
  JSON.stringify(_.arrayIntersection(a,b))
);
_cut.isEqual(
  "arrayDifference() ES5",
  "[1,2]",
  JSON.stringify(_.arrayDifference(a,b))
);
_cut.isEqual(
  "arraySymmetricDifference() ES5",
  "[1,2,5,6]",
  JSON.stringify(_.arraySymmetricDifference(a,b))
);
if(_cut.isNotIE11()) {
   try {
    _cut.isEqual(
      "arrayUnion() ES6",
      "[1,2,3,4,5,6,7,8]",
      JSON.stringify(_.arrayUnion(new Set(a),b.values(),new Set(c).values()))
    );
    _cut.isEqual(
      "arrayIntersection() ES6",
      "[3,4]",
      JSON.stringify(_.arrayIntersection(a.values(),new Set(b)))
    );
    _cut.isEqual(
      "arrayDifference() ES6",
      "[1,2]",
      JSON.stringify(
        _.arrayDifference(new Map([[1,2],[2,3],[3,4],[4,5]]).keys(),b.values())
      )
    );
    _cut.isEqual(
      "arraySymmetricDifference() ES6",
      "[1,2,5,6]",
      JSON.stringify(_.arraySymmetricDifference(
        new Set(a).keys(),
        new Map([[1,3],[2,4],[3,5],[4,6]]).values()
      ))
    );
  } catch (e) {alert(e);}
}

if(_cut.isNotIE11()) {
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
  _cut.isTrue(
    "setUnion() ES6",
    __setEquals__(
      _.setUnion(new Map([ [2,1],[3,2],[4,3],[5,4] ]).values(),sb,c),
      _.setUnion(a,new Map([ [2,3],[3,4],[4,5],[5,6] ]).values(),sc.values())
    )
  );
  _cut.isTrue(
    "setIntersection() ES6",
    __setEquals__(
      new Set([3,4]),
      _.setIntersection(sa,sb)
    )
  );
  _cut.isTrue(
    "setDifference() ES6",
    __setEquals__(
      new Set([1,2]),
      _.setDifference(sa,sb)
    )
  );
  _cut.isTrue(
    "setSymmetricDifference() ES6",
    __setEquals__(
      new Set([1,2,5,6]),
      _.setSymmetricDifference(sa,sb)
    )
  );
}

var arrTestClearRemove1 = [1,2,3,4,5,6,7,8,9,0];
var arrTestClearRemove2 = _.arrayClear(arrTestClearRemove1);
_cut.isTrue(
  "arrayClear()",
  (arrTestClearRemove1 === arrTestClearRemove2
    && arrTestClearRemove1.length === 0
    && Array.isArray(arrTestClearRemove1)
  )
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isTrue(
  "arrayRemove() - 1 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 6)
);
_cut.isFalse(
  "arrayRemove() - 1 found - not all - false",
  _.arrayRemove(arrTestClearRemove1, 6)
);
_cut.isEqual(
  "arrayRemove() - 1 found - not all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]",
  JSON.stringify(arrTestClearRemove1)
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isTrue(
  "arrayRemove() - 1 found - all - true",
  _.arrayRemove(arrTestClearRemove1, 6, true)
);
_cut.isFalse(
  "arrayRemove() - 1 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 6, true)
);
_cut.isEqual(
  "arrayRemove() - 1 found - all - value check",
  "[1,2,3,4,5,5,7,8,5,9,0]",
  JSON.stringify(arrTestClearRemove1)
);


var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isTrue(
  "arrayRemove() - 3 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 5)
);
_cut.isTrue(
  "arrayRemove() - 3 found - not all - true",
  _.arrayRemove(arrTestClearRemove1, 5, false)
);
_cut.isEqual(
  "arrayRemove() - 3 found - not all - value check",
  "[1,2,3,4,6,7,8,5,9,0]",
  JSON.stringify(arrTestClearRemove1)
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isTrue(
  "arrayRemove() - 3 found - all - true",
  _.arrayRemove(arrTestClearRemove1, 5, true)
);
_cut.isFalse(
  "arrayRemove() - 3 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 5, true)
);
_cut.isEqual(
  "arrayRemove() - 3 found - all - value check",
  "[1,2,3,4,6,7,8,9,0]",
  JSON.stringify(arrTestClearRemove1)
);

var arrTestClearRemove1 = [1,2,3,4,5,6,5,7,8,5,9,0];
_cut.isFalse(
  "arrayRemove() - 0 found - not all - false",
  _.arrayRemove(arrTestClearRemove1, 11)
);
_cut.isFalse(
  "arrayRemove() - 0 found - all - false",
  _.arrayRemove(arrTestClearRemove1, 11, true)
);
_cut.isEqual(
  "arrayRemove() - 0 found - value check",
  "[1,2,3,4,5,6,5,7,8,5,9,0]",
  JSON.stringify(arrTestClearRemove1)
);

_cut.isEqual(
  "uniqueArray() 1 ES5 - Array and Array-like object",
  JSON.stringify( _.uniqueArray( [1,2,2,3,4,4,5,6,6,7] ) ),
  JSON.stringify(
    _.uniqueArray( {0:1,1:2,2:2,3:3,4:4,5:4,6:5,7:6,8:6,9:7,length:10} )
  )
);
_cut.isEqual(
  "uniqueArray() 2 ES5 - Array and String",
  JSON.stringify( _.uniqueArray(
    ["A","r","r","a","y","y","a","n","d","d","M","M","a","p"]
  ) ),
  JSON.stringify( _.uniqueArray( "ArrayyanddMMap" ) )
);
if (_cut.isNotIE11()) {
  _cut.isEqual(
    "uniqueArray() 3 ES6 - Array and Set",
    JSON.stringify( _.uniqueArray( [1,2,2,3,4,4,5,6,6,7] ) ),
    JSON.stringify(
      _.uniqueArray( new Set( [1,2,2,3,4,4,5,6,6,7] ) )
    )
  );
  _cut.isEqual(
    "uniqueArray() 4 ES6 - Array and Map values() iterator",
    JSON.stringify( _.uniqueArray( [1,2,2,3,4,4,5,6,6,7] ) ),
    JSON.stringify(
      _.uniqueArray(
        (new Map([
          ["foo1", 1], ["bar1", 2], ["baz1", 2], ["foo2", 3], ["bar2", 4],
          ["baz2", 4], ["foo3", 5], ["bar3", 6], ["baz3", 6], ["foo4", 7]
        ])).values()
      )
    )
  );
}

var uniquePushTest = [1,2,3,5];
_cut.isTrue("uniquePush() true", _.uniquePush(uniquePushTest, 4) );
_cut.isFalse("uniquePush() false", _.uniquePush(uniquePushTest, 4) );
_cut.isEqual(
  "uniquePush() value check",
  "[1,2,3,5,4]",
  JSON.stringify(uniquePushTest)
);

var arrMerge1 = [1,2,3];
var arrMerge2 = [4,5,6];
var arrMerge3 = [7,8,[10,11,12,[13,14,15]],9];
var arrMergeStr = JSON.stringify( _.arrayMerge(arrMerge1, arrMerge2) );
arrMergeStr += JSON.stringify( arrMerge1 );
// "[1,2,3,4,5,6]"
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify( _.arrayMerge(arrMerge1, arrMerge2, arrMerge3) );
arrMergeStr += JSON.stringify( arrMerge1 );
// "[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify( _.arrayMerge(false, arrMerge1, arrMerge2, arrMerge3) );
arrMergeStr += JSON.stringify( arrMerge1 );
//"[1,2,3,4,5,6,7,8,[10,11,12,[13,14,15]],9]"
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify( _.arrayMerge(true, arrMerge1, arrMerge2, arrMerge3) );
arrMergeStr += JSON.stringify( arrMerge1 );
// "[1,2,3,4,5,6,7,8,10,11,12,13,14,15,9]"
arrMerge1 = [1,2,3];
arrMergeStr += JSON.stringify( _.arrayMerge(true, [], arrMerge1, arrMerge3, 42, 3.14) );
// "[1,2,3,7,8,10,11,12,13,14,15,9]"
_cut.isEqual(
  "arrayMerge()",
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


var itemSrc = ["A", "B", "C"];
var res = _.item(itemSrc, 0)
  + " " + _.item(itemSrc, 1)
  + " " + _.item(itemSrc, 2)
  + " " + _.item(itemSrc, 3)
  + " " + _.item(itemSrc, -1)
  + " " + _.item(itemSrc, -2)
  + " " + _.item(itemSrc, -3)
  + " " + _.item(itemSrc, -4);
_cut.isEqual(
  "item() - step 1 - array",
  "A B C undefined C B A undefined",
  res
);
_cut.log("\""+res+"\"");
var itemSrc = {0: "A", 1: "B", 2: "C", length: 3};
var res = _.item(itemSrc, 0)
  + " " + _.item(itemSrc, 1)
  + " " + _.item(itemSrc, 2)
  + " " + _.item(itemSrc, 3)
  + " " + _.item(itemSrc, -1)
  + " " + _.item(itemSrc, -2)
  + " " + _.item(itemSrc, -3)
  + " " + _.item(itemSrc, -4);
_cut.isEqual(
  "item() - step 2 - arrayLike object",
  "A B C undefined C B A undefined",
  res
);
_cut.log("\""+res+"\"");
var itemSrc = "ABC";
var res = _.item(itemSrc, 0)
  + " " + _.item(itemSrc, 1)
  + " " + _.item(itemSrc, 2)
  + " " + _.item(itemSrc, 3)
  + " " + _.item(itemSrc, -1)
  + " " + _.item(itemSrc, -2)
  + " " + _.item(itemSrc, -3)
  + " " + _.item(itemSrc, -4);
_cut.isEqual(
  "item() - step 3 - string",
  "A B C undefined C B A undefined",
  res
);
_cut.log("\""+res+"\"");

if (_cut.isNotIE11()) {
  var itemSrc = "AB\uD834\uDF06CD";
  var res = _.item(itemSrc, 0)
    + " " + _.item(itemSrc, 1)
    + " " + _.item(itemSrc, 2)
    + " " + _.item(itemSrc, 3)
    + " " + _.item(itemSrc, 4)
    + " " + _.item(itemSrc, 5)
    + " " + _.item(itemSrc, -1)
    + " " + _.item(itemSrc, -2)
    + " " + _.item(itemSrc, -3)
    + " " + _.item(itemSrc, -4)
    + " " + _.item(itemSrc, -5)
    + " " + _.item(itemSrc, -6);
  _cut.isEqual(
    "item() - step 4 - ES6 unicode string",
    "A B \uD834\uDF06 C D undefined D C \uD834\uDF06 B A undefined",
    res
  );
  _cut.log("\""+res+"\"");
  var itemSrc = new Set(["A", "B", "C"]);
  var res = _.item(itemSrc, 0)
    + " " + _.item(itemSrc, 1)
    + " " + _.item(itemSrc, 2)
    + " " + _.item(itemSrc, 3)
    + " " + _.item(itemSrc, -1)
    + " " + _.item(itemSrc, -2)
    + " " + _.item(itemSrc, -3)
    + " " + _.item(itemSrc, -4);
  _cut.isEqual(
    "item() - step 5 - ES6 set",
    "A B C undefined C B A undefined",
    res
  );
  _cut.log("\""+res+"\"");
  var itemSrc = new Set(["A", "B", "C"]);
  var res = _.item(itemSrc.values(), 0)
    + " " + _.item(itemSrc.values(), 1)
    + " " + _.item(itemSrc.values(), 2)
    + " " + _.item(itemSrc.values(), 3)
    + " " + _.item(itemSrc.values(), -1)
    + " " + _.item(itemSrc.values(), -2)
    + " " + _.item(itemSrc.values(), -3)
    + " " + _.item(itemSrc.values(), -4);
  _cut.isEqual(
    "item() - step 6 - ES6 set values()",
    "A B C undefined C B A undefined",
    res
  );
  _cut.log("\""+res+"\"");
  var itemSrc = new Map([ ["A", 1], ["B", 2], ["C", 3] ]);
  var res = _.item(itemSrc, 0)[0]
    + " " + _.item(itemSrc, 1)[0]
    + " " + _.item(itemSrc, 2)[0]
    + " " + _.item(itemSrc, 3)
    + " " + _.item(itemSrc, -1)[0]
    + " " + _.item(itemSrc, -2)[0]
    + " " + _.item(itemSrc, -3)[0]
    + " " + _.item(itemSrc, -4);
  _cut.isEqual(
    "item() - step 7 - ES6 map",
    "A B C undefined C B A undefined",
    res
  );
  _cut.log("\""+res+"\"");
  var itemSrc = new Map([ ["A", 1], ["B", 2], ["C", 3] ]);
  var res = _.item(itemSrc.keys(), 0)
    + " " + _.item(itemSrc.keys(), 1)
    + " " + _.item(itemSrc.keys(), 2)
    + " " + _.item(itemSrc.keys(), 3)
    + " " + _.item(itemSrc.keys(), -1)
    + " " + _.item(itemSrc.keys(), -2)
    + " " + _.item(itemSrc.keys(), -3)
    + " " + _.item(itemSrc.keys(), -4);
  _cut.isEqual(
    "item() - step 8 - ES6 map keys()",
    "A B C undefined C B A undefined",
    res
  );
  _cut.log("\""+res+"\"");
}


/* DOM */
/*
domFadeIn(<element>[,duration[,display]]);
domFadeOut(<element>[,duration]);
domFadeToggle(<element>[,duration[,display]]);
*/
_cut.addElement("h3", "DOM");

_cut.addElement(
  _.domCreate("p", {"id": "domTestElement", style: {"width": "250px"} }, "DOM test element")
);
var domTestElement = _.qs("#domTestElement") ;

_cut.isEqual("domCreate() with style object", true, _.isElement(domTestElement) );
if (_cut.isNotEdge() && _cut.isNotIE11()) {
  _cut.isEqual("domCreate() with style string", true, _.isElement( _.domCreate("p", {"id": "domTestElement", style: "width: 250px; color: blue;" }, "DOM test element") ) );
}
_cut.isEqual("domCreate(object) with style object", true, _.isElement( _.domCreate( { elementType: "p", "id": "domTestElementObject", style: {"width": "250px"}, innerHTML: "DOM test element" } ) ) );
if (_cut.isNotEdge() && _cut.isNotIE11()) {
  _cut.isEqual("domCreate(object) with style string", true, _.isElement( _.domCreate( { elementType: "p", "id": "domTestElementObject", style: "width: 250px; color: blue;", innerHTML: "DOM test element" } ) ) );
}

_cut.isTrue(
  "domToElement() simple element",
  _.isElement( _.domToElement("<div>Hello world!</div>") )
);

_cut.isTrue(
  "domToElement() complex element",
  _.isElement( _.domToElement("<p><span style=\"background-color: yellow; color: blue;\">Hello</span> <span style=\"background-color: blue; color: yellow;\">world</span>!</p>").firstElementChild )
);

_.domSetCSS(domTestElement, "width", "300px");
_cut.isEqual("domSetCSS() property and domGetCSS()", "300px", _.domGetCSS(domTestElement, "width") );

_.domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
_cut.isEqual("domSetCSS() properties object and domGetCSS()",
  "350px",
  _.domGetCSS(domTestElement, "width")
);

_.domHide(domTestElement);
_cut.isEqual("domHide()", "none", _.domGetCSS(domTestElement, "display") );

_.domShow(domTestElement);
_cut.isEqual("domShow()", "block", _.domGetCSS(domTestElement, "display") );

_.domHide(domTestElement);
_.domShow(domTestElement, "inline-block");
_cut.isEqual("domShow() inline-block", "inline-block", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement);
_cut.isEqual("domToggle() hide", "none", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement);
_cut.isEqual("domToggle() show", "block", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement, "inline-block");
_cut.isEqual("domToggle() hide inline-block", "none", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement, "inline-block");
_cut.isEqual("domHide() show inline-block", "inline-block", _.domGetCSS(domTestElement, "display") );

var domTestVar = 33;
function domTestElementClick1 () { domTestVar = 42; }
function domTestElementClick2 () { domTestVar = 56; }

_.domOn(domTestElement, "click", domTestElementClick1 );
_.domTrigger(domTestElement, "click");
_cut.isEqual("domOn() and domTrigger()", 42, domTestVar );

_.domOff(domTestElement, "click", domTestElementClick1 );
_.domOn(domTestElement, "click", domTestElementClick2 );
_.domOff(domTestElement, "click", domTestElementClick2 );
_.domTrigger(domTestElement, "click");
_cut.isEqual("domOff() and domTrigger()", 42, domTestVar );

_cut.addElement(
  _.domCreate(
    "div",
    {"id": "dsDiv"},
    '<p><b>This is the #dsDiv</b></p>'
      +'<p id="dsDivP1">This is the #dsDivP1</p>'
      +'<p id="dsDivP2">This is the #dsDivP2</p>'
      +'<p id="dsDivP3">This is the #dsDivP3</p>'
  )
);
var dsArray = _.domSiblings( _.qs("#dsDivP2") );
_cut.isTrue( "domSiblings()", (Array.isArray(dsArray) && dsArray.length === 3) );
_.qs("#dsDiv").remove();


/* cookie */
_cut.addElement("h3", "cookie");

_.setCookie("ctest3", "cookieUnitTestStr");
_cut.isEqual("hasCookie() true", true, _.hasCookie("ctest3") );
_cut.isEqual("getCookie(name) value", "cookieUnitTestStr", _.getCookie("ctest3") );
_cut.isEqual("getCookie()", "cookieUnitTestStr", _.getCookie()["ctest3"] );
_cut.isEqual("removeCookie() true", true, _.removeCookie("ctest3") );
_cut.isEqual("removeCookie() false", false, _.removeCookie("ctest3") );
_cut.isEqual("hasCookie() false", false, _.hasCookie("ctest3") );
_cut.isEqual("getCookie(name) null", null, _.getCookie("ctest3") );
_cut.isEqual("getCookie() undefined", undefined, _.getCookie()["ctest3"] );


/* polyfills */
_cut.addElement("h3", "polyfills");

if (_cut.isNotIE11()) {
  var vstr = "";
  var vstrit = ["X","Y","Z","X"].values();
  vstr += vstrit.next().value 
    + vstrit.next().value
    + vstrit.next().value
    + vstrit.next().value;
  _cut.isEqual("Array.prototype.values()", "XYZX", vstr);
}

_cut.isEqual(
  "String.fromCodePoint()",
  "*"+"AZ"+"Є",
  String.fromCodePoint(42)
  + String.fromCodePoint(65, 90)
  + String.fromCodePoint(0x404)
);

_cut.isEqual(
  "String.fromCodePointAt()",
  "66"+"65536"+"undefined",
  ""
  + "ABC".codePointAt(1)
  + "\uD800\uDC00".codePointAt(0)
  + "XYZ".codePointAt(42)
);

_cut.isEqual(
  "Array.prototype.copyWithin()",
  "[1,2,3,1,2]"
  +"[4,5,3,4,5]"
  +"[4,2,3,4,5]"
  +"[1,2,3,3,4]"
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
// objA.a 1          own
// objA.b 2          own
// objA.c undefined  not own
// objA.d undefined  not own
// objB.a 1          not own
// objB.b 2          not own
// objB.c 3          own
// objB.d 4          own
// objC.a 1          not own
// objC.b 2          not own
// objC.c 3          not own
// objC.d 4          not own
var objStr = JSON.stringify( Object.getOwnPropertyDescriptors(objA) );
objStr += JSON.stringify( Object.getOwnPropertyDescriptors(objB) );
objStr += JSON.stringify( Object.getOwnPropertyDescriptors(objC) );
_cut.isEqual(
  "Object.getOwnPropertyDescriptors()",
  '{"a":{"value":1,"writable":true,"enumerable":true,"configurable":true},"b":{"value":2,"writable":true,"enumerable":true,"configurable":true}}'
  +'{"c":{"value":3,"writable":true,"enumerable":true,"configurable":true},"d":{"value":4,"writable":true,"enumerable":true,"configurable":true}}'
  +'{}',
  objStr
);

_cut.isTrue("Element.prototype.matches() present", !!Element.prototype.matches);
_cut.isTrue("Element.prototype.closest() present", !!Element.prototype.closest);
_cut.isTrue("Element.prototype.getAttributeNames() present", !!Element.prototype.getAttributeNames);

_cut.addElement( _.domCreate("input",{id: "etgi1", value: "etgi1"}) );
_cut.addElement( _.domCreate("input",{id: "etgi2", value: "etgi2"}) );
_cut.addElement( _.domCreate("input",{id: "etgi3", value: "etgi3"}) );
_cut.addElement( _.domCreate("input",{id: "etgi4", value: "etgi4", readOnly: true}) );
_cut.addElement( _.domCreate("input",{id: "etgi5", value: "etgi5", readOnly: true}) );
_cut.addElement( _.domCreate("input",{id: "etgi6", value: "etgi6", readOnly: true}) );
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
_cut.isEqual(
  "Element.prototype.toggleAttribute()",
  "truetruefalsefalse"
    +"falsefalsefalsefalse"
    +"truetruetruetrue"
    +"falsefalsetruetrue"
    +"falsefalsefalsefalse"
    +"truetruetruetrue",
  etgStr
);
etgi1.remove();
etgi2.remove();
etgi3.remove();
etgi4.remove();
etgi5.remove();
etgi6.remove();

var padStr = "lorem".padStart(10);
padStr += "lorem".padStart(10, "foo");
padStr += "lorem".padStart(6,"123465");
padStr += "lorem".padStart(15,"123465");
padStr += "lorem".padStart(8, "0");
padStr += "lorem".padStart(1);
padStr += "lorem".padStart(NaN);
padStr += "lorem".padStart(15,undefined);
padStr += "lorem".padStart(15,null);
padStr += "lorem".padStart(15,true);
padStr += "lorem".padStart(15,false);
padStr += "lorem".padStart(15,{a:1});
padStr += "lorem".padStart(15,[]);
padStr += "lorem".padStart(15,[1,2,"c"]);
padStr += "lorem".padStart(15,42);
padStr += "lorem".padStart(15,3.14);
_cut.isEqual(
  "String.prototype.padStart()",
  "     lorem"+"foofolorem"+"1lorem"+"1234651234lorem"+"000lorem"+"lorem"+"lorem"+"          lorem"+"nullnullnulorem"+"truetruetrlorem"+"falsefalselorem"+"[object Oblorem"+"lorem"+"1,2,c1,2,clorem"+"4242424242lorem"+"3.143.143.lorem",
  padStr
);

padStr = "lorem".padEnd(10);
padStr += "lorem".padEnd(10, "foo");
padStr += "lorem".padEnd(6,"123465");
padStr += "lorem".padEnd(15,"123465");
padStr += "lorem".padEnd(8, "0");
padStr += "lorem".padEnd(1);
padStr += "lorem".padEnd(NaN);
padStr += "lorem".padEnd(15,undefined);
padStr += "lorem".padEnd(15,null);
padStr += "lorem".padEnd(15,true);
padStr += "lorem".padEnd(15,false);
padStr += "lorem".padEnd(15,{a:1});
padStr += "lorem".padEnd(15,[]);
padStr += "lorem".padEnd(15,[1,2,"c"]);
padStr += "lorem".padEnd(15,42);
padStr += "lorem".padEnd(15,3.14);
_cut.isEqual(
  "String.prototype.padEnd()",
  "lorem     "+"loremfoofo"+"lorem1"+"lorem1234651234"+"lorem000"+"lorem"+"lorem"+"lorem          "+"loremnullnullnu"+"loremtruetruetr"+"loremfalsefalse"+"lorem[object Ob"+"lorem"+"lorem1,2,c1,2,c"+"lorem4242424242"+"lorem3.143.143.",
  padStr
);

padStr = "ipsum".repeat(0);
padStr += "ipsum".repeat(1);
padStr += "ipsum".repeat(2);
padStr += "ipsum".repeat(3.5);
_cut.isEqual(
  "String.prototype.repeat()",
  ""+"ipsum"+"ipsumipsum"+"ipsumipsumipsum",
  padStr
);

var objIsStr = "", isArr = [1,2], isTest = { x: 12 };
objIsStr += Object.is("lorem", "lorem");
objIsStr += Object.is(-0, -0);
objIsStr += Object.is(0, 0);
objIsStr += Object.is(NaN, 0/0);
objIsStr += Object.is(NaN, NaN);
objIsStr += Object.is(42, 42);
objIsStr += Object.is(3.14, 3.14);
objIsStr += Object.is(true, true);
objIsStr += Object.is(false, false);
objIsStr += Object.is(undefined, undefined);
objIsStr += Object.is(null, null);
objIsStr += Object.is(isArr, isArr);
objIsStr += Object.is(isTest, isTest);
objIsStr += Object.is(window, window);
objIsStr += Object.is([], []);
objIsStr += Object.is([1,2], [1,2]);
objIsStr += Object.is(isArr, [1,2]);
objIsStr += Object.is(isTest, { x: 12 });
objIsStr += Object.is("lorem", "ipsum");
objIsStr += Object.is("lorem", "Lorem");
objIsStr += Object.is("lorem", "dolorem");
objIsStr += Object.is(0, -0);
_cut.isEqual(
  "Object.is()",
  "truetruetruetruetruetruetruetruetruetruetruetruetruetruefalsefalsefalsefalsefalsefalsefalsefalse",
  objIsStr
);

var entriesObj = {a: 1, b:2, c: 3};
var entriesStr = JSON.stringify( Object.entries(entriesObj) );
var valuesStr = JSON.stringify( Object.values(entriesObj) );
entriesObj = {name: "John Smith", age:42, male: true};
entriesStr += JSON.stringify( Object.entries(entriesObj) ),
valuesStr += JSON.stringify( Object.values(entriesObj) );
_cut.isEqual(
  "Object.entries()",
  '[["a",1],["b",2],["c",3]]'
  + '[["name","John Smith"],["age",42],["male",true]]',
  entriesStr
);
_cut.isEqual(
  "Object.values()",
  '[1,2,3]'
  + '["John Smith",42,true]',
  valuesStr
);

var startStr = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.";
_cut.isEqual(
  "String.prototype.startsWith()",
  "truefalsetruefalse",
  ""+ startStr.startsWith("Lorem ipsum dolor")
    + startStr.startsWith("consectetuer adipiscing elit")
    + startStr.startsWith("consectetuer adipiscing elit", 28)
    + startStr.startsWith("consectetuer adipiscing elit", 57)
);
_cut.isEqual(
  "String.prototype.endsWith()",
  "truefalsetruefalse",
  ""+ startStr.endsWith("Aenean commodo ligula eget dolor.")
    + startStr.endsWith("Lorem ipsum dolor sit amet")
    + startStr.endsWith("consectetuer adipiscing elit.", 57)
    + startStr.endsWith("consectetuer adipiscing elit.", 47)
);

var trimStr = "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n";
_cut.isEqual(
  "String.prototype.trimStart()",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimStart()
);
_cut.isEqual(
  "String.prototype.trimLeft()",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimLeft()
);
_cut.isEqual(
  "String.prototype.trimEnd()",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimEnd()
);
_cut.isEqual(
  "String.prototype.trimRight()",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimRight()
);

var testArrayFill1 = [1, 2, 3, 4];
var testArrayFillStr = JSON.stringify(testArrayFill1);
testArrayFillStr += JSON.stringify( testArrayFill1.fill(3.14, 3, 4) );
testArrayFillStr += JSON.stringify(testArrayFill1);
testArrayFillStr += JSON.stringify( testArrayFill1.fill(42, 2) );
testArrayFillStr += JSON.stringify(testArrayFill1);
testArrayFillStr += JSON.stringify( testArrayFill1.fill(56) );
testArrayFillStr += JSON.stringify(testArrayFill1);
testArrayFillStr += JSON.stringify( testArrayFill1.fill({}) );
testArrayFillStr += JSON.stringify(testArrayFill1);
testArrayFill1[0].p1 = "lorem";
testArrayFillStr += JSON.stringify(testArrayFill1);
var testArrayFill2 = Array(5).fill();
testArrayFillStr += JSON.stringify(testArrayFill2);
var testArrayFill3 = Array(3).fill("ipsum");
testArrayFillStr += JSON.stringify(testArrayFill3);
_cut.isEqual(
  "Array.prototype.fill()",
  '[1,2,3,4]'
    +'[1,2,3,3.14]'
    +'[1,2,3,3.14]'
    +'[1,2,42,42]'
    +'[1,2,42,42]'
    +'[56,56,56,56]'
    +'[56,56,56,56]'
    +'[{},{},{},{}]'
    +'[{},{},{},{}]'
    +'[{"p1":"lorem"},{"p1":"lorem"},{"p1":"lorem"},{"p1":"lorem"}]'
    +'[null,null,null,null,null]'
    +'["ipsum","ipsum","ipsum"]',
  testArrayFillStr
);

_cut.isEqual("Array.from()", 3, Array.from({0:1,1:2,2:3,length:3})[2] );
_cut.isEqual("Array.from() with mapFN",
  6,
  Array.from({0:1,1:2,2:3,length:3}, function (e) { return e*3; })[1]
);
_cut.isEqual("Array.of()", 4, Array.of(2,4,6)[1] );
_cut.isEqual("Object.create()", 1, Object.create({ a: 1, b: 2 }).a );
_cut.isEqual("Object.assign()", 3, Object.assign({ a: 1}, {b: 2}, {c: 3}).c );
var testArrayFI = [66, 7, 135, 75, 190, 89];
_cut.isEqual("Array.prototype.find() true",
  135,
  testArrayFI.find(function (e) { return e > 100; })
);
_cut.isEqual("Array.prototype.find() false",
  undefined,
  testArrayFI.find(function (e) { return e > 200; })
);
_cut.isEqual("Array.prototype.findIndex() true",
  2,
  testArrayFI.findIndex(function (e) { return e > 100; })
);
_cut.isEqual("Array.prototype.findIndex() false",
  -1,
  testArrayFI.findIndex(function (e) { return e > 200; })
);
_cut.isEqual("Array.prototype.includes() true", true, testArrayFI.includes(190) );
_cut.isEqual("Array.prototype.includes() false", false, testArrayFI.includes(195) );
_cut.isEqual("String.prototype.includes() true", true, "lorem ipsum".includes("ipsum") );
_cut.isEqual("String.prototype.includes() false", false, "lorem ipsum".includes("erdei") );

_cut.addElement( _.domCreate("div", {"id": "testDivNode"}, "#testDivNode") );
var testDivNode = _.qs("#testDivNode");
testDivNode.append( _.domCreate("p", {"id": "testNodeP1"}, "testNodeP1") );
testDivNode.append( _.domCreate("p", {"id": "testNodeP2"}, "testNodeP2") );

var dqsaList = document.querySelectorAll("#testDivNode > p")
dqsaList.forEach( function (e) { e.style["color"] = "blue"; } );
_cut.isEqual("NodeList.prototype.forEach()", true,
  dqsaList[0].style["color"] === "blue" &&
  dqsaList[1].style["color"] === "blue"
);

var testNodeP1 = _.qs("#testNodeP1");
var testNodeP2 = _.qs("#testNodeP2");

testNodeP1.after("after text");
_cut.isEqual("ChildNode.after() text", true, testDivNode.innerHTML.includes("after text") )
testNodeP1.after( _.domCreate("b", {}, "after element") );
_cut.isEqual("ChildNode.after() element", true, testDivNode.innerHTML.includes("after element") );

testNodeP1.before("before text");
_cut.isEqual("ChildNode.before() text", true, testDivNode.innerHTML.includes("before text") )
testNodeP1.before( _.domCreate("b", {}, "before element") );
_cut.isEqual("ChildNode.before() element", true, testDivNode.innerHTML.includes("before element") );

testNodeP1.append("append text");
_cut.isEqual("ParentNode.append() text", true, testDivNode.innerHTML.includes("append text") )
testNodeP1.append( _.domCreate("b", {}, "append element") );
_cut.isEqual("ParentNode.append() element", true, testDivNode.innerHTML.includes("append element") );

testNodeP1.prepend("prepend text");
_cut.isEqual("ParentNode.prepend() text", true, testDivNode.innerHTML.includes("prepend text") )
testNodeP1.prepend( _.domCreate("b", {}, "prepend element") );
_cut.isEqual("ParentNode.prepend() element", true, testDivNode.innerHTML.includes("prepend element") );

testNodeP1.replaceWith("testElement");
_cut.isEqual("ChildNode.replaceWith() text", null, _.qs("#testNodeP1") );

testNodeP2.replaceWith( _.domCreate("p", {}, "testElement") );
_cut.isEqual("ChildNode.replaceWith() element", null, _.qs("#testNodeP2") );

testDivNode.remove();
_cut.isEqual("ChildNode.remove()", null, _.qs("#testDivNode") );

_cut.isTrue("window.screenLeft present", ("screenLeft" in window));
_cut.isTrue("window.screenTop present", ("screenTop" in window));

_cut.isEqual("globalThis", window, globalThis);


/* Object.fromEntries() */
_cut.addElement("h4", "Object.fromEntries()");

var arr = [ ["0", "a"], ["1", "b"], ["2", "c"] ];
_cut.isEqual("Object.fromEntries() step 1 array",'{"0":"a","1":"b","2":"c"}', JSON.stringify(Object.fromEntries(arr)));
_cut.addElement("p", JSON.stringify(Object.fromEntries(arr)) );

var obj = {"a":1,"b":2,"c":3};
_cut.isEqual("Object.fromEntries() step 2 Object.entries",'{"a":1,"b":2,"c":3}', JSON.stringify(Object.fromEntries(Object.entries(obj))));
_cut.addElement("p", JSON.stringify(Object.fromEntries(Object.entries(obj))) );

if (_cut.isNotIE11()) {
  var fromEntriesMap = new Map([ ["foo", "bar"], ["baz", 42] ]);
  /*
  var map = new Map();
  map.set("foo", "bar");
  map.set("baz", 42);
  */
  _cut.isEqual("Object.fromEntries() step 3 Map - doesn't work in IE11",'{"foo":"bar","baz":42}', JSON.stringify(Object.fromEntries(fromEntriesMap)));
  _cut.addElement("p", JSON.stringify(Object.fromEntries(fromEntriesMap)) );
}


/* Array.prototype.flat() */
_cut.addElement("h4", "Array.prototype.flat()");

var flatArr = [1, 2, 3, 4];
_cut.isEqual("step 1", "[1,2,3,4]", JSON.stringify( flatArr.flat() ) );
_cut.addElement("p",JSON.stringify( flatArr.flat() ));
_cut.isEqual("step 2a", "[1,2,3,4]", JSON.stringify( flatArr.flat(1000) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(1000) ));
_cut.isEqual("step 2b", "[1,2,3,4]", JSON.stringify( flatArr.flat(Infinity) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(Infinity) ));

flatArr = [1, 2, [3, 4]];
_cut.isEqual("step 3", "[1,2,3,4]", JSON.stringify( flatArr.flat() ) );
_cut.addElement("p",JSON.stringify( flatArr.flat() ));

flatArr = [1,2,[3,4,[5,6]]];
_cut.isEqual("step 4", "[1,2,3,4,[5,6]]", JSON.stringify( flatArr.flat() ) );
_cut.addElement("p",JSON.stringify( flatArr.flat() ));
_cut.isEqual("step 5", "[1,2,3,4,[5,6]]", JSON.stringify( flatArr.flat(1) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(1) ));
_cut.isEqual("step 6", "[1,2,3,4,5,6]", JSON.stringify( flatArr.flat(2) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(2) ));
_cut.isEqual("step 7a", "[1,2,3,4,5,6]", JSON.stringify( flatArr.flat(1000) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(1000) ));
_cut.isEqual("step 7b", "[1,2,3,4,5,6]", JSON.stringify( flatArr.flat(Infinity) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(Infinity) ));
_cut.isEqual("step 8", "[1,2,[3,4,[5,6]]]", JSON.stringify( flatArr.flat(0) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(0) ));
_cut.isEqual("step 9", "[1,2,[3,4,[5,6]]]", JSON.stringify( flatArr.flat(-1) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(-1) ));
_cut.isEqual("step 10", "[1,2,[3,4,[5,6]]]", JSON.stringify( flatArr.flat("a2") ) );
_cut.addElement("p",JSON.stringify( flatArr.flat("a2") ));
_cut.isEqual("step 11", "[1,2,[3,4,[5,6]]]", JSON.stringify( flatArr.flat(false) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(false) ));
_cut.isEqual("step 12", "[1,2,3,4,[5,6]]", JSON.stringify( flatArr.flat(true) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(true) ));


/* Array.prototype.flatMap(callback) */
_cut.addElement("h4", "Array.prototype.flatMap(callback)");

var flatMapArr = [1, 2, 3, 4];

_cut.isEqual("step 13", "[[2],[4],[6],[8]]", JSON.stringify( flatMapArr.map(function (x) { return [x * 2]; }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.map(function (x) { return [x * 2]; }) ) );
_cut.isEqual("step 14", "[2,4,6,8]", JSON.stringify( flatMapArr.flatMap(function (x) { return [x * 2]; }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.flatMap(function (x) { return [x * 2]; }) ) );
_cut.isEqual("step 15", "[[2],[4],[6],[8]]", JSON.stringify( flatMapArr.flatMap(function (x) { return [[x * 2]]; }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.flatMap(function (x) { return [[x * 2]]; }) ) );

flatMapArr = ["lorem ipsum dolor", "", "sit"];
_cut.isEqual("step 16", '[["lorem","ipsum","dolor"],[""],["sit"]]', JSON.stringify( flatMapArr.map(function (x) { return x.split(" "); }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.map(function (x) { return x.split(" "); }) ) );

_cut.isEqual("step 17", '["lorem","ipsum","dolor","","sit"]', JSON.stringify( flatMapArr.flatMap(function (x) { return x.split(" "); }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.flatMap(function (x) { return x.split(" "); }) ) );


/* Number ES6 */
_cut.addElement("h3", "Number ES6");

_cut.isEqual("Number.parseInt()", parseInt("44.83"), Number.parseInt("44.83") );
_cut.isEqual("Number.parseFloat()", parseFloat("44.83"), Number.parseFloat("44.83") );
_cut.isEqual("Number.MIN_SAFE_INTEGER", -9007199254740991, Number.MIN_SAFE_INTEGER  );
_cut.isEqual("Number.MAX_SAFE_INTEGER", 9007199254740991, Number.MAX_SAFE_INTEGER );
_cut.isEqual("Number.EPSILON", Math.pow(2, -52), Number.EPSILON );
_cut.isEqual("Number.isNaN()",
  "false  false  false  false  false  false  false  true  false  false",
   Number.isNaN(42)
     +"  "+Number.isNaN(3.14)
     +"  "+Number.isNaN(-42)
     +"  "+Number.isNaN(-3.14)
     +"  "+Number.isNaN(0)
     +"  "+Number.isNaN(null)
     +"  "+Number.isNaN(undefined)
     +"  "+Number.isNaN(NaN)
     +"  "+Number.isNaN("The life")
     +"  "+Number.isNaN(true)
);
_cut.isEqual("isNaN()",
  "false  false  false  false  false  false  true  true  true  false",
  isNaN(42)
    +"  "+isNaN(3.14)
    +"  "+isNaN(-42)
    +"  "+isNaN(-3.14)
    +"  "+isNaN(0)
    +"  "+isNaN(null)
    +"  "+isNaN(undefined)
    +"  "+isNaN(NaN)
    +"  "+isNaN("The life")
    +"  "+isNaN(true)
);
_cut.isEqual("Number.isInteger()",
  "true  false  true  false  true  false  false  false  false  false",
  Number.isInteger(42)
    +"  "+Number.isInteger(3.14)
    +"  "+Number.isInteger(-42)
    +"  "+Number.isInteger(-3.14)
    +"  "+Number.isInteger(0)
    +"  "+Number.isInteger(null)
    +"  "+Number.isInteger(undefined)
    +"  "+Number.isInteger(NaN)
    +"  "+Number.isInteger("The life")
    +"  "+Number.isInteger(true)
);
_cut.isEqual("Number.isFinite()",
  "true  true  true  true  true  false  false  false  false  false",
  Number.isFinite(42)
    +"  "+Number.isFinite(3.14)
    +"  "+Number.isFinite(-42)
    +"  "+Number.isFinite(-3.14)
    +"  "+Number.isFinite(0)
    +"  "+Number.isFinite(null)
    +"  "+Number.isFinite(undefined)
    +"  "+Number.isFinite(NaN)
    +"  "+Number.isFinite("The life")
    +"  "+Number.isFinite(true)
);
_cut.isEqual("Number.isSafeInteger()",
  "true  false  true  false  true  false  false  false  false  false",
  Number.isSafeInteger(42)
    +"  "+Number.isSafeInteger(3.14)
    +"  "+Number.isSafeInteger(-42)
    +"  "+Number.isSafeInteger(-3.14)
    +"  "+Number.isSafeInteger(0)
    +"  "+Number.isSafeInteger(null)
    +"  "+Number.isSafeInteger(undefined)
    +"  "+Number.isSafeInteger(NaN)
    +"  "+Number.isSafeInteger("The life")
    +"  "+Number.isSafeInteger(true)
);


/* Math ES6 */
_cut.addElement("h3", "Math ES6")

_cut.isEqual("Math.acosh()", 0, Math.acosh(1));
_cut.isEqual("Math.asinh()", 0, Math.asinh(0));
_cut.isEqual("Math.atanh()", Infinity, Math.atanh(1));
_cut.isEqual("Math.cbrt()", 1, Math.cbrt(1));
_cut.isEqual("Math.clz32()", 26, Math.clz32(32));
_cut.isEqual("Math.cosh()", 1, Math.cosh(0));
_cut.isTrue("Math.expm1()", Math.expm1(1) > 1.7);
_cut.isFalse("Math.fround()", Math.fround(1.337) === 1.337);
_cut.isTrue("Math.hypot()", Math.hypot(3, 4, 5) > 7);
_cut.isEqual("Math.imul()", -10, Math.imul(0xfffffffe, 5));
_cut.isTrue("Math.log1p()", Math.log1p(1) < 7);
_cut.isEqual("Math.log10()", 5, Math.log10(100000));
_cut.isEqual("Math.log2()", 1, Math.log2(2));
_cut.isEqual("Math.sign()", -1, Math.sign(-3));
_cut.isTrue("Math.sinh()", Math.sinh(2) > 3.6);
_cut.isEqual("Math.tanh()", 1, Math.tanh(Infinity));

_cut.isEqual(
  "Math.trunc()",
  "3"+"-3"+"4"+"-4"+"NaN"+"1"+"0",
  ""
  +Math.trunc(3.5)
  +Math.trunc(-3.5)
  +Math.trunc("4.8")
  +Math.trunc("-4.8")
  +Math.trunc("fff")
  +Math.trunc(true)
  +Math.trunc(false)
);


/* type checking */
_cut.addElement("h3", "type checking");

_cut.isEqual("isString() true", true, _.isString("str") );
_cut.isEqual("isString() false", false, _.isString(533) );
_cut.isEqual("isChar() true", true, _.isChar("s") );
_cut.isEqual("isChar() false 1", false, _.isChar("str") );
_cut.isEqual("isChar() false 2", false, _.isChar(533) );
_cut.isEqual("isNumber() true 1", true, _.isNumber(98) );
_cut.isEqual("isNumber() true 2", true, _.isNumber(3.14) );
_cut.isEqual("isNumber() false", false, _.isNumber("str") );
_cut.isEqual("isInteger() true", true, _.isInteger(98) );
_cut.isEqual("isInteger() false 1", false, _.isInteger(3.14) );
_cut.isEqual("isInteger() false 2", false, _.isInteger("str") );
_cut.isEqual("isFloat() true", true, _.isFloat(3.14) );
_cut.isEqual("isFloat() false 1", false, _.isFloat(98) );
_cut.isEqual("isFloat() false 2", false, _.isFloat("str") );
_cut.isEqual("isBoolean() true", true, _.isBoolean(false) );
_cut.isEqual("isBoolean() false", false, _.isBoolean(98) );
_cut.isEqual("isObject() true", true, _.isObject({}) );
_cut.isEqual("isObject() false ", false, _.isObject(98) );
_cut.isEqual("isEmptyObject() true", true, _.isEmptyObject({}) );
_cut.isEqual("isEmptyObject() false 1", false, _.isEmptyObject( document.querySelector("p") ) );
_cut.isEqual("isEmptyObject() false 2", false, _.isEmptyObject(98) );
_cut.isEqual("isFunction() true", true, _.isFunction(_.noop) );
_cut.isEqual("isFunction() false", false, _.isFunction( document.querySelector("p") ) );
_cut.isEqual("isArray() false", false, _.isArray( document.querySelector("p") ) );
_cut.isEqual("isEmptyArray() true", true, _.isEmptyArray([]) );
_cut.isEqual("isEmptyArray() false 1", false, _.isEmptyArray([1,2,3]) );
_cut.isEqual("isEmptyArray() false 2", false, _.isEmptyArray( document.querySelector("p") ) );
_cut.isEqual("isArraylike() true 1", true, _.isArraylike([]) );
_cut.isEqual("isArraylike() true 2", true, _.isArraylike( document.querySelectorAll("p") ) );
_cut.isEqual("isArraylike() false", false, _.isArraylike( document.querySelector("p") ) );
_cut.isEqual("isNull() true", true, _.isNull(null) );
_cut.isEqual("isNull() false", false, _.isNull( document.querySelectorAll("p") ) );
_cut.isEqual("isUndefined() true", true, _.isUndefined(undefined) );
_cut.isEqual("isUndefined() false", false, _.isUndefined( document.querySelectorAll("p") ) );
_cut.isEqual("isNullOrUndefined() true 1", true, _.isNullOrUndefined(undefined) );
_cut.isEqual("isNullOrUndefined() true 2", true, _.isNullOrUndefined(null) );
_cut.isEqual("isNullOrUndefined() false", false, _.isNullOrUndefined( document.querySelectorAll("p") ) );
_cut.isEqual("isNil() true 1", true, _.isNil(undefined) );
_cut.isEqual("isNil() true 2", true, _.isNil(null) );
_cut.isEqual("isNil() false", false, _.isNil( document.querySelectorAll("p") ) );
_cut.isEqual("isPrimitive() true 1", true, _.isPrimitive(98) );
_cut.isEqual("isPrimitive() true 2", true, _.isPrimitive("str") );
_cut.isEqual("isPrimitive() false 1", false, _.isPrimitive( document.querySelectorAll("p") ) );
_cut.isEqual("isPrimitive() false 2", false, _.isPrimitive(_.noop) );
_cut.isEqual("isDate() true", true, _.isDate(new Date()) );
_cut.isEqual("isDate() false", false, _.isDate({}) );
_cut.isEqual("isRegexp() true", true, _.isRegexp(/^\[object (.+)\]$/g) );
_cut.isEqual("isRegexp() false", false, _.isRegexp("string") );
_cut.isEqual("isElement() true 1", true, _.isElement(document.body) );
_cut.isEqual("isElement() true 2", true, _.isElement(_.qs("div")) );
_cut.isEqual("isElement() false 1", false, _.isElement(document.createTextNode("sample text")) );
_cut.isEqual("isElement() false 2 ", false, _.isElement(document.createComment("sample comment")) );
_cut.isEqual("isElement() false 3 ", false, _.isElement([]) );

_cut.isEqual("isNumeric() true", true,
  _.isNumeric(-42) &&
  _.isNumeric(-1.42) &&
  _.isNumeric(-0.42) &&
  _.isNumeric(0) &&
  _.isNumeric(0.42) &&
  _.isNumeric(.42) &&
  _.isNumeric(1.42) &&
  _.isNumeric(42) &&
  _.isNumeric(8e5) &&
  _.isNumeric(-8e5) &&
  _.isNumeric(0x89f) &&
  _.isNumeric(-0x89f) &&
  _.isNumeric("-42") &&
  _.isNumeric("-1.42") &&
  _.isNumeric("-0.42") &&
  _.isNumeric("0") &&
  _.isNumeric("0.42") &&
  _.isNumeric(".42") &&
  _.isNumeric("1.42") &&
  _.isNumeric("42") &&
  _.isNumeric("8e5") &&
  _.isNumeric("-8e5") &&
  _.isNumeric("0x89f")
);

_cut.isEqual("isNumeric() false", true,
  !_.isNumeric(null) &&
  !_.isNumeric(undefined) &&
  !_.isNumeric(NaN) &&
  !_.isNumeric("NaN") &&
  !_.isNumeric("1,42") &&
  !_.isNumeric("#foo") &&
  !_.isNumeric("1.2.3") &&
  !_.isNumeric("") &&
  !_.isNumeric("bar") &&
  !_.isNumeric(" ") &&
  !_.isNumeric("\r\n") &&
  !_.isNumeric("true") &&
  !_.isNumeric("false") &&
  !_.isNumeric("1<10") &&
  !_.isNumeric([]) &&
  !_.isNumeric({}) &&
  !_.isNumeric("-0x89f")
);


/* Type checking - isEqual()*/
_cut.addElement("h4", "Type checking - isEqual()");

_cut.log('<span class="info">Note: <code>isEqual();</code> Works only with ES5 types. Please use the <code>Array.from()</code> or the <code>spread syntax</code> to convert Map and Set types to Array!</span>');

_cut.isTrue(
  "isEqual() - 01 ES5 object true",
  _.isEqual({a:1,b:2}, {a:1,b:2})
);
_cut.isTrue(
  "isEqual() - 02 ES5 array true",
  _.isEqual(["a","b",3.14,"c","d",42], ["a","b",3.14,"c","d",42])
);
_cut.isTrue(
  "isEqual() - 03 ES5 nodelist true",
  _.isEqual(document.querySelectorAll("h3"), document.querySelectorAll("h3"))
);
_cut.isEqual(
  "isEqual() - 04 ES5 simple types true",
  "truetruetruetruetruetruetruetruetruetruetruetrue",
  ""
    + _.isEqual(true, true)
    + _.isEqual(false, false)
    + _.isEqual(42, 42)
    + _.isEqual(3.14, 3.14)
    + _.isEqual(0, -0)
    + _.isEqual(Infinity, Infinity)
    + _.isEqual(-Infinity, -Infinity)
    + _.isEqual("$", "$")
    + _.isEqual(
      "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.",
      "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die."
    )
    + _.isEqual(null, null)
    + _.isEqual(undefined, undefined)
    + _.isEqual(NaN, NaN)
);
_cut.isTrue(
  "isEqual() - 05 ES5 array + subobject true",
  _.isEqual(["a","b",3.14,"c","d",42,{a:1,b:2}], ["a","b",3.14,"c","d",42,{a:1,b:2}])
);
_cut.isFalse(
  "isEqual() - 06 ES5 array + subobject false",
  _.isEqual(["a","b",3.14,"c","d",42,{a:1,b:2}], ["a","b",3.14,"c","d",42,{a:1,b:3}])
);
_cut.isFalse(
  "isEqual() - 07 ES5 array false",
  _.isEqual(["a","b",3.14,"c","d",42], ["a","b",3.1415,"c","d",42])
);

if (_cut.isNotIE11()) {
  _cut.isTrue(
    "isEqual() - 08 ES6 map <b>with Array.from()</b> true",
    _.isEqual(
      Array.from( new Map([["a",1],["b",2],["c",3]]) ),
      Array.from( new Map([["a",1],["b",2],["c",3]]) )
    )
  );
  _cut.isFalse(
    "isEqual() - 09 ES6 map <b>with Array.from()</b> false",
    _.isEqual(
      Array.from( new Map([["a",1],["b",2],["c",3]]) ),
      Array.from( new Map([["a",1],["b",4],["c",3]]) )
    )
  );
  _cut.isTrue(
    "isEqual() - 10 ES6 set <b>with Array.from()</b> true",
    _.isEqual(
      Array.from( new Set([1,2,3,4,3,2,5,6,4,7]) ),
      Array.from( new Set([1,2,3,4,3,2,5,6,4,7]) )
    )
  );
  _cut.isFalse(
    "isEqual() - 11 ES6 set <b>with Array.from()</b> false",
    _.isEqual(
      Array.from( new Set([1,2,3,4,3,2,5,6,4,7]) ),
      Array.from( new Set([1,2,3,4,3,2,5,6,4,6]) )
    )
  );
  _cut.isFalse(
    "isEqual() - 12 ES6 map and set <b>with Array.from()</b> false",
    _.isEqual(
      Array.from( new Map([["a",1],["b",2],["c",3]]) ),
      Array.from( new Set([1,2,3,4,3,2,5,6,4,6]) )
    )
  );
}


/* ES6 type checking */
if (_cut.isNotIE11()) {
  _cut.addElement("h4", "ES6 type checking");
  _cut.isEqual("<b>ES6 -</b> isSymbol() true", true, _.isSymbol( Symbol("str") ) );
  _cut.isEqual("<b>ES6 -</b> isSymbol() false", false, _.isSymbol(_.noop) );
  _cut.isEqual("<b>ES6 -</b> isMap() true", true, _.isMap( new Map() ) );
  _cut.isEqual("<b>ES6 -</b> isMap() false", false, _.isMap(_.noop) );
  _cut.isEqual("<b>ES6 -</b> isSet() true", true, _.isSet( new Set() ) );
  _cut.isEqual("<b>ES6 -</b> isSet() false", false, _.isSet(_.noop) );
  _cut.isEqual("<b>ES6 -</b> isWeakMap() true", true, _.isWeakMap( new WeakMap() ) );
  _cut.isEqual("<b>ES6 -</b> isWeakMap() false", false, _.isWeakMap(_.noop) );
  _cut.isEqual("<b>ES6 -</b> isWeakSet() true", true, _.isWeakSet( new WeakSet() ) );
  _cut.isEqual("<b>ES6 -</b> isWeakSet() false", false, _.isWeakSet(_.noop) );
  _cut.isEqual(
    "<b>ES6 -</b> isIterator() true - Array values()",
    true,
    _.isIterator([4,5,6].values())
  );
  _cut.log( _.getType([4,5,6].values()) );
  _cut.isEqual(
    "<b>ES6 -</b> isIterator() true - Set values()",
    true,
    _.isIterator(new Set([4,5,7]).values())
  );
  _cut.log( _.getType(new Set([4,5,7]).values()) );
  _cut.isEqual(
    "<b>ES6 -</b> isIterator() true - Map values()",
    true,
    _.isIterator(new Map([[4,5],[5,6]]).values())
  );
  _cut.log( _.getType(new Map([[4,5],[5,6]]).values()) );
  if (_cut.isNotEdge()) {
    _cut.isEqual(
      "<b>ES6 -</b> isIterator() true - Nodelist values()",
      true,
      _.isIterator(document.querySelectorAll("h3").values())
    );
    _cut.log( _.getType(document.querySelectorAll("h3").values()) );
  }
  _cut.isEqual(
    "<b>ES6 -</b> isIterator() false - Array",
    false,
    _.isIterator([4,5,7])
  );
  _cut.log( _.getType([4,5,7]) );
  _cut.isTrue(
    "<b>ES6 -</b> isIterable() true",
    _.isIterable([])
      && _.isIterable("")
      && _.isIterable(new Map([[1,2],[3,4]]))
      && _.isIterable(new Set([1,2]))
  );
  _cut.isFalse(
    "<b>ES6 -</b> isIterable() false",
    _.isIterable(42)
      || _.isIterable(3.14)
      || _.isIterable({a:1,b:2})
      || _.isIterable(true)
      || _.isIterable(false)
  );
}


/* AJAX, domReady() and other callbacks */
_cut.addElement("h3", "AJAX, domReady() and other callbacks");

/* importScript() and importScripts() */
_cut.addElement("p", "Here have to be these results:");
_cut.addElement(
  "ul",
  "<li>3x importScript() (core api) - first script loaded</li>"
  +"<li>3x importScript() (core api) - second script loaded</li>"
  +"<li>1x importScripts() (core api) with success gs1</li>"
  +"<li>1x importScripts() (core api) with success gs2</li>"
  +"<li>1x importScripts() (core api) with error gs1</li>"
  +"<li>1x importScripts() (core api) with error gs2</li>"
  +"<li>4x importScripts() (core api) - with more scripts"
  +"<li>1x getJson()</li>"
  +"<li>1x getText()</li>"
  +"<li>3x getAjax() text/json/xml</li>"
  +"<li>3x postAjax() text/json/xml</li>"
  +"<li>3x getCors() text/json/xml</li>"
  +"<li>3x postCors() text/json/xml</li>"
  +"<li>1x getAjax() text + password</li>"
  +"<li>1x postAjax() json + password</li>"
  +"<li>1x getCors() xml + password</li>"
  +"<li>1x postCors() json + password</li>"
  +"<li>1x domReady() (core api) is working</li>"
);

_.importScript("unittest-gs1.js");
_.importScript("unittest-gs2.js");

_.importScripts("unittest-gsi.js");
_.importScripts("unittest-gsi.js", "unittest-gsi.js", "unittest-gsi.js");

var scripts=[
  { url: "unittest-gs1.js", success: function () {
  _cut.isEqual("importScripts() (core api) with success gs1", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.isEqual("importScripts() (core api) with success gs2", true, true);
  } }
];
_.importScripts(scripts);

scripts=[
  { url: "unittest-gs1.js", success: function () {
  _cut.isEqual("importScripts() (core api) with error gs1", true, true);
  } },
  { url: "unittest-gs3.js", success: function () {
    _cut.isEqual("importScripts() (core api) with error gs3", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.isEqual("importScripts() (core api) with error gs2", true, true);
  } }
];
_.importScripts(scripts);

/* AJAX functions */

var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <span class=\"small\">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</span></p>\r\n<p><b>Nullam dictum felis eu pede mollis pretium.</b> Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. <small>Etiam ultricies nisi vel augue.</small></p>";

_.getJson("testdata.json",
  function (r) { _cut.isEqual("getJson()", resAjaxJson, r[0].image );  }
);
_.getText("testdata.txt",
  function (r) { _cut.isEqual("getText()", resAjaxText, r ); }
);

_.getAjax("testdata.txt","text",
  function (r) { _cut.isEqual("getAjax() text", resAjaxText, r ); },
  function (e) { _cut.isEqual("getAjax() text: "+JSON.stringify(e), true, false ); }
);
_.getAjax("testdata.json","json",
  function (r) { _cut.isEqual("getAjax() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.isEqual("getAjax() json: "+JSON.stringify(e), true, false ); }
);
_.getAjax("testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("getAjax() xml", resAjaxXml, xb );
  },
  function (e) { _cut.isEqual("getAjax() xml: "+JSON.stringify(e), true, false ); }
);

_.postAjax( "testdata.txt","a=foo&b=bar baz","text",
  function (r) { _cut.isEqual("postAjax() text", resAjaxText, r );},
  function (e) { _cut.isEqual("postAjax() text: "+JSON.stringify(e), true, false ); }
);
_.postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.isEqual("postAjax() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.isEqual("postAjax() json: "+JSON.stringify(e), true, false ); }
);
_.postAjax( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("postAjax() xml", resAjaxXml, xb );
  },
  function (e) { _cut.isEqual("postAjax() xml: "+JSON.stringify(e), true, false ); }
);

_.getCors( "testdata.txt","text",
  function (r) { _cut.isEqual("getCors() text ", resAjaxText, r ); },
  function (e) { _cut.isEqual("getCors() text: "+JSON.stringify(e), true, false ); }
);
_.getCors( "testdata.json","json",
  function (r) { _cut.isEqual("getCors() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.isEqual("getCors() json: "+JSON.stringify(e), true, false ); }
);
_.getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("getCors() xml", resAjaxXml, xb );
  },
  function (e) { _cut.isEqual("getCors() xml: "+JSON.stringify(e), true, false ); }
);

_.postCors( "testdata.txt","text","a=foo&amp;b=bar baz",
  function (r) {
    _cut.isEqual("postCors() text", resAjaxText, r );
  },
  function (e) { _cut.isEqual("postCors() text: "+JSON.stringify(e), true, false ); }
);
_.postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.isEqual("postCors() json ", resAjaxJson, r[0].image ); },
  function (e) { _cut.isEqual("postCors() json: "+JSON.stringify(e), true, false ); }
);
_.postCors( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("postCors() xml", resAjaxXml, xb );
  },
  function (e) { _cut.isEqual("postCors() xml: "+JSON.stringify(e), true, false ); }
);

_.getAjax("testdata.txt","text",
  function (r) { _cut.isEqual("getAjax() text + password", resAjaxText, r ); },
  function (e) { _cut.isEqual("getAjax() text + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
_.postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.isEqual("postAjax() json + password", resAjaxJson, r[0].image ); },
  function (e) { _cut.isEqual("postAjax() json + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
_.getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.isEqual("getCors() xml + password", resAjaxXml, xb );
  },
  function (e) { _cut.isEqual("getCors() xml + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
_.postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.isEqual("postCors() json + password", resAjaxJson, r[0].image ); },
  function (e) { _cut.isEqual("postCors() json + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);

/* domReady() */
_.domReady(function () {
  //_cut.addElement("h3", "domReady (core api)");
  _cut.isEqual("domReady() (core api) is working", true, true );
});

}());
