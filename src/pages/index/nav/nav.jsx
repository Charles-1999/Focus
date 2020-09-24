import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { request } from '@utils/request'

import './nav.less'

export default class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {
      consulting: {}
    }
  }

  componentWillMount() {
    this.getConsulting();
  }

  // 获取会议催化数据
  async getConsulting(){
    const data = await request({
      url: '/goodsDetails/29'
    })
    this.setState({
      consulting: data
    })
  }

  render() {
    const {consulting} = this.state;
    return (
      <View className='nav'>
        <Navigator className='nav_item' url='/pages/activity-list/index'>
          <Image src='https://focus.fmg.net.cn/media/logo/活动内容.jpg' />
          <Text>活动内容</Text>
        </Navigator>
        <Navigator className='nav_item' url={'/pages/detail/index?id='+consulting.id}>
          <Image src='https://focus.fmg.net.cn/media/logo/会议催化.png' />
          <Text>会议催化</Text>
        </Navigator>
        <Navigator className='nav_item' url={'/pages/course/course-list/index'}>
          <Image src='https://focus.fmg.net.cn/media/logo/专业培训.png' />
          <Text>专业培训</Text>
        </Navigator>
        <Navigator className='nav_item' url='/pages/moment/index'>
          <Image src='https://focus.fmg.net.cn/media/logo/精彩瞬间.jpg' />
          <Text>精彩瞬间</Text>
        </Navigator>
      </View>
    )
  }
}
