const marginHori = 74
const marginVerti = 100

const app = getApp()

Page({

  data: {

    animation1: {},
    animation2: {},

    top1: marginVerti,
    left1: marginHori,
    top2: marginVerti,
    left2: marginHori,

    startX: 0,
    startY: 0,

    count1: 0,
    count2: 1,

    name1: "",
    location1: "",
    name2: "",
    location2: "",
    isLike1: null,
    isLike2: null,

    likeImgURL1: "../../img/icon_like.png",
    likeImgURL2: "../../img/icon_like.png",

    windowWidth: 0,
    windowHeight: 0,

    isFirstCard: true,
    isFirstInit: true,

    data: [],

    count: 0,

    animationData: [],

  },


  onLoad: function (options) {

    var that = this

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })

    that.requestMenu()

  },


  onReady: function () { },


  onShow: function () {
    var animation = wx.createAnimation({
      duration: 4000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    animation.opacity(1).step();
    this.setData({animationData:animation.export()});
  },

  viewTouchInside: function (event) {

    var that = this

    var pointX = event.touches[0].clientX
    var pointY = event.touches[0].clientY

    that.setData({
      startX: pointX,
      startY: pointY
    })

    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animation.scale(0.9).step()

    if (that.data.isFirstCard == true) {
      that.setData({
        animation1: animation.export()
      })
    } else {
      that.setData({
        animation2: animation.export()
      })
    }

  },


  viewDidMove: function (event) {
    
    var that = this

    var pointX = event.touches[0].clientX
    var pointY = event.touches[0].clientY

    var widthCenter = that.data.windowWidth / 2
    var heightCenter = that.data.windowHeight / 2

    var perX = (pointX - that.data.startX) / widthCenter
    var perY = (pointY - that.data.startY) / heightCenter
    var maxPer = (Math.abs(perX) > Math.abs(perY)) ? Math.abs(perX) : Math.abs(perY)


    var animationOpacity = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animationOpacity.opacity(maxPer).step()

    var animationRotate = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animationRotate.scale(0.9).rotate(perX * 20).step()

    var x = marginHori + pointX - that.data.startX
    var y = marginVerti + pointY - that.data.startY

    if (that.data.isFirstCard == true) {
      that.setData({
        left1: x,
        top1: y
      })
      that.setData({
        animation1: animationRotate.export(),
        animation2: animationOpacity.export()
      })
    } else {
      that.setData({
        left2: x,
        top2: y
      })
      that.setData({
        animation1: animationOpacity.export(),
        animation2: animationRotate.export(),
      })
    }
  },


  viewTouchUpDownInside: function (event) {

    var that = this

    var endX = event.changedTouches[0].clientX
    var endY = event.changedTouches[0].clientY

    var distanceX = endX - that.data.startX
    var distanceY = endY - that.data.startY

    if (distanceX > 93.75) {
      that.removeCard('right')
    } else if (distanceX < -93.75) {
      that.removeCard('left')
    } else if (distanceY < -100) {
      that.removeCard('up')
    } else if (distanceY > 100) {
      that.removeCard('down')
    }

    if (distanceX < 93.75 && distanceX > -93.75 && distanceY > -150 && distanceY < 150) {
      if (that.data.isFirstCard == true) {
        that.setData({
          top1: marginVerti,
          left1: marginHori
        })
      } else {
        that.setData({
          top2: marginVerti,
          left2: marginHori
        })
      }
    }

    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animation.scale(1).step()

    if (that.data.isFirstCard == true) {
      that.setData({
        animation1: animation.export()
      })
    } else {
      that.setData({
        animation2: animation.export()
      })
    }

    if (that.data.count == 6) {
      wx.redirectTo({
        url: '/pages/end/end',
      })
    }
  },

  removeCard: function (direction) {

    var that = this

    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'linear',
    })

    if (direction == 'right') {
      animation.translateX(400).rotate(45).opacity(0).step()
      animation.translateX(0).rotate(0).step()
    } else if (direction == 'left') {
      animation.translateX(-400).rotate(-45).opacity(0).step()
      animation.translateX(0).rotate(0).step()
    } else if (direction == 'up') {
      animation.translateY(-400).opacity(0).step()
      animation.translateY(0).step()
    } else if (direction == 'down') {
      animation.translateY(400).opacity(0).step()
      animation.translateY(0).step()
    }
    
    if (that.data.isFirstCard == true) {
      that.setData({
        animation1: animation.export(),
        count1: that.data.count1 + 2,
        count: that.data.count + 1,
        location1: that.data.data[that.data.count1 + 2]["location"],
        isFirstCard: false
      })

      setTimeout(function () {
        that.setData({
          top1: marginVerti,
          left1: marginHori
        })
      }.bind(that), 250)
    } else {
      that.setData({
        animation2: animation.export(),
        count2: that.data.count2 + 2,
        count: that.data.count + 1,
        location2: that.data.data[that.data.count2 + 2]["location"],
        isFirstCard: true
      })

      setTimeout(function () {
        that.setData({
          top2: marginVerti,
          left2: marginHori
        })
      }.bind(that), 100)

    }
  },

  requestLike: function () {

    var that = this

    var newData = that.data.data
    
    newData[that.data.count]["is_like"] = !newData[that.data.count]["is_like"]

    that.setData({
      data: newData,
    })

    if (that.data.isFirstCard == true) {
      that.setData({
        isLike1: !that.data.isLike1
      })
    } else {
      that.setData({
        isLike2: !that.data.isLike2
      })
    }

    var noticeMsg = (newData[that.data.count]["is_like"] == true ? "添加成功" : "取消成功")

    wx.showToast({
      title: noticeMsg,
      duration: 1000,
      icon: 'success',
    })
  },

  requestMenu: function () {

    var that = this
    that.pushData()

  },

  pushData: function () {
    var that = this
    var sayings = new Array("祝愿你能够得到你想要的","祝你越来越美丽","青春永驻","顺利上岸","过好每一天","开心每一天","永远幸福","aa","bb","cc")
    var imgs = new Array(
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card0.png",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card1.png",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card2.jpg",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card3.jpg",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card4.jpg",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card5.jpg",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card0.png",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card1.png",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card2.jpg",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card3.jpg",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card4.jpg",
      "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/card/card5.jpg"
    )

    var newData = that.data.data
    var dish = { "dish_id": 0, "is_like": false, "name": "名字" + that.data.data.length.toString(), "location": "康桥", "is_like": false }
    console.log(dish)
    for (var i = 0; i < 12; i++) {
      dish = { "dish_id": that.data.data.length.toString(), "is_like": false, "name": "sayings[i]", "location": imgs[i], "is_like": "" }
      newData.push(dish)
    }

    if (that.data.isFirstInit == true) {
      that.setData({
        data: newData,
        location1: newData[that.data.count]["location"],
        location2: newData[that.data.count + 1]["location"],
        isFirstInit: false
      })
    }

  }

})
