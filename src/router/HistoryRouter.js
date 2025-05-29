import { bindEvent } from "../event.js";
import { fetchTemplate } from "../template.js";

export class HistoryRouter {
  constructor(rootEl, routes) {
    this.el = rootEl;
    this.outlet = document.getElementById("router-outlet");
    this.basePath = location.pathname.slice(
      0,
      location.pathname.lastIndexOf("/")
    );
    this.pageTitle = document.title;
    bindEvent(history.pushState);
    bindEvent(history.replaceState);
    this.init(routes);
  }

  init(routes) {
    zk.log("HistoryRouter init");
    const onChange = this.change.bind(this);

    // add pushState listener
    window.addEventListener("pushState", onChange);

    // add replaceState listener
    window.addEventListener("replaceState", onChange);

    // add popstate listener
    window.addEventListener("popstate", onChange);

    // create page mapper
    this.mapper = routes.reduce(
      (acc, curr) => ({
        ...acc,
        [(curr.path.charAt(0) === "/" ? "" : "/") + curr.path]: curr,
      }),
      {}
    );

    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      history.replaceState(null, "", redirect);
    }

    // check if the current path is empty or index for first load
    if (
      !location.pathname.split("/").pop() ||
      location.pathname.split("/").pop().includes("index")
    ) {
      history.replaceState(null, "", this.basePath + "/");
    }

    // reset history when reload
    const old = window.onload;
    window.onload = async () => {
      // await onChange();
      const linkList = this.el.querySelectorAll("a[href]");
      linkList.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          // 如果是同一個路徑，則不處理
          if (
            link.getAttribute("href") ===
            location.pathname.split(this.basePath ? this.basePath : false).pop()
          )
            return;
          history.pushState(
            null,
            "",
            this.basePath +
              (link.getAttribute("href").charAt(0) === "/" ? "" : "/") +
              link.getAttribute("href")
          );
          // await onChange();
        });
      });
      window.onload = old;
    };
  }

  async change() {
    const path = location.pathname;
    const realPath = path.split(this.basePath ? this.basePath : false).pop();
    zk.log(`history path: ${realPath}`);

    const activeLink = document.querySelector(`a[href="${realPath}"]`);
    if (activeLink) activeLink.classList.add("active");
    const linkList = this.el.querySelectorAll("a[href]");
    linkList.forEach(otherLink => {
      if (otherLink !== activeLink) {
        otherLink.classList.remove("active");
      }
    })
    try {
      const { template, script } = await fetchTemplate(
        this.basePath,
        this.mapper[realPath].template
      );
      if (template) {
        // 在切換前觸發 unmount 事件
        window.dispatchEvent(new Event("unmount"));
        this.outlet.innerHTML = template.innerHTML;
        if (script) {
          const scriptTag = document.createElement("script");
          scriptTag.type = "module";
          if (script.src) {
            scriptTag.src = script.src;
          } else if (script.innerHTML) {
            scriptTag.innerHTML = script.innerHTML;
          }
          this.outlet.appendChild(scriptTag);
        }
        if (realPath.split("/").pop()) {
          document.title = `${this.pageTitle} - ${realPath.split("/").pop()}`;
        }
      }
    } catch (error) {
      zk.warn("HistoryRouter error:", error);
      this.outlet.innerHTML = `<h1>404 Not Found</h1>`;
      document.title = "404 Not Found";
    }
  }
}
