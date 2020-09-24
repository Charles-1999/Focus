import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.less'

export default class User extends Component {

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleDownload(){
    const fileName = 'test_20200808225919_348.pdf';
    let $this = this;
    Taro.downloadFile({
      url: 'http://106.52.218.85:8000/media/goods/files/test_20200808225919_348.pdf',
      success: res => {
        if(res.statusCode === 200){
          var filePath = res.tempFilePath;
          // let manager = Taro.getFileSystemManager();
          // // 判断目录是否存在
          // manager.access({
          //   path: `${Taro.env.USER_DATA_PATH}/download`,
          //   success: res => {
          //     // 保存文件前查看是否存在该文件
          //     manager.access({
          //       path: `${Taro.env.USER_DATA_PATH}/download/${fileName}`,
          //       success: res => {
          //         return false;
          //       },
          //       fail: err => {
          //         manager.saveFile({
          //           tempFilePath: filePath, // filePath为保存到本地的临时路径
          //           filePath: `${Taro.env().USER_DATA_PATH}/download/${fileName}`,
          //           success: res => {
                      
          //           }
          //         })
          //       }
          //     })
          //   }
          // })
          Taro.openDocument({
            filePath: filePath,
            showMenu: true,
            success: res => {
              console.log('成功')
            }
          })
        }
      }
    })
  }

  render() {
    return (
      <View className='user'>
        <Text>Hello world!</Text>
        <Button onClick={this.handleDownload} >下载</Button>
      </View>
    )
  }
}
