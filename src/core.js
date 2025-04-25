import { $, $$, getId, getIds, getTags,  } from "./dom.js";
import { setDebug, log } from "./debug.js";

export const ZekiCore = {};

// 使用 defineProperty 加到命名空間上（不可列舉與不可寫入）
Object.defineProperties(ZekiCore, {
  "$": {
    value: $,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  "$$": {
    value: $$,
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
  "getTags": {
    value: getTags,
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