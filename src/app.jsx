/*
 * @Author: czy0729
 * @Date: 2020-11-18 10:12:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-25 15:36:07
 */
import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import tabbarStore from './store/tabbar'
import ibeaconStore from './store/ibeacon'
import './app.scss'

const store = {
  tabbar: tabbarStore,
  ibeacon: ibeaconStore
}

class App extends Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
