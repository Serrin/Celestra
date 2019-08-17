/**
 * @name Celestra ES6 extension
 * @version 2.9.1
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Minimal required Celestra version: 2.9.1
 */

(function(window, celestra){
"use strict";

/* polyfills */

if (!window.GeneratorFunction) {
  window.GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
}

if (!String.prototype.matchAll) {
  String.prototype.matchAll = function* (regex) {
    function ef (fls, fl) { return (fls.includes(fl) ? fls : fls + fl); }
    const lc = new RegExp(regex, ef(regex.flags, "g"));
    let match;
    while (match = lc.exec(this)) { yield match; }
  };
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

const takeOf = function* takeOf (it, n = 1) {
  let i = n;
  for (let item of it) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
};

const dropOf = function* dropOf (it, n = 1) {
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
    if (fn(item, i++)) { yield item; }
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

const itemOf = function itemOf (it, p) {
  let i = 0;
  for (let item of it) {
    if (i++ === p) { return item; }
  }
};

const sizeOf = function sizeOf (it) {
  let i = 0;
  for (let item of it) { i++; }
  return i;
};

const firstOf = function firstOf (it) {
  for (let item of it) { return item; }
};

const lastOf = function lastOf (it) {
  let item;
  for (item of it) { }
  return item;
};

const reverseOf = (it) => [...it].reverse().values();

const sortOf = (it) => [...it].sort().values();

const hasOf = function hasOf (it, v) {
  for (let item of it) {
    if (item === v) { return true; }
  }
  return false;
};

const findOf = function hasOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return item; }
  }
};

const everyOf = function everyOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (!fn(item, i++)) { return false; }
  }
  if (i === 0) { return false; }
  return true;
};

const someOf = function someOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return true; }
  }
  return false;
};

const noneOf = function noneOf (it, fn) {
  let i = 0;
  for (let item of it) {
    if (fn(item, i++)) { return false; }
  }
  if (i === 0) { return false; }
  return true;
};

const takeRight = function* takeRight ([...it], n = 1) {
  let i = n;
  for (let item of it.reverse()) {
    if (i <= 0) { break; }
    yield item;
    i--;
  }
};

const takeRightWhile = function* takeRightWhile ([...a], fn) {
  let i = 0;
  for (let item of a.reverse()) {
    if (fn(item, i)) {
      yield item;
    } else {
      break;
    }
  }
};

const dropRight = function* dropRight ([...it], n = 1) {
  let i = n;
  for (let item of it.reverse()) {
    if (i < 1) { yield item; } else { i--; }
  }
};

const dropRightWhile = function* dropRightWhile ([...a], fn) {
  let d = true;
  for (let item of a.reverse()) {
    if (d && !fn(item)) { d = false; }
    if (!d) { yield item; }
  }
};

const concatOf = function* concatOf () {
  for (let item of arguments) { yield* item; }
};

const reduceOf = function reduceOf (it, fn, iv) {
  let acc = iv;
  let i = 0;
  for (let item of it) {
    if (i === 0 && acc === undefined) {
      acc = item;
    } else {
      acc = fn(acc, item, i++);
    }
  }
  return acc;
};

const isGenerator = (v) => (Object.getPrototypeOf(v).constructor ===
  Object.getPrototypeOf(function*(){}).constructor);

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
celestra.itemOf = itemOf;
celestra.sizeOf = sizeOf;
celestra.firstOf = firstOf;
celestra.lastOf = lastOf;
celestra.reverseOf = reverseOf;
celestra.sortOf = sortOf;
celestra.hasOf = hasOf;
celestra.findOf = findOf;
celestra.everyOf = everyOf;
celestra.someOf = someOf;
celestra.noneOf = noneOf;
celestra.takeRight = takeRight;
celestra.takeRightWhile = takeRightWhile;
celestra.dropRight = dropRight;
celestra.dropRightWhile = dropRightWhile;
celestra.concatOf = concatOf;
celestra.reduceOf = reduceOf;
celestra.isGenerator = isGenerator;

}(window, celestra));
