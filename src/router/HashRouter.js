// src/router/HashRouter.js

import { BaseRouter } from "./BaseRouter.js";

export class HashRouter extends BaseRouter {
  constructor(rootEl, routes) {
    super(rootEl, routes);
    this.init();
  }

  init() {
    zk.log("HashRouter init");

    // add hashchange listener
    window.addEventListener("hashchange", () => this.change());

    // add load listener
    window.addEventListener("load", () => this.bindLinks(
      () => location.hash.substring(1),
      (target) => location.hash = target
    ));

    // check if the current hash is empty or index for first load
    if (
      !location.hash ||
      location.href.split("/").pop().includes("index")
    ) {
      location.href = this.basePath + "/#";
      location.hash = "/";
    }   

    window.dispatchEvent(new Event("load"));
    this.change();
  }


  change() {
    const hash = location.hash || "#/";
    const path = hash.substring(1);
    this.render(path);
  }
}
