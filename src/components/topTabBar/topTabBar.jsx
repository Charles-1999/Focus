import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Input, Image } from '@tarojs/components'
import './topTabBar.less'

import msg_img from './assets/msg.png'
import search_img from './assets/search.png'
import scan_img from './assets/scan.png'

export default class TabBar extends Component {

  async handleSearchOk(e) {
    const {value} = e.detail;
    Taro.navigateTo({
      url: '/pages/search-list/index?value='+value
    })
  }

  toIndex = () => {
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  render() {
    return (
      <View className='tabBar'>
        <View className='logo' onClick={this.toIndex}>FOCUS</View>
        <View className='search_bar'>
          <Image src={search_img} className='search_img' />
          <Input placeholder='输入课程/活动/场地' confirm-type='search' onConfirm={this.handleSearchOk} />
          <Image src={scan_img} className='scan_img' />
        </View>
      </View>
    )
  }
}
