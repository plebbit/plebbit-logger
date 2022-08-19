"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var debug_1 = __importDefault(require("debug"));
function Logger(namespace) {
    if (!namespace || typeof namespace !== 'string') {
        throw Error("logger namespace '".concat(namespace, "' invalid"));
    }
    var namespaces = namespace.split(':');
    // create all debug instances
    var debugLevels = {
        log: (0, debug_1.default)(namespaces[0]),
        error: (0, debug_1.default)("".concat(namespaces[0], ":error")),
        trace: (0, debug_1.default)("".concat(namespaces[0], ":trace")),
    };
    var debugNamespaceLevels = {
        log: (0, debug_1.default)(namespace),
        error: (0, debug_1.default)("".concat(namespace, ":error")),
        trace: (0, debug_1.default)("".concat(namespace, ":trace")),
    };
    // create logger instance
    // logs are logged if they match log or trace
    var log = function (formatter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (debugNamespaceLevels.log.enabled) {
            return debugNamespaceLevels.log.apply(debugNamespaceLevels, __spreadArray([formatter], args, false));
        }
        if (debugLevels.log.enabled) {
            return debugLevels.log.apply(debugLevels, __spreadArray([formatter], args, false));
        }
        if (debugNamespaceLevels.trace.enabled) {
            return debugNamespaceLevels.trace.apply(debugNamespaceLevels, __spreadArray([formatter], args, false));
        }
        debugLevels.trace.apply(debugLevels, __spreadArray([formatter], args, false));
    };
    // errors are logged if it matches any namespace
    log.error = function (formatter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (debugNamespaceLevels.error.enabled) {
            return debugNamespaceLevels.error.apply(debugNamespaceLevels, __spreadArray([formatter], args, false));
        }
        if (debugLevels.error.enabled) {
            return debugLevels.error.apply(debugLevels, __spreadArray([formatter], args, false));
        }
        if (debugNamespaceLevels.log.enabled) {
            return debugNamespaceLevels.log.apply(debugNamespaceLevels, __spreadArray([formatter], args, false));
        }
        if (debugLevels.log.enabled) {
            return debugLevels.log.apply(debugLevels, __spreadArray([formatter], args, false));
        }
        if (debugNamespaceLevels.trace.enabled) {
            return debugNamespaceLevels.trace.apply(debugNamespaceLevels, __spreadArray([formatter], args, false));
        }
        return debugLevels.trace.apply(debugLevels, __spreadArray([formatter], args, false));
    };
    // trace are only logged if they match trace
    log.trace = function (formatter) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (debugNamespaceLevels.trace.enabled) {
            return debugNamespaceLevels.trace.apply(debugNamespaceLevels, __spreadArray([formatter], args, false));
        }
        debugLevels.trace.apply(debugLevels, __spreadArray([formatter], args, false));
    };
    return log;
}
Logger.disable = function () {
    debug_1.default.disable();
};
Logger.enable = function (namespaces) {
    debug_1.default.enable(namespaces);
};
Logger.enabled = function (namespaces) {
    return debug_1.default.enabled(namespaces);
};
module.exports = Logger;
