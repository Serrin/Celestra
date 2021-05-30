````
        ___  ____  __    ____  ___  ____  ____    __
       / __)( ___)(  )  ( ___)/ __)(_  _)(  _ \  /__\
      ( (__  )__)  )(__  )__) \__ \  )(   )   / /(__)\
       \___)(____)(____)(____)(___/ (__) (_)\_)(__)(__)

````

# Celestra


## Download

__A helper JavaScript library with useful functions and polyfills.__

Tested on desktop browsers (latest Firefox, latest Chrome, latest stable Chromium based Edge) and mobile devices (iOS Safari, Chrome, Firefox and Android Chrome, Samsung Internet, Firefox, Edge). This library isn't compatible with the Node.JS.

Latest version: 4.0.0

Date: 2021-05-29T19:52:18.504Z

The functions are available in the `celestra` and/or `_` object.

Development version: __celestra.js__ (38379 bytes)

Minified version: __celestra.min.js__ (28924 bytes)

ESM (ECMAScript 6 module) version: __celestra.esm.js__ (28780 bytes)

DEV and MIN version: If the `_` global variable is used before the loading of the library, then the value of the variable is saved and you can restore with the `noConflict();` function.


### Removed polyfills

Development version: __celestra-polyfills.js__ (18019 bytes)

Minified version: __celestra-polyfills.min.js__ (11516 bytes)


### Cheatsheets

Celestra cheatsheet: __celestra-cheatsheet.pdf__

JavaScript cheatsheet: __js-cheatsheet.pdf__


### Demo pages

RPG dice roller: __testgame.html__

CORS testpage: __testcors.html__

Demo plugin documentation: __celestra-demo-plugin.html__

Demo plugin source: __celestra-demo-plugin.js__


### Celestra Unit Tester (CUT)

Test results for minimized version: __unittest.min.html__

Test results for ESM version: __unittest.esm.html__

Test results for development version: __unittest.dev.html__


### How to import the ESM version

````javascript
<script type="module">

// import the celestra object
import { celestra } from "./celestra.esm.js";
window.celestra = celestra;
window._ = celestra;

// import with default with name
import { default as celestra } from "./celestra.esm.js";
window.celestra = celestra;
window._ = celestra;

// import with default export
import defaultExport from "./celestra.esm.js";
window.celestra = defaultExport;
window._ = defaultExport;

</script>
````


### Celestra v3.0.0 (Hera) changes

- Only modern browsers (ES6+) are supported. The Internet Explorer 11 and W10M Edge have been removed from the supported browsers.

- If you would like to use Celestra with older browsers, then you can download the latest v2.x version here: https://github.com/Serrin/Celestra/releases

- The library sources have been merged and all of the ES6E functions are available in the __celestra.js__ and __celestra.min.js__.

- Many functions have been deprecated or removed.


### Celestra v3.6.0 (Galactica) changes

- CommonJS and AMD module compatibility have been removed.

- In the ESM (ECMAScript 6 module) version only the whole celestra object is exported as default export and as standalone object.

- Many functions have been deprecated or removed.


## How to clone


    $ git clone https://github.com/Serrin/Celestra/



## Functions

### Core API

These functions are available in the `celestra` and/or `_` objects.

Example: `_.randomInt()`

