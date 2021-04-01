// pages/restaurant/detail.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    restaurant: null,
    meals: [],
    reviews: [],
    currentUser: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    this.setData({
      currentUser: app.globalData.userInfo
    })

    const self = this
    let Restaurants = new wx.BaaS.TableObject('restaurants_sp21')
    let Reviews = new wx.BaaS.TableObject('reviews_sp21')
    let Meals = new wx.BaaS.TableObject('meals_sp21')

    Restaurants.get(options.id).then((res) => {
      console.log('res', res)
      self.setData({
        restaurant: res.data
      })
    }, (err) => {
    })

    let reviewQuery = new wx.BaaS.Query()

    reviewQuery.compare('restaurantId', '=', options.id)

    Reviews.setQuery(reviewQuery).find().then((res) => {
      self.setData({
        reviews: res.data.objects
      })
    })

    let mealsQuery = new wx.BaaS.Query()

    mealsQuery.compare('restaurantId', '=', options.id)

    Meals.setQuery(mealsQuery).find().then((res) => {
      self.setData({
        meals: res.data.objects
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  userInfoHandler: function(data) {
    const self = this
    wx.BaaS.auth.loginWithWechat(data).then((res) => {
      console.log('userInfo', res)
      self.setData({
        currentUser: res
      })
      wx.setStorageSync('userInfo', res)
    }, (err) => {

    })
  },
  createReview: function(e) {
    const content = e.detail.value.content

    console.log('value', content)

    let Reviews = new wx.BaaS.TableObject('reviews_sp21')

    let newReview = Reviews.create();

    newReview.set({
      content: content,
      restaurantId: this.data.restaurant.id
    })

    newReview.save().then((res) => {
      let reviewArray = this.data.reviews
      reviewArray.push(res.data)

      this.setData({
        reviews: reviewArray
      })
    })
  },

  createOrder: function(e) {
    console.log('create order', e)

    let orders = new wx.BaaS.TableObject("orders_sp21")
    let newOrder = orders.create()
    newOrder.set({
      mealId: e.currentTarget.dataset.mealid,
      count: 1
    })

    newOrder.save().then(
      (res) => {
        wx.showToast({
          title: 'Ordered!',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true,
        });
      }
    )
  }
})