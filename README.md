````
        ___  ____  __    ____  ___  ____  ____    __
       / __)( ___)(  )  ( ___)/ __)(_  _)(  _ \  /__\
      ( (__  )__)  )(__  )__) \__ \  )(   )   / /(__)\
       \___)(____)(____)(____)(___/ (__) (_)\_)(__)(__)

````

# Celestra


## Download

__A helper JavaScript library with useful functions and polyfills and zero dependencies.__

This library isn't compatible with the Node.js.

Latest version: 5.6.3

Date: 2024-04-08T19:00:48.303Z

__Tested on these browsers:__

- Windows Firefox
- Windows Chrome
- Windows Edge
- iOS Safari
- iOS Firefox
- iOS Chrome
- iOS Edge
- Android Firefox
- Android Chrome
- Android Samsung Internet
- Android Edge

The functions are available in the `celestra` and/or `CEL` object.

Edition|Filename
-------|--------
developer|__celestra.dev.js__
minified|__celestra.min.js__
ES6 module|__celestra.esm.js__
CUT testpage<br>Celestra Unit Tester|__unittest.html__
Version history|__CHANGELOG.md__

DEV and MIN editions: If the `CEL` global variable is used before the loading of the library, then the value of the variable is saved and you can restore with the `noConflict();` function.


### Github pages

version|page link
-------|--------
Stable|__https://github.com/Serrin/Celestra__
Beta|__https://github.com/Serrin/Celestra-beta__


### Removed polyfills

Some polyfills have been removed in v3.1.0 and v3.8.0 and v5.6.0. With these files can be reusued the old polyfills if needed.

edition|filename
-------|--------
developer|__celestra-polyfills.dev.js__
minified|__celestra-polyfills.min.js__


### Cheatsheets

edition|filename
-------|--------
Celestra cheatsheet|__celestra-cheatsheet.pdf__
JavaScript cheatsheet|__js-cheatsheet.pdf__


### Apps

app|filename
-------|--------
RPG dice roller|___testgame.html__
Demo plugin documentation|__celestra-demo-plugin.html__
Demo plugin developer source|__celestra-demo-plugin.dev.js__
Demo plugin minified source|__celestra-demo-plugin.min.js__


### How to import the ESM edition

````javascript
<script type="module">

// import the celestra object
import { celestra } from "./celestra.esm.js";
window.celestra = celestra;
window.CEL = celestra;

// import with default with name
import { default as celestra } from "./celestra.esm.js";
window.celestra = celestra;
window.CEL = celestra;

// import with default export
import defaultExport from "./celestra.esm.js";
window.celestra = defaultExport;
window.CEL = defaultExport;

</script>
````


### Celestra v3.0.0 (Hera) changes

- Only modern browsers (ES6+) are supported. The Internet Explorer 11 and W10M Edge have been removed from the supported browsers.

- If you would like to use Celestra with older browsers, then you can download the latest v2.x version here: https://github.com/Serrin/Celestra/releases

- The library sources have been merged and all of the ES6E functions are available in the __celestra.dev.js__ and __celestra.min.js__.

- Many functions have been deprecated or removed.


### Celestra v3.6.0 (Galactica) changes

- CommonJS and AMD module compatibility have been removed.

- In the ESM (ECMAScript 6 module) edition only the whole celestra object is exported as default export and as standalone object.

- Many functions have been deprecated or removed.


### Celestra v5.0.0 (Defiant) changes

- The underscore `_` short object name has been changed to `CEL` to avoid the compatibility issues.<br>If need to use the old short name, then with this code will be available again: `window._ = window.celestra;`.


### Celestra v5.3.0 (Voyager) changes

- Added a new code section: __Abstract functions__ and new functions.


### Celestra v5.5.0 changes

- The Math functions are available in the main code files (dev, min, esm) instead of the Math plugins.


-----

## Functions