Name | Description
---- | -----------
`celestra.VERSION;` | The library version.
`celestra.noConflict();` | Restore the previous `_` object value and return the `celestra` object to create a new alias. __Tip: You can make a new alias without this function too. Example: `var _cel = celestra;`__ __In the ESM version only returns the celestra object.__
`delay(<ms>).then(<callback>);` | A promise based delay function. The ms (milliseconds) parameter is mandatory and have to be an integer. __Sample:__ `_.sleep(5000).then(() => alert("5 seconds")).catch(console.log.bind(console)).finally(() => alert("done"));`
`inherit(<subclass>,<superclass>);` | Prototype inheritance.
`randomInt([max]);` | Get a random integer number value within 0 and max value. Without parameter the maximum value is 100.
`randomInt(<min>,<max>);` | Get a random integer number value within min and max value.
`randomFloat([max]);` | Get a random float number value within 0 and max value. Without parameter the maximum value is 100.
`randomFloat(<min>,<max>);` | Get a random float number value within min and max value.
`randomString([length[,specialCharactersEnabled]]);` | Generate a random string. The length parameter is optional and can be a number and the default value is 100. The specialCharactersEnabled parameter is optional and can be a boolean and the default value is false. Return the generated string.
`b64Encode(<string>);` | Unicode compatible string to base64 converter. Return the encoded string.
`b64Decode(<string>);` | Unicode compatible base64 to string converter. Return the original string.
`javaHash(<data>[,hexa]);` | Java `String.hashCode()` implementation in Javascript - this is a non-cryptographic hash function. The data parameter is mandatory and can be any type. The hexa parameter is optional and can be a boolean and sets the hexadecimal conversion of the return value and the default value is false. Return the generated integer hash.
`getUrlVars([str=location.search]);` | Get the values of the url variables in an object from the `location.search` _(default value)_ or another given url. The str parameter name is optional and can be a string. Example: `"?showall=true&order_by=updated&o=asc"` -> `Object { showall: "true", order_by: "updated", o: "asc" }`
`obj2string(<object>);` | Convert object to a querystring. The return value is the string. The object parameter is mandatory.
`getType(<variable>[, type]);` | Get the type of a variable. If this is an object, then the return value is the detailed object type (e.g.: array). If the type (string) parameter is given, then the return value (boolean) is the equality of the type of the variable and the second parameter.
`extend([deep,]<target>,<source1>, ...sources);` | This is an enhanced version of the `Object.assign` method. The deep parameter (boolean) is optional and sets the deep copy (recursive) of the sources.
`deepAssign(<target>,<source1>, ...sources);` | This is another enhanced version of the `Object.assign` method and create an always deep copy (recursive) of the sources.
`strRemoveTags(<string>);` | Remove HTML tags from the given string. The string parameter is mandatory. The return value is the new string.
`strReverse(<string>);` | Returns the reversed variant of the given string. In the ES6 compatible browsers the result will be unicode compatible. The string parameter is mandatory.
`strReplaceAll(<string>,<search>,<replace>);` | This functions replaces all instances of a substring in a string without use of a global regexp. All of the parameters are mandatory and will be converted to string. The return value is the modified string.
`strCodePoints(<string>);` | Returns the array of the unicode codepoints of characters of the given string. The string parameter is mandatory.
`strFromCodePoints(<collection>);` | Returns the joined string of the given unicode codepoints. The collection parameter is mandatory.
`strAt(<string>,<pos>);` | Returns the unicode character, which has to be on the given position in the string. If the position is out of the string length, then the return value is an empty string. All of the parameters are mandatory and position has to be an integer.
`forIn(<object>,<callback>);` | The forIn() function executes a provided function once for each object property. The object parameter is mandatory and has to be an object (not array and nodelist). The callback parameter is mandatory and has to be a function. The parameter function will be called with these arguments: key value, key, object.
`toFunction(<function>);` | Returns a "detach" function from an object method. The first parameter of the returned function will be the context object.
`bind(<function>,<context>);` | Returns a function that is bound to a context. Both of the parameters are mandatory.
`hasOwn(<object>,<property>);` | __REMOVED IN V4.0.0__ <br> Can be replaced with the `Object.hasOwn();` which is polyfilled in this library.
`constant(<value>);` | A one time assignment function to create a constant value in ES5. This returns a function, which returns the given value. (In math: `f(x)=x`)
`identity(<value>);` | Return the given value. (In math: `f(x)=x`)
`noop();` | It's an empty function (no operation) that returns undefined and usable for optional callback arguments.
`T();` | This function returns true.
`F();` | This function returns false.
`assert(<condition>[,message]);` | This function throws an error with the optional message if the condition is false. The condition parameter is mandatory and the message is optional and can be a string. The return value is `true`, when the test was success.
`assertLog(<condition>[,message]);` | This function logs the optional message if the condition is false. The condition parameter is mandatory and the message is optional and can be a string. The return value is `true`, when the test was success.
`assertAlert(<condition>[,message]);` | This function alerts the optional message if the condition is false. The condition parameter is mandatory and the message is optional and can be a string. The return value is `true`, when the test was success.


### DOM functions

These functions are available in the `celestra` and/or `_` objects.

Example: `_.domCreate()`

