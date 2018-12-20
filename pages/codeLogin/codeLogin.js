//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    resultText: '',
    scene: 1,
    canIUse: true,
    showModalStatus: false,
    systemUserInfo: null
  },
  onLoad(query) {
    var scene = decodeURIComponent(query.scene)
    var that = this
    if (scene) {
      this.setData({
        scene: scene
      })
    }
    /* 获取用户信息 */
    let tockiteData = {
      userId: that.data.scene.slice(0, 21),
      tockit: that.data.scene.slice(-10)
    }
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
  },
  bindGetUserInfo(e) {
    let that = this
    console.log(e);
    if (e.detail.userInfo) {
      wx.request({
        url: app.globalData.BASE_URL + '/wx/getOpenid',
        method: "POST",
        data: {
          js_code: app.globalData.js_code,
          userId: that.data.scene.slice(0, 21),
          userInfo: e.detail.userInfo
        },
        success (res) {
          if(res.data.code == 1) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }else {
            wx.showToast({
              title: res.data.mess,
              icon: 'none',
              duration: 2000
            })
          }
          that.setData({
            resultText: res.data.mess
          })
          that.powerDrawer('close')
        }
      })
    }
  },
  powerDrawer: function (flag) {
    if(flag == 'close' || flag == 'open') {
      this.util(flag)
    }else {
      wx.showToast({
        title: '传递参数错误',
        icon: 'none',
        duration: 1500
      })
    }
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.left('50%')
      animation.opacity(1).left('15%').rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }
})
