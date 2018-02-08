(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["viewarApi"] = factory();
	else
		root["viewarApi"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 141);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.5.1
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function (promises) {
    return any(promises);
};

Promise.prototype.any = function () {
    return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try {throw new Error(); } catch (e) {firstLineError = e;}
var schedule = _dereq_("./schedule");
var Queue = _dereq_("./queue");
var util = _dereq_("./util");

function Async() {
    this._customScheduler = false;
    this._isTickUsed = false;
    this._lateQueue = new Queue(16);
    this._normalQueue = new Queue(16);
    this._haveDrainedQueues = false;
    this._trampolineEnabled = true;
    var self = this;
    this.drainQueues = function () {
        self._drainQueues();
    };
    this._schedule = schedule;
}

Async.prototype.setScheduler = function(fn) {
    var prev = this._schedule;
    this._schedule = fn;
    this._customScheduler = true;
    return prev;
};

Async.prototype.hasCustomScheduler = function() {
    return this._customScheduler;
};

Async.prototype.enableTrampoline = function() {
    this._trampolineEnabled = true;
};

Async.prototype.disableTrampolineIfNecessary = function() {
    if (util.hasDevTools) {
        this._trampolineEnabled = false;
    }
};

Async.prototype.haveItemsQueued = function () {
    return this._isTickUsed || this._haveDrainedQueues;
};


Async.prototype.fatalError = function(e, isNode) {
    if (isNode) {
        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
            "\n");
        process.exit(2);
    } else {
        this.throwLater(e);
    }
};

Async.prototype.throwLater = function(fn, arg) {
    if (arguments.length === 1) {
        arg = fn;
        fn = function () { throw arg; };
    }
    if (typeof setTimeout !== "undefined") {
        setTimeout(function() {
            fn(arg);
        }, 0);
    } else try {
        this._schedule(function() {
            fn(arg);
        });
    } catch (e) {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
};

function AsyncInvokeLater(fn, receiver, arg) {
    this._lateQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncInvoke(fn, receiver, arg) {
    this._normalQueue.push(fn, receiver, arg);
    this._queueTick();
}

function AsyncSettlePromises(promise) {
    this._normalQueue._pushOne(promise);
    this._queueTick();
}

if (!util.hasDevTools) {
    Async.prototype.invokeLater = AsyncInvokeLater;
    Async.prototype.invoke = AsyncInvoke;
    Async.prototype.settlePromises = AsyncSettlePromises;
} else {
    Async.prototype.invokeLater = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                setTimeout(function() {
                    fn.call(receiver, arg);
                }, 100);
            });
        }
    };

    Async.prototype.invoke = function (fn, receiver, arg) {
        if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
        } else {
            this._schedule(function() {
                fn.call(receiver, arg);
            });
        }
    };

    Async.prototype.settlePromises = function(promise) {
        if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
        } else {
            this._schedule(function() {
                promise._settlePromises();
            });
        }
    };
}

Async.prototype._drainQueue = function(queue) {
    while (queue.length() > 0) {
        var fn = queue.shift();
        if (typeof fn !== "function") {
            fn._settlePromises();
            continue;
        }
        var receiver = queue.shift();
        var arg = queue.shift();
        fn.call(receiver, arg);
    }
};

Async.prototype._drainQueues = function () {
    this._drainQueue(this._normalQueue);
    this._reset();
    this._haveDrainedQueues = true;
    this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick = function () {
    if (!this._isTickUsed) {
        this._isTickUsed = true;
        this._schedule(this.drainQueues);
    }
};

Async.prototype._reset = function () {
    this._isTickUsed = false;
};

module.exports = Async;
module.exports.firstLineError = firstLineError;

},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
var calledBind = false;
var rejectThis = function(_, e) {
    this._reject(e);
};

var targetRejected = function(e, context) {
    context.promiseRejectionQueued = true;
    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
};

var bindingResolved = function(thisArg, context) {
    if (((this._bitField & 50397184) === 0)) {
        this._resolveCallback(context.target);
    }
};

var bindingRejected = function(e, context) {
    if (!context.promiseRejectionQueued) this._reject(e);
};

Promise.prototype.bind = function (thisArg) {
    if (!calledBind) {
        calledBind = true;
        Promise.prototype._propagateFrom = debug.propagateFromFunction();
        Promise.prototype._boundValue = debug.boundValueFunction();
    }
    var maybePromise = tryConvertToPromise(thisArg);
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 1);
    var target = this._target();
    ret._setBoundTo(maybePromise);
    if (maybePromise instanceof Promise) {
        var context = {
            promiseRejectionQueued: false,
            promise: ret,
            target: target,
            bindingPromise: maybePromise
        };
        target._then(INTERNAL, targetRejected, undefined, ret, context);
        maybePromise._then(
            bindingResolved, bindingRejected, undefined, ret, context);
        ret._setOnCancel(maybePromise);
    } else {
        ret._resolveCallback(target);
    }
    return ret;
};

Promise.prototype._setBoundTo = function (obj) {
    if (obj !== undefined) {
        this._bitField = this._bitField | 2097152;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~2097152);
    }
};

Promise.prototype._isBound = function () {
    return (this._bitField & 2097152) === 2097152;
};

Promise.bind = function (thisArg, value) {
    return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict() {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
var bluebird = _dereq_("./promise")();
bluebird.noConflict = noConflict;
module.exports = bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

var getMethodCaller;
var getGetter;
if (false) {
var makeMethodCaller = function (methodName) {
    return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
};

var makeGetter = function (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
};

var getCompiled = function(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
};

getMethodCaller = function(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
};

getGetter = function(name) {
    return getCompiled(name, makeGetter, getterCache);
};
}

function ensureMethod(obj, methodName) {
    var fn;
    if (obj != null) fn = obj[methodName];
    if (typeof fn !== "function") {
        var message = "Object " + util.classString(obj) + " has no method '" +
            util.toString(methodName) + "'";
        throw new Promise.TypeError(message);
    }
    return fn;
}

function caller(obj) {
    var methodName = this.pop();
    var fn = ensureMethod(obj, methodName);
    return fn.apply(obj, this);
}
Promise.prototype.call = function (methodName) {
    var args = [].slice.call(arguments, 1);;
    if (false) {
        if (canEvaluate) {
            var maybeCaller = getMethodCaller(methodName);
            if (maybeCaller !== null) {
                return this._then(
                    maybeCaller, undefined, undefined, args, undefined);
            }
        }
    }
    args.push(methodName);
    return this._then(caller, undefined, undefined, args, undefined);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    var index = +this;
    if (index < 0) index = Math.max(0, index + obj.length);
    return obj[index];
}
Promise.prototype.get = function (propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, undefined, undefined, propertyName, undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

Promise.prototype["break"] = Promise.prototype.cancel = function() {
    if (!debug.cancellation()) return this._warn("cancellation is disabled");

    var promise = this;
    var child = promise;
    while (promise._isCancellable()) {
        if (!promise._cancelBy(child)) {
            if (child._isFollowing()) {
                child._followee().cancel();
            } else {
                child._cancelBranched();
            }
            break;
        }

        var parent = promise._cancellationParent;
        if (parent == null || !parent._isCancellable()) {
            if (promise._isFollowing()) {
                promise._followee().cancel();
            } else {
                promise._cancelBranched();
            }
            break;
        } else {
            if (promise._isFollowing()) promise._followee().cancel();
            promise._setWillBeCancelled();
            child = promise;
            promise = parent;
        }
    }
};

Promise.prototype._branchHasCancelled = function() {
    this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled = function() {
    return this._branchesRemainingToCancel === undefined ||
           this._branchesRemainingToCancel <= 0;
};

Promise.prototype._cancelBy = function(canceller) {
    if (canceller === this) {
        this._branchesRemainingToCancel = 0;
        this._invokeOnCancel();
        return true;
    } else {
        this._branchHasCancelled();
        if (this._enoughBranchesHaveCancelled()) {
            this._invokeOnCancel();
            return true;
        }
    }
    return false;
};

Promise.prototype._cancelBranched = function() {
    if (this._enoughBranchesHaveCancelled()) {
        this._cancel();
    }
};

Promise.prototype._cancel = function() {
    if (!this._isCancellable()) return;
    this._setCancelled();
    async.invoke(this._cancelPromises, this, undefined);
};

Promise.prototype._cancelPromises = function() {
    if (this._length() > 0) this._settlePromises();
};

Promise.prototype._unsetOnCancel = function() {
    this._onCancelField = undefined;
};

Promise.prototype._isCancellable = function() {
    return this.isPending() && !this._isCancelled();
};

Promise.prototype.isCancellable = function() {
    return this.isPending() && !this.isCancelled();
};

Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
    if (util.isArray(onCancelCallback)) {
        for (var i = 0; i < onCancelCallback.length; ++i) {
            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
        }
    } else if (onCancelCallback !== undefined) {
        if (typeof onCancelCallback === "function") {
            if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());
                if (e === errorObj) {
                    this._attachExtraTrace(e.e);
                    async.throwLater(e.e);
                }
            }
        } else {
            onCancelCallback._resultCancelled(this);
        }
    }
};

Promise.prototype._invokeOnCancel = function() {
    var onCancelCallback = this._onCancel();
    this._unsetOnCancel();
    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel = function() {
    if (this._isCancellable()) {
        this._doInvokeOnCancel(this._onCancel(), true);
        this._unsetOnCancel();
    }
};

Promise.prototype._resultCancelled = function() {
    this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports = function(NEXT_FILTER) {
var util = _dereq_("./util");
var getKeys = _dereq_("./es5").keys;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function catchFilter(instances, cb, promise) {
    return function(e) {
        var boundTo = promise._boundValue();
        predicateLoop: for (var i = 0; i < instances.length; ++i) {
            var item = instances[i];

            if (item === Error ||
                (item != null && item.prototype instanceof Error)) {
                if (e instanceof item) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);
                if (matchesPredicate === errorObj) {
                    return matchesPredicate;
                } else if (matchesPredicate) {
                    return tryCatch(cb).call(boundTo, e);
                }
            } else if (util.isObject(e)) {
                var keys = getKeys(item);
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    if (item[key] != e[key]) {
                        continue predicateLoop;
                    }
                }
                return tryCatch(cb).call(boundTo, e);
            }
        }
        return NEXT_FILTER;
    };
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var longStackTraces = false;
var contextStack = [];

Promise.prototype._promiseCreated = function() {};
Promise.prototype._pushContext = function() {};
Promise.prototype._popContext = function() {return null;};
Promise._peekContext = Promise.prototype._peekContext = function() {};

function Context() {
    this._trace = new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext = function () {
    if (this._trace !== undefined) {
        this._trace._promiseCreated = null;
        contextStack.push(this._trace);
    }
};

Context.prototype._popContext = function () {
    if (this._trace !== undefined) {
        var trace = contextStack.pop();
        var ret = trace._promiseCreated;
        trace._promiseCreated = null;
        return ret;
    }
    return null;
};

function createContext() {
    if (longStackTraces) return new Context();
}

function peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return undefined;
}
Context.CapturedTrace = null;
Context.create = createContext;
Context.deactivateLongStackTraces = function() {};
Context.activateLongStackTraces = function() {
    var Promise_pushContext = Promise.prototype._pushContext;
    var Promise_popContext = Promise.prototype._popContext;
    var Promise_PeekContext = Promise._peekContext;
    var Promise_peekContext = Promise.prototype._peekContext;
    var Promise_promiseCreated = Promise.prototype._promiseCreated;
    Context.deactivateLongStackTraces = function() {
        Promise.prototype._pushContext = Promise_pushContext;
        Promise.prototype._popContext = Promise_popContext;
        Promise._peekContext = Promise_PeekContext;
        Promise.prototype._peekContext = Promise_peekContext;
        Promise.prototype._promiseCreated = Promise_promiseCreated;
        longStackTraces = false;
    };
    longStackTraces = true;
    Promise.prototype._pushContext = Context.prototype._pushContext;
    Promise.prototype._popContext = Context.prototype._popContext;
    Promise._peekContext = Promise.prototype._peekContext = peekContext;
    Promise.prototype._promiseCreated = function() {
        var ctx = this._peekContext();
        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
    };
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, Context) {
var getDomain = Promise._getDomain;
var async = Promise._async;
var Warning = _dereq_("./errors").Warning;
var util = _dereq_("./util");
var canAttachTrace = util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern =
    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern = null;
var formatStack = null;
var indentStackFrames = false;
var printWarning;
var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
                        (true ||
                         util.env("BLUEBIRD_DEBUG") ||
                         util.env("NODE_ENV") === "development"));

var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
    (debugging || util.env("BLUEBIRD_WARNINGS")));

var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections = function() {
    var target = this._target();
    target._bitField = ((target._bitField & (~1048576)) |
                      524288);
};

Promise.prototype._ensurePossibleRejectionHandled = function () {
    if ((this._bitField & 524288) !== 0) return;
    this._setRejectionIsUnhandled();
    var self = this;
    setTimeout(function() {
        self._notifyUnhandledRejection();
    }, 1);
};

Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
    fireRejectionEvent("rejectionHandled",
                                  unhandledRejectionHandled, undefined, this);
};

Promise.prototype._setReturnedNonUndefined = function() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._returnedNonUndefined = function() {
    return (this._bitField & 268435456) !== 0;
};

Promise.prototype._notifyUnhandledRejection = function () {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue();
        this._setUnhandledRejectionIsNotified();
        fireRejectionEvent("unhandledRejection",
                                      possiblyUnhandledRejection, reason, this);
    }
};

Promise.prototype._setUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField | 262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
    this._bitField = this._bitField & (~262144);
};

Promise.prototype._isUnhandledRejectionNotified = function () {
    return (this._bitField & 262144) > 0;
};

Promise.prototype._setRejectionIsUnhandled = function () {
    this._bitField = this._bitField | 1048576;
};

Promise.prototype._unsetRejectionIsUnhandled = function () {
    this._bitField = this._bitField & (~1048576);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled = function () {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
    return warn(message, shouldUseOwnTrace, promise || this);
};

Promise.onPossiblyUnhandledRejection = function (fn) {
    var domain = getDomain();
    possiblyUnhandledRejection =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

Promise.onUnhandledRejectionHandled = function (fn) {
    var domain = getDomain();
    unhandledRejectionHandled =
        typeof fn === "function" ? (domain === null ?
                                            fn : util.domainBind(domain, fn))
                                 : undefined;
};

var disableLongStackTraces = function() {};
Promise.longStackTraces = function () {
    if (async.haveItemsQueued() && !config.longStackTraces) {
        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (!config.longStackTraces && longStackTracesIsSupported()) {
        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
        config.longStackTraces = true;
        disableLongStackTraces = function() {
            if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
            }
            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
            Context.deactivateLongStackTraces();
            async.enableTrampoline();
            config.longStackTraces = false;
        };
        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
        Context.activateLongStackTraces();
        async.disableTrampolineIfNecessary();
    }
};

Promise.hasLongStackTraces = function () {
    return config.longStackTraces && longStackTracesIsSupported();
};

var fireDomEvent = (function() {
    try {
        if (typeof CustomEvent === "function") {
            var event = new CustomEvent("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new CustomEvent(name.toLowerCase(), {
                    detail: event,
                    cancelable: true
                });
                return !util.global.dispatchEvent(domEvent);
            };
        } else if (typeof Event === "function") {
            var event = new Event("CustomEvent");
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                    cancelable: true
                });
                domEvent.detail = event;
                return !util.global.dispatchEvent(domEvent);
            };
        } else {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent("testingtheevent", false, true, {});
            util.global.dispatchEvent(event);
            return function(name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true,
                    event);
                return !util.global.dispatchEvent(domEvent);
            };
        }
    } catch (e) {}
    return function() {
        return false;
    };
})();

var fireGlobalEvent = (function() {
    if (util.isNode) {
        return function() {
            return process.emit.apply(process, arguments);
        };
    } else {
        if (!util.global) {
            return function() {
                return false;
            };
        }
        return function(name) {
            var methodName = "on" + name.toLowerCase();
            var method = util.global[methodName];
            if (!method) return false;
            method.apply(util.global, [].slice.call(arguments, 1));
            return true;
        };
    }
})();

function generatePromiseLifecycleEventObject(name, promise) {
    return {promise: promise};
}

var eventToObjectGenerator = {
    promiseCreated: generatePromiseLifecycleEventObject,
    promiseFulfilled: generatePromiseLifecycleEventObject,
    promiseRejected: generatePromiseLifecycleEventObject,
    promiseResolved: generatePromiseLifecycleEventObject,
    promiseCancelled: generatePromiseLifecycleEventObject,
    promiseChained: function(name, promise, child) {
        return {promise: promise, child: child};
    },
    warning: function(name, warning) {
        return {warning: warning};
    },
    unhandledRejection: function (name, reason, promise) {
        return {reason: reason, promise: promise};
    },
    rejectionHandled: generatePromiseLifecycleEventObject
};

var activeFireEvent = function (name) {
    var globalEventFired = false;
    try {
        globalEventFired = fireGlobalEvent.apply(null, arguments);
    } catch (e) {
        async.throwLater(e);
        globalEventFired = true;
    }

    var domEventFired = false;
    try {
        domEventFired = fireDomEvent(name,
                    eventToObjectGenerator[name].apply(null, arguments));
    } catch (e) {
        async.throwLater(e);
        domEventFired = true;
    }

    return domEventFired || globalEventFired;
};

Promise.config = function(opts) {
    opts = Object(opts);
    if ("longStackTraces" in opts) {
        if (opts.longStackTraces) {
            Promise.longStackTraces();
        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
            disableLongStackTraces();
        }
    }
    if ("warnings" in opts) {
        var warningsOption = opts.warnings;
        config.warnings = !!warningsOption;
        wForgottenReturn = config.warnings;

        if (util.isObject(warningsOption)) {
            if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
            }
        }
    }
    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
        if (async.haveItemsQueued()) {
            throw new Error(
                "cannot enable cancellation after promises are in use");
        }
        Promise.prototype._clearCancellationData =
            cancellationClearCancellationData;
        Promise.prototype._propagateFrom = cancellationPropagateFrom;
        Promise.prototype._onCancel = cancellationOnCancel;
        Promise.prototype._setOnCancel = cancellationSetOnCancel;
        Promise.prototype._attachCancellationCallback =
            cancellationAttachCancellationCallback;
        Promise.prototype._execute = cancellationExecute;
        propagateFromFunction = cancellationPropagateFrom;
        config.cancellation = true;
    }
    if ("monitoring" in opts) {
        if (opts.monitoring && !config.monitoring) {
            config.monitoring = true;
            Promise.prototype._fireEvent = activeFireEvent;
        } else if (!opts.monitoring && config.monitoring) {
            config.monitoring = false;
            Promise.prototype._fireEvent = defaultFireEvent;
        }
    }
    return Promise;
};

function defaultFireEvent() { return false; }

Promise.prototype._fireEvent = defaultFireEvent;
Promise.prototype._execute = function(executor, resolve, reject) {
    try {
        executor(resolve, reject);
    } catch (e) {
        return e;
    }
};
Promise.prototype._onCancel = function () {};
Promise.prototype._setOnCancel = function (handler) { ; };
Promise.prototype._attachCancellationCallback = function(onCancel) {
    ;
};
Promise.prototype._captureStackTrace = function () {};
Promise.prototype._attachExtraTrace = function () {};
Promise.prototype._clearCancellationData = function() {};
Promise.prototype._propagateFrom = function (parent, flags) {
    ;
    ;
};

function cancellationExecute(executor, resolve, reject) {
    var promise = this;
    try {
        executor(resolve, reject, function(onCancel) {
            if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " +
                                    util.toString(onCancel));
            }
            promise._attachCancellationCallback(onCancel);
        });
    } catch (e) {
        return e;
    }
}

function cancellationAttachCancellationCallback(onCancel) {
    if (!this._isCancellable()) return this;

    var previousOnCancel = this._onCancel();
    if (previousOnCancel !== undefined) {
        if (util.isArray(previousOnCancel)) {
            previousOnCancel.push(onCancel);
        } else {
            this._setOnCancel([previousOnCancel, onCancel]);
        }
    } else {
        this._setOnCancel(onCancel);
    }
}

function cancellationOnCancel() {
    return this._onCancelField;
}

function cancellationSetOnCancel(onCancel) {
    this._onCancelField = onCancel;
}

function cancellationClearCancellationData() {
    this._cancellationParent = undefined;
    this._onCancelField = undefined;
}

function cancellationPropagateFrom(parent, flags) {
    if ((flags & 1) !== 0) {
        this._cancellationParent = parent;
        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
        if (branchesRemainingToCancel === undefined) {
            branchesRemainingToCancel = 0;
        }
        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
    }
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}

function bindingPropagateFrom(parent, flags) {
    if ((flags & 2) !== 0 && parent._isBound()) {
        this._setBoundTo(parent._boundTo);
    }
}
var propagateFromFunction = bindingPropagateFrom;

function boundValueFunction() {
    var ret = this._boundTo;
    if (ret !== undefined) {
        if (ret instanceof Promise) {
            if (ret.isFulfilled()) {
                return ret.value();
            } else {
                return undefined;
            }
        }
    }
    return ret;
}

function longStackTracesCaptureStackTrace() {
    this._trace = new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error, ignoreSelf) {
    if (canAttachTrace(error)) {
        var trace = this._trace;
        if (trace !== undefined) {
            if (ignoreSelf) trace = trace._parent;
        }
        if (trace !== undefined) {
            trace.attachExtraTrace(error);
        } else if (!error.__stackCleaned__) {
            var parsed = parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack",
                parsed.message + "\n" + parsed.stack.join("\n"));
            util.notEnumerableProp(error, "__stackCleaned__", true);
        }
    }
}

function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                               parent) {
    if (returnValue === undefined && promiseCreated !== null &&
        wForgottenReturn) {
        if (parent !== undefined && parent._returnedNonUndefined()) return;
        if ((promise._bitField & 65535) === 0) return;

        if (name) name = name + " ";
        var handlerLine = "";
        var creatorLine = "";
        if (promiseCreated._trace) {
            var traceLines = promiseCreated._trace.stack.split("\n");
            var stack = cleanStack(traceLines);
            for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];
                if (!nodeFramePattern.test(line)) {
                    var lineMatches = line.match(parseLinePattern);
                    if (lineMatches) {
                        handlerLine  = "at " + lineMatches[1] +
                            ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                    }
                    break;
                }
            }

            if (stack.length > 0) {
                var firstUserLine = stack[0];
                for (var i = 0; i < traceLines.length; ++i) {

                    if (traceLines[i] === firstUserLine) {
                        if (i > 0) {
                            creatorLine = "\n" + traceLines[i - 1];
                        }
                        break;
                    }
                }

            }
        }
        var msg = "a promise was created in a " + name +
            "handler " + handlerLine + "but was not returned from it, " +
            "see http://goo.gl/rRqMUw" +
            creatorLine;
        promise._warn(msg, true, promiseCreated);
    }
}

function deprecated(name, replacement) {
    var message = name +
        " is deprecated and will be removed in a future version.";
    if (replacement) message += " Use " + replacement + " instead.";
    return warn(message);
}

function warn(message, shouldUseOwnTrace, promise) {
    if (!config.warnings) return;
    var warning = new Warning(message);
    var ctx;
    if (shouldUseOwnTrace) {
        promise._attachExtraTrace(warning);
    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
        ctx.attachExtraTrace(warning);
    } else {
        var parsed = parseStackAndMessage(warning);
        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
    }

    if (!activeFireEvent("warning", warning)) {
        formatAndLogError(warning, "", true);
    }
}

function reconstructStack(message, stacks) {
    for (var i = 0; i < stacks.length - 1; ++i) {
        stacks[i].push("From previous event:");
        stacks[i] = stacks[i].join("\n");
    }
    if (i < stacks.length) {
        stacks[i] = stacks[i].join("\n");
    }
    return message + "\n" + stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks) {
    for (var i = 0; i < stacks.length; ++i) {
        if (stacks[i].length === 0 ||
            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
            stacks.splice(i, 1);
            i--;
        }
    }
}

function removeCommonRoots(stacks) {
    var current = stacks[0];
    for (var i = 1; i < stacks.length; ++i) {
        var prev = stacks[i];
        var currentLastIndex = current.length - 1;
        var currentLastLine = current[currentLastIndex];
        var commonRootMeetPoint = -1;

        for (var j = prev.length - 1; j >= 0; --j) {
            if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
            }
        }

        for (var j = commonRootMeetPoint; j >= 0; --j) {
            var line = prev[j];
            if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
            } else {
                break;
            }
        }
        current = prev;
    }
}

function cleanStack(stack) {
    var ret = [];
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        var isTraceLine = "    (No stack trace)" === line ||
            stackFramePattern.test(line);
        var isInternalFrame = isTraceLine && shouldIgnore(line);
        if (isTraceLine && !isInternalFrame) {
            if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
            }
            ret.push(line);
        }
    }
    return ret;
}

function stackFramesAsArray(error) {
    var stack = error.stack.replace(/\s+$/g, "").split("\n");
    for (var i = 0; i < stack.length; ++i) {
        var line = stack[i];
        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
            break;
        }
    }
    if (i > 0 && error.name != "SyntaxError") {
        stack = stack.slice(i);
    }
    return stack;
}

function parseStackAndMessage(error) {
    var stack = error.stack;
    var message = error.toString();
    stack = typeof stack === "string" && stack.length > 0
                ? stackFramesAsArray(error) : ["    (No stack trace)"];
    return {
        message: message,
        stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
    };
}

function formatAndLogError(error, title, isSoft) {
    if (typeof console !== "undefined") {
        var message;
        if (util.isObject(error)) {
            var stack = error.stack;
            message = title + formatStack(stack, error);
        } else {
            message = title + String(error);
        }
        if (typeof printWarning === "function") {
            printWarning(message, isSoft);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
}

function fireRejectionEvent(name, localHandler, reason, promise) {
    var localEventFired = false;
    try {
        if (typeof localHandler === "function") {
            localEventFired = true;
            if (name === "rejectionHandled") {
                localHandler(promise);
            } else {
                localHandler(reason, promise);
            }
        }
    } catch (e) {
        async.throwLater(e);
    }

    if (name === "unhandledRejection") {
        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
            formatAndLogError(reason, "Unhandled rejection ");
        }
    } else {
        activeFireEvent(name, promise);
    }
}

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj && typeof obj.toString === "function"
            ? obj.toString() : util.toString(obj);
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function longStackTracesIsSupported() {
    return typeof captureStackTrace === "function";
}

var shouldIgnore = function() { return false; };
var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line) {
    var matches = line.match(parseLineInfoRegex);
    if (matches) {
        return {
            fileName: matches[1],
            line: parseInt(matches[2], 10)
        };
    }
}

function setBounds(firstLineError, lastLineError) {
    if (!longStackTracesIsSupported()) return;
    var firstStackLines = firstLineError.stack.split("\n");
    var lastStackLines = lastLineError.stack.split("\n");
    var firstIndex = -1;
    var lastIndex = -1;
    var firstFileName;
    var lastFileName;
    for (var i = 0; i < firstStackLines.length; ++i) {
        var result = parseLineInfo(firstStackLines[i]);
        if (result) {
            firstFileName = result.fileName;
            firstIndex = result.line;
            break;
        }
    }
    for (var i = 0; i < lastStackLines.length; ++i) {
        var result = parseLineInfo(lastStackLines[i]);
        if (result) {
            lastFileName = result.fileName;
            lastIndex = result.line;
            break;
        }
    }
    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
        firstFileName !== lastFileName || firstIndex >= lastIndex) {
        return;
    }

    shouldIgnore = function(line) {
        if (bluebirdFramePattern.test(line)) return true;
        var info = parseLineInfo(line);
        if (info) {
            if (info.fileName === firstFileName &&
                (firstIndex <= info.line && info.line <= lastIndex)) {
                return true;
            }
        }
        return false;
    };
}

function CapturedTrace(parent) {
    this._parent = parent;
    this._promisesCreated = 0;
    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
    captureStackTrace(this, CapturedTrace);
    if (length > 32) this.uncycle();
}
util.inherits(CapturedTrace, Error);
Context.CapturedTrace = CapturedTrace;

CapturedTrace.prototype.uncycle = function() {
    var length = this._length;
    if (length < 2) return;
    var nodes = [];
    var stackToIndex = {};

    for (var i = 0, node = this; node !== undefined; ++i) {
        nodes.push(node);
        node = node._parent;
    }
    length = this._length = i;
    for (var i = length - 1; i >= 0; --i) {
        var stack = nodes[i].stack;
        if (stackToIndex[stack] === undefined) {
            stackToIndex[stack] = i;
        }
    }
    for (var i = 0; i < length; ++i) {
        var currentStack = nodes[i].stack;
        var index = stackToIndex[currentStack];
        if (index !== undefined && index !== i) {
            if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
            }
            nodes[i]._parent = undefined;
            nodes[i]._length = 1;
            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

            if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];
                cycleEdgeNode._parent.uncycle();
                cycleEdgeNode._length =
                    cycleEdgeNode._parent._length + 1;
            } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
            }
            var currentChildLength = cycleEdgeNode._length + 1;
            for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
            }
            return;
        }
    }
};

CapturedTrace.prototype.attachExtraTrace = function(error) {
    if (error.__stackCleaned__) return;
    this.uncycle();
    var parsed = parseStackAndMessage(error);
    var message = parsed.message;
    var stacks = [parsed.stack];

    var trace = this;
    while (trace !== undefined) {
        stacks.push(cleanStack(trace.stack.split("\n")));
        trace = trace._parent;
    }
    removeCommonRoots(stacks);
    removeDuplicateOrEmptyJumps(stacks);
    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
    util.notEnumerableProp(error, "__stackCleaned__", true);
};

var captureStackTrace = (function stackDetection() {
    var v8stackFramePattern = /^\s*at\s*/;
    var v8stackFormatter = function(stack, error) {
        if (typeof stack === "string") return stack;

        if (error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        Error.stackTraceLimit += 6;
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        var captureStackTrace = Error.captureStackTrace;

        shouldIgnore = function(line) {
            return bluebirdFramePattern.test(line);
        };
        return function(receiver, ignoreUntil) {
            Error.stackTraceLimit += 6;
            captureStackTrace(receiver, ignoreUntil);
            Error.stackTraceLimit -= 6;
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
        stackFramePattern = /@/;
        formatStack = v8stackFormatter;
        indentStackFrames = true;
        return function captureStackTrace(o) {
            o.stack = new Error().stack;
        };
    }

    var hasStackAfterThrow;
    try { throw new Error(); }
    catch(e) {
        hasStackAfterThrow = ("stack" in e);
    }
    if (!("stack" in err) && hasStackAfterThrow &&
        typeof Error.stackTraceLimit === "number") {
        stackFramePattern = v8stackFramePattern;
        formatStack = v8stackFormatter;
        return function captureStackTrace(o) {
            Error.stackTraceLimit += 6;
            try { throw new Error(); }
            catch(e) { o.stack = e.stack; }
            Error.stackTraceLimit -= 6;
        };
    }

    formatStack = function(stack, error) {
        if (typeof stack === "string") return stack;

        if ((typeof error === "object" ||
            typeof error === "function") &&
            error.name !== undefined &&
            error.message !== undefined) {
            return error.toString();
        }
        return formatNonError(error);
    };

    return null;

})([]);

if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
    printWarning = function (message) {
        console.warn(message);
    };
    if (util.isNode && process.stderr.isTTY) {
        printWarning = function(message, isSoft) {
            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
            console.warn(color + message + "\u001b[0m\n");
        };
    } else if (!util.isNode && typeof (new Error().stack) === "string") {
        printWarning = function(message, isSoft) {
            console.warn("%c" + message,
                        isSoft ? "color: darkorange" : "color: red");
        };
    }
}

var config = {
    warnings: warnings,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
};

if (longStackTraces) Promise.longStackTraces();

return {
    longStackTraces: function() {
        return config.longStackTraces;
    },
    warnings: function() {
        return config.warnings;
    },
    cancellation: function() {
        return config.cancellation;
    },
    monitoring: function() {
        return config.monitoring;
    },
    propagateFromFunction: function() {
        return propagateFromFunction;
    },
    boundValueFunction: function() {
        return boundValueFunction;
    },
    checkForgottenReturns: checkForgottenReturns,
    setBounds: setBounds,
    warn: warn,
    deprecated: deprecated,
    CapturedTrace: CapturedTrace,
    fireDomEvent: fireDomEvent,
    fireGlobalEvent: fireGlobalEvent
};
};

},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function returner() {
    return this.value;
}
function thrower() {
    throw this.reason;
}

Promise.prototype["return"] =
Promise.prototype.thenReturn = function (value) {
    if (value instanceof Promise) value.suppressUnhandledRejections();
    return this._then(
        returner, undefined, undefined, {value: value}, undefined);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow = function (reason) {
    return this._then(
        thrower, undefined, undefined, {reason: reason}, undefined);
};

Promise.prototype.catchThrow = function (reason) {
    if (arguments.length <= 1) {
        return this._then(
            undefined, thrower, undefined, {reason: reason}, undefined);
    } else {
        var _reason = arguments[1];
        var handler = function() {throw _reason;};
        return this.caught(reason, handler);
    }
};

Promise.prototype.catchReturn = function (value) {
    if (arguments.length <= 1) {
        if (value instanceof Promise) value.suppressUnhandledRejections();
        return this._then(
            undefined, returner, undefined, {value: value}, undefined);
    } else {
        var _value = arguments[1];
        if (_value instanceof Promise) _value.suppressUnhandledRejections();
        var handler = function() {return _value;};
        return this.caught(value, handler);
    }
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;
var PromiseAll = Promise.all;

function promiseAllThis() {
    return PromiseAll(this);
}

function PromiseMapSeries(promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
}

Promise.prototype.each = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, this, undefined);
};

Promise.prototype.mapSeries = function (fn) {
    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
};

Promise.each = function (promises, fn) {
    return PromiseReduce(promises, fn, INTERNAL, 0)
              ._then(promiseAllThis, undefined, undefined, promises, undefined);
};

Promise.mapSeries = PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var Objectfreeze = es5.freeze;
var util = _dereq_("./util");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        notEnumerableProp(this, "message",
            typeof message === "string" ? message : defaultMessage);
        notEnumerableProp(this, "name", nameProperty);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Error.call(this);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var Warning = subError("Warning", "warning");
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

es5.defineProperty(AggregateError.prototype, "length", {
    value: 0,
    configurable: false,
    writable: true,
    enumerable: true
});
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    if (!(this instanceof OperationalError))
        return new OperationalError(message);
    notEnumerableProp(this, "name", "OperationalError");
    notEnumerableProp(this, "message", message);
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        notEnumerableProp(this, "message", message.message);
        notEnumerableProp(this, "stack", message.stack);
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var errorTypes = Error["__BluebirdErrorTypes__"];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: errorTypes,
        writable: false,
        enumerable: false,
        configurable: false
    });
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    Warning: Warning
};

},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5 = (function(){
    "use strict";
    return this === undefined;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5,
        propertyIsWritable: function(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
        }
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function (o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    };

    var ObjectGetDescriptor = function(o, key) {
        return {value: o[key]};
    };

    var ObjectDefineProperty = function (o, key, desc) {
        o[key] = desc.value;
        return o;
    };

    var ObjectFreeze = function (obj) {
        return obj;
    };

    var ObjectGetPrototypeOf = function (obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    };

    var ArrayIsArray = function (obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    };

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        names: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        getDescriptor: ObjectGetDescriptor,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5,
        propertyIsWritable: function() {
            return true;
        }
    };
}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function (fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function (promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, tryConvertToPromise, NEXT_FILTER) {
var util = _dereq_("./util");
var CancellationError = Promise.CancellationError;
var errorObj = util.errorObj;
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

function PassThroughHandlerContext(promise, type, handler) {
    this.promise = promise;
    this.type = type;
    this.handler = handler;
    this.called = false;
    this.cancelPromise = null;
}

PassThroughHandlerContext.prototype.isFinallyHandler = function() {
    return this.type === 0;
};

function FinallyHandlerCancelReaction(finallyHandler) {
    this.finallyHandler = finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
    checkCancel(this.finallyHandler);
};

function checkCancel(ctx, reason) {
    if (ctx.cancelPromise != null) {
        if (arguments.length > 1) {
            ctx.cancelPromise._reject(reason);
        } else {
            ctx.cancelPromise._cancel();
        }
        ctx.cancelPromise = null;
        return true;
    }
    return false;
}

function succeed() {
    return finallyHandler.call(this, this.promise._target()._settledValue());
}
function fail(reason) {
    if (checkCancel(this, reason)) return;
    errorObj.e = reason;
    return errorObj;
}
function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    if (!this.called) {
        this.called = true;
        var ret = this.isFinallyHandler()
            ? handler.call(promise._boundValue())
            : handler.call(promise._boundValue(), reasonOrValue);
        if (ret === NEXT_FILTER) {
            return ret;
        } else if (ret !== undefined) {
            promise._setReturnedNonUndefined();
            var maybePromise = tryConvertToPromise(ret, promise);
            if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                    if (maybePromise._isCancelled()) {
                        var reason =
                            new CancellationError("late cancellation observer");
                        promise._attachExtraTrace(reason);
                        errorObj.e = reason;
                        return errorObj;
                    } else if (maybePromise.isPending()) {
                        maybePromise._attachCancellationCallback(
                            new FinallyHandlerCancelReaction(this));
                    }
                }
                return maybePromise._then(
                    succeed, fail, undefined, this, undefined);
            }
        }
    }

    if (promise.isRejected()) {
        checkCancel(this);
        errorObj.e = reasonOrValue;
        return errorObj;
    } else {
        checkCancel(this);
        return reasonOrValue;
    }
}

Promise.prototype._passThrough = function(handler, type, success, fail) {
    if (typeof handler !== "function") return this.then();
    return this._then(success,
                      fail,
                      undefined,
                      new PassThroughHandlerContext(this, type, handler),
                      undefined);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function (handler) {
    return this._passThrough(handler,
                             0,
                             finallyHandler,
                             finallyHandler);
};


Promise.prototype.tap = function (handler) {
    return this._passThrough(handler, 1, finallyHandler);
};

Promise.prototype.tapCatch = function (handlerOrPredicate) {
    var len = arguments.length;
    if(len === 1) {
        return this._passThrough(handlerOrPredicate,
                                 1,
                                 undefined,
                                 finallyHandler);
    } else {
         var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return Promise.reject(new TypeError(
                    "tapCatch statement predicate: "
                    + "expecting an object but got " + util.classString(item)
                ));
            }
        }
        catchInstances.length = j;
        var handler = arguments[i];
        return this._passThrough(catchFilter(catchInstances, handler, this),
                                 1,
                                 undefined,
                                 finallyHandler);
    }

};

return PassThroughHandlerContext;
};

},{"./catch_filter":7,"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          apiRejection,
                          INTERNAL,
                          tryConvertToPromise,
                          Proxyable,
                          debug) {
var errors = _dereq_("./errors");
var TypeError = errors.TypeError;
var util = _dereq_("./util");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
    for (var i = 0; i < yieldHandlers.length; ++i) {
        traceParent._pushContext();
        var result = tryCatch(yieldHandlers[i])(value);
        traceParent._popContext();
        if (result === errorObj) {
            traceParent._pushContext();
            var ret = Promise.reject(errorObj.e);
            traceParent._popContext();
            return ret;
        }
        var maybePromise = tryConvertToPromise(result, traceParent);
        if (maybePromise instanceof Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
    if (debug.cancellation()) {
        var internal = new Promise(INTERNAL);
        var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
        this._promise = internal.lastly(function() {
            return _finallyPromise;
        });
        internal._captureStackTrace();
        internal._setOnCancel(this);
    } else {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace();
    }
    this._stack = stack;
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = undefined;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
    this._yieldedPromise = null;
    this._cancellationPhase = false;
}
util.inherits(PromiseSpawn, Proxyable);

PromiseSpawn.prototype._isResolved = function() {
    return this._promise === null;
};

PromiseSpawn.prototype._cleanup = function() {
    this._promise = this._generator = null;
    if (debug.cancellation() && this._finallyPromise !== null) {
        this._finallyPromise._fulfill();
        this._finallyPromise = null;
    }
};

PromiseSpawn.prototype._promiseCancelled = function() {
    if (this._isResolved()) return;
    var implementsReturn = typeof this._generator["return"] !== "undefined";

    var result;
    if (!implementsReturn) {
        var reason = new Promise.CancellationError(
            "generator .return() sentinel");
        Promise.coroutine.returnSentinel = reason;
        this._promise._attachExtraTrace(reason);
        this._promise._pushContext();
        result = tryCatch(this._generator["throw"]).call(this._generator,
                                                         reason);
        this._promise._popContext();
    } else {
        this._promise._pushContext();
        result = tryCatch(this._generator["return"]).call(this._generator,
                                                          undefined);
        this._promise._popContext();
    }
    this._cancellationPhase = true;
    this._yieldedPromise = null;
    this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled = function(value) {
    this._yieldedPromise = null;
    this._promise._pushContext();
    var result = tryCatch(this._generator.next).call(this._generator, value);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._promiseRejected = function(reason) {
    this._yieldedPromise = null;
    this._promise._attachExtraTrace(reason);
    this._promise._pushContext();
    var result = tryCatch(this._generator["throw"])
        .call(this._generator, reason);
    this._promise._popContext();
    this._continue(result);
};

PromiseSpawn.prototype._resultCancelled = function() {
    if (this._yieldedPromise instanceof Promise) {
        var promise = this._yieldedPromise;
        this._yieldedPromise = null;
        promise.cancel();
    }
};

PromiseSpawn.prototype.promise = function () {
    return this._promise;
};

PromiseSpawn.prototype._run = function () {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = undefined;
    this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue = function (result) {
    var promise = this._promise;
    if (result === errorObj) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._rejectCallback(result.e, false);
        }
    }

    var value = result.value;
    if (result.done === true) {
        this._cleanup();
        if (this._cancellationPhase) {
            return promise.cancel();
        } else {
            return promise._resolveCallback(value);
        }
    } else {
        var maybePromise = tryConvertToPromise(value, this._promise);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise,
                                        this._yieldHandlers,
                                        this._promise);
            if (maybePromise === null) {
                this._promiseRejected(
                    new TypeError(
                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) +
                        "From coroutine:\u000a" +
                        this._stack.split("\n").slice(1, -7).join("\n")
                    )
                );
                return;
            }
        }
        maybePromise = maybePromise._target();
        var bitField = maybePromise._bitField;
        ;
        if (((bitField & 50397184) === 0)) {
            this._yieldedPromise = maybePromise;
            maybePromise._proxy(this, null);
        } else if (((bitField & 33554432) !== 0)) {
            Promise._async.invoke(
                this._promiseFulfilled, this, maybePromise._value()
            );
        } else if (((bitField & 16777216) !== 0)) {
            Promise._async.invoke(
                this._promiseRejected, this, maybePromise._reason()
            );
        } else {
            this._promiseCancelled();
        }
    }
};

Promise.coroutine = function (generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    var stack = new Error().stack;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                      stack);
        var ret = spawn.promise();
        spawn._generator = generator;
        spawn._promiseFulfilled(undefined);
        return ret;
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    yieldHandlers.push(fn);
};

Promise.spawn = function (generatorFunction) {
    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async,
         getDomain) {
var util = _dereq_("./util");
var canEvaluate = util.canEvaluate;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var reject;

if (false) {
if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var promiseSetter = function(i) {
        return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
    };

    var generateHolderClass = function(total) {
        var props = new Array(total);
        for (var i = 0; i < props.length; ++i) {
            props[i] = "this.p" + (i+1);
        }
        var assignment = props.join(" = ") + " = null;";
        var cancellationCode= "var promise;\n" + props.map(function(prop) {
            return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
        }).join("\n");
        var passedArguments = props.join(", ");
        var name = "Holder$" + total;


        var code = "return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

        code = code.replace(/\[TheName\]/g, name)
            .replace(/\[TheTotal\]/g, total)
            .replace(/\[ThePassedArguments\]/g, passedArguments)
            .replace(/\[TheProperties\]/g, assignment)
            .replace(/\[CancellationCode\]/g, cancellationCode);

        return new Function("tryCatch", "errorObj", "Promise", "async", code)
                           (tryCatch, errorObj, Promise, async);
    };

    var holderClasses = [];
    var thenCallbacks = [];
    var promiseSetters = [];

    for (var i = 0; i < 8; ++i) {
        holderClasses.push(generateHolderClass(i + 1));
        thenCallbacks.push(thenCallback(i + 1));
        promiseSetters.push(promiseSetter(i + 1));
    }

    reject = function (reason) {
        this._reject(reason);
    };
}}

Promise.join = function () {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (false) {
            if (last <= 8 && canEvaluate) {
                var ret = new Promise(INTERNAL);
                ret._captureStackTrace();
                var HolderClass = holderClasses[last - 1];
                var holder = new HolderClass(fn);
                var callbacks = thenCallbacks;

                for (var i = 0; i < last; ++i) {
                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                    if (maybePromise instanceof Promise) {
                        maybePromise = maybePromise._target();
                        var bitField = maybePromise._bitField;
                        ;
                        if (((bitField & 50397184) === 0)) {
                            maybePromise._then(callbacks[i], reject,
                                               undefined, ret, holder);
                            promiseSetters[i](maybePromise, holder);
                            holder.asyncNeeded = false;
                        } else if (((bitField & 33554432) !== 0)) {
                            callbacks[i].call(ret,
                                              maybePromise._value(), holder);
                        } else if (((bitField & 16777216) !== 0)) {
                            ret._reject(maybePromise._reason());
                        } else {
                            ret._cancel();
                        }
                    } else {
                        callbacks[i].call(ret, maybePromise, holder);
                    }
                }

                if (!ret._isFateSealed()) {
                    if (holder.asyncNeeded) {
                        var domain = getDomain();
                        if (domain !== null) {
                            holder.fn = util.domainBind(domain, holder.fn);
                        }
                    }
                    ret._setAsyncGuaranteed();
                    ret._setOnCancel(holder);
                }
                return ret;
            }
        }
    }
    var args = [].slice.call(arguments);;
    if (fn) args.pop();
    var ret = new PromiseArray(args).promise();
    return fn !== undefined ? ret.spread(fn) : ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;
var async = Promise._async;

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._promise._captureStackTrace();
    var domain = getDomain();
    this._callback = domain === null ? fn : util.domainBind(domain, fn);
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = [];
    async.invoke(this._asyncInit, this, undefined);
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._asyncInit = function() {
    this._init$(undefined, -2);
};

MappingPromiseArray.prototype._init = function () {};

MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var values = this._values;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;

    if (index < 0) {
        index = (index * -1) - 1;
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return true;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return false;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var promise = this._promise;
        var callback = this._callback;
        var receiver = promise._boundValue();
        promise._pushContext();
        var ret = tryCatch(callback).call(receiver, value, index, length);
        var promiseCreated = promise._popContext();
        debug.checkForgottenReturns(
            ret,
            promiseCreated,
            preservedValues !== null ? "Promise.filter" : "Promise.map",
            promise
        );
        if (ret === errorObj) {
            this._reject(ret.e);
            return true;
        }

        var maybePromise = tryConvertToPromise(ret, this._promise);
        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;
            if (((bitField & 50397184) === 0)) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;
                maybePromise._proxy(this, (index + 1) * -1);
                return false;
            } else if (((bitField & 33554432) !== 0)) {
                ret = maybePromise._value();
            } else if (((bitField & 16777216) !== 0)) {
                this._reject(maybePromise._reason());
                return true;
            } else {
                this._cancel();
                return true;
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }
        return true;
    }
    return false;
};

MappingPromiseArray.prototype._drainQueue = function () {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        if (this._isResolved()) return;
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter = function (booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues = function () {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }

    var limit = 0;
    if (options !== undefined) {
        if (typeof options === "object" && options !== null) {
            if (typeof options.concurrency !== "number") {
                return Promise.reject(
                    new TypeError("'concurrency' must be a number but it is " +
                                    util.classString(options.concurrency)));
            }
            limit = options.concurrency;
        } else {
            return Promise.reject(new TypeError(
                            "options argument must be an object but it is " +
                             util.classString(options)));
        }
    }
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
}

Promise.prototype.map = function (fn, options) {
    return map(this, fn, options, null);
};

Promise.map = function (promises, fn, options, _filter) {
    return map(promises, fn, options, _filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

Promise.method = function (fn) {
    if (typeof fn !== "function") {
        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
    }
    return function () {
        var ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._pushContext();
        var value = tryCatch(fn).apply(this, arguments);
        var promiseCreated = ret._popContext();
        debug.checkForgottenReturns(
            value, promiseCreated, "Promise.method", ret);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._pushContext();
    var value;
    if (arguments.length > 1) {
        debug.deprecated("calling Promise.try with more than 1 argument");
        var arg = arguments[1];
        var ctx = arguments[2];
        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
                                  : tryCatch(fn).call(ctx, arg);
    } else {
        value = tryCatch(fn)();
    }
    var promiseCreated = ret._popContext();
    debug.checkForgottenReturns(
        value, promiseCreated, "Promise.try", ret);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.prototype._resolveFromSyncValue = function (value) {
    if (value === util.errorObj) {
        this._rejectCallback(value.e, false);
    } else {
        this._resolveCallback(value, true);
    }
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = _dereq_("./errors");
var OperationalError = errors.OperationalError;
var es5 = _dereq_("./es5");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

var rErrorKey = /^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
        ret.name = obj.name;
        ret.message = obj.message;
        ret.stack = obj.stack;
        var keys = es5.keys(obj);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!rErrorKey.test(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }
    util.markAsOriginatingFromRejection(obj);
    return obj;
}

function nodebackForPromise(promise, multiArgs) {
    return function(err, value) {
        if (promise === null) return;
        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (!multiArgs) {
            promise._fulfill(value);
        } else {
            var args = [].slice.call(arguments, 1);;
            promise._fulfill(args);
        }
        promise = null;
    };
}

module.exports = nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
var util = _dereq_("./util");
var async = Promise._async;
var tryCatch = util.tryCatch;
var errorObj = util.errorObj;

function spreadAdapter(val, nodeback) {
    var promise = this;
    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
    var ret =
        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

function successAdapter(val, nodeback) {
    var promise = this;
    var receiver = promise._boundValue();
    var ret = val === undefined
        ? tryCatch(nodeback).call(receiver, null)
        : tryCatch(nodeback).call(receiver, null, val);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}
function errorAdapter(reason, nodeback) {
    var promise = this;
    if (!reason) {
        var newReason = new Error(reason + "");
        newReason.cause = reason;
        reason = newReason;
    }
    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
    if (ret === errorObj) {
        async.throwLater(ret.e);
    }
}

Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                                                     options) {
    if (typeof nodeback == "function") {
        var adapter = successAdapter;
        if (options !== undefined && Object(options).spread) {
            adapter = spreadAdapter;
        }
        this._then(
            adapter,
            errorAdapter,
            undefined,
            this,
            nodeback
        );
    }
    return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports = function() {
var makeSelfResolutionError = function () {
    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var reflectHandler = function() {
    return new Promise.PromiseInspection(this._target());
};
var apiRejection = function(msg) {
    return Promise.reject(new TypeError(msg));
};
function Proxyable() {}
var UNDEFINED_BINDING = {};
var util = _dereq_("./util");

var getDomain;
if (util.isNode) {
    getDomain = function() {
        var ret = process.domain;
        if (ret === undefined) ret = null;
        return ret;
    };
} else {
    getDomain = function() {
        return null;
    };
}
util.notEnumerableProp(Promise, "_getDomain", getDomain);

var es5 = _dereq_("./es5");
var Async = _dereq_("./async");
var async = new Async();
es5.defineProperty(Promise, "_async", {value: async});
var errors = _dereq_("./errors");
var TypeError = Promise.TypeError = errors.TypeError;
Promise.RangeError = errors.RangeError;
var CancellationError = Promise.CancellationError = errors.CancellationError;
Promise.TimeoutError = errors.TimeoutError;
Promise.OperationalError = errors.OperationalError;
Promise.RejectionError = errors.OperationalError;
Promise.AggregateError = errors.AggregateError;
var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {};
var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
var PromiseArray =
    _dereq_("./promise_array")(Promise, INTERNAL,
                               tryConvertToPromise, apiRejection, Proxyable);
var Context = _dereq_("./context")(Promise);
 /*jshint unused:false*/
var createContext = Context.create;
var debug = _dereq_("./debuggability")(Promise, Context);
var CapturedTrace = debug.CapturedTrace;
var PassThroughHandlerContext =
    _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);
var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise = _dereq_("./nodeback");
var errorObj = util.errorObj;
var tryCatch = util.tryCatch;
function check(self, executor) {
    if (self == null || self.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    if (typeof executor !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(executor));
    }

}

function Promise(executor) {
    if (executor !== INTERNAL) {
        check(this, executor);
    }
    this._bitField = 0;
    this._fulfillmentHandler0 = undefined;
    this._rejectionHandler0 = undefined;
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._resolveFromExecutor(executor);
    this._promiseCreated();
    this._fireEvent("promiseCreated", this);
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (util.isObject(item)) {
                catchInstances[j++] = item;
            } else {
                return apiRejection("Catch statement predicate: " +
                    "expecting an object but got " + util.classString(item));
            }
        }
        catchInstances.length = j;
        fn = arguments[i];
        return this.then(undefined, catchFilter(catchInstances, fn, this));
    }
    return this.then(undefined, fn);
};

Promise.prototype.reflect = function () {
    return this._then(reflectHandler,
        reflectHandler, undefined, this, undefined);
};

Promise.prototype.then = function (didFulfill, didReject) {
    if (debug.warnings() && arguments.length > 0 &&
        typeof didFulfill !== "function" &&
        typeof didReject !== "function") {
        var msg = ".then() only accepts functions but was passed: " +
                util.classString(didFulfill);
        if (arguments.length > 1) {
            msg += ", " + util.classString(didReject);
        }
        this._warn(msg);
    }
    return this._then(didFulfill, didReject, undefined, undefined, undefined);
};

Promise.prototype.done = function (didFulfill, didReject) {
    var promise =
        this._then(didFulfill, didReject, undefined, undefined, undefined);
    promise._setIsFinal();
};

Promise.prototype.spread = function (fn) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
};

Promise.prototype.toJSON = function () {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: undefined,
        rejectionReason: undefined
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this.value();
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this.reason();
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function () {
    if (arguments.length > 0) {
        this._warn(".all() was passed arguments but it does not take any");
    }
    return new PromiseArray(this).promise();
};

Promise.prototype.error = function (fn) {
    return this.caught(util.originatesFromRejection, fn);
};

Promise.getNewLibraryCopy = module.exports;

Promise.is = function (val) {
    return val instanceof Promise;
};

Promise.fromNode = Promise.fromCallback = function(fn) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
                                         : false;
    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
    if (result === errorObj) {
        ret._rejectCallback(result.e, true);
    }
    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
    return ret;
};

Promise.all = function (promises) {
    return new PromiseArray(promises).promise();
};

Promise.cast = function (obj) {
    var ret = tryConvertToPromise(obj);
    if (!(ret instanceof Promise)) {
        ret = new Promise(INTERNAL);
        ret._captureStackTrace();
        ret._setFulfilled();
        ret._rejectionHandler0 = obj;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function (reason) {
    var ret = new Promise(INTERNAL);
    ret._captureStackTrace();
    ret._rejectCallback(reason, true);
    return ret;
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    return async.setScheduler(fn);
};

Promise.prototype._then = function (
    didFulfill,
    didReject,
    _,    receiver,
    internalData
) {
    var haveInternalData = internalData !== undefined;
    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
    var target = this._target();
    var bitField = target._bitField;

    if (!haveInternalData) {
        promise._propagateFrom(this, 3);
        promise._captureStackTrace();
        if (receiver === undefined &&
            ((this._bitField & 2097152) !== 0)) {
            if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
            } else {
                receiver = target === this ? undefined : this._boundTo;
            }
        }
        this._fireEvent("promiseChained", this, promise);
    }

    var domain = getDomain();
    if (!((bitField & 50397184) === 0)) {
        var handler, value, settler = target._settlePromiseCtx;
        if (((bitField & 33554432) !== 0)) {
            value = target._rejectionHandler0;
            handler = didFulfill;
        } else if (((bitField & 16777216) !== 0)) {
            value = target._fulfillmentHandler0;
            handler = didReject;
            target._unsetRejectionIsUnhandled();
        } else {
            settler = target._settlePromiseLateCancellationObserver;
            value = new CancellationError("late cancellation observer");
            target._attachExtraTrace(value);
            handler = didReject;
        }

        async.invoke(settler, target, {
            handler: domain === null ? handler
                : (typeof handler === "function" &&
                    util.domainBind(domain, handler)),
            promise: promise,
            receiver: receiver,
            value: value
        });
    } else {
        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
    }

    return promise;
};

Promise.prototype._length = function () {
    return this._bitField & 65535;
};

Promise.prototype._isFateSealed = function () {
    return (this._bitField & 117506048) !== 0;
};

Promise.prototype._isFollowing = function () {
    return (this._bitField & 67108864) === 67108864;
};

Promise.prototype._setLength = function (len) {
    this._bitField = (this._bitField & -65536) |
        (len & 65535);
};

Promise.prototype._setFulfilled = function () {
    this._bitField = this._bitField | 33554432;
    this._fireEvent("promiseFulfilled", this);
};

Promise.prototype._setRejected = function () {
    this._bitField = this._bitField | 16777216;
    this._fireEvent("promiseRejected", this);
};

Promise.prototype._setFollowing = function () {
    this._bitField = this._bitField | 67108864;
    this._fireEvent("promiseResolved", this);
};

Promise.prototype._setIsFinal = function () {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._isFinal = function () {
    return (this._bitField & 4194304) > 0;
};

Promise.prototype._unsetCancelled = function() {
    this._bitField = this._bitField & (~65536);
};

Promise.prototype._setCancelled = function() {
    this._bitField = this._bitField | 65536;
    this._fireEvent("promiseCancelled", this);
};

Promise.prototype._setWillBeCancelled = function() {
    this._bitField = this._bitField | 8388608;
};

Promise.prototype._setAsyncGuaranteed = function() {
    if (async.hasCustomScheduler()) return;
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._receiverAt = function (index) {
    var ret = index === 0 ? this._receiver0 : this[
            index * 4 - 4 + 3];
    if (ret === UNDEFINED_BINDING) {
        return undefined;
    } else if (ret === undefined && this._isBound()) {
        return this._boundValue();
    }
    return ret;
};

Promise.prototype._promiseAt = function (index) {
    return this[
            index * 4 - 4 + 2];
};

Promise.prototype._fulfillmentHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 0];
};

Promise.prototype._rejectionHandlerAt = function (index) {
    return this[
            index * 4 - 4 + 1];
};

Promise.prototype._boundValue = function() {};

Promise.prototype._migrateCallback0 = function (follower) {
    var bitField = follower._bitField;
    var fulfill = follower._fulfillmentHandler0;
    var reject = follower._rejectionHandler0;
    var promise = follower._promise0;
    var receiver = follower._receiverAt(0);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._migrateCallbackAt = function (follower, index) {
    var fulfill = follower._fulfillmentHandlerAt(index);
    var reject = follower._rejectionHandlerAt(index);
    var promise = follower._promiseAt(index);
    var receiver = follower._receiverAt(index);
    if (receiver === undefined) receiver = UNDEFINED_BINDING;
    this._addCallbacks(fulfill, reject, promise, receiver, null);
};

Promise.prototype._addCallbacks = function (
    fulfill,
    reject,
    promise,
    receiver,
    domain
) {
    var index = this._length();

    if (index >= 65535 - 4) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        this._receiver0 = receiver;
        if (typeof fulfill === "function") {
            this._fulfillmentHandler0 =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this._rejectionHandler0 =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    } else {
        var base = index * 4 - 4;
        this[base + 2] = promise;
        this[base + 3] = receiver;
        if (typeof fulfill === "function") {
            this[base + 0] =
                domain === null ? fulfill : util.domainBind(domain, fulfill);
        }
        if (typeof reject === "function") {
            this[base + 1] =
                domain === null ? reject : util.domainBind(domain, reject);
        }
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._proxy = function (proxyable, arg) {
    this._addCallbacks(undefined, undefined, arg, proxyable, null);
};

Promise.prototype._resolveCallback = function(value, shouldBind) {
    if (((this._bitField & 117506048) !== 0)) return;
    if (value === this)
        return this._rejectCallback(makeSelfResolutionError(), false);
    var maybePromise = tryConvertToPromise(value, this);
    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

    if (shouldBind) this._propagateFrom(maybePromise, 2);

    var promise = maybePromise._target();

    if (promise === this) {
        this._reject(makeSelfResolutionError());
        return;
    }

    var bitField = promise._bitField;
    if (((bitField & 50397184) === 0)) {
        var len = this._length();
        if (len > 0) promise._migrateCallback0(this);
        for (var i = 1; i < len; ++i) {
            promise._migrateCallbackAt(this, i);
        }
        this._setFollowing();
        this._setLength(0);
        this._setFollowee(promise);
    } else if (((bitField & 33554432) !== 0)) {
        this._fulfill(promise._value());
    } else if (((bitField & 16777216) !== 0)) {
        this._reject(promise._reason());
    } else {
        var reason = new CancellationError("late cancellation observer");
        promise._attachExtraTrace(reason);
        this._reject(reason);
    }
};

Promise.prototype._rejectCallback =
function(reason, synchronous, ignoreNonErrorWarnings) {
    var trace = util.ensureErrorObject(reason);
    var hasStack = trace === reason;
    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
        var message = "a promise was rejected with a non-error: " +
            util.classString(reason);
        this._warn(message, true);
    }
    this._attachExtraTrace(trace, synchronous ? hasStack : false);
    this._reject(reason);
};

Promise.prototype._resolveFromExecutor = function (executor) {
    if (executor === INTERNAL) return;
    var promise = this;
    this._captureStackTrace();
    this._pushContext();
    var synchronous = true;
    var r = this._execute(executor, function(value) {
        promise._resolveCallback(value);
    }, function (reason) {
        promise._rejectCallback(reason, synchronous);
    });
    synchronous = false;
    this._popContext();

    if (r !== undefined) {
        promise._rejectCallback(r, true);
    }
};

Promise.prototype._settlePromiseFromHandler = function (
    handler, receiver, value, promise
) {
    var bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;
    promise._pushContext();
    var x;
    if (receiver === APPLY) {
        if (!value || typeof value.length !== "number") {
            x = errorObj;
            x.e = new TypeError("cannot .spread() a non-array: " +
                                    util.classString(value));
        } else {
            x = tryCatch(handler).apply(this._boundValue(), value);
        }
    } else {
        x = tryCatch(handler).call(receiver, value);
    }
    var promiseCreated = promise._popContext();
    bitField = promise._bitField;
    if (((bitField & 65536) !== 0)) return;

    if (x === NEXT_FILTER) {
        promise._reject(value);
    } else if (x === errorObj) {
        promise._rejectCallback(x.e, false);
    } else {
        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
        promise._resolveCallback(x);
    }
};

Promise.prototype._target = function() {
    var ret = this;
    while (ret._isFollowing()) ret = ret._followee();
    return ret;
};

Promise.prototype._followee = function() {
    return this._rejectionHandler0;
};

Promise.prototype._setFollowee = function(promise) {
    this._rejectionHandler0 = promise;
};

Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
    var isPromise = promise instanceof Promise;
    var bitField = this._bitField;
    var asyncGuaranteed = ((bitField & 134217728) !== 0);
    if (((bitField & 65536) !== 0)) {
        if (isPromise) promise._invokeInternalOnCancel();

        if (receiver instanceof PassThroughHandlerContext &&
            receiver.isFinallyHandler()) {
            receiver.cancelPromise = promise;
            if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
            }
        } else if (handler === reflectHandler) {
            promise._fulfill(reflectHandler.call(receiver));
        } else if (receiver instanceof Proxyable) {
            receiver._promiseCancelled(promise);
        } else if (isPromise || promise instanceof PromiseArray) {
            promise._cancel();
        } else {
            receiver.cancel();
        }
    } else if (typeof handler === "function") {
        if (!isPromise) {
            handler.call(receiver, value, promise);
        } else {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (receiver instanceof Proxyable) {
        if (!receiver._isResolved()) {
            if (((bitField & 33554432) !== 0)) {
                receiver._promiseFulfilled(value, promise);
            } else {
                receiver._promiseRejected(value, promise);
            }
        }
    } else if (isPromise) {
        if (asyncGuaranteed) promise._setAsyncGuaranteed();
        if (((bitField & 33554432) !== 0)) {
            promise._fulfill(value);
        } else {
            promise._reject(value);
        }
    }
};

Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
    var handler = ctx.handler;
    var promise = ctx.promise;
    var receiver = ctx.receiver;
    var value = ctx.value;
    if (typeof handler === "function") {
        if (!(promise instanceof Promise)) {
            handler.call(receiver, value, promise);
        } else {
            this._settlePromiseFromHandler(handler, receiver, value, promise);
        }
    } else if (promise instanceof Promise) {
        promise._reject(value);
    }
};

Promise.prototype._settlePromiseCtx = function(ctx) {
    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
};

Promise.prototype._settlePromise0 = function(handler, value, bitField) {
    var promise = this._promise0;
    var receiver = this._receiverAt(0);
    this._promise0 = undefined;
    this._receiver0 = undefined;
    this._settlePromise(promise, handler, receiver, value);
};

Promise.prototype._clearCallbackDataAtIndex = function(index) {
    var base = index * 4 - 4;
    this[base + 2] =
    this[base + 3] =
    this[base + 0] =
    this[base + 1] = undefined;
};

Promise.prototype._fulfill = function (value) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._reject(err);
    }
    this._setFulfilled();
    this._rejectionHandler0 = value;

    if ((bitField & 65535) > 0) {
        if (((bitField & 134217728) !== 0)) {
            this._settlePromises();
        } else {
            async.settlePromises(this);
        }
    }
};

Promise.prototype._reject = function (reason) {
    var bitField = this._bitField;
    if (((bitField & 117506048) >>> 16)) return;
    this._setRejected();
    this._fulfillmentHandler0 = reason;

    if (this._isFinal()) {
        return async.fatalError(reason, util.isNode);
    }

    if ((bitField & 65535) > 0) {
        async.settlePromises(this);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._fulfillPromises = function (len, value) {
    for (var i = 1; i < len; i++) {
        var handler = this._fulfillmentHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, value);
    }
};

Promise.prototype._rejectPromises = function (len, reason) {
    for (var i = 1; i < len; i++) {
        var handler = this._rejectionHandlerAt(i);
        var promise = this._promiseAt(i);
        var receiver = this._receiverAt(i);
        this._clearCallbackDataAtIndex(i);
        this._settlePromise(promise, handler, receiver, reason);
    }
};

Promise.prototype._settlePromises = function () {
    var bitField = this._bitField;
    var len = (bitField & 65535);

    if (len > 0) {
        if (((bitField & 16842752) !== 0)) {
            var reason = this._fulfillmentHandler0;
            this._settlePromise0(this._rejectionHandler0, reason, bitField);
            this._rejectPromises(len, reason);
        } else {
            var value = this._rejectionHandler0;
            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
            this._fulfillPromises(len, value);
        }
        this._setLength(0);
    }
    this._clearCancellationData();
};

Promise.prototype._settledValue = function() {
    var bitField = this._bitField;
    if (((bitField & 33554432) !== 0)) {
        return this._rejectionHandler0;
    } else if (((bitField & 16777216) !== 0)) {
        return this._fulfillmentHandler0;
    }
};

function deferResolve(v) {this.promise._resolveCallback(v);}
function deferReject(v) {this.promise._rejectCallback(v, false);}

Promise.defer = Promise.pending = function() {
    debug.deprecated("Promise.defer", "new Promise");
    var promise = new Promise(INTERNAL);
    return {
        promise: promise,
        resolve: deferResolve,
        reject: deferReject
    };
};

util.notEnumerableProp(Promise,
                       "_makeSelfResolutionError",
                       makeSelfResolutionError);

_dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
    debug);
_dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
_dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
    Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);
Promise.Promise = Promise;
Promise.version = "3.5.1";
_dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./call_get.js')(Promise);
_dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
_dereq_('./timers.js')(Promise, INTERNAL, debug);
_dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise, INTERNAL);
_dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
_dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
_dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
_dereq_('./settle.js')(Promise, PromiseArray, debug);
_dereq_('./some.js')(Promise, PromiseArray, apiRejection);
_dereq_('./filter.js')(Promise, INTERNAL);
_dereq_('./each.js')(Promise, INTERNAL);
_dereq_('./any.js')(Promise);
                                                         
    util.toFastProperties(Promise);                                          
    util.toFastProperties(Promise.prototype);                                
    function fillTypes(value) {                                              
        var p = new Promise(INTERNAL);                                       
        p._fulfillmentHandler0 = value;                                      
        p._rejectionHandler0 = value;                                        
        p._promise0 = value;                                                 
        p._receiver0 = value;                                                
    }                                                                        
    // Complete slack tracking, opt out of field-type tracking and           
    // stabilize map                                                         
    fillTypes({a: 1});                                                       
    fillTypes({b: 2});                                                       
    fillTypes({c: 3});                                                       
    fillTypes(1);                                                            
    fillTypes(function(){});                                                 
    fillTypes(undefined);                                                    
    fillTypes(false);                                                        
    fillTypes(new Promise(INTERNAL));                                        
    debug.setBounds(Async.firstLineError, util.lastLineError);               
    return Promise;                                                          

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, tryConvertToPromise,
    apiRejection, Proxyable) {
var util = _dereq_("./util");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -2: return [];
    case -3: return {};
    case -6: return new Map();
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    if (values instanceof Promise) {
        promise._propagateFrom(values, 3);
    }
    promise._setOnCancel(this);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(undefined, -2);
}
util.inherits(PromiseArray, Proxyable);

PromiseArray.prototype.length = function () {
    return this._length;
};

PromiseArray.prototype.promise = function () {
    return this._promise;
};

PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
    var values = tryConvertToPromise(this._values, this._promise);
    if (values instanceof Promise) {
        values = values._target();
        var bitField = values._bitField;
        ;
        this._values = values;

        if (((bitField & 50397184) === 0)) {
            this._promise._setAsyncGuaranteed();
            return values._then(
                init,
                this._reject,
                undefined,
                this,
                resolveValueIfEmpty
           );
        } else if (((bitField & 33554432) !== 0)) {
            values = values._value();
        } else if (((bitField & 16777216) !== 0)) {
            return this._reject(values._reason());
        } else {
            return this._cancel();
        }
    }
    values = util.asArray(values);
    if (values === null) {
        var err = apiRejection(
            "expecting an array or an iterable object but got " + util.classString(values)).reason();
        this._promise._rejectCallback(err, false);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    this._iterate(values);
};

PromiseArray.prototype._iterate = function(values) {
    var len = this.getActualLength(values.length);
    this._length = len;
    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
    var result = this._promise;
    var isResolved = false;
    var bitField = null;
    for (var i = 0; i < len; ++i) {
        var maybePromise = tryConvertToPromise(values[i], result);

        if (maybePromise instanceof Promise) {
            maybePromise = maybePromise._target();
            bitField = maybePromise._bitField;
        } else {
            bitField = null;
        }

        if (isResolved) {
            if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
            }
        } else if (bitField !== null) {
            if (((bitField & 50397184) === 0)) {
                maybePromise._proxy(this, i);
                this._values[i] = maybePromise;
            } else if (((bitField & 33554432) !== 0)) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
            } else if (((bitField & 16777216) !== 0)) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
            } else {
                isResolved = this._promiseCancelled(i);
            }
        } else {
            isResolved = this._promiseFulfilled(maybePromise, i);
        }
    }
    if (!isResolved) result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved = function () {
    return this._values === null;
};

PromiseArray.prototype._resolve = function (value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype._cancel = function() {
    if (this._isResolved() || !this._promise._isCancellable()) return;
    this._values = null;
    this._promise._cancel();
};

PromiseArray.prototype._reject = function (reason) {
    this._values = null;
    this._promise._rejectCallback(reason, false);
};

PromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

PromiseArray.prototype._promiseCancelled = function() {
    this._cancel();
    return true;
};

PromiseArray.prototype._promiseRejected = function (reason) {
    this._totalResolved++;
    this._reject(reason);
    return true;
};

PromiseArray.prototype._resultCancelled = function() {
    if (this._isResolved()) return;
    var values = this._values;
    this._cancel();
    if (values instanceof Promise) {
        values.cancel();
    } else {
        for (var i = 0; i < values.length; ++i) {
            if (values[i] instanceof Promise) {
                values[i].cancel();
            }
        }
    }
};

PromiseArray.prototype.shouldCopyValues = function () {
    return true;
};

PromiseArray.prototype.getActualLength = function (len) {
    return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = _dereq_("./util");
var nodebackForPromise = _dereq_("./nodeback");
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = _dereq_("./errors").TypeError;
var defaultSuffix = "Async";
var defaultPromisified = {__isPromisified__: true};
var noCopyProps = [
    "arity",    "length",
    "name",
    "arguments",
    "caller",
    "callee",
    "prototype",
    "__isPromisified__"
];
var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

var defaultFilter = function(name) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        name !== "constructor";
};

function propsFilter(key) {
    return !noCopyPropsPattern.test(key);
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
                        .replace("%s", suffix));
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        var passesDefaultFilter = filter === defaultFilter
            ? true : defaultFilter(key, value, obj);
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj, passesDefaultFilter)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

var escapeIdentRegex = function(str) {
    return str.replace(/([$])/, "\\$");
};

var makeNodePromisifiedEval;
if (false) {
var switchCaseArgumentOrder = function(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 3);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
        ret.push(i);
    }
    return ret;
};

var argumentSequence = function(argumentCount) {
    return util.filledRange(argumentCount, "_arg", "");
};

var parameterDeclaration = function(parameterCount) {
    return util.filledRange(
        Math.max(parameterCount, 3), "_arg", "");
};

var parameterCount = function(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
};

makeNodePromisifiedEval =
function(callback, receiver, originalName, fn, _, multiArgs) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (shouldProxyThis) {
            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
        } else {
            ret = receiver === undefined
                ? "ret = callback({{args}}, nodeback); break;\n"
                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
        }
        return ret.replace("{{args}}", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for (var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", (shouldProxyThis
                                ? "ret = callback.apply(this, args);\n"
                                : "ret = callback.apply(receiver, args);\n"));
        return ret;
    }

    var getFunctionCode = typeof callback === "string"
                                ? ("this != null ? this['"+callback+"'] : fn")
                                : "fn";
    var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
        .replace("[GetFunctionCode]", getFunctionCode);
    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
    return new Function("Promise",
                        "fn",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "tryCatch",
                        "errorObj",
                        "notEnumerableProp",
                        "INTERNAL",
                        body)(
                    Promise,
                    fn,
                    receiver,
                    withAppended,
                    maybeWrapAsError,
                    nodebackForPromise,
                    util.tryCatch,
                    util.errorObj,
                    util.notEnumerableProp,
                    INTERNAL);
};
}

function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
    var defaultThis = (function() {return this;})();
    var method = callback;
    if (typeof method === "string") {
        callback = fn;
    }
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        var promise = new Promise(INTERNAL);
        promise._captureStackTrace();
        var cb = typeof method === "string" && this !== defaultThis
            ? this[method] : callback;
        var fn = nodebackForPromise(promise, multiArgs);
        try {
            cb.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            promise._rejectCallback(maybeWrapAsError(e), true, true);
        }
        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
        return promise;
    }
    util.notEnumerableProp(promisified, "__isPromisified__", true);
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        if (promisifier === makeNodePromisified) {
            obj[promisifiedKey] =
                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
        } else {
            var promisified = promisifier(fn, function() {
                return makeNodePromisified(key, THIS, key,
                                           fn, suffix, multiArgs);
            });
            util.notEnumerableProp(promisified, "__isPromisified__", true);
            obj[promisifiedKey] = promisified;
        }
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver, multiArgs) {
    return makeNodePromisified(callback, receiver, undefined,
                                callback, null, multiArgs);
}

Promise.promisify = function (fn, options) {
    if (typeof fn !== "function") {
        throw new TypeError("expecting a function but got " + util.classString(fn));
    }
    if (isPromisified(fn)) {
        return fn;
    }
    options = Object(options);
    var receiver = options.context === undefined ? THIS : options.context;
    var multiArgs = !!options.multiArgs;
    var ret = promisify(fn, receiver, multiArgs);
    util.copyDescriptors(fn, ret, propsFilter);
    return ret;
};

Promise.promisifyAll = function (target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    options = Object(options);
    var multiArgs = !!options.multiArgs;
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }

    var keys = util.inheritedDataKeys(target);
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier,
                multiArgs);
            promisifyAll(value, suffix, filter, promisifier, multiArgs);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");
var isObject = util.isObject;
var es5 = _dereq_("./es5");
var Es6Map;
if (typeof Map === "function") Es6Map = Map;

var mapToEntries = (function() {
    var index = 0;
    var size = 0;

    function extractEntry(value, key) {
        this[index] = value;
        this[index + size] = key;
        index++;
    }

    return function mapToEntries(map) {
        size = map.size;
        index = 0;
        var ret = new Array(map.size * 2);
        map.forEach(extractEntry, ret);
        return ret;
    };
})();

var entriesToMap = function(entries) {
    var ret = new Es6Map();
    var length = entries.length / 2 | 0;
    for (var i = 0; i < length; ++i) {
        var key = entries[length + i];
        var value = entries[i];
        ret.set(key, value);
    }
    return ret;
};

function PropertiesPromiseArray(obj) {
    var isMap = false;
    var entries;
    if (Es6Map !== undefined && obj instanceof Es6Map) {
        entries = mapToEntries(obj);
        isMap = true;
    } else {
        var keys = es5.keys(obj);
        var len = keys.length;
        entries = new Array(len * 2);
        for (var i = 0; i < len; ++i) {
            var key = keys[i];
            entries[i] = obj[key];
            entries[i + len] = key;
        }
    }
    this.constructor$(entries);
    this._isMap = isMap;
    this._init$(undefined, isMap ? -6 : -3);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init = function () {};

PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val;
        if (this._isMap) {
            val = entriesToMap(this._values);
        } else {
            val = {};
            var keyOffset = this.length();
            for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
            }
        }
        this._resolve(val);
        return true;
    }
    return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength = function (len) {
    return len >> 1;
};

function props(promises) {
    var ret;
    var castValue = tryConvertToPromise(promises);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(
            Promise.props, undefined, undefined, undefined, undefined);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 2);
    }
    return ret;
}

Promise.prototype.props = function () {
    return props(this);
};

Promise.props = function (promises) {
    return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
        src[j + srcIndex] = void 0;
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
}

Queue.prototype._willBeOverCapacity = function (size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function (arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function (fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function () {
    var front = this._front,
        ret = this[front];

    this[front] = undefined;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function () {
    return this._length;
};

Queue.prototype._checkCapacity = function (size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 1);
    }
};

Queue.prototype._resizeTo = function (capacity) {
    var oldCapacity = this._capacity;
    this._capacity = capacity;
    var front = this._front;
    var length = this._length;
    var moveItemsCount = (front + length) & (oldCapacity - 1);
    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
};

module.exports = Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports = function(
    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
var util = _dereq_("./util");

var raceLater = function (promise) {
    return promise.then(function(array) {
        return race(array, promise);
    });
};

function race(promises, parent) {
    var maybePromise = tryConvertToPromise(promises);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else {
        promises = util.asArray(promises);
        if (promises === null)
            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
    }

    var ret = new Promise(INTERNAL);
    if (parent !== undefined) {
        ret._propagateFrom(parent, 3);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === undefined && !(i in promises)) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
    }
    return ret;
}

Promise.race = function (promises) {
    return race(promises, undefined);
};

Promise.prototype.race = function () {
    return race(this, undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise,
                          PromiseArray,
                          apiRejection,
                          tryConvertToPromise,
                          INTERNAL,
                          debug) {
var getDomain = Promise._getDomain;
var util = _dereq_("./util");
var tryCatch = util.tryCatch;

function ReductionPromiseArray(promises, fn, initialValue, _each) {
    this.constructor$(promises);
    var domain = getDomain();
    this._fn = domain === null ? fn : util.domainBind(domain, fn);
    if (initialValue !== undefined) {
        initialValue = Promise.resolve(initialValue);
        initialValue._attachCancellationCallback(this);
    }
    this._initialValue = initialValue;
    this._currentCancellable = null;
    if(_each === INTERNAL) {
        this._eachValues = Array(this._length);
    } else if (_each === 0) {
        this._eachValues = null;
    } else {
        this._eachValues = undefined;
    }
    this._promise._captureStackTrace();
    this._init$(undefined, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._gotAccum = function(accum) {
    if (this._eachValues !== undefined && 
        this._eachValues !== null && 
        accum !== INTERNAL) {
        this._eachValues.push(accum);
    }
};

ReductionPromiseArray.prototype._eachComplete = function(value) {
    if (this._eachValues !== null) {
        this._eachValues.push(value);
    }
    return this._eachValues;
};

ReductionPromiseArray.prototype._init = function() {};

ReductionPromiseArray.prototype._resolveEmptyArray = function() {
    this._resolve(this._eachValues !== undefined ? this._eachValues
                                                 : this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues = function () {
    return false;
};

ReductionPromiseArray.prototype._resolve = function(value) {
    this._promise._resolveCallback(value);
    this._values = null;
};

ReductionPromiseArray.prototype._resultCancelled = function(sender) {
    if (sender === this._initialValue) return this._cancel();
    if (this._isResolved()) return;
    this._resultCancelled$();
    if (this._currentCancellable instanceof Promise) {
        this._currentCancellable.cancel();
    }
    if (this._initialValue instanceof Promise) {
        this._initialValue.cancel();
    }
};

ReductionPromiseArray.prototype._iterate = function (values) {
    this._values = values;
    var value;
    var i;
    var length = values.length;
    if (this._initialValue !== undefined) {
        value = this._initialValue;
        i = 0;
    } else {
        value = Promise.resolve(values[0]);
        i = 1;
    }

    this._currentCancellable = value;

    if (!value.isRejected()) {
        for (; i < length; ++i) {
            var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
            };
            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
        }
    }

    if (this._eachValues !== undefined) {
        value = value
            ._then(this._eachComplete, undefined, undefined, this, undefined);
    }
    value._then(completed, completed, undefined, value, this);
};

Promise.prototype.reduce = function (fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function (promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};

function completed(valueOrReason, array) {
    if (this.isFulfilled()) {
        array._resolve(valueOrReason);
    } else {
        array._reject(valueOrReason);
    }
}

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") {
        return apiRejection("expecting a function but got " + util.classString(fn));
    }
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

function gotAccum(accum) {
    this.accum = accum;
    this.array._gotAccum(accum);
    var value = tryConvertToPromise(this.value, this.array._promise);
    if (value instanceof Promise) {
        this.array._currentCancellable = value;
        return value._then(gotValue, undefined, undefined, this, undefined);
    } else {
        return gotValue.call(this, value);
    }
}

function gotValue(value) {
    var array = this.array;
    var promise = array._promise;
    var fn = tryCatch(array._fn);
    promise._pushContext();
    var ret;
    if (array._eachValues !== undefined) {
        ret = fn.call(promise._boundValue(), value, this.index, this.length);
    } else {
        ret = fn.call(promise._boundValue(),
                              this.accum, value, this.index, this.length);
    }
    if (ret instanceof Promise) {
        array._currentCancellable = ret;
    }
    var promiseCreated = promise._popContext();
    debug.checkForgottenReturns(
        ret,
        promiseCreated,
        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
        promise
    );
    return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util = _dereq_("./util");
var schedule;
var noAsyncScheduler = function() {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
};
var NativePromise = util.getNativePromise();
if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode
                ? function(fn) { GlobalSetImmediate.call(global, fn); }
                : function(fn) { ProcessNextTick.call(process, fn); };
} else if (typeof NativePromise === "function" &&
           typeof NativePromise.resolve === "function") {
    var nativePromise = NativePromise.resolve();
    schedule = function(fn) {
        nativePromise.then(fn);
    };
} else if ((typeof MutationObserver !== "undefined") &&
          !(typeof window !== "undefined" &&
            window.navigator &&
            (window.navigator.standalone || window.cordova))) {
    schedule = (function() {
        var div = document.createElement("div");
        var opts = {attributes: true};
        var toggleScheduled = false;
        var div2 = document.createElement("div");
        var o2 = new MutationObserver(function() {
            div.classList.toggle("foo");
            toggleScheduled = false;
        });
        o2.observe(div2, opts);

        var scheduleToggle = function() {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
        };

        return function schedule(fn) {
            var o = new MutationObserver(function() {
                o.disconnect();
                fn();
            });
            o.observe(div, opts);
            scheduleToggle();
        };
    })();
} else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
        setImmediate(fn);
    };
} else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
        setTimeout(fn, 0);
    };
} else {
    schedule = noAsyncScheduler;
}
module.exports = schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports =
    function(Promise, PromiseArray, debug) {
var PromiseInspection = Promise.PromiseInspection;
var util = _dereq_("./util");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
        return true;
    }
    return false;
};

SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
    var ret = new PromiseInspection();
    ret._bitField = 33554432;
    ret._settledValueField = value;
    return this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
    var ret = new PromiseInspection();
    ret._bitField = 16777216;
    ret._settledValueField = reason;
    return this._promiseResolved(index, ret);
};

Promise.settle = function (promises) {
    debug.deprecated(".settle()", ".reflect()");
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function () {
    return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = _dereq_("./util");
var RangeError = _dereq_("./errors").RangeError;
var AggregateError = _dereq_("./errors").AggregateError;
var isArray = util.isArray;
var CANCELLATION = {};


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function () {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(undefined, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function () {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function () {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function () {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany = function (count) {
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled = function (value) {
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
        return true;
    }
    return false;

};
SomePromiseArray.prototype._promiseRejected = function (reason) {
    this._addRejected(reason);
    return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled = function () {
    if (this._values instanceof Promise || this._values == null) {
        return this._cancel();
    }
    this._addRejected(CANCELLATION);
    return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome = function() {
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
            }
        }
        if (e.length > 0) {
            this._reject(e);
        } else {
            this._cancel();
        }
        return true;
    }
    return false;
};

SomePromiseArray.prototype._fulfilled = function () {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function () {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected = function (reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled = function (value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill = function () {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError = function (count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray = function () {
    this._reject(this._getRangeError(0));
};

function some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function (promises, howMany) {
    return some(promises, howMany);
};

Promise.prototype.some = function (howMany) {
    return some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== undefined) {
        promise = promise._target();
        this._bitField = promise._bitField;
        this._settledValueField = promise._isFateSealed()
            ? promise._settledValue() : undefined;
    }
    else {
        this._bitField = 0;
        this._settledValueField = undefined;
    }
}

PromiseInspection.prototype._settledValue = function() {
    return this._settledValueField;
};

var value = PromiseInspection.prototype.value = function () {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var reason = PromiseInspection.prototype.error =
PromiseInspection.prototype.reason = function () {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
    }
    return this._settledValue();
};

var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
    return (this._bitField & 33554432) !== 0;
};

var isRejected = PromiseInspection.prototype.isRejected = function () {
    return (this._bitField & 16777216) !== 0;
};

var isPending = PromiseInspection.prototype.isPending = function () {
    return (this._bitField & 50397184) === 0;
};

var isResolved = PromiseInspection.prototype.isResolved = function () {
    return (this._bitField & 50331648) !== 0;
};

PromiseInspection.prototype.isCancelled = function() {
    return (this._bitField & 8454144) !== 0;
};

Promise.prototype.__isCancelled = function() {
    return (this._bitField & 65536) === 65536;
};

Promise.prototype._isCancelled = function() {
    return this._target().__isCancelled();
};

Promise.prototype.isCancelled = function() {
    return (this._target()._bitField & 8454144) !== 0;
};

Promise.prototype.isPending = function() {
    return isPending.call(this._target());
};

Promise.prototype.isRejected = function() {
    return isRejected.call(this._target());
};

Promise.prototype.isFulfilled = function() {
    return isFulfilled.call(this._target());
};

Promise.prototype.isResolved = function() {
    return isResolved.call(this._target());
};

Promise.prototype.value = function() {
    return value.call(this._target());
};

Promise.prototype.reason = function() {
    var target = this._target();
    target._unsetRejectionIsUnhandled();
    return reason.call(target);
};

Promise.prototype._value = function() {
    return this._settledValue();
};

Promise.prototype._reason = function() {
    this._unsetRejectionIsUnhandled();
    return this._settledValue();
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = _dereq_("./util");
var errorObj = util.errorObj;
var isObject = util.isObject;

function tryConvertToPromise(obj, context) {
    if (isObject(obj)) {
        if (obj instanceof Promise) return obj;
        var then = getThen(obj);
        if (then === errorObj) {
            if (context) context._pushContext();
            var ret = Promise.reject(then.e);
            if (context) context._popContext();
            return ret;
        } else if (typeof then === "function") {
            if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);
                obj._then(
                    ret._fulfill,
                    ret._reject,
                    undefined,
                    ret,
                    null
                );
                return ret;
            }
            return doThenable(obj, then, context);
        }
    }
    return obj;
}

function doGetThen(obj) {
    return obj.then;
}

function getThen(obj) {
    try {
        return doGetThen(obj);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    try {
        return hasProp.call(obj, "_promise0");
    } catch (e) {
        return false;
    }
}

function doThenable(x, then, context) {
    var promise = new Promise(INTERNAL);
    var ret = promise;
    if (context) context._pushContext();
    promise._captureStackTrace();
    if (context) context._popContext();
    var synchronous = true;
    var result = util.tryCatch(then).call(x, resolve, reject);
    synchronous = false;

    if (promise && result === errorObj) {
        promise._rejectCallback(result.e, true, true);
        promise = null;
    }

    function resolve(value) {
        if (!promise) return;
        promise._resolveCallback(value);
        promise = null;
    }

    function reject(reason) {
        if (!promise) return;
        promise._rejectCallback(reason, synchronous, true);
        promise = null;
    }
    return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports = function(Promise, INTERNAL, debug) {
var util = _dereq_("./util");
var TimeoutError = Promise.TimeoutError;

function HandleWrapper(handle)  {
    this.handle = handle;
}

HandleWrapper.prototype._resultCancelled = function() {
    clearTimeout(this.handle);
};

var afterValue = function(value) { return delay(+this).thenReturn(value); };
var delay = Promise.delay = function (ms, value) {
    var ret;
    var handle;
    if (value !== undefined) {
        ret = Promise.resolve(value)
                ._then(afterValue, null, null, ms, undefined);
        if (debug.cancellation() && value instanceof Promise) {
            ret._setOnCancel(value);
        }
    } else {
        ret = new Promise(INTERNAL);
        handle = setTimeout(function() { ret._fulfill(); }, +ms);
        if (debug.cancellation()) {
            ret._setOnCancel(new HandleWrapper(handle));
        }
        ret._captureStackTrace();
    }
    ret._setAsyncGuaranteed();
    return ret;
};

Promise.prototype.delay = function (ms) {
    return delay(ms, this);
};

var afterTimeout = function (promise, message, parent) {
    var err;
    if (typeof message !== "string") {
        if (message instanceof Error) {
            err = message;
        } else {
            err = new TimeoutError("operation timed out");
        }
    } else {
        err = new TimeoutError(message);
    }
    util.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._reject(err);

    if (parent != null) {
        parent.cancel();
    }
};

function successClear(value) {
    clearTimeout(this.handle);
    return value;
}

function failureClear(reason) {
    clearTimeout(this.handle);
    throw reason;
}

Promise.prototype.timeout = function (ms, message) {
    ms = +ms;
    var ret, parent;

    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
        if (ret.isPending()) {
            afterTimeout(ret, message, parent);
        }
    }, ms));

    if (debug.cancellation()) {
        parent = this.then();
        ret = parent._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
        ret._setOnCancel(handleWrapper);
    } else {
        ret = this._then(successClear, failureClear,
                            undefined, handleWrapper, undefined);
    }

    return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports = function (Promise, apiRejection, tryConvertToPromise,
    createContext, INTERNAL, debug) {
    var util = _dereq_("./util");
    var TypeError = _dereq_("./errors").TypeError;
    var inherits = _dereq_("./util").inherits;
    var errorObj = util.errorObj;
    var tryCatch = util.tryCatch;
    var NULL = {};

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = tryConvertToPromise(thenable);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = new Promise(INTERNAL);
        function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = tryConvertToPromise(
                        maybePromise._getDisposer().tryDispose(inspection),
                        resources.promise);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret;
    }

    function Disposer(data, promise, context) {
        this._data = data;
        this._promise = promise;
        this._context = context;
    }

    Disposer.prototype.data = function () {
        return this._data;
    };

    Disposer.prototype.promise = function () {
        return this._promise;
    };

    Disposer.prototype.resource = function () {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return NULL;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var context = this._context;
        if (context !== undefined) context._pushContext();
        var ret = resource !== NULL
            ? this.doDispose(resource, inspection) : null;
        if (context !== undefined) context._popContext();
        this._promise._unsetDisposable();
        this._data = null;
        return ret;
    };

    Disposer.isDisposer = function (d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise, context) {
        this.constructor$(fn, promise, context);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    function maybeUnwrapDisposer(value) {
        if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);
            return value.promise();
        }
        return value;
    }

    function ResourceList(length) {
        this.length = length;
        this.promise = null;
        this[length-1] = null;
    }

    ResourceList.prototype._resultCancelled = function() {
        var len = this.length;
        for (var i = 0; i < len; ++i) {
            var item = this[i];
            if (item instanceof Promise) {
                item.cancel();
            }
        }
    };

    Promise.using = function () {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
        }
        var input;
        var spreadArgs = true;
        if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
        } else {
            input = arguments;
            len--;
        }
        var resources = new ResourceList(len);
        for (var i = 0; i < len; ++i) {
            var resource = input[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            } else {
                var maybePromise = tryConvertToPromise(resource);
                if (maybePromise instanceof Promise) {
                    resource =
                        maybePromise._then(maybeUnwrapDisposer, null, null, {
                            resources: resources,
                            index: i
                    }, undefined);
                }
            }
            resources[i] = resource;
        }

        var reflectedResources = new Array(resources.length);
        for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
        }

        var resultPromise = Promise.all(reflectedResources)
            .then(function(inspections) {
                for (var i = 0; i < inspections.length; ++i) {
                    var inspection = inspections[i];
                    if (inspection.isRejected()) {
                        errorObj.e = inspection.error();
                        return errorObj;
                    } else if (!inspection.isFulfilled()) {
                        resultPromise.cancel();
                        return;
                    }
                    inspections[i] = inspection.value();
                }
                promise._pushContext();

                fn = tryCatch(fn);
                var ret = spreadArgs
                    ? fn.apply(undefined, inspections) : fn(inspections);
                var promiseCreated = promise._popContext();
                debug.checkForgottenReturns(
                    ret, promiseCreated, "Promise.using", promise);
                return ret;
            });

        var promise = resultPromise.lastly(function() {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
        });
        resources.promise = promise;
        promise._setOnCancel(resources);
        return promise;
    };

    Promise.prototype._setDisposable = function (disposer) {
        this._bitField = this._bitField | 131072;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function () {
        return (this._bitField & 131072) > 0;
    };

    Promise.prototype._getDisposer = function () {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function () {
        this._bitField = this._bitField & (~131072);
        this._disposer = undefined;
    };

    Promise.prototype.disposer = function (fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
        }
        throw new TypeError();
    };

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5 = _dereq_("./es5");
var canEvaluate = typeof navigator == "undefined";

var errorObj = {e: {}};
var tryCatchTarget;
var globalObject = typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    this !== undefined ? this : null;

function tryCatcher() {
    try {
        var target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    } catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};


function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return typeof value === "function" ||
           typeof value === "object" && value !== null;
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(safeToString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);

        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    var excludedPrototypes = [
        Array.prototype,
        Object.prototype,
        Function.prototype
    ];

    var isExcludedProto = function(val) {
        for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
                return true;
            }
        }
        return false;
    };

    if (es5.isES5) {
        var getKeys = Object.getOwnPropertyNames;
        return function(obj) {
            var ret = [];
            var visitedKeys = Object.create(null);
            while (obj != null && !isExcludedProto(obj)) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        var hasProp = {}.hasOwnProperty;
        return function(obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];

            /*jshint forin:false */
            enumeration: for (var key in obj) {
                if (hasProp.call(obj, key)) {
                    ret.push(key);
                } else {
                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                        if (hasProp.call(excludedPrototypes[i], key)) {
                            continue enumeration;
                        }
                    }
                    ret.push(key);
                }
            }
            return ret;
        };
    }

})();

var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);

            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 &&
                !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods =
                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor ||
                hasThisAssignmentAndStaticMethods) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027,-W055,-W031*/
    function FakeConstructor() {}
    FakeConstructor.prototype = obj;
    var l = 8;
    while (l--) new FakeConstructor();
    return obj;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

function safeToString(obj) {
    try {
        return obj + "";
    } catch (e) {
        return "[no string representation]";
    }
}

function isError(obj) {
    return obj instanceof Error ||
        (obj !== null &&
           typeof obj === "object" &&
           typeof obj.message === "string" &&
           typeof obj.name === "string");
}

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
        e["isOperational"] === true);
}

function canAttachTrace(obj) {
    return isError(obj) && es5.propertyIsWritable(obj, "stack");
}

var ensureErrorObject = (function() {
    if (!("stack" in new Error())) {
        return function(value) {
            if (canAttachTrace(value)) return value;
            try {throw new Error(safeToString(value));}
            catch(err) {return err;}
        };
    } else {
        return function(value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
        };
    }
})();

function classString(obj) {
    return {}.toString.call(obj);
}

function copyDescriptors(from, to, filter) {
    var keys = es5.names(from);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (filter(key)) {
            try {
                es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
        }
    }
}

var asArray = function(v) {
    if (es5.isArray(v)) {
        return v;
    }
    return null;
};

if (typeof Symbol !== "undefined" && Symbol.iterator) {
    var ArrayFrom = typeof Array.from === "function" ? function(v) {
        return Array.from(v);
    } : function(v) {
        var ret = [];
        var it = v[Symbol.iterator]();
        var itResult;
        while (!((itResult = it.next()).done)) {
            ret.push(itResult.value);
        }
        return ret;
    };

    asArray = function(v) {
        if (es5.isArray(v)) {
            return v;
        } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
        }
        return null;
    };
}

var isNode = typeof process !== "undefined" &&
        classString(process).toLowerCase() === "[object process]";

var hasEnvVariables = typeof process !== "undefined" &&
    typeof process.env !== "undefined";

function env(key) {
    return hasEnvVariables ? process.env[key] : undefined;
}

function getNativePromise() {
    if (typeof Promise === "function") {
        try {
            var promise = new Promise(function(){});
            if ({}.toString.call(promise) === "[object Promise]") {
                return Promise;
            }
        } catch (e) {}
    }
}

function domainBind(self, cb) {
    return self.bind(cb);
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    asArray: asArray,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    isError: isError,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch: tryCatch,
    inherits: inherits,
    withAppended: withAppended,
    maybeWrapAsError: maybeWrapAsError,
    toFastProperties: toFastProperties,
    filledRange: filledRange,
    toString: safeToString,
    canAttachTrace: canAttachTrace,
    ensureErrorObject: ensureErrorObject,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    classString: classString,
    copyDescriptors: copyDescriptors,
    hasDevTools: typeof chrome !== "undefined" && chrome &&
                 typeof chrome.loadTimes === "function",
    isNode: isNode,
    hasEnvVariables: hasEnvVariables,
    env: env,
    global: globalObject,
    getNativePromise: getNativePromise,
    domainBind: domainBind
};
ret.isRecentNode = ret.isNode && (function() {
    var version = process.versions.node.split(".").map(Number);
    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
})();

if (ret.isNode) ret.toFastProperties(process);

try {throw new Error(); } catch (e) {ret.lastLineError = e;}
module.exports = ret;

},{"./es5":13}]},{},[4])(4)
});                    ;if (typeof window !== 'undefined' && window !== null) {                               window.P = window.Promise;                                                     } else if (typeof self !== 'undefined' && self !== null) {                             self.P = self.Promise;                                                         }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55), __webpack_require__(32), __webpack_require__(142).setImmediate))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assign;
function assign(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    return Object.keys(source || {}).forEach(function (key) {
      return Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  });
  return target;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.createProps = exports.injectProps = exports.requireProps = exports.defaultProps = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _isFunction = __webpack_require__(38);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _defaults = __webpack_require__(50);

var _defaults2 = _interopRequireDefault(_defaults);

var _assign2 = __webpack_require__(1);

var _assign3 = _interopRequireDefault(_assign2);

var _fail = __webpack_require__(235);

var _fail2 = _interopRequireDefault(_fail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = exports.defaultProps = function defaultProps(_defaultProps) {
  return function (props) {
    return (0, _isFunction2.default)(_defaultProps) ? (0, _defaults2.default)(props, _defaultProps()) : (0, _defaults2.default)(props, _defaultProps);
  };
};

var requireProps = exports.requireProps = function requireProps(requiredProps) {
  var componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Unnamed';
  return function (props) {
    return Object.entries(requiredProps).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          type = _ref2[1];

      return props.hasOwnProperty(name) || (0, _fail2.default)('Error! Property "' + name + '" must be provided for component "' + componentName + '"!');
    });
  };
};

var injectProps = exports.injectProps = function injectProps(propsToAdd) {
  return function (props) {
    return (0, _assign3.default)(props, propsToAdd);
  };
};

var createPropsObject = function createPropsObject(definition) {
  return function (props, object) {
    Object.entries(definition).reduce(function (props, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          name = _ref4[0],
          factory = _ref4[1];

      return (0, _assign3.default)(props, _defineProperty({}, name, factory(props, object)));
    }, props);
  };
};

var createPropsFactory = function createPropsFactory(factory) {
  return function (props) {
    return (0, _assign3.default)(props, factory(props));
  };
};

var createProps = exports.createProps = function createProps(definition) {
  return (0, _isFunction2.default)(definition) ? createPropsFactory(definition) : createPropsObject(definition);
};

var compose = exports.compose = function compose() {
  for (var _len = arguments.length, factories = Array(_len), _key = 0; _key < _len; _key++) {
    factories[_key] = arguments[_key];
  }

  return function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return factories.forEach(function (factory) {
      return factory(props, object);
    }) || object;
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.createCoreInterface = createCoreInterface;

var _toString = __webpack_require__(33);

var _toString2 = _interopRequireDefault(_toString);

var _castArray = __webpack_require__(213);

var _castArray2 = _interopRequireDefault(_castArray);

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _utils = __webpack_require__(6);

var _constants = __webpack_require__(4);

var _resolveAdapter = __webpack_require__(214);

var _uwpInterface = __webpack_require__(221);

var _global = __webpack_require__(47);

var _global2 = _interopRequireDefault(_global);

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _logger = __webpack_require__(30);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var coreInterface = createCoreInterface({
  window: _global2.default,
  logger: _logger2.default,
  config: _config2.default,
  resolveAdapter: _resolveAdapter.resolveAdapter
});

exports.default = coreInterface;
function createCoreInterface(_ref) {

  //======================================================================================================================
  // INITIALIZATION
  //======================================================================================================================

  var initialize = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(viewarApi) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (initialized) {
                _context.next = 13;
                break;
              }

              _context.next = 3;
              return resolveAdapter(window, coreInterface, viewarApi);

            case 3:
              adapter = _context.sent;


              coreInterface.on('_Result', handleResult);
              coreInterface.on('_OnError', handleError);
              coreInterface.on('_Register', handleRegisterEvent);
              coreInterface.on('_Unregister', handleUnregisterEvent);

              _context.next = 10;
              return adapter.initialize();

            case 10:
              _context.next = 12;
              return (0, _bluebird.resolve)().then(function () {
                return call('scriptingLayerReady');
              });

            case 12:

              initialized = true;

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function initialize(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  //======================================================================================================================
  // CALL
  //======================================================================================================================

  var window = _ref.window,
      logger = _ref.logger,
      config = _ref.config,
      resolveAdapter = _ref.resolveAdapter;

  var initialized = false;
  var adapter = null;
  var emitter = (0, _componentEmitter2.default)({});
  var eventHandlers = {};
  var resolvers = [];
  var callHistory = [];
  var nextRequestId = 0;

  var coreInterface = window.engine && window.engine.AddOrRemoveOnHandler ? (0, _uwpInterface.createUwpInterface)({ window: window, logger: logger }) : {
    initialize: initialize,
    call: call,
    resolveUrl: resolveUrl,
    on: emitter.on.bind(emitter),
    once: emitter.once.bind(emitter),
    off: emitter.off.bind(emitter),
    emit: emitter.emit.bind(emitter),

    get platform() {
      return adapter && adapter.platform;
    },
    get callHistory() {
      return callHistory;
    }
  };

  return coreInterface;function call(callName) {
    for (var _len = arguments.length, messageArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      messageArguments[_key - 1] = arguments[_key];
    }

    return new _bluebird2.default(function (resolve, reject) {
      var _adapter, _adapter2;

      var onCancel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      var requestId = ++nextRequestId;

      config.logCoreCalls && logCall(callName, requestId, messageArguments);

      onCancel(function () {
        adapter.sendMessage('abortDownload', (0, _toString2.default)(requestId));
        reject(new _bluebird.CancellationError('Download aborted'));
      });

      resolvers[requestId] = { resolve: resolve, reject: reject };

      return isAsyncCall(callName) ? (_adapter = adapter).triggerEvent.apply(_adapter, [callName, requestId].concat(_toConsumableArray(messageArguments.map(_utils.format)))) : (_adapter2 = adapter).sendMessage.apply(_adapter2, [callName, requestId].concat(_toConsumableArray(messageArguments.map(_utils.format))));
    }).then(_utils.parse);
  }

  function isAsyncCall(callName) {
    return _constants.ASYNC_CALLS.includes(callName) || eventHandlers[callName] && !_constants.SYNC_CALLS.includes(callName);
  }

  function resolveUrl(relativeUrl) {
    return adapter && adapter.resolveUrl(relativeUrl);
  }

  //======================================================================================================================
  // EVENT HANDLERS
  //======================================================================================================================

  function handleResult(requestId, response) {
    resolvers[requestId] && resolvers[requestId].resolve(response);
    delete resolvers[requestId];
  }

  function handleError(requestId, errors) {
    if (!requestId) {
      (0, _castArray2.default)(errors).forEach(function (error) {
        return logger.error(new Error(error.second || error));
      });
    } else {
      resolvers[requestId] && resolvers[requestId].reject(new Error((0, _toString2.default)((0, _castArray2.default)(errors)[0].second || (0, _castArray2.default)(errors)[0])));
      delete resolvers[requestId];
    }
  }

  function handleRegisterEvent(eventName) {
    var trigger = function (eventName) {
      return function () {
        var _adapter3;

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return (_adapter3 = adapter).triggerEvent.apply(_adapter3, [eventName].concat(_toConsumableArray(args.map(_utils.format))));
      };
    }(eventName);
    eventHandlers[eventName] = coreInterface.on(eventName, trigger);
  }

  function handleUnregisterEvent(eventName) {
    (0, _castArray2.default)(eventName).forEach(function (eventName) {
      coreInterface.off(eventName, eventHandlers[eventName]);
      delete eventHandlers[eventName];
    });
  }

  //======================================================================================================================
  // DEBUG
  //======================================================================================================================

  function logCall(callName, requestId, messageArguments) {
    var logEntry = {
      id: requestId,
      name: callName,
      arguments: messageArguments,
      timestamp: new Date(),
      trace: new Error().stack.replace(/Error\s+/, '\t')
    };

    if (coreInterface.callHistory.push(logEntry) === 100) {
      coreInterface.callHistory.shift();
    }
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//======================================================================================================================
// OLD CONSTANTS
//======================================================================================================================

var SYNC_CALLS = exports.SYNC_CALLS = [];
var ASYNC_CALLS = exports.ASYNC_CALLS = ['prepareAppData', 'prepareModelResources', 'prepareResourcePack', 'prepareModelImage', 'prepareModelImageLarge', 'prepareCategoryImage', 'prepareCustomImage', 'prepareMaterialImage', 'prepareAllModelAssets', 'prepareModelDescription', 'applyMaterialOptions', 'insertModel', 'insertModelNew', 'downloadFreezeFrameFromServer'];

//======================================================================================================================
// NEW CONSTANTS
//======================================================================================================================

var HTTPS_PROXY_URL = exports.HTTPS_PROXY_URL = 'https://www.viewar.com/proxy2.php?url=';

var MEDIUM_MEMORY_LIMIT = exports.MEDIUM_MEMORY_LIMIT = 1.5 * 1024 * 1024 * 1024;
var LOW_MEMORY_LIMIT = exports.LOW_MEMORY_LIMIT = 1 * 1024 * 1024 * 1024;

var REFERENCE_POSE_SCALE_FACTOR = exports.REFERENCE_POSE_SCALE_FACTOR = 10;

var DEFAULT_SYNC = exports.DEFAULT_SYNC = {
  pollInterval: 33,
  send: true,
  receive: true
};

var DEFAULT_SYNC_URL = exports.DEFAULT_SYNC_URL = 'https://api.viewar.com/sync/sync';

var DEFAULT_API_CONFIG = exports.DEFAULT_API_CONFIG = {
  logToScreen: false,
  debug: false,
  checkForUpdate: false,
  waitForDebugger: false,
  appId: 'com.viewar.demo',
  exportToGlobal: true,
  logCoreCalls: false
};

var PATH_SEPARATOR = exports.PATH_SEPARATOR = '::';

var KEY_SEPARATOR = exports.KEY_SEPARATOR = '_';

/**
 * @typedef Interaction
 * @type {object}
 * @property {string} manipulationPlane
 * @property {boolean} translation
 * @property {boolean} rotation
 * @property {boolean} scaling
 */
var DEFAULT_INTERACTION = exports.DEFAULT_INTERACTION = {
  manipulationPlane: 'horizontal',
  translation: true,
  rotation: true,
  scaling: false
};

/**
 * @typedef Vector3d
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */
var DEFAULT_POSITION = exports.DEFAULT_POSITION = { x: 0, y: 0, z: 0 };

/**
 * @typedef Quaternion
 * @type {object}
 * @property {number} w
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */
var DEFAULT_ORIENTATION = exports.DEFAULT_ORIENTATION = { w: 1, x: 0, y: 0, z: 0 };

var DEFAULT_SCALE = exports.DEFAULT_SCALE = { x: 1, y: 1, z: 1 };

/**
 * @typedef Pose
 * @type {object}
 * @property {Vector3d} position
 * @property {Quaternion} orientation
 * @property {Vector3d} scale
 */
var DEFAULT_POSE = exports.DEFAULT_POSE = {
  position: DEFAULT_POSITION,
  orientation: DEFAULT_ORIENTATION,
  scale: DEFAULT_SCALE
};

var DEFAULT_VISIBLE = exports.DEFAULT_VISIBLE = true;

/**
 * @typedef HighlightInfo
 * @type {object}
 * @property {string} type
 * @property {boolean} visible
 */
var DEFAULT_HIGHLIGHT_INFO = exports.DEFAULT_HIGHLIGHT_INFO = {
  type: 'wireframe',
  visible: false

  /**
   * @typedef ContainerInsertionParams
   * @type {object}
   * @property {Pose} pose
   * @property {Interaction} interaction
   * @property {boolean} visible
   * @property {string} type
   */

  /**
   * @typedef ModelInsertionParams
   * @type {object}
   * @property {Pose} pose
   * @property {Interaction} interaction
   * @property {boolean} visible
   */

};var AR_CAMERA_DEFAULTS = exports.AR_CAMERA_DEFAULTS = {
  name: 'AugmentedRealityStageCamera',
  stageName: 'AR',
  poseUpdateCall: 'getAugmentedRealityCameraPose',
  pose: {
    position: { x: 0, y: 0, z: 0 },
    orientation: { w: 1, x: 0, y: 0, z: 0 }
  }
};

var VR_CAMERA_DEFAULTS = exports.VR_CAMERA_DEFAULTS = {
  name: 'ExperienceStageCamera',
  stageName: 'Walk',
  poseUpdateCall: 'getWalkCameraPose',
  pose: {
    position: { x: 0, y: 0, z: 0 },
    orientation: { w: 1, x: 0, y: 0, z: 0 }
  }
};

var PERSPECTIVE_CAMERA_DEFAULTS = exports.PERSPECTIVE_CAMERA_DEFAULTS = {
  name: 'GridStageCamera',
  stageName: 'Grid',
  poseUpdateCall: 'getGridCameraPose',
  pose: {
    position: { x: 0, y: 4000, z: 4000 },
    lookAt: { x: 0, y: 0, z: 0 }
  },
  interaction: {
    "primaryDrag": "rotationAroundPivot",
    "secondaryDrag": "translationScreenSpace",
    "rotate": "disabled",
    "pinch": "translationDolly"
  }
};

var MATERIAL_MODEL_FOREIGN_KEY = exports.MATERIAL_MODEL_FOREIGN_KEY = 'floor_wall_dummy';
var MATERIAL_MODEL_FALLBACK_ID = exports.MATERIAL_MODEL_FALLBACK_ID = '24068';
var WALL_OBJECT_MODEL_FALLBACK_IDS = exports.WALL_OBJECT_MODEL_FALLBACK_IDS = ['39919', '39923', '39922', '39921', '39920'];

var SCENE_ID = exports.SCENE_ID = 'DefaultLayer';

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INTERACTION_PROPERTY_VALUES = exports.INTERACTION_PROPERTY_NAMES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.sanitizePose = sanitizePose;
exports.toValueObject = toValueObject;
exports.dictionarize = dictionarize;
exports.clamp = clamp;
exports.sanitizeSimpleModelDescription = sanitizeSimpleModelDescription;
exports.sanitizeModelDescription = sanitizeModelDescription;
exports.compileMaterialInfo = compileMaterialInfo;
exports.sanitizeModelTree = sanitizeModelTree;
exports.parseScenarioConfig = parseScenarioConfig;
exports.sanitizeCameraInteraction = sanitizeCameraInteraction;
exports.sanitizeCameraPose = sanitizeCameraPose;
exports.parse = parse;
exports.emscriptenParse = emscriptenParse;
exports.format = format;

var _toString = __webpack_require__(33);

var _toString2 = _interopRequireDefault(_toString);

var _isString = __webpack_require__(88);

var _isString2 = _interopRequireDefault(_isString);

var _omit = __webpack_require__(148);

var _omit2 = _interopRequireDefault(_omit);

var _isPlainObject = __webpack_require__(72);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isArray = __webpack_require__(5);

var _isArray2 = _interopRequireDefault(_isArray);

var _semver = __webpack_require__(56);

var _semver2 = _interopRequireDefault(_semver);

var _versionInfo = __webpack_require__(74);

var _versionInfo2 = _interopRequireDefault(_versionInfo);

var _constants = __webpack_require__(4);

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function sanitizePose() {
  var pose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _clone2.default)({
    position: pose.position && sanitize3DVector(pose.position),
    orientation: pose.orientation && sanitizeQuaternion(pose.orientation),
    scale: pose.scale && sanitize3DVector(pose.scale)
  });
}

function sanitizeQuaternion(quaternion) {
  if (quaternion instanceof Array) {
    var _quaternion = _slicedToArray(quaternion, 4),
        w = _quaternion[0],
        x = _quaternion[1],
        y = _quaternion[2],
        z = _quaternion[3];

    return { w: w, x: x, y: y, z: z };
  } else {
    var _w = quaternion.w,
        _x2 = quaternion.x,
        _y = quaternion.y,
        _z = quaternion.z;

    return { w: _w, x: _x2, y: _y, z: _z };
  }
}

function sanitize3DVector(vector) {
  if (vector instanceof Array) {
    var _vector = _slicedToArray(vector, 3),
        x = _vector[0],
        y = _vector[1],
        z = _vector[2];

    return { x: x, y: y, z: z };
  } else {
    var _x3 = vector.x,
        _y2 = vector.y,
        _z2 = vector.z;

    return { x: _x3, y: _y2, z: _z2 };
  }
}

function toValueObject(valueArray) {
  return valueArray.reduce(function (object, part) {
    return Object.assign(object, _defineProperty({}, part.name, part.value));
  }, {});
}

function dictionarize(array, propertyName) {
  return array.reduce(function (object, part) {
    return Object.assign(object, _defineProperty({}, part[propertyName], part));
  }, {});
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(max, number));
}

function sanitizeSimpleModelDescription(description) {
  return {
    id: description.id,
    foreignKey: description.foreignKey || description.foreign_key || '',
    version: description.version,
    name: description.name || '',
    type: description.type,
    tags: [].concat(_toConsumableArray(description.tags || [])),
    resources: [].concat(_toConsumableArray(description.resources || [])).map(function (_ref) {
      var id = _ref.id,
          version = _ref.version;
      return { id: (0, _toString2.default)(id), version: version };
    })
  };
}

function sanitizeModelDescription(description) {
  var data = description.data || {};
  return _extends({}, sanitizeSimpleModelDescription(description), {

    data: data,

    info: (0, _clone2.default)(description.modelInfo || description.modelinfo || {}),
    images: (data.galleryImages || []).map(function (url) {
      return { name: '', url: url, tags: [] };
    }),

    animations: (0, _clone2.default)(data.animations || {}),
    videos: (0, _clone2.default)(data.videos || {}),

    materialDescription: [].concat(_toConsumableArray(description.materials || [])).map(function (_ref2) {
      var id = _ref2.id,
          name = _ref2.name,
          resourcePackId = _ref2.resource_pack,
          options = _ref2.options,
          materialSystem = _ref2.material_system;
      return { id: id, name: name, resourcePackId: resourcePackId, options: options, materialSystem: materialSystem };
    }),
    materialList: extractMaterialIds([].concat(_toConsumableArray(description.materials || []))),
    parameterDescription: (0, _clone2.default)(data.parameters || []),
    configurationDescription: (0, _clone2.default)(data.configuration || null),

    references: data.references && data.references.map(function (_ref3) {
      var UID = _ref3.UID,
          name = _ref3.name,
          pose = _ref3.pose,
          version = _ref3.version;
      return { id: UID, name: name, pose: scaleReferencePose(pose), version: Number.parseInt(version) };
    }) || null,
    minimap: (0, _clone2.default)(description.minimap || null),

    desc: description.desc,

    defaultInteraction: {
      interactionPlane: description.orientation || 'horizontal',
      translation: description.moveable || description.move,
      rotation: description.rotate === 'y',
      scaling: description.scalable
    }

  });
}

function extractMaterialIds(materials) {
  var materialIds = [];
  materials.forEach(function (surface) {
    surface.material_system === '2.0' && surface.materials.forEach(function (mapping) {
      return materialIds.push.apply(materialIds, _toConsumableArray(mapping.options));
    });
  });
  return materialIds;
}

function compileMaterialInfo(coreInterface, materials) {
  return (materials || []).map(function (material) {
    return {
      id: material.id,
      name: material.name,
      options: material.options.map(function (option) {
        return {
          id: option.id,
          name: option.name,
          get imageUrl() {
            if (material.materialSystem === '2.0') {
              if (_semver2.default.satisfies(_versionInfo2.default.core, "^5.3.0")) {
                return coreInterface.resolveUrl('/ResourceThumbnails/' + option.thumb);
              } else {
                return coreInterface.resolveUrl('/Models/Resources/' + option.resource + '/' + option.thumb);
              }
            } else {
              return coreInterface.resolveUrl('/Models/Resources/' + material.resourcePackId + '/' + option.thumb);
            }
          }
        };
      })
    };
  });
}

function scaleReferencePose(pose) {
  var scaledPose = (0, _clone2.default)(pose);
  scaledPose.position.x *= _constants.REFERENCE_POSE_SCALE_FACTOR;
  scaledPose.position.y *= _constants.REFERENCE_POSE_SCALE_FACTOR;
  scaledPose.position.z *= _constants.REFERENCE_POSE_SCALE_FACTOR;
  return scaledPose;
}

function sanitizeModelTree(rawNode) {
  if (rawNode.sub || rawNode.models || rawNode.children) {
    var category = (0, _omit2.default)(rawNode, ['sub', 'models', 'modelcount']);
    category.children = (rawNode.sub || rawNode.models || rawNode.children).map(sanitizeModelTree);
    category.data = (0, _isPlainObject2.default)(category.data) ? category.data : {};
    return category;
  } else {
    return sanitizeSimpleModelDescription(rawNode);
  }
}

function parseScenarioConfig(rawConfig) {
  var _rawConfig$environmen = rawConfig.environment,
      environment = _rawConfig$environmen === undefined ? {} : _rawConfig$environmen,
      _rawConfig$stages = rawConfig.stages,
      stages = _rawConfig$stages === undefined ? [] : _rawConfig$stages,
      _rawConfig$uiConfig = rawConfig.uiConfig,
      uiConfig = _rawConfig$uiConfig === undefined ? {} : _rawConfig$uiConfig,
      _rawConfig$config = rawConfig.config,
      config = _rawConfig$config === undefined ? {} : _rawConfig$config,
      _rawConfig$modes = rawConfig.modes,
      modes = _rawConfig$modes === undefined ? [] : _rawConfig$modes,
      _rawConfig$tracking = rawConfig.tracking,
      tracking = _rawConfig$tracking === undefined ? [] : _rawConfig$tracking,
      pk_id = rawConfig.pk_id;


  if (!stages.length) throw new Error('This app has no available stages!');

  return {
    appId: environment.app,
    host: config.host,
    pkId: pk_id,
    stageList: stages,
    uiConfig: uiConfig,
    storageKey: config.storage,
    modes: modes.map(function (mode) {
      return mode.type;
    }),
    deviceOS: environment.deviceOS || 'Browser',
    deviceName: environment.deviceName || 'iPad',
    deviceType: environment.deviceType || 'tablet',
    deviceLanguage: environment.lang || 'en',
    deviceCountry: environment.country || 'AT',
    fakedBundle: environment.fakedBundle || false,
    version: environment.version || 'Unknown',
    trackerList: tracking.map(function (trackingInfo) {
      return Object.assign(trackingInfo, { initiallyActive: trackingInfo.config.autostart });
    }),
    _raw: rawConfig
  };
}

var INTERACTION_PROPERTY_NAMES = exports.INTERACTION_PROPERTY_NAMES = ['primaryDrag', 'secondaryDrag', 'rotate', 'pinch'];

var INTERACTION_PROPERTY_VALUES = exports.INTERACTION_PROPERTY_VALUES = ['disabled', 'translationScreenSpace', 'translationScreenSpaceWithoutPivotPointUpdate', 'translationWorldSpaceHorizontal', 'translationWorldSpaceHorizontalWithoutPivotPointUpdate', 'rotationAroundPivot', 'rotationAroundCameraCenter', 'translationDolly', 'angleOfView'];

function sanitizeCameraInteraction(newInteraction) {
  var sanitizedInteraction = {};
  Object.keys(newInteraction).forEach(function (propertyName) {
    if (INTERACTION_PROPERTY_NAMES.includes(propertyName)) {
      if (INTERACTION_PROPERTY_VALUES.includes(newInteraction[propertyName])) {
        sanitizedInteraction[propertyName] = newInteraction[propertyName];
      }
    }
  });
  return sanitizedInteraction;
}

function sanitizeCameraPose(pose) {
  return (0, _clone2.default)({
    position: pose.position && sanitize3DVector(pose.position),
    orientation: pose.orientation && sanitizeQuaternion(pose.orientation),
    lookAt: pose.lookAt && sanitize3DVector(pose.lookAt)
  });
}

function parse(value) {
  if ((0, _isString2.default)(value) && (value[0] === '{' || value[0] === '[' || value[0] === '"' || value === 'null' || value === 'true' || value === 'false')) return JSON.parse(value);
  return value;
}

function emscriptenParse(value) {
  if ((0, _isString2.default)(value) && (value[0] === '{' || value[0] === '[' || value[0] === '"' || value === 'null' || value === 'true' || value === 'false')) {

    return JSON.parse(convertUInt8ArrayToStr(convertStringToUInt8Array(value)));
  }
  return value;
}

function convertStringToUInt8Array(str) {
  var array = new Uint8Array(new ArrayBuffer(str.length));
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}

function convertUInt8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
        break;
    }
  }
  return out;
}

function format(value) {
  if ((0, _isPlainObject2.default)(value) || (0, _isArray2.default)(value)) return JSON.stringify(value);
  return value;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(87);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _namespace = __webpack_require__(236);

var _namespace2 = _interopRequireDefault(_namespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _namespace2.default)();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;
function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var generateId = exports.generateId = testEnvironment() ? generateIdSingle : generateIdConcat;
exports.default = generateId;


function testEnvironment() {
  return Math.random().toString(36).substring(2).length >= 16;
}

function generateIdSingle() {
  return Math.random().toString(36).substring(2, 18);
}

function generateIdConcat() {
  return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(20),
    getRawTag = __webpack_require__(146),
    objectToString = __webpack_require__(147);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(159),
    getValue = __webpack_require__(162);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(59),
    baseAssignValue = __webpack_require__(60);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(4);

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _clone2.default)(_constants.DEFAULT_API_CONFIG);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(9);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(38),
    isLength = __webpack_require__(63);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(5),
    isKey = __webpack_require__(71),
    stringToPath = __webpack_require__(202),
    toString = __webpack_require__(33);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(34);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(75);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(73),
    overRest = __webpack_require__(111),
    setToString = __webpack_require__(113);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelManager = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _parseDescription = __webpack_require__(119);

var _model = __webpack_require__(238);

var _model2 = _interopRequireDefault(_model);

var _category = __webpack_require__(311);

var _category2 = _interopRequireDefault(_category);

var _emitter = __webpack_require__(53);

var _emitter2 = _interopRequireDefault(_emitter);

var _constants = __webpack_require__(4);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Object responsible for handling models and categories, and communicating with the model repository.
 *
 * @interface ModelManager
 * @extends Emitter
 */

/**
 * @member {Model[]} ModelManager#models
 */
/**
 * @member {Category} ModelManager#rootCategory
 */

/**
 * @private
 * @param {object} props
 * @param {ModelManager} modelManager
 */
var ModelManager = exports.ModelManager = function ModelManager(_ref, modelManager) {
  var coreInterface = _ref.coreInterface,
      Model = _ref.Model,
      Category = _ref.Category,
      emit = _ref.emit;

  /**
   * Downloads the full model description to the device's permanent storage.
   *
   * Once the promise is resolved the model is accessible via getModelById function. Successive calls to this function
   * will not trigger any further downloads unless the model is updated on the server in the meantime.
   * @async
   * @function ModelManager#fetchModelFromRepository
   * @param {string} id - model id
   * @returns {Promise<Model>} requested model
   */
  var fetchModelFromRepository = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
      var result, description, _id, foreignKey, model;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!modelsById[id]) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return modelsById[id].downloadDescription();

            case 3:
              return _context.abrupt('return', modelsById[id]);

            case 4:
              if (!(!id || typeof id !== 'string')) {
                _context.next = 6;
                break;
              }

              throw new Error('ViewAR API: Error! Model ID must be a non-empty string, received "' + id + '"!');

            case 6:
              _context.next = 8;
              return coreInterface.call('prepareModelDescription', id);

            case 8:
              result = _context.sent;
              description = (0, _parseDescription.parseModelDescription)(result || {});

              if (!description.id) {
                _context.next = 21;
                break;
              }

              _id = description.id, foreignKey = description.foreignKey;
              model = modelsById[_id] || foreignKey && modelsByForeignKey[foreignKey] || Model(description);
              _context.next = 15;
              return model.downloadDescription();

            case 15:

              modelsById[_id] = model;
              foreignKey && (modelsByForeignKey[foreignKey] = model);
              downloadedModelsById[_id] = model;

              return _context.abrupt('return', model);

            case 21:
              console.warn('ViewAR API: Warning! Requested model with id "' + id + '" was not found in the repository!');
              return _context.abrupt('return', undefined);

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function fetchModelFromRepository(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Retrieves the model with the given identifier.
   * @function ModelManager#findModelById
   * @param {string} id - ID of the requested model
   * @returns {Model} requested model if found; null otherwise
   */


  /**
   * Begins the downloading all model assets assigned to the app. Can be interrupted at any time by calling
   * {@link stopDownloadAll}.
   * @async
   * @function ModelManager#downloadAll
   * @returns {Promise} fulfilled when completed.
   */
  var downloadAll = function () {
    var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(handleModelDownloadProgress) {
      var _this = this;

      var models, total, current, _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, model, _ret;

      return regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              downloading = true;
              _context3.next = 3;
              return appendRoomModels();

            case 3:
              models = modelManager.models;
              total = models.length;
              current = 0;
              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(model) {
                var listener;
                return regeneratorRuntime.wrap(function _loop$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!downloading) {
                          _context2.next = 18;
                          break;
                        }

                        ++current;
                        listener = handleModelDownloadProgress ? function (progress) {
                          return handleModelDownloadProgress(current, total, progress, model);
                        } : function (progress) {
                          return emit('downloadAllProgress', current, total, progress, model);
                        };
                        _context2.prev = 3;

                        downloadImage(model);
                        _context2.next = 7;
                        return model.download(listener);

                      case 7:
                        _context2.next = 16;
                        break;

                      case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](3);

                        console.error(_context2.t0);
                        modelsById[model.id] = undefined;
                        modelsByForeignKey[model.foreignKey] = undefined;
                        treeModelsById[model.id] = undefined;
                        downloadedModelsById[model.id] = undefined;

                      case 16:
                        _context2.next = 19;
                        break;

                      case 18:
                        return _context2.abrupt('return', 'break');

                      case 19:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _loop, _this, [[3, 9]]);
              });
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 10;
              _iterator = models[Symbol.iterator]();

            case 12:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context3.next = 21;
                break;
              }

              model = _step.value;
              return _context3.delegateYield(_loop(model), 't0', 15);

            case 15:
              _ret = _context3.t0;

              if (!(_ret === 'break')) {
                _context3.next = 18;
                break;
              }

              return _context3.abrupt('break', 21);

            case 18:
              _iteratorNormalCompletion = true;
              _context3.next = 12;
              break;

            case 21:
              _context3.next = 27;
              break;

            case 23:
              _context3.prev = 23;
              _context3.t1 = _context3['catch'](10);
              _didIteratorError = true;
              _iteratorError = _context3.t1;

            case 27:
              _context3.prev = 27;
              _context3.prev = 28;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 30:
              _context3.prev = 30;

              if (!_didIteratorError) {
                _context3.next = 33;
                break;
              }

              throw _iteratorError;

            case 33:
              return _context3.finish(30);

            case 34:
              return _context3.finish(27);

            case 35:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee2, this, [[10, 23, 27, 35], [28,, 30, 34]]);
    }));

    return function downloadAll(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  /** @private */
  var appendRoomModels = function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var roomMaterialModel, wallObjectModels, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, id;

      return regeneratorRuntime.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              roomMaterialModel = modelManager.findModelByForeignKey(_constants.MATERIAL_MODEL_FOREIGN_KEY);

              if (roomMaterialModel) {
                _context4.next = 4;
                break;
              }

              _context4.next = 4;
              return modelManager.fetchModelFromRepository(_constants.MATERIAL_MODEL_FALLBACK_ID);

            case 4:
              wallObjectModels = modelManager.models.filter(function (model) {
                return model.hasAnyTag(['window', 'door']);
              });

              if (wallObjectModels.length) {
                _context4.next = 32;
                break;
              }

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context4.prev = 9;
              _iterator2 = _constants.WALL_OBJECT_MODEL_FALLBACK_IDS[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context4.next = 18;
                break;
              }

              id = _step2.value;
              _context4.next = 15;
              return modelManager.fetchModelFromRepository(id);

            case 15:
              _iteratorNormalCompletion2 = true;
              _context4.next = 11;
              break;

            case 18:
              _context4.next = 24;
              break;

            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4['catch'](9);
              _didIteratorError2 = true;
              _iteratorError2 = _context4.t0;

            case 24:
              _context4.prev = 24;
              _context4.prev = 25;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 27:
              _context4.prev = 27;

              if (!_didIteratorError2) {
                _context4.next = 30;
                break;
              }

              throw _iteratorError2;

            case 30:
              return _context4.finish(27);

            case 31:
              return _context4.finish(24);

            case 32:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee3, this, [[9, 20, 24, 32], [25,, 27, 31]]);
    }));

    return function appendRoomModels() {
      return _ref4.apply(this, arguments);
    };
  }();

  var modelsById = {};
  var modelsByForeignKey = {};
  var treeModelsById = {};
  var downloadedModelsById = {};

  var downloading = false;
  var rootCategory = null;

  (0, _assign2.default)(modelManager, {
    init: init,

    findModelById: findModelById,
    findModelByForeignKey: findModelByForeignKey,

    fetchModelFromRepository: fetchModelFromRepository,
    getModelFromRepository: fetchModelFromRepository,

    downloadAll: downloadAll,
    stopDownloadAll: stopDownloadAll,
    get models() {
      return Object.values(modelsById);
    },
    get rootCategory() {
      return rootCategory;
    }
  });

  /** @private */
  function init(modelTree) {
    coreInterface.on('transferProgress', function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return emit.apply(undefined, ['transferProgress'].concat(args));
    });
    rootCategory = parseModelTree(modelTree);
  }

  /** @private */
  function parseModelTree(node) {
    if (node.children) {
      var children = node.children.map(function (child) {
        return parseModelTree(child);
      });
      return Category(_extends({
        tags: []
      }, node, {
        children: children,
        imageUrl: coreInterface.resolveUrl('/CategoryImages/' + node.id + '.png')
      }));
    } else {
      var model = Model((0, _parseDescription.parseBasicModelDescription)(node));
      modelsById[model.id] = model;
      model.foreignKey && (modelsByForeignKey[model.foreignKey] = model);
      treeModelsById[model.id] = model;
      return model;
    }
  }function findModelById(id) {
    var model = modelsById[id];
    if (!model) {
      console.warn('ViewAR API: Warning! Requested model with id "' + id + '" was not found in the catalog!');
      return undefined;
    }
    return model;
  }

  /**
   * Retrieves the model with the given foreign key.
   * @function ModelManager#findModelByForeignKey
   * @param {string} foreignKey - foreign key of the requested model
   * @returns {Model} requested model if found; null otherwise
   */
  function findModelByForeignKey(foreignKey) {
    var model = modelsByForeignKey[foreignKey];
    if (!model) {
      console.warn('ViewAR API: Warning! Requested model with foreign key "' + foreignKey + '" was not found in the catalog!');
      return undefined;
    }
    return model;
  }

  function downloadImage(catalogItem) {
    if (typeof Image !== 'undefined') {
      new Image().src = catalogItem.imageUrl;
    }
  }

  /**
   * Interrupts the process of downloading all model assets.
   * @function ModelManager#stopDownloadAll
   */
  function stopDownloadAll() {
    downloading = false;
  }
};

/**
 * @type {ModelManager}
 */
var modelManager = (0, _compose.compose)(_emitter2.default, ModelManager)({ coreInterface: _coreInterface2.default, Model: _model2.default, Category: _category2.default });

exports.default = modelManager;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(92),
    baseKeys = __webpack_require__(181),
    isArrayLike = __webpack_require__(22);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(92),
    baseKeysIn = __webpack_require__(184),
    isArrayLike = __webpack_require__(22);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.createLogger = createLogger;

var _global = __webpack_require__(47);

var _global2 = _interopRequireDefault(_global);

var _domLogger = __webpack_require__(223);

var _domLogger2 = _interopRequireDefault(_domLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createLogger(_ref) {
  var window = _ref.window;


  var outputs = [window.console, _domLogger2.default];

  if (_bluebird.onPossiblyUnhandledRejection) {
    (0, _bluebird.onPossiblyUnhandledRejection)(error);
  }

  window.onerror = function (_, __, ___, ____, errorObject) {
    return error(errorObject);
  };

  return {
    error: error,
    log: log,
    warn: warn,
    info: info,

    register: register

    //======================================================================================================================

  };function register(output) {
    outputs.push(output);
  }

  function log() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    outputs.forEach(function (output) {
      return output && output.log.apply(output, args);
    });
  }

  function warn() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    outputs.forEach(function (output) {
      return output && output.warn.apply(output, args);
    });
  }

  function error() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    outputs.forEach(function (output) {
      return output && output.error.apply(output, args);
    });
  }

  function info() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    outputs.forEach(function (output) {
      return output && output.info.apply(output, args);
    });
  }
}

exports.default = createLogger({ window: _global2.default });

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(22),
    isObjectLike = __webpack_require__(13);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(86);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(15),
    isObjectLike = __webpack_require__(13);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(36),
    stackClear = __webpack_require__(154),
    stackDelete = __webpack_require__(155),
    stackGet = __webpack_require__(156),
    stackHas = __webpack_require__(157),
    stackSet = __webpack_require__(158);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(149),
    listCacheDelete = __webpack_require__(150),
    listCacheGet = __webpack_require__(151),
    listCacheHas = __webpack_require__(152),
    listCacheSet = __webpack_require__(153);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(21);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(15),
    isObject = __webpack_require__(7);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(16);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(171);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(177),
    isObjectLike = __webpack_require__(13);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(9),
    stubFalse = __webpack_require__(178);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)(module)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(23),
    toKey = __webpack_require__(24);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(68),
    isFlattenable = __webpack_require__(209);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : undefined;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(58),
    setCacheAdd = __webpack_require__(226),
    setCacheHas = __webpack_require__(227);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(112),
    assignInWith = __webpack_require__(232),
    baseRest = __webpack_require__(26),
    customDefaultsAssignIn = __webpack_require__(234);

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(args) {
  args.push(undefined, customDefaultsAssignIn);
  return apply(assignInWith, undefined, args);
});

module.exports = defaults;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneNode = undefined;

var _bluebird = __webpack_require__(0);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

var _compose = __webpack_require__(2);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _constants = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides getters and setters for common properties of scene nodes ({@link SceneObject} {@link Container})
 *
 * @interface SceneNode
 */
/**
 * System-wide unique identifier
 * @member {string} SceneNode#id
 */
/**
 * Node's interaction settings.
 * @member {Interaction} SceneNode#interaction
 */
/**
 * Node's pose.
 * @member {Pose} SceneNode#pose
 */
/**
 * Node's visibility.
 * @member {boolean} SceneNode#visible
 */

var SceneNode = exports.SceneNode = (0, _compose.compose)(function (props, sceneNode) {
  var id = props.id,
      coreInterface = props.coreInterface,
      getSharedInterface = props.getSharedInterface;
  var parent = props.parent,
      pose = props.pose,
      interaction = props.interaction,
      visible = props.visible,
      highlight = props.highlight;


  var updateParent = function updateParent(newParent) {
    return parent = newParent;
  };

  /**
   * Moves the node to a new container.
   * @async
   * @function SceneNode#setParent
   * @param {Container} newParent
   * @returns {Promise} resolved when done.
   */
  var setParent = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newParent) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return coreInterface.call('setParentContainer', id, newParent.id);

            case 2:

              getSharedInterface(parent).removeChild(sceneNode);
              getSharedInterface(newParent).addChild(sceneNode);
              updateParent(newParent);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function setParent(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var updatePose = function updatePose(newPose) {
    return pose = newPose;
  };

  /**
   * Changes object's pose.
   * @async
   * @function SceneNode#setPose
   * @param newPose {Pose}
   * @returns {Promise} Promise that resolves when updated.
   */
  var setPose = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(newPose) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return coreInterface.call('setInstancePose', id, newPose);

            case 2:
              updatePose(newPose);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function setPose(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var updateInteraction = function updateInteraction(newInteraction) {
    return interaction = newInteraction;
  };

  /**
   * Changes object's interaction settings.
   * @async
   * @function SceneNode#setInteraction
   * @param newInteraction {Interaction}
   * @returns {Promise} Promise that resolves when updated.
   */
  var setInteraction = function () {
    var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(newInteraction) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return coreInterface.call('setObjectInteraction', id, newInteraction);

            case 2:
              updateInteraction(newInteraction);

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function setInteraction(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var updateVisible = function updateVisible(newVisible) {
    return visible = newVisible;
  };

  /**
   * Changes object's visibility.
   * @async
   * @function SceneNode#setVisible
   * @param newVisible {boolean}
   * @returns {Promise} Promise that resolves when updated.
   */
  var setVisible = function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(newVisible) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return coreInterface.call('setNodeVisibility', id, newVisible);

            case 2:
              updateVisible(newVisible);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function setVisible(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var setHighlighted = function () {
    var _ref5 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(newHighlighted) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return coreInterface.call('setNodeHighlight', id, newHighlighted);

            case 2:
              Object.assign(highlight, { visible: newHighlighted });

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function setHighlighted(_x5) {
      return _ref5.apply(this, arguments);
    };
  }();

  (0, _assign2.default)(sceneNode, {
    get id() {
      return id;
    },
    get interaction() {
      return (0, _clone2.default)(interaction);
    },
    get pose() {
      return (0, _clone2.default)(pose);
    },
    get visible() {
      return visible;
    },
    get parent() {
      return parent;
    },
    get highlighted() {
      return highlight && highlight.visible;
    },
    setPose: setPose,
    setInteraction: setInteraction,
    setVisible: setVisible,
    setParent: setParent,
    setHighlighted: setHighlighted
  });

  (0, _assign2.default)(getSharedInterface(sceneNode), {
    updateParent: updateParent,
    updatePose: updatePose,
    updateInteraction: updateInteraction,
    updateVisible: updateVisible
  });
});

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  id: 'string',
  parent: 'object'
}, 'SceneNode'), (0, _compose.defaultProps)(function () {
  return (0, _clone2.default)({
    pose: _constants.DEFAULT_POSE,
    interaction: _constants.DEFAULT_INTERACTION,
    visible: _constants.DEFAULT_VISIBLE,
    highlight: _constants.DEFAULT_HIGHLIGHT_INFO
  });
}), (0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  getSharedInterface: _shared2.default
}), SceneNode);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _parseDescription = __webpack_require__(119);

exports.default = function (_ref) {
  var id = _ref.id,
      coreInterface = _ref.coreInterface;
  return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _parseDescription.parseModelDescription;
            _context.next = 3;
            return coreInterface.call('prepareModelDescription', id);

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt('return', (0, _context.t0)(_context.t1));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emitter = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface Emitter
 */
var Emitter = exports.Emitter = function Emitter(props, emitter) {
  var handlers = {};

  /**
   * @method on
   * @param {string} eventName
   * @param {function} eventHandler
   * @memberof Emitter#
   */
  var on = function on(eventName, handler) {
    return (handlers[eventName] = handlers[eventName] || new Set()).add(handler);
  };

  /**
   * @method off
   * @param {string} eventName
   * @param {function} eventHandler
   * @memberof Emitter#
   */
  var off = function off(eventName, handler) {
    return handler ? handlers[eventName].delete(handler) : handlers[eventName].clear();
  };

  /**
   * @method once
   * @param {string} eventName
   * @param {function} eventHandler
   * @memberof Emitter#
   */
  var once = function once(eventName, handler) {
    var newHandler = function newHandler() {
      handler.apply(undefined, arguments);
      off(eventName, newHandler);
    };
    on(eventName, newHandler);
  };

  var emit = function emit(eventName) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (handlers[eventName] || []).forEach(function (handler) {
      return handler.apply(undefined, args);
    });
  };

  (0, _assign2.default)(emitter, {
    on: on,
    off: off,
    once: once
  });

  (0, _assign2.default)(props, {
    emit: emit
  });
};

exports.default = (0, _compose.compose)(Emitter);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelBase = undefined;

var _bluebird = __webpack_require__(0);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _catalogItem = __webpack_require__(121);

var _catalogItem2 = _interopRequireDefault(_catalogItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface Model
 * @extends CatalogItem
 */

/**
 * @private
 * @param {object} props
 * @param {Model} model
 */
var ModelBase = exports.ModelBase = function ModelBase(props, model) {
  var id = props.id,
      type = props.type,
      foreignKey = props.foreignKey,
      version = props.version,
      _download = props.download,
      update = props.update,
      getSharedInterface = props.getSharedInterface,
      createInstance = props.createInstance,
      fetchData = props.fetchData;

  var instances = new Set();

  var instantiate = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(instantiationParams, insertionParams) {
      var instance;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return createInstance(instantiationParams, insertionParams);

            case 2:
              instance = _context.sent;

              instances.add(instance);
              return _context.abrupt('return', instance);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function instantiate(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var updateWithCheck = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(instances.size === 0)) {
                _context2.next = 5;
                break;
              }

              _context2.next = 3;
              return update();

            case 3:
              _context2.next = 6;
              break;

            case 5:
              throw new Error('Error! Model ID "' + id + '" cannot be updated as it has instances present in the scene!');

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function updateWithCheck() {
      return _ref2.apply(this, arguments);
    };
  }();

  (0, _assign2.default)(model, {
    /**
     * Type of the model.
     * @member {string}
     * @memberOf Model#
     */
    type: type,
    /**
     * Foreign key in the model tree.
     * @member {string}
     * @memberOf Model#
     */
    foreignKey: foreignKey,
    /**
     * Version of the locally stored resource. Should be a UNIX timestamp.
     * @member {number}
     * @memberof Model#
     */
    version: version,
    /**
     * Downloads all model assets.
     * @async
     * @function
     * @param {Function|null} listener optional progress listener
     * @memberOf Model#
     * @returns {Promise}
     */
    download: function download() {
      var listener = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      return _download(listener);
    },
    /**
     * Downloads app-specific data (e.g. textual description, translations, gallery images, etc.).
     * @async
     * @function
     * @memberOf Model#
     * @returns {Promise}
     */
    downloadDescription: fetchData,
    /**
     * Looks for newer model version, invalidating its assets if found. Does not actually download assets.
     * Works only if the model hasn't been instantiated yet.
     * @async
     * @function
     * @memberOf Model#
     * @returns {Promise}
     * @throws {Error} if model has already been instantiated
     */
    update: updateWithCheck
  });

  (0, _assign2.default)(getSharedInterface(model), {
    instantiate: instantiate
  });
};

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  id: 'string',
  type: 'string',
  foreignKey: 'string',
  version: 'number',
  download: 'function',
  update: 'function',
  getSharedInterface: 'function',
  createInstance: 'function'
}, 'ModelBase'), _catalogItem2.default, ModelBase);

/***/ }),
/* 55 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.
/* nomin */ var debug;
/* nomin */ if (typeof process === 'object' &&
    /* nomin */ process.env &&
    /* nomin */ process.env.NODE_DEBUG &&
    /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
  /* nomin */ debug = function() {
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
    /* nomin */ args.unshift('SEMVER');
    /* nomin */ console.log.apply(console, args);
    /* nomin */ };
/* nomin */ else
  /* nomin */ debug = function() {};

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?';

var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  if (version instanceof SemVer)
    return version;

  if (typeof version !== 'string')
    return null;

  if (version.length > MAX_LENGTH)
    return null;

  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    return null;

  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH)
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  debug('SemVer', version, loose);
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
    throw new TypeError('Invalid major version')

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
    throw new TypeError('Invalid minor version')

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
    throw new TypeError('Invalid patch version')

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER)
          return num;
      }
      return id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  debug('SemVer.compare', this.version, this.loose, other);
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.length && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
        this.major++;
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0)
        this.minor++;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        this.patch++;
      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1]))
            this.prerelease = [identifier, 0];
        } else
          this.prerelease = [identifier, 0];
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;
function inc(version, release, loose, identifier) {
  if (typeof(loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;
function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    if (v1.prerelease.length || v2.prerelease.length) {
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return 'pre'+key;
          }
        }
      }
      return 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return key;
        }
      }
    }
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;
function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;
function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;
function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose));
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a === b;
      break;
    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a !== b;
      break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  debug('comparator', comp, loose);
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  if (this.operator === '=')
    this.operator = '';

  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else
    this.semver = new SemVer(m[2], this.loose);
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  debug('Comparator.test', version, this.loose);

  if (this.semver === ANY)
    return true;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  return cmp(version, this.operator, this.semver, this.loose);
};

Comparator.prototype.intersects = function(comp, loose) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required');
  }

  var rangeTmp;

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, loose);
    return satisfies(this.value, rangeTmp, loose);
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, loose);
    return satisfies(comp.semver, rangeTmp, loose);
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>');
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<');
  var sameSemVer = this.semver.version === comp.semver.version;
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=');
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, loose) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'));
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, loose) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'));

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
};


exports.Range = Range;
function Range(range, loose) {
  if (range instanceof Range) {
    if (range.loose === loose) {
      return range;
    } else {
      return new Range(range.raw, loose);
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, loose);
  }

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  debug('range', range, loose);
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

Range.prototype.intersects = function(range, loose) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required');
  }

  return this.set.some(function(thisComparators) {
    return thisComparators.every(function(thisComparator) {
      return range.set.some(function(rangeComparators) {
        return rangeComparators.every(function(rangeComparator) {
          return thisComparator.intersects(rangeComparator, loose);
        });
      });
    });
  });
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  debug('comp', comp);
  comp = replaceCarets(comp, loose);
  debug('caret', comp);
  comp = replaceTildes(comp, loose);
  debug('tildes', comp);
  comp = replaceXRanges(comp, loose);
  debug('xrange', comp);
  comp = replaceStars(comp, loose);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p))
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    else if (pr) {
      debug('replaceTilde pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0';

    debug('tilde return', ret);
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  debug('caret', comp, loose);
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      else
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0';
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0';
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  debug('replaceXRanges', comp, loose);
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // replace X with 0
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm)
          M = +M + 1;
        else
          m = +m + 1;
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  debug('replaceStars', comp, loose);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }

  if (version.prerelease.length) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY)
        continue;

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch)
          return true;
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  var max = null;
  var maxSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, loose);
      }
    }
  })
  return max;
}

exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, loose) {
  var min = null;
  var minSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, loose);
      }
    }
  })
  return min;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

exports.prerelease = prerelease;
function prerelease(version, loose) {
  var parsed = parse(version, loose);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
}

exports.intersects = intersects;
function intersects(r1, r2, loose) {
  r1 = new Range(r1, loose)
  r2 = new Range(r2, loose)
  return r1.intersects(r2)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(16),
    root = __webpack_require__(9);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(163),
    mapCacheDelete = __webpack_require__(170),
    mapCacheGet = __webpack_require__(172),
    mapCacheHas = __webpack_require__(173),
    mapCacheSet = __webpack_require__(174);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(60),
    eq = __webpack_require__(21);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(91);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(179),
    baseUnary = __webpack_require__(64),
    nodeUtil = __webpack_require__(180);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(67),
    stubArray = __webpack_require__(97);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(94);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(104);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(5),
    isSymbol = __webpack_require__(34);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(15),
    getPrototype = __webpack_require__(69),
    isObjectLike = __webpack_require__(13);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  app: "",
  api: "",
  core: ""
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(225),
    isObjectLike = __webpack_require__(13);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ifCore;

var _semver = __webpack_require__(56);

var _semver2 = _interopRequireDefault(_semver);

var _versionInfo = __webpack_require__(74);

var _versionInfo2 = _interopRequireDefault(_versionInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ifCore(query) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(query)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var versionQuery = _ref2[0];
      var thunk = _ref2[1];

      if (_semver2.default.satisfies(_versionInfo2.default.core, versionQuery)) {
        return thunk();
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(78);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(243),
    baseIsNaN = __webpack_require__(244),
    strictIndexOf = __webpack_require__(245);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),
/* 79 */
/***/ (function(module, exports) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var baseUniq = __webpack_require__(124);

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? baseUniq(array) : [];
}

module.exports = uniq;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.createLocalStorage = createLocalStorage;

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localStorage = createLocalStorage({ coreInterface: _coreInterface2.default });

exports.default = localStorage;

/**
 * @interface LocalStorage
 * @extends Storage
 */

/**
 * @private
 * @returns LocalStorage
 */

function createLocalStorage(specification) {
  var coreInterface = specification.coreInterface;


  var provider = {
    read: read,
    write: write,
    remove: remove
  };

  return provider;

  function read(name) {
    return coreInterface.call('readCustomFile', name.replace(/\//g, '_'));
  }

  function write(name, content) {
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return coreInterface.call('saveCustomFile', name.replace(/\//g, '_'), content, format);
  }

  function remove(name) {
    coreInterface.emit('deleteCustomFile', name.replace(/\//g, '_'));
    return (0, _bluebird.resolve)();
  }
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.createCloudStorage = createCloudStorage;

var _authenticationManager = __webpack_require__(83);

var _authenticationManager2 = _interopRequireDefault(_authenticationManager);

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _appConfig = __webpack_require__(19);

var _appConfig2 = _interopRequireDefault(_appConfig);

var _http = __webpack_require__(135);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloudStorage = createCloudStorage({ authenticationManager: _authenticationManager2.default, appConfig: _appConfig2.default, config: _config2.default, http: _http2.default });

exports.default = cloudStorage;

/**
 * @interface CloudStorage
 * @extends Storage
 */

/**
 * @private
 * @returns CloudStorage
 */

function createCloudStorage(specification) {
  var authenticationManager = specification.authenticationManager,
      config = specification.config,
      appConfig = specification.appConfig,
      http = specification.http;


  var storageKey = void 0;
  var createUrl = function createUrl(action) {
    return appConfig.host + '/appstorage/' + action + '/storage:' + (storageKey || appConfig.storageKey);
  };

  var password = config.password || '';

  var provider = {
    get storageKey() {
      return storageKey;
    },
    set storageKey(key) {
      storageKey = key;
    },
    createUrl: createUrl,
    read: read,
    write: write,
    remove: remove
  };

  return provider;

  function checkPermission(path) {
    var token = authenticationManager.token;

    if (!(path.match(/^\/public\//) || token && path.match(new RegExp('^/' + token + '/')))) {
      throw new Error('Access violation! Restricted access to unauthorized users!');
    }
  }

  function read(path) {
    return (0, _bluebird.resolve)().then(function () {
      return checkPermission(path);
    }).then(function () {
      return http.post(createUrl('query'), { password: password, uid: path });
    }).then(function (result) {
      return result ? JSON.parse(result) : null;
    });
  }

  function write(path, content, format) {
    return (0, _bluebird.resolve)().then(function () {
      return checkPermission(path);
    }).then(function () {
      return http.post(createUrl('save'), { password: password, uid: path, data: content });
    });
  }

  function remove(path) {
    return (0, _bluebird.resolve)().then(function () {
      return checkPermission(path);
    }).then(function () {
      return http.post(createUrl('delete'), { password: password, uid: path });
    });
  }
}

/**
 * @interface Storage
 */

/**
 * Reads file contents from storage. Resolves to null if file doesn't exist.
 * @function
 * @name Storage#read
 * @params {string} path file path
 * @returns {Promise.<string|null>} file contents
 */

/**
 * Writes file contents from storage.
 * @function
 * @name Storage#write
 * @params {string} path file path
 * @params {string} content content to write
 * @params {string} format content format
 * @returns {Promise} resolved on completion
 */

/**
 * Removes file from storage.
 * @function
 * @name Storage#remove
 * @params {string} path file path
 * @returns {Promise} resolved on completion
 */

/**
 * @namespace storage
 */

/**
 * @member {LocalStorage} local
 * @memberof storage#
 */

/**
 * @member {CloudStorage} cloud
 * @memberof storage#
 */

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAuthenticationManager = createAuthenticationManager;

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticationManager = createAuthenticationManager({ coreInterface: _coreInterface2.default });
exports.default = authenticationManager;
function createAuthenticationManager() {
  var token = '';

  return {
    get token() {
      return token;
    },
    logIn: function logIn(name, password) {
      return token = name;
    },
    logOut: function logOut() {
      return token = '';
    }
  };
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArCamera = undefined;

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _cameraBase = __webpack_require__(85);

var _cameraBase2 = _interopRequireDefault(_cameraBase);

var _constants = __webpack_require__(4);

var _compose = __webpack_require__(2);

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _freezeFrame = __webpack_require__(315);

var _freezeFrame2 = _interopRequireDefault(_freezeFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var STATE_LIVE = Symbol();
var STATE_FROZEN = Symbol();
var STATE_FRAME_VISIBLE = Symbol();

/**
 * Uses arCamera feed together with device sensors and various trackers to provide an AR experience for the user.
 *
 * @interface ArCamera
 * @extends Camera
 */
/**
 * arCamera pose
 * @member {ControllableCameraPose} ArCamera#pose
 */

/**
 * @private
 * @param {object} props
 * @param {ArCamera} arCamera
 */
var ArCamera = exports.ArCamera = function ArCamera(props, arCamera) {

  //======================================================================================================================

  var init = function () {
    var _ref = (0, _bluebird.method)(function () {
      available = appConfig.stageList.includes(stageName);
      if (appConfig.stageList[0] === stageName) {
        cameraController.activeCamera = arCamera;
      }
      freezeFramesAvailable = appConfig.stageList.includes(stageName);
      if (freezeFramesAvailable) {
        freezeFrames = appConfig.freezeFrameInfo.map(function (info) {
          return FreezeFrame(info);
        });
      }
    });

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  var activate = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!available) {
                _context.next = 11;
                break;
              }

              if (!(state === STATE_FRAME_VISIBLE && activeFreezeFrame)) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return showFreezeFrame(activeFreezeFrame);

            case 4:
              _context.next = 8;
              break;

            case 6:
              _context.next = 8;
              return coreInterface.call('activateStage', stageName);

            case 8:

              cameraController.activeCamera = arCamera;
              _context.next = 12;
              break;

            case 11:
              throw new Error('ViewAR API: Error! arCamera is not available! Check your app configuration!');

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function activate() {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Freezes arCamera feed and the scene.
   * @async
   * @function ArCamera#freeze
   * @returns {Promise}
   */


  /**
   * Unfreezes arCamera feed and the scene.
   * @async
   * @function ArCamera#unfreeze
   * @returns {Promise}
   */
  var unfreeze = function () {
    var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = state;
              _context2.next = _context2.t0 === STATE_FRAME_VISIBLE ? 3 : 6;
              break;

            case 3:
              _context2.next = 5;
              return coreInterface.call('activateStage', stageName);

            case 5:
              return _context2.abrupt('break', 6);

            case 6:
              _context2.next = 8;
              return coreInterface.call('unfreeze');

            case 8:
              state = STATE_LIVE;

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function unfreeze() {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * Freezes the arCamera feed and displays the given freezeFrame
   * @async
   * @function ArCamera#showFreezeFrame
   * @param {FreezeFrame} freezeFrame
   * @returns {Promise}
   */


  var showFreezeFrame = function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(freezeFrame) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (freezeFramesAvailable) {
                _context3.next = 2;
                break;
              }

              throw new Error('ViewAR API: Error! Freeze frame functionality not available! Check your app configuration!');

            case 2:
              _context3.t0 = state;
              _context3.next = _context3.t0 === STATE_FROZEN ? 5 : 9;
              break;

            case 5:
              _context3.next = 7;
              return coreInterface.call('activateStage', stageName);

            case 7:
              state = STATE_FRAME_VISIBLE;
              return _context3.abrupt('break', 9);

            case 9:
              _context3.next = 11;
              return coreInterface.call('showFreezeFrame', freezeFrame.name);

            case 11:
              activeFreezeFrame = freezeFrame;

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function showFreezeFrame(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  /**
   * Downloads a previously saved freezeFrame from the server and creates a freezeFrame Object
   * @async
   * @function ArCamera#downloadFreezeFrame
   * @param name freezeFrame's name
   * @returns {Promise.<FreezeFrame>}
   */


  var downloadFreezeFrame = function () {
    var _ref5 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(name) {
      var freezeFrame;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (freezeFramesAvailable) {
                _context4.next = 2;
                break;
              }

              throw new Error('ViewAR API: Error! Freeze frame functionality not available! Check your app configuration!');

            case 2:
              freezeFrame = FreezeFrame({ name: name });
              _context4.next = 5;
              return coreInterface.call('downloadFreezeFrameFromServer', name);

            case 5:
              freezeFrames.push(freezeFrame);

              return _context4.abrupt('return', freezeFrame);

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function downloadFreezeFrame(_x2) {
      return _ref5.apply(this, arguments);
    };
  }();

  /**
   * Freezes the arCamera feed and saves the current feed frame and arCamera pose as a new freezeFrame
   * @async
   * @function ArCamera#freezeFrame
   * @returns {Promise.<FreezeFrame>}
   */


  var saveFreezeFrame = function () {
    var _ref6 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(name) {
      var freezeFrame;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (freezeFramesAvailable) {
                _context5.next = 2;
                break;
              }

              throw new Error('ViewAR API: Error! Freeze frame functionality not available! Check your app configuration!');

            case 2:
              _context5.t0 = state;
              _context5.next = _context5.t0 === STATE_FROZEN ? 5 : 11;
              break;

            case 5:
              _context5.next = 7;
              return (0, _bluebird.all)([new _bluebird2.default(function (resolve) {
                return coreInterface.once('freezeFrameTaken', resolve);
              }), coreInterface.emit('saveFreezeFrame', name || 'freeze_frame__' + Date.now(), false)]);

            case 7:
              freezeFrame = FreezeFrame({ name: name, coreInterface: coreInterface });

              freezeFrames.push(freezeFrame);
              activeFreezeFrame = freezeFrame;
              return _context5.abrupt('return', activeFreezeFrame);

            case 11:
              return _context5.abrupt('return', activeFreezeFrame);

            case 12:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function saveFreezeFrame(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();

  /**
   * Removes the given freeze frame. Unfreezes camera if the frozen frame was currently active.
   * @async
   * @function ArCamera#removeFreezeFrame
   * @param {FreezeFrame} freezeFrame
   * @returns {Promise}
   */


  var removeFreezeFrame = function () {
    var _ref7 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(freezeFrame) {
      var index;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (freezeFramesAvailable) {
                _context6.next = 2;
                break;
              }

              throw new Error('ViewAR API: Error! Freeze frame functionality not available! Check your app configuration!');

            case 2:
              index = freezeFrames.indexOf(freezeFrame);

              if (!~index) {
                _context6.next = 11;
                break;
              }

              _context6.next = 6;
              return coreInterface.call('removeFreezeFrame', freezeFrame.name);

            case 6:
              freezeFrames.splice(index, 1);

              if (!(activeFreezeFrame === freezeFrame)) {
                _context6.next = 11;
                break;
              }

              activeFreezeFrame = null;
              _context6.next = 11;
              return unfreeze();

            case 11:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function removeFreezeFrame(_x4) {
      return _ref7.apply(this, arguments);
    };
  }();

  var appConfig = props.appConfig,
      pose = props.pose,
      cameraController = props.cameraController,
      coreInterface = props.coreInterface,
      stageName = props.stageName,
      FreezeFrame = props.FreezeFrame;


  var available = false;
  var freezeFramesAvailable = false;
  var state = STATE_LIVE;
  var activeFreezeFrame = null;
  var freezeFrames = [];

  (0, _assign2.default)(arCamera, {
    init: init,
    activate: activate,
    freeze: freeze,
    unfreeze: unfreeze,

    get pose() {
      return (0, _clone2.default)(pose);
    },
    get frozen() {
      return state !== STATE_LIVE;
    },
    get freezeFrames() {
      return [].concat(_toConsumableArray(freezeFrames));
    },
    showFreezeFrame: showFreezeFrame,
    removeFreezeFrame: removeFreezeFrame,
    saveFreezeFrame: saveFreezeFrame,
    downloadFreezeFrame: downloadFreezeFrame
  });function freeze() {
    return (0, _bluebird.resolve)().then(function () {
      switch (state) {
        case STATE_LIVE:
          return coreInterface.call('freeze').then(function () {
            return state = STATE_FROZEN;
          });
        default:
          return;
      }
    });
  }
};

/**
 * @type {ArCamera}
 */
var arCamera = (0, _compose.compose)((0, _compose.defaultProps)(function () {
  return (0, _clone2.default)(_constants.AR_CAMERA_DEFAULTS);
}), (0, _compose.injectProps)({
  FreezeFrame: _freezeFrame2.default
}), _cameraBase2.default, ArCamera)();

exports.default = arCamera;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraBase = undefined;

var _bluebird = __webpack_require__(0);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _utils = __webpack_require__(6);

var _appConfig = __webpack_require__(19);

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cameraController = {
  activeCamera: null

  /**
   * Common interface for all cameras.
   * @interface Camera
   */
  /**
   * camera activity state
   * @member {boolean} Camera#active
   */
  /**
   * Activates the camera.
   * @async
   * @function Camera#activate
   * @returns {Promise} resolved on completion.
   */

  /**
   * @private
   * @param props
   * @param camera
   */
};var CameraBase = exports.CameraBase = function CameraBase(props, camera) {
  var cameraController = props.cameraController,
      poseUpdateCall = props.poseUpdateCall,
      name = props.name,
      pose = props.pose,
      coreInterface = props.coreInterface;


  var intervalId = null;

  /**
   * Updates the camera pose once.
   * @async
   * @function Camera#updatePose
   * @returns {Promise} current camera pose
   */
  var updatePose = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = Object;
              _context.t1 = pose;
              _context.t2 = _utils.sanitizeCameraPose;
              _context.next = 5;
              return coreInterface.call(poseUpdateCall, name);

            case 5:
              _context.t3 = _context.sent;
              _context.t4 = (0, _context.t2)(_context.t3);
              return _context.abrupt('return', _context.t0.assign.call(_context.t0, _context.t1, _context.t4));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function updatePose() {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Starts the automatic camera pose update, which is by default turned off for performance reasons.
   * The pose returned is relative to the initialized virtual space origin.
   * @function Camera#startPoseUpdate
   */
  var startPoseUpdate = function startPoseUpdate(intervalInMs) {
    return intervalId = setInterval(updatePose, intervalInMs);
  };

  /**
   * Stops the automatic pose update.
   * @function Camera#stopPoseUpdate
   */
  var stopPoseUpdate = function stopPoseUpdate() {
    return clearInterval(intervalId);
  };

  /**
   * Switches to stereoscopic rendering mode for use in HMDs.
   * @async
   * @function Camera#enableHmdMode
   * @returns {Promise} resolved on completion.
   */
  var enableHmdMode = function enableHmdMode() {
    return coreInterface.call('setRigType', name, 'StereoParallel');
  };

  /**
   * Switches to regular rendering mode for handheld devices.
   * @async
   * @function Camera#disableHmdMode
   * @returns {Promise} resolved on completion.
   */
  var disableHmdMode = function disableHmdMode() {
    return coreInterface.call('setRigType', name, 'Single');
  };

  /**
   * Calculates a point in 3d space in front of the camera at specified distance.
   * @async
   * @function Camera#getPoseInViewingDirection
   * @param {number} distance distance from camera
   * @param {boolean?} projectToFloor if true, projects the resulting point onto the xz plain
   * @returns {Promise.<Vector3d>} resulting position
   */
  var getPoseInViewingDirection = function getPoseInViewingDirection(distance) {
    var projectToFloor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return coreInterface.call('getPoseInViewingDirection', distance, !!projectToFloor);
  };

  (0, _assign2.default)(camera, {
    get active() {
      return cameraController.activeCamera === camera;
    },
    startPoseUpdate: startPoseUpdate,
    updatePose: updatePose,
    stopPoseUpdate: stopPoseUpdate,
    enableHmdMode: enableHmdMode,
    disableHmdMode: disableHmdMode,
    getPoseInViewingDirection: getPoseInViewingDirection
  });
};

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  name: 'string',
  stageName: 'string',
  pose: 'object'
}, 'CameraPoseUpdate'), (0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  cameraController: cameraController,
  appConfig: _appConfig2.default
}), CameraBase);

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(20),
    arrayMap = __webpack_require__(14),
    isArray = __webpack_require__(5),
    isSymbol = __webpack_require__(34);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(15),
    isArray = __webpack_require__(5),
    isObjectLike = __webpack_require__(13);

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(35),
    arrayEach = __webpack_require__(175),
    assignValue = __webpack_require__(59),
    baseAssign = __webpack_require__(176),
    baseAssignIn = __webpack_require__(183),
    cloneBuffer = __webpack_require__(95),
    copyArray = __webpack_require__(96),
    copySymbols = __webpack_require__(186),
    copySymbolsIn = __webpack_require__(187),
    getAllKeys = __webpack_require__(99),
    getAllKeysIn = __webpack_require__(101),
    getTag = __webpack_require__(102),
    initCloneArray = __webpack_require__(191),
    initCloneByTag = __webpack_require__(192),
    initCloneObject = __webpack_require__(108),
    isArray = __webpack_require__(5),
    isBuffer = __webpack_require__(42),
    isObject = __webpack_require__(7),
    keys = __webpack_require__(28);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(16);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(93),
    isArguments = __webpack_require__(41),
    isArray = __webpack_require__(5),
    isBuffer = __webpack_require__(42),
    isIndex = __webpack_require__(43),
    isTypedArray = __webpack_require__(62);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 93 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(9);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)(module)))

/***/ }),
/* 96 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(68),
    getPrototype = __webpack_require__(69),
    getSymbols = __webpack_require__(66),
    stubArray = __webpack_require__(97);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(100),
    getSymbols = __webpack_require__(66),
    keys = __webpack_require__(28);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(68),
    isArray = __webpack_require__(5);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(100),
    getSymbolsIn = __webpack_require__(98),
    keysIn = __webpack_require__(29);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(188),
    Map = __webpack_require__(57),
    Promise = __webpack_require__(189),
    Set = __webpack_require__(103),
    WeakMap = __webpack_require__(190),
    baseGetTag = __webpack_require__(15),
    toSource = __webpack_require__(90);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(16),
    root = __webpack_require__(9);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(9);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(70);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(200),
    getPrototype = __webpack_require__(69),
    isPrototype = __webpack_require__(65);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 109 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__(208),
    overRest = __webpack_require__(111),
    setToString = __webpack_require__(113);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(112);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(210),
    shortOut = __webpack_require__(212);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = {"name":"viewar-api","version":"0.10.25","description":"ViewAR API","license":"UNLICENSED","main":"dist/viewar-api.js","scripts":{"test":"node ./scripts/test.js './src/**/*.test.js' | faucet","docs":"rm -rf docs && jsdoc -c ./config/jsdoc.config.json","docs:md":"rm -rf docs && mkdir -p docs && jsdoc2md -c ./config/jsdoc.config.json src/**/*.js > docs/docs.md","preversion":"npm test","version":"npm run build && git add -A","postversion":"git push origin HEAD && git push --tags","prepack":"npm test && node ./scripts/prepack.js","clean":"rm -rf dist","build":"npm run clean && webpack --config ./config/webpack.config.js","build:prod":"npm run clean && webpack --config ./config/webpack.prod.config.js","watch":"npm run clean && webpack --watch --config ./config/webpack.config.js","watch:prod":"npm run clean && webpack --watch --config ./config/webpack.prod.config.js","deploy":"npm run build:prod && npm pack && node ./scripts/deploy.js"},"author":"Ivan Šakić <is@viewar.com>","contributors":["Karl Hofer <kh@viewar.com>","Matthias Klan <mk@viewar.com>"],"dependencies":{"babel-polyfill":"^6.26.0","viewar-core":"^5.4.1"},"devDependencies":{"babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-plugin-transform-runtime":"^6.23.0","babel-preset-bluebird":"^1.0.1","babel-preset-env":"^1.6.1","babel-preset-stage-0":"^6.24.1","bluebird":"^3.5.1","component-emitter":"^1.2.1","faucet":"^0.0.1","ink-docstrap":"^1.3.2","jsdoc":"^3.5.5","jsdoc-babel":"^0.3.0","jsdoc-to-markdown":"^3.0.4","jsdom":"11.5.1","jsdom-global":"3.0.2","lodash":"^4.17.4","nearley":"^2.11.0","nearley-loader":"0.0.3","request":"^2.83.0","semver":"^5.4.1","tap":"^11.0.1","tape":"^4.8.0","webpack":"^3.10.0"},"files":["dist/viewar-api.js"]}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneManager = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isEqual = __webpack_require__(25);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isUndefined = __webpack_require__(231);

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _container = __webpack_require__(117);

var _container2 = _interopRequireDefault(_container);

var _updateScene = __webpack_require__(237);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

var _logger = __webpack_require__(30);

var _logger2 = _interopRequireDefault(_logger);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _constants = __webpack_require__(4);

var _ifCore = __webpack_require__(76);

var _ifCore2 = _interopRequireDefault(_ifCore);

var _modelManager = __webpack_require__(27);

var _modelManager2 = _interopRequireDefault(_modelManager);

var _compose = __webpack_require__(2);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _emitter = __webpack_require__(53);

var _emitter2 = _interopRequireDefault(_emitter);

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//======================================================================================================================

/**
 * Object responsible for scene content management.
 *
 * @interface SceneManager
 * @extends Emitter
 * @fires SceneManager#sceneObjectPoseChanged
 * @fires SceneManager#selectionChanged
 * @fires SceneManager#objectTouched
 */

/**
 * Container representing the whole scene.
 * @member {Container} SceneManager#scene
 */
/**
 * Currently selected scene node. Is null if no node is selected.
 * @member {SceneNode | null} SceneManager#selection
 */

/**
 * @private
 * @param {object} props
 * @param {SceneManager} sceneManager
 */
var SceneManager = exports.SceneManager = function SceneManager(specification, sceneManager) {

  /**
   * Clears the scene completely, removing every scene node apart from the scene itself. Also removes any rooms.
   * @async
   * @function SceneManager#clearScene
   * @returns {Promise} Promise that resolves when the scene is cleared.
   */
  var clearScene = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return coreInterface.call('clearScene');

            case 2:
              _context.next = 4;
              return coreInterface.call('clearModelPreviews');

            case 4:
              nodeRegistry = {};
              scene = createScene();
              selection = null;

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function clearScene() {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Selects the scene node. Selected nodes can be interacted with to change their pose.
   * @async
   * @function SceneManager#select
   * @param {SceneNode} node scene node to be selected
   * @returns {Promise.<SceneNode>} Promise that resolves when the object is selected.
   */


  /**
   * Deselects the currently selected object. Does nothing is nothing is selected.
   * @async
   * @function SceneManager#clearSelection
   * @returns {Promise} Promise that resolves when the object is deselected.
   */
  var clearSelection = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              coreInterface.off('selectionChanged', selectionChangedHandler);
              _context2.next = 3;
              return coreInterface.call('clearSelection');

            case 3:
              coreInterface.on('selectionChanged', selectionChangedHandler);
              selection = null;

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function clearSelection() {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Searches the scene for a node by id.
   * @function SceneManager#findNodeById
   * @param {string} id unique id of the scene node
   * @returns {SceneNode | null} scene node, if found; null otherwise.
   */


  /**
   * Inserts a model into the scene according to given parameters.
   * @async
   * @function SceneManager#insertModel
   * @param {Model} model model to be inserted
   * @param {ModelInsertionParams} instanceProps properties of the new instance
   * @param {Object} insertionParams insertion setting for snapping
   * @returns {Promise.<ModelInstance|Configuration>} Promise that resolves with the inserted instance of the model.
   */
  var insertModel = function () {
    var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(model) {
      var instanceProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var insertionParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _instanceProps$parent, parent, instance;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _instanceProps$parent = instanceProps.parent, parent = _instanceProps$parent === undefined ? scene : _instanceProps$parent;
              _context3.next = 3;
              return (0, _ifCore2.default)({
                "^5.3.0": function _() {
                  return (0, _bluebird.resolve)();
                },
                "*": function _() {
                  return model.download();
                }
              });

            case 3:
              _context3.next = 5;
              return getSharedInterface(model).instantiate(_extends({}, instanceProps, { parent: parent }), insertionParams);

            case 5:
              instance = _context3.sent;


              nodeRegistry[instance.id] = instance;

              (instance.children || []).forEach(function (child) {
                return nodeRegistry[child.id] = child;
              });

              return _context3.abrupt('return', instance);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function insertModel(_x2, _x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * Removes given scene node. Attempting to remove the scene will throw an error.
   * @async
   * @function SceneManager#removeNode
   * @param {SceneNode} node scene node to be removed
   * @returns {Promise} Promise that resolves when the object is removed.
   * @throws {Error} when attempting to remove the scene
   */


  var removeNode = function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(node) {
      var actualNode;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              actualNode = findNodeById(node.id);

              if (!(node === scene)) {
                _context4.next = 5;
                break;
              }

              throw new Error('ViewAR API: ERROR! Cannot remove the scene!');

            case 5:
              if (!(actualNode && node.id === actualNode.id)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 8;
              return coreInterface.call('deleteInstance', node.id);

            case 8:
              // TODO: getSharedInterface(node) not existing when restoring scene state!
              unregisterNodeRecursively(actualNode); // TODO: maybe this should be in the container?

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function removeNode(_x7) {
      return _ref4.apply(this, arguments);
    };
  }();

  /** @private */


  /**
   * Same as {@link sceneManager.getSceneState}, but returns a Promise that resolves with the scene state after all
   * scene updates have been made.
   * @async
   * @function SceneManager#setSceneState
   * @param {Object} newSceneState scene state, obtained using {@link sceneManager.getSceneState} or {@link sceneManager.getSceneStateSafe}
   * @returns {Promise} Promise that resolves once the scene is updated.
   */
  var setSceneState = function () {
    var _ref5 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(newSceneState) {
      var calls, updateSceneThunk;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              calls = {
                addNode: addNode,
                updateNode: updateNode,
                moveNode: moveNode,
                removeNode: removeNode
              };

              updateSceneThunk = function updateSceneThunk() {
                return (0, _updateScene.updateScene)(getSceneState(), (0, _clone2.default)(newSceneState), calls, emit);
              };

              _context5.next = 4;
              return sceneStateMutex = sceneStateMutex.then(updateSceneThunk, updateSceneThunk);

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function setSceneState(_x8) {
      return _ref5.apply(this, arguments);
    };
  }();

  /** @private */


  var addNode = function () {
    var _ref6 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, specification) {
      var container, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, child, model, instance;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!specification.children) {
                _context6.next = 32;
                break;
              }

              _context6.next = 3;
              return sceneManager.insertContainer(_extends({}, specification, { parent: findNodeById(parent.id) }));

            case 3:
              container = _context6.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context6.prev = 7;
              _iterator = specification.children[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context6.next = 16;
                break;
              }

              child = _step.value;
              _context6.next = 13;
              return addNode(container, child);

            case 13:
              _iteratorNormalCompletion = true;
              _context6.next = 9;
              break;

            case 16:
              _context6.next = 22;
              break;

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6['catch'](7);
              _didIteratorError = true;
              _iteratorError = _context6.t0;

            case 22:
              _context6.prev = 22;
              _context6.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context6.prev = 25;

              if (!_didIteratorError) {
                _context6.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context6.finish(25);

            case 29:
              return _context6.finish(22);

            case 30:
              _context6.next = 46;
              break;

            case 32:
              _context6.t1 = modelManager.findModelByForeignKey(specification.model) || modelManager.findModelById(specification.model);

              if (_context6.t1) {
                _context6.next = 37;
                break;
              }

              _context6.next = 36;
              return modelManager.getModelFromRepository(specification.model);

            case 36:
              _context6.t1 = _context6.sent;

            case 37:
              model = _context6.t1;


              specification.pose = specification.pose || _constants.DEFAULT_POSE;
              _context6.next = 41;
              return (0, _ifCore2.default)({
                "^5.3.0": function _() {
                  return (0, _bluebird.resolve)();
                },
                "*": function _() {
                  return model.download();
                }
              });

            case 41:
              _context6.next = 43;
              return getSharedInterface(model).instantiate(_extends({}, specification, { parent: findNodeById(parent.id) }));

            case 43:
              instance = _context6.sent;


              nodeRegistry[instance.id] = instance;

              (instance.children || []).forEach(function (child) {
                return nodeRegistry[child.id] = child;
              });

            case 46:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[7, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function addNode(_x9, _x10) {
      return _ref6.apply(this, arguments);
    };
  }();

  /** @private */


  var coreInterface = specification.coreInterface,
      modelManager = specification.modelManager,
      Container = specification.Container,
      getSharedInterface = specification.getSharedInterface,
      emit = specification.emit;


  var nodeRegistry = {};
  var sceneStateMutex = (0, _bluebird.resolve)();
  var scene = null;
  var selection = null;

  (0, _assign2.default)(sceneManager, {
    init: init,

    insertContainer: insertContainer,
    insertModel: insertModel,

    removeNode: removeNode,

    select: select,
    clearSelection: clearSelection,

    findNodeById: findNodeById,

    clearScene: clearScene,
    getSceneState: getSceneState,
    getSceneStateSafe: getSceneStateSafe,
    setSceneState: setSceneState,

    get scene() {
      return scene;
    },
    get selection() {
      return selection;
    }
  });

  /** @private */
  function init() {
    coreInterface.on('sceneObjectPoseChanged', sceneObjectPoseChangedHandler);
    coreInterface.on('selectionChanged', selectionChangedHandler);
    coreInterface.on('touchRay', touchRayHandler);
    coreInterface.on('objectTouched', objectTouchedHandler);
    coreInterface.on('objectSnapped', objectSnappedHandler);
    coreInterface.on('objectUnsnapped', objectUnsnappedHandler);
    coreInterface.on('backgroundRestoreStarted', backgroundRestoreStartedHandler);
    coreInterface.on('backgroundRestoreCompleted', backgroundRestoreCompletedHandler);

    scene = createScene();
    selection = null;
  }

  // FIXME: this is potentially leaky
  /** @private */
  function createScene() {
    return nodeRegistry[_constants.SCENE_ID] = Container({ id: _constants.SCENE_ID, type: 'ungrouped', parent: null });
  }function select(node) {
    return (0, _bluebird.resolve)().then(function () {
      if (node && findNodeById(node.id)) {
        coreInterface.off('selectionChanged', selectionChangedHandler);
        return coreInterface.call('selectObject', node.id).then(function () {
          return coreInterface.on('selectionChanged', selectionChangedHandler);
        }).then(function () {
          return selection = node;
        });
      } else {
        return clearSelection();
      }
    });
  }function findNodeById(id) {
    return nodeRegistry[id] || null;
  }

  /**
   * Inserts a container into the scene according to given parameters.
   * @async
   * @function SceneManager#insertContainer
   * @param {ContainerInsertionParams} insertionParams insertion parameters for the container
   * @returns {Promise.<Container>} Promise that resolves with the inserted container.
   */
  function insertContainer() {
    var insertionParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var container = Container(_extends({ id: (0, _generateId2.default)(), parent: scene }, insertionParams));

    nodeRegistry[container.id] = container;

    getSharedInterface(container.parent).addChild(container);

    return getSharedInterface(container).insert();
  }function unregisterNodeRecursively(object) {
    (object.children || []).map(unregisterNodeRecursively);
    getSharedInterface(object.parent).removeChild(object);
    delete nodeRegistry[object.id];
  }

  /**
   * Returns a serializable (JSON) representation of the whole scene, including the room description. Modifications of
   * the returned objects have no effect on the actual scene state.
   * @function SceneManager#getSceneState
   * @returns {Object} serializable representation of the scene.
   */
  function getSceneState() {
    return (0, _clone2.default)(scene);
  }

  /**
   * Same as {@link sceneManager.getSceneState}, but returns a Promise that resolves with the scene state after all
   * scene updates have been made.
   * @async
   * @function SceneManager#getSceneStateSafe
   * @returns {Promise.<Object>} Promise that resolves with serializable representation of the scene.
   */
  function getSceneStateSafe() {
    return sceneStateMutex = sceneStateMutex.then(function () {
      return getSceneState();
    }, function () {
      return getSceneState();
    });
  }function moveNode(_ref7) {
    var node = _ref7.node,
        parent = _ref7.parent;

    return findNodeById(node.id).setParent(findNodeById(parent.id));
  }

  /** @private */
  function updateNode(_ref8) {
    var oldSceneNode = _ref8.oldSceneNode,
        newSceneNode = _ref8.newSceneNode;

    return (0, _bluebird.resolve)().then(function () {
      return findNodeById(oldSceneNode.id);
    }).then(function (node) {
      return (0, _bluebird.all)([(0, _isUndefined2.default)(newSceneNode.pose) || (0, _isEqual2.default)(node.pose, newSceneNode.pose) ? (0, _bluebird.resolve)() : node.setPose(newSceneNode.pose), (0, _isUndefined2.default)(newSceneNode.interaction) || (0, _isEqual2.default)(node.interaction, newSceneNode.interaction) ? (0, _bluebird.resolve)() : node.setInteraction(newSceneNode.interaction), (0, _isUndefined2.default)(newSceneNode.visible) || (0, _isEqual2.default)(node.visible, newSceneNode.visible) ? (0, _bluebird.resolve)() : node.setVisible(newSceneNode.visible), (0, _isUndefined2.default)(newSceneNode.propertyValues) || (0, _isEqual2.default)(node.propertyValues, newSceneNode.propertyValues) ? (0, _bluebird.resolve)() : node.setPropertyValues(newSceneNode.propertyValues)]);
    });
  }

  //======================================================================================================================

  function sceneObjectPoseChangedHandler(nodeId, newPose) {
    var node = findNodeById(nodeId);

    if (node) {
      getSharedInterface(node).updatePose(newPose);
      emit('sceneObjectPoseChanged', node);
    }
  }

  function selectionChangedHandler(objectId) {
    selection = nodeRegistry[objectId];
    emit('selectionChanged', selection);
  }

  function touchRayHandler(touchResult) {
    emit('sceneTouched', touchResult);
  }

  function objectTouchedHandler(objectId, meshId) {
    emit('objectTouched', nodeRegistry[objectId], meshId);
  }

  function objectSnappedHandler(snappingInfoJson) {
    var snappingInfo = JSON.parse(snappingInfoJson);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = snappingInfo[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var snap = _step2.value;

        var object1 = findNodeById(snap.plug.id);
        var object2 = findNodeById(snap.socket.id);
        emit('objectSnapped', object1, object2);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  function objectUnsnappedHandler(snappingInfo) {
    emit('objectUnsnapped', JSON.parse(snappingInfo));
  }

  function backgroundRestoreStartedHandler() {
    emit('backgroundRestoreStarted');
  }

  function backgroundRestoreCompletedHandler() {
    emit('backgroundRestoreCompleted');
  }
};

/**
 * @type {SceneManager}
 */
var sceneManager = (0, _compose.compose)(_emitter2.default, SceneManager)({ modelManager: _modelManager2.default, Container: _container2.default, logger: _logger2.default, coreInterface: _coreInterface2.default, getSharedInterface: _shared2.default });

exports.default = sceneManager;

/**
 * Event that is emitted when an scene node is moved manually
 *
 * @event SceneManager#sceneObjectPoseChanged
 * @param {SceneNode} node - node whose pose was changed
 */

/**
 * Event that is emitted when selection changes
 *
 * @event SceneManager#selectionChanged
 * @param {SceneNode|null} selection - new selection
 */

/**
 * Event that is emitted when an scene node is touched
 *
 * @event SceneManager#objectTouched
 * @param {SceneNode} node - node that was touched
 */

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(48),
    arraySome = __webpack_require__(228),
    cacheHas = __webpack_require__(49);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = undefined;

var _bluebird = __webpack_require__(0);

var _isEqual = __webpack_require__(25);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _constants = __webpack_require__(4);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _utils = __webpack_require__(6);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _sceneNode = __webpack_require__(51);

var _sceneNode2 = _interopRequireDefault(_sceneNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//======================================================================================================================

/**
 * Represents a group of other scene nodes. Can be either grouped or ungrouped. If ungrouped, it is non-interactive but
 * its children are.
 *
 * @interface Container
 * @extends SceneNode
 */
var Container = exports.Container = function Container(props, container) {
  var id = props.id,
      type = props.type,
      getSharedInterface = props.getSharedInterface,
      coreInterface = props.coreInterface,
      children = props.children;


  var compileInsertionParams = function compileInsertionParams() {
    var parent = props.parent,
        pose = props.pose,
        interaction = props.interaction,
        visible = props.visible,
        highlight = props.highlight;

    return {
      pose: pose,
      highlight: highlight,
      orientation: interaction.manipulationPlane || interaction.orientation || 'horizontal',
      visible: visible,
      interaction: interaction,
      targetContainerId: parent.id,
      shouldBeGrouped: parent.type !== 'ungrouped'
    };
  };

  var insert = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return coreInterface.call('insertContainer', id, compileInsertionParams());

            case 2:
              return _context.abrupt('return', container);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function insert() {
      return _ref.apply(this, arguments);
    };
  }();

  var remove = function remove() {
    return coreInterface.call('deleteInstance', id);
  };

  var toJSON = function toJSON() {
    var children = container.children,
        pose = container.pose,
        interaction = container.interaction,
        visible = container.visible,
        type = container.type;

    return {
      id: id,
      type: type,
      pose: (0, _isEqual2.default)(pose, _constants.DEFAULT_POSE) ? undefined : pose,
      interaction: (0, _isEqual2.default)(interaction, _constants.DEFAULT_INTERACTION) ? undefined : interaction,
      visible: (0, _isEqual2.default)(visible, _constants.DEFAULT_VISIBLE) ? undefined : visible,
      children: children
    };
  };

  var addChild = function addChild(child) {
    var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

    var clampedPosition = (0, _utils.clamp)(position, 0, children.length);

    children.splice(clampedPosition, 0, child);
    getSharedInterface(child).updateParent(container);

    return true;
  };

  var removeChild = function removeChild(child) {
    var childIndex = children.indexOf(child);

    if (~childIndex) {
      children.splice(childIndex, 1);
      getSharedInterface(child).updateParent(null);
      return true;
    }

    return false;
  };

  (0, _assign2.default)(container, {
    /**
     *
     * @type {string}
     * @memberOf! Container#
     */
    get type() {
      return type;
    },
    /**
     * Container's children
     * @member {SceneNode[]}
     * @memberof Container#
     */
    get children() {
      return [].concat(_toConsumableArray(children));
    },
    toJSON: toJSON
  });

  (0, _assign2.default)(getSharedInterface(container), {
    insert: insert,
    remove: remove,
    addChild: addChild,
    removeChild: removeChild
  });
};

exports.default = (0, _compose.compose)((0, _compose.defaultProps)(function () {
  return {
    children: []
  };
}), (0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  getSharedInterface: _shared2.default
}), _sceneNode2.default, Container);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(26),
    isIterateeCall = __webpack_require__(233);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseModelDescription = exports.parseBasicModelDescription = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

var _constants = __webpack_require__(4);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var scaleReferencePose = function scaleReferencePose(pose) {
  var scaledPose = (0, _clone2.default)(pose);
  scaledPose.position.x *= _constants.REFERENCE_POSE_SCALE_FACTOR;
  scaledPose.position.y *= _constants.REFERENCE_POSE_SCALE_FACTOR;
  scaledPose.position.z *= _constants.REFERENCE_POSE_SCALE_FACTOR;
  return scaledPose;
};

var parseMaterial = function parseMaterial(_ref) {
  var id = _ref.id,
      name = _ref.name,
      resourcePackId = _ref.resource_pack,
      options = _ref.options,
      materialSystem = _ref.material_system;
  return {
    id: id,
    name: name,
    resourcePackId: resourcePackId,
    options: options,
    materialSystem: materialSystem
  };
};

var parseReference = function parseReference(_ref2) {
  var UID = _ref2.UID,
      name = _ref2.name,
      pose = _ref2.pose,
      version = _ref2.version;
  return {
    id: UID,
    name: name,
    pose: scaleReferencePose(pose),
    version: Number.parseInt(version)
  };
};

var parseImage = function parseImage(url) {
  return { name: '', url: url, tags: [] };
};

var parseDefaultInteraction = function parseDefaultInteraction(_ref3) {
  var orientation = _ref3.orientation,
      moveable = _ref3.moveable,
      move = _ref3.move,
      rotate = _ref3.rotate,
      scalable = _ref3.scalable;
  return {
    interactionPlane: orientation || 'horizontal',
    translation: moveable || move,
    rotation: rotate === 'y',
    scaling: scalable
  };
};

var parseBasicModelDescription = exports.parseBasicModelDescription = function parseBasicModelDescription(description) {
  return {
    id: description.id,
    foreignKey: description.foreignKey || description.foreign_key || '',
    version: description.version,
    name: description.name || '',
    type: description.type,
    tags: [].concat(_toConsumableArray(description.tags || [])),
    imageUrl: _coreInterface2.default.resolveUrl('/Models/Images/' + description.id + '.png'),
    resources: [].concat(_toConsumableArray(description.resources || [])).map(function (_ref4) {
      var id = _ref4.id,
          version = _ref4.version;
      return { id: toString(id), version: version };
    })
  };
};

var getDefaultPropertyValues = function getDefaultPropertyValues(materialDescription, parameterDescription) {
  var propertyValues = {};

  materialDescription.filter(function (material) {
    return material.id;
  }).forEach(function (material) {
    return propertyValues[material.id] = material.options[0].id;
  });

  parameterDescription.filter(function (parameter) {
    return parameter.name;
  }).forEach(function (parameter) {
    return propertyValues[parameter.name] = parameter.value.default;
  });

  return propertyValues;
};

var compileProperties = function compileProperties(materialDescription, parameterDescription) {
  var materialProperties = materialDescription.map(function (_ref5) {
    var name = _ref5.id,
        materialSystem = _ref5.materialSystem,
        resourcePackId = _ref5.resourcePackId,
        options = _ref5.options;
    return {
      name: name,
      options: options.map(function (_ref6) {
        var name = _ref6.id,
            thumb = _ref6.thumb;
        return {
          name: name,
          imageUrl: !materialSystem || materialSystem === '1.0' ? _coreInterface2.default.resolveUrl('/Models/Resources/' + resourcePackId + '/' + thumb) : _coreInterface2.default.resolveUrl('/ResourceThumbnails/' + thumb),
          key: name,
          isValid: function isValid() {
            return true;
          }
        };
      }),
      type: 'material', optionType: 'enumerated'
    };
  });

  var geometricProperties = parameterDescription.map(function (_ref7) {
    var name = _ref7.name,
        value = _ref7.value;
    return { name: name, options: _extends({ step: 1 }, value), type: 'geometric', optionType: 'range' };
  });

  return [].concat(_toConsumableArray(materialProperties), _toConsumableArray(geometricProperties));
};

var getWidgetType = function getWidgetType(_ref8) {
  var type = _ref8.type,
      valueType = _ref8.valueType;

  if (type === 'material') {
    return 'thumbnailList';
  } else if (type === 'geometric') {
    if (valueType === 'range') return 'slider';
  }
  return 'list';
};

var compileDisplayTemplate = function compileDisplayTemplate(properties) {
  return properties.map(function (property) {
    return {
      name: property.name,
      properties: [{
        name: property.name,
        widget: getWidgetType(property)
      }]
    };
  });
};

var parseModelDescription = exports.parseModelDescription = function parseModelDescription(description) {
  var _description$data = description.data,
      data = _description$data === undefined ? {} : _description$data,
      _description$material = description.materials,
      materials = _description$material === undefined ? [] : _description$material,
      modelInfo = description.modelInfo,
      _description$modelinf = description.modelinfo,
      modelinfo = _description$modelinf === undefined ? {} : _description$modelinf;
  var _data$animations = data.animations,
      animations = _data$animations === undefined ? {} : _data$animations,
      _data$videos = data.videos,
      videos = _data$videos === undefined ? {} : _data$videos,
      external = data.external,
      _data$galleryImages = data.galleryImages,
      galleryImages = _data$galleryImages === undefined ? external && external.galleryImages || [] : _data$galleryImages,
      _data$parameters = data.parameters,
      parameters = _data$parameters === undefined ? [] : _data$parameters,
      _data$configuration = data.configuration,
      configuration = _data$configuration === undefined ? null : _data$configuration,
      _data$references = data.references,
      references = _data$references === undefined ? [] : _data$references,
      _data$minimap = data.minimap,
      minimap = _data$minimap === undefined ? null : _data$minimap,
      _data$desc = data.desc,
      desc = _data$desc === undefined ? null : _data$desc,
      _data$content = data.content,
      content = _data$content === undefined ? {} : _data$content;


  var materialDescription = (materials || []).map(parseMaterial);
  var properties = compileProperties(materialDescription, parameters);
  var displayTemplate = compileDisplayTemplate(properties);
  var preset = getDefaultPropertyValues(materialDescription, parameters);
  var configurationDescription = {
    displayTemplate: configuration && configuration.dataSource.displayTemplate || displayTemplate,
    properties: configuration && configuration.dataSource.properties || properties,
    preset: configuration && configuration.preset || preset
  };

  var constants = configuration && configuration.dataSource.constants || [];
  constants.forEach(function (_ref9) {
    var _ref9$parts = _ref9.parts,
        parts = _ref9$parts === undefined ? [] : _ref9$parts;
    return parts.forEach(function (foreignKey, index) {
      var propName = 'Constant part #' + (index + 1);
      configurationDescription.properties.unshift({
        name: propName,
        type: 'part',
        valueType: 'enumerated',
        values: [{
          name: 'Default',
          foreignKey: foreignKey
        }]
      });

      configurationDescription.preset[propName] = 'Default';
    });
  });

  Object.entries(animations).forEach(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
        name = _ref11[0],
        animation = _ref11[1];

    return Object.assign(animation, { name: name });
  });
  Object.entries(videos).forEach(function (_ref12) {
    var _ref13 = _slicedToArray(_ref12, 2),
        name = _ref13[0],
        video = _ref13[1];

    return Object.assign(video, { name: name, duration: 0 });
  });

  return _extends({}, parseBasicModelDescription(description), {
    data: data,
    info: modelInfo || modelinfo,
    images: galleryImages.map(parseImage),
    animations: animations,
    videos: videos,
    materialDescription: materialDescription,
    parameterDescription: parameters,
    configurationDescription: configurationDescription,
    content: content,
    references: references.map(parseReference),
    minimap: minimap,
    desc: desc,
    defaultInteraction: parseDefaultInteraction(description)
  });
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstance = exports.update = exports.download = exports.fetchData = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _defaults = __webpack_require__(50);

var _defaults2 = _interopRequireDefault(_defaults);

var _compose = __webpack_require__(2);

var _fetchDescription = __webpack_require__(52);

var _fetchDescription2 = _interopRequireDefault(_fetchDescription);

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _animation = __webpack_require__(239);

var _animation2 = _interopRequireDefault(_animation);

var _modelBase = __webpack_require__(54);

var _modelBase2 = _interopRequireDefault(_modelBase);

var _property = __webpack_require__(125);

var _property2 = _interopRequireDefault(_property);

var _simpleModelInstance = __webpack_require__(279);

var _simpleModelInstance2 = _interopRequireDefault(_simpleModelInstance);

var _video = __webpack_require__(291);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//======================================================================================================================

var fetchData = exports.fetchData = function fetchData(_ref, simpleModel) {
  var id = _ref.id,
      coreInterface = _ref.coreInterface;
  return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var description;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fetchDescription2.default)({ id: id, coreInterface: coreInterface })();

          case 2:
            description = _context.sent;

            Object.assign(simpleModel, { data: description.data, images: description.images });
            return _context.abrupt('return', description);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

var download = exports.download = function download(_ref3) {
  var id = _ref3.id,
      coreInterface = _ref3.coreInterface;
  return function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(listener) {
      var transferId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _generateId2.default)();
      var filteredListener;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              filteredListener = function filteredListener(receivedTransferId, progress) {
                var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                return !skip && // FIXME: remove old transferProgress event from core
                // receivedTransferId === transferId && // FIXME: core is bugged and isn't relaying the transferId back to SL
                listener(Math.min(1, Math.max(0, Number.parseFloat(progress))));
              };

              coreInterface.on('transferProgress', filteredListener);
              _context2.next = 4;
              return coreInterface.call('prepareAllModelAssets', id, '', transferId);

            case 4:
              coreInterface.off('transferProgress', filteredListener);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x, _x2) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var update = exports.update = function update(props, simpleModel) {
  return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var id, version, coreInterface, fetchData, _ref6, newVersion;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = props.id, version = props.version, coreInterface = props.coreInterface, fetchData = props.fetchData;
            _context3.next = 3;
            return coreInterface.call('removeModelDescription', id);

          case 3:
            _context3.next = 5;
            return fetchData();

          case 5:
            _ref6 = _context3.sent;
            newVersion = _ref6.version;

            if (!(newVersion > version)) {
              _context3.next = 12;
              break;
            }

            _context3.next = 10;
            return coreInterface.call('removeModelResources', id);

          case 10:
            props.version = newVersion;
            simpleModel.version = newVersion;

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));
};

var applyToKeys = function applyToKeys(object, fn) {
  return Object.entries(object).reduce(function (object, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        value = _ref8[1];

    object[key] = fn(value);
    return object;
  }, {});
};

var createInstance = exports.createInstance = function createInstance(props, simpleModel) {
  return function () {
    var _ref9 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(instantiationParams, insertionParams) {
      var getSharedInterface, fetchData, SimpleModelInstance, Animation, Video, Property, _ref10, animations, videos, parameterDescription, configurationDescription, properties, displayTemplate, preset, propertyValues, id, instance;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              getSharedInterface = props.getSharedInterface, fetchData = props.fetchData, SimpleModelInstance = props.SimpleModelInstance, Animation = props.Animation, Video = props.Video, Property = props.Property;
              _context4.next = 3;
              return fetchData();

            case 3:
              _ref10 = _context4.sent;
              animations = _ref10.animations;
              videos = _ref10.videos;
              parameterDescription = _ref10.parameterDescription;
              configurationDescription = _ref10.configurationDescription;
              properties = configurationDescription.properties, displayTemplate = configurationDescription.displayTemplate, preset = configurationDescription.preset;
              propertyValues = (0, _defaults2.default)(instantiationParams.propertyValues, preset);
              id = instantiationParams.id || (0, _generateId2.default)();
              instance = SimpleModelInstance(_extends({}, instantiationParams, {
                id: id,
                model: simpleModel,
                animations: applyToKeys(animations, function (_ref11) {
                  var name = _ref11.name,
                      duration = _ref11.duration;
                  return Animation({ name: name, instanceId: id, duration: duration });
                }),
                videos: applyToKeys(videos, function (_ref12) {
                  var name = _ref12.name,
                      duration = _ref12.duration;
                  return Video({ name: name, instanceId: id, duration: duration });
                }),
                properties: properties.map(function (property) {
                  return Property(_extends({}, property, { value: propertyValues[property.name] }));
                }),
                displayTemplate: displayTemplate,
                parameterDescription: parameterDescription,
                preset: preset
              }));


              getSharedInterface(instantiationParams.parent).addChild(instance);
              _context4.next = 15;
              return getSharedInterface(instance).insert(instantiationParams.pose, insertionParams);

            case 15:
              return _context4.abrupt('return', instance);

            case 16:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x5, _x6) {
      return _ref9.apply(this, arguments);
    };
  }();
};

//======================================================================================================================

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  id: 'string',
  foreignKey: 'string',
  name: 'string',
  version: 'number'
}, 'SimpleModel'), (0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  getSharedInterface: _shared2.default,
  Animation: _animation2.default,
  Property: _property2.default,
  SimpleModelInstance: _simpleModelInstance2.default,
  Video: _video2.default
}), (0, _compose.createProps)({
  fetchData: fetchData,
  update: update,
  download: download,
  createInstance: createInstance
}), _modelBase2.default);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatalogItem = undefined;

var _bluebird = __webpack_require__(0);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _deprecate = __webpack_require__(240);

var _deprecate2 = _interopRequireDefault(_deprecate);

var _ifCore = __webpack_require__(76);

var _ifCore2 = _interopRequireDefault(_ifCore);

var _taggable = __webpack_require__(122);

var _taggable2 = _interopRequireDefault(_taggable);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface CatalogItem
 * @extends Taggable
 */

/**
 * @private
 * @param {object} props
 * @param {CatalogItem} catalogItem
 */
var CatalogItem = exports.CatalogItem = function CatalogItem(_ref, catalogItem) {
  var id = _ref.id,
      name = _ref.name,
      imageUrl = _ref.imageUrl,
      isUwp = _ref.isUwp,
      coreInterface = _ref.coreInterface;

  /**
   * @private
   */
  var downloadImage = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var fullSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (isUwp) {
                _context.next = 14;
                break;
              }

              _context.prev = 1;

              if (!catalogItem.children) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return coreInterface.call('prepareCategoryImage', id, '');

            case 5:
              _context.next = 9;
              break;

            case 7:
              _context.next = 9;
              return (0, _ifCore2.default)({
                '^5.1.0': function _() {
                  return fullSize ? coreInterface.call('prepareModelImageLarge', id, '') : coreInterface.call('prepareModelImage', id, '');
                },
                '*': function _() {
                  return coreInterface.call('prepareModelImage', id, '');
                }
              });

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](1);

              console.error(_context.t0);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 11]]);
    }));

    return function downloadImage(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  (0, _assign2.default)(catalogItem, {
    /**
     * System-wide unique identifier
     * @member {string} id
     * @memberOf CatalogItem#
     */
    id: id,
    /**
     * Product or model name
     * @member {string} name
     * @memberOf CatalogItem#
     */
    name: name,
    /**
     * string containing thumbnail URL
     * @member {string} imageUrl
     * @memberOf CatalogItem#
     */
    imageUrl: imageUrl,
    downloadImage: (0, _deprecate2.default)(downloadImage, 'ViewAR API: Warning! Images no longer need to be downloaded before use!')
  });
};

exports.default = (0, _compose.compose)((0, _compose.injectProps)({
  coreInterface: _coreInterface2.default
}), _taggable2.default, CatalogItem);

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Taggable = undefined;

var _intersection = __webpack_require__(241);

var _intersection2 = _interopRequireDefault(_intersection);

var _difference = __webpack_require__(247);

var _difference2 = _interopRequireDefault(_difference);

var _xor = __webpack_require__(248);

var _xor2 = _interopRequireDefault(_xor);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @interface Taggable
 */
var Taggable = exports.Taggable = (0, _compose.compose)(function (_ref, taggable) {
  var tags = _ref.tags;

  (0, _assign2.default)(taggable, {
    /**
     * @member {string[]} tags tags describing the object
     * @memberof Taggable#
     */
    get tags() {
      return [].concat(_toConsumableArray(tags));
    },
    hasAnyTag: hasAnyTag,
    hasAllTags: hasAllTags,
    hasExactTags: hasExactTags
  });

  /**
   * Checks if the object has any of the provided tags.
   * @memberof Taggable#
   * @param {string[]} tags
   * @returns {boolean}
   */
  function hasAnyTag(query) {
    return !!(0, _intersection2.default)(query, tags).length;
  }

  /**
   * Checks if the object has all of the provided tags. The object may have more tags than that.
   * @memberof Taggable#
   * @param {string[]} tags
   * @returns {boolean}
   */
  function hasAllTags(query) {
    return !(0, _difference2.default)(query, tags).length;
  }

  /**
   * Checks if the object has exactly the provided tags, no more or less.
   * @memberof Taggable#
   * @param {string[]} tags
   * @returns {boolean}
   */
  function hasExactTags(query) {
    return !(0, _xor2.default)(query, tags).length;
  }
});

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  tags: 'array'
}, 'Taggable'), Taggable);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(48),
    arrayIncludes = __webpack_require__(77),
    arrayIncludesWith = __webpack_require__(79),
    arrayMap = __webpack_require__(14),
    baseUnary = __webpack_require__(64),
    cacheHas = __webpack_require__(49);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(48),
    arrayIncludes = __webpack_require__(77),
    arrayIncludesWith = __webpack_require__(79),
    cacheHas = __webpack_require__(49),
    createSet = __webpack_require__(250),
    setToArray = __webpack_require__(44);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createProperty = createProperty;

var _compose = __webpack_require__(2);

var _parser = __webpack_require__(252);

var _pattern = __webpack_require__(255);

var _pattern2 = _interopRequireDefault(_pattern);

var _range = __webpack_require__(266);

var _range2 = _interopRequireDefault(_range);

var _property = __webpack_require__(267);

var _property2 = _interopRequireDefault(_property);

var _nullProperty = __webpack_require__(268);

var _nullProperty2 = _interopRequireDefault(_nullProperty);

var _materialProperty = __webpack_require__(269);

var _materialProperty2 = _interopRequireDefault(_materialProperty);

var _partProperty = __webpack_require__(270);

var _partProperty2 = _interopRequireDefault(_partProperty);

var _geometricProperty = __webpack_require__(271);

var _geometricProperty2 = _interopRequireDefault(_geometricProperty);

var _rangeProperty = __webpack_require__(272);

var _rangeProperty2 = _interopRequireDefault(_rangeProperty);

var _enumeratedProperty = __webpack_require__(278);

var _enumeratedProperty2 = _interopRequireDefault(_enumeratedProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//======================================================================================================================
// PROPERTY FACTORY
//======================================================================================================================

function createProperty(jsonSpecification) {
  var type = jsonSpecification.type,
      valueType = jsonSpecification.valueType,
      optionType = jsonSpecification.optionType,
      values = jsonSpecification.values,
      options = jsonSpecification.options,
      _jsonSpecification$ru = jsonSpecification.rules,
      rules = _jsonSpecification$ru === undefined ? [] : _jsonSpecification$ru;

  var factory = (0, _compose.compose)(_property2.default, getPropertyByType(type), getPropertyByValueType(valueType || optionType));

  return factory(_extends({}, jsonSpecification, {
    values: values || options,
    rules: rules.map(createRule)
  }));
}

exports.default = createProperty;


function getPropertyByType(type) {
  switch (type) {
    case 'part':
      return _partProperty2.default;
    case 'material':
      return _materialProperty2.default;
    case 'geometric':
      return _geometricProperty2.default;
    case 'null':
      return _nullProperty2.default;
    default:
      throw new Error(type + ' property type is not valid!');
  }
}

function getPropertyByValueType(valueType) {
  switch (valueType) {
    case 'range':
      return _rangeProperty2.default;
    case 'enumerated':
      return _enumeratedProperty2.default;
    default:
      throw new Error(valueType + ' value type is not valid!');
  }
}

//======================================================================================================================
// RULE FACTORY
//======================================================================================================================

var evaluatorMap = {};

function parseCondition(condition) {
  if (!evaluatorMap[condition]) {
    var parser = (0, _parser.createParser)();
    parser.feed(condition);
    parser.finish();

    if (parser.results.length !== 0) {
      evaluatorMap[condition] = parser.results[0].fn;
    } else {
      throw new Error('Malformed condition: ' + condition);
    }
  }

  return evaluatorMap[condition];
}

function createRule(rule) {
  var evaluate = parseCondition(rule.condition);
  var match = function match() {
    return false;
  };
  var info = {};
  var invert = rule.invert ? function (fn) {
    return function () {
      return !fn.apply(undefined, arguments);
    };
  } : function (fn) {
    return fn;
  };

  if (rule.range || rule.matcherType === 'range') {
    var range = _range2.default.fromRangeExpression(rule.range);
    info = range;
    match = invert(range.matches.bind(range));
  } else if (rule.value || rule.matcherType === 'value') {
    match = invert(function (value) {
      return value && (value === rule.value || value === rule.matcher);
    });
    info = {
      lowerBound: rule.value,
      upperBound: rule.value,
      includeUpperBound: true,
      includeLowerBound: true
    };
  } else if (rule.path || rule.matcherType === 'path') {
    match = invert(function (value) {
      return value === (rule.path || rule.matcher);
    });
    info = {
      path: rule.path
    };
  } else if (rule.pattern || rule.matcherType === 'pattern') {
    var pattern = (0, _pattern2.default)({ expression: rule.pattern || rule.matcher });
    match = invert(pattern.matches.bind(pattern));
  } else {
    throw new Error('Unrecognized matcher type!');
  }

  return {
    match: match,
    info: info,
    evaluate: evaluate
  };
}

/***/ }),
/* 126 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _taggable = __webpack_require__(122);

var _taggable2 = _interopRequireDefault(_taggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface Option
 */
var Option = exports.Option = function Option(_ref, option) {
  var name = _ref.name,
      isNull = _ref.null,
      _ref$key = _ref.key,
      key = _ref$key === undefined ? name : _ref$key,
      foreignKey = _ref.foreignKey,
      foreignKeys = _ref.foreignKeys,
      isValid = _ref.isValid,
      imageUrl = _ref.imageUrl;


  (0, _assign2.default)(option, {
    /**
     * name of the option. used when referencing the option
     * @member {string} name
     * @memberof Option#
     */
    name: name,
    /**
     * unique machine-readable key of the option
     * @member {string} key
     * @memberof Option#
     */
    key: key,
    /**
     * URL to option's thumbnail
     * @member {string} imageUrl
     * @memberof Option#
     */
    imageUrl: imageUrl,
    foreignKey: foreignKey,
    foreignKeys: foreignKeys,
    null: isNull,
    /**
     * checks whether the option is allowed to be selected within given instance configuration
     * @method
     * @name isValid
     * @param {ModelInstance} instance
     * @memberof Option#
     */
    isValid: isValid
  });
};

exports.default = (0, _compose.compose)(_taggable2.default, Option);

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(281),
    createAssigner = __webpack_require__(118);

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

module.exports = mergeWith;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(60),
    eq = __webpack_require__(21);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(282);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(289),
    hasPath = __webpack_require__(290);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(46),
    map = __webpack_require__(295);

/**
 * Creates a flattened array of values by running each element in `collection`
 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [n, n];
 * }
 *
 * _.flatMap([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
function flatMap(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), 1);
}

module.exports = flatMap;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),
/* 134 */
/***/ (function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _constants = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//======================================================================================================================

function getSecureUrl(url) {
  if (url.startsWith('http://')) {
    return _constants.HTTPS_PROXY_URL + url;
  } else {
    return url;
  }
}

var http = function http() {};

Object.assign(http, {
  get: function get(url) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return send.apply(undefined, ['GET', getSecureUrl(url)].concat(_toConsumableArray(args)));
  },
  post: function post(url) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return send.apply(undefined, ['POST', getSecureUrl(url)].concat(_toConsumableArray(args)));
  }
});

exports.default = http;


function send(method, url, data) {
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;


  return new _bluebird2.default(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open(method.toUpperCase(), url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.responseText));
        }
      }
    };

    xhr.timeout = timeout;
    xhr.ontimeout = function (e) {
      reject(new Error('XML HTTP request timed out.'));
    };

    xhr.send(Object.entries(data || {}).map(function (pair) {
      return pair.map(encodeURIComponent).join('=');
    }).join('&'));
  });
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.createProjectManager = createProjectManager;

var _project = __webpack_require__(312);

var _project2 = _interopRequireDefault(_project);

var _authenticationManager = __webpack_require__(83);

var _authenticationManager2 = _interopRequireDefault(_authenticationManager);

var _local = __webpack_require__(81);

var _local2 = _interopRequireDefault(_local);

var _cloud = __webpack_require__(82);

var _cloud2 = _interopRequireDefault(_cloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var projectManager = createProjectManager({ localStorage: _local2.default, cloudStorage: _cloud2.default, authenticationManager: _authenticationManager2.default });
exports.default = projectManager;

/**
 * Object responsible for handling projects. Projects are snapshots of the current state in the scene, which can be stored
 * locally or in the cloud and loaded at a later moment
 *
 * @namespace projectManager
 */

/**
 * @private
 * @returns {projectManager}
 */

function createProjectManager(_ref) {

  /**
   * Fetches a specific project from the cloud
   * @returns {Project} requested Project if found; null otherwise
   * @memberof projectManager#
   */
  var fetchProjectById = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return cloudStorage.read('/public/Projects/' + id + '.json');

            case 3:
              return _context.abrupt('return', _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', null);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 6]]);
    }));

    return function fetchProjectById(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  //======================================================================================================================
  // PRIVILEGED INTERFACE
  //======================================================================================================================

  var updateCloudProjectIndex = function () {
    var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var backup, projectIndex;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!usePublicCloudIndex && !authenticationManager.token)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', false);

            case 2:
              backup = JSON.parse(JSON.stringify(projects.cloud));
              projectIndex = {};
              _context2.prev = 4;
              _context2.next = 7;
              return cloudStorage.read(getCloudIndexPath());

            case 7:
              _context2.t0 = _context2.sent;

              if (_context2.t0) {
                _context2.next = 10;
                break;
              }

              _context2.t0 = {};

            case 10:
              projectIndex = _context2.t0;

              online = true;
              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t1 = _context2['catch'](4);

              online = false;

            case 17:

              Object.values(projects.cloud).forEach(function (project) {
                var id = project.id,
                    name = project.name,
                    info = project.info,
                    timestamp = project.timestamp,
                    localScreenshotUrl = project.localScreenshotUrl,
                    cloudScreenshotUrl = project.cloudScreenshotUrl,
                    storedToCloud = project.storedToCloud,
                    storedLocally = project.storedLocally;


                if (storedToCloud) {
                  projectIndex[project.id] = { id: id, name: name, info: info, timestamp: timestamp, localScreenshotUrl: localScreenshotUrl, cloudScreenshotUrl: cloudScreenshotUrl };
                } else {
                  delete projects.cloud[project.id];
                  delete projectIndex[project.id];
                }
              });

              _context2.prev = 18;
              _context2.next = 21;
              return cloudStorage.write(getCloudIndexPath(), JSON.stringify(projectIndex));

            case 21:
              return _context2.abrupt('return', online = true);

            case 24:
              _context2.prev = 24;
              _context2.t2 = _context2['catch'](18);

              projects.cloud = backup;
              return _context2.abrupt('return', online = false);

            case 28:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 14], [18, 24]]);
    }));

    return function updateCloudProjectIndex() {
      return _ref3.apply(this, arguments);
    };
  }();

  /** @private */


  var readCloudProjectIndex = function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var projectIndex, flags;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!usePublicCloudIndex && !authenticationManager.token)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', false);

            case 2:
              projectIndex = {};
              _context3.prev = 3;
              _context3.next = 6;
              return cloudStorage.read(getCloudIndexPath());

            case 6:
              _context3.t0 = _context3.sent;

              if (_context3.t0) {
                _context3.next = 9;
                break;
              }

              _context3.t0 = {};

            case 9:
              projectIndex = _context3.t0;

              online = true;

              _context3.next = 16;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t1 = _context3['catch'](3);

              online = false;

            case 16:
              flags = {
                storedToCloud: true
              };


              Object.keys(projectIndex).forEach(function (projectId) {
                var project = projects.all[projectId] = projects.all[projectId] || createNewProject(Object.assign(flags, projectIndex[projectId]));

                project.setFlags(flags);
                projects.cloud[projectId] = project;
              });

              return _context3.abrupt('return', online);

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[3, 13]]);
    }));

    return function readCloudProjectIndex() {
      return _ref4.apply(this, arguments);
    };
  }();

  var updateLocalProjectIndex = function () {
    var _ref5 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var backup, projectIndex;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              backup = JSON.parse(JSON.stringify(projects.local));
              projectIndex = {};
              _context4.prev = 2;
              _context4.next = 5;
              return localStorage.read('/Projects/index.json');

            case 5:
              _context4.t0 = _context4.sent;

              if (_context4.t0) {
                _context4.next = 8;
                break;
              }

              _context4.t0 = {};

            case 8:
              projectIndex = _context4.t0;
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t1 = _context4['catch'](2);

              projectIndex = {};

            case 14:

              Object.values(projects.local).forEach(function (project) {
                var id = project.id,
                    name = project.name,
                    info = project.info,
                    timestamp = project.timestamp,
                    localScreenshotUrl = project.localScreenshotUrl,
                    cloudScreenshotUrl = project.cloudScreenshotUrl,
                    storedToCloud = project.storedToCloud,
                    storedLocally = project.storedLocally;


                if (storedLocally) {
                  projectIndex[project.id] = { id: id, name: name, info: info, timestamp: timestamp, localScreenshotUrl: localScreenshotUrl, cloudScreenshotUrl: cloudScreenshotUrl };
                } else {
                  delete projects.local[project.id];
                  delete projectIndex[project.id];
                }
              });

              _context4.prev = 15;
              _context4.next = 18;
              return localStorage.write('/Projects/index.json', JSON.stringify(projectIndex));

            case 18:
              return _context4.abrupt('return', true);

            case 21:
              _context4.prev = 21;
              _context4.t2 = _context4['catch'](15);

              projects.local = backup;
              return _context4.abrupt('return', false);

            case 25:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[2, 11], [15, 21]]);
    }));

    return function updateLocalProjectIndex() {
      return _ref5.apply(this, arguments);
    };
  }();

  /** @private */


  var readLocalProjectIndex = function () {
    var _ref6 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var projectIndex, flags;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              projectIndex = {};
              _context5.prev = 1;
              _context5.next = 4;
              return localStorage.read('/Projects/index.json');

            case 4:
              _context5.t0 = _context5.sent;

              if (_context5.t0) {
                _context5.next = 7;
                break;
              }

              _context5.t0 = {};

            case 7:
              projectIndex = _context5.t0;

              online = true;

              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t1 = _context5['catch'](1);

              online = false;

            case 14:
              flags = {
                storedLocally: true
              };


              Object.keys(projectIndex).forEach(function (projectId) {
                var project = projects.all[projectId] = projects.all[projectId] || createNewProject(Object.assign(flags, projectIndex[projectId]));

                project.setFlags(flags);
                projects.local[projectId] = project;
              });

              return _context5.abrupt('return', online);

            case 17:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 11]]);
    }));

    return function readLocalProjectIndex() {
      return _ref6.apply(this, arguments);
    };
  }();

  var authenticationManager = _ref.authenticationManager,
      localStorage = _ref.localStorage,
      cloudStorage = _ref.cloudStorage;


  var usePublicCloudIndex = false;

  var getCloudIndexPath = function getCloudIndexPath() {
    return usePublicCloudIndex ? '/public/Projects/index.json' : '/' + authenticationManager.token + '/Projects/index.json';
  };

  var projects = {
    local: {},
    cloud: {},
    all: {}
  };

  var online = true;

  var projectManager = {
    createNewProject: createNewProject,
    updateCloudIndex: updateCloudIndex,
    updateLocalProjectIndex: updateLocalProjectIndex,
    updateCloudProjectIndex: updateCloudProjectIndex,
    fetchProjectById: fetchProjectById,
    init: init,

    /**
     * Collection of all user' s projects. Includes projects stored locally and in the cloud.
     * @type {{local: Array<Project>, cloud: Array<Project>, all: Array<Project>}}
     * @memberof projectManager#
     */
    get projects() {
      return projects;
    },

    /**
     * Status about internet connection of the user.
     * @type {boolean}
     * @memberof projectManager#
     */
    get online() {
      return online;
    },

    get usePublicCloudIndex() {
      return usePublicCloudIndex;
    },
    set usePublicCloudIndex(newValue) {
      usePublicCloudIndex = newValue;
    }
  };

  return projectManager;

  //======================================================================================================================
  // INITIALIZATION
  //======================================================================================================================

  /**
   * Downloads projects from the cloud if online and loads projects from local disk.
   * @memberof projectManager#
   */
  function init() {

    Object.assign(projects, {
      local: {},
      cloud: {},
      all: {}
    });

    return (0, _bluebird.all)([readLocalProjectIndex(), readCloudProjectIndex()]);
  }

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Creates a new project
   * @param {Object} specification - specification of the project (name, screenshotUrl, info, data)
   * @returns {Project} the created project
   * @memberof projectManager#
   */
  function createNewProject(specification) {
    return (0, _project2.default)(specification);
  }

  /**
   * Fetches projects from the cloud
   * @returns {boolean} online status of the user
   * @memberof projectManager#
   */
  function updateCloudIndex() {
    return readCloudProjectIndex();
  }
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(89);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.createAppUtils = createAppUtils;

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appUtils = createAppUtils({ coreInterface: _coreInterface2.default });

exports.default = appUtils;

/**
 * @namespace appUtils
 */

function createAppUtils(specification) {
  var coreInterface = specification.coreInterface;


  var appUtils = Object.assign({
    closeApp: closeApp,

    pauseRenderLoop: pauseRenderLoop,
    resumeRenderLoop: resumeRenderLoop,

    getAuthentication: getAuthentication,
    setAuthentication: setAuthentication,

    httpPost: httpPost,
    openUrl: openUrl,
    prepareCustomImage: prepareCustomImage,
    sendEmail: sendEmail,
    setCollisionMode: setCollisionMode,
    setTextureQuality: setTextureQuality,
    getSecureUrl: getSecureUrl,
    getCachedUrl: getCachedUrl
  });

  return appUtils;

  //======================================================================================================================
  // METHODS
  //======================================================================================================================

  /**
   * Sends an HTTP POST request
   * @param {string} url target URL
   * @param {object} args POST arguments (parameters)
   * @returns {Promise}
   * @memberof appUtils#
   */
  function httpPost(url, args) {
    return coreInterface.call('httpPost', url, args).then(function (jobId) {
      return new _bluebird2.default(function (resolve, reject) {
        coreInterface.on('httpPostResult', httpPostResultHandler);

        function httpPostResultHandler(incomingId, success, result) {
          if (incomingId === jobId) {
            coreInterface.off('httpPostResult', httpPostResultHandler);
            if (!success) {
              reject(new Error('Error in httpPost: ' + result));
            } else {
              resolve(result);
            }
          }
        }
      });
    });
  }

  /**
   * Gets the RAM info of the device
   * @returns {Promise}
   * @memberof appUtils#
   */
  function getDeviceRamInfo() {
    return coreInterface.call('getDeviceRamInfo');
  }

  /**
   * Sets the global texture quality to be used by the engine.
   * @param {!string} quality
   * @param {boolean} [reloadScene=true] - flag that specifies if the whole scene should be updated to the given quality
   * @returns {Promise}
   * @memberof appUtils#
   */
  function setTextureQuality(quality) {
    var reloadScene = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    return (0, _bluebird.resolve)().then(function () {
      if (['low', 'medium', 'high', 'nextlower', 'nexthigher'].includes(quality)) {
        return coreInterface.call('setTextureQuality', quality, !!reloadScene);
      } else {
        throw new Error('Texture quality must be either "high", "medium", "low", "nextlower", or "nexthigher"!');
      }
    });
  }

  /**
   * Sets the mode for the collision system.
   *
   * Valid flags:
   *  0 (COLLISION_DISABLED)
   *  1 (COLLISION_ENABLED)
   *  2 (COLLISION_NOTIFICATION)
   */
  function setCollisionMode(collisionMode) {
    return coreInterface.call('setCollisionMode', collisionMode);
  }

  /**
   * Opens the given URL in the device's browser. The app will go into background.
   *
   * @param {string} url - URL to be opened
   * @memberof appUtils#
   */
  function openUrl(url) {
    coreInterface.emit('openInExternalBrowser', url);
  }

  /**
   * Downloads an image under the given URL.
   *
   * @param {string} fileName - file name to save the image under
   * @param {string} url - image location
   * @returns {Promise.<string>} path to the downloaded image
   * @memberof appUtils#
   */
  function prepareCustomImage(fileName, url) {
    return coreInterface.call('prepareCustomImage', fileName, url, '');
  }

  /**
   * Opens the devices email client/form and fills it with the given data.
   *
   * @param {EmailObject} emailObject - object containing email data
   * @returns {Promise}
   * @memberof appUtils#
   */
  function sendEmail(emailObject) {
    return coreInterface.call('sendEmail', JSON.stringify(emailObject));
  }

  /**
   * Pauses the main render loop of the 3D engine. Freezes the engine output, but not the user interface, which remains
   * functional as usual. Any changes in the state of the app will not be redrawn until the render loop is resumed. This
   * frees up a lot of resources and may improve performance of background tasks such as download and insertion.
   * This method is idempotent.
   *
   * @returns {Promise}
   * @memberof appUtils#
   */
  function pauseRenderLoop() {
    return coreInterface.call('pauseRenderLoop');
  }

  /**
   * Resumes the render loop, allowing changes in the app state to be redrawn. Note that it might cause a delay if new
   * objects had been inserted into scene during the pause.
   * This method is idempotent.
   *
   * @returns {Promise}
   * @memberof appUtils#
   */
  function resumeRenderLoop() {
    return coreInterface.call('resumeRenderLoop');
  }

  /**
   * Takes the given url and adds the https proxy in front of it. If a url uses already the https protocol or if
   * the url is no http url the unchanged url is returned.
   *
   * @param {string} url - the url to secure
   * @returns {string} a secure url
   */
  function getSecureUrl(url) {
    var httpsProxyUrl = 'https://www.viewar.com/proxy2.php?url=';

    if (url.startsWith('http://')) {
      return httpsProxyUrl + url;
    } else {
      return url;
    }
  }

  /**
   * Persistently stores an authentication key. The purpose of this key is arbitrary and fully depends on the app logic.
   * The key persists between app executions and can be retrieved using {@link getAuthentication} function.
   *
   * @param {string} authKey
   * @returns {Promise}
   * @memberof appUtils#
   */
  function setAuthentication(authKey) {
    return coreInterface.call('setAuthKey', authKey);
  }

  /**
   * Retrieves the authentication key stored using {@link setAuthentication} function.
   *
   * @returns {Promise}
   * @memberof appUtils#
   */
  function getAuthentication() {
    return coreInterface.call('getAuthKey');
  }

  /**
   * Sends a shutdown signal to the app. Used for device platforms that do not normally close running apps via task
   * manager. Works on Windows platform only.
   *
   * @returns {Promise}
   * @memberof appUtils#
   */
  function closeApp() {
    coreInterface.emit('closeAR');
    return (0, _bluebird.resolve)();
  }

  function getCachedUrl(url) {
    return ['Emscripten', 'Mock'].includes(coreInterface.platform) ? url : 'coui://' + encodeURIComponent(url);
  }
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createRoomManager = createRoomManager;

var _uniq = __webpack_require__(80);

var _uniq2 = _interopRequireDefault(_uniq);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _modelManager = __webpack_require__(27);

var _modelManager2 = _interopRequireDefault(_modelManager);

var _utils = __webpack_require__(6);

var _constants = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ROOM_ID = 'RoomLayout';

var roomManager = createRoomManager({ coreInterface: _coreInterface2.default, modelManager: _modelManager2.default });
exports.default = roomManager;

/**
 * Object responsible for handling 3D representations of indoor environments. This environments exists separately from
 * the rest of the scene.
 *
 * @namespace roomManager
 */

/**
 * @private
 * @returns {roomManager}
 */

function createRoomManager(_ref) {
  var init = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var treeModel, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              treeModel = modelManager.findModelByForeignKey(_constants.MATERIAL_MODEL_FOREIGN_KEY);
              _context.t0 = treeModel;

              if (_context.t0) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return modelManager.fetchModelFromRepository(_constants.MATERIAL_MODEL_FALLBACK_ID);

            case 5:
              _context.t0 = _context.sent;

            case 6:
              model = _context.t0;
              _context.t1 = _utils.compileMaterialInfo;
              _context.t2 = coreInterface;
              _context.t3 = _utils.sanitizeModelDescription;
              _context.next = 12;
              return coreInterface.call('prepareModelDescription', model.id);

            case 12:
              _context.t4 = _context.sent;
              _context.t5 = (0, _context.t3)(_context.t4).materialDescription;
              materialDescription = (0, _context.t1)(_context.t2, _context.t5);


              wallObjectModels = modelManager.models.filter(function (model) {
                return model.hasAnyTag(['window', 'door']);
              });

              if (wallObjectModels.length) {
                _context.next = 46;
                break;
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 20;
              _iterator = _constants.WALL_OBJECT_MODEL_FALLBACK_IDS[Symbol.iterator]();

            case 22:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 32;
                break;
              }

              id = _step.value;
              _context.t6 = wallObjectModels;
              _context.next = 27;
              return modelManager.getModelFromRepository(id);

            case 27:
              _context.t7 = _context.sent;

              _context.t6.push.call(_context.t6, _context.t7);

            case 29:
              _iteratorNormalCompletion = true;
              _context.next = 22;
              break;

            case 32:
              _context.next = 38;
              break;

            case 34:
              _context.prev = 34;
              _context.t8 = _context['catch'](20);
              _didIteratorError = true;
              _iteratorError = _context.t8;

            case 38:
              _context.prev = 38;
              _context.prev = 39;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 41:
              _context.prev = 41;

              if (!_didIteratorError) {
                _context.next = 44;
                break;
              }

              throw _iteratorError;

            case 44:
              return _context.finish(41);

            case 45:
              return _context.finish(38);

            case 46:
              ;

            case 47:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[20, 34, 38, 46], [39,, 41, 45]]);
    }));

    return function init() {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Prepares the necessary resources for wall and floor representation
   * @function
   * @returns {Promise} resolved when done
   * @memberof roomManager#
   */


  var initResources = function () {
    var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, wallObjectModel;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return model.download();

            case 2:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 5;
              _iterator2 = wallObjectModels[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 14;
                break;
              }

              wallObjectModel = _step2.value;
              _context2.next = 11;
              return wallObjectModel.downloadDescription();

            case 11:
              _iteratorNormalCompletion2 = true;
              _context2.next = 7;
              break;

            case 14:
              _context2.next = 20;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2['catch'](5);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 20:
              _context2.prev = 20;
              _context2.prev = 21;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 23:
              _context2.prev = 23;

              if (!_didIteratorError2) {
                _context2.next = 26;
                break;
              }

              throw _iteratorError2;

            case 26:
              return _context2.finish(23);

            case 27:
              return _context2.finish(20);

            case 28:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[5, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function initResources() {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * Toggles indoor environment visibility.
   * @param {boolean} newVisible
   * @returns {Promise} resolved when done
   * @memberof roomManager#
   */


  /**
   * Instantiates the indoor environment according to the passed description. If a falsy value is passed the current
   * environment is removed from the scene.
   * @function
   * @param {object|null} newRoomDescription environment
   * @returns {Promise} resolved when instantiated
   * @memberof roomManager#
   */
  var addRoomToScene = function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var newRoomDescription = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _roomDescription, Windows, Doors, modelIds, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, modelId, modelToDownload;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (newRoomDescription) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', removeRoomFromScene());

            case 2:
              _roomDescription = roomDescription = newRoomDescription, Windows = _roomDescription.Windows, Doors = _roomDescription.Doors;
              modelIds = (0, _uniq2.default)([].concat(_toConsumableArray(Windows), _toConsumableArray(Doors)).map(function (object) {
                return object.modelID;
              }));
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context3.prev = 7;
              _iterator3 = modelIds[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context3.next = 19;
                break;
              }

              modelId = _step3.value;
              _context3.next = 13;
              return modelManager.getModelFromRepository(modelId);

            case 13:
              modelToDownload = _context3.sent;
              _context3.next = 16;
              return modelToDownload.download();

            case 16:
              _iteratorNormalCompletion3 = true;
              _context3.next = 9;
              break;

            case 19:
              _context3.next = 25;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3['catch'](7);
              _didIteratorError3 = true;
              _iteratorError3 = _context3.t0;

            case 25:
              _context3.prev = 25;
              _context3.prev = 26;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 28:
              _context3.prev = 28;

              if (!_didIteratorError3) {
                _context3.next = 31;
                break;
              }

              throw _iteratorError3;

            case 31:
              return _context3.finish(28);

            case 32:
              return _context3.finish(25);

            case 33:
              _context3.next = 35;
              return model.download();

            case 35:
              _context3.next = 37;
              return coreInterface.call('parseRoomDescription', _extends({}, newRoomDescription, { materialsModelId: model.id }));

            case 37:
              _context3.next = 39;
              return coreInterface.call('addRoomToScene');

            case 39:

              newRoomDescription.materialsModelId = model.id;

            case 40:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[7, 21, 25, 33], [26,, 28, 32]]);
    }));

    return function addRoomToScene(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  /**
   * Removes the indoor environment from the scene.
   * @returns {Promise} resolved when done
   * @memberof roomManager#
   */


  var coreInterface = _ref.coreInterface,
      modelManager = _ref.modelManager;

  var roomDescription = null;
  var model = null;
  var materialDescription = null;
  var wallObjectModels = null;
  var roomVisible = null;

  var roomManager = {
    init: init,

    /**
     * current environment visibility
     * @type {boolean}
     * @memberof roomManager#
     */
    get roomVisible() {
      return roomVisible;
    },

    /**
     * wall and floor material description
     * @type {object|null}
     * @memberof roomManager#
     */
    get roomMaterialDescription() {
      return materialDescription;
    },

    /**
     * environment description
     * @type {boolean}
     * @memberof roomManager#
     */
    get roomDescription() {
      return roomDescription;
    },

    /**
     * wall object models
     * @type {boolean}
     * @memberof roomManager#
     */
    get wallObjectModels() {
      return wallObjectModels;
    },

    addRoomToScene: addRoomToScene,
    removeRoomFromScene: removeRoomFromScene,
    setRoomVisible: setRoomVisible,
    initResources: initResources
  };

  return roomManager;

  function setRoomVisible(newVisible) {
    roomVisible = newVisible;
    return coreInterface.call('setNodeVisibility', ROOM_ID, !!newVisible);
  }function removeRoomFromScene() {
    roomDescription = null;
    return coreInterface.call('removeRoomFromScene');
  }
}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VrCamera = undefined;

var _bluebird = __webpack_require__(0);

var _compose = __webpack_require__(2);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

var _constants = __webpack_require__(4);

var _cameraBase = __webpack_require__(85);

var _cameraBase2 = _interopRequireDefault(_cameraBase);

var _arCamera = __webpack_require__(84);

var _arCamera2 = _interopRequireDefault(_arCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Uses camera sensors and joystick input to provide a first-person VR experience. Behaves like a first-person camera in
 * computer games (i.e. has no roll).
 *
 * @interface VrCamera
 * @extends Camera
 */
var VrCamera = exports.VrCamera = function VrCamera(props, vrCamera) {

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  var init = function () {
    var _ref = (0, _bluebird.method)(function () {
      available = appConfig.stageList.includes(stageName);
      if (appConfig.stageList[0] === stageName) {
        cameraController.activeCamera = _arCamera2.default;
      }
    });

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  var activate = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!available) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return coreInterface.call('activateStage', stageName);

            case 3:
              cameraController.activeCamera = vrCamera;
              _context.next = 7;
              break;

            case 6:
              throw new Error('ViewAR API: Error! vrCamera is not available! Check your app configuration!');

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function activate() {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Enables the gyroscope for this camera.
   * @async
   * @function VrCamera#enableGyroscope
   * @returns {Promise} resolved on completion.
   */


  var appConfig = props.appConfig,
      pose = props.pose,
      stageName = props.stageName,
      cameraController = props.cameraController,
      coreInterface = props.coreInterface;

  var gyroscopeActive = true;
  var available = false;

  (0, _assign2.default)(vrCamera, {
    init: init,
    activate: activate,

    enableGyroscope: enableGyroscope,
    disableGyroscope: disableGyroscope,
    translate: translate,
    rotate: rotate,

    get pose() {
      return (0, _clone2.default)(pose);
    },
    get gyroscopeActive() {
      return gyroscopeActive;
    }
  });function enableGyroscope() {
    return gyroscopeActive ? (0, _bluebird.resolve)() : coreInterface.call('enableGyroscopeForExperienceStage').then(function () {
      return gyroscopeActive = true;
    });
  }

  /**
   * Disables the gyroscope for this camera.
   * @async
   * @function VrCamera#disableGyroscope
   * @returns {Promise} resolved on completion.
   */
  function disableGyroscope() {
    return !gyroscopeActive ? (0, _bluebird.resolve)() : coreInterface.call('disableGyroscopeForExperienceStage').then(function () {
      return gyroscopeActive = false;
    });
  }

  /**
   * Translates the camera using joystick input
   * @async
   * @function VrCamera#translate
   * @param {Vector3d} joystick axis values
   */
  function translate(controllerInputVector) {
    coreInterface.emit('translateCamera', controllerInputVector);
  }

  /**
   * Rotates the camera using joystick input
   * @async
   * @function VrCamera#rotate
   * @param {Vector3d} joystick axis values
   */
  function rotate(controllerInputVector) {
    coreInterface.emit('rotateCamera', controllerInputVector);
  }
};

/**
 * @type {VrCamera}
 */
var vrCamera = (0, _compose.compose)((0, _compose.defaultProps)(function () {
  return (0, _clone2.default)(_constants.VR_CAMERA_DEFAULTS);
}), _cameraBase2.default, VrCamera)();

exports.default = vrCamera;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.perspectiveCamera = exports.vrCamera = exports.arCamera = exports.roomManager = exports.projectManager = exports.sceneManager = exports.modelManager = exports.screenshotManager = exports.syncManager = exports.coreInterface = exports.logger = exports.appUtils = exports.init = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var init = exports.init = function () {
  var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var apiConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _global2.default;
    var startTime, version, requiredCoreVersion, trackers, endTime;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!initialized) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', viewarApi);

          case 2:
            if (!apiConfig.waitForDebugger) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return (0, _ui.waitForDebugger)(global);

          case 5:
            startTime = Date.now();


            _logger3.default.info('ViewAR API: v' + _package2.default.version);
            _logger3.default.info('ViewAR API: Initializing...');

            Object.assign(_config2.default, apiConfig);

            _context.next = 11;
            return _coreInterface3.default.initialize(viewarApi);

          case 11:
            _context.t0 = Object;
            _context.t1 = _appConfig2.default;
            _context.next = 15;
            return fetchAppConfig(_package2.default, _coreInterface3.default);

          case 15:
            _context.t2 = _context.sent;

            _context.t0.assign.call(_context.t0, _context.t1, _context.t2);

            version = _appConfig2.default.version;


            _logger3.default.info('ViewAR API: Detected platform ' + _coreInterface3.default.platform);
            _logger3.default.info('ViewAR API: Using ViewAR Core v' + version.core);

            requiredCoreVersion = _package2.default.dependencies['viewar-core'];

            if (!_semver2.default.satisfies(version.core, requiredCoreVersion)) {
              _logger3.default.error('ViewAR API: Error! The core version ' + version.core + ' is not compatible with the required core version ' + requiredCoreVersion + '!');
            }

            if (!(_appConfig2.default.fakedBundle && _coreInterface3.default.platform !== 'iOS')) {
              _context.next = 26;
              break;
            }

            _context.next = 25;
            return (0, _ui.waitForSwitchBundleId)(global, _coreInterface3.default, _appConfig2.default.appId);

          case 25:
            (0, _ui.showFakedBundleOverlay)(global);

          case 26:
            if (!_appConfig2.default.update) {
              _context.next = 29;
              break;
            }

            _context.next = 29;
            return (0, _ui.waitForAppUpdate)(global, _appConfig2.default.update);

          case 29:
            trackers = (0, _trackers2.default)({ trackerList: _appConfig2.default.trackerList });

            Object.assign(viewarApi.trackers, trackers);

            _modelManager3.default.init(_appConfig2.default.modelTree);
            _sceneManager3.default.init();

            _context.next = 35;
            return _arCamera3.default.init();

          case 35:
            _context.next = 37;
            return _vrCamera3.default.init();

          case 37:
            _context.next = 39;
            return _perspectiveCamera3.default.init();

          case 39:
            _context.next = 41;
            return _projectManager3.default.init();

          case 41:
            if (!(_coreInterface3.default.platform !== 'UWP')) {
              _context.next = 44;
              break;
            }

            _context.next = 44;
            return _roomManager3.default.init();

          case 44:
            if (!(_appConfig2.default.deviceRam < _constants.LOW_MEMORY_LIMIT)) {
              _context.next = 49;
              break;
            }

            _context.next = 47;
            return _appUtils3.default.setTextureQuality('low', false);

          case 47:
            _context.next = 52;
            break;

          case 49:
            if (!(_appConfig2.default.deviceRam < _constants.MEDIUM_MEMORY_LIMIT)) {
              _context.next = 52;
              break;
            }

            _context.next = 52;
            return _appUtils3.default.setTextureQuality('medium', false);

          case 52:
            if (!(_coreInterface3.default.platform === 'Android')) {
              _context.next = 55;
              break;
            }

            _context.next = 55;
            return _vrCamera3.default.disableGyroscope();

          case 55:

            if (apiConfig.exportToGlobal) {
              global.api = viewarApi;
              global.viewarApi = viewarApi;
            }

            initialized = true;

            endTime = Date.now();

            _logger3.default.info('ViewAR API: Initialized in ' + (endTime - startTime).toFixed(0) + 'ms');

            return _context.abrupt('return', viewarApi);

          case 60:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _semver = __webpack_require__(56);

var _semver2 = _interopRequireDefault(_semver);

var _constants = __webpack_require__(4);

var _ui = __webpack_require__(144);

var _utils = __webpack_require__(6);

var _global = __webpack_require__(47);

var _global2 = _interopRequireDefault(_global);

var _coreInterface2 = __webpack_require__(3);

var _coreInterface3 = _interopRequireDefault(_coreInterface2);

var _sceneManager2 = __webpack_require__(115);

var _sceneManager3 = _interopRequireDefault(_sceneManager2);

var _modelManager2 = __webpack_require__(27);

var _modelManager3 = _interopRequireDefault(_modelManager2);

var _local = __webpack_require__(81);

var _local2 = _interopRequireDefault(_local);

var _cloud = __webpack_require__(82);

var _cloud2 = _interopRequireDefault(_cloud);

var _projectManager2 = __webpack_require__(136);

var _projectManager3 = _interopRequireDefault(_projectManager2);

var _roomManager2 = __webpack_require__(139);

var _roomManager3 = _interopRequireDefault(_roomManager2);

var _appUtils2 = __webpack_require__(138);

var _appUtils3 = _interopRequireDefault(_appUtils2);

var _syncManager2 = __webpack_require__(313);

var _syncManager3 = _interopRequireDefault(_syncManager2);

var _authenticationManager = __webpack_require__(83);

var _authenticationManager2 = _interopRequireDefault(_authenticationManager);

var _screenshotManager2 = __webpack_require__(314);

var _screenshotManager3 = _interopRequireDefault(_screenshotManager2);

var _versionInfo = __webpack_require__(74);

var _versionInfo2 = _interopRequireDefault(_versionInfo);

var _package = __webpack_require__(114);

var _package2 = _interopRequireDefault(_package);

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _appConfig = __webpack_require__(19);

var _appConfig2 = _interopRequireDefault(_appConfig);

var _logger2 = __webpack_require__(30);

var _logger3 = _interopRequireDefault(_logger2);

var _arCamera2 = __webpack_require__(84);

var _arCamera3 = _interopRequireDefault(_arCamera2);

var _perspectiveCamera2 = __webpack_require__(316);

var _perspectiveCamera3 = _interopRequireDefault(_perspectiveCamera2);

var _vrCamera2 = __webpack_require__(140);

var _vrCamera3 = _interopRequireDefault(_vrCamera2);

var _trackers = __webpack_require__(317);

var _trackers2 = _interopRequireDefault(_trackers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//======================================================================================================================

_bluebird.config && (0, _bluebird.config)({
  longStackTraces: false,
  cancellation: true
});

var initialized = false;

var viewarApi = {
  init: init,
  coreInterface: _coreInterface3.default,
  screenshotManager: _screenshotManager3.default,
  authenticationManager: _authenticationManager2.default,

  appUtils: _appUtils3.default,
  modelManager: _modelManager3.default,
  sceneManager: _sceneManager3.default,
  roomManager: _roomManager3.default,
  projectManager: _projectManager3.default,
  syncManager: _syncManager3.default,

  appConfig: _appConfig2.default,
  logger: _logger3.default,
  versionInfo: _versionInfo2.default,

  cameras: {
    perspectiveCamera: _perspectiveCamera3.default,
    arCamera: _arCamera3.default,
    vrCamera: _vrCamera3.default,
    augmentedRealityCamera: _arCamera3.default,
    walkCamera: _vrCamera3.default
  },
  trackers: {},
  storage: {
    local: _local2.default,
    cloud: _cloud2.default
  }
};

function fetchAppConfig(_ref2, coreInterface) {
  var version = _ref2.version;

  return (0, _bluebird.all)([coreInterface.call('getScenarioConfig').then(_utils.parseScenarioConfig), coreInterface.call('prepareAppData').then(function (_ref3) {
    var tree = _ref3.tree;
    return (0, _utils.sanitizeModelTree)({ children: tree, data: {}, id: 'Root', name: 'Root Category' });
  }), coreInterface.call('getDeviceRamInfo').then(function (_ref4) {
    var total = _ref4.total;
    return total;
  }), coreInterface.call('getFreezeFrameList'), coreInterface.call('getSDKVersionNumber')]).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 5),
        appConfig = _ref6[0],
        modelTree = _ref6[1],
        deviceRam = _ref6[2],
        freezeFrameInfo = _ref6[3],
        coreVersion = _ref6[4];

    return _extends({}, appConfig, {
      modelTree: modelTree,
      deviceRam: deviceRam,
      freezeFrameInfo: freezeFrameInfo,
      version: Object.assign(_versionInfo2.default, {
        app: appConfig.version,
        api: version,
        core: coreVersion
      })
    });
  });
}

exports.appUtils = _appUtils3.default;
exports.logger = _logger3.default;
exports.coreInterface = _coreInterface3.default;
exports.syncManager = _syncManager3.default;
exports.screenshotManager = _screenshotManager3.default;
exports.modelManager = _modelManager3.default;
exports.sceneManager = _sceneManager3.default;
exports.projectManager = _projectManager3.default;
exports.roomManager = _roomManager3.default;
exports.arCamera = _arCamera3.default;
exports.vrCamera = _vrCamera3.default;
exports.perspectiveCamera = _perspectiveCamera3.default;
exports.default = viewarApi;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(143);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32), __webpack_require__(55)))

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.waitForDebugger = waitForDebugger;
exports.waitForAppUpdate = waitForAppUpdate;
exports.showFakedBundleOverlay = showFakedBundleOverlay;
exports.waitForSwitchBundleId = waitForSwitchBundleId;

var _uiStyles = __webpack_require__(145);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//======================================================================================================================
// UI
//======================================================================================================================

function waitForDebugger(window) {
  return (0, _bluebird.resolve)().then(function () {

    var requireMockEngine = !window.engine;
    var document = window.document;
    var appContainer = document.getElementsByTagName('body')[0];
    var element = document.createElement('button');
    element.classList.add('WaitForDebugger');
    Object.assign(element.style, _uiStyles.WAIT_FOR_DEBUGGER_BUTTON_STYLE);
    element.innerHTML = 'App debug mode enabled.';

    window.engine = requireMockEngine && { checkClickThrough: function checkClickThrough() {
        return "Y";
      } } || window.engine;

    appContainer.appendChild(element);

    return new _bluebird2.default(function (resolve) {
      element.onclick = handleTap;
      element.ontouchstart = handleTap;

      function handleTap(event) {
        if (requireMockEngine) {
          delete window.engine;
        }
        event.stopImmediatePropagation();
        event.preventDefault();
        appContainer.removeChild(element);
        resolve();
      }
    });
  });
}

function waitForAppUpdate(window, update) {
  var document = window.document;
  var forceUpdate = update === 'forced';
  var updateText = 'New update available!';
  var forceText = 'You need to update the app via your app store to continue.';
  var recommendedText = 'It is recommended to update this app via your app store.';

  var updatePopup = document.createElement('div');
  updatePopup.classList.add('UpdateBundlePopup');
  Object.assign(updatePopup.style, _uiStyles.UPDATE_POPUP_STYLE);
  document.body.appendChild(updatePopup);

  var updateLabel = document.createElement('div');
  updateLabel.classList.add('UpdateBundlePopup-label');
  updateLabel.innerHTML = updateText;
  Object.assign(updateLabel.style, _uiStyles.UPDATE_POPUP_LABEL_STYLE);
  updatePopup.appendChild(updateLabel);

  var detailLabel = document.createElement('div');
  detailLabel.classList.add('UpdateBundlePopup-label');
  detailLabel.innerHTML = forceUpdate ? forceText : recommendedText;
  Object.assign(detailLabel.style, _uiStyles.UPDATE_POPUP_UPDATE_LABEL_STYLE);
  updatePopup.appendChild(detailLabel);

  if (!forceUpdate) {
    var confirmButton = document.createElement('div');
    confirmButton.classList.add('UpdateBundlePopup-button');
    confirmButton.innerHTML = 'OK';
    Object.assign(confirmButton.style, _uiStyles.CONFIRM_BUTTON_STYLE);
    updatePopup.appendChild(confirmButton);

    return new _bluebird2.default(function (resolve) {
      confirmButton.onclick = handleConfirmTap;
      confirmButton.ontouchstart = handleConfirmTap;

      function handleConfirmTap(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        document.body.removeChild(updatePopup);
        resolve();
      }
    });
  } else {
    return new _bluebird2.default(function () {});
  }
}

function showFakedBundleOverlay(window) {
  var document = window.document;
  var appContainer = document.getElementsByTagName('body')[0];
  var element = document.createElement('div');
  var line1 = document.createElement('div');
  var lineWidth = 40;
  Object.assign(element.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-1',
    width: '1024px',
    height: '768px',
    opacity: '0.2',
    pointerEvents: 'none',
    transform: 'scale(' + lineWidth + ')'
  });
  Object.assign(line1.style, {
    position: 'absolute',
    width: '1280px',
    height: '1px',
    borderBottom: '1px solid red',
    transform: 'translate(-50%, -50%) rotate(37deg)',
    left: '50%',
    top: '50%'
  });
  var line2 = line1.cloneNode();
  Object.assign(line2.style, {
    transform: 'translate(-50%, -50%) rotate(-37deg)'
  });
  element.appendChild(line1);
  element.appendChild(line2);
  //appContainer.appendChild(element); //For now we wont add an overlay to faked app.
}

function waitForSwitchBundleId(window, coreInterface, bundleId) {
  return (0, _bluebird.resolve)().then(function () {
    var document = window.document;
    var appContainer = document.getElementsByTagName('body')[0];
    var bundlePopup = document.createElement('div');
    var bundlePopupButtons = document.createElement('div');
    var inputLabel = document.createElement('label');
    var input = document.createElement('input');
    var confirmButton = document.createElement('div');

    Object.assign(bundlePopup.style, {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '15px',
      textAlign: 'center',
      padding: '40px 40px 90px 45px',
      borderRadius: '5px',
      zIndex: '1000000'
    });

    Object.assign(inputLabel.style, {
      fontSize: '1em',
      lineHeight: '1em',
      paddingRight: '20px',
      color: 'white'
    });
    inputLabel.innerHTML = 'You are testing the bundle \"' + bundleId + '\"';

    Object.assign(input.style, {
      height: '1.2em',
      display: 'none',
      width: '200px',
      marginTop: '25px'
    });
    input.type = 'text';
    input.value = '';

    Object.assign(bundlePopupButtons.style, {
      transform: 'translateX(-50%)',
      left: '50%',
      position: 'absolute',
      margin: '15px 0',
      display: 'flex'
    });

    Object.assign(confirmButton.style, {
      display: 'block',
      padding: '10px 20px',
      margin: '0 5px',
      borderRadius: '5px',
      color: 'black',
      background: 'white',
      fontSize: '0.8em',
      float: 'left',
      whiteSpace: 'nowrap'
    });
    confirmButton.innerHTML = 'OK';

    var switchButton = confirmButton.cloneNode();
    switchButton.innerHTML = 'Switch bundle';

    bundlePopup.appendChild(inputLabel);
    bundlePopup.appendChild(input);
    bundlePopup.appendChild(bundlePopupButtons);
    bundlePopupButtons.appendChild(confirmButton);
    bundlePopupButtons.appendChild(switchButton);
    appContainer.appendChild(bundlePopup);

    return new _bluebird2.default(function (resolve) {
      var switchBundle = false;
      confirmButton.onclick = handleConfirmTap;
      confirmButton.ontouchstart = handleConfirmTap;

      switchButton.onclick = handleSwitchTap;
      switchButton.ontouchstart = handleSwitchTap;

      function handleConfirmTap(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        if (switchBundle) {
          coreInterface.call('setBundleId', input.value).then(function () {
            confirmButton.onclick = null;
            confirmButton.ontouchstart = null;
            confirmButton.style.display = 'none';
            input.blur();
            input.style.display = 'none';
            inputLabel.innerHTML = 'Bundle ID set. Please restart app to take effect.';
          });
        } else {
          appContainer.removeChild(bundlePopup);
          resolve();
        }
      }

      function handleSwitchTap(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        switchBundle = true;
        switchButton.onclick = null;
        switchButton.ontouchstart = null;
        switchButton.style.display = 'none';
        inputLabel.innerHTML = 'Enter bundle ID:';
        input.style.display = 'block';
      }
    });
  });
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

//======================================================================================================================
// UI STYLES
//======================================================================================================================

var WAIT_FOR_DEBUGGER_BUTTON_STYLE = exports.WAIT_FOR_DEBUGGER_BUTTON_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  webkitTransform: 'translate(-50%, -50%)',
  msTransform: 'translate(-50%, -50%)',
  mozTransform: 'translate(-50%, -50%)',
  zIndex: '1000000'
};

var UPDATE_POPUP_STYLE = exports.UPDATE_POPUP_STYLE = {
  position: 'absolute',
  backgroundColor: 'white',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  webkitTransform: 'translate(-50%, -50%)',
  msTransform: 'translate(-50%, -50%)',
  mozTransform: 'translate(-50%, -50%)',
  zIndex: '1000000',
  fontSize: '20px',
  textAlign: 'center',
  padding: '40px',
  borderRadius: '5px'
};

var UPDATE_POPUP_LABEL_STYLE = exports.UPDATE_POPUP_LABEL_STYLE = {
  fontSize: '1.2em',
  lineHeight: '2em',
  margin: 'auto',
  textDecoration: 'underline'
};

var UPDATE_POPUP_UPDATE_LABEL_STYLE = exports.UPDATE_POPUP_UPDATE_LABEL_STYLE = {
  fontSize: '1em',
  lineHeight: '1em',
  margin: 'auto',
  whiteSpace: 'nowrap'
};

var CONFIRM_BUTTON_STYLE = exports.CONFIRM_BUTTON_STYLE = {
  display: 'inline-block',
  margin: '20px auto 0 auto',
  color: 'white',
  backgroundRepeat: 'repeat-x',
  backgroundColor: '#a21612;',
  background: 'linear-gradient(30deg,#a21612 0%,#cf0f13 50%)',
  filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#CC1E1E', endColorstr='#730F0F', GradientType=0)",
  padding: '10px 25px 10px',
  textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
  fontSize: '0.8em',
  lineHeight: 'normal',
  border: '1px solid #ccc',
  borderColor: 'rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25)',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)'
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(20);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 147 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(14),
    baseClone = __webpack_require__(89),
    baseUnset = __webpack_require__(201),
    castPath = __webpack_require__(23),
    copyObject = __webpack_require__(17),
    customOmitClone = __webpack_require__(207),
    flatRest = __webpack_require__(110),
    getAllKeysIn = __webpack_require__(101);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

module.exports = omit;


/***/ }),
/* 149 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(37);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(37);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(37);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(37);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(36);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 155 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 156 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 157 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(36),
    Map = __webpack_require__(57),
    MapCache = __webpack_require__(58);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(38),
    isMasked = __webpack_require__(160),
    isObject = __webpack_require__(7),
    toSource = __webpack_require__(90);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(161);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(9);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 162 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(164),
    ListCache = __webpack_require__(36),
    Map = __webpack_require__(57);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(165),
    hashDelete = __webpack_require__(166),
    hashGet = __webpack_require__(167),
    hashHas = __webpack_require__(168),
    hashSet = __webpack_require__(169);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(39);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 166 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(39);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(39);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(39);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(40);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 171 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(40);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(40);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(40);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 175 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(17),
    keys = __webpack_require__(28);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(15),
    isObjectLike = __webpack_require__(13);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 178 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(15),
    isLength = __webpack_require__(63),
    isObjectLike = __webpack_require__(13);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(87);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)(module)))

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(65),
    nativeKeys = __webpack_require__(182);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(94);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(17),
    keysIn = __webpack_require__(29);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7),
    isPrototype = __webpack_require__(65),
    nativeKeysIn = __webpack_require__(185);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 185 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(17),
    getSymbols = __webpack_require__(66);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(17),
    getSymbolsIn = __webpack_require__(98);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(16),
    root = __webpack_require__(9);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(16),
    root = __webpack_require__(9);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(16),
    root = __webpack_require__(9);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 191 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(70),
    cloneDataView = __webpack_require__(193),
    cloneMap = __webpack_require__(194),
    cloneRegExp = __webpack_require__(196),
    cloneSet = __webpack_require__(197),
    cloneSymbol = __webpack_require__(199),
    cloneTypedArray = __webpack_require__(107);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(70);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var addMapEntry = __webpack_require__(195),
    arrayReduce = __webpack_require__(105),
    mapToArray = __webpack_require__(106);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;


/***/ }),
/* 195 */
/***/ (function(module, exports) {

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;


/***/ }),
/* 196 */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var addSetEntry = __webpack_require__(198),
    arrayReduce = __webpack_require__(105),
    setToArray = __webpack_require__(44);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;


/***/ }),
/* 198 */
/***/ (function(module, exports) {

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

module.exports = addSetEntry;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(20);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(23),
    last = __webpack_require__(205),
    parent = __webpack_require__(206),
    toKey = __webpack_require__(24);

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

module.exports = baseUnset;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(203);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(204);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(58);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 205 */
/***/ (function(module, exports) {

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(45),
    baseSlice = __webpack_require__(109);

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var isPlainObject = __webpack_require__(72);

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}

module.exports = customOmitClone;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(46);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(20),
    isArguments = __webpack_require__(41),
    isArray = __webpack_require__(5);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(211),
    defineProperty = __webpack_require__(91),
    identity = __webpack_require__(73);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 211 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 212 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(5);

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray(value) ? value : [value];
}

module.exports = castArray;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveAdapter = undefined;

var _bluebird = __webpack_require__(0);

var resolveAdapter = exports.resolveAdapter = function () {
  var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(window, emitter, viewarApi) {
    var adapters, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, adapter;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            adapters = [(0, _iosAdapter.createIosAdapter)(window, emitter), (0, _androidAdapter.createAndroidAdapter)(window, emitter), (0, _windowsAdapter.createWindowsAdapter)(window, emitter), (0, _emscriptenAdapter.createEmscriptenAdapter)(window, emitter), (0, _mockAdapter.createMockAdapter)(window, emitter, viewarApi)];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = adapters[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 15;
              break;
            }

            adapter = _step.value;
            _context.next = 10;
            return adapter.query();

          case 10:
            if (!_context.sent) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', adapter);

          case 12:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError) {
              _context.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
            throw new Error('There is no interface adapter for this platform!');

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function resolveAdapter(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _iosAdapter = __webpack_require__(215);

var _windowsAdapter = __webpack_require__(216);

var _androidAdapter = __webpack_require__(217);

var _emscriptenAdapter = __webpack_require__(218);

var _mockAdapter = __webpack_require__(219);

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.createIosAdapter = createIosAdapter;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _utils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createIosAdapter(window, coreInterface) {

  return {
    platform: 'iOS',

    query: query,
    initialize: initialize,
    sendMessage: sendMessage,
    triggerEvent: triggerEvent,
    resolveUrl: resolveUrl
  };

  function query() {
    return new _bluebird2.default(function (resolve) {
      if (window.engine && window.engine.SendMessage) {
        resolve(false);
      }

      createSimpleEventTrigger('q')();
      setTimeout(function () {
        return resolve(!!window.engine);
      }, 0);
    });
  }

  function initialize() {
    Object.assign((0, _componentEmitter2.default)(window.engine), {
      checkClickThrough: checkClickThrough,
      _trigger: _trigger
    });

    return bindingsReady();
  }

  function _trigger() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    setTimeout(function () {
      return coreInterface.emit.apply(coreInterface, _toConsumableArray(args.map(_utils.parse)));
    }, 0);
  }

  function bindingsReady() {
    var promise = new _bluebird2.default(function (resolve) {
      return coreInterface.once('_OnReady', resolve);
    });
    createSimpleEventTrigger('r')(0, window.location.href, window.parent === window ? 1 : 0);
    return promise;
  }

  function sendMessage(callName, requestId) {
    for (var _len2 = arguments.length, messageArguments = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      messageArguments[_key2 - 2] = arguments[_key2];
    }

    sendViaIframe('coherent-js:c:' + callName + ':' + requestId + ':' + encodeURIComponent(JSON.stringify(messageArguments)));
  }

  function triggerEvent(eventName) {
    for (var _len3 = arguments.length, messageArguments = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      messageArguments[_key3 - 1] = arguments[_key3];
    }

    sendViaIframe('coherent-js:e:' + eventName + ':' + encodeURIComponent(JSON.stringify(messageArguments)));
  }

  function resolveUrl(relativeUrl) {
    return 'coui://' + relativeUrl;
  }

  //======================================================================================================================
  // PRIVATE INTERFACE
  //======================================================================================================================

  function createSimpleEventTrigger(type) {
    return function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return sendViaIframe(['coherent-js', type].concat(args).join(':'));
    };
  }

  function sendViaIframe(src) {
    var document = window.document;
    var frame = Object.assign(document.createElement('iframe'), {
      width: '0',
      height: '0',
      src: src
    });

    document.documentElement.appendChild(frame);
    if (frame && frame.parentNode) {
      frame.parentNode.removeChild(frame);
    }
  }

  function checkClickThrough(pageX, pageY) {
    return consumedByUi({ pageX: pageX, pageY: pageY }) ? 'Y' : 'N';
  }

  function consumedByUi(_ref) {
    var pageX = _ref.pageX,
        pageY = _ref.pageY;

    var document = window.document;
    var elem = document.elementFromPoint(pageX, pageY);
    if (elem && elem != document.documentElement && elem != document.body && !elem.classList.contains('coui-noinput')) {
      return elem.classList.contains('coui-inputcallback') ? elem.couiInputCallback(pageX, pageY) : true;
    } else {
      return false;
    }
  }
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.createWindowsAdapter = createWindowsAdapter;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _utils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createWindowsAdapter(window, coreInterface) {

  return {
    platform: 'Windows',

    query: query,
    initialize: initialize,
    sendMessage: sendMessage,
    triggerEvent: triggerEvent,
    resolveUrl: resolveUrl
  };

  function query() {
    return (0, _bluebird.resolve)(!!(window.engine && window.engine.SendMessage));
  }

  function initialize() {
    Object.assign((0, _componentEmitter2.default)(window.engine), {
      checkClickThrough: checkClickThrough,
      _trigger: _trigger
    });

    return bindingsReady();
  }

  function _trigger() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    setTimeout(function () {
      return coreInterface.emit.apply(coreInterface, _toConsumableArray(args.map(_utils.parse)));
    }, 0);
  }

  function bindingsReady() {
    var promise = new _bluebird2.default(function (resolve) {
      return coreInterface.once('_OnReady', resolve);
    });
    window.engine.BindingsReady();
    return promise;
  }

  function sendMessage() {
    for (var _len2 = arguments.length, messageArguments = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      messageArguments[_key2] = arguments[_key2];
    }

    window.engine.SendMessage.apply(coreInterface, messageArguments);
  }

  function triggerEvent() {
    for (var _len3 = arguments.length, messageArguments = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      messageArguments[_key3] = arguments[_key3];
    }

    window.engine.TriggerEvent.apply(coreInterface, messageArguments);
  }

  function resolveUrl(relativeUrl) {
    return 'coui://' + relativeUrl;
  }

  //======================================================================================================================
  // PRIVATE INTERFACE
  //======================================================================================================================

  function checkClickThrough(pageX, pageY) {
    return consumedByUi({ pageX: pageX, pageY: pageY }) ? "Y" : "N";
  }

  function consumedByUi(_ref) {
    var pageX = _ref.pageX,
        pageY = _ref.pageY;

    var document = window.document;
    var elem = document.elementFromPoint(pageX, pageY);
    if (elem && elem != document.documentElement && elem != document.body && !elem.classList.contains('coui-noinput')) {
      return elem.classList.contains('coui-inputcallback') ? elem.couiInputCallback(pageX, pageY) : true;
    } else {
      return false;
    }
  }
}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.createAndroidAdapter = createAndroidAdapter;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _utils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createAndroidAdapter(window, coreInterface) {

  return {
    platform: 'Android',

    query: query,
    initialize: initialize,
    sendMessage: sendMessage,
    triggerEvent: triggerEvent,
    resolveUrl: resolveUrl
  };

  function query() {
    return (0, _bluebird.resolve)().then(function () {
      if (window.__couiAndroid && window.__couiAndroid.initCoui) {
        new Function(window.__couiAndroid.initCoui())();
        return !!window.engine;
      }
      return false;
    });
  }

  function initialize() {
    Object.assign((0, _componentEmitter2.default)(window.engine), {
      checkClickThrough: checkClickThrough,
      _trigger: _trigger
    });

    return bindingsReady();
  }

  function bindingsReady() {
    var document = window.document;
    var promise = new _bluebird2.default(function (resolve) {
      return coreInterface.once('_OnReady', resolve);
    });

    if (document.body) {
      setupCoherentForAndroid();
    } else {
      document.addEventListener('DOMContentLoaded', setupCoherentForAndroid);
    }

    return promise;
  }

  function sendMessage(callName, requestId) {
    for (var _len = arguments.length, messageArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      messageArguments[_key - 2] = arguments[_key];
    }

    sendViaIframe('coherent-js:c:' + callName + ':' + requestId + ':' + encodeURIComponent(JSON.stringify(messageArguments)));
  }

  function triggerEvent(eventName) {
    for (var _len2 = arguments.length, messageArguments = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      messageArguments[_key2 - 1] = arguments[_key2];
    }

    sendViaIframe('coherent-js:e:' + eventName + ':' + encodeURIComponent(JSON.stringify(messageArguments)));
  }

  function resolveUrl(relativeUrl) {
    return 'coui://' + relativeUrl;
  }

  //======================================================================================================================
  // PRIVATE INTERFACE
  //======================================================================================================================

  function _trigger() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    setTimeout(function () {
      return coreInterface.emit.apply(coreInterface, _toConsumableArray(args.map(_utils.parse)));
    }, 0);
  }

  function checkClickThrough(pageX, pageY) {
    return consumedByUi({ pageX: pageX, pageY: pageY }) ? "Y" : "N";
  }

  function createSimpleEventTrigger(type) {
    return function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return sendViaIframe(['coherent-js', type].concat(args).join(':'));
    };
  }

  function sendViaIframe(src) {
    var document = window.document;
    var frame = Object.assign(document.createElement('iframe'), {
      width: '0',
      height: '0',
      src: src
    });

    document.documentElement.appendChild(frame);
    if (frame && frame.parentNode) {
      frame.parentNode.removeChild(frame);
    }
  }

  function consumedByUi(_ref) {
    var pageX = _ref.pageX,
        pageY = _ref.pageY;

    var document = window.document;
    var elem = document.elementFromPoint(pageX, pageY);
    if (elem && elem != document.documentElement && elem != document.body && !elem.classList.contains('coui-noinput')) {
      return elem.classList.contains('coui-inputcallback') ? elem.couiInputCallback(pageX, pageY) : true;
    } else {
      return false;
    }
  }

  function setupCoherentForAndroid() {
    var document = window.document;
    var couiAndroid = window.__couiAndroid;
    var body = document.body;

    body.addEventListener('touchstart', createTouchListener(0, couiAndroid));
    body.addEventListener('touchmove', createTouchListener(1, couiAndroid));
    body.addEventListener('touchend', createTouchListener(3, couiAndroid));
    body.addEventListener('touchcancel', createTouchListener(4, couiAndroid));

    createSimpleEventTrigger('r')(0, window.location.href, window.parent === window ? 1 : 0);
  }

  function createTouchListener(phase, couiAndroid) {
    return function (event) {
      var touches = [].concat(_toConsumableArray(event.changedTouches || []));

      if (couiAndroid.inputState === 0) {// Input state: Take all

      } else if (couiAndroid.inputState === 1) {
        // Input state: Take none

        event.preventDefault();

        touches.forEach(function (touch) {
          couiAndroid.addTouchEvent(Number(touch.identifier), phase, touch.screenX, touch.screenY);
        });
      } else {
        // Input state: Transparent
        touches.forEach(function (touch) {
          var consumed = consumedByUi(touch);

          if (phase === 1 && !consumed) {
            event.preventDefault(); // Fix bug for Android 4.4+
          }

          if (!consumed) {
            couiAndroid.addTouchEvent(Number(touch.identifier), phase, touch.screenX, touch.screenY);
          }
        });
      }
    };
  }
}

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createEmscriptenAdapter = createEmscriptenAdapter;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _constants = __webpack_require__(4);

var _utils = __webpack_require__(6);

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _appConfig = __webpack_require__(19);

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createEmscriptenAdapter(window, coreInterface) {
  var bindingsReady = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              addProgressFeedback(window.Module);

              if (!window.Module.init) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return window.Module.init({ appId: _config2.default.appId });

            case 4:

              window.Module.EmscriptenUIImplementation.prototype.httpPost = httpPost;
              callInterface = new window.Module.EmscriptenUIImplementation();
              callInterface.registerEvents();

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function bindingsReady() {
      return _ref.apply(this, arguments);
    };
  }();

  var urlCache = {};
  var callInterface = null;

  var resolveMutex = function resolveMutex() {};
  var rejectMutex = function rejectMutex() {};
  var mutexPromise = (0, _bluebird.resolve)();

  return {
    platform: 'Emscripten',

    query: query,
    initialize: initialize,
    sendMessage: sendMessage,
    triggerEvent: triggerEvent,
    resolveUrl: resolveUrl
  };

  function query() {
    return new _bluebird2.default(function (resolve) {
      return resolve(!!(window.Module && window.Module.EmscriptenUIImplementation));
    });
  }

  function initialize() {
    Object.assign((0, _componentEmitter2.default)(window.engine = {}), {
      checkClickThrough: checkClickThrough,
      _trigger: _trigger
    });

    return bindingsReady();
  }

  function _trigger(event) {
    if (event === '_Result') resolveMutex();
    if (event === '_OnError') rejectMutex(new Error());

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    coreInterface.emit.apply(coreInterface, [event].concat(_toConsumableArray(args.map(_utils.emscriptenParse))));
  }

  function enqueue(job) {
    return mutexPromise = mutexPromise.then(function () {
      return new _bluebird2.default(job);
    }, function () {
      return new _bluebird2.default(job);
    });
  }

  function sendMessage(callName, requestId) {
    for (var _len2 = arguments.length, messageArguments = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      messageArguments[_key2 - 2] = arguments[_key2];
    }

    return enqueue(function (resolve, reject) {
      if (callInterface[callName]) {
        var _callInterface;

        resolve((_callInterface = callInterface)[callName].apply(_callInterface, messageArguments));
      } else {
        reject(new Error('Sync call ' + callName + ' doesn\'t exist!'));
      }
    }).then(function (result) {
      return _trigger('_Result', requestId, result);
    });
  }

  function triggerEvent(eventName) {
    for (var _len3 = arguments.length, messageArguments = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      messageArguments[_key3 - 1] = arguments[_key3];
    }

    return enqueue(function (resolve, reject) {
      try {
        if (_constants.ASYNC_CALLS.includes(eventName)) {
          var _callInterface2;

          resolveMutex = resolve;
          rejectMutex = reject;
          if (!callInterface[eventName]) throw new Error('Async call ' + eventName + ' doesn\'t exist!');
          (_callInterface2 = callInterface)[eventName].apply(_callInterface2, messageArguments);
        } else {
          var _callInterface3;

          if (!callInterface[eventName]) throw new Error('Event ' + eventName + ' doesn\'t exist!');
          (_callInterface3 = callInterface)[eventName].apply(_callInterface3, messageArguments);
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  //======================================================================================================================
  // PRIVATE INTERFACE
  //======================================================================================================================

  function checkClickThrough(x, y) {
    return isConsumed({ pageX: x, pageY: y }) ? "Y" : "N";
  }

  function isConsumed(touch) {
    var x = touch.pageX,
        y = touch.pageY;
    var elem = document.elementFromPoint(x, y);
    if (elem && elem != document.body && !elem.classList.contains('coui-noinput')) {
      // check for custom client click-through logic
      if (elem.classList.contains('coui-inputcallback')) {
        return elem.couiInputCallback(x, y);
      }
      return true;
    } else {
      return false;
    }
  }

  function resolveUrl(relativeUrl) {
    if (relativeUrl.includes('/Models/Images/')) {
      var results = /\/(\w+)\.\w+$/.exec(relativeUrl);
      if (results && results[1]) {
        return _appConfig2.default.host + '/model/downloadImage/display:1/size:large/id:' + results[1];
      }
    } else if (relativeUrl.includes('/CategoryImages/')) {
      var _results = /\/(\w+)\.\w+$/.exec(relativeUrl);
      if (_results && _results[1]) {
        return _appConfig2.default.host + '/category/display:1/downloadImage/size:large/id:' + _results[1];
      }
    } else if (relativeUrl.includes('/ResourceThumbnails/') || relativeUrl.includes('/Models/Resources/')) {
      var _results2 = /\/(?:\w+)\/thumb_([^.]+)\.(jpe?g)$/.exec(relativeUrl);
      if (_results2 && _results2[1] && _results2[2]) {
        var resourcePackId = _results2[1].split('_')[0];
        return _appConfig2.default.host + '/resources/DownloadImage/display:1/id:' + resourcePackId + '/name:thumb_' + encodeURIComponent(_results2[1]) + '.' + _results2[2];
      }
    }

    if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
      return relativeUrl;
    }

    return '';
  }

  function getBlob(path) {
    var FS = window.FS,
        Blob = window.Blob;


    var node = FS.findObject('/ViewarRoot/' + path);
    if (node) {
      return new Blob([node.contents.buffer]);
    } else {
      return null;
    }
  }

  function httpPost(url, fields) {
    return new _bluebird2.default(function (resolve, reject) {
      var formData = prepareFormData(JSON.parse(fields));

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.onload = handleLoad;
      xhr.onerror = handleError;
      xhr.send(formData);

      // Async call, so return generated jobId first, then fake a notification
      // to all listeners once ajax request returns a result.
      var jobId = (0, _generateId2.default)();
      resolve(jobId);

      function handleLoad() {
        if (xhr.status === 200) {
          coreInterface.emit('httpPostResult', jobId, true, JSON.parse(xhr.response));
        } else {
          coreInterface.emit('httpPostResult', jobId, false, xhr.statusText);
          console.error('httpPost error', xhr.statusText);
        }
      }

      function handleError() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = coreInterface._callbacks.$httpPostResult[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var callback = _step.value;

            callback(jobId, false, xhr.statusText);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        console.error('httpPost error', xhr.statusText);
      }
    });
  }

  function prepareFormData(fields) {
    var FormData = window.FormData;


    var formData = new FormData();

    if (typeof fields === 'string') {
      fields.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
        formData.append($1, resolveValue($3));
      });
    } else {
      Object.entries(fields).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        formData.append(key, resolveValue(value));
      });
    }
    return formData;
  }

  function getFile(rawPath) {
    var File = window.File;


    var filename = rawPath.match(/[^/]+$/)[0] || rawPath;
    var relativePath = rawPath.replace(/^@/, '');

    return new File([getBlob(relativePath)], filename);
  }

  function resolveValue(value) {
    if (isCurlFilePath(value)) {
      return getFile(value);
    } else {
      return value;
    }
  }

  function isCurlFilePath(value) {
    return typeof value === 'string' && value[0] === '@';
  }

  function addProgressFeedback(module) {
    module.readAsync = function readAsync(url, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";

      xhr.onprogress = function (event) {
        if (event.lengthComputable) {
          var percentComplete = event.loaded / event.total * 100;
          coreInterface.emit('transferProgress', '', '', '', percentComplete);
        } else {
          console.log('TransferProgress not computable!');
        }
      };

      xhr.onload = function () {
        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
          coreInterface.emit('transferProgress', '', '', '', 100);
          onLoad(xhr.response);
        } else {
          onError();
        }
      };

      xhr.onerror = onError;

      xhr.send(null);
    };
  }
}

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.createMockAdapter = createMockAdapter;

var _mockCalls = __webpack_require__(220);

var _mockCalls2 = _interopRequireDefault(_mockCalls);

var _appConfig = __webpack_require__(19);

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMockAdapter(window, coreInterface, viewarApi) {
  var mockCalls = null;

  return {
    platform: 'Mock',

    query: query,
    initialize: initialize,
    sendMessage: sendMessage,
    triggerEvent: triggerEvent,
    resolveUrl: resolveUrl
  };

  function query() {
    return (0, _bluebird.resolve)(!window.engine);
  }

  function initialize() {
    window.engine = {
      _trigger: coreInterface.emit.bind(coreInterface)
    };

    mockCalls = (0, _mockCalls2.default)({ window: window, coreInterface: coreInterface, viewarApi: viewarApi });
    return (0, _bluebird.resolve)();
  }

  function sendMessage(callName, requestId) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var mockCallHandler = coreInterface.mock[callName];

    if (mockCallHandler) {
      setTimeout(function () {
        return mockCallHandler.apply(undefined, args).then(function (result) {
          return coreInterface.emit('_Result', requestId, result);
        });
      }, 0);
    } else {
      setTimeout(function () {
        return coreInterface.emit('_Result', requestId, mockCallHandler);
      }, 0);
    }
  }

  function triggerEvent(eventName) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    setTimeout(function () {
      return coreInterface.emit.apply(coreInterface, ['mock:' + eventName].concat(args));
    }, 0);
  }

  function resolveUrl(relativeUrl) {
    if (relativeUrl.includes('/Models/Images/')) {
      var results = /\/(\w+)\.\w+$/.exec(relativeUrl);
      if (results && results[1]) {
        return _appConfig2.default.host + '/model/downloadImage/display:1/size:large/id:' + results[1];
      }
    } else if (relativeUrl.includes('/CategoryImages/')) {
      var _results = /\/(\w+)\.\w+$/.exec(relativeUrl);
      if (_results && _results[1]) {
        return _appConfig2.default.host + '/category/display:1/downloadImage/size:large/id:' + _results[1];
      }
    } else if (relativeUrl.includes('/ResourceThumbnails/') || relativeUrl.includes('/Models/Resources/')) {
      var _results2 = /\/(?:\w+)\/thumb_([^.]+)\.(jpe?g)$/.exec(relativeUrl);
      if (_results2 && _results2[1] && _results2[2]) {
        var resourcePackId = _results2[1].split('_')[0];
        return _appConfig2.default.host + '/resources/DownloadImage/display:1/id:' + resourcePackId + '/name:thumb_' + encodeURIComponent(_results2[1]) + '.' + _results2[2];
      }
    }

    if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
      return relativeUrl;
    }

    return '';
  }
}

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

var _package = __webpack_require__(114);

var _package2 = _interopRequireDefault(_package);

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _appConfig = __webpack_require__(19);

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return addMockCalls(_extends({}, props, { config: _config2.default, appConfig: _appConfig2.default }));
};

var customFiles = {};
var customStageBackgrounds = {};
var freezeFrames = [{ name: "freezeFrame1", thumbPath: "" }];
var structureConnected = false;
var structureBattery = true;
var online = true;
var currentMode;

var downloadCache = {};
var customImages = {};

var selectedId = null;
var insertedModelImages = new Map();
var insertedContainers = new Map();
var insertedObj = {};
var host = 'https://api.viewar.com'; // Most of the time appConfig.host is used, but this is for the initalization where appConfig is not resolved yet.
var modelContainerDisplayBlacklist = ['30387', 'DefaultLayer'];

function addMockCalls(_ref) {
  var insertModelImage = function () {
    var _ref9 = (0, _bluebird.method)(function (instanceId) {
      var modelContainer = getOrCreateModelContainer();

      var modelExisting = document.getElementById('modelImage_' + instanceId);
      var modelImage = modelExisting || document.createElement('div');
      if (!modelExisting) {
        modelImage.id = 'modelImage_' + instanceId;
        Object.assign(modelImage.style, {
          position: 'relative',
          float: 'left',
          zIndex: '10000',
          padding: '2px',
          margin: '2px',
          border: '2px solid rgba(0,0,0,0)'
        });
      }

      var instance = viewarApi.sceneManager.findNodeById(instanceId);
      if (instance) {

        var selection = instance;
        var parentContainer = modelContainer;
        if (selection.parent && selection.parent.id !== 'DefaultLayer') {
          parentContainer = document.getElementById('containerImage_' + selection.parent.id);
        }
        parentContainer.appendChild(modelImage);

        modelImage.innerHTML = '<div style="position: relative; width: 128px; height: 128px;"><img style="width: 100%; height: 100%; position: absolute;" src="' + instance.model.imageUrl + '"/><div style="position: absolute; left: 0; bottom: 0; width: 100%; color: #282f39; text-overflow: ellipsis; padding: 1em 0.1em; box-sizing: border-box; line-height: 1em; font-size: 0.9em; background: rgba(255, 255, 255, 0.7); text-align: center; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">' + instance.model.name + '</div></div>';

        var onClick = function onClick(e) {
          if (currentMode === 'TouchRay') {
            var touchResult = [{
              instanceId: instanceId,
              intersection: [{ x: 0, y: 0, z: 0 }]
            }];
            viewarApi.coreInterface.emit('touchRay', JSON.stringify(touchResult));
          }

          while (selection.parent && selection.parent.type !== 'ungrouped' && selection.parent.id !== 'DefaultLayer') {
            selection = selection.parent;
          }

          if (!selection.model || selection.model.type !== 'environment') {
            selectModelImage(selection.id);
            viewarApi.coreInterface.emit('selectionChanged', selection.id);
          } else {
            selectModelImage(null);
            viewarApi.coreInterface.emit('selectionChanged', null);
          }

          e.stopPropagation();
          e.preventDefault();
        };

        modelImage.addEventListener('click', onClick);
      } else {

        var _selection = insertedObj[instanceId];
        var _parentContainer = modelContainer;
        if (_selection.parent && _selection.parent !== 'DefaultLayer') {
          _parentContainer = document.getElementById('containerImage_' + _selection.parent);
        }
        _parentContainer.appendChild(modelImage);

        modelImage.innerHTML = '<div style="overflow-x: hidden; white-space: nowrap; ">' + instanceId + '</div>';
        modelImage.addEventListener('click', function (e) {
          while (_selection.parent && _selection.shouldBeGrouped && _selection.parent !== 'DefaultLayer') {
            _selection = insertedObj[_selection.parent];
          }

          selectModelImage(_selection.id);
          viewarApi.coreInterface.emit('selectionChanged', _selection.id);

          e.stopPropagation();
          e.preventDefault();
        });
      }
      insertedModelImages.set(instanceId, modelImage);
    });

    return function insertModelImage(_x8) {
      return _ref9.apply(this, arguments);
    };
  }();

  var window = _ref.window,
      coreInterface = _ref.coreInterface,
      appId = _ref.config.appId,
      appConfig = _ref.appConfig,
      viewarApi = _ref.viewarApi;


  var document = window.document;

  var authKey = '';

  var meshScanInProgress = false;
  var meshVertices = 0;

  addCustomStageBackgrounds(customStageBackgrounds);
  addCustomFiles(customFiles);
  addMockEvents();
  addSimulatorPanel();
  showBackground('Grid');

  coreInterface.customImages = customImages;
  coreInterface.mock = {
    activateStage: activateStage,
    switchToMode: switchToMode,
    getDeviceRamInfo: getDeviceRamInfo,
    getScenarioConfig: getScenarioConfig,
    readCustomFile: readCustomFile,
    saveCustomFile: saveCustomFile,
    getSDKVersionNumber: getSDKVersionNumber,
    getInstancePose: getInstancePose,
    getCameraPose: getCameraPose,
    getGridCameraPose: getGridCameraPose,
    getCameraPosition: getCameraPosition,
    getCameraOrientation: getCameraOrientation,
    getFreezeFrameList: getFreezeFrameList,
    getCameraLookAt: getCameraLookAt,
    getColorAtCoordinates: getColorAtCoordinates,
    getSceneBoundingBox: getSceneBoundingBox,
    customTrackingCommand: customTrackingCommand,
    deleteInstance: deleteInstance,
    pluginCommand: pluginCommand,
    saveScreenshotToSubfolder: saveScreenshotToSubfolder,
    selectObject: selectObject,
    clearSelection: clearSelection,
    colorizeMesh: colorizeMesh,
    fillMeshHoles: fillMeshHoles,
    getMeshList: getMeshList,
    setAuthKey: setAuthKey,
    getAuthKey: getAuthKey,
    freeze: freeze,
    unfreeze: unfreeze,
    clearScene: clearScene,
    startVideo: startVideo,
    startAnimation: startAnimation,
    setObjectInteraction: setObjectInteraction,
    insertContainer: insertContainer,
    showFreezeFrame: showFreezeFrame,
    getPoseInViewingDirection: getPoseInViewingDirection,
    startMeshScan: startMeshScan,
    stopMeshScan: stopMeshScan,
    resetMeshScan: resetMeshScan,
    httpPost: httpPost,
    adjustContainerCenterToContent: adjustContainerCenterToContent,
    setNodeVisibility: setNodeVisibility,
    scriptingLayerReady: scriptingLayerReady
  };

  //======================================================================================================================
  // MOCK CALLS
  //======================================================================================================================

  function getScenarioConfig() {
    var bundleId = window.location.hash.substr(1) || appId;

    return getData(host + '/api20/configuration/bundleidentifier:' + bundleId + '/fakeversion:100').then(function (data) {
      return data || getData(host + '/api20/configuration/bundleidentifier:' + appId + '/fakeversion:100');
    }).catch(function () {
      return getData(host + '/api20/configuration/bundleidentifier:' + appId + '/fakeversion:100');
    });
  }

  function scriptingLayerReady() {
    return (0, _bluebird.resolve)({});
  }

  function activateStage(stage) {
    showStageText(null);

    var appContainer = document.getElementById('viewar_app') || document.getElementsByTagName('body')[0];
    var background = customStageBackgrounds[stage];
    if (background) {
      var existing = document.getElementById('backgroundElement');
      var backgroundElement = existing || document.createElement('div');
      if (!existing) {
        backgroundElement.id = 'backgroundElement';
        Object.assign(backgroundElement.style, {
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '-1000000',
          backgroundSize: 'cover',
          left: '0',
          top: '0'
        });

        backgroundElement.addEventListener('click', function () {
          return coreInterface.emit('selectionChanged', null);
        });
        selectModelImage(null);
        appContainer.appendChild(backgroundElement);
      }
      backgroundElement.style.background = background;
    }

    return (0, _bluebird.delay)(33);
  }

  function getCameraOrientation() {
    return (0, _bluebird.resolve)(JSON.stringify({
      x: 0, y: 0
    }));
  }

  function switchToMode(mode) {
    currentMode = mode;
    return (0, _bluebird.delay)(33);
  }

  function getDeviceRamInfo() {
    return (0, _bluebird.resolve)(JSON.stringify({
      total: 2 * 1024 * 1024 * 1024,
      avail: 1 * 1024 * 1024 * 1024
    }));
  }

  function readCustomFile(fileName) {
    return (0, _bluebird.resolve)(customFiles[fileName]);
  }

  function saveCustomFile(fileName, content, format) {
    return (0, _bluebird.resolve)().then(function () {
      switch (format) {
        case 'json':
          customFiles[fileName] = JSON.stringify(content);
          break;
        default:
          customFiles[fileName] = content;
          break;
      }
    });
  }

  function getPoseInViewingDirection() {
    return (0, _bluebird.resolve)(JSON.stringify({
      position: { x: 0, y: 0, z: 0 },
      orientation: { w: 1, x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    }));
  }

  function getSDKVersionNumber() {
    return (0, _bluebird.resolve)(_package2.default.dependencies['viewar-core'].substring(1));
  }

  function getInstancePose() {
    return (0, _bluebird.resolve)(JSON.stringify({
      position: { x: 0, y: 0, z: 0 },
      orientation: { w: 1, x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 }
    }));
  }

  function getCameraPose() {
    return (0, _bluebird.resolve)(JSON.stringify({
      position: { x: 0, y: 0, z: 0 },
      lookAt: { x: 0, y: 0, z: 1 }
    }));
  }

  function getGridCameraPose() {
    return (0, _bluebird.resolve)(JSON.stringify({
      position: { x: 0, y: 0, z: 0 },
      lookAt: { x: 0, y: 0, z: 1 }
    }));
  }

  function getCameraPosition() {
    return (0, _bluebird.resolve)(JSON.stringify({
      x: 0, y: 0, z: 0
    }));
  }

  function getCameraLookAt() {
    return (0, _bluebird.resolve)(JSON.stringify({
      x: 0, y: 0, z: 1
    }));
  }

  function getFreezeFrameList() {
    return (0, _bluebird.resolve)(JSON.stringify(freezeFrames));
  }

  function getColorAtCoordinates(coordinates, radius) {
    return (0, _bluebird.resolve)('[128, 0, 0]');
  }

  function getSceneBoundingBox(includeInvisible) {
    return (0, _bluebird.resolve)([{ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 1, y: 0, z: 1 }, { x: 1, y: 1, z: 0 }, { x: 1, y: 1, z: 1 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 1, z: 1 }, { x: 0, y: 0, z: 1 }]);
  }

  function customTrackingCommand(providerName, command, params) {
    var retParams = {};
    if (providerName == 'Structure') {
      switch (command) {
        case 'getStatus':
          retParams.sensorBatteryLevel = structureBattery ? 0.73 : 0;
          retParams.sensorConnected = structureConnected;
          retParams.isStreaming = true;
          break;
      }
    } else if (providerName === 'Vuforia' || providerName === 'Qualcomm') {
      switch (command) {
        case 'captureUserTarget':
          var info = {
            status: 'userTargetCaptured'
          };
          setTimeout(function () {
            return coreInterface.emit('customTrackingInfo', providerName, JSON.stringify(info));
          }, 0);
          break;
        case 'removeUserTarget':
          break;
      }
    }
    return (0, _bluebird.resolve)(JSON.stringify(retParams));
  }

  function deleteInstance(instanceId) {
    setTimeout(function () {
      return coreInterface.emit('selectionChanged', null);
    }, 0);
    selectModelImage(null);
    var modelImage = insertedModelImages.get(instanceId);
    if (modelImage) {
      var modelContainer = modelImage.parentNode;
      modelContainer.removeChild(modelImage);
      if (modelContainer.children.length <= 1) {
        modelContainer.style.display = 'none';
      }
    }

    var container = insertedContainers.get(instanceId) || [];
    container.forEach(function (childId) {
      var child = insertedModelImages.get(childId);
      if (child) child.parentNode.removeChild(child);
      insertedModelImages.delete(childId);
      delete insertedObj[childId];
    });

    delete insertedObj[instanceId];
    insertedContainers.delete(instanceId);
    return (0, _bluebird.resolve)(insertedModelImages.delete(instanceId));
  }

  function pluginCommand(pluginName, commandName, params) {
    switch (pluginName) {
      case 'LCAG':
        switch (commandName) {
          case 'measureBoxes':
            setTimeout(function () {
              return coreInterface.emit('boxMeasurement', '{"boxes":[{"id":1,"pose":{"position":{"x":0,"y":0,"z":0},"orientation":{"w":1,"x":0,"y":0,"z":0}},"dimensions":{"x":12.3,"y":12.7,"z":10},"volumeInCubicMeters":1112.5,"faces":[{"id":"front","confidence":0.9,"numberOfPoints":9881,"orientation":"vertical","corners":[{"x":0,"y":0,"z":0}]}]}]}');
            }, 0);
            break;
        }
        break;
    }

    return (0, _bluebird.resolve)('{}');
  }

  function selectObject(id) {
    setTimeout(function () {
      return coreInterface.emit('selectionChanged', id);
    }, 0);
    selectModelImage(id);
    return (0, _bluebird.resolve)();
  }

  function clearSelection() {
    setTimeout(function () {
      return coreInterface.emit('selectionChanged', null);
    }, 0);
    selectModelImage(null);
    return (0, _bluebird.resolve)();
  }

  function colorizeMesh() {
    var jobId = (0, _generateId2.default)();
    for (var i = 0; i < 100; i += 5) {
      (function (count) {
        var json = {
          type: 'skinningProgress',
          data: count
        };
        setTimeout(function () {
          return coreInterface.emit('customTrackingInfo', jobId, JSON.stringify(json));
        }, 10 * count);
      })(i);
    }
    setTimeout(function () {
      return coreInterface.emit('customTrackingInfo', jobId, '{"type":"skinningFinished"}');
    }, 10 * 101);
    return (0, _bluebird.resolve)(jobId);
  }

  function fillMeshHoles() {
    var jobId = (0, _generateId2.default)();
    for (var i = 0; i < 100; i += 5) {
      (function (count) {
        var json = {
          type: 'holeFillProgress',
          data: count
        };
        setTimeout(function () {
          return coreInterface.emit('customTrackingInfo', jobId, JSON.stringify(json));
        }, 10 * count);
      })(i);
    }
    setTimeout(function () {
      return coreInterface.emit('customTrackingInfo', jobId, '{"type":"holeFillFinished"}');
    }, 10 * 101);
    return (0, _bluebird.resolve)(jobId);
  }

  function getMeshList() {
    var meshList = [];

    if (meshVertices) {
      meshList.push({
        id: 'Scan',
        name: 'Scan',
        numVertices: meshVertices,
        material: 'viewar_xray'
      });
    }

    return (0, _bluebird.resolve)(JSON.stringify(meshList));
  }

  function setAuthKey(key) {
    authKey = key;
    return (0, _bluebird.resolve)();
  }

  function getAuthKey() {
    return (0, _bluebird.resolve)(JSON.stringify(authKey));
  }

  function freeze() {
    showStageText('Freeze');

    return (0, _bluebird.resolve)();
  }

  function unfreeze() {
    showStageText(null);
    return (0, _bluebird.resolve)();
  }

  function clearScene() {
    insertedModelImages.forEach(function (modelImage) {
      modelImage.parentNode.removeChild(modelImage);
    });
    insertedModelImages.clear();
    insertedObj = {};
    insertedContainers.clear();
    coreInterface.emit('selectionChanged', null);
    return (0, _bluebird.resolve)(true);
  }

  function startVideo(instanceId, videoName, timeInMs, loop) {
    if (!loop) {
      setTimeout(function () {
        return coreInterface.emit('videoEnded', videoName, instanceId);
      }, 3000);
    }
    return (0, _bluebird.resolve)();
  }

  function startAnimation(instanceId, animationName, timeInMs, loop) {
    if (!loop) {
      setTimeout(function () {
        return coreInterface.emit('animationEnded', animationName, instanceId);
      }, 3000);
    }
    return (0, _bluebird.resolve)();
  }

  function saveScreenshotToSubfolder(subfolder) {
    return (0, _bluebird.resolve)(appConfig.host + '/images_new/ar_background.png');
  }

  function insertContainer(containerId, assemblyPart) {
    var _JSON$parse = JSON.parse(assemblyPart),
        targetContainerId = _JSON$parse.targetContainerId,
        shouldBeGrouped = _JSON$parse.shouldBeGrouped;

    insertedContainers.set(containerId, []);
    insertedObj[containerId] = { id: containerId, shouldBeGrouped: shouldBeGrouped };
    insertedObj[containerId].parent = targetContainerId ? targetContainerId : undefined;
    insertContainerImage(containerId);
    return (0, _bluebird.resolve)();
  }

  function showFreezeFrame(freezeFrame) {
    showStageText('Freeze');
    showBackground('Freeze');
    return (0, _bluebird.resolve)();
  }

  function startMeshScan() {
    meshScanInProgress = true;
    meshVertices += Math.floor(Math.random() * 101);

    var scan = function scan() {
      if (meshScanInProgress) {
        setTimeout(scan, 500);
        meshVertices += Math.floor(Math.random() * 101);
      }
    };
    scan();

    return (0, _bluebird.resolve)();
  }

  function stopMeshScan() {
    meshScanInProgress = false;
    return (0, _bluebird.resolve)();
  }

  function resetMeshScan() {
    meshVertices = 0;
    return (0, _bluebird.resolve)();
  }

  function httpPost(url, fields) {
    var jobId = (0, _generateId2.default)();
    setTimeout(function () {
      return coreInterface.emit('httpPostResult', jobId, true, "0");
    }, 0);
    return (0, _bluebird.resolve)(jobId);
  }

  function adjustContainerCenterToContent(containerId, method) {
    var container = viewarApi.sceneManager.findNodeById(containerId);
    var position = container.getPose().position || { x: 0, y: 0, z: 0 };
    return (0, _bluebird.resolve)(JSON.stringify(position));
  }

  function setNodeVisibility(instanceId, visibility) {
    var modelImage = insertedModelImages.get(instanceId);
    if (modelImage) {
      modelImage.style.display = visibility ? 'inline' : 'none';
    }
    return (0, _bluebird.resolve)();
  }

  function setObjectInteraction(interaction) {
    return (0, _bluebird.resolve)();
  }

  //======================================================================================================================
  // UNIMPLEMENTED CALLS
  //======================================================================================================================

  function setCollisionMode(mode) {
    return (0, _bluebird.resolve)();
  }

  function stopFeatureTracking(providerName) {
    return (0, _bluebird.resolve)();
  }

  function startFeatureTracking(providerName) {
    return (0, _bluebird.resolve)();
  }

  function setInstancePose(instanceId, pose) {
    return (0, _bluebird.resolve)();
  }

  function confirmGroundPosition(providerName) {
    return (0, _bluebird.resolve)();
  }

  function setMeshMaterial(meshId, materialId) {
    return (0, _bluebird.resolve)();
  }

  function saveMeshAsObj(meshId, fileName) {
    return (0, _bluebird.resolve)();
  }

  function applyMaterialOption(instanceId, groupId, materialOption) {
    return (0, _bluebird.resolve)();
  }

  function loadMeshFromObj(meshId, fileName) {
    return (0, _bluebird.resolve)();
  }

  function deleteMeshObj(fileName) {
    return (0, _bluebird.resolve)();
  }

  function removeFreezeFrame(freezeFrameName) {
    return (0, _bluebird.resolve)();
  }

  function addMockEvents() {
    var simulateTransfer = function () {
      var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(transferType, resourceType, jobId) {
        var percent;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!online) {
                  _context3.next = 16;
                  break;
                }

                coreInterface.emit('transferBegin', transferType, resourceType, jobId);

                percent = 0;

              case 3:
                if (!(percent < 100)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 6;
                return (0, _bluebird.delay)(33);

              case 6:
                coreInterface.emit('transferProgress', transferType, resourceType, jobId, percent);

              case 7:
                percent += 10;
                _context3.next = 3;
                break;

              case 10:
                _context3.next = 12;
                return (0, _bluebird.delay)(33);

              case 12:
                coreInterface.emit('transferEnd', transferType, resourceType, jobId, 'NoErrors');
                coreInterface.emit('_Result', jobId, null);
                _context3.next = 19;
                break;

              case 16:
                _context3.next = 18;
                return (0, _bluebird.delay)(33);

              case 18:
                coreInterface.emit('_OnError', jobId, new Error('Could not resolve host name'));

              case 19:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function simulateTransfer(_x, _x2, _x3) {
        return _ref4.apply(this, arguments);
      };
    }();

    var prepareResourcePack = function () {
      var _ref5 = (0, _bluebird.method)(function (jobId) {
        return simulateTransfer('Download', 'ResourcePack', jobId);
      });

      return function prepareResourcePack(_x4) {
        return _ref5.apply(this, arguments);
      };
    }();

    var prepareModelDescription = function () {
      var _ref6 = (0, _bluebird.method)(function (jobId, modelId) {
        return getModelDescription(jobId, modelId);
      });

      return function prepareModelDescription(_x5, _x6) {
        return _ref6.apply(this, arguments);
      };
    }();

    var prepareModelImage = function () {
      var _ref7 = (0, _bluebird.method)(function (jobId) {
        return simulateTransfer('Download', 'ModelImage', jobId);
      });

      return function prepareModelImage(_x7) {
        return _ref7.apply(this, arguments);
      };
    }();

    var events = {
      // ASYNC CALLS
      downloadFreezeFrameFromServer: downloadFreezeFrameFromServer,
      applyMaterialOptions: applyMaterialOptions,
      insertModel: insertModel,
      insertModelNew: insertModelNew,
      prepareModelResources: prepareModelResources,
      prepareAllModelAssets: prepareAllModelAssets,
      prepareResourcePack: prepareResourcePack,
      prepareModelDescription: prepareModelDescription,
      prepareModelImage: prepareModelImage,
      prepareCategoryImage: prepareCategoryImage,
      prepareAppData: prepareAppData,
      getModelDescription: getModelDescription,
      getMaterialDescription: getMaterialDescription,
      prepareCustomImage: prepareCustomImage,

      // EVENTS
      takeScreenshot: takeScreenshot,
      saveFreezeFrame: saveFreezeFrame,
      openInExternalBrowser: openInExternalBrowser,
      openInInternalBrowser: openInInternalBrowser,
      deleteCustomFile: deleteCustomFile,
      deleteSelectedModel: deleteSelectedModel
    };

    Object.keys(events).forEach(function (name) {
      coreInterface.emit('_Register', name);
      coreInterface.on('mock:' + name, events[name]);
    });

    //======================================================================================================================
    // ASYNC CALLS
    //======================================================================================================================

    function downloadFreezeFrameFromServer(jobId) {
      setTimeout(function () {
        return coreInterface.emit('_Result', jobId, null);
      }, 0);
    }

    function applyMaterialOptions(jobId) {
      setTimeout(function () {
        return coreInterface.emit('_Result', jobId, null);
      }, 0);
    }

    function insertModel(jobId, modelId, options) {
      var _JSON$parse2 = JSON.parse(options),
          instanceId = _JSON$parse2.instanceId,
          targetContainerId = _JSON$parse2.targetContainerId,
          shouldBeGrouped = _JSON$parse2.shouldBeGrouped,
          visible = _JSON$parse2.visible;

      if (targetContainerId) {
        insertContainerImage(targetContainerId);
        var children = insertedContainers.get(targetContainerId) || [];
        insertedObj[instanceId] = { id: instanceId, parent: targetContainerId, shouldBeGrouped: shouldBeGrouped };
        children.push(instanceId);
        insertedContainers.set(targetContainerId, children);
      }

      if (visible) {
        if (modelContainerDisplayBlacklist.indexOf(modelId) === -1) {
          setTimeout((0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return insertModelImage(instanceId);

                  case 2:
                    selectModelImage(instanceId);

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          })), 0);
        }
      }
      setTimeout(function () {
        return coreInterface.emit('_Result', jobId, null);
      }, 0);
    }

    function insertModelNew(jobId, modelId, options) {
      var _JSON$parse3 = JSON.parse(options),
          instanceId = _JSON$parse3.instanceId,
          targetContainerId = _JSON$parse3.targetContainerId,
          shouldBeGrouped = _JSON$parse3.shouldBeGrouped,
          visible = _JSON$parse3.visible;

      if (targetContainerId) {
        insertContainerImage(targetContainerId);
        var children = insertedContainers.get(targetContainerId) || [];
        insertedObj[instanceId] = { id: instanceId, parent: targetContainerId, shouldBeGrouped: shouldBeGrouped };
        children.push(instanceId);
        insertedContainers.set(targetContainerId, children);
      }

      if (visible) {
        if (modelContainerDisplayBlacklist.indexOf(modelId) === -1) {
          setTimeout((0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return insertModelImage(instanceId);

                  case 2:
                    selectModelImage(instanceId);

                  case 3:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          })), 0);
        }
      }
      setTimeout(function () {
        return coreInterface.emit('_Result', jobId, null);
      }, 0);
    }

    function prepareAllModelAssets(jobId) {
      return simulateTransfer('Download', 'ModelResources', jobId);
    }

    function prepareModelResources(jobId) {
      return simulateTransfer('Download', 'ModelResources', jobId);
    }

    function prepareCategoryImage(jobId) {
      return simulateTransfer('Download', 'CategoryImage', jobId);
    }

    function prepareCustomImage(jobId, fileName, url) {
      customImages['/CustomImages/' + fileName] = url;
      return simulateTransfer('Download', 'CustomImage', jobId);
    }

    function getModelDescription(jobId, modelId) {
      if (online) {

        return getData(appConfig.host + '/api10/models/ids:' + modelId).then(function (json) {
          return JSON.parse(json);
        }).then(function (data) {
          return data.models[0];
        }).then(function (data) {
          return JSON.stringify(data);
        }).then(function (json) {
          return coreInterface.emit('_Result', jobId, json);
        });
      } else {
        // TODO: this error might not be simulated properly
        setTimeout(function () {
          return coreInterface.emit('_OnError', jobId, new Error('Could not resolve host name'));
        }, 0);
      }
    }

    function prepareAppData(jobId) {
      if (online) {
        setTimeout(function () {
          return coreInterface.emit('_Result', jobId, coreInterface.mock.getScenarioConfig().then(function (json) {
            return JSON.parse(json);
          }).then(function (_ref8) {
            var config = _ref8.config;
            return getData('' + host + config.appData);
          }));
        }, 0);
      } else {
        setTimeout(function () {
          return coreInterface.emit('_OnError', jobId, new Error('Could not resolve host name'));
        }, 0);
      }
    }

    function getMaterialDescription(jobId, materialId) {
      if (online) {

        return getData(appConfig.host + '/materials/api/action:getDescription/id:' + materialId).then(function (json) {
          return JSON.parse(json);
        }).then(function (json) {
          return coreInterface.emit('_Result', jobId, json);
        });
      } else {
        // TODO: this error might not be simulated properly
        setTimeout(function () {
          return coreInterface.emit('_OnError', jobId, new Error('Could not resolve host name'));
        }, 0);
      }
    }

    //======================================================================================================================
    // EVENTS
    //======================================================================================================================

    function deleteCustomFile(name) {
      setTimeout(function () {
        return delete files[name];
      });
    }

    function takeScreenshot() {
      setTimeout(function () {
        return coreInterface.emit('screenshotTaken');
      }, 0);
    }

    function saveFreezeFrame(name, saveToGallery) {
      var freezeFrame = {
        name: (0, _generateId2.default)(),
        thumbnailUrl: '/Freezeframes/General/' + name + '_thumb.png',
        imageUrl: '/Freezeframes/General/' + name + '.png'
      };
      freezeFrames.push(freezeFrame);
      setTimeout(function () {
        return coreInterface.emit('freezeFrameTaken');
      }, 0);
      return (0, _bluebird.resolve)(freezeFrame);
    }

    function openInExternalBrowser(url) {
      window.open(url, '_target');
    }

    function openInInternalBrowser(url) {
      var frame = prepareIFrame();

      frame.src = url;
      document.documentElement.appendChild(frame);
    }

    function deleteSelectedModel() {
      var instanceId = selectedId;
      setTimeout(function () {
        return coreInterface.emit('selectionChanged', null);
      }, 0);
      selectModelImage(null);
      var modelImage = insertedModelImages.get(instanceId);
      if (modelImage) modelImage.parentNode.removeChild(modelImage);

      var container = insertedContainers.get(instanceId) || [];
      container.forEach(function (childId) {
        var child = insertedModelImages.get(childId);
        if (child) child.parentNode.removeChild(child);
        insertedModelImages.delete(childId);
        delete insertedObj[childId];
      });

      delete insertedObj[instanceId];
      insertedContainers.delete(instanceId);
      return (0, _bluebird.resolve)(insertedModelImages.delete(instanceId));
    }
  }

  function addSimulatorPanel() {
    var document = window.document;
    var appContainer = document.getElementById('viewar_app') || document.getElementsByTagName('body')[0];

    var div = document.createElement('div');
    div.classList.add('SimulatorPanel');
    Object.assign(div.style, {
      position: 'fixed',
      bottom: '0',
      right: '0',
      zIndex: '1000000'
    });
    appContainer.appendChild(div);

    /* Structure */
    var toggleStructureButton = document.createElement('button');
    toggleStructureButton.innerHTML = 'Structure: DISCONNECTED';
    toggleStructureButton.style.float = 'right';
    toggleStructureButton.addEventListener('click', function () {
      structureConnected = !structureConnected;
      toggleStructureButton.innerHTML = 'Structure: ' + (structureConnected ? 'CONNECTED' : 'DISCONNECTED');
      toggleStructureBatteryButton.style.display = structureConnected ? 'inline' : 'none';
      toggleTrackingButton.style.display = structureConnected ? 'inline' : 'none';
      toggleMarkerFoundButton.style.display = !structureConnected ? 'inline' : 'none';
      toggleTrackingSpeedbutton.style.display = tracking && structureConnected ? 'inline' : 'none';

      var json = {
        type: 'showConnectSensor',
        data: structureConnected
      };
      var jobId = (0, _generateId2.default)();
      coreInterface.emit('customTrackingInfo', jobId, JSON.stringify(json));
    });
    div.appendChild(toggleStructureButton);

    /* Structure Battery */
    var toggleStructureBatteryButton = document.createElement('button');
    toggleStructureBatteryButton.innerHTML = 'Structure Battery: 73%';
    Object.assign(toggleStructureBatteryButton.style, {
      display: structureConnected ? 'inline' : 'none',
      float: 'right'
    });
    toggleStructureBatteryButton.addEventListener('click', function () {
      structureBattery = !structureBattery;
      toggleStructureBatteryButton.innerHTML = 'Structure Battery: ' + (structureBattery ? '73%' : '0%');
      var json = {
        type: 'showBatteryNeedsCharging',
        data: structureBattery
      };
      var jobId = (0, _generateId2.default)();
      coreInterface.emit('customTrackingInfo', jobId, JSON.stringify(json));
    });
    div.appendChild(toggleStructureBatteryButton);

    /* Trackers */
    var tracking = false;
    var toggleTrackingButton = document.createElement('button');
    toggleTrackingButton.innerHTML = 'Trackers: LOST';
    Object.assign(toggleTrackingButton.style, {
      display: structureConnected ? 'inline' : 'none',
      float: 'right'
    });
    toggleTrackingButton.addEventListener('click', function () {
      tracking = !tracking;
      toggleTrackingButton.innerHTML = 'Trackers: ' + (tracking ? 'FOUND' : 'LOST');
      toggleTrackingSpeedbutton.style.display = tracking && structureConnected ? 'inline' : 'none';
      coreInterface.emit('trackingTargetStatusChanged', 'VCard01', tracking ? 'found' : 'lost');
    });
    div.appendChild(toggleTrackingButton);

    /* Trackers Speed */
    var holdDeviceStill = false;
    var toggleTrackingSpeedbutton = document.createElement('button');
    toggleTrackingSpeedbutton.innerHTML = 'Trackingspeed: NORMAL';
    Object.assign(toggleTrackingSpeedbutton.style, {
      display: tracking && structureConnected ? 'inline' : 'none',
      float: 'right'
    });
    toggleTrackingSpeedbutton.addEventListener('click', function () {
      holdDeviceStill = !holdDeviceStill;
      toggleTrackingSpeedbutton.innerHTML = 'Trackingspeed: ' + (holdDeviceStill ? 'HIGH' : 'NORMAL');
      var json = {
        type: 'showHoldDeviceStill',
        data: holdDeviceStill
      };
      var jobId = (0, _generateId2.default)();
      coreInterface.emit('customTrackingInfo', jobId, JSON.stringify(json));
    });
    div.appendChild(toggleTrackingSpeedbutton);

    /* Marker */
    var markerFound = false;
    var toggleMarkerFoundButton = document.createElement('button');
    toggleMarkerFoundButton.innerHTML = 'Tracking: LOST';
    Object.assign(toggleMarkerFoundButton.style, {
      display: !structureConnected ? 'inline' : 'none',
      float: 'right'
    });
    toggleMarkerFoundButton.addEventListener('click', function () {
      markerFound = !markerFound;
      toggleMarkerFoundButton.innerHTML = 'Tracking: ' + (markerFound ? 'FOUND' : 'LOST');
      coreInterface.emit('trackingTargetStatusChanged', 'VCard01', markerFound ? 'found' : 'lost');
    });
    div.appendChild(toggleMarkerFoundButton);

    /* Connection */
    online = true;
    var connectionButton = document.createElement('button');
    connectionButton.innerHTML = 'Connection: ONLINE';
    Object.assign(connectionButton.style, {
      display: !structureConnected ? 'inline' : 'none',
      float: 'right'
    });
    connectionButton.addEventListener('click', function () {
      online = !online;
      connectionButton.innerHTML = 'Connection: ' + (online ? 'ONLINE' : 'OFFLINE');
    });
    div.appendChild(connectionButton);
  }

  function getData(url) {
    return new _bluebird2.default(function (resolve, reject) {
      if (downloadCache[url]) {
        resolve(downloadCache[url]);
      } else {
        var req = new XMLHttpRequest();

        req.open('GET', url, true);

        req.onload = function () {
          if (req.status == 200) {
            downloadCache[url] = req.response;
            resolve(req.response);
          } else {
            reject(new Error(req.status));
          }
        };

        req.onerror = function () {
          reject(new Error('XHR failed'));
        };

        req.send();
      }
    });
  }

  function prepareIFrame() {
    var frame = document.createElement('iframe');
    Object.assign(frame.style, {
      position: 'fixed',
      zindex: '10000',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    });

    frame.width = '512px';
    frame.height = '384px';

    return frame;
  }

  function addCustomFiles(files) {
    window.files = files;
  }

  //======================================================================================================================
  // UI MOCK FUNCTIONS
  //======================================================================================================================

  function addCustomStageBackgrounds(customStageBackgrounds) {
    customStageBackgrounds['AR'] = 'url(\'' + host + '/images_new/ar_background.png\') center / cover no-repeat';
    customStageBackgrounds['Freeze'] = 'url(\'' + host + '/images_new/ar_background.png\') center / cover no-repeat';
    customStageBackgrounds['Grid'] = 'lightgrey';
    customStageBackgrounds['VR'] = 'lightgrey';
    customStageBackgrounds['Experience'] = 'url(\'' + host + '/images_new/ar_background.png\') center / cover no-repeat';
  }

  function showStageText(text) {
    var appContainer = document.getElementById('viewar_app') || document.getElementsByTagName('body')[0];
    var freezeExisting = document.getElementById('freezeContainer');
    var freezeContainer = freezeExisting || document.createElement('div');
    if (!freezeExisting) {
      freezeContainer.id = 'freezeContainer';
      Object.assign(freezeContainer.style, {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -30%)',
        webkitTransform: 'translate(-50%, -30%)',
        msTransform: 'translate(-50%, -30%)',
        mozTransform: 'translate(-50%, -30%)',
        zIndex: '-1000',
        height: '64px',
        border: 'none',
        fontSize: '5em',
        color: 'rgba(0, 0, 0, 0.5)'
      });

      appContainer.appendChild(freezeContainer);
    }
    if (text) {
      freezeContainer.innerHTML = text;
      freezeContainer.style.display = 'block';
    } else {
      freezeContainer.style.display = 'none';
    }
  }

  function showBackground(stage) {
    var appContainer = document.getElementById('viewar_app') || document.getElementsByTagName('body')[0];
    var background = customStageBackgrounds[stage];
    if (background) {
      var existing = document.getElementById('backgroundElement');
      var backgroundElement = existing || document.createElement('div');
      if (!existing) {
        backgroundElement.id = 'backgroundElement';
        Object.assign(backgroundElement.style, {
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '-1000000',
          backgroundSize: 'cover',
          left: '0',
          top: '0'
        });

        backgroundElement.addEventListener('click', function () {
          viewarApi.coreInterface.emit('selectionChanged', null);
          selectModelImage(null);
        });
        appContainer.appendChild(backgroundElement);
      }
      backgroundElement.style.background = background;
    }
  }

  function insertContainerImage(containerId) {
    if (modelContainerDisplayBlacklist.indexOf(containerId) > -1) {
      return;
    }

    var modelContainer = getOrCreateModelContainer();
    var instance = viewarApi.sceneManager.findNodeById(containerId);
    var containerExisting = document.getElementById('containerImage_' + containerId);
    var containerImage = containerExisting || document.createElement('div');
    if (!containerExisting) {
      containerImage.id = 'containerImage_' + containerId;
      Object.assign(containerImage.style, {
        position: 'relative',
        float: 'left',
        zIndex: '10000',
        padding: '2px',
        margin: '2px',
        background: 'white',
        border: '2px solid rgba(0,0,0,0)'
      });
      containerImage.innerHTML = '<div style="overflow-x: hidden; white-space: nowrap; ">[' + containerId.substr(0, 8) + '...]</div>';
    }
    if (instance) {

      var selection = instance;
      var parentContainer = modelContainer;
      if (selection.parent && selection.parent.id !== 'DefaultLayer') {
        parentContainer = document.getElementById('containerImage_' + selection.parent.id);
      }
      parentContainer.appendChild(containerImage);

      containerImage.addEventListener('click', function () {
        while (selection.parent && selection.parent.type !== 'ungrouped' && selection.parent.id !== 'DefaultLayer') {
          selection = selection.parent;
        }

        if (!selection.model || selection.model.type !== 'environment') {
          selectModelImage(selection.id);
          viewarApi.coreInterface.emit('selectionChanged', selection.id);
        } else {
          selectModelImage(null);
          viewarApi.coreInterface.emit('selectionChanged', null);
        }
      });
    } else {

      var _selection2 = insertedObj[containerId];
      var _parentContainer2 = modelContainer;
      if (_selection2.parent && _selection2.parent !== 'DefaultLayer') {
        _parentContainer2 = document.getElementById('containerImage_' + _selection2.parent);
      }
      _parentContainer2.appendChild(containerImage);

      containerImage.addEventListener('click', function (e) {
        while (_selection2.parent && _selection2.shouldBeGrouped && _selection2.parent !== 'DefaultLayer') {
          _selection2 = insertedObj[_selection2.parent];
        }

        selectModelImage(_selection2.id);
        viewarApi.coreInterface.emit('selectionChanged', _selection2.id);

        e.stopPropagation();
        e.preventDefault();
      });
    }
    insertedModelImages.set(containerId, containerImage);
  }

  function getOrCreateModelContainer() {
    var appContainer = document.getElementById('viewar_app') || document.getElementsByTagName('body')[0];
    var existing = document.getElementById('modelContainer');
    var modelContainer = existing || document.createElement('div');
    if (!existing) {
      modelContainer.id = 'modelContainer';
      Object.assign(modelContainer.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        maxWidth: '60%',
        maxHeight: '60%',
        overflowY: 'auto',
        transform: 'translate(-50%, -50%)',
        webkitTransform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        mozTransform: 'translate(-50%, -50%)',
        zIndex: '-1000'
      });
      var title = document.createElement('div');
      title.innerHTML = 'Scene Objects:';
      Object.assign(title.style, {
        textAlign: 'center'
      });
      modelContainer.appendChild(title);

      modelContainer.addEventListener('click', function () {
        viewarApi.coreInterface.emit('selectionChanged', null);
        selectModelImage(null);
      });

      appContainer.appendChild(modelContainer);
    }

    modelContainer.style.display = 'block';
    return modelContainer;
  }

  function selectModelImage(instanceId) {
    selectedId = instanceId;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = insertedModelImages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref10 = _step.value;

        var _ref11 = _slicedToArray(_ref10, 2);

        var currentId = _ref11[0];
        var modelImage = _ref11[1];

        if (currentId === instanceId) {
          Object.assign(modelImage.style, {
            border: '2px solid red',
            padding: '2px'
          });
        } else {
          Object.assign(modelImage.style, {
            border: '2px solid rgba(0,0,0,0)',
            padding: '2px'
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.createUwpInterface = createUwpInterface;

var _utils = __webpack_require__(6);

var _constants = __webpack_require__(4);

var _coherent = __webpack_require__(222);

var _appConfig = __webpack_require__(19);

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createUwpInterface(_ref) {

  //======================================================================================================================
  // INITIALIZATION
  //======================================================================================================================

  var initialize = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (initialized) {
                _context.next = 8;
                break;
              }

              _context.next = 3;
              return engine.initialize();

            case 3:

              engine.on('_Result', function (requestId, response) {
                setTimeout(function () {
                  if (resolvers[requestId]) {
                    resolvers[requestId].resolve(response);
                    delete resolvers[requestId];
                  }
                });
              });
              engine.on('_OnError', function (requestId, error) {
                setTimeout(function () {
                  if (requestId) {
                    resolvers[requestId].reject(error);
                    delete resolvers[requestId];
                  }
                });
              });

              _context.next = 7;
              return (0, _bluebird.resolve)().then(function () {
                return call('scriptingLayerReady');
              });

            case 7:

              initialized = true;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function initialize() {
      return _ref2.apply(this, arguments);
    };
  }();

  //======================================================================================================================
  // CALL
  //======================================================================================================================

  var window = _ref.window,
      logger = _ref.logger;

  var initialized = false;
  var adapter = null;

  var eventHandlers = {};
  var resolvers = [];
  var callHistory = [];

  var nextRequestId = 10000;

  var engine = (0, _coherent.createEngine)(window, window.engine, true);

  var coreInterface = {
    initialize: initialize,
    call: call,
    resolveUrl: resolveUrl,
    on: engine.on.bind(engine),
    once: once,
    off: engine.off.bind(engine),
    emit: engine.trigger.bind(engine),

    get platform() {
      return 'UWP';
    },
    get callHistory() {
      return callHistory;
    }
  };

  return coreInterface;function once(eventName) {
    return new _bluebird2.default(function (resolve) {
      engine.on(eventName, function onceHandler(response) {
        engine.off(eventName, onceHandler);
        resolve(response);
      });
    });
  }

  function call(callName) {
    for (var _len = arguments.length, messageArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      messageArguments[_key - 1] = arguments[_key];
    }

    logCall(callName, messageArguments);

    if (isAsyncCall(callName)) {
      return callAsync(callName, messageArguments.map(_utils.format), nextRequestId++).then(function (response) {
        return (0, _utils.parse)(response);
      });
    } else {
      return engine.call.apply(engine, [callName].concat(_toConsumableArray(messageArguments.map(_utils.format)))).then(_utils.parse);
    }
  }

  function callAsync(callName, args, currentId) {
    return new _bluebird2.default(function (resolve, reject) {
      resolvers[currentId] = { resolve: resolve, reject: reject };
      engine.trigger.apply(engine, [callName, currentId].concat(_toConsumableArray(args)));
    });
  }

  function isAsyncCall(callName) {
    return _constants.ASYNC_CALLS.includes(callName) || eventHandlers[callName] && !_constants.SYNC_CALLS.includes(callName);
  }

  function resolveUrl(relativeUrl) {
    if (relativeUrl.includes('/Models/Images/')) {
      var results = /\/(\w+)\.\w+$/.exec(relativeUrl);
      if (results[1]) {
        return _appConfig2.default.host + '/model/downloadImage/display:1/size:large/id:' + results[1];
      }
    } else if (relativeUrl.includes('/CategoryImages/')) {
      var _results = /\/(\w+)\.\w+$/.exec(relativeUrl);
      if (_results[1]) {
        return _appConfig2.default.host + '/category/display:1/downloadImage/size:large/id:' + _results[1];
      }
    } else if (relativeUrl.includes('/Models/Resources/')) {
      var _results2 = /\/(\w+)\/([\w#]+\.\w+)$/.exec(relativeUrl);
      if (_results2 && _results2[1] && _results2[2]) {
        return _appConfig2.default.host + '/resources/DownloadImage/display:1/id:' + _results2[1] + '/name:' + encodeURIComponent(_results2[2]);
      }
    }
    return '';
  }

  //======================================================================================================================
  // DEBUG
  //======================================================================================================================

  function logCall(callName, requestId, messageArguments) {
    var logEntry = {
      id: requestId,
      name: callName,
      arguments: messageArguments,
      timestamp: new Date(),
      trace: new Error().stack.replace(/Error\s+/, '\t')
    };

    if (coreInterface.callHistory.push(logEntry) === 100) {
      coreInterface.callHistory.shift();
    }
  }
}

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.createEngine = createEngine;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEngine(global, engine, hasOnLoad) {
  'use strict';

  var VERSION = [1, 11, 1, 2];

  function Emitter() {
    this.events = {};
  }

  Emitter.prototype._createClear = function (object, name, handler) {
    return function () {
      var handlers = object.events[name];
      if (handlers) {
        var index = -1;
        // this was in native previously
        if (handler === undefined) {
          for (var i = 0; i < handlers.length; ++i) {
            if (handlers[i].wasInCPP !== undefined) {
              index = i;
              break;
            }
          }
        } else {
          index = handlers.indexOf(handler);
        }
        if (index != -1) {
          handlers.splice(index, 1);
          if (handlers.length === 0) {
            delete object.events[name];
          }
        }
      } else {
        if (engine.RemoveOnHandler !== undefined) {
          engine.RemoveOnHandler(name);
        }
      }
    };
  };

  Emitter.prototype.on = function (name, callback, context) {
    var handlers = this.events[name];
    if (handlers === undefined) handlers = this.events[name] = [];

    var handler = new Handler(callback, context || this);
    handlers.push(handler);
    return { clear: this._createClear(this, name, handler) };
  };

  Emitter.prototype.off = function (name, handler, context) {
    var handlers = this.events[name];

    if (handlers !== undefined) {
      context = context || this;

      var index;
      var length = handlers.length;
      for (index = 0; index < length; ++index) {
        var reg = handlers[index];
        if (reg.code == handler && reg.context == context) {
          break;
        }
      }
      if (index < length) {
        handlers.splice(index, 1);
        if (handlers.length === 0) {
          delete this.events[name];
        }
      }
    } else {
      engine.RemoveOnHandler(name);
    }
  };

  var isAttached = engine !== undefined;

  engine = engine || {};
  engine.isAttached = isAttached;

  Emitter.prototype.merge = function (emitter) {
    var lhs = this.events,
        rhs = emitter.events,
        push = Array.prototype.push,
        events;

    for (var e in rhs) {
      events = lhs[e] = lhs[e] || [];
      push.apply(events, rhs[e]);
    }
  };

  function Handler(code, context) {
    this.code = code;
    this.context = context;
  }

  Emitter.prototype.trigger = function (name) {
    var handlers = this.events[name];

    if (handlers !== undefined) {
      var args = Array.prototype.slice.call(arguments, 1);

      handlers.forEach(function (handler) {
        handler.code.apply(handler.context, args);
      });
    }
  };

  engine.events = {};
  for (var property in Emitter.prototype) {
    engine[property] = Emitter.prototype[property];
  }

  engine.on = function (name, callback, context) {
    var handlers = this.events[name];

    if (handlers === undefined && engine.AddOrRemoveOnHandler !== undefined) {

      // Check where to cache the handler
      var prevEvent = engine.AddOrRemoveOnHandler(name, callback, context);

      // handler cached in C++
      if (prevEvent === undefined) {
        return { clear: this._createClear(this, name, undefined) };
      }
      handlers = this.events[name] = [];

      // Add the previous handler
      var prevHandler = new Handler(prevEvent[0], prevEvent[1] || this);
      prevHandler.wasInCPP = true;
      handlers.push(prevHandler);
    } else if (handlers === undefined) {
      handlers = this.events[name] = [];
    }

    var handler = new Handler(callback, context || this);
    handlers.push(handler);
    return { clear: this._createClear(this, name, handler) };
  };

  engine._trigger = Emitter.prototype.trigger;

  var concatArguments = Array.prototype.concat;
  engine.trigger = function (name) {
    this._trigger.apply(this, arguments);
    this.TriggerEvent.apply(this, arguments);

    if (this.events['all'] !== undefined) {
      var allArguments = concatArguments.apply(['all'], arguments);
      this._trigger.apply(this, allArguments);
    }
  };

  engine._BindingsReady = false;
  engine._WindowLoaded = false;
  engine._RequestId = 0;
  engine._ActiveRequests = {};

  engine.call = function () {
    engine._RequestId++;
    var id = engine._RequestId;

    var deferred = new _bluebird2.default(function (resolve, reject) {
      engine._ActiveRequests[id] = {
        resolve: resolve,
        reject: reject
      };
    });

    var messageArguments = Array.prototype.slice.call(arguments);
    messageArguments.splice(1, 0, id);
    engine.SendMessage.apply(this, messageArguments);
    return deferred;
  };

  engine._Errors = ['Success', 'ArgumentType', 'NoSuchMethod', 'NoResult'];

  engine._ForEachError = function (errors, callback) {
    var length = errors.length;

    for (var i = 0; i < length; ++i) {
      callback(errors[i].first, errors[i].second);
    }
  };

  engine._MapErrors = function (errors) {
    var length = errors.length;

    for (var i = 0; i < length; ++i) {
      errors[i].first = engine._Errors[errors[i].first];
    }
  };

  engine._TriggerError = function (type, message) {
    engine.trigger('Error', type, message);
  };

  engine._OnError = function (requestId, errors) {
    engine._MapErrors(errors);

    if (requestId === null || requestId === 0) {
      engine._ForEachError(errors, engine._TriggerError);
    } else {
      var deferred = engine._ActiveRequests[requestId];

      delete engine._ActiveRequests[requestId];

      deferred.reject(errors);
    }
  };

  engine._eventHandles = {};

  engine._Register = function (eventName) {
    var trigger = function (name, engine) {
      return function () {
        var eventArguments = [name];
        eventArguments.push.apply(eventArguments, arguments);
        engine.TriggerEvent.apply(this, eventArguments);
      };
    }(eventName, engine);

    engine._eventHandles[eventName] = engine.on(eventName, trigger);
  };

  engine._removeEventThunk = function (name) {
    var handle = engine._eventHandles[name];
    handle.clear();
    delete engine._eventHandles[name];
  };

  engine._Unregister = function (name) {
    if (typeof name === 'string') {
      engine._removeEventThunk(name);
    } else {
      name.forEach(engine._removeEventThunk, engine);
    }
  };

  engine._OnReady = function () {
    engine._BindingsReady = true;
    if (engine._WindowLoaded) {
      engine.trigger('Ready');
    }
  };

  engine._OnWindowLoaded = function () {
    engine._WindowLoaded = true;
    if (engine._BindingsReady) {
      engine.trigger('Ready');
    }
  };

  engine._ThrowError = function (error) {
    var prependTab = function prependTab(s) {
      return "\t" + s;
    };
    var errorString = error.name + ": " + error.message + "\n" + error.stack.split("\n").map(prependTab).join("\n");
    console.error(errorString);
  };

  engine._Result = function (requestId) {
    var deferred = engine._ActiveRequests[requestId];
    if (deferred !== undefined) {
      delete engine._ActiveRequests[requestId];

      var resultArguments = Array.prototype.slice.call(arguments);
      resultArguments.shift();
      deferred.resolve.apply(deferred, resultArguments);
    }
  };

  engine.initialize = function () {
    if (hasOnLoad) {
      global.addEventListener("load", function () {
        engine._OnWindowLoaded();
      });
    } else {
      engine._WindowLoaded = true;
    }

    engine.on('_Result', engine._Result, engine);
    engine.on('_Register', engine._Register, engine);
    engine.on('_Unregister', engine._Unregister, engine);
    engine.on('_OnReady', engine._OnReady, engine);
    engine.on('_OnError', engine._OnError, engine);

    var promise = new _bluebird2.default(function (resolve) {
      return engine.on('Ready', resolve);
    });

    engine.BindingsReady(VERSION[0], VERSION[1], VERSION[2], VERSION[3]);

    return promise;
  };

  return engine;
}

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _global = __webpack_require__(47);

var _global2 = _interopRequireDefault(_global);

var _dummyLogger = __webpack_require__(224);

var _dummyLogger2 = _interopRequireDefault(_dummyLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDomLogger(_ref) {
  var config = _ref.config,
      window = _ref.window,
      logLevels = _ref.logLevels,
      ignore = _ref.ignore;

  var messageStyles = {
    error: {
      backgroundColor: 'hsl(0, 100%, 97%)',
      border: '1px solid hsl(0, 100%, 92%)',
      color: 'red'
    },
    warn: {
      backgroundColor: 'hsl(50, 100%, 95%)',
      border: '1px solid hsl(50, 100%, 88%)',
      color: 'hsl(39, 100%, 18%)'
    },
    log: {
      backgroundColor: 'white',
      border: '1px solid rgb(240, 240, 240)',
      color: 'black'
    },
    info: {
      backgroundColor: 'white',
      border: '1px solid rgb(240, 240, 240)',
      color: 'black'
    }
  };

  var buttonStyle = {
    padding: '0.25em',
    lineHeight: '0.75em',
    margin: '0.125em'
  };

  var listContainer = window.document.createElement('div');

  Object.assign(listContainer.style, {
    position: 'fixed',
    zIndex: '9999999',
    bottom: '0',
    width: '100%'
  });

  window.document.body.appendChild(listContainer);

  function createMessage(type, content) {
    var document = window.document;
    var container = document.createElement('div');

    Object.assign(container.style, {
      margin: '0.25em'
    }, messageStyles[type]);

    var text = content.message || content;
    var stack = content.stack;

    var closeButton = document.createElement('button');
    Object.assign(closeButton.style, buttonStyle);
    closeButton.innerText = '✖';
    closeButton.addEventListener('click', function () {
      return listContainer.removeChild(container);
    });
    container.appendChild(closeButton);

    if (stack) {
      var stackContainer = document.createElement('pre');
      stackContainer.style.display = 'none';
      stackContainer.innerText = stack;

      var open = false;

      var toggleButton = document.createElement('button');
      Object.assign(toggleButton.style, buttonStyle);
      toggleButton.innerText = '▶';
      toggleButton.addEventListener('click', function () {
        if (!open) {
          toggleButton.innerText = '▼';
          stackContainer.style.display = 'block';
        } else {
          toggleButton.innerText = '▶';
          stackContainer.style.display = 'none';
        }
        open = !open;
      });

      container.appendChild(toggleButton);

      var message = document.createElement('pre');
      message.style.display = 'inline-block';
      message.innerText = text;
      container.appendChild(message);

      container.appendChild(stackContainer);
    } else {
      var _message = document.createElement('pre');
      _message.style.display = 'inline-block';
      _message.innerText = text;
      container.appendChild(_message);
    }

    listContainer.appendChild(container);
  }

  function logMessage(type) {
    if (config.logToScreen && logLevels.includes(type)) {
      for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        items[_key - 1] = arguments[_key];
      }

      items.forEach(function (item) {
        if (!ignore.includes(item.stack || item) && (typeof item === 'string' || item instanceof Error)) {
          createMessage(type, item);
        }
      });
    }
  }

  return {
    error: function error() {
      for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      return logMessage.apply(undefined, ['error'].concat(items));
    },
    warn: function warn() {
      for (var _len3 = arguments.length, items = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
      }

      return logMessage.apply(undefined, ['warn'].concat(items));
    },
    log: function log() {
      for (var _len4 = arguments.length, items = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        items[_key4] = arguments[_key4];
      }

      return logMessage.apply(undefined, ['log'].concat(items));
    },
    info: function info() {
      for (var _len5 = arguments.length, items = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        items[_key5] = arguments[_key5];
      }

      return logMessage.apply(undefined, ['info'].concat(items));
    }
  };
}

exports.default = _global2.default && _global2.default.document ? createDomLogger({
  config: _config2.default,
  window: _global2.default,
  logLevels: ['error', 'warn'],
  ignore: ['SimulateInfiniteLoop']
}) : _dummyLogger2.default;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  info: function info() {},
  warn: function warn() {},
  log: function log() {},
  error: function error() {}
};

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(35),
    equalArrays = __webpack_require__(116),
    equalByTag = __webpack_require__(229),
    equalObjects = __webpack_require__(230),
    getTag = __webpack_require__(102),
    isArray = __webpack_require__(5),
    isBuffer = __webpack_require__(42),
    isTypedArray = __webpack_require__(62);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),
/* 226 */
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),
/* 227 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),
/* 228 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(20),
    Uint8Array = __webpack_require__(104),
    eq = __webpack_require__(21),
    equalArrays = __webpack_require__(116),
    mapToArray = __webpack_require__(106),
    setToArray = __webpack_require__(44);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(99);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),
/* 231 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */
function isUndefined(value) {
  return value === undefined;
}

module.exports = isUndefined;


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(17),
    createAssigner = __webpack_require__(118),
    keysIn = __webpack_require__(29);

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

module.exports = assignInWith;


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(21),
    isArrayLike = __webpack_require__(22),
    isIndex = __webpack_require__(43),
    isObject = __webpack_require__(7);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(21);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
 * of source objects to the destination object for all destination properties
 * that resolve to `undefined`.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

module.exports = customDefaultsAssignIn;


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fail;
function fail(error) {
  if (!(error instanceof Error)) {
    throw new Error(error);
  } else {
    throw error;
  }
}

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNamespace;
var namespaces = new WeakSet();

function createNamespace() {
  var map = new WeakMap();

  namespaces.add(map);

  return function get(object) {
    !map.has(object) && map.set(object, {});
    return map.get(object);
  };
}

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.updateScene = updateScene;
exports.analyzeNodes = analyzeNodes;
function updateScene(oldScene, newScene, _ref) {
  var addNode = _ref.addNode,
      removeNode = _ref.removeNode,
      updateNode = _ref.updateNode,
      moveNode = _ref.moveNode;
  var emit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

  var _analyzeNodes = analyzeNodes(null, oldScene, newScene),
      nodesToAdd = _analyzeNodes.nodesToAdd,
      nodesToUpdate = _analyzeNodes.nodesToUpdate,
      nodesToRemove = _analyzeNodes.nodesToRemove,
      nodesToMove = _analyzeNodes.nodesToMove;

  var totalCount = nodesToAdd.length + nodesToUpdate.length + nodesToRemove.length;

  var currentItem = 0;
  emit('sceneStateUpdateStarted', totalCount);

  function updateCount() {
    emit('sceneStateUpdateProgress', ++currentItem, totalCount);
  }

  return (0, _bluebird.all)([(0, _bluebird.all)(nodesToUpdate.map(function (info) {
    return updateNode(info).then(updateCount);
  })), (0, _bluebird.all)(nodesToRemove.map(function (node) {
    return removeNode(node).then(updateCount);
  })), (0, _bluebird.all)(nodesToMove.map(function (node) {
    return moveNode(node).then(updateCount);
  })), (0, _bluebird.all)(nodesToAdd.map(function (node) {
    return addNode(node.parent, node.specification).then(updateCount);
  }))]).then(function () {
    return emit('sceneStateUpdateCompleted');
  });
}

function analyzeNodes(parent, oldScene, newScene) {
  var nodesToUpdate = {};
  var nodesToAdd = {};
  var nodesToRemove = {};
  var nodesToMove = {};

  compareNodes(parent, oldScene, newScene);

  function compareNodes(parent, oldSceneNode, newSceneNode) {
    if (oldSceneNode && newSceneNode) {
      nodesToUpdate[oldSceneNode.id] = { oldSceneNode: oldSceneNode, newSceneNode: newSceneNode };
      if (oldSceneNode.children && newSceneNode.children) {
        var children = {};

        oldSceneNode.children.forEach(function (oldChild) {
          return children[oldChild.id] = Object.assign({}, children[oldChild.id], { oldChild: oldChild });
        });
        newSceneNode.children.forEach(function (newChild) {
          return children[newChild.id] = Object.assign({}, children[newChild.id], { newChild: newChild });
        });

        Object.values(children).forEach(function (_ref2) {
          var oldChild = _ref2.oldChild,
              newChild = _ref2.newChild;
          return compareNodes(oldSceneNode, oldChild, newChild);
        });
      }
    } else if (!oldSceneNode && newSceneNode) {
      if (nodesToRemove[newSceneNode.id]) {
        nodesToMove[newSceneNode.id] = { node: nodesToRemove[newSceneNode.id], parent: parent };
        delete nodesToRemove[newSceneNode.id];
      } else {
        nodesToAdd[newSceneNode.id] = { parent: parent, specification: newSceneNode };
      }
    } else if (!newSceneNode && oldSceneNode) {
      if (nodesToAdd[oldSceneNode.id]) {
        nodesToMove[oldSceneNode.id] = { node: nodesToAdd[oldSceneNode.id], parent: nodesToAdd[oldSceneNode.id].parent };
        delete nodesToAdd[oldSceneNode.id];
      } else {
        nodesToRemove[oldSceneNode.id] = oldSceneNode;
      }
    }
  }

  return {
    nodesToAdd: Object.values(nodesToAdd),
    nodesToUpdate: Object.values(nodesToUpdate),
    nodesToMove: Object.values(nodesToMove),
    nodesToRemove: Object.values(nodesToRemove)
  };
}

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = __webpack_require__(2);

var _simpleModel = __webpack_require__(120);

var _simpleModel2 = _interopRequireDefault(_simpleModel);

var _assemblyModel = __webpack_require__(292);

var _assemblyModel2 = _interopRequireDefault(_assemblyModel);

var _configurableModel = __webpack_require__(294);

var _configurableModel2 = _interopRequireDefault(_configurableModel);

var _referenceModel = __webpack_require__(310);

var _referenceModel2 = _interopRequireDefault(_referenceModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = function Model(props, model) {
  switch (props.type) {
    case 'assembly':
      return (0, _assemblyModel2.default)(props, model);
    case 'basic':
      return (0, _simpleModel2.default)(props, model);
    case 'configurable':
      return (0, _configurableModel2.default)(props, model);
    case 'data':
      return (0, _simpleModel2.default)(props, model);
    case 'environment':
      return (0, _simpleModel2.default)(props, model);
    case 'reference':
      return (0, _referenceModel2.default)(props, model);
    default:
      throw new Error('Error! Unrecognized model type "' + props.type + '"!');
  }
};

exports.default = (0, _compose.compose)(Model);

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animation = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _emitter = __webpack_require__(53);

var _emitter2 = _interopRequireDefault(_emitter);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface Animation
 * @implements Playable
 */
var Animation = exports.Animation = function Animation(_ref, animation) {
  var emit = _ref.emit,
      name = _ref.name,
      instanceId = _ref.instanceId,
      duration = _ref.duration,
      coreInterface = _ref.coreInterface;


  var state = 'stopped';
  var remainingDuration = 0;

  (0, _assign2.default)(animation, {
    pause: pause,
    resume: resume,
    start: start,
    stop: stop,

    /**
     * Name of the animation.
     * @type {string}
     * @memberOf! Animation#
     */
    get name() {
      return name;
    },
    /**
     * State of the animation.
     * @type {string}
     * @memberOf! Animation#
     */
    get state() {
      return state;
    },
    /**
     * Duration of the animation in ms.
     * @type {number}
     * @memberOf! Animation#
     */
    get duration() {
      return duration;
    }
  });

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Pauses playing animation.
   * @returns {Promise} resolved when done.
   * @memberOf! Animation#
   */
  function pause() {
    return coreInterface.call('pauseAnimation', instanceId, name).then(function () {
      return setAnimationState('paused');
    });
  }

  /**
   * Resumes paused animation.
   * @returns {Promise} resolved when done.
   * @memberOf! Animation#
   */
  function resume() {
    return coreInterface.call('resumeAnimation', instanceId, name).then(function () {
      return setAnimationState('playing');
    });
  }

  /**
   * Starts the animation from specified time.
   * @param {number?} timeInMs starting time
   * @param {boolean?} loop whether or not the animation should loop
   * @returns {Promise} resolved when done.
   * @memberOf! Animation#
   */
  function start() {
    var timeInMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return coreInterface.call('startAnimation', instanceId, name, timeInMs || 0, !!loop).then(function () {
      setAnimationState('playing');
      remainingDuration = duration * 1000 - timeInMs;
      setTimeout(updateAnimationStatus, 100);
      return animation;
    });
  }

  /**
   * Stops playing animation. Resets current time to zero.
   * @returns {Promise} resolved when done.
   * @memberOf! Animation#
   */
  function stop() {
    return coreInterface.call('stopAnimation', instanceId, name).then(function () {
      return setAnimationState('stopped');
    });
  }

  //======================================================================================================================
  // PRIVATE FUNCTIONS
  //======================================================================================================================

  function setAnimationState(newState) {
    state = newState;
    emit('stateChanged', state);
  }

  function updateAnimationStatus() {
    // TODO: Remove all logic related to remainingDuration (and the code block below) after the notification
    // 'animationEnded' has been implemented in the UI [VCS-917].
    if (state !== 'playing') {
      return;
    }
    remainingDuration -= 100;
    if (remainingDuration <= 0) {
      coreInterface.emit('animationEnded', name, instanceId);
    } else {
      setTimeout(updateAnimationStatus, 100);
    }
  }
};

exports.default = (0, _compose.compose)((0, _compose.injectProps)({
  coreInterface: _coreInterface2.default
}), _emitter2.default, Animation);

/**
 * Interface for objects that represent streamable content
 *
 * @interface Playable
 */

/**
 * Starts the streaming.
 *
 * @function
 * @name Playable#start
 * @param timeInMs {number} timestamp to start from
 * @param loop {boolean} if true the streamable will restart after finishing
 * @returns {Promise} resolved when done.
 */

/**
 * Stops the streaming.
 *
 * @function
 * @name Playable#stop
 * @returns {Promise} resolved when done.
 */

/**
 * Resumes the streaming.
 *
 * @function
 * @name Playable#resume
 * @returns {Promise} resolved when done.
 */

/**
 * Pauses the streaming.
 *
 * @function
 * @name Playable#pause
 * @returns {Promise} resolved when done.
 */

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deprecate;
function deprecate(fn, msg) {
  var _this = this;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    console.warn(msg || "ViewAR API: Warning! Function " + fn.name + " is deprecated!");
    return fn.call.apply(fn, [_this].concat(args));
  };
}

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(14),
    baseIntersection = __webpack_require__(242),
    baseRest = __webpack_require__(26),
    castArrayLikeObject = __webpack_require__(246);

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersection([2, 1], [2, 3]);
 * // => [2]
 */
var intersection = baseRest(function(arrays) {
  var mapped = arrayMap(arrays, castArrayLikeObject);
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : [];
});

module.exports = intersection;


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(48),
    arrayIncludes = __webpack_require__(77),
    arrayIncludesWith = __webpack_require__(79),
    arrayMap = __webpack_require__(14),
    baseUnary = __webpack_require__(64),
    cacheHas = __webpack_require__(49);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = [];

  while (othIndex--) {
    var array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee));
    }
    maxLength = nativeMin(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined;
  }
  array = arrays[0];

  var index = -1,
      seen = caches[0];

  outer:
  while (++index < length && result.length < maxLength) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (!(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator)
        )) {
      othIndex = othLength;
      while (--othIndex) {
        var cache = caches[othIndex];
        if (!(cache
              ? cacheHas(cache, computed)
              : includes(arrays[othIndex], computed, comparator))
            ) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseIntersection;


/***/ }),
/* 243 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),
/* 244 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),
/* 245 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLikeObject = __webpack_require__(31);

/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}

module.exports = castArrayLikeObject;


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var baseDifference = __webpack_require__(123),
    baseFlatten = __webpack_require__(46),
    baseRest = __webpack_require__(26),
    isArrayLikeObject = __webpack_require__(31);

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */
var difference = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : [];
});

module.exports = difference;


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(67),
    baseRest = __webpack_require__(26),
    baseXor = __webpack_require__(249),
    isArrayLikeObject = __webpack_require__(31);

/**
 * Creates an array of unique values that is the
 * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
 * of the given arrays. The order of result values is determined by the order
 * they occur in the arrays.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.without
 * @example
 *
 * _.xor([2, 1], [2, 3]);
 * // => [1, 3]
 */
var xor = baseRest(function(arrays) {
  return baseXor(arrayFilter(arrays, isArrayLikeObject));
});

module.exports = xor;


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var baseDifference = __webpack_require__(123),
    baseFlatten = __webpack_require__(46),
    baseUniq = __webpack_require__(124);

/**
 * The base implementation of methods like `_.xor`, without support for
 * iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(arrays, iteratee, comparator) {
  var length = arrays.length;
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : [];
  }
  var index = -1,
      result = Array(length);

  while (++index < length) {
    var array = arrays[index],
        othIndex = -1;

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator);
}

module.exports = baseXor;


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(103),
    noop = __webpack_require__(251),
    setToArray = __webpack_require__(44);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;


/***/ }),
/* 251 */
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createParser = createParser;

var _nearley = __webpack_require__(253);

var _grammar = __webpack_require__(254);

var _grammar2 = _interopRequireDefault(_grammar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createParser() {
  return new _nearley.Parser(_grammar2.default.ParserRules, _grammar2.default.ParserStart);
}

/***/ }),
/* 253 */
/***/ (function(module, exports) {

(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

function Rule(name, symbols, postprocess) {
    this.id = ++Rule.highestId;
    this.name = name;
    this.symbols = symbols;        // a list of literal | regex class | nonterminal
    this.postprocess = postprocess;
    return this;
}
Rule.highestId = 0;

Rule.prototype.toString = function(withCursorAt) {
    function stringifySymbolSequence (e) {
        return e.literal ? JSON.stringify(e.literal) :
               e.type ? '%' + e.type : e.toString();
    }
    var symbolSequence = (typeof withCursorAt === "undefined")
                         ? this.symbols.map(stringifySymbolSequence).join(' ')
                         : (   this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(' ')
                             + " ● "
                             + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(' ')     );
    return this.name + " → " + symbolSequence;
}


// a State is a rule at a position from a given starting point in the input stream (reference)
function State(rule, dot, reference, wantedBy) {
    this.rule = rule;
    this.dot = dot;
    this.reference = reference;
    this.data = [];
    this.wantedBy = wantedBy;
    this.isComplete = this.dot === rule.symbols.length;
}

State.prototype.toString = function() {
    return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
};

State.prototype.nextState = function(child) {
    var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
    state.left = this;
    state.right = child;
    if (state.isComplete) {
        state.data = state.build();
    }
    return state;
};

State.prototype.build = function() {
    var children = [];
    var node = this;
    do {
        children.push(node.right.data);
        node = node.left;
    } while (node.left);
    children.reverse();
    return children;
};

State.prototype.finish = function() {
    if (this.rule.postprocess) {
        this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
    }
};


function Column(grammar, index) {
    this.grammar = grammar;
    this.index = index;
    this.states = [];
    this.wants = {}; // states indexed by the non-terminal they expect
    this.scannable = []; // list of states that expect a token
    this.completed = {}; // states that are nullable
}


Column.prototype.process = function(nextColumn) {
    var states = this.states;
    var wants = this.wants;
    var completed = this.completed;

    for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
        var state = states[w];

        if (state.isComplete) {
            state.finish();
            if (state.data !== Parser.fail) {
                // complete
                var wantedBy = state.wantedBy;
                for (var i = wantedBy.length; i--; ) { // this line is hot
                    var left = wantedBy[i];
                    this.complete(left, state);
                }

                // special-case nullables
                if (state.reference === this.index) {
                    // make sure future predictors of this rule get completed.
                    var exp = state.rule.name;
                    (this.completed[exp] = this.completed[exp] || []).push(state);
                }
            }

        } else {
            // queue scannable states
            var exp = state.rule.symbols[state.dot];
            if (typeof exp !== 'string') {
                this.scannable.push(state);
                continue;
            }

            // predict
            if (wants[exp]) {
                wants[exp].push(state);

                if (completed.hasOwnProperty(exp)) {
                    var nulls = completed[exp];
                    for (var i = 0; i < nulls.length; i++) {
                        var right = nulls[i];
                        this.complete(state, right);
                    }
                }
            } else {
                wants[exp] = [state];
                this.predict(exp);
            }
        }
    }
}

Column.prototype.predict = function(exp) {
    var rules = this.grammar.byName[exp] || [];

    for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        var wantedBy = this.wants[exp];
        var s = new State(r, 0, this.index, wantedBy);
        this.states.push(s);
    }
}

Column.prototype.complete = function(left, right) {
    var inp = right.rule.name;
    if (left.rule.symbols[left.dot] === inp) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }
}


function Grammar(rules, start) {
    this.rules = rules;
    this.start = start || this.rules[0].name;
    var byName = this.byName = {};
    this.rules.forEach(function(rule) {
        if (!byName.hasOwnProperty(rule.name)) {
            byName[rule.name] = [];
        }
        byName[rule.name].push(rule);
    });
}

// So we can allow passing (rules, start) directly to Parser for backwards compatibility
Grammar.fromCompiled = function(rules, start) {
    var lexer = rules.Lexer;
    if (rules.ParserStart) {
      start = rules.ParserStart;
      rules = rules.ParserRules;
    }
    var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
    var g = new Grammar(rules, start);
    g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
    return g;
}


function StreamLexer() {
  this.reset("");
}

StreamLexer.prototype.reset = function(data, state) {
    this.buffer = data;
    this.index = 0;
    this.line = state ? state.line : 1;
    this.lastLineBreak = state ? -state.col : 0;
}

StreamLexer.prototype.next = function() {
    if (this.index < this.buffer.length) {
        var ch = this.buffer[this.index++];
        if (ch === '\n') {
          this.line += 1;
          this.lastLineBreak = this.index;
        }
        return {value: ch};
    }
}

StreamLexer.prototype.save = function() {
  return {
    line: this.line,
    col: this.index - this.lastLineBreak,
  }
}

StreamLexer.prototype.formatError = function(token, message) {
    // nb. this gets called after consuming the offending token,
    // so the culprit is index-1
    var buffer = this.buffer;
    if (typeof buffer === 'string') {
        var nextLineBreak = buffer.indexOf('\n', this.index);
        if (nextLineBreak === -1) nextLineBreak = buffer.length;
        var line = buffer.substring(this.lastLineBreak, nextLineBreak)
        var col = this.index - this.lastLineBreak;
        message += " at line " + this.line + " col " + col + ":\n\n";
        message += "  " + line + "\n"
        message += "  " + Array(col).join(" ") + "^"
        return message;
    } else {
        return message + " at index " + (this.index - 1);
    }
}


function Parser(rules, start, options) {
    if (rules instanceof Grammar) {
        var grammar = rules;
        var options = start;
    } else {
        var grammar = Grammar.fromCompiled(rules, start);
    }
    this.grammar = grammar;

    // Read options
    this.options = {
        keepHistory: false,
        lexer: grammar.lexer || new StreamLexer,
    };
    for (var key in (options || {})) {
        this.options[key] = options[key];
    }

    // Setup lexer
    this.lexer = this.options.lexer;
    this.lexerState = undefined;

    // Setup a table
    var column = new Column(grammar, 0);
    var table = this.table = [column];

    // I could be expecting anything.
    column.wants[grammar.start] = [];
    column.predict(grammar.start);
    // TODO what if start rule is nullable?
    column.process();
    this.current = 0; // token index
}

// create a reserved token for indicating a parse fail
Parser.fail = {};

Parser.prototype.feed = function(chunk) {
    var lexer = this.lexer;
    lexer.reset(chunk, this.lexerState);

    var token;
    while (token = lexer.next()) {
        // We add new states to table[current+1]
        var column = this.table[this.current];

        // GC unused states
        if (!this.options.keepHistory) {
            delete this.table[this.current - 1];
        }

        var n = this.current + 1;
        var nextColumn = new Column(this.grammar, n);
        this.table.push(nextColumn);

        // Advance all tokens that expect the symbol
        var literal = token.value;
        var value = lexer.constructor === StreamLexer ? token.value : token;
        var scannable = column.scannable;
        for (var w = scannable.length; w--; ) {
            var state = scannable[w];
            var expect = state.rule.symbols[state.dot];
            // Try to consume the token
            // either regex or literal
            if (expect.test ? expect.test(value) :
                expect.type ? expect.type === token.type
                            : expect.literal === literal) {
                // Add it
                var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                nextColumn.states.push(next);
            }
        }

        // Next, for each of the rules, we either
        // (a) complete it, and try to see if the reference row expected that
        //     rule
        // (b) predict the next nonterminal it expects by adding that
        //     nonterminal's start state
        // To prevent duplication, we also keep track of rules we have already
        // added

        nextColumn.process();

        // If needed, throw an error:
        if (nextColumn.states.length === 0) {
            // No states at all! This is not good.
            var message = this.lexer.formatError(token, "invalid syntax") + "\n";
            message += "Unexpected " + (token.type ? token.type + " token: " : "");
            message += JSON.stringify(token.value !== undefined ? token.value : token) + "\n";
            var err = new Error(message);
            err.offset = this.current;
            err.token = token;
            throw err;
        }

        // maybe save lexer state
        if (this.options.keepHistory) {
          column.lexerState = lexer.save()
        }

        this.current++;
    }
    if (column) {
      this.lexerState = lexer.save()
    }

    // Incrementally keep track of results
    this.results = this.finish();

    // Allow chaining, for whatever it's worth
    return this;
};

Parser.prototype.save = function() {
    var column = this.table[this.current];
    column.lexerState = this.lexerState;
    return column;
};

Parser.prototype.restore = function(column) {
    var index = column.index;
    this.current = index;
    this.table[index] = column;
    this.table.splice(index + 1);
    this.lexerState = column.lexerState;

    // Incrementally keep track of results
    this.results = this.finish();
};

// nb. deprecated: use save/restore instead!
Parser.prototype.rewind = function(index) {
    if (!this.options.keepHistory) {
        throw new Error('set option `keepHistory` to enable rewinding')
    }
    // nb. recall column (table) indicies fall between token indicies.
    //        col 0   --   token 0   --   col 1
    this.restore(this.table[index]);
};

Parser.prototype.finish = function() {
    // Return the possible parsings
    var considerations = [];
    var start = this.grammar.start;
    var column = this.table[this.table.length - 1]
    column.states.forEach(function (t) {
        if (t.rule.name === start
                && t.dot === t.rule.symbols.length
                && t.reference === 0
                && t.data !== Parser.fail) {
            considerations.push(t);
        }
    });
    return considerations.map(function(c) {return c.data; });
};

return {
    Parser: Parser,
    Grammar: Grammar,
    Rule: Rule,
};

}));


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) {
    return x[0];
  }

  function mergeInfo() {
    var result = {};

    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key];
    }

    objects.forEach(function (object) {
      return object && Object.keys(object).forEach(function (key) {
        var _result$key;

        result[key] = result[key] || [];
        (_result$key = result[key]).push.apply(_result$key, _toConsumableArray(object[key]));
      });
    });
    return result;
  }

  var parseUnary = function parseUnary(_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        op = _ref2[0],
        r = _ref2[2];

    return { info: r.info, fn: op(r.fn) };
  };
  var parseBinary = function parseBinary(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 5),
        l = _ref4[0],
        op = _ref4[2],
        r = _ref4[4];

    return { info: mergeInfo(l.info, r.info), fn: op(l.fn, r.fn) };
  };
  var parseComparison = function parseComparison(_ref5) {
    var _ref6 = _slicedToArray(_ref5, 5),
        l = _ref6[0],
        op = _ref6[2],
        r = _ref6[4];

    return { info: mapComparison(l.info, r.info), fn: op(l.fn, r.fn) };
  };

  var propertyToProperty = function propertyToProperty(l, r) {
    return {
      comparisons: [{
        type: 'propertyToProperty',
        propertyName: l.propertyName,
        otherPropertyName: r.propertyName
      }]
    };
  };

  var propertyToNumber = function propertyToNumber(l, r) {
    return {
      comparisons: [Object.assign({ type: 'propertyToNumber' }, l, r)]
    };
  };

  var propertyToValue = function propertyToValue(l, r) {
    return {
      comparisons: [Object.assign({ type: 'propertyToValue' }, l, r)]
    };
  };

  var propertyToList = function propertyToList(l, r) {
    return {
      comparisons: [Object.assign({ type: 'propertyToList' }, l, r)]
    };
  };

  var propertyToPattern = function propertyToPattern(l, r) {
    return {
      comparisons: [Object.assign({ type: 'propertyToPattern' }, l, r)]
    };
  };

  var propertyToRange = function propertyToRange(l, r) {
    return {
      comparisons: [Object.assign({ type: 'propertyToRange' }, l, r)]
    };
  };

  var parse = function parse(merge) {
    return function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 5),
          l = _ref8[0],
          op = _ref8[2],
          r = _ref8[4];

      return { info: merge(l.info, r.info), fn: op(l.fn, r.fn) };
    };
  };

  var mapComparison = function mapComparison(l, r) {
    return {
      comparisons: [Object.assign({}, l, r)]
    };
  };

  function createRange(lowerBound, upperBound, includeLowerBound, includeUpperBound) {
    var compareLowerBound = includeLowerBound ? function (value) {
      return value >= lowerBound;
    } : function (value) {
      return value > lowerBound;
    };

    var compareUpperBound = includeUpperBound ? function (value) {
      return value <= upperBound;
    } : function (value) {
      return value < upperBound;
    };

    return {
      lowerBound: lowerBound,
      upperBound: upperBound,
      includeLowerBound: includeLowerBound,
      includeUpperBound: includeUpperBound,
      includes: includes
    };

    function includes(value) {
      var castValue = typeof value === 'number' ? value : Number.parseFloat(value);
      return compareLowerBound(castValue) && compareUpperBound(castValue);
    }
  }

  var unwrap = function unwrap(_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        expr = _ref10[1];

    return expr;
  };
  var trueConst = function trueConst() {
    return {
      info: {},
      fn: function fn() {
        return true;
      }
    };
  };
  var falseConst = function falseConst() {
    return {
      info: {},
      fn: function fn() {
        return false;
      }
    };
  };
  var grammar = {
    Lexer: undefined,
    ParserRules: [{ "name": "Main", "symbols": ["Rule"], "postprocess": id }, { "name": "Rule", "symbols": ["_", "OrExpression", "_"], "postprocess": unwrap }, { "name": "OrExpression", "symbols": ["AndExpression", "__", "Or", "__", "OrExpression"], "postprocess": parseBinary }, { "name": "OrExpression", "symbols": ["AndExpression"], "postprocess": id }, { "name": "AndExpression", "symbols": ["XorExpression", "__", "And", "__", "AndExpression"], "postprocess": parseBinary }, { "name": "AndExpression", "symbols": ["XorExpression"], "postprocess": id }, { "name": "XorExpression", "symbols": ["NotExpression", "__", "Xor", "__", "XorExpression"], "postprocess": parseBinary }, { "name": "XorExpression", "symbols": ["NotExpression"], "postprocess": id }, { "name": "NotExpression", "symbols": ["Not", "__", "NotExpression"], "postprocess": parseUnary }, { "name": "NotExpression", "symbols": ["Expression"], "postprocess": id }, { "name": "Expression", "symbols": ["Comparison"], "postprocess": id }, { "name": "Expression", "symbols": [{ "literal": "(" }, "Rule", { "literal": ")" }], "postprocess": unwrap }, { "name": "Expression$string$1", "symbols": [{ "literal": "t" }, { "literal": "r" }, { "literal": "u" }, { "literal": "e" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "Expression", "symbols": ["Expression$string$1"], "postprocess": trueConst }, { "name": "Expression$string$2", "symbols": [{ "literal": "f" }, { "literal": "a" }, { "literal": "l" }, { "literal": "s" }, { "literal": "e" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "Expression", "symbols": ["Expression$string$2"], "postprocess": falseConst }, { "name": "Comparison", "symbols": ["PropertyName", "__", "NumericComparisonOperator", "__", "Number"], "postprocess": parse(propertyToNumber) }, { "name": "Comparison", "symbols": ["PropertyName", "__", "NumericComparisonOperator", "__", "PropertyName"], "postprocess": parse(propertyToProperty) }, { "name": "Comparison", "symbols": ["PropertyName", "__", "PropertyComparisonOperator", "__", "PropertyName"], "postprocess": parse(propertyToProperty) }, { "name": "Comparison", "symbols": ["PropertyName", "__", "PathComparisonOperator", "__", "Value"], "postprocess": parse(propertyToValue) }, { "name": "Comparison", "symbols": ["PropertyName", "__", "PathMatchOperator", "__", "Pattern"], "postprocess": parse(propertyToPattern) }, { "name": "Comparison", "symbols": ["PropertyName", "__", "InclusionOperator", "__", "Range"], "postprocess": parse(propertyToRange) }, { "name": "Comparison", "symbols": ["PropertyName", "__", "InclusionOperator", "__", "ValueList"], "postprocess": parse(propertyToList) }, { "name": "Or$string$1", "symbols": [{ "literal": "o" }, { "literal": "r" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "Or", "symbols": ["Or$string$1"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) || r(c);
          };
        };
      } }, { "name": "And$string$1", "symbols": [{ "literal": "a" }, { "literal": "n" }, { "literal": "d" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "And", "symbols": ["And$string$1"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) && r(c);
          };
        };
      } }, { "name": "Xor$string$1", "symbols": [{ "literal": "x" }, { "literal": "o" }, { "literal": "r" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "Xor", "symbols": ["Xor$string$1"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return !!(l(c) ^ r(c));
          };
        };
      } }, { "name": "Not$string$1", "symbols": [{ "literal": "n" }, { "literal": "o" }, { "literal": "t" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "Not", "symbols": ["Not$string$1"], "postprocess": function postprocess() {
        return function (r) {
          return function (c) {
            return !r(c);
          };
        };
      } }, { "name": "NumericComparisonOperator$string$1", "symbols": [{ "literal": "=" }, { "literal": "=" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "NumericComparisonOperator", "symbols": ["NumericComparisonOperator$string$1"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) === r(c);
          };
        };
      } }, { "name": "NumericComparisonOperator$string$2", "symbols": [{ "literal": "<" }, { "literal": ">" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "NumericComparisonOperator", "symbols": ["NumericComparisonOperator$string$2"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) !== r(c);
          };
        };
      } }, { "name": "NumericComparisonOperator$string$3", "symbols": [{ "literal": ">" }, { "literal": "=" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "NumericComparisonOperator", "symbols": ["NumericComparisonOperator$string$3"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) >= r(c);
          };
        };
      } }, { "name": "NumericComparisonOperator", "symbols": [{ "literal": ">" }], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) > r(c);
          };
        };
      } }, { "name": "NumericComparisonOperator$string$4", "symbols": [{ "literal": "<" }, { "literal": "=" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "NumericComparisonOperator", "symbols": ["NumericComparisonOperator$string$4"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) <= r(c);
          };
        };
      } }, { "name": "NumericComparisonOperator", "symbols": [{ "literal": "<" }], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) < r(c);
          };
        };
      } }, { "name": "InclusionOperator$string$1", "symbols": [{ "literal": "i" }, { "literal": "n" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "InclusionOperator", "symbols": ["InclusionOperator$string$1"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return r(c).includes(l(c));
          };
        };
      } }, { "name": "InclusionOperator$string$2", "symbols": [{ "literal": "n" }, { "literal": "o" }, { "literal": "t" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "InclusionOperator$string$3", "symbols": [{ "literal": "i" }, { "literal": "n" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "InclusionOperator", "symbols": ["InclusionOperator$string$2", "__", "InclusionOperator$string$3"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return !r(c).includes(l(c));
          };
        };
      } }, { "name": "PropertyComparisonOperator$string$1", "symbols": [{ "literal": "e" }, { "literal": "q" }, { "literal": "u" }, { "literal": "a" }, { "literal": "l" }, { "literal": "s" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PropertyComparisonOperator", "symbols": ["PropertyComparisonOperator$string$1"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) === r(c);
          };
        };
      } }, { "name": "PropertyComparisonOperator$string$2", "symbols": [{ "literal": "d" }, { "literal": "o" }, { "literal": "e" }, { "literal": "s" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PropertyComparisonOperator$string$3", "symbols": [{ "literal": "n" }, { "literal": "o" }, { "literal": "t" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PropertyComparisonOperator$string$4", "symbols": [{ "literal": "e" }, { "literal": "q" }, { "literal": "u" }, { "literal": "a" }, { "literal": "l" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PropertyComparisonOperator", "symbols": ["PropertyComparisonOperator$string$2", "__", "PropertyComparisonOperator$string$3", "__", "PropertyComparisonOperator$string$4"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) !== r(c);
          };
        };
      } }, { "name": "PathComparisonOperator$string$1", "symbols": [{ "literal": "i" }, { "literal": "s" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PathComparisonOperator$string$2", "symbols": [{ "literal": "n" }, { "literal": "o" }, { "literal": "t" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PathComparisonOperator", "symbols": ["PathComparisonOperator$string$1", "__", "PathComparisonOperator$string$2"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) !== r(c);
          };
        };
      } }, { "name": "PathComparisonOperator$string$3", "symbols": [{ "literal": "i" }, { "literal": "s" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PathComparisonOperator", "symbols": ["PathComparisonOperator$string$3"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return l(c) === r(c);
          };
        };
      } }, { "name": "PathMatchOperator$string$1", "symbols": [{ "literal": "m" }, { "literal": "a" }, { "literal": "t" }, { "literal": "c" }, { "literal": "h" }, { "literal": "e" }, { "literal": "s" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PathMatchOperator", "symbols": ["PathMatchOperator$string$1"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return !!l(c).match(r(c));
          };
        };
      } }, { "name": "PathMatchOperator$string$2", "symbols": [{ "literal": "d" }, { "literal": "o" }, { "literal": "e" }, { "literal": "s" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PathMatchOperator$string$3", "symbols": [{ "literal": "n" }, { "literal": "o" }, { "literal": "t" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PathMatchOperator$string$4", "symbols": [{ "literal": "m" }, { "literal": "a" }, { "literal": "t" }, { "literal": "c" }, { "literal": "h" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "PathMatchOperator", "symbols": ["PathMatchOperator$string$2", "__", "PathMatchOperator$string$3", "__", "PathMatchOperator$string$4"], "postprocess": function postprocess() {
        return function (l, r) {
          return function (c) {
            return !l(c).match(r(c));
          };
        };
      } }, { "name": "_$ebnf$1", "symbols": [] }, { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": function postprocess() {
        return null;
      } }, { "name": "__$ebnf$1", "symbols": [/[ ]/] }, { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[ ]/], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": function postprocess() {
        return null;
      } }, { "name": "Value", "symbols": ["ValueLiteral"], "postprocess": function postprocess(_ref11) {
        var _ref12 = _slicedToArray(_ref11, 1),
            value = _ref12[0];

        return {
          info: {
            value: value
          },
          fn: function fn(c) {
            return value;
          }
        };
      } }, { "name": "ValueLiteral$ebnf$1", "symbols": ["Char"] }, { "name": "ValueLiteral$ebnf$1", "symbols": ["ValueLiteral$ebnf$1", "Char"], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "ValueLiteral", "symbols": ["ValueLiteral$ebnf$1"], "postprocess": function postprocess(_ref13) {
        var _ref14 = _slicedToArray(_ref13, 1),
            expr = _ref14[0];

        return expr.join('');
      } }, { "name": "ValueLiteral$ebnf$2$subexpression$1", "symbols": ["QuotedChar"] }, { "name": "ValueLiteral$ebnf$2$subexpression$1", "symbols": ["EscapedQuote"] }, { "name": "ValueLiteral$ebnf$2", "symbols": ["ValueLiteral$ebnf$2$subexpression$1"] }, { "name": "ValueLiteral$ebnf$2$subexpression$2", "symbols": ["QuotedChar"] }, { "name": "ValueLiteral$ebnf$2$subexpression$2", "symbols": ["EscapedQuote"] }, { "name": "ValueLiteral$ebnf$2", "symbols": ["ValueLiteral$ebnf$2", "ValueLiteral$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "ValueLiteral", "symbols": [{ "literal": "\"" }, "ValueLiteral$ebnf$2", { "literal": "\"" }], "postprocess": function postprocess(_ref15) {
        var _ref16 = _slicedToArray(_ref15, 2),
            expr = _ref16[1];

        return expr.join('');
      } }, { "name": "PropertyName$ebnf$1$subexpression$1", "symbols": ["BracketedChar"] }, { "name": "PropertyName$ebnf$1$subexpression$1", "symbols": ["EscapedLeftBracket"] }, { "name": "PropertyName$ebnf$1$subexpression$1", "symbols": ["EscapedRightBracket"] }, { "name": "PropertyName$ebnf$1", "symbols": ["PropertyName$ebnf$1$subexpression$1"] }, { "name": "PropertyName$ebnf$1$subexpression$2", "symbols": ["BracketedChar"] }, { "name": "PropertyName$ebnf$1$subexpression$2", "symbols": ["EscapedLeftBracket"] }, { "name": "PropertyName$ebnf$1$subexpression$2", "symbols": ["EscapedRightBracket"] }, { "name": "PropertyName$ebnf$1", "symbols": ["PropertyName$ebnf$1", "PropertyName$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "PropertyName", "symbols": [{ "literal": "[" }, "PropertyName$ebnf$1", { "literal": "]" }], "postprocess": function postprocess(_ref17) {
        var _ref18 = _slicedToArray(_ref17, 2),
            expr = _ref18[1];

        var propertyName = expr.join('');
        return {
          info: {
            propertyName: propertyName
          },
          fn: function fn(c) {
            return c.propertyValues[propertyName];
          }
        };
      } }, { "name": "Pattern$ebnf$1$subexpression$1", "symbols": ["RegexChar"] }, { "name": "Pattern$ebnf$1$subexpression$1", "symbols": ["EscapedRegexChar"] }, { "name": "Pattern$ebnf$1", "symbols": ["Pattern$ebnf$1$subexpression$1"] }, { "name": "Pattern$ebnf$1$subexpression$2", "symbols": ["RegexChar"] }, { "name": "Pattern$ebnf$1$subexpression$2", "symbols": ["EscapedRegexChar"] }, { "name": "Pattern$ebnf$1", "symbols": ["Pattern$ebnf$1", "Pattern$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "Pattern", "symbols": [{ "literal": "/" }, "Pattern$ebnf$1", { "literal": "/" }], "postprocess": function postprocess(_ref19) {
        var _ref20 = _slicedToArray(_ref19, 2),
            expr = _ref20[1];

        var pattern = createPattern(expr.join(''));
        return {
          info: {
            pattern: pattern
          },
          fn: function fn(c) {
            return pattern;
          }
        };
      } }, { "name": "Char", "symbols": [/[^"[\]\s]/], "postprocess": id }, { "name": "QuotedChar", "symbols": [/[^"\b\t\r\n]/], "postprocess": id }, { "name": "BracketedChar", "symbols": [/[^[\]\b\t\r\n]/], "postprocess": id }, { "name": "RegexChar", "symbols": [/[^\/\b\t\r\n]/], "postprocess": id }, { "name": "EscapedQuote$string$1", "symbols": [{ "literal": "\\" }, { "literal": "\"" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "EscapedQuote", "symbols": ["EscapedQuote$string$1"], "postprocess": function postprocess() {
        return '"';
      } }, { "name": "EscapedLeftBracket$string$1", "symbols": [{ "literal": "\\" }, { "literal": "[" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "EscapedLeftBracket", "symbols": ["EscapedLeftBracket$string$1"], "postprocess": function postprocess() {
        return '[';
      } }, { "name": "EscapedRightBracket$string$1", "symbols": [{ "literal": "\\" }, { "literal": "]" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "EscapedRightBracket", "symbols": ["EscapedRightBracket$string$1"], "postprocess": function postprocess() {
        return ']';
      } }, { "name": "EscapedRegexChar$string$1", "symbols": [{ "literal": "\\" }, { "literal": "/" }], "postprocess": function joiner(d) {
        return d.join('');
      } }, { "name": "EscapedRegexChar", "symbols": ["EscapedRegexChar$string$1"], "postprocess": function postprocess() {
        return '/';
      } }, { "name": "ValueList$ebnf$1", "symbols": [] }, { "name": "ValueList$ebnf$1$subexpression$1", "symbols": ["ValueLiteral", "_", { "literal": "," }, "_"], "postprocess": id }, { "name": "ValueList$ebnf$1", "symbols": ["ValueList$ebnf$1", "ValueList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "ValueList", "symbols": [{ "literal": "(" }, "_", "ValueList$ebnf$1", "ValueLiteral", "_", { "literal": ")" }], "postprocess": function postprocess(_ref21) {
        var _ref22 = _slicedToArray(_ref21, 4),
            rest = _ref22[2],
            last = _ref22[3];

        var list = [].concat(_toConsumableArray(rest), [last]);
        return {
          info: {
            list: list
          },
          fn: function fn(c) {
            return list;
          }
        };
      } }, { "name": "Range", "symbols": ["LowerBoundType", "_", "NumberLiteral", "_", { "literal": "," }, "_", "NumberLiteral", "_", "UpperBoundType"], "postprocess": function postprocess(_ref23) {
        var _ref24 = _slicedToArray(_ref23, 9),
            il = _ref24[0],
            lb = _ref24[2],
            ub = _ref24[6],
            iu = _ref24[8];

        var range = createRange(lb, ub, il, iu);
        return {
          info: {
            range: range
          },
          fn: function fn() {
            return range;
          }
        };
      } }, { "name": "LowerBoundType", "symbols": [/[[<]/], "postprocess": function postprocess(_ref25) {
        var _ref26 = _slicedToArray(_ref25, 1),
            symbol = _ref26[0];

        return symbol === '[';
      } }, { "name": "UpperBoundType", "symbols": [/[>\]]/], "postprocess": function postprocess(_ref27) {
        var _ref28 = _slicedToArray(_ref27, 1),
            symbol = _ref28[0];

        return symbol === ']';
      } }, { "name": "Number", "symbols": ["NumberLiteral"], "postprocess": function postprocess(_ref29) {
        var _ref30 = _slicedToArray(_ref29, 1),
            value = _ref30[0];

        return {
          info: {
            value: value
          },
          fn: function fn(c) {
            return value;
          }
        };
      } }, { "name": "NumberLiteral$ebnf$1", "symbols": [{ "literal": "-" }], "postprocess": id }, { "name": "NumberLiteral$ebnf$1", "symbols": [], "postprocess": function postprocess(d) {
        return null;
      } }, { "name": "NumberLiteral$ebnf$2", "symbols": [/[0-9]/] }, { "name": "NumberLiteral$ebnf$2", "symbols": ["NumberLiteral$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "NumberLiteral", "symbols": ["NumberLiteral$ebnf$1", "NumberLiteral$ebnf$2"], "postprocess": function postprocess(_ref31) {
        var _ref32 = _slicedToArray(_ref31, 2),
            minus = _ref32[0],
            digits = _ref32[1];

        return Number.parseInt((minus || '') + digits.join(''));
      } }, { "name": "NumberLiteral$ebnf$3", "symbols": [{ "literal": "-" }], "postprocess": id }, { "name": "NumberLiteral$ebnf$3", "symbols": [], "postprocess": function postprocess(d) {
        return null;
      } }, { "name": "NumberLiteral$ebnf$4", "symbols": [/[0-9]/] }, { "name": "NumberLiteral$ebnf$4", "symbols": ["NumberLiteral$ebnf$4", /[0-9]/], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "NumberLiteral$ebnf$5", "symbols": [] }, { "name": "NumberLiteral$ebnf$5", "symbols": ["NumberLiteral$ebnf$5", /[0-9]/], "postprocess": function arrpush(d) {
        return d[0].concat([d[1]]);
      } }, { "name": "NumberLiteral", "symbols": ["NumberLiteral$ebnf$3", "NumberLiteral$ebnf$4", { "literal": "." }, "NumberLiteral$ebnf$5"], "postprocess": function postprocess(_ref33) {
        var _ref34 = _slicedToArray(_ref33, 4),
            minus = _ref34[0],
            a = _ref34[1],
            b = _ref34[2],
            c = _ref34[3];

        return Number.parseFloat((minus || '') + a.join('') + b + (c || []).join(''));
      } }],
    ParserStart: "Main"
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pattern = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _zip = __webpack_require__(256);

var _zip2 = _interopRequireDefault(_zip);

var _trim = __webpack_require__(258);

var _trim2 = _interopRequireDefault(_trim);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _constants = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEGMENT_WILDCARD = '*';
var REGEXP_DELIMITER = '/';

var Pattern = exports.Pattern = function Pattern(_ref, pattern) {
  var expression = _ref.expression;


  (0, _assign2.default)(pattern, {
    matches: matches
  });

  function matches(path) {
    return path === expression || isPrefix(path, expression);
  }

  function isPrefix(path, expression) {
    return (0, _zip2.default)(path.toString().split(_constants.PATH_SEPARATOR), expression.split(_constants.PATH_SEPARATOR)).every(segmentMatchesPattern);
  }

  function segmentMatchesPattern(_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        pathSegment = _ref3[0],
        expressionSegment = _ref3[1];

    if (!pathSegment) return false;
    if (pathSegment === expressionSegment) return true;
    if (!expressionSegment || expressionSegment === SEGMENT_WILDCARD) return true;
    if (isRegExp(expressionSegment)) return parseRegExpSegment(expressionSegment).exec(pathSegment);

    return false;
  }

  function isRegExp(patternSegment) {
    return patternSegment[0] === REGEXP_DELIMITER && patternSegment[patternSegment.length - 1] === REGEXP_DELIMITER;
  }

  function parseRegExpSegment(expressionSegment) {
    return new RegExp((0, _trim2.default)(expressionSegment, REGEXP_DELIMITER));
  }
};

exports.default = (0, _compose.compose)(Pattern);

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(26),
    unzip = __webpack_require__(257);

/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 */
var zip = baseRest(unzip);

module.exports = zip;


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(67),
    arrayMap = __webpack_require__(14),
    baseProperty = __webpack_require__(126),
    baseTimes = __webpack_require__(93),
    isArrayLikeObject = __webpack_require__(31);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @static
 * @memberOf _
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * _.unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
function unzip(array) {
  if (!(array && array.length)) {
    return [];
  }
  var length = 0;
  array = arrayFilter(array, function(group) {
    if (isArrayLikeObject(group)) {
      length = nativeMax(group.length, length);
      return true;
    }
  });
  return baseTimes(length, function(index) {
    return arrayMap(array, baseProperty(index));
  });
}

module.exports = unzip;


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(86),
    castSlice = __webpack_require__(259),
    charsEndIndex = __webpack_require__(260),
    charsStartIndex = __webpack_require__(261),
    stringToArray = __webpack_require__(262),
    toString = __webpack_require__(33);

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

module.exports = trim;


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(109);

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(78);

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsEndIndex;


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(78);

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsStartIndex;


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(263),
    hasUnicode = __webpack_require__(264),
    unicodeToArray = __webpack_require__(265);

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;


/***/ }),
/* 263 */
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;


/***/ }),
/* 264 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),
/* 265 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.fromRangeExpression = fromRangeExpression;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXPRESSION_REGEXP = /([<\[])(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)([>\]])/;

var Range = exports.Range = function Range(_ref, range) {
  var lowerBound = _ref.lowerBound,
      upperBound = _ref.upperBound,
      includeLowerBound = _ref.includeLowerBound,
      includeUpperBound = _ref.includeUpperBound;


  var compareLowerBound = includeLowerBound ? function (value) {
    return value >= lowerBound;
  } : function (value) {
    return value > lowerBound;
  };

  var compareUpperBound = includeUpperBound ? function (value) {
    return value <= upperBound;
  } : function (value) {
    return value < upperBound;
  };

  (0, _assign2.default)(range, {
    lowerBound: lowerBound,
    upperBound: upperBound,
    includeLowerBound: includeLowerBound,
    includeUpperBound: includeUpperBound,
    matches: matches
  });

  function matches(value) {
    var castValue = typeof value === 'number' ? value : Number.parseFloat(value);

    return compareLowerBound(castValue) && compareUpperBound(castValue);
  }
};

function fromRangeExpression(expression) {
  var matches = EXPRESSION_REGEXP.exec(expression.trim());

  var _matches = _slicedToArray(matches, 5),
      lowerBoundSymbol = _matches[1],
      lowerBound = _matches[2],
      upperBound = _matches[3],
      upperBoundSymbol = _matches[4];

  return Range({
    lowerBound: lowerBound,
    upperBound: upperBound,
    includeLowerBound: lowerBoundSymbol === '[',
    includeUpperBound: upperBoundSymbol === ']'
  });
}

exports.default = (0, _assign2.default)((0, _compose.compose)((0, _compose.defaultProps)({
  lowerBound: -Infinity,
  upperBound: Infinity
}), Range), fromRangeExpression);

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Property = undefined;

var _isObject = __webpack_require__(7);

var _isObject2 = _interopRequireDefault(_isObject);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface Property
 */
/**
 * name of the property. used when referencing the property
 * @member {string} Property#name
 */
/**
 * current value of the property
 * @member {Object} Property#value
 */

var Property = exports.Property = function Property(_ref, property) {
  var name = _ref.name,
      _ref$aliases = _ref.aliases,
      aliases = _ref$aliases === undefined ? [name] : _ref$aliases;


  (0, _assign2.default)(property, {
    name: name,
    aliases: aliases
  });
};

exports.default = (0, _compose.compose)(Property);

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NullProperty = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NullProperty = exports.NullProperty = function NullProperty(props, nullProperty) {

  var getInsertionParams = function getInsertionParams() {
    return {};
  };

  (0, _assign2.default)(nullProperty, {
    type: 'null',
    getInsertionParams: getInsertionParams
  });
};

exports.default = NullProperty;

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialProperty = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MaterialProperty = exports.MaterialProperty = function MaterialProperty(props, materialProperty) {

  var getInsertionParams = function getInsertionParams() {
    if (materialProperty.value.null) {
      return {};
    } else {
      var materials = materialProperty.aliases.map(function (materialName) {
        return _defineProperty({}, materialName, materialProperty.value.key);
      });

      return {
        propertyValues: Object.assign.apply(Object, [{}].concat(_toConsumableArray(materials)))
      };
    }
  };

  (0, _assign2.default)(materialProperty, {
    type: 'material',
    getInsertionParams: getInsertionParams
  });
};

exports.default = MaterialProperty;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PartProperty = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PartProperty = exports.PartProperty = function PartProperty(props, partProperty) {

  var getInsertionParams = function getInsertionParams() {
    if (partProperty.value.foreignKey) {
      return {
        parts: [partProperty.value.foreignKey]
      };
    } else if (partProperty.value.foreignKeys) {
      return {
        parts: partProperty.value.foreignKeys
      };
    } else if (partProperty.value.null) {
      return {
        parts: []
      };
    } else {
      console.warn('ViewAR API: Warning! Part property ' + partProperty.name + ' missing foreign key for value ' + partProperty.value.name + '!');
      return {
        parts: []
      };
    }
  };

  (0, _assign2.default)(partProperty, {
    type: 'part',
    getInsertionParams: getInsertionParams
  });
};

exports.default = PartProperty;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeometricProperty = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GeometricProperty = exports.GeometricProperty = function GeometricProperty(props, geometricProperty) {

  var getInsertionParams = function getInsertionParams() {
    var parameters = geometricProperty.aliases.map(function (parameterName) {
      return _defineProperty({}, parameterName, geometricProperty.value);
    });

    return {
      propertyValues: Object.assign.apply(Object, [{}].concat(_toConsumableArray(parameters)))
    };
  };

  (0, _assign2.default)(geometricProperty, {
    type: 'geometric',
    getInsertionParams: getInsertionParams
  });
};

exports.default = GeometricProperty;

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeProperty = undefined;

var _isInteger = __webpack_require__(273);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _isString = __webpack_require__(88);

var _isString2 = _interopRequireDefault(_isString);

var _isObject = __webpack_require__(7);

var _isObject2 = _interopRequireDefault(_isObject);

var _compact = __webpack_require__(277);

var _compact2 = _interopRequireDefault(_compact);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _option = __webpack_require__(127);

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @interface RangeProperty
 * @extends Property
 */

/**
 * list of property's ranges
 * @member {Range[]} ranges
 * @memberof EnumeratedProperty#
 */

/**
 * @interface Range
 */

var RangeProperty = exports.RangeProperty = function RangeProperty(_ref, rangeProperty) {
  var _ref$values = _ref.values,
      min = _ref$values.min,
      max = _ref$values.max,
      step = _ref$values.step,
      rules = _ref.rules,
      initValue = _ref.value;

  var _marked = /*#__PURE__*/regeneratorRuntime.mark(getValueIterator);

  var ranges = calculateRanges();

  var value = void 0;
  setValue(initValue);

  (0, _assign2.default)(rangeProperty, {
    min: min,
    max: max,
    step: step,
    get value() {
      return value;
    },
    set value(newValue) {
      setValue(newValue);
    },
    get ranges() {
      return [].concat(_toConsumableArray(ranges));
    },
    valueType: 'range',
    getValueIterator: getValueIterator,
    getValueKey: getValueKey,
    resolveValue: resolveValue,
    hasValidValue: hasValidValue
  });

  function hasValidValue(configuration) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ranges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var range = _step.value;

        if (range.min <= value && range.max >= value) {
          return range.isValid(configuration);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  }

  function getValueKey() {
    return value;
  }

  function setValue(newValue) {
    value = resolveValue(newValue) || value;
  }

  function calculateRanges() {
    var startValues = [];

    startValues[(min - min) / step] = {
      value: min,
      start: true
    };

    startValues[(max - min) / step] = {
      value: max,
      end: true
    };

    rules.forEach(function (_ref2) {
      var _ref2$info = _ref2.info,
          lowerBound = _ref2$info.lowerBound,
          upperBound = _ref2$info.upperBound,
          includeLowerBound = _ref2$info.includeLowerBound,
          includeUpperBound = _ref2$info.includeUpperBound;

      var rangeMin = (lowerBound - min) / step + (includeLowerBound ? 0 : 1);
      var rangeMax = (upperBound - min) / step - (includeUpperBound ? 0 : 1);

      Object.assign(startValues[rangeMin] = startValues[rangeMin] || {}, {
        value: Number.parseFloat(lowerBound) + (includeLowerBound ? 0 : step),
        start: true
      });
      if (lowerBound > min) {
        Object.assign(startValues[rangeMin - 1] = startValues[rangeMin - 1] || {}, {
          value: Number.parseFloat(lowerBound) - step + (includeLowerBound ? 0 : step),
          end: true
        });
      }
      Object.assign(startValues[rangeMax] = startValues[rangeMax] || {}, {
        value: Number.parseFloat(upperBound) - (includeUpperBound ? 0 : step),
        end: true
      });
      if (upperBound < max) {
        Object.assign(startValues[rangeMax + 1] = startValues[rangeMax + 1] || {}, {
          value: Number.parseFloat(upperBound) + step - (includeUpperBound ? 0 : step),
          start: true
        });
      }
    });

    var ranges = [];

    var compactValues = (0, _compact2.default)(startValues);

    while (compactValues.length) {
      var start = compactValues.shift();
      var isValid = createValidator(rules, start.value);
      if (start.start && start.end) {
        ranges.push({
          min: start.value,
          max: start.value,
          isValid: isValid
        });
      } else {
        var end = compactValues.shift();
        ranges.push({
          min: start.value,
          max: end.value,
          isValid: isValid
        });
      }
    }

    return ranges;
  }

  function getValueIterator() {
    var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, range;

    return regeneratorRuntime.wrap(function getValueIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 3;
            _iterator2 = calculateRanges()[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 17;
              break;
            }

            range = _step2.value;

            if (!(value && value >= range.min && value <= range.max)) {
              _context.next = 12;
              break;
            }

            _context.next = 10;
            return value;

          case 10:
            _context.next = 14;
            break;

          case 12:
            _context.next = 14;
            return resolveValue(range.min);

          case 14:
            _iteratorNormalCompletion2 = true;
            _context.next = 5;
            break;

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](3);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 26:
            _context.prev = 26;

            if (!_didIteratorError2) {
              _context.next = 29;
              break;
            }

            throw _iteratorError2;

          case 29:
            return _context.finish(26);

          case 30:
            return _context.finish(23);

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this, [[3, 19, 23, 31], [24,, 26, 30]]);
  }

  function resolveValue(keyOrValue) {
    var numericKey = (0, _isString2.default)(keyOrValue) ? Number.parseFloat(keyOrValue) : keyOrValue;
    if ((0, _isInteger2.default)((numericKey - min) / step)) {
      return numericKey;
    }
  }

  function createValidator(allRules, path) {
    var rules = allRules.filter(function (rule) {
      return rule.match(path);
    });
    return function (configuration) {
      return rules.every(function (rule) {
        return rule.evaluate(configuration);
      });
    };
  }
};

exports.default = RangeProperty;

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(274);

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

module.exports = isInteger;


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__(275);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(276);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7),
    isSymbol = __webpack_require__(34);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 277 */
/***/ (function(module, exports) {

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = compact;


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnumeratedProperty = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _option = __webpack_require__(127);

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface EnumeratedProperty
 * @extends Property
 */
var EnumeratedProperty = exports.EnumeratedProperty = function EnumeratedProperty(_ref, enumeratedProperty) {
  var values = _ref.values,
      initValue = _ref.value,
      rules = _ref.rules;

  var _marked = /*#__PURE__*/regeneratorRuntime.mark(getValueIterator);

  var options = createOptions(values, rules);
  var value = void 0;
  setValue(initValue);

  (0, _assign2.default)(enumeratedProperty, {
    /**
     * list of property's values
     * @member {Option[]} options
     * @memberof EnumeratedProperty#
     */
    options: options,
    values: options,
    get value() {
      return value;
    },
    set value(newValue) {
      setValue(newValue);
    },
    valueType: 'enumerated',
    getValueIterator: getValueIterator,
    getValueKey: getValueKey,
    resolveValue: resolveValue,
    hasValidValue: hasValidValue
  });

  function hasValidValue(configuration) {
    return value.isValid(configuration);
  }

  function getValueKey() {
    return value.key;
  }

  function setValue(newValue) {
    value = resolveValue(newValue) || value;
  }

  function getValueIterator() {
    return regeneratorRuntime.wrap(function getValueIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.delegateYield(options[Symbol.iterator](), 't0', 1);

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  function resolveValue(key) {
    return key && options.find(function (value) {
      return value === key || value.key === key || value.key === key.key || value.name === key;
    });
  }

  function createOptions(options, rules) {
    return options.map(function (option) {
      return (0, _option2.default)(_extends({ tags: [] }, option, { isValid: createValidator(rules, option.name) }));
    });
  }

  function createValidator(allRules, path) {
    var rules = allRules.filter(function (rule) {
      return rule.match(path);
    });
    return function (configuration) {
      return rules.every(function (rule) {
        return rule.evaluate(configuration);
      });
    };
  }
};

exports.default = EnumeratedProperty;

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleModelInstance = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _isNil = __webpack_require__(280);

var _isNil2 = _interopRequireDefault(_isNil);

var _isEqual = __webpack_require__(25);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _mergeWith3 = __webpack_require__(128);

var _mergeWith4 = _interopRequireDefault(_mergeWith3);

var _pick = __webpack_require__(285);

var _pick2 = _interopRequireDefault(_pick);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _constants = __webpack_require__(4);

var _utils = __webpack_require__(6);

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _sceneNode = __webpack_require__(51);

var _sceneNode2 = _interopRequireDefault(_sceneNode);

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//======================================================================================================================

/**
 * Represents an instance of a model in the scene.
 * @interface SceneObject
 * @extends SceneNode
 */
/**
 * Model this object was instantiated from
 * @member {Model} SceneObject#model
 */
/**
 * Dictionary of property values keyed by their names
 * @member {PropertyValues} SceneObject#propertyValues
 */
/**
 * Dictionary of animations
 * @member {Animation[]} SceneObject#animations
 */
/**
 * Dictionary of videos
 * @member {Video[]} SceneObject#videos
 */
/**
 * Template used for displaying instances properties
 * @member {Array.<Object>} SceneObject#displayTemplate
 */
/**
 * Dictionary of properties this instance has
 * @member {Object.<string, Property>} SceneObject#properties
 */

/**
 * @private
 * @param {object} props
 * @param {SceneObject} modelInstance
 */
var SimpleModelInstance = exports.SimpleModelInstance = function SimpleModelInstance(props, modelInstance) {

  //======================================================================================================================

  var insert = function () {
    var _ref7 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pose) {
      var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          snapTo = _ref8.snapTo;

      var transferId;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              transferId = (0, _generateId2.default)();
              _context2.next = 3;
              return coreInterface.call('insertModelNew', model.id, _extends({}, compileInsertionParams(), {
                pose: !snapTo && pose ? (0, _utils.sanitizePose)(pose) : undefined,
                snapTo: snapTo
              }), '', transferId);

            case 3:
              _context2.t0 = getSharedInterface(modelInstance);
              _context2.next = 6;
              return coreInterface.call('getInstancePose', id);

            case 6:
              _context2.t1 = _context2.sent;

              _context2.t0.updatePose.call(_context2.t0, _context2.t1);

              return _context2.abrupt('return', modelInstance);

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function insert(_x2, _x3) {
      return _ref7.apply(this, arguments);
    };
  }();

  var id = props.id,
      model = props.model,
      animations = props.animations,
      videos = props.videos,
      displayTemplate = props.displayTemplate,
      properties = props.properties,
      parameterDescription = props.parameterDescription,
      coreInterface = props.coreInterface,
      getSharedInterface = props.getSharedInterface,
      preset = props.preset;


  var propertyDictionary = (0, _utils.dictionarize)(properties, 'name');

  var getPropertyValues = function getPropertyValues() {
    return (0, _utils.toValueObject)(properties.map(function (_ref) {
      var name = _ref.name,
          getValueKey = _ref.getValueKey;
      return { name: name, value: getValueKey() };
    }));
  };

  /**
   * Assigns values to one or more properties.
   * @async
   * @function SceneObject#setPropertyValues
   * @param {PropertyValues} newValues
   * @returns {Promise} resolved when done.
   */
  var setPropertyValues = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newValues) {
      var changedValues;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              changedValues = updatePropertyValues(newValues);
              _context.next = 3;
              return updateMaterialProperties(changedValues);

            case 3:
              _context.next = 5;
              return updateGeometricProperties(changedValues);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function setPropertyValues(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  function updatePropertyValues(newPropertyValues) {
    var currentPropertyValues = getPropertyValues();
    var changedPropertyValues = {};

    Object.entries(newPropertyValues).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          name = _ref4[0],
          valueKey = _ref4[1];

      if (currentPropertyValues[name] && currentPropertyValues[name] !== valueKey) {
        changedPropertyValues[name] = valueKey;
      }
    });

    Object.entries(changedPropertyValues).forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          name = _ref6[0],
          valueKey = _ref6[1];

      var property = propertyDictionary[name];
      var resolvedValue = property.resolveValue(valueKey);
      if (resolvedValue) {
        property.value = resolvedValue;
      }
    });

    return changedPropertyValues;
  }

  function updateMaterialProperties(changedPropertyValues) {
    var transferId = (0, _generateId2.default)();
    var materialPropNames = properties.filter(function (property) {
      return property.type === 'material';
    }).map(function (prop) {
      return prop.name;
    });
    var values = (0, _pick2.default)(changedPropertyValues, materialPropNames);
    return coreInterface.call('applyMaterialOptions', _defineProperty({}, id, values), '', transferId);
  }

  function updateGeometricProperties() {
    var _compilePropertyParam = compilePropertyParams(),
        parameters = _compilePropertyParam.parameters;

    return coreInterface.call('setInstanceParameterGroupTransformations', id, parameters);
  }

  var remove = function remove() {
    return coreInterface.call('deleteInstance', id);
  };

  //======================================================================================================================

  function compileInsertionParams() {
    var id = props.id,
        highlight = props.highlight,
        pose = props.pose,
        interaction = props.interaction,
        animations = props.animations,
        videos = props.videos,
        parent = props.parent,
        visible = props.visible;

    var _compilePropertyParam2 = compilePropertyParams(),
        materialPickerInfo = _compilePropertyParam2.materialPickerInfo,
        parameters = _compilePropertyParam2.parameters;

    return {
      instanceId: id,
      highlight: highlight,
      pose: pose,
      materialPickerInfo: materialPickerInfo,
      parameters: parameters,
      visible: visible,
      interaction: interaction,
      animations: (0, _utils.dictionarize)(Object.values(animations).map(function (_ref9) {
        var name = _ref9.name;
        return {
          name: name,
          state: 'stopped',
          loop: false,
          time: 0
        };
      }), 'name'),
      videos: (0, _utils.dictionarize)(Object.values(videos).map(function (_ref10) {
        var name = _ref10.name;
        return {
          name: name,
          state: 'stopped',
          loop: false,
          time: 0
        };
      }), 'name'),
      targetContainerId: parent.id,
      shouldBeGrouped: parent.type !== 'ungrouped'
    };
  }

  function compilePropertyParams() {
    var _mergeWith = _mergeWith4.default.apply(undefined, _toConsumableArray(properties.filter(function (property) {
      return property.type === 'material';
    }).map(function (property) {
      return property.getInsertionParams();
    }))),
        _mergeWith$propertyVa = _mergeWith.propertyValues,
        materials = _mergeWith$propertyVa === undefined ? {} : _mergeWith$propertyVa;

    var _mergeWith2 = _mergeWith4.default.apply(undefined, _toConsumableArray(properties.filter(function (property) {
      return property.type === 'geometric';
    }).map(function (property) {
      return property.getInsertionParams();
    }))),
        _mergeWith2$propertyV = _mergeWith2.propertyValues,
        parameters = _mergeWith2$propertyV === undefined ? {} : _mergeWith2$propertyV;

    return {
      materialPickerInfo: Object.entries(materials).map(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            name = _ref12[0],
            value = _ref12[1];

        return { groupId: name, optionId: value };
      }),
      parameters: compileParameterInfo(parameters, parameterDescription)
    };
  }

  function compileParameterInfo(parameters, parameterDescription) {
    var applyMapping = function applyMapping(newValue, _ref13) {
      var axis = _ref13.axis,
          _ref13$scale = _ref13.scale,
          scale = _ref13$scale === undefined ? 1 : _ref13$scale,
          _ref13$offset = _ref13.offset,
          offset = _ref13$offset === undefined ? 0 : _ref13$offset;
      return _defineProperty({}, axis, newValue * scale + offset);
    };

    var uvOffsetInfo = parameterDescription.filter(function (_ref15) {
      var type = _ref15.type;
      return type === 'uvOffset';
    }).map(function (_ref16) {
      var mappings = _ref16.mappings,
          name = _ref16.name;
      return mappings.reduce(function (object, key) {
        return Object.assign(object, _defineProperty({}, key, parameters[name] || 0));
      }, {});
    }).reduce(function (object, part) {
      return Object.assign(object, part);
    }, {});

    var info = parameterDescription.filter(function (_ref17) {
      var type = _ref17.type;
      return type === 'manipulation';
    }).map(function (parameter) {
      return parameter.mappings.map(function (mapping) {
        return { mapping: mapping, value: parameters[parameter.name] || 0 };
      });
    }).reduce(function (array, item) {
      return array.concat(item);
    }, []).filter(function (_ref18) {
      var value = _ref18.value;
      return !(0, _isNil2.default)(value);
    }).reduce(function (object, _ref19) {
      var _ref19$mapping = _ref19.mapping,
          group = _ref19$mapping.group,
          translation = _ref19$mapping.translation,
          rotation = _ref19$mapping.rotation,
          scaling = _ref19$mapping.scaling,
          value = _ref19.value;

      var param = object[group] = object[group] || { group: group };

      param.translation = translation && Object.assign.apply(Object, [param.translation || {}].concat(_toConsumableArray(translation.map(function (info) {
        return applyMapping(value, info);
      }))));
      param.rotation = rotation && Object.assign.apply(Object, [param.rotation || {}].concat(_toConsumableArray(rotation.map(function (info) {
        return applyMapping(value, info);
      }))));
      param.scaling = scaling && Object.assign.apply(Object, [param.scaling || {}].concat(_toConsumableArray(scaling.map(function (info) {
        return applyMapping(value, info);
      }))));

      Object.assign(param, { textureOffset: uvOffsetInfo[group] });

      return object;
    }, {});

    return Object.keys(info).reduce(function (array, key) {
      return array.concat(info[key]);
    }, []);
  }

  var toJSON = function toJSON() {
    var model = modelInstance.model,
        propertyValues = modelInstance.propertyValues,
        pose = modelInstance.pose,
        interaction = modelInstance.interaction,
        visible = modelInstance.visible,
        id = modelInstance.id;

    return {
      id: id,
      model: model.foreignKey || model.id,
      propertyValues: (0, _isEqual2.default)(propertyValues, preset) ? undefined : propertyValues,
      pose: (0, _isEqual2.default)(pose, _constants.DEFAULT_POSE) ? undefined : pose,
      interaction: (0, _isEqual2.default)(interaction, _constants.DEFAULT_INTERACTION) ? undefined : interaction,
      visible: (0, _isEqual2.default)(visible, _constants.DEFAULT_VISIBLE) ? undefined : visible
    };
  };

  (0, _assign2.default)(modelInstance, {
    get model() {
      return model;
    },
    get propertyValues() {
      return getPropertyValues();
    },
    get animations() {
      return _extends({}, animations);
    },
    get videos() {
      return _extends({}, videos);
    },
    get displayTemplate() {
      return (0, _clone2.default)(displayTemplate);
    },
    get properties() {
      return propertyDictionary;
    },
    setPropertyValues: setPropertyValues,
    toJSON: toJSON
  });

  (0, _assign2.default)(getSharedInterface(modelInstance), {
    insert: insert,
    remove: remove
  });
};

exports.default = (0, _compose.compose)((0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  getSharedInterface: _shared2.default
}), SimpleModelInstance, _sceneNode2.default);

/**
 * @typedef {Object.<string, string|number>} PropertyValues
 */

/***/ }),
/* 280 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

module.exports = isNil;


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(35),
    assignMergeValue = __webpack_require__(129),
    baseFor = __webpack_require__(130),
    baseMergeDeep = __webpack_require__(283),
    isObject = __webpack_require__(7),
    keysIn = __webpack_require__(29);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),
/* 282 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(129),
    cloneBuffer = __webpack_require__(95),
    cloneTypedArray = __webpack_require__(107),
    copyArray = __webpack_require__(96),
    initCloneObject = __webpack_require__(108),
    isArguments = __webpack_require__(41),
    isArray = __webpack_require__(5),
    isArrayLikeObject = __webpack_require__(31),
    isBuffer = __webpack_require__(42),
    isFunction = __webpack_require__(38),
    isObject = __webpack_require__(7),
    isPlainObject = __webpack_require__(72),
    isTypedArray = __webpack_require__(62),
    toPlainObject = __webpack_require__(284);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(17),
    keysIn = __webpack_require__(29);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

var basePick = __webpack_require__(286),
    flatRest = __webpack_require__(110);

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var basePickBy = __webpack_require__(287),
    hasIn = __webpack_require__(131);

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(45),
    baseSet = __webpack_require__(288),
    castPath = __webpack_require__(23);

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

module.exports = basePickBy;


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(59),
    castPath = __webpack_require__(23),
    isIndex = __webpack_require__(43),
    isObject = __webpack_require__(7),
    toKey = __webpack_require__(24);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;


/***/ }),
/* 289 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(23),
    isArguments = __webpack_require__(41),
    isArray = __webpack_require__(5),
    isIndex = __webpack_require__(43),
    isLength = __webpack_require__(63),
    toKey = __webpack_require__(24);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Video = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _emitter = __webpack_require__(53);

var _emitter2 = _interopRequireDefault(_emitter);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface Video
 * @implements Playable
 */
var Video = exports.Video = function Video(_ref, video) {
  var emit = _ref.emit,
      name = _ref.name,
      instanceId = _ref.instanceId,
      coreInterface = _ref.coreInterface;


  var state = 'stopped';

  (0, _assign2.default)(video, {
    pause: pause,
    resume: resume,
    start: start,
    stop: stop,

    /**
     * Name of the animation.
     * @type {string}
     * @memberOf! Video#
     */
    get name() {
      return name;
    },
    /**
     * State of the animation.
     * @type {string}
     * @memberOf! Video#
     */
    get state() {
      return state;
    }
  });

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Pauses playing animation.
   * @returns {Promise} resolved when done.
   * @memberOf Video#
   */
  function pause() {
    return coreInterface.call('pauseVideo', instanceId, name).then(function () {
      return setVideoState('paused');
    });
  }

  /**
   * Resumes paused animation.
   * @returns {Promise} resolved when done.
   * @memberOf Video#
   */
  function resume() {
    return coreInterface.call('resumeVideo', instanceId, name).then(function () {
      return setVideoState('playing');
    });
  }

  /**
   * Starts the animation from specified time.
   * @param {number?} timeInMs starting time
   * @param {boolean?} loop whether or not the animation should loop
   * @returns {Promise} resolved when done.
   * @memberOf Video#
   */
  function start() {
    var timeInMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var loop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return coreInterface.call('startVideo', instanceId, name, timeInMs, loop).then(function () {
      return setVideoState('playing');
    });
  }

  /**
   * Stops playing animation. Resets current time to zero.
   * @returns {Promise} resolved when done.
   * @memberOf Video#
   */
  function stop() {
    return coreInterface.call('stopVideo', instanceId, name).then(function () {
      return setVideoState('stopped');
    });
  }

  //======================================================================================================================
  // PRIVATE FUNCTIONS
  //======================================================================================================================

  function setVideoState(newState) {
    state = newState;
    emit('stateChanged', state);
  }
};

exports.default = (0, _compose.compose)((0, _compose.injectProps)({
  coreInterface: _coreInterface2.default
}), _emitter2.default, Video);

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstance = exports.update = exports.resolveParts = exports.download = exports.fetchData = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _uniq = __webpack_require__(80);

var _uniq2 = _interopRequireDefault(_uniq);

var _compose = __webpack_require__(2);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _modelManager = __webpack_require__(27);

var _modelManager2 = _interopRequireDefault(_modelManager);

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

var _fetchDescription = __webpack_require__(52);

var _fetchDescription2 = _interopRequireDefault(_fetchDescription);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _assemblyInstance = __webpack_require__(293);

var _assemblyInstance2 = _interopRequireDefault(_assemblyInstance);

var _modelBase = __webpack_require__(54);

var _modelBase2 = _interopRequireDefault(_modelBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

//======================================================================================================================

var fetchData = exports.fetchData = function fetchData(_ref, assemblyModel) {
  var id = _ref.id,
      coreInterface = _ref.coreInterface;
  return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var description;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fetchDescription2.default)({ id: id, coreInterface: coreInterface })();

          case 2:
            description = _context.sent;

            Object.assign(assemblyModel, { data: description.data, images: description.images });
            return _context.abrupt('return', description);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

var download = exports.download = function download(_ref3) {
  var fetchData = _ref3.fetchData,
      resolveParts = _ref3.resolveParts,
      coreInterface = _ref3.coreInterface;
  return function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(listener) {
      var transferId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _generateId2.default)();

      var _ref5, content, parts, current, total, compositeListener, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, part;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetchData();

            case 2:
              _ref5 = _context2.sent;
              content = _ref5.content;
              _context2.next = 6;
              return resolveParts(content);

            case 6:
              parts = _context2.sent;
              current = 0;
              total = parts.length;

              compositeListener = function compositeListener(transferId, progress) {
                listener((current + progress) / total);
              };

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 13;
              _iterator = parts[Symbol.iterator]();

            case 15:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 23;
                break;
              }

              part = _step.value;
              _context2.next = 19;
              return part.download(compositeListener, transferId);

            case 19:
              ++current;

            case 20:
              _iteratorNormalCompletion = true;
              _context2.next = 15;
              break;

            case 23:
              _context2.next = 29;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2['catch'](13);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 29:
              _context2.prev = 29;
              _context2.prev = 30;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 32:
              _context2.prev = 32;

              if (!_didIteratorError) {
                _context2.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context2.finish(32);

            case 36:
              return _context2.finish(29);

            case 37:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[13, 25, 29, 37], [30,, 32, 36]]);
    }));

    return function (_x, _x2) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var resolveParts = exports.resolveParts = function resolveParts(_ref6) {
  var id = _ref6.id,
      fetchModelFromRepository = _ref6.fetchModelFromRepository;
  return function () {
    var _ref7 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(content) {
      var partIds, parseNode, parts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, partId, part;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              partIds = [];

              parseNode = function parseNode(node) {
                if (node.children) {
                  node.forEach(parseNode);
                } else {
                  partIds.push(node.id);
                }
              };

              parseNode(content);

              parts = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context3.prev = 7;
              _iterator2 = (0, _uniq2.default)(partIds)[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context3.next = 22;
                break;
              }

              partId = _step2.value;
              _context3.next = 13;
              return fetchModelFromRepository(partId);

            case 13:
              part = _context3.sent;

              if (part) {
                _context3.next = 18;
                break;
              }

              throw new Error('Error! Non-existing model ID "' + partId + '" referenced by assembly model ID "' + id + '"!');

            case 18:
              parts.push(part);

            case 19:
              _iteratorNormalCompletion2 = true;
              _context3.next = 9;
              break;

            case 22:
              _context3.next = 28;
              break;

            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3['catch'](7);
              _didIteratorError2 = true;
              _iteratorError2 = _context3.t0;

            case 28:
              _context3.prev = 28;
              _context3.prev = 29;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 31:
              _context3.prev = 31;

              if (!_didIteratorError2) {
                _context3.next = 34;
                break;
              }

              throw _iteratorError2;

            case 34:
              return _context3.finish(31);

            case 35:
              return _context3.finish(28);

            case 36:
              return _context3.abrupt('return', parts);

            case 37:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[7, 24, 28, 36], [29,, 31, 35]]);
    }));

    return function (_x4) {
      return _ref7.apply(this, arguments);
    };
  }();
};

var update = exports.update = function update(_ref8) {
  _objectDestructuringEmpty(_ref8);

  return (0, _bluebird.method)(function () {});
};

var createInstance = exports.createInstance = function createInstance(_ref10, model) {
  var fetchData = _ref10.fetchData,
      coreInterface = _ref10.coreInterface,
      fetchModelFromRepository = _ref10.fetchModelFromRepository,
      resolveParts = _ref10.resolveParts,
      createContainer = _ref10.createContainer,
      getSharedInterface = _ref10.getSharedInterface;
  return function () {
    var _ref11 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(instantiationParams, insertionParams) {
      var _ref12, content, id, containerProxy, assembly;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fetchData();

            case 2:
              _ref12 = _context4.sent;
              content = _ref12.content;
              id = (0, _generateId2.default)();
              containerProxy = createContainer(_extends({ id: id }, instantiationParams));
              assembly = (0, _assemblyInstance2.default)(_extends({ id: id, content: content, containerProxy: containerProxy, coreInterface: coreInterface, model: model }, instantiationParams));


              getSharedInterface(instantiationParams.parent).addChild(assembly);

              return _context4.abrupt('return', getSharedInterface(assembly).insert(insertionParams));

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x5, _x6) {
      return _ref11.apply(this, arguments);
    };
  }();
};

//======================================================================================================================

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  id: 'string',
  foreignKey: 'string',
  name: 'string',
  version: 'number'
}, 'AssemblyModel'), (0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  get findModelByForeignKey() {
    return _modelManager2.default.findModelByForeignKey;
  },
  get fetchModelFromRepository() {
    return _modelManager2.default.getModelFromRepository;
  },
  getSharedInterface: _shared2.default,
  AssemblyInstance: _assemblyInstance2.default
}), (0, _compose.createProps)({
  fetchData: fetchData,
  resolveParts: resolveParts,
  update: update,
  download: download,
  createInstance: createInstance
}), _modelBase2.default);

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssemblyInstance = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isEqual = __webpack_require__(25);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _constants = __webpack_require__(4);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _sceneNode = __webpack_require__(51);

var _sceneNode2 = _interopRequireDefault(_sceneNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var AssemblyInstance = exports.AssemblyInstance = (0, _compose.compose)(function (props, assemblyInstance) {
  var id = props.id,
      coreInterface = props.coreInterface,
      getSharedInterface = props.getSharedInterface,
      content = props.content,
      containerProxy = props.containerProxy;


  var getProperties = function getProperties() {
    return Object.assign.apply(Object, [{}].concat(_toConsumableArray(containerProxy.children.map(function (child) {
      return child.properties;
    }))));
  };

  var getDisplayTemplate = function getDisplayTemplate() {
    return Object.keys(getProperties()).map(function (propName) {
      return {
        display: 'thumbnailList',
        name: propName,
        properties: [propName]
      };
    });
  };

  var setPropertyValues = function setPropertyValues(newValues) {
    return (0, _bluebird.all)(containerProxy.children.map(function (child) {
      return child.setPropertyValues(newValues);
    }));
  };

  var getPropertyValues = function getPropertyValues() {
    return Object.assign.apply(Object, [{}].concat(_toConsumableArray(containerProxy.children.map(function (child) {
      return child.propertyValues;
    }))));
  };

  var insert = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, childSpecification;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getSharedInterface(containerProxy).updateParent(props.parent);

            case 2:
              _context.next = 4;
              return getSharedInterface(containerProxy).insert();

            case 4:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 7;
              _iterator = content[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 16;
                break;
              }

              childSpecification = _step.value;
              _context.next = 13;
              return getSharedInterface(childSpecification.model).instantiate(_extends({}, childSpecification, { parent: containerProxy }));

            case 13:
              _iteratorNormalCompletion = true;
              _context.next = 9;
              break;

            case 16:
              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](7);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 22:
              _context.prev = 22;
              _context.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context.prev = 25;

              if (!_didIteratorError) {
                _context.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context.finish(25);

            case 29:
              return _context.finish(22);

            case 30:
              return _context.abrupt('return', assemblyInstance);

            case 31:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[7, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function insert() {
      return _ref.apply(this, arguments);
    };
  }();

  var remove = function remove() {
    return coreInterface.call('deleteInstance', id);
  };

  var toJSON = function toJSON() {
    var model = assemblyInstance.model,
        propertyValues = assemblyInstance.propertyValues,
        pose = assemblyInstance.pose,
        interaction = assemblyInstance.interaction,
        visible = assemblyInstance.visible,
        id = assemblyInstance.id;

    return {
      id: id,
      model: model.foreignKey || model.id,
      propertyValues: propertyValues,
      pose: (0, _isEqual2.default)(pose, _constants.DEFAULT_POSE) ? undefined : pose,
      interaction: (0, _isEqual2.default)(interaction, _constants.DEFAULT_INTERACTION) ? undefined : interaction,
      visible: (0, _isEqual2.default)(visible, _constants.DEFAULT_VISIBLE) ? undefined : visible
    };
  };

  (0, _assign2.default)(assemblyInstance, {
    /**
     * Model this object was instantiated from
     * @member {Model} model
     * @memberof ModelInstance#
     */
    get model() {
      return model;
    },
    /**
     * Dictionary of property values keyed by their names
     * @member {PropertyValues} propertyValues
     * @memberof ModelInstance#
     */
    get propertyValues() {
      return getPropertyValues();
    },
    /**
     * Dictionary of animations
     * @member {Animation[]} animations
     * @memberof ModelInstance#
     */
    get animations() {
      return {};
    },
    /**
     * Dictionary of videos
     * @member {Video[]} video
     * @memberof ModelInstance#
     */
    get videos() {
      return {};
    },
    /**
     * Template used for displaying instances properties
     * @member {Array.<Object>} displayTemplate
     * @memberof ModelInstance#
     */
    get displayTemplate() {
      return getDisplayTemplate();
    },
    /**
     * Dictionary of properties this instance has
     * @member {Object.<string, Property>} properties
     * @memberof ModelInstance#
     */
    get properties() {
      return getProperties();
    },
    /**
     * Sets values of given properties.
     * @param {object} newValues
     * @memberOf! {Assembly}
     */
    setPropertyValues: setPropertyValues,
    toJSON: toJSON
  });

  (0, _assign2.default)(getSharedInterface(assemblyInstance), {
    insert: insert,
    remove: remove
  });
});

exports.default = (0, _compose.compose)((0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  getSharedInterface: _shared2.default
}), _sceneNode2.default, AssemblyInstance);

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstance = exports.update = exports.download = exports.fetchData = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _defaults = __webpack_require__(50);

var _defaults2 = _interopRequireDefault(_defaults);

var _flatMap = __webpack_require__(132);

var _flatMap2 = _interopRequireDefault(_flatMap);

var _uniq = __webpack_require__(80);

var _uniq2 = _interopRequireDefault(_uniq);

var _compose = __webpack_require__(2);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _modelManager = __webpack_require__(27);

var _modelManager2 = _interopRequireDefault(_modelManager);

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

var _fetchDescription = __webpack_require__(52);

var _fetchDescription2 = _interopRequireDefault(_fetchDescription);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _configurableInstance = __webpack_require__(308);

var _configurableInstance2 = _interopRequireDefault(_configurableInstance);

var _container = __webpack_require__(117);

var _container2 = _interopRequireDefault(_container);

var _modelBase = __webpack_require__(54);

var _modelBase2 = _interopRequireDefault(_modelBase);

var _property = __webpack_require__(125);

var _property2 = _interopRequireDefault(_property);

var _simpleModel = __webpack_require__(120);

var _simpleModel2 = _interopRequireDefault(_simpleModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//======================================================================================================================

var fetchData = exports.fetchData = function fetchData(_ref, configurableModel) {
  var id = _ref.id,
      coreInterface = _ref.coreInterface;
  return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var description;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fetchDescription2.default)({ id: id, coreInterface: coreInterface })();

          case 2:
            description = _context.sent;

            Object.assign(configurableModel, { data: description.data, images: description.images });
            return _context.abrupt('return', description);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

var download = exports.download = function download(_ref3) {
  var fetchData = _ref3.fetchData,
      resolveParts = _ref3.resolveParts,
      coreInterface = _ref3.coreInterface;
  return function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(listener) {
      var transferId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _generateId2.default)();

      var _ref5, configurationDescription, parts, current, total, compositeListener, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, part;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetchData();

            case 2:
              _ref5 = _context2.sent;
              configurationDescription = _ref5.configurationDescription;
              _context2.next = 6;
              return resolveParts(configurationDescription.properties);

            case 6:
              parts = _context2.sent;
              current = 0;
              total = parts.length;

              compositeListener = function compositeListener(progress) {
                return listener((current + progress) / total);
              };

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 13;
              _iterator = parts[Symbol.iterator]();

            case 15:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 23;
                break;
              }

              part = _step.value;
              _context2.next = 19;
              return part.download(compositeListener, transferId);

            case 19:
              ++current;

            case 20:
              _iteratorNormalCompletion = true;
              _context2.next = 15;
              break;

            case 23:
              _context2.next = 29;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2['catch'](13);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 29:
              _context2.prev = 29;
              _context2.prev = 30;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 32:
              _context2.prev = 32;

              if (!_didIteratorError) {
                _context2.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context2.finish(32);

            case 36:
              return _context2.finish(29);

            case 37:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[13, 25, 29, 37], [30,, 32, 36]]);
    }));

    return function (_x, _x2) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var resolveParts = function resolveParts(_ref6) {
  var id = _ref6.id,
      findModelByForeignKey = _ref6.findModelByForeignKey,
      fetchModelFromRepository = _ref6.fetchModelFromRepository;
  return function () {
    var _ref7 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(propertyDefinition) {
      var modelIds, foreignKeys, parts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, modelId, part, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, foreignKey, model, _part;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              modelIds = [];
              foreignKeys = [];


              propertyDefinition.filter(function (property) {
                return property.type === 'part' && property.valueType === 'enumerated';
              }).forEach(function (property) {
                return property.values.forEach(function (value) {
                  value.modelId && modelIds.push(value.modelId);
                  value.modelIds && modelIds.push.apply(modelIds, _toConsumableArray(value.modelIds));
                  value.foreignKey && foreignKeys.push(value.foreignKey);
                  value.foreignKeys && foreignKeys.push.apply(foreignKeys, _toConsumableArray(value.foreignKeys));
                });
              });

              parts = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context3.prev = 7;
              _iterator2 = (0, _uniq2.default)(modelIds)[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context3.next = 22;
                break;
              }

              modelId = _step2.value;
              _context3.next = 13;
              return fetchModelFromRepository(modelId);

            case 13:
              part = _context3.sent;

              if (part) {
                _context3.next = 18;
                break;
              }

              throw new Error('ViewAR API: Error! Missing model ID "' + modelId + '" referenced by assembly model ID "' + id + '"!');

            case 18:
              parts.push(part.id !== id ? part : (0, _simpleModel2.default)(part));

            case 19:
              _iteratorNormalCompletion2 = true;
              _context3.next = 9;
              break;

            case 22:
              _context3.next = 28;
              break;

            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3['catch'](7);
              _didIteratorError2 = true;
              _iteratorError2 = _context3.t0;

            case 28:
              _context3.prev = 28;
              _context3.prev = 29;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 31:
              _context3.prev = 31;

              if (!_didIteratorError2) {
                _context3.next = 34;
                break;
              }

              throw _iteratorError2;

            case 34:
              return _context3.finish(31);

            case 35:
              return _context3.finish(28);

            case 36:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context3.prev = 39;
              _iterator3 = (0, _uniq2.default)(foreignKeys)[Symbol.iterator]();

            case 41:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context3.next = 55;
                break;
              }

              foreignKey = _step3.value;
              model = findModelByForeignKey(foreignKey);

              if (model) {
                _context3.next = 48;
                break;
              }

              throw new Error('ViewAR API: Error! Missing model foreign key "' + foreignKey + '" referenced by assembly model ID "' + id + '"!');

            case 48:
              _part = model.id !== id ? model : (0, _simpleModel2.default)(model);
              _context3.next = 51;
              return _part.downloadDescription();

            case 51:
              parts.push(_part);

            case 52:
              _iteratorNormalCompletion3 = true;
              _context3.next = 41;
              break;

            case 55:
              _context3.next = 61;
              break;

            case 57:
              _context3.prev = 57;
              _context3.t1 = _context3['catch'](39);
              _didIteratorError3 = true;
              _iteratorError3 = _context3.t1;

            case 61:
              _context3.prev = 61;
              _context3.prev = 62;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 64:
              _context3.prev = 64;

              if (!_didIteratorError3) {
                _context3.next = 67;
                break;
              }

              throw _iteratorError3;

            case 67:
              return _context3.finish(64);

            case 68:
              return _context3.finish(61);

            case 69:
              return _context3.abrupt('return', parts);

            case 70:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[7, 24, 28, 36], [29,, 31, 35], [39, 57, 61, 69], [62,, 64, 68]]);
    }));

    return function (_x4) {
      return _ref7.apply(this, arguments);
    };
  }();
};

var setPropertyValues = function setPropertyValues(properties, propertyValues, preset) {
  var other = properties.reduce(function (object, _ref8) {
    var name = _ref8.name;
    return Object.assign(object, _defineProperty({}, name, null));
  }, {});
  Object.entries((0, _defaults2.default)({}, propertyValues, preset, other)).forEach(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        name = _ref10[0],
        valueKey = _ref10[1];

    var property = properties.find(function (property) {
      return property.name === name;
    });
    if (property) {
      property.value = property.resolveValue(valueKey);
      if (valueKey === null) {
        console.warn('ViewAR API: Warning! Missing preset for property "' + property.name + '"!');
      } else if (!property.value) {
        console.warn('ViewAR API: Warning! Unrecognized value key "' + valueKey + '" for property "' + property.name + '"!');
      }
      property.value = [].concat(_toConsumableArray(property.getValueIterator()))[0];
    } else {
      console.warn('ViewAR API: Warning! Found preset for unknown property "' + name + '"!');
    }
  });
};

var addMaterialThumbnails = function () {
  var _ref11 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(properties, parts, coreInterface) {
    var descriptions, materials;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _bluebird.all)(parts.map(function (part) {
              return part.downloadDescription();
            }));

          case 2:
            descriptions = _context4.sent;
            materials = (0, _flatMap2.default)(descriptions.map(function (description) {
              return description.materialDescription;
            }));


            properties.filter(function (property) {
              return property.valueType === 'enumerated';
            }).forEach(function (property) {
              return property.options.forEach(function (option) {

                if (!option.null) {
                  (function () {
                    var key = option.key;

                    var _loop = function _loop(alias) {
                      if (!option.imageUrl) {

                        var material = materials.find(function (options) {
                          return options.id === alias;
                        });
                        if (material) {

                          var materialOption = material.options.find(function (option) {
                            return option.id === key;
                          });
                          if (materialOption) {
                            var thumb = materialOption.thumb;
                            var resourcePackId = thumb.split('_')[0];

                            option.imageUrl = coreInterface.resolveUrl('/Models/Resources/' + resourcePackId + '/' + thumb);
                          } else {
                            console.warn('ViewAR API: Warning! Material option "' + key + '" for material property "' + property.name + '" not found! Can\'t set option thumbnail.');
                          }
                        }
                      }
                    };

                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                      for (var _iterator4 = property.aliases[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var alias = _step4.value;

                        _loop(alias);
                      }
                    } catch (err) {
                      _didIteratorError4 = true;
                      _iteratorError4 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                          _iterator4.return();
                        }
                      } finally {
                        if (_didIteratorError4) {
                          throw _iteratorError4;
                        }
                      }
                    }
                  })();
                }
              });
            });

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function addMaterialThumbnails(_x5, _x6, _x7) {
    return _ref11.apply(this, arguments);
  };
}();

var update = exports.update = function update(_ref12) {
  _objectDestructuringEmpty(_ref12);

  return (0, _bluebird.method)(function () {});
};

var createInstance = exports.createInstance = function createInstance(props, configurableModel) {
  return function () {
    var _ref14 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(instantiationParams, insertionParams) {
      var fetchData, resolveParts, Container, Property, ConfigurableInstance, getSharedInterface, coreInterface, _ref15, configurationDescription, parts, properties, id, containerProxy, instance;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              fetchData = props.fetchData, resolveParts = props.resolveParts, Container = props.Container, Property = props.Property, ConfigurableInstance = props.ConfigurableInstance, getSharedInterface = props.getSharedInterface, coreInterface = props.coreInterface;
              _context5.next = 3;
              return fetchData();

            case 3:
              _ref15 = _context5.sent;
              configurationDescription = _ref15.configurationDescription;
              _context5.next = 7;
              return resolveParts(configurationDescription.properties);

            case 7:
              parts = _context5.sent;
              properties = configurationDescription.properties.map(Property);
              _context5.next = 11;
              return addMaterialThumbnails(properties, parts, coreInterface);

            case 11:
              setPropertyValues(properties, instantiationParams.propertyValues, configurationDescription.preset);

              id = instantiationParams.id || (0, _generateId2.default)();
              containerProxy = Container(_extends({}, instantiationParams, { id: id }));
              instance = ConfigurableInstance(_extends({}, instantiationParams, {
                id: id,
                model: configurableModel,
                properties: properties,
                parts: parts,
                preset: configurationDescription.preset,
                displayTemplate: configurationDescription.displayTemplate,
                containerProxy: containerProxy
              }));

              getSharedInterface(instantiationParams.parent).addChild(instance);
              _context5.next = 18;
              return getSharedInterface(instance).insert(instantiationParams.pose, insertionParams);

            case 18:
              return _context5.abrupt('return', instance);

            case 19:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function (_x8, _x9) {
      return _ref14.apply(this, arguments);
    };
  }();
};

//======================================================================================================================

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  id: 'string',
  foreignKey: 'string',
  name: 'string',
  version: 'number'
}, 'ConfigurableModel'), (0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  get findModelByForeignKey() {
    return _modelManager2.default.findModelByForeignKey;
  },
  get fetchModelFromRepository() {
    return _modelManager2.default.fetchModelFromRepository;
  },
  getSharedInterface: _shared2.default,
  Property: _property2.default,
  Container: _container2.default,
  ConfigurableInstance: _configurableInstance2.default
}), (0, _compose.createProps)({
  fetchData: fetchData,
  resolveParts: resolveParts,
  update: update,
  download: download,
  createInstance: createInstance
}), _modelBase2.default);

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(14),
    baseIteratee = __webpack_require__(296),
    baseMap = __webpack_require__(304),
    isArray = __webpack_require__(5);

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(297),
    baseMatchesProperty = __webpack_require__(300),
    identity = __webpack_require__(73),
    isArray = __webpack_require__(5),
    property = __webpack_require__(302);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(298),
    getMatchData = __webpack_require__(299),
    matchesStrictComparable = __webpack_require__(134);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(35),
    baseIsEqual = __webpack_require__(75);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(133),
    keys = __webpack_require__(28);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(75),
    get = __webpack_require__(301),
    hasIn = __webpack_require__(131),
    isKey = __webpack_require__(71),
    isStrictComparable = __webpack_require__(133),
    matchesStrictComparable = __webpack_require__(134),
    toKey = __webpack_require__(24);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(45);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(126),
    basePropertyDeep = __webpack_require__(303),
    isKey = __webpack_require__(71),
    toKey = __webpack_require__(24);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(45);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(305),
    isArrayLike = __webpack_require__(22);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(306),
    createBaseEach = __webpack_require__(307);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(130),
    keys = __webpack_require__(28);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(22);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurableInstance = undefined;

var _bluebird = __webpack_require__(0);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _isEqual = __webpack_require__(25);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _mergeWith = __webpack_require__(128);

var _mergeWith2 = _interopRequireDefault(_mergeWith);

var _flatMap = __webpack_require__(132);

var _flatMap2 = _interopRequireDefault(_flatMap);

var _isArray = __webpack_require__(5);

var _isArray2 = _interopRequireDefault(_isArray);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _sceneNode = __webpack_require__(51);

var _sceneNode2 = _interopRequireDefault(_sceneNode);

var _constants = __webpack_require__(4);

var _utils = __webpack_require__(6);

var _valueCombinationIterator = __webpack_require__(309);

var _valueCombinationIterator2 = _interopRequireDefault(_valueCombinationIterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ConfigurableInstance = exports.ConfigurableInstance = (0, _compose.compose)(function (props, configurableInstance) {
  var updateInstances = function () {
    var _ref6 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref7) {
      var _ref7$parts = _ref7.parts,
          parts = _ref7$parts === undefined ? [] : _ref7$parts,
          _ref7$propertyValues = _ref7.propertyValues,
          propertyValues = _ref7$propertyValues === undefined ? {} : _ref7$propertyValues;

      var oldInstances, instancesByModelId, models, parent, pose, previousInstances, usedSnappingPoints, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _model, plugPoint, _getMatchingSnappingP, socketInstance, socketPoint, instance, connectionName, _connectionName, _instance;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              oldInstances = [].concat(_toConsumableArray(containerProxy.children));
              instancesByModelId = {};

              oldInstances.forEach(function (instance) {
                return (instancesByModelId[instance.model.id] = instancesByModelId[instance.model.id] || []).push(instance);
              });

              models = parts.map(function (key) {
                return partsByKey[key] || console.warn('ViewAR API: Warning! Missing part foreign key: ' + key + ' for model ' + model.id + ' (' + model.name + ')!');
              }).filter(function (model) {
                return !!model;
              });
              parent = containerProxy;
              pose = _constants.DEFAULT_POSE;
              previousInstances = [];
              usedSnappingPoints = [];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 11;
              _iterator3 = models[Symbol.iterator]();

            case 13:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context.next = 56;
                break;
              }

              _model = _step3.value;
              _context.next = 17;
              return _model.downloadDescription();

            case 17:
              plugPoint = getFirstSnappingPoint({ model: _model });
              _getMatchingSnappingP = getMatchingSnappingPoint(plugPoint, usedSnappingPoints, previousInstances), socketInstance = _getMatchingSnappingP.socketInstance, socketPoint = _getMatchingSnappingP.socketPoint;

              if (!(instancesByModelId[_model.id] && instancesByModelId[_model.id].length)) {
                _context.next = 35;
                break;
              }

              instance = instancesByModelId[_model.id].pop();

              if (!(plugPoint && socketPoint)) {
                _context.next = 28;
                break;
              }

              connectionName = plugPoint.plugs[0].connection;
              _context.next = 25;
              return coreInterface.call('snapTo', instance.id, plugPoint.name, socketInstance.id, socketPoint.name, connectionName);

            case 25:
              usedSnappingPoints.push(socketPoint);
              _context.next = 30;
              break;

            case 28:
              _context.next = 30;
              return instance.setPose(pose);

            case 30:
              _context.next = 32;
              return instance.setPropertyValues(propertyValues);

            case 32:
              previousInstances.push(instance);
              _context.next = 53;
              break;

            case 35:
              if (!(plugPoint && socketPoint)) {
                _context.next = 48;
                break;
              }

              _connectionName = plugPoint.plugs[0].connection;
              _context.next = 39;
              return getSharedInterface(_model).instantiate({ propertyValues: propertyValues, parent: parent, pose: pose, visible: false });

            case 39:
              _instance = _context.sent;
              _context.next = 42;
              return coreInterface.call('snapTo', _instance.id, plugPoint.name, socketInstance.id, socketPoint.name, _connectionName);

            case 42:
              usedSnappingPoints.push(socketPoint);
              _context.next = 45;
              return _instance.setVisible(true);

            case 45:
              previousInstances.push(_instance);
              _context.next = 53;
              break;

            case 48:
              _context.t0 = previousInstances;
              _context.next = 51;
              return getSharedInterface(_model).instantiate({ propertyValues: propertyValues, parent: parent, pose: pose });

            case 51:
              _context.t1 = _context.sent;

              _context.t0.push.call(_context.t0, _context.t1);

            case 53:
              _iteratorNormalCompletion3 = true;
              _context.next = 13;
              break;

            case 56:
              _context.next = 62;
              break;

            case 58:
              _context.prev = 58;
              _context.t2 = _context['catch'](11);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t2;

            case 62:
              _context.prev = 62;
              _context.prev = 63;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 65:
              _context.prev = 65;

              if (!_didIteratorError3) {
                _context.next = 68;
                break;
              }

              throw _iteratorError3;

            case 68:
              return _context.finish(65);

            case 69:
              return _context.finish(62);

            case 70:
              _context.next = 72;
              return (0, _bluebird.all)((0, _flatMap2.default)(Object.values(instancesByModelId)).map(function () {
                var _ref8 = (0, _bluebird.method)(function (unusedInstance) {
                  getSharedInterface(containerProxy).removeChild(unusedInstance);
                  return getSharedInterface(unusedInstance).remove();
                });

                return function (_x3) {
                  return _ref8.apply(this, arguments);
                };
              }()));

            case 72:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[11, 58, 62, 70], [63,, 65, 69]]);
    }));

    return function updateInstances(_x2) {
      return _ref6.apply(this, arguments);
    };
  }();

  var insert = function () {
    var _ref9 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              getSharedInterface(containerProxy).updateParent(configurableInstance.parent);
              _context2.next = 3;
              return getSharedInterface(containerProxy).insert();

            case 3:
              _context2.next = 5;
              return update({}, true);

            case 5:
              return _context2.abrupt('return', configurableInstance);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function insert() {
      return _ref9.apply(this, arguments);
    };
  }();

  var remove = function () {
    var _ref10 = (0, _bluebird.method)(function () {
      return containerProxy.remove();
    });

    return function remove() {
      return _ref10.apply(this, arguments);
    };
  }();

  var model = props.model,
      properties = props.properties,
      preset = props.preset,
      displayTemplate = props.displayTemplate,
      containerProxy = props.containerProxy,
      parts = props.parts,
      coreInterface = props.coreInterface,
      getSharedInterface = props.getSharedInterface;


  var propertyDictionary = (0, _utils.dictionarize)(properties, 'name');
  var partsByKey = (0, _utils.dictionarize)(parts, 'foreignKey');

  var getPropertyValues = function getPropertyValues() {
    return (0, _utils.toValueObject)(properties.map(function (_ref) {
      var name = _ref.name,
          getValueKey = _ref.getValueKey;
      return { name: name, value: getValueKey() };
    }));
  };

  function setPropertyValues(newPropertyValues) {
    return update(resolveValues(newPropertyValues));
  }

  function resolveValues(newPropertyValues) {
    var resolvedValues = {};

    Object.entries(newPropertyValues).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          propertyName = _ref3[0],
          value = _ref3[1];

      if (propertyDictionary[propertyName]) {
        var resolvedValue = propertyDictionary[propertyName].resolveValue(value);
        if (resolvedValue) {
          resolvedValues[propertyName] = resolvedValue;
        }
      }
    });

    return resolvedValues;
  }

  function update(newPropertyValues) {
    var forceRebuild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


    applyPropertyValues(newPropertyValues);

    var insertionParams = compileInsertionParams(properties);

    if (forceRebuild || !(0, _isEqual2.default)(getCurrentParts(), insertionParams.parts)) {
      return updateInstances(insertionParams);
    } else {
      return updateParams(insertionParams);
    }
  }

  function getCurrentParts() {
    return containerProxy.children.map(function (child) {
      return child.model.foreignKey;
    });
  }

  function applyPropertyValues(newPropertyValues) {
    var oldValues = getPropertyValues();

    var modifiedProperties = assignValues(newPropertyValues);

    if (properties.every(function (property) {
      return property.hasValidValue(configurableInstance);
    })) {
      return modifiedProperties;
    }

    var orderedProperties = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = properties.filter(function (property) {
        return property.valueType !== 'fixed';
      })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var property = _step.value;

        if (property.hasValidValue(configurableInstance)) {
          orderedProperties.unshift(property);
        } else {
          orderedProperties.push(property);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _valueCombinationIterator2.default)(orderedProperties, newPropertyValues)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var valueCombination = _step2.value;


        assignValues(oldValues); //TODO: is there a better way of calculating modified properties?

        var _modifiedProperties = assignValues((0, _utils.toValueObject)(valueCombination));

        if (properties.every(function (property) {
          return property.hasValidValue(configurableInstance);
        })) {
          return _modifiedProperties;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    throw new Error('ViewAR API: Error! Configuration conflicts could not be resolved!');
  }

  function assignValues(newValues) {
    var modifiedProperties = Object.entries(newValues).map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          name = _ref5[0],
          value = _ref5[1];

      var property = propertyDictionary[name];

      if (value !== property.value) {
        property.value = property.resolveValue(value);
        return property;
      } else {
        return null;
      }
    }).filter(function (property) {
      return !!property;
    });

    return (0, _utils.dictionarize)(modifiedProperties, 'name');
  }

  function updateParams(params) {
    return (0, _bluebird.all)(containerProxy.children.map(function (child) {
      return child.setPropertyValues(params.propertyValues);
    }));
  }

  function getFirstSnappingPoint(instance) {
    return instance && instance.model.data.snappingpoints && instance.model.data.snappingpoints[0];
  }

  function getMatchingSnappingPoint(plugPoint, usedSnappingPoints, instances) {
    var connectionName = plugPoint && plugPoint.plugs[0].connection;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = instances[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var socketInstance = _step4.value;

        var socketPoint = socketInstance.model.data.snappingpoints && socketInstance.model.data.snappingpoints.find(function (point) {
          return !usedSnappingPoints.includes(point) && point.sockets.find(function (socket) {
            return socket.connection === connectionName;
          });
        });
        if (socketPoint) {
          return { socketInstance: socketInstance, socketPoint: socketPoint };
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return {};
  }

  function compileInsertionParams(properties) {
    return _mergeWith2.default.apply(undefined, _toConsumableArray(properties.map(function (property) {
      return property.getInsertionParams();
    })).concat([function (objValue, srcValue) {
      return (0, _isArray2.default)(objValue) && objValue.concat(srcValue) || undefined;
    }]));
  }

  var toJSON = function toJSON() {
    var model = configurableInstance.model,
        propertyValues = configurableInstance.propertyValues,
        pose = configurableInstance.pose,
        interaction = configurableInstance.interaction,
        visible = configurableInstance.visible,
        id = configurableInstance.id;

    return {
      id: id,
      model: model.foreignKey || model.id,
      propertyValues: (0, _isEqual2.default)(propertyValues, preset) ? undefined : propertyValues,
      pose: (0, _isEqual2.default)(pose, _constants.DEFAULT_POSE) ? undefined : pose,
      interaction: (0, _isEqual2.default)(interaction, _constants.DEFAULT_INTERACTION) ? undefined : interaction,
      visible: (0, _isEqual2.default)(visible, _constants.DEFAULT_VISIBLE) ? undefined : visible
    };
  };

  (0, _assign2.default)(configurableInstance, {
    get model() {
      return model;
    },
    get propertyValues() {
      return getPropertyValues();
    },
    get animations() {
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(containerProxy.children.map(function (child) {
        return child.animations;
      }))));
    },
    get videos() {
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(containerProxy.children.map(function (child) {
        return child.videos;
      }))));
    },
    get displayTemplate() {
      return displayTemplate;
    },
    get properties() {
      return propertyDictionary;
    },
    setPropertyValues: setPropertyValues,
    toJSON: toJSON
  });

  (0, _assign2.default)(getSharedInterface(configurableInstance), {
    insert: insert,
    remove: remove
  });
});

exports.default = (0, _compose.compose)((0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  getSharedInterface: _shared2.default
}), _sceneNode2.default, ConfigurableInstance);

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createValueCombinationIterator;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(createValueCombinationIterator);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function createValueCombinationIterator(_ref) {
  var _ref2 = _toArray(_ref),
      currentProperty = _ref2[0],
      otherProperties = _ref2.slice(1);

  var fixedValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var combination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var fixedValue, values, setValue, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, value;

  return regeneratorRuntime.wrap(function createValueCombinationIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!currentProperty) {
            _context.next = 33;
            break;
          }

          fixedValue = fixedValues[currentProperty.name];
          values = fixedValue ? [fixedValue] : [].concat(_toConsumableArray(currentProperty.values));
          setValue = currentProperty.value;
          index = values.indexOf(setValue);

          if (index !== -1) {
            values.splice(index, 1);
            values.unshift(setValue);
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 9;
          _iterator = values[Symbol.iterator]();

        case 11:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 17;
            break;
          }

          value = _step.value;
          return _context.delegateYield(createValueCombinationIterator(otherProperties, fixedValues, [].concat(_toConsumableArray(combination), [{ name: currentProperty.name, value: value }])), "t0", 14);

        case 14:
          _iteratorNormalCompletion = true;
          _context.next = 11;
          break;

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t1 = _context["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 23:
          _context.prev = 23;
          _context.prev = 24;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 26:
          _context.prev = 26;

          if (!_didIteratorError) {
            _context.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context.finish(26);

        case 30:
          return _context.finish(23);

        case 31:
          _context.next = 35;
          break;

        case 33:
          _context.next = 35;
          return combination;

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[9, 19, 23, 31], [24,, 26, 30]]);
}

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstance = exports.update = exports.resolveParts = exports.download = exports.fetchData = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _compose = __webpack_require__(2);

var _fetchDescription = __webpack_require__(52);

var _fetchDescription2 = _interopRequireDefault(_fetchDescription);

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

var _shared = __webpack_require__(10);

var _shared2 = _interopRequireDefault(_shared);

var _modelBase = __webpack_require__(54);

var _modelBase2 = _interopRequireDefault(_modelBase);

var _modelManager = __webpack_require__(27);

var _modelManager2 = _interopRequireDefault(_modelManager);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

//======================================================================================================================

var fetchData = exports.fetchData = function fetchData(_ref, referenceModel) {
  var id = _ref.id,
      coreInterface = _ref.coreInterface;
  return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var description;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fetchDescription2.default)({ id: id, coreInterface: coreInterface })();

          case 2:
            description = _context.sent;

            Object.assign(referenceModel, { data: description.data, images: description.images });
            return _context.abrupt('return', description);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));
};

var download = exports.download = function download(_ref3) {
  var fetchData = _ref3.fetchData,
      resolveParts = _ref3.resolveParts;
  return function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(listener) {
      var transferId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _generateId2.default)();

      var _ref5, references, parts, current, total, compositeListener, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, part;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetchData();

            case 2:
              _ref5 = _context2.sent;
              references = _ref5.references;
              _context2.next = 6;
              return resolveParts(references);

            case 6:
              parts = _context2.sent;
              current = 0;
              total = parts.length;

              compositeListener = function compositeListener(transferId, progress) {
                listener((current + progress) / total);
              };

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 13;
              _iterator = parts[Symbol.iterator]();

            case 15:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 23;
                break;
              }

              part = _step.value;
              _context2.next = 19;
              return part.download(compositeListener, transferId);

            case 19:
              ++current;

            case 20:
              _iteratorNormalCompletion = true;
              _context2.next = 15;
              break;

            case 23:
              _context2.next = 29;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2['catch'](13);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 29:
              _context2.prev = 29;
              _context2.prev = 30;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 32:
              _context2.prev = 32;

              if (!_didIteratorError) {
                _context2.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context2.finish(32);

            case 36:
              return _context2.finish(29);

            case 37:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[13, 25, 29, 37], [30,, 32, 36]]);
    }));

    return function (_x, _x2) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var resolveParts = exports.resolveParts = function resolveParts(_ref6) {
  var id = _ref6.id,
      fetchModelFromRepository = _ref6.fetchModelFromRepository;
  return function () {
    var _ref7 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(references) {
      var parts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _ref8, referenceId, part;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              parts = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context3.prev = 4;
              _iterator2 = references[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context3.next = 20;
                break;
              }

              _ref8 = _step2.value;
              referenceId = _ref8.id;
              _context3.next = 11;
              return fetchModelFromRepository(id);

            case 11:
              part = _context3.sent;

              if (part) {
                _context3.next = 16;
                break;
              }

              throw new Error('Error! Non-existing model ID "' + referenceId + '" referenced by reference model ID "' + id + '"!');

            case 16:
              parts.push(part);

            case 17:
              _iteratorNormalCompletion2 = true;
              _context3.next = 6;
              break;

            case 20:
              _context3.next = 26;
              break;

            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3['catch'](4);
              _didIteratorError2 = true;
              _iteratorError2 = _context3.t0;

            case 26:
              _context3.prev = 26;
              _context3.prev = 27;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 29:
              _context3.prev = 29;

              if (!_didIteratorError2) {
                _context3.next = 32;
                break;
              }

              throw _iteratorError2;

            case 32:
              return _context3.finish(29);

            case 33:
              return _context3.finish(26);

            case 34:
              return _context3.abrupt('return', parts);

            case 35:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[4, 22, 26, 34], [27,, 29, 33]]);
    }));

    return function (_x4) {
      return _ref7.apply(this, arguments);
    };
  }();
};

var update = exports.update = function update(_ref9) {
  _objectDestructuringEmpty(_ref9);

  return (0, _bluebird.method)(function () {});
};

var createInstance = exports.createInstance = function createInstance(_ref11) {
  var _ref11$walkCamera = _ref11.walkCamera,
      walkCamera = _ref11$walkCamera === undefined ? {} : _ref11$walkCamera,
      fetchData = _ref11.fetchData,
      fetchModelFromRepository = _ref11.fetchModelFromRepository,
      resolveParts = _ref11.resolveParts,
      createContainer = _ref11.createContainer,
      getSharedInterface = _ref11.getSharedInterface;
  return function () {
    var _ref12 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(instantiationParams, insertionParams) {
      var _ref13, references, container, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _ref14, id, name, pose, model;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fetchData();

            case 2:
              _ref13 = _context4.sent;
              references = _ref13.references;
              container = createContainer(_extends({}, instantiationParams, { type: 'ungrouped' }));

              getSharedInterface(instantiationParams.parent).addChild(container);

              _context4.next = 8;
              return getSharedInterface(container).insert(insertionParams);

            case 8:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context4.prev = 11;
              _iterator3 = references[Symbol.iterator]();

            case 13:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context4.next = 24;
                break;
              }

              _ref14 = _step3.value;
              id = _ref14.id, name = _ref14.name, pose = _ref14.pose;
              _context4.next = 18;
              return fetchModelFromRepository(id);

            case 18:
              model = _context4.sent;
              _context4.next = 21;
              return getSharedInterface(model).instantiate({ parent: container, pose: pose, visible: !/panorama/i.exec(name) || walkCamera.active });

            case 21:
              _iteratorNormalCompletion3 = true;
              _context4.next = 13;
              break;

            case 24:
              _context4.next = 30;
              break;

            case 26:
              _context4.prev = 26;
              _context4.t0 = _context4['catch'](11);
              _didIteratorError3 = true;
              _iteratorError3 = _context4.t0;

            case 30:
              _context4.prev = 30;
              _context4.prev = 31;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 33:
              _context4.prev = 33;

              if (!_didIteratorError3) {
                _context4.next = 36;
                break;
              }

              throw _iteratorError3;

            case 36:
              return _context4.finish(33);

            case 37:
              return _context4.finish(30);

            case 38:
              return _context4.abrupt('return', container);

            case 39:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[11, 26, 30, 38], [31,, 33, 37]]);
    }));

    return function (_x5, _x6) {
      return _ref12.apply(this, arguments);
    };
  }();
};

//======================================================================================================================

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  id: 'string',
  foreignKey: 'string',
  name: 'string',
  version: 'number'
}, 'ReferenceModel'), (0, _compose.injectProps)({
  coreInterface: _coreInterface2.default,
  get findModelByForeignKey() {
    return _modelManager2.default.findModelByForeignKey;
  },
  get fetchModelFromRepository() {
    return _modelManager2.default.getModelFromRepository;
  },
  getSharedInterface: _shared2.default
}), (0, _compose.createProps)({
  fetchData: fetchData,
  resolveParts: resolveParts,
  update: update,
  download: download,
  createInstance: createInstance,
  downloadDescription: fetchData
}), _modelBase2.default);

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = undefined;

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _compose = __webpack_require__(2);

var _catalogItem = __webpack_require__(121);

var _catalogItem2 = _interopRequireDefault(_catalogItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Part of the model category tree, contains other categories and models.
 *
 * @interface Category
 * @extends CatalogItem
 */
var Category = exports.Category = (0, _compose.compose)(function (_ref, category) {
  var children = _ref.children;

  (0, _assign2.default)(category, {
    get children() {
      return [].concat(_toConsumableArray(children));
    }
  });
});

exports.default = (0, _compose.compose)((0, _compose.requireProps)({
  children: 'array'
}, 'Category'), _catalogItem2.default, Category);

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Project = Project;

var _defaults2 = __webpack_require__(50);

var _defaults3 = _interopRequireDefault(_defaults2);

var _cloneDeep = __webpack_require__(137);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _generateId = __webpack_require__(12);

var _generateId2 = _interopRequireDefault(_generateId);

var _appUtils = __webpack_require__(138);

var _appUtils2 = _interopRequireDefault(_appUtils);

var _sceneManager = __webpack_require__(115);

var _sceneManager2 = _interopRequireDefault(_sceneManager);

var _roomManager = __webpack_require__(139);

var _roomManager2 = _interopRequireDefault(_roomManager);

var _projectManager = __webpack_require__(136);

var _projectManager2 = _interopRequireDefault(_projectManager);

var _local = __webpack_require__(81);

var _local2 = _interopRequireDefault(_local);

var _cloud = __webpack_require__(82);

var _cloud2 = _interopRequireDefault(_cloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultSpecification = {
  name: 'Project',
  screenshotUrl: '',
  info: {},
  data: null,
  storedInCloud: false,
  storedLocally: false,
  modified: false,
  interval: null
};

/**
 * @interface Project
 */

exports.default = function (props) {
  return Project(_extends({}, props, { appUtils: _appUtils2.default, sceneManager: _sceneManager2.default, roomManager: _roomManager2.default, projectManager: _projectManager2.default, localStorage: _local2.default, cloudStorage: _cloud2.default }));
};

function Project(specification) {

  /**
   * Loads the scene state from the project
   * @method
   * @param {object} flags
   * @returns {Promise} resolved when done.
   * @memberof Project#
   */
  var loadState = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = data;

              if (_context.t0) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return fetchData();

            case 4:
              _context.t0 = _context.sent;

            case 5:
              data = _context.t0;

              modified = false;
              _context.next = 9;
              return roomManager.addRoomToScene(data.roomDescription);

            case 9:
              _context.next = 11;
              return sceneManager.setSceneState(data.sceneState);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function loadState() {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Saves the scene state into the project
   * @param {string} url screenshot URL
   * @memberof Project#
   */


  /**
   * Stores project to local permanent storage
   * @method
   * @returns {Promise} resolved when done.
   * @memberof Project#
   */
  var storeLocally = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              modified = false;

              _context2.t0 = data;

              if (_context2.t0) {
                _context2.next = 6;
                break;
              }

              _context2.next = 5;
              return fetchData();

            case 5:
              _context2.t0 = _context2.sent;

            case 6:
              data = _context2.t0;

              storedLocally = true;

              if (!(projectManager.online && cloudScreenshotUrl)) {
                _context2.next = 12;
                break;
              }

              localScreenshotUrl = '/CustomImages/' + id + '_screenshot.png';
              _context2.next = 12;
              return appUtils.prepareCustomImage(id + '_screenshot.png', cloudScreenshotUrl);

            case 12:

              projectManager.projects.local[id] = project;
              _context2.next = 15;
              return projectManager.updateLocalProjectIndex();

            case 15:
              _context2.next = 17;
              return localStorage.write('/Projects/' + id + '.json', JSON.stringify({ id: id, name: name, info: info, timestamp: timestamp, data: data, localScreenshotUrl: localScreenshotUrl, cloudScreenshotUrl: cloudScreenshotUrl }));

            case 17:
              return _context2.abrupt('return', true);

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function storeLocally() {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Removes project from local permanent storage
   * @method
   * @returns {Promise} resolved when done.
   * @memberof Project#
   */


  var removeLocally = function () {
    var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!storedLocally) {
                _context3.next = 7;
                break;
              }

              storedLocally = false;
              _context3.next = 4;
              return projectManager.updateLocalProjectIndex();

            case 4:
              _context3.next = 6;
              return localStorage.remove('/Projects/' + id + '.json');

            case 6:
              return _context3.abrupt('return', true);

            case 7:
              return _context3.abrupt('return', false);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function removeLocally() {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * Stores project to cloud storage
   * @method
   * @returns {Promise} resolved when done.
   * @memberof Project#
   */


  var storeToCloud = function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var fields;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              modified = false;
              storedToCloud = true;

              if (!localScreenshotUrl) {
                _context4.next = 8;
                break;
              }

              fields = {
                storage: cloudStorage.storageKey
              };

              fields[id] = '@' + localScreenshotUrl;
              _context4.next = 7;
              return appUtils.httpPost('https://dev2.viewar.com/appstorage/uploadfiles', fields);

            case 7:
              cloudScreenshotUrl = cloudStorage.createUrl('downloadfile') + '/file:' + id;

            case 8:

              projectManager.projects.cloud[id] = project;
              _context4.next = 11;
              return projectManager.updateCloudProjectIndex();

            case 11:
              _context4.next = 13;
              return cloudStorage.write('/public/Projects/' + id + '.json', JSON.stringify({ id: id, name: name, info: info, timestamp: timestamp, data: data, localScreenshotUrl: localScreenshotUrl, cloudScreenshotUrl: cloudScreenshotUrl }));

            case 13:
              return _context4.abrupt('return', true);

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function storeToCloud() {
      return _ref4.apply(this, arguments);
    };
  }();

  /**
   * Removes project from cloud storage
   * @method
   * @returns {Promise} resolved when done.
   * @memberof Project#
   */


  var removeFromCloud = function () {
    var _ref5 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!storedToCloud) {
                _context5.next = 7;
                break;
              }

              storedToCloud = false;
              _context5.next = 4;
              return projectManager.updateCloudProjectIndex();

            case 4:
              _context5.next = 6;
              return cloudStorage.remove('/public/Projects/' + id + '.json');

            case 6:
              return _context5.abrupt('return', true);

            case 7:
              return _context5.abrupt('return', false);

            case 8:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function removeFromCloud() {
      return _ref5.apply(this, arguments);
    };
  }();

  /**
   * Creates a copy of this project and all data stored within. The copy is not automatically stored anywhere.
   * @returns {Project}
   * @memberof Project#
   */


  //======================================================================================================================
  // PRIVATE FUNCTIONS
  //======================================================================================================================

  /**
   * @private
   */
  var fetchData = function () {
    var _ref6 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var provider;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              provider = null;

              if (!storedLocally) {
                _context6.next = 8;
                break;
              }

              provider = localStorage;
              _context6.next = 5;
              return provider.read('/Projects/' + id + '.json');

            case 5:
              return _context6.abrupt('return', data = _context6.sent.data);

            case 8:
              if (!storedToCloud) {
                _context6.next = 15;
                break;
              }

              provider = cloudStorage;
              _context6.next = 12;
              return provider.read('/public/Projects/' + id + '.json');

            case 12:
              return _context6.abrupt('return', data = _context6.sent.data);

            case 15:
              return _context6.abrupt('return', data);

            case 16:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function fetchData() {
      return _ref6.apply(this, arguments);
    };
  }();

  var appUtils = specification.appUtils,
      sceneManager = specification.sceneManager,
      projectManager = specification.projectManager,
      localStorage = specification.localStorage,
      cloudStorage = specification.cloudStorage,
      roomManager = specification.roomManager;

  var _defaults = (0, _defaults3.default)(specification, defaultSpecification, { id: (0, _generateId2.default)(), timestamp: Date.now() }),
      id = _defaults.id,
      name = _defaults.name,
      info = _defaults.info,
      data = _defaults.data,
      timestamp = _defaults.timestamp,
      localScreenshotUrl = _defaults.localScreenshotUrl,
      cloudScreenshotUrl = _defaults.cloudScreenshotUrl,
      storedToCloud = _defaults.storedToCloud,
      storedLocally = _defaults.storedLocally,
      modified = _defaults.modified,
      updated = _defaults.updated,
      storageKey = _defaults.storageKey;

  var project = {
    clone: clone,
    loadState: loadState,
    removeFromCloud: removeFromCloud,
    removeLocally: removeLocally,
    saveState: saveState,
    storeLocally: storeLocally,
    storeToCloud: storeToCloud,

    setRoomDescription: setRoomDescription,
    setSceneState: setSceneState,
    setTimestamp: setTimestamp,
    setFlags: setFlags,

    get id() {
      return id;
    },

    get name() {
      return name;
    },
    set name(newName) {
      name = newName;
    },

    get info() {
      return info;
    },
    set info(newInfo) {
      info = newInfo;
    },

    get modified() {
      return modified;
    },
    get screenshotUrl() {
      return projectManager.online ? cloudScreenshotUrl : localScreenshotUrl;
    },
    get cloudScreenshotUrl() {
      return cloudScreenshotUrl;
    },
    get localScreenshotUrl() {
      return localScreenshotUrl;
    },
    get storedLocally() {
      return storedLocally;
    },
    get storedToCloud() {
      return storedToCloud;
    },
    get updated() {
      return updated;
    },
    get timestamp() {
      return timestamp;
    }
  };

  return project;

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Sets storage flags
   * @param {object} flags
   * @memberof Project#
   */
  function setFlags(flags) {
    Object.assign({ storedToCloud: storedToCloud, storedLocally: storedLocally, modified: modified }, flags);
  }function saveState() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    data = data || {};
    data.sceneState = sceneManager.getSceneState();
    data.roomDescription = roomManager.roomDescription;
    localScreenshotUrl = url;
    timestamp = Date.now();
    modified = true;
  }function clone(newSpecification) {
    return createProject(Object.assign(newSpecification, (0, _cloneDeep2.default)(specification), { id: (0, _generateId2.default)() }));
  }

  //======================================================================================================================
  // PRIVILEGED INTERFACE
  //======================================================================================================================

  function setSceneState(newSceneState) {
    data.sceneState = newSceneState;
    updated = true;
  }

  function setRoomDescription(newRoomDescription) {
    data.roomDescription = newRoomDescription;
    updated = true;
  }

  function setTimestamp(newTimestamp) {
    timestamp = newTimestamp;
    updated = true;
  }
}

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createSyncManager = createSyncManager;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _isEqual = __webpack_require__(25);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _cloneDeep = __webpack_require__(137);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _http = __webpack_require__(135);

var _http2 = _interopRequireDefault(_http);

var _logger = __webpack_require__(30);

var _logger2 = _interopRequireDefault(_logger);

var _constants = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var syncManager = createSyncManager({ config: _config2.default, Date: Date, http: _http2.default, logger: _logger2.default });
exports.default = syncManager;

/**
 * Synchronizes arbitrary state between two or more ViewAR SL instances. Instances can both send and receive arbitrary
 * payloads to/from one another. Payloads must be serializable to JSON. Uses a centralized client-server architecture.
 *
 * @namespace syncManager
 * @extends ProtectedEmitter
 */

/**
 * @private
 * @returns {syncManager}
 */

function createSyncManager(_ref) {

  /**
   * Connects to the server and starts polling for changes using the given sync id. Other ViewAR SL instances that need
   * to communicate with this one must use the same sync session id.
   *
   * Stops the running sync session before initializing the new one.
   *
   * @method
   * @param {string} syncSessionId - name of the property
   * @param {SyncParams?} params - parameters of the sync session
   * @memberOf! SyncManager#
   */
  var startLiveSync = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var syncParams, emitConnectionIssuesEvent, success;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              syncParams = _extends({ pollInterval: 33, send: true, receive: true }, (0, _cloneDeep2.default)(params));


              if (syncing) {
                stopLiveSync();
              }

              syncId = sessionId;
              syncing = true;

              logger.log('Sync connected to channel "' + syncId + '".');
              syncManager.emit('syncStarted', { id: syncId });

              syncParams.initial = true;

              emitConnectionIssuesEvent = true;

            case 8:
              if (!syncing) {
                _context.next = 15;
                break;
              }

              _context.next = 11;
              return (0, _bluebird.all)([sync(syncParams), (0, _bluebird.delay)(syncParams.pollInterval)]);

            case 11:
              success = _context.sent;

              if (success) {
                syncParams.initial = false;
                emitConnectionIssuesEvent = true;
              } else {
                logger.log('Sync connection issues on channel "' + syncId + '".');
                syncManager.emit('connectionIssues', { id: syncId });
                emitConnectionIssuesEvent = false;
              }
              _context.next = 8;
              break;

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function startLiveSync(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Stops running state synchronization. This function will prevent sending further data to the server but may not
   * prevent the executions of setters that have begun executing.
   *
   * @memberof syncManager#
   */


  var config = _ref.config,
      Date = _ref.Date,
      http = _ref.http,
      logger = _ref.logger;

  /** @private */
  var syncUrl = config.syncUrl || _constants.DEFAULT_SYNC_URL;
  var noop = function noop() {};

  var syncId = null;
  var syncing = false;
  var properties = {};

  var syncManager = (0, _componentEmitter2.default)({
    register: register,
    unregister: unregister,

    startLiveSync: startLiveSync,
    stopLiveSync: stopLiveSync,

    /**
     * Sync id of the active sync. Null if sync is currently not active.
     * @type {string|null}
     * @memberof syncManager#
     */
    get syncId() {
      return syncId;
    }
  });

  return syncManager;

  /**
   * Registers a state property for synchronization. The only mandatory thing is that the getter returns a value, either
   * plain or wrapped in a promise. Other than that, getters and setters are free to do any computation and data
   * manipulation required. Sync manager will wait for all getters to return before sending the data, and all setters to
   * return before being called again.
   *
   * To avoid unexpected behavior this method should not be called while sync is running.
   *
   * @param {string} propertyName - name of the property
   * @param {Function?} getter - function that retrieves the local value of the property. Can be either sync or async.
   * @param {Function?} setter - function that updates the local value of the property. Can be either sync or async.
   * @memberof syncManager#
   */
  function register(propertyName) {
    var getter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var setter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

    properties[propertyName] = {
      getValue: function getValue() {
        return (0, _bluebird.resolve)().then(getter);
      },
      setValue: function setValue(value) {
        return (0, _bluebird.resolve)(value).then(setter);
      },
      timestamp: 0
    };
  }

  /**
   * Unregisters a registered state property.
   * To avoid unexpected behavior this method should not be called while sync is running.
   *
   * @param {string} propertyName - name of the property
   * @memberOf! SyncManager#
   */
  function unregister(propertyName) {
    delete properties[propertyName];
  }function stopLiveSync() {
    logger.log('Sync disconnected from channel "' + syncId + '".');
    syncManager.emit('syncStopped', { id: syncId });

    syncId = null;
    syncing = false;
  }

  /** @private */
  function getValues() {
    return (0, _bluebird.all)(Object.entries(properties).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          name = _ref4[0],
          property = _ref4[1];

      return property.getValue().then(function (value) {
        return [name, value];
      });
    })).then(function (promises) {
      return promises.reduce(function (object, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            name = _ref6[0],
            value = _ref6[1];

        return Object.assign(object, _defineProperty({}, name, value));
      }, {});
    });
  }

  /** @private */
  function setValues(values) {
    return (0, _bluebird.all)(Object.entries(values).map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          name = _ref8[0],
          value = _ref8[1];

      return properties[name].setValue((0, _cloneDeep2.default)(value));
    }));
  }

  /** @private */
  function sync(_ref9) {
    var send = _ref9.send,
        receive = _ref9.receive,
        initial = _ref9.initial;

    return getValues().then(function (newValues) {
      var now = Math.round(Date.now() / 1000);
      var payload = {};

      Object.entries(newValues).forEach(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            name = _ref11[0],
            newValue = _ref11[1];

        var property = properties[name];

        var updated = !initial && (property.value === undefined || !(0, _isEqual2.default)(newValue, property.value));

        if (updated) {
          property.value = newValue;
          property.timestamp = now;
        }

        payload[name] = {
          data: send && updated ? (0, _cloneDeep2.default)(property.value, roundFloats) : undefined,
          timestamp: property.timestamp
        };
      });

      return syncing && http.post(syncUrl, {
        sync_id: syncId,
        data: JSON.stringify(payload)
      });
    }).then(JSON.parse).then(function (receivedPayload) {
      var values = {};

      if (syncing && receive) {
        Object.entries(receivedPayload).forEach(function (_ref12) {
          var _ref13 = _slicedToArray(_ref12, 2),
              name = _ref13[0],
              _ref13$ = _ref13[1],
              newValue = _ref13$.data,
              timestamp = _ref13$.timestamp;

          var property = properties[name];

          if (property.timestamp < timestamp && newValue !== undefined) {
            property.value = newValue;
            property.timestamp = timestamp;
            values[name] = newValue;
          }
        });
      }

      return setValues(values).then(function () {
        return true;
      });
    }).catch(function (error) {
      logger.error(error);
      return false;
    });
  }

  /** @private */
  function roundFloats(_, value) {
    // necessary until the backend floating point precision is fixed
    if (typeof value === 'number' && !Number.isInteger(value)) {
      return Math.round(value * 100000) / 100000;
    } else {
      return value;
    }
  }
}

/**
 * @typedef SyncParams
 * @type {object}
 * @property {number?} pollInterval - polling interval in ms. Sync manager will wait at least this long between pollings
 * @property {boolean?} send - whether this instance should send payloads or not
 * @property {boolean?} receive - whether this instance should receive payloads or not
 */

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.createScreenshotManager = createScreenshotManager;

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace screenshotManager
 */

function createScreenshotManager(_ref) {
  var coreInterface = _ref.coreInterface;

  return {
    takeScreenshot: takeScreenshot,
    saveScreenshot: saveScreenshot,
    deleteScreenshot: deleteScreenshot,
    emailScreenshot: emailScreenshot,
    shareScreenshot: shareScreenshot,
    saveScreenshotToGallery: saveScreenshotToGallery
  };

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Takes a screenshot. The screenshot isn't immediately saved.
   * @returns {Promise} Resolved when done.
   * @memberof screenshotManager#
   */
  function takeScreenshot() {
    var promise = new _bluebird2.default(function (resolve) {
      return coreInterface.once('screenshotTaken', resolve);
    });
    coreInterface.emit('takeScreenshot');
    return promise;
  }

  /**
   * Saves a taken screenshot to a sub-folder on the hard drive. Returns a path to the file.
   * @param {string} subFolder target sub-folder
   * @returns {Promise} Resolved when done.
   * @memberof screenshotManager#
   */
  function saveScreenshot(subFolder) {
    return coreInterface.call('saveScreenshotToSubfolder', subFolder);
  }

  /**
   * Opens the native email client with taken screenshot in the attachment.
   * @returns {Promise} Resolved when done.
   * @memberof screenshotManager#
   */
  function emailScreenshot() {
    coreInterface.emit('sendScreenshot');
    return (0, _bluebird.resolve)();
  }

  /**
   * Saves taken screenshot to device's native gallery.
   * @returns {Promise} Resolved when done.
   * @memberof screenshotManager#
   */
  function saveScreenshotToGallery() {
    coreInterface.emit('saveScreenshotToGallery');
    return (0, _bluebird.resolve)();
  }

  /**
   * Shares saved screenshot on chosen social media service.
   * @param {string} socialMediaService name of the social media service
   * @param {string} screenshotPath
   * @returns {Promise} Resolved when done.
   * @memberof screenshotManager#
   */
  function shareScreenshot(socialMediaService, screenshotPath) {
    return coreInterface.call('shareScreenshot', socialMediaService, screenshotPath);
  }

  /**
   * Deletes stored screenshot from sub-folder
   * @param {string} screenshotPath name of the social media service
   * @param {string} subFolder folder containing screenshot
   * @returns {Promise} Resolved when done.
   * @memberof screenshotManager#
   */
  function deleteScreenshot(screenshotPath, subFolder) {
    coreInterface.emit('deleteScreenshotInSubfolder', screenshotPath, subFolder);
    return (0, _bluebird.resolve)();
  }
}

var screenshotManager = createScreenshotManager({ coreInterface: _coreInterface2.default });
exports.default = screenshotManager;

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreezeFrame = FreezeFrame;

var _compose = __webpack_require__(2);

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FreezeFrame(_ref, freezeFrame) {
  var name = _ref.name,
      coreInterface = _ref.coreInterface;

  (0, _assign2.default)(freezeFrame, {
    name: name,
    thumbnailUrl: coreInterface.resolveUrl('Freezeframes/General/' + name + '_thumb.png'),
    imageUrl: coreInterface.resolveUrl('Freezeframes/General/' + name + '.png')
  });
}
exports.default = (0, _compose.compose)((0, _compose.injectProps)({
  coreInterface: _coreInterface2.default
}), FreezeFrame);

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCamera = undefined;

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _assign = __webpack_require__(1);

var _assign2 = _interopRequireDefault(_assign);

var _clone = __webpack_require__(11);

var _clone2 = _interopRequireDefault(_clone);

var _compose = __webpack_require__(2);

var _constants = __webpack_require__(4);

var _utils = __webpack_require__(6);

var _cameraBase = __webpack_require__(85);

var _cameraBase2 = _interopRequireDefault(_cameraBase);

var _vrCamera = __webpack_require__(140);

var _vrCamera2 = _interopRequireDefault(_vrCamera);

var _arCamera = __webpack_require__(84);

var _arCamera2 = _interopRequireDefault(_arCamera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Uses camera sensors and joystick input to provide a first-person VR experience.
 * Behaves like a first-person camera in computer games (i.e. has no roll).
 *
 * @interface PerspectiveCamera
 * @extends Camera
 */
var PerspectiveCamera = exports.PerspectiveCamera = function PerspectiveCamera(props, perspectiveCamera) {

  //======================================================================================================================

  var init = function () {
    var _ref = (0, _bluebird.method)(function () {
      available = appConfig.stageList.includes(stageName);
      if (appConfig.stageList[0] === stageName) {
        cameraController.activeCamera = _arCamera2.default;
      }
    });

    return function init() {
      return _ref.apply(this, arguments);
    };
  }();

  var activate = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!available) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return coreInterface.call('activateStage', stageName);

            case 3:
              cameraController.activeCamera = perspectiveCamera;
              _context.next = 7;
              break;

            case 6:
              throw new Error('ViewAR API: Error! perspectiveCamera is not available! Check your app configuration!');

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function activate() {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Turns off touch interaction with scene nodes. When off, touches only affect camera pose.
   * @async
   * @function PerspectiveCamera#disableSceneInteraction
   * @returns {Promise} resolved on completion.
   */


  /**
   * Sets camera pose.
   * @async
   * @function PerspectiveCamera#setPose
   * @param {CameraPose} newPose
   * @returns {Promise} resolved on completion
   */
  var setPose = function () {
    var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(newPose) {
      var sanitizedPose;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return perspectiveCamera.updatePose();

            case 2:
              sanitizedPose = _extends({ pose: pose }, (0, _utils.sanitizeCameraPose)(newPose));
              _context2.next = 5;
              return coreInterface.call('setGridCameraPose', name, sanitizedPose);

            case 5:
              Object.assign(pose, sanitizedPose);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function setPose(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  /**
   * Sets the background material to a specific material id. This can only be done once.
   * @async
   * @function PerspectiveCamera#setBackgroundMaterial
   * @param {string} materialId
   * @returns {Promise} resolved on completion
   */


  var setBackgroundMaterial = function () {
    var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(materialId) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return coreInterface.call('prepareMaterial', materialId);

            case 2:
              return _context3.abrupt('return', coreInterface.call('applyGridStageBackground', materialId));

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function setBackgroundMaterial(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  /**
   * Turns and moves the camera so that all visible scene objects are in the viewport.
   * @async
   * @function PerspectiveCamera#zoomToFit
   * @returns {Promise} resolved on completion
   */


  var appConfig = props.appConfig,
      name = props.name,
      interaction = props.interaction,
      pose = props.pose,
      stageName = props.stageName,
      cameraController = props.cameraController,
      coreInterface = props.coreInterface;

  var available = false;

  (0, _assign2.default)(perspectiveCamera, {
    init: init,
    activate: activate,

    disableSceneInteraction: disableSceneInteraction,
    enableSceneInteraction: enableSceneInteraction,

    setInteraction: setInteraction,
    setPose: setPose,
    setBackgroundMaterial: setBackgroundMaterial,

    zoomToFit: zoomToFit,
    lookAtSceneCenter: lookAtSceneCenter,

    get interaction() {
      return (0, _clone2.default)(interaction);
    },
    get pose() {
      return (0, _clone2.default)(pose);
    }
  });function disableSceneInteraction() {
    return coreInterface.call('activateCameraManipulation');
  }

  /**
   * Turns on touch interaction with scene nodes.
   * @async
   * @function PerspectiveCamera#enableSceneInteraction
   * @returns {Promise} resolved on completion.
   */
  function enableSceneInteraction() {
    return coreInterface.call('deactivateCameraManipulation');
  }

  /**
   * Sets camera interaction.
   * @async
   * @function PerspectiveCamera#setInteraction
   * @param {CameraInteraction} newInteraction
   * @returns {Promise} resolved on completion
   */
  function setInteraction(newInteraction) {
    return (0, _bluebird.resolve)().then(function () {
      Object.assign(interaction, (0, _utils.sanitizeCameraInteraction)(newInteraction));
      return coreInterface.call('setGridCameraInteraction', name, interaction);
    });
  }function zoomToFit() {
    return coreInterface.call('frameSceneContent', name).then(perspectiveCamera.updatePose);
  }

  /**
   * Turns camera towards the center of the current scene with respect to all visible scene objects.
   * @async
   * @function PerspectiveCamera#lookAtSceneCenter
   * @returns {Promise} resolved on completion
   */
  function lookAtSceneCenter() {
    return coreInterface.call('getSceneBoundingBox', false).then(function (boundingBox) {
      var minX = void 0,
          maxX = void 0,
          minY = void 0,
          maxY = void 0,
          minZ = void 0,
          maxZ = void 0;
      for (var i = 0; i <= 7; i++) {
        var corner = boundingBox[i];
        (!minX || minX > corner.x) && (minX = corner.x);
        (!maxX || maxX < corner.x) && (maxX = corner.x);
        (!minY || minY > corner.y) && (minY = corner.y);
        (!maxY || maxY < corner.y) && (maxY = corner.y);
        (!minZ || minZ > corner.z) && (minZ = corner.z);
        (!maxZ || maxZ < corner.z) && (maxZ = corner.z);
      }
      return {
        x: (maxX + minX) / 2,
        y: (maxY + minY) / 2,
        z: (maxZ + minZ) / 2
      };
    }).then(function (sceneCenter) {
      return setPose({ lookAt: sceneCenter });
    });
  }
};

/**
 * @type {PerspectiveCamera}
 */
var perspectiveCamera = (0, _compose.compose)((0, _compose.defaultProps)(function () {
  return (0, _clone2.default)(_constants.PERSPECTIVE_CAMERA_DEFAULTS);
}), _cameraBase2.default, PerspectiveCamera)();

exports.default = perspectiveCamera;

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createTrackingProviders = createTrackingProviders;

var _arkitProvider = __webpack_require__(318);

var _arkitProvider2 = _interopRequireDefault(_arkitProvider);

var _googleTangoProvider = __webpack_require__(319);

var _googleTangoProvider2 = _interopRequireDefault(_googleTangoProvider);

var _mockProvider = __webpack_require__(320);

var _mockProvider2 = _interopRequireDefault(_mockProvider);

var _structureProvider = __webpack_require__(321);

var _structureProvider2 = _interopRequireDefault(_structureProvider);

var _targetTrackingProvider = __webpack_require__(323);

var _targetTrackingProvider2 = _interopRequireDefault(_targetTrackingProvider);

var _wikitudeProvider = __webpack_require__(325);

var _wikitudeProvider2 = _interopRequireDefault(_wikitudeProvider);

var _ifCore = __webpack_require__(76);

var _ifCore2 = _interopRequireDefault(_ifCore);

var _coreInterface = __webpack_require__(3);

var _coreInterface2 = _interopRequireDefault(_coreInterface);

var _logger = __webpack_require__(30);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trackingProviderFactories = {
  'ARKit': _arkitProvider2.default,
  'GoogleTango': _googleTangoProvider2.default,
  'Structure': _structureProvider2.default,
  'VisionLib': _targetTrackingProvider2.default,
  'Vuforia': _targetTrackingProvider2.default,
  'Wikitude': _wikitudeProvider2.default
};

exports.default = function (props) {
  return createTrackingProviders(_extends({}, props, { coreInterface: _coreInterface2.default, logger: _logger2.default }));
};

function createTrackingProviders(_ref) {
  var _this = this;

  var coreInterface = _ref.coreInterface,
      logger = _ref.logger,
      trackerList = _ref.trackerList;


  var trackers = {};

  var state = {
    activeTrackerName: null,
    currentOnUpdate: null,
    currentOnCustomInfo: null
  };

  var trackerActive = function trackerActive(trackerName) {
    return trackerName === state.activeTrackerName;
  };

  trackerList.forEach(function (trackerInfo) {
    var trackerName = trackerInfo.name;
    if (trackingProviderFactories[trackerName]) {
      var isActive = function isActive() {
        return trackerActive(trackerName);
      };
      var activate = function () {
        var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var onUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
          var onCustomInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (isActive()) {
                    _context.next = 11;
                    break;
                  }

                  coreInterface.on('trackingTargetStatusChanged', onUpdate);
                  coreInterface.on('customTrackingInfo', onCustomInfo);
                  _context.next = 5;
                  return (0, _ifCore2.default)({
                    "^5.4.0": function _() {
                      return coreInterface.call('switchTracker', trackerName);
                    },
                    "*": function _() {
                      return (0, _bluebird.resolve)();
                    }
                  });

                case 5:
                  _context.next = 7;
                  return coreInterface.call('startTracking', trackerName);

                case 7:
                  Object.assign(state, {
                    activeTrackerName: trackerName,
                    currentOnUpdate: onUpdate,
                    currentOnCustomInfo: onCustomInfo
                  });
                  return _context.abrupt('return', true);

                case 11:
                  return _context.abrupt('return', false);

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function activate(_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }();
      var deactivate = function () {
        var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!isActive()) {
                    _context2.next = 9;
                    break;
                  }

                  _context2.next = 3;
                  return coreInterface.call('stopTracking', trackerName);

                case 3:
                  coreInterface.off('trackingTargetStatusChanged', state.currentOnUpdate);
                  coreInterface.off('customTrackingInfo', state.currentOnCustomInfo);
                  Object.assign(state, {
                    activeTrackerName: null,
                    currentOnUpdate: null,
                    currentOnCustomInfo: null
                  });
                  return _context2.abrupt('return', true);

                case 9:
                  return _context2.abrupt('return', false);

                case 10:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function deactivate() {
          return _ref3.apply(this, arguments);
        };
      }();
      var reset = function () {
        var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(onUpdate, onCustomInfo) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!trackers[state.activeTrackerName]) {
                    _context3.next = 3;
                    break;
                  }

                  _context3.next = 3;
                  return trackers[state.activeTrackerName].deactivate();

                case 3:
                  _context3.next = 5;
                  return activate(onUpdate, onCustomInfo);

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this);
        }));

        return function reset(_x5, _x6) {
          return _ref4.apply(this, arguments);
        };
      }();

      trackers[trackerName] = coreInterface.platform === 'Emscripten' ? (0, _mockProvider2.default)(_extends({}, trackerInfo, { activate: activate, deactivate: deactivate, reset: reset, isActive: isActive, coreInterface: coreInterface })) : trackingProviderFactories[trackerName](_extends({}, trackerInfo, { activate: activate, deactivate: deactivate, reset: reset, isActive: isActive, coreInterface: coreInterface }));
    } else {
      logger.warn('Unsupported tracking provider found in the app config: "' + trackerName + '"');
    }
  });

  return trackers;
}

/**
 * @namespace tracking
 */

/**
 * @member {VuforiaTracker} Vuforia
 * @memberof tracking#
 */

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.default = createARKitProvider;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @interface ARKitProvider
 * @emits trackingTargetStatusChanged
 */

/**
 * @private
 * @returns ARKitProvider
 */
function createARKitProvider(specification) {

  //======================================================================================================================
  // PRIVATE FUNCTIONS
  //======================================================================================================================

  var onUpdate = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(targetName, event) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tracking = event === 'found';

              if (!tracking) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return confirmGroundPosition();

            case 4:

              arKitProvider.emit('trackingTargetStatusChanged', tracking);
              arKitProvider.emit('trackingStatusChanged', { tracking: tracking, targetName: targetName });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function onUpdate(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var name = specification.name,
      _activate = specification.activate,
      _deactivate = specification.deactivate,
      _reset = specification.reset,
      isActive = specification.isActive,
      coreInterface = specification.coreInterface;


  var tracking = false;
  var groundConfirmed = false;

  var arKitProvider = (0, _componentEmitter2.default)({
    activate: function activate() {
      return _activate(onUpdate).then(resetState);
    },
    deactivate: function deactivate() {
      return _deactivate().then(resetState);
    },
    reset: function reset() {
      return _reset(onUpdate).then(resetState);
    },
    confirmGroundPosition: confirmGroundPosition,

    get active() {
      return isActive();
    },
    get tracking() {
      return tracking;
    },
    get groundConfirmed() {
      return groundConfirmed;
    }
  });

  return arKitProvider;

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Confirms ground position to start feature tracking.
   * @returns {Promise} resolved when done.
   * @memberOf! ARKitProvider#
   */
  function confirmGroundPosition() {
    return coreInterface.call('confirmGroundPosition', name).then(function () {
      return groundConfirmed = true;
    });
  }

  function resetState(success) {
    if (success) {
      groundConfirmed = false;
      tracking = false;
    }
  }
}

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.default = createGoogleTangoProvider;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGoogleTangoProvider(specification) {
  var saveAreaDefinition = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(areaDefinitionName) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return coreInterface.call('saveFeaturetrackingMap', name, '', areaDefinitionName);

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function saveAreaDefinition(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var readAreaDefinitions = function () {
    var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var areaDefinitionsJSON;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return coreInterface.call('customTrackingCommand', name, 'getADFsInfo', '');

            case 2:
              areaDefinitionsJSON = _context2.sent;
              return _context2.abrupt('return', areaDefinitions = JSON.parse(areaDefinitionsJSON || '[]'));

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function readAreaDefinitions() {
      return _ref2.apply(this, arguments);
    };
  }();

  var name = specification.name,
      _activate = specification.activate,
      _deactivate = specification.deactivate,
      _reset = specification.reset,
      isActive = specification.isActive,
      coreInterface = specification.coreInterface;


  var tracking = false;
  var groundConfirmed = false;
  var areaDefinitions = [];

  var googleTangoProvider = (0, _componentEmitter2.default)({
    activate: function activate() {
      return _activate(onUpdate).then(resetState);
    },
    deactivate: function deactivate() {
      return _deactivate().then(resetState);
    },
    reset: function reset() {
      return _reset().then(resetState);
    },
    confirmGroundPosition: confirmGroundPosition,

    resetAreaDefinition: resetAreaDefinition,
    saveAreaDefinition: saveAreaDefinition,
    loadAreaDefinition: loadAreaDefinition,
    deleteAreaDefinition: deleteAreaDefinition,
    readAreaDefinitions: readAreaDefinitions,

    get active() {
      return isActive();
    },
    get areaDefinitions() {
      return areaDefinitions;
    },
    get groundConfirmed() {
      return groundConfirmed;
    },
    get name() {
      return name;
    },
    get tracking() {
      return tracking;
    },
    get targets() {
      return [];
    }
  });

  return googleTangoProvider;

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  function resetAreaDefinition() {
    return loadAreaDefinition('');
  }

  function loadAreaDefinition(areaDefinitionName) {
    return coreInterface.call('loadFeaturetrackingMap', name, '', areaDefinitionName);
  }

  function deleteAreaDefinition(areaDefinitionName) {
    return coreInterface.call('deleteFeaturetrackingMap', name, '', areaDefinitionName);
  }

  function confirmGroundPosition() {
    return coreInterface.call('confirmGroundPosition', name).then(function () {
      return groundConfirmed = true;
    });
  }

  //======================================================================================================================
  // PRIVATE FUNCTIONS
  //======================================================================================================================

  function onUpdate(targetName, event) {
    tracking = event === 'found';
    googleTangoProvider.emit('trackingTargetStatusChanged', tracking);
  }

  function resetState(success) {
    if (success) {
      groundConfirmed = false;
      tracking = false;
    }
  }
}

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.default = createMockProvider;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMockProvider() {

  return (0, _componentEmitter2.default)({
    activate: function activate() {
      return (0, _bluebird.resolve)();
    },
    deactivate: function deactivate() {
      return (0, _bluebird.resolve)();
    },
    reset: function reset() {
      return (0, _bluebird.resolve)();
    },
    confirmGroundPosition: function confirmGroundPosition() {
      return (0, _bluebird.resolve)();
    },
    setFloorOffset: function setFloorOffset() {
      return (0, _bluebird.resolve)();
    },
    startMeshScan: function startMeshScan() {
      return (0, _bluebird.resolve)();
    },
    stopMeshScan: function stopMeshScan() {
      return (0, _bluebird.resolve)();
    },
    resetMeshScan: function resetMeshScan() {
      return (0, _bluebird.resolve)();
    },
    setScanVolume: function setScanVolume() {
      return (0, _bluebird.resolve)();
    },
    getMeshList: function getMeshList() {
      return (0, _bluebird.resolve)([]);
    },
    getFloorOffset: function getFloorOffset() {
      return (0, _bluebird.resolve)();
    },
    getStatus: function getStatus() {
      return (0, _bluebird.resolve)({});
    },
    getTrackingQuality: function getTrackingQuality() {
      return (0, _bluebird.resolve)(0);
    },

    active: false,
    groundConfirmed: false,
    name: 'Mock',
    tracking: false,
    targets: [],
    floorOffset: 0,
    supportsSlam: false,
    meshScanning: false,
    quality: 0,
    scanVolume: {},
    sensorStatus: {}
  });
}

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.default = createStructureProvider;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _mesh = __webpack_require__(322);

var _mesh2 = _interopRequireDefault(_mesh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @interface StructureProvider
 * @emits trackingStatusChanged
 */

/**
 * @private
 * @returns StructureProvider
 */
function createStructureProvider(specification) {
  var name = specification.name,
      _activate = specification.activate,
      _deactivate = specification.deactivate,
      _reset = specification.reset,
      isActive = specification.isActive,
      coreInterface = specification.coreInterface;


  var tracking = false;
  var groundConfirmed = false;

  var scanningMesh = false;
  var scanInfo = {};
  var sensorStatus = {
    connected: false,
    batteryLow: false,
    movingTooFast: false
  };

  var structureProvider = (0, _componentEmitter2.default)({
    activate: function activate() {
      return _activate(onUpdate, onCustomInfo).then(resetState);
    },
    deactivate: function deactivate() {
      return _deactivate().then(resetState);
    },
    reset: function reset() {
      return _reset().then(resetState);
    },
    confirmGroundPosition: confirmGroundPosition,

    /**
     * activation status
     * @type {boolean}
     * @memberOf! StructureProvider#
     */
    get active() {
      return isActive();
    },
    /**
     * tracking status
     * @type {boolean}
     * @memberOf! StructureProvider#
     */
    get tracking() {
      return tracking;
    },
    /**
     * ground origin status
     * @type {boolean}
     * @memberOf! StructureProvider#
     */
    get groundConfirmed() {
      return groundConfirmed;
    },

    //===== MESH SCANNING =====

    resetMeshScan: resetMeshScan,
    startMeshScan: startMeshScan,
    stopMeshScan: stopMeshScan,
    getMeshList: getMeshList,
    fillMeshHoles: fillMeshHoles,
    colorizeMesh: colorizeMesh,

    /**
     * mesh scan status
     * @type {boolean}
     * @memberOf! StructureProvider#
     */
    get scanning() {
      return scanningMesh;
    },

    //===== CUSTOM MEMBERS =====

    setScanVolume: setScanVolume,
    getStatus: getStatus,
    getTrackingQuality: getTrackingQuality,
    get scanVolume() {
      return scanInfo;
    },
    get sensorStatus() {
      return sensorStatus;
    }
  });

  return structureProvider;

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Starts mesh scan.
   * @returns {Promise} resolved when done.
   * @memberOf! StructureProvider#
   */
  function startMeshScan() {
    scanningMesh = true;
    return coreInterface.call('startMeshScan');
  }

  /**
   * Stops mesh scan.
   * @returns {Promise} resolved when done.
   * @memberOf! StructureProvider#
   */
  function stopMeshScan() {
    scanningMesh = false;
    return coreInterface.call('stopMeshScan');
  }

  /**
   * Resets mesh scan. Previously scanned mesh is lost.
   * @returns {Promise} resolved when done.
   * @memberOf! StructureProvider#
   */
  function resetMeshScan() {
    scanningMesh = false;
    return coreInterface.call('resetMeshScan');
  }

  /**
   * Confirms ground position to start feature tracking.
   * @returns {Promise} resolved when done.
   * @memberOf! StructureProvider#
   */
  function confirmGroundPosition() {
    return coreInterface.call('confirmGroundPosition', name).then(function () {
      return groundConfirmed = true;
    });
  }

  /**
   *
   * @returns {Promise} resolved when done.
   * @memberOf! StructureProvider#
   */
  function colorizeMesh() {
    return coreInterface.call('colorizeMesh');
  }

  /**
   * Fills any holes in the scanned mesh, creating a closed body.
   * @returns {Promise} resolved when done.
   * @memberOf! StructureProvider#
   */
  function fillMeshHoles() {
    return coreInterface.call('fillMeshHoles');
  }

  /**
   * Retrieves the list of stored meshes.
   * @returns {Promise.<Array<Mesh>>} resolved when done.
   * @memberOf! StructureProvider#
   */
  function getMeshList() {
    return coreInterface.call('getMeshList').map(function (meshInfo) {
      return (0, _mesh2.default)(Object.assign({}, meshInfo, { coreInterface: coreInterface }));
    });
  }

  /**
   * TODO
   * @param newScanInfo
   * @param resetTracking
   * @returns {Promise.<TResult>}
   */
  function setScanVolume(newScanInfo, resetTracking) {
    return (0, _bluebird.resolve)().then(function () {
      return coreInterface.call('customTrackingCommand', name, 'setInitialVolumeSize', JSON.stringify(newScanInfo.size));
    }).then(function () {
      return coreInterface.call('customTrackingCommand', name, 'setInitialVolumeResolution', JSON.stringify(newScanInfo.resolution));
    }).then(function () {
      return coreInterface.call('customTrackingCommand', name, 'setInitialVolumeOffset', JSON.stringify(newScanInfo.offset));
    }).then(function () {
      return resetTracking && _reset();
    }).then(function () {
      return Object.assign(scanInfo, newScanInfo);
    });
  }

  /**
   * Retrieves current tracker status
   * @returns Promise.<Object> resolves with status info object
   * @memberOf! StructureProvider#
   */
  function getStatus() {
    return coreInterface.call('customTrackingCommand', name, 'getStatus', '');
  }

  /**
   * Retrieves current quality of tracking. Quality declines in environments with a lot of sunlight.
   * @returns Promise.<string> resolves with string describing quality
   * @memberOf! StructureProvider#
   */
  function getTrackingQuality() {
    return coreInterface.call('trackingFeedback');
  }

  //======================================================================================================================
  // PRIVATE FUNCTIONS
  //======================================================================================================================

  function onUpdate(targetName, event) {
    tracking = event === 'found';
    structureProvider.emit('trackingTargetStatusChanged', tracking);
  }

  function onCustomInfo(target, info) {
    if (info !== undefined) {
      switch (info.type) {
        case 'showHoldDeviceStill':
          if (info.data === true) {
            structureProvider.emit('trackingSpeedHigh', target);
            sensorStatus.movingTooFast = true;
          } else {
            structureProvider.emit('trackingSpeedNormal', target);
            sensorStatus.movingTooFast = false;
          }
          break;
        case 'showBatteryNeedsCharging':
          if (info.data === true) {
            structureProvider.emit('trackingBatteryNeedsCharging', target);
            sensorStatus.batteryLow = true;
          } else {
            structureProvider.emit('trackingBatteryNeedsNoCharging', target);
            sensorStatus.batteryLow = false;
          }
          break;
        case 'showConnectSensor':
          if (info.data === true) {
            structureProvider.emit('trackingSensorDisconnected', target);
            sensorStatus.connected = true;
          } else {
            structureProvider.emit('trackingSensorConnected', target);
            sensorStatus.connected = false;
          }
          break;
        case 'skinningProgress':
          structureProvider.emit('skinningProgressUpdate', info.data);
          break;
        case 'holeFillProgress':
          structureProvider.emit('holeFillProgressUpdate', info.data);
          break;
        case 'skinningFinished':
          structureProvider.emit('skinningFinished', target);
          break;
        case 'holeFillFinished':
          structureProvider.emit('holeFillFinished', target);
          break;
      }
    }
  }

  function resetState(success) {
    if (success) {
      scanningMesh = false;
      groundConfirmed = false;
      tracking = false;
    }
  }
}

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMesh;
/**
 * @interface Mesh
 */

/**
 * @private
 * @returns {Mesh}
 */
function createMesh(specification) {
  var coreInterface = specification.coreInterface;

  var _Object$assign = Object.assign({}, specification),
      id = _Object$assign.id,
      name = _Object$assign.name,
      collision = _Object$assign.collision,
      wireframeMode = _Object$assign.wireframeMode,
      visibility = _Object$assign.visibility,
      material = _Object$assign.material,
      numVertices = _Object$assign.numVertices;

  var mesh = {
    setMeshMaterial: setMeshMaterial,
    setMeshVisibility: setMeshVisibility,
    setMeshCollision: setMeshCollision,
    setMeshWireframeMode: setMeshWireframeMode,

    /**
     * @type {string}
     * @memberOf! Mesh#
     */
    get id() {
      return id;
    },
    /**
     * @type {string}
     * @memberOf! Mesh#
     */
    get name() {
      return name;
    },
    /**
     * @type {number}
     * @memberOf! Mesh#
     */
    get vertexCount() {
      return numVertices;
    },
    /**
     * @type {material}
     * @memberOf! Mesh#
     */
    get material() {
      return material;
    },
    /**
     * @type {boolean}
     * @memberOf! Mesh#
     */
    get visibility() {
      return visibility;
    },
    /**
     * @type {boolean}
     * @memberOf! Mesh#
     */
    get collision() {
      return collision;
    },
    /**
     * @type {string}
     * @memberOf! Mesh#
     */
    get wireframeMode() {
      return wireframeMode;
    }
  };

  return mesh;

  /**
   * Sets mesh material
   * @param {string} newMaterialName
   * @returns {Promise} resolved when done.
   * @memberOf! Mesh#
   */
  function setMeshMaterial(newMaterialName) {
    material = newMaterialName;
    return coreInterface.call('setMeshMaterial', id, material);
  }

  /**
   * Sets mesh visibility
   * @param {boolean} newVisibility
   * @returns {Promise} resolved when done.
   * @memberOf! Mesh#
   */
  function setMeshVisibility(newVisibility) {
    visibility = newVisibility;
    return coreInterface.call('setMeshVisibility', id, visibility);
  }

  /**
   * Sets mesh collision
   * @param {boolean} newCollision
   * @returns {Promise} resolved when done.
   * @memberOf! Mesh#
   */
  function setMeshCollision(newCollision) {
    collision = newCollision;
    return coreInterface.call('useMeshAsCollider', id, collision);
  }

  /**
   * Sets mesh wireframe mode
   * @param {string} newWireframeMode
   * @returns {Promise} resolved when done.
   * @memberOf! Mesh#
   */
  function setMeshWireframeMode(newWireframeMode) {
    wireframeMode = newWireframeMode;
    return coreInterface.call('useMeshWireframeMode', id, wireframeMode);
  }
}

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

var _bluebird2 = _interopRequireDefault(_bluebird);

exports.default = createVuforiaProvider;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _trackingTarget = __webpack_require__(324);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface VuforiaTracker
 * @extends ProtectedEmitter
 * @emits VuforiaTracker#trackingStatusChanged
 * @emits VuforiaTracker#trackingTargetStatusChanged
 */

/**
 * @private
 * @returns VuforiaTracker
 */
function createVuforiaProvider(specification) {
  var name = specification.name,
      _specification$target = specification.targets,
      rawTargets = _specification$target === undefined ? [] : _specification$target,
      _activate = specification.activate,
      deactivate = specification.deactivate,
      reset = specification.reset,
      isActive = specification.isActive,
      coreInterface = specification.coreInterface;


  var targets = rawTargets.map(_trackingTarget.createTrackingTarget);
  targets.push((0, _trackingTarget.createTrackingTarget)({ name: "UserTarget" }));

  var vuforiaProvider = (0, _componentEmitter2.default)({
    activate: function activate() {
      return _activate(onUpdate);
    },
    deactivate: deactivate,
    reset: reset,

    captureUserTarget: captureUserTarget,
    removeUserTarget: removeUserTarget,

    /**
     * @type {boolean}
     * @memberOf! VuforiaTracker#
     */
    get active() {
      return isActive();
    },
    /**
     * @type {boolean}
     * @memberOf! VuforiaTracker#
     */
    get tracking() {
      return targets.some(function (target) {
        return target.tracked;
      });
    },
    /**
     * @type {Array<TrackingTarget>}
     * @memberOf! VuforiaTracker#
     */
    get targets() {
      return targets;
    }
  });

  return vuforiaProvider;

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Captures a user target from the current camera input.
   * @returns {Promise} resolved when done.
   * @memberOf! VuforiaTracker#
   */
  function captureUserTarget(size) {
    return new _bluebird2.default(function (resolve) {
      coreInterface.on('customTrackingInfo', function (target, event) {
        if ((target === name || target === 'Qualcomm') && event !== undefined) {
          switch (event.status) {
            case 'userTargetCaptured':
              resolve(true);
              break;
            case 'userTargetFailed':
              resolve(false);
              break;
            case 'userTargetLowFrameQualityWarning':
              vuforiaProvider.emit('userTargetLowQuality');
              break;
          }
        }
      });
      return coreInterface.call('customTrackingCommand', name, 'captureUserTarget', JSON.stringify(size));
    });
  }

  /**
   * Removes the previously captures user target.
   * @returns {Promise} resolved when done.
   * @memberOf! VuforiaTracker#
   */
  function removeUserTarget() {
    return coreInterface.call('customTrackingCommand', name, 'removeUserTarget', '');
  }

  //======================================================================================================================
  // PRIVATE FUNCTIONS
  //======================================================================================================================

  function onUpdate(targetName, event) {
    var target = targets.find(function (target) {
      return target.name === targetName;
    });

    if (target) {
      target._setTracked(event);

      var trackedTargets = targets.filter(function (target) {
        return target.tracked;
      });
      var untrackedTargets = targets.filter(function (target) {
        return !target.tracked;
      });

      vuforiaProvider.emit('trackingTargetStatusChanged', target);
      vuforiaProvider.emit('trackingStatusChanged', { target: target, trackedTargets: trackedTargets, untrackedTargets: untrackedTargets });
    } else {
      console.warn('ViewAR API: Warning! Unrecognized tracking target: %s', targetName);
    }
  }
}

/**
 * @event VuforiaTracker#trackingTargetStatusChanged
 * @param {TrackingTarget} target
 */

/**
 * @event VuforiaTracker#trackingStatusChanged
 * @param {object} info
 * @param {TrackingTarget} info.target
 * @param {Array<TrackingTarget>} info.trackedTargets
 * @param {Array<TrackingTarget>} info.untrackedTargets
 */

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTrackingTarget = undefined;
exports.TrackingTarget = TrackingTarget;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @interface TrackingTarget
 * @extends ProtectedEmitter
 * @emits TrackingTarget#found
 * @emits TrackingTarget#lost
 */

/**
 * @private
 * @returns {TrackingTarget}
 */
var createTrackingTarget = exports.createTrackingTarget = TrackingTarget;
exports.default = createTrackingTarget;
function TrackingTarget(specification) {
  var name = specification.name;


  return (0, _componentEmitter2.default)({
    /**
     * name of the target
     * @type {string}
     * @memberof TrackingTarget#
     */
    name: name,
    /**
     * tracking status of the target
     * @type {boolean}
     * @memberof TrackingTarget#
     */
    tracked: false,

    _setTracked: _setTracked,
    _info: specification
  });

  //======================================================================================================================
  // PRIVILEGED INTERFACE
  //======================================================================================================================

  function _setTracked(event) {
    this.tracked = event === 'found';
    this.emit(event);
  }
}

/**
 * fires when the particular target is recognized by the tracker
 * @event TrackingTarget#found
 */

/**
 * fires when the particular target is no longer recognized by the tracker
 * @event TrackingTarget#lost
 */

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = __webpack_require__(0);

exports.default = createWikitudeProvider;

var _componentEmitter = __webpack_require__(8);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @interface WikitudeProvider
 * @emits trackingTargetStatusChanged
 */

/**
 * @private
 * @returns WikitudeProvider
 */
function createWikitudeProvider(specification) {

  /**
   * Retrieves the current floor offset.
   * @returns {Promise.<number>} resolved when done.
   * @memberOf! WikitudeProvider#
   */
  var getFloorOffset = function () {
    var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return coreInterface.call('customTrackingCommand', name, 'getFloorOffset', '{}');

            case 2:
              floorOffset = _context.sent;
              return _context.abrupt('return', floorOffset);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getFloorOffset() {
      return _ref.apply(this, arguments);
    };
  }();

  //======================================================================================================================
  // PRIVATE FUNCTIONS
  //======================================================================================================================

  var name = specification.name,
      _activate = specification.activate,
      _deactivate = specification.deactivate,
      _reset = specification.reset,
      isActive = specification.isActive,
      coreInterface = specification.coreInterface;

  var groundConfirmed = false;
  var floorOffset = 1400;
  var tracking = false;

  var wikitudeProvider = (0, _componentEmitter2.default)({
    activate: function activate() {
      return _activate(handleTrackingTargetStatusChanged).then(resetState);
    },
    deactivate: function deactivate() {
      return _deactivate().then(resetState);
    },
    reset: function reset() {
      return _reset().then(resetState);
    },
    confirmGroundPosition: confirmGroundPosition,
    setFloorOffset: setFloorOffset,
    getFloorOffset: getFloorOffset,

    get active() {
      return isActive();
    },
    get tracking() {
      return tracking;
    },
    get groundConfirmed() {
      return groundConfirmed;
    },
    get floorOffset() {
      return floorOffset;
    }
  });

  return wikitudeProvider;

  //======================================================================================================================
  // PUBLIC INTERFACE
  //======================================================================================================================

  /**
   * Confirms ground position to start feature tracking.
   * @returns {Promise} resolved when done.
   * @memberOf! WikitudeProvider#
   */
  function confirmGroundPosition() {
    return coreInterface.call('confirmGroundPosition', name).then(function () {
      return groundConfirmed = true;
    });
  }

  /**
   * Sets the current floor offset. The scene will be adjusted vertically according to this offset.
   * @param {number} height
   * @returns {Promise} resolved when done.
   * @memberOf! WikitudeProvider#
   */
  function setFloorOffset(height) {
    if (typeof height === 'number') {
      floorOffset = height;
      return coreInterface.call('customTrackingCommand', name, 'setFloorOffset', JSON.stringify(height));
    } else {
      console.warn('ViewAR API: Warning! Can\'t set floor offset, given height is not a number.');
      return (0, _bluebird.resolve)();
    }
  }function handleTrackingTargetStatusChanged(targetName, event) {
    tracking = event === 'found';
    wikitudeProvider.emit('trackingTargetStatusChanged', tracking);
  }

  function resetState(success) {
    if (success) {
      groundConfirmed = false;
      tracking = false;
    }
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=viewar-api.js.map