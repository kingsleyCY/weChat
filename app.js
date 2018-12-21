//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code; //返回code
        console.log(res.code);
        this.globalData.js_code = res.code
      }
    })
  },
  globalData: {
    // BASE_URL: 'https://dev.lionynn.cn/apis/api',
    BASE_URL: 'http://localhost:8804/apis/api',
    userInfo: null,
    js_code: null
  }
})