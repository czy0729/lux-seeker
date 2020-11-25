/*
 * @Author: czy0729
 * @Date: 2020-11-19 16:56:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-25 15:36:41
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Img from '../components/img'
import { c } from '../utils'
import Img1 from '../assets/images/t_1.png'
import Img2 from '../assets/images/t_2.png'
import Img3 from '../assets/images/t_3.png'
import './index.scss'

@inject('store')
@observer
class CustomTabBar extends Component {
  switchTab = (toPath, index) => {
    const { store } = this.props
    const { tabbar } = store
    tabbar.setIndex(index)
    Taro.switchTab({
      url: toPath
    })
  }

  render() {
    const { store } = this.props
    const { tabbar } = store
    return (
      <View className='custom-tar-bar'>
        <View
          className={c('item', {
            'item--active': tabbar.index === 0
          })}
          onClick={() => this.switchTab('/pages/index/index', 0)}
        >
          <Img src={Img1} width={64} />
        </View>
        <View
          className={c('item', {
            'item--active': tabbar.index === 1
          })}
          onClick={() => this.switchTab('/pages/tick/index', 1)}
        >
          <Img src={Img2} width={64} />
        </View>
        <View
          className={c('item', {
            'item--active': tabbar.index === 2
          })}
          onClick={() => this.switchTab('/pages/setting/index', 2)}
        >
          <Img src={Img3} width={64} />
        </View>
      </View>
    )
  }
}

export default CustomTabBar
