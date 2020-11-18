/*
 * @Author: czy0729
 * @Date: 2020-11-18 10:12:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-18 10:14:40
 */
import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import counterStore from './store/counter'
import './app.scss'

const store = {
  counterStore
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
