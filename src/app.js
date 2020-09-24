import { Component } from 'react'
import Taro from '@tarojs/taro'
import { set as setGlobalData, get as getGlobalData } from './global_data'
import './app.less'

class App extends Component {

  componentDidMount() {
    this.getSysInfo();
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 获取设备信息
  getSysInfo() {
    // 获取设备信息
    const sysInfo = Taro.getSystemInfoSync();
    // 先缓存获取 isIphoneX
    let isIphoneX = Taro.getStorageSync('isIphoneX') || false;
    // 如果缓存没有 isIphoneX 在接口中获取
    if (!isIphoneX) {
      if (sysInfo.model.includes('iPhone')) {
        const reg = /X|11/;
        isIphoneX = reg.test(sysInfo.model.split(' ')[1])
      }
    }
    // 存储到缓存中
    Taro.setStorageSync('isIphoneX', isIphoneX)
    // 设置全局变量
    setGlobalData('isIphoneX', isIphoneX);
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
