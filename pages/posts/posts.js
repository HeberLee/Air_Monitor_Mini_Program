 var postsData = require('../../data/posts-data.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  this.setData({
    posts_content: postsData.postList
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  articleTap: function (event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url:"post-detail/post-detail?postid="+postId
    })
  }
})