/*
 * @Author: yanbinru 18303671156@163.com
 * @Date: 2022-12-02 22:39:43
 * @LastEditors: yanbinru 18303671156@163.com
 * @LastEditTime: 2022-12-04 17:32:45
 * @FilePath: /webpack/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import "./style/common.css"
import App from './App';
const root = document.getElementById('root');
if(root) {
  createRoot(root).render(<App/>)
}