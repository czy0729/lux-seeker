/*
 * @Author: czy0729
 * @Date: 2020-11-18 10:28:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-25 16:24:49
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
// import { AtModal, AtModalContent, AtModalAction } from 'taro-ui'
import { observer, inject } from 'mobx-react'
import IBeacon from '../../components/ibeacon'
import Btn from '../../components/btn'
import Img from '../../components/img'
// import Ipt from '../../components/ipt'
import {
  c,
  // trim,
  info,
  back,
  sleep
} from '../../utils'
import './index.scss'

const initState = {
  step: 1,
  docked: false,
  open: false,
  name: ''
}

@inject('store')
@observer
class Docking extends Component {
  state = {
    ...initState
  }

  onNext = () => {
    this.setState({
      step: this.state.step + 1
    })
  }

  onDocked = async () => {
    this.setState({
      docked: true
    })

    setTimeout(() => {
      if (this.connecting) {
        this.onOk()
      } else {
        this.onDocked()
      }
    }, 2400)
  }

  // onChange = name => {
  //   this.setState({
  //     name
  //   })
  // }

  onOk = async () => {
    info('配对成功', 'success')

    await sleep(2000)
    back()

    await sleep(400)
    this.setState({
      ...initState
    })
  }

  get connecting() {
    const { store } = this.props
    const { ibeacon } = store
    return ibeacon.connecting
  }

  renderStep1() {
    return (
      <View className='page page--step-1'>
        <View class='head'>
          <View class='head-item'>
            <Text class='head-item__title'>电池供电</Text>
            <Text class='head-item__desc'>
              电源开关拨至电池{'\n'}符号侧(如上图)
            </Text>
          </View>
          <View class='head-item ml-20'>
            <Text class='head-item__title'>USB供电</Text>
            <Text class='head-item__desc'>
              电源开关拨至{'\n'}电池符号另一侧
            </Text>
          </View>
        </View>

        <View class='foot mt-28'>
          <Text class='foot-desc'>电源指示灯{'\n'}开机时点亮</Text>
        </View>

        <Btn
          className='mt-28'
          type='main'
          iconRight='right'
          onClick={this.onNext}
        >
          下一步
        </Btn>
      </View>
    )
  }

  renderStep2() {
    const { docked } = this.state
    return (
      <View className='page page--step-2'>
        <View className='stage'>
          <View className='stage-body'>
            <Img
              className={c('animate animate--slide-right', {
                'animate--repeat-1': docked
              })}
              src={require('../../assets/images/1_3.png')}
              width={296 / 2}
              height={616 / 2}
              mode='aspectFit'
            />
            <Img
              className={c('animate animate--slide-left', {
                'animate--repeat-1': docked
              })}
              src={require('../../assets/images/1_4.png')}
              width={340 / 2}
              mode='aspectFit'
            />
          </View>
          <Text className='stage-desc'>
            开启灯光捕手{'\n'}手机开启蓝牙靠近灯光捕手
          </Text>
        </View>

        {/* !docked && (
          <Btn
            className='mt-40'
            type='main'
            iconRight='right'
            onClick={this.onDocked}
          >
            模拟蓝牙对接完成
          </Btn>
        )*/}

        {/* <AtModal isOpened={open}>
          <AtModalContent>
            <Text className='t-34 l-44 t-c'>命名</Text>
            <Text className='t-26 l-32 t-c mt-16'>为您的设备命名</Text>
            <Ipt className='mt-36' value={name} onChange={this.onChange} />
          </AtModalContent>
          <AtModalAction>
            <Btn onClick={this.onSubmit}>确定</Btn>
          </AtModalAction>
        </AtModal> */}
      </View>
    )
  }

  render() {
    const { step } = this.state
    return (
      <View>
        <IBeacon />
        {step === 1 && this.renderStep1()}
        {step === 2 && this.renderStep2()}
      </View>
    )
  }
}

export default Docking
