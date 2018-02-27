/**
 * @name Celestra
 * @version 1.18.4
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */
(function (window,document) {
"use strict";

/* wrapper object */
var Celestra = {};

Celestra.version = "Celestra v1.18.4";

Celestra.noConflict = function () {
  window._ = Celestra._prevUnderscore;
  return Celestra;
};

/* polyfills */
if(!Array.from){Array.from=function(o,fn){var a=Array.prototype.slice.call(o);if(fn){return a.map(fn);}return a;};}
if(!Array.of){Array.of=function(){return Array.prototype.slice.call(arguments);};}
if(!Object.create){Object.create=function(o){function F(){} F.prototype=o;return new F();};}
if(!Object.assign){Object.assign=function(){var t=arguments[0]||{};for(var i=0,l=arguments.length;i<l;i++){var s=arguments[i];for(var a in s){if(s.hasOwnProperty(a)){t[a]=s[a];}}}return t;};}
if(!Array.prototype.includes){Array.prototype.includes=function(v,f){if(!f){var f=0;}return (this.indexOf(v,f)>-1);};}
if(!String.prototype.includes){String.prototype.includes=function(v,f){if(!f){var f=0;}return (this.indexOf(v,f)>-1);};}
[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach(function(p){if(!p.after){p.after=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.parentNode.insertBefore((e instanceof Node?e:document.createTextNode(String(e))),t.nextSibling);});};}if(!p.before){p.before=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.parentNode.insertBefore((e instanceof Node?e:document.createTextNode(String(e))),t);});};}if(!p.remove){p.remove=function(){this.parentNode.removeChild(this);};}if(!p.replaceWith){p.replaceWith=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.parentNode.replaceChild((e instanceof Node?e:document.createTextNode(String(e))),t);});};}if(!p.append){p.append=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.appendChild(e instanceof Node?e:document.createTextNode(String(e)));});};}if(!p.prepend){p.prepend=function(){var t=this;Array.prototype.forEach.call(arguments,function(e){t.insertBefore((e instanceof Node?e:document.createTextNode(String(e))),t.firstChild);});};}});
if(!NodeList.prototype.forEach){NodeList.prototype.forEach=function(f){for(var i=0,l=this.length;i<l;i++){f(this[i],i,this);}};}
/* Number ES6 */
if(Number.MIN_SAFE_INTEGER===undefined){Number.MIN_SAFE_INTEGER=-9007199254740991;}
if(Number.MAX_SAFE_INTEGER===undefined){Number.MAX_SAFE_INTEGER=9007199254740991;}
if(Number.EPSILON===undefined){Number.EPSILON=Math.pow(2,-52);}
if(!Number.isNaN){Number.isNaN=function(v){return v!==v;};}
if(!window.isNaN){window.isNaN=function isNaN(v){return Number.isNaN(Number(v));};}
if(!Number.isInteger){Number.isInteger=function(v){return typeof v==="number"&&isFinite(v)&&v>-9007199254740992&&v<9007199254740992&&Math.floor(v)===v;};}
if(!Number.isFinite){Number.isFinite=function(v){return typeof v==="number"&&isFinite(v);};}
if(!Number.isSafeInteger){Number.isSafeInteger=function(v){return Number.isInteger(v)&&Math.abs(v)<=Number.MAX_SAFE_INTEGER;};}
/* basic api */
window.doc=document;
Celestra.qsa = function qsa(s,c){if(c){var ic=(typeof c==="string")?document.querySelector(c):c;}var el=Array.prototype.slice.call((ic||document).querySelectorAll(s));el.each=el.forEach;return el;}
Celestra.qs = function qs(s,c){if(c){var ic=(typeof c==="string")?document.querySelector(c):c;}return (ic||document).querySelector(s);}
Celestra.domReady = function domReady(fn){if(document.readyState!=="loading"){fn();}else{document.addEventListener("DOMContentLoaded",function(event){fn();});}}
Celestra.random = function random(i,a){if(a===undefined){var a=i;i=0;}return Math.floor(Math.random()*(a-i+1))+i;}
Celestra.inherit = function inherit(c,p){c.prototype=Object.create(p.prototype);c.prototype.constructor=c;return c;}
Celestra.getScript = function getScript(u,s){var scr=document.createElement("script");scr.type="text\/javascript";scr.src=u;scr.onerror=function(e){throw new URIError("Loading failed for the script with source "+e.target.src);};if(s){scr.onreadystatechange=s;scr.onload=s;}(document.head||document.getElementsByTagName("head")[0]).appendChild(scr);}
Celestra.getScripts = function getScripts(s){if(Array.isArray(s)){s.forEach(function(e){if(e.success){Celestra.getScript(e.url,e.success);}else{Celestra.getScript(e.url);}});}}
Celestra.getStyle = function getStyle(h,s){var stl=document.createElement("link");stl.rel="stylesheet";stl.type="text\/css";stl.href=h;stl.onerror=function(e){throw new URIError("Loading failed for the style with source "+e.target.href);};if(s){stl.onreadystatechange=s;stl.onload=s;}(document.head||document.getElementsByTagName("head")[0]).appendChild(stl);}
Celestra.getStyles = function getStyles(s){if(Array.isArray(s)){s.forEach(function(e){if(e.success){Celestra.getStyle(e.href,e.success);}else{Celestra.getStyle(e.href);}});}}
Celestra.getUrlVar = function getUrlVar(n){var r={},w=window.location.search.substring(1).split("&");for(var i=0,l=w.length;i<l;i++){var e=w[i].split("=");r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);}if(n){return r[n]?r[n]:undefined;}else{return r;}}
Celestra.getUrlVarFromString = function getUrlVarFromString(qstr,n){var r={},w=qstr.substring(1).split("&");for(var i=0,l=w.length;i<l;i++){var e=w[i].split("=");r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);}if(n){return r[n]?r[n]:undefined;}else{return r;}}
Celestra.obj2string = function obj2string(o){var s="";for(var p in o){if(o.hasOwnProperty(p)){s+=encodeURIComponent(p)+"="+encodeURIComponent(o[p])+"&";}}return s.substring(0,s.length-1);}
Celestra.getType = function getType(v,t){var ot=(typeof v).toLowerCase();if(ot==="object"){ot=Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/,"$1").toLowerCase();}if(arguments.length===2){return ot===t.toLowerCase();}return ot;}
Celestra.extend = function extend(){if(typeof arguments[0]==="boolean"){var t=arguments[1],d=arguments[0],s=2;}else{var t=arguments[0],d=false,s=1;}for(var i=s,l=arguments.length;i<l;i++){if(arguments[i]!==null&&arguments[i]!==undefined){for(var a in arguments[i]){if(Object.prototype.toString.call(arguments[i][a])==="[object Object]"&&d){t[a]=extend(true,{},arguments[i][a]);}else{t[a]=arguments[i][a];}}}}return t;}
Celestra.getFullscreen = function getFullscreen(){return (document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement||undefined);}
Celestra.setFullscreenOn = function setFullscreenOn(s){if(typeof s==="string"){var e=document.querySelector(s);}else if(typeof s==="object"){var e=s;}if(e.requestFullscreen){e.requestFullscreen();}else if(e.mozRequestFullScreen){e.mozRequestFullScreen();}else if(e.webkitRequestFullscreen){e.webkitRequestFullscreen();}else if(e.msRequestFullscreen){e.msRequestFullscreen();}}
Celestra.setFullscreenOff = function setFullscreenOff(){if(document.exitFullscreen){document.exitFullscreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.webkitExitFullscreen){document.webkitExitFullscreen();}else if(document.msExitFullscreen){document.msExitFullscreen();}}
Celestra.getLocation = function getLocation(s,e){if(!e){var e=function(){};}function getE(error){e("ERROR("+error.code+"): "+error.message);}if(navigator.geolocation){navigator.geolocation.getCurrentPosition(s,getE);}else{getE("Geolocation is not supported in this browser.");}}
Celestra.getDoNotTrack = function getDoNotTrack(){if(navigator.doNotTrack===true||navigator.doNotTrack===1||navigator.doNotTrack==="1"||window.doNotTrack===true||window.doNotTrack===1||window.doNotTrack==="1"||navigator.msDoNotTrack===true||navigator.msDoNotTrack===1||navigator.msDoNotTrack==="1"){return true;}return false;}
Celestra.form2array = function form2array(f){var fld,a=[];if(typeof f==="object"&&f.nodeName.toLowerCase()==="form"){for(var i=0,len=f.elements.length;i<len;i++){fld=f.elements[i];if(fld.name&&!fld.disabled&&fld.type!=="file"&&fld.type!=="reset"&&fld.type!=="submit"&&fld.type!=="button"){if(fld.type==="select-multiple"){for(var j=0,l=f.elements[i].options.length;j<l;j++){if(fld.options[j].selected){ a.push(encodeURIComponent(fld.name)+"="+encodeURIComponent(fld.options[j].value));}}}else if((fld.type!=="checkbox"&&fld.type!=="radio")||fld.checked){a.push(encodeURIComponent(fld.name)+"="+encodeURIComponent(fld.value));}}}}return a;}
Celestra.form2string = function form2string(f){return Celestra.form2array(f).join("&").replace(/%20/g,"+");}
Celestra.constant = function constant(v){return function(){return v;};}
Celestra.identity = function identity(v){return v;}
Celestra.noop = function noop(){return undefined;}
Celestra.repeat = function repeat(r,fn){for(var i=0;i<r;i++){fn(i);}}
Celestra.initArray = function initArray(){return [];}
Celestra.initObject = function initObject(){return {};}
Celestra.initString = function initString(){return "";}
Celestra.initTrue = function initTrue(){return true;}
Celestra.initFalse = function initFalse(){return false;}
/* FP */
Celestra.toFunction = function toFunction(fn){return Function.prototype.call.bind(fn);}
Celestra.bind = Function.prototype.call.bind(Function.prototype.bind);
Celestra.toArray = (Array.from||Function.prototype.call.bind(Array.prototype.slice));
Celestra.toObject = function toObject(a){var o={length:a.length};for(var i=0,len=a.length;i<len;i++){o[""+i]=a[i];}return o;}
Celestra.forEach = Function.prototype.call.bind(Array.prototype.forEach);
Celestra.each = Celestra.forEach;
Celestra.map = Function.prototype.call.bind(Array.prototype.map);
Celestra.forIn = function forIn(o,fn){for(var p in o){if(o.hasOwnProperty(p)){fn(o[p],p,o);}}}
Celestra.mapIn = function mapIn(o,fn){var r={};for(var p in o){if(o.hasOwnProperty(p)){r[p]=fn(o[p],p,o);}}return r;}
/* DOM */
Celestra.domCreate = function domCreate(t,ps,iH){var el=document.createElement(t);if(ps){for(var p in ps){if(p!=="style"){el[p]=ps[p];}else{for(var s in ps[p]){el.style[s]=ps[p][s];}}}}if(iH){el.innerHTML=iH;}return el;}
Celestra.domGetCSS = function domGetCSS(e,p){return (window.getComputedStyle?getComputedStyle(e,null):e.currentStyle)[p];}
Celestra.domSetCSS = function domSetCSS(e,n,v){if(typeof n==="string"){e.style[n]=v;}else if(typeof n==="object"){for(var p in n){e.style[p]=n[p];}}}
Celestra.domFadeIn = function domFadeIn(e,dur,disp){var s=e.style,step=25/(dur||500);s.opacity=(s.opacity||0);s.display=(disp||"");(function fade(){(s.opacity=parseFloat(s.opacity)+step)>1?s.opacity=1:setTimeout(fade,25);})();}
Celestra.domFadeOut = function domFadeOut(e,dur){var s=e.style,step=25/(dur||500);s.opacity=(s.opacity||1);(function fade(){(s.opacity-=step)<0?s.display="none":setTimeout(fade,25);})();}
Celestra.domFadeToggle = function domFadeToggle(e,dur,disp){if((window.getComputedStyle?getComputedStyle(e,null):e.currentStyle).display==="none"){Celestra.domFadeIn(e,dur,(disp||""));}else{Celestra.domFadeOut(e,dur);}}
Celestra.domHide = function domHide(e){e.style.display="none";}
Celestra.domShow = function domShow(e,d){e.style.display=(d||"");}
Celestra.domToggle = function domToggle(e,d){if((window.getComputedStyle?getComputedStyle(e,null):e.currentStyle).display==="none"){e.style.display=(d||"");}else{e.style.display="none";}}
Celestra.domOn = function domOn(el,et,fn){return el.addEventListener?el.addEventListener(et,fn):el.attachEvent("on"+et,fn);}
Celestra.domOff = function domOff(el,et,fn){return el.removeEventListener?el.removeEventListener(et,fn):el.detachEvent("on"+et,fn);}
Celestra.domTrigger = function domTrigger(el,et){return el[et]();}
/* AJAX */
Celestra.getJson = function getJson(url,success){_.getAjax(url,"json",success);}
Celestra.getText = function getText(url,success){_.getAjax(url,"text",success);}
Celestra.getAjax = function getAjax(url,format,success,error,user,password){var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");if(typeof user==="string"&&typeof password==="string"){xhr.open("GET",url,true,user,password);}else{xhr.open("GET",url,true);}xhr.onreadystatechange=function(){if(this.readyState===4&&this.status===200){switch(format.toLowerCase()){case "text":success(this.responseText);break;case "json":success(JSON.parse(this.responseText));break;case "xml":success(this.responseXML);break;default:success(this.responseText);}}};if(error){xhr.onerror=error;}xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.send();}
Celestra.postAjax = function postAjax(url,data,format,success,error,user,password){var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");if(typeof user==="string"&&typeof password==="string"){xhr.open("POST",url,true,user,password);}else{xhr.open("POST",url,true);}xhr.onreadystatechange=function(){if(this.readyState===4&&this.status===200){switch(format.toLowerCase()){case "text":success(this.responseText);break;case "json":success(JSON.parse(this.responseText));break;case "xml":success(this.responseXML);break;default:success(this.responseText);}}};if(error){xhr.onerror=error;}xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");xhr.send(encodeURIComponent(data));}
Celestra.getCors = function getCors(url,format,success,error,user,password){var xhr=new XMLHttpRequest();if(!("withCredentials" in xhr))xhr=new XDomainRequest();if(typeof user==="string"&&typeof password==="string"){xhr.open("GET",url,true,user,password);}else{xhr.open("GET",url,true);}xhr.onload=function(request){switch(format.toLowerCase()){case "text":success(request.target.responseText||request.currentTarget.response);break;case "json":success(JSON.parse(request.target.responseText||request.currentTarget.response));break;case "xml":success(request.target.responseXML||request.currentTarget.responseXML);break;default:success(request.target.responseText||request.currentTarget.response);}};if(error){xhr.onerror=error;}xhr.send();}
Celestra.postCors = function postCors(url,data,format,success,error,user,password){var xhr=new XMLHttpRequest();if(!("withCredentials" in xhr))xhr=new XDomainRequest();if(typeof user==="string"&&typeof password==="string"){xhr.open("POST",url,true,user,password);}else{xhr.open("POST",url,true);}xhr.onload=function(request){switch(format.toLowerCase()){case "text":success(request.target.responseText||request.currentTarget.response);break;case "json":success(JSON.parse(request.target.responseText||request.currentTarget.response));break;case "xml":success(request.target.responseXML||request.currentTarget.responseXML);break;default:success(request.target.responseText||request.currentTarget.response);}};if(error){xhr.onerror=error;}xhr.send(encodeURIComponent(data));}
/* type checking */
Celestra.isString = function isString(v){return typeof v==="string";}
Celestra.isChar = function isChar(v){if(typeof v==="string"){if(v.length===1){return true;}}return false;}
Celestra.isNumber = function isNumber(v){return typeof v==="number";}
Celestra.isInteger = Number.isInteger;
Celestra.isFloat = function isFloat(v){return typeof v==="number"&&!!(v%1);}
Celestra.isBoolean = function isBoolean(v){return typeof v==="boolean";}
Celestra.isObject = function isObject(v){return typeof v==="object";}
Celestra.isEmptyObject = function isEmptyObject(v){if(typeof v==="object"){for(var n in v){return false;}return true;}return false;}
Celestra.isFunction = function isFunction(v){return typeof v==="function";}
Celestra.isArray = Array.isArray;
Celestra.isEmptyArray = function isEmptyArray(v){if(Array.isArray(v)){if(v.length===0){return true;}}return false;}
Celestra.isArraylike = function isArraylike(v){return v&&typeof v==="object"&&typeof v.length==="number"&&v.length>=0&&v.length%1===0;}
Celestra.isNull = function isNull(v){return v===null;}
Celestra.isUndefined = function isUndefined(v){return v===undefined;}
Celestra.isNullOrUndefined = function isNullOrUndefined(v){return v===null||v===undefined;}
Celestra.isPrimitive = function isPrimitive(v){return v===null||typeof v!=="object"&&typeof v!=="function";}
Celestra.isSymbol = function isSymbol(v){return typeof v==="symbol";}
Celestra.isMap = function isMap(v){return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/,"$1").toLowerCase()==="map";}
Celestra.isSet = function isSet(v){return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/,"$1").toLowerCase()==="set";}
Celestra.isDate = function isDate(v){return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/,"$1").toLowerCase()==="date";}
Celestra.isRegexp = function isRegexp(v){return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/,"$1").toLowerCase()==="regexp";}
Celestra.isElement = function isElement(v){return typeof v==="object"&&v.nodeType===1;}
/* cookie */
Celestra.setCookie = function setCookie(name,value,hours,path,domain,secure,HttpOnly){if(!hours){var hours=8760;}var expire=new Date();expire.setTime(expire.getTime()+(Math.round(hours*60*60*1000)));document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+"; expires="+expire.toUTCString()+(path?"; path="+path:"")+(domain?"; domain="+domain:"")+(secure?"; secure":"")+(HttpOnly?"; HttpOnly":"")+";";}
Celestra.getCookie = function getCookie(name){if(document.cookie.length!==0){var r={},a=document.cookie.split(";");for(var i=0,l=a.length;i<l;i++){var e=a[i].trim().split("=");r[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);}if(name){return r[name]?r[name]:null;}else{return r;}}return name?null:{};}
Celestra.hasCookie = function hasCookie(name){return (document.cookie.indexOf(encodeURIComponent(name)+"=")!==-1);}
Celestra.removeCookie = function removeCookie(name,path,domain,secure,HttpOnly){if(document.cookie.indexOf(encodeURIComponent(name)+"=")!==-1){document.cookie=encodeURIComponent(name)+"="+"; expires=Thu, 01 Jan 1970 00:00:01 GMT"+(path?"; path="+path:"")+(domain?"; domain="+domain:"")+(secure?"; secure":"")+(HttpOnly?"; HttpOnly":"")+";";return true;}return false;}

/* AMD loader */
if (typeof define === "function" && define.amd) {
  define(function () {
    return { Celestra: Celestra };
  });
}

/* CommonJS loader */
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = Celestra;
}

/* global scope */
if (typeof window !== "undefined") {
  window.Celestra = Celestra;
  Celestra._prevUnderscore = window._;
  window._ = Celestra;
}

}(window,document));
