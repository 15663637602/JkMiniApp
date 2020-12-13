Page({
  data:{
    animationData: [],
    animationData2: [],
  },
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 10000,
      timingFunction: "ease",
      delay: 3000,
      transformOrigin: '50% 50% 0'
    })
    animation.opacity(1).step();
    var animation2 = wx.createAnimation({
      duration: 10000,
      timingFunction: "ease",
      delay: 3000,
      transformOrigin: '50% 50% 0'
    })
    animation2.opacity(0.8).step();
    this.setData({
      animationData:animation.export(),
      animationData2:animation2.export()
    });
  },
})