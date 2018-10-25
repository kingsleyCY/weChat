//index.js
//获取应用实例
const app = getApp()
const util = require('./../../utils/util')

Page({
  data: {
    page_info: {
      page: 1,
      per_page: 20,
      count: 0
    },
    commonList: []
  },
  onLoad() {
    var that = this
    wx.request({
      url: app.globalData.BASE_URL + '/apis/api/comments/all',
      method: "POST",
      data: {
        page: 1,
        pre_page: 20
      },
      success (res) {
        var resuletList = [];
        res.data.date.resuletList.forEach(function (item, i) {
          resuletList.push({
            avtor: that.computedavtor(item.userInfo.avtor)
          })
        })
        that.setData({
          page_info: {
            page: 1,
            per_page: 20,
            count: res.data.date.commentsInfo.count
          },
          commonList: resuletList
        })
      }
    })
  },
  /* 处理图片路径 */
  computedavtor(url) {
    return app.globalData.BASE_URL + '/images/avtor/' + url.slice('/static/avtor/'.length)
  }
})
