/* eslint-disable no-shadow */
/*
 * @Author: czy0729
 * @Date: 2020-11-13 11:36:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-25 15:49:19
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { IOS } from '../constants'

/**
 * Taro 转单位 (缩短引用)
 * @param  {...any} arg
 */
export function px(...arg) {
  return Taro.pxTransform(...arg)
}

/**
 * classNames引用 (缩短引用)
 * @param  {...any} arg
 */
export function c(...arg) {
  return classNames(...arg)
}

/**
 * @version 190221 1.0
 * @param {*} payload
 * @param {*} encode
 */
export function urlStringify(payload, encode = true) {
  const arr = Object.keys(payload).map(
    key => `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  )
  return arr.join('&')
}

/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
 * 使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
 * @param {*} url
 * @param {*} options
 */
export function push(url, options = {}) {
  if (!url) {
    Taro.showToast({
      title: '缺少页面',
      icon: 'none',
      duration: 800
    })
    return
  }

  // 简化url的传参
  let _url
  if (url.includes('/pages')) {
    _url = url
  } else if (url.split('/').length > 1) {
    _url = `/pages/${url}`
  } else {
    _url = `/pages/${url}/index`
  }

  return Taro.navigateTo({
    url: `${_url}?${urlStringify(options)}`
  })
}

/**
 * 退后
 * @param {*} options
 */
export function back(options = { delta: 1 }) {
  return Taro.navigateBack(options)
}

/**
 * 轻提示
 * @param {*} str
 * @param {*} duration
 */
export function info(str = '', icon = 'none', duration = 2400) {
  /**
   * Taro.showToast会把body改成fixed布局
   * 在iOS微信下, 若页面会出现键盘的时候showToast, 键盘收起后屏幕下方会产生空白
   * 需要等到键盘收起来才showToast
   */
  if (IOS) {
    setTimeout(() => {
      Taro.showToast({
        title: str,
        icon,
        duration
      })
    }, 80)
  } else {
    Taro.showToast({
      title: str,
      icon,
      duration
    })
  }
}

/**
 * 睡眠函数
 * @version 180417 1.0
 * @return {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * ArrayBuffer转16进制字符串示例
 * @param {*} buffer
 */
export function ab2hex(buffer) {
  let hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}

export function hex2float(hex) {
  return new Float32Array(
    new Uint8Array(new Uint32Array([`0x${hex}`]).buffer).reverse().buffer
  )[0]
}

/**
 * @param {*} str
 */
export function trim(str = '') {
  return str.replace(/^\s+|\s+$/gm, '')
}

/**
 * 补零
 * @version 190301 1.0
 * @param {*} n
 * @param {*} c
 */
export function pad(n) {
  return Number(n) < 10 ? `0${n}` : n
}

/**
 * 返回timestamp
 * @version 170814 1.0
 * @version 181107 1.1
 * @param  {String} date  指定时间，例2018/11/11 00:00:00
 * @return {Int}    时间戳
 */
export function getTimestamp(date = '') {
  const _date = trim(date)
  if (_date) {
    return Math.floor(new Date(_date.replace(/-/g, '/')).valueOf() / 1000)
  }
  return Math.floor(new Date().valueOf() / 1000)
}

/**
 * 和PHP一样的时间戳格式化函数
 * @version 160421 1.0
 * @version 170104 1.1 变得可以省略format
 * @param  {String} format    格式化格式
 * @param  {Int}    timestamp 时间戳
 * @return {String}
 */
export function date(format, timestamp) {
  // 假如第二个参数不存在，第一个参数作为timestamp
  if (!timestamp) {
    timestamp = format
    format = 'Y-m-d H:i:s'
  }

  let jsdate = timestamp ? new Date(timestamp * 1000) : new Date()
  let txt_weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  let txt_ordin = {
    1: 'st',
    2: 'nd',
    3: 'rd',
    21: 'st',
    22: 'nd',
    23: 'rd',
    31: 'st'
  }
  let txt_months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let f = {
    d: function () {
      // return f.j()
      return pad(f.j(), 2)
    },
    D: function () {
      // eslint-disable-next-line no-undef
      t = f.l()
      // eslint-disable-next-line no-undef
      return t.substr(0, 3)
    },
    j: function () {
      return jsdate.getDate()
    },
    l: function () {
      return txt_weekdays[f.w()]
    },
    N: function () {
      return f.w() + 1
    },
    S: function () {
      return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
    },
    w: function () {
      return jsdate.getDay()
    },
    z: function () {
      return (
        ((jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 86400000) >> 0
      )
    },
    W: function () {
      let a = f.z(),
        b = 364 + f.L() - a
      let nd2,
        nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= 6 - nd) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return date('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0
        }
      }
    },
    F: function () {
      return txt_months[f.n()]
    },
    m: function () {
      // return f.n()
      return pad(f.n(), 2)
    },
    M: function () {
      // eslint-disable-next-line no-undef
      t = f.F()
      // eslint-disable-next-line no-undef
      return t.substr(0, 3)
    },
    n: function () {
      return jsdate.getMonth() + 1
    },
    t: function () {
      let n
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L()
      } else {
        if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
          return 31
        } else {
          return 30
        }
      }
    },
    L: function () {
      let y = f.Y()
      return !(y & 3) && (y % 100 || !(y % 400)) ? 1 : 0
    },
    Y: function () {
      return jsdate.getFullYear()
    },
    y: function () {
      return (jsdate.getFullYear() + '').slice(2)
    },
    a: function () {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function () {
      return f.a().toUpperCase()
    },
    B: function () {
      let off = (jsdate.getTimezoneOffset() + 60) * 60
      let theSeconds =
        jsdate.getHours() * 3600 +
        jsdate.getMinutes() * 60 +
        jsdate.getSeconds() +
        off
      let beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) {
        beat -= 1000
      }
      if (beat < 0) {
        beat += 1000
      }
      if (String(beat).length == 1) {
        beat = '00' + beat
      }
      if (String(beat).length == 2) {
        beat = '0' + beat
      }
      return beat
    },
    g: function () {
      return jsdate.getHours() % 12 || 12
    },
    G: function () {
      return jsdate.getHours()
    },
    h: function () {
      return pad(f.g(), 2)
    },
    H: function () {
      return pad(jsdate.getHours(), 2)
    },
    i: function () {
      return pad(jsdate.getMinutes(), 2)
    },
    s: function () {
      return pad(jsdate.getSeconds(), 2)
    },
    O: function () {
      let t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) {
        t = '-' + t
      } else {
        t = '+' + t
      }
      return t
    },
    P: function () {
      let O = f.O()
      return O.substr(0, 3) + ':' + O.substr(3, 2)
    },
    c: function () {
      return (
        f.Y() +
        '-' +
        f.m() +
        '-' +
        f.d() +
        'T' +
        f.h() +
        ':' +
        f.i() +
        ':' +
        f.s() +
        f.P()
      )
    },
    U: function () {
      return Math.round(jsdate.getTime() / 1000)
    }
  }
  return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
    let ret = ''
    if (t != s) {
      ret = s
    } else {
      if (f[s]) {
        ret = f[s]()
      } else {
        ret = s
      }
    }
    return ret
  })
}

/**
 * 深拷贝
 * @param {*} data
 */
export function deepmerge(data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 随机数
 * @param {*} min
 * @param {*} max
 */
export function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

/**
 * 选择OSS图片质量
 * @param {*} url
 * @param {*} w
 */
export function oss(url = '', w = 750) {
  try {
    if (!url) {
      return ''
    }

    if (
      /^((https?:)?\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(
        url
      ) &&
      !url.includes('elicht.com') &&
      !url.includes('eltmall.com') &&
      !url.includes('litku.com')
    ) {
      return url
    }

    if (
      url.includes(`?x-oss-process=style/w${w}`) ||
      (url.indexOf('http') !== 0 && url.indexOf('//') !== 0)
    ) {
      return url
    }

    // 强制复写w
    if (url.includes('?x-oss-process=style/w')) {
      return `${url.split('?')[0]}?x-oss-process=style/w${w}`
    }

    return `${url}?x-oss-process=style/w${w}`
  } catch (error) {
    return url
  }
}
