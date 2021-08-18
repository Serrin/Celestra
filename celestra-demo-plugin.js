/**
 * @name Celestra demo plugin
 * @version 4.5.0
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Required Celestra version: 4.5.0
 */

(function(celestra){
"use strict";

celestra.sum = (f, ...a) => a.reduce((acc, v) => acc + v, f);
celestra.avg = (f, ...a) => a.reduce((acc, v) => acc + v, f) / (a.length + 1);

celestra.isEven = (v) => {
  let r = v % 2;
  if (!Number.isNaN(r)) { return r === 0; }
  return false;
};

celestra.isOdd = (v) => {
  let r = v % 2;
  if (!Number.isNaN(r)) { return r !== 0; }
  return false;
};

}(celestra));
