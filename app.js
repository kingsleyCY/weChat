//app.js
App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    that.globalData.BASE_URL = 'http://192.168.1.180:8804/apis/api'
    return
    wx.getSystemInfo({
      success(res) {
        if (res.platform === 'devtools') {
          /* 开发环境 */
          that.globalData.BASE_URL = 'http://localhost:8804/apis/api'
        } else {
          /* 线上 */
          /*that.globalData.BASE_URL = 'https://dev.lionynn.cn/apis/api'*/
          wx.showLoading({
            title: '请求中',
          })
          wx.request({
            url: 'https://dev.lionynn.cn/apis/api/wx/getBaseURL',
            method: "POST",
            data: {},
            success(res) {
              wx.hideLoading()
              console.log(res.data.date.wxBaseUrl);
              that.globalData.BASE_URL = res.data.date.wxBaseUrl
            },
            error() {
              wx.hideLoading()
              that.globalData.BASE_URL = 'https://dev.lionynn.cn/apis/api'
            }
          })
        }
      }
    })
  },
  globalData: {
    BASE_URL: '',
    userInfo: null,
    js_code: null
  }
})