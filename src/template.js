// src/template.js

/**
 * 模板字串渲染器
 * @param {HTMLElement} rootEl - 要渲染的根元素，通常是包含模板的元素。
 * @param {Object} [scope={}] - 提供模板中表達式所需的變數物件。
 * @returns {string} 返回渲染後的字符串，若解析失敗則保留原佔位符。
 */
export function renderTemplate(rootEl, scope = {}) {
  const mustacheRegex = /\{\{\s*(.*?)\s*\}\}/g;

  const evaluateExpr = (rawExpr) => {
    let expr = rawExpr.trim();

    // 支援 {{ value | html }} 過濾器
    let isHTML = false;
    if (expr.includes("|")) {
      const [mainExpr, filter] = expr.split("|").map((s) => s.trim());
      expr = mainExpr;
      if (filter === "html") isHTML = true;
    }

    try {
      // 使用 Function 並展開 scope 成變數
      const args = Object.keys(scope);
      const values = Object.values(scope);
      const fn = new Function(...args, `return ${expr}`);
      const result = fn(...values);
      return { result, isHTML };
    } catch (e) {
      return { result: `{{ ${rawExpr} }}`, isHTML: false };
    }
  };

  // 一、處理屬性模板 (attr: {{ ... }})
  const allElements = [rootEl, ...rootEl.querySelectorAll("*")];
  allElements.forEach((el) => {
    for (let attr of el.attributes) {
      if (mustacheRegex.test(attr.value)) {
        const newVal = attr.value.replace(mustacheRegex, (_, expr) => {
          const { result } = evaluateExpr(expr);
          return result;
        });
        el.setAttribute(attr.name, newVal);
      }
    }
  });

  // 二、處理文字節點 (包含 | html)
  const treeWalker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = treeWalker.nextNode())) {
    if (mustacheRegex.test(node.nodeValue)) {
      let isHTML = false;
      const originalText = node.nodeValue;
      const newText = originalText.replace(mustacheRegex, (_, rawExpr) => {
        const { result, isHTML: htmlFlag } = evaluateExpr(rawExpr);
        isHTML ||= htmlFlag; // 合併 HTML 標誌
        return result;
      });

      // 如果新文本與原文本相同，則跳過更新
      if (newText === originalText) continue;

      // 如果是 HTML，則將新文本插入到原節點前，並刪除原節點，否則直接更新節點值
      if (isHTML) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = newText;
        Array.from(tempDiv.childNodes).forEach((child) => {
          node.parentElement.insertBefore(child, node);
        });
        node.parentElement.removeChild(node);
      } else {
        node.nodeValue = newText;
      }
    }
  }
  return rootEl.outerHTML;
}

/**
 * 從指定路徑加載 HTML 模板，並返回解析後的模板和腳本。
 * @param {string} templateHTML - 模板的路徑，通常是相對於 `template/` 目錄的路徑。
 * @returns {Promise<{template: HTMLTemplateElement, script: HTMLScriptElement}>} 返回一個包含模板和腳本元素的 Promise。
 */
export async function fetchTemplate(templateHTML) {
  // 如果有 sessionStorage.basePath，則使用它作為基礎路徑，否則使用當前目錄。
  const basePath = `${
    sessionStorage.basePath ? sessionStorage.basePath : "."
  }/template`;

  const response = await fetch(
    `${basePath}/${
      templateHTML.includes(".html") ? templateHTML : templateHTML + ".html"
    }`
  );
  const templateText = await response.text();

  // Initialize the DOM parser
  const parser = new DOMParser();

  // Parse the text
  const htmlElement = parser.parseFromString(templateText, "text/html");

  let template = null,
    script = null;

  template = htmlElement.querySelector("template");

  if (template) {
    script = template.content.querySelector("script");
    if (script) script.remove();
  }

  if (!script) script = htmlElement.querySelector("script");

  if (script) {
    const scriptTag = document.createElement("script");
    scriptTag.type = "module";
    if (script.src) {
      scriptTag.src = script.src;
    } else if (script.innerHTML) {
      scriptTag.innerHTML = script.innerHTML;
    }
    script = scriptTag;
  }

  return { template, script };
}