Name | Description
---- | -----------
`qsa(<selector>[,context]);` | Get matched HTML elements in an array. The context is optional and can be an element or a selector string.
`qs(<selector>[,context]);` | Get the first matched HTML element. The context is optional and can be an element or a selector string.
`domReady(<callback>);` | Set the document ready (content fully loaded) event.
`domCreate(<type>[,properties[,innerHTML]]);` | Create a new HTML element. The type is mandatory and has to be a string. The properties object is optional and sets the element properties. (class, style object/string, data-*, etc.) The innerHTML is optional and can be a string.
`domCreate(<element descriptive object>);` | Since v2.0.5, a new element can be created with an object. In this case the element descriptive object is mandatory. The `style` can be a subobject or a string. __Sample code:__ `_.domCreate({elementType: "a", href: "https://developer.mozilla.org/en-US/", target: "_blank", style: {"background-color": "red", "color": "white"}, innerHTML: "MDN Sample url"});`
`domToElement(<htmlString>);` | This function returns a HTML element which is created from the htmlString parameter. The htmlString parameter is mandatory and has to be a string.
`domGetCSS(<element>[,property]);` | Get a CSS property value of an element or all of the css properties in an object. The element is mandatory and has to be a HTML element. The property is optional and can be a string.
`domSetCSS(<element>,<property>,<value>);` | Set a CSS property value of an element. The element is mandatory and has to be a HTML element. The property is mandatory and has to be a string. The value is mandatory and has to be a string.
`domSetCSS(<element>,<properties>);` | Set CSS property values of an element. The element is mandatory and has to be a HTML element. The properties object is mandatory. The object properties can be the CSS properties and the property values will be applied to the element.
`domFadeIn(<element>[,duration[,display]]);` | Fade in and show animation for an element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms). The display is optional and can be a string (CSS display property values).
`domFadeToggle(<element>[,duration[,display]]);` | Fade in or fade out animation which depends on the state of the element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms). The display is optional and can be a string (CSS display property values).
`domFadeOut(<element>[,duration]);` | Fade out and hide animation for an element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms).
`domShow(<element>[,display]);` | Show an element. The element is mandatory and has to be a HTML element. The display is optional and can be a string (CSS display values).
`domHide(<element>);` | Hide an element. The element is mandatory and has to be a HTML element.
`domToggle(<element>[,display]);` | Show or hide an element. The element is mandatory and has to be a HTML element. The display is optional and can be a string (CSS display values).
`domIsHidden(<element>);` | This function determines whether the element is hidden. The element is mandatory and has to be a HTML element. The return value is boolean.
`domSiblings(<element>);` | Get the siblings of an element in an array. The element parameter is mandatory and the return value is the array.
`importScript(<url>[,success]);` | Load a JavaScript file and then execute it. The url parameter is mandatory and has to be a string. The success is optional and can be a function. <br/> __Tip:__ To prevent the caching of a js/css file use versioning in the file url. Example: `mylib.js?version=1.10.0`
`importScripts(<scripts>);` | Load more JavaScript files and then execute it. The scripts parameter is mandatory and has to be an array with object elements. The element.url property is mandatory and has to be a string. The element.success property is optional and can be a function.
`importScripts(<script1>[,scriptN]);` | Load more JavaScript files. The first parameter is mandatory and has to be a string. The other parameters are optional and can be a string.
`importStyle(<href>[,success]);` | Load a CSS file. The href parameter is mandatory and has to be a string. The success is optional and can be a function.
`importStyles(<styles>);` | Load more CSS files. The styles parameter is mandatory and has to be an array with object elements. The element.href property is mandatory and has to be a string. The element.success property is optional and can be a function.
`importStyles(<style1>[,styleN]);` | Load more CSS files. The first parameter is mandatory and has to be a string. The other parameters are optional and can be a string.
`form2array(<form>);` | Convert (serialize) form input tag names and values to an array with object elements (name and value properties). The return value is the array. The form parameter is mandatory and has to be a html form element.
`form2string(<form>);` | Convert (serialize) form input tag names and values to a query string. The return value is the string. The form parameter is mandatory and has to be a html form element.
`getDoNotTrack();` | Return the DoNotTrack setting (boolean) of the browser.
`getLocation(<success>[,error]);` | Get the current location as an object with the coordinates. The success is mandatory and has to be a function. The error is optional and can be a function.
`createFile(<filename>,<content>[,dataType]);` | Create and save file without a server. The filename and content parameters are mandatory and have to be a string. The dataType parameter is optional and can be a string. The default value of the dataType parameter is "_text/plain_". ___Doesn't work in iOS browsers (Safari, Firefox and Chrome) and W10M Edge 14.___
`getFullscreen();` | Get the fullscreen element. If this isn't set, then the return value is undefined. Please check the incompatibility issues on the [http://caniuse.com/#search=fullscreen](http://caniuse.com/#search=fullscreen) page.
`setFullscreenOn(<selector>);` | Set the fullscreen element. The selector can be a css selector string or an element.
`setFullscreenOff();` | Set off the fullscreen.
`domGetCSSVar(<name>);` | This function returns a value of a CSS variable or an empty string, if the variable is unset. The name parameter is mandatory and has to be a string. If the "--" characters are missing at the begin of the variable name, then the function will add these.
`domSetCSSVar(<name>,<value>);` | This function set a value of a CSS variable. Both of the parameters are mandatory and have to be a string. If the "--" characters are missing at the begin of the variable name, then the function will add these.


