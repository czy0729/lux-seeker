/*
 * @Author: czy0729
 * @Date: 2020-11-19 14:10:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-23 12:01:51
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Img from '../../components/img'
import { updateTabBar, random, push } from '../../utils'
import './index.scss'

function getRandomLx() {
  return Number(`${random(0, 800)}.${random(0, 9)}`)
}
function getRandomK() {
  return Number(`${random(2000, 7000)}.${random(0, 9)}`)
}

class Index extends Component {
  state = {
    lx: getRandomLx(),
    k: getRandomK()
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        lx: getRandomLx(),
        k: getRandomK()
      })
    }, 4000)
  }

  componentDidShow() {
    updateTabBar(0)
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
      <View className='page'>
        <View class='title'>
          <Text>徐老师的灯光捕手 </Text>
          <View className='ml-12' onClick={() => push('docking')}>
            <Text className='iconfont icon-connect t-main' />
          </View>
        </View>

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
    )
  }
}

export default Index
