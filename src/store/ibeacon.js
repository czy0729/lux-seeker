/*
 * @Author: czy0729
 * @Date: 2020-11-25 15:33:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-11 15:22:54
 */
import { observable } from 'mobx'

const ibeaconStore = observable({
  connecting: true,
  lx: 0,
  k: 0,

  onConnect() {
    this.connecting = true
  },

  onDisConnect() {
    this.connecting = false
    this.lx = 0
    this.k = 0
  },

  onChange(lx, k) {
    this.lx = parseInt(Math.max(0, Number(lx.toFixed(1))))
    this.k = parseInt(Math.max(0, Number(k.toFixed(1))))
  }
})

export default ibeaconStore
