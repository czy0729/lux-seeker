/*
 * @Author: czy0729
 * @Date: 2020-11-23 11:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-25 17:56:38
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { push } from '../../utils'
import { menuButtonStyleInject } from '../../constants'
import './index.scss'

class Setting extends Component {
  static onShareAppMessage = () => {
    return {
      title: '云知光灯光捕手',
      path: '/pages/index/index'
    }
  }

  render() {
    return (
      <View className='setting' style={menuButtonStyleInject}>
        <View className='head'>
          <Text>设置</Text>
        </View>

        {/* <View className='item'>
          <Text>设置名称</Text>
          <Text>徐老师的灯光捕手</Text>
        </View>
        <View className='item'>
          <Text>重置设备</Text>
          <Text className='iconfont icon-next' />
        </View>
        <View className='item'>
          <Text>支持服务</Text>
          <Text className='iconfont icon-next' />
        </View> */}
        <View className='item' onClick={() => push('explain')}>
          <Text>操作说明</Text>
          <Text className='iconfont icon-next' />
        </View>
        <View className='item' onClick={() => push('about')}>
          <Text>关于灯光捕手</Text>
          <Text className='iconfont icon-next' />
        </View>
      </View>
    )
  }
}

export default Setting
