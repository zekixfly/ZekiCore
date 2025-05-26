// src/template.js

/**
 * 模板字串渲染器
 * @param {HTMLElement} rootEl - 要渲染的根元素，通常是包含模板的元素。
 * @param {Object} [scope={}] - 提供模板中表達式所需的變數物件。
 * @returns {string} 返回渲染後的字符串，若解析失敗則保留原佔位符。
 */
export function renderTemplate(rootEl, scope = {}) {
  const treeWalker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);

  const mustacheRegex = /\{\{\s*(.*?)\s*\}\}/g;

  let node;
  while ((node = treeWalker.nextNode())) {
    if (mustacheRegex.test(node.nodeValue)) {
      let isHtml = false;
      const originalText = node.nodeValue;
      const newText = originalText.replace(mustacheRegex, (_, rawExpr) => {
        let expr = rawExpr.trim();

        if (expr.includes("|")) {
          const [mainExpr, filter] = expr.split("|").map((s) => s.trim());
          expr = mainExpr;
          if (filter === "html") isHtml = true;
        }

        try {
          // 使用 Function 並展開 scope 成變數
          const args = Object.keys(scope);
          const values = Object.values(scope);
          const fn = new Function(...args, `return ${expr}`);
          return fn(...values);
        } catch (err) {
          return `{{ ${rawExpr} }}`; // 回退顯示未解析內容
        }
      });
      // 如果是 HTML 模板，則使用 innerHTML 更新
      if (isHtml) {
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
  return rootEl;
}

/**
 * 從指定路徑加載 HTML 模板，並返回解析後的模板和腳本。
 * @param {string} path - 模板的路徑，通常是相對於 `template/` 目錄的路徑。
 * @returns {Promise<{template: HTMLTemplateElement, script: HTMLScriptElement}>} 返回一個包含模板和腳本元素的 Promise。
 */
export async function fetchTemplate(path) {
  const response = await fetch(
    `template/${path.includes(".html") ? path : path + ".html"}`
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

  return { template, script };
}
