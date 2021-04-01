// index.js
// 获取应用实例
const app = getApp();
Page({
  data: {
    restaurants: [],
    baia: {},
    reviews: [],
  },
  // 事件处理函数
  onLoad() {
    const self = this;
    console.log("this one is first");
    let Restaurants = new wx.BaaS.TableObject("restaurants_sp21");
    Restaurants.find().then(
      (res) => {
        // success function
        // you have access to res
        console.log("result", res);
        self.setData({
          restaurants: res.data.objects,
        });
        console.log("this one is last");
      },
      (err) => {
        // fail function
        console.log("err", err);
      }
    );

    // console.log('this one is second.')

    const baiaId = "6059e80ebc331f03dae16752";

    Restaurants.get(baiaId).then(
      (res) => {
        console.log("res", res);
        self.setData({
          baia: res.data,
        });
      },
      (err) => {}
    );

    let Reviews = new wx.BaaS.TableObject("reviews_sp21");

    let query = new wx.BaaS.Query();

    query.compare("restaurantId", "=", baiaId);

    Reviews.setQuery(query)
      .find()
      .then(
        (res) => {
          self.setData({
            reviews: res.data.objects,
          });
        },
        (err) => {}
      );
  },

  toRestaurant: function (e) {
    console.log("testerino", e);
    wx.navigateTo({
      url: `/pages/restaurant/detail?id=${e.currentTarget.dataset.id}`,
    });
  },

  getPhoto: function () {
    wx.chooseImage({
      count: 2,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (result) => {
        console.log('photo success', result)
        wx.previewImage({
          current: '',
          urls: result.tempFilePaths,
          success: (result)=>{
            
          },
        });
      },
    });
  },
});
