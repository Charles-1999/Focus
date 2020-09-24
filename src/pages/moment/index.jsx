import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import Nav from './nav/nav'
import './index.less'

import hd_img from './assets/hd.png'

export default class Moment extends Component {
  constructor(props){
    super(props)
    this.state = {
      monentList: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const data = await request({
      url: '/wonderfulMomentListViewSet'
    })
    data.results.map((item,index) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
    })
    this.setState({
      monentList: data.results
    })
  }

  render () {
    const {monentList} = this.state;
    return (
      <View className='moment'>
        <TabBar />
        <Nav />
        <View className='list_wrap'>
          {monentList.map((item)=>(
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
