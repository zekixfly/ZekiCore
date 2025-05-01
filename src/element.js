// src/element.js
import { ZekiCollection } from "./collection.js";
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
    child.hasOwnProperty("el")
      ? this.el.appendChild(child.el)
      : this.el.appendChild(child);
    return this;
  }
  /**
   * batch append Child
   * @param {Array} children - DOM 元素或 ZekiElement 實例的陣列
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  addKids(...children) {
    children.forEach((child) => {
      child.hasOwnProperty("el")
        ? this.el.appendChild(child.el)
        : this.el.appendChild(child);
    });
    return this;
  }
  /**
   * remove Child
   * @param {*} child - DOM 元素或 ZekiElement 實例
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delKid(child) {
    child.hasOwnProperty("el")
      ? this.el.removeChild(child.el)
      : this.el.removeChild(child);
    return this;
  }
  /**
   * batch remove Child
   * @param {Array} children - DOM 元素或 ZekiElement 實例的陣列
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delKids(children) {
    children.forEach((child) => {
      child.hasOwnProperty("el")
        ? this.el.removeChild(child.el)
        : this.el.removeChild(child);
    });
    return this;
  }
  /**
   * 
   * @param {*} newNode - 新的 DOM 元素或 ZekiElement 實例
   * @param {*} referenceNode 
   * @returns 
   */
  before(newNode, referenceNode) {
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
   *
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
   *
   * @param {string} eventType - 事件類型
   * @param {function} handler - 事件處理函數
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  off(eventType, handler) {
    if (typeof handler !== "function") return;
    this.el.removeEventListener(eventType, handler);
    return this;
  }
  get html() {
    return this.el.innerHTML;
  }
  set html(html) {
    this.el.innerHTML = html;
    return this;
  }
  get text() {
    return this.el.innerText;
  }
  set text(text) {
    this.el.innerText = text;
    return this;
  }
  get value() {
    return this.el.value;
  }
  set value(value) {
    this.el.value = value;
    return this;
  }
  get id() {
    return this.el.id;
  }
  set id(id) {
    this.el.id = id;
    return this;
  }
  get className() {
    return this.el.className;
  }
  set className(className) {
    this.el.className = className;
    return this;
  }
  get disabled() {
    return this.el.disabled;
  }
  set disabled(disabled) {
    this.el.disabled = disabled;
    return this;
  }
  get kidNodes() {
    return this.el.childNodes;
  }
}
