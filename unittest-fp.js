"use strict";

// Celestra 2.x testcases

/* _cut.addTest("step", true, expr ); */
/* _cut.addTest("step", true, expr, true ); */


/* Sample testcases */
_cut.addElement("h3", "Sample testcases");
_cut.addTest(
  "Array.from() passed true",
  true,
  isArray(Array.from(document.querySelectorAll("p")))
);
_cut.addTest(
  "Array.from() failed false",
  false,
  Array.from(toArray(document.querySelectorAll("p")))
);


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
// _cut.addElement("h3", "object names");

// _cut.addTest("Object name: \"celestra\"", true, celestra.random(100,200)>99 );
// _cut.addTest("Object name: \"Celestra\"", true, Celestra.random(100,200)>99 );
// _cut.addTest("Object name: \"_\"", true, _.random(100,200)>99 );


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
  domCreate(
    "div",
    {"id": "qsaDivTestElement"},
    "#qsaDiv test element"
      + "<p id='qsaDivP1'>#qsaDivP1 test element</p>"
      + "<p id='qsaDivP2'>#qsaDivP2 test element</p>"
  )
);

_cut.addTest(
  "qs() selector",
  document.querySelector("#qsaDivTestElement"),
  qs("#qsaDivTestElement")
);

_cut.addTest(
  "qs() selector + selector",
  document.querySelector("#qsaDivP1"),
  qs("#qsaDivP1","#qsaDivTestElement")
);

_cut.addTest(
  "qs() selector + element",
  document.querySelector("#qsaDivP1"),
  qs("#qsaDivP1", document.querySelector("#qsaDivTestElement") )
);

var testQsa1 = qsa("#qsaDivTestElement > p")
_cut.addTest(
  "qsa() selector",
  true,
  Array.isArray(testQsa1) &&
    testQsa1.length === 2 &&
    testQsa1[0] === qs("#qsaDivP1") &&
    testQsa1[1] === qs("#qsaDivP2")
);

var testQsa2 = qsa("p", "#qsaDivTestElement")
_cut.addTest(
  "qsa() selector + selector",
  true,
  Array.isArray(testQsa2) &&
    testQsa2.length === 2 &&
    testQsa2[0] === qs("#qsaDivP1") &&
    testQsa2[1] === qs("#qsaDivP2")
);

var testQsa3 = qsa("p", document.querySelector("#qsaDivTestElement") )
_cut.addTest(
  "qsa() selector + element",
  true,
  Array.isArray(testQsa3) &&
    testQsa3.length === 2 &&
    testQsa3[0] === qs("#qsaDivP1") &&
    testQsa3[1] === qs("#qsaDivP2")
);

testQsa3.each(function (e) { e.innerHTML += " each"; });
_cut.addTest("qsa() each", true,
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
  testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);

_cut.addTest("getType() values",
  "array  number  string  object  htmldocument  boolean  nodelist  htmlparagraphelement  null  undefined  function  date  regexp",
  getType([1,2,3])
  +"  "+getType(1998)
  +"  "+getType("hello world")
  +"  "+getType({a:1,b:2})
  +"  "+getType(document)
  +"  "+getType(true)
  +"  "+getType(document.querySelectorAll("p"))
  +"  "+getType(document.querySelector("p"))
  +"  "+getType(null)
  +"  "+getType(undefined)
  +"  "+getType(function(){})
  +"  "+getType(new Date())
  +"  "+getType(/^\[object (.+)\]$/g)
);

_cut.addTest("getType() all true",
  "true  true  true  true  true  true  true  true  true  true  true  true  true",
 getType([1,2,3], "array")
  +"  "+getType(1998, "number")
  +"  "+getType("hello world", "string")
  +"  "+getType({a:1,b:2}, "object")
  +"  "+getType(document, "htmldocument")
  +"  "+getType(true, "boolean")
  +"  "+getType(document.querySelectorAll("p"), "nodelist")
  +"  "+getType(document.querySelector("p"), "htmlparagraphelement")
  +"  "+getType(null, "null")
  +"  "+getType(undefined, "undefined")
  +"  "+getType(function(){}, "function")
  +"  "+getType(new Date(), "date")
  +"  "+getType(/^\[object (.+)\]$/g, "regexp")
);

_cut.addTest("getType() all false",
  "false  false  false  false  false  false  false  false  false  false  false  false  false",
  getType([1,2,3], "number")
  +"  "+getType(1998, "array")
  +"  "+getType("hello world", "object")
  +"  "+getType({a:1,b:2}, "string")
  +"  "+getType(document, "boolean")
  +"  "+getType(true, "htmldocument")
  +"  "+getType(document.querySelectorAll("p"), "htmlheadingelement")
  +"  "+getType(document.querySelector("p"), "nodelist")
  +"  "+getType(null, "undefined")
  +"  "+getType(undefined, "null")
  +"  "+getType(function(){}, "object")
  +"  "+getType(new Date(), "array")
  +"  "+getType(/^\[object (.+)\]$/g, "string")
);

