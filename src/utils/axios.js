import axios from "axios";
import { Loading } from "element-ui";

let loading
let loadingCount = 0
export default {
  install(Vue) {
    const request = axios.create({
      baseURL: "/api"
    });

    request.interceptors.request.use((config) => {
      loading || (
        loading = Loading.service({
          target: '#page-content',
          text: '载入中'
        })
      )
      loadingCount++
      return config
    });

    request.interceptors.response.use(response => {
      loadingCount--
      if (loadingCount === 0) {
        loading.close()
      }
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("error", response);
      }
    });

    Vue.prototype.$request = request;
  }
};
