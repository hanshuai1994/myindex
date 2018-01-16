var element = document.querySelector('#main')
var myChart = echarts.init(element)

var option = {
    title: {
        text: '未来一周气温变化',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['最高气温','最低气温']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            name:'最高气温',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'最低气温',
            type:'line',
            data:[1, -2, 2, 5, 3, 2, 0],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'},
                    [{
                        symbol: 'none',
                        x: '90%',
                        yAxis: 'max'
                    }, {
                        symbol: 'circle',
                        label: {
                            normal: {
                                position: 'start',
                                formatter: '最大值'
                            }
                        },
                        type: 'max',
                        name: '最高点'
                    }]
                ]
            }
        }
    ]
}



var getWeather = function() {
    var request = {
        method: 'get',
        url: 'https://free-api.heweather.com/v5/forecast?city=shanghai&key=cc2d9724dcc340dc8a177adb382e7ea9',
        data: '',
        callback: function(response) {
            response = JSON.parse(response)

            var r = response["HeWeather5"][0]
            var xAxisData = []
            var maxs = []
            var mins = []


            var dates = r['daily_forecast']
            for (var i = 0; i < dates.length; i++) {
                var date = dates[i]['date']
                var max = Number(dates[i]['tmp']['max'])
                var min = Number(dates[i]['tmp']['min'])
                xAxisData.push(date)
                maxs.push(max)
                mins.push(min)
            }

            // 设定折线图 x 轴标记
            option['xAxis']['data'] = xAxisData

            // 根据城市设定标题
            option['title']['text'] = r["basic"]["city"] + '未来一周气温变化'

            // 添加最高与最低气温数据
            option['series'][0]['data'] = maxs
            option['series'][1]['data'] = mins

            myChart.setOption(option)
        }
    }
    ajax(request)
}

getWeather()
