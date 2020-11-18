/* eslint-disable react/sort-comp */
/*
 * @Author: czy0729
 * @Date: 2020-11-18 09:44:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-18 09:51:48
 */
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ab2hex } from '../../utils'
import { DEVICE_INDENT, DEVICE_SERVICES } from './ds'

class Bluetooth extends Component {
  serviceId = DEVICE_SERVICES[0].uuid

  componentDidMount() {
    // console.log('0. componentDidMount')
    this.startConnect()
  }

  /**
   * 1、onLaunch() 方法里中调用开启连接 this.startConnect();
   * 弹出提示框，开启适配，如果失败提示设备蓝牙不可用，同时开启蓝牙适配器状态监听。
   */
  startConnect = () => {
    // console.log('1. startConnect')
    Taro.showLoading({
      title: '开启蓝牙适配'
    })

    Taro.openBluetoothAdapter({
      success: () => {
        // console.log('1. [初始化蓝牙模块] openBluetoothAdapter.success', res)
        this.getBluetoothAdapterState()
      },
      fail: err => {
        console.log('1. [初始化蓝牙模块] openBluetoothAdapter.fail', err)
        Taro.showToast({
          title: '蓝牙初始化失败',
          icon: 'none',
          duration: 2000
        })

        setTimeout(() => {
          Taro.hideToast()
        }, 2000)
      }
    })

    Taro.onBluetoothAdapterStateChange(res => {
      if (this.isConnectting) return
      if (res.available) {
        // console.log('1. [监听蓝牙适配器状态变化事件] onBluetoothAdapterStateChange.available', res)
        this.getBluetoothAdapterState()
      }
    })
  }

  /**
   * 2、初始化蓝牙适配器成功，调用this.getBluetoothAdapterState() 获取本机蓝牙适配器状态，
   * 判断是否可用，available为false则因为用户没有开启系统蓝牙。
   * 同时判断程序还没有开始搜索蓝牙设备，调用this.startBluetoothDevicesDiscovery();
   * 开始扫描附近的蓝牙设备，同时调用this.getConnectedBluetoothDevices() 开启获取本机已配对的蓝牙设备。
   */
  getBluetoothAdapterState = () => {
    // console.log('2. [获取本机蓝牙适配器状态] getBluetoothAdapterState')
    Taro.getBluetoothAdapterState({
      success: res => {
        // console.log('2. [获取本机蓝牙适配器状态] getBluetoothAdapterState.success', res)
        if (!res.available) {
          Taro.showToast({
            title: '设备无法开启蓝牙连接',
            icon: 'none',
            duration: 2000
          })

          setTimeout(() => {
            Taro.hideToast()
          }, 2000)
        } else if (!res.discovering) {
          this.startBluetoothDevicesDiscovery()
          // this.getConnectedBluetoothDevices()
        }
      }
    })
  }

  /**
   * 3、开始搜索蓝牙设备startBluetoothDevicesDiscovery(), 提示蓝牙搜索。
   */
  startBluetoothDevicesDiscovery = () => {
    if (this.deviceId) {
      Taro.createBLEConnection({
        deviceId: this.deviceId,
        success: function (res) {
          console.log(res)
        }
      })
    }

    console.log(
      '3. [开始搜寻附近的蓝牙外围设备] startBluetoothDevicesDiscovery'
    )
    Taro.showLoading({
      title: '蓝牙搜索'
    })

    Taro.startBluetoothDevicesDiscovery({
      // services: DEVICE_SERVICES.map(item => item.uuid),
      services: [],
      allowDuplicatesKey: false,
      success: res => {
        console.log(
          '3. [开始搜寻附近的蓝牙外围设备] startBluetoothDevicesDiscovery.success',
          res
        )
        if (!res.isDiscovering) {
          this.getBluetoothAdapterState()
        } else {
          this.onBluetoothDeviceFound()
        }
      },
      fail: err => {
        console.log(
          '3. [开始搜寻附近的蓝牙外围设备] startBluetoothDevicesDiscovery.fail',
          err
        )
      }
    })
  }

  /**
   * 4、获取已配对的蓝牙设备。此方法特别说明参数services（Array）是必填的，
   * 但是官方示例中以及各种坑爹demo里从没见过有谁填写，但是不填写这个属性此方法无法获取到任何已配对设备。
   * 如果要调用此方法则是需要连接特定设备，并且知道该设备的一个主服务serviceId。
   * 如果未知可以先手动连接一次想要连接的设备，然后获取service列表，记录属性primary为true的值至少一个。
   */
  getConnectedBluetoothDevices = () => {
    console.log(
      '4. [根据 uuid 获取处于已连接状态的设备] getConnectedBluetoothDevices',
      {
        services: [this.serviceId]
      }
    )
    Taro.getConnectedBluetoothDevices({
      services: [this.serviceId],
      success: res => {
        // 获取处于连接状态的设备
        console.log(
          '4. [根据 uuid 获取处于已连接状态的设备] getConnectedBluetoothDevices.success',
          res
        )

        const conDevList = []
        let flag = false
        // let index = 0

        res.devices.forEach(value => {
          const { name, deviceId } = value
          if (name.indexOf(DEVICE_INDENT) != -1) {
            // 如果存在包含FeiZhi字段的设备
            // index += 1
            flag = true
            conDevList.push(deviceId)
            this.deviceId = deviceId
            return
          }
        })

        if (flag) {
          this.connectDeviceIndex = 0
          this.loopConnect(conDevList)
        } else if (!this.getConnectedTimer) {
          this.getConnectedTimer = setTimeout(() => {
            this.getConnectedBluetoothDevices()
          }, 5000)
        }
      },
      fail: err => {
        console.log(
          '4. [根据 uuid 获取处于已连接状态的设备] getConnectedBluetoothDevices.fail',
          err
        )
        if (!this.getConnectedTimer) {
          this.getConnectedTimer = setTimeout(() => {
            this.getConnectedBluetoothDevices()
          }, 5000)
        }
      }
    })
  }

