/*
 * @Author: czy0729
 * @Date: 2020-11-18 10:28:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-18 14:58:36
 */
/*
 * @Author: czy0729
 * @Date: 2020-11-13 11:17:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-18 10:04:49
 */
import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import './index.scss'

@inject('store')
@observer
class Docking extends Component {
  renderHead() {
    return (
      <View class='head'>
        <View class='head-item'>
          <Text class='head-item__title'>电池供电</Text>
          <Text class='head-item__desc mt-20'>
            电源开关拨至电池{'\n'}符号侧(如上图)
          </Text>
        </View>
        <View class='head-item ml-20'>
          <Text class='head-item__title'>USB供电</Text>
          <Text class='head-item__desc mt-20'>
            电源开关拨至{'\n'}电池符号另一侧
          </Text>
        </View>
      </View>
    )
  }

  renderFoot() {
    return (
      <View class='foot mt-28'>
        <Text class='foot__desc'>电源指示灯{'\n'}开机时点亮</Text>
      </View>
    )
  }

  render() {
    return (
      <View className='page'>
        {this.renderHead()}
        {this.renderFoot()}
      </View>
    )
  }
}

export default Docking
