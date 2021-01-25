/*
 * @Author: czy0729
 * @Date: 2020-11-19 14:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-07 17:03:37
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
    if (ibeacon.lx <= 1) {
      return 0
    }

    if (ibeacon.lx >= 10000) {
      return 'over'
    }

    return ibeacon.lx
  }

  get k() {
    const { store } = this.props
    const { ibeacon } = store
    if (ibeacon.k <= 1) {
      return ibeacon.k
    }

    if (ibeacon.k <= 2000 || ibeacon.k >= 7000) {
      return 'over'
    }

    return ibeacon.k
  }

  // 2000-7000k
  get percent() {
    const { store } = this.props
    const { ibeacon } = store
    if (ibeacon.k <= 2000) {
      return 0
    }

    if (ibeacon.k >= 7000) {
      return '100%'
    }

    return `${(((ibeacon.k - 2000) / 5000) * 100).toFixed(2)}%`
  }

  render() {
    return (
      <View
        className={c('home', {
          'home--connecting': this.connecting
        })}
        style={menuButtonStyleInject}
      >
        <Text className='navigation-title' />
        <View
          class='title'
          onClick={() => {
            if (!this.connecting) {
              push('docking')
            }
          }}
        >
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
            <Text class='item-value'>
              {this.k === 'over' ? 'over' : this.lx || '-'} lx
            </Text>
          </View>
        </View>
        <View class='item flex-column-center-y'>
          <View class='flex-center-y'>
            <View class='flex-1'>
              <Img src={require('../../assets/images/k.png')} width={70} />
              <Text class='item-label'>色温</Text>
            </View>
            <View>
              <Text class='item-value'>
                {this.lx === 'over' ? 'over' : this.k || '-'} K
              </Text>
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
