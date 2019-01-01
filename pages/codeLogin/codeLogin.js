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
    if (!app.globalData.BASE_URL) {
      wx.showLoading({
        title: '请求中',
      })
      wx.request({
        url: 'https://dev.lionynn.cn/apis/api/wx/getBaseURL',
        method: "POST",
        data: {},
        success(res) {
          wx.hideLoading()
          app.globalData.BASE_URL = res.data.date.wxBaseUrl
        },
        error() {
          wx.hideLoading()
          app.globalData.BASE_URL = 'https://dev.lionynn.cn/apis/api'
        }
      })
    }
  },
  bindGetUserInfo(e) {
    let that = this
    if (e.detail.userInfo) {
      // 登录
      wx.login({
        success: res => {
          var js_code = res.code;
          wx.showLoading({
            title: '请求中',
          })
          wx.request({
            url: app.globalData.BASE_URL + '/wx/authorizationLogin',
            method: "POST",
            data: {
              js_code: js_code,
              socketRadom: this.data.scene
            },
            success(res) {
              wx.hideLoading()
              if (res.data.code == 1) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  status: 'success'
                })
              } else {
                wx.showToast({
                  title: res.data.mess,
                  icon: 'none',
                  duration: 2000
                })
                that.setData({
                  status: 'error'
                })
              }
            },
            error() {
              wx.hideLoading()
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
