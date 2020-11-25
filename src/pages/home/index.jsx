/*
 * @Author: czy0729
 * @Date: 2020-11-19 14:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-25 17:52:50
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Img from '../../components/img'
import { c, push } from '../../utils'
import { menuButtonStyleInject } from '../../constants'
import './index.scss'

@inject('store')
@observer
class Home extends Component {
  static onShareAppMessage = () => {
    return {
      title: '云知光灯光捕手',
      path: '/pages/index/index'
    }
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

  // 2000-7000k
  get percent() {
    if (this.k <= 2000) {
      return 0
    }

    if (this.k >= 7000) {
      return '100%'
    }

    return `${(((this.k - 2000) / 5000) * 100).toFixed(2)}%`
  }

  render() {
    return (
      <View className='home' style={menuButtonStyleInject}>
        <Text className='navigation-title' />
        <View class='title' onClick={() => push('docking')}>
          <Text>云知光灯光捕手 </Text>
          <View className='ml-12'>
            <Text
              className={c('iconfont icon-connect', {
                't-main': this.connecting,
                't-sub': !this.connecting
              })}
            />
          </View>
        </View>
        <View class='item flex-center-y'>
          <View class='flex-1'>
            <Img src={require('../../assets/images/lx.png')} width={70} />
            <Text class='item-label'>照度</Text>
          </View>
          <View>
            <Text class='item-value'>{this.lx || '-'} lx</Text>
          </View>
        </View>
        <View class='item flex-column-center-y'>
          <View class='flex-center-y'>
            <View class='flex-1'>
              <Img src={require('../../assets/images/k.png')} width={70} />
              <Text class='item-label'>色温</Text>
            </View>
            <View>
              <Text class='item-value'>{this.k || '-'} K</Text>
            </View>
          </View>
          <View class='item-k'>
            <View
              class='item-k__pointer'
              style={{
                left: this.percent
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Home
