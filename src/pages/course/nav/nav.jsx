import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import './nav.less'

import nav_img from './assets/nav.png'

export default class Nav extends Component {

  render () {
    return (
      <View className='nav'>
        <Navigator className='nav_item'>
          <Image src={nav_img} />
          <Text>BFC</Text>
        </Navigator>
        <Navigator className='nav_item'>
          <Image src={nav_img} />
          <Text>FDP</Text>
        </Navigator>
      </View>
    )
  }
}