### Core API

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.sleep();`

Name | Description
---- | -----------
`celestra.noConflict();` | Restore the previous `CEL` object value and return the `celestra` object to create a new alias.<br>__Tip: You can make a new alias without this function too. Example: `window._cel = window.celestra;`__<br>__In the ESM edition only returns the celestra object.__
`celestra.VERSION;` | The library version.
`BASE16;`|`"0123456789ABCDEF"`<BR>Can be used with the ID generator functions.
`BASE32;`|`"234567ABCDEFGHIJKLMNOPQRSTUVWXYZ"`<BR>Can be used with the ID generator functions.
`BASE36;`|`"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"`<BR>Can be used with the ID generator functions.
`BASE58;`|`"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"`<BR>Can be used with the ID generator functions.|
`BASE62;`|`"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"`<BR>Can be used with the ID generator functions.
`WORDSAFEALPHABET;`|`"23456789CFGHJMPQRVWXcfghjmpqvwx"`<BR>Can be used with the ID generator functions.
`b64Encode(<string>);` | Unicode compatible string to base64 converter. Return the encoded string.
`b64Decode(<string>);` | Unicode compatible base64 to string converter. Return the original string.
`assertEq(<msg>,<value1>,<value2>[,strict=true]);` | This function throws an error with the message if the value1 and value2 aren't equals. The message parameter is mandatory and has to be a string. The strict parameter is optional and can be a booelan. The return value is `true`, when the test was success.
`assertFalse(<msg>,<value>);` | This function throws an error with the message if the value is true. The message parameter is mandatory and has to be a string. The return value is `true`, when the test was success.
`assertNotEq(<msg>,<value1>,<value2>[,strict=true]);` | This function throws an error with the message if the value1 and value2 are equals. The message parameter is mandatory and has to be a string. The strict parameter is optional and can be a booelan. The return value is `true`, when the test was success.
`assertTrue(<msg>,<value>);` | This function throws an error with the message if the value is false. The message parameter is mandatory and has to be a string. The return value is `true`, when the test was success.
`bind(<function>,<context>);` | Returns a function that is bound to a context. Both of the parameters are mandatory.
`classof(<variable>[,type[,throw=false]]);` | __Old name before v5.4.0:__ `getType`.<br>Get the real type of a variable. If this is an object, then the return value is the detailed object type (e.g.: array). If the type (string) parameter is given, then the return value (boolean) is the equality of the type of the variable and the second parameter. If the third parameter (boolean) is true and the type of the variable and the second parameter aren't equals, then the function is throwing a `TypeError();`, else the return value is true.
`constant(<value>);` | A one time assignment function to create a constant value in ES5. This returns a function, which returns the given value. (In math: `f(x)=x`)
`delay(<ms>).then(<callback>);` | A promise based delay function. The ms (milliseconds) parameter is mandatory and have to be an integer.<br>__Sample:__<br>`CEL.sleep(5000).then(() => alert("5 seconds")).catch(console.log.bind(console)).finally(() => alert("done"));`
`extend([deep,]<target>,<source1>[,sourceN]);` | This is an enhanced version of the `Object.assign` method. The deep parameter (boolean) is optional and sets the deep copy (recursive) of the sources.
`F();` | This function returns false.
`filterIn(<object>,<callback>);` | The filterIn() function executes a provided function once for each object property and returns a new object with the properties which were be filtered. The object parameter is mandatory and has to be an object. The callback parameter is mandatory and has to be a function. The parameter function will be called with these arguments: key value, key, object.<br>__Example:__<br>`var o1 = {"a": 1, "b": 2, "c": 3};`<br>`console.log(o1);`<br>`// Object { a: 1, b: 2, c: 3 }`<br>`var o2 = CEL.filterIn(o1, (v, p, o) => (v > 1));`<br>`console.log(o2);`<br>`// Object { b: 2, c: 3 }`
`forIn(<object>,<callback>);` | The forIn() function executes a provided function once for each object property. The object parameter is mandatory and has to be an object. The callback parameter is mandatory and has to be a function. The parameter function will be called with these arguments: key value, key, object.
`getUrlVars([str=location.search]);` | Get the values of the url variables in an object from the `location.search` _(default value)_ or another given url. The str parameter name is optional and can be a string. Example: `"?showall=true&order_by=updated&o=asc"` -> `Object { showall: "true", order_by: "updated", o: "asc" }`
`identity(<value>);` | Return the given value. (In math: `f(x)=x`)
`inherit(<subclass>,<superclass>);` | Prototype inheritance.
`javaHash(<data>[,hexa=false]);` | Java `String.hashCode()` implementation in Javascript - this is a non-cryptographic hash function. The data parameter is mandatory and can be any type. The hexa parameter is optional and can be a boolean and sets the hexadecimal conversion of the return value and the default value is false. Return the generated integer hash.
`nanoid([size=21[,alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"]]);` | Generate a nanoid. The size parameter is optional and the default value is 21. The alphabet parameter is optional and the default value is "A-Za-z0-9_-". The return value is the generated nanoid (string).
`noop();` | It's an empty function (no operation) that returns undefined and usable for optional callback arguments.
`obj2string(<object>);` | Convert object to a querystring. The return value is the string. The object parameter is mandatory.
`randomBoolean();` | Get a random boolean value. The return value is `true` or `false`.
`randomID([hyphens=true][,usedate=false]);` | __DEPRECATED in v5.5.4__ <br>__REMOVED in v5.6.0__ <br> __Can be replaced with the __`crypto.randomUUID();`,__ which is polyfilled in this library.__<br>Generate a GUID/UUID v4 random ID. The hyphens and useDate parameters are optional and can be a boolean. The return value is a string.
`randomString([length[,specialCharactersEnabled=false]]);` | __DEPRECATED in v5.5.2__ <br>__REMOVED in v5.6.0__ <br>__Can be replaced with the __`CEL.nanoid();`__.__<br>Generate a random string. The length parameter is optional and can be a number and the default value is 100. The specialCharactersEnabled parameter is optional and can be a boolean and the default value is false. Return the generated string.<br>Example ID: `"QsZA2VVTgFIF3D-qFk5oc"`
`randomUUIDv7();` | This function returns a UUID v7, which cointains a timestamp too. For more information please read the [this page](https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-7)!<br>Example result: `"0195d74b-b8c8-7302-a7d3-919df45087f3"`
`sizeIn(<object>);` | Returns the count of the owned properties of the given object. The object parameter is mandatory.
`popIn(<object>,<property>);` | The popIn() function deletes the property in the object and returns the value of the deleted property. If the property doesn't exist in the object, then the return value is undefined. The object parameter is mandatory and has to be an object. The property parameter is mandatory.
`sleep(<ms>).then(<callback>);` | This is an alias of the `delay(<ms>).then(<callback>);`.
`T();` | This function returns true.
`timestampID([size=21[,alphabet="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"]]);` | Generate a timestamp based sortable ID. The size parameter is optional and the default value is 21, but if the given value smaller than 12, then the value will be 12. The alphabet parameter is optional and the default value is `"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"`, same as BASE58. The return value is the generated id (string).<br/>Example ID:`"00lirtqi4e-wgGn8vGPyY"`
`unBind(<function>);` | __Old name before v5.4.1:__ `toFunction`.<br>Returns an unbinded function from an object method. The function parameter is mandatory.


### String API

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.strPropercase();`

Name | Description
---- | -----------
`strAt(<string>,<index>[,newChar]);` | If the newchar is undefined, then returns the unicode character, which has to be on the given index in the string. The index can be negative value (`-1 -> last`). If the index is out of the string length, then the return value is an empty string. All of the parameters are mandatory and index has to be an integer.<br>If the newChar is not undefined, then the indexed character will be replaced with the newChar and returns the modified string.
`strCapitalize(<string>);` | This function is unicode compatible and converts the first character to uppercase and the other characters to lowercase. The string parameter is mandatory. The return value is a string.
`strCodePoints(<string>);` | Returns the array of the unicode codepoints of characters of the given string. The string parameter is mandatory.
`strDownFirst(<string>);` | This function is unicode compatible and converts the first character to lowercase. The string parameter is mandatory. The return value is a string.
`strFromCodePoints(<collection>);` | Returns the joined string of the given unicode codepoints. The collection parameter is mandatory.
`strHTMLEscape(<string>);` | This function escapes these characters: `<`, `>`, `&`, `"`, `'`. The String parameter is mandatory. The return value is the escaped string.
`strHTMLRemoveTags(<string>);` | Remove HTML tags from the given string. The string parameter is mandatory. The return value is the new string.
`strHTMLUnEscape(<string>);` | This function unescapes these characters: `<`, `>`, `&`, `"`, `'`. The String parameter is mandatory. The return value is the unescaped string.
`strReverse(<string>);` | Returns the reversed variant of the given string. In the ES6 compatible browsers the result will be unicode compatible. The string parameter is mandatory.
`strPropercase(<string>);` | This function is unicode compatible and capitalizes every word of the given string. The string parameter is mandatory. The return value is a string.<br>__Example:__<br>
`strSplice(<str>,<index>,<count>[,add]);`|This function works like the [Array.prototype.splice();](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), but with strings and can remove characters on the index or replace with other string. The return value is the modified string.
`strTitlecase(<string>);` | Alias of the `strPropercase(<string>);`.
`strUpFirst(<string>);` | This function is unicode compatible and converts the first character to uppercase. The string parameter is mandatory. The return value is a string.


