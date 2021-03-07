import React, {useEffect, useState} from 'react';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import TabBar from '@components/topTabBar/topTabBar';
import BannerSwiper from '@components/swiper/swiper';

import { request } from '@utils/request'
import API from '@utils/api';

import './index.less'

function CommonModule(props) {
  const [params] = useState(getCurrentInstance().router.params);
  const [dataList, setDataList] = useState([])
  const titleMap = new Map([
    ['meeting', '会议增效模块'],
    ['teamStudy', '团队学习模块'],
    ['csr', 'CSR社会责任主题模块'],
    ['develop', '会议催化模块'],
    ['specialCourse', '团队成长模块'],
  ]);
  const colorMap = new Map([
    ['meeting', '#5261a8'],
    ['teamStudy', '#e69736'],
    ['csr', '#e2929e'],
    ['develop', '#819798'],
    ['specialCourse', '#e69736'],
  ]);
  const apiMap = new Map([
    ['meeting', API.MEETING],
    ['teamStudy', API.TEAMSTUDY],
    ['csr', API.SCR],
    ['develop', API.MEETING], /* TODO: 改接口 */
    ['specialCourse', API.COURSE],
  ]);
  console.log('rendering...')

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: titleMap.get(params.module)
    })
    Taro.setNavigationBarColor({
      backgroundColor: colorMap.get(params.module),
      frontColor: '#000000'
    })
    getDataList()
  }, [])

  async function getDataList() {
    const res = await request({
      url: apiMap.get(params.module)
    })
    let dataList = res.results
    dataList.forEach((item) => {
      item.goods_front_image = item.goods_front_image.replace(/http:\/\/127.0.0.1/, API.IMG_DOMAIN);
    })
    setDataList(dataList)
  }

  function renderIntro() {
    return (
      <View className='intro wrapper'>简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...简介...</View>
    )
  }

  function renderContent() {
    return (
      <View className='content wrapper'>
        {dataList.map(item => (
          <Image src={item.goods_front_image} key={item.id} onClick={() => Taro.navigateTo({url: `/pages/detail/index?id=${item.id}`})}/>
        ))}
      </View>
    )
  }

  return (
    <View className='index'>
      {/* <TabBar></TabBar> */}
      <BannerSwiper />
      {renderIntro()}
      {renderContent()}
    </View>
  );
}

export default CommonModule;
