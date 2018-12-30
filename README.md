    
        ___  ____  __    ____  ___  ____  ____    __     
       / __)( ___)(  )  ( ___)/ __)(_  _)(  _ \  /__\    
      ( (__  )__)  )(__  )__) \__ \  )(   )   / /(__)\   
       \___)(____)(____)(____)(___/ (__) (_)\_)(__)(__)  
    

# Celestra

## Download

__A helper JavaScript library with useful functions and ES6 polyfills.__

Tested on desktop browsers (latest Chrome, latest Firefox, latest Edge, IE11) and mobile devices (iOS Safari, Chrome, Firefox and Android Chrome, Samsung Internet, Firefox, Edge and W10M Edge 14).

Latest version: 2.2.2

Date: 2018-12-31T19:26:48.358Z

The functions are available in the `celestra` and/or `_` object.

Development version: celestra.js (46491 bytes)

Minimal version: celestra.min.js (35301 bytes)

CommonJS (`celestra`) and AMD (`{ celestra: celestra }`) compatible, but isn't compatible with Node.JS.

If the `_` global variable is used before the loading of the library, then the value of the variable is saved and you can restore with the `noConflict();` function.


### Cheatsheets

Celestra cheatsheet: celestra-cheatsheet.pdf

JavaScript cheatsheet: js-cheatsheet.pdf


### Demo pages

RPG dice roller: testgame.html

Demo plugin documentation: celestra-demo-plugin.html

Demo plugin source: celestra-demo-plugin.js


### Celestra Unit Tester (CUT)

Celestra test results: unittest.html


## How to clone

    $ git clone https://github.com/Serrin/Celestra/


## Functions

### Core API

These functions are available in the `celestra` and/or `_` objects.

Example: `_.qsa()`

