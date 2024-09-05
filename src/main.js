// =========================================================
// * Vue Material Dashboard - v1.5.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2024 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

import Spinner from 'vue-simple-spinner';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import axios from 'axios';
// 配置Axios的全局默认值
axios.defaults.baseURL = window.location.protocol+"//"+window.location.host; // 设置基础URL
axios.interceptors.response.use(
  function (response) {
    // 检查是否有数据，如果没有数据返回自定义的默认值
    if (!response.data || response.data === '') {
      console.warn('响应数据为空，返回默认值');
      return { data: null }; // 返回一个默认对象，防止后续代码报错
    }
    return response;  // 正常返回数据
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios;

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

const toastOptions = {
  // 每个 toast 显示的位置
  position: 'top-right',

  // 关闭所有 toast 之前的延迟（毫秒）
  timeout: 10000,

  // 是否显示关闭按钮
  closeOnClick: true,

  // 是否暂停时间当鼠标悬浮在 toast 上
  pauseOnFocusLoss: true,

  // 是否可以用拖拽来关闭 Toast
  draggable: true,

  // 拖拽后释放的百分比后才能关闭 Toast
  draggablePercent: 0.6,

  // 同时显示的 toast 的最大数量
  maxToasts: 5,

  // 是否在新 toast 创建时删除旧的 toast
  newestOnTop: true,
  
  toastClassName: 'red-toast',
};

// 使用 Toast 插件
Vue.use(Toast, toastOptions);

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(Spinner);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  data: {
    Chartist: Chartist,
  },
});
