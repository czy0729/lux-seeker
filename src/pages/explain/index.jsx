/*
 * @Author: czy0729
 * @Date: 2020-11-13 11:17:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-23 12:13:50
 */
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Img from '../../components/img'
import { oss } from '../../utils'
import { CDN } from '../../constants'
import './index.scss'

class About extends Component {
  render() {
    return (
      <View className='page'>
        <Img width={750} height={1774 / 2} src={oss(`${CDN}/explain_1.png`)} />
        <Img width={750} height={2042 / 2} src={oss(`${CDN}/explain_2.png`)} />
      </View>
    )
  }
}

export default About
