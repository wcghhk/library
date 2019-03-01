import config from './config'

export function get (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: (res) => {
        if (res.data.code) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}

export function showSuccess (text = '成功') {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
