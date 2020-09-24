import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'

import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar' 
import './index.less'

export default class SearchList extends Component {
  state = {
    SearchList: []
  }

  componentDidMount(){
    const params = getCurrentInstance().router.params;
    if(params.value) {
      this.getSearchListByName(params.value);
    }
  }

  // 根据关键字获取活动列表（搜索）
  async getSearchListByName(name) {
    const data = await request({url:'/goodsListViewSetSearchByTitle/?name='+name})
    data.results.map((item,index) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
    })
    this.setState({
      SearchList: data.results
    })
  }

  render () {
    return (
      <View className='index'>
        <TabBar />
        <View className='list_wrap'>
          {this.state.SearchList.map((item,index) => (
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
