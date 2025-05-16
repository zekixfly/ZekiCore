import { loadZekiImports } from './loader.js'
export function initializeZekiCore() {
  // 顯示版權聲明
  const crz = "Copyright Zone";
  const line = crz.padStart(crz.length + 15, "-").padEnd(crz.length + 30, "-");
  console.log(
    `%c${line}\n
    Author: Zeki
    Mail: zekixfly@hotmail.com

    版權聲明:
    一、本網站的版權屬原作者所有。
    二、盼望尊重知識產權，如要轉貼複製請註明出處來源。
    三、出處來源: https://zekixfly.github.io/
    \n${line}`,
    "font-size: small; color: brown;"
  );

  // 禁止使用者操作
  document.oncontextmenu = () => false; // disable contextmenu
  document.ondragstart = () => false; // disable drag
  document.onselectstart = () => false; // disable select

  // DOM 完成後載入 ZekiCore imports
  document.addEventListener("DOMContentLoaded", loadZekiImports); // load ZekiCore.js imports
}
