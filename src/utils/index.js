/*
 * @Author: czy0729
 * @Date: 2020-11-13 11:36:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-19 20:00:29
 */
import Taro from '@tarojs/taro'
import classNames from 'classnames'

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
 * 动态更新导航栏
 * @param {*} active
 */
export function updateTabBar(selected = 0) {
  console.log(Taro.getCurrentInstance().page.getTabBar())
  Taro.getCurrentInstance().page.getTabBar().setData({
    selected
  })
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
