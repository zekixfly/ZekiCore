// src/collection.js

export class ZekiCollection extends Array {
  constructor(elements = []) {
    super(); // 呼叫父類別的建構子
    for (let i = 0; i < elements.length; i++) {
      this[i] = elements[i];
    }
    this.length = elements.length;
  }

  // forEach 方法
  forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
    return this; // 支援鏈式呼叫
  }

  addClass(className) {
    this.forEach((item) =>
      item.hasOwnProperty("el")
        ? item.el.classList.add(className)
        : item.classList.add(className)
    );
    return this; // 支援鏈式呼叫
  }

  delClass(className) {
    this.forEach((item) =>
      item.hasOwnProperty("el")
        ? item.el.classList.remove(className)
        : item.classList.remove(className)
    );
    return this; // 支援鏈式呼叫
  }

  //EX: document.getIds('id1','id2']).siblings().addClass('style').delClass('style')
  siblings() {
    const resultSet = new Set();

    for (let i = 0; i < this.length; i++) {
      const el = this[i].el; // 取得 DOM 元素

      // 處理前面的兄弟元素
      let prev = el.previousSibling;
      while (prev) {
        if (prev.nodeType === 1 && !this.includes(prev)) {
          resultSet.add(prev);
        }
        prev = prev.previousSibling;
      }

      // 處理後面的兄弟元素
      let next = el.nextSibling;
      while (next) {
        if (next.nodeType === 1 && !this.includes(next)) {
          resultSet.add(next);
        }
        next = next.nextSibling;
      }
    }

    // 轉回 array，依據原始 DOM 結構順序排序
    const allSiblings = Array.from(resultSet);
    allSiblings.sort((a, b) => {
      if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) {
        return 1;
      } else {
        return -1;
      }
    });

    return new ZekiCollection(allSiblings);
  }

  arrSiblings() {
    var a = [], //definede array to push this's siblings element.
      p,
      n,
      oriArrLength;

    for (var i = 0; i < this.length; i++) {
      p = this[i].el.previousSibling; //The "this" mean is Finding id、class or tagname multiple element's array.
      while (p) {
        if (this.indexOf(p) == -1) {
          //First check previous element not equal to this array's element.
          if (p.nodeType === 1) {
            if (a.length > 0) {
              if (a.indexOf(p) == -1) {
                //Second check previous element not equal to a's array elelment.
                a.push(p);
              }
            } else {
              a.push(p);
            }
          }
        }

        p = p.previousSibling; //Final, assign the p's previous node to p.
      }
    }

    a.reverse(); //Invert the order, so the order of the elements is in web's elements order.

    for (var i = 0; i < this.length; i++) {
      n = this[i].el.nextSibling;
      while (n) {
        if (this.indexOf(n) == -1) {
          if (n.nodeType === 1) {
            if (a.length > 0) {
              if (a.indexOf(n) == -1) {
                a.push(n);
              }
            } else {
              a.push(n);
            }
          }
        }

        n = n.nextSibling;
      }
    }
    return a; //Final, return in order's array.
  }

  // 支援 for...of 迭代
  [Symbol.iterator]() {
    let index = 0;
    const self = this;
    return {
      next() {
        return index < self.length
          ? { value: self[index++], done: false }
          : { done: true };
      },
    };
  }

  // 自訂 toString 標籤
  get [Symbol.toStringTag]() {
    return `ZekiCollection(${this.length})`;
  }

  // 將集合轉換為陣列
  toArray() {
    return Array.from({ length: this.length }, (_, i) => this[i]);
  }

  // on 方法：為每個元素綁定事件
  on(event, handler) {
    return this.forEach((el) => el.on(event, handler));
  }

  // 其他自訂方法可以在此擴充...
}
