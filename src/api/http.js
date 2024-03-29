import axios from 'axios'
import qs  from 'qs'
import {baseUrl} from './config'
import {removeStore} from '../common/js/utils'
import store from '../store'
import * as actionCreator from '~/common/store/actionCreators'

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 10000
// 请求头信息是为post请求设置
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-type': 'application/x-www-form-urlencoded'
}

// 请求的全局拦截
axios.interceptors.request.use((config) => {
  store.dispatch(actionCreator.toggleLoading())
  return config
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(response => {
  store.dispatch(actionCreator.toggleLoading())
  if (response.status === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response)
  }
}, error => {
  console.log(error);
  // 我们可以在这里对异常状态作统一处理
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    return Promise.reject(error.response)
  }
})

// post 方法
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  }).catch(error => {
    console.log(error)
    // throw new Error(error)
  })
}

// get
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then((response) => {
      if (response.code === '-1') {
        
        removeStore('islogin')
        removeStore('uid')
        removeStore('token')
        alert('登陆过期,请重新登陆')
        window.location.href="/login"
      }
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  }).catch(error => {
    console.log(error)
    // throw new Error(error)
  })
}