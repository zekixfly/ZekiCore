// src/loader.js
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
