import { Carousel, CarouselItem } from "element-ui";
import Icon from '@/base/icon'
export default {
  install(Vue) {
    Vue.component('Icon', Icon)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
  }
}