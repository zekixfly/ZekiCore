// src/debug.js
let isDebug = false;

/**
 * 
 * @param {*} value 
 */
export function setDebug(value) {
  isDebug = value;
}

/**
 * 
 * @param  {...any} args 
 */
export function log(...args) {
  if (isDebug) console.log("[ZekiCore Log]:", ...args);
}