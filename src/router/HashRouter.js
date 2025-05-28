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

    // add hashchange listener
    window.addEventListener("hashchange", onChange);

    // create page mapper
    this.mapper = routes.reduce(
      (acc, curr) => ({ ...acc, [curr.path]: curr }),
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

    // reset hash when reload
    const old = window.onload;
    window.onload = async () => {
      const linkList = this.el.querySelectorAll("a[href]");
      linkList.forEach((link) => {
        link.addEventListener("click", async (e) => {
          e.preventDefault();
          link.classList.add("active");
          linkList.forEach(otherLink => {
            if (otherLink !== link) {
              otherLink.classList.remove("active");
            }
          })
          location.hash =
            link.getAttribute("href").charAt(0) === "/"
              ? link.getAttribute("href")
              : `/${link.getAttribute("href")}`;
        });
      });
      window.onload = old;
    };
  }

  async change() {
    const hash = location.hash;
    const path = hash ? hash.substring(1) : "/";
    zk.log(`hash path: ${path}`);

    try {
      const { template, script } = await fetchTemplate(
        this.basePath,
        this.mapper[path].template
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