  /**
   * 5、开启蓝牙搜索功能失败，则回到第2步重新检查蓝牙是适配器是否可用，开启蓝牙搜索功能成功后开启发现附近蓝牙设备事件监听。
   * this.onBluetoothDeviceFound() 此方法可自定义过滤一些无效的蓝牙设备比如name为空的，
   * 个人产品开发中需要过滤devices name 不含有FeiZhi字符串的设备。
   */
  onBluetoothDeviceFound = () => {
    Taro.onBluetoothDeviceFound(res => {
      if (res.devices[0]) {
        const { name } = res.devices[0]
        if (name != '') {
          console.log(
            '5. [监听寻找到新设备的事件] onBluetoothDeviceFound.founded',
            res,
            {
              name
            }
          )

          if (name.indexOf(DEVICE_INDENT) != -1) {
            const { deviceId, advertisServiceUUIDs } = res.devices[0]
            this.deviceId = deviceId
            this.serviceId = advertisServiceUUIDs[0]
            console.log(
              '5. [监听寻找到新设备的事件] onBluetoothDeviceFound.matched',
              res
            )
            this.startConnectDevices()
          }
        }
      }
    })
  }

  /**
   * 6、在第5步中发现了某个想配对的设备，则获取到该设备的deviceId，然后开始配对该设备 this.startConnectDevices()。
   * 开启连接后为了避免出现冲突，一旦开启连接则终止扫描附近蓝牙设备，终止读取本机已配对设备。
   */
  startConnectDevices = (ltype, array) => {
    console.log('6. startConnectDevices', {
      ltype,
      array
    })
    clearTimeout(this.getConnectedTimer)
    this.getConnectedTimer = null

    clearTimeout(this.discoveryDevicesTimer)
    this.discoveryDevicesTimer = null

    console.log('6. [停止搜寻附近的蓝牙外围设备] stopBluetoothDevicesDiscovery')
    Taro.stopBluetoothDevicesDiscovery()

    this.isConnectting = true
    Taro.createBLEConnection({
      deviceId: this.deviceId,
      success: res => {
        console.log('6. [连接低功耗蓝牙设备] createBLEConnection.success', res)
        if (res.errCode == 0) {
          setTimeout(() => {
            this.getService(this.deviceId)
          }, 5000)
        }
      },
      fail: err => {
        console.log('6. [连接低功耗蓝牙设备] createBLEConnection.fail', err)
        if (ltype == 'loop') {
          this.connectDeviceIndex += 1
          this.loopConnect(array)
        } else {
          this.startBluetoothDevicesDiscovery()
          this.getConnectedBluetoothDevices()
          // this.startConnectDevices()
        }
      },
      complete: () => {
        console.log('6. [连接低功耗蓝牙设备] createBLEConnection.complete')
        // this.isConnectting = false
      }
    })
  }

  /**
   * 7、连接成功后根据deiviceId获取设备的所有服务。this.getService(deviceId);
   */
  getService = deviceId => {
    console.log('7. getService', {
      deviceId
    })

    // 监听蓝牙连接
    Taro.onBLEConnectionStateChange(res => {
      console.log(
        '7. [监听低功耗蓝牙连接状态的改变事件] onBLEConnectionStateChange',
        res
      )

      // if (!res.connected) {
      //   this.isConnectting = false
      //   this.startConnectDevices()
      // }
    })

    // 获取蓝牙设备service值
    // Taro.getBLEDeviceServices({
    //   deviceId,
    //   success: res => {
    //     console.log(
    //       '7. [获取蓝牙设备所有服务(service)] getBLEDeviceServices.success',
    //       res
    //     )
    //     this.getCharacter(deviceId, res.services)
    //   }
    // })
    this.getCharacter(deviceId)
  }

