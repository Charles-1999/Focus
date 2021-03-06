import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import BannerSwiper from '@components/swiper/swiper'
import Nav from './nav/nav'
import './index.less'
import API from '@utils/api'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsPlace: [],
      meetingList: [],
      finishRequest: false,
    }
  }

  componentDidMount() {
    this.getGoodsPlace();
    this.getMeetingList();
    console.log('componentDidMount')
  }

  /**
   * 是否需要重新渲染组件
   */
  shouldComponentUpdate(nextProps, nextState) {
    const { goodsPlace, meetingList } = nextState;
    if (goodsPlace.length == 0 || meetingList.length == 0)
      return false;
    else
      return true;
  }

  // 获取活动场地列表
  async getGoodsPlace() {
    const data = await request({
      url: '/goodsPlaceListView'
    })
    let goodsPlace = data.results
    goodsPlace.forEach((item) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn');
    })
    this.setState({
      goodsPlace
    })
    console.log('goodsPlace', goodsPlace)
  }

  /* 获取会议增效模块列表 */
  async getMeetingList() {
    const data = await request({ url: API.MEETING });
    const meetingList = data.results;
    meetingList.forEach((item) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn');
    })
    this.setState({
      meetingList
    })
    console.log('meetingList', meetingList)
  }

  /* 会议增效模块 */
  renderMeeting() {
    const { meetingList } = this.state;
    return (
      <View className='wrapper meeting'>
        <View className='wrapper_title'>会议增效模块</View>
        <View className='content'>
          {meetingList.map((item, index) => (
            index <= 6 &&
            <View className='item_wrap' key={item.id}>
              <Image src={item.goods_front_image} />
              <Text>{item.name}</Text>
            </View>
          ))}
          {meetingList.map((item, index) => (
            index <= 6 &&
            <View className='item_wrap' key={item.id}>
              <Image src={item.goods_front_image} />
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
        <View className='more'>查看更多</View>
      </View>
    )
  }

  /* 更多模块 */
  renderMore() {
    return (
      <View className='wrapper'>
        <View className='wrapper_title'>更多模块</View>
        <View className='table'>
          <View className='item'>团队学习模块</View>
          <View className='item'>CSR社会责任主题模块</View>
          <View className='item'>催化发展模块</View>
          <View className='item'>特色项目</View>
        </View>
      </View>
    )
  }

  render() {
    console.log('rendering......')
    const { goodsPlace } = this.state;
    return (
      <View className='index'>
        <TabBar></TabBar>
        <BannerSwiper />
        <Nav />
        <View className='wrapper intro'>
          <View className='title'>公司简介</View>
          <View className='content'>
            <Text space={true}>&emsp;&emsp;FOCUS Adventure 1996年成立于新加坡，是新加坡以及东南亚探险式体验学习、团队训练领域的标杆公司。</Text>
            <Text>&emsp;&emsp;公司以“World Class Adventure Learning”为愿景，成立至今已发展为新加坡同类别公司中规模最大企业，每年为来自世界各地企业客户提供600场以上的培训学习活动。</Text>
          </View>
          <View className='more'>查看更多</View>
        </View>
        {this.renderMeeting()}
        {this.renderMore()}
        <View className='wrapper'>
          <View className='wrapper_title'>活动场地</View>
          <View className='img_wrapper'>
            {goodsPlace.map((item) => (
              <Navigator url={'/pages/detail/index?id=' + item.id} key={item.id}>
                <Image src={item.goods_front_image} mode='heightFix' />
              </Navigator>
            ))}
          </View>
        </View>
      </View>
    )
  }
}
