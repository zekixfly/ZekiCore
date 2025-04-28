// src/dom-manipulate.js
export class ZekiElement {
  constructor(el) {
    this.el = el;
  }
  /**
   * get elements by tag name.
   * @param {*} tag
   * @returns {HTMLCollection} - 對應的 DOM 元素集合
   */
  getTag(tag) {
    return this.el.getElementsByTagName(tag);
  }
  /**
   * get elements by class name.
   * @param {*} className
   * @returns {HTMLCollection} - 對應的 DOM 元素集合
   */
  getClass(className) {
    return this.el.getElementsByClassName(className);
  }
  /**
   * get attribute
   * @param {*} attr
   * @returns {string} - 對應的 DOM 元素屬性值
   */
  getAttr(attr) {
    return this.el.getAttribute(attr);
  }
  /**
   * set attribute
   * @param {*} key
   * @param {*} val
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
   * @param {*} attr
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delAttr(attr) {
    this.el.removeAttribute(attr);
    return this;
  }
  /**
   * append Child
   * @param {*} child
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  addKid(child) {
    this.el.appendChild(child);
    return this;
  }
  /**
   * batch append Child
   * @param {*} children
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  addKids(children) {
    children.forEach((child) => this.el.appendChild(child));
    return this;
  }
  /**
   * remove Child
   * @param {*} child
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delKid(child) {
    this.el.removeChild(child);
    return this;
  }
  /**
   * batch remove Child
   * @param {*} children
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delKids(children) {
    children.forEach((child) => this.el.removeChild(child));
    return this;
  }
  /**
   * add Class
   * @param {*} className
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  addClass(className) {
    this.el.classList.add(className);
    return this;
  }
  /**
   * remove Class
   * @param {*} className
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  delClass(className) {
    this.el.classList.remove(className);
    return this;
  }
  /**
   * getId('id').siblings().delClass('style').addClass('style2');
   * @returns {Array} - 返回當前元素的兄弟元素集合
   */
  siblings() {
    const siblings = [];
    let p = this.el.previousSibling;
    while (p) {
      if (p.nodeType === 1) siblings.push(p);
      p = p.previousSibling;
    }
    siblings.reverse();
    let n = this.el.nextSibling;
    while (n) {
      if (n.nodeType === 1) siblings.push(n);
      n = n.nextSibling;
    }
    return siblings;
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
   * @param {*} eventType 
   * @param {*} handler 
   * @param {*} options 
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  on(eventType, handler, options = false) {
    if (typeof handler !== "function") return;
    this.el.addEventListener(eventType, handler, options);
    return this;
  }
  /**
   *
   * @param {*} eventType 
   * @param {*} handler 
   * @returns {ZekiElement} - 返回當前的 ZekiElement 實例
   */
  off(eventType, handler) {
    if (typeof handler !== "function") return;
    this.el.removeEventListener(eventType, handler);
    return this;
  }
}
