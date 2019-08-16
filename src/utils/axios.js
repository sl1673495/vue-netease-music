import axios from 'axios'
import { Loading } from 'element-ui'

const BASE_URL = '/netease-api'
let loading
let loadingCount = 0

// 不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance()
// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance(mixinLoading)

// 通用的axios实例
function createBaseInstance(addBeforeIntercetors) {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  addBeforeIntercetors && addBeforeIntercetors(instance.interceptors)
  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function handleError(e) {
  throw new Error(e)
}

function handleResponse(response) {
  if (response.status === 200) {
    return response.data
  } else {
    handleError(response.statusText)
  }
}

function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(
    loadingResponseInterceptor,
    loadingResponseErrorInterceptor
  )

  function loadingRequestInterceptor(config) {
    loading ||
      (loading = Loading.service({
        target: 'body',
        background: 'transparent',
        text: '载入中',
      }))
    loadingCount++

    return config
  }

  function handleResponseLoading() {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
    }
  }

  function loadingResponseInterceptor(response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    // 这里要把错误的response传递下去
    return e.response
  }
}
