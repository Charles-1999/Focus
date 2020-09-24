import Taro from '@tarojs/taro'

export const request = (params) => {
    const baseUrl = 'https://focus.fmg.net.cn';
    return new Promise((resolve,reject)=>{
        Taro.request({
            ...params,
            url: baseUrl+params.url,
            // data: params.data,
            success: (result) => {
                resolve(result.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}