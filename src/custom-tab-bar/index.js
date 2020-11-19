/* eslint-disable react/no-unused-state */
/*
 * @Author: czy0729
 * @Date: 2020-11-19 16:56:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-19 20:05:42
 */
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Img from '../components/img'
import { c } from '../utils'
import './index.scss'

class CustomTabBar extends Component {
  state = {
    selected: 0
  }

  switchTab = toPath => {
    Taro.switchTab({
      url: toPath
    })
  }

  render() {
    const { selected } = this.state
    return (
      <View className='custom-tar-bar'>
        <View
          className={c('item', {
            'item--active': selected === 0
          })}
          onClick={() => this.switchTab('/pages/index/index', 0)}
        >
          <Img
            src={
              selected === 0
                ? require('../assets/images/t_1.png')
                : require('../assets/images/t_2.png')
            }
            width={64}
          />
        </View>

        <View
          className={c('item', {
            'item--active': selected === 1
          })}
          onClick={() => this.switchTab('/pages/tick/index', 1)}
        >
          <Img src={require('../assets/images/t_2.png')} width={64} />
        </View>

        <View
          className={c('item', {
            'item--active': selected === 2
          })}
          onClick={() => this.switchTab('/pages/setting/index', 2)}
        >
          <Img src={require('../assets/images/t_3.png')} width={64} />
        </View>
      </View>
    )
  }
}

export default CustomTabBar