### DOM API

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.domCreate();`

Name | Description
---- | -----------
`createFile(<filename>,<content>[,dataType]);` | Create and save file without a server. The filename and content parameters are mandatory and have to be a string. The dataType parameter is optional and can be a string. The default value of the dataType parameter is "_text/plain_". ___Doesn't work in iOS browsers (Safari, Firefox and Chrome) and W10M Edge 14.___
`domCreate(<type>[,properties[,innerHTML]]);` | Create a new HTML element. The type is mandatory and has to be a string. The properties object is optional and sets the element properties. (class, style object/string, data-*, etc.) The innerHTML is optional and can be a string.
`domCreate(<element descriptive object>);` | Since v2.0.5, a new element can be created with an object. In this case the element descriptive object is mandatory. The `style` can be a subobject or a string. __Sample code:__ `CEL.domCreate({elementType: "a", href: "https://developer.mozilla.org/en-US/", target: "_blank", style: {"background-color": "red", "color": "white"}, innerHTML: "MDN Sample url"});`
`domFadeIn(<element>[,duration[,display]]);` | Fade in and show animation for an element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms). The display is optional and can be a string (CSS display property values).
`domFadeOut(<element>[,duration]);` | Fade out and hide animation for an element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms).
`domFadeToggle(<element>[,duration[,display]]);` | Fade in or fade out animation which depends on the state of the element. The element is mandatory and has to be a HTML element. The duration parameter is optional and sets the animation time in millisecond (the default is 500ms). The display is optional and can be a string (CSS display property values).
`domGetCSS(<element>[,property]);` | Get a CSS property value of an element or all of the css properties in an object. The element is mandatory and has to be a HTML element. The property is optional and can be a string.
`domGetCSSVar(<name>);` | This function returns a value of a CSS variable or an empty string, if the variable is unset. The name parameter is mandatory and has to be a string. If the "--" characters are missing at the begin of the variable name, then the function will add these.
`domHide(<element>);` | Hide an element. The element is mandatory and has to be a HTML element.
`domIsHidden(<element>);` | This function determines whether the element is hidden. The element is mandatory and has to be a HTML element. The return value is boolean.
`domReady(<callback>);` | Set the document ready (content fully loaded) event.
`domSetCSS(<element>,<property>,<value>);` | Set a CSS property value of an element. The element is mandatory and has to be a HTML element. The property is mandatory and has to be a string. The value is mandatory and has to be a string.
`domSetCSS(<element>,<properties>);` | Set CSS property values of an element. The element is mandatory and has to be a HTML element. The properties object is mandatory. The object properties can be the CSS properties and the property values will be applied to the element.
`domSetCSSVar(<name>,<value>);` | This function set a value of a CSS variable. Both of the parameters are mandatory and have to be a string. If the "--" characters are missing at the begin of the variable name, then the function will add these.
`domShow(<element>[,display]);` | Show an element. The element is mandatory and has to be a HTML element. The display is optional and can be a string (CSS display values).
`domScrollToBottom();` |  __Old name before v5.5.4:__ `domToBottom`.<br>This function is scrolling to the bottom of the page.
`domScrollToElement(<element>[,top=true]);` | This function is scrolling to top or the bottom of element. The element parameter is mandatory and the top parameter is optional and can be boolean.
`domScrollToTop();` |  __Old name before v5.5.4:__ `domToTop`.<br>This function is scrolling to the top of the page.
`domSiblings(<element>);` | Get the siblings of an element. The element parameter is mandatory and the return value is the array.
`domSiblingsLeft(<element>);` | Alias of the `domSiblingsPrev(<element>);`.
`domSiblingsNext(<element>);` | Get the nextsiblings of an element. The element parameter is mandatory and the return value is the array.
`domSiblingsPrev(<element>);` | Get the previous siblings of an element. The element parameter is mandatory and the return value is the array.
`domSiblingsRight(<element>);` | Alias of the `domSiblingsNext(<element>);`.
`domToElement(<htmlString>);` | This function returns a HTML element which is created from the htmlString parameter. The htmlString parameter is mandatory and has to be a string.
`domToggle(<element>[,display]);` | Show or hide an element. The element is mandatory and has to be a HTML element. The display is optional and can be a string (CSS display values).
`importScript(<script1>[,scriptN]);` | Load JavaScript files. The first parameter is mandatory and has to be a string. The other parameters are optional and can be a string. <br/> __Tip:__ <br> To prevent the caching of a js/css file use versioning in the file url. Example: `mylib.js?version=1.10.0`
`importStyle(<style1>[,styleN]);` | Load CSS files. The first parameter is mandatory and has to be a string. The other parameters are optional and can be a string.
`form2array(<form>);` | Convert (serialize) form input tag names and values to an array with object elements (name and value properties). The return value is the array. The form parameter is mandatory and has to be a html form element.
`form2string(<form>);` | Convert (serialize) form input tag names and values to a query string. The return value is the string. The form parameter is mandatory and has to be a html form element.
`getDoNotTrack();` | Return the DoNotTrack setting (boolean) of the browser.
`getFullscreen();` | Get the fullscreen element. If this isn't set, then the return value is undefined. Please check the incompatibility issues on the [http://caniuse.com/#search=fullscreen](http://caniuse.com/#search=fullscreen) page.
`getLocation(<success>[,error]);` | Get the current location as an object with the coordinates. The success is mandatory and has to be a function. The error is optional and can be a function.
`setFullscreenOff();` | Set off the fullscreen.
`setFullscreenOn(<selector>);` | Set the fullscreen element. The selector can be a css selector string or an element.
`qs(<selector>[,context]);` | Get the first matched HTML element. The context is optional and can be an element or a selector string.
`qsa(<selector>[,context]);` | Get matched HTML elements in an array. The context is optional and can be an element or a selector string.


### AJAX and CORS API

__These functions aren't deprecated, but it's recommend to use the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), because it's [supported](https://caniuse.com/?search=fetch) in every modern browsers.__

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.getJson();`

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


