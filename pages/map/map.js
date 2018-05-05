Page({
  data: {
    map: {
      lat: 0,
      lng: 0,
      markers: [],
      hasMarkers: false//解决方案  
    }
  },
  onLoad: function (options) {
    var that = this;

        wx.request({
          url: 'http://127.0.0.1/study/Air_Monitor/public/admin/map/map_weixin',
          data: {},
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header  
          success: function (res) {
            // success  
            var markers = new Array();
            var i = 0;
            // console.log(res.data[0][1]);
            res.data.forEach(function(e){
              
              // console.log(e);
              markers[i] = {
                id: e[0],
                latitude: e[3],
                longitude: e[2],
                name: e[1],
                iconPath: "/images/icon/map_marker.png",
                width: 40,
                height: 40,
                callout: {
                  content: "名称："+e[1]+"\n"+"经度："+e[2]+"\n"+"纬度："+e[3],
                  color: "#ff0000",
                  fontSize: "26",
                  borderRadius: "10",
                  bgColor: "#ffffff",
                  padding: "10",
                  display: "ALWAYS"
                },
               
              };
              i++;
            });
            
            that.setData({
              'map.lat': '24.963',
              'map.lng': '118.705',
              'map.markers': markers,
              'map.hasMarkers': true//解决方案  
              
            });
          
          }
        })
  }

});  