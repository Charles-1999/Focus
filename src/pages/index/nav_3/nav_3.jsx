import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { request } from '@utils/request'

import './nav_3.less'

export default class Nav_3 extends Component {
  constructor(props){
    super(props)
    this.state = {
      leaderShip: {}, // 领导力
      innovation: {}, // 创新力
      teamBuilding: {}, // 合作力
    }
  }

  componentWillMount() {
    this.getLeaderShip();
    this.getInnovation();
    this.getTeamBuilding();
  }

  // 获取领导力数据
  async getLeaderShip(){
    const data = await request({
      url: '/goodsDetails/25'
    })
    this.setState({
      leaderShip: data
    })
  }
  // 获取创新力数据
  async getInnovation(){
    const data = await request({
      url: '/goodsDetails/26'
    })
    this.setState({
      innovation: data
    })
  }
  // 获取合作力数据
  async getTeamBuilding(){
    const data = await request({
      url: '/goodsDetails/27'
    })
    this.setState({
      teamBuilding: data
    })
  }

  render() {
    const {leaderShip,innovation,teamBuilding} = this.state;
    return (
      <View className='nav_3'>
        <Navigator className='nav_item' url={'/pages/detail/index?id='+leaderShip.id}>
          <Image src='https://focus.fmg.net.cn/media/logo/领导力挑战.jpg' mode='widthFix' />
        </Navigator>
        <Navigator className='nav_item' url={'/pages/detail/index?id='+innovation.id}>
          <Image src='https://focus.fmg.net.cn/media/logo/创新力挑战.jpg' mode='widthFix' />
        </Navigator>
        <Navigator className='nav_item' url={'/pages/detail/index?id='+teamBuilding.id}>
          <Image src='https://focus.fmg.net.cn/media/logo/合作力挑战.jpg' mode='widthFix' />
        </Navigator>
      </View>
    )
  }
}
