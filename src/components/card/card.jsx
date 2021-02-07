import Taro from '@tarojs/taro';
import React from 'react';
import { View, Image } from '@tarojs/components';
import './card.less'

function Card(props) {
  const { item } = props;
  return (
    <View className='card'
      onClick={() => Taro.navigateTo({ url: `/pages/detail/index?id=${item.id}` })}>
      <Image src={item.goods_front_image} mode='widthFix' />
      <View className='info'>
        <View className='title'>{item.name}</View>
        <View className='content'>{item.goods_brief}</View>
      </View>
    </View>
  )
}

export default Card;
