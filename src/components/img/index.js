/*
 * @Author: czy0729
 * @Date: 2020-11-18 10:33:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-19 15:23:26
 */
import React from 'react'
import { View, Image } from '@tarojs/components'
import { screenWidth, colorPlaceholder } from '../../constants'
import { c, px } from '../../utils'
import './index.scss'

// const errorImg = require('@assets/images/error.png')

const cls = 'c-img'

function Img({ className, style, src, mode, width, height, onClick }) {
  const isAspectFit = mode === 'aspectFit'
  const styleImg = {
    width: px(width),
    height: px(height || width)
  }
  const styleWrap = {
    backgroundColor: isAspectFit ? 'transparent' : colorPlaceholder,
    ...styleImg,
    ...style
  }
  return (
    <View className={c(cls, className)} style={styleWrap} onClick={onClick}>
      <Image
        style={styleImg}
        mode={mode}
        src={src}
        lazyLoad
        // onError={e => {
        //   e.target.alt = src
        //   e.target.src = errorImg
        // }}
      />
    </View>
  )
}

Img.defaultProps = {
  className: '',
  style: null,
  src: '',
  mode: 'aspectFit', // aspectFill | aspectFit
  width: screenWidth,
  height: null, // 高度, 不传时使用宽度
  onClick: Function.prototype
}

export default Img
