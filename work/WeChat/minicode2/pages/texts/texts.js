// pages/texts/texts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    texts:[
      '2011年1月，&nbsp;微信1.0发布。',
      '同年5月，微信2.0语音对讲发布，',
      '10月，微信3.0新增摇一摇功能，',
      '2012年3月，微信用户突破1亿，',
      '4月份，微信4.0朋友圈发布，',
      '同年7月，微信4.2发布公众平台,',
      '2013年8月，微信5.0发布微信支付,',
      '2014年9月，企业号发布,',
      '同月，发布微信卡包,',
      '2015年1月，微信第一条朋友圈广告,',
      '2016年1月，企业微信发布,',
      '2017年1月，小程序发布,',
      '......'
    ],
    text:"",
    index:0
  },
  addMessage:function(e){
    console.log(e);
    // 获取data中已有的文本
    let text = this.data.text;
    // 追加文本
    if (this.data.index < this.data.texts.length)
      text +=this.data.texts[this.data.index++]
      // 将text设置到 this.data.text中
      this.setData({
        text
      })
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