import React, { Component } from 'react'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import BannerSwiper from './swiper/swiper'
import Nav from './nav/nav'
import './index.less'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGoodsList: [],
      goodsPlace: []
    }
  }

  componentWillMount() {
    this.getNewGoodsList();
    this.getGoodsPlace();
  }

  // 获取最新活动列表
  async getNewGoodsList() {
    const data = await request({
      url: '/newGoodsListView'
    })
    let newGoodsList = data.results;
    newGoodsList.forEach((item) => {
      if (item.goods_front_image) {
        item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn');
      }
    })
    this.setState({
      newGoodsList
    })
    console.log('newGoodsList', newGoodsList)
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

  render() {
    const { newGoodsList, goodsPlace } = this.state;
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
        <View className='wrapper'>
          <View className='wrapper_title'>会议增效模块</View>
        </View>
        <View className='wrapper'>
          <View className='wrapper_title'>更多模块</View>
          <View className='table'>
            <View className='item'>团队学习模块</View>
            <View className='item'>CSR社会责任主题模块</View>
            <View className='item'>催化发展模块</View>
            <View className='item'>特色项目</View>
          </View>
        </View>
        <View className='wrapper'>
          <View className='wrapper_title'>活动场地</View>
          <View className='img_wrapper'>
            {goodsPlace.map((item) => (
              <Navigator url={'/pages/detail/index?id=' + item.id} key={item.id}>
                <Image src={item.goods_front_image} mode='heightFix'/>
              </Navigator>
            ))}
          </View>
        </View>
        {/* <View className='container'>
          <Text className='container_title'>最新活动</Text>
          <View className='activity_list'>
            {newGoodsList.map((item,index)=>(
              <Navigator className='activity' url={'/pages/detail/index?id='+item.id} key={item.id}>
                <Image src={item.goods_front_image}></Image>
                <Text className='title'>{item.name}</Text>
              </Navigator>
            ))}
          </View>
        </View>
        <View className='container'>
          <Text className='container_title'>活动场地</Text>
          <View className='site_wrap'>
            {goodsPlace.map((item,index)=>(
              <Navigator url={'/pages/detail/index?id='+item.id} key={item.id}>
                {index <= 1
                  ? <Image src={item.goods_front_image} className='site_big' />
                  : <Image src={item.goods_front_image} className='site_small' />
                }
              </Navigator>
            ))}
          </View>
        </View> */}
      </View>
    )
  }
}
