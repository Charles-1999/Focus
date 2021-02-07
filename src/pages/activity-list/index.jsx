import { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import BannerSwiper from '@components/swiper/swiper'
import Tabs from '@components/tabs/tabs'
import Card from '@components/card/card'
import './index.less'

export default class ActivityList extends Component {
  state = {
    activityList: [], // 渲染的列表
    cacheList: [],    // 缓存列表 二维数组
    currTab: 0,
    tabBar: [`MAP`, `低空项目`, `高空项目`, `沙漏塔\n团队挑战`, `树上行走`],
    idMap: new Map([['MAP', 1], ['低空项目', 8], ['高空项目', 9], ['沙漏塔\n团队挑战', 30], ['树上行走', 18]]),
  }

  componentDidMount() {
    const params = getCurrentInstance().router.params;
    if (params.value) {
      this.getActivityListByName(params.value);
    } else {
      const { currTab, idMap, tabBar } = this.state;
      this.getActivityList(idMap.get(tabBar[currTab]), currTab);
    }
  }

  // 获取活动列表
  async getActivityList(id, index) {
    const { cacheList } = this.state;

    const data = await request({ url: `/goodsListViewSetByCategory?category_id=${id}` });
    data.results.map((item) => {
      if (item.goods_front_image) {
        item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
      }
    })

    cacheList[index] = data.results;
    this.setState({
      cacheList,
      activityList: data.results
    })
  }

  // 根据关键字获取活动列表（搜索）
  async getActivityListByName(name) {
    const data = await request({ url: '/goodsListViewSetSearchByTitle/?name=' + name })
    data.results.map((item, index) => {
      if (item.goods_front_image) {
        item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
      }
    })
    this.setState({
      activityList: data.results
    })
  }

  // 切换tab
  async changeTabHandler(index) {
    const { tabBar, idMap, cacheList } = this.state;
    let activityList = [];
    if (cacheList[index] && cacheList[index].length !== 0) {
      activityList = cacheList[index];
      this.setState({
        currTab: index,
        activityList
      })
    } else {
      this.getActivityList(idMap.get(tabBar[index]), index);
      this.setState({
        currTab: index,
      })
    }
  }

  render() {
    const { tabBar, currTab, activityList } = this.state;
    return (
      <View className='index'>
        <TabBar />
        <BannerSwiper module={'ACTIVITIESCONTENT'} />
        <Tabs tabList={tabBar} current={currTab} onTabChange={this.changeTabHandler.bind(this)}>
          {activityList.map(item => <Card item={item} key={item.id}/>)}
        </Tabs>
      </View>
    )
  }
}
