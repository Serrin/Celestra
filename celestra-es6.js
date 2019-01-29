/**
 * @name Celestra ES6 extension
 * @version 2.5.0
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Minimal required Celestra version: 2.5.0
 */

(function(window, celestra){
"use strict";

/* polyfills */

if (!window.GeneratorFunction) {
  window.GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
}

/* functions */

const iterRange = function* (start = 0, step = 1, end = Infinity) {
  let i = start;
  while (i <= end) {
    yield i;
    i += step;
  }
};

const iterCycle = function* (iter, n = Infinity) {
  let i = 0;
  let iter2 = Array.from(iter);
  while (i < n) {
    yield* iter2.values();
    i++;
  }
};

const iterRepeat = function* (value, n = Infinity) {
  let i = 0;
  while (i < n) {
    yield value;
    i++;
  }
};

/* celestra object */
celestra.iterRange = iterRange;
celestra.iterCycle = iterCycle;
celestra.iterRepeat = iterRepeat;

}(window, celestra));
