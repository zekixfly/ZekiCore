// src/debug.js
let isDebug = false;

/**
 * 設定是否開啟 debug 模式
 * @param {boolean} value
 */
export function setDebug(value) {
  isDebug = value;
}

/**
 * 設定 debug 模式
 * @param  {...any} args 
 */
export function log(...args) {
  if (isDebug) console.log("[ZekiCore Log]:", ...args);
}