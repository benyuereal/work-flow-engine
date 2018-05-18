import config from '../api/config'
import Cookies from "js-cookie";
import utils from './util'

let util = {};

util.setUserInfo = function (response) {
  alert(JSON.stringify(""));


  var userInfo = response.data;
  alert(JSON.stringify(response));
  Cookies.set('userInfo', userInfo);
  this.$store.commit('setUserInfo', userInfo);
}

export default util;
