//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scene: '',
  },
  onLoad(query) {
    var scene = decodeURIComponent(query.scene)
    var that = this
    console.log(scene);
    this.setData({
      scene: scene
    })
  },
  bindGetUserInfo(e) {
    let that = this
    if (e.detail.userInfo) {
      console.log(e);
      wx.request({
        url: app.globalData.BASE_URL + '/wx/authorizationLogin',
        method: "POST",
        data: {
          js_code: app.globalData.js_code,
          socketRadom: this.data.scene
        },
        success(res) {
          console.log(res.data);
        }
      })
    }
  }
})
