// src/element.js
import { ZekiElement, ZekiCollection } from "./core.js";
// import { ZekiFragment } from "./fragment.js";
import { renderTemplate } from "./template.js";
import { HashRouter } from "./router/HashRouter.js";
import { HistoryRouter } from "./router/HistoryRouter.js";

/**
 * get element by selector.
 * @param {string} selector - CSS 選擇器
 * @returns {ZekiElement} - 對應的 DOM 元素
 */
export function one(selector) {
  const el = this.el.querySelector(selector);
  return el ? new ZekiElement(el) : null;
}

/**
 * get elements by selector.
 * @param {string} selector - CSS 選擇器
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function all(selector) {
  const nodeList = this.el.querySelectorAll(selector);
  const elements = Array.from(nodeList, (el) => new ZekiElement(el));
  return new ZekiCollection(elements);
}

/**
 * get elements by tag name.
 * @param {string} tagName
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function getTag(tagName) {
  const htmlCollection = this.el.getElementsByTagName(tagName);
  const elements = Array.from(htmlCollection, (el) => new ZekiElement(el));
  return new ZekiCollection(elements);
}

/**
 * get elements by class name.
 * @param {stirng} className
 * @returns {ZekiCollection} - 對應的 DOM 元素集合
 */
export function getClass(className) {
  const htmlCollection = this.el.getElementsByClassName(className);
  const elements = Array.from(htmlCollection, (el) => new ZekiElement(el));
  return new ZekiCollection(elements);
}

/**
 * 獲取元素的計算樣式
 * @param {string} prop - CSS 屬性名稱
 * @returns {CSSStyleDeclaration} - 返回元素的計算樣式
 * @example zk.getId('id').getStyle('color'); // 獲取 id 元素的顏色
 * @example zk.getId('id').getStyle(); // 獲取 id 元素的所有計算樣式
 */
export function getStyle(prop = null) {
  return prop ? getComputedStyle(this.el)[prop] : getComputedStyle(this.el);
}

/**
 * get attribute
 * @param {string} attr - DOM 元素屬性名稱
 * @returns {string} - 對應的 DOM 元素屬性值
 */
export function getAttr(attr) {
  return this.el.getAttribute(attr);
}

/**
 * set attribute
 * @param {string} key - DOM 元素屬性名稱
 * @param {string} val - DOM 元素屬性值
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setAttr(key, val) {
  this.el.setAttribute(key, val);
  return this;
}

/**
 * set attributes
 * @param {*} obj
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setAttrs(obj) {
  Object.entries(obj).forEach(([key, val]) => this.el.setAttribute(key, val));
  return this;
}

/**
 * delete attribute
 * @param {string} attr - DOM 元素屬性名稱
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function delAttr(attr) {
  this.el.removeAttribute(attr);
  return this;
}

/**
 * remove element
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function remove() {
  this.el.remove();
  return this;
}

/**
 * append Child
 * @param {*} child - DOM 元素或 ZekiElement 實例
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function addKid(child) {
  child instanceof ZekiElement && (child = child.el);
  this.el.appendChild(child);
  return this;
}

/**
 * batch append Child
 * @param {Array} children - DOM 元素或 ZekiElement 實例的陣列
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function addKids(...children) {
  children.forEach((child) => {
    child instanceof ZekiElement && (child = child.el);
    this.el.appendChild(child);
  });
  return this;
}

/**
 * remove Child
 * @param {*} child - DOM 元素或 ZekiElement 實例
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function delKid(child) {
  child instanceof ZekiElement && (child = child.el);
  this.el.removeChild(child);
  return this;
}

/**
 * batch remove Child
 * @param {Array} children - DOM 元素或 ZekiElement 實例的陣列
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function delKids(children) {
  children.forEach((child) => {
    child instanceof ZekiElement && (child = child.el);
    this.el.removeChild(child);
  });
  return this;
}

/**
 * insert Before
 * @param {*} newNode - 新的 DOM 元素或 ZekiElement 實例
 * @param {*} referenceNode
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function before(newNode, referenceNode) {
  newNode instanceof ZekiElement && (newNode = newNode.el);
  referenceNode instanceof ZekiElement && (referenceNode = referenceNode.el);
  this.el.insertBefore(newNode, referenceNode);
  return this;
}

/**
 * add Class
 * @param {string} className - 要添加的類名
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function addClass(className) {
  this.el.classList.add(className);
  return this;
}

/**
 * remove Class
 * @param {string} className - 要刪除的類名
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function delClass(className) {
  this.el.classList.remove(className);
  return this;
}

/**
 * 獲取當前元素的兄弟元素集合
 * @returns {ZekiCollection} - 返回當前元素的兄弟元素集合
 * @example const siblings = zk.getId('id').siblings(); // 取得除了 id 自己以外的兄弟元素集合
 * @example zk.getId('id').siblings().delClass('style1').addClass('style2'); // 將取得的兄弟元素們刪除 style1 類名並添加 style2 類名
 */
