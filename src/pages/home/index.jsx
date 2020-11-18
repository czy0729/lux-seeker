/*
 * @Author: czy0729
 * @Date: 2020-11-13 11:17:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-18 10:04:49
 */
import React, { Component } from 'react'
// import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
// import Bluetooth from '../../components/bluetooth'
import './index.scss'

@inject('store')
@observer
class Home extends Component {
  render() {
    const {
      counterStore: { counter }
    } = this.props.store
    return (
      <View className='home'>
        {/* <Bluetooth /> */}
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Home
