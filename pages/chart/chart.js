import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function test1(){
  console.log('test1');
  var cv = initChart();
  test3();
}

function initChart2() {
  console.log('init2');
  initChart;
}

function test3(){
  console.log('test3');
}
function initChart(canvas, width, height, date = '2018-3-4') {
  console.log('1');
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  console.log('2');
  canvas.setChart(chart);
  console.log('34');
  wx.request({

    url: 'http://127.0.0.1/study/Air_Monitor/public/admin/chart/chart_weixin',
    data:
    {
      date: date
    },

    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },

    success: function (res) {
      var data = res.data;
      console.log(data);
      var option = {
        title: {
          text: 'Beijing AQI'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: data.map(function (item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },

        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 20,
            color: '#096'
          }, {
            gt: 20,
            lte: 40,
            color: '#ffde33'
          }, {
            gt: 40,
            lte: 60,
            color: '#ff9933'
          }, {
            gt: 60,
            lte: 80,
            color: '#cc0033'
          }, {
            gt: 80,
            lte: 100,
            color: '#660099'
          }, {
            gt: 100,
            color: '#7e0023'
          }],
          outOfRange: {
            color: '#999'
          }
        },
        series: {
          name: 'Beijing AQI',
          type: 'line',
          data: data.map(function (item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [{
              yAxis: 20
            }, {
              yAxis: 40
            }, {
              yAxis: 60
            }, {
              yAxis: 80
            }, {
              yAxis: 100
            }]
          }
        }
      };

      chart.setOption(option);
      return chart;
    }

  })

}

function getData() {

  wx.request({
    
    url: 'http://127.0.0.1/study/Air_Monitor/public/admin/chart/chart_weixin',
    data:
    {

    },

    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },

    success: function (res) {
      var data = res.data;
      // console.log(data);
      return data;
    }

  })
}

function createOption(){
  var data = getData();
  console.log(data);
}
function getBarOption() {

  var option = {
    backgroundColor: "#fff",
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],

    tooltip: {
      trigger: 'axis'
    },
    legend: {

      data: ['A商品', 'B商品', 'C商品']
    },
    grid: {
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      x: 'center',
      type: 'value'
    },
    series: [{
      name: 'A商品',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B商品',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'C商品',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };
  return option;
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  
  data: {
    date: '2016-09-01',
    ec: {
      onInit: initChart
    },
  },
  initChart1:function(canvas, width, height, date = '2018-3-4') {
    console.log('1');
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    console.log('2');
    canvas.setChart(chart);
    console.log('34');
    wx.request({

      url: 'http://127.0.0.1/study/Air_Monitor/public/admin/chart/chart_weixin',
      data:
      {
        date: date
      },

      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },

      success: function (res) {
        var data = res.data;
        console.log(data);
        var option = {
          title: {
            text: 'Beijing AQI'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: data.map(function (item) {
              return item[0];
            })
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          toolbox: {
            left: 'center',
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },

          visualMap: {
            top: 10,
            right: 10,
            pieces: [{
              gt: 0,
              lte: 20,
              color: '#096'
            }, {
              gt: 20,
              lte: 40,
              color: '#ffde33'
            }, {
              gt: 40,
              lte: 60,
              color: '#ff9933'
            }, {
              gt: 60,
              lte: 80,
              color: '#cc0033'
            }, {
              gt: 80,
              lte: 100,
              color: '#660099'
            }, {
              gt: 100,
              color: '#7e0023'
            }],
            outOfRange: {
              color: '#999'
            }
          },
          series: {
            name: 'Beijing AQI',
            type: 'line',
            data: data.map(function (item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              data: [{
                yAxis: 20
              }, {
                yAxis: 40
              }, {
                yAxis: 60
              }, {
                yAxis: 80
              }, {
                yAxis: 100
              }]
            }
          }
        };

        chart.setOption(option);
        return chart;
      }

    })

  },
  onLoad: function(){


  }
});
