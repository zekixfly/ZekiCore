import {  one, all, getId, getIds, getTag, getClass } from "./dom-select.js";
import {  makeTag, makeText,  } from "./dom-create.js";
import { importJS, loadZekiImports } from "./loader.js";
import { setDebug, log } from "./debug.js";

export const ZekiCore = {};

// 使用 defineProperty 加到命名空間上（不可列舉、不可寫入與不可配置）
Object.defineProperties(ZekiCore, {
  "one": {
    value: one,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "all": {
    value: all,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "getId": {
    value: getId,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "getIds": {
    value: getIds,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "getTag": {
    value: getTag,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "getClass": {
    value: getClass,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "makeTag": {
    value: makeTag,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "makeText": {
    value: makeText,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "importJS": {
    value: importJS,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "loadZekiImports": {
    value: loadZekiImports,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "setDebug": {
    value: setDebug,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "log": {
    value: log,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  // ...更多函式
  "version": {
    value: '1.0.0',
    enumerable: false, // 不會在 for...in 被列出
    writable: false, // 無法被覆寫
    configurable: false, // 無法刪除
  },
});