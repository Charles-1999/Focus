import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'

import TabBar from '@components/topTabBar/topTabBar'
import Nav from './nav/nav'
import './index.less'

import hd_img from './assets/hd.png'

export default class Course extends Component {

  render() {
    return (
      <View className='course'>
        <TabBar />
        <Nav />
        <View className='list_wrap'>
          <View className='item_wrap'>
            <Image src={hd_img} />
            <View className='info'>
              <Text className='title'>培训活动标题</Text>
              <Text className='content'>解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。</Text>
            </View>
          </View>
          <View className='item_wrap'>
            <Image src={hd_img} />
            <View className='info'>
              <Text className='title'>培训活动标题</Text>
              <Text className='content'>解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。</Text>
            </View>
          </View>
          <View className='item_wrap'>
            <Image src={hd_img} />
            <View className='info'>
              <Text className='title'>培训活动标题</Text>
              <Text className='content'>解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。</Text>
            </View>
          </View>
          <View className='item_wrap'>
            <Image src={hd_img} />
            <View className='info'>
              <Text className='title'>培训活动标题</Text>
              <Text className='content'>解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。</Text>
            </View>
          </View>
          <View className='item_wrap'>
            <Image src={hd_img} />
            <View className='info'>
              <Text className='title'>培训活动标题</Text>
              <Text className='content'>解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。</Text>
            </View>
          </View>
          <View className='item_wrap'>
            <Image src={hd_img} />
            <View className='info'>
              <Text className='title'>培训活动标题</Text>
              <Text className='content'>解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。解锁空气动力学、流体力学等科学知识，探究高科技机器人、3D打印。</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