var foo1 = { a : "1", b : "2" };
var bar1 = { c : "3", d : "4",
  baz : { e : 5, fn : function(num) { return num*num; } }
};

var extObj1 = extend(true,{},foo1,bar1);
_cut.addTest(
  "extend() true",
  "1  2  3  4  5  121",
  extObj1.a
  +"  "+extObj1.b
  +"  "+extObj1.c
  +"  "+extObj1.d
  +"  "+extObj1.baz.e
  +"  "+extObj1.baz.fn(11)
);

var extObj1 = extend(false,{},foo1,bar1);
_cut.addTest(
  "extend() false 1",
  "1  2  3  4  5  121",
  extObj1.a
  +"  "+extObj1.b
  +"  "+extObj1.c
  +"  "+extObj1.d
  +"  "+extObj1.baz.e
  +"  "+extObj1.baz.fn(11)
);

var extObj1 = extend({},foo1,bar1);
_cut.addTest(
  "extend() false 2",
  "1  2  3  4  5  121",
  extObj1.a
  +"  "+extObj1.b
  +"  "+extObj1.c
  +"  "+extObj1.d
  +"  "+extObj1.baz.e
  +"  "+extObj1.baz.fn(11)
);

var extObj1 = deepAssign({},foo1,bar1);
_cut.addTest(
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
_cut.addTest(
  "obj2string()", "str=%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%89%C3%81%C5%B0%C5%90%C3%9A%C3%96%C3%9C%C3%93%C3%8D&bool=true&pi=3.141592653589793",
  obj2string(obj2stringObj)
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

inherit(Worker,Human);

Worker.prototype.setJob = function (job) { this.job = job;}
Worker.prototype.getJob = function () { return this.job;}

var David = new Human("David",27);
var Amy = new Worker ("Amy",25,"Engineer");

_cut.addTest(
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

_cut.addTest(
  "getUrlVarFromString()",
  "a1",
  getUrlVarFromString("?testa=a1&testb=b2")["testa"]
);
_cut.addTest(
  "getUrlVarFromString() prop",
  "b2",
  getUrlVarFromString("?testa=a1&testb=b2", "testb")
);

_cut.addElement(
  domCreate(
    "div",
    {"id": "testFormDiv"},
    " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
  )
);

_cut.addTest(
  "form2array()", '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify( form2array( qs("#form1") ) )
 );

_cut.addTest(
  "form2string()",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  form2string( qs("#form1") )
 );

 qs("#testFormDiv").remove();


/*
https://stackoverflow.com/questions/9454125/javascript-request-fullscreen-is-unreliable/9747340
Fullscreen API not testable with automation.

_cut.addElement(
  domCreate("p", {"id": "domFullscreenElement"}, "fullscreen test element")
);
var domFullscreenElement = qs("#domFullscreenElement");

setFullscreenOn(domFullscreenElement);
_cut.addTest(
  "getFullscreen() and setFullscreenOn(<element>) and setFullscreenOff",
  domFullscreenElement,
  getFullscreen()
);
alert(getFullscreen());
setFullscreenOff();

setFullscreenOn("#domFullscreenElement");
_cut.addTest(
  "getFullscreen() and setFullscreenOn(<selector>) and setFullscreenOff",
  domFullscreenElement,
  getFullscreen()
);
alert(getFullscreen());
setFullscreenOff();

setFullscreenOn(document);
_cut.addTest(
  "getFullscreen and setFullscreenOn(document) and setFullscreenOff",
  document,
  getFullscreen()
);

setFullscreenOff();
*/

/*
// getStyle() and getStyles()

_cut.addElement( domCreate("p", {"id": "csstest2"}, "#csstest2" ) );
var csstest2 = qs("#csstest2");

getStyle("testmodule1.css");
_cut.addTest("getStyle()", "bold", domGetCSS(csstest2, "font-weight") );

getStyle("testmodule1.css", function () {
  _cut.addTest("getStyle()", "bold", domGetCSS(csstest2, "font-weight") );
} );
*/

_cut.addTest("random()", true, random() <= 101 );
_cut.addTest("random(max)", true, random(30) <= 30 );
var testRandom = random(51,55);
_cut.addTest("random(min,max)", true, testRandom >= 51 && testRandom <= 55 );

_cut.addTest("getDoNotTrack()", true, getDoNotTrack() === true || getDoNotTrack() === false );
_cut.addTest("constant()", 3.14, constant(3.14)() );
_cut.addTest("identity()", 100, identity(60) + identity(40) );
_cut.addTest("noop()", undefined, noop() );

_cut.addTest(
  "removeTags()",
  "lorem ipsum dolor sit amet , consectetuer",
  removeTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

// _cut.addTest(_."version", true, version.includes("Celestra v") );

/* celestra.fromEntries() */
_cut.addElement("h4", "fromEntries()");

var qsaList = document.querySelectorAll("p");
_cut.addTest("fromEntries() step 1 nodelist","{}", JSON.stringify(fromEntries(qsaList)));
_cut.addElement("p", JSON.stringify(fromEntries(qsaList)) );

var arr = [ ["0", "a"], ["1", "b"], ["2", "c"] ];
_cut.addTest("fromEntries() step 2 array",'{"0":"a","1":"b","2":"c"}', JSON.stringify(fromEntries(arr)));
_cut.addElement("p", JSON.stringify(fromEntries(arr)) );

var obj = {"a":1,"b":2,"c":3}; 
_cut.addTest("fromEntries() step 3 Object.entries",'{"a":1,"b":2,"c":3}', JSON.stringify(fromEntries(Object.entries(obj))));
_cut.addElement("p", JSON.stringify(fromEntries(Object.entries(obj))) );


var mapList = {0: ["foo","lorem ipsum"], 1: ["bar", 42], 2: ["baz", true], length: 3};
_cut.addTest("fromEntries() step 4 map like object",'{"foo":"lorem ipsum","bar":42,"baz":true}', JSON.stringify(fromEntries(mapList)));
_cut.addElement("p", JSON.stringify(fromEntries(mapList)) );

mapList = { 0: "foo", 1: "bar", 2: true, length: 3 };
_cut.addTest("fromEntries() step 5 array like object with string - string elements as arrayLike",'{"f":"o","b":"a"}', JSON.stringify(fromEntries(mapList)));
_cut.addElement("p", JSON.stringify(fromEntries(mapList)) );

if (_cut.isNotIE11()) {
  var fromEntriesMap = new Map([ ["foo", "bar"], ["baz", 42] ]);
  /*
  var map = new Map();
  map.set("foo", "bar");
  map.set("baz", 42);
  */
  _cut.addTest("fromEntries() step 6 Map - doesn't work in IE11",'{"foo":"bar","baz":42}', JSON.stringify(fromEntries(fromEntriesMap)));
  _cut.addElement("p", JSON.stringify(fromEntries(fromEntriesMap)) );
}

/*
_cut.addElement("p", "<b>step 6a (string) + 6b (number) + 6c (boolean)</b>: These have to be not present in the results. These have to throw an error. You can check the first error message in the console.")

var entriesStr2 = "lorem ipsum";
_cut.addTest("fromEntries() step 7a string - you should not see this","x", JSON.stringify(fromEntries(entriesStr2)));
_cut.addElement("p", JSON.stringify(fromEntries(entriesStr2)) );
//  Error: TypeError: iterable for Celestra.fromEntries should have array-like objects - "lorem ipsum"

_cut.addTest("fromEntries() step 7b number - you should not see this","x", JSON.stringify(fromEntries(3.14)));
_cut.addElement("p", JSON.stringify(fromEntries(3.14)) );
// TypeError: iterable for Celestra.fromEntries should have array-like objects - 3.14

_cut.addTest("fromEntries() step 7c boolean - you should not see this","x", JSON.stringify(fromEntries(true)));
_cut.addElement("p", JSON.stringify(fromEntries(true)) );
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
  domCreate("p", {"id": "domTestElement", "width": "250px"}, "DOM test element")
);
var domTestElement = qs("#domTestElement") ;

_cut.addTest("domCreate()", true, isElement(domTestElement) );

domSetCSS(domTestElement, "width", "300px");
_cut.addTest("domSetCSS() property and domGetCSS()", "300px", domGetCSS(domTestElement, "width") );

domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
_cut.addTest("domSetCSS() properties object and domGetCSS()",
  "350px",
  domGetCSS(domTestElement, "width")
);

domHide(domTestElement);
_cut.addTest("domHide()", "none", domGetCSS(domTestElement, "display") );

domShow(domTestElement);
_cut.addTest("domShow()", "block", domGetCSS(domTestElement, "display") );

domHide(domTestElement);
domShow(domTestElement, "inline-block");
_cut.addTest("domShow() inline-block", "inline-block", domGetCSS(domTestElement, "display") );

domToggle(domTestElement);
_cut.addTest("domToggle() hide", "none", domGetCSS(domTestElement, "display") );

domToggle(domTestElement);
_cut.addTest("domToggle() show", "block", domGetCSS(domTestElement, "display") );

domToggle(domTestElement, "inline-block");
_cut.addTest("domToggle() hide inline-block", "none", domGetCSS(domTestElement, "display") );

domToggle(domTestElement, "inline-block");
_cut.addTest("domHide() show inline-block", "inline-block", domGetCSS(domTestElement, "display") );

var domTestVar = 33;
function domTestElementClick1 () { domTestVar = 42; }
function domTestElementClick2 () { domTestVar = 56; }

domOn(domTestElement, "click", domTestElementClick1 );
domTrigger(domTestElement, "click");
_cut.addTest("domOn() and domTrigger()", 42, domTestVar );

domOff(domTestElement, "click", domTestElementClick1 );
domOn(domTestElement, "click", domTestElementClick2 );
domOff(domTestElement, "click", domTestElementClick2 );
domTrigger(domTestElement, "click");
_cut.addTest("domOff() and domTrigger()", 42, domTestVar );


/* FP */

_cut.addElement("h3", "FP");

var slice = toFunction([].slice);
_cut.addTest("toFunction()", true, Array.isArray(slice(document.querySelectorAll("h3"))) );

var dqsa = bind(document.querySelectorAll, document);
_cut.addTest("bind()", true, dqsa("h3").length > 0 );

var FPArray = [1,2,3];

var forEachStr = "";
forEach(FPArray, function (e) { forEachStr += (e*2); } );
_cut.addTest("forEach()", "246", forEachStr );

var eachStr = "";
each(FPArray, function (e) { eachStr += (e*2); } );
_cut.addTest("each()", "246", eachStr );

_cut.addTest("map()", 9, map(FPArray, function (e) {return e*3})[2] );

var FPObject = {a:2, b:3, c:4};

var forInStr = "";
forIn(FPObject, function (e) { forInStr += (e*2); } );
_cut.addTest("forIn()", "468", forInStr );

_cut.addTest("mapIn()", 9, mapIn(FPObject, function (e) { return (e*3); })["b"] );
_cut.addTest("toArray()", true, Array.isArray( toArray({0:1,1:2,2:3,length:3}) ) );
_cut.addTest("toObject()", true, isObject( toArray({0:1,1:2,2:3,length:3}) ) );
_cut.addTest("hasOwn() true", true, hasOwn( {0:1,1:2,2:3,length:3}, "length" ) );
_cut.addTest("hasOwn() false", false, hasOwn( FPArray, "forEach" ) );


/* cookie */
_cut.addElement("h3", "cookie");

setCookie("ctest3", "cookieUnitTestStr");
_cut.addTest("hasCookie() true", true, hasCookie("ctest3") );
_cut.addTest("getCookie(name) value", "cookieUnitTestStr", getCookie("ctest3") );
_cut.addTest("getCookie()", "cookieUnitTestStr", getCookie()["ctest3"] );
_cut.addTest("removeCookie() true", true, removeCookie("ctest3") );
_cut.addTest("removeCookie() false", false, removeCookie("ctest3") );
_cut.addTest("hasCookie() false", false, hasCookie("ctest3") );
_cut.addTest("getCookie(name) null", null, getCookie("ctest3") );
_cut.addTest("getCookie() undefined", undefined, getCookie()["ctest3"] );


/* polyfills */
_cut.addElement("h3", "polyfills");

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
_cut.addTest(
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
_cut.addTest(
  "Object.entries()",
  '[["a",1],["b",2],["c",3]]'
  + '[["name","John Smith"],["age",42],["male",true]]',
  entriesStr
);
_cut.addTest(
  "Object.values()",
  '[1,2,3]'
  + '["John Smith",42,true]',
  valuesStr
);

var startStr = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.";
_cut.addTest(
  "String.prototype.startsWith()",
  "truefalsetruefalse",
  ""+ startStr.startsWith("Lorem ipsum dolor")
    + startStr.startsWith("consectetuer adipiscing elit")
    + startStr.startsWith("consectetuer adipiscing elit", 28)
    + startStr.startsWith("consectetuer adipiscing elit", 57)
);
_cut.addTest(
  "String.prototype.endsWith()",
  "truefalsetruefalse",
  ""+ startStr.endsWith("Aenean commodo ligula eget dolor.")
    + startStr.endsWith("Lorem ipsum dolor sit amet")
    + startStr.endsWith("consectetuer adipiscing elit.", 57)
    + startStr.endsWith("consectetuer adipiscing elit.", 47)
);

var trimStr = "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n";
_cut.addTest(
  "String.prototype.trimStart()",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimStart()
);
_cut.addTest(
  "String.prototype.trimLeft()",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.   \t \n",
  trimStr.trimLeft()
);
_cut.addTest(
  "String.prototype.trimEnd()",
  "\n \t   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  trimStr.trimEnd()
);
_cut.addTest(
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
_cut.addTest(
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

_cut.addTest("Array.from()", 3, Array.from({0:1,1:2,2:3,length:3})[2] );
_cut.addTest("Array.from() with mapFN",
  6,
  Array.from({0:1,1:2,2:3,length:3}, function (e) { return e*3; })[1]
);
_cut.addTest("Array.of()", 4, Array.of(2,4,6)[1] );
_cut.addTest("Object.create()", 1, Object.create({ a: 1, b: 2 }).a );
_cut.addTest("Object.assign()", 3, Object.assign({ a: 1}, {b: 2}, {c: 3}).c );
var testArrayFI = [66, 7, 135, 75, 190, 89];
_cut.addTest("Array.prototype.find() true",
  135,
  testArrayFI.find(function (e) { return e > 100; })
);
_cut.addTest("Array.prototype.find() false",
  undefined,
  testArrayFI.find(function (e) { return e > 200; })
);
_cut.addTest("Array.prototype.findIndex() true",
  2,
  testArrayFI.findIndex(function (e) { return e > 100; })
);
_cut.addTest("Array.prototype.findIndex() false",
  -1,
  testArrayFI.findIndex(function (e) { return e > 200; })
);
_cut.addTest("Array.prototype.includes() true", true, testArrayFI.includes(190) );
_cut.addTest("Array.prototype.includes() false", false, testArrayFI.includes(195) );
_cut.addTest("String.prototype.includes() true", true, "lorem ipsum".includes("ipsum") );
_cut.addTest("String.prototype.includes() false", false, "lorem ipsum".includes("erdei") );

_cut.addElement( domCreate("div", {"id": "testDivNode"}, "#testDivNode") );
var testDivNode = qs("#testDivNode");
testDivNode.append( domCreate("p", {"id": "testNodeP1"}, "testNodeP1") );
testDivNode.append( domCreate("p", {"id": "testNodeP2"}, "testNodeP2") );

var dqsaList = document.querySelectorAll("#testDivNode > p")
dqsaList.forEach( function (e) { e.style["color"] = "blue"; } );
_cut.addTest("NodeList.prototype.forEach()", true,
  dqsaList[0].style["color"] === "blue" &&
  dqsaList[1].style["color"] === "blue"
);

var testNodeP1 = qs("#testNodeP1");
var testNodeP2 = qs("#testNodeP2");

testNodeP1.after("after text");
_cut.addTest("ChildNode.after() text", true, testDivNode.innerHTML.includes("after text") )
testNodeP1.after( domCreate("b", {}, "after element") );
_cut.addTest("ChildNode.after() element", true, testDivNode.innerHTML.includes("after element") );

testNodeP1.before("before text");
_cut.addTest("ChildNode.before() text", true, testDivNode.innerHTML.includes("before text") )
testNodeP1.before( domCreate("b", {}, "before element") );
_cut.addTest("ChildNode.before() element", true, testDivNode.innerHTML.includes("before element") );

testNodeP1.append("append text");
_cut.addTest("ParentNode.append() text", true, testDivNode.innerHTML.includes("append text") )
testNodeP1.append( domCreate("b", {}, "append element") );
_cut.addTest("ParentNode.append() element", true, testDivNode.innerHTML.includes("append element") );

testNodeP1.prepend("prepend text");
_cut.addTest("ParentNode.prepend() text", true, testDivNode.innerHTML.includes("prepend text") )
testNodeP1.prepend( domCreate("b", {}, "prepend element") );
_cut.addTest("ParentNode.prepend() element", true, testDivNode.innerHTML.includes("prepend element") );

testNodeP1.replaceWith("testElement");
_cut.addTest("ChildNode.replaceWith() text", null, qs("#testNodeP1") );

testNodeP2.replaceWith( domCreate("p", {}, "testElement") );
_cut.addTest("ChildNode.replaceWith() element", null, qs("#testNodeP2") );

testDivNode.remove();
_cut.addTest("ChildNode.remove()", null, qs("#testDivNode") );


/* Array.prototype.flat() */
_cut.addElement("h4", "Array.prototype.flat()");

var flatArr = [1, 2, 3, 4];
_cut.addTest("step 1", "[1,2,3,4]", JSON.stringify( flatArr.flat() ) );
_cut.addElement("p",JSON.stringify( flatArr.flat() ));
_cut.addTest("step 2a", "[1,2,3,4]", JSON.stringify( flatArr.flat(1000) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(1000) ));
_cut.addTest("step 2b", "[1,2,3,4]", JSON.stringify( flatArr.flat(Infinity) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(Infinity) ));

flatArr = [1, 2, [3, 4]];
_cut.addTest("step 3", "[1,2,3,4]", JSON.stringify( flatArr.flat() ) );
_cut.addElement("p",JSON.stringify( flatArr.flat() ));

flatArr = [1,2,[3,4,[5,6]]];
_cut.addTest("step 4", "[1,2,3,4,[5,6]]", JSON.stringify( flatArr.flat() ) );
_cut.addElement("p",JSON.stringify( flatArr.flat() ));
_cut.addTest("step 5", "[1,2,3,4,[5,6]]", JSON.stringify( flatArr.flat(1) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(1) ));
_cut.addTest("step 6", "[1,2,3,4,5,6]", JSON.stringify( flatArr.flat(2) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(2) ));
_cut.addTest("step 7a", "[1,2,3,4,5,6]", JSON.stringify( flatArr.flat(1000) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(1000) ));
_cut.addTest("step 7b", "[1,2,3,4,5,6]", JSON.stringify( flatArr.flat(Infinity) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(Infinity) ));
_cut.addTest("step 8", "[1,2,[3,4,[5,6]]]", JSON.stringify( flatArr.flat(0) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(0) ));
_cut.addTest("step 9", "[1,2,[3,4,[5,6]]]", JSON.stringify( flatArr.flat(-1) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(-1) ));
_cut.addTest("step 10", "[1,2,[3,4,[5,6]]]", JSON.stringify( flatArr.flat("a2") ) );
_cut.addElement("p",JSON.stringify( flatArr.flat("a2") ));
_cut.addTest("step 11", "[1,2,[3,4,[5,6]]]", JSON.stringify( flatArr.flat(false) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(false) ));
_cut.addTest("step 12", "[1,2,3,4,[5,6]]", JSON.stringify( flatArr.flat(true) ) );
_cut.addElement("p",JSON.stringify( flatArr.flat(true) ));


/* Array.prototype.flatMap() */
_cut.addElement("h4", "Array.prototype.flatMap()");

var flatMapArr = [1, 2, 3, 4];

_cut.addTest("step 13", "[[2],[4],[6],[8]]", JSON.stringify( flatMapArr.map(function (x) { return [x * 2]; }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.map(function (x) { return [x * 2]; }) ) );
_cut.addTest("step 14", "[2,4,6,8]", JSON.stringify( flatMapArr.flatMap(function (x) { return [x * 2]; }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.flatMap(function (x) { return [x * 2]; }) ) );
_cut.addTest("step 15", "[[2],[4],[6],[8]]", JSON.stringify( flatMapArr.flatMap(function (x) { return [[x * 2]]; }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.flatMap(function (x) { return [[x * 2]]; }) ) );

flatMapArr = ["lorem ipsum dolor", "", "sit"];
_cut.addTest("step 16", '[["lorem","ipsum","dolor"],[""],["sit"]]', JSON.stringify( flatMapArr.map(function (x) { return x.split(" "); }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.map(function (x) { return x.split(" "); }) ) );

_cut.addTest("step 17", '["lorem","ipsum","dolor","","sit"]', JSON.stringify( flatMapArr.flatMap(function (x) { return x.split(" "); }) ) );
_cut.addElement("p", JSON.stringify( flatMapArr.flatMap(function (x) { return x.split(" "); }) ) );


/* Number ES6 */
_cut.addElement("h3", "Number ES6");

_cut.addTest("Number.MIN_SAFE_INTEGER", -9007199254740991, Number.MIN_SAFE_INTEGER  );
_cut.addTest("Number.MAX_SAFE_INTEGER", 9007199254740991, Number.MAX_SAFE_INTEGER );
_cut.addTest("Number.EPSILON", Math.pow(2, -52), Number.EPSILON );
_cut.addTest("Number.isNaN()",
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
_cut.addTest("isNaN()",
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
_cut.addTest("Number.isInteger()",
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
_cut.addTest("Number.isFinite()",
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
_cut.addTest("Number.isSafeInteger()",
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


/* type checking */
_cut.addElement("h3", "type checking");

_cut.addTest("isString() true", true, isString("str") );
_cut.addTest("isString() false", false, isString(533) );
_cut.addTest("isChar() true", true, isChar("s") );
_cut.addTest("isChar() false 1", false, isChar("str") );
_cut.addTest("isChar() false 2", false, isChar(533) );
_cut.addTest("isNumber() true 1", true, isNumber(98) );
_cut.addTest("isNumber() true 2", true, isNumber(3.14) );
_cut.addTest("isNumber() false", false, isNumber("str") );
_cut.addTest("isInteger() true", true, isInteger(98) );
_cut.addTest("isInteger() false 1", false, isInteger(3.14) );
_cut.addTest("isInteger() false 2", false, isInteger("str") );
_cut.addTest("isFloat() true", true, isFloat(3.14) );
_cut.addTest("isFloat() false 1", false, isFloat(98) );
_cut.addTest("isFloat() false 2", false, isFloat("str") );
_cut.addTest("isBoolean() true", true, isBoolean(false) );
_cut.addTest("isBoolean() false", false, isBoolean(98) );
_cut.addTest("isObject() true", true, isObject({}) );
_cut.addTest("isObject() false ", false, isObject(98) );
_cut.addTest("isEmptyObject() true", true, isEmptyObject({}) );
_cut.addTest("isEmptyObject() false 1", false, isEmptyObject( document.querySelector("p") ) );
_cut.addTest("isEmptyObject() false 2", false, isEmptyObject(98) );
_cut.addTest("isFunction() true", true, isFunction(noop) );
_cut.addTest("isFunction() false", false, isFunction( document.querySelector("p") ) );
_cut.addTest("isArray() false", false, isArray( document.querySelector("p") ) );
_cut.addTest("isEmptyArray() true", true, isEmptyArray([]) );
_cut.addTest("isEmptyArray() false 1", false, isEmptyArray([1,2,3]) );
_cut.addTest("isEmptyArray() false 2", false, isEmptyArray( document.querySelector("p") ) );
_cut.addTest("isArraylike() true 1", true, isArraylike([]) );
_cut.addTest("isArraylike() true 2", true, isArraylike( document.querySelectorAll("p") ) );
_cut.addTest("isArraylike() false", false, isArraylike( document.querySelector("p") ) );
_cut.addTest("isNull() true", true, isNull(null) );
_cut.addTest("isNull() false", false, isNull( document.querySelectorAll("p") ) );
_cut.addTest("isUndefined() true", true, isUndefined(undefined) );
_cut.addTest("isUndefined() false", false, isUndefined( document.querySelectorAll("p") ) );
_cut.addTest("isNullOrUndefined() true 1", true, isNullOrUndefined(undefined) );
_cut.addTest("isNullOrUndefined() true 2", true, isNullOrUndefined(null) );
_cut.addTest("isNullOrUndefined() false", false, isNullOrUndefined( document.querySelectorAll("p") ) );
_cut.addTest("isPrimitive() true 1", true, isPrimitive(98) );
_cut.addTest("isPrimitive() true 2", true, isPrimitive("str") );
_cut.addTest("isPrimitive() false 1", false, isPrimitive( document.querySelectorAll("p") ) );
_cut.addTest("isPrimitive() false 2", false, isPrimitive(noop) );
_cut.addTest("isDate() true", true, isDate(new Date()) );
_cut.addTest("isDate() false", false, isDate({}) );
_cut.addTest("isRegexp() true", true, isRegexp(/^\[object (.+)\]$/g) );
_cut.addTest("isRegexp() false", false, isRegexp("string") );
_cut.addTest("isElement() true 1", true, isElement(document.body) );
_cut.addTest("isElement() true 2", true, isElement(qs("div")) );
_cut.addTest("isElement() false 1", false, isElement(document.createTextNode("sample text")) );
_cut.addTest("isElement() false 2 ", false, isElement(document.createComment("sample comment")) );
_cut.addTest("isElement() false 3 ", false, isElement([]) );

_cut.addTest("isNumeric() true", true,
  isNumeric(-42) &&
  isNumeric(-1.42) &&
  isNumeric(-0.42) &&
  isNumeric(0) &&
  isNumeric(0.42) &&
  isNumeric(.42) &&
  isNumeric(1.42) &&
  isNumeric(42) &&
  isNumeric(8e5) &&
  isNumeric(-8e5) &&
  isNumeric(0x89f) &&
  isNumeric(-0x89f) &&
  isNumeric("-42") &&
  isNumeric("-1.42") &&
  isNumeric("-0.42") &&
  isNumeric("0") &&
  isNumeric("0.42") &&
  isNumeric(".42") &&
  isNumeric("1.42") &&
  isNumeric("42") &&
  isNumeric("8e5") &&
  isNumeric("-8e5") &&
  isNumeric("0x89f")
);

_cut.addTest("isNumeric() false", true,
  !isNumeric(null) &&
  !isNumeric(undefined) &&
  !isNumeric(NaN) &&
  !isNumeric("NaN") &&
  !isNumeric("1,42") &&
  !isNumeric("#foo") &&
  !isNumeric("1.2.3") &&
  !isNumeric("") &&
  !isNumeric("bar") &&
  !isNumeric(" ") &&
  !isNumeric("\r\n") &&
  !isNumeric("true") &&
  !isNumeric("false") &&
  !isNumeric("1<10") &&
  !isNumeric([]) &&
  !isNumeric({}) &&
  !isNumeric("-0x89f")
);


/* ES6 type checking */
if (_cut.isNotIE11()) {
  _cut.addElement("h3", "ES6 type checking");
  _cut.addTest("<b>ES6 -</b> isSymbol() true", true, isSymbol( Symbol("str") ) );
  _cut.addTest("<b>ES6 -</b> isSymbol() false", false, isSymbol(noop) );
  _cut.addTest("<b>ES6 -</b> isMap() true", true, isMap( new Map() ) );
  _cut.addTest("<b>ES6 -</b> isMap() false", false, isMap(noop) );
  _cut.addTest("<b>ES6 -</b> isSet() true", true, isSet( new Set() ) );
  _cut.addTest("<b>ES6 -</b> isSet() false", false, isSet(noop) );
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

getScript("unittest-gs1.js");
getScript("unittest-gs2.js");

var scripts=[
  { url: "unittest-gs1.js", success: function () {
  _cut.addTest("getScripts() (core api) with success gs1", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.addTest("getScripts() (core api) with success gs2", true, true);
  } }
];
getScripts(scripts);

scripts=[
  { url: "unittest-gs1.js", success: function () {
  _cut.addTest("getScripts() (core api) with error gs1", true, true);
  } },
  { url: "unittest-gs3.js", success: function () {
    _cut.addTest("getScripts() (core api) with error gs3", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.addTest("getScripts() (core api) with error gs2", true, true);
  } }
];
getScripts(scripts);

/* AJAX functions */

var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <span class=\"small\">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</span></p>\r\n<p><b>Nullam dictum felis eu pede mollis pretium.</b> Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. <small>Etiam ultricies nisi vel augue.</small></p>";

getJson("testdata.json",
  function (r) { _cut.addTest("getJson()", resAjaxJson, r[0].image );  }
);
getText("testdata.txt",
  function (r) { _cut.addTest("getText()", resAjaxText, r ); }
);

getAjax("testdata.txt","text",
  function (r) { _cut.addTest("getAjax() text", resAjaxText, r ); },
  function (e) { _cut.addTest("getAjax() text: "+JSON.stringify(e), true, false ); }
);
getAjax("testdata.json","json",
  function (r) { _cut.addTest("getAjax() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("getAjax() json: "+JSON.stringify(e), true, false ); }
);
getAjax("testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("getAjax() xml", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("getAjax() xml: "+JSON.stringify(e), true, false ); }
);

postAjax( "testdata.txt","a=foo&b=bar baz","text",
  function (r) { _cut.addTest("postAjax() text", resAjaxText, r );},
  function (e) { _cut.addTest("postAjax() text: "+JSON.stringify(e), true, false ); }
);
postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.addTest("postAjax() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("postAjax() json: "+JSON.stringify(e), true, false ); }
);
postAjax( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("postAjax() xml", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("postAjax() xml: "+JSON.stringify(e), true, false ); }
);

getCors( "testdata.txt","text",
  function (r) { _cut.addTest("getCors() text ", resAjaxText, r ); },
  function (e) { _cut.addTest("getCors() text: "+JSON.stringify(e), true, false ); }
);
getCors( "testdata.json","json",
  function (r) { _cut.addTest("getCors() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("getCors() json: "+JSON.stringify(e), true, false ); }
);
getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("getCors() xml", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("getCors() xml: "+JSON.stringify(e), true, false ); }
);

postCors( "testdata.txt","text","a=foo&amp;b=bar baz",
  function (r) {
    _cut.addTest("postCors() text", resAjaxText, r );
  },
  function (e) { _cut.addTest("postCors() text: "+JSON.stringify(e), true, false ); }
);
postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.addTest("postCors() json ", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("postCors() json: "+JSON.stringify(e), true, false ); }
);
postCors( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("postCors() xml", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("postCors() xml: "+JSON.stringify(e), true, false ); }
);

getAjax("testdata.txt","text",
  function (r) { _cut.addTest("getAjax() text + password", resAjaxText, r ); },
  function (e) { _cut.addTest("getAjax() text + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.addTest("postAjax() json + password", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("postAjax() json + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("getCors() xml + password", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("getCors() xml + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.addTest("postCors() json + password", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("postCors() json + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);

/* domReady() */
domReady(function () {
  //_cut.addElement("h3", "domReady (core api)");
  _cut.addTest("domReady() (core api) is working", true, true );
});
