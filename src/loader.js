// src/loader.js

/**
 * 通過建立並附加 <script> 元素到文檔的 <head>，動態導入一組 JavaScript 文件。
 * @param {string[]} jsArray - 指向要導入的 JavaScript 文件的 URL 陣列，每個 URL 應該是一個字符串。
 * @example
 * importJS([
 *   "https://example.com/script1.js",
 *   "https://example.com/script2.js"
 * ]);
 * @throws 如果某個腳本加載失敗，將在控制台記錄錯誤。
 */
export function importJS(jsArray) {
  let scriptTag;
  for (let i = 0; i < jsArray.length; i++) {
    scriptTag = document.createElement("script");
    scriptTag.async = false;
    scriptTag.type = "text/javascript";
    scriptTag.src = jsArray[i];
    scriptTag.onerror = () => {
      console.error(`Failed to load script: ${scriptTag.src}`);
    };
    document.head.appendChild(scriptTag);
  }
}

/**
 * 動態加載在 <script> 元素的 `src` 屬性含有 "ZekiCore" 的 `import` 屬性當中的額外 JavaScript 文件。
 * @description
 * 該函數定位到 `src` 包含 "ZekiCore" 的腳本標籤，獲取其 `import` 屬性的值，並將新的腳本標籤附加到文檔的 `<head>` 中以加載指定的文件。
 * 如果 `import` 屬性未包含 `.js` 擴展名，則會自動添加。在處理後，`import` 屬性將從原始腳本標籤中移除。
 * @example
 * // 假設 HTML 中存在以下腳本標籤：
 * // <script src="path/to/ZekiCore.js" import="additionalScript"></script>
 * loadZekiImports();
 * // 動態加載 "path/to/additionalScript.js"。
 * @throws 如果腳本加載失敗，將在控制台記錄錯誤。
 */
export function loadZekiImports() {
  const ZekiScript = document.querySelector('script[src*="ZekiCore"]');
  const ImportSrc = ZekiScript?.getAttribute("import")?.trim();
  if (ImportSrc) {
    const importTag = document.createElement("script");
    importTag.async = false;
    importTag.type = "text/javascript";
    importTag.src = ZekiScript.attributes.src.value.split('/').fill(ImportSrc, -1).join('/') + (ImportSrc.includes('.js') ? '' : '.js');
    importTag.onerror = () => {
      console.error(`Failed to load script: ${importTag.src}`);
    };
    document.head.appendChild(importTag);
    ZekiScript.removeAttribute("import");
  }
}
