//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scene: '',
    status: 'init'
  },
  onLoad(query) {
    var scene = decodeURIComponent(query.scene)
    var that = this
    this.setData({
      scene: scene,
      status: 'pending'
    })
    if (!scene || scene == 'undefined') {
      console.log(scene);
      this.setData({
        status: 'none'
      })
    }
  },
  bindGetUserInfo(e) {
    let that = this
    if (e.detail.userInfo) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code; //返回code
          app.globalData.js_code = res.code
          wx.request({
            url: app.globalData.BASE_URL + '/wx/authorizationLogin',
            method: "POST",
            data: {
              js_code: app.globalData.js_code,
              socketRadom: this.data.scene
            },
            success(res) {
              if (res.data.code == 1) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  status: 'success'
                })
              }
            },
            error() {
              that.setData({
                status: 'error'
              })
            }
          })
        }
      })
    }
  }
})
