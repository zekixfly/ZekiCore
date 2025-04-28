// src/index.js
import { ZekiCore } from './core.js';
import { initializeZekiCore } from './init.js';

Object.freeze(ZekiCore); // 避免改動
initializeZekiCore(); // 初始化 ZekiCore

if (typeof window !== "undefined") {
  window.ZekiCore = ZekiCore; // 全域變數名稱 window.ZekiCore
  window.zk = ZekiCore; // 簡寫風格
}