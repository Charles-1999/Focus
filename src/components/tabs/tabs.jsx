import { View } from '@tarojs/components';
import React, { useState } from 'react'
import './tabs.less'

function Tabs(props) {
  const { tabList, onTabChange } = props;
  const [current, setCurrent] = useState(0);

  function changeTabHandler(index) {
    setCurrent(index);
    onTabChange && onTabChange(index);
  }

  return (
    <View className='tabs'>
      <View className='tab-bar'>
        {tabList.map((tab, i) =>
          <View
            className={i === current ? 'tab-bar_item active' : 'tab-bar_item'}
            onClick={() => changeTabHandler(i)}
            key={i}>
            {tab}
          </View>)}
      </View>
      <View className='tab-content'>
        {props.children}
      </View>
    </View>
  )
}

export default Tabs;
