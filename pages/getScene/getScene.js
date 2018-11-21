//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scene: 1,
    canIUse: true
  },
  onLoad(query) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    var scene = decodeURIComponent(query.scene)
    var that = this
    if (scene) {
      console.log(scene);
      this.setData({
        scene: scene
      })
    }
    /* 获取用户信息 */
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            canIUse: false
          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }else {
          that.setData({
            canIUse: true
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    if(e.detail.userInfo) {
      wx.setStorage({
        key: "userInfo",
        data: e.detail.userInfo
      })
      wx.getStorage({
        key: 'userInfo',
        success (res) {
          console.log(res.data)
        }
      })
    }else {
      wx.setStorage({
        key: "userInfo",
        data: null
      })
    }
  }
})
