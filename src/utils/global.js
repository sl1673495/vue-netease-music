import { Input, Carousel, CarouselItem, Table, TableColumn, Popover, Pagination } from 'element-ui'
import * as commonUtils from './common'

import Icon from '@/base/icon'
import NButton from '@/base/button'
import Tabs from '@/base/tabs'

export default {
  install(Vue) {
    Vue.component('Icon', Icon)
    Vue.component('NButton', NButton)
    Vue.component('Tabs', Tabs)

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
