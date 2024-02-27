````
        ___  ____  __    ____  ___  ____  ____    __
       / __)( ___)(  )  ( ___)/ __)(_  _)(  _ \  /__\
      ( (__  )__)  )(__  )__) \__ \  )(   )   / /(__)\
       \___)(____)(____)(____)(___/ (__) (_)\_)(__)(__)

````

# Celestra

Latest version: **5.6.0**

Date: **2023-10-22T19:41:13.967Z**


### Documentation

The documentation can be found [here](https://github.com/Serrin/Celestra/blob/master/docs.md)


## Download

__A helper JavaScript library with useful functions and polyfills and zero dependencies.__

**Tested browsers:**

*Desktop:*
- *Firefox*
- *Google Chrome*
- *Chromium*
- *Microsoft Edge*
- *Safari*

*Mobile:*

- *Firefox*
- *Chrome*
- *Safari*
- *Chromium*
- *Samsung Internet*
- *Microsoft Edge*

### Notes

This library isn't compatible with the Node.js.

The functions are available in the `celestra` and/or `CEL` object.

Edition|Filename
-------|--------
developer|__celestra.dev.js__
minified|__celestra.min.js__
ES6 module|__celestra.esm.js__
CUT testpage<br>Celestra Unit Tester|__unittest.html__
Version history|__CHANGELOG.md__

DEV and MIN editions: If the `CEL` global variable is used before the loading of the library, then the value of the variable is saved and you can restore with the `noConflict();` function.


### Removed polyfills

Some polyfills have been removed in v3.1.0 and v3.8.0 and v5.6.0. With these files can be reusued the old polyfills if needed.

edition|filename
-------|--------
developer|__celestra-polyfills.dev.js__
minified|__celestra-polyfills.min.js__


### Cheatsheets

Celestra cheatsheet: __celestra-cheatsheet.pdf__

JavaScript cheatsheet: __js-cheatsheet.pdf__


### Apps

BTC standalone app: __btc.app.html__

RPG dice roller: __testgame.html__

Demo plugin documentation: __celestra-demo-plugin.html__

Demo plugin developer source: __celestra-demo-plugin.dev.js__

Demo plugin minified source: __celestra-demo-plugin.min.js__


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
