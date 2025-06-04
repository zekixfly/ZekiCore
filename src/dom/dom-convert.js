// src/dom-convert.js
import { ZekiElement } from '../core/core.js';

/**
  * 將 DOM 元素轉換為 ZekiElement 實例
  * @param {HTMLElement} el - 要轉換的 DOM 元素
  * @returns {ZekiElement|null} - 返回 ZekiElement 實例或 null
  * @example
  * const zekiEl = toZekiEl(document.querySelector('#myElement'));
  * console.log(zekiEl instanceof ZekiElement); // true
  */
export function toZekiEl(el) {
  if (el instanceof ZekiElement) return el; // 如果已經是 ZekiElement，則直接返回
  if (el instanceof Document) return new ZekiElement(el.documentElement); // 如果是 Document，則包裝成 ZekiElement 實例
  if (el instanceof HTMLElement) return new ZekiElement(el); // 如果是 HTMLElement，則包裝成 ZekiElement
  return null; // 否則返回 null
}