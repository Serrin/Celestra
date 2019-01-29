(function(){
"use strict";

// Celestra v2.5.0 ES6 extension testcases

_cut.addElement("h3", "ES6 extension");


_cut.addElement("h4", "ES6 extension polyfills");

const testGenFn = new GeneratorFunction("v", "yield v * 3; yield v * 4;");
let sum = "";
for (let x of testGenFn(3)) { sum += x; }
_cut.isEqual("GeneratorFunction()", "912", sum);


_cut.addElement("h4", "ES6 extension functions");

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

}());
