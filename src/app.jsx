/*
 * @Author: czy0729
 * @Date: 2020-11-18 10:12:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-23 17:46:27
 */
import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import tabbarStore from './store/tabbar'
import './app.scss'

const store = {
  tabbar: tabbarStore
}

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
