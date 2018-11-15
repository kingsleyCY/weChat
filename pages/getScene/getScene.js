//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scene: 1
  },
  onLoad(query) {
    var scene = decodeURIComponent(query.scene)
    if(scene) {
      console.log(scene);
      this.setData({
        scene: scene
      })
    }
  },
})
