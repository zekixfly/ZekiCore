// rollup.config.js
import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default defineConfig([
  // 開發模式
  // {
  //   input: "src/index.js",
  //   output: {
  //     file: "dist/script/ZekiCore.js",
  //     format: "iife",
  //     name: "ZekiCore", // 全域變數名稱 window.ZekiCore
  //     sourcemap: false,
  //   },
  //   plugins: [resolve(), commonjs()],
  // },
  // 生產模式
  {
    input: "src/index.js",
    output: {
      file: "dist/script/ZekiCore.min.js",
      format: "iife",
      name: "ZekiCore", // 全域變數名稱 window.ZekiCore
      sourcemap: false,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser({
        keep_classnames: true, // 保留類別名稱
        keep_fnames: true, // 保留函式名稱
      }), // 可選：壓縮 JS
    ],
  },
]);
