    
        ___  ____  __    ____  ___  ____  ____    __     
       / __)( ___)(  )  ( ___)/ __)(_  _)(  _ \  /__\    
      ( (__  )__)  )(__  )__) \__ \  )(   )   / /(__)\   
       \___)(____)(____)(____)(___/ (__) (_)\_)(__)(__)  
    

# Celestra

## Download

__A helper library for those who like the Vanilla JS.__
__Just a few functions and ES6 polyfills.__

Tested on desktop browsers (latest Chrome, latest Firefox, latest Edge, IE11) and mobile devices (iOS Safari, Chrome, Firefox and Android Chrome, Samsung Internet, Firefox, Edge and W10M Edge 14).

Latest version: 2.1.1

Date: 2018-12-01T19:28:47.304Z

The functions are available in the `celestra` and/or `_` object.

Development version: celestra.js (43327 bytes)

Minimal version: celestra.min.js (32712 bytes)

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
`constant(<value>);` | A one time assignment function to create a constant value in ES5. This returns a function, which returns the given value. (In math: `f(x)=x`)
`identity(<value>);` | Return the given value. (In math: `f(x)=x`)
`noop();` | It's an empty function (no operation) that returns undefined and usable for optional callback arguments.
`removeTags(<string>);` | Remove HTML tags from a string. The return value is the shorter string.
`createFile(<filename>,<content>[,dataType]);` | Create and save file without a server. The filename and content parameters are mandatory and have to be a string. The dataType parameter is optional and can to be a string. The default value of the dataType parameter is "_text/plain_". ___Doesn't work in iOS browsers (Safari, Firefox and Chrome) and W10M Edge.___

### DOM functions

These functions are available in the `celestra` and/or `_` objects.

Example: `_.domCreate()`

Name | Description
---- | -----------
`domCreate(<type>[,properties[,innerHTML]]);` | Create a new HTML element. The type is mandatory and has to be a string. The properties object is optional and sets the element properties. (class, __style object/string - since v2.0.5 - in IE11 and W10M Edge 14 the style string doesn't work__, data-*, etc.) The innerHTML is optional and can be a string.
`domCreate(<element descriptive object>);` | Since v2.0.5, a new element can be created with an object. In this case the element descriptive object is mandatory. The `style` can be a subobject or a string. __In IE11 and W10M Edge 14 the style string doesn't work.__ __Sample code:__ `_.domCreate({elementType: "a", href: "https://developer.mozilla.org/en-US/", target: "_blank", style: {"background-color": "red", "color": "white"}, innerHTML: "MDN Sample url"});`
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

These functions are available in the `celestra` and/or `_` objects.

Example: `_.toFunction()`

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
`hasOwn(<object>,<property>);` | Return the object parameter has the specified property as its own property. Both of the parameters are mandatory and the property has to be string. The return value is boolean.

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

    var o1 = { a: 1 };
    var o2 = Object.create(o1);
    o2.b = 2;

    alert("o1.a="+o1.a+" - " + hasOwn(o1,"a") + " - true"
    + "\r\no2.a=" + o2.a+" - " + hasOwn(o2,"a") + " - false"
    + "\r\no2.b=" + o2.b+" - " + hasOwn(o2,"b") + " - true");
    
    
Name | Description
---- | -----------
`toArray(<object>);` | __DEPRECATED in v2.1.1__ __Please use the `Array.from()` instead of this!__ Convert an object (array like objects) to array or clone an array. This function is same as the `Array.from`, if that is available. If not, then the `Array.prototype.slice` will be called.
`toObject(<array>);` | __DEPRECATED in v2.1.1__ Convert an array to iterable object.

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