Name | Description
---- | -----------
`celestra.version;` | The library version.
`celestra.noConflict();` | Restore the previous `_` object value and return the `celestra` object to create a new alias. Tip: You can make a new alias without this function too. Example: `var _cel = celestra;`
`qsa(<selector>[,context]);` | Get matched HTML elements in an array. The context is optional and can be an element or a selector string.
`qsa(<selector>[,context]).each( fn (el, i) { el.arguments; } );` | Exec a function on all elements.
`qs(<selector>[,context]).argument;` | Get the first matched HTML element. The context is optional and can be an element or a selector string.
`domReady(<fn>);` | Set the document ready (content fully loaded) event.
`inherit(<subclass>,<superclass>);` | Prototype inheritance.
`random([max]);` | Get a random number value within 0 and max value. Without parameter the maximum value is 100.
`random(<min>,<max>);` | Get a random number value within min and max value.
`randomString([length[,specialCharactersEnabled]]);` | Generate a random string. The length parameter is optional and can be a number and the default value is 100. The specialCharactersEnabled parameter is optional and can be a boolean and the default value is false. Return the generated string.
`b64Encode(<string>);` | Unicode compatible string to base64 converter. Return the encoded string.
`b64Decode(<string>);` | Unicode compatible base64 to string converter. Return the original string.
`javaHash(<data>[,hexa]);` | Java `String.hashCode()` implementation in Javascript - this is a non-cryptographic hash function. The data parameter is mandatory and can be any type. The hexa parameter is optional and can be a boolean and sets the hexadecimal conversion of the return value and the default value is false. Return the generated integer hash.
`getScript(<url>[,success]);` | Load a JavaScript file and then execute it. The url parameter is mandatory and has to be a string. The success is optional and can be a function. <br/> __Tip:__ To prevent the caching of a js/css file use versioning in the file url. Example: `mylib.js?version=1.10.0`
`getScripts(<scripts>);` | Load more JavaScript files (modules) and then execute it. The scripts parameter is mandatory and has to be an array with object elements. The element.url property is mandatory and has to be a string. The element.success property is optional and can be a function.
`getStyle(<href>[,success]);` | Load a CSS file. The href parameter is mandatory and has to be a string. The success is optional and can be a function.
`getStyles(<styles>);` | Load more CSS files (modules). The styles parameter is mandatory and has to be an array with object elements. The element.href property is mandatory and has to be a string. The element.success property is optional and can be a function.
`getUrlVar([name]);` | Get the value of a url search variable or all url variables in an object from the `document.location.search`. The variable name is optional and can be a string.
`getUrlVarFromString(<querystr>[,name]);` | Get the value of a url search variable or all url variables in an object from a querystring. The variable name is optional and can be a string.
`obj2string(<object>);` | Convert object to a querystring. The return value is the string. The object parameter is mandatory.
`getType(<variable>[, type]);` | Get the type of a variable. If this is an object, then the return value is the detailed object type (e.g.: array). If the type (string) parameter is given, then the return value (boolean) is the equality of the type of the variable and the second parameter.
`merge([deep,]<target>,<source1>, ...sources);` | Merge two or more arrays or push any values in the target array. The return value is the target array. The deep (flat) parameter (boolean) is optional and sets the deep merge (recursive) of the sources.
`extend([deep,]<target>,<source1>, ...sources);` | This is an enhanced version of the `Object.assign` method. The deep parameter (boolean) is optional and sets the deep copy (recursive) of the sources. __Note:__ From the v1.19.2 this function uses the ´hasOwnProperty´ method.
`deepAssign(<target>,<source1>, ...sources);` | This is another enhanced version of the `Object.assign` method and create an always deep copy (recursive) of the sources.
`getFullscreen();` | Get the fullscreen element. If this isn't set, then the return value is undefined. Please check the incompatibility issues on the [http://caniuse.com/#search=fullscreen](http://caniuse.com/#search=fullscreen) page.
`setFullscreenOn(<selector>);` | Set the fullscreen element. The selector can be a css selector string or an element.
`setFullscreenOff();` | Set off the fullscreen.
`getLocation(<success>[,error]);` | Get the current location as an object with the coordinates. The success is mandatory and has to be a function. The error is optional and can be a function.
`getDoNotTrack();` | Return the DoNotTrack setting (boolean) of the browser.
`form2array(<form>);` | Convert (serialize) form input tag names and values to an array with object elements (name and value properties). The return value is the array. The form parameter is mandatory and has to be a html form element. __The result has changed in v1.21.0: The array elements are objects instead of strings.__
`form2string(<form>);` | Convert (serialize) form input tag names and values to a query string. The return value is the string. The form parameter is mandatory and has to be a html form element.
`removeTags(<string>);` | Remove HTML tags from a string. The return value is the shorter string.
`createFile(<filename>,<content>[,dataType]);` | Create and save file without a server. The filename and content parameters are mandatory and have to be a string. The dataType parameter is optional and can to be a string. The default value of the dataType parameter is "_text/plain_". ___Doesn't work in iOS browsers (Safari, Firefox and Chrome) and W10M Edge 14.___


### DOM functions

These functions are available in the `celestra` and/or `_` objects.

Example: `_.domCreate()`

