(function(){
"use strict";

// Celestra 2.x testcases

/* _cut.isEqual("step", value, expr ); */
/* _cut.isEqual("step", value, expr, true ); */


/* Not tested functions */
_cut.addElement("h3", "Not tested functions");
_cut.addElement(
  "ul",
  "<li>getUrlVar([name]);</li>"
  +"<li>getLocation(&#60;success&#62;[,error]);</li>"
  +"<li>getStyle(&#60;href&#62;[,success]);</li>"
  +"<li>getStyles(&#60;styles&#62;);</li>"
  +"<li>getFullscreen();</li>"
  +"<li>setFullscreenOn(&#60;selector&#62; or &#60;element&#62;);</li>"
  +"<li>setFullscreenOff();</li>"
  +"<li>createFile(&#60;filename&#62;,&#60;content&#62;[,dType]);</li>"
  +"<li>domFadeIn(&#60;element&#62;[,duration[,display]]);</li>"
  +"<li>domFadeOut(&#60;element&#62;[,duration]);</li>"
  +"<li>domFadeToggle(&#60;element&#62;[,duration[,display]]);</li>"
  +"<li>noConflict();</li>"
  +"<li>celToWindow();</li>"
);


/* object names */
_cut.addElement("h3", "object names");

_cut.isEqual("Object name: \"celestra\"", true, celestra.random(100,200)>99 );
_cut.isEqual("Object name: \"Celestra\"", true, Celestra.random(100,200)>99 );
_cut.isEqual("Object name: \"_\"", true, _.random(100,200)>99 );


/* core api */
/*
getUrlVar([name]);
getLocation(<success>[,error]);
getStyle(<href>[,success]);
getStyles(<styles>);
getFullscreen();
setFullscreenOn(<selector> or <element>);
setFullscreenOff();
createFile(<filename>,<content>[,dType]);
noConflict();
celToWindow();
*/
_cut.addElement("h3", "core api");

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
  "qs() selector + selector",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1","#qsaDivTestElement")
);

_cut.isEqual(
  "qs() selector + element",
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

var testQsa2 = _.qsa("p", "#qsaDivTestElement")
_cut.isEqual(
  "qsa() selector + selector",
  true,
  Array.isArray(testQsa2) &&
    testQsa2.length === 2 &&
    testQsa2[0] === _.qs("#qsaDivP1") &&
    testQsa2[1] === _.qs("#qsaDivP2")
);

var testQsa3 = _.qsa("p", document.querySelector("#qsaDivTestElement") )
_cut.isEqual(
  "qsa() selector + element",
  true,
  Array.isArray(testQsa3) &&
    testQsa3.length === 2 &&
    testQsa3[0] === _.qs("#qsaDivP1") &&
    testQsa3[1] === _.qs("#qsaDivP2")
);

testQsa3.each(function (e) { e.innerHTML += " each"; });
_cut.isEqual("qsa() each", true,
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
  testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);

_cut.isEqual("getType() values",
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

_cut.isEqual("getType() all true",
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

_cut.isEqual("getType() all false",
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
// getStyle() and getStyles()

_cut.addElement( _.domCreate("p", {"id": "csstest2"}, "#csstest2" ) );
var csstest2 = _.qs("#csstest2");

_.getStyle("testmodule1.css");
_cut.isEqual("getStyle()", "bold", _.domGetCSS(csstest2, "font-weight") );

_.getStyle("testmodule1.css", function () {
  _cut.isEqual("getStyle()", "bold", _.domGetCSS(csstest2, "font-weight") );
} );
*/

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

/* / kaylee */

_cut.isEqual("getDoNotTrack()", true, _.getDoNotTrack() === true || _.getDoNotTrack() === false );
_cut.isEqual("constant()", 3.14, _.constant(3.14)() );
_cut.isEqual("identity()", 100, _.identity(60) + _.identity(40) );
_cut.isEqual("noop()", undefined, _.noop() );

_cut.isEqual(
  "removeTags()",
  "lorem ipsum dolor sit amet , consectetuer",
  _.removeTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

_cut.isEqual("version", true, _.version.includes("Celestra v") );

/* celestra.fromEntries() */
_cut.addElement("h4", "_.fromEntries()");

_cut.addElement("p", '<span class="deprecated">DEPRECATED in v2.0.8 - Please use the Object.fromEntries() instead of this!</span>');

var qsaList = document.querySelectorAll("p");
_cut.isEqual("_.fromEntries() step 1 nodelist","{}", JSON.stringify(_.fromEntries(qsaList)));
_cut.addElement("p", JSON.stringify(_.fromEntries(qsaList)) );

var arr = [ ["0", "a"], ["1", "b"], ["2", "c"] ];
_cut.isEqual("_.fromEntries() step 2 array",'{"0":"a","1":"b","2":"c"}', JSON.stringify(_.fromEntries(arr)));
_cut.addElement("p", JSON.stringify(_.fromEntries(arr)) );

var obj = {"a":1,"b":2,"c":3}; 
_cut.isEqual("_.fromEntries() step 3 Object.entries",'{"a":1,"b":2,"c":3}', JSON.stringify(_.fromEntries(Object.entries(obj))));
_cut.addElement("p", JSON.stringify(_.fromEntries(Object.entries(obj))) );

var mapList = {0: ["foo","lorem ipsum"], 1: ["bar", 42], 2: ["baz", true], length: 3};
_cut.isEqual("_.fromEntries() step 4 map like object",'{"foo":"lorem ipsum","bar":42,"baz":true}', JSON.stringify(_.fromEntries(mapList)));
_cut.addElement("p", JSON.stringify(_.fromEntries(mapList)) );

mapList = { 0: "foo", 1: "bar", 2: true, length: 3 };
_cut.isEqual("_.fromEntries() step 5 array like object with string - string elements as arrayLike",'{"f":"o","b":"a"}', JSON.stringify(_.fromEntries(mapList)));
_cut.addElement("p", JSON.stringify(_.fromEntries(mapList)) );

if (_cut.isNotIE11()) {
  var fromEntriesMap = new Map([ ["foo", "bar"], ["baz", 42] ]);
  /*
  var map = new Map();
  map.set("foo", "bar");
  map.set("baz", 42);
  */
  _cut.isEqual("_.fromEntries() step 6 Map - doesn't work in IE11",'{"foo":"bar","baz":42}', JSON.stringify(_.fromEntries(fromEntriesMap)));
  _cut.addElement("p", JSON.stringify(_.fromEntries(fromEntriesMap)) );
}

/*
_cut.addElement("p", "<b>step 6a (string) + 6b (number) + 6c (boolean)</b>: These have to be not present in the results. These have to throw an error. You can check the first error message in the console.")

var entriesStr2 = "lorem ipsum";
_cut.isEqual("_.fromEntries() step 7a string - you should not see this","x", JSON.stringify(_.fromEntries(entriesStr2)));
_cut.addElement("p", JSON.stringify(_.fromEntries(entriesStr2)) );
//  Error: TypeError: iterable for Celestra.fromEntries should have array-like objects - "lorem ipsum"

_cut.isEqual("_.fromEntries() step 7b number - you should not see this","x", JSON.stringify(_.fromEntries(3.14)));
_cut.addElement("p", JSON.stringify(_.fromEntries(3.14)) );
// TypeError: iterable for Celestra.fromEntries should have array-like objects - 3.14

_cut.isEqual("_.fromEntries() step 7c boolean - you should not see this","x", JSON.stringify(_.fromEntries(true)));
_cut.addElement("p", JSON.stringify(_.fromEntries(true)) );
// Error: TypeError: iterable for Celestra.fromEntries should have array-like objects - true
*/
/* / celestra.fromEntries() */


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


/* FP */

_cut.addElement("h3", "FP");

var slice = _.toFunction([].slice);
_cut.isEqual("toFunction()", true, Array.isArray(slice(document.querySelectorAll("h3"))) );

var dqsa = _.bind(document.querySelectorAll, document);
_cut.isEqual("bind()", true, dqsa("h3").length > 0 );

var FPArray = [1,2,3];

var forEachStr = "";
_.forEach(FPArray, function (e) { forEachStr += (e*2); } );
_cut.isEqual("forEach()", "246", forEachStr );

var eachStr = "";
_.each(FPArray, function (e) { eachStr += (e*2); } );
_cut.isEqual("each()", "246", eachStr );

_cut.isEqual("map()", 9, _.map(FPArray, function (e) {return e*3})[2] );

var FPObject = {a:2, b:3, c:4};

var forInStr = "";
_.forIn(FPObject, function (e) { forInStr += (e*2); } );
_cut.isEqual("forIn()", "468", forInStr );

_cut.isEqual("mapIn()", 9, _.mapIn(FPObject, function (e) { return (e*3); })["b"] );
_cut.isEqual("toArray()", true, Array.isArray( _.toArray({0:1,1:2,2:3,length:3}) ) );
_cut.isEqual("toObject()", true, _.isObject( _.toArray({0:1,1:2,2:3,length:3}) ) );
_cut.isEqual("hasOwn() true", true, _.hasOwn( {0:1,1:2,2:3,length:3}, "length" ) );
_cut.isEqual("hasOwn() false", false, _.hasOwn( FPArray, "forEach" ) );


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


/* Object.fromEntries() */
_cut.addElement("h4", "Object.fromEntries()");

var arr = [ ["0", "a"], ["1", "b"], ["2", "c"] ];
_cut.isEqual("Object.fromEntries() step 1 array",'{"0":"a","1":"b","2":"c"}', JSON.stringify(_.fromEntries(arr)));
_cut.addElement("p", JSON.stringify(Object.fromEntries(arr)) );

var obj = {"a":1,"b":2,"c":3}; 
_cut.isEqual("Object.fromEntries() step 2 Object.entries",'{"a":1,"b":2,"c":3}', JSON.stringify(_.fromEntries(Object.entries(obj))));
_cut.addElement("p", JSON.stringify(Object.fromEntries(Object.entries(obj))) );

if (_cut.isNotIE11()) {
  var fromEntriesMap = new Map([ ["foo", "bar"], ["baz", 42] ]);
  /*
  var map = new Map();
  map.set("foo", "bar");
  map.set("baz", 42);
  */
  _cut.isEqual("Object.fromEntries() step 3 Map - doesn't work in IE11",'{"foo":"bar","baz":42}', JSON.stringify(_.fromEntries(fromEntriesMap)));
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


/* ES6 type checking */
if (_cut.isNotIE11()) {
  _cut.addElement("h3", "ES6 type checking");
  _cut.isEqual("<b>ES6 -</b> isSymbol() true", true, _.isSymbol( Symbol("str") ) );
  _cut.isEqual("<b>ES6 -</b> isSymbol() false", false, _.isSymbol(_.noop) );
  _cut.isEqual("<b>ES6 -</b> isMap() true", true, _.isMap( new Map() ) );
  _cut.isEqual("<b>ES6 -</b> isMap() false", false, _.isMap(_.noop) );
  _cut.isEqual("<b>ES6 -</b> isSet() true", true, _.isSet( new Set() ) );
  _cut.isEqual("<b>ES6 -</b> isSet() false", false, _.isSet(_.noop) );
}


/* AJAX, domReady() and other callbacks */
_cut.addElement("h3", "AJAX, domReady() and other callbacks");

/* getScript() and getScripts() */
_cut.addElement("p", "Here have to be these results:");
_cut.addElement(
  "ul",
  "<li>3x getScript() (core api) - first script loaded</li>"
  +"<li>3x getScript() (core api) - second script loaded</li>"
  +"<li>1x getScripts() (core api) with success gs1</li>"
  +"<li>1x getScripts() (core api) with success gs2</li>"
  +"<li>1x getScripts() (core api) with error gs1</li>"
  +"<li>1x getScripts() (core api) with error gs2</li>"
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

_.getScript("unittest-gs1.js");
_.getScript("unittest-gs2.js");

var scripts=[
  { url: "unittest-gs1.js", success: function () {
  _cut.isEqual("getScripts() (core api) with success gs1", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.isEqual("getScripts() (core api) with success gs2", true, true);
  } }
];
_.getScripts(scripts);

scripts=[
  { url: "unittest-gs1.js", success: function () {
  _cut.isEqual("getScripts() (core api) with error gs1", true, true);
  } },
  { url: "unittest-gs3.js", success: function () {
    _cut.isEqual("getScripts() (core api) with error gs3", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.isEqual("getScripts() (core api) with error gs2", true, true);
  } }
];
_.getScripts(scripts);

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
