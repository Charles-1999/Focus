import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { request } from '@utils/request'
import API from '@utils/api'

import BannerSwiper from '@components/swiper/swiper'
import Tabs from '@components/tabs/tabs'
import Card from '@components/card/card'
import TabBar from '@components/topTabBar/topTabBar'
import './index.less'


export default class Course extends Component {

  state = {
    courseList: [], // 渲染的课程列表
    cacheList: [],  // 缓存列表 二维数组
    currTab: 0,
    tabBar: ['领导力', '合作力', '创新能力', '长隆相关', 'BFC'],
    ids: [21, 22, 23, 31, 32]
  }

  UNSAFE_componentWillMount() {
    const { ids, currTab } = this.state;
    this.getCourseList(ids[currTab])
  }

  /* 获取课程列表 */
  getCourseList = async (id, index) => {
    const { cacheList } = this.state;

    const res = await request({ url: API.COURSE + `?id=${id}` });
    let courseList = res.results;
    courseList.forEach(course => {
      if (course.goods_front_image) {
        course.goods_front_image = course.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
      }
    })

    cacheList[index] = courseList;
    this.setState({
      courseList,
      cacheList
    })
  }

  /**
   * 切换tab的handler
   * @param {Number}} index 当前tab的序号
   */
  tabChangeHandler(index) {
    const { ids, cacheList } = this.state;
    let courseList = [];
    if (cacheList[index] && cacheList[index].length !== 0) {
      courseList = cacheList[index];
      this.setState({
        currTab: index,
        courseList
      })
    } else {
      this.getCourseList(ids[index], index);
      this.setState({
        currTab: index
      })
    }
  }

  toDetail(id) {
    Taro.navigateTo({
      url: '/pages/detail/index?id=' + id
    })
  }

  render() {
    const { courseList, tabBar, currTab } = this.state
    console.log(courseList)

    return (
      <View className='course'>
        <TabBar />
        <BannerSwiper module='SPECIALCOURSES'/>
        <Tabs tabList={tabBar} current={currTab} onTabChange={this.tabChangeHandler.bind(this)}>
          {courseList.map(course => (
            <Card item={course} key={course.id}></Card>
          ))}
        </Tabs>
      </View>
    )
  }
}
