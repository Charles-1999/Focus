import { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import BannerSwiper from '@components/swiper/swiper'
import Tabs from '@components/tabs/tabs'
import Card from '@components/card/card'
import './index.less'

import API from '@utils/api'

export default class Training extends Component {
  state = {
    dataList: [], // 渲染的列表
    cacheList: [],    // 缓存列表 二维数组
    currTab: 0,
    tabBar: [`会议增效`, `催化发展`],
    idMap: new Map([['会议增效', 1], ['催化发展', 2]]),
  }

  componentDidMount() {
    const params = getCurrentInstance().router.params;
    if (params.value) {
      this.getActivityListByName(params.value);
    } else {
      const { currTab, idMap, tabBar } = this.state;
      this.getDataList(idMap.get(tabBar[currTab]), currTab);
    }
  }

  // 获取数据列表
  async getDataList(id, index) {
    const { cacheList } = this.state;

    let url = API.MEETING;
    if (id === 2) {
      url = API.GETBYCATEGORY + id;
    }
    const data = await request({ url });
    data.results.map((item) => {
      if (item.goods_front_image) {
        item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, API.DOMAIN)
      }
    })

    cacheList[index] = data.results;
    this.setState({
      cacheList,
      dataList: data.results
    })
  }

  // 根据关键字获取活动列表（搜索）
  async getActivityListByName(name) {
    const data = await request({ url: '/goodsListViewSetSearchByTitle/?name=' + name })
    data.results.map((item, index) => {
      if (item.goods_front_image) {
        item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, API.DOMAIN)
      }
    })
    this.setState({
      dataList: data.results
    })
  }

  // 切换tab
  async changeTabHandler(index) {
    const { tabBar, idMap, cacheList } = this.state;
    let dataList = [];
    if (cacheList[index] && cacheList[index].length !== 0) {
      dataList = cacheList[index];
      this.setState({
        currTab: index,
        dataList
      })
    } else {
      this.getDataList(idMap.get(tabBar[index]), index);
      this.setState({
        currTab: index,
      })
    }
  }

  render() {
    const { tabBar, currTab, dataList } = this.state;
    return (
      <View className='index'>
        <TabBar />
        <BannerSwiper module={'TRAINING'} />
        <Tabs tabList={tabBar} current={currTab} onTabChange={this.changeTabHandler.bind(this)}>
          {dataList.map(item => <Card item={item} key={item.id}/>)}
        </Tabs>
      </View>
    )
  }
}
