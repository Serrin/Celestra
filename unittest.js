"use strict";

// Celestra 2.x testcases

/* _ct.addTest("step", true, expr ); */
/* _ct.addTest("step", true, expr, true ); */


/* Sample testcases */
_ct.addElement("h3", "Sample testcases");
_ct.addTest(
  "Array.from() passed true",
  true,
  _.isArray(Array.from(document.querySelectorAll("p")))
);
_ct.addTest(
  "Array.from() failed false",
  false,
  Array.from(_.toArray(document.querySelectorAll("p")))
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
  _.domCreate(
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
  _.qs("#qsaDivTestElement")
);

_ct.addTest(
  "qs() selector + selector",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1","#qsaDivTestElement")
);

_ct.addTest(
  "qs() selector + element",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1", document.querySelector("#qsaDivTestElement") )
);

var testQsa1 = _.qsa("#qsaDivTestElement > p")
_ct.addTest(
  "qsa() selector",
  true,
  Array.isArray(testQsa1) &&
    testQsa1.length === 2 &&
    testQsa1[0] === _.qs("#qsaDivP1") &&
    testQsa1[1] === _.qs("#qsaDivP2")
);

var testQsa2 = _.qsa("p", "#qsaDivTestElement")
_ct.addTest(
  "qsa() selector + selector",
  true,
  Array.isArray(testQsa2) &&
    testQsa2.length === 2 &&
    testQsa2[0] === _.qs("#qsaDivP1") &&
    testQsa2[1] === _.qs("#qsaDivP2")
);

var testQsa3 = _.qsa("p", document.querySelector("#qsaDivTestElement") )
_ct.addTest(
  "qsa() selector + element",
  true,
  Array.isArray(testQsa3) &&
    testQsa3.length === 2 &&
    testQsa3[0] === _.qs("#qsaDivP1") &&
    testQsa3[1] === _.qs("#qsaDivP2")
);

testQsa3.each(function (e) { e.innerHTML += " each"; });
_ct.addTest("qsa() each", true,
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
  testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);

_ct.addTest("getType() values",
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

_ct.addTest("getType() all true",
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

_ct.addTest("getType() all false",
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

var extObj1 = _.extend(false,{},foo1,bar1);
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

var extObj1 = _.extend({},foo1,bar1);
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

var extObj1 = _.deepAssign({},foo1,bar1);
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
  _.getUrlVarFromString("?testa=a1&testb=b2")["testa"]
);
_ct.addTest(
  "getUrlVarFromString() prop",
  "b2",
  _.getUrlVarFromString("?testa=a1&testb=b2", "testb")
);

_ct.addElement(
  _.domCreate(
    "div",
    {"id": "testFormDiv"},
    " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
  )
);

_ct.addTest(
  "form2array()", '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify( _.form2array( _.qs("#form1") ) )
 );

_ct.addTest(
  "form2string()",
  "name=foo+%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD&password=bar&number=97&radio=male&animals=dog&animals-multiple=dog&animals-multiple=hippos&checkbox1=true&textarea1=textarea1",
  _.form2string( _.qs("#form1") )
 );

 _.qs("#testFormDiv").remove();


/*
https://stackoverflow.com/questions/9454125/javascript-request-fullscreen-is-unreliable/9747340
Fullscreen API not testable with automation.

_ct.addElement(
  _.domCreate("p", {"id": "domFullscreenElement"}, "fullscreen test element")
);
var domFullscreenElement = _.qs("#domFullscreenElement");

_.setFullscreenOn(domFullscreenElement);
_ct.addTest(
  "getFullscreen() and setFullscreenOn(<element>) and setFullscreenOff",
  domFullscreenElement,
  _.getFullscreen()
);
alert(_.getFullscreen());
_.setFullscreenOff();

_.setFullscreenOn("#domFullscreenElement");
_ct.addTest(
  "getFullscreen() and setFullscreenOn(<selector>) and setFullscreenOff",
  domFullscreenElement,
  _.getFullscreen()
);
alert(_.getFullscreen());
_.setFullscreenOff();

_.setFullscreenOn(document);
_ct.addTest(
  "getFullscreen and setFullscreenOn(document) and setFullscreenOff",
  document,
  _.getFullscreen()
);

_.setFullscreenOff();
*/

/*
// getStyle() and getStyles()

_ct.addElement( _.domCreate("p", {"id": "csstest2"}, "#csstest2" ) );
var csstest2 = _.qs("#csstest2");

_.getStyle("testmodule1.css");
_ct.addTest("getStyle()", "bold", _.domGetCSS(csstest2, "font-weight") );

_.getStyle("testmodule1.css", function () {
  _ct.addTest("getStyle()", "bold", _.domGetCSS(csstest2, "font-weight") );
} );
*/

_ct.addTest("random()", true, _.random() <= 101 );
_ct.addTest("random(max)", true, _.random(30) <= 30 );
var testRandom = _.random(51,55);
_ct.addTest("random(min,max)", true, testRandom >= 51 && testRandom <= 55 );

_ct.addTest("getDoNotTrack()", true, _.getDoNotTrack() === true || _.getDoNotTrack() === false );
_ct.addTest("constant()", 3.14, _.constant(3.14)() );
_ct.addTest("identity()", 100, _.identity(60) + _.identity(40) );
_ct.addTest("noop()", undefined, _.noop() );

_ct.addTest(
  "removeTags()",
  "lorem ipsum dolor sit amet , consectetuer",
  _.removeTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

_ct.addTest("version", true, _.version.includes("Celestra v") );


/* DOM */
/*
domFadeIn(<element>[,duration[,display]]);
domFadeOut(<element>[,duration]);
domFadeToggle(<element>[,duration[,display]]);
*/
_ct.addElement("h3", "DOM");

_ct.addElement(
  _.domCreate("p", {"id": "domTestElement", "width": "250px"}, "DOM test element")
);
var domTestElement = _.qs("#domTestElement") ;

_ct.addTest("domCreate() and qs (core api)", true, _.isElement(domTestElement) );

_.domSetCSS(domTestElement, "width", "300px");
_ct.addTest("domSetCSS() property and domGetCSS()", "300px", _.domGetCSS(domTestElement, "width") );

_.domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
_ct.addTest("domSetCSS() properties object and domGetCSS()",
  "350px",
  _.domGetCSS(domTestElement, "width")
);

_.domHide(domTestElement);
_ct.addTest("domHide()", "none", _.domGetCSS(domTestElement, "display") );

_.domShow(domTestElement);
_ct.addTest("domShow()", "block", _.domGetCSS(domTestElement, "display") );

_.domHide(domTestElement);
_.domShow(domTestElement, "inline-block");
_ct.addTest("domShow() inline-block", "inline-block", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement);
_ct.addTest("domToggle() hide", "none", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement);
_ct.addTest("domToggle() show", "block", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement, "inline-block");
_ct.addTest("domToggle() hide inline-block", "none", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement, "inline-block");
_ct.addTest("domHide() show inline-block", "inline-block", _.domGetCSS(domTestElement, "display") );

var domTestVar = 33;
function domTestElementClick1 () { domTestVar = 42; }
function domTestElementClick2 () { domTestVar = 56; }

_.domOn(domTestElement, "click", domTestElementClick1 );
_.domTrigger(domTestElement, "click");
_ct.addTest("domOn() and domTrigger()", 42, domTestVar );

_.domOff(domTestElement, "click", domTestElementClick1 );
_.domOn(domTestElement, "click", domTestElementClick2 );
_.domOff(domTestElement, "click", domTestElementClick2 );
_.domTrigger(domTestElement, "click");
_ct.addTest("domOff() and domTrigger()", 42, domTestVar );


/* FP */

_ct.addElement("h3", "FP");

var slice = _.toFunction([].slice);
_ct.addTest("toFunction()", true, Array.isArray(slice(document.querySelectorAll("h3"))) );

var dqsa = _.bind(document.querySelectorAll, document);
_ct.addTest("bind()", true, dqsa("h3").length > 0 );

var FPArray = [1,2,3];

var forEachStr = "";
_.forEach(FPArray, function (e) { forEachStr += (e*2); } );
_ct.addTest("forEach()", "246", forEachStr );

var eachStr = "";
_.each(FPArray, function (e) { eachStr += (e*2); } );
_ct.addTest("each()", "246", eachStr );

_ct.addTest("map()", 9, _.map(FPArray, function (e) {return e*3})[2] );

var FPObject = {a:2, b:3, c:4};

var forInStr = "";
_.forIn(FPObject, function (e) { forInStr += (e*2); } );
_ct.addTest("forIn()", "468", forInStr );

_ct.addTest("mapIn()", 9, _.mapIn(FPObject, function (e) { return (e*3); })["b"] );
_ct.addTest("toArray()", true, Array.isArray( _.toArray({0:1,1:2,2:3,length:3}) ) );
_ct.addTest("toObject()", true, _.isObject( _.toArray({0:1,1:2,2:3,length:3}) ) );
_ct.addTest("hasOwn() true", true, _.hasOwn( {0:1,1:2,2:3,length:3}, "length" ) );
_ct.addTest("hasOwn() false", false, _.hasOwn( FPArray, "forEach" ) );


/* cookie */
_ct.addElement("h3", "cookie");

_.setCookie("ctest3", "cookieUnitTestStr");
_ct.addTest("hasCookie() true", true, _.hasCookie("ctest3") );
_ct.addTest("getCookie(name) value", "cookieUnitTestStr", _.getCookie("ctest3") );
_ct.addTest("getCookie()", "cookieUnitTestStr", _.getCookie()["ctest3"] );
_ct.addTest("removeCookie() true", true, _.removeCookie("ctest3") );
_ct.addTest("removeCookie() false", false, _.removeCookie("ctest3") );
_ct.addTest("hasCookie() false", false, _.hasCookie("ctest3") );
_ct.addTest("getCookie(name) null", null, _.getCookie("ctest3") );
_ct.addTest("getCookie() undefined", undefined, _.getCookie()["ctest3"] );


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

_ct.addElement( _.domCreate("div", {"id": "testDivNode"}, "#testDivNode") );
var testDivNode = _.qs("#testDivNode");
testDivNode.append( _.domCreate("p", {"id": "testNodeP1"}, "testNodeP1") );
testDivNode.append( _.domCreate("p", {"id": "testNodeP2"}, "testNodeP2") );

var dqsaList = document.querySelectorAll("#testDivNode > p")
dqsaList.forEach( function (e) { e.style["color"] = "blue"; } );
_ct.addTest("NodeList.prototype.forEach()", true,
  dqsaList[0].style["color"] === "blue" &&
  dqsaList[1].style["color"] === "blue"
);

var testNodeP1 = _.qs("#testNodeP1");
var testNodeP2 = _.qs("#testNodeP2");

testNodeP1.after("after text");
_ct.addTest("ChildNode.after() text", true, testDivNode.innerHTML.includes("after text") )
testNodeP1.after( _.domCreate("b", {}, "after element") );
_ct.addTest("ChildNode.after() element", true, testDivNode.innerHTML.includes("after element") );

testNodeP1.before("before text");
_ct.addTest("ChildNode.before() text", true, testDivNode.innerHTML.includes("before text") )
testNodeP1.before( _.domCreate("b", {}, "before element") );
_ct.addTest("ChildNode.before() element", true, testDivNode.innerHTML.includes("before element") );

testNodeP1.append("append text");
_ct.addTest("ParentNode.append() text", true, testDivNode.innerHTML.includes("append text") )
testNodeP1.append( _.domCreate("b", {}, "append element") );
_ct.addTest("ParentNode.append() element", true, testDivNode.innerHTML.includes("append element") );

testNodeP1.prepend("prepend text");
_ct.addTest("ParentNode.prepend() text", true, testDivNode.innerHTML.includes("prepend text") )
testNodeP1.prepend( _.domCreate("b", {}, "prepend element") );
_ct.addTest("ParentNode.prepend() element", true, testDivNode.innerHTML.includes("prepend element") );

testNodeP1.replaceWith("testElement");
_ct.addTest("ChildNode.replaceWith() text", null, _.qs("#testNodeP1") );

testNodeP2.replaceWith( _.domCreate("p", {}, "testElement") );
_ct.addTest("ChildNode.replaceWith() element", null, _.qs("#testNodeP2") );

testDivNode.remove();
_ct.addTest("ChildNode.remove()", null, _.qs("#testDivNode") );


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

_ct.addTest("isString() true", true, _.isString("str") );
_ct.addTest("isString() false", false, _.isString(533) );
_ct.addTest("isChar() true", true, _.isChar("s") );
_ct.addTest("isChar() false 1", false, _.isChar("str") );
_ct.addTest("isChar() false 2", false, _.isChar(533) );
_ct.addTest("isNumber() true 1", true, _.isNumber(98) );
_ct.addTest("isNumber() true 2", true, _.isNumber(3.14) );
_ct.addTest("isNumber() false", false, _.isNumber("str") );
_ct.addTest("isInteger() true", true, _.isInteger(98) );
_ct.addTest("isInteger() false 1", false, _.isInteger(3.14) );
_ct.addTest("isInteger() false 2", false, _.isInteger("str") );
_ct.addTest("isFloat() true", true, _.isFloat(3.14) );
_ct.addTest("isFloat() false 1", false, _.isFloat(98) );
_ct.addTest("isFloat() false 2", false, _.isFloat("str") );
_ct.addTest("isBoolean() true", true, _.isBoolean(false) );
_ct.addTest("isBoolean() false", false, _.isBoolean(98) );
_ct.addTest("isObject() true", true, _.isObject({}) );
_ct.addTest("isObject() false ", false, _.isObject(98) );
_ct.addTest("isEmptyObject() true", true, _.isEmptyObject({}) );
_ct.addTest("isEmptyObject() false 1", false, _.isEmptyObject( document.querySelector("p") ) );
_ct.addTest("isEmptyObject() false 2", false, _.isEmptyObject(98) );
_ct.addTest("isFunction() true", true, _.isFunction(_.noop) );
_ct.addTest("isFunction() false", false, _.isFunction( document.querySelector("p") ) );
_ct.addTest("isArray() false", false, _.isArray( document.querySelector("p") ) );
_ct.addTest("isEmptyArray() true", true, _.isEmptyArray([]) );
_ct.addTest("isEmptyArray() false 1", false, _.isEmptyArray([1,2,3]) );
_ct.addTest("isEmptyArray() false 2", false, _.isEmptyArray( document.querySelector("p") ) );
_ct.addTest("isArraylike() true 1", true, _.isArraylike([]) );
_ct.addTest("isArraylike() true 2", true, _.isArraylike( document.querySelectorAll("p") ) );
_ct.addTest("isArraylike() false", false, _.isArraylike( document.querySelector("p") ) );
_ct.addTest("isNull() true", true, _.isNull(null) );
_ct.addTest("isNull() false", false, _.isNull( document.querySelectorAll("p") ) );
_ct.addTest("isUndefined() true", true, _.isUndefined(undefined) );
_ct.addTest("isUndefined() false", false, _.isUndefined( document.querySelectorAll("p") ) );
_ct.addTest("isNullOrUndefined() true 1", true, _.isNullOrUndefined(undefined) );
_ct.addTest("isNullOrUndefined() true 2", true, _.isNullOrUndefined(null) );
_ct.addTest("isNullOrUndefined() false", false, _.isNullOrUndefined( document.querySelectorAll("p") ) );
_ct.addTest("isPrimitive() true 1", true, _.isPrimitive(98) );
_ct.addTest("isPrimitive() true 2", true, _.isPrimitive("str") );
_ct.addTest("isPrimitive() false 1", false, _.isPrimitive( document.querySelectorAll("p") ) );
_ct.addTest("isPrimitive() false 2", false, _.isPrimitive(_.noop) );
_ct.addTest("isDate() true", true, _.isDate(new Date()) );
_ct.addTest("isDate() false", false, _.isDate({}) );
_ct.addTest("isRegexp() true", true, _.isRegexp(/^\[object (.+)\]$/g) );
_ct.addTest("isRegexp() false", false, _.isRegexp("string") );
_ct.addTest("isElement() true 1", true, _.isElement(document.body) );
_ct.addTest("isElement() true 2", true, _.isElement(_.qs("div")) );
_ct.addTest("isElement() false 1", false, _.isElement(document.createTextNode("sample text")) );
_ct.addTest("isElement() false 2 ", false, _.isElement(document.createComment("sample comment")) );
_ct.addTest("isElement() false 3 ", false, _.isElement([]) );

_ct.addTest("isNumeric() true", true,
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

_ct.addTest("isNumeric() false", true,
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
if (_ct.isNotIE11()) {
  _ct.addElement("h3", "ES6 type checking");
  _ct.addTest("<b>ES6 -</b> isSymbol() true", true, _.isSymbol( Symbol("str") ) );
  _ct.addTest("<b>ES6 -</b> isSymbol() false", false, _.isSymbol(_.noop) );
  _ct.addTest("<b>ES6 -</b> isMap() true", true, _.isMap( new Map() ) );
  _ct.addTest("<b>ES6 -</b> isMap() false", false, _.isMap(_.noop) );
  _ct.addTest("<b>ES6 -</b> isSet() true", true, _.isSet( new Set() ) );
  _ct.addTest("<b>ES6 -</b> isSet() false", false, _.isSet(_.noop) );
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

_.getScript("unittest-gs1.js");
_.getScript("unittest-gs2.js");

var scripts=[
  { url: "unittest-gs1.js", success: function () {
  _ct.addTest("getScripts() (core api) with success gs1", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _ct.addTest("getScripts() (core api) with success gs2", true, true);
  } }
];
_.getScripts(scripts);

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
_.getScripts(scripts);

/* AJAX functions */

var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <span class=\"small\">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</span></p>\r\n<p><b>Nullam dictum felis eu pede mollis pretium.</b> Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. <small>Etiam ultricies nisi vel augue.</small></p>";

_.getJson("testdata.json",
  function (r) { _ct.addTest("getJson()", resAjaxJson, r[0].image );  }
);
_.getText("testdata.txt",
  function (r) { _ct.addTest("getText()", resAjaxText, r ); }
);

_.getAjax("testdata.txt","text",
  function (r) { _ct.addTest("getAjax() text", resAjaxText, r ); },
  function (e) { alert( JSON.stringify(e) ); }
);
_.getAjax("testdata.json","json",
  function (r) { _ct.addTest("getAjax() json", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); }
);
_.getAjax("testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("getAjax() xml", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); }
);

_.postAjax( "testdata.txt","a=foo&b=bar baz","text",
  function (r) { _ct.addTest("postAjax() text", resAjaxText, r );},
  function (e) { alert( JSON.stringify(e) ); }
);
_.postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _ct.addTest("postAjax() json", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); }
);
_.postAjax( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("postAjax() xml", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); }
);

_.getCors( "testdata.txt","text",
  function (r) { _ct.addTest("getCors() text ", resAjaxText, r ); },
  function (e) { alert( JSON.stringify(e) ); }
);
_.getCors( "testdata.json","json",
  function (r) { _ct.addTest("getCors() json", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); }
);
_.getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("getCors() xml", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); }
);

_.postCors( "testdata.txt","text","a=foo&amp;b=bar baz",
  function (r) {
     _ct.addTest("postCors() text", resAjaxText, r );
    },
    function (e) { alert( JSON.stringify(e) ); }
);
_.postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _ct.addTest("postCors() json ", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); }
);
_.postCors( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("postCors() xml", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); }
);

_.getAjax("testdata.txt","text",
  function (r) { _ct.addTest("getAjax() text + password", resAjaxText, r ); },
  function (e) { alert( JSON.stringify(e) ); },"user","password"
);
_.postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _ct.addTest("postAjax() json + password", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); },
  "user",
  "password"
);
_.getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _ct.addTest("getCors() xml + password", resAjaxXml, xb );
  },
  function (e) { alert( JSON.stringify(e) ); },
  "user",
  "password"
);
_.postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _ct.addTest("postCors() json + password", resAjaxJson, r[0].image ); },
  function (e) { alert( JSON.stringify(e) ); },"user","password"
);

/* domReady() */
_.domReady(function () {
  //_ct.addElement("h3", "domReady (core api)");
  _ct.addTest("domReady() (core api) is working", true, true );
});
