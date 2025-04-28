// src/loader.js
export function importJS(jsArray) {
  let scriptTag;
  for (let i = 0; i < jsArray.length; i++) {
    scriptTag = document.createElement("script");
    scriptTag.async = false;
    scriptTag.type = "text/javascript";
    scriptTag.src = jsArray[i];
    document.head.appendChild(scriptTag);
  }
}

export function loadZekiImports() {
  const scripts = document.querySelectorAll('script[src*="ZekiCore"][import]');
  for (const script of scripts) {
    const ImportSrc = script.getAttribute("import").trim();
    if (ImportSrc) {
      const importTag = document.createElement("script");
      importTag.async = false;
      importTag.type = "text/javascript";
      importTag.src = `scripts/${ImportSrc}.js`;
      importTag.onerror = () => {
        console.error(`Failed to load script: ${importTag.src}`);
      };
      document.head.appendChild(importTag);
      script.removeAttribute("import");
    }
  }
}
