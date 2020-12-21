Page({
  data:{
    animationData: [],
    animationData2: [],
    endPageXmas: "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/wallpaper/XmasTree3.jpeg",
    endPageMerryXmas: "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/wallpaper/MerryXmas.jpg"
  },
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading Picture...',
    });
  },
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 15000,
      timingFunction: "ease",
      delay: 6000,
      transformOrigin: '50% 50% 0'
    })
    animation.opacity(1).step();
    var animation2 = wx.createAnimation({
      duration: 15000,
      timingFunction: "ease",
      delay: 6000,
      transformOrigin: '50% 50% 0'
    })
    animation2.opacity(0.8).step();
    this.setData({
      animationData:animation.export(),
      animationData2:animation2.export()
    });
  },
  imageOnLoad:function(event) {
    wx.hideLoading();
  },
})