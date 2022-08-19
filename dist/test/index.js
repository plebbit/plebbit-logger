"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = __importDefault(require("../src/index.js"));
var log = (0, index_js_1.default)('plebbit-logger:test:something');
console.log('DEBUG=' + process.env.DEBUG);
log('this is a log');
log.error('this is an error');
log.trace('this is a trace');
