// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '欢迎登录WXapp',
    username: '',
    password: '',
    email: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  usernameInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  rePasswordInput: function (e) {
    if(e.detail.value != this.data.password){
      wx.showToast({
        title: '前后密码不一致',
        icon: 'none',
        duration: 2000
      })
    }
  },
  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  register: function () {
    var that = this;

    wx.request({
      url: 'http://127.0.0.1/study/Air_Monitor/public/api/Weixin/register',
      data: {
        username: this.data.username,
        password: this.data.password,
        email: this.data.email,
      },
      method: 'POST',
      success: function (res) {
        if(res.data == 1){
          wx.redirectTo({
            url: '../login/login'
          })
        }
        else if(res.data == 0){
          console.log('fail');
        }

      },
      fail: function (res) {
        console.log(res.data);
        console.log('is failed')
      }
    })
  },



})