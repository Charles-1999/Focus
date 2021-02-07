import React, { Component } from 'react'
import { View, Text, Image, Swiper, SwiperItem, Navigator } from '@tarojs/components'
import { request } from '@utils/request'
import API from '@utils/api'

import './swiper.less'

export default class BannerSwiper extends Component {
  constructor(props){
    super(props);
    this.state = {
      bannerList: []
    }
  }

  componentWillMount() {
    this.getBannerList();
  }

  // 获取轮播图列表
  async getBannerList() {
    const url = API['BANNER'][this.props.module] || '/goodsBannerListView';

    const data = await request({ url })
    let bannerList = data.results;
    bannerList.forEach((item)=>{
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, 'https://focus.fmg.net.cn');
    })
    this.setState({
      bannerList
    })
    console.log('bannerList',bannerList);
  }

  render() {
    const {bannerList} = this.state;
    return (
      <View className='swiper'>
        <Swiper
          indicatorDots
          indicatorColor='#fff'
          indicatorActiveColor='#eee'
          circular
          autoplay
        >
          {bannerList.map((item) => (
            <SwiperItem key={item.id}>
              <Navigator url={'/pages/detail/index?id='+item.id}>
                <Image src={item.goods_front_image} mode='widthFix' />
              </Navigator>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}
