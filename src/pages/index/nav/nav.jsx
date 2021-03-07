import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { request } from '@utils/request'

import icon_1 from '../../../assets/indexIcon/活动内容-双色.png'
import icon_2 from '../../../assets/indexIcon/特色项目-双色.png'
import icon_3 from '../../../assets/indexIcon/专业培训-双色.png'
import icon_4 from '../../../assets/indexIcon/精彩瞬间-双色.png'
import './nav.less'

export default class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {
      // consulting: {}
    }
  }

  componentWillMount() {
    // this.getConsulting();
  }

  // 获取会议催化数据
  // async getConsulting(){
  //   const data = await request({
  //     url: '/goodsDetails/29'
  //   })
  //   this.setState({
  //     consulting: data
  //   })
  // }

  render() {
    // const {consulting} = this.state;
    return (
      <View className='nav'>
        <Navigator className='nav_item' url='/pages/activity-list/index'>
          <Image src={icon_1} />
          <Text>活动内容</Text>
        </Navigator>
        <Navigator className='nav_item' url='/pages/course/index' openType='switchTab'>
          <Image src={icon_2} />
          <Text>特色项目</Text>
        </Navigator>
        <Navigator className='nav_item' url={'/pages/training/index'}>
          <Image src={icon_3} />
          <Text>专业培训</Text>
        </Navigator>
        <Navigator className='nav_item' url='/pages/moment/index'>
          <Image src={icon_4} />
          <Text>精彩瞬间</Text>
        </Navigator>
      </View>
    )
  }
}
