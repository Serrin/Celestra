# Celestra

## Download

A helper ES5 library for those who like the Vanilla JS.
Only some functions and polyfills.

Tested on desktop browsers (latest Chrome, latest Firefox, latest Edge, IE11) and mobile devices (iOS Safari, Chrome, Firefox and Android Chrome, Samsung Internet, Firefox and W10M Edge).

Latest version: 1.17.1

Date: 2018-01-18T20:48:04.806Z

The Classic plugin has been removed in v1.17.1.

From the v1.17.0 (milestone Caprica, API17 ) there are two variants.


### Main variant

The functions are available in the `Celestra` and/or `_` object.

Development version: celestra.js (15983 byte)

Minimal version: celestra.min.js (15481 byte)

Cheatsheet: celestra-cheatsheet.pdf

The testcases of the main variant are on this page.

CommonJS (`Celestra`) and AMD (`{ Celestra: Celestra }`) compatible, but isn't compatible with Node.JS.

If the `_` global variable is used before the loading of the library, then the value of the variable is saved and you can restore with the `noConflict();` function.


### Functional programming (FP) variant

The functions are available in the global namespace (`window`) like in earlier versions before v1.17.0.

Development version: celestra-fp.js (17406 byte)

Minimal version: celestra-fp.min.js (13822 byte)

Cheatsheet: celestra-fp-cheatsheet.pdf

Celestra FP testpage: celestra-fp.html

This variant isn't compatible with Node.JS, CommonJS and AMD.


## How to clone

    $ git clone https://github.com/Serrin/Celestra/

## Variables

This is global in both variant.

Name | Description
---- | -----------
`doc` | Short name for the global document object.

## Functions

### Basic API

__Main version__: These functions are available in the `Celestra` and/or `_` objects.

Example: `_.qsa()`

__FP version:__ These functions are available in the global namespace (`window`).

Name | Description
---- | -----------
`Celestra.version` | _Only in the Main version._ - The library version.
`Celestra.noConflict();` | _Only in the Main version._ - Restore the previous `_` object value and return the `Celestra` object to create a new alias. Tip: You can make a new alias without this function too. Example: `var _cel = Celestra;`
`qsa(<selector>[,context]);` | Get matched HTML elements in an array. The context is optional and can be an element or a selector string.
`qsa(<selector>[,context]).each( fn (el, i) { el.arguments; } );` | Exec a function on all elements.
`qs(<selector>[,context]).argument;` | Get the first matched HTML element. The context is optional and can be an element or a selector string.
`domReady(<fn>);` | Set the document ready (content fully loaded) event.
`inherit(<subclass>,<superclass>);` | Prototype inheritance.
`random(<max>);` | Get a random number value within 0 and max value.
`random(<min>,<max>);` | Get a random number value within min and max value.
`getScript(<url>[,success]);` | Load a JavaScript file and then execute it. The url parameter is mandatory and has to be a string. The success is optional and can be a function. <br/> __Tip:__ To prevent the caching of a js/css file use versioning in the file url. Example: `mylib.js?version=1.10.0`
`getScripts(<scripts>);` | Load more JavaScript files (modules) and then execute it. The scripts parameter is mandatory and has to be an array with object elements. The element.url property is mandatory and has to be a string. The element.success property is optional and can be a function.
`getStyle(<href>[,success]);` | Load a CSS file. The href parameter is mandatory and has to be a string. The success is optional and can be a function.
`getStyles(<styles>);` | Load more CSS files (modules). The styles parameter is mandatory and has to be an array with object elements. The element.href property is mandatory and has to be a string. The element.success property is optional and can be a function.
`getUrlVar([name]);` | Get the value of a url search variable or all url variables in an object from the `document.location.search`. The variable name is optional and can be a string.
`getUrlVarFromString(<querystr>[,name]);` | Get the value of a url search variable or all url variables in an object from a querystring. The variable name is optional and can be a string.
`obj2string(<object>);` | Convert object to query string. The return value is the string. The object parameter is mandatory.
`getType(<variable>[, type]);` | Get the type of a variable. If this is an object, then the return value is the detailed object type (e.g.: array). If the type (string) parameter is given, then the return value (boolean) is the equality of the type of the variable and the second parameter.
`extend([deep,]<target>,<source1>, ...sources);` | This is an enhanced version of the `Object.assign` method. The deep parameter (boolean) is optional and sets the deep copy (recursive) of the sources. In addition, the `extend` function doesn't use the `hasOwnProperty` method and copies all of the properties.
`getFullscreen();` | Get the fullscreen element. If this isn't set, then the return value is undefined. Please check the incompatibility issues on the [http://caniuse.com/#search=fullscreen](http://caniuse.com/#search=fullscreen) page.
`setFullscreenOn(<selector>);` | Set the fullscreen element. The selector can be a css selector string or an element.
`setFullscreenOff();` | Set off the fullscreen.
`getLocation(<success>[,error]);` | Get the current location as an object with the coordinates. The success is mandatory and has to be a function. The error is optional and can be a function.
`getDoNotTrack();` | Return the DoNotTrack setting (boolean) of the browser.
`constant(<value>);` | A one time assignment function to create a constant value in ES5. This returns a function, which returns the given value. (In math: `f(x)=x`)
`identity(<value>);` | Return the given value. (In math: `f(x)=x`)
`noop();` | It's an empty function (no operation) that returns undefined and usable for optional callback arguments.
`repeat(<iteration>,<callback>);` | Repeat the callback function. The iteration is mandatory and sets the number of the repeats and has to be an integer. The callback is mandatory and has to be a function. This function will be called with the iterator counter as parameter.

