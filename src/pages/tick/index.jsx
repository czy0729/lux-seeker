/*
 * @Author: czy0729
 * @Date: 2020-11-19 14:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-07 17:15:48
 */
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Btn from '../../components/btn'
import { c, getTimestamp, date, deepmerge, push } from '../../utils'
import { menuButtonStyleInject } from '../../constants'
import './index.scss'

const format = 'H:i:s'
function lx(val) {
  if (val <= 1) return 0
  if (val >= 10000) return 'over'
  return val
}
function k(val) {
  if (val <= 1) return val
  if (val <= 2000 || val >= 7000) return 'over'
  return val
}

@inject('store')
@observer
class Tick extends Component {
  static onShareAppMessage = () => {
    return {
      title: '欧能照明灯光捕手',
      path: '/pages/index/index'
    }
  }

  state = {
    scrollIntoView: '',
    list: []
  }

  onReset = () => {
    this.setState({
      scrollIntoView: '',
      list: []
    })
  }

  onTick = () => {
    if (!this.connecting) {
      Taro.showToast({
        title: '设备未连接',
        icon: 'none',
        duration: 2400
      })
      return
    }

    const { list } = this.state
    const _list = deepmerge(list)
    _list.push({
      time: date(format, getTimestamp()),
      lx: this.lx,
      k: this.k
    })
    this.setState({
      scrollIntoView: `item--${list.length - 1}`,
      list: _list
    })
  }

  get connecting() {
    const { store } = this.props
    const { ibeacon } = store
    return ibeacon.connecting
  }

  get lx() {
    const { store } = this.props
    const { ibeacon } = store
    return ibeacon.lx
  }

  get k() {
    const { store } = this.props
    const { ibeacon } = store
    return ibeacon.k
  }

  get items() {
    const { list } = this.state
    return list.filter(
      item =>
        !(item.lx <= 1 || item.lx >= 10000 || item.k <= 2000 || item.k >= 7000)
    )
  }

  get avgLx() {
    if (!this.items.length) {
      return '-'
    }

    const avg = parseInt(
      this.items.map(item => item.lx).reduce((prev, cur) => prev + cur, 0) /
        this.items.length
    )
    return avg === 0 ? '-' : avg
  }

  get avgK() {
    if (!this.items.length) {
      return '-'
    }

    const avg = parseInt(
      this.items.map(item => item.k).reduce((prev, cur) => prev + cur, 0) /
        this.items.length
    )
    return avg === 0 ? '-' : avg
  }

  render() {
    const { scrollIntoView, list } = this.state
    return (
      <View className='tick' style={menuButtonStyleInject}>
        <View className='head'>
          <View className='head-left'>
            <View
              onClick={() => {
                if (!this.connecting) {
                  push('docking')
                }
              }}
            >
              <Text
                className={c('iconfont icon-connect', {
                  't-main': this.connecting,
                  't-sub': !this.connecting
                })}
              />
            </View>
            {/* <Text className='iconfont icon-share' /> */}
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
              <Text>{lx(item.lx)}</Text>
              <Text>{k(item.k)}</Text>
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
              <Text className='ft-value'>{this.avgK} K</Text>
            </View>
          </View>
          <Btn className='ml-16' type='plain-fill' onClick={this.onReset}>
            重测
          </Btn>
          <Btn className='ml-16' type='main-fill' onClick={this.onTick}>
            点击测量
          </Btn>
        </View>
      </View>
    )
  }
}

export default Tick
