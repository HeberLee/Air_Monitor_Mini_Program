// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '欢迎登录WXapp',
    userName: '',
    userPassword: '',
    id_token: '',//方便存在本地的locakStorage  
    response: '', //存取返回数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        if(res.data){
          wx.switchTab({
            url: "../chart/chart"
          });

        }
      }
    })
      
        
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  login: function () {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.setData({
          code: res.code,
        });
        // console.log(that.data.code);
        wx.request({
          url: 'http://127.0.0.1/study/Air_Monitor/public/api/Weixin/login',
          data: {
            username: that.data.userName,
            password: that.data.userPassword,
            code: that.data.code,
          },
          method: 'POST',
          success: function (res) {
            if(res.data != 0&& res.data!= 1 &&res.data.length == 32){
              wx.setStorageSync('openid', res.data)
              wx.switchTab({
                url: "../chart/chart"
              });
            }
          },
          fail: function (res) {
            console.log(res.data);
            console.log('is failed')
          }
        })

      }
    });
    
  },  

  register: function(){
    wx.navigateTo({
      url: '../register/register'
    })
  }

})