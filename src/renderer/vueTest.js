import Vue from 'vue';

// 这里最初写的是 import Test from './test'，但跑起来后，提示找不到test模块
// 推测原因如下：
// vueTest.js 嵌入到html后，相对路径就是html的，src/static/html 了
// 因此引入test模块，要以该路径为基准
// 这样写太麻烦了，需要优化
import Test from '../../src/renderer/test';

const app = new Vue(Test).$mount('#test');

app.text = "Electron Forge with Vue.js!";