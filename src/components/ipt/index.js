/*
 * @Author: czy0729
 * @Date: 2020-11-18 18:10:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-18 18:12:39
 */
import Taro from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { sfc, c } from '@utils'
import Iconfont from '../iconfont'
import styles from './index.module.scss'

let windowHeight = window.innerHeight

class CInput extends Taro.Component {
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
        windowHeight = window.innerHeight
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
        this.fixedWindowPosition()
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
  fixedWindowPosition = () => {
    if (windowHeight == window.innerHeight) {
      return
    }

    let currentPosition
    let speed = 1 // 页面滚动距离
    currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop
    currentPosition -= speed
    window.scrollTo(0, currentPosition)
    currentPosition += speed
    window.scrollTo(0, currentPosition)
  }

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
      showClear,
      align,
      onConfirm
    } = this.props
    const { focused } = this.state
    const isRight = align === 'right'
    return (
      <View
        className={c(
          styles.inputWrap,
          {
            [styles.inputWrapFocus]: focused && value,
            't-r': isRight
          },
          className
        )}
      >
        <Input
          className={c(styles.input, inputClassName, {
            't-r': isRight
          })}
          style={style}
          type={type}
          value={value}
          focus={focus}
          name={name}
          placeholderClass={styles.placeholder}
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
        {showClear && !!value && focused && (
          <View
            className={c(styles.close, 'flex flex-justify-center')}
            onTouchStart={this.onClear}
          >
            <Iconfont className='t-24 l-40 t-icon' name='close' />
          </View>
        )}
      </View>
    )
  }
}

export default sfc(CInput, {
  className: '',
  inputClassName: '',
  type: 'text',
  value: '',
  placeholder: '请输入',
  focus: false,
  clear: true,
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
})