### Type checking API

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.isString();`

Name | Description
---- | -----------
`isArrayBuffer(<value>);` | This function determines whether the provided value is an arraybuffer. The return value is boolean.
`isArraylike(<value>);` | This function determines whether the provided value is an iterable object. The return value is boolean.
`isAsyncFn(<value>);` | This function determines whether the provided value is an async function. The return value is boolean.
`isAsyncGeneratorFn(<value>);` | This function determines whether the provided value is an async generator function. The return value is boolean.
`isBigInt(<value>);` | This function determines whether the provided value is a BigInt. The return value is boolean.
`isBoolean(<value>);` | This function determines whether the provided value is a boolean. The return value is boolean.
`isCallable(<value>);` | Alias of the `isFunction(<value>);`.
`isChar(<value>);` | This function determines whether the provided value is a string with length 1 character. This function is unicode compatible. The return value is boolean.
`isConstructorFn(<value>);` | This function determines whether the provided value is a constructable function. The return value is boolean.
`isDataView(<value>);` | This function determines whether the provided value is an DataView object. The return value is boolean.
`isDate(<value>);` | This function determines whether the provided value is a date. The return value is boolean.
`isElement(<value>);` | This function determines whether the provided value is a HTML element. The return value is boolean.
`isEmptyArray(<value>);` | This function determines whether the provided value is an empty array (without values). The return value is boolean.
`isEmptyIterator(<value>);` | This function determines whether the provided value is an iterator array (without values). The return value is boolean.
`isEmptyMap(<value>);` | This function determines whether the provided value is an empty map (without properties). The return value is boolean.
`isEmptyObject(<value>);` | This function determines whether the provided value is an empty object (without properties). The return value is boolean.
`isEmptySet(<value>);` | This function determines whether the provided value is an empty set (without values). The return value is boolean.
`isError(<value>);` | This function determines whether the provided value is an error. The return value is boolean.
`isFalsy(<value>);` | This function determines whether the provided value is falsy. The return value is boolean. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)!
`isFloat(<value>);` | This function determines whether the provided value is a float number. The return value is boolean.
`isFunction(<value>);` | This function determines whether the provided value is a function. The return value is boolean.
`isGeneratorFn(<value>);` | This function determines whether the provided value is a generator function. The return value is boolean.
`isIterable(<value>);` | This function determines whether the provided value is an iterable collection. The return value is boolean.
`isIterator(<value>);` | This function determines whether the provided value is an iterator. The return value is boolean.
`isMap(<value>);` | This function determines whether the provided value is a map. The return value is boolean.
`isNil(<value>);` | This function determines whether the provided value is null or undefined or NaN. The return value is boolean.
`isNull(<value>);` | This function determines whether the provided value is null. The return value is boolean.
`isNullOrUndefined(<value>);` | This function determines whether the provided value is null or undefined. The return value is boolean.
`isNumber(<value>);` | This function determines whether the provided value is a number. The return value is boolean.
`isNumeric(<value>);` | This function determines whether the provided value is a number or can be converted to number. The return value is boolean.
`isObject(<value>);` | This function determines whether the provided value is an object and not null. The return value is boolean.
`isPlainObject(<value>);` | This function determines whether the provided value is an object, which own prototype is the Object.prototype or null. The return value is boolean.
`isPrimitive(<value>);` | This function determines whether the provided value is not null, not object and not function. The return value is boolean.
`isPromise(<value>);` | This function determines whether the provided value is a promise object. The return value is boolean.
`isRegexp(<value>);` | This function determines whether the provided value is a regexp. The return value is boolean.
`isSameArray(<array1>,<array2>);` | This function checks the value equality of the given arrays. The return value is boolean and both of the parameters are mandatory and have to be an array.
`isSameIterator(<iter1>,<iter2>);` | This function checks the value equality of the given iterator. The return value is boolean and both of the parameters are mandatory and have to be a collection (iterator / iterable object).
`isSameMap(<map1>,<map2>);` | This function checks the property and value equality of the given maps. The return value is boolean and both of the parameters are mandatory and have to be a map.
`isSameObject(<object1>,<object2>);` | This function checks the property and value equality of the given objects. The return value is boolean and both of the parameters are mandatory and have to be an object.
`isSameSet(<set1>,<set2>);` | This function checks the value equality of the given sets. The return value is boolean and both of the parameters are mandatory and have to be a set.
`isSet(<value>);` | This function determines whether the provided value is a set. The return value is boolean.
`isString(<value>);` | This function determines whether the provided value is a string. This function is unicode compatible. The return value is boolean.
`isSymbol(<value>);` | This function determines whether the provided value is a symbol. The return value is boolean.
`isTruthy(<value>);` | This function determines whether the provided value is truthy. The return value is boolean. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)!
`isTypedArray(<value>);` | This function determines whether the provided value is an typedarray. The return value is boolean.
`isUndefined(<value>);` | This function determines whether the provided value is undefined. The return value is boolean.
`isWeakMap(<value>);` | This function determines whether the provided value is a weakmap. The return value is boolean.
`isWeakSet(<value>);` | This function determines whether the provided value is a weakset. The return value is boolean.


### Cookie API

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.setCookie();`

Cookie values help: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie, https://web.dev/samesite-cookies-explained

Name | Description
---- | -----------
`clearCookies([path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]);` | Clear all of the cookies. The path is optional and can be a string _(default value: "/")_. To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean.
`clearCookies(<Options object>);` | In this case the names of object properties are the same as the function arguments and the default values are the same too.
`getCookie([name]);` | Get a cookie value or all cookies in an object. With the name parameter (string) the return value is the current cookie value or null. Without the parameter the return value is an object with the values or an empty object.
`hasCookie(<name>);` | This function determines whether the cookie is set with the name. The return value is boolean.
`removeCookie(<name>[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]);` | Remove a cookie. The name is mandatory and has to be a string. The path is optional and can be a string _(default value: "/")_. The To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean. The return value (boolean) is determines whether the cookie was set with the name before the removing.
`removeCookie(<Options object>);` | In this case the names of object properties are the same as the function arguments and the default values are the same too.
`setCookie(<name>,<value>[,hours=8760[,path="/"[,domain[,secure[,SameSite="Lax"[,HttpOnly]]]]]]);` | Set a cookie. The name is mandatory and has to be a string. The value is mandatory and has to be a string. The hours is the expire value and optional and can be a number _(default value: 8760 = 1 year)_. The path is optional and can be a string _(default value: "/")_. To the local path set the `""` value! The domain is optional and can be a string. The secure is optional and can be a boolean. The SameSite is optional and can be a string _("Lax", "Strict", "None", default value: "Lax")_. The HttpOnly is optional and can be a boolean.
`setCookie(<Options object>);` | In this case the names of object properties are the same as the function arguments and the default values are the same too.


