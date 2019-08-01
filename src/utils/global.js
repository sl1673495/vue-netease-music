
import { Input, Dialog, Button, Loading, Carousel, CarouselItem, Table, TableColumn, Popover, Pagination } from 'element-ui'
import * as utils from './index'

// 全局图片错误处理
window.addEventListener('error', function (e) {
  const target = e.target // 当前dom节点
  if (target) {
    const { tagName } = target
    if (tagName && tagName.toUpperCase() === 'IMG') {
      target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
  }
}, true)

const requireComponent = require.context('@/base', true, /[a-z0-9]+\.(jsx?|vue)$/i)
export default {
  install(Vue) {
    // 批量注册base组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if (componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })

    Vue.prototype.$ELEMENT = { size: 'small' };
    Vue.prototype.$utils = utils

    Vue.use(Input)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Popover)
    Vue.use(Pagination)
    Vue.use(Loading)
    Vue.use(Dialog)
    Vue.use(Button)
  }
}
