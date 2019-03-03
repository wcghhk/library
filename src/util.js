import config from './config'

export function get (url, data) {
  return request(url, 'get', data)
}

export function post (url, data) {
  return request(url, 'post', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      data,
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

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
