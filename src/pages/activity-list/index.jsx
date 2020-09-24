import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'

import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar' 
import Nav from './nav/nav'
import './index.less'

export default class ActivityList extends Component {
  state = {
    activityList: []
  }

  componentDidMount(){
    const params = getCurrentInstance().router.params;
    if(params.value) {
      this.getActivityListByName(params.value);
    }else if(params.id){
      this.getActivityListById(params.id);
    }else{
      this.getActivityList();
    }
  }

  // 默认获取全部活动列表
  async getActivityList(){
    let data = await request({url:'/goods'})
    console.log(data)
    data.results.map((item,index) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
    })
    this.setState({
      activityList: data.results
    })
  }

  // 根据类别id获取活动列表
  async getActivityListById(id){
    const data = await request({url:'/goodsListViewSetByCategory?category_id='+id})
    data.results.map((item,index) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
    })
    this.setState({
      activityList: data.results
    })
  }

  // 根据关键字获取活动列表（搜索）
  async getActivityListByName(name) {
    const data = await request({url:'/goodsListViewSetSearchByTitle/?name='+name})
    data.results.map((item,index) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
    })
    this.setState({
      activityList: data.results
    })
  }

  render () {
    return (
      <View className='index'>
        <TabBar />
        <Nav />
        <View className='list_wrap'>
          {this.state.activityList.map((item,index) => (
            <Navigator className='item_wrap' url={"/pages/detail/index?id="+item.id} key={item.id}>
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
