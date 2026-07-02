// src/router/BaseRouter.js

import { fetchTemplate } from "../template.js";

export class BaseRouter {
    constructor(rootEl, routes) {
        this.el = rootEl;
        this.outlet = document.getElementById("router-outlet");
        this.basePath = location.pathname.slice(0, location.pathname.lastIndexOf("/"));
        this.pageTitle = document.title;
        this.normalizePath = (path = "") => {
            if (!path || path === "/") return "/";
            return path.charAt(0) === "/" ? path : `/${path}`;
        };

        const flattenRoutes = (routeList, parentPath = "") => {
            return routeList.reduce((acc, route) => {
                const routePath = parentPath && route.path !== "/"
                    ? `${parentPath}${this.normalizePath(route.path)}`
                    : parentPath || this.normalizePath(route.path);

                route.rootPath = parentPath || "";
                acc[routePath] = route;

                if (route.children?.length > 0) {
                    return { ...acc, ...flattenRoutes(route.children, routePath) };
                }

                return acc;
            }, {});
        };

        this.mapper = flattenRoutes(routes);
    }

    bindLinks(routerPath, routerMethod) {
        const linkList = this.el.querySelectorAll("a[href]");
        linkList.forEach((link) => {
            if (link.dataset.routerBound === "true") return;
            link.dataset.routerBound = "true";

            link.addEventListener("click", (e) => {
                e.preventDefault();
                const href = link.getAttribute("href");
                const targetPath = this.normalizePath(href);
                
                if (routerPath() === href) return;
                routerMethod(targetPath);
            });
        });
    }

    async render(routerPath, updateMethod) {
        let currentPath = routerPath();
        zk.log(`[Router] render path: ${currentPath}`);
        try {
            // 檢查路由是否存在
            const checkRoute = (route, path) => {
                if (!route) throw new Error(`Route not found: ${path}`);
            }

            const keys = Object.keys(this.mapper);
            for(let key of keys) {
                if(!key.includes(":")) continue;
                let route = this.mapper[key];
                const paramKeys = [];
                let pattern = `^${key.replace(/:([A-Za-z_$][\w$]*)/g, (_, key) => {
                    paramKeys.push(key);
                    return "([^/]+)";
                })}$`;
                const regex = new RegExp(pattern);
                const match = currentPath.match(regex);

                if(match) {
                    route.params = {};
                    paramKeys.forEach((key, i)=> {
                        route.params[key] = match[i + 1];
                    });
                    currentPath = key;
                }
            }

            // 處裡多層 redirect，並防止無限迴圈
            const visited = new Set();
            let route = this.mapper[currentPath];
            checkRoute(route, currentPath);

            while (route.redirect) {
                if (visited.has(currentPath)) throw new Error(`Redirect loop detected: ${currentPath}`);
                visited.add(currentPath);
                currentPath = route.redirect;
                route = this.mapper[currentPath];
                checkRoute(route, currentPath);
            }

            // 載入模板
            const { template, script } = await fetchTemplate(route.template);

            // 在切換前觸發 unmount 事件
            window.dispatchEvent(new Event("unmount"));
            this.outlet.innerHTML = template.innerHTML;
            if (script) this.outlet.appendChild(script);

            // 重新抓取並綁定連結事件
            this.bindLinks(routerPath, updateMethod);

            // 處理路由參數，將 :param 替換為實際值
            if(route?.params) currentPath = Object.keys(route.params).reduce((path, key) => path.replace(`:${key}`, route.params[key]), route.rootPath + route.path);

            // Active link 標記
            const normalizedCurrentPath = this.normalizePath(currentPath);
            const linkList = this.el.querySelectorAll("a[href]");
            linkList.forEach((link) => {                
                const href = link.getAttribute("href") || "";
                const linkPath = this.normalizePath(href);
                const isActive = linkPath === "/"
                    ? normalizedCurrentPath === "/"
                    : normalizedCurrentPath === linkPath || normalizedCurrentPath.startsWith(`${linkPath}/`);
                link.classList.toggle("active", isActive);
            });

            // 動態設定標題
            if (currentPath.split("/").pop()) document.title = `${this.pageTitle} - ${currentPath.split("/").pop().replace(/^./, (c) => c.toUpperCase())}`;
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