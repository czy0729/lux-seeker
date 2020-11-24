/* eslint-disable no-shadow */
/*
 * @Author: czy0729
 * @Date: 2020-11-18 10:37:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-24 10:29:41
 */
import Taro from '@tarojs/taro'

export const CDN = 'https://cdn.elicht.com/images/luxseeker'
export const {
  platform,
  model = '',
  screenWidth,
  screenHeight,
  safeArea = {}
} = Taro.getSystemInfoSync()
export const IOS = model.includes('iPhone')
export const platformClassName = IOS
  ? safeArea.top > 20
    ? 'ios'
    : 'ios ios--under-x'
  : 'android'

export const menuButton = Taro.getMenuButtonBoundingClientRect() || {}
export const menuButtonStyleInject = {
  '--menu-button-top': `${menuButton.top + (IOS ? 2 : 0)}PX`,
  '--menu-button-height': `${menuButton.height}PX`,
  '--menu-button-bottom': '8PX'
}
export const colorPlaceholder = 'rgb(0, 0, 0)'

// console.log(Taro.getSystemInfoSync(), menuButton)
