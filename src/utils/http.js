// 导入axios
import axios from 'axios';
import store from '../store';

// 进行一些全局配置
// 公共路由(网络请求地址)
axios.defaults.baseURL = 'http://localhost:2010/api';
// 请求响应超时时间
axios.defaults.timeout = 5000;

// 封装自己的get/post方法
export default {
  get: function(path = '', data = {}) {
    store.commit('showLoading')
    return new Promise(function(resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function(response) {
          store.commit('hideLoading')
          // 按需求来，这里我需要的是response.data，所以返回response.data，一般直接返回response
          resolve(response.data);
        })
        .catch(function(error) {
          store.commit('hideLoading')
          reject(error);
        });
    });
  },
  post: function(path = '', data = {}) {
    store.commit('showLoading')
    return new Promise(function(resolve, reject) {
      axios.post(path, data)
        .then(function(response) {
          store.commit('hideLoading')
          resolve(response.data);
        })
        .catch(function(error) {
          store.commit('hideLoading')
          reject(error);
        });
    });
  }
};