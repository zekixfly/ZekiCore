// src/index.js
import { ZekiCore } from './core.js';

Object.freeze(ZekiCore); // 避免改動

if (typeof window !== "undefined") {
  window.Zeki = ZekiCore; // 全域變數名稱 window.Zeki
  window.zk = ZekiCore; // 簡寫風格
}