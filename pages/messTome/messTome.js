//index.js
//获取应用实例
const app = getApp()

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
      url: 'https://lionynn.cn/apis/api/comments/all',
      method: "POST",
      data: {
        page: 1,
        pre_page: 20
      },
      success (res) {
        console.log(res.data)
        that.setData({
          page_info: {
            page: 1,
            per_page: 20,
            count: res.data.date.commentsInfo.count
          },
          commonList: res.data.date.resuletList
        })
      }
    })
  }
})
