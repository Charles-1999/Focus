import Taro,{ getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, RichText } from '@tarojs/components'
import '@tarojs/taro/html.css'

import { request } from '@utils/request'

import TabBar from '@components/topTabBar/topTabBar'
import BreadCrumbs from './breadCrumbs/breadCrumbs'
import './index.less'

export default class Detail extends Component {
  state = {
    detail: {}
  }

  componentDidMount(){
    const id = getCurrentInstance().router.params.id;
    this.getDetail(id);
  }

  async getDetail(id){
    let data = await request({url:'/goodsDetails/'+id})
    // console.log(data)
    data.goods_desc = data.goods_desc.replace(/href="/g,'href="https://focus.fmg.net.cn')
                                      .replace(/src="/g,'src="https://focus.fmg.net.cn')
                                      .replace(/src="https:\/\/focus.fmg.net.cnhttps:\/\/focus.fmg.net.cn/g,'src="https://focus.fmg.net.cn')
    //                                   .replace(/<img/g,'<img style="max-width:100%;height:auto;display:block" ')
                    
    // console.log(data.goods_desc)
    Taro.setNavigationBarTitle({
      title: data.category.name
    })
    this.setState({
      detail: data
    })
  }

  render () {
    const item = this.state.detail;
    return (
      <View className='detail'>
        <TabBar />
        <BreadCrumbs category={item.category}/>
        <View className='main'>
          <Text className='title'>{item.name}</Text>
          <wxParse data={item.goods_desc}></wxParse>
        </View>
      </View>
    )
  }
}
