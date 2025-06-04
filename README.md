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
├── dist/                    # 發佈與範例相關檔案
│   ├── script/              # 編譯後的輸出文件 (ZekiCore.min.js 等)
│   └── index.html           # 範例 HTML 文件（以及其他 demo 檔案）
├── src/                     # 原始碼目錄
│   ├── debug.js             # 調試工具
│   ├── event.js             # 全域事件處理
│   ├── fragment.js          # 虛擬片段/節點操作
│   ├── index.js             # 入口文件
│   ├── init.js              # 初始化腳本
│   ├── loader.js            # 動態腳本加載工具
│   ├── template.js          # 模板渲染與模板載入
│   ├── core/                # 核心功能模組
│   │   ├── collection.js    # ZekiCollection 類與集合操作
│   │   ├── core.js          # ZekiCore 主命名空間與整合
│   │   ├── element.js       # ZekiElement 類及其方法
│   │   └── version.js       # 版本資訊
│   ├── dom/                 # DOM 操作相關
│   │   ├── dom-convert.js   # DOM 元素轉換工具
│   │   ├── dom-create.js    # DOM 元素建立工具
│   │   └── dom-select.js    # DOM 元素選擇工具
│   └── router/              # 路由模組
│       ├── BaseRouter.js
│       ├── HashRouter.js
│       ├── HistoryRouter.js
│       └── map.js
├── package.json             # 專案設定
├── rollup.config.js         # 打包設定
├── .gitignore               # Git 忽略文件
└── ZekiCore.js              # 舊版(1.0.0)原型
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
<script type="text/javascript" src="script/ZekiCore.min.js"></script>
```
或者直接引用線上版本：
```html
<script type="text/javascript" src="https://zekixfly.github.io/ZekiCore/script/ZekiCore.min.js"></script>
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
* `el.routerBind(option)`：將路由綁定到當前元素，支援 hash/history 模式。
* `el.on(eventType, handler)`：為當前元素綁定事件。
* `el.off(eventType, handler)`：為當前元素移除事件。

### 事件處理
* `zk.on(eventType, handler)`：綁定事件。
* `zk.off(eventType, handler)`：移除事件。
* `zk.bindEvent(fn, customEventName)`：綁定自定義事件。

### 模板渲染
* `zk.renderTemplate(rootEl, scope)`：渲染模板字符串。
* `zk.fetchTemplate(templateHTML)`：從指定的模板路徑，通常是相對於 `template/` 目錄的路徑，非同步載入 HTML 模板內容，回傳 Promise。

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
當前版本：`2.2.7`

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