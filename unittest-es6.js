(function(){
"use strict";

/* Celestra v2.8.0 ES6E testcases */

_cut.addElement("h3", "ES6 extension");


_cut.addElement("h4", "ES6 extension polyfills");

const testGenFn = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
let sum = "";
for (let x of testGenFn(3)) { sum += x; }
_cut.isEqual("GeneratorFunction()", "912", sum);


const regexp = RegExp('foo*','g');
const str = 'table football, foosball';
let matches1 = str.matchAll(regexp);
let resMatchAll1 = "";
for (const item of matches1) { resMatchAll1 += item; }
// "foofoo"
let matches2 = str.matchAll(regexp);
let resMatchAll2 = JSON.stringify(Array.from(matches2, m => m[0]));
//  "[\"foo\",\"foo\"]"
_cut.isTrue(
  "String.prototype.matchAll()",
  (resMatchAll1 === "foofoo" && resMatchAll2 === "[\"foo\",\"foo\"]")
);

_cut.addElement("h4", "ES6 extension functions");

_cut.isTrue(
  "isGenerator() true",
  _.isGenerator(function* fn42g () { yield 42; })
);
_cut.isFalse(
  "isGenerator() false 1 fn",
  _.isGenerator(function fn42 () { return 42; })
);
_cut.isFalse(
  "isGenerator() false 2 number",
  _.isGenerator(42)
);

sum = "";
for (let x of _.iterRange(10, 3, 20)) { sum += x; }
_cut.isEqual("iterRange() integer", "10131619", sum);
sum = "";
for (let x of _.iterRange(10, 3.5, 20)) { sum += x; }
_cut.isEqual("iterRange() float", "1013.517", sum);

sum = "";
for (let x of _.iterCycle(["a", "b", "c"], 4)) { sum += x; }
_cut.isEqual("iterCycle() array", "abcabcabcabc", sum);
sum = "";
for (let x of _.iterCycle(_.iterRange(10, 3, 20), 3)) { sum += x; }
_cut.isEqual("iterCycle() + iterRange()", "101316191013161910131619", sum);
sum = "";
let itrr1 = _.iterCycle(['A', 'B'].values());
for (let i = 0; i < 7; i++) { sum += itrr1.next().value; }
_cut.isEqual("iterCycle() infinity", "ABABABA", sum);

sum = "";
for (let x of _.iterRepeat("HW", 5)) { sum += x; }
_cut.isEqual("iterRepeat()", "HWHWHWHWHW", sum);
sum = "";
let itrr2 = _.iterRepeat('HW2');
for (let i = 0; i < 3; i++) { sum += itrr2.next().value; }
_cut.isEqual("iterRepeat() infinity", "HW2HW2HW2", sum);


var FPArray = [1,2,3];

// forOf - Array
var forOfStr = "";
_.forOf(FPArray, function (e) { forOfStr += (e*2); } );
_cut.isEqual("forOf() 1 ES5 Array", "246", forOfStr );
// forOf - String
forOfStr = "";
_.forOf("cat, dog, pig", function (e) { forOfStr += e.toUpperCase(); } );
_cut.isEqual("forOf() 2 ES5 String", "CAT, DOG, PIG", forOfStr );
// forOf - Nodelist
var forOfCount = 0;
_.forOf(document.querySelectorAll("h3"), function (e) { forOfCount++; } );
_cut.isEqual(
  "forOf() 3 ES5 Nodelist",
  document.querySelectorAll("h3").length,
  forOfCount
);
/*
// forOf - custom array-like object
var forOfCount = 0;
_.forOf({0:4,1:5,2:6,length:3}, function (e) { forOfCount += (e*3); } );
_cut.isEqual("forOf() 4 ES5 custom array-like object", 45, forOfCount);
*/
// forOf - Map
forOfStr = "";
_.forOf(
  new Map([ ["foo", 3.14], ["bar", 42], ["baz", "Wilson"] ]),
  function (e,i) { forOfStr += i + "-" + e + "-"; }
);
_cut.isEqual(
  "forOf() 5 ES6 Map",
  "0-foo,3.14-1-bar,42-2-baz,Wilson-",
  forOfStr
);
// forOf - Set
forOfCount = 0;
_.forOf(
  new Set([4,5,6]),
  function (e) { forOfCount += (e*3); }
);
_cut.isEqual("forOf() 6 ES6 Set", 45, forOfCount);
// forOf - iterator
forOfCount = 0;
_.forOf(
  (new Set([4,5,6])).values(),
  function (e) { forOfCount += (e*3); }
);
_cut.isEqual("forOf() 7 ES6 Set values() iterator", 45, forOfCount);


// mapOf - Array
var mapOfStr = "";
for (let item of _.mapOf([1,2,3], function(e) { return e*2; })) {
  mapOfStr += item;
}
_cut.isEqual("mapOf() 1 ES5 Array", "246", mapOfStr );
// mapOf - String
var mapOfStr = "";
for (let item of _.mapOf("cat, dog, pig", function (e) { return e.toUpperCase(); })) {
  mapOfStr += item;
}
_cut.isEqual("mapOf() 2 ES5 String", "CAT, DOG, PIG", mapOfStr );

// mapOf - Nodelist
var mapOfNL = [];
for (let item of _.mapOf(document.querySelectorAll("h3"), function (e) { return e; })) {
  mapOfNL.push(item);
}
_cut.isTrue(
  "mapOf() 3 ES5 Nodelist",
  Array.isArray(mapOfNL) && mapOfNL.every(function(e) { return _.isElement(e); })
);
/*
// mapOf - custom array-like object
_cut.isEqual(
  "mapOf() 4 ES5 custom array-like object",
  "[2,4,6]",
  JSON.stringify( _.mapOf({0:1,1:2,2:3,length:3}, function(e) { return e*2; }) )
);
*/
// mapOf - Map
var mapOfStr = "";
for (let item of _.mapOf(
  new Map([ ["foo", 1], ["bar", 2], ["baz", 3] ]),
  function(e) { return [ e[0], e[1]*2 ]; }
)) {
  mapOfStr += item[0] + item[1];
}
_cut.isEqual("mapOf() 5 ES6 Map", "foo2bar4baz6", mapOfStr);
// mapOf - Set
var mapOfStr = "";
for (let item of _.mapOf(new Set([1,2,3]), function(e) { return e*2; })) {
  mapOfStr += item;
}
_cut.isEqual("mapOf() 6 ES6 Set", "246", mapOfStr);
// mapOf - iterator
var mapOfStr = "";
for (let item of _.mapOf((new Set([1,2,3])).values(), function(e) { return e*3; })) {
  mapOfStr += item;
}
_cut.isEqual("mapOf() 7 ES6 Set values() iterator", "369", mapOfStr);


var FParray2 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

// takeOf() - step 1 - 0
var iterStr = "";
for (let item of _.takeOf(FParray2, 0)) { iterStr += item; }
_cut.isEqual("takeOf() - step 1 - 0", "", iterStr);
// takeOf() - step 2 - 7
var iterStr = "";
for (let item of _.takeOf(FParray2, 7)) { iterStr += item; }
_cut.isEqual("takeOf() - step 2 - 7", "ABCDEFG", iterStr);
// takeOf() - step 3 - 12
var iterStr = "";
for (let item of _.takeOf(FParray2, 12)) { iterStr += item; }
_cut.isEqual("takeOf() - step 3 - 12", "ABCDEFGHIJ", iterStr);


// dropOf() - step 1 - 0
var iterStr = "";
for (let item of _.dropOf(FParray2, 0)) { iterStr += item; }
_cut.isEqual("dropOf() - step 1 - 0", "ABCDEFGHIJ", iterStr);
// dropOf() - step 2 - 7
var iterStr = "";
for (let item of _.dropOf(FParray2, 7)) { iterStr += item; }
_cut.isEqual("dropOf() - step 2 - 7", "HIJ", iterStr);
// dropOf() - step 3 - 12
var iterStr = "";
for (let item of _.dropOf(FParray2, 12)) { iterStr += item; }
_cut.isEqual("dropOf() - step 3 - 12", "", iterStr);


var FPArray3 = [1,2,3,4,5,6,7,8,9,10];

var iterStr = "";
for (let item of _.filterOf(FPArray3, (v) => (v>3 && v<9) )) {
  iterStr += item;
}
_cut.isEqual("filterOf()", "45678", iterStr);


var iterStr = "";
for (let item of _.sliceOf(FPArray3,0,4)) {
  iterStr += item;
}
_cut.isEqual("sliceOf() - step 1 - 0 to 4", "12345", iterStr);
var iterStr = "";
for (let item of _.sliceOf(FPArray3,5)) {
  iterStr += item;
}
_cut.isEqual("sliceOf() - step 2 - 5 to Infinity", "678910", iterStr);
var iterStr = "";
for (let item of _.sliceOf(FPArray3,4,8)) {
  iterStr += item;
}
_cut.isEqual("sliceOf() - step 3 - 4 to 8", "56789", iterStr);
var iterStr = "";
for (let item of _.sliceOf(FPArray3)) {
  iterStr += item;
}
_cut.isEqual("sliceOf() - step 4 - all", "12345678910", iterStr);


let whileArray = [0,2,4,6,8,10,12,14,16];

let whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<10))) {
  whileSum += item;
}
_cut.isEqual("takeWhile() values", whileSum, 20);
whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<0))) {
  whileSum += item;
}
_cut.isEqual("takeWhile() empty list", whileSum, 0);
whileSum = 0;
for (let item of _.takeWhile(whileArray, (e) => (e<30))) {
  whileSum += item;
}
_cut.isEqual("takeWhile() full list", whileSum, 72);

whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<10))) {
  whileSum += item;
}
_cut.isEqual("dropWhile() values", whileSum, 52);
whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<30))) {
  whileSum += item;
}
_cut.isEqual("dropWhile() empty list", whileSum, 0);
whileSum = 0;
for (let item of _.dropWhile(whileArray, (e) => (e<0))) {
  whileSum += item;
}
_cut.isEqual("dropWhile() full list", whileSum, 72);

_cut.isEqual(
  "itemOf() string unicode",
  _.itemOf("foo \uD834\uDF06 bar", 4)
    + _.itemOf("foo \uD834\uDF06 bar", 8)
    + _.itemOf("foo \uD834\uDF06 bar", 12),
  "\uD834\uDF06" + "r" + "undefined"
);
let itemOfArray = [4,5,6,7,8];
_cut.isEqual(
  "itemOf() array",
  "" +
    _.itemOf(itemOfArray, 3)
    + _.itemOf(itemOfArray, 12),
  "7" + "undefined"
);
let itemOfMap = new Map([ ["a",1], ["b",2], ["c",3] ]);
_cut.isEqual(
  "itemOf() map",
  JSON.stringify( _.itemOf(itemOfMap, 1) )
    + _.itemOf(itemOfMap, 12),
  "[\"b\",2]" + "undefined"
);
let itemOfSet = new Set([3,3,4,5,5,6,7,7,8]);
_cut.isEqual(
  "itemOf() set",
  "" +
    JSON.stringify( _.itemOf(itemOfSet, 3) )
    + _.itemOf(itemOfSet, 12),
  "6" + "undefined"
);

}());
