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
    const onLinkList = this.linkList.bind(this);

    // add pushState listener
    window.addEventListener("pushState", onChange);

    // add replaceState listener
    window.addEventListener("replaceState", onChange);

    // add popstate listener
    window.addEventListener("popstate", onChange);

    // add load listener
    window.addEventListener("load", onLinkList);

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

    window.dispatchEvent(new Event("load"));
  }

  linkList() {
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
      });
    });
  }

  async change() {
    const path = location.pathname;
    const realPath = path.split(this.basePath ? this.basePath : false).pop();
    zk.log(`history path: ${realPath}`);
    
    const activeLink = document.querySelector(`a[href*="${realPath.charAt(0)  === "/" ? realPath.substring(1) : realPath}"]`);
    if (activeLink) activeLink.classList.add("active");
    const linkList = this.el.querySelectorAll("a[href]");
    linkList.forEach((otherLink) => {
      if (otherLink !== activeLink) {
        otherLink.classList.remove("active");
      }
    });
    try {
      const { template, script } = await fetchTemplate(
        this.mapper[realPath].template
      );
      if (template) {
        // 在切換前觸發 unmount 事件
        window.dispatchEvent(new Event("unmount"));
        this.outlet.innerHTML = template.innerHTML;
        if (script) {
          this.outlet.appendChild(script);
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
