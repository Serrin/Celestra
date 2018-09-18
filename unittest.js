"use strict";

// Celestra 2.x testcases

/* _cut.addTest("step", true, expr ); */
/* _cut.addTest("step", true, expr, true ); */


/* Sample testcases */
_cut.addElement("h3", "Sample testcases");
_cut.addTest(
  "Array.from() passed true",
  true,
  _.isArray(Array.from(document.querySelectorAll("p")))
);
_cut.addTest(
  "Array.from() failed false",
  false,
  Array.from(_.toArray(document.querySelectorAll("p")))
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
_cut.addElement("h3", "object names");

_cut.addTest("Object name: \"celestra\"", true, celestra.random(100,200)>99 );
_cut.addTest("Object name: \"Celestra\"", true, Celestra.random(100,200)>99 );
_cut.addTest("Object name: \"_\"", true, _.random(100,200)>99 );


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

_cut.addTest(
  "qs() selector",
  document.querySelector("#qsaDivTestElement"),
  _.qs("#qsaDivTestElement")
);

_cut.addTest(
  "qs() selector + selector",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1","#qsaDivTestElement")
);

_cut.addTest(
  "qs() selector + element",
  document.querySelector("#qsaDivP1"),
  _.qs("#qsaDivP1", document.querySelector("#qsaDivTestElement") )
);

var testQsa1 = _.qsa("#qsaDivTestElement > p")
_cut.addTest(
  "qsa() selector",
  true,
  Array.isArray(testQsa1) &&
    testQsa1.length === 2 &&
    testQsa1[0] === _.qs("#qsaDivP1") &&
    testQsa1[1] === _.qs("#qsaDivP2")
);

var testQsa2 = _.qsa("p", "#qsaDivTestElement")
_cut.addTest(
  "qsa() selector + selector",
  true,
  Array.isArray(testQsa2) &&
    testQsa2.length === 2 &&
    testQsa2[0] === _.qs("#qsaDivP1") &&
    testQsa2[1] === _.qs("#qsaDivP2")
);

var testQsa3 = _.qsa("p", document.querySelector("#qsaDivTestElement") )
_cut.addTest(
  "qsa() selector + element",
  true,
  Array.isArray(testQsa3) &&
    testQsa3.length === 2 &&
    testQsa3[0] === _.qs("#qsaDivP1") &&
    testQsa3[1] === _.qs("#qsaDivP2")
);

testQsa3.each(function (e) { e.innerHTML += " each"; });
_cut.addTest("qsa() each", true,
  testQsa3[0].innerHTML === "#qsaDivP1 test element each" &&
  testQsa3[1].innerHTML === "#qsaDivP2 test element each"
);

_cut.addTest("getType() values",
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

_cut.addTest("getType() all true",
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

_cut.addTest("getType() all false",
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

var extObj1 = _.extend(false,{},foo1,bar1);
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

var extObj1 = _.extend({},foo1,bar1);
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

var extObj1 = _.deepAssign({},foo1,bar1);
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
  _.getUrlVarFromString("?testa=a1&testb=b2")["testa"]
);
_cut.addTest(
  "getUrlVarFromString() prop",
  "b2",
  _.getUrlVarFromString("?testa=a1&testb=b2", "testb")
);

_cut.addElement(
  _.domCreate(
    "div",
    {"id": "testFormDiv"},
    " <form id='form1'><br/>Text: <input type='text' name='name' value='foo éáűőúöüóíéáűőúöüóí'><br/>Password: <input type='password' name='password' value='bar'><br/>Number: <input type='number' name='number' value='97'><br/> Radio: <input type='radio' name='radio' value='male' checked='checked'>Male <input type='radio' name='radio' value='female'>Female<br/> <select name='animals'> <option value='dog'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos'>hippos</option> </select><br/> <select name='animals-multiple' multiple='multiple'> <option value='dog' selected='selected'>dog</option> <option value='cat'>cat</option> <option value='cow'>cow</option> <option value='hippos' selected='selected'>hippos</option> </select><br/>Checkbox1: <input type='checkbox' name='checkbox1' value='true' checked='checked'>true<br/>Checkbox2: <input type='checkbox' name='checkbox2' value='false'>false<br/>Textarea1: <textarea name='textarea1'>textarea1</textarea><br/><input type='submit' value='Submit'><br/><input type='reset' value='Reset'><br/><input type='button' value='Button1'><br/><button>Button2</button> </form> "
  )
);

_cut.addTest(
  "form2array()", '[{"name":"name","value":"foo%20%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD%C3%A9%C3%A1%C5%B1%C5%91%C3%BA%C3%B6%C3%BC%C3%B3%C3%AD"},{"name":"password","value":"bar"},{"name":"number","value":"97"},{"name":"radio","value":"male"},{"name":"animals","value":"dog"},{"name":"animals-multiple","value":"dog"},{"name":"animals-multiple","value":"hippos"},{"name":"checkbox1","value":"true"},{"name":"textarea1","value":"textarea1"}]',
  JSON.stringify( _.form2array( _.qs("#form1") ) )
 );

_cut.addTest(
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
_cut.addTest(
  "getFullscreen() and setFullscreenOn(<element>) and setFullscreenOff",
  domFullscreenElement,
  _.getFullscreen()
);
alert(_.getFullscreen());
_.setFullscreenOff();

_.setFullscreenOn("#domFullscreenElement");
_cut.addTest(
  "getFullscreen() and setFullscreenOn(<selector>) and setFullscreenOff",
  domFullscreenElement,
  _.getFullscreen()
);
alert(_.getFullscreen());
_.setFullscreenOff();

_.setFullscreenOn(document);
_cut.addTest(
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
_cut.addTest("getStyle()", "bold", _.domGetCSS(csstest2, "font-weight") );

_.getStyle("testmodule1.css", function () {
  _cut.addTest("getStyle()", "bold", _.domGetCSS(csstest2, "font-weight") );
} );
*/

_cut.addTest("random()", true, _.random() <= 101 );
_cut.addTest("random(max)", true, _.random(30) <= 30 );
var testRandom = _.random(51,55);
_cut.addTest("random(min,max)", true, testRandom >= 51 && testRandom <= 55 );

_cut.addTest("getDoNotTrack()", true, _.getDoNotTrack() === true || _.getDoNotTrack() === false );
_cut.addTest("constant()", 3.14, _.constant(3.14)() );
_cut.addTest("identity()", 100, _.identity(60) + _.identity(40) );
_cut.addTest("noop()", undefined, _.noop() );

_cut.addTest(
  "removeTags()",
  "lorem ipsum dolor sit amet , consectetuer",
  _.removeTags("<p><img src=\"x.js\" /><img src=\"x.js\"/><img src=\"x.js\">lorem</p><p><a href=\"#\"><b>ipsum<br /><br/><br>dolor</b></a><script src=\"x.js\"></script></p>< p>< img src=\"x.js\" />< img src=\"x.js\"/>< img src=\"x.js\">sit< /p>< p>< a href=\"#\">< b>amet< br />< br/>< br>, consectetuer< /b>< / b>< /a>< script src=\"x.js\">< /script>< /p>")
);

_cut.addTest("version", true, _.version.includes("Celestra v") );


/* DOM */
/*
domFadeIn(<element>[,duration[,display]]);
domFadeOut(<element>[,duration]);
domFadeToggle(<element>[,duration[,display]]);
*/
_cut.addElement("h3", "DOM");

_cut.addElement(
  _.domCreate("p", {"id": "domTestElement", "width": "250px"}, "DOM test element")
);
var domTestElement = _.qs("#domTestElement") ;

_cut.addTest("domCreate()", true, _.isElement(domTestElement) );

_.domSetCSS(domTestElement, "width", "300px");
_cut.addTest("domSetCSS() property and domGetCSS()", "300px", _.domGetCSS(domTestElement, "width") );

_.domSetCSS(domTestElement, {"width": "350px", "font-weight": "bold"});
_cut.addTest("domSetCSS() properties object and domGetCSS()",
  "350px",
  _.domGetCSS(domTestElement, "width")
);

_.domHide(domTestElement);
_cut.addTest("domHide()", "none", _.domGetCSS(domTestElement, "display") );

_.domShow(domTestElement);
_cut.addTest("domShow()", "block", _.domGetCSS(domTestElement, "display") );

_.domHide(domTestElement);
_.domShow(domTestElement, "inline-block");
_cut.addTest("domShow() inline-block", "inline-block", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement);
_cut.addTest("domToggle() hide", "none", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement);
_cut.addTest("domToggle() show", "block", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement, "inline-block");
_cut.addTest("domToggle() hide inline-block", "none", _.domGetCSS(domTestElement, "display") );

_.domToggle(domTestElement, "inline-block");
_cut.addTest("domHide() show inline-block", "inline-block", _.domGetCSS(domTestElement, "display") );

var domTestVar = 33;
function domTestElementClick1 () { domTestVar = 42; }
function domTestElementClick2 () { domTestVar = 56; }

_.domOn(domTestElement, "click", domTestElementClick1 );
_.domTrigger(domTestElement, "click");
_cut.addTest("domOn() and domTrigger()", 42, domTestVar );

_.domOff(domTestElement, "click", domTestElementClick1 );
_.domOn(domTestElement, "click", domTestElementClick2 );
_.domOff(domTestElement, "click", domTestElementClick2 );
_.domTrigger(domTestElement, "click");
_cut.addTest("domOff() and domTrigger()", 42, domTestVar );


/* FP */

_cut.addElement("h3", "FP");

var slice = _.toFunction([].slice);
_cut.addTest("toFunction()", true, Array.isArray(slice(document.querySelectorAll("h3"))) );

var dqsa = _.bind(document.querySelectorAll, document);
_cut.addTest("bind()", true, dqsa("h3").length > 0 );

var FPArray = [1,2,3];

var forEachStr = "";
_.forEach(FPArray, function (e) { forEachStr += (e*2); } );
_cut.addTest("forEach()", "246", forEachStr );

var eachStr = "";
_.each(FPArray, function (e) { eachStr += (e*2); } );
_cut.addTest("each()", "246", eachStr );

_cut.addTest("map()", 9, _.map(FPArray, function (e) {return e*3})[2] );

var FPObject = {a:2, b:3, c:4};

var forInStr = "";
_.forIn(FPObject, function (e) { forInStr += (e*2); } );
_cut.addTest("forIn()", "468", forInStr );

_cut.addTest("mapIn()", 9, _.mapIn(FPObject, function (e) { return (e*3); })["b"] );
_cut.addTest("toArray()", true, Array.isArray( _.toArray({0:1,1:2,2:3,length:3}) ) );
_cut.addTest("toObject()", true, _.isObject( _.toArray({0:1,1:2,2:3,length:3}) ) );
_cut.addTest("hasOwn() true", true, _.hasOwn( {0:1,1:2,2:3,length:3}, "length" ) );
_cut.addTest("hasOwn() false", false, _.hasOwn( FPArray, "forEach" ) );


/* cookie */
_cut.addElement("h3", "cookie");

_.setCookie("ctest3", "cookieUnitTestStr");
_cut.addTest("hasCookie() true", true, _.hasCookie("ctest3") );
_cut.addTest("getCookie(name) value", "cookieUnitTestStr", _.getCookie("ctest3") );
_cut.addTest("getCookie()", "cookieUnitTestStr", _.getCookie()["ctest3"] );
_cut.addTest("removeCookie() true", true, _.removeCookie("ctest3") );
_cut.addTest("removeCookie() false", false, _.removeCookie("ctest3") );
_cut.addTest("hasCookie() false", false, _.hasCookie("ctest3") );
_cut.addTest("getCookie(name) null", null, _.getCookie("ctest3") );
_cut.addTest("getCookie() undefined", undefined, _.getCookie()["ctest3"] );


/* polyfills */
_cut.addElement("h3", "polyfills");

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

_cut.addElement( _.domCreate("div", {"id": "testDivNode"}, "#testDivNode") );
var testDivNode = _.qs("#testDivNode");
testDivNode.append( _.domCreate("p", {"id": "testNodeP1"}, "testNodeP1") );
testDivNode.append( _.domCreate("p", {"id": "testNodeP2"}, "testNodeP2") );

var dqsaList = document.querySelectorAll("#testDivNode > p")
dqsaList.forEach( function (e) { e.style["color"] = "blue"; } );
_cut.addTest("NodeList.prototype.forEach()", true,
  dqsaList[0].style["color"] === "blue" &&
  dqsaList[1].style["color"] === "blue"
);

var testNodeP1 = _.qs("#testNodeP1");
var testNodeP2 = _.qs("#testNodeP2");

testNodeP1.after("after text");
_cut.addTest("ChildNode.after() text", true, testDivNode.innerHTML.includes("after text") )
testNodeP1.after( _.domCreate("b", {}, "after element") );
_cut.addTest("ChildNode.after() element", true, testDivNode.innerHTML.includes("after element") );

testNodeP1.before("before text");
_cut.addTest("ChildNode.before() text", true, testDivNode.innerHTML.includes("before text") )
testNodeP1.before( _.domCreate("b", {}, "before element") );
_cut.addTest("ChildNode.before() element", true, testDivNode.innerHTML.includes("before element") );

testNodeP1.append("append text");
_cut.addTest("ParentNode.append() text", true, testDivNode.innerHTML.includes("append text") )
testNodeP1.append( _.domCreate("b", {}, "append element") );
_cut.addTest("ParentNode.append() element", true, testDivNode.innerHTML.includes("append element") );

testNodeP1.prepend("prepend text");
_cut.addTest("ParentNode.prepend() text", true, testDivNode.innerHTML.includes("prepend text") )
testNodeP1.prepend( _.domCreate("b", {}, "prepend element") );
_cut.addTest("ParentNode.prepend() element", true, testDivNode.innerHTML.includes("prepend element") );

testNodeP1.replaceWith("testElement");
_cut.addTest("ChildNode.replaceWith() text", null, _.qs("#testNodeP1") );

testNodeP2.replaceWith( _.domCreate("p", {}, "testElement") );
_cut.addTest("ChildNode.replaceWith() element", null, _.qs("#testNodeP2") );

testDivNode.remove();
_cut.addTest("ChildNode.remove()", null, _.qs("#testDivNode") );


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

_cut.addTest("isString() true", true, _.isString("str") );
_cut.addTest("isString() false", false, _.isString(533) );
_cut.addTest("isChar() true", true, _.isChar("s") );
_cut.addTest("isChar() false 1", false, _.isChar("str") );
_cut.addTest("isChar() false 2", false, _.isChar(533) );
_cut.addTest("isNumber() true 1", true, _.isNumber(98) );
_cut.addTest("isNumber() true 2", true, _.isNumber(3.14) );
_cut.addTest("isNumber() false", false, _.isNumber("str") );
_cut.addTest("isInteger() true", true, _.isInteger(98) );
_cut.addTest("isInteger() false 1", false, _.isInteger(3.14) );
_cut.addTest("isInteger() false 2", false, _.isInteger("str") );
_cut.addTest("isFloat() true", true, _.isFloat(3.14) );
_cut.addTest("isFloat() false 1", false, _.isFloat(98) );
_cut.addTest("isFloat() false 2", false, _.isFloat("str") );
_cut.addTest("isBoolean() true", true, _.isBoolean(false) );
_cut.addTest("isBoolean() false", false, _.isBoolean(98) );
_cut.addTest("isObject() true", true, _.isObject({}) );
_cut.addTest("isObject() false ", false, _.isObject(98) );
_cut.addTest("isEmptyObject() true", true, _.isEmptyObject({}) );
_cut.addTest("isEmptyObject() false 1", false, _.isEmptyObject( document.querySelector("p") ) );
_cut.addTest("isEmptyObject() false 2", false, _.isEmptyObject(98) );
_cut.addTest("isFunction() true", true, _.isFunction(_.noop) );
_cut.addTest("isFunction() false", false, _.isFunction( document.querySelector("p") ) );
_cut.addTest("isArray() false", false, _.isArray( document.querySelector("p") ) );
_cut.addTest("isEmptyArray() true", true, _.isEmptyArray([]) );
_cut.addTest("isEmptyArray() false 1", false, _.isEmptyArray([1,2,3]) );
_cut.addTest("isEmptyArray() false 2", false, _.isEmptyArray( document.querySelector("p") ) );
_cut.addTest("isArraylike() true 1", true, _.isArraylike([]) );
_cut.addTest("isArraylike() true 2", true, _.isArraylike( document.querySelectorAll("p") ) );
_cut.addTest("isArraylike() false", false, _.isArraylike( document.querySelector("p") ) );
_cut.addTest("isNull() true", true, _.isNull(null) );
_cut.addTest("isNull() false", false, _.isNull( document.querySelectorAll("p") ) );
_cut.addTest("isUndefined() true", true, _.isUndefined(undefined) );
_cut.addTest("isUndefined() false", false, _.isUndefined( document.querySelectorAll("p") ) );
_cut.addTest("isNullOrUndefined() true 1", true, _.isNullOrUndefined(undefined) );
_cut.addTest("isNullOrUndefined() true 2", true, _.isNullOrUndefined(null) );
_cut.addTest("isNullOrUndefined() false", false, _.isNullOrUndefined( document.querySelectorAll("p") ) );
_cut.addTest("isPrimitive() true 1", true, _.isPrimitive(98) );
_cut.addTest("isPrimitive() true 2", true, _.isPrimitive("str") );
_cut.addTest("isPrimitive() false 1", false, _.isPrimitive( document.querySelectorAll("p") ) );
_cut.addTest("isPrimitive() false 2", false, _.isPrimitive(_.noop) );
_cut.addTest("isDate() true", true, _.isDate(new Date()) );
_cut.addTest("isDate() false", false, _.isDate({}) );
_cut.addTest("isRegexp() true", true, _.isRegexp(/^\[object (.+)\]$/g) );
_cut.addTest("isRegexp() false", false, _.isRegexp("string") );
_cut.addTest("isElement() true 1", true, _.isElement(document.body) );
_cut.addTest("isElement() true 2", true, _.isElement(_.qs("div")) );
_cut.addTest("isElement() false 1", false, _.isElement(document.createTextNode("sample text")) );
_cut.addTest("isElement() false 2 ", false, _.isElement(document.createComment("sample comment")) );
_cut.addTest("isElement() false 3 ", false, _.isElement([]) );

_cut.addTest("isNumeric() true", true,
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

_cut.addTest("isNumeric() false", true,
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
  _cut.addTest("<b>ES6 -</b> isSymbol() true", true, _.isSymbol( Symbol("str") ) );
  _cut.addTest("<b>ES6 -</b> isSymbol() false", false, _.isSymbol(_.noop) );
  _cut.addTest("<b>ES6 -</b> isMap() true", true, _.isMap( new Map() ) );
  _cut.addTest("<b>ES6 -</b> isMap() false", false, _.isMap(_.noop) );
  _cut.addTest("<b>ES6 -</b> isSet() true", true, _.isSet( new Set() ) );
  _cut.addTest("<b>ES6 -</b> isSet() false", false, _.isSet(_.noop) );
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
  _cut.addTest("getScripts() (core api) with success gs1", true, true);
  } },
  { url: "unittest-gs2.js", success: function () {
    _cut.addTest("getScripts() (core api) with success gs2", true, true);
  } }
];
_.getScripts(scripts);

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
_.getScripts(scripts);

/* AJAX functions */

var
  resAjaxJson = "img/app-app-catalog/app-bricks.png",
  resAjaxXml = "Vapelyfe",
  resAjaxText = "<p><span class=\"big\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span> Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. <span class=\"small\">In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</span></p>\r\n<p><b>Nullam dictum felis eu pede mollis pretium.</b> Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. <small>Etiam ultricies nisi vel augue.</small></p>";

_.getJson("testdata.json",
  function (r) { _cut.addTest("getJson()", resAjaxJson, r[0].image );  }
);
_.getText("testdata.txt",
  function (r) { _cut.addTest("getText()", resAjaxText, r ); }
);

_.getAjax("testdata.txt","text",
  function (r) { _cut.addTest("getAjax() text", resAjaxText, r ); },
  function (e) { _cut.addTest("getAjax() text: "+JSON.stringify(e), true, false ); }
);
_.getAjax("testdata.json","json",
  function (r) { _cut.addTest("getAjax() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("getAjax() json: "+JSON.stringify(e), true, false ); }
);
_.getAjax("testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("getAjax() xml", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("getAjax() xml: "+JSON.stringify(e), true, false ); }
);

_.postAjax( "testdata.txt","a=foo&b=bar baz","text",
  function (r) { _cut.addTest("postAjax() text", resAjaxText, r );},
  function (e) { _cut.addTest("postAjax() text: "+JSON.stringify(e), true, false ); }
);
_.postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.addTest("postAjax() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("postAjax() json: "+JSON.stringify(e), true, false ); }
);
_.postAjax( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("postAjax() xml", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("postAjax() xml: "+JSON.stringify(e), true, false ); }
);

_.getCors( "testdata.txt","text",
  function (r) { _cut.addTest("getCors() text ", resAjaxText, r ); },
  function (e) { _cut.addTest("getCors() text: "+JSON.stringify(e), true, false ); }
);
_.getCors( "testdata.json","json",
  function (r) { _cut.addTest("getCors() json", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("getCors() json: "+JSON.stringify(e), true, false ); }
);
_.getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("getCors() xml", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("getCors() xml: "+JSON.stringify(e), true, false ); }
);

_.postCors( "testdata.txt","text","a=foo&amp;b=bar baz",
  function (r) {
    _cut.addTest("postCors() text", resAjaxText, r );
  },
  function (e) { _cut.addTest("postCors() text: "+JSON.stringify(e), true, false ); }
);
_.postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.addTest("postCors() json ", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("postCors() json: "+JSON.stringify(e), true, false ); }
);
_.postCors( "testdata.xml","a=foo&b=bar baz","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("postCors() xml", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("postCors() xml: "+JSON.stringify(e), true, false ); }
);

_.getAjax("testdata.txt","text",
  function (r) { _cut.addTest("getAjax() text + password", resAjaxText, r ); },
  function (e) { _cut.addTest("getAjax() text + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
_.postAjax( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.addTest("postAjax() json + password", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("postAjax() json + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
_.getCors( "testdata.xml","xml",
  function (r) {
    var xa = r.getElementsByTagName("picture");
    var xb = xa[0].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    _cut.addTest("getCors() xml + password", resAjaxXml, xb );
  },
  function (e) { _cut.addTest("getCors() xml + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);
_.postCors( "testdata.json","a=foo&b=bar baz","json",
  function (r) { _cut.addTest("postCors() json + password", resAjaxJson, r[0].image ); },
  function (e) { _cut.addTest("postCors() json + password: "+JSON.stringify(e), true, false ); },
  "user",
  "password"
);

/* domReady() */
_.domReady(function () {
  //_cut.addElement("h3", "domReady (core api)");
  _cut.addTest("domReady() (core api) is working", true, true );
});