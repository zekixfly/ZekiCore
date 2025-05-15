// src/template.js

/**
 * 模板字串渲染器
 * @param {string} template - 包含佔位符的模板字符串，格式為 {{expression}}。
 * @param {Object} [scope={}] - 提供模板中表達式所需的變數對象。
 * @returns {string} 返回渲染後的字符串，若解析失敗則保留原佔位符。
 */
export function renderTemplate(template, scope = {}) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, expr) => {
    try {
      // 使用 Function 並展開 scope 成變數
      const args = Object.keys(scope);
      const values = Object.values(scope);
      const fn = new Function(...args, `return ${expr.trim()}`);
      return fn(...values);
    } catch (err) {
      return `{{${expr}}}`; // 回退顯示未解析內容
    }
  });
};