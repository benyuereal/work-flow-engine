import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/src/styles/index.less'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化
import VueResource from 'vue-resource'
import VueJsonp from 'vue-jsonp'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Grid from 'vue-js-grid'
import vueDragAndDropList from 'vue-drag-and-drop-list';
import api from './api/index.js'
import {Message,} from 'iview';
import VueI18n from 'vue-i18n';
import usLang from 'iview/src/locale/lang/en-US';
import cnLang from 'iview/src/locale/lang/zh-CN';
import Vddl from 'vddl';
import Draggable from 'vuedraggable'

Vue.use(Draggable);
Vue.use(Vddl);
Vue.use(VueI18n);
Vue.use(api);
Vue.use(vueDragAndDropList);
Vue.use(Grid)
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueJsonp);
Vue.use(iView,{
  i18n: function(path, options) {
    let value = i18n.t(path, options);
    if (value !== null && value !== undefined) return value;

    return '';
  }});
NProgress.configure({});
Vue.config.productionTip = false;
Vue.prototype.$Message = Message

const messages = {
  'en-US': {
    message: {
      hello: 'hello my friend'
    }
  },
  'zh-CN': {
    message: {
      hello: '你好'
    }
  }
}
const mixLang = {
  'en-US': {},
  'zh-CN': {}
}
mixLang['en-US'] = Object.assign(messages['en-US'], usLang)
mixLang['zh-CN'] = Object.assign(messages['zh-CN'], cnLang)
const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: mixLang
});
const whiteList = ['/login'];
  router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (store.getters.userInfo) {
    if (to.path === '/login') {
      next();
    }else{
      store.dispatch('GenerateRoutes', "").then(() => {
        next();
      })
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login');  // 否则全部重定向到登录页
      NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});


new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
})
