// pages/base/base.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cnt: 0,
    msg: 'Hello World',
    arr: ['a', 'b', 'c', 'd'],
    list: [{
      name: 'jack',
      age: 18
    },
    {
      name: 'lili',
      age: 20
    },
    {
      name: 'jerry',
      age: 21
    }]
  },

  onTapHandler: function(event) {
    this.setData({
      cnt: this.data.cnt + 1
    });
  },

  onTapBoxHandler: function(event) {
    console.log(event.target.dataset.id);
    console.log('box clicked');
  },

  onTapChildHandler: function(event) {
    console.log('child clicked');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})