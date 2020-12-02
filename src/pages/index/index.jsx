/*
 * @Author: czy0729
 * @Date: 2020-11-19 14:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-01 17:51:04
 */
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import IBeacon from '../../components/ibeacon'
import CustomTabBar from '../../custom-tab-bar'
import { CDN } from '../../constants'
import Home from '../home'
import Tick from '../tick'
import Setting from '../setting'

@inject('store')
@observer
class Index extends Component {
  static onShareAppMessage = () => {
    return {
      title: '云知光灯光捕手',
      path: '/pages/index/index',
      imageUrl: `${CDN}/icon.png`
    }
  }

  state = {
    tab: 0
  }

  onChange = tab => {
    this.setState({
      tab
    })
  }

  render() {
    const { tab } = this.state
    return (
      <View>
        <IBeacon />
        {tab === 0 && <Home />}
        <View
          style={{
            display: tab === 1 ? 'block' : 'none'
          }}
        >
          <Tick />
        </View>
        {tab === 2 && <Setting />}
        <CustomTabBar onChange={this.onChange} />
      </View>
    )
  }
}

export default Index
