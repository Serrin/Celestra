"use strict";

// Celestra 2.x testcases

/* _ct.addTest("step", true, expr ); */
/* _ct.addTest("step", true, expr, true ); */


/* Sample testcases */
_ct.addElement("h3", "Sample testcases");
_ct.addTest(
  "Array.from() passed true",
  true,
  isArray(Array.from(document.querySelectorAll("p")))
);
_ct.addTest(
  "Array.from() failed false",
  false,
  Array.from(toArray(document.querySelectorAll("p")))
);


/* Not tested functions */
_ct.addElement("h3", "Not tested functions");
_ct.addElement(
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
_ct.addElement("h3", "core api");

_ct.addElement(
  domCreate(
    "div",
    {"id": "qsaDivTestElement"},
    "#qsaDiv test element"
      + "<p id='qsaDivP1'>#qsaDivP1 test element</p>"
      + "<p id='qsaDivP2'>#qsaDivP2 test element</p>"
  )
);

_ct.addTest(
  "qs() selector",
  document.querySelector("#qsaDivTestElement"),
  qs("#qsaDivTestElement")
);

_ct.addTest(
  "qs() selector + selector",
  document.querySelector("#qsaDivP1"),
  qs("#qsaDivP1","#qsaDivTestElement")
);

_ct.addTest(
  "qs() selector + element",
  document.querySelector("#qsaDivP1"),
  qs("#qsaDivP1", document.querySelector("#qsaDivTestElement") )
);

var testQsa1 = qsa("#qsaDivTestElement > p")
_ct.addTest(
  "qsa() selector",
  true,
  Array.isArray(testQsa1) &&
    testQsa1.length === 2 &&
    testQsa1[0] === qs("#qsaDivP1") &&
    testQsa1[1] === qs("#qsaDivP2")
);

var testQsa2 = qsa("p", "#qsaDivTestElement")
_ct.addTest(
  "qsa() selector + selector",
  true,
  Array.isArray(testQsa2) &&
    testQsa2.length === 2 &&
    testQsa2[0] === qs("#qsaDivP1") &&
    testQsa2[1] === qs("#qsaDivP2")
);

var testQsa3 = qsa("p", document.querySelector("#qsaDivTestElement") )
_ct.addTest(
  "qsa() selector + element",
  true,
  Array.isArray(testQsa3) &&
    testQsa3.length === 2 &&
    testQsa3[0] === qs("#qsaDivP1") &&
    testQsa3[1] === qs("#qsaDivP2")
);

testQsa3.each(function (e) { e.innerHTML += " each"; });
_ct.addTest("qsa() each", true,
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
  testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);

_ct.addTest("getType() values",
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

_ct.addTest("getType() all true",
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

_ct.addTest("getType() all false",
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
_ct.addTest(
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
_ct.addTest(
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
_ct.addTest(
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
_ct.addTest(
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
_ct.addTest(
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

_ct.addTest(
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

_ct.addTest(
  "getUrlVarFromString()",
  "a1",
  getUrlVarFromString("?testa=a1&testb=b2")["testa"]
);
_ct.addTest(
  "getUrlVarFromString() prop",
  "b2",
  getUrlVarFromString("?testa=a1&testb=b2", "testb")
);

_ct.addElement(
  domCreate(
    "div",
    {"id": "testFormDiv"},
    " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
  )
);

_ct.addTest(
  "form2array()", '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify( form2array( qs("#form1") ) )
 );

_ct.addTest(
  "form2string()",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  form2string( qs("#form1") )
 );

 qs("#testFormDiv").remove();


/*
https://stackoverflow.com/questions/9454125/javascript-request-fullscreen-is-unreliable/9747340
Fullscreen API not testable with automation.

_ct.addElement(
  domCreate("p", {"id": "domFullscreenElement"}, "fullscreen test element")
);
var domFullscreenElement = qs("#domFullscreenElement");

setFullscreenOn(domFullscreenElement);
_ct.addTest(
  "getFullscreen() and setFullscreenOn(<element>) and setFullscreenOff",
  domFullscreenElement,
  getFullscreen()
);
alert(getFullscreen());
setFullscreenOff();

setFullscreenOn("#domFullscreenElement");
_ct.addTest(
  "getFullscreen() and setFullscreenOn(<selector>) and setFullscreenOff",
  domFullscreenElement,
  getFullscreen()
);
alert(getFullscreen());
setFullscreenOff();

setFullscreenOn(document);
_ct.addTest(
  "getFullscreen and setFullscreenOn(document) and setFullscreenOff",
  document,
  getFullscreen()
);

setFullscreenOff();
*/

/*
// getStyle() and getStyles()

_ct.addElement( domCreate("p", {"id": "csstest2"}, "#csstest2" ) );
var csstest2 = qs("#csstest2");

getStyle("testmodule1.css");
_ct.addTest("getStyle()", "bold", domGetCSS(csstest2, "font-weight") );

getStyle("testmodule1.css", function () {
  _ct.addTest("getStyle()", "bold", domGetCSS(csstest2, "font-weight") );
} );
*/

_ct.addTest("random()", true, random() <= 101 );
_ct.addTest("random(max)", true, random(30) <= 30 );
var testRandom = random(51,55);
_ct.addTest("random(min,max)", true, testRandom >= 51 && testRandom <= 55 );

_ct.addTest("getDoNotTrack()", true, getDoNotTrack() === true || getDoNotTrack() === false );
_ct.addTest("constant()", 3.14, constant(3.14)() );
_ct.addTest("identity()", 100, identity(60) + identity(40) );
_ct.addTest("noop()", undefined, noop() );

_ct.addTest(
  "removeTags()",
  "lorem ipsum dolor sit amet , consectetuer",
  removeTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

// _ct.addTest("version", true, version.includes("Celestra v") );


/* DOM */
/*
domFadeIn(<element>[,duration[,display]]);
domFadeOut(<element>[,duration]);
domFadeToggle(<element>[,duration[,display]]);
*/
_ct.addElement("h3", "DOM");

_ct.addElement(
  domCreate("p", {"id": "domTestElement", "width": "250px"}, "DOM test element")
);
var domTestElement = qs("#domTestElement") ;

_ct.addTest("domCreate() and qs (core api)", true, isElement(domTestElement) );

domSetCSS(domTestElement, "width", "300px");
_ct.addTest("domSetCSS() property and domGetCSS()", "300px", domGetCSS(domTestElement, "width") );

domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
_ct.addTest("domSetCSS() properties object and domGetCSS()",
  "350px",
  domGetCSS(domTestElement, "width")
);

domHide(domTestElement);
_ct.addTest("domHide()", "none", domGetCSS(domTestElement, "display") );

domShow(domTestElement);
_ct.addTest("domShow()", "block", domGetCSS(domTestElement, "display") );

domHide(domTestElement);
domShow(domTestElement, "inline-block");
_ct.addTest("domShow() inline-block", "inline-block", domGetCSS(domTestElement, "display") );

domToggle(domTestElement);
_ct.addTest("domToggle() hide", "none", domGetCSS(domTestElement, "display") );

domToggle(domTestElement);
_ct.addTest("domToggle() show", "block", domGetCSS(domTestElement, "display") );

domToggle(domTestElement, "inline-block");
_ct.addTest("domToggle() hide inline-block", "none", domGetCSS(domTestElement, "display") );

domToggle(domTestElement, "inline-block");
_ct.addTest("domHide() show inline-block", "inline-block", domGetCSS(domTestElement, "display") );

var domTestVar = 33;
function domTestElementClick1 () { domTestVar = 42; }
function domTestElementClick2 () { domTestVar = 56; }

domOn(domTestElement, "click", domTestElementClick1 );
domTrigger(domTestElement, "click");
_ct.addTest("domOn() and domTrigger()", 42, domTestVar );

domOff(domTestElement, "click", domTestElementClick1 );
domOn(domTestElement, "click", domTestElementClick2 );
domOff(domTestElement, "click", domTestElementClick2 );
domTrigger(domTestElement, "click");
_ct.addTest("domOff() and domTrigger()", 42, domTestVar );


/* FP */

_ct.addElement("h3", "FP");

var slice = toFunction([].slice);
_ct.addTest("toFunction()", true, Array.isArray(slice(document.querySelectorAll("h3"))) );

var dqsa = bind(document.querySelectorAll, document);
_ct.addTest("bind()", true, dqsa("h3").length > 0 );

var FPArray = [1,2,3];

var forEachStr = "";
forEach(FPArray, function (e) { forEachStr += (e*2); } );
_ct.addTest("forEach()", "246", forEachStr );

var eachStr = "";
each(FPArray, function (e) { eachStr += (e*2); } );
_ct.addTest("each()", "246", eachStr );

_ct.addTest("map()", 9, map(FPArray, function (e) {return e*3})[2] );

var FPObject = {a:2, b:3, c:4};

var forInStr = "";
forIn(FPObject, function (e) { forInStr += (e*2); } );
_ct.addTest("forIn()", "468", forInStr );

_ct.addTest("mapIn()", 9, mapIn(FPObject, function (e) { return (e*3); })["b"] );
_ct.addTest("toArray()", true, Array.isArray( toArray({0:1,1:2,2:3,length:3}) ) );
_ct.addTest("toObject()", true, isObject( toArray({0:1,1:2,2:3,length:3}) ) );
_ct.addTest("hasOwn() true", true, hasOwn( {0:1,1:2,2:3,length:3}, "length" ) );
_ct.addTest("hasOwn() false", false, hasOwn( FPArray, "forEach" ) );


/* cookie */
_ct.addElement("h3", "cookie");

setCookie("ctest3", "cookieUnitTestStr");
_ct.addTest("hasCookie() true", true, hasCookie("ctest3") );
_ct.addTest("getCookie(name) value", "cookieUnitTestStr", getCookie("ctest3") );
_ct.addTest("getCookie()", "cookieUnitTestStr", getCookie()["ctest3"] );
_ct.addTest("removeCookie() true", true, removeCookie("ctest3") );
_ct.addTest("removeCookie() false", false, removeCookie("ctest3") );
_ct.addTest("hasCookie() false", false, hasCookie("ctest3") );
_ct.addTest("getCookie(name) null", null, getCookie("ctest3") );
_ct.addTest("getCookie() undefined", undefined, getCookie()["ctest3"] );


/* polyfills */
_ct.addElement("h3", "polyfills");

_ct.addTest("Array.from()", 3, Array.from({0:1,1:2,2:3,length:3})[2] );
_ct.addTest("Array.from() with mapFN",
  6,
  Array.from({0:1,1:2,2:3,length:3}, function (e) { return e*3; })[1]
);
_ct.addTest("Array.of()", 4, Array.of(2,4,6)[1] );
_ct.addTest("Object.create()", 1, Object.create({ a: 1, b: 2 }).a );
_ct.addTest("Object.assign()", 3, Object.assign({ a: 1}, {b: 2}, {c: 3}).c );
var testArrayFI = [66, 7, 135, 75, 190, 89];
_ct.addTest("Array.prototype.find() true",
  135,
  testArrayFI.find(function (e) { return e > 100; })
);
_ct.addTest("Array.prototype.find() false",
  undefined,
  testArrayFI.find(function (e) { return e > 200; })
);
_ct.addTest("Array.prototype.findIndex() true",
  2,
  testArrayFI.findIndex(function (e) { return e > 100; })
);
_ct.addTest("Array.prototype.findIndex() false",
  -1,
  testArrayFI.findIndex(function (e) { return e > 200; })
);
_ct.addTest("Array.prototype.includes() true", true, testArrayFI.includes(190) );
_ct.addTest("Array.prototype.includes() false", false, testArrayFI.includes(195) );
_ct.addTest("String.prototype.includes() true", true, "lorem ipsum".includes("ipsum") );
_ct.addTest("String.prototype.includes() false", false, "lorem ipsum".includes("erdei") );

_ct.addElement( domCreate("div", {"id": "testDivNode"}, "#testDivNode") );
var testDivNode = qs("#testDivNode");
testDivNode.append( domCreate("p", {"id": "testNodeP1"}, "testNodeP1") );
testDivNode.append( domCreate("p", {"id": "testNodeP2"}, "testNodeP2") );

var dqsaList = document.querySelectorAll("#testDivNode > p")
dqsaList.forEach( function (e) { e.style["color"] = "blue"; } );
_ct.addTest("NodeList.prototype.forEach()", true,
  dqsaList[0].style["color"] === "blue" &&
  dqsaList[1].style["color"] === "blue"
);

var testNodeP1 = qs("#testNodeP1");
var testNodeP2 = qs("#testNodeP2");

testNodeP1.after("after text");
_ct.addTest("ChildNode.after() text", true, testDivNode.innerHTML.includes("after text") )
testNodeP1.after( domCreate("b", {}, "after element") );
_ct.addTest("ChildNode.after() element", true, testDivNode.innerHTML.includes("after element") );

testNodeP1.before("before text");
_ct.addTest("ChildNode.before() text", true, testDivNode.innerHTML.includes("before text") )
testNodeP1.before( domCreate("b", {}, "before element") );
_ct.addTest("ChildNode.before() element", true, testDivNode.innerHTML.includes("before element") );

testNodeP1.append("append text");
_ct.addTest("ParentNode.append() text", true, testDivNode.innerHTML.includes("append text") )
testNodeP1.append( domCreate("b", {}, "append element") );
_ct.addTest("ParentNode.append() element", true, testDivNode.innerHTML.includes("append element") );

testNodeP1.prepend("prepend text");
_ct.addTest("ParentNode.prepend() text", true, testDivNode.innerHTML.includes("prepend text") )
testNodeP1.prepend( domCreate("b", {}, "prepend element") );
_ct.addTest("ParentNode.prepend() element", true, testDivNode.innerHTML.includes("prepend element") );

testNodeP1.replaceWith("testElement");
_ct.addTest("ChildNode.replaceWith() text", null, qs("#testNodeP1") );

testNodeP2.replaceWith( domCreate("p", {}, "testElement") );
_ct.addTest("ChildNode.replaceWith() element", null, qs("#testNodeP2") );

testDivNode.remove();
_ct.addTest("ChildNode.remove()", null, qs("#testDivNode") );


/* Number ES6 */
_ct.addElement("h3", "Number ES6");

_ct.addTest("Number.MIN_SAFE_INTEGER", -9007199254740991, Number.MIN_SAFE_INTEGER  );
_ct.addTest("Number.MAX_SAFE_INTEGER", 9007199254740991, Number.MAX_SAFE_INTEGER );
_ct.addTest("Number.EPSILON", Math.pow(2, -52), Number.EPSILON );
_ct.addTest("Number.isNaN()",
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
_ct.addTest("isNaN()",
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
_ct.addTest("Number.isInteger()",
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
_ct.addTest("Number.isFinite()",
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
_ct.addTest("Number.isSafeInteger()",
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
_ct.addElement("h3", "type checking");

_ct.addTest("isString() true", true, isString("str") );
_ct.addTest("isString() false", false, isString(533) );
_ct.addTest("isChar() true", true, isChar("s") );
_ct.addTest("isChar() false 1", false, isChar("str") );
_ct.addTest("isChar() false 2", false, isChar(533) );
_ct.addTest("isNumber() true 1", true, isNumber(98) );
_ct.addTest("isNumber() true 2", true, isNumber(3.14) );
_ct.addTest("isNumber() false", false, isNumber("str") );
_ct.addTest("isInteger() true", true, isInteger(98) );
_ct.addTest("isInteger() false 1", false, isInteger(3.14) );
_ct.addTest("isInteger() false 2", false, isInteger("str") );
_ct.addTest("isFloat() true", true, isFloat(3.14) );
_ct.addTest("isFloat() false 1", false, isFloat(98) );
_ct.addTest("isFloat() false 2", false, isFloat("str") );
_ct.addTest("isBoolean() true", true, isBoolean(false) );
_ct.addTest("isBoolean() false", false, isBoolean(98) );
_ct.addTest("isObject() true", true, isObject({}) );
_ct.addTest("isObject() false ", false, isObject(98) );
_ct.addTest("isEmptyObject() true", true, isEmptyObject({}) );
_ct.addTest("isEmptyObject() false 1", false, isEmptyObject( document.querySelector("p") ) );
_ct.addTest("isEmptyObject() false 2", false, isEmptyObject(98) );
_ct.addTest("isFunction() true", true, isFunction(noop) );
_ct.addTest("isFunction() false", false, isFunction( document.querySelector("p") ) );
_ct.addTest("isArray() false", false, isArray( document.querySelector("p") ) );
_ct.addTest("isEmptyArray() true", true, isEmptyArray([]) );
_ct.addTest("isEmptyArray() false 1", false, isEmptyArray([1,2,3]) );
_ct.addTest("isEmptyArray() false 2", false, isEmptyArray( document.querySelector("p") ) );
_ct.addTest("isArraylike() true 1", true, isArraylike([]) );
_ct.addTest("isArraylike() true 2", true, isArraylike( document.querySelectorAll("p") ) );
_ct.addTest("isArraylike() false", false, isArraylike( document.querySelector("p") ) );
_ct.addTest("isNull() true", true, isNull(null) );
_ct.addTest("isNull() false", false, isNull( document.querySelectorAll("p") ) );
_ct.addTest("isUndefined() true", true, isUndefined(undefined) );
_ct.addTest("isUndefined() false", false, isUndefined( document.querySelectorAll("p") ) );
_ct.addTest("isNullOrUndefined() true 1", true, isNullOrUndefined(undefined) );
_ct.addTest("isNullOrUndefined() true 2", true, isNullOrUndefined(null) );
_ct.addTest("isNullOrUndefined() false", false, isNullOrUndefined( document.querySelectorAll("p") ) );
_ct.addTest("isPrimitive() true 1", true, isPrimitive(98) );
_ct.addTest("isPrimitive() true 2", true, isPrimitive("str") );
_ct.addTest("isPrimitive() false 1", false, isPrimitive( document.querySelectorAll("p") ) );
_ct.addTest("isPrimitive() false 2", false, isPrimitive(noop) );
_ct.addTest("isDate() true", true, isDate(new Date()) );
_ct.addTest("isDate() false", false, isDate({}) );
_ct.addTest("isRegexp() true", true, isRegexp(/^\[object (.+)\]$/g) );
_ct.addTest("isRegexp() false", false, isRegexp("string") );
_ct.addTest("isElement() true 1", true, isElement(document.body) );
_ct.addTest("isElement() true 2", true, isElement(qs("div")) );
_ct.addTest("isElement() false 1", false, isElement(document.createTextNode("sample text")) );
_ct.addTest("isElement() false 2 ", false, isElement(document.createComment("sample comment")) );
_ct.addTest("isElement() false 3 ", false, isElement([]) );

_ct.addTest("isNumeric() true", true,
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

_ct.addTest("isNumeric() false", true,
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
if (_ct.isNotIE11()) {
  _ct.addElement("h3", "ES6 type checking");
  _ct.addTest("<b>ES6 -</b> isSymbol() true", true, isSymbol( Symbol("str") ) );
  _ct.addTest("<b>ES6 -</b> isSymbol() false", false, isSymbol(noop) );
  _ct.addTest("<b>ES6 -</b> isMap() true", true, isMap( new Map() ) );
  _ct.addTest("<b>ES6 -</b> isMap() false", false, isMap(noop) );
  _ct.addTest("<b>ES6 -</b> isSet() true", true, isSet( new Set() ) );
  _ct.addTest("<b>ES6 -</b> isSet() false", false, isSet(noop) );
}


/* AJAX, domReady() and other callbacks */
_ct.addElement("h3", "AJAX, domReady() and other callbacks");

/* getScript() and getScripts() */
_ct.addElement("p", "Here have to be these results:");
_ct.addElement(
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
  _ct.addTest("getScripts() (core api) with success gs1", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _ct.addTest("getScripts() (core api) with success gs2", true, true);
  } }
];
getScripts(scripts);

scripts=[
  { url: "unittest-gs1.js", success: function () {
  _ct.addTest("getScripts() (core api) with error gs1", true, true);
  } },
  { url: "unittest-gs3.js", success: function () {
    _ct.addTest("getScripts() (core api) with error gs3", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _ct.addTest("getScripts() (core api) with error gs2", true, true);
  } }
];
getScripts(scripts);

/* AJAX functions */

var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <span class=\"small\">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</span></p>\r\n<p><b>Nullam dictum felis eu pede mollis pretium.</b> Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. <small>Etiam ultricies nisi vel augue.</small></p>";

getJson("testdata.json",
  function (r) { _ct.addTest("getJson()", resAjaxJson, r[0].image );  }
);
getText("testdata.txt",
  function (r) { _ct.addTest("getText()", resAjaxText, r ); }
);

getAjax("testdata.txt","text",
  function (r) { _ct.addTest("getAjax() text", resAjaxText, r ); },
  function (e) { alert( JSON.stringify(e) ); }
);
getAjax("testdata.json","json",
  function (r) { _ct.addTest("getAjax() json", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); }
);
getAjax("testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("getAjax() xml", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); }
);

postAjax( "testdata.txt","a=foo&b=bar baz","text",
  function (r) { _ct.addTest("postAjax() text", resAjaxText, r );},
  function (e) { alert( JSON.stringify(e) ); }
);
postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _ct.addTest("postAjax() json", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); }
);
postAjax( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("postAjax() xml", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); }
);

getCors( "testdata.txt","text",
  function (r) { _ct.addTest("getCors() text ", resAjaxText, r ); },
  function (e) { alert( JSON.stringify(e) ); }
);
getCors( "testdata.json","json",
  function (r) { _ct.addTest("getCors() json", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); }
);
getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("getCors() xml", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); }
);

postCors( "testdata.txt","text","a=foo&amp;b=bar baz",
  function (r) {
     _ct.addTest("postCors() text", resAjaxText, r );
    },
    function (e) { alert( JSON.stringify(e) ); }
);
postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _ct.addTest("postCors() json ", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); }
);
postCors( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("postCors() xml", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); }
);

getAjax("testdata.txt","text",
  function (r) { _ct.addTest("getAjax() text + password", resAjaxText, r ); },
  function (e) { alert( JSON.stringify(e) ); },"user","password"
);
postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _ct.addTest("postAjax() json + password", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); },
  "user",
  "password"
);
getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("getCors() xml + password", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); },
  "user",
  "password"
);
postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _ct.addTest("postCors() json + password", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); },"user","password"
);

/* domReady() */
domReady(function () {
  //_ct.addElement("h3", "domReady (core api)");
  _ct.addTest("domReady() (core api) is working", true, true );
});
