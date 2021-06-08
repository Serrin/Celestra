/**
 * @name Celestra demo plugin
 * @version 4.2.0
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Required Celestra version: 4.2.0
 */

(function(celestra){
"use strict";

celestra.sum = (...a) => a.slice(1).reduce((acc, v) => acc + v, a[0]);
celestra.avg = (...a) => a.slice(1).reduce((acc, v) => acc + v, a[0]) / a.length;

}(celestra));
