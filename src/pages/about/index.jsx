/*
 * @Author: czy0729
 * @Date: 2020-11-13 11:17:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-01 17:51:44
 */
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Img from '../../components/img'
import { oss } from '../../utils'
import { CDN } from '../../constants'
import './index.scss'

class Explain extends Component {
  static onShareAppMessage = () => {
    return {
      title: '欧能照明灯光捕手',
      path: '/pages/index/index',
      imageUrl: `${CDN}/icon.png`
    }
  }

  render() {
    return (
      <View className='page'>
        <Img width={750} height={1570 / 2} src={oss(`${CDN}/about_1.png`)} />
        <Img width={750} height={1652 / 2} src={oss(`${CDN}/about_2.png`)} />
        <Img width={750} height={2066 / 2} src={oss(`${CDN}/about_3.png`)} />
        <Img width={750} height={1990 / 2} src={oss(`${CDN}/about_4.png`)} />
      </View>
    )
  }
}

export default Explain
