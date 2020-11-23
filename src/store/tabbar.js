/*
 * @Author: czy0729
 * @Date: 2020-11-23 17:46:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2020-11-23 17:46:01
 */
import { observable } from 'mobx'

const tabbarStore = observable({
  index: 0,
  setIndex(index) {
    this.index = index
  }
})

export default tabbarStore
