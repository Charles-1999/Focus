import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import './index.less'

import hd_img from './assets/hd.png'

export default class Site extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsPlaceList: []
    }
  }

  componentWillMount() {
    this.getData();
  }
  
  async getData() {
    const data = await request({
      url: '/goodsPlaceListView'
    })
    data.results.map((item,index) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
    })
    this.setState({
      goodsPlaceList: data.results
    })
  }

  render() {
    const {goodsPlaceList} = this.state;
    return (
      <View className='site'>
        <TabBar />
        <View className='list_wrap'>
          {goodsPlaceList.map((item) => (
            <Navigator className='item_wrap' url={'/pages/detail/index?id='+item.id} key={item.id}>
              <Image src={item.goods_front_image} />
              <View className='info'>
                <Text className='title'>{item.name}</Text>
                <Text className='content'>{item.goods_brief}</Text>
              </View>
            </Navigator>
          ))}
        </View>
      </View>
    )
  }
}
