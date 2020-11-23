/*
 * @Author: czy0729
 * @Date: 2020-11-23 11:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-23 17:51:54
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { push } from '../../utils'
import './index.scss'

class Setting extends Component {
  render() {
    return (
      <View className='page'>
        <View className='item'>
          <Text>设置名称</Text>
          <Text>徐老师的灯光捕手</Text>
        </View>
        <View className='item'>
          <Text>重置设备</Text>
          {/* <Text className='iconfont icon-next' /> */}
        </View>
        <View className='item'>
          <Text>支持服务</Text>
          {/* <Text className='iconfont icon-next' /> */}
        </View>
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
