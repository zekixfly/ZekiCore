// src/template.js
// 處理模板替換
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