Name | Description
---- | -----------
`domCreate(<type>[,properties[,innerHTML]]);` | Create a new HTML element. The type is mandatory and has to be a string. The properties object is optional and sets the element properties. (class, __style object/string - since v2.0.5 - in IE11 and W10M Edge 14 the style string doesn't work__, data-*, etc.) The innerHTML is optional and can be a string.
`domCreate(<element descriptive object>);` | Since v2.0.5, a new element can be created with an object. In this case the element descriptive object is mandatory. The `style` can be a subobject or a string. __In IE11 and W10M Edge 14 the style string doesn't work.__ __Sample code:__ `_.domCreate({elementType: "a", href: "https://developer.mozilla.org/en-US/", target: "_blank", style: {"background-color": "red", "color": "white"}, innerHTML: "MDN Sample url"});`
`domToElement(<htmlString>);` | This function returns a HTML element which is created from the htmlString parameter. The htmlString parameter is mandatory and has to be a string.
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
`domSiblings(<element>);` | Get the siblings of an element in an array. The element parameter is mandatory and the return value is the array.


### Functional programming

These functions are available in the `celestra` and/or `_` objects.

Example: `_.toFunction()`

Name | Description
---- | -----------
`toFunction(<function>);` | Return a "detach" function from an object method. The first parameter of the returned function will be the context object.
`bind(<function>,<context>);` | Returns a function that is bound to a context. Both of the parameters are mandatory.
`hasOwn(<object>,<property>);` | Returns the object parameter has the specified property as its own property. Both of the parameters are mandatory and the property has to be string. The return value is boolean.
`tap(<object>,<callback>);` | Call the callback function with the object as parameter and return the object. Both of the parameters are mandatory and the callback has to be function.
`forEach(<collection>,<callback>);` | The forEach() method executes a provided function once for each collection element. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function. __From the v2.2.0 these collection types are supported: Array (ES5, own forEach(), return as Array), Nodelist (ES5, as Array, return as Array), custom array-like objects (ES5, as Array, return as Array), String (ES5, as Array, return as String), Map (ES6, own forEach(), return as Map), Set (ES6, own forEach(), return as Set), ES6 iterators (ES6, as Array, return as Array)__
`map(<collection>,<callback>);` | The map() method creates a new collection with the results of calling a provided function on every element in the calling collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function. __From the v2.2.0 these collection types are supported: Array (ES5, return as Array), Nodelist (ES5, return as Array), custom array-like objects (ES5, return as Array), String (ES5, return as String), Map (ES6, return as Map), Set (ES6, return as Set) and ES6 iterators (ES6, return as Array)__
`forIn(<object>,<callback>);` | The forIn() method executes a provided function once for each object property. The object parameter is mandatory and has to be an object (not array and nodelist). The callback parameter is mandatory and has to be a function. _The parameter function will be called with these arguments: key value, key, object._ __Note: From the v2.2.1 the return value is the object parameter.__
`mapIn(<object>,<callback>);` | The mapIn() method creates a new object with the results of calling a provided function on each object property. The object parameter is mandatory and has to be an object (not array and nodelist). The callback parameter is mandatory and has to be a function. _The parameter function will be called with these arguments: key value, key, object._
`forOf(<collection>,<callback>);` | This function is the faster, __ES6__ variant of the function `forEach(<collection>,<callback>);`. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function. The return value is always array and use the `Array#forEach()` method.
`mapOf(<collection>,<callback>);` | This function is the faster, __ES6__ variant of the function `map(<collection>,<callback>);`. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function. The return value is always array and use the `Array#map()` method.
`arrayClear(<array>);` | Clear the array and returns the empty array. The array parameter is mandatory.
`arrayRemove(<array>,<value>);` | Remove the first or all equivalent values from the array. Returns true, when the value was found and false when not found. The array and value parameters are mandatory. The all parameter is optional and has to be a boolean.
`uniqueArray(<value>);` | This function returns a new array with unique values. The value parameter is mandatory and can be any type, that can be converted to array. In modern browsers you can use ES6 types too (Map, Set and iterators).
`uniquePush(<array>,<value>);` | Push the value to the array if the array doesn't contain the value. The return value is true, when the value is added and false, when not added.
`constant(<value>);` | A one time assignment function to create a constant value in ES5. This returns a function, which returns the given value. (In math: `f(x)=x`)
`identity(<value>);` | Return the given value. (In math: `f(x)=x`)
`noop();` | It's an empty function (no operation) that returns undefined and usable for optional callback arguments.
`T();` | This function returns true.
`F();` | This function returns False.


### AJAX and CORS

These functions are available in the `celestra` and/or `_` objects.

Example: `_.getJson()`

Name | Description
---- | -----------
`getJson(<url>,<success>);` | Get JSON content via AJAX. A shorthand function to the getAjax() function.
`getText(<url>,<success>);` | Get TEXT content via AJAX. A shorthand function to the getAjax() function.
`getAjax(<url>,<format>,<success>[,error[,user,<password>]]);` | Get content via AJAX.
`postAjax(<url>,<data>,<format>,<success>[,error[,user,<password>]]);` | Post data and get the response content via AJAX.
`getCors(<url>,<format>,<success>[,error[,user,<password>]]);` | Get content via cross domain AJAX.
`postCors(<url>,<data>,<format>,<success>[,error[,user,<password>]]);` | Post data and get the response content via cross domain AJAX.

__Parameters:__

  - The url is mandatory and has to be a string.
  - The data is mandatory in the `postAjax` and `postCors` functions and has to be a string.
  - The format is mandatory and has to be a string: "text"/"json"/"xml". If any other value is set, then the default "text" content is requested.
  - The success is mandatory and has to be a function.
  - The error is optional and has to be a function.
  - The user is optional and has to be a string.
  - The password is optional, but mandatory if the user is set. This parameter has to be a string.

### Type checking functions

These functions are available in the `celestra` and/or `_` objects.

Example: `_.isString()`

Name | Description
---- | -----------
`isEqual(<value1>,<value2>);` | This function checks the value equality and type equality of the given values/objects. Can check the `NaN` objects too. The return value is boolean and both of the parameters are mandatory. __Note: Works only with ES5 types. Please use the `Array.from()` or the `spread syntax` to convert Map and Set types to Array!__
`isString(<value>);` | This function determines whether the provided value is a string. The return value is boolean.
`isChar(<value>);` | This function determines whether the provided value is a string with length 1 character. The return value is boolean.
`isNumber(<value>);` | This function determines whether the provided value is a number. The return value is boolean.
`isInteger(<value>);` | Same as `Number.isInteger()`. This function determines whether the provided value is an integer number. The return value is boolean.
`isFloat(<value>);` | This function determines whether the provided value is a float number. The return value is boolean.
`isNumeric(<value>);` | This function determines whether the provided value is a number or can be converted to number. The return value is boolean.
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
`isWeakMap(<value>);` | `ES6` This function determines whether the provided value is a weakmap. The return value is boolean.
`isWeakSet(<value>);` | `ES6` This function determines whether the provided value is a weakset. The return value is boolean.
`isIterator(<value>);` | `ES6` This function determines whether the provided value is an iterator. The return value is boolean. ___Doesn't work in W10M Edge 14.___
`isDate(<value>);` | This function determines whether the provided value is a date. The return value is boolean.
`isRegexp(<value>);` | This function determines whether the provided value is a regexp. The return value is boolean.
`isElement(<value>);` | This function determines whether the provided value is a HTML element. The return value is boolean.

### Cookie functions

These functions are available in the `celestra` and/or `_` objects.

Example: `_.setCookie()`

Name | Description
---- | -----------
`setCookie(<name>,<value>[,hours[,path[,domain[,secure[,HttpOnly]]]]]);` | Set a cookie. The name is mandatory and has to be a string. The value is mandatory and has to be a string. The hours is the expire value and optional and can be a number. The path is optional and can be a string. __Note:__ From the v1.19.1 the default path is the entire site (`"/"`). To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The HttpOnly is optional and can be a boolean.
`getCookie([name]);` | Get a cookie value or all cookies in an object. With the name parameter (string) the return value is the current cookie value or null. Without the parameter the return value is an object with the values or an empty object.
`hasCookie(<name>);` | This function determines whether the cookie is set with the name. The return value is boolean.
`removeCookie(<name>[,path[,domain[,secure[,HttpOnly]]]]);` | Remove a cookie. The name is mandatory and has to be a string. The path is optional and can be a string. __Note:__ From the v1.19.1 the default path is the entire site (`"/"`). To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The HttpOnly is optional and can be a boolean. The return value (boolean) is determines whether the cookie was set with the name before the removing.

### Polyfills

Name | Description
---- | -----------
`Array.from()` | The Array.from() method creates a new Array instance from an array-like or iterable object.
`Array.of()` | The Array.of() method creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.
`Array.prototype.fill()` | The fill() method fills all the elements of an array from a start index to an end index with a static value. The end index is not included.
`Array.prototype.find()` | The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.
`Array.prototype.findIndex()` | The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise -1 is returned.
`Object.create()` | The Object.create() method creates a new object with the specified prototype object and properties.
`Object.assign()` | The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
`ChildNode.after()` | The ChildNode.after() method inserts a set of Node or DOMString objects in the children list of this ChildNode's parent, just after this ChildNode. DOMString objects are inserted as equivalent Text nodes.
`ChildNode.before()` | The ChildNode.before method inserts a set of Node or DOMString objects in the children list of this ChildNode's parent, just before this ChildNode. DOMString objects are inserted as equivalent Text nodes.
`ChildNode.remove()` | The ChildNode.remove() method removes the object from the tree it belongs to.
`ChildNode.replaceWith()` | The ChildNode.replaceWith() method replaces this ChildNode in the children list of its parent with a set of Node or DOMString objects. DOMString objects are inserted as equivalent Text nodes.
`ParentNode.append()` | The ParentNode.append method inserts a set of Node objects or DOMString objects after the last child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
`ParentNode.prepend()` | The ParentNode.prepend method inserts a set of Node objects or DOMString objects before the first child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
`Element.prototype.toggleAttribute()` | Toggle a boolean attribute (removing it if it is present and adding it if it is not present) on the specified element.
`Array.prototype.includes()` | The includes() method determines whether an array includes a certain element, returning true or false as appropriate.
`String.prototype.includes()` | The includes() method determines whether one string may be found within another string, returning true or false as appropriate.
`String.prototype.trimStart()` | The trimStart() method removes whitespace from the beginning of a string.
`String.prototype.trimLeft()` | Alias of the String.prototype.trimStart() method.
`String.prototype.trimEnd()` | The trimEnd() method removes whitespace from the end of a string.
`String.prototype.trimRight()` | Alias of the String.prototype.trimEnd() method.
`String.prototype.startsWith()` | The startsWith() method determines whether a string begins with the characters of a specified string, returning true or false as appropriate.
`String.prototype.endsWith()` | The endsWith() method determines whether a string ends with the characters of a specified string, returning true or false as appropriate.
`String.prototype.padStart()` | The padStart() method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start (left) of the current string.
`String.prototype.padEnd()` | The padEnd() method pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length. The padding is applied from the end (right) of the current string.
`String.prototype.repeat()` | The repeat() method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.
`NodeList.prototype.forEach()` | The forEach() method of the NodeList interface calls the callback given in parameter once for each value pair in the list, in insertion order.
`Object.values()` | The Object.values() method returns an array of a given object's own enumerable property values, in the same order as that provided by a for...in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
`Object.entries()` | The Object.entries() method returns an array of a given object's own enumerable property [key, value] pairs, in the same order as that provided by a for...in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).
`Object.is()` | The Object.is() method determines whether two values are the same value.
`Object.fromEntries()` | The Object.fromEntries() method transforms a list of key-value pairs into an object. __Stage 3 proposal - https://tc39.github.io/proposal-object-from-entries/#sec-object.fromentries__ __Celestra Object.fromEntries() polyfill supports only Array and Map parameters in the modern browsers.__ __In IE11 only the Array parameter is supported.__
`Array.prototype.flat()` | __Stage 3 Draft / May 23, 2018 - ES2019 candidate__ - The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
`Array.prototype.flatMap()` | __Stage 3 Draft / May 23, 2018 - ES2019 candidate__ - A new array with each element being the result of the callback function and flattened to a depth of 1.
`Element.prototype.closest()` | The Element.closest() method returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter. If there isn't such an ancestor, it returns null.
`Element.prototype.matches()` | The Element.matches() method returns true if the element would be selected by the specified selector string; otherwise, returns false.
`Element.prototype.getAttributeNames()` | Element.getAttributeNames() returns the attribute names of the element as an Array of strings. If the element has no attributes it returns an empty array. Using getAttributeNames() along with getAttribute(), is a memory efficient and performant alternative to accessing Element.attributes.
`Object.getOwnPropertyDescriptors()` | The Object.getOwnPropertyDescriptors() method returns all own property descriptors of a given object.
`Array.prototype.copyWithin()` | The copyWithin() method shallow copies part of an array to another location in the same array and returns it, without modifying its size.
`String.fromCodePoint()` | The static String.fromCodePoint() method returns a string created by using the specified sequence of code points.
`String.prototype.codePointAt()` | The codePointAt() method returns a non-negative integer that is the Unicode code point value.
`Number.MIN_SAFE_INTEGER` | The Number.MIN_SAFE_INTEGER constant represents the minimum safe integer in JavaScript (-(253 - 1)). (-9007199254740991)
`Number.MAX_SAFE_INTEGER` | The Number.MAX_SAFE_INTEGER constant represents the maximum safe integer in JavaScript (253 - 1). (9007199254740991)
`Number.EPSILON` | The Number.EPSILON property represents the difference between 1 and the smallest floating point number greater than 1. (2.220446049250313e-16)
`Number.isNaN()` | The Number.isNaN() method determines whether the passed value is NaN and its type is Number. It is a more robust version of the original, global isNaN().
`isNaN()` | The isNaN() function determines whether a value is NaN or not. __Note:__ coercion inside the isNaN function has interesting rules; you may alternatively want to use Number.isNaN(), as defined in ECMAScript 2015.
`Number.isInteger()` | The Number.isInteger() method determines whether the passed value is an integer. 
`Number.isFinite()` | The Number.isFinite() method determines whether the passed value is a finite number.
`Number.isSafeInteger()` | The Number.isSafeInteger() method determines whether the provided value is a number that is a safe integer.
`Number.parseInt()` | The Number.parseInt() method parses a string argument and returns an integer of the specified radix or base.
`Number.parseFloat()` | The Number.parseFloat() method parses a string argument and returns a floating point number. This method behaves identically to the global function parseFloat() and is part of ECMAScript 2015 (its purpose is modularization of globals).
`Math ES6` | `Math.acosh();`, `Math.asinh();`, `Math.atanh();`, `Math.cbrt();`, `Math.clz32();`, `Math.cosh();`, `Math.expm1();`, `Math.fround();`, `Math.hypot();`, `Math.imul();`, `Math.log1p();`, `Math.log10();`, `Math.log2();`, `Math.sign();`, `Math.sinh();`, `Math.tanh();`, `Math.trunc();` - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
`window.screenLeft` | The Window.screenLeft read-only property returns the horizontal distance, in CSS pixels, from the left border of the user's browser viewport to the left side of the screen. The screenLeft is an alias of the older Window.screenX property. screenLeft was originally supported only in IE but was introduced everywhere due to popularity.
`window.screenTop` | The Window.screenTop read-only property returns the vertical distance, in CSS pixels, from the top border of the user's browser viewport to the top side of the screen. The screenTop is an alias of the older Window.screenY property. screenTop was originally supported only in IE but was introduced everywhere due to popularity.
`globalThis` | A Stage 3 feature at TC39 is the "global" property of the global object, a writable, configurable, non-enumerable alias of window/self.  For more information please read these pages: https://tc39.github.io/proposal-global/ and https://github.com/tc39/proposal-global

## Samples

There are code samples in the __celestra.html__ and __unittest.js__.

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
