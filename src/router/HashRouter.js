// src/router/HashRouter.js

import { BaseRouter } from "./BaseRouter.js";

export class HashRouter extends BaseRouter {
  constructor(rootEl, routes) {
    super(rootEl, routes);
    this.hashPath = () => (location.hash || "#/").substring(1);
    this.hashChangeMethod = () => (targetPath) => location.hash = targetPath;
    this.init();
  }

  init() {
    zk.log("HashRouter init");

    // add hashchange listener
    window.addEventListener("hashchange", () => this.change());

    // add load listener
    window.addEventListener("load", () => this.bindLinks(
      this.hashPath,
      this.hashChangeMethod()
    ));

    // check if the current hash is empty or index for first load
    if (
      !location.hash ||
      location.href.split("/").pop().includes("index")
    ) {
      location.href = this.basePath + "/#";
      location.hash = "/";
    } else {
      this.change();
    }

    window.dispatchEvent(new Event("load"));
  }


  change() {
    this.render(this.hashPath, this.hashChangeMethod());
  }
}
