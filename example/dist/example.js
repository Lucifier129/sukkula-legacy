!function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=6)}([function(t,n,e){"use strict";function r(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){i(t,n,e[n])})}return t}function i(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}Object.defineProperty(n,"__esModule",{value:!0}),n.logAll=n.logValue=n.log=n.guard=n.mapValue=n.constant=n.identity=n.noop=n.pipe=void 0;n.pipe=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return n.reduce(function(t,n){return n(t)})};n.noop=function(){};n.identity=function(t){return t};n.constant=function(t){return function(){return t}};n.mapValue=function(t,n){return Object.keys(t).reduce(function(e,r){return e[r]=n(r,t[r]),e},{})};var o=function(t){var n=!1,e=!1;return r({},t,{start:function(){n||e||(n=!0,t.start())},next:function(){if(!n)throw new Error("call [next] before [start]");e||t.next()},finish:function(){e||(e=!0,n&&t.finish())},error:function(r){if(!n)throw new Error("call [next] before [start]");e||t.error(r)},original:t})};n.guard=o;n.log=function(t){return function(n){return function(e){return n({start:function(){console.log(t,"start"),e.start()},next:function(n){console.log(t,"next",n),e.next(n)},finish:function(){console.log(t,"finish"),e.finish()},error:function(n){console.log(t,"error",n),e.error(n)}})}}};n.logValue=function(t){return function(n){return function(e){return n(r({},e,{next:function(n){console.log(t,"next",n),e.next(n)}}))}}};n.logAll=function(t){return function(n){return function(e){var r=n({start:function(){console.log(t,"sink:start"),e.start()},next:function(n){console.log(t,"sink:next",n),e.next(n)},finish:function(){console.log(t,"sink:finish"),e.finish()},error:function(n){console.log(t,"sink:error",n),e.error(n)}});return o({start:function(){console.log(t,"action:start"),r.start()},next:function(n){console.log(t,"action:next",n),r.next(n)},finish:function(){console.log(t,"action:finish"),r.finish()},error:function(n){console.log(t,"action:error",n),r.error(n)}})}}}},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.onError=n.onFinish=n.onNext=n.onStart=n.on=n.run=n.pullable=n.fork=void 0;var r=e(0);function i(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){o(t,n,e[n])})}return t}function o(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}n.fork=function(t){return function(n){return function(e){var i=(0,r.mapValue)(e,function(n,e){return function(r){t[n](r),e(r)}});return n(i)}}};var u=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(n){var e=n(i({},t,{start:function(){t.start&&t.start(),e.next()},next:function(n){t.next&&t.next(n),e.next()},finish:function(){t.finish&&t.finish()}}));return e}};n.pullable=u;n.run=function(t){return function(n){"function"==typeof t&&(t={next:t});var e=u(t)(n);return e.start(),e}};var s=function(t){return function(n){return function(e){return function(r){return e(i({},r,o({},t,function(e){n(e),r[t](e)})))}}}};n.on=s;var c=s("start");n.onStart=c;var a=s("next");n.onNext=a;var f=s("finish");n.onFinish=f;var l=s("error");n.onError=l},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.fromPromise=n.fromRange=n.of=n.fromArray=n.fromEvent=n.interval=n.empty=void 0;var r=e(0);function i(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,i=!1,o=void 0;try{for(var u,s=t[Symbol.iterator]();!(r=(u=s.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){u(t,n,e[n])})}return t}function u(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var s=function(t){return(0,r.guard)(o({},t,{next:t.finish}))};n.empty=s;n.interval=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;return function(n){var e=0,i=null,u=r.noop;return(0,r.guard)(o({},n,{start:function(){i=setInterval(function(){return n.next(e++)},t),n.start()},next:u,finish:function(){clearInterval(i),n.finish()}}))}};var c=[["addEventListener","removeEventListener"],["addListener","removeListener"],["subscribe","unsubscribe"],["on","off"]];n.fromEvent=function(t,n){for(var e=arguments.length,u=new Array(e>2?e-2:0),s=2;s<e;s++)u[s-2]=arguments[s];return function(e){var s=i(function(t){var n=c.filter(function(n){return n[0]in t})[0];if(!n)throw new Error("unsupport event emitter");return n}(t),2),a=s[0],f=s[1],l=function(t){return e.next(t)},h=r.noop;return(0,r.guard)(o({},e,{start:function(){t[a].apply(t,[n,l].concat(u)),e.start()},next:h,finish:function(){t[f].apply(t,[n,l].concat(u)),e.finish()}}))}};var a=function(t){return function(n){var e=0,i=(0,r.guard)(o({},n,{next:function(){e<t.length?n.next(t[e++]):e===t.length&&i.finish()}}));return i}};n.fromArray=a;n.of=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return a(n)};n.fromRange=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return function(i){if(t===n)return s(i);var u=n>t,c=t-e,a=(0,r.guard)(o({},i,{next:function(t){c+=e,(u?c<=n:c>=n)?i.next(c):(u?c>n:c<n)&&a.finish()}}));return a}};n.fromPromise=function(t){return function(n){var e=!1;t.then(function(t){e||(n.next(t),i.finish())},function(t){e||n.error(t)});var i=(0,r.guard)(o({},n,{next:r.noop,finish:function(){e=!0,n.finish()}}));return i}}},function(t,n){function e(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function r(t){return"function"==typeof t}function i(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}t.exports=e,e.EventEmitter=e,e.prototype._events=void 0,e.prototype._maxListeners=void 0,e.defaultMaxListeners=10,e.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},e.prototype.emit=function(t){var n,e,u,s,c,a;if(this._events||(this._events={}),"error"===t&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if((n=arguments[1])instanceof Error)throw n;var f=new Error('Uncaught, unspecified "error" event. ('+n+")");throw f.context=n,f}if(o(e=this._events[t]))return!1;if(r(e))switch(arguments.length){case 1:e.call(this);break;case 2:e.call(this,arguments[1]);break;case 3:e.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),e.apply(this,s)}else if(i(e))for(s=Array.prototype.slice.call(arguments,1),u=(a=e.slice()).length,c=0;c<u;c++)a[c].apply(this,s);return!0},e.prototype.addListener=function(t,n){var u;if(!r(n))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,r(n.listener)?n.listener:n),this._events[t]?i(this._events[t])?this._events[t].push(n):this._events[t]=[this._events[t],n]:this._events[t]=n,i(this._events[t])&&!this._events[t].warned&&(u=o(this._maxListeners)?e.defaultMaxListeners:this._maxListeners)&&u>0&&this._events[t].length>u&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},e.prototype.on=e.prototype.addListener,e.prototype.once=function(t,n){if(!r(n))throw TypeError("listener must be a function");var e=!1;function i(){this.removeListener(t,i),e||(e=!0,n.apply(this,arguments))}return i.listener=n,this.on(t,i),this},e.prototype.removeListener=function(t,n){var e,o,u,s;if(!r(n))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(u=(e=this._events[t]).length,o=-1,e===n||r(e.listener)&&e.listener===n)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,n);else if(i(e)){for(s=u;s-- >0;)if(e[s]===n||e[s].listener&&e[s].listener===n){o=s;break}if(o<0)return this;1===e.length?(e.length=0,delete this._events[t]):e.splice(o,1),this._events.removeListener&&this.emit("removeListener",t,n)}return this},e.prototype.removeAllListeners=function(t){var n,e;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(n in this._events)"removeListener"!==n&&this.removeAllListeners(n);return this.removeAllListeners("removeListener"),this._events={},this}if(r(e=this._events[t]))this.removeListener(t,e);else if(e)for(;e.length;)this.removeListener(t,e[e.length-1]);return delete this._events[t],this},e.prototype.listeners=function(t){return this._events&&this._events[t]?r(this._events[t])?[this._events[t]]:this._events[t].slice():[]},e.prototype.listenerCount=function(t){if(this._events){var n=this._events[t];if(r(n))return 1;if(n)return n.length}return 0},e.listenerCount=function(t,n){return t.listenerCount(n)}},function(t,n,e){"use strict";e.r(n),e.d(n,"Spring",function(){return u});var r=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var i in n=arguments[e])Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i]);return t};function i(t,n){if(!t)throw new Error(n)}function o(t,n){return void 0!==t&&null!==t?t:n}var u=function(){function t(t){void 0===t&&(t={}),this._listeners=[],this._currentAnimationStep=0,this._currentTime=0,this._springTime=0,this._currentValue=0,this._currentVelocity=0,this._isAnimating=!1,this._oscillationVelocityPairs=[],this._config={fromValue:o(t.fromValue,0),toValue:o(t.toValue,1),stiffness:o(t.stiffness,100),damping:o(t.damping,10),mass:o(t.mass,1),initialVelocity:o(t.initialVelocity,0),overshootClamping:o(t.overshootClamping,!1),allowsOverdamping:o(t.allowsOverdamping,!1),restVelocityThreshold:o(t.restVelocityThreshold,.001),restDisplacementThreshold:o(t.restDisplacementThreshold,.001)},this._currentValue=this._config.fromValue,this._currentVelocity=this._config.initialVelocity}return t.prototype.start=function(){var t=this,n=this._config,e=n.fromValue,r=n.toValue,i=n.initialVelocity;return e===r&&0===i||(this._reset(),this._isAnimating=!0,this._currentAnimationStep||(this._notifyListeners("onStart"),this._currentAnimationStep=requestAnimationFrame(function(n){t._step(Date.now())}))),this},t.prototype.stop=function(){return this._isAnimating?(this._isAnimating=!1,this._notifyListeners("onStop"),this._currentAnimationStep&&(cancelAnimationFrame(this._currentAnimationStep),this._currentAnimationStep=0),this):this},Object.defineProperty(t.prototype,"currentValue",{get:function(){return this._currentValue},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"currentVelocity",{get:function(){return this._currentVelocity},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isAtRest",{get:function(){return this._isSpringAtRest()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isAnimating",{get:function(){return this._isAnimating},enumerable:!0,configurable:!0}),t.prototype.updateConfig=function(t){this._advanceSpringToTime(Date.now());var n={fromValue:this._currentValue,initialVelocity:this._currentVelocity};return this._config=r({},this._config,n,t),this._reset(),this},t.prototype.onStart=function(t){return this._listeners.push({onStart:t}),this},t.prototype.onUpdate=function(t){return this._listeners.push({onUpdate:t}),this},t.prototype.onStop=function(t){return this._listeners.push({onStop:t}),this},t.prototype.removeListener=function(t){return this._listeners=this._listeners.reduce(function(n,e){return-1!==Object.values(e).indexOf(t)||n.push(e),n},[]),this},t.prototype.removeAllListeners=function(){return this._listeners=[],this},t.prototype._reset=function(){this._currentTime=Date.now(),this._springTime=0,this._currentValue=this._config.fromValue,this._currentVelocity=this._config.initialVelocity},t.prototype._notifyListeners=function(t){var n=this;this._listeners.forEach(function(e){var r=e[t];"function"==typeof r&&r(n)})},t.prototype._step=function(t){var n=this;this._advanceSpringToTime(t,!0),this._isAnimating&&(this._currentAnimationStep=requestAnimationFrame(function(t){return n._step(Date.now())}))},t.prototype._advanceSpringToTime=function(n,e){if(void 0===e&&(e=!1),this._isAnimating){var r=n-this._currentTime;r>t.MAX_DELTA_TIME_MS&&(r=t.MAX_DELTA_TIME_MS),this._springTime+=r;var o=this._config.damping,u=this._config.mass,s=this._config.stiffness,c=this._config.fromValue,a=this._config.toValue,f=-this._config.initialVelocity;i(u>0,"Mass value must be greater than 0"),i(s>0,"Stiffness value must be greater than 0"),i(o>0,"Damping value must be greater than 0");var l=o/(2*Math.sqrt(s*u)),h=Math.sqrt(s/u)/1e3,p=h*Math.sqrt(1-l*l),v=h*Math.sqrt(l*l-1),m=a-c;l>1&&!this._config.allowsOverdamping&&(l=1);var g=0,y=0,_=this._springTime;if(l<1)g=a-(d=Math.exp(-l*h*_))*((f+l*h*m)/p*Math.sin(p*_)+m*Math.cos(p*_)),y=l*h*d*(Math.sin(p*_)*(f+l*h*m)/p+m*Math.cos(p*_))-d*(Math.cos(p*_)*(f+l*h*m)-p*m*Math.sin(p*_));else if(1===l)g=a-(d=Math.exp(-h*_))*(m+(f+h*m)*_),y=d*(f*(_*h-1)+_*m*(h*h));else{var d;g=a-(d=Math.exp(-l*h*_))*((f+l*h*m)*Math.sinh(v*_)+v*m*Math.cosh(v*_))/v,y=d*l*h*(Math.sinh(v*_)*(f+l*h*m)+m*v*Math.cosh(v*_))/v-d*(v*Math.cosh(v*_)*(f+l*h*m)+v*v*m*Math.sinh(v*_))/v}if(this._currentTime=n,this._currentValue=g,this._currentVelocity=y,e&&(this._notifyListeners("onUpdate"),this._isAnimating))return this._isSpringOvershooting()||this._isSpringAtRest()?(0!==s&&(this._currentValue=a,this._currentVelocity=0,this._notifyListeners("onUpdate")),void this.stop()):void 0}},t.prototype._isSpringOvershooting=function(){var t=this._config,n=t.stiffness,e=t.fromValue,r=t.toValue,i=!1;return t.overshootClamping&&0!==n&&(i=e<r?this._currentValue>r:this._currentValue<r),i},t.prototype._isSpringAtRest=function(){var t=this._config,n=t.stiffness,e=t.toValue,r=t.restDisplacementThreshold,i=t.restVelocityThreshold,o=Math.abs(this._currentVelocity)<=i;return 0!==n&&Math.abs(e-this._currentValue)<=r&&o},t.MAX_DELTA_TIME_MS=1/60*1e3*4,t}()},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.startWith=n.reduce=n.then=n.switchMap=n.takeLast=n.takeUntil=n.skip=n.scan=n.take=n.filter=n.mapTo=n.map=n.combineObject=n.combineWith=n.combine=n.mergeWith=n.merge=n.concatSourceBy=n.concatBy=n.concatSource=n.concat=void 0;var r=e(0),i=e(1),o=e(2);function u(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function s(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){c(t,n,e[n])})}return t}function c(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var a=function(t){return function(n){var e=0,o=null,u={next:n.next,error:n.error,finish:function(){o=null,a&&c()}},c=function(){var n=t(e++);if(!n)return a.finish();(o=(0,i.pullable)(u)(n)).start()},a=(0,r.guard)(s({},n,{start:function(){n.start(),c()},next:r.noop,finish:function(){a=null,o&&o.finish(),n.finish()}}));return a}},f=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return a(function(t){return n[t]})};n.concat=f;n.concatSource=function(t){return function(n){return f(n,t)}};var l=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return a(function(t){var e=n[t];return e?e(t):null})};n.concatBy=l;n.concatSourceBy=function(t){return function(n){return l(function(){return n},t)}};var h=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return function(t){var e=0,o={next:t.next,error:t.error,finish:function(){++e===n.length&&c.finish()}},u=n.map(function(t){var n;return n=t,(0,i.pullable)(o)(n)}),c=(0,r.guard)(s({},t,{start:function(){u.forEach(function(t){return t.start()}),t.start()},next:r.noop,finish:function(){u.forEach(function(t){return t.finish()}),t.finish()}}));return c}};n.merge=h;n.mergeWith=function(t){return function(n){return h(n,t)}};var p={},v=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return function(t){var e=0,o=function(){++e===n.length&&a.finish()},u=new Array(n.length),c=n.map(function(n,e){var r,s={next:function(n){u[e]=n,-1===u.indexOf(p)&&t.next(u.concat())},finish:o,error:t.error};return u[e]=p,r=n,(0,i.pullable)(s)(r)}),a=(0,r.guard)(s({},t,{start:function(){c.forEach(function(t){return t.start()}),t.start()},next:r.noop,finish:function(){c.forEach(function(t){return t.finish()}),t.finish()}}));return a}};n.combine=v;n.combineWith=function(t){return function(n){return v(n,t)}};n.combineObject=function(t){var n,e=Object.keys(t),r=e.map(function(n){return t[n]});return n=v.apply(void 0,u(r)),m(function(t){return t.reduce(function(t,n,r){return t[e[r]]=n,t},{})})(n)};var m=function(t){return function(n){return function(e){return n(s({},e,{next:function(n){return e.next(t(n))}}))}}};n.map=m;n.mapTo=function(t){return m(function(){return t})};var g=function(t){return function(n){return function(e){var r=n(s({},e,{next:function(n){t(n)?e.next(n):r.next()}}));return r}}};n.filter=g;n.take=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(n){return function(e){var r=n(e),i=0;return s({},r,{next:function(){if(i===t)return r.finish();i+=1,r.next()}})}}};var y=function(t,n){return function(e){return function(r){var i=n;return e(s({},r,{next:function(n){return r.next(i=t(i,n))}}))}}};n.scan=y;n.skip=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return g(function(){return 0===t||(t-=1,!1)})};n.takeUntil=function(t){return function(n){return function(e){var r=n(e),o=(0,i.pullable)({next:function(){r.finish(),o.finish()}})(t);return s({},r,{start:function(){r.start(),o.start()}})}}};var _=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return function(n){return function(e){var u=[],c={next:function(n){u.push(n),u.length>t&&u.shift()},finish:function(){a&&(a=(0,i.pullable)(e)((0,o.fromArray)(u))).start()}},a=(0,i.pullable)(c)(n);return(0,r.guard)(s({},e,{start:a.start,next:r.noop,finish:function(){var t=a.finish;a=null,t()}}))}}};n.takeLast=_;var d=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.identity;return function(e){return function(o){var u=null,c={next:function(t){return o.next(n(t))},finish:function(){u&&(u=null,a.next())}},a=e(s({},o,{next:function(n){if(u){var e=u.finish;u=null,e()}(u=(0,i.pullable)(c)(t(n))).start()}}));return(0,r.guard)(s({},a,{next:function(){!u&&a.next()},finish:function(){var t=u?u.finish:r.noop,n=a.finish;u=a=null,t(),n()}}))}}};n.switchMap=d;var b=function(t){return function(n){return function(e){var r,o,u,s;return s=n,u=(0,i.onNext)(e.next)(s),o=_()(u),r=d(t)(o),(0,i.pullable)(e)(r)}}};n.then=b;n.reduce=function(t,n){return function(e){return function(r){var u,s,c;return c=e,s=y(t,n)(c),u=b(function(t){var n;return n=(0,o.fromArray)(t),(0,i.fork)(r)(n)})(s),(0,i.pullable)(u)}}};n.startWith=function(t){return function(n){return f((0,o.of)(t),n)}}},function(t,n,e){"use strict";var r,i=e(0),o=e(2),u=e(1),s=e(5),c=e(4),a=(r=e(3))&&r.__esModule?r:{default:r};function f(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){l(t,n,e[n])})}return t}function l(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var h,p,v,m,g,y,_,d,b,x,w,O,A,V,S,j,E,M,L,P,T={fromValue:1,toValue:0,stiffness:1e3,damping:20,mass:3},k=function(t){return function(n){var e=new c.Spring(f({},T,t)),r=(0,i.guard)(f({},n,{start:function(){e.start(),e.onUpdate(function(t){return n.next(t)}),e.onStop(function(){return r.finish()}),n.start()},next:i.noop,finish:function(){e.stop(),n.finish()}}));return r}},D=function(t){return t.touches?t.touches[0]:t},U=function(t){var n=(t=D(t)).clientX,e=t.clientY;return function(t){return t.preventDefault(),{left:(t=D(t)).clientX-n,top:t.clientY-e}}};h=document.querySelector(".ball"),w=new a.default,O={start:Symbol("start"),move:Symbol("move"),end:Symbol("end")},A=(0,o.fromEvent)(w,O.start),V=(0,o.fromEvent)(w,O.move),S=(0,o.fromEvent)(w,O.end),j=function(t){var n,e;return e=k(),n=(0,s.takeUntil)(A)(e),(0,s.map)(function(n){var e=n.currentValue;return{left:t.left*e,top:t.top*e}})(n)},E={data$:(x=A,b=(0,s.switchMap)(function(t){var n,e,r;return r=V,e=(0,s.map)(U(t))(r),n=(0,s.takeUntil)(S)(e),(0,s.then)(j)(n)})(x),(0,s.startWith)({left:0,top:0})(b)),handler:{start:function(t){return w.emit(O.start,t)},move:function(t){return w.emit(O.move,t)},end:function(t){return w.emit(O.end,t)}},emitter:w,symbol:O},M=E.data$,L=E.handler,P={passive:!1},v=(0,o.fromEvent)(h,"mousedown",P),p=(0,s.mergeWith)((0,o.fromEvent)(h,"touchstart",P))(v),(0,u.run)(L.start)(p),g=(0,o.fromEvent)(document,"mousemove",P),m=(0,s.mergeWith)((0,o.fromEvent)(document,"touchmove",P))(g),(0,u.run)(L.move)(m),_=(0,o.fromEvent)(document,"mouseup",P),y=(0,s.mergeWith)((0,o.fromEvent)(document,"touchend",P))(_),(0,u.run)(L.end)(y),d=M,(0,u.run)(function(t){var n=t.left,e=t.top,r="translate(".concat(n,"px, ").concat(e,"px)");h.style.transform=r,h.style.webkitTransform=r})(d)}]);