### Collections API

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.arrayAdd();`

Name | Description
---- | -----------
`arrayAdd(<array>,<value>);` | Push the value to the array if the array doesn't contain the value. The return value is true, when the value is added and false, when not added.
`arrayClear(<array>);` | Clear the array and returns the empty array. The array parameter is mandatory.
`arrayCreate([length=0]);`|This function returns an array with the given length and can handle the -0 as length. The length parameter will be converted to number and if the new value is not an integer number or out of the array size range, then a rangeerror will be thrown.
`arrayCycle(<collection>[,n=100]);` | Cycle the given collection and returns an array with these elements. The collection parameter is mandatory and can be any type of JavaScript collections. The n parameter is optional and can be an integer. Default parameter value: n = 100.
`arrayDeepClone(<array>);`|This function deeply (recursively) clones an array. The return value is the cloned array.
`arrayDifference(<collection1>,<collection2>);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> Returns the array of unique values that are in the collection1, excluding the values that are also in the collection2. All of the parameters are mandatory and can be any type of JavaScript collections. The return value is an Array.
`arrayIntersection(<collection1>,<collection2>);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> Returns the array of unique values that are in both of the given collections. All of the parameters are mandatory and can be any type of JavaScript collections. The return value is an Array.
`arrayMerge(<target>,<source1>[,sourceN]);` | Merge two or more arrays or push any values in the target array. The return value is the target array.
`arrayRange([start=0[,end=99[,step=1]]]);` | Returns the array of values between the start and end parameters. All of the parameters are mandatory and have to be a number. Default parameter values: start = 0, end = 99, step = 1.<br>__Example:__<br>`CEL.arrayRange("A".codePointAt(0),"Z".codePointAt(0)).map((v)=>String.fromCodePoint(v));`<br>-><br>`Array(26) [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]`
`arrayRemove(<array>,<value>[,all=false]);` | Remove the first or all equivalent values from the array. Returns true, when the value was found and false when not found. The array and value parameters are mandatory. The all parameter is optional and has to be a boolean.
`arrayRemoveBy(<array>,<callback>[,all=false]);` | Remove the first or all values from the array with which the given function returns true. Returns true, when the value was found and false when not found. The array and value parameters are mandatory. The all parameter is optional and has to be a boolean.
`arrayRepeat(<value>[,n=100]);` | Returns an array with same repeatedly elements. The value parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = 100.
`arraySymmetricDifference(<collection1>,<collection2>);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> Returns the array of unique values that are only in one of given collections. All of the parameters are mandatory and can be any type of JavaScript collections. The return value is an Array.
`arrayUnion(<collection1>[,collectionN]);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> Returns the array of unique values including all values from the given collections. The first parameter is mandatory and all parameters can be any type of JavaScript collections. The return value is an Array.
`arrayUnique(<collection>);` | This function returns a new array with unique values. The value parameter is mandatory and can be any type, that can be converted to array. In modern browsers you can use ES6 types too (Map, Set and iterators).
`concat(<collection1>[,collectionN]);` | This function merges the collections and yields the elements of the merged collection. The given collections will be not changed. At least one collection has to been given.
`count(<collection>,<callback>);` | This function executes a counter function (that you provide) on each element of the collection, returning in a single output value. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.
`contains(<collection>,<value>);` | This is an alias of the `includes(<collection>,<value>);`.
`drop(<collection>[,n=1]);` | Drop the first N elements of a collection and yield the remained elements. The original collection will be not changed. The collection parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1
`dropRight(<collection>[,n=1]);` | Drop the last N elements of a collection and return the remained elements in an array. The original collection will be not changed. The collection parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1.
`dropRightWhile(<collection>,<callback>);` | Drop the elements from the end of a collection while the callback (filter) function returns true and yield the remained elements. The original collection will be not changed. The callback function will be called with the actual element of the collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.
`dropWhile(<collection>,<callback>);` | Drop the elements of a collection while the callback (filter) function returns true and yield the remained elements. The original collection will be not changed. The callback function will be called with the actual element of the collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.
`entries(<collection>[,offset=0]);` | An alias of the `enumerate(<collection>);`.
`enumerate(<collection>[,offset=0]);` | Yield generated pairs (arrays) from the elements of a collection and a counter. The collection parameter is mandatory. The offset parameter is optional and can be an integer and it's default value is 0. <br>__Example:__<br> `CEL.enumerate(["Picard", "Riker", "Data"], 2);` -> `[2, "Picard"]`, `[3, "Riker"]`, `[4, "Data"]`
`every(<collection>,<callback>);` | This function whether all elements in the collection pass the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the collection is empty, then the return value is false.
`filter(<collection>,<callback>);` | Filter and yield elements of a collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`find(<collection>,<callback>);` | This function returns the value of the first element in the collection that satisfies the provided testing function. Otherwise undefined is returned. All of the parameters are mandatory.
`findLast(<collection>,<callback>);` | This function returns the value of the last element in the collection that satisfies the provided testing function. Otherwise undefined is returned. All of the parameters are mandatory.
`first(<collection>);` | This function returns the first element of the given collection. The collection parameter is mandatory.
`forEach(<collection>,<callback>);` | This function executes a provided function once for each collection element. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`forEachRight(<collection>,<callback>);` | This function executes a provided function once for each collection element in reversed order. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a reversed counter).
`group(<collection>,<callback>[,map=false]);` | __Deprecated in v5.6.0. Will be removed in 5.7.0.__ <br> __Can be replaced with the `Object.groupBy();` and `Map.groupBy();`.__ <br> __Old name before v5.4.4:__ `groupBy`.<br>Returns an Object or Map with array properties. The keys are the returned values of the given function. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function. The map parameter is optional and has to be a boolean and if it is true, then the return value is a Map instead of Object.<br>__Example:__<br>`CEL.group([1,2,3,4,5], (i) => (i % 2 === 0 ? "even" : "odd");`<br>-><br>`{ "even": [ 2, 4 ], "odd": [ 1, 3, 5 ] }`
`head(<collection>);` | This is an alias of the `first(<collection>);`.
`includes(<collection>,<value>);` | This function determines whether a collection includes a certain value among its entries, returning true or false as appropriate. All of the parameters are mandatory.
`initial(<collection>);` | Returns an array with the values of the given collection, but without the last value. <br>__Example:__<br>`CEL.initial([-5, 2, -9, 7, 34]);`<br>-><br>`[-5, 2, -9, 7]`
`isSuperset(<superCollection>,<subCollection>);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> This function determines whether the first provided collection is superset of the second collection. The parameters are mandatory and all parameters can be any type of JavaScript collections. The return value is a boolean.
`item(<collection>,<index>);` | This function returns the item from the given collection on the given index. The collection parameter is mandatory and has to be any type of JavaScript collections. The index is mandatory and can be positive number (examples: 0 = the first item, 1 = the second item, 2 = the third item, etc.) Compatible with the Unicode strings.
`iterCycle(<iter>[,n=Infinity]);` | Yield the items of an iterator over and over. The iter parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = Infinity __Note: PLease don't use with infinite iterators!__
`iterRange([start=0[,step=1[,end=Infinity]]]);` | Yield a range (counter) iterator. All of the parameters are optional. Default parameter values: start = 0, step = 1, end = Infinity.
`iterRepeat(<value>[,n=Infinity]);` | Yield a value over and over. The value parameter is mandatory and the n parameter is optional and can be an integer. Default parameter value: n = Infinity
`join(<collection>[,separator=","]);` | This function creates and returns a new string by concatenating all of the elements in a collection, separated by commas or a specified separator string. The separator is converted to a string if necessary. If the collection has only one item, then that item will be returned without using the separator. The collection parameter is mandatory.
`flat(<collection>);` | Yield the subelements of the elements of the given collection. The collection parameter is mandatory and all of the elements have to be an iterator or iterable.
`last(<collection>);` | This function returns the last element of the given collection. The collection parameter is mandatory.
`map(<collection>,<callback>);` | This function creates a new iterator with the results of calling a provided function on every element in the calling collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`max(<value1>[,valueN]);` | Returns the maximum value of the given values. The first value parameter is mandatory and can be any type. Works with any type of values, not only with numbers.
`min(<value1>[,valueN]);` | Returns the minimum value of the given values. The first value parameter is mandatory and can be any type. Works with any type of values, not only with numbers.
`none(<collection>,<callback>);` | This function whether all elements in the collection do not pass the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the collection is empty, then the return value is false.
`nth(<collection>,<index>);` | This is an alias of the `item(<collection>,<index>);`.
`partition(<collection>,<callback>);` | Returns an array, with filtered and negative filtered groups of the elements of the original collection. All of the parameters are mandatory.<br>__Example:__<br>`CEL.partition([-5, 2, -9, 7, 34], (e) => (e > 0) );`<br>-><br>`[[2, 7, 34], [-5, -9]]]`
`reduce(<collection>,<callback>[,initialvalue]);` | This function executes a reducer function (that you provide) on each element of the collection, returning in a single output value. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function. The initialvalue parameter is optional and can be any variable type of the Javascript.
`reject(<collection>,<callback>);` | This is the opposite of the function `filter(<collection>,<callback>);`. The elements to which the given callback gives a false will be yield. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function and called with two parameters: the item and the index of the item (only a counter).
`reverse(<collection>);` | This function returns an array with values of the given collection in reverse order. The collection parameter is mandatory.
`setDifference(<set1>,<set2>);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> Returns the set of unique values that are in the collection1, excluding the values that are also in the collection2. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`setIntersection(<set1>,<set2>);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> Returns the set of unique values that are in both of the given collections. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`setSymmetricDifference(<set1>,<set2>);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> Returns the set of unique values that are only in one of given collections. All of the parameters are mandatory and have to be a Set. The return value is a Set.
`setUnion(<collection1>[,collectionN]);` | __Deprecated in v5.6.2. Will be removed in 5.7.0.__ <br> Returns the set of unique values including all values from the given collections. The first parameter is mandatory and all parameters can be any type of JavaScript collections. The return value is a Set.
`size(<collection>);` | This function returns the count of the elements in the given collection. The collection parameter is mandatory. The return value is an integer.
`shuffle(<collection>);` | Returns an array with the values of the given collection, but in shuffled order. <br>__Example:__<br>`CEL.shuffle(["first",4,5,6,7,8,9,"last"]);`<br>-><br>`[4,8,5,6,"last",9,7,"first"]`
`slice(<collection>[,begin=0[,end=Infinity]]);` | Take a slice of a collection and yield the elements. The collection parameter is mandatory. The begin parameter is optional and can be a number and the default value is 0. The end parameter is optional and can be a number and the default value is Infinity.
`some(<collection>,<callback>);` | This function tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value and all of the parameters are mandatory. If the collection is empty, then the return value is false.
`sort(<collection>[,numbers=false]);` | This function sorts the values of the given collection. The collection parameter is mandatory. The numbers paramater is optional (boolean) and set true, if the collection contains only numbers. The return value is an array.
`tail(<collection>);` | Yield the values of a collection but without the first value. The collection parameter is mandatory.
`take(<collection>[,n=1]);` | Yield the first N elements of a collection. The collection parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1
`takeRight(<collection>[,n=1]);` | Take the last N elements of a collection. The collection parameter is mandatory. The n parameter is optional and can be an integer. Default parameter value: n = 1. The return value is an array.
`takeRightWhile(<collection>,<callback>);` | Yield the elements from the end of a collection while the callback (filter) function returns true. The callback function will be called with the actual element of the collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.
`takeWhile(<collection>,<callback>);` | Yield the elements of a collection while the callback (filter) function returns true. The callback function will be called with the actual element of the collection. The collection parameter is mandatory. The callback parameter is mandatory and has to be a function.
`unzip(<collection>);` | Returns the array of arrays of unpaired values. In the modern browsers compatible with finite iterators.<br>__Example:__<br>`CEL.unzip([ [ "a", 3 ], [ "b", 4 ], [ "c", 5 ], [ "d", 6 ] ]);`<br>-><br>`Array (2) [ ["a","b","c","d"], [3,4,5,6] ]`
`withOut(<collection>,<filterCollection>);` | Returns an array with the values of the first collection, but without the values of the filterCollection. All of the parameters are mandatory and can be any type of JavaScript collections.<br>__Example:__<br>`CEL.withOut(["a","b","c","d"], ["b","d"]);`<br>-><br>`["a","c"]`
`zip(<collection1>[,collectionN]);` | Returns the array of paired values of the given collections. All of the parameters can be any type of JavaScript collections. In the modern browsers compatible with finite iterators. The return value is an Array.<br>__Example:__<br>`CEL.zip(["a","b","c","d"], [3,4,5,6,7,8,9]);`<br>-><br>`Array (4) [ [ "a", 3 ], [ "b", 4 ], [ "c", 5 ], [ "d", 6 ] ]`
`zipObj(<collection1>,<collection2>);` | Returns an object, whose properties are from the first collection and its values are from the second collection. The two collections must be the same size. In the modern browsers compatible with finite iterators.<br>__Example:__<br>`zipObj(["a","b","c"],[1,2,3])`<br>-><br>`{"a":1,"b":2,"c":3}`


### Abstract API

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.getIn();`

Name | Description
---- | -----------
`createDataProperty(<object>,<property>,<value>);`|This function creates a writable, configurable and enumerable property with the given value in the object. The return value is the modified object.
`createMethodProperty(<object>,<property>,<value>);`|This function is useful for create a polyfill, because creates a writable, configurable, non-enumerable property with the given value in the object. The return value is the modified object.<br>__Example:__<br> `if (!("at" in Array.prototype)) { CEL.createMethodProperty(Array.prototype, "at ", function(...){...}); }`
`getIn(<object>,<property>);` | This function return the property value of the given object. If the property doesn't exist, then the return value is undefined. The object parameter is mandatory and has to be an object. The property parameter is mandatory and has to be a property type.
`getInV(<value>,<property>);` | This function return the property value of the given value and the given value will be converted to object. If the property doesn't exist, then the return value is undefined. The object parameter is mandatory and has to be any value. The property parameter is mandatory and has to be a property type.
`hasIn(<object>,<property>);` | This function determines whether the property is in the given object, but this can be inherited property too, not only the owned. The object parameter is mandatory and has to be an object. The property parameter is mandatory and has to be a property type. The return value is boolean.
`isIndex(<value>);`|This function determines whether the provided value is a valid arraylike index number. The return value is boolean.
`isPropertyKey(<value>);`|This function determines whether the provided value is a valid propertx key (string or symbol). The return value is boolean.
`isSameValue(<value1>,<value2>);`|This function uses the SameValue algorithm and determines whether the provided values are the same values and `-0` and `+0` values will be not equal. The `NaN` values will be equal. The return value is boolean.<br>__TIP: The `Object.is();` uses the SameValue algorithm.__
`isSameValueNonNumber(<value1>,<value2>);`|This function uses the SameValueNonNumber algorithm and determines whether the provided values are the same values and `-0` and `+0` values will be equal. The `NaN` values will be not equal. The return value is boolean.
`isSameValueZero(<value1>,<value2>);`|This function uses the SameValueZero algorithm and determines whether the provided values are the same values and `-0` and `+0` values will be equal. The `NaN` values will be equal. The return value is boolean.
`setIn(<object>,<property>,<value>);` | This function set the property value of the given object. The object parameter is mandatory and has to be an object. The property parameter is mandatory and has to be a property type. The value is mandatory and can be any type.
`toArray(<value>);`|If the value is an array, then this function returns the value else converts the value to array or the return value is an empty array.
`toIndex(<value>);`|This function converts the provided value to a valid arraylike index number. The return value is an unsigned integer (number).
`toInteger(<value>);`|This function always converts the provided value to an integer. If the value cannot be converted to an integer, then the return value is 0.
`toObject(<value>);`| If the given value is not null or undefined, then the return value is an object, which has been converted from the value, else a `TypeError()` will be throwned.
`toPropertyKey(<value>);`|This function convert the given value to a valid property key. If the value is not symbol, then will be converted to string, else the symbol will be returned.
`type(<value>);`|This function returns the typeof operator result of the given value, except the null object (`"null"` instead of `"object"`).


### Math API

These functions are available in the `celestra` and/or `CEL` objects.

Example: `CEL.sum();`

Name | Description
---- | -----------
`avg(<value1>[,valueN]);` | This function returns the average value from the parameter values.
`clamp(<value>,<min>,<max>);` | If the given value is between the min and max values, then this function returns the value. If smaller then the min value, then the return value is the min. If greater then the max value, then the return value is the max.
`inRange(<value>,<min>,<max>);`| This function determines whether the provided value is between the min and max values. All of the parameters are mandatory and have to be number. The return value is boolean.
`isEven(<value>);` | This function determines whether the provided value is an even number. The return value is boolean.
`isBigInt64(<value>);` | This function determines whether the provided value is a BigInt (Int64) value between -2^63 and 2^63 - 1. The return value is boolean.
`isBigUInt64(<value>);` | This function determines whether the provided value is a BigInt (Int64) value between 0 and 2^64 - 1. The return value is boolean.
`isInt8(<value>);` | This function determines whether the provided value is an integer between -128 and 127. The return value is boolean.
`isInt16(<value>);` | This function determines whether the provided value is an integer between -32768 and 32767. The return value is boolean.
`isInt32(<value>);` | This function determines whether the provided value is an integer between -2147483648 and 2147483647. The return value is boolean.
`isOdd(<value>);` | This function determines whether the provided value is an odd number. The return value is boolean.
`isUInt8(<value>);` | This function determines whether the provided value is an integer between 0 and 255. The return value is boolean.
`isUInt16(<value>);` | This function determines whether the provided value is an integer between 0 and 65535. The return value is boolean.
`isUInt32(<value>);` | This function determines whether the provided value is an integer between 0 and 4294967295. The return value is boolean.
`isFloat16(<value>);` | This function determines whether the provided value is a number between -65504 and 65504. The return value is boolean.
`minmax(<value>,<min>,<max>);` | This is an alias of the `clamp(<value>,<min>,<max>);`.
`product(<value1>[,valueN]);` | This function returns the product value from the parameter values.
`randomFloat([max]);` | Get a random float number value within 0 and max value. Without parameter the maximum value is 100.
`randomFloat(<min>,<max>);` | Get a random float number value within min and max value.
`randomInt([max]);` | Get a random integer number value within 0 and max value. Without parameter the maximum value is 100.
`randomInt(<min>,<max>);` | Get a random integer number value within min and max value.
`signbit(<value>);` | This function is based on this proposal:<br>[https://github.com/tc39/proposal-Math.signbit](https://github.com/tc39/proposal-Math.signbit)<br>`Returns whether the sign bit of x is set.`<br>`If n is NaN, the result is false.`<br>`If n is -0, the result is true.`<br>`If n is negative, the result is true.`<br>`Otherwise, the result is false.`<br>The value parameter is mandatory.
`sum(value1>[,valueN]);` | This function returns the sum value from the parameter values.
`toBigInt64(<value>);` | This function clamps ("minmax") the given value to BigInt (Int64) value (-2^63 to 2^63 - 1).
`toBigUInt64(<value>);` | This function clamps ("minmax") the given value to unsigned BigInt (Int64) value (0 to 2^64 - 1).
`toFloat16(<value>);` | This function clamps ("minmax") the given value to float 16 value (-65504 to 65504).
`toFloat32(<value>);` | This function clamps ("minmax") the given value to float 32 value (-3.4e38 to 3.4e38).
`toInt8(<value>);` | This function clamps ("minmax") the given value to integer 8 value (-127 to 128).
`toInt16(<value>);` | This function clamps ("minmax") the given value to integer 16 value (-32768 to 32767).
`toInt32(<value>);` | This function clamps ("minmax") the given value to integer 32 value (-2147483648 to 2147483647).
`toUInt8(<value>);` | This function clamps ("minmax") the given value to unsigned integer 8 value (0 to 255).
`toUInt16(<value>);` | This function clamps ("minmax") the given value to unsigned integer 16 value (0 to 65535).
`toUInt32(<value>);` | This function clamps ("minmax") the given value to unsigned integer 32 value (0 to 4294967295).


### Polyfills

Name | Description
---- | -----------
`Array.fromAsync();` | The Array.fromAsync() static method creates a new, shallow-copied Array instance from an async iterable, iterable, or array-like object. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync)!
`Array.prototype.toReversed();` | The toReversed() method of an Array instance is the copying counterpart of the reverse() method. It returns a new array with the elements in reversed order. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)!
`Array.prototype.toSorted();` | The toSorted() method of an Array instance is the copying version of the sort() method. It returns a new array with the elements sorted in ascending order. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)!
`Array.prototype.toSpliced();` | The toSpliced() method of an Array instance is the copying version of the splice() method. It returns a new array with some elements removed and/or replaced at a given index. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)!
`Array.prototype.with();` | The with() method of an Array instance is the copying version of using the bracket notation to change the value of a given index. It returns a new array with the element at the given index replaced with the given value. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with)!
`crypto.randomUUID();` | The randomUUID() method of the Crypto interface is used to generate a v4 UUID using a cryptographically secure random number generator. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)!
`globalThis;` | The "global" property of the global object, a writable, configurable, non-enumerable alias of `window`/`self`. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)!
`Map.groupBy();` | The Map.groupBy() static method groups the elements of a given iterable using the values returned by a provided callback function. The final returned Map uses the unique values from the test function as keys, which can be used to get the array of elements in each group. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy)!
`Object.groupBy();` | The Object.groupBy() static method groups the elements of a given iterable according to the string values returned by a provided callback function. The returned object has separate properties for each group, containing arrays with the elements in the group. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)!
`Object.hasOwn();` | The Object.hasOwn() static method returns true if the specified object has the indicated property as its own property. If the property is inherited, or does not exist, the method returns false. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)!
`TypedArray.prototype.toReversed();` | The toReversed() method is the copying counterpart of the reverse() method. It returns a new array with the elements in reversed order. This method has the same algorithm as Array.prototype.reverse(). For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toReversed)!
`TypedArray.prototype.toSorted();` | The toSorted() method is the copying version of the sort() method. It returns a new array with the elements sorted in ascending order. This method has the same algorithm as Array.prototype.toSorted(), except that it sorts the values numerically instead of as strings by default. For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toSorted)!
`TypedArray.prototype.with();` | The with() method is the copying version of using the bracket notation to change the value of a given index. It returns a new array with the element at the given index replaced with the given value. This method has the same algorithm as Array.prototype.with(). For more information please read the [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/with)!
REMOVED polyfills in v3.1.0 | `Array.from();`<br>`Array.of();`<br>`Array.prototype.fill();`<br>`Array.prototype.find();`<br>`Array.prototype.findIndex();`<br>`Object.create();`<br>`String.prototype.startsWith();`<br>`String.prototype.endsWith();`<br>`Array.prototype.copyWithin();`<br>`String.fromCodePoint();`<br>`String.prototype.codePointAt();`<br>`Number.EPSILON;`<br>`Number.isNaN();`<br>`isNaN();`<br>`Number.isInteger();`<br>`Number.isFinite();`<br>`Number.isSafeInteger();`<br>`Number.parseInt();`<br>`Number.parseFloat();`<br>`Math.acosh();`<br>`Math.asinh();`<br>`Math.atanh();`<br>`Math.cbrt();`<br>`Math.clz32();`<br>`Math.cosh();`<br>`Math.expm1();`<br>`Math.fround();`<br>`Math.hypot();`<br>`Math.imul();`<br>`Math.log1p();`<br>`Math.log10();`<br>`Math.log2();`<br>`Math.sign();`<br>`Math.sinh();`<br>`Math.tanh();`<br>`Math.trunc();`
REMOVED polyfills in v3.8.0 | `Array.prototype.values();`<br>`Array.prototype.includes();`<br>`String.prototype.includes();`<br>`String.prototype.repeat();`<br>`String.prototype[Symbol.iterator]();`<br>`Object.assign();`<br>`Object.entries();`<br>`Object.values();`<br>`Object.getOwnPropertyDescriptors();`<br>`RegExp.prototype.flags;`<br>`NodeList.prototype.forEach();`<br>`ChildNode.after();`<br>`ChildNode.before();`<br>`ChildNode.remove();`<br>`ChildNode.replaceWith();`<br>`ParentNode.append();`<br>`ParentNode.prepend();`<br>`Element.prototype.matches();`<br>`Element.prototype.closest();`<br>`Element.prototype.toggleAttribute();`<br>`Element.prototype.getAttributeNames();`<br>`window.screenLeft;`<br>`window.screenTop;`
REMOVED polyfills in v5.6.0 | `Array.prototype.at();`<br>`Array.prototype.findLast();`<br>`Array.prototype.findLastIndex();`<br>`Array.prototype.flat();`<br>`Array.prototype.flatMap();`<br>`Array.prototype.group();`<br>`Array.prototype.groupToMap();`<br>`Number.MIN_SAFE_INTEGER;`<br>`Number.MAX_SAFE_INTEGER;`<br>`Object.fromEntries();`<br>`Object.is();`<br>`String.prototype.at();`<br>`String.prototype.matchAll();`<br>`String.prototype.padStart();`<br>`String.prototype.padEnd();`<br>`String.prototype.replaceAll();`<br>`String.prototype.trimStart();`<br>`String.prototype.trimLeft();`<br>`String.prototype.trimEnd();`<br>`String.prototype.trimRight();`<br>`Typedarray.prototype.at();`<br>`TypedArray.prototype.findLast();`<br>`TypedArray.prototype.findLastIndex();`


### Non-standard polyfills

Name | Description
---- | -----------
`BigInt.prototype.toJSON();` | Using `JSON.stringify();` with any BigInt value will raise a TypeError as BigInt values aren't serialized in JSON by default. This added method can fix this. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
`window.AsyncFunction();` | The AsyncFunction constructor creates a new async function object. In JavaScript, every asynchronous function is actually an AsyncFunction object. Note that AsyncFunction is not a global object, but in the Celestra this is available in the `window` object.
`window.GeneratorFunction();` | The GeneratorFunction constructor creates a new generator function object. In JavaScript every generator function is actually a GeneratorFunction object. Note that GeneratorFunction is not a global object, but in the Celestra this is available in the `window` object.


-----

## Samples

There are code samples in the __celestra.html__ and __unittest.js__.


-----

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