### DOM functions

__Main version__: These functions are available in the `Celestra` and/or `_` objects.

Example: `_.domCreate()`

__FP version:__ These functions are available in the global namespace (`window`).

Name | Description
---- | -----------
`domCreate(<type>[,properties[,innerHTML]]);` | Create a new HTML element. The type is mandatory and has to be a string. The properties object is optional and sets the element properties. (class, style, data-*, etc.) The innerHTML is optional and can be a string.
`domGetCSS(<element>,<property>);` | Get a CSS property value of an element. The function uses the `getComputedStyle` method, if it is available. The element is mandatory and has to be a HTML element. The property is mandatory and has to be a string.
`domSetCSS(<element>,<property>,<value>);` | Set a CSS property value of an element. The element is mandatory and has to be a HTML element. The property is mandatory and has to be a string. The value is mandatory and has to be a string.
`domSetCSS(<element>,<properties>);` | Set CSS property values of an element. The element is mandatory and has to be a HTML element. The properties object is mandatory. The object properties can be the CSS properties and the property values will be applied to the element.
`domFadeIn(<element>[,duration[,display]]);` | Fade in and show animation for an element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms). The display is optional and can be a string (CSS display property values).
`domFadeToggle(<element>[,duration[,display]]);` | Fade in or fade out animation which depends on the state of the element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms). The display is optional and can be a string (CSS display property values).
`domFadeOut(<element>[,duration]);` | Fade out and hide animation for an element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms).
`domShow(<element>[,display]);` | Show an element. The element is mandatory and has to be a HTML element. The display is optional and can be a string (CSS display values).
`domHide(<element>);` | Hide an element. The element is mandatory and has to be a HTML element.
`domToggle(<element>[,display]);` | Show or hide an element. The element is mandatory and has to be a HTML element. The display is optional and can be a string (CSS display values).
`domOn(<eventTarget>,<eventType>,<callback>);` | Add a callback to the eventType of the eventTarget.
`domOff(<eventTarget>,<eventType>,<callback>);` | Remove a callback to the eventType of the eventTarget.
`domTrigger(<eventTarget>,<eventType>);` | Trigger an eventType of the eventTarget.

### Functional programming

These functions help you write quick functional programming Javascript code.

__Main version__: These functions are available in the `Celestra` and/or `_` objects.

Example: `_.toFunction()`

__FP version:__ These functions are available in the global namespace (`window`).

Name | Description
---- | -----------
`toFunction(<function>);` | Return a "detach" function from an object method. The first parameter of the returned function will be the context object.
`bind(<function>,<context>);` | Return a function from an object method. The returned function is bind to the context.

__Sample code:__

    var forEach2 = toFunction([].forEach);
    var log = bind(console.log, console);
    forEach2(document.querySelectorAll("h3"), log);
    
    var slice = toFunction([].slice);
    alert( Array.isArray(slice(document.querySelectorAll("h3"))) ); // true

