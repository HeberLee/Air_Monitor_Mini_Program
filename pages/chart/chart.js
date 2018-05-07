import * as echarts from '../../ec-canvas/echarts';
let chart = null;
const app = getApp();

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Page({

  data: {
    machines: '',
    index: 0,
    ec: {
      onInit: initChart
    },

  },



  onLoad: function () {
    wx.setStorageSync('machine', '泉州_鲤城区_1');
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/study/Air_Monitor/public/api/weixin/machine_names',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },

      success: function (res) {
        var data = res.data;
        console.log(data);
        that.setData({
          machines: data
        })

      }
    })
  },
  getChart: function () {
    var that = this;
    wx.getStorage({
      key: 'machine',
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          that.setData({
            machine: res.data
          })
        }
      }
    });
    wx.getStorage({
      key: 'date',
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          that.setData({
            date: res.data
          })
        }
      }
    });
    wx.request({

      url: 'http://127.0.0.1/study/Air_Monitor/public/api/Weixin/chart',
      data:
      {
        name: this.data.machine,
        date:this.data.date
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
        // that.setData({
        //   option:option
        // })
        chart.clear();
        chart.setOption(option);
      }

    })
  },
  bindMachineChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    wx.setStorageSync('machine', this.data.machines[e.detail.value]);
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.setStorageSync('date', e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
});
