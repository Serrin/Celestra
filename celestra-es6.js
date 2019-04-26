/**
 * @name Celestra ES6 extension
 * @version 2.7.0
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Minimal required Celestra version: 2.7.0
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

const takeWhile = function* takeWhile (it, fn) {
  for (let item of it) {
    if (!fn(item)) { break; }
    yield item;
  }
};

const dropWhile = function* dropWhile (it, fn) {
  let d = true;
  for (let item of it) {
    if (d && !fn(item)) { d = false; }
    if (!d) { yield item; }
  }
};

const takeOf = function* takeOf (it, n) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
};

const dropOf = function* dropOf (it, n) {
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

const filterOf = function* filterOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item,i++)) { yield item; }
  }
};

const sliceOf = function* sliceOf (it, begin = 0, end = Infinity) {
  let i = 0;
  for (let item of it) {
    if (i >= begin && i <= end) {
      yield item;
    } else if (i > end) {
      return;
    }
    i++;
  }
};

const isGenerator = function isGenerator (v) {
  return (Object.getPrototypeOf(v).constructor ===
    Object.getPrototypeOf(function*(){}).constructor);
};

/* celestra object */
celestra.iterRange = iterRange;
celestra.iterCycle = iterCycle;
celestra.iterRepeat = iterRepeat;
celestra.takeWhile = takeWhile;
celestra.dropWhile = dropWhile;
celestra.takeOf = takeOf;
celestra.dropOf = dropOf;
celestra.forOf = forOf;
celestra.mapOf = mapOf;
celestra.filterOf = filterOf;
celestra.sliceOf = sliceOf;
celestra.isGenerator = isGenerator;

}(window, celestra));
