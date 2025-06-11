import { one, all, getId, getIds, getTag, getClass } from "../dom/dom-select.js";
import { makeTag, makeText } from "../dom/dom-create.js";
import { toZekiEl } from "../dom/dom-convert.js";
import { importJS, loadZekiImports } from "../loader.js";
import { on, off, bindEvent } from "../event.js";
import { renderTemplate, fetchTemplate } from "../template.js";
import { setDebug, log, warn, error } from "../debug.js";
import {
  one as elOne,
  all as elAll,
  getTag as elGetTag,
  getClass as elGetClass,
  getStyle,
  getAttr,
  setAttr,
  setAttrs,
  delAttr,
  remove,
  addKid,
  addKids,
  delKid,
  delKids,
  before,
  addClass,
  delClass,
  hasClass,
  siblings,
  dataBind,
  routerBind,
  on as elOn,
  off as elOff,
  click,
  hide,
  show,
  getHTML,
  setHTML,
  getText,
  setText,
  getValue,
  setValue,
  getIdName,
  setIdName,
  getClassName,
  setClassName,
  getDisabled,
  setDisabled,
  getType,
  setType,
  getSRC,
  setSRC,
  getScrollTop,
  setScrollTop,
  getOnload,
  setOnload,
  getOnerror,
  setOnerror,
  kids,
  kidNodes,
  firstKid,
  lastKid,
} from "./element.js";
import {
  setAttr as collSetAttr,
  delAttr as collDelAttr,
  addClass as collAddClass,
  delClass as collDelClass,
  addKid as collAddKid,
  remove as collRemove,
  siblings as collSiblings,
  on as collOn,
  off as collOff,
  length,
  values,
} from "./collection.js";
import { version } from "./version.js";

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
    enumerable: true,
    writable: false,
    configurable: false,
  },
  all: {
    value: all,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  getId: {
    value: getId,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  getIds: {
    value: getIds,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  getTag: {
    value: getTag,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  getClass: {
    value: getClass,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  makeTag: {
    value: makeTag,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  makeText: {
    value: makeText,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  toZekiEl: {
    value: toZekiEl,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  importJS: {
    value: importJS,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  loadZekiImports: {
    value: loadZekiImports,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  on: {
    value: on,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  off: {
    value: off,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  bindEvent: {
    value: bindEvent,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  renderTemplate: {
    value: renderTemplate,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  fetchTemplate: {
    value: fetchTemplate,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  setDebug: {
    value: setDebug,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  log: {
    value: log,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  warn: {
    value: warn,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  error: {
    value: error,
    enumerable: true,
    writable: false,
    configurable: false,
  },
  // ...更多函式
  version: {
    value: version,
    enumerable: false, // 不會在 for...in 被列出
    writable: false, // 無法被覆寫
    configurable: false, // 無法刪除
  },
});

/**
 * ZekiElement 類別
 * @class ZekiElement
 */
export class ZekiElement {
  constructor(element) {
    this.el = element;
  }
}

/**
 * ZekiElement 的原型方法
 * @type {Object}
 */
Object.defineProperties(ZekiElement.prototype, {
  one: {
    value: elOne,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  all: {
    value: elAll,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  getTag: {
    value: elGetTag,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  getClass: {
    value: elGetClass,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  getStyle: {
    value: getStyle,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  getAttr: {
    value: getAttr,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  setAttr: {
    value: setAttr,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  setAttrs: {
    value: setAttrs,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  delAttr: {
    value: delAttr,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  remove: {
    value: remove,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  addKid: {
    value: addKid,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  addKids: {
    value: addKids,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  delKid: {
    value: delKid,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  delKids: {
    value: delKids,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  before: {
    value: before,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  addClass: {
    value: addClass,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  delClass: {
    value: delClass,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  hasClass: {
    value: hasClass,
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
  dataBind: {
    value: dataBind,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  routerBind: {
    value: routerBind,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  on: {
    value: elOn,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  off: {
    value: elOff,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  click: {
    value: click,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  hide: {
    value: hide,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  show: {
    value: show,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  html: {
    get: getHTML,
    set: setHTML,
    enumerable: true,
    configurable: false,
  },
  text: {
    get: getText,
    set: setText,
    enumerable: true,
    configurable: false,
  },
  value: {
    get: getValue,
    set: setValue,
    enumerable: true,
    configurable: false,
  },
  id: {
    get: getIdName,
    set: setIdName,
    enumerable: true,
    configurable: false,
  },
  className: {
    get: getClassName,
    set: setClassName,
    enumerable: true,
    configurable: false,
  },
  disabled: {
    get: getDisabled,
    set: setDisabled,
    enumerable: true,
    configurable: false,
  },
  type: {
    get: getType,
    set: setType,
    enumerable: true,
    configurable: false,
  },
  src: {
    get: getSRC,
    set: setSRC,
    enumerable: true,
    configurable: false,
  },
  scrollTop: {
    get: getScrollTop,
    set: setScrollTop,
    enumerable: true,
    configurable: false,
  },
  onload: {
    get: getOnload,
    set: setOnload,
    enumerable: true,
    configurable: false,
  },
  onerror: {
    get: getOnerror,
    set: setOnerror,
    enumerable: true,
    configurable: false,
  },
  kids: {
    get: kids,
    enumerable: true,
    configurable: false,
  },
  kidNodes: {
    get: kidNodes,
    enumerable: true,
    configurable: false,
  },
  firstKid: {
    get: firstKid,
    enumerable: true,
    configurable: false,
  },
  lastKid: {
    get: lastKid,
    enumerable: true,
    configurable: false,
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
  setAttr: {
    value: collSetAttr,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  delAttr: {
    value: collDelAttr,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  addClass: {
    value: collAddClass,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  delClass: {
    value: collDelClass,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  addKid: {
    value: collAddKid,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  remove: {
    value: collRemove,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  siblings: {
    value: collSiblings,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  on: {
    value: collOn,
    writable: false,
    enumerable: true,
    configurable: false,
  },
  off: {
    value: collOff,
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
