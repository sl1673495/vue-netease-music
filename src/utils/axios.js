import axios from 'axios'
import { Loading } from 'element-ui'

const BASE_URL = '/netease-api'
let loading
let loadingCount = 0
export let request
export let requestWithoutLoading

const handleError = (e) => {
  throw new Error(e)
}
const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data
  }
  else {
    handleError()
  }
}
export default {
  install(Vue) {
    // 没有全局loading
    requestWithoutLoading = axios.create({
      baseURL: BASE_URL
    })

    requestWithoutLoading.interceptors.response.use(handleResponse, handleError)

    // 全局loading
    request = axios.create({
      baseURL: BASE_URL
    })

    request.interceptors.request.use(config => {

      loading ||
        (loading = Loading.service({
          target: 'body',
          background: 'transparent',
          text: '载入中'
        }))
      loadingCount++

      return config
    })

    const handleLoading = () => {
      loadingCount--
      if (loadingCount === 0) {
        loading.close()
        loading = null
      }
    }


    request.interceptors.response.use(response => {
      handleLoading()
      return handleResponse(response)
    }, (e) => {
      handleLoading()
      handleError(e)
    })

    Vue.prototype.$request = request
  }
}