Name | Description
---- | -----------
`forEach(<collection>,<callback>);` | The forEach() method executes a provided function once for each array or nodelist element. The collection is mandatory and has to be an array or nodelist. The callback is mandatory and has to be a function.
`each(<collection>,<callback>);` | A shorthand to the function `forEach(<collection>,<callback>);`.
`map(<collection>,<callback>);` | The map() method creates a new array with the results of calling a provided function on every element in the calling array or nodelist. The collection is mandatory and has to be an array or nodelist. The callback is mandatory and has to be a function.
`forIn(<object>,<callback>);` | The forIn() method executes a provided function once for each object property. The object parameter is mandatory and has to be an object (not array and nodelist). The callback is mandatory and has to be a function.
`mapIn(<object>,<callback>);` | The mapIn() method creates a new object with the results of calling a provided function on each object property. The object parameter is mandatory and has to be an object (not array and nodelist). The callback is mandatory and has to be a function.

__Sample code:__

    var arr1 = [1,2,3];
    forEach ( arr1, function (v) { alert( v*2 ); } );
    // 2, 4, 6
    
    var arr1 = [1,2,3];
    each ( arr1, function (v) { alert( v*2 ); } );
    // 2, 4, 6
    
    var arr2a = [1,2,3];
    var arr2b = map ( arr2a, function (v) { return v*3; } );
    alert(arr2a+"\n"+arr2b);
    // 1,2,4 \n 3,6,9
    
    var o1 = {a:1,b:2,c:3};
    forIn ( o1, function (v) { alert( v*4 ); } );
    //4, 8, 12
    
    var o2a = {a:1,b:2,c:3};
    var o2b = mapIn(o2a, function(v) { return v*5; } );
    alert(o2a.a+"  "+o2a.b+"  "+o2a.c+"  "+"\n"+o2b.a+"  "+o2b.b+"  "+o2b.c);
    // 1  2  3 \n 5  10  15

Name | Description
---- | -----------
`toArray(<object>);` | Convert an object (array like objects) to array or clone an array. This function is same as the `Array.from`, if that is available. If not, then the `Array.prototype.slice` will be called. 
`toObject(<array>);` | Convert an array to iterable object.

### AJAX and CORS

__Main version__: These functions are available in the `Celestra` and/or `_` objects.

Example: `_.getJson()`

__FP version:__ These functions are available in the global namespace (`window`).

Name | Description
---- | -----------
`getJson (<url>,<success>);` | Get JSON content via AJAX. A shorthand function to the getAjax() function.
`getText (<url>,<success>);` | Get TEXT content via AJAX. A shorthand function to the getAjax() function.
`getAjax (<url>,<format>,<success>[,error][,user<,password>]);` | Get content via AJAX.
`postAjax (<url>,<data>,<format>,<success>[,error][,user<,password>]);` | Post data and get the response content via AJAX.
`getCors (<url>,<format>,<success>[,error][,user<,password>]);` | Get content via cross domain AJAX.
`postCors (<url>,<data>,<format>,<success>[,error][,user<,password>]);` | Post data and get the response content via cross domain AJAX.

__Parameters:__

  - The url is mandatory and has to be a string.
  - The data is mandatory in the `postAjax` and `postCors` functions and has to be a string.
  - The format is mandatory and has to be a string: "text"/"json"/"xml". If any other value is set, then the default "text" content is requested.
  - The success is mandatory and has to be a function.
  - The error is optional and has to be a function.
  - The user is optional and has to be a string.
  - The password is optional, but mandatory if the user is set. This parameter has to be a string.

### Type checking functions

__Main version__: These functions are available in the `Celestra` and/or `_` objects.

Example: `_.isString()`

__FP version:__ These functions are available in the global namespace (`window`).

