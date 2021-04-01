// app.js
let config = require('./keys')

App({
  onLaunch() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    wx.BaaS.init(config.appKey)

    const self = this
    wx.BaaS.auth.getCurrentUser().then(res => {
      console.log('get current user happened')
      wx.setStorageSync('userInfo', res)
      self.globalData.userInfo = res
    })
  },
  globalData: {
    userInfo: wx.getStorageSync('userInfo')
  }
})
