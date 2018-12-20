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
      return
      wx.request({
        url: app.globalData.BASE_URL + '/wx/getUserInfo',
        method: "POST",
        data: tockiteData,
        success (res) {
          console.log(res);
          if(res.data.code == 1) {
            that.setData({
              systemUserInfo: res.data.date
            })
            that.powerDrawer('open')
          }else {
            that.setData({
              resultText: res.data.mess
            })
          }
        }
      })
    }
  }
})
