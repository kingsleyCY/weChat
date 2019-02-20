//index.js
//获取应用实例
const app = getApp()

Page({
  data: {},
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})
