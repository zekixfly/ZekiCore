import { fetchTemplate } from "../template.js";

export class HashRouter {
  constructor(rootEl, routes) {
    this.el = rootEl;
    this.outlet = document.getElementById("router-outlet");
    this.basePath = location.pathname.slice(
      0,
      location.pathname.lastIndexOf("/")
    );
    this.pageTitle = document.title;
    this.init(routes);
  }

  init(routes) {
    zk.log("HashRouter init");
    const onChange = this.change.bind(this);
    const onLinkList = this.linkList.bind(this);

    // add hashchange listener
    window.addEventListener("hashchange", onChange);

    // add load listener
    window.addEventListener("load", onLinkList);

    // create page mapper
    this.mapper = routes.reduce(
      (acc, curr) => ({ 
        ...acc, 
        [(curr.path.charAt(0) === "/" ? "" : "/") + curr.path]: curr 
      }),
      {}
    );

    // check if the current hash is empty or index for first load
    if (
      !location.href.split("/").pop() ||
      location.href.split("/").pop().includes("index")
    ) {
      location.href = this.basePath + "/#";
    }

    location.hash = "/";

    window.dispatchEvent(new Event("load"));
  }

  linkList() {
    const linkList = this.el.querySelectorAll("a[href]");
    linkList.forEach((link) => {
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        location.hash =
          link.getAttribute("href").charAt(0) === "/"
            ? link.getAttribute("href")
            : `/${link.getAttribute("href")}`;
      });
    });
  }

  async change() {
    const hash = location.hash;
    const path = hash ? hash.substring(1) : "/";
    zk.log(`hash path: ${path}`);

    const activeLink = document.querySelector(`a[href*="${path.charAt(0)  === "/" ? path.substring(1) : path}"]`);
    if (activeLink) activeLink.classList.add("active");
    const linkList = this.el.querySelectorAll("a[href]");
    linkList.forEach((otherLink) => {
      if (otherLink !== activeLink) {
        otherLink.classList.remove("active");
      }
    });
    try {
      const { template, script } = await fetchTemplate(
        this.mapper[path].template
      );
      if (template) {
        // 在切換前觸發 unmount 事件
        window.dispatchEvent(new Event("unmount"));
        this.outlet.innerHTML = template.innerHTML;
        if (script) {
          this.outlet.appendChild(script);
        }
        if (path.split("/").pop()) {
          document.title = `${this.pageTitle} - ${path.split("/").pop()}`;
        }
      }
    } catch (error) {
      zk.warn("HashRouter error: ", error);
      this.outlet.innerHTML = `<h1>404 Not Found</h1>`;
      document.title = "404 Not Found";
    }
  }
}
