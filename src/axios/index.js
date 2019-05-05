import axios from 'axios'
import {Loading,Notification,Message} from 'element-ui'

axios.default.baseURL = 'http://192.168.137.128:3000'
axios.default.timeout = 100000
//请求拦截
axios.interceptors.request.use(config => {
  if(config.url == '/login') {
    return config
  }
  else{
    if(getCookie('token')) {
      return config
    }
    else {
      Message.warning({
	showClose: true,
	message: '您还未登录'
      })
      setTimeout(() => {
	window.location.href = '#/login'
      })
    }
  }
})
//响应拦截
axios.interceptors.response.use(response => {
  if(response.data.Status === 1) {
    
  }
})
