//index.js
//获取应用实例
const app = getApp()
const util = require('./../../utils/util')

Page({
  data: {
    scrollTop: 100,
    page_info: {
      page: 1,
      per_page: 20,
      count: 0
    },
    commonList: []
  },
  onShow() {
    var that = this
    wx.request({
      url: app.globalData.BASE_URL + '/comments/all',
      method: "POST",
      data: {
        page: 1,
        pre_page: 20
      },
      success(res) {
        var resuletList = JSON.parse(JSON.stringify(res.data.date.resuletList))
        resuletList.forEach(function (item, i) {
          item.userInfo.computedAvtor = that.computedavtor(item.userInfo.avtor)
        })
        that.setData({
          page_info: {
            page: 1,
            per_page: 20,
            count: res.data.date.commentsInfo.count
          },
          commonList: resuletList
        })
        console.log(that.data.commonList);
      }
    })
  },
  /* 处理图片路径 */
  computedavtor(url) {
    return 'https://lioncc.oss-cn-beijing.aliyuncs.com/base-avtor/' + url.slice('/static/avtor/'.length)
  },
  hasToDown() {
    console.log(1);
  }
})
