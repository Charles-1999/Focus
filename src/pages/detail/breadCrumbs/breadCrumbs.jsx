import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './breadCrumbs.less'

export default class BreadCrumbs extends Component {

  render () {
    return (
      <View className='breadCrumbs'>
        首页 》活动 》MAP
      </View>
    )
  }
}
