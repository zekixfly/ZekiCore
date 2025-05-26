# ZekiCore

ZekiCore 是一個輕量級的 JavaScript 庫，旨在簡化 DOM 操作、事件處理和模板渲染。它提供了類似 jQuery 的 API，同時支持現代 JavaScript 的模組化開發。

## 功能特性

- **DOM 操作與元素操作**：提供便捷的方法來選擇、操作 DOM 元素，以及對單個元素進行屬性設置、樣式修改、事件綁定、數據綁定等操作。
- **事件處理**：支持事件綁定、移除和自定義事件。
- **模板渲染**：支持基於模板字符串的數據綁定和渲染。
- **集合操作**：支持對多個 DOM 元素進行批量操作。
- **動態腳本加載**：支持動態導入 JavaScript 文件。
- **輕量級**：核心功能集中，無額外依賴。

## 文件結構
```bash
ZekiCore/ 
├── dist/ # 編譯後的輸出文件 
├── src/ # 源碼文件 
│   ├── collection.js # ZekiCollection 類，提供對多個 DOM 元素的批量操作功能
│   ├── core.js # ZekiCore 核心模組，定義主要功能和命名空間
│   ├── debug.js # 調試工具，用於輸出調試信息
│   ├── dom-convert.js # DOM 元素轉換工具，將 DOM 元素轉換為 ZekiElement
│   ├── dom-create.js # DOM 元素建立工具，用於創建新元素或文本節點
│   ├── dom-select.js # DOM 元素選擇工具，提供便捷的選擇器方法
│   ├── element.js # ZekiElement 類及其方法，封裝單個 DOM 元素的操作
│   ├── event.js # 全局事件處理，提供事件綁定和移除功能
│   ├── index.js # 入口文件，初始化 ZekiCore 並設置全局變數
│   ├── init.js # 初始化腳本，設置版權聲明和全局事件
│   ├── loader.js # 動態腳本加載工具，用於加載外部腳本
│   ├── template.js # 模板渲染工具，用於數據綁定和模板渲染
│   └── version.js # 版本信息，定義當前版本號
├── index.html # 示例 HTML 文件 
├── package.json # 項目配置文件 
├── rollup.config.js # Rollup 打包配置 
├── .gitignore # Git 忽略文件
└── ZekiCore.js # 舊版 - 直接寫在原型上未模組化的框架(1.0.0紀念版)
```


## 快速開始

### 安裝

1. 克隆此倉庫：
   ```bash
   git clone https://github.com/zekixfly/ZekiCore.git
   cd ZekiCore
2. 安裝依賴：
   `npm install` or `yarn install`
3. 編譯代碼：
   `npm run build` or `yarn build`

## 使用
在 HTML 文件中引入編譯後的腳本：
```html
<script type="text/javascript" src="dist/ZekiCore.min.js"></script>
```

## API 文檔
### DOM 操作
* `zk.one(selector)`：選擇第一個匹配的元素。
* `zk.all(selector)`：選擇所有匹配的元素。
* `zk.getId(id)`：通過 ID 選擇元素。
* `zk.getTag(tagName)`：通過標籤名稱選擇元素。
* `zk.getClass(className)`：通過類名選擇元素。
* `zk.makeTag(tagName)`：創建一個新的 DOM 元素。
* `zk.makeText(textContent)`：創建一個文本節點。

### 元素轉換
* `zk.toZekiEl(el)`：將 DOM 元素轉換為 ZekiElement。

### 元素操作
* `el.one(selector)`：選擇當前元素內的第一個匹配的子元素。
* `el.all(selector)`：選擇當前元素內的所有匹配的子元素。
* `el.getAttr(attr)`：獲取當前元素的屬性值。
* `el.setAttr(attr, value)`：設置當前元素的屬性值。
* `el.addClass(className)`：為當前元素添加類名。
* `el.delClass(className)`：為當前元素移除類名。
* `el.siblings()`：獲取當前元素的兄弟元素集合。
* `el.dataBind(data)`：將數據綁定到當前元素，並渲染模板。
* `el.on(eventType, handler)`：為當前元素綁定事件。
* `el.off(eventType, handler)`：為當前元素移除事件。

### 事件處理
* `zk.on(eventType, handler)`：綁定事件。
* `zk.off(eventType, handler)`：移除事件。
* `zk.bindEvent(fn, customEventName)`：綁定自定義事件。

### 模板渲染
* `zk.renderTemplate(template, scope)`：渲染模板字符串。

### 集合操作
* `zk.all(selector)`：返回一個類陣列 ZekiCollection，支持對多個元素進行批量操作。
  ```javascript
  const elements = zk.all('.my-class');
  elements.addClass('new-class').setAttr('data-active', 'true');
  ```

* `ZekiCollection` 支持的方法：
  - `addClass(className)`：為集合中的所有元素添加類名。
  - `delClass(className)`：為集合中的所有元素移除類名。
  - `setAttr(attr, value)`：為集合中的所有元素設置屬性。
  - `delAttr(attr, value)`：為集合中的所有元素移除屬性。
  - `addKid(child)`：為集合中的所有元素添加子節點。
  - `remove()`：移除集合中的所有元素。
  - `siblings()`：除了集合中的所有元素之外的同層兄弟元素集合。
  - `on(eventType, handler)`：為集合中的所有元素綁定事件。
  - `off(eventType, handler)`：為集合中的所有元素移除事件。

  示例：
  ```javascript
  const myHandler = () => console.log('Element clicked!');
  zk.all('article').addClass('highlight').on('click', myHandler);
  zk.all('article').delClass('highlight').off('click', myHandler);
  ```


### 動態腳本加載
* `zk.importJS(jsArray)`：動態加載一組 JavaScript 文件。
  ```javascript
  zk.importJS([
    'https://example.com/script1.js',
    'https://example.com/script2.js'
  ]);
  ```

* `zk.loadZekiImports()`：自動加載與 `ZekiCore` 相關的腳本文件。
  ```javascript
  // 假設 HTML 中有以下腳本標籤：
  // <script src="path/to/ZekiCore.js" import="additionalScript"></script>
  zk.loadZekiImports();
  // 動態加載 "path/to/additionalScript.js"。
  ```

### 調試工具
* `zk.setDebug(value)`：開啟或關閉調試模式。
* `zk.log(...args)`：輸出調試信息。

## 版本信息
當前版本：`2.2.3`

## 貢獻指南
1. Fork 此倉庫。
2. 創建新分支進行修改：
```bash
git checkout -b feature/your-feature
```
3. 提交修改並推送到遠程倉庫：
```bash
git commit -m "Add your message"
git push origin feature/your-feature
```
4. 創建 Pull Request。

## 聯繫方式
- 作者：Zeki
- 郵箱：zekixfly@hotmail.com
- 網站：[https://zekixfly.github.io/](https://zekixfly.github.io/)
- GitHub：[https://github.com/zekixfly/ZekiCore](https://github.com/zekixfly/ZekiCore)