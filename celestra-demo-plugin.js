/**
 * @name Celestra demo plugin
 * @version 3.5.0
 * @see https://github.com/Serrin/Celestra
 * @license MIT https://opensource.org/licenses/MIT
 * Minimal required Celestra version: 3.5.0
 */

(function(celestra){
"use strict";

celestra.addNumbers = function () {
  if (arguments.length>0) {
    var sum = 0;
    for (var i=0, l=arguments.length; i<l; i++) {
      if ( celestra.getType(arguments[i], "number") ) {
        sum += arguments[i];
      } else {
        throw "celestra.addNumbers() error: all parameters have to be number - "
          + JSON.stringify(arguments[i]);
      }
    }
    return sum;
  } else {
    throw "celestra.addNumbers() error: no parameters";
  }
};

}(celestra));
