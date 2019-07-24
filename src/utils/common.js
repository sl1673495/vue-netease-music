export function pad(num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

export function formatTime(interval) {
  interval = interval | 0
  const minute = pad((interval / 60) | 0)
  const second = pad(interval % 60)
  return `${minute}:${second}`
}

export function debounce(fn, delay) {
  let timer = null;

  return function () {
    const args = arguments;
    const context = this;

    if (timer) {
      clearTimeout(timer);

      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  }
}