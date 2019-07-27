import axios from 'axios'
import { Loading } from 'element-ui'

let loading
let loadingCount = 0
export let request

export default {
  install(Vue) {
    request = axios.create({
      baseURL: '/netease-api'
    })

    request.interceptors.request.use(config => {
      loading ||
        (loading = Loading.service({
          target: '#page-content',
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
    const handleError = (e) => {
      console.error(`请求错误:${e}`)
    }

    request.interceptors.response.use(response => {
      handleLoading()
      if (response.status === 200) {
        return response.data
      }
      else {
        handleError()
      }
    }, (e) => {
      handleError(e)
    })

    Vue.prototype.$request = request
  }
}
