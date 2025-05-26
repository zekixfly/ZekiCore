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
 * 紀錄除錯訊息
 * @param  {...any} args - 要輸出的訊息
 * @example zk.log("這是一個除錯訊息", { key: "value" });
 * @returns {void}
 */
export function log(...args) {
  if (isDebug) console.log("[ZekiCore Debug]:", ...args);
}

/**
 * 紀錄錯誤訊息
 * @param  {...any} args - 要輸出的警告訊息
 * @example zk.warn("這是一個警告訊息", new Error("警告詳情"));
 * @returns {void}
 */
export function warn(...args) {
  if (isDebug) console.warn("[ZekiCore Warning]:", ...args);
}

/**
 * 紀錄錯誤訊息
 * @param  {...any} args - 要輸出的錯誤訊息
 * @example zk.error("這是一個錯誤訊息", new Error("錯誤詳情"));
 * @returns {void}
 */
export function error(...args) {
  if (isDebug) console.error("[ZekiCore Error]:", ...args);
}