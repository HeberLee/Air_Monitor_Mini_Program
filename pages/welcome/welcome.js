Page({
  onTap:function(){
    // console.log('hello');
    // wx.navigateTo({
    //   url:"../posts/posts"
    // });
    wx.switchTab({
      url: "../chart/chart"
    });
  }
})