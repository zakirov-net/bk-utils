!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=8)}({0:function(t,e,r){"use strict";function n(t){return new Promise((function(e){var r=new FileReader;r.onload=function(){e(r.result)},r.readAsDataURL(t)}))}function o(t){return new Promise((function(e){var r=new FileReader;r.onload=function(){e(r.result)},r.readAsArrayBuffer(t)}))}function i(t){return t.replace(/И\u0306/g,"Й").replace(/и\u0306/g,"й").replace(/Е\u0308/g,"Ё").replace(/е\u0308/g,"ё")}function a(t,e){var r=new Blob([e],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(r,t);else{var n=URL.createObjectURL(r),o=document.createElement("a");o.href=n,o.download=t,document.body.appendChild(o),o.click(),URL.revokeObjectURL(n),document.body.removeChild(o)}}r.d(e,"c",(function(){return n})),r.d(e,"b",(function(){return o})),r.d(e,"a",(function(){return i})),r.d(e,"d",(function(){return a}))},1:function(t,e,r){"use strict";Uint8Array.prototype.slice||Object.defineProperty(Uint8Array.prototype,"slice",{value:function(t,e){return new Uint8Array(Array.prototype.slice.call(this,t,e))}});var n=function(){function t(t,e){var r=(void 0===e?{}:e).expandBytes,n=void 0===r?256:r;this._data=new Uint8Array(t),this._length=this._data.length,this._expandBytes=n}return Object.defineProperty(t.prototype,"length",{get:function(){return this._length},enumerable:!0,configurable:!0}),t.prototype.getByte=function(t){return this._data[t]},t.prototype.setByte=function(t,e){return this._data[t]=e,this},t.prototype.push=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this.pushArray(t,!1)},t.prototype.pushOnce=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this.pushArray(t,!0)},t.prototype.pushArray=function(t,e){var r=new Uint8Array(t),n=this._data;if(this._length+r.length>n.length){var o=e||r.length>this._expandBytes?r.length:this._expandBytes;(n=new Uint8Array(this._length+o)).set(this._data),this._data=n}return n.set(r,this._length),this._length+=r.length,this},t.prototype.insert=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return this.insertArray(t,e)},t.prototype.insertArray=function(t,e){var r=new Uint8Array(this._data.length+e.length);return r.set(this._data.subarray(0,t)),r.set(new Uint8Array(e),t),r.set(this._data.subarray(t),t+e.length),this._data=r,this._length+=e.length,this},t.prototype.insertByte=function(t,e){return this.insertArray(t,[e])},t.prototype.getUint8Array=function(){return this.sliceUint8Array(0,this._length)},t.prototype.sliceUint8Array=function(t,e){return(void 0===e||e>this._length)&&(e=this._length),this._data.slice(t,e)},t}();e.a=n},8:function(t,e,r){"use strict";r.r(e);var n;!function(t){t.BK10="BK10",t.BK11="BK11",t.TURBO="TURBO"}(n||(n={}));var o,i=[208,208,48,48],a=[208,208,208,208,48,48,48,48],u=[200,200,48,48],s=[200,200,200,200,200,200,200,200,48,48,48,48,48,48,48,48],c=[200,200,48],f=[200,200,48,48],h=21428,l=25e3,d=4e4,p=4096,y=10,v=200,g=1024,_=2,b=[208,48,48],A=[208,208,208,48,48],B=[200,200,200,48,48,48],w=[200,200,200,200,200,200,200,200,200,200,200,200,48,48,48,48,48,48,48,48,48,48,48,48],m=[496,194,512,512,512,512,512,512,512,512,5569,16384,5568,10306,4191,210,4127,212,5572,582,5573,256,5397,766,2562,5571,256,5572,65486,5573,32,12620,766,12620,1022,2690,12620,765,32454,35330,194,3266,3266,95,256,2563,12620,1022,2691,12620,765,57475,32769,2819,8407,6,1780,5571,8,4290,12620,1022,12620,776,12620,774,12620,772,12620,766,177,257,161,35849,32399,2689,32274,6085,210,4419,6084,212,58820,2,2562,54594,24704,2880,32517,8225,514,95,751,5569,33244,5570,6,34832,0],O=22,U=26,W=751,j=r(0),S=r(1),x=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),L=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return x(e,t),e.prototype.pushWord=function(t){return this.pushArray([255&t,t>>8&255])},e.prototype.insertWord=function(t,e){return this.insertArray(t,[0,0]),this.setWord(t,e)},e.prototype.getWord=function(t){return this._data[t]+(this._data[t+1]<<8)},e.prototype.setWord=function(t,e){return this._data[t]=255&e,this._data[t+1]=e>>8&255,this},e.prototype.getCheckSum=function(t){void 0===t&&(t=0);for(var e=0,r=this._data,n=this._length,o=t;o<n;o++)(e+=r[o])>65535&&(e-=65536,e++);return e},e.prototype.setBit=function(t,e,r){return void 0===r&&(r=1),this._setBits(t,r,e,1)},e.prototype.setBitsPair=function(t,e,r){return void 0===r&&(r=3),this._setBits(t,r,2*e,3)},e.prototype._setBits=function(t,e,r,n){var o=r>7,i=o?this.getWord(t):this.getByte(t);return i&=~(n<<r),i|=e<<r,o?this.setWord(t,i):this.setByte(t,i),this},e}(S.a);function P(t,e,r){void 0===r&&(r=!1);for(var n=new S.a([],{expandBytes:16384}),o=R(n,!!r),h=0;h<p;h++)o(u);o(s),o(a);for(h=0;h<y;h++)o(u);o(s),o(a);var l=e?c:f,d=t.length;for(h=0;h<d;h++){if(20===h){for(var g=0;g<y;g++)o(u);o(s),o(a)}else h===d-2&&(l=f);for(var _=t.getByte(h),b=1;b<255;b<<=1)o(l),o(_&b?a:i)}if(!r)for(h=0;h<v;h++)o(u);return n}function R(t,e){return void 0===e&&(e=!1),e?function(e){for(var r=0;r<e.length;r++)t.push(e[r],e[r])}:function(e){t.pushArray(e)}}var k="юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ";function T(t,e,r,o){var i;void 0===o&&(o=!1),e=Object(j.a)(e);var a=r===n.TURBO,u=a?d:r===n.BK11?l:h;if(a){1&t.length&&t.push(0);var s=function(t){var e,r=new L(2*m.length);m.forEach((function(t,n){var o=2*n;r.setWord(o,t),e||t!==W||(e=o)}));var n=t.getWord(0);r.setWord(O,n);var o=t.getWord(2)+2;if(r.setWord(U,o),e){var i=void 0;if(n<512){var a=512-n+4-4;i=t.getWord(a)}else i=n;r.setWord(e,i)}return r}(t);i=P(s=M(s,e),!0,!0);var c=function(t){var e=new S.a([],{expandBytes:16384}),r=R(e),n=new L(t.sliceUint8Array(4)),o=n.getCheckSum();n.pushWord(o);for(var i=0;i<g;i++)r(B);for(r(w),i=0;i<n.length;i++)for(var a=n.getByte(i),u=1;u<255;u<<=1)r(a&u?A:b);for(i=0;i<_;i++)r(B);return e}(t);i.pushArray(c.getUint8Array())}else{i=P(M(t,e),o)}return function(t,e){var r=t.length,n=28+(8+r),o=1*e,i=[82,73,70,70,255&n,n>>8&255,n>>16&255,n>>24&255,87,65,86,69,102,109,116,32,16,0,0,0,1,0,1,0,255&e,e>>8&255,e>>16&255,e>>24&255,255&o,o>>8&255,o>>16&255,o>>24&255,1,0,8,0,100,97,116,97,255&r,r>>8&255,r>>16&255,r>>24&255],a=new Uint8Array(i.length+t.length);return a.set(i),a.set(t,i.length),a}(i.getUint8Array(),u)}function M(t,e){var r=new L(t.getUint8Array());e=e.substr(0,16).padEnd(16," "),r.insertArray(4,function(t){for(var e=[],r=0;r<t.length;r++){var n=t.charCodeAt(r);if(n<32)n=32;else if(n>127){var o=t[r],i=k.indexOf(o);n=i>-1?192+i:"Ё"===o?229:"ё"===o?197:32}e.push(n)}return e}(e));var n=r.getCheckSum(20);return r.pushWord(n),r}Array.from(document.querySelectorAll("[name=model]")).forEach((function(t){t.addEventListener("click",(function(){var t;t=this.value,F("#speedContainer").style.display=t===n.TURBO?"none":"block"}))})),q("#convertButton").addEventListener("click",(function(){if(C&&!C.error){var t=H.files[0],e=F("[name=model]:checked").value,r=t.name.replace(/\.bin$/i,""),n=F("#speed").checked,o=T(C.binary,r,e,n);Object(j.d)(r+".wav",o)}}));var C,E=q("#error"),K=q("#address"),H=F("#file");function q(t){return document.querySelector(t)}function F(t){return q(t)}H.addEventListener("change",(function(){E.innerHTML="",K.innerHTML="";var t=H.files[0];t?Object(j.b)(t).then((function(t){var e,r;(r=new L(t)).length<6?e="Слишком короткий bin-файл":r.getWord(2)!==r.length-4&&(e="Файл не соответствует формату БК"),(C={binary:r,error:e}).error?E.innerHTML=C.error+"<br><br>":K.innerHTML="Адрес загрузки файла: "+C.binary.getWord(0).toString(8)+"<sub>8</sub><br><br>"})):C=void 0}))}});
//# sourceMappingURL=wav-converter.js.map