export function siblings() {
  const siblings = [];
  let p = this.el.previousSibling;
  while (p) {
    if (p.nodeType === 1) siblings.push(new ZekiElement(p));
    p = p.previousSibling;
  }
  siblings.reverse();
  let n = this.el.nextSibling;
  while (n) {
    if (n.nodeType === 1) siblings.push(new ZekiElement(n));
    n = n.nextSibling;
  }
  return new ZekiCollection(siblings);
}

/**
 * 將資料綁定到指定的 DOM 元素區塊，並調用模板字串渲染器渲染模板語法。
 * @param {object} data - 要綁定的數據物件
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 * @example zk.getId('id').dataBind({ name: 'John', age: 30 }); // 將 id 元素的內容綁定到數據物件上
 */
export function dataBind(data = {}) {
  if (Array.isArray(data) || typeof data !== "object") {
    throw new Error("dataBind: data must be an object.");
  }

  // 處理 z-for 節點
  const zForList = Array.from(this.el.querySelectorAll("[z-for]")).reverse();
  if (zForList.length > 0) {
    zForList.forEach((node) => {
      const [itemKey, keyword, listKey] = node
        .getAttribute("z-for")
        .trim()
        .replace(/\s+/g, " ")
        .split(" ");
      const list = data[listKey];
      if (!Array.isArray(list)) return;

      node.removeAttribute("z-for");
      const zForCloakList = Array.from(node.querySelectorAll("[z-cloak]"));
      if (zForCloakList.length > 0)
        zForCloakList.forEach((item) => item.removeAttribute("z-cloak"));

      let renderedHTML = "";

      if (keyword === "of") {
        renderedHTML = list
          .map((item) =>
            renderTemplate(node.cloneNode(true), { [itemKey]: item })
          )
          .join("");
      } else if (keyword === "in") {
        renderedHTML = list
          .map((item, idx) =>
            renderTemplate(node.cloneNode(true), {
              [itemKey]: idx,
              [listKey]: { [idx]: list[idx] },
            })
          )
          .join("");
      }

      /**
       * 'beforebegin'：元素本身的前面。
       * 'afterbegin'：插入元素內部的第一個子節點之前。
       * 'beforeend'：插入元素內部的最後一個子節點之後。
       * 'afterend'：元素自身的後面。
       */
      node.insertAdjacentHTML("afterend", renderedHTML);
      node.remove();
    });
  }

  // 處理非 z-for 區塊的變數替換
  const zCloakList = Array.from(this.el.querySelectorAll("[z-cloak]"));
  if (zCloakList.length > 0)
    zCloakList.forEach((item) => item.removeAttribute("z-cloak"));
  renderTemplate(this.el, data);

  return this;
}

/**
 * 綁定路由到當前元素
 * @param {object} options - 路由配置選項
 * @returns {HashRouter|HistoryRouter} - 返回對應的路由實例
 * @example zk.getId('id').routerBind({ mode: 'hash', routes: [{ path: '/', template: 'home.html' }] });
 */
export function routerBind({ mode = "hash", routes = [] }) {
  if (!routes.length) console.warn("routes has not any data.");
  let router;
  switch (mode) {
    case "hash":
      router = new HashRouter(this.el, routes);
      break;
    case "history":
      router = new HistoryRouter(this.el, routes);
      break;
    default:
      break;
  }
  return router;
}

/**
 * 增加事件監聽器
 * @param {string} eventType - 事件類型
 * @param {function} handler - 事件處理函數
 * @param {boolean} options - 是否使用捕獲模式
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function on(eventType, handler, options = false) {
  if (typeof handler !== "function") return;
  this.el.addEventListener(eventType, handler, options);
  return this;
}

/**
 * 移除事件監聽器
 * @param {string} eventType - 事件類型
 * @param {function} handler - 事件處理函數
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function off(eventType, handler) {
  if (typeof handler !== "function") return;
  this.el.removeEventListener(eventType, handler);
  return this;
}

/**
 * 元素點擊事件
 * @returns {ZekiElement} - 返回當前元素的父元素
 */
export function click() {
  this.el.click();
  return this;
}

/**
 * 獲取元素的 innerHTML
 * @returns {string} - 返回當前元素的 innerHTML
 */
export function getHTML() {
  return this.el.innerHTML;
}

