/*
 * @Author: czy0729
 * @Date: 2020-11-18 15:05:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-18 15:50:06
 */
import React from 'react'
import { Button, Text } from '@tarojs/components'
import { c } from '../../utils'
import './index.scss'

const cls = 'c-btn'

let isCalled = false
let timer
function callOnceInInterval(functionTobeCalled, interval = 400) {
  if (!isCalled) {
    isCalled = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      isCalled = false
    }, interval)
    return functionTobeCalled()
  }
  return false
}

function Btn({ className, type, text, delay, iconRight, onClick, children }) {
  return (
    <Button
      className={c(
        cls,
        {
          [`${cls}--${type}`]: type
        },
        className
      )}
      onClick={delay ? () => callOnceInInterval(onClick) : onClick}
      lang='zh_CN'
    >
      <Text className={`${cls}__text`}>{text || children}</Text>
      {!!iconRight && (
        <Text
          className={c(
            `${cls}__icon`,
            `${cls}__icon--right`,
            `iconfont icon-${iconRight}`
          )}
        />
      )}
    </Button>
  )
}

Btn.defaultProps = {
  className: '',
  type: 'plain', // 颜色类型
  text: '', // 文字
  delay: true,
  onClick: Function.prototype
}

export default Btn
