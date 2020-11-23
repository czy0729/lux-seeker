/*
 * @Author: czy0729
 * @Date: 2020-11-19 14:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-23 10:59:42
 */
import React, { Component } from 'react'
import { ScrollView, View, Text } from '@tarojs/components'
import Btn from '../../components/btn'
import {
  updateTabBar,
  getTimestamp,
  date,
  deepmerge,
  random
} from '../../utils'
import { menuButtonStyleInject } from '../../constants'
import './index.scss'

const format = 'H:i:s'
function getRandomLx() {
  return Number(`${random(0, 800)}.${random(0, 9)}`)
}
function getRandomK() {
  return Number(`${random(2000, 7000)}.${random(0, 9)}`)
}

class Tick extends Component {
  state = {
    scrollIntoView: '',
    list: [
      {
        time: date(format, getTimestamp()),
        lx: getRandomLx(),
        k: getRandomK()
      },
      {
        time: date(format, getTimestamp() + 2),
        lx: getRandomLx(),
        k: getRandomK()
      }
    ]
  }

  componentDidShow() {
    updateTabBar(1)
  }

  onReset = () => {
    this.setState(
      {
        scrollIntoView: '',
        list: []
      },
      () => {
        this.onTest()
      }
    )
  }

  onTest = () => {
    const { list } = this.state
    const _list = deepmerge(list)
    _list.push({
      time: date(format, getTimestamp()),
      lx: getRandomLx(),
      k: getRandomK()
    })
    this.setState({
      scrollIntoView: `item--${list.length - 1}`,
      list: _list
    })
  }

  get avgLx() {
    const { list } = this.state
    if (!list.length) {
      return '-'
    }

    return (
      list.map(item => item.lx).reduce((prev, cur) => prev + cur, 0) /
      list.length
    ).toFixed(1)
  }

  get avgK() {
    const { list } = this.state
    if (!list.length) {
      return '-'
    }

    return (
      list.map(item => item.k).reduce((prev, cur) => prev + cur, 0) /
      list.length
    ).toFixed(1)
  }

  render() {
    const { scrollIntoView, list } = this.state
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

        <ScrollView
          className='ul'
          scrollY
          scrollWithAnimation
          scrollIntoView={scrollIntoView}
        >
          {list.map((item, index) => (
            <View key={index} className='li' id={`item--${index}`}>
              <Text>{index + 1}</Text>
              <Text>{item.time}</Text>
              <Text>{item.lx}</Text>
              <Text>{item.k}</Text>
            </View>
          ))}

          <View className='placeholder' />
        </ScrollView>

        <View className='ft'>
          <View className='flex-1 flex'>
            <View className='flex-1'>
              <Text className='ft-label'>平均照度</Text>
              <Text className='ft-value'>{this.avgLx} lx</Text>
            </View>
            <View className='flex-1'>
              <Text className='ft-label'>平均色温</Text>
              <Text className='ft-value'>{this.avgK} k</Text>
            </View>
          </View>
          <Btn className='ml-16' type='plain-fill' onClick={this.onReset}>
            重测
          </Btn>
          <Btn className='ml-16' type='main-fill' onClick={this.onTest}>
            点击测量
          </Btn>
        </View>
      </View>
    )
  }
}

export default Tick