### AJAX and CORS

These functions are available in the `celestra` and/or `_` objects.

Example: `_.getJson()`

Name | Description
---- | -----------
`ajax(<Options object>);` | Get content and send data via AJAX and CORS.
`getJson(<url>,<success>);` | Get JSON content via AJAX. A shorthand function to the ajax() function.
`getText(<url>,<success>);` | Get TEXT content via AJAX. A shorthand function to the ajax() function.

__Options object properties:__

 - The __queryType__ is optional and can be a __string__ with these values: `"ajax"` or `"cors"`. The default value is `"ajax"`.
 - The __type__ is optional and can be a __string__ with these values: `"get"` or `"post"`. The default value is `"get"`.
 - The __url__ is mandatory and has to be a __string__.
 - The __data__ is optional and has to be a __string__ if the `type === "post"`.
 - The __format__ is optional and can be a __string__ with these values: `"text"` or `"json"` or `"xml"`. The default value is `"text"`.
 - The __success__ is mandatory and has to be a __function__.
 - The __error__ is optional and can be a __function__.
 - The __user__ is optional and can be a __string__.
 - The __password__ is optional, but mandatory if the user is set. This parameter can be a __string__.


### Type checking functions

These functions are available in the `celestra` and/or `_` objects.

Example: `_.isString()`

Name | Description
---- | -----------
`isError(<value>);` | This function determines whether the provided value is an error. The return value is boolean.
`isPromise(<value>);` | This function determines whether the provided value is a promise object. The return value is boolean.
`isSameArray(<array1>,<array2>);` | This function checks the value equality of the given arrays. The return value is boolean and both of the parameters are mandatory and have to be an array.
`isAsyncFn(<value>);` | This function determines whether the provided value is an async function. The return value is boolean.
`isGeneratorFn(<value>);` | This function determines whether the provided value is a generator function. The return value is boolean.
`isString(<value>);` | This function determines whether the provided value is a string. The return value is boolean.
`isChar(<value>);` | This function determines whether the provided value is a string with length 1 character. The return value is boolean.
`isNumber(<value>);` | This function determines whether the provided value is a number. The return value is boolean.
`isFloat(<value>);` | This function determines whether the provided value is a float number. The return value is boolean.
`isNumeric(<value>);` | This function determines whether the provided value is a number or can be converted to number. The return value is boolean.
`isBoolean(<value>);` | This function determines whether the provided value is a boolean. The return value is boolean.
`isObject(<value>);` | This function determines whether the provided value is an object. The return value is boolean.
`isEmptyObject(<value>);` | This function determines whether the provided value is an empty object (without properties). The return value is boolean.
`isFunction(<value>);` | This function determines whether the provided value is a function. The return value is boolean.
`isEmptyArray(<value>);` | This function determines whether the provided value is an empty array (without values). The return value is boolean.
`isArraylike(<value>);` | This function determines whether the provided value is an iterable object. The return value is boolean.
`isNull(<value>);` | This function determines whether the provided value is null. The return value is boolean.
`isUndefined(<value>);` | This function determines whether the provided value is undefined. The return value is boolean.
`isNullOrUndefined(<value>);` | This function determines whether the provided value is null or undefined. The return value is boolean.
`isNil(<value>);` | Alias of the `isNullOrUndefined(<value>);`.
`isPrimitive(<value>);` | This function determines whether the provided value is not null, not object and not function. The return value is boolean.
`isSymbol(<value>);` | This function determines whether the provided value is a symbol. The return value is boolean.
`isMap(<value>);` | This function determines whether the provided value is a map. The return value is boolean.
`isSet(<value>);` | This function determines whether the provided value is a set. The return value is boolean.
`isWeakMap(<value>);` | This function determines whether the provided value is a weakmap. The return value is boolean.
`isWeakSet(<value>);` | This function determines whether the provided value is a weakset. The return value is boolean.
`isIterator(<value>);` | This function determines whether the provided value is an iterator. The return value is boolean.
`isIterable(<value>);` | This function determines whether the provided value is an iterable collection. The return value is boolean.
`isDate(<value>);` | This function determines whether the provided value is a date. The return value is boolean.
`isRegexp(<value>);` | This function determines whether the provided value is a regexp. The return value is boolean.
`isElement(<value>);` | This function determines whether the provided value is a HTML element. The return value is boolean.
`isBigInt(<value>);` | This function determines whether the provided value is a BigInt. The return value is boolean.
`isArrayBuffer(<value>);` | This function determines whether the provided value is an arraybuffer. The return value is boolean.
`isTypedArray(<value>);` | This function determines whether the provided value is an typedarray. The return value is boolean.


