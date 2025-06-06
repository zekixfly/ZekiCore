/**
 * 增加事件監聽器
 * @param {string} eventType - 事件類型
 * @param {function} handler - 事件處理函數
 * @param {boolean|object} options - 事件選項，默認為 false
 * @returns {ZekiCore} - 返回當前的 ZekiCore 實例
 */
export function on(eventType, handler, options = false) {
  if (typeof handler !== "function") return;
  window.addEventListener(eventType, handler, options);
  return this;
}

/** 
 * 移除事件監聽器
 * @param {string} eventType - 事件類型
 * @param {function} handler - 事件處理函數
 * @returns {ZekiCore} - 返回當前的 ZekiCore 實例
 */
export function off(eventType, handler) {
  if (typeof handler !== "function") return;
  window.removeEventListener(eventType, handler);
  return this;
}

/**
 * 綁定事件函式，並動態命名函式名稱以便於事件監聽。
 * @param {Function} fn - 要綁定的原始函式。
 * @param {string} [customEventName] - 自定義的事件名稱，若未提供則使用原函式的名稱。
 * @returns {void} 如果無法在全域物件中找到傳入的函式，則會顯示警告並返回。
 * @example
 * // 假設有一個全域函式 myFunction
 * function myFunction() {
 *   console.log("執行 myFunction");
 * }
 * 
 * // 綁定事件並指定自定義事件名稱
 * bindEvent(myFunction, "customEvent");
 * 
 * // 監聽自定義事件
 * window.addEventListener("customEvent", (event) => {
 *   console.log("觸發自定義事件 customEvent", event.arguments);
 * });
 * 
 * // 呼叫原始函式，會同時觸發自定義事件
 * myFunction();
 */
export function bindEvent(fn, customEventName) {
  // 找尋原物件、原函式及函式名稱。
  const objsArr = [window, document, history, navigator, screen, location, frames, console];
  let functionName, origObject;
  const origFunction = fn; // 儲存原函式，避免被覆蓋。

  for ( const obj of objsArr ) {
    for ( const key in obj ) {
      if(obj[key] === fn) {
        functionName = key;
        origObject = obj;
        break;
      }
    }
    if (functionName && origObject) break; //找到原物件及函式名稱後跳出迴圈。
  };

  if (!functionName || !origObject) {
    console.warn("ZekiCore.bindEvent: 無法在全域物件中找到傳入的函式");
    return;
  }

  // 動態命名function名稱，使得addEventLister可以使用該函式的name來監聽。
  // 解析：{[key]:value}為動態載入傳入的key名稱，
  // 最後的{[key]:value}[key]則為取出key的值，如obj.key可寫成obj[key]。
  origObject[functionName] = ({[functionName]:function(){
    const result = origFunction.apply(origObject, arguments); // 原函數依然可以正常執行。
    const event = new Event(
      customEventName || functionName,  //此為監聽事件的關鍵字命名，若有傳入customEventName則使用，否則使用原本的functionName名稱。
        {
            bubbles: true, // bubbles值代表可否使用冒泡機制
            cancelable: true // cancelable則是代表可否使用stopPropagation()方法
        }
    );
    event.arguments = arguments;
    window.dispatchEvent(event);

    return result; // 返回原函數的結果。
  }}[functionName]);
  // 備用方案：也可使用以下方式來動態命名function名稱。
  // Object.defineProperty(origObject[functionName], 'name', {value: functionName, writable: false});
}