  /**
   * 8、读取服务的特征值。
   */
  getCharacter = (deviceId, services = DEVICE_SERVICES) => {
    // this.openNotifyService(
    //   deviceId,
    //   services[2].uuid,
    //   services[2].characteristics[0].uuid
    // )

    console.log('8. [读取服务的特征值] getCharacter', deviceId, services)
    services.forEach((value, index, array) => {
      if (value == this.serviceId) {
        this.serviceId = array[index]
      }
    })

    this.serviceId = services[0].uuid
    Taro.getBLEDeviceCharacteristics({
      deviceId,
      serviceId: this.serviceId,
      success: res => {
        console.log(
          '8. [获取蓝牙设备某个服务中所有特征值] getBLEDeviceCharacteristics.success',
          res
        )

        let buffer = new ArrayBuffer(1)
        let dataView = new DataView(buffer)
        dataView.setUint8(0, 0)

        const characteristicId = res.characteristics[0].uuid
        Taro.writeBLECharacteristicValue({
          deviceId,
          serviceId: this.serviceId,
          characteristicId,
          value: buffer,
          success: r => {
            console.log('writeBLECharacteristicValue success', r)
          }
        })
        this.openNotifyService(deviceId, this.serviceId, characteristicId)
      },
      fail: err => {
        console.log(
          '8. [获取蓝牙设备某个服务中所有特征值(characteristic)] getBLEDeviceCharacteristics.fail',
          err
        )
      },
      complete: () => {
        console.log(
          '8. [获取蓝牙设备某个服务中所有特征值(characteristic)] getBLEDeviceCharacteristics.complete'
        )
      }
    })
  }

  /**
   * 9、如果扫描到的设备中没有想要连接的设备，可以尝试使用系统蓝牙手动配对，
   * 然后再小程序中调用getConnectedBluetoothDevices() 获取本机已配对的蓝牙设备，
   * 然后过滤设备（可能获取多个已配对的蓝牙设备）。
   * 将以获取的蓝牙设备deviceId放入到一个数组中调用自定义方法this.loopConnect();
   * 思路：通过递归调用获取已配对蓝牙设备的deviceId，如果获取到了就去连接，
   * devicesId[x] 为空说明上传调用getConnectedBluetoothDevices()时获取到的已配对设备全部连接失败了。
   * 则开启重新获取已配对蓝牙设备，并开启扫描附近蓝牙设备。
   */
  loopConnect = devicesId => {
    console.log('9. loopConnect', {
      devicesId
    })

    // const listLen = devicesId.length
    if (devicesId[this.connectDeviceIndex]) {
      this.deviceId = devicesId[this.connectDeviceIndex]
      this.startConnectDevices('loop', devicesId)
    } else {
      console.log('已配对的设备小程序蓝牙连接失败')
      this.startBluetoothDevicesDiscovery()
      this.getConnectedBluetoothDevices()
    }
  }

  /**
   * 10、startConnectDevices('loop', array)方法，是当获取已配对蓝牙设备进行连接时这样调用。
   * 其中的处理逻辑上文已经贴出，意思就是在连接失败后fail方法里累加一个全局变量，
   * 然后回调loopConnect(array)方法。
   */

  /**
   * 11、手动连接，上文介绍的方法是为了直接自动连接，如果不需要自动连接，
   * 可在使用方法getBluetoothDevices() 将会获取到已扫描到的蓝牙设备的列表，
   * 可以做个页面显示出设备名，点击该设备开始连接。
   */

  /**
   * 12、
   */
  openNotifyService = (deviceId, serviceId, characteristicId) => {
    console.log('12. openNotifyService', {
      deviceId,
      serviceId,
      characteristicId
    })
    // Taro.showToast({
    //   title: '蓝牙配对成功',
    //   icon: 'success',
    //   duration: 2000
    // })

    Taro.onBLECharacteristicValueChange(res => {
      console.log('12. onBLECharacteristicValueChange', res)
      console.log(ab2hex(res.value))
    })

    Taro.readBLECharacteristicValue({
      deviceId,
      serviceId,
      characteristicId: DEVICE_SERVICES[0].characteristics[0].uuid,
      success: res => {
        console.log('12. readBLECharacteristicValue.success', res)
      }
    })

    // Taro.notifyBLECharacteristicValueChange({
    //   state: true,
    //   deviceId,
    //   serviceId,
    //   characteristicId,
    //   success: res => {
    //     console.log('12. notifyBLECharacteristicValueChange.success', res)
    //   },
    //   fail: err => {
    //     console.log('12. notifyBLECharacteristicValueChange.fail', err)
    //   }
    // })
  }

  /**
   * 注意：
   * 1、that.serviceId 是在初始化时设置的，由于对需要连接设备的主服务serivceId和各种特征值都是已知的因此可以这样做。
   * 如果不可知可以做一个扫描方法自己检查特征值的用途。
   *
   * 2、 连接成功后的writeBLECharacteristicValue和openNotifyService操作需要注意，
   * 如果同时开启这两项操作要先调用wirte再开启notify（原因未知，个人心得）。
   *
   * 3、经人提醒还可以再完善一下在onBlueToothAdapterStateChange()**可以监听蓝牙适配器状态，
   * 以此判断连接过程中或连接后用户开关了设备蓝牙，如果判断到关了蓝牙提示请开启，如果监听到开启了，就重新回到第1步。
   */

  render() {
    return (
      <View>
        <Text>蓝牙对接组件</Text>
      </View>
    )
  }
}

export default Bluetooth
