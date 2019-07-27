
import { Input, Carousel, CarouselItem, Table, TableColumn, Popover, Pagination } from 'element-ui'
import * as commonUtils from './common'

// import Icon from '@/base/icon'
// import NButton from '@/base/button'
// import Tabs from '@/base/tabs'

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context('@/base', true, /[a-z0-9]+\.(jsx?|vue)$/i)

export default {
  install(Vue) {
    // 批量注册base组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      Vue.component(componentName, componentConfig.default || componentConfig)
    })

    Vue.prototype.$ELEMENT = { size: 'small' };
    Vue.prototype.$utils = commonUtils

    Vue.use(Input)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Popover)
    Vue.use(Pagination)
  }
}
