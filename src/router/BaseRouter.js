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
            // 檢查路由是否存在
            const checkRoute = (route, path) => {
                if (!route) throw new Error(`Route not found: ${path}`);
            }

            // 處裡多層 redirect，並防止無限迴圈
            const visited = new Set();
            let route = this.mapper[routePath];
            checkRoute(route, routePath);

            while (route.redirect) {
                if (visited.has(routePath)) throw new Error(`Redirect loop detected: ${routePath}`);
                visited.add(routePath);
                routePath = route.redirect;
                route = this.mapper[routePath];
                checkRoute(route, routePath);
            }

            // Active link 標記
            const activeLink = document.querySelector(`a[href*="${routePath.charAt(0) === "/" ? routePath.substring(1) : routePath}"]`);
            if (activeLink) activeLink.classList.add("active");

            const linkList = this.el.querySelectorAll("a[href]");
            linkList.forEach((link) => {
                if(link !== activeLink) link.classList.remove("active");
            });

            // 載入模板
            const { template, script } = await fetchTemplate(route.template);

            // 在切換前觸發 unmount 事件
            window.dispatchEvent(new Event("unmount"));
            this.outlet.innerHTML = template.innerHTML;
            if (script) this.outlet.appendChild(script);

            // 動態設定標題
            if (routePath.split("/").pop()) document.title = `${this.pageTitle} - ${routePath.split("/").pop().replace(/^./, (c) => c.toUpperCase())}`;
        } catch (error) {
            zk.warn("[Router] Render error:", error);
            // 嘗試載入自訂 404.html
            try {
                const { template, script } = await fetchTemplate("404.html");
                this.outlet.innerHTML = template.innerHTML;
                if (script) this.outlet.appendChild(script);
            } catch (e) {
                // 若找不到 404.html 則顯示預設內容
                this.outlet.innerHTML = `<h1>404 Not Found</h1>`;
                document.title = "404 Not Found";
            }
        }
    }
}