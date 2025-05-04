// src/element.js
import { ZekiCollection } from "./core.js";

export class ZekiElement {
  constructor(el) {
    this.el = el;
  }

  /**
   * get elements by tag name.
   * @param {string} tagName
   * @returns {ZekiCollection} - 對應的 DOM 元素集合
   */
  getTag(tagName) {
    const htmlCollection = this.el.getElementsByTagName(tagName);
    const elements = Array.from(htmlCollection, (el) => new ZekiElement(el));
    return new ZekiCollection(elements);
  }

  /**
   * get elements by class name.
   * @param {stirng} className
   * @returns {ZekiCollection} - 對應的 DOM 元素集合
   */
  getClass(className) {
    const htmlCollection = this.el.getElementsByClassName(className);
    const elements = Array.from(htmlCollection, (el) => new ZekiElement(el));
    return new ZekiCollection(elements);
  }

  /**
   * get attribute
   * @param {string} attr - DOM 元素屬性名稱
   * @returns {string} - 對應的 DOM 元素屬性值
   */
  getAttr(attr) {
    return this.el.getAttribute(attr);
  }

  /**
   * set attribute
   * @param {string} key - DOM 元素屬性名稱
   * @param {string} val - DOM 元素屬性值
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  setAttr(key, val) {
    this.el.setAttribute(key, val);
    return this;
  }

  /**
   * set attributes
   * @param {*} obj
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  setAttrs(obj) {
    Object.entries(obj).forEach(([key, val]) => this.el.setAttribute(key, val));
    return this;
  }

  /**
   * delete attribute
   * @param {string} attr - DOM 元素屬性名稱
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delAttr(attr) {
    this.el.removeAttribute(attr);
    return this;
  }

  /**
   * append Child
   * @param {*} child - DOM 元素或 ZekiElement 實例
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  addKid(child) {
    child?.el && (child = child.el);
    this.el.appendChild(child);
    return this;
  }

  /**
   * batch append Child
   * @param {Array} children - DOM 元素或 ZekiElement 實例的陣列
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  addKids(...children) {
    children.forEach((child) => {
      child?.el && (child = child.el);
      this.el.appendChild(child);
    });
    return this;
  }

  /**
   * remove Child
   * @param {*} child - DOM 元素或 ZekiElement 實例
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delKid(child) {
    child?.el && (child = child.el);
    this.el.removeChild(child);
    return this;
  }

  /**
   * batch remove Child
   * @param {Array} children - DOM 元素或 ZekiElement 實例的陣列
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delKids(children) {
    children.forEach((child) => {
      child?.el && (child = child.el);
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
  before(newNode, referenceNode) {
    newNode?.el && (newNode = newNode.el);
    referenceNode?.el && (referenceNode = referenceNode.el);
    this.el.insertBefore(newNode, referenceNode);
    return this;
  }

  /**
   * add Class
   * @param {string} className - 要添加的類名
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  addClass(className) {
    this.el.classList.add(className);
    return this;
  }

  /**
   * remove Class
   * @param {string} className - 要刪除的類名
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delClass(className) {
    this.el.classList.remove(className);
    return this;
  }

  /**
   * getId('id').siblings().delClass('style').addClass('style2');
   * @returns {ZekiCollection} - 返回當前元素的兄弟元素集合
   */
  siblings() {
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
   *
   * @param {*} param0
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  dataBind({ data = {} } = {}) {
    const nodes = this.el.querySelectorAll("*");
    nodes.forEach((node) => {
      const zText = node.getAttribute("z-text");
      const zHtml = node.getAttribute("z-html");
      if (zText && data[zText] !== undefined) {
        node.innerText = data[zText];
      }
      if (zHtml && data[zHtml] !== undefined) {
        node.innerHTML = data[zHtml];
      }
    });
    return this;
  }

  /**
   * 增加事件監聽器
   * @param {string} eventType - 事件類型
   * @param {function} handler - 事件處理函數
   * @param {boolean} options - 是否使用捕獲模式
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  on(eventType, handler, options = false) {
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
  off(eventType, handler) {
    if (typeof handler !== "function") return;
    this.el.removeEventListener(eventType, handler);
    return this;
  }

  /**
   * 獲取元素的 innerHTML
   * @returns {string} - 返回當前元素的 innerHTML
   */
  get html() {
    return this.el.innerHTML;
  }

  /**
   * 設置元素的 innerHTML
   * @param {string} html - 要設置的 HTML 內容
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  set html(html) {
    this.el.innerHTML = html;
    return this;
  }

  /**
   * 獲取元素的 innerText
   * @returns {string} - 返回當前元素的 innerText
   */
  get text() {
    return this.el.innerText;
  }

  /**
   * 設置元素的 innerText
   * @param {string} text - 要設置的文本內容
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  set text(text) {
    this.el.innerText = text;
    return this;
  }

  /**
   * 獲取元素的 value
   * @returns {string} - 返回當前元素的 value
   */
  get value() {
    return this.el.value;
  }

  /**
   * 設置元素的 value
   * @param {string} value - 要設置的值
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  set value(value) {
    this.el.value = value;
    return this;
  }

  /**
   * 獲取元素的 id
   * @returns {string} - 返回當前元素的 id
   */
  get id() {
    return this.el.id;
  }

  /**
   * 設置元素的 id
   * @param {string} id - 要設置的 id
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  set id(id) {
    this.el.id = id;
    return this;
  }

  /**
   * 獲取元素的 className
   * @returns {string} - 返回當前元素的 className
   */
  get className() {
    return this.el.className;
  }

  /**
   * 設置元素的 className
   * @param {string} className - 要設置的 className
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  set className(className) {
    this.el.className = className;
    return this;
  }

  /**
   * 獲取元素的 disabled 屬性
   * @returns {boolean} - 返回當前元素的 disabled 屬性值
   */
  get disabled() {
    return this.el.disabled;
  }

  /**
   * 設置元素的 disabled 屬性
   * @param {boolean} disabled - 是否禁用元素
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  set disabled(disabled) {
    this.el.disabled = disabled;
    return this;
  }

  /**
   * 獲取元素的 childNodes
   * @returns {NodeList} - 返回當前元素的子節點集合
   */
  get kidNodes() {
    return this.el.childNodes;
  }
  /**
   * 獲取元素的 firstChild
   * @returns {ZekiElement} - 返回當前元素的第一個子元素
   */
  get firstKid() {
    return new ZekiElement(this.el.firstChild);
  }
  /**
   * 獲取元素的 lastChild
   * @returns {ZekiElement} - 返回當前元素的最後一個子元素
   */
  get lastKid() {
    return new ZekiElement(this.el.lastChild);
  }
}
