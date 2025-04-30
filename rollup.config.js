// rollup.config.js
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'Chatroom/dist/ZekiCore.js',
    format: 'iife',
    name: 'ZekiCore', // 全域變數名稱 window.ZekiCore
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({
      keep_classnames: true, // 保留類別名稱
      keep_fnames: true, // 保留函式名稱
    }) // 可選：壓縮 JS
  ],
});
