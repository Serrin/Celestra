/**
 * @name Celestra ES6 extension
 * @version 2.5.1
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Minimal required Celestra version: 2.5.1
 */

(function(window, celestra){
"use strict";

/* polyfills */

if (!window.GeneratorFunction) {
  window.GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
}

/* functions */

const iterRange = function* iterRange (start = 0, step = 1, end = Infinity) {
  let i = start;
  while (i <= end) {
    yield i;
    i += step;
  }
};

const iterCycle = function* iterCycle (it, n = Infinity) {
  let i = 0;
  let iter2 = Array.from(it);
  while (i < n) {
    yield* iter2.values();
    i++;
  }
};

const iterRepeat = function* iterRepeat (value, n = Infinity) {
  let i = 0;
  while (i < n) {
    yield value;
    i++;
  }
};

const iterTake = function* iterTake (it, n) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
};

const iterDrop = function* iterDrop (it, n) {
  let i = n;
  for (let item of it) {
    if (i < 1) { yield item; } else { i--; }
  }
};

const forOf = function forOf (it, fn) {
  let i = 0;
  for (let item of it) { fn(item, i++); }
};

const mapOf = function* mapOf (it, fn) {
  let i = 0;
  for (let item of it) { yield fn(item, i++); }
};

/* celestra object */
celestra.iterRange = iterRange;
celestra.iterCycle = iterCycle;
celestra.iterRepeat = iterRepeat;
celestra.iterTake = iterTake;
celestra.iterDrop = iterDrop;
celestra.forOf = forOf;
celestra.mapOf = mapOf;

}(window, celestra));
