/**
 * @name Celestra demo plugin
 * @version 4.4.1
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Required Celestra version: 4.4.1
 */

(function(celestra){
"use strict";

celestra.sum = (f, ...a) => a.reduce((acc, v) => acc + v, f);
celestra.avg = (f, ...a) => a.reduce((acc, v) => acc + v, f) / (a.length + 1);

}(celestra));
