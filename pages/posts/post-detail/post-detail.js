var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data:{
    isPlayingMusic: false
  },

  onLoad: function (option) {
    var postId = option.postid;
    var postData = postsData.postList[postId];
    this.data.postId = postId;
    this.setData({
      postData: postData
    });
    wx.setStorageSync('key', {
      game: "绝地求生",
      developer: "bluehole"
    });
    var postsCollected = wx.getStorageSync("postsCollected");
    if (postsCollected) {
      var postCollected = postsCollected[postId];

      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('postsCollected', postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_isPlayingMusicPostId==this.data.postId){
      this.setData({
        isPlayingMusic:true
      });
    }
    this.setMusicMonitor();
  },

  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_isPlayingMusicPostId = that.data.postId;
      // console.log(app.globalData.g_isPlayingMusic);
    });

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_isPlayingMusicPostId = that.data.postId;
      // console.log(app.globalData.g_isPlayingMusic);
    });
  },

  onCollectionTap: function (option) {
    var postsCollected = wx.getStorageSync('postsCollected');

    var postCollected = postsCollected[this.data.postId];
    var collected = !postCollected;
    postsCollected[this.data.postId] = collected;
    this.showToast(postsCollected, collected)
  },

  onShareTap: function (option) {
    var key = wx.getStorageSync('key');
    console.log('half');
    wx.showActionSheet({
      itemList: [
        '朋友圈',
        '微信好友',
        'QQ',
        '浏览器'
      ],
      itemColor: '#405f80',
    });
  },

  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    }
    else{
      var musicData = postsData.postList[this.data.postId].music;

      wx.playBackgroundAudio({
        dataUrl: musicData.url,
        title: musicData.title,
        coverImage: musicData.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      });
    }
  },

  showToast: function (postsCollected, collected) {
    wx.setStorageSync('postsCollected', postsCollected);
    this.setData({
      collected: collected
    })
    wx.showToast({
      title: collected ? '收藏成功' : '取消成功',
    })
  },


})