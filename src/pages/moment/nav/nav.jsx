import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import './nav.less'

import nav_img from './assets/nav.png'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render () {
    return (
      <View className='nav'>
        <Navigator className='nav_item'>
          <Image src={nav_img} />
          <Text>活动视频</Text>
        </Navigator>
        <Navigator className='nav_item' url={'/pages/moment/comment-list/index'}>
          <Image src={nav_img} />
          <Text>客户感言</Text>
        </Navigator>
      </View>
    )
  }
}