### Cookie functions

These functions are available in the `celestra` and/or `_` objects.

Example: `_.setCookie()`

Cookie values help: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie, https://web.dev/samesite-cookies-explained

Name | Description
---- | -----------
`setCookie(<name>,<value>[,hours=8760[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]]);` | __In v3.3.0 the arguments has been changed from:__ `setCookie(<name>,<value>[,hours[,path[,domain[,secure[,HttpOnly]]]]]);` __to__ `setCookie(<name>,<value>[,hours[,path[,domain[,secure[,SameSite[,HttpOnly]]]]]]);`. Set a cookie. The name is mandatory and has to be a string. The value is mandatory and has to be a string. The hours is the expire value and optional and can be a number _(default value: 8760 = 1 year)_. The path is optional and can be a string _(default value: "/")_. To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean.
`setCookie(<Options object>);` | __In v3.7.0 added the handle of the Options object.__ In this case the names of object properties are the same as the function arguments and the default values are the same too.
`getCookie([name]);` | Get a cookie value or all cookies in an object. With the name parameter (string) the return value is the current cookie value or null. Without the parameter the return value is an object with the values or an empty object.
`hasCookie(<name>);` | This function determines whether the cookie is set with the name. The return value is boolean.
`removeCookie(<name>[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]);` | __In v3.3.0 the arguments has been changed from:__ `removeCookie(<name>[,path[,domain[,secure[,HttpOnly]]]]);` __to__ `removeCookie(<name>[,path[,domain[,secure[,SameSite[,HttpOnly]]]]]);`. Remove a cookie. The name is mandatory and has to be a string. The path is optional and can be a string _(default value: "/")_. The To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean. The return value (boolean) is determines whether the cookie was set with the name before the removing.
`removeCookie(<Options object>);` | __In v3.7.0 added the handle of the Options object.__ In this case the names of object properties are the same as the function arguments and the default values are the same too.
`clearCookies([path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]);` | __In v3.3.0 the arguments has been changed from:__ `clearCookies([path[,domain[,secure[,HttpOnly]]]]);` __to__ `clearCookies([path[,domain[,secure[,SameSite[,HttpOnly]]]]]);`. Clear all of the cookies. The path is optional and can be a string _(default value: "/")_. To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean.
`clearCookies(<Options object>);` | __In v3.7.0 added the handle of the Options object.__ In this case the names of object properties are the same as the function arguments and the default values are the same too.


### Collections

These functions are available in the `celestra` and/or `_` objects.

Example: `_.arrayUnion()`

