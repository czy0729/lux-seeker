/*
 * @Author: czy0729
 * @Date: 2020-11-18 18:10:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-24 10:24:37
 */
import React, { Component } from 'react'
import { View, Input } from '@tarojs/components'
import { c } from '../../utils'
import './index.scss'

const cls = 'c-ipt'
// let windowHeight = window.innerHeight

class Ipt extends Component {
  static defaultProps = {
    className: '',
    inputClassName: '',
    type: 'text',
    value: '',
    placeholder: '请输入',
    focus: false,
    // clear: true,
    maxlength: -1,
    cursorSpacing: 16,
    password: false,
    confirmType: 'go',
    adjustPosition: true,
    showClear: true,
    align: 'left', // left | right
    onChange: Function.prototype,
    onFocus: Function.prototype,
    _onFocus: Function.prototype,
    onBlur: Function.prototype,
    onConfirm: Function.prototype
  }

  state = {
    focused: false
  }

  onInput = ({ detail }) => {
    const { onChange } = this.props
    onChange(detail.value)
  }

  /**
   * focus自己维护, 不使用父组件的, 不然会出问题
   */
  onFocus = e => {
    const { _onFocus } = this.props
    this.setState(
      {
        focused: true
      },
      () => {
        _onFocus(e)
        // windowHeight = window.innerHeight
      }
    )
  }

  onBlur = e => {
    const { onBlur } = this.props
    this.setState(
      {
        focused: false
      },
      () => {
        onBlur(e)
        // this.fixedWindowPosition()
      }
    )
  }

  onClear = e => {
    const { onChange } = this.props
    onChange('')
    e.stopPropagation()
    e.preventDefault()
  }

  /**
   * [iOS微信浏览器] 输入框失去焦点后页面不回弹或者底部留白问题
   * https://www.cnblogs.com/blackbentel/p/10239886.html
   */
  // fixedWindowPosition = () => {
  //   if (windowHeight == window.innerHeight) {
  //     return
  //   }

  //   let currentPosition
  //   let speed = 1 // 页面滚动距离
  //   currentPosition =
  //     document.documentElement.scrollTop || document.body.scrollTop
  //   currentPosition -= speed
  //   window.scrollTo(0, currentPosition)
  //   currentPosition += speed
  //   window.scrollTo(0, currentPosition)
  // }

  render() {
    const {
      className,
      inputClassName,
      style,
      name,
      type,
      value,
      placeholder,
      focus,
      maxlength,
      cursorSpacing,
      password,
      confirmType,
      // showClear,
      align,
      onConfirm
    } = this.props
    const { focused } = this.state
    const isRight = align === 'right'
    return (
      <View
        className={c(
          cls,
          {
            'c-ipt--focus': focused && value,
            'c-ipt--right': isRight
          },
          className
        )}
      >
        <Input
          className={c('c-ipt__input', inputClassName, {
            't-r': isRight
          })}
          style={style}
          type={type}
          value={value}
          focus={focus}
          name={name}
          placeholderClass='c-ipt__input--placeholder'
          placeholder={placeholder}
          maxLength={maxlength}
          cursorSpacing={cursorSpacing}
          password={password}
          confirmType={confirmType}
          onInput={this.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onConfirm={onConfirm}
        />
      </View>
    )
  }
}

export default Ipt
