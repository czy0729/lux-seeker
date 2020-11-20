/*
 * @Author: czy0729
 * @Date: 2020-11-19 14:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-20 14:45:04
 */
import React, { Component } from 'react'
import { ScrollView, View, Text } from '@tarojs/components'
import { updateTabBar } from '../../utils'
import { menuButtonStyleInject } from '../../constants'
import './index.scss'

class Tick extends Component {
  state = {}

  componentDidShow() {
    updateTabBar(1)
  }

  render() {
    return (
      <View className='page' style={menuButtonStyleInject}>
        <View className='head'>
          <View className='head-left'>
            <Text className='iconfont icon-connect' />
            <Text className='iconfont icon-share' />
          </View>
          <Text>逐点测量</Text>
        </View>

        <View className='th'>
          <Text>次数</Text>
          <Text>时间</Text>
          <Text>照度(lx)</Text>
          <Text>色温(K)</Text>
        </View>

        <ScrollView className='ul' scrollY scrollWithAnimation>
          <View className='li'>
            <Text>1</Text>
            <Text>12:32:56</Text>
            <Text>348.5</Text>
            <Text>4025.2</Text>
          </View>

          <View className='li'>
            <Text>2</Text>
            <Text>12:32:56</Text>
            <Text>348.5</Text>
            <Text>4025.2</Text>
          </View>

          <View className='placeholder' />
        </ScrollView>

        <View className='ft'></View>
      </View>
    )
  }
}

export default Tick
