import { throttle } from './common'

!(function() {
  const calc = function() {
    const remBase = 14
    const maxFontSize = 18
    const minFontSize = 14
    const html = document.getElementsByTagName('html')[0]
    const width = html.clientWidth
    let size = remBase * (width / 1440)
    size = Math.min(maxFontSize, size)
    size = Math.max(minFontSize, size)
    html.style.fontSize = size + 'px'
  }
  calc()
  window.addEventListener('resize', throttle(calc, 500))
})()
