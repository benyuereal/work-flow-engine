// 导入模块
import Vue from 'vue'
import axios from 'axios'
import {SERVER_BASE_URL} from './config'
import router from 'vue-router'
import util from '../utils/util'
// import router from '@/router'
import iView, {Notice} from 'iview'
// import store from '@/store'
Vue.use(iView)
// 设置用户信息action
/* const setUserInfo = function (user) {
 //store.dispatch(SET_USER_INFO, user)
 }; */
import message from 'iview'

export default function fetch(options) {
  /*
  请求拦截
  * */
  //如果是get请求 就获取到地址栏里面的tickt信息
  var get = options.method === ('get' || 'GET');
  var post = options.method === ('post' || 'POST');
  if (get) {
    options.params.ticket = util.getUrlKey('ticket');
  } else if (post) {
    options.params.ticket = util.getUrlKey('ticket');
  }
  // alert(JSON.stringify(options));
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: SERVER_BASE_URL,
      timeout: 15000,
      headers: {}
    })
    // http request 拦截器
    instance.interceptors.request.use(
      config => {
        iView.LoadingBar.start();
        // config.headers.Authorization = 'token'
        return config
      },
      err => {
        iView.LoadingBar.error()
        return Promise.reject(err)
      })

    // http response 拦截器
    instance.interceptors.response.use(
      response => {
        //判断是否是过期 如果是过期(302重定向) 就刷新页面
        var result = response.data;
        var code = result.code, data = result.data, message = result.message;
        if (code === 302) {
          window.location.href = data;
        } else if (code === 0) {
          //如果是0，并且type是2就需要弹出提示
          var type = data.type;
          if (type === 'undefined') {
          } else if (type === 2) {
            Vue.prototype.$Message.warning(message);
          } else {
          }


        } else {
          //其他情况 就需要弹出
          Vue.prototype.$Message.warning(message);
        }
        iView.LoadingBar.finish()
        return response
      },
      error => {
        iView.LoadingBar.error()
        if (error) {
        }
        return Promise.reject(error) // 返回接口返回的错误信息
      });

    // 请求处理
    instance(options)
      .then((res) => {

        // 请求成功时,根据业务判断状态
        /*  if (code === port_code.success) {
         resolve({code, msg, data})
         return false
         } else if (code === port_code.unlogin) {
         setUserInfo(null)
         router.replace({name: "login"})
         } */

        resolve(res.data)
        return false
      })
      .catch((error) => {
        // 请求失败时,根据业务判断状态
        Notice.error({
          title: '出错了！',
          desc: '错误原因 ' + JSON.stringify(error),
          duration: 0
        })
        reject(error)
      })
  })
}
