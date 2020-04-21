import { throttle } from './common'

export const remBase = 14

let htmlFontSize
!(function() {
  const calc = function() {
    const maxFontSize = 18
    const minFontSize = 14
    const html = document.getElementsByTagName('html')[0]
    const width = html.clientWidth
    let size = remBase * (width / 1440)
    size = Math.min(maxFontSize, size)
    size = Math.max(minFontSize, size)
    html.style.fontSize = size + 'px'
    htmlFontSize = size
  }
  calc()
  window.addEventListener('resize', throttle(calc, 500))
})()

// 根据基准字号计算
// 用于静态样式
export function toRem(px) {
  return `${px / remBase}rem`
}

// 根据当前的html根字体大小计算
// 用于某些js的动态计算
export function toCurrentRem(px) {
  return `${px / htmlFontSize}rem`
}