Name | Description
---- | -----------
`partition(<collection>,<callback>);` | Returns an array, with filtered and negative filtered groups of the elements of the original collection. All of the parameters are mandatory.<br>__Example:__<br>`_.partition([-5, 2, -9, 7, 34], (e) => (e > 0) );`<br>-><br>`[[2, 7, 34], [-5, -9]]]`
`groupBy(<collection>,<callback>);` | An alias of the `partition(<collection>,<callback>);`.
`arrayUnion(<collection1>[,collectionN]);` | Returns the array of unique values including all values from the given collections. The first parameter is mandatory and all parameters can be any type of JavaScript collections. The return value is an Array.
`arrayIntersection(<collection1>,<collection2>);` | Returns the array of unique values that are in both of the given collections. All of the parameters are mandatory and can be any type of JavaScript collections. The return value is an Array.
`arrayDifference(<collection1>,<collection2>);` | Returns the array of unique values that are in the collection1, excluding the values that are also in the collection2. All of the parameters are mandatory and can be any type of JavaScript collections. The return value is an Array.
`arraySymmetricDifference(<collection1>,<collection2>);` | Returns the array of unique values that are only in one of given collections. All of the parameters are mandatory and can be any type of JavaScript collections. The return value is an Array.
`setUnion(<collection1>[,collectionN]);` | Returns the set of unique values including all values from the given collections. The first parameter is mandatory and all parameters can be any type of JavaScript collections. The return value is a Set.
`setIntersection(<set1>,<set2>);` | Returns the set of unique values that are in both of the given collections. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`setDifference(<set1>,<set2>);` | Returns the set of unique values that are in the collection1, excluding the values that are also in the collection2. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`setSymmetricDifference(<set1>,<set2>);` | Returns the set of unique values that are only in one of given collections. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`isSuperset(<superset>,<subset>);` | This function determines whether the first provided collection is superset of the second collection. The parameters are mandatory and all parameters can be any type of JavaScript collections. The return value is a boolean.
`min(<collection>);` | Returns the minimum value of the given collection. The collection parameter is mandatory and can be any type of JavaScript collections. Works with any type of values, not only with numbers.
`max(<collection>);` | Returns the maximum value of the given collection. The collection parameter is mandatory and can be any type of JavaScript collections. Works with any type of values, not only with numbers.
`arrayCycle(<collection>[,n]);` | Cycle the given collection and returns an array with these elements. The collection parameter is mandatory and can be any type of JavaScript collections. The n parameter is optional and can be an integer. Default parameter value: n = 100.
`arrayRepeat(<value>[,n]);` | Returns an array with same repeatedly elements. The value parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = 100.
`arrayRange([start=0[,end=100[,step=1]]]);` | Returns the array of values between the start and end parameters. All of the parameters are mandatory and have to be a number. Default parameter values: start = 0, end = 100, step = 1.
`zip(<collection1>[,collectionN]);` | Returns the array of paired values of the given collections. All of the parameters can be any type of JavaScript collections. In the modern browsers compatible with finite iterators. The return value is an Array. Example: `_.zip(["a","b","c","d"], [3,4,5,6,7,8,9]);` => `Array (4) [ [ "a", 3 ], [ "b", 4 ], [ "c", 5 ], [ "d", 6 ] ]`
`unzip(<collection>);` | Returns the array of arrays of unpaired values. In the modern browsers compatible with finite iterators. Example: `_.unzip([ [ "a", 3 ], [ "b", 4 ], [ "c", 5 ], [ "d", 6 ] ]);` => `Array (2) [ ["a","b","c","d"], [3,4,5,6] ]`
`arrayClear(<array>);` | Clear the array and returns the empty array. The array parameter is mandatory.
`arrayRemove(<array>,<value>[,all]);` | Remove the first or all equivalent values from the array. Returns true, when the value was found and false when not found. The array and value parameters are mandatory. The all parameter is optional and has to be a boolean.
`arrayUnique(<collection>);` | __Old name before v3.8.0:__ `uniqueArray(<value>);` <br>This function returns a new array with unique values. The value parameter is mandatory and can be any type, that can be converted to array. In modern browsers you can use ES6 types too (Map, Set and iterators).
`arrayAdd(<array>,<value>);` | __Old name before v3.8.0:__ `uniquePush(<array>,<value>);` <br>Push the value to the array if the array doesn't contain the value. The return value is true, when the value is added and false, when not added.
`arrayMerge([deep,]<target>,<source1>, ...sources);` | Merge two or more arrays or push any values in the target array. The return value is the target array. The deep (flat) parameter (boolean) is optional and sets the deep merge (recursive) of the sources.
`iterRange([start=0[,step=1[,end=Infinity]]]);` | Yield a range (counter) iterator. All of the parameters are optional. Default parameter values: start = 0, step = 1, end = Infinity.
`iterCycle(<iter>[,n]);` | Yield the items of an iterator over and over. The iter parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = Infinity __Note: PLease don't use with infinite iterators!__
`iterRepeat(<value>[,n]);` | Yield a value over and over. The value parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = Infinity
`item(<collection>,<index>);` | This function returns the item from the given collection on the given index. The collection parameter is mandatory and has to be any type of JavaScript collections. The index is mandatory and can be positive number (examples: 0 = the first item, 1 = the second item, 2 = the third item, etc.) Compatible with the Unicode strings.
`size(<collection>);` | This function returns the count of the elements in the given collection. The collection parameter is mandatory. The return value is an integer.
`sizeOf(<collection>);` | __REMOVED IN V4.0.0__
`first(<collection>);` | This function returns the first element of the given collection. The collection parameter is mandatory.
`firstOf(<collection>);` | __REMOVED IN V4.0.0__
`last(<collection>);` | This function returns the last element of the given collection. The collection parameter is mandatory.
`lastOf(<collection>);` | __REMOVED IN V4.0.0__
`reverse(<collection>);` | This function yields the elements of the given collection in reverse order. The collection parameter is mandatory.
`reverseOf(<collection>);` | __REMOVED IN V4.0.0__
`sort(<collection>);` | This function yields the elements of the given collection in sorted order. The collection parameter is mandatory.
`sortOf(<collection>);` | __REMOVED IN V4.0.0__
`includes(<collection>,<value>);` | This function determines whether a collection includes a certain value among its entries, returning true or false as appropriate. All of the parameters are mandatory.
`hasOf(<collection>,<value>);` | __REMOVED IN V4.0.0__
`find(<collection>,<callback>);` | This function returns the value of the first element in the collection that satisfies the provided testing function. Otherwise undefined is returned. All of the parameters are mandatory.
`findOf(<collection>,<callback>);` | __REMOVED IN V4.0.0__
`forEach(<collection>,<callback>);` | This function executes a provided function once for each collection element. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`forOf(<collection>,<callback>);` | __REMOVED IN V4.0.0__
`map(<collection>,<callback>);` | This function creates a new iterator with the results of calling a provided function on every element in the calling collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`mapOf(<collection>,<callback>);` | __REMOVED IN V4.0.0__
`filter(<collection>,<callback>);` | Filter and yield elements of a collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`filterOf(<collection>,<callback>);` | __REMOVED IN V4.0.0__
`slice(<collection>[,begin[,end]]);` | Take a slice of a collection and yield the elements. The collection parameter is mandatory. The begin parameter is optional and can be a number and the default value is 0. The end parameter is optional and can be a number and the default value is Infinity.
`sliceOf(<collection>[,begin[,end]]);` | __REMOVED IN V4.0.0__
`every(<collection>,<callback>);` | This function whether all elements in the collection pass the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the collection is empty, then the return value is false.
`everyOf(<collection>,<callback>);` | __REMOVED IN V4.0.0__
`some(<collection>,<callback>);` | This function tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the collection is empty, then the return value is false.
`someOf(<collection>,<callback>);` | __REMOVED IN V4.0.0__
`none(<collection>,<callback>);` | This function whether all elements in the collection do not pass the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the collection is empty, then the return value is false.
`noneOf(<collection>,<callback>);` | __REMOVED IN V4.0.0__
`concat(<collection1>[,collectionN]);` | This function merges the collections and yields the elements of the merged collection. The given collections will be not changed. At least one collection has to been given.
`concatOf(<collection1>[,collectionN]);` | __REMOVED IN V4.0.0__
`reduce(<collection>,<callback>[,initialvalue]);` | This function executes a reducer function (that you provide) on each element of the collection, returning in a single output value. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function. The initialvalue parameter is optional and can be any variable type of the Javascript.
`reduceOf(<collection>,<callback>[,initialvalue]);` | __REMOVED IN V4.0.0__
`enumerate(<collection>);` | Yield generated pairs (arrays) from the elements of a collection and a counter. The collection parameter is mandatory. Example: `_.enumerate(["Picard", "Riker", "Data"]);` -> `["Picard", 0]`, `["Riker", 1]`, `["Data", 2]`
`enumerateOf(<collection>);` | __REMOVED IN V4.0.0__
`flat(<collection>);` | Yield the subelements of the elements of the given collection. The collection parameter is mandatory and all of the elements have to be an iterator or iterable.
`flatOf(<collection>);` | __REMOVED IN V4.0.0__
`join(<collection>[,separator=","]);` | This function creates and returns a new string by concatenating all of the elements in a collection, separated by commas or a specified separator string. The separator is converted to a string if necessary. If the collection has only one item, then that item will be returned without using the separator. The collection parameter is mandatory.
`joinOf(<collection>[,separator=","]);` | __REMOVED IN V4.0.0__
`take(<collection>[,n]);` | Yield the first N elements of a collection. The collection parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1
`takeOf(<collection>[,n]);` | __REMOVED IN V4.0.0__
`takeWhile(<collection>,<callback>);` | Yield the elements of a collection while the callback (filter) function returns true. The callback function will be called with the actual element of the collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.
`takeRight(<collection>[,n]);` | Yield the last N elements of a collection. The collection parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1
`takeRightWhile(<collection>,<callback>);` | Yield the elements from the end of a collection while the callback (filter) function returns true. The callback function will be called with the actual element of the collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.
`drop(<collection>[,n]);` | Drop the first N elements of a collection and yield the remained elements. The original collection will be not changed. The collection parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1
`dropOf(<collection>[,n]);` | __REMOVED IN V4.0.0__
`dropWhile(<collection>,<callback>);` | Drop the elements of a collection while the callback (filter) function returns true and yield the remained elements. The original collection will be not changed. The callback function will be called with the actual element of the collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.
`dropRight(<collection>[,n]);` | Drop the last N elements of a collection and yield the remained elements. The original collection will be not changed. The collection parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1
`dropRightWhile(<collection>,<callback>);` | Drop the elements from the end of a collection while the callback (filter) function returns true and yield the remained elements. The original collection will be not changed. The callback function will be called with the actual element of the collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.


