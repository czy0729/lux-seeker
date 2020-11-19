/*
 * @Author: czy0729
 * @Date: 2020-11-19 14:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-19 19:55:44
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Img from '../../components/img'
import { updateTabBar } from '../../utils'
import './index.scss'

class Index extends Component {
  state = {
    lx: 0,
    k: 0
  }

  componentDidShow() {
    updateTabBar(0)
  }

  onTest = () => {
    const testDS = [
      [100.1, 1000],
      [200.2, 2000],
      [342.5, 3540],
      [755.5, 4328],
      [800.0, 10000]
    ]
    let count = 0
    setInterval(() => {
      const [lx, k] = testDS[count % testDS.length]
      this.setState({
        lx,
        k
      })
      count += 1
    }, 2000)
  }

  // 2000-7000k
  get percent() {
    const { k } = this.state
    if (k <= 2000) {
      return 0
    }

    if (k >= 7000) {
      return '100%'
    }

    return `${(((k - 2000) / 5000) * 100).toFixed(2)}%`
  }

  render() {
    const { lx, k } = this.state
    return (
      <View>
        <View className='page'>
          <Text class='title'>
            徐老师的灯光捕手 <Text className='iconfont icon-connect t-main' />
          </Text>

          <View class='item flex-center-y'>
            <View class='flex-1'>
              <Img src={require('../../assets/images/lx.png')} width={70} />
              <Text class='item-label'>照度</Text>
            </View>
            <View>
              <Text class='item-value'>
                {lx || '-'}
                {'  '}lx
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
                  {k || '-'}
                  {'  '}K
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
      </View>
    )
  }
}

export default Index