/**
 * 設置元素的 innerHTML
 * @param {string} html - 要設置的 HTML 內容
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setHTML(html) {
  this.el.innerHTML = html;
  return this;
}

/**
 * 獲取元素的 innerText
 * @returns {string} - 返回當前元素的 innerText
 */
export function getText() {
  return this.el.innerText;
}

/**
 * 設置元素的 innerText
 * @param {string} text - 要設置的文本內容
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setText(text) {
  this.el.innerText = text;
  return this;
}

/**
 * 獲取元素的 value
 * @returns {string} - 返回當前元素的 value
 */
export function getValue() {
  return this.el.value;
}

/**
 * 設置元素的 value
 * @param {string} value - 要設置的值
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setValue(value) {
  this.el.value = value;
  return this;
}

/**
 * 獲取元素的 id
 * @returns {string} - 返回當前元素的 id
 */
export function getIdName() {
  return this.el.id;
}

/**
 * 設置元素的 id
 * @param {string} id - 要設置的 id
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setIdName(id) {
  this.el.id = id;
  return this;
}

/**
 * 獲取元素的 className
 * @returns {string} - 返回當前元素的 className
 */
export function getClassName() {
  return this.el.className;
}

/**
 * 設置元素的 className
 * @param {string} className - 要設置的 className
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setClassName(className) {
  this.el.className = className;
  return this;
}

/**
 * 獲取元素的 disabled 屬性
 * @returns {boolean} - 返回當前元素的 disabled 屬性值
 */
export function getDisabled() {
  return this.el.disabled;
}

/**
 * 設置元素的 disabled 屬性
 * @param {boolean} disabled - 是否禁用元素
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setDisabled(disabled) {
  this.el.disabled = disabled;
  return this;
}

/**
 * 獲取元素的 type 屬性
 * @returns {string} - 返回當前元素的 type 屬性值
 */
export function getType() {
  return this.el.type;
}

/**
 * 設置元素的 type 屬性
 * @param {string} type - 要設置的 type 屬性值
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setType(type) {
  this.el.type = type;
  return this;
}

/**
 * 獲取元素的 name 屬性
 * @returns {string} - 返回當前元素的 name 屬性值
 */
export function getSRC() {
  return this.el.src;
}

/**
 * 設置元素的 src 屬性
 * @param {string} src - 要設置的 src 屬性值
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setSRC(src) {
  this.el.src = src;
  return this;
}

/**
 * 獲取元素的 scrollTop 屬性
 * @returns {number} - 返回當前元素的 scrollTop 屬性值
 */
export function getScrollTop() {
  return this.el.scrollTop;
}

/**
 * 設置元素的 scrollTop 屬性
 * @param {number} scrollTop - 要設置的 scrollTop 屬性值
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setScrollTop(scrollTop) {
  this.el.scrollTop = scrollTop;
  return this;
}

/**
 * 獲取元素的 onload 事件處理函數
 * @returns {function} - 返回當前元素的 onload 事件處理函數
 */
export function getOnload() {
  return this.el.onload;
}

/**
 * 設置元素的 onload 事件處理函數
 * @param {function} fn - 要設置的事件處理函數
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setOnload(fn) {
  this.el.onload = fn;
  return this;
}

/**
 * 獲取元素的 onerror 事件處理函數
 * @returns {function} - 返回當前元素的 onerror 事件處理函數
 */
export function getOnerror() {
  return this.el.onerror;
}

/**
 * 設置元素的 onerror 事件處理函數
 * @param {function} fn - 要設置的事件處理函數
 * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
 */
export function setOnerror(fn) {
  this.el.onerror = fn;
  return this;
}

/**
 * 獲取元素的 children
 * @returns {ZekiCollection} - 返回當前元素的子元素集合
 */
export function kids() {
  const htmlCollection = this.el.children;
  const elements = Array.from(htmlCollection, (el) => new ZekiElement(el));
  return new ZekiCollection(elements);
}

/**
 * 獲取元素的 childNodes
 * @returns {ZekiCollection} - 返回當前元素的子節點集合
 */
export function kidNodes() {
  const nodeList = this.el.childNodes;
  const elements = Array.from(nodeList)
    .filter((el) => el.nodeType === 1)
    .map((el) => new ZekiElement(el));
  return new ZekiCollection(elements);
}

/**
 * 獲取元素的 firstChild
 * @returns {ZekiElement} - 返回當前元素的第一個子元素
 */
export function firstKid() {
  return new ZekiElement(this.el.firstChild);
}

/**
 * 獲取元素的 lastChild
 * @returns {ZekiElement} - 返回當前元素的最後一個子元素
 */
export function lastKid() {
  return new ZekiElement(this.el.lastChild);
}
