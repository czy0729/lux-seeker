/*
 * @Author: czy0729
 * @Date: 2020-11-13 11:36:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-18 10:42:43
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
 * ArrayBuffer转16进制字符串示例
 * @param {*} buffer
 */
export function ab2hex(buffer) {
  let hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}
