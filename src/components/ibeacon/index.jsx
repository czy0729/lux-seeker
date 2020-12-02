/*
 * @Author: czy0729
 * @Date: 2020-11-18 09:44:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-01 15:46:06
 */
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ab2hex, hex2float } from '../../utils'
import ibeaconStore from '../../store/ibeacon'

class IBeacon extends Component {
  componentDidMount() {
    this.startConnect()
  }

  deviceId

  startConnect = () => {
    Taro.openBluetoothAdapter({
      success: () => {
        this.getBluetoothAdapterState()
      },
      fail: () => {
        this.handleDisConnect()

        Taro.showToast({
          title: '蓝牙初始化失败',
          icon: 'none',
          duration: 4000
        })
      }
    })

    Taro.onBluetoothAdapterStateChange(res => {
      if (res.available) {
        this.getBluetoothAdapterState()
      }
    })
  }

  getBluetoothAdapterState = () => {
    Taro.getBluetoothAdapterState({
      success: res => {
        if (!res.available) {
          Taro.showToast({
            title: '设备无法开启蓝牙连接',
            icon: 'none',
            duration: 4000
          })
        } else if (!res.discovering) {
          this.handleDisConnect()
          this.startBluetoothDevicesDiscovery()
        }
      },
      fail: () => {
        this.handleDisConnect()
      }
    })
  }

  startBluetoothDevicesDiscovery = () => {
    Taro.startBluetoothDevicesDiscovery({
      services: [],
      interval: 0,
      allowDuplicatesKey: true,
      success: res => {
        if (!res.isDiscovering) {
          this.getBluetoothAdapterState()
        } else {
          this.onBluetoothDeviceFound()
        }
      },
      fail: () => {
        this.handleDisConnect()
      }
    })
  }

  founded = false
  onBluetoothDeviceFound = () => {
    Taro.onBluetoothDeviceFound(res => {
      if (res.devices[0]) {
        const { deviceId, advertisData } = res.devices[0]
        const value = ab2hex(advertisData) || ''
        if (value.indexOf('9e06') === 0) {
          console.log(
            '5. [监听寻找到新设备的事件] onBluetoothDeviceFound.matched',
            deviceId,
            advertisData
          )

          if (!this.founded) {
            this.founded = true
          }
          this.deviceId = deviceId
          this.handleConnect()
          this.openNotifyService(value)
        }
      }
    })
  }

  openNotifyService = value => {
    if (value.length === 50) {
      const lx = hex2float(value.slice(16, 24))
      const k = hex2float(value.slice(24, 32))
      ibeaconStore.onChange(lx, k)
    }
  }

  checkConnectingInterval
  handleConnect = () => {
    ibeaconStore.onConnect()

    if (this.checkConnectingInterval) {
      clearTimeout(this.checkConnectingInterval)
    }

    this.checkConnectingInterval = setTimeout(() => {
      this.checkConnectingInterval = null
      this.handleDisConnect()
    }, 10000)
  }

  handleDisConnect = () => {
    ibeaconStore.onDisConnect()
  }

  render() {
    return <View />
  }
}

export default IBeacon
