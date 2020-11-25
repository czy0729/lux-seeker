/*
 * @Author: czy0729
 * @Date: 2020-11-25 15:33:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-25 16:16:10
 */
import { observable } from 'mobx'

const ibeaconStore = observable({
  connecting: false,
  lx: 0,
  k: 0,

  onConnect() {
    this.connecting = true
  },

  onDisConnect() {
    this.connecting = false
  },

  onChange(lx, k) {
    this.lx = Number(lx.toFixed(1))
    this.k = Number(k.toFixed(1))
  }
})

export default ibeaconStore
