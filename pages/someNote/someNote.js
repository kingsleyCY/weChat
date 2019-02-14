//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listData: []
  },
  onShow() {
    /* 获取列表数据 */
    this.getArticleList()
  },
  /* 列表数据请求 */
  getArticleList() {
    let that = this
    wx.request({
      url: app.globalData.BASE_URL + '/article/all',
      method: "GET",
      data: {
        page: 1,
        pre_page: 20,
        articleType: 2
      },
      success(res) {
        if (res.data.code == 1) {
          that.setData({
            listData: res.data.date.article_list
          })
        } else {
          wx.showToast({
            title: '获取列表数据失败',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            listData: []
          })
        }
      },
      fail() {
        wx.showToast({
          title: '获取列表数据失败',
          icon: 'none',
          duration: 2000
        })
        that.setData({
          listData: []
        })
      },
      complete() {
        wx.stopPullDownRefresh()
      }
    })
  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    this.getArticleList()
  }
})
