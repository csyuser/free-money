import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import './icon.js';
import Qs from 'qs';

Vue.use(Vant);
Vue.use(VueAxios, axios);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false;
// Vue.prototype.prefixAddr = '/api';

//实现长按
Vue.directive('longPress', {
  bind: function (el, binding, vnode) {
    if (typeof binding.value != 'function' && vnode.context != undefined) {
      console.warn(`[longpress:] provided expression '${binding.expression}' is not a function, but has to be`);
    }
    let timeOutEvent = 0;
    const handler = (e: TouchEvent) => {
      e.preventDefault();
      binding.value(e);
    };
    const start = (e: TouchEvent) => {
      if (timeOutEvent === 0) {
        timeOutEvent = setTimeout(() => {handler(e);}, 500);
      }
    };
    const cancel = () => {
      if (timeOutEvent != 0) {clearTimeout(timeOutEvent);}
      timeOutEvent = 0;
    };
    el.addEventListener('touchstart', start);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchmove', cancel);
  },
});

//拦截器
axios.interceptors.request.use(function (config) {
  // config.baseURL = getBseUrl()
  config.baseURL = '/api'
  const token = window.localStorage.getItem('token');
  if (config.method == 'post') {
    config.data = Qs.stringify({
      ...config.data,
      token: token
    });
  } else if (config.method == 'get') {
    config.params = {
      ...config.params,
      token: token
    };
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    if (response.data.Code && response.data.Code === 2) {
      Vue.prototype.$toast.fail('超时,重新登录');
      localStorage.removeItem('token');
      router.push({name: 'Login'});
    }
    return response;
  },
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
