// src/index.js
import { ZekiCore } from './core.js';

Object.freeze(ZekiCore); // 避免改動

if (typeof window !== "undefined") {
  window.ZekiCore = ZekiCore; // 全域變數名稱 window.ZekiCore
  window.zk = ZekiCore; // 簡寫風格
}