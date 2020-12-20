var valHandle;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wishPageXmas: "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/wallpaper/XmasTree2.jpg",
    wishText: "cloud://yq-mini-app-env-5grnxcah9f3142ba.7971-yq-mini-app-env-5grnxcah9f3142ba-1302525386/text/CollectWishToBeTrue-Light.png",
    count: 0,
    system:'',
    animation: '',
    showAnima: [],
    stepText:45
  },
  
  imageOnLoad:function(event) {
    wx.hideLoading();
  },

  onReady: function(option) {
    var that = this;
    that.data.stepText = 45;
    var step = that.data.stepText;
    clearInterval(valHandle);
    valHandle = setInterval(function(){
      that.setData({
        stepText: parseInt(step)
      })
      step = (step - 0.1).toFixed(1)
      if(step<=0){
        clearInterval(valHandle)  //销毁定时器
      }
    },100)

    setTimeout(function(){
      var pages = getCurrentPages();
      var cPage = pages[pages.length - 1];
      var url = cPage.route;
      if (url == 'pages/wish/wish') {
        wx.redirectTo({
          url: '/pages/card/card'
        })
      }
    },45000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'Loading Picture...',
    });
    this.setData({
      currCount: this.data.count,
      system:wx.getSystemInfoSync()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var showAnima = wx.createAnimation({
      duration: 3000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    showAnima.opacity(1).step();
    this.setData({showAnima:showAnima.export()});

    var {height, top} = wx.getMenuButtonBoundingClientRect();

    let that=this;
    let anmition=wx.createAnimation({
      duration: 1200,
      timingFunction: 'ease',
    })
    that.setData({
      animation:anmition
    })
    let arryList = new Array();
    for (let i = 0; i < 9; i++) {
      var obj = {
        num: Math.floor(Math.random() * 15 + 1) + 'C',
        title: i == 0 ? '想要的都能实现' : i == 1 ? '白马王子' : i == 2 ? '永不长痘' : i == 3 ? '永远是小仙女' : i == 4 ? '狂吃不胖' : i == 5 ? '家人健康' : i == 6 ? '满意的工作' : i == 7 ? '吹海风' : '病毒退散',
        anima: '',
        styleObject: '',
        isShow: true,
        realItem: true
      }
      arryList.push(obj)
    }
    //随机左边距 上边距 动画延时
    let left_width, top_height, anm_time;
    for (let i = 0; i < arryList.length; i++) {
      left_width = Math.floor(Math.random() * 20 + 1);
      top_height = Math.floor(Math.random() * 20 + height + top);
      anm_time = (Math.random() * 1.1 + 0).toFixed(1);
      console.log('id:' + i + '左边距:' + left_width + ',上边距:' + top_height + ',动画时间:' + anm_time);
      arryList[i].top = top_height;
      arryList[i].styleObject =  that.formatStyle({
          "left": left_width + 'px',
          "top": top_height + 'px',
          "animation": 'heart 1.3s ease-in-out ' + anm_time + 's infinite alternate'
        })
    }
    // 空数组
    var emptarry = new Array();
    for (var i = 0; i < 16 - arryList.length; i++) {
      emptarry.push({
        realItem: false
      })
    }
    that.setData({
        myList: that.randomArry(arryList.concat(emptarry))
    })
    const query = wx.createSelectorQuery()
    query.select('#my_collect').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
     that.setData({
       my_collect:res[0]
     })
    })
  },
  //随机数组
  randomArry(arr) {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemIndex = arr[randomIndex];
      arr[randomIndex] = arr[i];
      arr[i] = itemIndex;
    }
    return arr;
  },
/**
 * 格式化Style
 */
  formatStyle(position) {
    let styles = []
    for (let key in position) {
      styles.push(`${key}: ${position[key]};`)
    }
    return styles.join(' ')
  },
  
  //收集能量 
  bindTab(e) {
    let that = this;
    // that.data.myList[e.currentTarget.id].styleObject.animation = ''; //将css动画置空
    console.log(that.data.myList[e.currentTarget.id].styleObject);
    let myItm = that.data.myList[e.currentTarget.id];
    myItm.styleObject= myItm.styleObject.split("animation")[0];
    console.log(myItm.styleObject)
    console.log(that.data.my_collect)
    let itd = 'myList[' + e.currentTarget.id +'].styleObject';
    that.setData({
      [itd]: myItm.styleObject
    })
    setTimeout(function () {
        let dpi = that.data.system.screenWidth / 750; //计算像素密度
        //元素的位置
        let view_x = e.detail.x,
          view_y = e.detail.y + dpi * 116 / 2;
        console.log(e.currentTarget.id)
        console.log('元素位置----', view_x, view_y)
        let myCollect_x = that.data.my_collect.left + dpi * 130 / 2 + dpi * 260 / 2 * 0.5,
          myCollect_y = that.data.my_collect.right + that.data.myList[e.currentTarget.id].top+dpi*100 / 2 + dpi*97 / 2;
        console.log('收集按钮位置----', myCollect_x, myCollect_y);
        console.log('移动位置----', myCollect_x - view_x, myCollect_y - view_y);
      var animation = wx.createAnimation({
        duration: 1200,
        timingFunction: 'ease',
      })

      that.animation = animation;
      animation.translate(myCollect_x - view_x, myCollect_y - view_y).opacity(0).step();
      animation.translateX(myCollect_x - view_x).step();
      animation.translateY(myCollect_y - view_y).step();
      let anmi = 'myList[' + e.currentTarget.id + '].anima';
      that.setData({
        [anmi]: animation.export()
      })
        setTimeout(function () {
          that.setData({
            ['myList[' + e.currentTarget.id + '].isShow']: false
          })
        }, 1100)
        that.data.count++;
        if (that.data.count == 9) {
          console.log('asd'+that.data.count);
          wx.reLaunch({
            url: '/pages/card/card',
          })
        }
    }, 100)
  
  },

})