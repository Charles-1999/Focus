import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import Slider from './slider/slider'
import Nav from './nav/nav'
import Nav_3 from './nav_3/nav_3'
import './index.less'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGoodsList: [],
      goodsPlace: []
    }
  }

  componentWillMount() {
    this.getNewGoodsList();
    this.getGoodsPlace();
  }

  // 获取最新活动列表
  async getNewGoodsList() {
    const data = await request({
      url: '/newGoodsListView'
    })
    let newGoodsList = data.results;
    newGoodsList.forEach((item)=>{
      if(item.goods_front_image) {
        item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn');
      }
    })
    this.setState({
      newGoodsList
    })
    console.log('newGoodsList',newGoodsList)
  }

  // 获取活动场地列表
  async getGoodsPlace() {
    const data = await request({
      url: '/goodsPlaceListView'
    })
    let goodsPlace = data.results
    goodsPlace.forEach((item)=>{
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn');
    })
    this.setState({
      goodsPlace
    })
    console.log('goodsPlace',goodsPlace)
  }

  render() {
    const {newGoodsList, goodsPlace} = this.state;
    return (
      <View className='index'>
        <TabBar></TabBar>
        <Slider />
        <Nav />
        <Nav_3 />
        <View className='container'>
          <Text className='container_title'>最新活动</Text>
          <View className='activity_list'>
            {newGoodsList.map((item,index)=>(
              <Navigator className='activity' url={'/pages/detail/index?id='+item.id} key={item.id}>
                <Image src={item.goods_front_image}></Image>
                <Text className='title'>{item.name}</Text>
              </Navigator>
            ))}
          </View>
        </View>
        <View className='container'>
          <Text className='container_title'>活动场地</Text>
          <View className='site_wrap'>
            {goodsPlace.map((item,index)=>(
              <Navigator url={'/pages/detail/index?id='+item.id} key={item.id}>
                {index <= 1
                  ? <Image src={item.goods_front_image} className='site_big' />
                  : <Image src={item.goods_front_image} className='site_small' />
                }
              </Navigator>
            ))}
          </View>
        </View>
      </View>
    )
  }
}
