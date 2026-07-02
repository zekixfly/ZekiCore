// src/router/HistoryRouter.js

import { BaseRouter } from "./BaseRouter.js";
import { bindEvent } from "../event.js";

export class HistoryRouter extends BaseRouter {
  constructor(rootEl, routes) {
    super(rootEl, routes);
    bindEvent(history.pushState);
    bindEvent(history.replaceState);
    this.realPath = () => location.pathname.split(this.basePath ? this.basePath : false).pop();
    this.pushStateMethod = () => (targetPath) => history.pushState(null, "", this.basePath + targetPath);
    this.init();
  }

  init() {
    zk.log("HistoryRouter init");

    // add popstate listener
    window.addEventListener("popstate", () => this.change());

    // add pushState listener
    window.addEventListener("pushState", () => this.change());

    // add replaceState listener
    window.addEventListener("replaceState", () => this.change());

    // add load listener
    window.addEventListener("load", () => this.bindLinks(
      this.realPath,
      this.pushStateMethod()
    ));

    // check if there is a redirect in sessionStorage, and replace the current state
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      history.replaceState(null, "", redirect);
    // check if the current path is index for first load
    } else if (location.pathname.split("/").pop().includes("index")) {
      history.replaceState(null, "", this.basePath + "/");
    } else  {
      this.change();
    }

    window.dispatchEvent(new Event("load"));
  }

  change() {
    this.render(this.realPath, this.pushStateMethod());
  }
}
