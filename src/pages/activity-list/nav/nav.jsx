import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import './nav.less'

export default class Nav extends Component {

  render () {
    return (
      <View className='nav'>
        <Navigator className='nav_item' url={'/pages/activity-list/index?id=1'} openType='redirect'>
          <View className='img'>
            <Image src='https://focus.fmg.net.cn/media/logo/MAP图标.png' mode='widthFix' />
          </View>
          <Text>MAP</Text>
        </Navigator>
        <Navigator className='nav_item' url={'/pages/activity-list/index?id=8'} openType='redirect'>
          <View className='img'>
            <Image src='https://focus.fmg.net.cn/media/logo/低空项目图标.png' mode='widthFix' />
          </View>
          <Text>低空</Text>
        </Navigator>
        <Navigator className='nav_item' url={'/pages/activity-list/index?id=9'} openType='redirect'>
          <View className='img'>
            <Image src='https://focus.fmg.net.cn/media/logo/高空项目图标.png' mode='widthFix' />
          </View>
          <Text>高空</Text>
        </Navigator>
        <Navigator className='nav_item' url={'/pages/activity-list/index?id=18'} openType='redirect'>
          <View className='img'>
            <Image src='https://focus.fmg.net.cn/media/logo/MAP图标.png' mode='widthFix' />
          </View>
          <Text>树上行走</Text>
        </Navigator>
        <Navigator className='nav_item' url={'/pages/activity-list/index?id=17'} openType='redirect'>
          <View className='img'>
            <Image src='https://focus.fmg.net.cn/media/logo/TCH图标.png' mode='widthFix' />
          </View>
          <Text>TCH</Text>
        </Navigator>
      </View>
    )
  }
}
