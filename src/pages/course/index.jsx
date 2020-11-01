import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import Nav from './nav/nav'
import './index.less'

import hd_img from './assets/hd.png'

export default class Course extends Component {

  state = {
    courseList: []
  }

  UNSAFE_componentWillMount() {
    this.getCourseList()
  }

  getCourseList = async() => {
    const res = await request({
      url: '/coursesListViewSet'
    })
    let courseList = res.results
    courseList.forEach(course => {
      if(course.goods_front_image) {
        course.goods_front_image = course.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn')
      }
    })
    this.setState({
      courseList
    })
  }

  render() {
    const {courseList} = this.state
    console.log(courseList)

    return (
      <View className='course'>
        <TabBar />
        <Nav />
        <View className='list_wrap'>
          {courseList.map(course => (
            <View className='item_wrap' key={course.id}>
              <Image src={course.goods_front_image} />
              <View className='info'>
                <Text className='title'>{course.name}</Text>
                <Text className='content'>{course.goods_brief}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
