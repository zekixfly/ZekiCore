import { one, all, getId, getIds, getTag, getClass } from "./dom-select.js";
import { makeTag, makeText } from "./dom-create.js";
import { importJS, loadZekiImports } from "./loader.js";
import { setDebug, log } from "./debug.js";
import { addClass, delClass, siblings, length, values } from "./collection.js";

/**
 * ZekiCore 命名空間
 * @namespace ZekiCore
 */
export const ZekiCore = {};

/**
 * ZekiCore 的屬性和方法
 * @type {Object}
 */
Object.defineProperties(ZekiCore, {
  one: {
    value: one,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  all: {
    value: all,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  getId: {
    value: getId,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  getIds: {
    value: getIds,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  getTag: {
    value: getTag,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  getClass: {
    value: getClass,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  makeTag: {
    value: makeTag,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  makeText: {
    value: makeText,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  importJS: {
    value: importJS,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  loadZekiImports: {
    value: loadZekiImports,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  setDebug: {
    value: setDebug,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  log: {
    value: log,
    enumerable: false,
    writable: false,
    configurable: false,
  },
  // ...更多函式
  version: {
    value: "1.0.0",
    enumerable: false, // 不會在 for...in 被列出
    writable: false, // 無法被覆寫
    configurable: false, // 無法刪除
  },
});

/**
 * ZekiCollection 類別
 * @class ZekiCollection
 */
export class ZekiCollection extends Array {
  constructor(elements = []) {
    super(); // 呼叫父類別的建構子
    for (let i = 0; i < elements.length; i++) {
      this[i] = elements[i];
    }
  }
}

/**
 * ZekiCollection 的原型方法
 * @type {Object}
 */
Object.defineProperties(ZekiCollection.prototype, {
  addClass: {
    value: addClass,
    writable: true,
    enumerable: true,
    configurable: false,
  },
  delClass: {
    value: delClass,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  siblings: {
    value: siblings,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  length: {
    get: length,
    enumerable: true,
    configurable: false,
  },
  [Symbol.iterator]: {
    value: values,
    writable: false,
    enumerable: false,
    configurable: false,
  },
  [Symbol.toStringTag]: {
    value: "ZekiCollection",
    enumerable: false,
    writable: false,
    configurable: false,
  },
});
