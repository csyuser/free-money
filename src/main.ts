import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import './icon.js'

Vue.use(Vant);
Vue.use(VueAxios, axios)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false
Vue.prototype.prefixAddr = '/api'

//实现长按
Vue.directive('longPress',{
  bind:function (el,binding,vnode){
    if (typeof binding.value != 'function' && vnode.context != undefined){
      console.warn(`[longpress:] provided expression '${binding.expression}' is not a function, but has to be`)
    }
    let timeOutEvent = 0
    const start = (e: TouchEvent)=>{
     if (timeOutEvent === 0) {
       timeOutEvent = setTimeout(()=>{handler(e)},500)
     }
    }
    const cancel = ()=>{
      if (timeOutEvent != 0){clearTimeout(timeOutEvent)}
      timeOutEvent = 0
    }
    const handler = (e: TouchEvent)=>{
      binding.value(e)
    }
    el.addEventListener('touchstart',start)
    el.addEventListener('touchend',cancel)
    el.addEventListener('touchmove',cancel)
  },
})

//拦截器
axios.interceptors.response.use(function (response) {
    if(response.data.Code && response.data.Code === 2){
      Vue.prototype.$toast.fail("超时,重新登录");
      localStorage.removeItem("token");
      router.push({name:'Login'});
    }
    return response;
  },
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
