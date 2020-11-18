/*
 * @Author: czy0729
 * @Date: 2020-11-13 11:36:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-16 15:27:13
 */

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
