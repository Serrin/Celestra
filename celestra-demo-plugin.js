/**
 * @name Celestra demo plugin
 * @version 3.6.1
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Minimal required Celestra version: 3.6.1
 */

(function(celestra){
"use strict";

celestra.sum = (...a) => a.slice(1).reduce((acc, cv) => acc + cv, a[0]);
celestra.avg = (...a) => a.slice(1).reduce((acc, cv) => acc + cv, a[0]) / a.length;

}(celestra));
