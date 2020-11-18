/*
 * @Author: czy0729
 * @Date: 2020-11-18 09:42:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2020-11-18 09:42:34
 */
export const DEVICE_INDENT = 'HTC BS'
export const DEVICE_SERVICES = [
  {
    uuid: '0000CB00-0000-1000-8000-00805F9B34FB',
    characteristics: []
  },
  {
    uuid: '0000180A-0000-1000-8000-00805F9B34FB',
    characteristics: []
  },
  {
    uuid: '9E5D1E47-5C13-43A0-8635-82AD38A1386F',
    characteristics: [
      {
        properties: {
          read: false,
          write: true,
          notify: true,
          indicate: true
        },
        uuid: 'E3DD50BF-F7A7-4E99-838E-570A086C666B'
      },
      {
        properties: {
          read: false,
          write: true,
          notify: false,
          indicate: false
        },
        uuid: '92E86C7A-D961-4091-B74F-2409E72EFE36'
      },
      {
        properties: {
          read: true,
          write: false,
          notify: false,
          indicate: false
        },
        uuid: '347F7608-2E2D-47EB-913B-75D4EDC4DE3B'
      }
    ]
  }
  // {
  //   uuid: '00001801-0000-1000-8000-00805F9B34FB',
  //   characteristics: [] // no characteristic
  // },
  // {
  //   uuid: '00001800-0000-1000-8000-00805F9B34FB',
  //   characteristics: [
  //     {
  //       properties: {
  //         read: true,
  //         write: false,
  //         notify: false,
  //         indicate: false
  //       },
  //       uuid: '00002A00-0000-1000-8000-00805F9B34FB'
  //     },
  //     {
  //       properties: {
  //         read: true,
  //         write: false,
  //         notify: false,
  //         indicate: false
  //       },
  //       uuid: '00002A01-0000-1000-8000-00805F9B34FB'
  //     }
  //   ]
  // }
]
