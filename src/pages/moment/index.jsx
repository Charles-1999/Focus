import React, { Component } from 'react'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { request } from '@utils/request'
import API from '@utils/api'

import BannerSwiper from '@components/swiper/swiper'
import Tabs from '@components/tabs/tabs'
import TabBar from '@components/topTabBar/topTabBar'
import Card from '@components/card/card'
import './index.less'

export default class Moment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monentList: [],
      currTab: 0,
      tabList: ['视频回顾', '客户感言'],
      current: 0, // 客户感言的当前项
    }
  }

  componentDidMount() {
    this.getData()
  }

  /* 获取客户感言 */
  async getData() {
    const data = await request({
      url: '/wonderfulMomentListViewSet'
    })
    data.results.map((item, index) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
    })
    this.setState({
      monentList: data.results
    })
  }

  /* tabs切换 */
  tabChangeHandler(index) {
    this.setState({
      currTab: index
    })
  }

  /* 客户感言切换 */
  swiperChangeHandler(e) {
    const { current } = e.detail;
    this.setState({
      current
    })
  }

  render() {
    const { monentList, tabList, currTab, current } = this.state;
    return (
      <View className='moment'>
        <TabBar />
        <BannerSwiper module={'GREATMOMENT'} />
        <Tabs tabList={tabList} current={currTab} onTabChange={this.tabChangeHandler.bind(this)}>
          {currTab === 0
            ? // 视频回顾
            <View className=''>
              {monentList.map(item => <Card item={item} key={item.id} />)}
            </View>
            : // 客户感言
            <View className='swiper_wrap'>
              <View className='side_nav'>
                <View className={`side_nav-item ${current === 0 ? 'active' : ''}`}>2020</View>
                <View className={`side_nav-item ${current === 1 ? 'active' : ''}`}>2019</View>
                <View className={`side_nav-item ${current === 2 ? 'active' : ''}`}>2018</View>
                <View className={`side_nav-item ${current === 3 ? 'active' : ''}`}>2017</View>
              </View>
              <View className='nav_content'>
                <Swiper
                  vertical={true}
                  current={current}
                  onChange={this.swiperChangeHandler.bind(this)}>
                  <SwiperItem>111</SwiperItem>
                  <SwiperItem>222</SwiperItem>
                  <SwiperItem>333</SwiperItem>
                </Swiper>
              </View>
            </View>
          }
        </Tabs>
      </View>
    )
  }
}