### Polyfills

Name | Description
---- | -----------
`Object.hasOwn(<object>,<property>);` | __Proposal Stage 3__ <br>  [https://github.com/tc39/proposal-accessible-object-hasownproperty](https://github.com/tc39/proposal-accessible-object-hasownproperty) <br> Returns the object parameter has the specified property as its own property. Both of the parameters are mandatory and the property has to be string. The return value is boolean.
`String.prototype.trimStart();` | The trimStart() method removes whitespace from the beginning of a string.
`String.prototype.trimLeft();` | Alias of the `String.prototype.trimStart();` method.
`String.prototype.trimEnd();` | The trimEnd() method removes whitespace from the end of a string.
`String.prototype.trimRight();` | Alias of the `String.prototype.trimEnd();` method.
`String.prototype.padStart();` | The padStart() method pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start (left) of the current string.
`String.prototype.padEnd();` | The padEnd() method pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length. The padding is applied from the end (right) of the current string.
`Object.fromEntries();` | The Object.fromEntries() method transforms a list of key-value pairs into an object.
`Array.prototype.flat();` | The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
`Array.prototype.flatMap();` | A new array with each element being the result of the callback function and flattened to a depth of 1.
`globalThis;` | The "global" property of the global object, a writable, configurable, non-enumerable alias of window/self.
`String.prototype.matchAll();` | The matchAll() method returns an iterator of all results matching a string against a regular expression, including capturing groups.
`String.prototype.replaceAll();` | The replaceAll() method returns a new string with all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp.
REMOVED polyfills in v3.1.0 | `Array.from();`, `Array.of();`, `Array.prototype.fill();`, `Array.prototype.find();`, `Array.prototype.findIndex();`, `Object.create();`, `String.prototype.startsWith();`, `String.prototype.endsWith();`, `Object.is();`, `Array.prototype.copyWithin();`, `String.fromCodePoint();`, `String.prototype.codePointAt();`, `Number.MIN_SAFE_INTEGER;`, `Number.MAX_SAFE_INTEGER();`, `Number.EPSILON;`, `Number.isNaN();`, `isNaN();`, `Number.isInteger();`, `Number.isFinite();`, `Number.isSafeInteger();`, `Number.parseInt();`, `Number.parseFloat();`, `Math.acosh();`, `Math.asinh();`, `Math.atanh();`, `Math.cbrt();`, `Math.clz32();`, `Math.cosh();`, `Math.expm1();`, `Math.fround();`, `Math.hypot();`, `Math.imul();`, `Math.log1p();`, `Math.log10();`, `Math.log2();`, `Math.sign();`, `Math.sinh();`, `Math.tanh();`, `Math.trunc();`
REMOVED polyfills in v3.8.0 | `Array.prototype.values();`, `Array.prototype.includes();`, `String.prototype.includes();`, `String.prototype.repeat();`, `String.prototype[Symbol.iterator]();`, `Object.assign();`, `Object.entries();`, `Object.values();`, `Object.getOwnPropertyDescriptors();`, `RegExp.prototype.flags;`, `NodeList.prototype.forEach();`, `ChildNode.after();`, `ChildNode.before();`, `ChildNode.remove();`, `ChildNode.replaceWith();`, `ParentNode.append();`, `ParentNode.prepend();`, `Element.prototype.matches();`, `Element.prototype.closest();`, `Element.prototype.toggleAttribute();`, `Element.prototype.getAttributeNames();`, `window.screenLeft;`, `window.screenTop;`


### Non-standard polyfills

Name | Description
---- | -----------
`BigInt.prototype.toJSON();` | Using `JSON.stringify();` with any BigInt value will raise a TypeError as BigInt values aren't serialized in JSON by default. This added method can fix this. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
`window.GeneratorFunction();` | The GeneratorFunction constructor creates a new generator function object. In JavaScript every generator function is actually a GeneratorFunction object. Note that GeneratorFunction is not a global object, but in the Celestra this is available in the `window` object.
`window.AsyncFunction();` | The AsyncFunction constructor creates a new async function object. In JavaScript, every asynchronous function is actually an AsyncFunction object. Note that AsyncFunction is not a global object, but in the Celestra this is available in the `window` object.


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
