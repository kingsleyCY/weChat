//app.js
App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success(res) {
        if (res.platform === 'devtools') {
          /* 开发环境 */
          that.globalData.BASE_URL = 'http://localhost:8804/apis/api'
        } else {
          /* 线上 */
          that.globalData.BASE_URL = 'https://dev.lionynn.cn/apis/api'
        }
      }
    })

    // 登录
    /*wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code; //返回code
        this.globalData.js_code = res.code
      }
    })*/
  },
  globalData: {
    BASE_URL: '',
    userInfo: null,
    js_code: null
  }
})