Name | Description
---- | -----------
`isString(<value>);` | This function determines whether the provided value is a string. The return value is boolean.
`isChar(<value>);` | This function determines whether the provided value is a string with length 1 character. The return value is boolean.
`isNumber(<value>);` | This function determines whether the provided value is a number. The return value is boolean.
`isInteger(<value>);` | Same as `Number.isInteger()`. This function determines whether the provided value is an integer number. The return value is boolean.
`isFloat(<value>);` | This function determines whether the provided value is a float number. The return value is boolean.
`isBoolean(<value>);` | This function determines whether the provided value is a boolean. The return value is boolean.
`isObject(<value>);` | This function determines whether the provided value is an object. The return value is boolean.
`isEmptyObject(<value>);` | This function determines whether the provided value is an empty object (without properties). The return value is boolean.
`isFunction(<value>);` | This function determines whether the provided value is a function. The return value is boolean.
`isArray(<value>);` | Same as `Array.isArray()`. This function determines whether the provided value is an array. The return value is boolean.
`isEmptyArray(<value>);` | This function determines whether the provided value is an empty array (without values). The return value is boolean.
`isArraylike(<value>);` | This function determines whether the provided value is an iterable object. The return value is boolean.
`isNull(<value>);` | This function determines whether the provided value is null. The return value is boolean.
`isUndefined(<value>);` | This function determines whether the provided value is undefined. The return value is boolean.
`isNullOrUndefined(<value>);` | This function determines whether the provided value is null or undefined. The return value is boolean.
`isPrimitive(<value>);` | This function determines whether the provided value is not null, not object and not function. The return value is boolean.
`isSymbol(<value>);` | `ES6` This function determines whether the provided value is a symbol. The return value is boolean.
`isMap(<value>);` | `ES6` This function determines whether the provided value is a map. The return value is boolean.
`isSet(<value>);` | `ES6` This function determines whether the provided value is a set. The return value is boolean.

### Polyfills

Name | Description
---- | -----------
`Array.from()` | The Array.from() method creates a new Array instance from an array-like or iterable object.
`Array.of()` | The Array.of() method creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.
`Object.create()` | The Object.create() method creates a new object with the specified prototype object and properties.
`Object.assign()` | The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
`ChildNode.after()` | The ChildNode.after() method inserts a set of Node or DOMString objects in the children list of this ChildNode's parent, just after this ChildNode. DOMString objects are inserted as equivalent Text nodes.
`ChildNode.before()` | The ChildNode.before method inserts a set of Node or DOMString objects in the children list of this ChildNode's parent, just before this ChildNode. DOMString objects are inserted as equivalent Text nodes.
`ChildNode.remove()` | The ChildNode.remove() method removes the object from the tree it belongs to.
`ChildNode.replaceWith()` | The ChildNode.replaceWith() method replaces this ChildNode in the children list of its parent with a set of Node or DOMString objects. DOMString objects are inserted as equivalent Text nodes.
`ParentNode.append()` | The ParentNode.append method inserts a set of Node objects or DOMString objects after the last child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
`ParentNode.prepend()` | The ParentNode.prepend method inserts a set of Node objects or DOMString objects before the first child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
`Array.prototype.includes()` | The includes() method determines whether an array includes a certain element, returning true or false as appropriate.
`String.prototype.includes()` | The includes() method determines whether one string may be found within another string, returning true or false as appropriate.
`NodeList.prototype.forEach()` | The forEach() method of the NodeList interface calls the callback given in parameter once for each value pair in the list, in insertion order.
`Number.MIN_SAFE_INTEGER` | The Number.MIN_SAFE_INTEGER constant represents the minimum safe integer in JavaScript (-(253 - 1)). (-9007199254740991)
`Number.MAX_SAFE_INTEGER` | The Number.MAX_SAFE_INTEGER constant represents the maximum safe integer in JavaScript (253 - 1). (9007199254740991)
`Number.EPSILON` | The Number.EPSILON property represents the difference between 1 and the smallest floating point number greater than 1. (2.220446049250313e-16)
`Number.isNaN()` | The Number.isNaN() method determines whether the passed value is NaN and its type is Number. It is a more robust version of the original, global isNaN().
`isNaN()` | The isNaN() function determines whether a value is NaN or not. Note: coercion inside the isNaN function has interesting rules; you may alternatively want to use Number.isNaN(), as defined in ECMAScript 2015.
`Number.isInteger()` | The Number.isSafeInteger() method determines whether the provided value is a number that is a safe integer.
`Number.isFinite()` | The Number.isFinite() method determines whether the passed value is a finite number.
`Number.isSafeInteger()` | The Number.isSafeInteger() method determines whether the provided value is a number that is a safe integer.

## Samples

There are code samples in the __celestra.html__.

## License

https://opensource.org/licenses/MIT

MIT License

SPDX short identifier: MIT

Copyright (c) 2017 Ferenc Czigler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
