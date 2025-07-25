/**
 * @name Celestra Assert plugin
 * @version 5.7.4 dev
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Required Celestra version: 5.7.4
 */

(function(window, celestra){
"use strict";

const assert = function (c, m) { return celestra.assert(c, m); };

assert.strict = true;

assert.ok = (c, m) => celestra.assert(c, m);

assert.isTrue = (c, m) => celestra.assertTrue(c, m);

assert.isFalse = (c, m) => celestra.assertFalse(c, m);

assert.equal = (x, y, m) => (
  assert.strict ? celestra.assertStrictEqual(x, y, m)
    : celestra.assertEqual(x, y, m)
);

assert.notEqual = (x, y, m) => (
  assert.strict ? celestra.assertNotStrictEqual(x, y, m)
    : celestra.assertNotEqual(x, y, m)
);

assert.strictEqual = (x, y, m) => celestra.assertStrictEqual(x, y, m);

assert.notStrictEqual = (x, y, m) => celestra.assertNotStrictEqual(x, y, m);

assert.deepEqual = (x, y, m) => (
  assert.strict ? celestra.assertDeepStrictEqual(x, y, m)
    : celestra.assertDeepEqual(x, y, m)
);

assert.notDeepEqual = (x, y, m) => (
  assert.strict ? celestra.assertNotDeepStrictEqual(x, y, m)
    : celestra.assertNotDeepEqual(x, y, m)
);

assert.deepStrictEqual = (x, y, m) => celestra.assertDeepStrictEqual(x, y, m);

assert.notDeepStrictEqual = (x, y, m) =>
  celestra.assertNotDeepStrictEqual(x, y, m);

assert.type = (v, t, m) => celestra.assertType(v, t, m);

assert.notType = (v, t, m) => celestra.assertNotType(v, t, m);

window.assert = assert;

}(window, celestra));
