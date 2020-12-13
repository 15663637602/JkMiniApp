//index.js
//获取应用实例
const app = getApp()

// 存储所有的雪花
const snows = [];
  
// 下落的加速度
const G = 0.01;

const fps = 60;

// 速度上限，避免速度过快
const SPEED_LIMIT_X = 1;
const SPEED_LIMIT_Y = 1;

const W = wx.getSystemInfoSync().windowWidth;
const H = wx.getSystemInfoSync().windowHeight;

const snowImage = '/img/white-snowflake.png';

Page({
  data: {
    canvasHeight: 0,
    animation: {},
    showAnima: [],
  },
  //事件处理函数
  // bindViewTap: function() {
  // },
  onLoad: function () {
  
    let tickCount = 150;
    let ticker = 0;
    // let lastTime = Date.now();
    let deltaTime = 0;
  
    // let canvas = null;
    let ctx = null;
 
    let requestAnimationFrame = (function() {
      return function (callback) {
        setTimeout(callback, 1000/ fps);
      }
    })();
    init();

    function init() {
      createCanvas();
      // 小屏幕时延长添加雪花时间，避免屏幕上出现太多的雪花
      if (W < 768) {
        tickCount = 350;
      }
      loop();
    }

    function loop() {
      requestAnimationFrame(loop);
  
      ctx.clearRect(0, 0, W, H);
      
      // const now = Date.now();
      deltaTime = 23;
      // lastTime = now;
      ticker += deltaTime;
  
      if (ticker > tickCount) {
        snows.push(
          new Snow(Math.random() * W, 0, Math.random() * 5 + 5)
        );
        ticker %= tickCount;
      }
  
      // const length = snows.length;
      snows.map(function(s, i) {
        s.update();
        s.draw();
        if (s.y >= H) {
          snows.splice(i, 1);
        }
      });
      ctx.draw();
    }
 
    function Snow(x, y, radius) {
      this.x = x;
      this.y = y;
      this.sx = 0;
      this.sy = 0;
      this.deg = 0;
      this.radius = radius;
      this.ax = Math.random() < 0.5 ? 0.005 : -0.005;
    }
 
    Snow.prototype.update = function() {
      const deltaDeg = Math.random() * 0.6 + 0.2;
  
      this.sx += this.ax;
      if (this.sx >= SPEED_LIMIT_X || this.sx <= -SPEED_LIMIT_X) {
        this.ax *= -1;
      }
  
      if (this.sy < SPEED_LIMIT_Y) {
        this.sy += G;
      }
  
      this.deg += deltaDeg;
      this.x += this.sx;
      this.y += this.sy;
    }
 
    Snow.prototype.draw = function() {
      const radius = this.radius;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.deg * Math.PI / 180);
      ctx.drawImage(snowImage, -radius, -radius * 1.8, radius * 2, radius * 2);
      ctx.restore();
    }
 
    function createCanvas() {
      ctx = wx.createCanvasContext('myCanvas');
    }
  },
  onShow: function () {
    var showAnima = wx.createAnimation({
      duration: 5000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    showAnima.opacity(1).step();
    this.setData({showAnima:showAnima.export()});

    this.animation = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function(res) {
        console.log("res")
      }
    })
    this.setData({
      canvasHeight: H
    })
  },
  rotateAni: function (n) {
    this.animation.rotate(180*(n)).step()
    this.setData({
      animation: this.animation.export()
    })
},
  toWish:function(event) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  onReady: function(){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/music/hap-birth.mp3'
    innerAudioContext.loop = true;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    var n = 0,
    that = this;
    this.interval = setInterval(function () {
      n++;
      that.rotateAni(n);
    }, 1400);

    // setTimeout(function(){
    //   wx.navigateTo({
    //     url: '/pages/index/index',
    //   })
    // },30000)
  },
  onUnload: function(){
    
  }
})
