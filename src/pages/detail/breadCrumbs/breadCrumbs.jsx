import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './breadCrumbs.less'

export default class BreadCrumbs extends Component {
  static defaultProps = {
    category: {}
  }

  render () {
    return (
      <View className='breadCrumbs'>
        首页 》{this.props.category.name}
      </View>
    )
  }
}
