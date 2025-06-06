// src/router/BaseRouter.js

import { fetchTemplate } from "../template.js";

export class BaseRouter {
    constructor(rootEl, routes) {
        this.el = rootEl;
        this.outlet = document.getElementById("router-outlet");
        this.basePath = location.pathname.slice(0, location.pathname.lastIndexOf("/"));
        this.pageTitle = document.title;
        // create page mapper
        this.mapper = routes.reduce((acc, curr) => ({
            ...acc,
            [(curr.path.charAt(0) === "/" ? "" : "/") + curr.path]: curr
        }), {});
    }

    bindLinks(pathResolver, updateURL) {
        const linkList = this.el.querySelectorAll("a[href]");
        linkList.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const href = link.getAttribute("href");
                const targetPath = href.charAt(0) === "/" ? href : `/${href}`;
                if (pathResolver() === href) return;
                updateURL(targetPath);
            });
        });
    }

    async render(path) {
        let routePath = path;
        zk.log(`[Router] render path: ${routePath}`);
        try {
            const route = this.mapper[routePath];
            if (!route) throw new Error(`Route not found: ${routePath}`);
            if (routePath === "/") routePath = Object.entries(this.mapper).find(([key, {path, template}]) => (route.template === template) && route.path !== path).at(0) || "/";

            const activeLink = document.querySelector(`a[href*="${routePath.charAt(0) === "/" ? routePath.substring(1) : routePath}"]`);
            if (activeLink) activeLink.classList.add("active");

            const linkList = this.el.querySelectorAll("a[href]");
            linkList.forEach((link) => {
                if(link !== activeLink) link.classList.remove("active");
            });

            const { template, script } = await fetchTemplate(route.template);
            // 在切換前觸發 unmount 事件
            window.dispatchEvent(new Event("unmount"));
            this.outlet.innerHTML = template.innerHTML;
            if (script) this.outlet.appendChild(script);
            if (routePath.split("/").pop()) document.title = `${this.pageTitle} - ${routePath.split("/").pop().replace(/^./, (c) => c.toUpperCase())}`;
        } catch (error) {
            zk.warn("[Router] Render error:", error);
            this.outlet.innerHTML = `<h1>404 Not Found</h1>`;
            document.title = "404 Not Found";
        }
    }
}